// Knowledge Hub categories & articles. URL structure: /knowledge-hub/:category/:slug
export type KHSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string };

export interface KHArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  readTime: string;
  image: string;
  imageAlt: string;
  content: KHSection[];
}

export interface KHCategory {
  slug: string;
  name: string;
  description: string;
  articles: KHArticle[];
}

export const knowledgeHubCategories: KHCategory[] = [
  {
    slug: "chatgpt-seo",
    name: "ChatGPT SEO",
    description:
      "Practical guides on optimizing your brand and content for ChatGPT, GPTBot, and OpenAI's search ecosystem.",
    articles: [
      {
        slug: "blocking-gptbot-seo",
        title:
          "Should You Block GPTBot? The SEO Consequences of Blocking LLM Crawlers",
        excerpt:
          "A technical guide to GPTBot and 7 other AI crawlers — when to block, when to allow, and how to write a surgical robots.txt that protects private paths without losing AI citations.",
        date: "April 22, 2026",
        updated: "April 24, 2026",
        readTime: "15 min read",
        image:
          "https://llmclicks.ai/wp-content/uploads/2026/04/gptbot-block-allow-seo-consequences-1024x572.webp",
        imageAlt:
          "Diagram showing an AI crawler bot approaching a website protected by a robots.txt gate, with some pages allowed and others blocked",
        content: [
          {
            type: "p",
            text: "Web crawlers have governed how content gets discovered and indexed since the early days of the internet. Search engines like Google and Bing built their indexes entirely on crawler data, and webmasters learned to manage crawler access through robots.txt as a standard part of site maintenance.",
          },
          {
            type: "p",
            text: "AI crawlers introduced a new dimension to this established practice. When OpenAI launched GPTBot in August 2023, it became the first widely deployed crawler whose purpose was not to build a search index but to collect training data for a large language model. The distinction matters because the consequences of blocking it differ significantly from the consequences of blocking a traditional search crawler.",
          },
          {
            type: "p",
            text: "The debate around AI crawler blocking has grown considerably since then. 25% of the top 1,000 websites now block GPTBot, up from 5% in early 2023. The reasons vary: intellectual property concerns, privacy compliance, content monetization protection, and, in some cases, a misunderstanding of what blocking actually does.",
          },
          {
            type: "p",
            text: "This guide covers the technical facts behind that decision. It explains what each major AI crawler does, how blocking affects AI citation rates and search visibility, which site types have legitimate reasons to block, and how to write a precise robots.txt configuration that protects private paths without removing public commercial content from AI discovery.",
          },
          {
            type: "p",
            text: "The guide covers eight active AI crawlers across OpenAI, Anthropic, Perplexity, Google, and Microsoft. Each has a distinct function, and a robots.txt policy written for one does not automatically apply to the others.",
          },

          { type: "h2", text: "What Is GPTBot?", id: "what-is-gptbot" },
          {
            type: "p",
            text: "GPTBot is the web crawler operated by OpenAI. It reads publicly accessible web pages to supply content for ChatGPT's underlying language models and its real-time search features.",
          },
          { type: "p", text: "Its user-agent string appears in HTTP requests as:" },
          {
            type: "quote",
            text: "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot",
          },
          {
            type: "p",
            text: "GPTBot operates within the same framework as traditional search engine crawlers: it respects robots.txt directives, cannot access paywalled or authenticated content, and does not influence traditional Google search rankings. OpenAI's documentation confirms these behaviors explicitly.",
          },
          {
            type: "p",
            text: "As of early 2026, 25% of the top 1,000 websites now block GPTBot, up from 5% in early 2023. The decision carries measurable SEO consequences in either direction, which this guide covers in full.",
          },

          {
            type: "h2",
            text: "The Complete AI Crawler Index",
            id: "the-complete-ai-crawler-index",
          },
          {
            type: "p",
            text: "GPTBot is one of at least eight active AI crawlers across the major platforms. Each serves a different function. Configuring robots.txt accurately requires understanding all of them.",
          },
          {
            type: "table",
            headers: ["Crawler", "Operator", "Primary Function", "Effect of Blocking"],
            rows: [
              ["GPTBot", "OpenAI", "Training data for GPT models + real-time search", "Removes brand from model weights and ChatGPT citations"],
              ["OAI-SearchBot", "OpenAI", "Real-time retrieval for ChatGPT search results", "Removes pages from live ChatGPT search responses"],
              ["ChatGPT-User", "OpenAI", "Browsing agent during ChatGPT conversations", "Blocks ChatGPT from reading pages during a chat session"],
              ["ClaudeBot", "Anthropic", "Training data for Claude models", "Removes brand from Claude's trained knowledge"],
              ["anthropic-ai", "Anthropic", "Real-time fetching for Claude responses", "Prevents Claude from citing your content in answers"],
              ["PerplexityBot", "Perplexity", "Indexing for Perplexity citations", "Removes pages from Perplexity answers entirely"],
              ["Google-Extended", "Google", "Training data for Gemini models", "Reduces Gemini's awareness of brand and product data"],
              ["bingbot", "Microsoft", "Bing search index + Microsoft Copilot", "Blocking affects both Bing rankings and Copilot responses"],
            ],
          },
          {
            type: "p",
            text: "OpenAI's documentation confirms that GPTBot and OAI-SearchBot are treated as separate crawlers with independent robots.txt rules. A directive targeting GPTBot does not automatically apply to OAI-SearchBot.",
          },

          {
            type: "h2",
            text: "How AI Crawlers Differ from Search Engine Crawlers",
            id: "how-ai-crawlers-differ-from-search-engine-crawlers",
          },
          {
            type: "p",
            text: "Traditional crawlers like Googlebot examine a website and add it to a search index. When a user searches, the engine retrieves ranked results from that index.",
          },
          {
            type: "p",
            text: "AI crawlers use the same technical mechanism but serve a different downstream purpose. Instead of building a retrievable index, they collect content that is processed into training datasets for large language models. Once incorporated into a training run, that information becomes part of the model's parametric knowledge, meaning it influences responses without any retrieval step.",
          },
          {
            type: "p",
            text: "This distinction has a practical consequence: being blocked from an index is a recoverable condition. A webmaster can remove a blocking rule and Googlebot will recrawl within days. Being absent from a model's training data is not immediately recoverable. Training runs happen on irregular schedules that AI companies do not publicly disclose. A brand absent from a training cycle may remain underrepresented in that model version for 12 to 24 months until the next cycle.",
          },

          {
            type: "h2",
            text: "Training Crawlers vs Inference Crawlers",
            id: "training-crawlers-vs-inference-crawlers",
          },
          {
            type: "p",
            text: "AI crawlers operate in two functionally distinct modes. Understanding the difference is the most important prerequisite for writing an accurate robots.txt policy.",
          },
          { type: "h3", text: "Training Crawlers" },
          {
            type: "p",
            text: "Training crawlers collect content for inclusion in the model's next training cycle. The content they scrape becomes part of the dataset that shapes the model's weights during training. After training, those weights are fixed until the next training run.",
          },
          { type: "p", text: "Key training crawlers: GPTBot, ClaudeBot, Google-Extended" },
          {
            type: "p",
            text: "Consequence of blocking: your brand's features, pricing, and category associations are not encoded into the model's weights during the blocked period.",
          },
          { type: "h3", text: "Inference Crawlers" },
          {
            type: "p",
            text: "Inference crawlers fetch content in real time during a user's active conversation. They supplement the model's trained knowledge with current web data to answer questions that require up-to-date information.",
          },
          { type: "p", text: "Key inference crawlers: OAI-SearchBot, ChatGPT-User, anthropic-ai, PerplexityBot" },
          {
            type: "p",
            text: "Consequence of blocking: your pages are excluded from real-time AI search results and citation responses, even if the model already has some training-based knowledge of your brand.",
          },
          { type: "h3", text: "Why Both Matter" },
          {
            type: "p",
            text: "Blocking training crawlers affects long-term brand representation in model weights. Blocking inference crawlers affects immediate citation eligibility in AI search responses. Blocking both, which a blanket Disallow: / directive accomplishes, eliminates both channels simultaneously.",
          },

          {
            type: "h2",
            text: "SEO Consequences of Blocking",
            id: "seo-consequences-of-blocking",
          },
          { type: "h3", text: "Effect on AI Citation Rates" },
          {
            type: "p",
            text: "Research from Princeton University's Generative Engine Optimization study provides the most cited data on this question. Pages with authoritative citations appeared in 40% more generative responses, and pages containing specific statistics saw a 37% lift in AI citation rates. Pages that are blocked from crawling cannot accumulate either signal.",
          },
          {
            type: "p",
            text: "Content updated within 30 days receives 3.2x more ChatGPT citations than stale content, and sites with strong referring-domain profiles average 8.4 citations per AI-generated response. Both advantages require crawler access to function.",
          },
          { type: "h3", text: "Effect on Google Search Rankings" },
          {
            type: "p",
            text: "Blocking GPTBot or other AI crawlers has no direct effect on Google search rankings. These are entirely separate systems. GPTBot and Googlebot are operated independently and their findings are processed through different pipelines.",
          },
          {
            type: "p",
            text: "The risk of indirect harm exists if a webmaster uses a blanket User-agent: * directive intending to block AI crawlers, which would also block Googlebot. This is a configuration error, not an inherent consequence of blocking AI crawlers specifically.",
          },
          { type: "h3", text: "Effect on Competitive Positioning" },
          {
            type: "p",
            text: "Sixty-one percent of enterprise sites use a hybrid robots.txt policy that allows public content while blocking sensitive paths. Sites that implement a blanket block may find competitors with open configurations accumulating citations in AI-generated recommendations over time.",
          },
          { type: "h3", text: "No Effect On" },
          {
            type: "ul",
            items: [
              "Traditional Google, Bing, or DuckDuckGo search rankings (assuming Googlebot and bingbot remain unblocked)",
              "Website performance or Core Web Vitals",
              "Paid search campaigns",
              "Email deliverability",
            ],
          },

          {
            type: "h2",
            text: "Who Should Block and Who Should Not",
            id: "who-should-block-and-who-should-not",
          },
          {
            type: "p",
            text: "The decision depends on the type of content the site publishes and the business model it supports.",
          },
          { type: "h3", text: "Block AI Crawlers When" },
          {
            type: "ul",
            items: [
              "Paywalled or subscriber content: Once incorporated into model training data, paywalled articles, courses, or reports can be reproduced in AI responses without the paywall being presented to the user. The New York Times sued OpenAI in December 2023 over paywalled article reproduction in ChatGPT outputs.",
              "Regulated or sensitive content: Healthcare, financial advisory, and export-controlled content carries liability risk if reproduced in AI contexts without proper disclaimers. 68% of healthcare organizations have experienced data exposure incidents from misconfigured endpoints.",
              "Private or authenticated areas: Application dashboards, account settings, checkout pages, and API endpoints should always be blocked regardless of your general policy on AI crawlers.",
              "Proprietary research: Unique datasets, benchmark studies, or research that constitutes the core commercial value of the site may warrant training crawler blocks while keeping inference crawlers open.",
            ],
          },
          { type: "h3", text: "Allow AI Crawlers When" },
          {
            type: "ul",
            items: [
              "Public marketing content: Product pages, pricing pages, feature documentation, and company information benefit from AI crawler access. This content is already publicly visible; the only question is whether AI systems can read and cite it.",
              "Blog and knowledge base content: Informational content designed to demonstrate expertise benefits from AI citation. The primary purpose of this content type is reach and authority, both of which AI citation supports.",
              "B2B SaaS companies: Buyers in B2B software categories increasingly use AI tools during research phases. Brands absent from AI-generated comparisons and recommendations lose consideration at the top of the funnel before a sales conversation begins.",
              "E-commerce product pages: Product discovery in AI search is an emerging channel. Blocking AI crawlers from product pages removes the brand from this channel entirely.",
            ],
          },
          { type: "h3", text: "The Hybrid Approach" },
          {
            type: "p",
            text: "61% of enterprise sites use a hybrid robots.txt policy: they allow GPTBot to crawl public content while blocking sensitive directories. This is the most common configuration among large commercial sites and the approach recommended by most technical SEO practitioners.",
          },

          {
            type: "h2",
            text: "The Surgical robots.txt Configuration",
            id: "the-surgical-robots-txt-configuration",
          },
          {
            type: "p",
            text: "The goal of a precise robots.txt policy is to protect private and sensitive paths while keeping commercial pages fully accessible to all AI crawlers.",
          },
          { type: "h3", text: "Paths to Always Block" },
          {
            type: "p",
            text: "Regardless of your general policy, the following path types should be blocked from all crawlers including AI crawlers:",
          },
          {
            type: "code",
            text: "/app/\n/account/\n/dashboard/\n/private-dashboards/\n/checkout/\n/cart/\n/api/\n/internal-kb/\n/members/\n/admin/",
          },
          { type: "h3", text: "Paths to Always Allow" },
          {
            type: "p",
            text: "The following path types should remain accessible to AI training and inference crawlers:",
          },
          {
            type: "code",
            text: "/pricing/\n/features/\n/product/\n/blog/\n/knowledge-hub/\n/docs/\n/about/\n/solutions/",
          },
          { type: "h3", text: "Recommended Hybrid Configuration" },
          {
            type: "code",
            text: "# OpenAI training crawler\nUser-agent: GPTBot\nDisallow: /app/\nDisallow: /account/\nDisallow: /dashboard/\nDisallow: /checkout/\nDisallow: /cart/\nDisallow: /api/\nDisallow: /members/\nAllow: /\n\n# OpenAI real-time search\nUser-agent: OAI-SearchBot\nDisallow: /app/\nDisallow: /account/\nDisallow: /dashboard/\nDisallow: /api/\nAllow: /\n\n# OpenAI chat browsing agent\nUser-agent: ChatGPT-User\nDisallow: /app/\nDisallow: /account/\nDisallow: /dashboard/\nAllow: /\n\n# Anthropic training crawler\nUser-agent: ClaudeBot\nDisallow: /app/\nDisallow: /account/\nDisallow: /checkout/\nDisallow: /api/\nAllow: /\n\n# Anthropic inference crawler\nUser-agent: anthropic-ai\nDisallow: /app/\nDisallow: /account/\nAllow: /\n\n# Perplexity\nUser-agent: PerplexityBot\nDisallow: /app/\nDisallow: /account/\nDisallow: /api/\nAllow: /\n\n# Google Gemini training\nUser-agent: Google-Extended\nDisallow: /app/\nDisallow: /account/\nDisallow: /checkout/\nDisallow: /api/\nAllow: /",
          },
          { type: "h3", text: "Separating Training and Inference for OpenAI" },
          {
            type: "p",
            text: "For sites that want ChatGPT to cite their content in real-time search but do not want their content used for model training, OpenAI's documentation confirms these can be controlled independently:",
          },
          {
            type: "code",
            text: "# Block training data collection\nUser-agent: GPTBot\nDisallow: /\n\n# Allow real-time search retrieval\nUser-agent: OAI-SearchBot\nAllow: /",
          },
          {
            type: "p",
            text: "This configuration prevents content from entering OpenAI's training pipeline while keeping pages eligible for citation in ChatGPT's live search responses.",
          },

          {
            type: "h2",
            text: "All Eight Crawlers: Full robots.txt Reference",
            id: "all-eight-crawlers-full-robots-txt-reference",
          },
          {
            type: "table",
            headers: ["Crawler", "User-Agent String", "Operator", "Documentation"],
            rows: [
              ["GPTBot", "GPTBot", "OpenAI", "openai.com/gptbot"],
              ["OAI-SearchBot", "OAI-SearchBot", "OpenAI", "openai.com/searchbot"],
              ["ChatGPT-User", "ChatGPT-User", "OpenAI", "openai.com/searchbot"],
              ["ClaudeBot", "ClaudeBot", "Anthropic", "anthropic.com/claude-web"],
              ["anthropic-ai", "anthropic-ai", "Anthropic", "anthropic.com/claude-web"],
              ["PerplexityBot", "PerplexityBot", "Perplexity", "docs.perplexity.ai/bots"],
              ["Google-Extended", "Google-Extended", "Google", "developers.google.com/search/docs"],
              ["Bingbot", "bingbot", "Microsoft", "bing.com/toolbox"],
            ],
          },
          {
            type: "p",
            text: "Each crawler publishes its IP ranges in documentation. Server log verification using these IP ranges is more reliable than user-agent string verification alone, as user-agent strings can be spoofed while IP ranges require actual infrastructure from the operator.",
          },

          {
            type: "h2",
            text: "llms.txt as a Complementary Protocol",
            id: "llms-txt-as-a-complementary-protocol",
          },
          {
            type: "p",
            text: "llms.txt is an emerging file format placed at yourdomain.com/llms.txt. Where robots.txt is a permission file telling crawlers what they may and may not access, llms.txt is a preference file telling AI systems which content is most relevant to read.",
          },
          { type: "p", text: "The format uses markdown and contains links to priority pages with brief context:" },
          {
            type: "code",
            text: "# Brand Name\n> One sentence describing what the organization does and who it serves.\n\n## Core Pages\n- [Page Title](/path/): Brief description of what this page contains\n- [Pricing](/pricing/): Plan details, feature comparison, pricing tiers\n- [Features](/features/): Full feature list and use case descriptions\n\n## Documentation\n- [Docs Home](/docs/): Technical documentation and integration guides\n\n## Resources\n- [Blog](/blog/): Published articles and guides",
          },
          {
            type: "p",
            text: "llms.txt is not a confirmed ranking factor. No AI platform has published official documentation stating that they use it to prioritize content. Its value is in providing structured, noise-free content representation that may benefit inference-time retrieval systems that parse markdown more efficiently than HTML. It is a low-cost addition to an AI-ready technical configuration.",
          },

          {
            type: "h2",
            text: "How to Verify Your Current Configuration",
            id: "how-to-verify-your-current-configuration",
          },
          { type: "h3", text: "Step 1: Check Your robots.txt File" },
          {
            type: "p",
            text: "Access yourdomain.com/robots.txt directly in a browser. Patterns that indicate unintended AI crawler blocking:",
          },
          {
            type: "code",
            text: "# Blocks everything including all AI crawlers\nUser-agent: *\nDisallow: /\n\n# Blocks all OpenAI crawlers from entire site\nUser-agent: GPTBot\nDisallow: /",
          },
          {
            type: "p",
            text: "Any Disallow: / directive for an AI crawler user-agent blocks that crawler's access to the entire public site.",
          },
          { type: "h3", text: "Step 2: Check Server Logs for Crawler Activity" },
          {
            type: "p",
            text: "Verify that AI crawlers are actively visiting the site by searching server access logs for these user-agent strings:",
          },
          {
            type: "ul",
            items: [
              "GPTBot",
              "OAI-SearchBot",
              "ChatGPT-User",
              "ClaudeBot",
              "anthropic-ai",
              "PerplexityBot",
              "Google-Extended",
            ],
          },
          {
            type: "p",
            text: "Absence of these strings over a 30-day period indicates that crawlers are blocked by robots.txt, filtered by a CDN or WAF, or rate-limited at the server level.",
          },
          { type: "h3", text: "Step 3: Check CDN and WAF Configuration" },
          {
            type: "p",
            text: "Cloudflare, Fastly, and AWS CloudFront can block crawlers independently of robots.txt through security rules. Common configurations that unintentionally block AI crawlers include:",
          },
          {
            type: "ul",
            items: [
              "Cloudflare Bot Fight Mode: Enabled under Security > Bots, this challenges automated traffic including AI crawlers. Disable this setting or create bypass rules for verified AI crawler IP ranges.",
              "Custom WAF rules: Rules that challenge or block requests with non-browser user-agents will block all AI crawlers. Review custom rules for patterns matching bot, crawler, or spider.",
              "Rate limiting: Aggressive rate limits applied to all non-human traffic can throttle AI crawlers to the point where they stop crawling. Review rate limit thresholds for the IP ranges published by each AI platform.",
            ],
          },
          { type: "h3", text: "Step 4: Run a Technical Crawlability Scan" },
          {
            type: "p",
            text: "The LLMClicks AI Readiness Analyzer checks crawler accessibility, entity clarity, and schema validation in one automated scan. It flags blocked crawlers, render-blocking scripts that prevent content parsing, and missing structured data.",
          },

          {
            type: "h2",
            text: "Recovery Timeline After Re-Enabling Crawlers",
            id: "recovery-timeline-after-re-enabling-crawlers",
          },
          {
            type: "p",
            text: "For sites that have blocked AI crawlers and are reversing that policy, the recovery timeline differs by crawler type.",
          },
          { type: "h3", text: "Inference Crawler Recovery (Fast)" },
          {
            type: "p",
            text: "OAI-SearchBot, ChatGPT-User, anthropic-ai, and PerplexityBot fetch content at query time. Once a block is removed:",
          },
          {
            type: "ul",
            items: [
              "Crawlers typically attempt re-access within days",
              "Pages become eligible for citation in real-time AI search responses within 1 to 4 weeks",
              "Recovery speed depends on crawl frequency, which varies by domain authority and content update rate",
            ],
          },
          { type: "h3", text: "Training Crawler Recovery (Slow)" },
          {
            type: "p",
            text: "GPTBot, ClaudeBot, and Google-Extended collect training data for periodic model updates. Recovery is slower because it depends on when the next training cycle processes newly accessible content.",
          },
          {
            type: "ul",
            items: [
              "No public disclosure from OpenAI, Anthropic, or Google on training cycle schedules",
              "Conservative estimate: 6 to 18 months for newly accessible content to influence model weights in a production release",
              "The practical approach is to re-enable training crawlers immediately and simultaneously optimize for inference crawler retrieval to generate citations in the near term",
            ],
          },
          { type: "h3", text: "Near-Term Strategy During Training Recovery" },
          {
            type: "p",
            text: "While waiting for training cycles to incorporate re-enabled content, structuring pages for inference-time retrieval can produce citations from real-time search crawlers faster than training data recovery allows:",
          },
          {
            type: "ul",
            items: [
              "Implement FAQPage schema on pages targeting informational queries",
              "Use answer-first content structure with direct responses in the first 100 words",
              "Ensure clean HTML rendering without JavaScript dependencies for core content",
              "Maintain fresh content update dates, as content updated within 30 days receives 3.2x more ChatGPT citations than stale content",
            ],
          },

          {
            type: "h2",
            text: "Frequently Asked Questions",
            id: "frequently-asked-questions",
          },
          { type: "h3", text: "Q1. What is GPTBot and what does it do?" },
          {
            type: "p",
            text: "GPTBot is OpenAI's web crawler used to collect publicly accessible content for ChatGPT model training and real-time search retrieval. It respects robots.txt directives, cannot access authenticated content, and has no effect on traditional Google search rankings.",
          },
          { type: "h3", text: "Q2. Does blocking GPTBot affect Google rankings?" },
          {
            type: "p",
            text: "No. GPTBot and Googlebot are separate systems operated by different companies. Blocking GPTBot has no direct effect on Google rankings. The risk exists only if a webmaster uses a broad User-agent: * directive that inadvertently blocks Googlebot alongside AI crawlers.",
          },
          { type: "h3", text: "Q3. What is the difference between GPTBot and OAI-SearchBot?" },
          {
            type: "p",
            text: "GPTBot crawls content for model training and can also be used for real-time retrieval. OAI-SearchBot crawls specifically for ChatGPT's live search feature. OpenAI confirms they are treated as separate crawlers with independent robots.txt rules. A site can block one while allowing the other.",
          },
          { type: "h3", text: "Q4. How many websites are currently blocking GPTBot?" },
          {
            type: "p",
            text: "As of early 2026, 25% of the top 1,000 websites block GPTBot, up from 5% in early 2023. The majority of these are media publishers, academic institutions, and sites with paywalled content.",
          },
          { type: "h3", text: "Q5. What is a hybrid robots.txt policy?" },
          {
            type: "p",
            text: "A hybrid policy allows AI crawlers to access public commercial content while blocking private or sensitive paths such as account dashboards, checkout flows, and API endpoints. 61% of enterprise sites use this approach.",
          },
          { type: "h3", text: "Q6. Does blocking AI crawlers protect copyright?" },
          {
            type: "p",
            text: "robots.txt is a voluntary protocol. AI companies state in their documentation that they respect these directives, but compliance is not technically enforced. Legal protection for content requires terms of service, copyright registration, and, where necessary, litigation. The New York Times filed suit against OpenAI in December 2023 after its paywalled articles appeared in ChatGPT responses.",
          },
          { type: "h3", text: "Q7. What is llms.txt and should I implement it?" },
          {
            type: "p",
            text: "llms.txt is an optional markdown file placed at the root domain that signals to AI systems which pages are most relevant. It is not a confirmed ranking signal for any AI platform. It adds semantic structure that may benefit inference-time retrieval and is straightforward to implement.",
          },
          { type: "h3", text: "Q8. If I blocked AI crawlers six months ago, how long will recovery take?" },
          {
            type: "p",
            text: "Inference crawler recovery typically occurs within days to weeks after removing the block. Training crawler recovery depends on when the next model training cycle processes your content, which AI companies do not publish on a fixed schedule. The practical estimate is 6 to 18 months for training data to influence production model responses.",
          },
        ],
      },
    ],
  },
  {
    slug: "agentic-search-aeo",
    name: "Agentic Search (AEO)",
    description:
      "How autonomous AI agents discover, evaluate, and act on web content — and how to optimize for Answer Engine Optimization.",
    articles: [],
  },
  {
    slug: "ai-overviews",
    name: "AI Overviews",
    description:
      "Tactics and research on Google AI Overviews — surfacing in generative summaries and protecting organic visibility.",
    articles: [],
  },
  {
    slug: "data-and-research",
    name: "Data and Research",
    description:
      "Original studies, benchmarks, and datasets on LLM citations, AI search behavior, and brand visibility in generative engines.",
    articles: [],
  },
  {
    slug: "emerging-trends",
    name: "Emerging Trends",
    description:
      "What's next in AI search, GEO, and the evolving landscape of LLM-powered discovery.",
    articles: [],
  },
  {
    slug: "geo-for-agencies",
    name: "GEO for Agencies",
    description:
      "Playbooks, workflows, and client-ready frameworks for agencies delivering Generative Engine Optimization services.",
    articles: [],
  },
  {
    slug: "local-ai-seo",
    name: "Local AI SEO",
    description:
      "Optimizing local businesses and multi-location brands for AI assistants, map-based queries, and location-aware LLM responses.",
    articles: [],
  },
  {
    slug: "perplexity-seo",
    name: "Perplexity SEO",
    description:
      "Strategies to earn citations and visibility inside Perplexity's answer engine and PerplexityBot crawler.",
    articles: [],
  },
  {
    slug: "technical-geo",
    name: "Technical GEO",
    description:
      "Technical implementation of Generative Engine Optimization — schema, llms.txt, crawler config, and AI-friendly architecture.",
    articles: [],
  },
];

export const getKHCategory = (slug: string) =>
  knowledgeHubCategories.find((c) => c.slug === slug);

export const getKHArticle = (categorySlug: string, articleSlug: string) => {
  const cat = getKHCategory(categorySlug);
  const article = cat?.articles.find((a) => a.slug === articleSlug);
  return article ? { category: cat!, article } : null;
};
