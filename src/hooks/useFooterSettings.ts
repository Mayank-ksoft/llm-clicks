import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SocialLink = { icon: string; href: string };
export type FooterSettings = {
  brand_blurb: string | null;
  copyright: string | null;
  social_links: SocialLink[];
};

export function useFooterSettings() {
  return useQuery({
    queryKey: ["footer-settings"],
    queryFn: async (): Promise<FooterSettings | null> => {
      const { data } = await supabase
        .from("footer_settings")
        .select("brand_blurb, copyright, social_links")
        .eq("id", 1)
        .maybeSingle();
      if (!data) return null;
      return {
        brand_blurb: data.brand_blurb,
        copyright: data.copyright,
        social_links: (data.social_links as SocialLink[]) ?? [],
      };
    },
    staleTime: 60_000,
  });
}