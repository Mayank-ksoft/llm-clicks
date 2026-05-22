// Per-route JSON-LD structured data. Inject via Helmet in Layout.
// Sourced from the LLMClicks.ai schema spec (Software Application Schema column).
import schemas from "@/data/schemas/schemas.json";

const ROUTE_TO_KEY: Record<string, keyof typeof schemas> = {
  "/": "home",
  "/ai-visibility-audit": "ai-visibility-audit",
  "/ai-visibility-tracker": "ai-visibility-tracker",
  "/on-page-optimiser": "on-page-optimiser",
  "/query-fan-out-coverage": "query-fan-out-coverage",
  "/content-embedding-analyzer": "content-embedding-analyzer",
  "/ai-query-mapper": "ai-query-mapper",
  "/industry-benchmarks": "industry-benchmarks",
  "/llm-traffic-tracker": "llm-traffic-tracker",
  "/pricing": "pricing",
  "/ai-readiness-analyzer": "ai-readiness-analyzer",
  "/ai-domain-profiler": "ai-domain-profiler",
  "/ai-visibility-checker": "ai-visibility-checker",
  "/optimization-wizard": "optimization-wizard",
  "/ai-listicle-marketplace": "ai-listicle-marketplace",
};

export function getPageSchema(pathname: string): string | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const key = ROUTE_TO_KEY[normalized];
  if (!key) return null;
  const data = (schemas as Record<string, unknown>)[key];
  if (!data) return null;
  // Escape </script> for safe inline embedding.
  return JSON.stringify(data).replace(/<\/script/gi, "<\\/script");
}