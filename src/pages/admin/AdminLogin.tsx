import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Admin auth goes through OUR OWN API (Express in dev, Vercel functions in
// prod) — not directly to Supabase edge functions. The browser never needs
// the service role key, and CORS is handled by our same-origin /api routes.

async function callApi<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string })?.error ?? `Request failed (${res.status})`);
  return data as T;
}

type SessionResponse = {
  access_token: string;
  refresh_token: string;
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"loading" | "signup" | "login">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await callApi<{ hasAdmin: boolean }>("/api/admin/bootstrap-status", {});
        setMode(data.hasAdmin ? "login" : "signup");
      } catch (e) {
        toast.error((e as Error).message || "Could not check admin status");
        setMode("login");
      }
    })();
  }, []);

  // If already signed in as admin, skip to dashboard.
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const isSignup = mode === "signup";
      const session = await callApi<SessionResponse>(
        isSignup ? "/api/admin/signup" : "/api/admin/login",
        isSignup ? { email, password, full_name: name } : { email, password },
      );
      const { error: setErr } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      if (setErr) throw setErr;
      toast.success(isSignup ? "Admin account created" : "Welcome back");
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
        onSubmit={submit}
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
