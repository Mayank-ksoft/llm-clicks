import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any };

export type CmsArticleSeo = {
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  keywords: string | null;
  robots: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  schema_jsonld: unknown | null;
  hero_image: string | null;
  hero_image_alt: string | null;
  hero_image_title: string | null;
  hero_image_caption: string | null;
  title: string | null;
  excerpt: string | null;
};

const FIELDS =
  "title,excerpt,meta_title,meta_description,canonical_url,keywords,robots,og_title,og_description,og_image,twitter_title,twitter_description,twitter_image,schema_jsonld,hero_image,hero_image_alt,hero_image_title,hero_image_caption";

/**
 * Loads admin-edited per-article SEO + featured-image metadata from a CMS table.
 * Returns null if the row doesn't exist (then callers fall back to bundled data).
 */
export function useCmsArticleSeo(
  table: "blog_posts" | "kb_articles" | "docs_articles" | "web_stories",
  slug: string | undefined,
) {
  return useQuery<CmsArticleSeo | null>({
    queryKey: ["cms-article-seo", table, slug ?? ""],
    enabled: !!slug,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data, error } = await db
        .from(table)
        .select(FIELDS)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (error) return null;
      return (data ?? null) as CmsArticleSeo | null;
    },
  });
}