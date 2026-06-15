// Admin signup edge function.
// First-run only: rejects with 409 if any admin already exists.
// Creates the auth user (auto-confirmed), grants the 'admin' role,
// then exchanges credentials for an access/refresh token pair via GoTrue.
// Returns the token pair so the browser can call supabase.auth.setSession().

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
    const fullName = typeof body?.full_name === "string" ? body.full_name.trim() : "";

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return json(400, { error: "Valid email is required" });
    if (password.length < 8)
      return json(400, { error: "Password must be at least 8 characters" });

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    // Race-safe: bail if any admin already exists.
    const { count, error: cntErr } = await admin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (cntErr) throw cntErr;
    if ((count ?? 0) > 0) return json(409, { error: "An admin account already exists" });

    // Create the auth user (auto-confirmed so first-run login works without email).
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (createErr || !created.user) {
      return json(400, { error: createErr?.message ?? "Could not create user" });
    }

    // Grant admin role.
    const { error: roleErr } = await admin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleErr) {
      // Best-effort rollback so a half-created admin doesn't block future signups.
      await admin.auth.admin.deleteUser(created.user.id).catch(() => {});
      return json(500, { error: roleErr.message });
    }

    // Exchange password for a session via the GoTrue REST endpoint.
    const tokenRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
      },
      body: JSON.stringify({ email, password }),
    });
    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return json(500, { error: `Token exchange failed: ${errText}` });
    }
    const session = await tokenRes.json();

    return json(200, {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      user: { id: created.user.id, email: created.user.email },
    });
  } catch (e) {
    return json(500, { error: (e as Error).message });
  }
});
