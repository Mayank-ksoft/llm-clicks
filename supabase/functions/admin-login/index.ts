// Admin login edge function.
// Verifies the credentials via GoTrue (password grant), then confirms the
// authenticated user has the 'admin' role. Returns the token pair so the
// browser can call supabase.auth.setSession() to hydrate the JS client.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";
    if (!email || !password) return json(400, { error: "Email and password required" });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Exchange password for a session.
    const tokenRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON_KEY },
      body: JSON.stringify({ email, password }),
    });
    if (!tokenRes.ok) {
      return json(401, { error: "Invalid email or password" });
    }
    const session = await tokenRes.json();
    const userId: string | undefined = session?.user?.id;
    if (!userId) return json(401, { error: "Invalid session response" });

    // Confirm admin role using service role (RLS-safe).
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: roleRow, error: roleErr } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw roleErr;
    if (!roleRow) return json(403, { error: "This account does not have admin access" });

    return json(200, {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      user: { id: userId, email: session.user.email },
    });
  } catch (e) {
    return json(500, { error: (e as Error).message });
  }
});
