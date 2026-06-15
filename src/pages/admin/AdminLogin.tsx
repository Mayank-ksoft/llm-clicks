import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"loading" | "signup" | "login">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.functions.invoke("admin-bootstrap-status");
      if (error) {
        toast.error("Could not check admin status");
        setMode("login");
        return;
      }
      setMode(data?.hasAdmin ? "login" : "signup");
    })();
  }, []);

  // If already logged in as admin, jump to dashboard.
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (roleRow) navigate("/admin", { replace: true });
    })();
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          data: { full_name: name },
        },
      });
      if (error) throw error;
      if (!data.session) {
        // Sign in immediately (auto-confirm is on, but just in case)
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) throw signInErr;
      }
      const { error: bootErr } = await supabase.functions.invoke("admin-bootstrap");
      if (bootErr) throw new Error(bootErr.message);
      toast.success("Admin account created");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const { data: session } = await supabase.auth.getSession();
      const uid = session.session?.user.id;
      if (!uid) throw new Error("No session");
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        await supabase.auth.signOut();
        throw new Error("This account does not have admin access.");
      }
      toast.success("Welcome back");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (mode === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    );
  }

  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Helmet>
        <title>{isSignup ? "Create admin · LLMClicks" : "Admin login · LLMClicks"}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <form
        onSubmit={isSignup ? handleSignup : handleLogin}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 space-y-5"
      >
        <div>
          <h1 className="font-display text-xl font-bold">
            {isSignup ? "Create admin account" : "Admin sign in"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignup
              ? "No admin exists yet. Set up your credentials below."
              : "Sign in to manage menus, footer, pages, and SEO."}
          </p>
        </div>

        {isSignup && (
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Working…" : isSignup ? "Create admin" : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;