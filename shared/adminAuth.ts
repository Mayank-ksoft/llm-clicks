// Shared admin-auth logic used by both the Express dev server (server/)
// and the Vercel serverless functions (api/). Talks to Supabase using the
// service role key on the server side, so the browser never needs to call
// Supabase edge functions directly.

import { createClient } from "@supabase/supabase-js";

export type AuthResult = { status: number; body: unknown };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function getEnv() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anon =
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !service || !anon) {
    throw new Error(
      "Missing Supabase server env vars (need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY)",
    );
  }
  return { url, service, anon };
}

export async function bootstrapStatus(): Promise<AuthResult> {
  try {
    const { url, service } = getEnv();
    const admin = createClient(url, service);
    const { count, error } = await admin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (error) throw error;
    return { status: 200, body: { hasAdmin: (count ?? 0) > 0 } };
  } catch (e) {
    return { status: 500, body: { error: (e as Error).message } };
  }
}

export async function adminLogin(input: {
  email?: unknown;
  password?: unknown;
}): Promise<AuthResult> {
  try {
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const password = typeof input.password === "string" ? input.password : "";
    if (!email || !password)
      return { status: 400, body: { error: "Email and password required" } };

    const { url, service, anon } = getEnv();

    const tokenRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: anon },
      body: JSON.stringify({ email, password }),
    });
    if (!tokenRes.ok) return { status: 401, body: { error: "Invalid email or password" } };
    const session = (await tokenRes.json()) as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
      user?: { id?: string; email?: string };
    };
    const userId = session?.user?.id;
    if (!userId) return { status: 401, body: { error: "Invalid session response" } };

    const admin = createClient(url, service);
    const { data: roleRow, error: roleErr } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) throw roleErr;
    if (!roleRow)
      return { status: 403, body: { error: "This account does not have admin access" } };

    return {
      status: 200,
      body: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        user: { id: userId, email: session.user?.email },
      },
    };
  } catch (e) {
    return { status: 500, body: { error: (e as Error).message } };
  }
}

export async function adminSignup(input: {
  email?: unknown;
  password?: unknown;
  full_name?: unknown;
}): Promise<AuthResult> {
  try {
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const password = typeof input.password === "string" ? input.password : "";
    const fullName = typeof input.full_name === "string" ? input.full_name.trim() : "";

    if (!email || !EMAIL_RE.test(email))
      return { status: 400, body: { error: "Valid email is required" } };
    if (password.length < 8)
      return { status: 400, body: { error: "Password must be at least 8 characters" } };

    const { url, service, anon } = getEnv();
    const admin = createClient(url, service);

    // Race-safe: bail if any admin already exists.
    const { count, error: cntErr } = await admin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (cntErr) throw cntErr;
    if ((count ?? 0) > 0)
      return { status: 409, body: { error: "An admin account already exists" } };

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (createErr || !created.user)
      return { status: 400, body: { error: createErr?.message ?? "Could not create user" } };

    const { error: roleErr } = await admin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleErr) {
      await admin.auth.admin.deleteUser(created.user.id).catch(() => {});
      return { status: 500, body: { error: roleErr.message } };
    }

    const tokenRes = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: anon },
      body: JSON.stringify({ email, password }),
    });
    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return { status: 500, body: { error: `Token exchange failed: ${errText}` } };
    }
    const session = (await tokenRes.json()) as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

    return {
      status: 200,
      body: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        user: { id: created.user.id, email: created.user.email },
      },
    };
  } catch (e) {
    return { status: 500, body: { error: (e as Error).message } };
  }
}
