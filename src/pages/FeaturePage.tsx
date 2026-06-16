import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { usePageHeroContent } from "@/hooks/usePageHeroContent";
import TrackerDashboardMockup from "@/components/features/TrackerDashboardMockup";
import AuditDashboardMockup from "@/components/features/AuditDashboardMockup";
import OnPageDashboardMockup from "@/components/features/OnPageDashboardMockup";
import QueryMapperDashboardMockup from "@/components/features/QueryMapperDashboardMockup";
import TrafficDashboardMockup from "@/components/features/TrafficDashboardMockup";
import WizardDashboardMockup from "@/components/features/WizardDashboardMockup";

// Hotlinked hero images from llmclicks.ai (real CDN URLs, one per feature)
const imgAudit = "/legacy-assets/ai-visibility-audit-dashboard-result.webp";
const imgTracker = "/legacy-assets/ai-visibility-tracker-query-results.webp";
const imgOptimizer = "/legacy-assets/ai-seo-audit-dashboard-meta-tag-task.webp";
const imgMapper = "/legacy-assets/ai-query-mapper-gsc-keyword-mapping.webp";
const imgTraffic = "/legacy-assets/llm-traffic-tracker-chatgpt-perplexity-ai-assistants.webp";
const imgWizard = "/legacy-assets/optimization_wizard.webp";
const imgListicle = "/legacy-assets/llmclicks-ai-listicle-marketplace-dashboard.webp";
const imgFanOut = "/legacy-assets/query-fan-out-generator-hero-banner.webp";
const imgComparison = "/legacy-assets/query-fan-out-coverage-dashboard.webp";
const imgEmbedding = "/legacy-assets/semantic-vector-alignment-infographic.webp";

type Step = { title: string; desc: string };
type Card = { title: string; desc: string };
type FAQ = { q: string; a: string };
type Feature = {
  title: string;
  tag: string;
  desc: string;
  image: string;
  intro: { heading: string; subheading: string; body: string; bullets: string[] };
  steps: Step[];
  reportItems: Card[];
  audience: Card[];
  faqs: FAQ[];
  closing: { heading: string; sub: string; cta: string };
};

const featureData: Record<string, Feature> = {
  "ai-visibility-audit": {
    title: "AI Visibility Audit For Your Brand",
    tag: "MONITORING",
    image: imgAudit,
    desc: "People don't search the same way anymore. They ask AI tools for recommendations and trust the results instantly. If your brand doesn't show up, someone else earns the attention.",
    intro: {
      heading: "What Is an AI Visibility Audit?",
      subheading: "See How AI Search Engines Interpret Your Brand",
      body: "AI assistants scan the web, pick a few trusted brands, and present a single answer. They don't show long lists. They summarize. They cite. They rank brands based on meaning, relevance, and authority. This audit checks how your brand appears in AI-generated results, how often you're cited, where you're missing, and why competitors show up instead.",
      bullets: [
        "Which prompts you win and lose",
        "How AI classifies your business",
        "Where visibility gaps affect trust",
        "Whether content aligns with intent",
      ],
    },
    steps: [
      { title: "Enter Website", desc: "Tell us your domain. That's all you need to start." },
      { title: "Select Services", desc: "Pick your primary offerings or add custom ones." },
      { title: "Generate Queries", desc: "We simulate real buyer questions people ask AI tools." },
      { title: "Full Analysis", desc: "See where you rank, who replaces you, and how to fix it." },
    ],
    reportItems: [
      { title: "AI Visibility Score", desc: "A clear score showing how visible your brand is across major AI engines." },
      { title: "AI Citation Intelligence", desc: "Where AI assistants mention your brand and which sources they trust." },
      { title: "Competitor Benchmarking", desc: "A side-by-side comparison showing how you stack up against competitors." },
      { title: "Prompt Coverage", desc: "See which real user prompts trigger your brand and which ones don't." },
      { title: "Missed Opportunities", desc: "Where competitors appear, and you don't. Often the most eye-opening part." },
      { title: "Fix Recommendations", desc: "Specific steps to improve citations, semantic signals, entities, and schema." },
    ],
    audience: [
      { title: "Marketing Teams", desc: "Get a clear view of your AI brand presence." },
      { title: "Founders & CMOs", desc: "Care about brand recognition in the AI era." },
      { title: "SEO Professionals", desc: "Adding AI SEO and generative search workflows." },
      { title: "Growth Teams", desc: "Need visibility across AI assistants, not just Google." },
    ],
    faqs: [
      { q: "What is an AI Visibility Audit?", a: "A full analysis of how your brand appears across AI-generated answers in tools like ChatGPT, Google AI, Perplexity, Copilot, Gemini, and Claude." },
      { q: "Is this the same as an SEO audit?", a: "Not really. SEO audits measure rankings. AI audits measure brand mentions, citation patterns, and how well AI systems understand your content." },
      { q: "What does the audit include?", a: "Your visibility score, prompt coverage, missed opportunities, competitor benchmarks, and clear improvements." },
      { q: "Do I need to be technical?", a: "No. Everything is presented in straightforward language with clear next steps." },
      { q: "How long does it take?", a: "Generate your audit in under two minutes. Enter your website, select offerings, and the system runs real buyer-style queries on multiple AI tools." },
    ],
    closing: { heading: "You're one click away from understanding how AI tools see your brand.", sub: "Run your AI Visibility Audit and get your results in under two minutes.", cta: "Run AI Visibility Audit" },
  },
  "ai-visibility-tracker": {
    title: "AI Visibility Tracker",
    tag: "CONTINUOUS MONITORING",
    image: imgTracker,
    desc: "Track your brand mentions across ChatGPT, Perplexity, Google AI, and Copilot with real-time continuous monitoring. Add or generate LLM queries, analyze competitor visibility, and uncover citation sources shaping AI search results.",
    intro: {
      heading: "Traditional SEO Tools Are Blind to AI Search",
      subheading: "Continuous Monitoring of Your AI Visibility",
      body: "Google Search Console and rank trackers can't tell you if ChatGPT recommends your competitor over you, or which sources AI platforms cite when answering buyer questions. The AI Visibility Tracker transforms your one-time audit into an ongoing performance dashboard.",
      bullets: [
        "Real-Time LLM Query Tracking across multiple platforms",
        "Competitor Visibility Analysis to spot dominance gaps",
        "Citation Source Intelligence for the domains AI relies on",
        "Historical Performance Tracking to measure trends over time",
      ],
    },
    steps: [
      { title: "Add or Generate Queries", desc: "Enter buyer-style prompts or auto-generate them with our AI-powered query builder." },
      { title: "Run Multi-LLM Tracking", desc: "Test visibility across ChatGPT, Perplexity, Google AI, and Copilot in one workflow." },
      { title: "Analyze Results", desc: "See brand mentions, competitor visibility, and citations for each query across all platforms." },
      { title: "Track Over Time", desc: "Monitor success rate, frequency, and share of voice with historical trend analysis." },
    ],
    reportItems: [
      { title: "Visibility Success Rate", desc: "Queries found vs not found, with frequency metrics across every AI platform." },
      { title: "Share of Voice", desc: "Compare how often each brand appears across all queries — benchmark against top competitors." },
      { title: "Citation Analysis", desc: "Top citation domains and distribution across ChatGPT, Perplexity, Gemini, and Copilot." },
      { title: "Voice of Search", desc: "Spot which brands dominate conversations across your queries." },
      { title: "Performance Analytics", desc: "Visual charts showing visibility trends and platform performance over time." },
      { title: "Multi-Platform Coverage", desc: "Track ChatGPT, Perplexity, Google AI, and Microsoft Copilot simultaneously." },
    ],
    audience: [
      { title: "Marketing Teams", desc: "Move beyond audits into ongoing AI search optimization." },
      { title: "SEO Professionals", desc: "Extend rank tracking into the LLM citation layer." },
      { title: "Agencies", desc: "Deliver continuous AI visibility reports for every client." },
      { title: "Brand Managers", desc: "Catch sudden drops or hallucinations before they hurt pipeline." },
    ],
    faqs: [
      { q: "How can I track my visibility across ChatGPT, Perplexity, and Google AI?", a: "The Tracker runs real search-style queries across all major AI platforms, analyzes where your brand appears, and highlights where competitors dominate. You get daily updates, appearance rates, citations, and direct links to AI answers." },
      { q: "Can I monitor competitor visibility?", a: "Yes. The tracker shows mentions for every competitor you add, along with appearance rate, share of voice, and which queries they dominate." },
      { q: "Does it monitor mentions continuously?", a: "Yes. Once your queries are added, the tracker refreshes data regularly and shows how often you appear across AI assistants — daily and weekly trends, historical patterns, and sudden shifts." },
      { q: "Can the tracker measure citation sources?", a: "Yes. Citation Analysis shows which domains AI platforms cite, how often each source appears, and which content influences AI results." },
      { q: "How do I know if my AI visibility is improving?", a: "The tracker gives you a visibility score, appearance rate, trend charts, and platform-by-platform performance over time." },
    ],
    closing: { heading: "Ready to Track Your AI Visibility?", sub: "Stay ahead of competitors by monitoring how often AI platforms cite your brand and what sources shape the answers.", cta: "Start Tracking Now" },
  },
  "on-page-optimizer": {
    title: "On-Page Optimizer",
    tag: "OPTIMIZATION",
    image: imgOptimizer,
    desc: "Analyze and optimize your content structure for maximum AI discoverability. Query Fan-Out Coverage, Content Comparison, and the Content Embedding Analyzer in one suite.",
    intro: {
      heading: "Fix the Signals AI Engines Actually Read",
      subheading: "Schema, EEAT, embeddings — handled in one place",
      body: "AI search rewards pages that are semantically clear, well-structured, and contextually complete. The On-Page Optimizer pinpoints exactly which signals are missing, which sections under-perform against competitors, and which embeddings drift from buyer intent.",
      bullets: [
        "Query Fan-Out Coverage analysis across long-tail intents",
        "Content Comparison against the top AI-cited competitors",
        "Content Embedding Analyzer to map semantic drift",
        "Schema, metadata, and EEAT recommendations per page",
      ],
    },
    steps: [
      { title: "Scan Page", desc: "Drop a URL. The optimizer analyzes structure, schema, and semantic payload." },
      { title: "Compare", desc: "Benchmark against top-cited competitor pages for the same query cluster." },
      { title: "Fix", desc: "Get prioritized rewrites: headings, FAQ blocks, schema, and entity reinforcement." },
      { title: "Re-score", desc: "Re-run the analysis to confirm improvements and lock in citation-ready structure." },
    ],
    reportItems: [
      { title: "Query Fan-Out Coverage", desc: "See every long-tail variant AI splits your query into — and which ones your page misses." },
      { title: "Content Comparison", desc: "Side-by-side gaps between your page and the top AI-cited competitors." },
      { title: "Embedding Analyzer", desc: "Vector-level drift detection between your content and target buyer intent." },
      { title: "Schema Validator", desc: "JSON-LD checks tuned for LLM agents, not just Google rich snippets." },
      { title: "EEAT Signals", desc: "Author, expertise, and trust signal recommendations per page." },
      { title: "Prioritized Tasks", desc: "Each finding becomes an actionable task ranked by visibility impact." },
    ],
    audience: [
      { title: "SEO Specialists", desc: "Extend on-page workflows into AI visibility." },
      { title: "Content Teams", desc: "Know exactly what to rewrite and why." },
      { title: "Agencies", desc: "Deliver page-level optimization plans for every client." },
      { title: "Founders", desc: "Ship AI-ready pages without a full SEO team." },
    ],
    faqs: [
      { q: "What does the On-Page Optimizer check?", a: "It scans semantic payload, JSON-LD schema, entity density, query fan-out coverage, EEAT signals, and embedding alignment with target intent." },
      { q: "How is this different from a normal SEO audit?", a: "Standard audits check keywords and meta tags. We score how easily an LLM can extract, attribute, and cite your content." },
      { q: "Can I compare my page to competitors?", a: "Yes. Content Comparison surfaces the structural and semantic gaps between your page and the top AI-cited competitor pages." },
      { q: "Does it generate tasks?", a: "Every finding becomes a prioritized task with a clear next step — rewrite a section, add schema, or expand coverage." },
    ],
    closing: { heading: "Stop guessing what AI engines want.", sub: "Run the On-Page Optimizer and turn every page into an AI-ready citation source.", cta: "Optimize My Pages" },
  },
  "ai-query-mapper": {
    title: "AI Query Mapper",
    tag: "AUTOMATED GSC KEYWORD MAPPING",
    image: imgMapper,
    desc: "Stop keyword cannibalization. Master AI intent. Automatically map AI-style queries to your site pages using Google Search Console data, classify intent, and get query-specific tasks.",
    intro: {
      heading: "What is AI Query Mapper?",
      subheading: "Turn Queries into Page-Level Actions",
      body: "Not all queries are equal. Some highlight opportunities, others expose content gaps. AI Query Mapper connects AI-style queries with your real website performance by mapping queries to the right pages, assigning confidence scores, and generating actionable tasks.",
      bullets: [
        "Map queries to the right pages using GSC data",
        "Assign confidence scores for accuracy",
        "Auto-generate tasks like add schema or optimize headings",
        "Solve cannibalization by giving each query one authority page",
      ],
    },
    steps: [
      { title: "Fetch GSC Data", desc: "Import top-performing pages and question keywords from Google Search Console." },
      { title: "Classify Query Intent", desc: "AI categorizes every query as Informational, Transactional, Comparison, Local, or Brand." },
      { title: "Map Queries to Pages", desc: "Match every query to the most relevant page using overlap, CTR, and ranking signals." },
      { title: "Generate Tasks", desc: "Get specific actions per page — add schema, optimize headings, or expand content." },
      { title: "Prioritize Wins", desc: "Spot opportunities flagged Optimize Now, Content Gap, or New Page Needed." },
    ],
    reportItems: [
      { title: "Solve Cannibalization", desc: "Identify when 2+ pages rank for the same term and confuse AI. Merge them or re-target." },
      { title: "Quick Win Filters", desc: "Filter for High Impression / Low CTR queries where small fixes double traffic." },
      { title: "AI-Ready Schema", desc: "Mapping a How-to query? The tool prompts you to add HowTo schema automatically." },
      { title: "Confidence Scoring", desc: "Every match comes with a score based on GSC data, keyword similarity, and performance." },
      { title: "Intent Classification", desc: "Every query labeled Informational, Transactional, Comparison, Local, or Brand." },
      { title: "High ROI Focus", desc: "Focus effort on high-intent queries with the biggest visibility return." },
    ],
    audience: [
      { title: "SEO Teams", desc: "Stop guessing which page should rank — let GSC data decide." },
      { title: "Content Strategists", desc: "Find content gaps before they hurt AI visibility." },
      { title: "Agencies", desc: "Deliver structured query-to-page roadmaps for every client." },
      { title: "Growth Teams", desc: "Convert AI insights into SEO tasks the team can act on." },
    ],
    faqs: [
      { q: "How does AI Query Mapper work?", a: "It clusters each query into Informational, Transactional, Comparison, Brand, or Local intent, then uses GSC data — impressions, keyword overlap, CTR, rankings — to map each query to the most relevant page." },
      { q: "How does it help me find content gaps?", a: "When a query doesn't align with any page, the system marks it as a content gap and generates tasks like create a new page, add schema, or expand this section." },
      { q: "Does it show confidence scores?", a: "Yes. Every match comes with a confidence score based on GSC data, keyword similarity, page relevance, and historical performance." },
      { q: "Does it improve AI search visibility too?", a: "Yes. Aligning content with AI-style queries strengthens both SEO and AI visibility — AI assistants prefer pages that match clear user intent." },
      { q: "How often should I run it?", a: "Most teams run mapping weekly or after adding new content, since user intent and AI platforms evolve quickly." },
    ],
    closing: { heading: "Build a Site Structure AI Loves", sub: "Stop guessing. Start mapping your intent to the right pages.", cta: "Start Mapping Queries" },
  },
  "llm-traffic-tracker": {
    title: "LLM Traffic Tracker",
    tag: "AI BOT ANALYTICS",
    image: imgTraffic,
    desc: "Monitor which AI bots visit your website. See which pages ChatGPT, Perplexity, Claude, and Gemini crawl, when they scan your content, and how often. The first step to AI visibility is knowing which AI bots are already discovering you.",
    intro: {
      heading: "Why Tracking AI Search Traffic Matters",
      subheading: "Google Analytics doesn't track AI bots — we do",
      body: "AI search engines like ChatGPT, Perplexity, and Google's AI Mode are the new gatekeepers of web traffic. When these AI bots crawl your website, they're deciding whether to cite your content in AI-generated answers seen by millions. Your traditional analytics is blind to this.",
      bullets: [
        "Which AI bots are visiting — ChatGPT, Claude, Perplexity, Gemini, and 10+ more",
        "How AI search traffic trends day, week, and month",
        "Which pages AI crawlers prioritize most",
        "Real-time bot logs with timestamps and page-level data",
      ],
    },
    steps: [
      { title: "Install Free Plugin", desc: "Search LLM Traffic Tracker in WordPress or upload the ZIP. Setup takes under 60 seconds." },
      { title: "Connect Dashboard", desc: "Enter your free LLMClicks API key. Bot traffic syncs automatically and securely." },
      { title: "Monitor in Real-Time", desc: "Watch your dashboard populate with AI bot visits across every major LLM crawler." },
    ],
    reportItems: [
      { title: "AI Bot Visits by Model", desc: "Traffic breakdowns for ChatGPT, Claude, Perplexity, Gemini, and more." },
      { title: "Daily & Weekly Trends", desc: "Spot patterns and correlate bot spikes with content updates." },
      { title: "Top Pages by AI Engagement", desc: "Identify which URLs attract the most AI search traffic." },
      { title: "Comparative Growth", desc: "Month-over-month and year-over-year comparisons of AI traffic." },
      { title: "Real-Time Bot Logs", desc: "Live activity as AI crawlers visit, with full historical data." },
      { title: "Privacy-Safe Logging", desc: "Zero personal data. Fully GDPR, CCPA, and privacy-regulation compliant." },
    ],
    audience: [
      { title: "Marketing Teams & CMOs", desc: "Understand brand discovery in the AI layer." },
      { title: "Founders & Product Leads", desc: "Track how often AI models visit your key pages." },
      { title: "SEO Professionals", desc: "Extend analytics from search engines to LLMs." },
      { title: "Agencies & Consultants", desc: "Add AI traffic tracking to every client audit." },
    ],
    faqs: [
      { q: "What is AI search traffic?", a: "Visits from AI-powered search engine crawlers like ChatGPT's GPTBot, PerplexityBot, Claude-Web, and Google's AI crawlers. They scan websites to gather content for AI-generated answers." },
      { q: "Which AI bots does this track?", a: "ChatGPT (GPTBot), Perplexity (PerplexityBot), Claude (Claude-Web), Gemini (GoogleOther), and 10+ more including Anthropic-AI, Meta-ExternalAgent, and Cohere-AI." },
      { q: "Is this really free forever?", a: "Yes. The core bot tracking is free with no limits or trial. Advanced features like brand mention monitoring are available in LLMClicks Pro." },
      { q: "Does it slow down my site?", a: "No. The plugin is lightweight, processes data asynchronously, and adds no noticeable load time." },
      { q: "Can I export my data?", a: "Yes. Export AI search traffic reports in CSV format for any date range." },
    ],
    closing: { heading: "Start Monitoring Your AI Search Traffic", sub: "Join thousands of websites tracking AI bot visits with the only free AI search traffic monitor built for WordPress.", cta: "Install Free Plugin" },
  },
  "optimization-wizard": {
    title: "Optimization Wizard",
    tag: "AI SEO ACTION PLANNER",
    image: imgWizard,
    desc: "Audits give you 100 problems. The Optimization Wizard gives you one prioritized plan. Turn scattered data, coverage gaps, and technical errors into a step-by-step roadmap for your writers and developers.",
    intro: {
      heading: "What is the SEO Optimization Wizard?",
      subheading: "Your Answer to What Should I Do Next?",
      body: "The Wizard pulls findings from On-Page Audits, Query Mappers, Fan-Out gaps, and Content Comparisons. It runs the Rank Wizard AI to evaluate every issue based on difficulty, urgency, and visibility impact, then builds a clean, client-ready task list showing exactly what to fix first.",
      bullets: [
        "Centralizes insights from every LLMClicks tool",
        "Auto-prioritizes tasks by visibility impact and effort",
        "Builds page-mapped, step-by-step optimization plans",
        "Assignable to writers, SEOs, or developers",
      ],
    },
    steps: [
      { title: "Collect Insights", desc: "The Wizard gathers findings from your audits, analysis tools, LLM checks, and GSC signals." },
      { title: "Auto-Prioritize", desc: "Tasks are ranked by visibility impact, effort, urgency, page importance, and query value." },
      { title: "Guided Plan", desc: "A step-by-step, page-mapped plan showing exactly what to fix, rewrite, or create." },
      { title: "Assign to Team", desc: "Tasks can be assigned to content writers, SEOs, or developers." },
      { title: "Track Progress", desc: "Check off completed items, re-run analyses, and watch AI visibility improve." },
    ],
    reportItems: [
      { title: "Centralized Insights", desc: "Pulls data from all tools — no more scattered audits or messy spreadsheets." },
      { title: "Smart Prioritization", desc: "Ensures your team doesn't waste time on low-impact technical work." },
      { title: "Client-Ready Plans", desc: "Professional, formatted optimization roadmaps you can hand straight to a client." },
      { title: "Saves Massive Time", desc: "Hours of manual work turned into actionable tasks automatically." },
      { title: "Insight to Action", desc: "Moves clients from discovery to execution faster than any traditional SEO workflow." },
      { title: "Justifies Retainers", desc: "Provides clear, structured roadmaps that prove ongoing value." },
    ],
    audience: [
      { title: "SEO Agencies", desc: "Deliver consistent improvement plans for every client." },
      { title: "In-House SEO", desc: "Stop juggling tools — one wizard, one plan." },
      { title: "Content Teams", desc: "Know exactly what to rewrite, expand, or create next." },
      { title: "Developers", desc: "Receive clear, prioritized technical fixes." },
    ],
    faqs: [
      { q: "How does the Wizard decide which issues matter most?", a: "It evaluates every issue using visibility impact, difficulty, urgency, affected pages, and query value — prioritizing tasks that influence AI visibility fastest." },
      { q: "Can it combine insights from multiple tools?", a: "Yes. It pulls findings from On-Page Optimizer, Query Mapper, Fan-Out Coverage, Embedding Analyzer, Content Comparison, and LLM Visibility checks into one unified plan." },
      { q: "What kinds of tasks does it generate?", a: "Rewrite weak sections, fix headings, improve schema, add FAQs, expand topic coverage, strengthen internal links, address content gaps, or create new pages." },
      { q: "Does it work for traditional SEO too?", a: "Yes. The Wizard improves AI visibility across ChatGPT, Perplexity, Copilot, and Google AI, plus traditional on-page and semantic SEO." },
      { q: "How often should I use it?", a: "Most teams run it weekly or after major content updates. Each re-run refreshes the task list based on the latest findings." },
    ],
    closing: { heading: "Turn Insights Into Results", sub: "Stop juggling reports. Use one wizard to turn every audit and analysis into a structured AI SEO optimization plan.", cta: "Build Your First Action Plan" },
  },
  "ai-listicle-marketplace": {
    title: "AI Listicle Marketplace",
    tag: "GEO PLACEMENT ENGINE",
    image: imgListicle,
    desc: "Standard guest posts do not influence LLMs. Buy placements in the AI-cited listicles that train ChatGPT, Perplexity, and Gemini to recommend your brand. The only GEO placement engine built for SaaS.",
    intro: {
      heading: "Why Your Link Building Is Invisible to AI Search",
      subheading: "Train ChatGPT to Recommend Your Brand",
      body: "You publish content. You build backlinks. You rank on Google. Then a buyer asks ChatGPT for the best tool in your category and your competitor is in the answer — not you. LLMs build recommendations from structured Top 10 and Best of listicles, not backlink graphs. The AI Listicle Marketplace is the first platform that connects SaaS brands with publishers who own the AI-cited listicles.",
      bullets: [
        "1,200+ vetted publisher domains with AI Citation badges (GPT, CLD, PPLX)",
        "Topical Alignment Score per domain — High, Medium, or Low",
        "Manual LinkedIn-verified provider vetting on every listing",
        "AI Sources Integration — go from audit data to placement in one click",
      ],
    },
    steps: [
      { title: "Browse AI-Vetted Domains", desc: "Filter by category, placement type, and price. Sort by AI Relevance to surface high-impact placements." },
      { title: "Analyze and Contact", desc: "View placement types — Guest Post, Link Insertion, Brand Mention. Chat directly with the provider in-platform." },
      { title: "Place Your Order", desc: "Track status through Pending, Approved, In Progress, Reviewing, and Completed stages." },
      { title: "Measure Citation Lift", desc: "Use the AI Visibility Tracker to monitor citation frequency across ChatGPT, Perplexity, and Gemini after each placement." },
    ],
    reportItems: [
      { title: "AI Citation Presence Badges", desc: "Live scans across ChatGPT, Claude, and Perplexity confirm which engines already cite the publisher." },
      { title: "Topical Alignment Score", desc: "High / Medium / Low score on how closely a domain matches AI-generated queries in your category." },
      { title: "AI Sources Integration", desc: "Cited domains from your audit show a Buy Placement button inline. One click from analysis to action." },
      { title: "Unified Chat System", desc: "All buyer-provider communication stays inside the platform. No email chains, no external tools." },
      { title: "Manual Provider Vetting", desc: "Every provider passes LinkedIn verification and admin review before listings go live." },
      { title: "Admin-Mediated Disputes", desc: "If issues arise, the LLMClicks moderation team joins the order conversation directly." },
    ],
    audience: [
      { title: "SaaS Founders & Marketing Teams", desc: "Get visible in the AI search layer where buyers form shortlists before visiting any website." },
      { title: "SEO Agencies", desc: "Bulk CSV import and order management make scalable, multi-client GEO delivery efficient." },
      { title: "Brand Managers", desc: "Systematically fix incorrect or missing AI citations affecting pipeline." },
      { title: "Publishers & Site Owners", desc: "Monetize high-ranking comparison pages and category listicles with verified buyers." },
    ],
    faqs: [
      { q: "How is this different from a standard backlink marketplace?", a: "Standard marketplaces optimize for Google's signals — DA, anchor text, link equity. The AI Listicle Marketplace optimizes for LLM training signals — AI citation frequency, topical alignment, and semantic co-occurrence. You're not buying a link; you're buying a placement on a domain generative engines already trust." },
      { q: "How does LLMClicks verify AI citation data?", a: "The AI Relevance Engine runs live queries across ChatGPT, Claude, and Perplexity after each domain is listed. It checks which domains are cited for category queries, assigns a Topical Alignment Score, and displays AI Citation badges. Scores update automatically as patterns shift." },
      { q: "How quickly will placements affect my AI visibility?", a: "There is no guaranteed timeline because LLM training cycles vary. High-relevance domains with strong existing AI citation history show measurable impact faster. Use the AI Visibility Tracker to monitor lift after each placement." },
      { q: "How do I know if a provider is legitimate?", a: "All providers pass LinkedIn OAuth verification and a manual admin review before listings go live. Profiles display completed orders, average ratings, and a Trusted or New badge." },
      { q: "I own high-ranking listicles. How do I get listed?", a: "Click Become a Provider in the marketplace, verify via LinkedIn, and submit your business profile. High-relevance domains already cited by ChatGPT, Claude, or Perplexity are prioritised." },
    ],
    closing: { heading: "Every Week You Wait Is a Week of LLM Training Your Competitors Get Instead", sub: "Browse the marketplace, filter by your category and AI relevance, and place your first GEO placement today.", cta: "Browse Listicle Placements" },
  },
  "query-fan-out-coverage": {
    title: "Query Fan-Out Generator & Coverage Analyzer",
    tag: "AI COVERAGE",
    image: imgFanOut,
    desc: "Don't guess. Simulate the 20+ sub-queries Google AI generates and instantly check if your content covers them. The scientific way to win AI Overviews and increase citation probability.",
    intro: {
      heading: "What is Query Fan-Out Coverage?",
      subheading: "And Why AI Needs It",
      body: "Query Fan-Out is the information retrieval technique used by Google AI Overviews (Gemini) to break a single complex user query into multiple, simpler sub-queries. Instead of matching one keyword, the AI fans out your request into diverse intents to synthesize a complete answer. If your content doesn't answer these specific fan-out queries, AI won't cite you.",
      bullets: [
        "LLM Judge Scoring on every covered and missing sub-query",
        "Patent-based fan-out methodology aligned with Google's Gemini retrieval",
        "Actionable task lists tied to real content gaps",
        "Visual coverage map of green covered nodes vs red missing nodes",
      ],
    },
    steps: [
      { title: "Enter Your Seed Query", desc: "Drop your target query and the URL you want to evaluate." },
      { title: "Fan-Out Simulation", desc: "We simulate the 20+ sub-queries Google AI generates from that seed query." },
      { title: "LLM Judge Scoring", desc: "Each sub-query is scored against your page to detect covered and missing intents." },
      { title: "Get Your Task List", desc: "Receive a prioritized list of new sections, FAQs, and rewrites to close every gap." },
    ],
    reportItems: [
      { title: "Sub-Query Generator", desc: "Auto-generates the full set of sub-queries Google AI synthesizes from one seed." },
      { title: "Coverage Map", desc: "Visual diagram of covered (green) and missing (red) nodes for instant gap analysis." },
      { title: "LLM Judge Scoring", desc: "Each sub-query scored individually against your page content for true completeness." },
      { title: "Actionable Tasks", desc: "Every gap converts into a writer-ready task: add FAQ, expand section, create new heading." },
      { title: "Patent-Based Methodology", desc: "Built on the published query fan-out patents that power Google AI Overviews." },
      { title: "Citation Probability Lift", desc: "Higher coverage = higher probability of being cited in AI Overviews and ChatGPT answers." },
    ],
    audience: [
      { title: "SEO Specialists", desc: "Move beyond keyword matching into true topical completeness." },
      { title: "Content Strategists", desc: "Know exactly which sub-topics your pillar pages must cover." },
      { title: "Agencies", desc: "Deliver coverage gap reports as a premium retainer deliverable." },
      { title: "Founders", desc: "Win AI Overview citations without a full SEO team." },
    ],
    faqs: [
      { q: "What is query fan-out?", a: "An information retrieval technique used by Google AI Overviews to break one complex user query into 20+ simpler sub-queries, then synthesize a complete answer from sources that cover them." },
      { q: "How does this improve AI citations?", a: "AI engines reward completeness. Covering every sub-query in the fan-out dramatically increases the probability your page is cited in the synthesized answer." },
      { q: "Is this only for Google AI Overviews?", a: "No. ChatGPT, Perplexity, and Claude all use related retrieval-augmented techniques. Strong fan-out coverage helps citation probability across every major LLM." },
      { q: "How is the LLM Judge scored?", a: "Each sub-query is independently evaluated against your page using an LLM scoring model that checks for direct answer presence, depth, and entity clarity." },
    ],
    closing: { heading: "Stop Guessing What AI Wants to See", sub: "Run a free fan-out coverage analysis and turn missed sub-queries into citation-ready content.", cta: "Run Free Fan-Out Analysis" },
  },
  "content-comparison": {
    title: "Content Comparison",
    tag: "AI BENCHMARKING",
    image: imgComparison,
    desc: "See how your page stacks up against competitors cited by AI systems like ChatGPT, Perplexity, and Copilot. Identify content gaps, improve structure, and increase your chances of AI visibility.",
    intro: {
      heading: "Benchmark Your Content Against AI-Cited Competitors",
      subheading: "Collect → Compare → Identify → Optimise",
      body: "LLMs don't just pick any content — they cite structured, comprehensive, and authoritative pages. Content Comparison runs side-by-side analysis of your page versus competitor pages already being cited in AI answers, exposing structural gaps, missing sections, and entity deficiencies.",
      bullets: [
        "Collect competitor citations directly from AI visibility analysis",
        "Compare side-by-side: headings, entities, schema, structure",
        "Identify missing sections and weak heading hierarchies",
        "Optimise to match or outperform AI-cited competitors",
      ],
    },
    steps: [
      { title: "Set Your Seed URL", desc: "Pick the page you want to make AI-citation worthy." },
      { title: "Select Competitor Citations", desc: "Pick competitor URLs that are already appearing in AI-generated answers." },
      { title: "Run Side-by-Side Analysis", desc: "We compare structure, entities, headings, schema, and topical coverage." },
      { title: "Get Optimization Tasks", desc: "Convert every gap into a prioritized writer or developer task." },
    ],
    reportItems: [
      { title: "Strength Map", desc: "Visualize where your content already outperforms competitors." },
      { title: "Partial Coverage Areas", desc: "Sections you cover but with weaker depth than the AI-cited competitor." },
      { title: "Missing Topics", desc: "Topics competitors cover that your page completely misses." },
      { title: "Heading & Schema Gaps", desc: "Structural deficits that affect machine readability and citation eligibility." },
      { title: "Entity Coverage", desc: "Named entities, products, and people the competitor mentions and you don't." },
      { title: "Prioritized Rewrites", desc: "Every gap converts into an actionable task ranked by visibility impact." },
    ],
    audience: [
      { title: "SEO Specialists", desc: "Move audits beyond rankings into AI citation eligibility." },
      { title: "Content Teams", desc: "Know exactly which sections to expand or rewrite — no guesswork." },
      { title: "Agencies", desc: "Deliver competitor benchmarking as a recurring retainer deliverable." },
      { title: "Founders", desc: "Close the gap to AI-cited competitors without doubling content output." },
    ],
    faqs: [
      { q: "Where do the competitor URLs come from?", a: "Directly from your AI Visibility Audit and Tracker — the URLs ChatGPT, Perplexity, and Copilot are actually citing for your target queries." },
      { q: "What does the comparison check?", a: "Heading structure, entity coverage, JSON-LD schema, topical depth, FAQ presence, and semantic alignment with target intent." },
      { q: "How does this help AI visibility?", a: "AI engines cite the most complete, structured pages. Closing the gap to AI-cited competitors directly increases your citation probability." },
      { q: "Can I compare multiple competitors at once?", a: "Yes. Add multiple competitor URLs to surface every gap across your top AI-cited rivals in a single analysis." },
    ],
    closing: { heading: "See How Your Content Stacks Up", sub: "Compare your page against the competitors AI is already citing — and close every gap.", cta: "Compare My Content" },
  },
  "content-embedding-analyzer": {
    title: "Content Embedding Analyzer",
    tag: "SEMANTIC ANALYSIS FOR LLM SEO",
    image: imgEmbedding,
    desc: "Go beyond keyword matching. We transform your text into numerical vectors to measure semantic alignment with LLM queries and GSC keywords section by section.",
    intro: {
      heading: "Semantic Content Analysis for LLM SEO",
      subheading: "Parse → Score → Recommend → Optimise",
      body: "Search is moving from keywords to semantic relevance. The Content Embedding Analyzer uses AI embeddings, transforming your text into numerical vectors to map the meaning of your data. It measures the angle between your content's vector and the user's query vector, cross-references with GSC keywords and LLM logic, and pinpoints which sections are semantically invisible.",
      bullets: [
        "Section-by-section semantic similarity scoring",
        "Cross-references both GSC keywords and LLM query logic",
        "Auto-generates actionable rewrite recommendations",
        "Re-validates improvements with re-analysis",
      ],
    },
    steps: [
      { title: "Parse", desc: "Break content into logical sections using headings and document structure." },
      { title: "Score", desc: "Calculate semantic similarity with LLM queries and GSC keywords for each section." },
      { title: "Recommend", desc: "Auto-generate actionable content improvements per low-scoring section." },
      { title: "Optimise & Re-analyze", desc: "Fix weak areas and validate improvements with re-analysis." },
    ],
    reportItems: [
      { title: "Section-Level Scoring", desc: "Each H2/H3 section scored individually for semantic alignment with target intent." },
      { title: "Vector Drift Detection", desc: "Pinpoints sections that have drifted away from buyer intent at the embedding level." },
      { title: "GSC Keyword Mapping", desc: "Cross-checks alignment with your real Google Search Console keyword data." },
      { title: "LLM Query Alignment", desc: "Measures alignment with the questions LLMs actually receive in your category." },
      { title: "Rewrite Recommendations", desc: "Auto-generated rewrite suggestions for every semantically weak section." },
      { title: "Re-Validation", desc: "Re-run analysis post-edit to confirm semantic lift before publishing." },
    ],
    audience: [
      { title: "SEO Specialists", desc: "Add semantic depth analysis to your standard on-page workflow." },
      { title: "Content Teams", desc: "Stop guessing why a section underperforms — see the vector evidence." },
      { title: "Agencies", desc: "Deliver semantic gap reports as a premium service line." },
      { title: "AI SEO Practitioners", desc: "Ship pages tuned to embedding-based retrieval, not just keyword matching." },
    ],
    faqs: [
      { q: "What is a content embedding?", a: "A numerical vector representation of your text's meaning. Two pieces of text with similar meaning produce similar vectors, even if the exact words differ." },
      { q: "How is this different from keyword analysis?", a: "Keywords measure literal word matches. Embeddings measure conceptual alignment — letting you see whether your content actually means what your buyers are asking, not just whether it contains the right words." },
      { q: "Does it work with my GSC data?", a: "Yes. The analyzer cross-references your real GSC query data, so recommendations are tied to keywords you already get impressions for." },
      { q: "How often should I re-run it?", a: "After every major edit. Re-analysis confirms whether your rewrite actually moved the semantic score in the right direction." },
    ],
    closing: { heading: "See How AI Models Embed & Interpret Your Content", sub: "Run an embedding analysis and turn semantically invisible sections into citation-ready content.", cta: "Run an Analysis" },
  },
};

const FeaturePage = ({ forcedSlug }: { forcedSlug?: string } = {}) => {
  const params = useParams();
  const slug = forcedSlug ?? params.slug;
  const feature = slug && featureData[slug] ? featureData[slug] : null;
  const hero = usePageHeroContent({
    title: feature?.title ?? "",
    subtitle: feature?.desc,
    eyebrow: feature?.tag,
  });

  if (!feature) {
    return (
      <Layout>
        <section className="section-padding pt-28 md:pt-36">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Feature not found</h1>
            <p className="text-muted-foreground mb-6">The feature you're looking for doesn't exist.</p>
            <a href="/" className="text-accent underline hover:text-accent/80">Return to Home</a>
          </div>
        </section>
      </Layout>
    );
  }

  const Mockup = () => (
    slug === "ai-visibility-audit" ? <AuditDashboardMockup /> :
    slug === "ai-visibility-tracker" ? <TrackerDashboardMockup /> :
    slug === "on-page-optimizer" ? <OnPageDashboardMockup /> :
    slug === "ai-query-mapper" ? <QueryMapperDashboardMockup /> :
    slug === "llm-traffic-tracker" ? <TrafficDashboardMockup /> :
    slug === "optimization-wizard" ? <WizardDashboardMockup /> :
    <img src={feature.image} alt={`${feature.title} dashboard preview`} className="w-full h-auto object-cover" loading="lazy" />
  );

  return (
    <Layout>
      {/* HERO */}
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute inset-0 accent-mesh pointer-events-none opacity-50" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="tag-pill mb-4 mx-auto">{hero.eyebrow || feature.tag}</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl mx-auto">{hero.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{hero.subtitle || feature.desc}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-7 glow-hover" asChild>
                <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">Try {feature.title.split(" ").slice(0,3).join(" ")} Free <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="https://calendly.com/shripad" target="_blank" rel="noopener noreferrer">Book a Demo</a>
              </Button>
            </div>
          </motion.div>

          <motion.div className="rounded-2xl border border-border overflow-hidden gradient-border glow-hover" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Mockup />
          </motion.div>
        </div>
      </section>

      {/* INTRO / WHAT IT IS */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-accent text-sm font-semibold mb-2">{feature.intro.subheading}</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">{feature.intro.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{feature.intro.body}</p>
            </div>
            <div className="space-y-3">
              {feature.intro.bullets.map((b, i) => (
                <motion.div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shimmer-card" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <p className="text-sm">{b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="tag-pill mx-auto mb-3">HOW IT WORKS</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">From signal to action in a few clear steps</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {feature.steps.map((s, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-card p-6 relative" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="text-xs font-mono text-accent mb-3">STEP {i + 1}</div>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GET */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="tag-pill mx-auto mb-3">WHAT'S INSIDE</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Everything you get in your report</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {feature.reportItems.map((r, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors shimmer-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="tag-pill mx-auto mb-3">WHO IT'S FOR</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Built for every team taking AI search seriously</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {feature.audience.map((a, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-card p-6" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <h3 className="font-display text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <div className="tag-pill mx-auto mb-3">FAQ</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">We're here to help</h2>
            <p className="text-muted-foreground">Common questions about {feature.title}.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {feature.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <motion.div className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center gradient-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{feature.closing.heading}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{feature.closing.sub}</p>
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                {feature.closing.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturePage;
