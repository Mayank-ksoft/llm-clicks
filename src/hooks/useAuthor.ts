import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any };

export interface AuthorProfile {
  id: string;
  slug: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  twitter: string | null;
  linkedin: string | null;
  website: string | null;
  role_title: string | null;
  tagline: string | null;
  long_bio_md: string | null;
  location: string | null;
  experience: string | null;
  specialization: string | null;
  expertise_tags: string[] | null;
  stats: { num: string; label: string }[] | null;
  founded_companies: { name: string; role: string; href: string }[] | null;
  cta_calendly_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
}

export function useAuthor(slug: string | undefined) {
  return useQuery({
    queryKey: ["author", slug],
    enabled: !!slug,
    queryFn: async (): Promise<AuthorProfile | null> => {
      const { data, error } = await db.from("authors").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return (data ?? null) as AuthorProfile | null;
    },
  });
}
