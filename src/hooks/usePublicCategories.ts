import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any };

export type PublicCategory = {
  id: string;
  type: string;
  slug: string;
  name: string;
  description: string | null;
  position: number | null;
};

/**
 * Loads the admin-managed `categories` table for a given content type
 * ("blog" | "docs" | "knowledge_hub"). Used on the public site so that
 * categories added in the admin appear on the frontend without a code change.
 * Returns an empty array on any error so callers can safely fall back to
 * bundled static category lists.
 */
export function usePublicCategories(type: "blog" | "docs" | "knowledge_hub") {
  return useQuery<PublicCategory[]>({
    queryKey: ["public-categories", type],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await db
        .from("categories")
        .select("id,type,slug,name,description,position")
        .eq("type", type)
        .order("position", { ascending: true });
      if (error) return [];
      return (data ?? []) as PublicCategory[];
    },
  });
}
