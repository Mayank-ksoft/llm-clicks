import { Building2, Shield, GraduationCap, Shirt, ShoppingCart, HeartPulse, Server, Plane, Home, Scale, type LucideIcon } from "lucide-react";
import saasHero from "@/assets/industries/saas-geo-hero.jpg";

export type IndustrySection =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; text: string; lang?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string };

export type IndustryFAQ = { q: string; a: string };

export type IndustryBadge = {
  label: string;
  tone?: "accent" | "danger";
};

export type IndustryJourneyStep = {
  index?: string;
  label: string;
  active?: boolean;
};

export type IndustryCard = {
  title: string;
  desc: string;
};

export type Industry = {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  metaTitle: string;
  metaDescription: string;
  // Hub card
  cardTagline?: string; // short pitch shown on hub
  badge?: IndustryBadge;
  // Hero
  heroPill?: string; // e.g. "Patient Discovery & Care Visibility"
  heroTitle: string;
  heroTitleAccent?: string; // word(s) at end of headline shown in accent w/ underline
  heroSubtitle: string;
  heroImage?: string;
  heroImageAlt?: string;
  journey?: { title: string; steps: IndustryJourneyStep[] };
  trustNote?: string; // "Trusted by 500+ ..."
  // Optional structured sections
  painCards?: IndustryCard[]; // "Why X struggle in AI search"
  helpsCards?: IndustryCard[]; // "How LLMClicks helps"
  outcomes?: string[]; // grid of outcome chips
  withoutItems?: string[];
  withItems?: string[];
  // Long-form article (used by SaaS) — rendered after the structured sections
  date?: string;
  readTime?: string;
  content?: IndustrySection[];
  faqs?: IndustryFAQ[];
  placeholder?: boolean;
};


const saasContent: IndustrySection[] = [
  { type: "h2", text: "Bottom Line Up Front" },
  { type: "p", text: "<strong>The Problem:</strong> Enterprise SaaS landing pages are built to persuade humans. LLMs are not humans. They do not read, browse, or respond to persuasion. They extract answers to specific questions from structured text, and most B2B SaaS pages are not structured to be extracted from at all." },
  { type: "p", text: "<strong>The Research:</strong> When ChatGPT, Perplexity, and Gemini are asked \"what is the best project management tool for enterprise teams with Salesforce integration,\" they do not rank the pages that rank highest in Google. They cite the pages that most directly and specifically answer that question in a format they can extract without interpretation." },
  { type: "p", text: "<strong>The Payload:</strong> GEO for enterprise software platforms requires a fundamental rebuild of your content architecture, from persuasion-optimised landing pages to intent-driven FAQ structures backed by a complete SoftwareApplication schema and verified third-party citations. This post shows you exactly how to do it." },

  { type: "h2", text: "Your Software Page Is Ranking. It Is Not Getting Cited." },
  { type: "p", text: "Your SaaS platform is on page one of Google for your core category keyword. Your content team published three thought leadership pieces this quarter. And when a VP of Engineering asks ChatGPT which enterprise project management tools integrate natively with Salesforce, your product is not in the answer." },
  { type: "p", text: "This is the core failure of applying traditional SEO logic to GEO for enterprise software platforms. Google ranks pages. LLMs extract answers. The content that wins in Google search is built to capture keyword intent and persuade a human reader to convert. The content that gets cited in AI-generated responses is built to directly answer a specific question in text that an AI can extract, verify, and reproduce accurately." },
  { type: "p", text: "These are structurally different content jobs, and most enterprise SaaS teams are doing only one of them." },
  { type: "p", text: "Here is why this matters in 2026. Gartner reports that 75% of B2B software buyers now use AI assistants at some point during their evaluation process. When those buyers ask AI for vendor recommendations, the platform they get cited by is not determined by their backlink profile or their keyword rankings. It is determined by whether their content directly answers the questions buyers are asking, in a format that AI retrieval mechanisms can process." },
  { type: "p", text: "The path from \"we rank well\" to \"we get cited in AI answers\" runs through three specific changes: restructuring content into intent-driven FAQ blocks, deploying a complete SoftwareApplication schema, and building the third-party citation presence AI engines trust. Each one requires deliberate work. None of them happens as a side effect of traditional SEO." },

  { type: "h2", text: "The Shift to Intent-Driven FAQ Structures" },
  { type: "p", text: "Traditional enterprise SaaS landing pages follow a predictable architecture. There is a headline with a value proposition, a subheadline expanding on it, a feature list, a social proof section, and a call to action. This architecture is optimised for conversion: it takes a visitor who arrived with some interest and moves them toward a demo request." },
  { type: "p", text: "It is almost entirely useless for AI retrieval." },
  { type: "p", text: "LLMs retrieve answers, not pages. When ChatGPT processes a query about enterprise software, it is not reading your homepage and deciding whether to recommend you. It is searching its training data (and, for retrieval-augmented models, the live web) for text that directly answers the buyer's question. The text it finds must be structured as a clear question and a direct, specific answer. It must be verifiable against other sources. And it must not require context from the surrounding page to make sense on its own." },
  { type: "p", text: "Your feature bullet point, \"100+ native integrations\", does not answer the question \"Does [Your Tool] integrate with Salesforce?\" Your headline, \"The enterprise platform built for scale\", does not answer \"Is [Your Tool] appropriate for a 200-person engineering team?\" Your pricing section header, \"Plans for every team,\" does not answer \"How much does [Your Tool] cost per user for an enterprise team of 50?\"" },
  { type: "p", text: "<strong>Intent-driven FAQ blocks</strong> answer these questions directly, at the top of the answer, without requiring AI to interpret the surrounding context." },

  { type: "h2", text: "What the Shift Looks Like in Practice" },
  { type: "p", text: "Consider two versions of the same page for a fictional enterprise project management platform, TaskBridge. Both pages are about Salesforce integration. One is a traditional landing page section. One is an intent-driven FAQ block." },
  { type: "p", text: "<strong>Traditional landing page version:</strong>" },
  { type: "quote", text: "TaskBridge connects your project workflows with the tools your team already uses. With powerful native integrations across CRM, communication, and productivity platforms, your team never has to leave their workflow. TaskBridge's integration library includes 100+ connectors, giving enterprise teams the flexibility to build the stack that works for them." },
  { type: "p", text: "An AI model asked, \"Does TaskBridge integrate natively with Salesforce?\" cannot extract a direct answer from this paragraph. It describes integrations in general terms, mentions a number (100+), but never states whether Salesforce is specifically included, what type of integration it is, or what the technical requirements are." },
  { type: "p", text: "<strong>Intent-driven FAQ block version:</strong>" },
  { type: "p", text: "<strong>Does TaskBridge integrate natively with Salesforce?</strong>" },
  { type: "quote", text: "Yes. TaskBridge provides a certified two-way native integration with Salesforce Sales Cloud and Service Cloud. The integration syncs project milestones, task completion status, and resource assignments directly with Salesforce opportunity and case records without a third-party connector. The integration requires Salesforce Enterprise edition or above and is configured within the TaskBridge admin panel in under 15 minutes." },
  { type: "p", text: "An AI model asked the same question extracts a complete, accurate, verifiable answer from this paragraph. It includes the platform versions supported, the data that syncs, the technical requirements, and a source for verification. Every element is extractable as a standalone fact." },

  { type: "h2", text: "Building Your Intent-Driven FAQ Architecture" },
  { type: "p", text: "Start with the 15 to 20 questions your sales team answers most frequently in the first two calls of an enterprise deal. These are the exact questions buyers are asking AI. Group them into three categories and build dedicated FAQ blocks for each:" },
  { type: "p", text: "<strong>Integration questions:</strong> \"Does [Product] integrate with [Platform]?\" — one block per major integration, written with the specificity shown above." },
  { type: "p", text: "<strong>Pricing and packaging questions:</strong> \"How much does [Product] cost for [team size]?\" \"Does [Product] charge per user or per seat?\" \"Is there an enterprise annual discount?\" Each question gets a direct, specific answer with current pricing figures." },
  { type: "p", text: "<strong>Compliance and security questions:</strong> \"Is [Product] SOC 2 Type II certified?\" \"Does [Product] support SSO?\" \"Where is [Product] data hosted?\" These are the questions enterprise procurement agents check first. Each one needs a direct answer with the certification name, audit date, and the specific standard covered." },
  { type: "p", text: "Place these FAQ blocks on your features page, your integrations page, and your pricing page, not just on a dedicated FAQ page. AI retrieval mechanisms pull from wherever the relevant content lives. A buyer asking about Salesforce integration should find the complete answer on your integrations page, not buried three clicks away." },

  { type: "h2", text: "Deploying SoftwareApplication Schema for Machine Readability" },
  { type: "p", text: "Intent-driven FAQ blocks fix the content layer. SoftwareApplication schema fixes the structural layer underneath it." },
  { type: "p", text: "Schema markup is the machine-readable layer of your content. It tells AI engines, search crawlers, and autonomous procurement agents what your product is, what it does, who it is for, and what it costs, without requiring them to read and interpret your prose. For enterprise SaaS, complete schema deployment is the difference between being evaluated and being skipped." },
  { type: "p", text: "Most SaaS teams have partial schema deployment at best. They add a name, a URL, and an application category and consider the job done. The properties that matter most for AI retrieval — featureList, offers, aggregateRating, and applicationSubCategory — are left empty or implemented in ways that make them useless for machine extraction." },
  { type: "p", text: "Here is what a complete SoftwareApplication schema looks like for an enterprise SaaS platform:" },
  { type: "code", text: `{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "LLMClicks.ai",
  "url": "https://llmclicks.ai",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AI Visibility and GEO Optimisation Software",
  "operatingSystem": "Web",
  "featureList": [
    "AI brand mention tracking across ChatGPT, Perplexity, Gemini, Claude, and Copilot",
    "120-point AI accuracy audit for pricing, features, and integration claims",
    "AI hallucination detection for B2B SaaS brands",
    "Share of Voice tracking across large language models",
    "Competitor AI mention monitoring and analysis",
    "Citation source analysis for LLM responses",
    "Prompt-level AI visibility tracking",
    "Brand sentiment analysis in AI-generated responses",
    "AI query mapping by buyer intent stage",
    "GEO optimisation recommendations",
    "Agentic Engine Optimisation (AEO) framework",
    "AI referral traffic analytics"
  ],
  "offers": {
    "@type": "Offer",
    "name": "Free Trial",
    "price": "0",
    "priceCurrency": "USD",
    "description": "14-day free trial. No credit card required.",
    "priceValidUntil": "2027-12-31"
  },
  "provider": {
    "@type": "Organization",
    "name": "LLMClicks.ai",
    "url": "https://llmclicks.ai",
    "sameAs": [
      "https://www.g2.com/products/llmclicks-ai/reviews",
      "https://www.trustpilot.com/review/llmclicks.ai",
      "https://www.crunchbase.com/organization/llmclicks-ai",
      "https://www.producthunt.com/products/llmclicks-ai-2"
    ]
  }
}` },
  { type: "p", text: "Three properties in this schema block are the most critical for AI retrieval:" },
  { type: "p", text: "<strong>featureList</strong> is where most SaaS teams underinvest. Generic entries like \"advanced features\" or \"enterprise tools\" are not extractable. Write each feature as a specific, self-contained statement: \"Native Salesforce integration\" is extractable. \"100+ integrations\" is not. When a procurement agent queries \"does TaskBridge support SAML 2.0 SSO,\" the featureList entry \"Single Sign-On (SSO) via SAML 2.0\" returns a direct match. A vague entry returns nothing useful." },
  { type: "p", text: "<strong>Offers</strong> must include a real price with a priceCurrency and a priceValidUntil date. AI agents evaluating enterprise software check pricing as a first-pass filter. If your schema returns no price, the agent estimates or skips. If your schema returns an outdated price, the agent cites the wrong information to your prospects. Keep this field current every time pricing changes." },
  { type: "p", text: "<strong>provider.sameAs</strong> connects your schema entity to your profiles on the third-party platforms AI engines cite most. Include your G2 profile URL, your Capterra listing URL, and any integration marketplace profiles. This tells AI engines that the entity on your site is the same entity reviewed on these platforms, which strengthens your citation authority across all of them simultaneously." },

  { type: "h2", text: "Adding FAQ Schema to Your Intent Blocks" },
  { type: "p", text: "Every intent-driven FAQ block you build in the previous section should also carry <strong>FAQPage schema</strong> markup. This creates a machine-readable layer directly on top of your human-readable content:" },
  { type: "code", text: `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which AI platforms does LLMClicks.ai monitor for brand mentions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LLMClicks.ai monitors brand mentions across ChatGPT, Perplexity, Google Gemini, Claude, and Microsoft Copilot."
      }
    },
    {
      "@type": "Question",
      "name": "Does LLMClicks.ai offer a free trial?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. LLMClicks.ai offers a 14-day free trial with no credit card required."
      }
    }
  ]
}` },
  { type: "p", text: "The FAQPage schema does not replace the visible FAQ blocks. It sits alongside them as a separate JSON-LD block in the page head. AI retrieval mechanisms process both the prose version from the visible content and the structured version from the schema. Dual-layer content delivery is the standard for pages that consistently get cited." },

  { type: "h2", text: "Third-Party Citation Patterns and Trust Signals" },
  { type: "p", text: "Content architecture and schema are your on-site foundation. They determine whether AI can extract accurate information about your product. Third-party citations determine whether AI trusts your product enough to recommend it." },
  { type: "p", text: "AI engines are not purely self-contained. Retrieval-augmented models like Perplexity pull from live web sources during query processing. Base models like GPT-4o are trained on data that includes third-party reviews, comparison articles, and community discussions. In both cases, the brands that get cited most confidently in enterprise software queries are the ones with the strongest presence across the sources AI treats as authoritative." },
  { type: "p", text: "For B2B SaaS, those sources are not random. They follow a consistent pattern across categories:" },
  { type: "p", text: "<strong>Review aggregators:</strong> G2 and Capterra are the highest-weighted sources in AI-generated software comparisons. Complete profiles with updated feature lists, current pricing, response to reviews (particularly negative ones), and correct category tags directly affect how AI retrieval mechanisms represent your product. A G2 profile last updated 18 months ago is a liability. It is the source AI cites when describing the old version of your product to prospects who are evaluating you today." },
  { type: "p", text: "<strong>Community platforms:</strong> Reddit (specifically software-focused subreddits like r/projectmanagement, r/devops, r/sysadmin, depending on your category) and Hacker News are weighted heavily in AI training data for software recommendations. User-generated discussions where your product is mentioned accurately and positively in context are among the most effective third-party trust signals available. You cannot manufacture these, but you can encourage them by building communities where technical buyers discuss real use cases." },
  { type: "p", text: "<strong>Independent comparison content:</strong> Articles from established SaaS review publications (G2 Learn Hub, Software Advice, TrustRadius's blog) that include your product in category comparisons build the citation web that makes AI confident in recommending you. When multiple independent sources describe your product in consistent terms, AI engines treat that consistency as a verification signal." },
  { type: "p", text: "<strong>Integration partner pages:</strong> If your product integrates with Salesforce, Microsoft, Slack, or any other platform with high enterprise penetration, their partner directories and integration marketplace listings are citations AI engines trust. A listing on the Salesforce AppExchange carries significantly more AI citation weight than a feature bullet on your own site." },

  { type: "h2", text: "The Citation Gap Audit" },
  { type: "p", text: "Run your 15 most important buyer-intent queries through ChatGPT and Perplexity. For each response that cites a competitor but not you, identify the specific source being cited. This tells you the exact third-party platforms your competitors have presence on that you do not." },
  { type: "p", text: "That gap list is your off-site GEO priority list. It is not a general \"build more backlinks\" exercise. It is a specific list of platforms where your product's accurate representation would directly improve your AI citation rate on the queries that matter most." },
  { type: "p", text: "LLMClicks.ai's Citation Source Analysis does this automatically, mapping which external domains are feeding AI responses in your specific software category and flagging where your competitors have citation presence that you lack. The output is a ranked list of the platforms most worth targeting, sorted by their weight in actual AI-generated responses for your category queries." },

  { type: "h2", text: "The Bottom Line" },
  { type: "p", text: "Traditional enterprise SaaS pages are built to rank in Google and convert human visitors. They do neither job in LLM retrieval pipelines." },
  { type: "p", text: "GEO for enterprise software platforms requires three concrete changes: restructuring your content into intent-driven FAQ blocks that answer specific buyer questions directly, deploying a complete SoftwareApplication and FAQPage schema so AI engines can extract structured product data without interpreting prose, and building verified third-party citation presence on the platforms AI actually trusts." },
  { type: "p", text: "None of these changes conflicts with your existing SEO work. The FAQ schema helps Google featured snippets as well as LLM retrieval. The complete SoftwareApplication schema improves structured data coverage across all search surfaces. Strong G2 and Capterra profiles improve both review site rankings and AI citation rates." },
  { type: "p", text: "The brands dominating AI-generated enterprise software recommendations in 2026 are not the ones with the biggest marketing budgets. They are the ones whose product data is the most precisely structured, the most accurately represented across third-party sources, and the easiest for an AI engine to extract, verify, and reproduce as a direct answer to a buyer's question." },
  { type: "p", text: "Start by auditing what AI currently says about your product today." },
];

const saasFaqs: IndustryFAQ[] = [
  { q: "What is GEO for enterprise software platforms?", a: "GEO for enterprise software platforms is the practice of structuring your SaaS content, schema markup, and third-party citations so AI engines like ChatGPT, Perplexity, and Gemini can extract, verify, and cite your product in response to buyer queries. It is distinct from traditional SEO, which optimises for keyword rankings. GEO optimises for AI retrieval and recommendation." },
  { q: "Why do traditional SaaS landing pages fail in LLM retrieval pipelines?", a: "Traditional landing pages are built to persuade human visitors. They use value proposition headlines, vague feature lists, and conversion-focused copy that AI engines cannot extract structured answers from. LLMs retrieve direct answers to specific questions. A page that says \"100+ native integrations\" does not answer \"Does this tool integrate with Salesforce?\" and gets skipped entirely." },
  { q: "Which SoftwareApplication schema properties matter most for AI citation?", a: "Three properties carry the most weight: featureList (each feature written as a specific, self-contained statement, not a vague category), offers (current pricing with priceCurrency and priceValidUntil populated), and provider.sameAs (linking your schema entity to your G2, Capterra, and integration marketplace profiles). Most SaaS teams implement name and applicationCategory and leave the rest empty." },
  { q: "How many FAQ blocks does an enterprise SaaS page need to improve AI visibility?", a: "Start with the 15 to 20 questions your sales team answers most frequently in the first two discovery calls. Cover three categories: integration questions (one block per major integration), pricing and packaging questions (specific figures, not ranges), and compliance and security questions (certification name, audit date, standard covered). Distribute these blocks across your integrations page, features page, and pricing page, not only a dedicated FAQ page." },
  { q: "How does LLMClicks.ai help with GEO for enterprise software?", a: "LLMClicks.ai tracks whether your enterprise SaaS platform is being cited across ChatGPT, Perplexity, Gemini, Claude, and Copilot for the specific buyer-intent queries that matter to your pipeline. The Citation Source Analysis identifies which third-party platforms your competitors are being cited from that you are not. The 120-point AI accuracy audit checks whether the product claims AI makes about your platform are accurate, including pricing, integrations, and compliance certifications." },
];

const defaultOutcomes = [
  "Improve AI Visibility",
  "Reduce Misinformation",
  "Strengthen Trust",
  "Benchmark Rivals",
  "Improve Citations",
  "Increase Discoverability",
];

export const industries: Industry[] = [
  {
    slug: "saas",
    name: "SaaS & Software",
    shortName: "SaaS",
    icon: Server,
    metaTitle: "AI Visibility Software for SaaS Companies | LLMClicks.ai",
    metaDescription: "Monitor how ChatGPT, Gemini, Claude, and Perplexity describe your SaaS company. Track AI visibility, detect hallucinations, and benchmark competitors.",
    cardTagline: "Stop losing pipeline to Perplexity. Intercept software buyers during feature comparison and vendor research prompts.",
    badge: { label: "High Priority", tone: "accent" },
    heroPill: "AI Visibility Software for SaaS Companies",
    heroTitle: "Stop Losing SaaS Buyers to",
    heroTitleAccent: "ChatGPT & Perplexity.",
    heroSubtitle: "Your buyers are using AI to compare software. If you are not visible, your competitors get the demo. Track brand mentions, fix hallucinated pricing, and dominate AI search recommendations.",
    heroImage: saasHero,
    heroImageAlt: "GEO for SaaS visualization",
    trustNote: "Trusted by 500+ SaaS companies and agencies",
    painCards: [
      { title: "Invisible in Comparisons", desc: "Buyers prompt AI for the \"best software\" in your category. The LLM outputs three options. You are not one of them. Your competitor captures the lead instantly." },
      { title: "Hallucinated Pricing", desc: "You updated pricing six months ago. ChatGPT still cites your old free tier. Prospects arrive at demo calls with entirely wrong budget expectations." },
      { title: "Missing Integration Data", desc: "AI cannot confirm whether you integrate with Salesforce, HubSpot, or Slack. Buyers skip you for competitors with extractable integration claims." },
      { title: "No Share of Voice Signal", desc: "You have no way to measure whether your category visibility in AI is up, down, or flat against your top rivals." },
    ],
    helpsCards: [
      { title: "AI Visibility Tracker", desc: "Monitor brand mentions across ChatGPT, Perplexity, Claude, Gemini, Copilot, and Grok." },
      { title: "120-Point Accuracy Audit", desc: "Detect hallucinated features, fabricated pricing tiers, and missing compliance claims." },
      { title: "Share of Voice", desc: "Benchmark your AI category dominance against Salesforce, HubSpot, and other rivals." },
      { title: "Citation Source Mapping", desc: "Discover the exact third-party domains feeding the LLM's knowledge for your category." },
      { title: "Query Fan-Out", desc: "Track hundreds of long-tail feature, pricing, and integration prompt variations automatically." },
      { title: "Readiness Analyzer", desc: "Score your pages for semantic extraction and structured-data coverage." },
    ],
    outcomes: defaultOutcomes,
    withoutItems: [
      "AI consistently recommends your competitors.",
      "Pricing models and core features are hallucinated or outdated.",
      "Missing from crucial AI vendor comparison answers.",
      "Zero visibility tracking or Share of Voice metrics.",
    ],
    withItems: [
      "Monitor all AI brand mentions natively.",
      "Detect technical hallucinations automatically.",
      "Benchmark performance against top rivals.",
      "Improve AI visibility with structured data workflows.",
    ],
    date: "June 5, 2026",
    readTime: "14 min read",
    content: saasContent,
    faqs: saasFaqs,
  },
  {
    slug: "banking",
    name: "Banking & FinTech",
    shortName: "Banking",
    icon: Building2,
    metaTitle: "AI Visibility Software for Banks & Financial Institutions | LLMClicks.ai",
    metaDescription: "Monitor how ChatGPT, Gemini, Claude, and Perplexity describe your financial institution. Track AI visibility, detect hallucinations, and benchmark competitors.",
    cardTagline: "Eliminate compliance risk from hallucinated rates. Dominate AI queries for wealth management and retail banking.",
    badge: { label: "Compliance Risk", tone: "danger" },
    heroPill: "FinTech & Institutional Banking",
    heroTitle: "Become the",
    heroTitleAccent: "AI-Recommended Bank.",
    heroSubtitle: "Stop losing deposits to FinTech challengers. Ensure ChatGPT, Gemini, and Perplexity accurately reflect your current interest rates, loan products, and wealth management services.",
    trustNote: "Trusted by 500+ financial institutions",
    journey: {
      title: "The Banking AI Research Journey",
      steps: [
        { index: "1", label: "\"Best high-yield savings account?\"" },
        { index: "2", label: "\"Mortgage lender for first-time buyers\"" },
        { index: "3", label: "\"Bank of America vs HDFC vs Chase\"", active: true },
      ],
    },
    painCards: [
      { title: "AI Recommends Competitors", desc: "Your institution is missing from the comparison prompts buyers ask before opening a new account." },
      { title: "Outdated Rates & Fees", desc: "LLMs cite stale APRs, fees, and product terms — prospects arrive expecting offers you no longer run." },
      { title: "Missing High-Intent Journeys", desc: "You are absent from \"mortgage lender for first-time buyers\" and other late-stage queries that drive deposits." },
      { title: "Compliance Liability", desc: "Hallucinated product claims about your bank create real regulatory and reputational risk." },
    ],
    helpsCards: [
      { title: "AI Visibility Tracker", desc: "Monitor coverage across the 6 major AI platforms." },
      { title: "AI Accuracy Audit", desc: "Detect rate, fee, and disclosure hallucinations before customers see them." },
      { title: "Share of Voice", desc: "Benchmark visibility against Chase, BofA, Capital One, and Wells Fargo." },
      { title: "Citation Analysis", desc: "Map the NerdWallet, Forbes, and Bankrate citations driving AI answers." },
      { title: "Query Fan-Out", desc: "Track every banking prompt variation across savings, mortgages, and cards." },
      { title: "Readiness Analyzer", desc: "Score product pages for AI extraction and structured-data coverage." },
    ],
    outcomes: defaultOutcomes,
    withoutItems: [
      "AI recommends competitor banks.",
      "Outdated financial information cited as current.",
      "No visibility tracking across LLMs.",
      "Unknown citation sources shaping answers.",
      "Compliance blind spots in AI output.",
    ],
    withItems: [
      "Monitor AI visibility daily.",
      "Detect misinformation before it spreads.",
      "Benchmark competitors across categories.",
      "Track citation sources by product line.",
      "Improve search presence and trust signals.",
    ],
    faqs: [
      { q: "Why is AI recommending my competitor instead of us?", a: "AI engines cite the institutions with the most structured, machine-readable data and the highest entity density across trusted third-party sources like NerdWallet, Forbes, and Bankrate." },
      { q: "How do you detect AI hallucinations about my bank?", a: "We run automated, structured queries across all major LLMs and cross-reference outputs against your live product documentation, including rates, fees, and disclosures." },
      { q: "How often is visibility updated?", a: "Share of Voice metrics refresh daily. You receive real-time alerts when an AI engine begins citing outdated rates or fees." },
      { q: "Does this help with compliance?", a: "Yes. By catching hallucinated product claims early, you reduce regulatory and reputational exposure from AI-generated misinformation." },
      { q: "Which AI platforms are monitored?", a: "ChatGPT, Perplexity, Claude, Gemini, Copilot, and Grok — natively, per platform." },
      { q: "Can I track multiple competitors?", a: "Yes, you can benchmark up to five competing institutions side-by-side." },
      { q: "Does it work for enterprise banks?", a: "Yes, the platform supports complex, multi-product banking architectures." },
      { q: "How long until I see results?", a: "Once you deploy our recommended schema updates, Perplexity often reflects the changes within 48 hours." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare & Medical",
    shortName: "Healthcare",
    icon: HeartPulse,
    metaTitle: "AI Visibility Software for Healthcare | LLMClicks.ai",
    metaDescription: "Help patients find your practice before AI sends them elsewhere. Monitor provider visibility, detect inaccurate medical data, and benchmark clinics.",
    cardTagline: "Protect patient trust. Eradicate medical hallucinations and own AI citations for specialised treatments and local clinics.",
    badge: { label: "YMYL Sector", tone: "danger" },
    heroPill: "Patient Discovery & Care Visibility",
    heroTitle: "Help Patients Find You Before",
    heroTitleAccent: "AI Sends Them Elsewhere.",
    heroSubtitle: "AI engines are now the first point of care research. If your practice isn't visible in ChatGPT and Gemini, you aren't just losing visibility — you're losing patients.",
    trustNote: "Trusted by 200+ healthcare networks and clinics",
    journey: {
      title: "The Patient AI Journey",
      steps: [
        { index: "Q", label: "\"Best orthopedic clinic near me?\"" },
        { index: "AI", label: "\"I recommend OrthoCenter A, B, and C.\"" },
        { index: "★", label: "Your Clinic (14% visibility score)", active: true },
      ],
    },
    painCards: [
      { title: "Patients Never See You", desc: "AI dominates the patient shortlist stage. If you are not cited, you are not on the list." },
      { title: "Large Chains Crowd You Out", desc: "Mayo, Cleveland, and Johns Hopkins are the default answer. Local practices are invisible by default." },
      { title: "Outdated Treatment Info", desc: "AI cites legacy medical practices and obsolete protocols, eroding patient trust on first contact." },
      { title: "Inaccurate Provider Details", desc: "Wrong specialties, wrong locations, wrong insurance accepted — all hallucinated into recommendations." },
    ],
    helpsCards: [
      { title: "AI Visibility Tracker", desc: "Track visibility for doctors and clinics across all major LLMs." },
      { title: "AI Accuracy Audit", desc: "Flag incorrect medical service data, specialties, and protocols." },
      { title: "Share of Voice", desc: "Benchmark against rival healthcare networks and local groups." },
      { title: "Citation Analysis", desc: "Monitor directories like Healthgrades, WebMD, and Zocdoc that feed AI answers." },
      { title: "Query Fan-Out", desc: "Track treatment, specialty, and \"near me\" prompt variations." },
      { title: "Readiness Analyzer", desc: "Optimise treatment page structure for AI extraction." },
    ],
    outcomes: [
      "Improve Patient Discovery",
      "Increase Appointments",
      "Strengthen Reputation",
      "Improve Local Visibility",
      "Reduce Misinformation",
      "Benchmark Competitors",
    ],
    withoutItems: [
      "AI recommends competing health systems.",
      "Outdated medical information cited as current.",
      "No provider visibility tracking.",
      "Unknown citation sources behind AI answers.",
      "Weak local and \"near me\" visibility.",
    ],
    withItems: [
      "Monitor provider AI visibility daily.",
      "Detect medical misinformation early.",
      "Benchmark competitors across specialties.",
      "Track directory citations by location.",
      "Improve local search presence.",
    ],
    faqs: [
      { q: "How do patients use AI to find care?", a: "Patients use AI to research symptoms, shortlist local specialists, and compare hospital outcomes before they ever search Google." },
      { q: "Can AI display outdated medical information?", a: "Yes. LLMs train on historical data and routinely cite outdated treatment options. We catch these inaccuracies before they affect patient trust." },
      { q: "How is visibility tracked?", a: "We monitor 6+ AI engines daily for your practice's mentions, by location and by specialty." },
      { q: "Can I benchmark against competitors?", a: "Yes — track visibility against named hospitals, clinics, and provider networks in your market." },
      { q: "Which directories influence AI answers?", a: "We monitor Healthgrades, Zocdoc, Yelp, WebMD, and other directories that feed AI citation engines." },
      { q: "How often should I monitor visibility?", a: "We recommend daily tracking to ensure clinical data accuracy and catch hallucinations in real time." },
      { q: "Does it work for multi-location groups?", a: "Yes, we support complex, multi-site provider networks with per-location reporting." },
      { q: "How are medical claims verified?", a: "We audit AI outputs against your ground-truth clinical documentation and approved provider profiles." },
    ],
  },
  { slug: "insurance", name: "Insurance", shortName: "Insurance", icon: Shield, metaTitle: "GEO for Insurance | AI Visibility for Carriers & Brokers | LLMClicks.ai", metaDescription: "How insurance carriers, brokers, and aggregators get cited by AI engines for coverage, claims, and policy queries.", cardTagline: "Bypass aggregators. Ensure AI accurately cites your coverage limits, exclusions, and local brokerage data.", heroPill: "Insurance & Aggregators", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Insurance Carriers.", heroSubtitle: "Get your policies cited correctly by ChatGPT, Perplexity, and Gemini — beyond comparison aggregators.", placeholder: true },
  { slug: "education", name: "Education & EdTech", shortName: "Education", icon: GraduationCap, metaTitle: "GEO for Education | AI Visibility for EdTech & Universities | LLMClicks.ai", metaDescription: "How universities, course platforms, and EdTech brands earn citations in AI-generated learning recommendations.", cardTagline: "Drive enrollment by dominating AI-driven university research, bootcamp comparisons, and tuition queries.", heroPill: "Universities & EdTech", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Education Brands.", heroSubtitle: "Win citations in AI-generated learning, course, and university recommendations.", placeholder: true },
  { slug: "fashion", name: "Fashion & Apparel", shortName: "Fashion", icon: Shirt, metaTitle: "GEO for Fashion | AI Visibility for DTC Brands | LLMClicks.ai", metaDescription: "How fashion and apparel brands structure product data and citations to be recommended by AI shopping assistants.", cardTagline: "Get your collections recommended by AI stylists and conversational shopping assistants.", heroPill: "DTC & Apparel", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Fashion Brands.", heroSubtitle: "Structure product data so AI stylists confidently recommend your collections.", placeholder: true },
  { slug: "ecommerce", name: "Ecommerce & Retail", shortName: "Ecommerce", icon: ShoppingCart, metaTitle: "GEO for Ecommerce | AI Visibility for Online Retail | LLMClicks.ai", metaDescription: "How ecommerce stores, marketplaces, and DTC brands win citations in AI shopping and product recommendation queries.", cardTagline: "Turn conversational AI into your best sales rep. Fix hallucinated SKUs and outdated pricing.", heroPill: "Ecommerce & Retail", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Online Retail.", heroSubtitle: "Win citations in AI shopping queries and stop losing sales to hallucinated SKU data.", placeholder: true },
  { slug: "travel", name: "Travel & Hospitality", shortName: "Travel", icon: Plane, metaTitle: "GEO for Travel | AI Visibility for OTAs, Hotels & Airlines | LLMClicks.ai", metaDescription: "How travel brands, OTAs, hotels, and airlines get cited by AI assistants planning trips for travellers.", cardTagline: "Land your property directly inside AI-generated itineraries. Stop losing top visibility to Expedia.", heroPill: "OTAs, Hotels & Airlines", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Travel Brands.", heroSubtitle: "Get cited by AI travel assistants planning trips, comparing hotels, and booking flights.", placeholder: true },
  { slug: "real-estate", name: "Real Estate", shortName: "Real Estate", icon: Home, metaTitle: "GEO for Real Estate | AI Visibility for PropTech & Brokerages | LLMClicks.ai", metaDescription: "How brokerages, PropTech platforms, and developers get cited in AI-generated property and neighbourhood recommendations.", cardTagline: "Outsmart Zillow and Redfin. Become the cited authority on local property values and neighborhoods.", heroPill: "PropTech & Brokerages", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Real Estate.", heroSubtitle: "Become the cited authority on local property values and neighborhood guides in AI answers.", placeholder: true },
  { slug: "legal", name: "Legal & Law Firms", shortName: "Legal", icon: Scale, metaTitle: "GEO for Legal | AI Visibility for Law Firms & LegalTech | LLMClicks.ai", metaDescription: "How law firms and LegalTech platforms get recommended by AI assistants for legal research and counsel queries.", cardTagline: "Secure your firm's prestige. Stop AI from hallucinating case outcomes and dominate local counsel prompts.", heroPill: "Law Firms & LegalTech", heroTitle: "AI Visibility & GEO for", heroTitleAccent: "Law Firms.", heroSubtitle: "Stop AI from hallucinating case outcomes and dominate local counsel search prompts.", placeholder: true },
];


export const getIndustryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);
