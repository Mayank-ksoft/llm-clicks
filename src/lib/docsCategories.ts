export type DocsCategory = {
  title: string;
  slug: string;
  description: string;
};

export const DOCS_CATEGORIES: DocsCategory[] = [
  { title: "Getting Started", slug: "getting-started", description: "Set up your account, invite your team, and configure your workspace." },
  { title: "Visibility Tracking", slug: "visibility-tracking", description: "Track AI visibility over time, monitor competitors, and analyze citations." },
  { title: "On-Page Optimization", slug: "on-page-optimization", description: "Use the Optimizer, Embedding Analyzer, and Content Comparison tools." },
  { title: "AI Query Mapping", slug: "ai-query-mapping", description: "Map AI-style queries to the right pages and solve cannibalization." },
  { title: "Audits & Profiling", slug: "audits-and-profiling", description: "Run audits, profile your domain, and interpret AI visibility results." },
  { title: "Account & Marketplace", slug: "account-and-marketplace", description: "Manage settings, leads, and the AI Listicle Marketplace." },
];

export function getDocsCategoryBySlug(slug: string | undefined): DocsCategory | undefined {
  return DOCS_CATEGORIES.find((c) => c.slug === slug);
}

export function getDocsCategoryByTitle(title: string | undefined): DocsCategory | undefined {
  if (!title) return undefined;
  return DOCS_CATEGORIES.find((c) => c.title.toLowerCase() === title.toLowerCase());
}

export function docsCategoryPath(title: string): string {
  const c = getDocsCategoryByTitle(title);
  return c ? `/docs/category/${c.slug}` : "/docs";
}