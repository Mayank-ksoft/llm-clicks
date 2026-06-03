// Web Stories data — bite-sized swipeable stories for AI visibility / GEO topics.
// URL structure mirrors the live site: /web-stories and /web-stories/:slug

export interface StorySlide {
  heading: string;
  body: string;
  /** Background video (mp4) for this slide. */
  video?: string;
  /** Poster image (jpg/webp) used as video fallback / before play. */
  poster?: string;
  /** Optional foreground image (when slide has no video). */
  image?: string;
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
      "/legacy-assets/chatgpt-stealing-search-clicks-web-story-poster.webp",
    posterAlt:
      "ChatGPT is Stealing Your Clicks. Here is How to Steal Them Back.",
    excerpt:
      "Why traditional search is bleeding traffic to ChatGPT — and the GEO playbook to win back the citation.",
    slides: [
      {
        heading: "Traditional search is bleeding traffic.",
        video: "/web-stories-media/chatgpt-ai-search-disruption-google-serp.mp4",
        poster: "/web-stories-media/chatgpt-ai-search-disruption-google-serp-poster.jpeg",
        body: "ChatGPT Search and AI agents are bypassing your website entirely. They are giving users the answers directly. Are you ready for the Zero-Click era?",
      },
      {
        heading: "Keywords are dead. Entities rule.",
        video: "/web-stories-media/entity-trust-server-architecture-llm.mp4",
        poster: "/web-stories-media/entity-trust-server-architecture-llm-poster.jpeg",
        body: "Large Language Models do not care about your keyword density. They care about absolute Entity Trust. If your brand entity is weak, you disappear from the prompt response.",
      },
      {
        heading: "The AI is pitching your rivals.",
        video: "/web-stories-media/ai-hallucination-competitor-recommendation.mp4",
        poster: "/web-stories-media/ai-hallucination-competitor-recommendation-poster.jpeg",
        body: "If an LLM cannot instantly verify your authority, it will confidently recommend your competitors to your own customers. You are losing leads to AI hallucinations.",
      },
      {
        heading: "Enter Generative Engine Optimization (GEO).",
        video: "/web-stories-media/generative-engine-optimization-geo-dashboard.mp4",
        poster: "/web-stories-media/generative-engine-optimization-geo-dashboard-poster.jpeg",
        body: "You can no longer optimize just for crawlers. You must optimize for the training data. You need to force the LLMs to cite your brand as the undeniable industry standard.",
      },
      {
        heading: "Dominate the architecture.",
        video: "/web-stories-media/cloud-entity-booster-nodes-seo-1.mp4",
        poster: "/web-stories-media/cloud-entity-booster-nodes-seo-poster-1.jpeg",
        body: "You build trust through high-authority infrastructure. Deploying Cloud Entity Boosters on trusted static hosting nodes forces AI models to recognize and cite your dominance.",
      },
      {
        heading: "Stop guessing. Start tracking.",
        video: "/web-stories-media/llmclicks-ai-visibility-tracking-software.mp4",
        poster: "/web-stories-media/llmclicks-ai-visibility-tracking-software-poster.jpeg",
        body: "Take control of your AI narrative. See exactly how ChatGPT, Gemini, and Perplexity rank your brand in real-time.",
        cta: { label: "Track Your Brand Now", href: "/ai-visibility-checker" },
      },
    ],
  },
  {
    slug: "fix-ai-brand-hallucinations",
    title: "Alert: ChatGPT is Lying About Your SaaS. Fix It Today.",
    poster:
      "/legacy-assets/ai-hallucination-cover.webp",
    posterAlt: "Alert: ChatGPT is Lying About Your SaaS. Fix It Today.",
    excerpt:
      "Detect and overwrite AI hallucinations about your SaaS — schema, RAG, and a dedicated LLM training page.",
    slides: [
      {
        heading: "Is ChatGPT Lying About Your SaaS?",
        video: "/web-stories-media/ai-glitch-hook.mp4",
        poster: "/web-stories-media/ai-glitch-hook-poster.jpeg",
        body: "AI engines do not browse the live web. They guess based on static data. If your pricing changed recently, ChatGPT is hallucinating false information to your prospects right now.",
      },
      {
        heading: "The Hallucination Engine",
        video: "/web-stories-media/chaotic-data-agitation-1.mp4",
        poster: "/web-stories-media/chaotic-data-agitation-poster-1.jpeg",
        body: "LLMs are prediction engines. When they lack hard facts, they guess. This creates invented negative reviews and fake bug reports, presented to your buyers as absolute truth.",
      },
      {
        heading: "Force-Feed the Knowledge Graph",
        video: "/web-stories-media/organized-code-fix.mp4",
        poster: "/web-stories-media/organized-code-fix-poster.jpeg",
        body: "You cannot email OpenAI for fixes. You must overwrite their training data. Deploy strict Organization and SoftwareApplication JSON-LD to lock down your core facts.",
      },
      {
        heading: "Dominate the RAG Pipeline",
        video: "/web-stories-media/rag-authority-fix-2.mp4",
        poster: "/web-stories-media/rag-authority-fix-2-poster.jpeg",
        body: "Modern AI search relies on Retrieval-Augmented Generation (RAG). To inject fresh data, secure brand mentions on high-authority platforms like G2 and distribute technical press releases.",
      },
      {
        heading: "LLM Training Page",
        video: "/web-stories-media/markdown-document-fix-1.mp4",
        poster: "/web-stories-media/markdown-document-fix-1-poster.jpeg",
        body: "Build a pure markdown LLM training page. Detail exact pricing and features. Eliminate marketing fluff. Use strict H2 and H3 structures so AI crawler bots can parse your data.",
      },
      {
        heading: 'Check Your "Share of Model" Health',
        video: "/web-stories-media/brand-blue-conversion.mp4",
        poster: "/web-stories-media/brand-blue-conversion-poster.jpeg",
        body: "Do not wait for a lost enterprise deal to find an AI hallucination. Run our deep-scan technical audit to see exactly what ChatGPT and Perplexity are telling your buyers today.",
        cta: { label: "Run Free Audit", href: "/ai-visibility-audit" },
      },
    ],
  },
  {
    slug: "reverse-engineer-perplexity-seo",
    title: "Exposed: How to Steal Traffic and Reverse Engineer Perplexity",
    poster:
      "/legacy-assets/reverse-engineer-perplexity-seo.webp",
    posterAlt: "Exposed: How to Steal Traffic and Reverse Engineer Perplexity",
    excerpt:
      "The technical blueprint to win Perplexity citations: semantic HTML, nested schema, and indexing velocity.",
    slides: [
      {
        heading: "How to Reverse Engineer Perplexity SEO",
        video: "/web-stories-media/perplexity-seo-algorithm-hook.mp4",
        poster: "/web-stories-media/perplexity-seo-algorithm-hook-poster.jpeg",
        body: "Perplexity is actively replacing informational SaaS queries. Stop guessing how its algorithm chooses citations. Here is the technical blueprint to secure your brand mentions.",
      },
      {
        heading: "The End of Fluff",
        video: "/web-stories-media/perplexity-citation-engine-ranking.mp4",
        poster: "/web-stories-media/perplexity-citation-engine-ranking-poster.jpeg",
        body: "Perplexity does not crawl like standard Googlebot. It hunts for high-density facts and established entities. If your landing pages rely on vague marketing copy, the LLM will completely bypass your domain.",
      },
      {
        heading: "Markdown & Semantic HTML5",
        video: "/web-stories-media/perplexity-semantic-html-markdown.mp4",
        poster: "/web-stories-media/perplexity-semantic-html-markdown-poster.jpeg",
        body: "LLMs parse content through clean structural formatting. You must build your pages with strict H2 and H3 nesting. Deploy bulleted lists and HTML tables to force the engine to extract your data easily.",
      },
      {
        heading: "Advanced JSON-LD Schema",
        video: "/web-stories-media/perplexity-entity-density-schema.mp4",
        poster: "/web-stories-media/perplexity-entity-density-schema-poster.jpeg",
        body: "Keyword stuffing is obsolete. You must inject nested structured data into your headers. Clearly define your software category and link to authoritative SameAs properties to establish unquestionable trust.",
      },
      {
        heading: "Indexing Velocity",
        video: "/web-stories-media/perplexity-indexing-velocity-freshness-1.mp4",
        poster: "/web-stories-media/perplexity-indexing-velocity-freshness-poster-1.jpeg",
        body: "Perplexity aggressively prioritizes recent information. Your technical architecture must support automated timestamp updates and instant XML sitemap pinging to feed the engine fresh data.",
      },
      {
        heading: "Steal Our Perplexity Research.",
        video: "/web-stories-media/perplexity-seo-audit-conversion.mp4",
        poster: "/web-stories-media/perplexity-seo-audit-conversion-poster.jpeg",
        body: "We tested 30 specific SaaS prompts to reverse engineer the exact citation algorithm. Download the complete case study to see the raw data and copy our framework.",
        cta: { label: "Download Case Study", href: "/blog" },
      },
    ],
  },
  {
    slug: "ai-visibility-tracker-tools",
    title: "Alert: You Are Losing AI Traffic. Top SaaS Trackers (2026)",
    poster:
      "/legacy-assets/poster-image-1.jpg.webp",
    posterAlt: "Alert: You Are Losing AI Traffic. Top SaaS Trackers (2026)",
    excerpt:
      "Compare the top AI visibility trackers — and see why a complete GEO engine beats basic prompt monitoring.",
    slides: [
      {
        heading: "Is your SaaS invisible to ChatGPT and Perplexity?",
        video: "/web-stories-media/1.mp4",
        poster: "/web-stories-media/1-poster.jpeg",
        body: "Traditional SEO is dead. Generative Engine Optimization is taking over. Discover the top AI visibility trackers to protect your pipeline.",
      },
      {
        heading: "The Zero-Click Reality",
        video: "/web-stories-media/2.mp4",
        poster: "/web-stories-media/2-poster.jpeg",
        body: "If AI engines skip your software, competitors steal your customers directly inside the chat interface. You must track your mentions immediately.",
      },
      {
        heading: "Basic Prompt Monitoring",
        video: "/web-stories-media/social-icons.mp4",
        poster: "/web-stories-media/social-icons-poster.jpeg",
        body: "Standard trackers reveal what your target market asks LLMs. They provide great keyword data but completely lack actionable steps for ranking.",
      },
      {
        heading: "Share of Voice Analytics",
        video: "/web-stories-media/4-1.mp4",
        poster: "/web-stories-media/4-1-poster.jpeg",
        body: "See exactly how often AI recommends you versus your rivals. This exposes critical gaps but leaves you guessing how to fix the code.",
      },
      {
        heading: "The Complete GEO Engine",
        video: "/web-stories-media/5.mp4",
        poster: "/web-stories-media/5-poster.jpeg",
        body: "Go beyond basic tracking. LLMClicks monitors brand mentions, detects dangerous AI hallucinations, and gives you the exact blueprint to dominate AI search.",
      },
      {
        heading: "Stop losing deals to AI blind spots.",
        image: "/web-stories-media/llmclicks.ai-white-logo.png",
        body: "Run a comprehensive 120-point on-page audit. Uncover your exact citation gaps today.",
        cta: { label: "Run Free Audit", href: "/ai-visibility-audit" },
      },
    ],
  },
  {
    slug: "ai-citations-vs-backlinks",
    title: "AI Citations vs Backlinks: The New Authority Metric (2026)",
    poster:
      "/legacy-assets/cover-ai-overviews.png",
    posterAlt: "AI Citations vs Backlinks: The New Authority Metric",
    excerpt:
      "Why AI citations are replacing backlinks as the dominant authority metric — and how to engineer entity consensus for ChatGPT, Gemini, and Perplexity.",
    slides: [
      {
        heading: "The link-building era is collapsing.",
        video: "/web-stories-media/broken-backlinks-1.mp4",
        poster: "/web-stories-media/broken-backlinks-poster-1.jpeg",
        body: "You spent thousands on high-authority backlinks. But when your target buyer asks ChatGPT for the best SaaS tool in your niche, your brand is completely missing.",
      },
      {
        heading: "LLMs do not care about PageRank.",
        video: "/web-stories-media/rag-seo-servers.mp4",
        poster: "/web-stories-media/rag-seo-servers-poster.jpeg",
        body: "AI search engines operate on Retrieval-Augmented Generation. They do not crawl your backlink profile to determine authority. They look for Entity Consensus across trusted training data.",
      },
      {
        heading: "AI Citations are the new Domain Rating.",
        video: "/web-stories-media/entity-trust-dashboard.mp4",
        poster: "/web-stories-media/entity-trust-dashboard-poster.jpeg",
        body: "A link from Forbes is useless if the AI cannot fundamentally understand your brand entity. Generative models prioritize frequency of mention, context proximity, and sentiment over raw anchor text.",
      },
      {
        heading: "Your low-DR competitors are winning.",
        video: "/web-stories-media/startup-ai-seo.mp4",
        poster: "/web-stories-media/startup-ai-seo-poster.jpeg",
        body: "Startups with zero backlinks are dominating Perplexity and Gemini. Why? They optimized their brand citations specifically for Large Language Models instead of traditional crawlers.",
      },
      {
        heading: "Deploying the Entity Cloud.",
        video: "/web-stories-media/entity-cloud-nodes-1.mp4",
        poster: "/web-stories-media/entity-cloud-nodes-poster-1.jpeg",
        body: "You must feed the machine structured truth. Building static Cloud Entity Boosters on high-trust nodes forces the LLMs to recognize your brand as the definitive answer.",
      },
      {
        heading: "Track your true AI authority.",
        video: "/web-stories-media/llmclicks-app.mp4",
        poster: "/web-stories-media/llmclicks-app-poster.jpeg",
        body: "Stop measuring outdated metrics. See exactly how frequently ChatGPT, Gemini, and Perplexity are citing your SaaS right now.",
        cta: { label: "Scan Your Brand Visibility", href: "/ai-visibility-checker" },
      },
    ],
  },
  {
    slug: "rank-google-ai-overviews",
    title: "How to Rank in Google AI Overviews (2026 Playbook)",
    poster:
      "/legacy-assets/llmclicks-ai-poster.webp",
    posterAlt: "How to Rank in Google AI Overviews",
    excerpt:
      "The technical playbook to win citations inside Google's AI Overviews — semantic HTML, nested schema, and brand consensus signals.",
    slides: [
      {
        heading: "The Organic Click is Disappearing.",
        video: "/web-stories-media/organic-traffic-drop.mp4",
        poster: "/web-stories-media/organic-traffic-drop-poster.jpeg",
        body: "Google AI Overviews are pushing traditional search results below the fold. If your SaaS is not in the generative snapshot, you are invisible to high-intent buyers.",
      },
      {
        heading: "Crawling is Not Enough.",
        video: "/web-stories-media/rag-algorithm-seo.mp4",
        poster: "/web-stories-media/rag-algorithm-seo-poster.jpeg",
        body: "Getting indexed does not guarantee an AI citation. Google's generative engine relies on Retrieval-Augmented Generation to synthesize answers from highly trusted entity clusters.",
      },
      {
        heading: "Make It Machine-Readable.",
        video: "/web-stories-media/machine-readable-code.mp4",
        poster: "/web-stories-media/machine-readable-code-poster.jpeg",
        body: "AI models cannot parse unstructured fluff. Deploy semantic HTML, strict JSON-LD schema, and clear payload extraction points to feed the algorithm exactly what it needs.",
      },
      {
        heading: "Structure Dictates Visibility.",
        video: "/web-stories-media/structured-content-format.mp4",
        poster: "/web-stories-media/structured-content-format-poster.jpeg",
        body: "LLMs crave lists, comparison tables, and direct Q&A formats. If your content is buried in massive text walls, the AI Overview will pull from a competitor who formatted for data extraction.",
      },
      {
        heading: "Brand Consensus Wins.",
        video: "/web-stories-media/knowledge-graph-entities.mp4",
        poster: "/web-stories-media/knowledge-graph-entities-poster.jpeg",
        body: "Google verifies your claims against the broader Knowledge Graph. If external AI nodes do not validate your SaaS as an industry leader, you will not survive the generative synthesis.",
      },
      {
        heading: "Claim Your AI Snapshot.",
        video: "/web-stories-media/geo-optimization-playbook.mp4",
        poster: "/web-stories-media/geo-optimization-playbook-poster.jpeg",
        body: "We just published the exact technical roadmap to reverse-engineer Google AI Overviews. Stop guessing and start structuring your data for the zero-click era.",
        cta: { label: "Rank in AIO", href: "/blog" },
      },
    ],
  },
];

export const getWebStory = (slug: string) =>
  webStories.find((s) => s.slug === slug);
