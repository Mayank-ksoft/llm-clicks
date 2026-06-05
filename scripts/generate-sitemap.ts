// Generates a sitemap index + per-section sitemaps with <lastmod> tags.
// Runs before dev/build via predev/prebuild npm hooks. Outputs into public/
// (Vite copies public/ into dist/ at build, so Vercel serves these at the root).
import { writeFileSync } from "fs";
import { resolve } from "path";
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";
import { indexableBlogCategories } from "../src/lib/blogCategories";
import { DOCS_CATEGORIES } from "../src/lib/docsCategories";

const BASE_URL = "https://llmclicks.ai";
const BUILD_DATE = new Date().toISOString().slice(0, 10);

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

// ----- Blog sitemap (taxonomy categories + posts) -----
const blogPostEntries: Entry[] = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  lastmod: toISODate(p.date),
}));

const blogEntries: Entry[] = [...categoryPages, ...blogPostEntries];

// ----- Docs sitemap -----
const docsCategoryEntries: Entry[] = DOCS_CATEGORIES.map((c) => {
  const latest = docs
    .filter((d) => d.category === c.title)
    .map((d) => toISODate(d.date))
    .sort()
    .pop();
  return { path: `/docs/category/${c.slug}`, lastmod: latest ?? BUILD_DATE };
}).filter((e) => e.lastmod);

const docsArticleEntries: Entry[] = docs.map((d) => ({
  path: `/docs/${d.slug}`,
  lastmod: toISODate(d.date),
}));

const docsEntries: Entry[] = [...docsCategoryEntries, ...docsArticleEntries];

// ----- Knowledge Hub sitemap -----
const khEntries: Entry[] = knowledgeHubCategories.flatMap((c) => {
  const articleEntries = c.articles.map((a) => ({
    path: `/knowledge-hub/${c.slug}/${a.slug}`,
    lastmod: toISODate(a.updated ?? a.date),
  }));
  const catLatest = articleEntries.map((a) => a.lastmod).sort().pop() ?? BUILD_DATE;
  return [{ path: `/knowledge-hub/${c.slug}`, lastmod: catLatest }, ...articleEntries];
});

// ----- Web Stories sitemap -----
const webStoryEntries: Entry[] = webStories.map((s) => ({
  path: `/web-stories/${s.slug}`,
  lastmod: BUILD_DATE,
}));

// ----- Image sitemap (blog, docs, KH, web stories hero/poster images) -----
const imageEntries: Entry[] = [
  ...posts
    .filter((p) => !!p.image)
    .map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: toISODate(p.date),
      images: [{ loc: p.image, title: p.title }],
    })),
  ...docs
    .filter((d) => !!d.image)
    .map((d) => ({
      path: `/docs/${d.slug}`,
      lastmod: toISODate(d.date),
      images: [{ loc: d.image, title: d.title }],
    })),
  ...knowledgeHubCategories.flatMap((c) =>
    c.articles
      .filter((a) => !!a.image)
      .map((a) => ({
        path: `/knowledge-hub/${c.slug}/${a.slug}`,
        lastmod: toISODate(a.updated ?? a.date),
        images: [{ loc: a.image, title: a.title }],
      })),
  ),
  ...webStories
    .filter((s) => !!s.poster)
    .map((s) => ({
      path: `/web-stories/${s.slug}`,
      lastmod: BUILD_DATE,
      images: [{ loc: s.poster, title: s.title }],
    })),
];

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

// ----- Sitemap index -----
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
