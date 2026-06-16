import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PageHero = {
  h1: string | null;
  subtitle: string | null;
  eyebrow: string | null;
};

/**
 * Returns admin-edited hero copy (H1, subtitle, eyebrow tag) for a path.
 * Falls back to null when no page row or no hero fields are set, so callers
 * can use their hardcoded defaults.
 */
export function usePageHero(path: string) {
  return useQuery({
    queryKey: ["page-hero", path],
    queryFn: async (): Promise<PageHero | null> => {
      const { data: page } = await supabase
        .from("pages")
        .select("id")
        .eq("path", path)
        .maybeSingle();
      if (!page) return null;
      const { data: seo } = await supabase
        .from("page_seo")
        .select("h1, subtitle, tagline")
        .eq("page_id", page.id)
        .maybeSingle();
      if (!seo) return null;
      return {
        h1: (seo as { h1?: string | null }).h1 ?? null,
        subtitle: (seo as { subtitle?: string | null }).subtitle ?? null,
        eyebrow: (seo as { tagline?: string | null }).tagline ?? null,
      };
    },
    staleTime: 60_000,
  });
}