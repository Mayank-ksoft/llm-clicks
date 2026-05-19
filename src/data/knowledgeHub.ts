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
            text: "This guide covers the technical facts behind that decision. It explains what each major AI crawler does, how blocking affects AI citation rates and search visibility, which site types have legitimate reasons to block, and how to write a precise robots.txt configuration that protects private paths without removing public commercial content from AI discovery. If you are also looking to <a href=\"/knowledge-hub/ai-overviews/google-ai-overviews-optimization\">optimize for Google AI Overviews</a>, the retrieval architecture behind those citations requires a separate content strategy.",
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
    articles: [
      {
        slug: "google-ai-overviews-optimization",
        title:
          "Google AI Overviews vs. Traditional SERPs: How to Optimize for the AI Overviews",
        excerpt:
          "Learn how to optimize for Google AI Overviews by rebuilding your content structure around Retrieval-Augmented Generation (RAG), the system that decides what gets cited inside an AI snapshot.",
        date: "May 13, 2026",
        updated: "May 14, 2026",
        readTime: "10 min read",
        image:
          "/wp-content/uploads/2026/05/google-ai-overview--1024x572.webp",
        imageAlt:
          "A technical SEO manager analyzing a monitor showing a Google AI Overview replacing traditional search engine results.",
        content: [
          {
            type: "p",
            text: "Your site ranks in positions one through five. Your clicks are down 30 percent year over year. Google AI Overviews are absorbing the answer before users reach your link, and your on-page architecture was never built to compete in that layer.",
          },
          {
            type: "p",
            text: "This guide explains how to optimize for Google AI Overviews by rebuilding your content structure around Retrieval-Augmented Generation (RAG), the system that actually decides what gets cited inside an AI snapshot. You will leave with a concrete six-step execution framework, a real SaaS example, and a clear picture of what to monitor once the changes are live.",
          },

          {
            type: "h2",
            text: "Why RAG Makes Your Current On-Page Strategy Obsolete",
            id: "why-rag-makes-your-current-on-page-strategy-obsolete",
          },
          {
            type: "p",
            text: "Traditional PageRank evaluated pages as whole documents. It asked: \"Does this URL have enough keyword relevance and link authority to rank for this query?\" The algorithm rewarded pages that accumulated signals over time.",
          },
          {
            type: "p",
            text: "RAG-based systems work at a sub-document level. Google's AI Overviews, Perplexity, and ChatGPT Search use retrieval pipelines. These systems break pages into discrete text chunks. They score each chunk for semantic relevance and pull the highest-scoring text into a synthesized answer. Your page is not ranked. Individual sections of your page are retrieved or discarded.",
          },
          {
            type: "p",
            text: "This is a fundamental architectural change. A page optimized for PageRank tends to use thematic H2 sections that introduce ideas progressively. A page optimized for RAG retrieval needs every H2 section to function as a self-contained answer unit. The retrieval system does not read your introduction to understand your body paragraphs. Each chunk is scored independently.",
          },
          {
            type: "p",
            text: "Four signals that determine chunk-level retrieval quality:",
          },
          {
            type: "ul",
            items: [
              "Entity specificity: Claims anchored to named organizations, products, dates, and statistics score higher than generic assertions.",
              "Semantic completeness: Each section must fully resolve a sub-intent within 150 to 300 words. Incomplete answers are skipped.",
              "Structured markup: FAQ schema, HowTo schema, and Speakable schema tell crawlers which blocks are designed to be cited.",
              "Query-to-content alignment: The opening sentence of each section should mirror the phrasing of the sub-query it answers.",
            ],
          },
          {
            type: "p",
            text: "Research published by Pinecone and Cohere on dense passage retrieval scoring confirms that factual specificity (named entities plus numeric data) is among the strongest predictors of chunk relevance score in production RAG pipelines. Vague, attributive language (\"industry experts suggest\") produces near-zero retrieval weight. Of course, none of this matters if <a href=\"/knowledge-hub/chatgpt-seo/blocking-gptbot-seo\">AI crawlers are blocked by your robots.txt</a> — retrieval pipelines can only cite content they can access.",
          },

          {
            type: "h2",
            text: "The Zero-Click SERP Exposes a Tracking Gap Your Current Tools Cannot Fill",
            id: "the-zero-click-serp-exposes-a-tracking-gap",
          },
          {
            type: "p",
            text: "An Ahrefs study published in April 2025, conducted by Ryan Law and data scientist Xibeijia Guan, analyzed 300,000 keywords and found that the presence of an AI Overview correlated with a 34.5 percent lower click-through rate for the top-ranking page, compared to equivalent informational queries without an AI Overview. For SaaS sites targeting middle-funnel informational queries like \"how to reduce customer churn\" or \"best CRM for B2B SaaS,\" this is not a marginal effect. It is the primary organic traffic compression mechanism operating right now.",
          },
          {
            type: "p",
            text: "The deeper problem is not the click loss. It is the attribution gap. Google Search Console shows impressions for a query. It does not show whether your brand entity was cited inside the AI snapshot, whether a competitor's product name appeared instead, or whether the generated answer included any source attribution at all. You are tracking reach without tracking influence.",
          },
          {
            type: "p",
            text: "Consider how this plays out for a mid-market SaaS company. Notion, for example, regularly appears as a named entity inside AI Overviews for queries like \"how to build a project management wiki\" because their Help Center and template pages use discrete, fully resolved FAQ blocks with specific feature names and use cases anchored to named entity types. A competing tool with stronger domain authority but vague, thematic content architecture gets retrieved less frequently, regardless of rank position. The AI citation layer is a separate competition from the traditional SERP, and most teams have no visibility into their standing on it.",
          },
          {
            type: "p",
            text: "LLMClicks.ai monitors entity-level citation share across Google AI Overviews, Perplexity, and ChatGPT Search. It tracks which brand and product entities appear inside generated answers for your target queries, so you can see where competitors are being cited and where your own entities are absent. This is the monitoring layer that Google Search Console does not provide.",
          },

          {
            type: "h2",
            text: "How to Optimize for Google AI Overviews: Six Execution Steps",
            id: "how-to-optimize-for-google-ai-overviews",
          },
          {
            type: "p",
            text: "The following steps apply to any SaaS site targeting informational, comparison, or feature-level queries. Execute them in order.",
          },
          {
            type: "h3",
            text: "Step 1: Audit your content for semantic chunk integrity.",
          },
          {
            type: "p",
            text: "Open each target page and evaluate every H2 section against one standard: can this section stand alone as a complete, cited answer to a specific sub-question? If the section introduces a concept without resolving it, it will not be retrieved. Restructure until every block resolves one intent completely within 300 words. This is the single highest-impact change you can make.",
          },
          {
            type: "h3",
            text: "Step 2: Anchor every claim to a named entity.",
          },
          {
            type: "p",
            text: "Remove vague attributions and replace them with specific ones. The sentence \"studies show that churn rates increase when onboarding fails\" has near-zero retrieval value. Replace it with: \"Paddle's 2024 SaaS Metrics Report found that SaaS products with structured 30-day onboarding sequences reduced 90-day churn by 22 percent compared to products with no formal onboarding flow.\" Named organization, named report, named year, specific number. That structure is what dense passage retrieval pipelines weight most heavily, based on how embedding models score factual specificity during chunk ranking.",
          },
          {
            type: "h3",
            text: "Step 3: Prioritize HowTo and Article schema. Retain FAQPage markup for AI retrieval, not for rich results.",
          },
          {
            type: "p",
            text: "FAQ rich results were deprecated by Google on May 7, 2026. They no longer appear in Google Search for any site, including government and health sites that had retained eligibility since the 2023 restriction. If your current SEO workflow or Search Console reporting was built around FAQ rich result performance, those tracking mechanisms need to be updated before June 2026 for the UI and before August 2026 for any API-dependent pipelines.",
          },
          {
            type: "p",
            text: "What did not change: Google explicitly confirmed it will continue reading FAQPage structured data to understand page content. The rich result display feature was retired. The schema type was not. For the purposes of AI retrieval, this distinction matters. A RAG pipeline does not care whether your markup produces a visual SERP treatment. It cares whether your content is clearly structured into discrete, machine-readable question-and-answer blocks.",
          },
          {
            type: "p",
            text: "The practical guidance is therefore split into two actions:",
          },
          {
            type: "ul",
            items: [
              "For traditional SERP visibility: Shift schema investment to types that still produce rich results in 2026: HowTo, Article, Product, Review, AggregateRating, and BreadcrumbList. These remain supported and actively render enhanced results.",
              "For AI retrieval: Keep existing FAQPage markup in place where it accurately describes the content. Do not strip it. The markup signals to crawlers which text blocks are questions and which are answers, and that structural signal remains relevant for AI Overview, Perplexity, and ChatGPT Search retrieval pipelines. Add new FAQPage markup selectively, on pages where the content genuinely follows a question-and-answer format, not as a template applied across every page.",
            ],
          },
          {
            type: "p",
            text: "Keep individual FAQ answer blocks between 40 and 120 words. That constraint applies regardless of the rich result deprecation. It is a RAG chunk-size recommendation, not a SERP formatting rule.",
          },
          {
            type: "h3",
            text: "Step 4: Add a direct-answer block immediately below the H1.",
          },
          {
            type: "p",
            text: "Place an 80 to 150 word direct-response block at the top of the page, before your main body content. This block should answer the primary query in plain, complete sentences. Use no preamble. Start with the answer. Format the surrounding page with Article, FAQPage, or HowTo schema depending on intent. This mirrors the structural pattern AI systems prioritize when assembling a featured snippet or AI Overview source citation.",
          },
          {
            type: "h3",
            text: "Step 5: Build a citation monitoring baseline before you measure results.",
          },
          {
            type: "p",
            text: "Once your architecture changes are live, you need a measurement layer that goes beyond rank tracking. Set up query-level tracking for your 20 highest-priority informational keywords. For each query, record which brand entities appear inside the AI-generated answer across Google AI Overviews, Perplexity, and ChatGPT Search. Track this weekly. Your goal is to increase citation frequency for your own brand entities and reduce gaps where competitors are cited and you are not. This monitoring is separate from rank position and requires tools built specifically for AI answer layer tracking, not standard rank checkers.",
          },
          {
            type: "h3",
            text: "Step 6: Build topical entity clusters to increase retrieval frequency.",
          },
          {
            type: "p",
            text: "RAG systems favor sources with dense, consistent coverage of a related entity set. A single optimized page will lose citation share to a site with ten tightly interlinked pages covering every sub-entity in the same topic cluster. This happens because the retrieval pipeline scores source consistency: if your domain repeatedly produces high-relevance chunks for a set of related queries, your content earns higher prior probability of retrieval on new queries in the same cluster. Map the entity set around your core topic, identify coverage gaps, and build supporting pages that interlink with explicit anchor text tied to those entities.",
          },

          {
            type: "h2",
            text: "Conclusion: Rank Position Is a Lagging Indicator. Citation Share Is the Leading One",
            id: "conclusion-rank-position-is-a-lagging-indicator",
          },
          {
            type: "p",
            text: "The Google AI Overview operates on a retrieval architecture that PageRank optimization cannot address. Semantic chunk integrity, entity specificity, and structured markup are now the primary variables that determine whether your content gets cited inside an AI-generated answer or gets skipped entirely.",
          },
          {
            type: "p",
            text: "The six steps above are not theoretical. They are the architectural changes that separate brands with growing AI citation share from those watching their organic traffic compress despite stable rankings. The technical SEO managers who act on this now will hold ground as AI Overview penetration increases across query types. Those who do not will face a sustained click deficit with no clear cause visible in their current dashboards.",
          },
          {
            type: "p",
            text: "The first step is knowing where you actually stand in the AI answer layer.",
          },
          {
            type: "p",
            text: "Run a free 120-point Technical AI Visibility Audit on LLMClicks.ai. The audit scores your entity architecture, schema coverage, semantic chunk integrity, and citation share across Google AI Overviews, Perplexity, and ChatGPT Search. You receive a prioritized fix list specific to your site, not a category-level summary.",
          },

          {
            type: "h2",
            text: "Frequently Asked Questions",
            id: "frequently-asked-questions",
          },
          {
            type: "h3",
            text: "Q1. Can I ignore AI Overviews and focus strictly on traditional keyword ranking?",
          },
          {
            type: "p",
            text: "No. Traditional PageRank and AI Overviews operate on entirely different architectures. Ranking number one on a traditional SERP does not guarantee an AI citation. If you ignore Generative Engine Optimization, you will lose organic pipeline to competitors who structure their data for machine readability.",
          },
          {
            type: "h3",
            text: "Q2. Does FAQ schema still matter for AI retrieval since Google deprecated rich results?",
          },
          {
            type: "p",
            text: "Yes. Google deprecated the visual SERP display, not the schema itself. AI retrieval pipelines still read FAQPage markup to identify discrete question-and-answer blocks. Retain your existing FAQ schema to signal semantic chunk integrity directly to generative engines.",
          },
          {
            type: "h3",
            text: "Q3. What is the optimal text chunk size for Retrieval-Augmented Generation (RAG)?",
          },
          {
            type: "p",
            text: "Keep individual answer blocks between 150 and 300 words. For direct FAQ answers, aim for 40 to 120 words. If a text section exceeds 300 words, the retrieval system struggles to extract a concise answer and will often skip your content entirely.",
          },
          {
            type: "h3",
            text: "Q4. Will restructuring my pages for AI Overviews negatively impact my current SEO traffic?",
          },
          {
            type: "p",
            text: "No. Structuring your content with clear H2 headings, direct answers, and accurate JSON-LD schema benefits traditional crawlers and AI pipelines equally. Machine-readable entity architecture improves overall domain crawling efficiency while capturing citation share in the AI layer.",
          },
          {
            type: "h3",
            text: "Q5. How do I measure my exact visibility inside Google AI Overviews?",
          },
          {
            type: "p",
            text: "Google Search Console does not track AI citations. You must use a dedicated tracking platform. Run a 120-point technical AI Visibility Audit on LLMClicks.ai to track your entity-level citation share across Google AI Overviews, Perplexity, and ChatGPT Search.",
          },
        ],
      },
    ],
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
