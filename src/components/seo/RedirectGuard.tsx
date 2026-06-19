import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type RedirectRow = {
  from_path: string;
  to_path: string;
  status_code: number | null;
  enabled: boolean | null;
};

// Live, client-side redirects sourced from the DB `redirects` table. This is
// the safety-net for edits made in /admin/redirects between deploys — once a
// build runs, scripts/sync-redirects.ts bakes them into vercel.json so the
// server emits a real 301 to crawlers. Until then, this hard-navigates the
// browser to the target.
const normalize = (p: string) => {
  const trimmed = p.length > 1 ? p.replace(/\/+$/, "") : "/";
  return trimmed.toLowerCase();
};

const useRedirectsMap = () =>
  useQuery({
    queryKey: ["redirects-map"],
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await (supabase as unknown as {
        from: (t: string) => {
          select: (s: string) => { eq: (k: string, v: unknown) => Promise<{ data: RedirectRow[] | null; error: { message: string } | null }> };
        };
      })
        .from("redirects")
        .select("from_path,to_path,status_code,enabled")
        .eq("enabled", true);
      if (error) return new Map<string, string>();
      const map = new Map<string, string>();
      for (const r of data ?? []) {
        if (!r.from_path || !r.to_path) continue;
        map.set(normalize(r.from_path), r.to_path);
      }
      return map;
    },
  });

const RedirectGuard = () => {
  const { pathname, search, hash } = useLocation();
  const { data: map } = useRedirectsMap();

  useEffect(() => {
    if (!map || map.size === 0) return;
    const target = map.get(normalize(pathname));
    if (!target) return;
    if (normalize(target) === normalize(pathname)) return;
    const url = /^https?:\/\//i.test(target) ? target : `${target}${search}${hash}`;
    window.location.replace(url);
  }, [map, pathname, search, hash]);

  return null;
};

export default RedirectGuard;
