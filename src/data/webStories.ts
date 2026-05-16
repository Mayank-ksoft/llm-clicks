// Web Stories data — bite-sized swipeable stories for AI visibility / GEO topics.
// URL structure mirrors the live site: /web-stories and /web-stories/:slug

export interface StorySlide {
  heading: string;
  body: string;
  /** Optional CTA shown on the slide (typically the final slide). */
  cta?: { label: string; href: string };
}

export interface WebStory {
  slug: string;
  title: string;
  poster: string;
  posterAlt: string;
  /** Short summary used for SEO description. */
  excerpt: string;
  slides: StorySlide[];
}

export const webStories: WebStory[] = [
  {
    slug: "chatgpt-stealing-clicks",
    title: "ChatGPT is Stealing Your Clicks. Here is How to Steal Them Back.",
    poster:
      "https://llmclicks.ai/wp-content/uploads/2026/04/chatgpt-stealing-search-clicks-web-story-poster.webp",
    posterAlt:
      "ChatGPT is Stealing Your Clicks. Here is How to Steal Them Back.",
    excerpt:
      "Why traditional search is bleeding traffic to ChatGPT — and the GEO playbook to win back the citation.",
    slides: [
      {
        heading: "Traditional search is bleeding traffic.",
        body: "ChatGPT Search and AI agents are bypassing your website entirely. They are giving users the answers directly. Are you ready for the Zero-Click era?",
      },
      {
        heading: "Keywords are dead. Entities rule.",
        body: "Large Language Models do not care about your keyword density. They care about absolute Entity Trust. If your brand entity is weak, you disappear from the prompt response.",
      },
      {
        heading: "The AI is pitching your rivals.",
        body: "If an LLM cannot instantly verify your authority, it will confidently recommend your competitors to your own customers. You are losing leads to AI hallucinations.",
      },
      {
        heading: "Enter Generative Engine Optimization (GEO).",
        body: "You can no longer optimize just for crawlers. You must optimize for the training data. You need to force the LLMs to cite your brand as the undeniable industry standard.",
      },
      {
        heading: "Dominate the architecture.",
        body: "You build trust through high-authority infrastructure. Deploying Cloud Entity Boosters on trusted static hosting nodes forces AI models to recognize and cite your dominance.",
      },
      {
        heading: "Stop guessing. Start tracking.",
        body: "Take control of your AI narrative. See exactly how ChatGPT, Gemini, and Perplexity rank your brand in real-time.",
        cta: { label: "Track Your Brand Now", href: "/ai-visibility-checker" },
      },
    ],
  },
  {
    slug: "fix-ai-brand-hallucinations",
    title: "Alert: ChatGPT is Lying About Your SaaS. Fix It Today.",
    poster:
      "https://llmclicks.ai/wp-content/uploads/2026/04/ai-hallucination-cover.webp",
    posterAlt: "Alert: ChatGPT is Lying About Your SaaS. Fix It Today.",
    excerpt:
      "Detect and overwrite AI hallucinations about your SaaS — schema, RAG, and a dedicated LLM training page.",
    slides: [
      {
        heading: "Is ChatGPT Lying About Your SaaS?",
        body: "AI engines do not browse the live web. They guess based on static data. If your pricing changed recently, ChatGPT is hallucinating false information to your prospects right now.",
      },
      {
        heading: "The Hallucination Engine",
        body: "LLMs are prediction engines. When they lack hard facts, they guess. This creates invented negative reviews and fake bug reports, presented to your buyers as absolute truth.",
      },
      {
        heading: "Force-Feed the Knowledge Graph",
        body: "You cannot email OpenAI for fixes. You must overwrite their training data. Deploy strict Organization and SoftwareApplication JSON-LD to lock down your core facts.",
      },
      {
        heading: "Dominate the RAG Pipeline",
        body: "Modern AI search relies on Retrieval-Augmented Generation (RAG). To inject fresh data, secure brand mentions on high-authority platforms like G2 and distribute technical press releases.",
      },
      {
        heading: "LLM Training Page",
        body: "Build a pure markdown LLM training page. Detail exact pricing and features. Eliminate marketing fluff. Use strict H2 and H3 structures so AI crawler bots can parse your data.",
      },
      {
        heading: 'Check Your "Share of Model" Health',
        body: "Do not wait for a lost enterprise deal to find an AI hallucination. Run our deep-scan technical audit to see exactly what ChatGPT and Perplexity are telling your buyers today.",
        cta: { label: "Run Free Audit", href: "/ai-visibility-audit" },
      },
    ],
  },
  {
    slug: "reverse-engineer-perplexity-seo",
    title: "Exposed: How to Steal Traffic and Reverse Engineer Perplexity",
    poster:
      "https://llmclicks.ai/wp-content/uploads/2026/04/reverse-engineer-perplexity-seo.webp",
    posterAlt: "Exposed: How to Steal Traffic and Reverse Engineer Perplexity",
    excerpt:
      "The technical blueprint to win Perplexity citations: semantic HTML, nested schema, and indexing velocity.",
    slides: [
      {
        heading: "How to Reverse Engineer Perplexity SEO",
        body: "Perplexity is actively replacing informational SaaS queries. Stop guessing how its algorithm chooses citations. Here is the technical blueprint to secure your brand mentions.",
      },
      {
        heading: "The End of Fluff",
        body: "Perplexity does not crawl like standard Googlebot. It hunts for high-density facts and established entities. If your landing pages rely on vague marketing copy, the LLM will completely bypass your domain.",
      },
      {
        heading: "Markdown & Semantic HTML5",
        body: "LLMs parse content through clean structural formatting. You must build your pages with strict H2 and H3 nesting. Deploy bulleted lists and HTML tables to force the engine to extract your data easily.",
      },
      {
        heading: "Advanced JSON-LD Schema",
        body: "Keyword stuffing is obsolete. You must inject nested structured data into your headers. Clearly define your software category and link to authoritative SameAs properties to establish unquestionable trust.",
      },
      {
        heading: "Indexing Velocity",
        body: "Perplexity aggressively prioritizes recent information. Your technical architecture must support automated timestamp updates and instant XML sitemap pinging to feed the engine fresh data.",
      },
      {
        heading: "Steal Our Perplexity Research.",
        body: "We tested 30 specific SaaS prompts to reverse engineer the exact citation algorithm. Download the complete case study to see the raw data and copy our framework.",
        cta: { label: "Download Case Study", href: "/blog" },
      },
    ],
  },
  {
    slug: "ai-visibility-tracker-tools",
    title: "Alert: You Are Losing AI Traffic. Top SaaS Trackers (2026)",
    poster:
      "https://llmclicks.ai/wp-content/uploads/2026/03/poster-image-1.jpg.webp",
    posterAlt: "Alert: You Are Losing AI Traffic. Top SaaS Trackers (2026)",
    excerpt:
      "Compare the top AI visibility trackers — and see why a complete GEO engine beats basic prompt monitoring.",
    slides: [
      {
        heading: "Is your SaaS invisible to ChatGPT and Perplexity?",
        body: "Traditional SEO is dead. Generative Engine Optimization is taking over. Discover the top AI visibility trackers to protect your pipeline.",
      },
      {
        heading: "The Zero-Click Reality",
        body: "If AI engines skip your software, competitors steal your customers directly inside the chat interface. You must track your mentions immediately.",
      },
      {
        heading: "Basic Prompt Monitoring",
        body: "Standard trackers reveal what your target market asks LLMs. They provide great keyword data but completely lack actionable steps for ranking.",
      },
      {
        heading: "Share of Voice Analytics",
        body: "See exactly how often AI recommends you versus your rivals. This exposes critical gaps but leaves you guessing how to fix the code.",
      },
      {
        heading: "The Complete GEO Engine",
        body: "Go beyond basic tracking. LLMClicks monitors brand mentions, detects dangerous AI hallucinations, and gives you the exact blueprint to dominate AI search.",
      },
      {
        heading: "Stop losing deals to AI blind spots.",
        body: "Run a comprehensive 120-point on-page audit. Uncover your exact citation gaps today.",
        cta: { label: "Run Free Audit", href: "/ai-visibility-audit" },
      },
    ],
  },
];

export const getWebStory = (slug: string) =>
  webStories.find((s) => s.slug === slug);
