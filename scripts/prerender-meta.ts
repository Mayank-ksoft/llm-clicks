// Post-build prerender: for every known route, write dist/<route>/index.html
// with per-route <title>, <meta description>, <link canonical>, and og:* tags
// injected into the static index.html template. This makes non-JS crawlers
// (LinkedIn, Slack, SEOptimer, etc.) see the correct canonical for each page,
// since Vercel serves static files and doesn't run our Express server.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { createClient } from "@supabase/supabase-js";
import pageMetaData from "../shared/pageMeta.json" with { type: "json" };
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";
import { getBlogCategoryBySlug, indexableBlogCategories } from "../src/lib/blogCategories";
import { DOCS_CATEGORIES, getDocsCategoryBySlug } from "../src/lib/docsCategories";

const SITE_ORIGIN = "https://llmclicks.ai";
const DIST = resolve("dist");
const TEMPLATE_PATH = join(DIST, "index.html");

const META = pageMetaData as {
  default: { title: string; description: string };
  routes: Record<string, { title: string; description: string }>;
};

// ---- Pull admin-edited SEO from Supabase (overrides static pageMeta) ----
type DbSeo = {
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  robots: string | null;
  keywords: string | null;
  schema_jsonld: unknown | null;
};
const dbSeoByPath = new Map<string, DbSeo>();

async function loadDbSeo() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[prerender-meta] Supabase env not set — skipping CMS SEO override");
    return;
  }
  const client = createClient(url, key);
  const { data, error } = await client
    .from("pages")
    .select("path, page_seo(meta_title, meta_description, canonical_url, og_title, og_description, og_image, robots, keywords, schema_jsonld)");
  if (error) {
    console.warn("[prerender-meta] CMS SEO fetch failed:", error.message);
    return;
  }
  for (const row of data ?? []) {
    const seo = Array.isArray((row as any).page_seo) ? (row as any).page_seo[0] : (row as any).page_seo;
    if (seo) dbSeoByPath.set((row as any).path, seo as DbSeo);
  }
  console.log(`[prerender-meta] loaded CMS SEO for ${dbSeoByPath.size} pages`);
}

function titleCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function metaForPath(pathname: string): { title: string; description: string } {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (normalized === "/") return META.default;
  const exact = META.routes[normalized];
  if (exact) return exact;
  if (normalized.startsWith("/blog/category/")) {
    const slug = normalized.replace("/blog/category/", "");
    const category = getBlogCategoryBySlug(slug);
    const name = category?.label ?? titleCase(slug);
    return {
      title: `${name} Articles | LLMClicks.ai Blog`,
      description: `${name} articles from LLMClicks.ai covering AI search visibility, LLM SEO, and generative engine optimization.`,
    };
  }
  if (normalized.startsWith("/blog/")) {
    const name = titleCase(normalized.replace("/blog/", ""));
    return {
      title: `${name} | LLMClicks.ai Blog`,
      description: `${name} — insights on AI visibility and LLM SEO from LLMClicks.ai.`,
    };
  }
  if (normalized.startsWith("/docs/category/")) {
    const slug = normalized.replace("/docs/category/", "");
    const category = getDocsCategoryBySlug(slug);
    const name = category?.title ?? titleCase(slug);
    return {
      title: `${name} | LLMClicks.ai Docs`,
      description: `${name} documentation from LLMClicks.ai — setup guides, walkthroughs, and best-practice playbooks.`,
    };
  }
  if (normalized.startsWith("/docs/")) {
    const name = titleCase(normalized.replace("/docs/", ""));
    return {
      title: `${name} | LLMClicks.ai Docs`,
      description: `Documentation: ${name}. Learn how to use LLMClicks.ai effectively.`,
    };
  }
  if (normalized.startsWith("/knowledge-hub/")) {
    const parts = normalized.split("/").filter(Boolean);
    const name = titleCase(parts[parts.length - 1] ?? "");
    return {
      title: `${name} | LLMClicks.ai Knowledge Hub`,
      description: `${name} — explore the LLMClicks.ai Knowledge Hub for AI visibility insights.`,
    };
  }
  if (normalized.startsWith("/web-stories/")) {
    const name = titleCase(normalized.replace("/web-stories/", ""));
    return {
      title: `${name} | LLMClicks.ai Web Stories`,
      description: `${name} — a visual story on AI visibility from LLMClicks.ai.`,
    };
  }
  return META.default;
}

function canonicalForPath(pathname: string): string {
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (trimmed === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${trimmed}/`;
}


function escapeAttr(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html: string, pathname: string): string {
  const fallback = metaForPath(pathname);
  const db = dbSeoByPath.get(pathname);
  const title = db?.meta_title || fallback.title;
  const description = db?.meta_description || fallback.description;
  const canonical = db?.canonical_url || canonicalForPath(pathname);
  const ogTitle = db?.og_title || title;
  const ogDesc = db?.og_description || description;
  const ogImage = db?.og_image || null;
  const robots = db?.robots || null;
  const keywords = db?.keywords || null;
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  const ot = escapeAttr(ogTitle);
  const od = escapeAttr(ogDesc);

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${d}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${ot}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${od}" />`)
    .replace(/<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${ot}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${od}" />`);

  if (!/<link\s+rel="canonical"/i.test(out)) {
    out = out.replace(/(<meta\s+name="description"[^>]*>)/i, `$1\n    <link rel="canonical" href="${canonical}" />`);
  } else {
    out = out.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`);
  }

  // Inject extra admin-controlled tags before </head>
  const extra: string[] = [];
  if (ogImage) {
    extra.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`);
    extra.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`);
  }
  if (robots) extra.push(`<meta name="robots" content="${escapeAttr(robots)}" />`);
  if (keywords) extra.push(`<meta name="keywords" content="${escapeAttr(keywords)}" />`);
  if (db?.schema_jsonld) {
    const json = typeof db.schema_jsonld === "string" ? db.schema_jsonld : JSON.stringify(db.schema_jsonld);
    extra.push(`<script type="application/ld+json">${json}</script>`);
  }
  if (extra.length) {
    out = out.replace(/<\/head>/i, `    ${extra.join("\n    ")}\n  </head>`);
  }
  return out;
}

function writeRouteFile(pathname: string, template: string) {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (normalized === "/") {
    writeFileSync(TEMPLATE_PATH, injectMeta(template, "/"), "utf8");
    return;
  }
  const targetDir = join(DIST, normalized);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, "index.html"), injectMeta(template, normalized), "utf8");
}

if (!existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender-meta] dist/index.html missing — run vite build first`);
  process.exit(1);
}

await loadDbSeo();

const template = readFileSync(TEMPLATE_PATH, "utf8");

const routes = new Set<string>(["/"]);
for (const k of Object.keys(META.routes)) routes.add(k);
for (const k of dbSeoByPath.keys()) routes.add(k);
posts.forEach((p) => routes.add(`/blog/${p.slug}`));
indexableBlogCategories.forEach((c) => routes.add(`/blog/category/${c.slug}`));
docs.forEach((d) => routes.add(`/docs/${d.slug}`));
DOCS_CATEGORIES.forEach((c) => routes.add(`/docs/category/${c.slug}`));
webStories.forEach((s) => routes.add(`/web-stories/${s.slug}`));
knowledgeHubCategories.forEach((c) => {
  routes.add(`/knowledge-hub/${c.slug}`);
  c.articles.forEach((a) => routes.add(`/knowledge-hub/${c.slug}/${a.slug}`));
});

let count = 0;
for (const route of routes) {
  writeRouteFile(route, template);
  count++;
}
console.log(`[prerender-meta] wrote ${count} HTML files with per-route meta`);
