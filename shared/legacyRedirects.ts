export type LegacyRedirectMatch = {
  destination: string;
  statusCode: 301 | 302 | 410;
};

type ExactRedirect = {
  source: string;
  destination: string;
};

const exactRedirects: ExactRedirect[] = [
  { source: "/blog/how-to-measure-ai-search-visibility", destination: "/blog/ai-visibility-measurement-guide" },
  { source: "/blog/llm-seo-vs-traditional-seo", destination: "/blog/llm-visibility-vs-traditional-seo" },
  { source: "/blog/how-to-audit-your-website-for-ai-search-readiness", destination: "/blog/ai-search-readiness-audit" },
  { source: "/ai-seo-general-insurance-chatgpt-benchmark", destination: "/blog/category/ai-visibility-benchmarks" },
  { source: "/chatgpt-as-gtm-strategist-llmclicks-case-study", destination: "/blog/chatgpt-as-gtm-strategist-llmclicks-case-study" },
  { source: "/ai-visibility-benchmark-general-insurance-2025", destination: "/blog/ai-visibility-benchmark-general-insurance-2025" },
  { source: "/ai-visibility-benchmark-general-insurance-india-2025", destination: "/blog/ai-visibility-benchmark-general-insurance-india-2025" },
  { source: "/category/ai-visibility-benchmark", destination: "/blog/category/ai-visibility-benchmarks" },
  { source: "/blog/category/latest-updates", destination: "/blog/category/product-updates" },
  { source: "/category/learning", destination: "/blog/category/guides" },
  { source: "/category/learning/feed", destination: "/blog/category/guides" },
  { source: "/docs-category/free-tools", destination: "/docs" },
  { source: "/tag/insurance-marketing-2025", destination: "/blog/ai-visibility-benchmark-general-insurance-usa-2025" },
  { source: "/tag/ai-seo-for-insurance", destination: "/blog/ai-visibility-benchmark-general-insurance-usa-2025" },
  { source: "/tag/ai-visibility-benchmark", destination: "/blog/category/ai-visibility-benchmarks" },
  { source: "/tag/llmclicks-ai", destination: "/" },
  { source: "/support", destination: "/contact" },
  { source: "/author/llmclicks", destination: "/author/shripad-deshmukh" },
  { source: "/blog/updates", destination: "/blog/category/product-updates" },
];

function normalizePath(pathname: string): string {
  const path = pathname.split("?")[0] || "/";
  return path.length > 1 ? path.replace(/\/+$/, "") : "/";
}

export function getLegacyRedirect(pathname: string, search = ""): LegacyRedirectMatch | null {
  const normalized = normalizePath(pathname);
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);

  if (normalized === "/" && params.get("post_type") === "web-story") {
    return { destination: "/web-stories", statusCode: 301 };
  }

  // Elementor library query-string redirects (legacy WordPress template URLs)
  const elementorLib = params.get("elementor_library");
  if (normalized === "/" && elementorLib) {
    const elementorRedirects: Record<string, string> = {
      "global-footer-2": "/",
      "docs-category": "/",
      "elementor-header-6690": "/",
      "global-kit-styles": "/",
      "knowledge-hub-main-index": "/knowledge-hub",
      "knowledge-hub-silo-pillar": "/knowledge-hub",
      "knowledge-hub-single-article": "/knowledge-hub",
      "llmclicks-ai-global-blog-post-template": "/blog",
      "search-results": "/",
      "web-stories-archive": "/web-stories",
    };
    const dest = elementorRedirects[elementorLib];
    if (dest) return { destination: dest, statusCode: 301 };
  }

  const exact = exactRedirects.find((redirect) => redirect.source === normalized);
  if (exact) return { destination: exact.destination, statusCode: 301 };

  // Legacy WP pagination & category aliases. CRITICAL: never return the same
  // path we received, or we'll 301-loop (which is what broke
  // /blog/category/guides in production).
  const categoryAliases: Record<string, string> = {
    learning: "guides",
    "latest-updates": "product-updates",
    "ai-visibility-benchmark": "ai-visibility-benchmarks",
  };
  const catMatch = normalized.match(/^\/(?:blog\/)?category\/([^/]+)(\/page\/\d+|\/feed)?$/i);
  if (catMatch) {
    const slug = catMatch[1].toLowerCase();
    const hasLegacyPrefix = normalized.startsWith("/category/");
    const hasSuffix = Boolean(catMatch[2]);
    const aliased = categoryAliases[slug];
    if (hasLegacyPrefix || aliased || hasSuffix) {
      const destSlug = aliased ?? slug;
      const destination = `/blog/category/${destSlug}`;
      if (destination !== normalized) {
        return { destination, statusCode: 301 };
      }
    }
  }
  const pageStrip = normalized.match(/^(\/blog(?:\/category\/[^/]+)?)\/page\/\d+$/i);
  if (pageStrip && pageStrip[1] !== normalized) {
    return { destination: pageStrip[1], statusCode: 301 };
  }

  // Block legacy WordPress admin / plugin / php endpoints with 410 Gone.
  // IMPORTANT: do NOT 410 /wp-content/uploads/* — those paths still serve
  // legacy blog/doc images referenced by existing posts. Blocking them
  // breaks images on the live blog. Only admin, plugins, and wp-*.php
  // entry points are removed for good.
  if (
    normalized === "/wp-admin" ||
    normalized.startsWith("/wp-admin/") ||
    normalized.startsWith("/wp-content/plugins/") ||
    /^\/wp-[^/]+\.php$/i.test(normalized)
  ) {
    return { destination: "/api/gone", statusCode: 410 };
  }

  return null;
}
