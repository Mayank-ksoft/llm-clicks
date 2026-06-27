// Verify a Supabase access token belongs to an admin user.
// Used by serverless endpoints that need admin-only access (e.g. blob upload).
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

function getEnv() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  return { url, service };
}

export async function verifyAdmin(req: VercelRequest): Promise<{ ok: true; userId: string } | { ok: false; status: number; error: string }> {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return { ok: false, status: 401, error: "Missing bearer token" };
  try {
    const { url, service } = getEnv();
    const admin = createClient(url, service);
    const { data: userRes, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userRes?.user) return { ok: false, status: 401, error: "Invalid token" };
    const userId = userRes.user.id;
    const { data, error } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) return { ok: false, status: 500, error: error.message };
    if (!data) return { ok: false, status: 403, error: "Not an admin" };
    return { ok: true, userId };
  } catch (e) {
    return { ok: false, status: 500, error: (e as Error).message };
  }
}

export function applyCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}
