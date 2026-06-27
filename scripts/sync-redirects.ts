// Reads enabled rows from the DB `redirects` table and merges them into
// vercel.json so server-side 301/302 responses ship on the next deploy.
//
// Manual entries already in vercel.json are preserved. DB-managed rows are
// wrapped between BEGIN/END marker comments — re-running cleanly replaces
// only the managed block.
//
// Runs at prebuild. Silently no-ops when env vars are missing so local dev
// without DB creds still builds.
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

type Redirect = {
  from_path: string;
  to_path: string;
  status_code: number | null;
  enabled: boolean | null;
};

type VercelRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
  statusCode?: number;
  __managed?: true;
};

const MANAGED_KEY = "__managed";

async function fetchRedirects(): Promise<Redirect[] | null> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await sb
      .from("redirects")
      .select("from_path,to_path,status_code,enabled")
      .eq("enabled", true);
    if (error) { console.warn("[redirects] DB error, skipping sync:", error.message); return null; }
    return (data as Redirect[]) ?? [];
  } catch (e) {
    console.warn("[redirects] fetch failed:", (e as Error).message);
    return null;
  }
}

function normalizePath(p: string): string {
  if (!p.startsWith("/")) return `/${p}`;
  return p;
}

function toVercel(rows: Redirect[]): VercelRedirect[] {
  const out: VercelRedirect[] = [];
  for (const r of rows) {
    if (!r.from_path || !r.to_path) continue;
    const code = r.status_code ?? 301;
    const from = normalizePath(r.from_path);
    const to = /^https?:\/\//i.test(r.to_path) ? r.to_path : normalizePath(r.to_path);
    // Ship both with and without trailing slash to dodge Vercel's normalization.
    const variants = from.endsWith("/") || from.includes(":") ? [from] : [from, `${from}/`];
    for (const source of variants) {
      const entry: VercelRedirect = code === 301 || code === 308
        ? { source, destination: to, permanent: true, [MANAGED_KEY]: true }
        : { source, destination: to, statusCode: code, [MANAGED_KEY]: true };
      out.push(entry);
    }
  }
  return out;
}

async function main() {
  const rows = await fetchRedirects();
  if (!rows) { console.log("[redirects] skipped (no creds / no DB)"); return; }

  const path = resolve("vercel.json");
  const json = JSON.parse(readFileSync(path, "utf8"));
  const existing: VercelRedirect[] = Array.isArray(json.redirects) ? json.redirects : [];
  const manual = existing.filter((r) => !(r as Record<string, unknown>)[MANAGED_KEY]);
  const managed = toVercel(rows);

  // De-dupe: drop any managed entry whose source is already covered manually.
  const manualSources = new Set(manual.map((r) => r.source));
  const filteredManaged = managed.filter((r) => !manualSources.has(r.source));

  json.redirects = [...manual, ...filteredManaged];
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`[redirects] synced ${filteredManaged.length} managed redirects (kept ${manual.length} manual)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
