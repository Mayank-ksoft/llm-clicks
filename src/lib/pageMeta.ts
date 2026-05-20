// Per-route SEO metadata. Layout reads from this map based on pathname
// so every page ships its own title, description, canonical, and OG tags.

export type PageMeta = {
  title: string;
  description: string;
};

export const SITE_ORIGIN = "https://llmclicks.ai";

const DEFAULT_DESCRIPTION =
  "#1 AI visibility tool & SEO audit for marketing teams. Monitor brand mentions, benchmark competitors, and optimize citations across all major LLMs.";

export const DEFAULT_META: PageMeta = {
  title: "AI Visibility Tracker & Audit: ChatGPT & Perplexity | LLMClicks.ai",
  description: DEFAULT_DESCRIPTION,
};

// Static, exact-path overrides. Keys are normalized (no trailing slash).
const STATIC_META: Record<string, PageMeta> = {
  "/": DEFAULT_META,
  "/about-us": {
    title: "About LLMClicks.ai | Our Mission to Improve AI Visibility",
    description:
      "We help brands appear in AI search results. LLMClicks.ai is trusted by agencies and marketers to track, analyze, and boost visibility across ChatGPT and beyond.",
  },
  "/pricing": {
    title: "Pricing Plans | LLMClicks.ai AI Visibility Tracker",
    description:
      "Simple, transparent pricing for AI visibility tracking and audits. Choose the plan that fits your team and start optimizing for ChatGPT, Gemini, and Perplexity.",
  },
  "/contact": {
    title: "Contact LLMClicks.ai | Talk to Our AI Visibility Team",
    description:
      "Get in touch with the LLMClicks.ai team. Ask about pricing, demos, partnerships, or how to improve your brand visibility across AI search engines.",
  },
  "/thank-you": {
    title: "Thank You | LLMClicks.ai",
    description: "Thanks for reaching out to LLMClicks.ai. Our team will get back to you shortly.",
  },
  "/affiliate-program": {
    title: "Affiliate Program | Earn With LLMClicks.ai",
    description:
      "Join the LLMClicks.ai affiliate program and earn recurring commissions by referring marketers and agencies to the leading AI visibility platform.",
  },
  "/ai-visibility-tool-comparison": {
    title: "AI Visibility Tool Comparison | LLMClicks.ai vs Alternatives",
    description:
      "Compare LLMClicks.ai with other AI visibility tools. See features, pricing, and accuracy across ChatGPT, Gemini, Claude, and Perplexity tracking.",
  },
  "/industry-benchmarks": {
    title: "Industry Benchmarks | AI Visibility Insights by LLMClicks.ai",
    description:
      "Explore AI visibility benchmarks across industries. See how brands rank inside ChatGPT, Perplexity, and other AI search engines.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | LLMClicks.ai",
    description: "Read the LLMClicks.ai privacy policy to learn how we collect, use, and protect your data.",
  },
  "/terms": {
    title: "Terms of Service | LLMClicks.ai",
    description: "Read the LLMClicks.ai terms of service governing use of our AI visibility platform.",
  },
  "/blog": {
    title: "Blog | AI Search, LLM SEO & Visibility Insights | LLMClicks.ai",
    description:
      "Insights, guides, and case studies on AI search, LLM SEO, and how to grow brand visibility across ChatGPT, Gemini, Claude, and Perplexity.",
  },
  "/docs": {
    title: "Documentation | LLMClicks.ai",
    description:
      "Documentation for LLMClicks.ai — set up projects, run audits, track AI visibility, and integrate with your workflow.",
  },
  "/knowledge-hub": {
    title: "Knowledge Hub | LLMClicks.ai",
    description:
      "The LLMClicks.ai Knowledge Hub: deep guides on AI visibility, generative search, and optimizing for LLM-powered discovery.",
  },
  "/web-stories": {
    title: "Web Stories | LLMClicks.ai",
    description: "Visual web stories on AI visibility, LLM SEO, and AI-powered search trends from LLMClicks.ai.",
  },
  "/ai-visibility-audit": {
    title: "AI Visibility Audit | LLMClicks.ai",
    description:
      "Run a deep AI visibility audit for your brand. Discover how ChatGPT, Gemini, and Perplexity describe and cite you — and what to fix.",
  },
  "/ai-visibility-tracker": {
    title: "AI Visibility Tracker | LLMClicks.ai",
    description:
      "Track your brand's visibility across ChatGPT, Gemini, Claude, and Perplexity over time with the LLMClicks.ai AI Visibility Tracker.",
  },
  "/ai-listicle-marketplace": {
    title: "AI Listicle Marketplace | LLMClicks.ai",
    description:
      "Get featured in high-authority AI listicles that LLMs cite. Browse the LLMClicks.ai listicle marketplace and grow AI visibility.",
  },
  "/on-page-optimiser": {
    title: "On-Page Optimiser | LLMClicks.ai",
    description:
      "Optimize every page for AI search. The LLMClicks.ai on-page optimiser scores content and tells you exactly what to fix for LLM visibility.",
  },
  "/ai-query-mapper": {
    title: "AI Query Mapper | LLMClicks.ai",
    description:
      "Map the AI queries that matter for your brand. See which prompts trigger you in ChatGPT, Gemini, and Perplexity with the LLMClicks.ai Query Mapper.",
  },
  "/llm-traffic-tracker": {
    title: "LLM Traffic Tracker | LLMClicks.ai",
    description:
      "Measure real traffic coming from LLMs. The LLMClicks.ai LLM traffic tracker attributes visits from ChatGPT, Gemini, Claude, and Perplexity.",
  },
  "/optimization-wizard": {
    title: "Optimization Wizard | LLMClicks.ai",
    description:
      "A guided wizard that walks you through optimizing your site for AI visibility step by step. Built for marketers and SEO teams.",
  },
  "/query-fan-out-coverage": {
    title: "Query Fan-Out Coverage | LLMClicks.ai",
    description:
      "See how well your content covers the fan-out queries LLMs generate. Close gaps and win more AI citations with LLMClicks.ai.",
  },
  "/content-comparison": {
    title: "Content Comparison | LLMClicks.ai",
    description:
      "Compare your content against the pages LLMs actually cite. Identify gaps and craft content that earns AI visibility.",
  },
  "/content-embedding-analyzer": {
    title: "Content Embedding Analyzer | LLMClicks.ai",
    description:
      "Analyze how LLMs embed and interpret your content. The LLMClicks.ai embedding analyzer surfaces semantic gaps and opportunities.",
  },
  "/ai-visibility-checker": {
    title: "Free AI Visibility Checker | LLMClicks.ai",
    description:
      "Free tool: check how visible your brand is across ChatGPT, Gemini, Claude, and Perplexity in seconds with LLMClicks.ai.",
  },
  "/ai-readiness-analyzer": {
    title: "Free AI Readiness Analyzer | LLMClicks.ai",
    description:
      "Is your site ready for AI search? Run the free LLMClicks.ai AI Readiness Analyzer and get an instant readiness score.",
  },
  "/ai-domain-profiler": {
    title: "Free AI Domain Profiler | LLMClicks.ai",
    description:
      "Profile any domain through the lens of AI search. See how LLMs describe a brand with the free LLMClicks.ai domain profiler.",
  },
};

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

  // Dynamic patterns
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
    const parts = normalized.split("/").filter(Boolean); // ["knowledge-hub", category, slug?]
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