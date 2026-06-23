import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { posts as staticPosts, type BlogPost } from "@/data/blogPosts";
import { docs as staticDocs, type DocArticle } from "@/data/docsArticles";
import { knowledgeHubCategories as staticKH, type KHCategory, type KHArticle } from "@/data/knowledgeHub";
import { webStories as staticWS, type WebStory } from "@/data/webStories";
import { markdownToBlocks } from "@/lib/cms/markdownToBlocks";

// Body resolution priority (used everywhere):
// 1. body_markdown (converted to blocks)  ← what admin editor writes today
// 2. body_blocks (legacy structured array) ← what the seed wrote
// 3. static fallback from src/data/*.ts    ← safety net
function resolveBody<T>(markdown: string | null | undefined, blocks: unknown, fallback: T[] | undefined): T[] {
  if (typeof markdown === "string" && markdown.trim()) {
    return markdownToBlocks(markdown) as unknown as T[];
  }
  if (Array.isArray(blocks) && blocks.length > 0) return blocks as T[];
  return (fallback ?? []) as T[];
}

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
  const [{ data, error }, catsRes] = await Promise.all([
    db
      .from("blog_posts")
      .select("slug,title,excerpt,body_blocks,body_markdown,hero_image,reading_time,tag_legacy,published_at,author_id,category_id")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    db.from("categories").select("id,slug,name").eq("type", "blog"),
  ]);
  if (error || !data || data.length === 0) return staticPosts;

  // Resolve each post's category from the live `categories` row so renaming a
  // category in admin (slug or name) flows through to the frontend immediately.
  const catById = new Map<string, { slug: string; name: string }>();
  ((catsRes?.data ?? []) as any[]).forEach((c) => catById.set(c.id, { slug: c.slug, name: c.name }));

  const authorIds = Array.from(new Set(data.map((r: any) => r.author_id).filter(Boolean)));
  let authorMap: Record<string, string> = {};
  if (authorIds.length) {
    const { data: authors } = await db.from("authors").select("id,name").in("id", authorIds);
    (authors || []).forEach((a: any) => (authorMap[a.id] = a.name));
  }

  const staticBySlug = new Map(staticPosts.map((p) => [p.slug, p]));
  return data.map((r: any): BlogPost => {
    const fallback = staticBySlug.get(r.slug);
    const cat = r.category_id ? catById.get(r.category_id) : undefined;
    const tag = cat?.name?.toUpperCase() ?? r.tag_legacy ?? fallback?.tag ?? "";
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fallback?.excerpt ?? "",
      date: fmtDate(r.published_at, fallback?.date ?? ""),
      readTime: r.reading_time ?? fallback?.readTime ?? "5 min read",
      tag,
      author: (r.author_id && authorMap[r.author_id]) || fallback?.author || "Shripad Deshmukh",
      image: r.hero_image ?? fallback?.image ?? "",
      content: resolveBody<BlogPost["content"][number]>(r.body_markdown, r.body_blocks, fallback?.content),
    };
  });
}

export function useBlogPosts() {
  const q = useQuery({ queryKey: ["public", "blog_posts"], queryFn: fetchBlogPosts, staleTime: 60_000 });
  return q.data ?? staticPosts;
}

// ---------------- Docs ----------------
async function fetchDocs(): Promise<DocArticle[]> {
  const [{ data, error }, catsRes] = await Promise.all([
    db
      .from("docs_articles")
      .select("slug,title,excerpt,body_blocks,body_markdown,hero_image,category_label,category_id,published_at,position")
      .eq("status", "published")
      .order("position", { ascending: true }),
    db.from("categories").select("id,slug,name").eq("type", "docs"),
  ]);
  if (error || !data || data.length === 0) return staticDocs;

  const catById = new Map<string, { slug: string; name: string }>();
  ((catsRes?.data ?? []) as any[]).forEach((c) => catById.set(c.id, { slug: c.slug, name: c.name }));

  const staticBySlug = new Map(staticDocs.map((d) => [d.slug, d]));
  return data.map((r: any): DocArticle => {
    const fallback = staticBySlug.get(r.slug);
    const cat = r.category_id ? catById.get(r.category_id) : undefined;
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fallback?.excerpt ?? "",
      date: fmtDate(r.published_at, fallback?.date ?? ""),
      image: r.hero_image ?? fallback?.image ?? "",
      // Live category name wins over the stale `category_label` mirror.
      category: cat?.name ?? r.category_label ?? fallback?.category ?? "Getting Started",
      content: resolveBody<DocArticle["content"][number]>(r.body_markdown, r.body_blocks, fallback?.content),
    };
  });
}

export function useDocs() {
  const q = useQuery({ queryKey: ["public", "docs_articles"], queryFn: fetchDocs, staleTime: 60_000 });
  return q.data ?? staticDocs;
}

// ---------------- Knowledge Hub ----------------
async function fetchKnowledgeHub(): Promise<KHCategory[]> {
  const [{ data, error }, catsRes] = await Promise.all([
    db
      .from("kb_articles")
      .select("slug,title,excerpt,body_blocks,body_markdown,hero_image,category_slug,category_id,published_at,updated_legacy,reading_time,position")
      .eq("status", "published")
      .order("position", { ascending: true }),
    db
      .from("categories")
      .select("id,slug,name,description,position")
      .eq("type", "knowledge_hub")
      .order("position", { ascending: true }),
  ]);

  const dbCats = (catsRes?.data ?? []) as any[];
  const catById = new Map<string, { slug: string; name: string; description: string | null }>();
  dbCats.forEach((c) => catById.set(c.id, { slug: c.slug, name: c.name, description: c.description }));

  if (error || !data || data.length === 0) {
    // No DB articles — still surface admin-created categories on top of static ones.
    const extra = dbCats.filter((c) => !staticKH.some((sc) => sc.slug === c.slug));
    return [
      ...staticKH,
      ...extra.map((c): KHCategory => ({
        slug: c.slug,
        name: c.name,
        description: c.description ?? "",
        articles: [],
      })),
    ];
  }

  // Build a slug->article fallback from static for image alts / missing fields.
  const staticBySlug = new Map<string, KHArticle>();
  staticKH.forEach((c) => c.articles.forEach((a) => staticBySlug.set(`${c.slug}/${a.slug}`, a)));

  const grouped: Record<string, KHArticle[]> = {};
  data.forEach((r: any) => {
    // Resolve to the LIVE category slug so admin renames flow through; fall
    // back to the mirrored category_slug for rows that predate category_id.
    const liveCat = r.category_id ? catById.get(r.category_id) : undefined;
    const bucketSlug: string = liveCat?.slug ?? r.category_slug ?? "uncategorized";
    const fb = staticBySlug.get(`${bucketSlug}/${r.slug}`) ?? staticBySlug.get(`${r.category_slug}/${r.slug}`);
    const article: KHArticle = {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? fb?.excerpt ?? "",
      date: fmtDate(r.published_at, fb?.date ?? ""),
      updated: r.updated_legacy ?? fb?.updated,
      readTime: r.reading_time ?? fb?.readTime ?? "10 min read",
      image: r.hero_image ?? fb?.image ?? "",
      imageAlt: fb?.imageAlt ?? r.title,
      content: resolveBody<KHArticle["content"][number]>(r.body_markdown, r.body_blocks, fb?.content),
    };
    (grouped[bucketSlug] ||= []).push(article);
  });

  // Static categories keep their order/descriptions, with DB articles swapped in.
  const merged: KHCategory[] = staticKH.map((c) => ({
    ...c,
    articles: grouped[c.slug] ?? c.articles,
  }));

  // Append admin-created categories that aren't in the static list.
  dbCats.forEach((c) => {
    if (merged.some((m) => m.slug === c.slug)) return;
    merged.push({
      slug: c.slug,
      name: c.name,
      description: c.description ?? "",
      articles: grouped[c.slug] ?? [],
    });
  });

  return merged;
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