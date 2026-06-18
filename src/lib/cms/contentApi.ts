import { supabase } from "@/integrations/supabase/client";

const db = supabase as unknown as { from: (t: string) => any; storage: any };

export type ContentStatus = "draft" | "published" | "archived";

export interface ContentRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_markdown: string | null;
  hero_image: string | null;
  category_id: string | null;
  category_label?: string | null;
  category_slug?: string | null;
  reading_time: string | null;
  position?: number;
  status: ContentStatus;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  robots: string | null;
  keywords: string | null;
  schema_jsonld: unknown | null;
  created_at: string;
  updated_at: string;
}

export const makeContentApi = (table: string, conflict = "id") => ({
  async list(): Promise<ContentRow[]> {
    const { data, error } = await db.from(table).select("*").order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ContentRow[];
  },
  async get(id: string): Promise<ContentRow | null> {
    const { data, error } = await db.from(table).select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? null) as ContentRow | null;
  },
  async upsert(row: Partial<ContentRow>): Promise<ContentRow> {
    const payload: any = { ...row, updated_at: new Date().toISOString() };
    const { data, error } = await db.from(table).upsert(payload, { onConflict: conflict }).select("*").single();
    if (error) throw error;
    return data as ContentRow;
  },
  async remove(id: string): Promise<void> {
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) throw error;
  },
});

export const docsApi = makeContentApi("docs_articles");
export const kbApi = makeContentApi("kb_articles");
export const webStoriesApi = makeContentApi("web_stories");

export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
