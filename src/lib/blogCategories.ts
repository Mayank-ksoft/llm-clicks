export type BlogCategory = {
  tag: string;
  slug: string;
  label: string;
  description: string;
  indexable: boolean;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    tag: "STRATEGY",
    slug: "strategy",
    label: "Strategy",
    description: "High-level playbooks for winning AI search and protecting pipeline.",
    indexable: true,
  },
  {
    tag: "GUIDE",
    slug: "guides",
    label: "Guides",
    description: "Step-by-step tutorials and how-tos for GEO and AI visibility.",
    indexable: true,
  },
  {
    tag: "COMPARISON",
    slug: "comparisons",
    label: "Comparisons",
    description: "Tool, platform, and engine comparisons for informed decisions.",
    indexable: true,
  },
  {
    tag: "PRODUCT UPDATE",
    slug: "product-updates",
    label: "Product Updates",
    description: "What's new in LLMClicks.ai — features, releases, and improvements.",
    indexable: true,
  },
  {
    tag: "CASE STUDY",
    slug: "case-studies",
    label: "Case Studies",
    description: "Real customer wins and measurable AI visibility outcomes.",
    indexable: true,
  },
  {
    tag: "BENCHMARK",
    slug: "ai-visibility-benchmarks",
    label: "AI Visibility Benchmarks",
    description: "Original data, benchmarks, and research across LLM engines.",
    indexable: true,
  },
  {
    tag: "PROGRAM",
    slug: "programs",
    label: "Programs",
    description: "Partner, affiliate, and community program announcements.",
    indexable: true,
  },
  {
    tag: "TRENDS",
    slug: "trends",
    label: "Trends",
    description: "Emerging shifts in AI search, agents, and generative discovery.",
    indexable: true,
  },
  {
    tag: "FRAMEWORK",
    slug: "frameworks",
    label: "Frameworks",
    description: "Repeatable frameworks and mental models for AI SEO teams.",
    indexable: true,
  },
  {
    tag: "TOOLS",
    slug: "tools",
    label: "Tools",
    description: "Free utilities, calculators, and resources for marketers.",
    indexable: true,
  },
  {
    tag: "AUDIT",
    slug: "audits",
    label: "Audits",
    description: "Audit playbooks for diagnosing AI visibility gaps.",
    indexable: true,
  },
  {
    tag: "REPUTATION",
    slug: "reputation",
    label: "Reputation",
    description: "Brand safety, sentiment, and reputation in AI answers.",
    indexable: false,
  },
];

export const indexableBlogCategories = BLOG_CATEGORIES.filter((category) => category.indexable);

export function getBlogCategoryBySlug(slug: string | undefined): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function getBlogCategoryByTag(tag: string | undefined): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.tag === tag?.toUpperCase());
}

export function blogCategoryPath(tagOrSlug: string): string {
  const category = getBlogCategoryByTag(tagOrSlug) ?? getBlogCategoryBySlug(tagOrSlug);
  if (category) return `/blog/category/${category.slug}`;
  // Admin-created categories (not in the hardcoded list) — fall back to a
  // slugified form of the tag so links still resolve once the public
  // categories hook adds them at runtime.
  const slug = tagOrSlug
    ?.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug ? `/blog/category/${slug}` : "/blog";
}