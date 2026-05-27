// Post-build prerender: for every known route, write dist/<route>/index.html
// with per-route <title>, <meta description>, <link canonical>, and og:* tags
// injected into the static index.html template. This makes non-JS crawlers
// (LinkedIn, Slack, SEOptimer, etc.) see the correct canonical for each page,
// since Vercel serves static files and doesn't run our Express server.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import pageMetaData from "../shared/pageMeta.json" with { type: "json" };
import { posts } from "../src/data/blogPosts";
import { docs } from "../src/data/docsArticles";
import { knowledgeHubCategories } from "../src/data/knowledgeHub";
import { webStories } from "../src/data/webStories";

const SITE_ORIGIN = "https://llmclicks.ai";
const DIST = resolve("dist");
const TEMPLATE_PATH = join(DIST, "index.html");

const META = pageMetaData as {
  default: { title: string; description: string };
  routes: Record<string, { title: string; description: string }>;
};

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
  if (normalized.startsWith("/blog/")) {
    const name = titleCase(normalized.replace("/blog/", ""));
    return {
      title: `${name} | LLMClicks.ai Blog`,
      description: `${name} — insights on AI visibility and LLM SEO from LLMClicks.ai.`,
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
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  return normalized === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${normalized}/`;
}

function escapeAttr(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMeta(html: string, pathname: string): string {
  const { title, description } = metaForPath(pathname);
  const canonical = canonicalForPath(pathname);
  const t = escapeAttr(title);
  const d = escapeAttr(description);

  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${d}" />`,
    )
    .replace(
      /<meta\s+property="og:title"[^>]*>/i,
      `<meta property="og:title" content="${t}" />`,
    )
    .replace(
      /<meta\s+property="og:description"[^>]*>/i,
      `<meta property="og:description" content="${d}" />`,
    )
    .replace(
      /<meta\s+property="og:url"[^>]*>/i,
      `<meta property="og:url" content="${canonical}" />`,
    )
    .replace(
      /<meta\s+name="twitter:title"[^>]*>/i,
      `<meta name="twitter:title" content="${t}" />`,
    )
    .replace(
      /<meta\s+name="twitter:description"[^>]*>/i,
      `<meta name="twitter:description" content="${d}" />`,
    );

  if (!/<link\s+rel="canonical"/i.test(out)) {
    out = out.replace(
      /(<meta\s+name="description"[^>]*>)/i,
      `$1\n    <link rel="canonical" href="${canonical}" />`,
    );
  } else {
    out = out.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${canonical}" />`,
    );
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

const template = readFileSync(TEMPLATE_PATH, "utf8");

const routes = new Set<string>(["/"]);
for (const k of Object.keys(META.routes)) routes.add(k);
posts.forEach((p) => routes.add(`/blog/${p.slug}`));
docs.forEach((d) => routes.add(`/docs/${d.slug}`));
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
