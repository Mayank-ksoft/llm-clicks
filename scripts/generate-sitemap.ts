// Generates public/sitemap.xml. Runs before dev/build via predev/prebuild scripts.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";
import { indexableBlogCategories } from "../src/lib/blogCategories";

const BASE_URL = "https://llmclicks.ai";

interface Entry { path: string; changefreq?: string; priority?: string; }

const staticPaths: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about-us", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.9" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
  { path: "/affiliate-program", changefreq: "monthly", priority: "0.6" },
  { path: "/ai-visibility-tool-comparison", changefreq: "monthly", priority: "0.7" },
  { path: "/industry-benchmarks", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/docs", changefreq: "weekly", priority: "0.7" },
  { path: "/knowledge-hub", changefreq: "weekly", priority: "0.8" },
  { path: "/web-stories", changefreq: "weekly", priority: "0.6" },
  // Feature pages
  { path: "/ai-visibility-audit", priority: "0.8" },
  { path: "/ai-visibility-tracker", priority: "0.8" },
  { path: "/ai-listicle-marketplace", priority: "0.8" },
  { path: "/on-page-optimiser", priority: "0.8" },
  { path: "/ai-query-mapper", priority: "0.8" },
  { path: "/llm-traffic-tracker", priority: "0.8" },
  { path: "/optimization-wizard", priority: "0.8" },
  { path: "/query-fan-out-coverage", priority: "0.8" },
  { path: "/content-comparison", priority: "0.8" },
  { path: "/content-embedding-analyzer", priority: "0.8" },
  // Free tools
  { path: "/ai-visibility-checker", priority: "0.7" },
  { path: "/ai-readiness-analyzer", priority: "0.7" },
  { path: "/ai-domain-profiler", priority: "0.7" },
];

const entries: Entry[] = [
  ...staticPaths,
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, changefreq: "monthly", priority: "0.7" })),
  ...indexableBlogCategories.map((c) => ({ path: `/blog/category/${c.slug}`, changefreq: "weekly", priority: "0.6" })),
  ...docs.map((d) => ({ path: `/docs/${d.slug}`, changefreq: "monthly", priority: "0.6" })),
  ...webStories.map((s) => ({ path: `/web-stories/${s.slug}`, changefreq: "monthly", priority: "0.5" })),
  ...knowledgeHubCategories.flatMap((c) => [
    { path: `/knowledge-hub/${c.slug}`, changefreq: "monthly", priority: "0.6" },
    ...c.articles.map((a) => ({ path: `/knowledge-hub/${c.slug}/${a.slug}`, changefreq: "monthly", priority: "0.6" })),
  ]),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
