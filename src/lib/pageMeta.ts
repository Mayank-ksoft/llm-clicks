// Per-route SEO metadata. Layout reads from this map based on pathname
// so every page ships its own title, description, canonical, and OG tags.
//
// Source of truth: /shared/pageMeta.json (also consumed by server/index.ts
// to inject per-route <title>/<meta description>/<link canonical> into the
// served index.html so non-JS crawlers see the correct tags).

import metaData from "../../shared/pageMeta.json";
import { getBlogCategoryBySlug } from "./blogCategories";

export type PageMeta = {
  title: string;
  description: string;
};

export const SITE_ORIGIN = "https://llmclicks.ai";

export const DEFAULT_META: PageMeta = (metaData as { default: PageMeta }).default;

// Static, exact-path overrides. Keys are normalized (no trailing slash).
const STATIC_META: Record<string, PageMeta> = {
  "/": DEFAULT_META,
  ...((metaData as { routes: Record<string, PageMeta> }).routes),
};

// Build a canonical URL WITH a trailing slash (except root "/").
// Matches the site's trailing-slash redirect policy on Vercel, so the
// canonical, og:url, and rendered URL are always identical.
export function getCanonicalUrl(pathname: string): string {
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (trimmed === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${trimmed}/`;
}



function titleCase(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getPageMeta(pathname: string): PageMeta {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  const exact = STATIC_META[normalized];
  if (exact) return exact;

  // Dynamic fallbacks for pages not explicitly listed in the spreadsheet.
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
    const slug = normalized.replace("/blog/", "");
    const name = titleCase(slug);
    return {
      title: `${name} | LLMClicks.ai Blog`,
      description: `${name} — insights on AI visibility and LLM SEO from LLMClicks.ai.`,
    };
  }
  if (normalized.startsWith("/docs/")) {
    const slug = normalized.replace("/docs/", "");
    const name = titleCase(slug);
    return {
      title: `${name} | LLMClicks.ai Docs`,
      description: `Documentation: ${name}. Learn how to use LLMClicks.ai effectively.`,
    };
  }
  if (normalized.startsWith("/knowledge-hub/")) {
    const parts = normalized.split("/").filter(Boolean);
    const last = parts[parts.length - 1] ?? "";
    const name = titleCase(last);
    return {
      title: `${name} | LLMClicks.ai Knowledge Hub`,
      description: `${name} — explore the LLMClicks.ai Knowledge Hub for AI visibility insights.`,
    };
  }
  if (normalized.startsWith("/web-stories/")) {
    const slug = normalized.replace("/web-stories/", "");
    const name = titleCase(slug);
    return {
      title: `${name} | LLMClicks.ai Web Stories`,
      description: `${name} — a visual story on AI visibility from LLMClicks.ai.`,
    };
  }
  if (normalized.startsWith("/features/") || normalized.startsWith("/tools/")) {
    const slug = normalized.split("/").pop() ?? "";
    const name = titleCase(slug);
    return {
      title: `${name} | LLMClicks.ai`,
      description: `${name} on LLMClicks.ai — built for AI search visibility.`,
    };
  }

  return DEFAULT_META;
}
