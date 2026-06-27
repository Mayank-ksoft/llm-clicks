/**
 * Seed CMS tables from the existing static data files.
 *
 * Reads:  src/data/blogPosts.ts, docsArticles.ts, knowledgeHub.ts, webStories.ts
 * Writes: authors, categories, blog_posts, docs_articles, kb_articles, web_stories
 *
 * Idempotent: uses upsert on slug. Existing content is updated, not duplicated.
 *
 * Usage:
 *   VITE_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... bunx tsx scripts/seed-cms.ts
 */
import { createClient } from "@supabase/supabase-js";
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";
import { indexableBlogCategories } from "../src/lib/blogCategories";
import { DOCS_CATEGORIES } from "../src/lib/docsCategories";

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.");
  process.exit(1);
}
const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toIso = (d?: string) => {
  if (!d) return null;
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? null : t.toISOString();
};

async function upsertAuthors() {
  const names = new Set<string>();
  posts.forEach((p) => p.author && names.add(p.author));
  const rows = Array.from(names).map((name) => ({
    slug: slugify(name),
    name,
  }));
  if (!rows.length) return new Map<string, string>();
  const { data, error } = await sb.from("authors").upsert(rows, { onConflict: "slug" }).select("id, name");
  if (error) throw error;
  return new Map(data!.map((r: any) => [r.name as string, r.id as string]));
}

async function upsertCategories() {
  const blog = indexableBlogCategories.map((c, i) => ({
    slug: c.slug,
    name: c.label ?? c.tag ?? c.slug,
    type: "blog" as const,
    position: i,
  }));
  const docsCats = DOCS_CATEGORIES.map((c, i) => ({
    slug: c.slug,
    name: c.title,
    type: "docs" as const,
    position: i,
  }));
  const kbCats = knowledgeHubCategories.map((c, i) => ({
    slug: c.slug,
    name: c.title,
    description: c.description ?? null,
    type: "knowledge_hub" as const,
    position: i,
  }));
  const all = [...blog, ...docsCats, ...kbCats];
  if (!all.length) return;
  const { error } = await sb.from("categories").upsert(all, { onConflict: "type,slug" });
  if (error) throw error;
}

async function getCategoryMap(type: "blog" | "docs" | "knowledge_hub") {
  const { data, error } = await sb.from("categories").select("id, slug, name").eq("type", type);
  if (error) throw error;
  const bySlug = new Map<string, string>();
  const byName = new Map<string, string>();
  data!.forEach((r: any) => {
    bySlug.set(r.slug, r.id);
    byName.set(r.name.toLowerCase(), r.id);
  });
  return { bySlug, byName };
}

async function seedBlog(authorIds: Map<string, string>) {
  const { bySlug, byName } = await getCategoryMap("blog");
  const rows = posts.map((p) => {
    const catId =
      byName.get((p.tag || "").toLowerCase()) ||
      bySlug.get(slugify(p.tag || "")) ||
      null;
    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      body_blocks: p.content as unknown as object,
      hero_image: p.image,
      author_id: authorIds.get(p.author) ?? null,
      category_id: catId,
      tag_legacy: p.tag,
      reading_time: p.readTime,
      status: "published" as const,
      published_at: toIso(p.date),
    };
  });
  const { error } = await sb.from("blog_posts").upsert(rows, { onConflict: "slug" });
  if (error) throw error;
  console.log(`blog_posts: ${rows.length}`);
}

async function seedDocs() {
  const { byName } = await getCategoryMap("docs");
  const rows = docs.map((d, i) => ({
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    body_blocks: d.content as unknown as object,
    hero_image: d.image ?? null,
    category_id: byName.get((d.category || "").toLowerCase()) ?? null,
    category_label: d.category,
    reading_time: d.readTime ?? null,
    position: i,
    status: "published" as const,
    published_at: toIso(d.date),
  }));
  const { error } = await sb.from("docs_articles").upsert(rows, { onConflict: "slug" });
  if (error) throw error;
  console.log(`docs_articles: ${rows.length}`);
}

async function seedKb() {
  const { bySlug } = await getCategoryMap("knowledge_hub");
  const rows = knowledgeHubCategories.flatMap((c, ci) =>
    c.articles.map((a, ai) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt ?? null,
      body_blocks: (a.content ?? null) as unknown as object,
      hero_image: a.image ?? null,
      category_id: bySlug.get(c.slug) ?? null,
      category_slug: c.slug,
      reading_time: a.readTime ?? null,
      position: ci * 1000 + ai,
      status: "published" as const,
      published_at: toIso(a.date),
      updated_legacy: a.updated ?? null,
    })),
  );
  const { error } = await sb.from("kb_articles").upsert(rows, { onConflict: "category_slug,slug" });
  if (error) throw error;
  console.log(`kb_articles: ${rows.length}`);
}

async function seedWebStories() {
  const rows = webStories.map((s) => ({
    slug: s.slug,
    title: s.title,
    excerpt: (s as any).excerpt ?? null,
    poster: s.poster ?? null,
    pages: ((s as any).pages ?? null) as unknown as object,
    status: "published" as const,
    published_at: null,
  }));
  if (!rows.length) return;
  const { error } = await sb.from("web_stories").upsert(rows, { onConflict: "slug" });
  if (error) throw error;
  console.log(`web_stories: ${rows.length}`);
}

(async () => {
  console.log("Seeding CMS tables...");
  await upsertCategories();
  const authorIds = await upsertAuthors();
  console.log(`authors: ${authorIds.size}`);
  await seedBlog(authorIds);
  await seedDocs();
  await seedKb();
  await seedWebStories();
  console.log("Done.");
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
