import { supabase } from "@/integrations/supabase/client";
import type { BlogPostRow, AuthorRow, CategoryRow, TagRow } from "@/lib/cms/blogTypes";

// Cast supabase to any to access tables not present in generated types yet.
const db = supabase as unknown as {
  from: (table: string) => any;
};

export const blogApi = {
  async list(): Promise<BlogPostRow[]> {
    const { data, error } = await db
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as BlogPostRow[];
  },
  async get(id: string): Promise<BlogPostRow | null> {
    const { data, error } = await db.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data ?? null) as BlogPostRow | null;
  },
  async upsert(row: Partial<BlogPostRow>): Promise<BlogPostRow> {
    const payload = { ...row, updated_at: new Date().toISOString() };
    const { data, error } = await db.from("blog_posts").upsert(payload).select("*").single();
    if (error) throw error;
    return data as BlogPostRow;
  },
  async remove(id: string): Promise<void> {
    const { error } = await db.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
  },
  async tagsForPost(postId: string): Promise<string[]> {
    const { data, error } = await db
      .from("blog_post_tags")
      .select("tag_id")
      .eq("post_id", postId);
    if (error) throw error;
    return ((data ?? []) as { tag_id: string }[]).map((r) => r.tag_id);
  },
  async setTags(postId: string, tagIds: string[]): Promise<void> {
    const { error: delErr } = await db.from("blog_post_tags").delete().eq("post_id", postId);
    if (delErr) throw delErr;
    if (tagIds.length === 0) return;
    const rows = tagIds.map((tag_id) => ({ post_id: postId, tag_id }));
    const { error } = await db.from("blog_post_tags").insert(rows);
    if (error) throw error;
  },
};

export const authorsApi = {
  async list(): Promise<AuthorRow[]> {
    const { data, error } = await db.from("authors").select("*").order("name");
    if (error) throw error;
    return (data ?? []) as AuthorRow[];
  },
};

export const categoriesApi = {
  async listByType(type: string): Promise<CategoryRow[]> {
    const { data, error } = await db
      .from("categories")
      .select("*")
      .eq("type", type)
      .order("name");
    if (error) throw error;
    return (data ?? []) as CategoryRow[];
  },
};

export const tagsApi = {
  async list(): Promise<TagRow[]> {
    const { data, error } = await db.from("tags").select("*").order("name");
    if (error) throw error;
    return (data ?? []) as TagRow[];
  },
  async create(name: string, slug: string): Promise<TagRow> {
    const { data, error } = await db.from("tags").insert({ name, slug }).select("*").single();
    if (error) throw error;
    return data as TagRow;
  },
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
