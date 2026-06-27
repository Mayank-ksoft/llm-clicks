// Type shims for content tables not yet in generated supabase types.

export type BlogStatus = "draft" | "published";

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_markdown: string | null;
  hero_image: string | null;
  hero_image_alt: string | null;
  hero_image_title: string | null;
  hero_image_caption: string | null;
  author_id: string | null;
  category_id: string | null;
  status: BlogStatus | "archived";
  published_at: string | null;
  reading_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  robots: string | null;
  keywords: string | null;
  schema_jsonld: unknown | null;
  created_at: string;
  updated_at: string;
}

export interface AuthorRow {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  type: string; // 'blog' | 'docs' | 'knowledge_hub'
  parent_id: string | null;
}

export interface TagRow {
  id: string;
  name: string;
  slug: string;
}
