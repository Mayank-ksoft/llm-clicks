import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { posts as staticPosts, type BlogPost } from "@/data/blogPosts";
import { docs as staticDocs, type DocArticle } from "@/data/docsArticles";
import { knowledgeHubCategories as staticKH, type KHCategory, type KHArticle } from "@/data/knowledgeHub";
import { webStories as staticWS, type WebStory } from "@/data/webStories";

// Public CMS loaders. Fetch published rows from Supabase, fall back to the
// bundled static datasets if the DB is empty or the request fails. Each loader
// returns the exact shape the existing renderers expect, so page components
// keep working unchanged.

const db = supabase as unknown as { from: (t: string) => any };

const fmtDate = (iso: string | null | undefined, fallback = "") => {
  if (!iso) return fallback;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

// ---------------- Blog ----------------
async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await db
    .from("blog_posts")
    .select("slug,title,excerpt,body_blocks,body_markdown,hero_image,reading_time,tag_legacy,published_at,author_id")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return staticPosts;

  const authorIds = Array.from(new Set(data.map((r: any) => r.author_id).filter(Boolean)));
  let authorMap: Record<string, string> = {};
  if (authorIds.length) {
    const { data: authors } = await db.from("authors").select("id,name").in("id", authorIds);
    (authors || []).forEach((a: any) => (authorMap[a.id] = a.name));
  }

  const staticBySlug = new Map(staticPosts.map((p) => [p.slug, p]));
  return data.map((r: any): BlogPost => {
    const fallback = staticBySlug.get(r.slug);
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fallback?.excerpt ?? "",
      date: fmtDate(r.published_at, fallback?.date ?? ""),
      readTime: r.reading_time ?? fallback?.readTime ?? "5 min read",
      tag: r.tag_legacy ?? fallback?.tag ?? "",
      author: (r.author_id && authorMap[r.author_id]) || fallback?.author || "Shripad Deshmukh",
      image: r.hero_image ?? fallback?.image ?? "",
      content: (Array.isArray(r.body_blocks) && r.body_blocks.length > 0)
        ? (r.body_blocks as BlogPost["content"])
        : (fallback?.content ?? []),
    };
  });
}

export function useBlogPosts() {
  const q = useQuery({ queryKey: ["public", "blog_posts"], queryFn: fetchBlogPosts, staleTime: 60_000 });
  return q.data ?? staticPosts;
}

// ---------------- Docs ----------------
async function fetchDocs(): Promise<DocArticle[]> {
  const { data, error } = await db
    .from("docs_articles")
    .select("slug,title,excerpt,body_blocks,hero_image,category_label,published_at,position")
    .eq("status", "published")
    .order("position", { ascending: true });
  if (error || !data || data.length === 0) return staticDocs;

  const staticBySlug = new Map(staticDocs.map((d) => [d.slug, d]));
  return data.map((r: any): DocArticle => {
    const fallback = staticBySlug.get(r.slug);
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fallback?.excerpt ?? "",
      date: fmtDate(r.published_at, fallback?.date ?? ""),
      image: r.hero_image ?? fallback?.image ?? "",
      category: r.category_label ?? fallback?.category ?? "Getting Started",
      content: (Array.isArray(r.body_blocks) && r.body_blocks.length > 0)
        ? (r.body_blocks as DocArticle["content"])
        : (fallback?.content ?? []),
    };
  });
}

export function useDocs() {
  const q = useQuery({ queryKey: ["public", "docs_articles"], queryFn: fetchDocs, staleTime: 60_000 });
  return q.data ?? staticDocs;
}

// ---------------- Knowledge Hub ----------------
async function fetchKnowledgeHub(): Promise<KHCategory[]> {
  const { data, error } = await db
    .from("kb_articles")
    .select("slug,title,excerpt,body_blocks,hero_image,category_slug,published_at,updated_legacy,reading_time,position")
    .eq("status", "published")
    .order("position", { ascending: true });
  if (error || !data || data.length === 0) return staticKH;

  // Build a slug->article fallback from static for image alts / missing fields.
  const staticBySlug = new Map<string, KHArticle>();
  staticKH.forEach((c) => c.articles.forEach((a) => staticBySlug.set(`${c.slug}/${a.slug}`, a)));

  // Start from static categories (preserves names, descriptions, order) but
  // replace each category's articles with DB rows for that category_slug.
  const grouped: Record<string, KHArticle[]> = {};
  data.forEach((r: any) => {
    const fb = staticBySlug.get(`${r.category_slug}/${r.slug}`);
    const article: KHArticle = {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fb?.excerpt ?? "",
      date: fmtDate(r.published_at, fb?.date ?? ""),
      updated: r.updated_legacy ?? fb?.updated,
      readTime: r.reading_time ?? fb?.readTime ?? "10 min read",
      image: r.hero_image ?? fb?.image ?? "",
      imageAlt: fb?.imageAlt ?? r.title,
      content: (Array.isArray(r.body_blocks) && r.body_blocks.length > 0)
        ? (r.body_blocks as KHArticle["content"])
        : (fb?.content ?? []),
    };
    (grouped[r.category_slug] ||= []).push(article);
  });

  return staticKH.map((c) => ({
    ...c,
    articles: grouped[c.slug] ?? c.articles,
  }));
}

export function useKnowledgeHubCategories() {
  const q = useQuery({ queryKey: ["public", "kb_articles"], queryFn: fetchKnowledgeHub, staleTime: 60_000 });
  return q.data ?? staticKH;
}

export function useKnowledgeHubCategory(categorySlug: string | undefined) {
  const all = useKnowledgeHubCategories();
  if (!categorySlug) return undefined;
  return all.find((c) => c.slug === categorySlug);
}

export function useKnowledgeHubArticle(categorySlug: string | undefined, articleSlug: string | undefined) {
  const cat = useKnowledgeHubCategory(categorySlug);
  if (!cat || !articleSlug) return null;
  const article = cat.articles.find((a) => a.slug === articleSlug);
  return article ? { category: cat, article } : null;
}

// ---------------- Web Stories ----------------
async function fetchWebStories(): Promise<WebStory[]> {
  const { data, error } = await db
    .from("web_stories")
    .select("slug,title,excerpt,poster,pages,published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return staticWS;

  const staticBySlug = new Map(staticWS.map((s) => [s.slug, s]));
  return data.map((r: any): WebStory => {
    const fb = staticBySlug.get(r.slug);
    return {
      slug: r.slug,
      title: r.title,
      poster: r.poster ?? fb?.poster ?? "",
      posterAlt: fb?.posterAlt ?? r.title,
      excerpt: r.excerpt ?? fb?.excerpt ?? "",
      slides: (Array.isArray(r.pages) && r.pages.length > 0)
        ? (r.pages as WebStory["slides"])
        : (fb?.slides ?? []),
    };
  });
}

export function useWebStories() {
  const q = useQuery({ queryKey: ["public", "web_stories"], queryFn: fetchWebStories, staleTime: 60_000 });
  return q.data ?? staticWS;
}

export function useWebStory(slug: string | undefined) {
  const all = useWebStories();
  if (!slug) return undefined;
  return all.find((s) => s.slug === slug);
}

export function useBlogPost(slug: string | undefined) {
  const all = useBlogPosts();
  if (!slug) return undefined;
  return all.find((p) => p.slug === slug);
}

export function useDoc(slug: string | undefined) {
  const all = useDocs();
  if (!slug) return undefined;
  return all.find((d) => d.slug === slug);
}