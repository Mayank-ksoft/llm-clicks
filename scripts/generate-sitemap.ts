// Generates a sitemap index + per-section sitemaps with <lastmod> tags.
// Runs before dev/build via predev/prebuild npm hooks. Outputs into public/
// (Vite copies public/ into dist/ at build, so Vercel serves these at the root).
//
// Source priority:
//   1. Lovable Cloud DB (blog_posts, docs_articles, kb_articles, web_stories)
//      — when VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY are set.
//   2. Static src/data/*.ts files — used as fallback AND merged so any legacy
//      entry not yet seeded into the DB still ships in the sitemap.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";
import { indexableBlogCategories } from "../src/lib/blogCategories";
import { DOCS_CATEGORIES } from "../src/lib/docsCategories";

const BASE_URL = "https://llmclicks.ai";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

type DbRow = {
  slug: string;
  title?: string | null;
  hero_image?: string | null;
  poster?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  category_slug?: string | null;
};

async function fetchDb(): Promise<{
  blog: DbRow[]; docs: DbRow[]; kb: DbRow[]; stories: DbRow[];
} | null> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    const sb = createClient(url, key, { auth: { persistSession: false } });
    const [blog, docsR, kb, stories] = await Promise.all([
      sb.from("blog_posts").select("slug,title,hero_image,published_at,updated_at").eq("status", "published"),
      sb.from("docs_articles").select("slug,title,hero_image,published_at,updated_at").eq("status", "published"),
      sb.from("kb_articles").select("slug,title,hero_image,category_slug,published_at,updated_at").eq("status", "published"),
      sb.from("web_stories").select("slug,title,poster,published_at,updated_at").eq("status", "published"),
    ]);
    const err = blog.error || docsR.error || kb.error || stories.error;
    if (err) { console.warn("[sitemap] DB read error, using static fallback:", err.message); return null; }
    console.log(`[sitemap] DB rows  blog=${blog.data?.length ?? 0} docs=${docsR.data?.length ?? 0} kb=${kb.data?.length ?? 0} stories=${stories.data?.length ?? 0}`);
    return {
      blog: (blog.data as DbRow[]) ?? [],
      docs: (docsR.data as DbRow[]) ?? [],
      kb: (kb.data as DbRow[]) ?? [],
      stories: (stories.data as DbRow[]) ?? [],
    };
  } catch (e) {
    console.warn("[sitemap] DB fetch failed, using static fallback:", (e as Error).message);
    return null;
  }
}

function toISODate(input?: string): string {
  if (!input) return BUILD_DATE;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return BUILD_DATE;
  return d.toISOString().slice(0, 10);
}

function url(path: string): string {
  const withSlash = path === "/" || path.endsWith("/") ? path : `${path}/`;
  return `${BASE_URL}${withSlash}`;
}

interface Entry { path: string; lastmod: string; images?: { loc: string; title?: string }[]; }

function renderUrlset(entries: Entry[], withImages = false): string {
  const ns = withImages
    ? `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const body = entries.map((e) => {
    const lines = [
      `  <url>`,
      `    <loc>${url(e.path)}</loc>`,
      `    <lastmod>${e.lastmod}</lastmod>`,
    ];
    if (withImages && e.images?.length) {
      for (const img of e.images) {
        lines.push(`    <image:image>`);
        lines.push(`      <image:loc>${absUrl(img.loc)}</image:loc>`);
        if (img.title) lines.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
        lines.push(`    </image:image>`);
      }
    }
    lines.push(`  </url>`);
    return lines.join("\n");
  });
  return [`<?xml version="1.0" encoding="UTF-8"?>`, ns, ...body, `</urlset>`].join("\n");
}

function absUrl(loc: string): string {
  if (/^https?:\/\//i.test(loc)) return loc;
  return `${BASE_URL}${loc.startsWith("/") ? "" : "/"}${loc}`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// ----- Pages sitemap -----
const staticPages: Entry[] = [
  "/",
  "/about-us",
  "/pricing",
  "/contact",
  "/affiliate-program",
  "/ai-visibility-tool-comparison",
  "/industry-benchmarks",
  "/industries",
  "/industries/saas",
  "/industries/banking",
  "/industries/insurance",
  "/industries/education",
  "/industries/fashion",
  "/industries/ecommerce",
  "/industries/healthcare",
  "/industries/travel",
  "/industries/real-estate",
  "/industries/legal",
  "/privacy-policy",
  "/terms",
  "/blog",
  "/docs",
  "/knowledge-hub",
  "/web-stories",
  "/ai-visibility-audit",
  "/ai-visibility-tracker",
  "/ai-listicle-marketplace",
  "/on-page-optimiser",
  "/ai-query-mapper",
  "/llm-traffic-tracker",
  "/optimization-wizard",
  "/query-fan-out-coverage",
  "/content-comparison",
  "/content-embedding-analyzer",
  "/ai-visibility-checker",
  "/ai-readiness-analyzer",
  "/ai-domain-profiler",
].map((path) => ({ path, lastmod: BUILD_DATE }));

const categoryPages: Entry[] = indexableBlogCategories.map((c) => {
  const latest = posts
    .filter((p) => p.tag.toUpperCase() === c.tag.toUpperCase())
    .map((p) => toISODate(p.date))
    .sort()
    .pop();
  return { path: `/blog/category/${c.slug}`, lastmod: latest ?? BUILD_DATE };
});

const pagesEntries: Entry[] = staticPages;

function mergeByPath(...lists: Entry[][]): Entry[] {
  const map = new Map<string, Entry>();
  for (const list of lists) {
    for (const e of list) {
      const prev = map.get(e.path);
      // Keep the most recent lastmod; merge images.
      if (!prev) { map.set(e.path, e); continue; }
      const lastmod = prev.lastmod > e.lastmod ? prev.lastmod : e.lastmod;
      const images = [...(prev.images ?? []), ...(e.images ?? [])];
      map.set(e.path, { path: e.path, lastmod, ...(images.length ? { images } : {}) });
    }
  }
  return Array.from(map.values()).sort((a, b) => a.path.localeCompare(b.path));
}

async function main() {
  const db = await fetchDb();

  // ----- Blog (categories from static + posts from DB ∪ static) -----
  const blogPostEntriesStatic: Entry[] = posts.map((p) => ({
    path: `/blog/${p.slug}`, lastmod: toISODate(p.date),
  }));
  const blogPostEntriesDb: Entry[] = (db?.blog ?? []).map((r) => ({
    path: `/blog/${r.slug}`,
    lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
  }));
  const blogEntries: Entry[] = mergeByPath(categoryPages, blogPostEntriesDb, blogPostEntriesStatic);

  // ----- Docs -----
  const docsArticleEntriesStatic: Entry[] = docs.map((d) => ({
    path: `/docs/${d.slug}`, lastmod: toISODate(d.date),
  }));
  const docsArticleEntriesDb: Entry[] = (db?.docs ?? []).map((r) => ({
    path: `/docs/${r.slug}`,
    lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
  }));
  const docsCategoryEntries: Entry[] = DOCS_CATEGORIES.map((c) => {
    const latest = docs
      .filter((d) => d.category === c.title)
      .map((d) => toISODate(d.date))
      .sort()
      .pop();
    return { path: `/docs/category/${c.slug}`, lastmod: latest ?? BUILD_DATE };
  });
  const docsEntries: Entry[] = mergeByPath(docsCategoryEntries, docsArticleEntriesDb, docsArticleEntriesStatic);

  // ----- Knowledge Hub -----
  const khStatic: Entry[] = knowledgeHubCategories.flatMap((c) => {
    const articleEntries = c.articles.map((a) => ({
      path: `/knowledge-hub/${c.slug}/${a.slug}`,
      lastmod: toISODate(a.updated ?? a.date),
    }));
    const catLatest = articleEntries.map((a) => a.lastmod).sort().pop() ?? BUILD_DATE;
    return [{ path: `/knowledge-hub/${c.slug}`, lastmod: catLatest }, ...articleEntries];
  });
  const khDb: Entry[] = (db?.kb ?? [])
    .filter((r) => !!r.category_slug)
    .map((r) => ({
      path: `/knowledge-hub/${r.category_slug}/${r.slug}`,
      lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
    }));
  const khEntries: Entry[] = mergeByPath(khStatic, khDb);

  // ----- Web Stories -----
  const storiesStatic: Entry[] = webStories.map((s) => ({
    path: `/web-stories/${s.slug}`, lastmod: BUILD_DATE,
  }));
  const storiesDb: Entry[] = (db?.stories ?? []).map((r) => ({
    path: `/web-stories/${r.slug}`,
    lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
  }));
  const webStoryEntries: Entry[] = mergeByPath(storiesStatic, storiesDb);

  // ----- Image sitemap -----
  const imageStatic: Entry[] = [
    ...posts.filter((p) => !!p.image).map((p) => ({
      path: `/blog/${p.slug}`, lastmod: toISODate(p.date),
      images: [{ loc: p.image, title: p.title }],
    })),
    ...docs.filter((d) => !!d.image).map((d) => ({
      path: `/docs/${d.slug}`, lastmod: toISODate(d.date),
      images: [{ loc: d.image, title: d.title }],
    })),
    ...knowledgeHubCategories.flatMap((c) =>
      c.articles.filter((a) => !!a.image).map((a) => ({
        path: `/knowledge-hub/${c.slug}/${a.slug}`,
        lastmod: toISODate(a.updated ?? a.date),
        images: [{ loc: a.image, title: a.title }],
      })),
    ),
    ...webStories.filter((s) => !!s.poster).map((s) => ({
      path: `/web-stories/${s.slug}`, lastmod: BUILD_DATE,
      images: [{ loc: s.poster, title: s.title }],
    })),
  ];
  const imageDb: Entry[] = [
    ...(db?.blog ?? []).filter((r) => !!r.hero_image).map((r) => ({
      path: `/blog/${r.slug}`,
      lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
      images: [{ loc: r.hero_image as string, title: r.title ?? r.slug }],
    })),
    ...(db?.docs ?? []).filter((r) => !!r.hero_image).map((r) => ({
      path: `/docs/${r.slug}`,
      lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
      images: [{ loc: r.hero_image as string, title: r.title ?? r.slug }],
    })),
    ...(db?.kb ?? []).filter((r) => !!r.hero_image && !!r.category_slug).map((r) => ({
      path: `/knowledge-hub/${r.category_slug}/${r.slug}`,
      lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
      images: [{ loc: r.hero_image as string, title: r.title ?? r.slug }],
    })),
    ...(db?.stories ?? []).filter((r) => !!r.poster).map((r) => ({
      path: `/web-stories/${r.slug}`,
      lastmod: toISODate(r.updated_at ?? r.published_at ?? undefined),
      images: [{ loc: r.poster as string, title: r.title ?? r.slug }],
    })),
  ];
  const imageEntries: Entry[] = mergeByPath(imageStatic, imageDb);

  // ----- Write sub-sitemaps -----
  const sections: { file: string; entries: Entry[]; withImages?: boolean }[] = [
    { file: "pages-sitemap.xml", entries: pagesEntries },
    { file: "blog-sitemap.xml", entries: blogEntries },
    { file: "docs-sitemap.xml", entries: docsEntries },
    { file: "knowledge-hub-sitemap.xml", entries: khEntries },
    { file: "web-stories-sitemap.xml", entries: webStoryEntries },
    { file: "image-sitemap.xml", entries: imageEntries, withImages: true },
  ];

  for (const s of sections) {
    writeFileSync(resolve(`public/${s.file}`), renderUrlset(s.entries, s.withImages));
    console.log(`${s.file} written (${s.entries.length} entries)`);
  }

  const indexXml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...sections.map((s) =>
      [
        `  <sitemap>`,
        `    <loc>${BASE_URL}/${s.file}</loc>`,
        `    <lastmod>${BUILD_DATE}</lastmod>`,
        `  </sitemap>`,
      ].join("\n"),
    ),
    `</sitemapindex>`,
  ].join("\n");

  writeFileSync(resolve("public/sitemap.xml"), indexXml);
  console.log(`sitemap.xml index written (${sections.length} sitemaps)`);
}

main().catch((err) => { console.error(err); process.exit(1); });

