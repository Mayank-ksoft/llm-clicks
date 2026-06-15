import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type PageSeo = {
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  schema_jsonld: unknown | null;
  tagline: string | null;
  robots: string | null;
  keywords: string | null;
};

export function usePageSeo(path: string) {
  return useQuery({
    queryKey: ["page-seo", path],
    queryFn: async (): Promise<PageSeo | null> => {
      const { data: page } = await supabase
        .from("pages")
        .select("id")
        .eq("path", path)
        .maybeSingle();
      if (!page) return null;
      const { data: seo } = await supabase
        .from("page_seo")
        .select("*")
        .eq("page_id", page.id)
        .maybeSingle();
      return (seo as PageSeo) ?? null;
    },
    staleTime: 60_000,
  });
}