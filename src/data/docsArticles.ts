// Auto-generated from llmclicks.ai live docs. All images hotlinked.
export type DocSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface DocArticle {
  slug: string; title: string; excerpt: string; date: string;
  image: string; category: string; content: DocSection[];
}

export const docs: DocArticle[] = [
  {
    "slug": "how-to-use-prompt-tracker",
    "title": "Prompt Tracker Docs: Monitor LLM Visibility",
    "excerpt": "A complete walkthrough of the LLMClicks.ai Prompt Tracker. Discover how to configure custom inputs, isolate AI outputs, and map your share of voice.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Prompt_tracker_1.png",
    "category": "Visibility Tracking",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Visibility Tracking & Analytics How to use Prompt Tracker How to use Prompt Tracker Prompt Tracker monitor your brand mentions across ChatGPT, Perplexity, Google AI, and Copilot. Add or generate LLM queries, track your visibility in real time, and uncover competitor dominance and citation sources shaping AI search."
      },
      {
        "type": "h2",
        "text": "Steps to use the Prompt Tracker #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "Open My Projects from the left navigation to view all projects you’ve created.",
          "Click New Project (top-right) to start adding a new website project.",
          "The project grid gives a quick summary of each project (health score, pages count, created date)."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Fill Project Name and Domain (required).",
          "Optionally set Location and choose Business Type / Industry to get targeted query suggestions.",
          "(Optional) Add team emails to invite collaborators.",
          "Click Create Project to add the project to your dashboard — you’ll be taken back to the project grid with the new card visible."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "Click View to open the project dashboard where you can run audits, see pages, and review insights.",
          "Click Wizard to run the guided setup (adds sitemaps, configures checks, and generates initial tasks).",
          "Use the plus/menu button to connect integrations or perform additional actions (depending on your UI)."
        ]
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "Open Prompt Tracker from the left menu.",
          "Select the project you want to analyze from the Project Selection dropdown.",
          "Use Executive Summary / Preview Report / Share Report to export or share results.",
          "The active tab Keywords & Results is selected, showing immediate summary tiles (Total Queries, Brand Found, Not Found, Success Rate, Your Links).",
          "Click Add Queries to add more prompt queries to be tested.",
          "Use Recheck Queries to re-run the selected queries across the active AI platforms (useful after site updates).",
          "Click Export CSV to download the raw results for offline review or reporting."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Open Prompt Tracker from the left menu.",
          "Select the project you want to analyze from the Project Selection dropdown.",
          "Use Executive Summary / Preview Report / Share Report to export or share results.",
          "The active tab Keywords & Results is selected, showing immediate summary tiles (Total Queries, Brand Found, Not Found, Success Rate, Your Links).",
          "Click Add Queries to add more prompt queries to be tested.",
          "Use Recheck Queries to re-run the selected queries across the active AI platforms (useful after site updates).",
          "Click Export CSV to download the raw results for offline review or reporting."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Use Query Results to inspect each prompt and see which platforms returned your brand.",
          "For queries where your brand is Not Found, add/edit site content or create targeted pages.",
          "Use the platform-by-platform breakdown to see which AI systems recognize your brand better."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Open Analytics to see aggregated performance of your prompts.",
          "Use the Query Results Overview chart to quickly spot how many queries returned your brand vs. didn’t.",
          "Review Business Analysis Summary to understand competitor frequency and overall visibility health.",
          "Use the summary statistics to prioritize next actions (e.g., generate more queries, improve pages)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Go to Business Analysis to see which businesses AI frequently lists for your queries.",
          "Switch between Card view(visual tiles) depending on how you prefer to scan results.",
          "Use the frequency and coverage data to identify competitors to target or pages to build/improve."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Go to Business Analysis to see which businesses AI frequently lists for your queries.",
          "Switch between List view (ranked bars) depending on how you prefer to scan results."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Read the summary tiles first to understand overall citation volume, uniqueness, and coverage quality.",
          "Use the Citations by Platform chart to identify which platform is most likely to surface your brand or competitors — a high bar = more mentions and more influence.",
          "If ChatGPT shows many citations but your brand is missing, focus optimization on content types ChatGPT prefers (rich answer pages, FAQs, clear structured data)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Use the pie chart to quickly see whether citations are concentrated in a few domains or spread widely — concentration suggests a few dominant references.",
          "Hover a slice to view the exact count for any domain.",
          "Check the frequency histogram to understand coverage breadth: a large “1 time” bar means many single-mention sources; more 2–5 or 10+ bars indicate repeat authority.",
          "Actionable step: If your brand or pages appear infrequently, prioritize content or listings that match the high-frequency paths shown here."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Spot the top sources AI references for your queries — these are authoritative sites driving answers.",
          "Check High-Frequency Sources to find which publishers consistently appear and consider whether you should target or displace them.",
          "Compare platforms (Platform Performance) to see which AI gives you the most citations — high counts mean more opportunity to appear.",
          "Review Citation Quality to confirm citation reliability; follow any recommendations to raise quality/consistency."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Search or filter: Use the search box or the platform dropdown to narrow sources (e.g., show only ChatGPT results).",
          "Sort: Change the Sort by dropdown to show top-frequency sources first so you see the most-cited sites.",
          "Expand a source row: Click the chevron/row to expand it — this reveals Related Queries that produced that citation (helps map which queries point to which sources).",
          "Inspect frequency & platform: Note the “4x” frequency and platform tag to understand how often and where the source appears.",
          "Open the source: Click the Open Source icon to review the cited page — check the content that caused the AI to reference it."
        ]
      },
      {
        "type": "h3",
        "text": "Step 5 : #"
      },
      {
        "type": "ul",
        "items": [
          "Select the project you want to review from Project Selection to load the right dataset.",
          "Read the top tiles for a quick health check: how many queries were tested, current brand visibility percentage, and average businesses returned per query.",
          "Confirm Strategic Dashboard is the active tab when you want a concise executive view; switch to Keywords & Results or Query Opportunities for deeper analysis and specific action items.",
          "Use these KPIs to decide whether to re-run queries, add more queries, or export the executive summary for stakeholders."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Check Brand Visibility Trend first to see whether your brand mentions are increasing or dropping — use the hover values to get exact rates for specific dates.",
          "Use Platform Performance to quickly identify which AI platform currently favors your brand; prioritize content changes for platforms with low performance.",
          "Look at Platform Success Breakdown to understand per-platform hit rate and how many queries were tested — this tells you where to focus tests.",
          "Read Key Insights & Recommendations for prioritized next steps (e.g., create missing pages, optimize content for a specific platform). Use these as your tactical to-do list."
        ]
      },
      {
        "type": "h3",
        "text": "Step 6 : #"
      },
      {
        "type": "ul",
        "items": [
          "Make sure the correct Project is selected (right) before running Query Opportunities.",
          "Click Connect to link Google Search Console — this enriches mappings and improves the accuracy of suggested Target Page matches.",
          "If GSC is connected, the tool can suggest existing pages for opportunities automatically (reduces manual mapping).",
          "KPI tiles below (Failing Queries, Success Rate, Opportunities, Quick Wins) reflect current analysis state."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Review the KPI tiles to understand how many queries are failing and how many opportunities were detected.",
          "Click Analyze (or Start Analysis) to run the Query Opportunities engine — it will scan platform outputs and suggest pages and tasks.",
          "After analysis completes, return to the opportunities list (first image) to review and action the results.",
          "If results look unexpected, re-run after publishing target pages or adjusting site structure."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Click Re-analyze to refresh the opportunity list after you’ve published new pages or updated content.",
          "Scan the Intent / Confidence columns to prioritize: high-confidence commercial queries are higher value.",
          "For each row, click Select page… under Target Page to map an existing page (or create a new one) to that opportunity.",
          "Open Tasks (the suggested count) to view recommended actions (e.g., create content, add schema).",
          "Use the Actions column to jump to deeper analysis or export tasks for your team."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Treat the toast as a quick, transient confirmation — no action required.",
          "If you missed details, click View Project Tasks from the main modal or navigate to the Tasks page manually to inspect created tasks."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Read the summary tiles to understand overall task workload and status distribution.",
          "Use filters to narrow tasks by status or priority.",
          "Click Create Task to open a blank task form and add a new item (title, description, assignee, priority, due date).",
          "After creating tasks, they appear in the list and update the summary tiles."
        ]
      },
      {
        "type": "ul",
        "items": [
          "A modal titled Create New Task for adding a new project task.",
          "Form fields visible: Title, Description, Priority, Status, Assignee, Due Date, and Related Section.",
          "Highlighted controls: the modal Close (X) at top-right, and the action buttons Cancel and Create Task at the bottom."
        ]
      }
    ]
  },
  {
    "slug": "how-to-use-ai-visibility-predictor",
    "title": "Guide: Using the AI Visibility Predictor",
    "excerpt": "Learn how to forecast your generative search rankings. This documentation covers using the AI Visibility Predictor to estimate future LLM traffic.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Visibility_predictor_1.png",
    "category": "Visibility Tracking",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Audits & Domain Profiling How to use AI Visibility Predictor How to use AI Visibility Predictor The AI Visibility Predictor analyzes your website to see how well it aligns with what AI models expect to find. It identifies missing pages, weak content areas, and structural gaps—then gives a clear action plan to improve your AI visibility and search readiness."
      },
      {
        "type": "h2",
        "text": "Steps to use the AI Visibility Predictor #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the dashboard, go to the left navigation menu.",
          "Click Instant Audit to expand its options (if it isn’t already open).",
          "Click Visibility Predictor to open the AI Visibility Predictor tool."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Enter your Website URL. (e.g., example.com or https://example.com ). The AI will use this to detect your business type and sitemaps.",
          "Open Advanced Settings. Optionally specify your business type (e.g., Local Business, SaaS, E-commerce). Leave it blank to let AI detect it automatically.",
          "If your site uses non-standard sitemap URLs, you can manually paste your Page Sitemap URL and Post Sitemap URL here. If left blank, the tool will attempt to auto-detect them.",
          "Click On “Run Full Analysis” button to start the full AI readiness audit once your details are entered."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "The highlighted section shows which stage is currently running.",
          "Four stages : Domain Synthesis – Builds an overall semantic profile of your brand.",
          "Sitemap Fetch – Fetches and parses your sitemaps to understand your URL structure.",
          "Fan-Out Mapping – Generates AI-predicted queries and maps them to expected URL paths.",
          "Visibility Prediction – Compares expected pages with your actual sitemap to predict AI visibility."
        ]
      },
      {
        "type": "p",
        "text": "Once all four steps are completed, your detailed results (Domain Synthesis, mappings, predictions, and action plan) will be available below."
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "p",
        "text": "Review the Executive Summary & Export the Report"
      },
      {
        "type": "ul",
        "items": [
          "Coverage and Score – Overall coverage percentage, composite score, number of core pages covered vs. missing.",
          "Warning message – Alerts you if AI visibility needs immediate attention due to many missing critical pages.",
          "Potential Impact note – Explains how addressing missing pages could increase your coverage (e.g., up to 100%).",
          "Download Complete PDF Report button – The blue button at the bottom that lets you export all findings."
        ]
      },
      {
        "type": "p",
        "text": "Review Domain Synthesis Results"
      },
      {
        "type": "ul",
        "items": [
          "Domain Type & Brand Type – How AI categorizes your business (e.g., SaaS, B2B SaaS).",
          "Core Offering – A short description of what your product/service does.",
          "Visibility Summary – How AI interprets your positioning and focus.",
          "Associated Topics – The main topics AI links to your brand.",
          "Common Keywords – Frequently used terms connected to your domain.",
          "Competitors – Other brands AI considers similar to yours.",
          "Total URLs / Page & Post Sitemap info – How many URLs were discovered."
        ]
      },
      {
        "type": "p",
        "text": "Check Visibility Prediction Results, where AI expectations are turned into specific page recommendations."
      },
      {
        "type": "ul",
        "items": [
          "Fan-Out Sub-Query – The exact question or topic.",
          "Predicted Path – The URL AI expects to answer that query.",
          "AI Expectation Reason – Why AI thinks this page is necessary (e.g., users need detailed features, pricing transparency, integrations info).",
          "Status – Whether that content is Missing on your site.",
          "Action Recommendation – Calls to action such as Create Page."
        ]
      },
      {
        "type": "p",
        "text": "Explore Fan-Out Query Mappings"
      },
      {
        "type": "ul",
        "items": [
          "Sitemap Coverage summary (0% coverage, URLs found, missing, match rate) – How many AI-predicted URLs are present in your sitemap.",
          "A table with columns such as: Parent Query – High-level questions users/AI might ask about your product.",
          "Fan-Out Sub-Query – More specific, related questions.",
          "Predicted Path – The URL path where AI expects each topic to live (e.g., /features/ , /guides/ ).",
          "Intent Type – The intent behind the query (How-to, Informational, Comparison, etc.).",
          "Query Layer – Whether it’s a core, adjacent, or problem-solution topic.",
          "Status – Shows if a matching page is Missing .",
          "Relevance – How important this topic is (e.g., 9/10)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Phase 1: Focus on creating the missing high-impact pages first, as they deliver the fastest visibility improvements."
        ]
      },
      {
        "type": "ul",
        "items": [
          "After creating key pages (Phase 1).",
          "Phase 2: It recommends adding Schema.org structured data to help AI understand your content.",
          "Example cards: Organization Schema – Add organization markup to define your brand identity.",
          "Website Schema – Implement website schema with a search box and sitelinks to improve navigation understanding."
        ]
      },
      {
        "type": "p",
        "text": "Each card shows Estimated Impact and effort level (e.g., Low Effort, +15%)."
      },
      {
        "type": "ul",
        "items": [
          "Phase 3: Focuses on improving existing pages so they better match AI expectations and user intent.",
          "A note reminds you to complete Phase 1 first, as optimization recommendations depend on having the core pages in place."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the AI Visibility Predictor",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      }
    ]
  },
  {
    "slug": "how-to-use-ai-domain-profiler-audit-tool",
    "title": "Tutorial: How to Run an AI Domain Profiler Audit",
    "excerpt": "A complete walkthrough of the LLMClicks.ai AI Domain Profiler Audit tool. Discover how to evaluate site-wide AI metrics, authority scores, and indexation gaps.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Domain-Audit-AI.png",
    "category": "Audits & Profiling",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Audits & Domain Profiling How to use AI Domain Profiler Audit Tool How to use AI Domain Profiler Audit Tool The Free AI Domain Profiler reveals how AI models like ChatGPT and Claude understand and perceive your brand. In 30 seconds, it generates an AI-powered analysis showing how chatbots would describe your company to potential customers—giving you insight into your “AI reputation.”"
      },
      {
        "type": "h2",
        "text": "Steps to use the AI Domain Profiler #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "In the left navigation, expand Instant Audit and click Domain Profiler to open this module.",
          "In the Website URL field, type the domain you want to analyze (for example, example.com or https://example.com ).",
          "Click the Analyze Domain button to start the AI-powered domain analysis."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Enter the domain you want insights for in the Website URL box.",
          "Make sure you only enter the root domain (no extra paths), so the tool can correctly analyze your brand-level signals.",
          "Click Analyze Domain (highlighted in blue) to submit your domain."
        ]
      },
      {
        "type": "p",
        "text": "How AI models interpret your brand identity and overall perception. You’ll see:"
      },
      {
        "type": "ul",
        "items": [
          "AI’s Interpretation: A plain-language summary of how AI describes your brand’s purpose and audience.",
          "Strong Presence Around: Topics where your website has strong authority or consistent signals.",
          "Brand Sentiment: AI’s perception of your brand tone, trust signals, and user value."
        ]
      },
      {
        "type": "p",
        "text": "How AI models interpret your brand at a high level. This includes:"
      },
      {
        "type": "ul",
        "items": [
          "Domain Type & Brand Type: How AI categorizes your business (e.g., SaaS, B2B).",
          "Core Offering: A concise summary of what your platform provides.",
          "Visibility Summary: AI’s interpretation of your positioning, strengths, and market focus.",
          "Associated Topics: Core themes AI strongly associates with your domain.",
          "Competitors: Other sites AI considers similar to yours.",
          "Common Keywords: Frequently occurring terms linked to your website."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the AI Domain Profiler",
          "Step 1 :",
          "Step 2 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-ai-listicle-marketplace",
    "title": "How to use AI Listicle Marketplace",
    "excerpt": "",
    "date": "January 1, 2026",
    "image": "/legacy-assets/ai-listicle-marketplace-search-section.png",
    "category": "Account & Marketplace",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs How to use AI Listicle Marketplace AI Listicle Marketplace Step-by-Step Guide The AI Listicle Marketplace (branded as Backlink Marketplace in the UI) is a unique platform that helps you discover and acquire placements on domains that are highly cited by AI engines like ChatGPT, Claude, and Perplexity."
      },
      {
        "type": "h2",
        "text": "How to Become a Provider (Seller) #"
      },
      {
        "type": "p",
        "text": "If you own websites and want to sell backlink placements, follow these steps:"
      },
      {
        "type": "h2",
        "text": "Step 1: Access the Become a Provider Page #"
      },
      {
        "type": "p",
        "text": "Navigate to the Marketplace section in the sidebar."
      },
      {
        "type": "p",
        "text": "Click on Become a Provider (URL: /backlink-marketplace/become-provider)."
      },
      {
        "type": "h2",
        "text": "Step 2: Verify Your Identity (LinkedIn) #"
      },
      {
        "type": "p",
        "text": "Click the Verify with LinkedIn button."
      },
      {
        "type": "p",
        "text": "Follow the OAuth flow to connect your LinkedIn account."
      },
      {
        "type": "p",
        "text": "This is a mandatory step to ensure the quality and professional identity of our providers."
      },
      {
        "type": "h2",
        "text": "Step 3: Fill Out Your Business Profile #"
      },
      {
        "type": "p",
        "text": "Once verified, provide your Business Name, Business Email, and Agency Website URL."
      },
      {
        "type": "p",
        "text": "Write a brief description of your services in the About Your Services field."
      },
      {
        "type": "p",
        "text": "Upload your Business Logo for better visibility in the marketplace."
      },
      {
        "type": "p",
        "text": "Click Submit Application."
      },
      {
        "type": "p",
        "text": "Your application will be sent to the Admin for manual review."
      },
      {
        "type": "p",
        "text": "Status Tracking: You can view your application status (Pending, Approved, Rejected) on the same page."
      },
      {
        "type": "h2",
        "text": "Managing Your Sites (For Providers) #"
      },
      {
        "type": "p",
        "text": "Once approved, you can start listing your domains."
      },
      {
        "type": "h2",
        "text": "Step 1: Navigate to Manage Sites #"
      },
      {
        "type": "p",
        "text": "Go to Provider Dashboard -> Manage Sites (URL: /backlink-marketplace/manage-sites)."
      },
      {
        "type": "h2",
        "text": "Step 2: Add a New Site #"
      },
      {
        "type": "p",
        "text": "Click Add New Site to open the dialog."
      },
      {
        "type": "p",
        "text": "Domain URL: Enter your domain (e.g., techblog.com)."
      },
      {
        "type": "p",
        "text": "Niche / Category: Select the most relevant category (e.g., Technology, Health)."
      },
      {
        "type": "p",
        "text": "Site Type: Specify if it’s a Blog, News Outlet, etc."
      },
      {
        "type": "p",
        "text": "SEO Metrics: Enter your Domain Authority (DA), Page Authority (PA), and Monthly Traffic."
      },
      {
        "type": "h2",
        "text": "Step 3: Define Placement Offers #"
      },
      {
        "type": "p",
        "text": "For each site, you can add multiple Placement Offers."
      },
      {
        "type": "p",
        "text": "Placement Type: Choose Guest Post, Link Insertion, Brand Mention, etc."
      }
    ]
  },
  {
    "slug": "how-to-use-lead-module",
    "title": "How to use Lead Module",
    "excerpt": "",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Setup.webp",
    "category": "Account & Marketplace",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs How to use Lead Module Lead Module Step-by-Step Guide This explanation details the flow from setup to lead capture and management"
      },
      {
        "type": "h2",
        "text": "Step1: Widget Initialization & Setup #"
      },
      {
        "type": "p",
        "text": "The process begins in the Lead Module section of the dashboard."
      },
      {
        "type": "p",
        "text": "Auto-Creation: If you haven’t set up a widget yet, the system (via SetupLeadWidget.tsx) automatically initializes a default floating widget for you."
      },
      {
        "type": "p",
        "text": "Widget Types: You can choose between two primary lead capture tools:"
      },
      {
        "type": "ul",
        "items": [
          "Domain Profiler: Captures leads by offering visitors a free SEO audit/domain analysis.",
          "Rank Tracker: Captures leads by offering keyword ranking reports."
        ]
      },
      {
        "type": "h2",
        "text": "Step 2: Customizing Behavior #"
      },
      {
        "type": "p",
        "text": "In the Setup Widget page, you define what happens after a visitor submits their information:"
      },
      {
        "type": "p",
        "text": "Display Report: Automatically opens the generated report in a new tab."
      },
      {
        "type": "p",
        "text": "Show Thank You: Keeps the visitor on your page and displays a custom message (e.g., “Thank you! Our team will contact you soon.”)."
      },
      {
        "type": "p",
        "text": "Redirect: Sends the visitor to a specific URL, such as a Calendly booking link or a specific landing page."
      },
      {
        "type": "h2",
        "text": "Step 3: Embedding on Your Website #"
      },
      {
        "type": "p",
        "text": "Once configured, the system generates a small Embed Code snippet."
      },
      {
        "type": "p",
        "text": "The Code: It consists of a CSS file for styling, a div tag acting as a placeholder, and a Javascript script that loads the interactive widget."
      },
      {
        "type": "p",
        "text": "Implementation : You copy this snippet and paste it into the HTML of your website. The widget then appears as a professional tool for your visitors."
      },
      {
        "type": "h2",
        "text": "Step 4: Front-end Lead Capture #"
      },
      {
        "type": "p",
        "text": "When a visitor uses the widget on your site:"
      },
      {
        "type": "p",
        "text": "They enter their Business Name, Domain, and Contact Email."
      },
      {
        "type": "p",
        "text": "The widget communicates with a Function (submit-domain-profiler or submit-rank-tracker)."
      },
      {
        "type": "p",
        "text": "This function processes the request, generates the necessary data, and saves the visitor’s details as a new lead in the database."
      },
      {
        "type": "h2",
        "text": "Step 5: Credit Usage & Enforcement #"
      },
      {
        "type": "p",
        "text": "Capturing a lead consumes credits from your account:"
      },
      {
        "type": "p",
        "text": "Domain Profiler uses “LLM Predictor” report credits."
      },
      {
        "type": "p",
        "text": "Rank Tracker uses “Query” credits"
      },
      {
        "type": "p",
        "text": "The system automatically checks if you have enough credits before allowing a submission and updates your usage gauges in real-time in the Lead Module dashboard."
      },
      {
        "type": "h2",
        "text": "Step 6: Managing Captured Leads #"
      },
      {
        "type": "p",
        "text": "All submissions are centralized in the Lead Module Dashboard"
      },
      {
        "type": "p",
        "text": "Leads Table: A comprehensive list showing the visitor’s name, email, domain, and exactly which widget/page they converted from."
      },
      {
        "type": "p",
        "text": "Review: You can monitor which widgets are performing best and view the data needed to follow up with potential clients."
      },
      {
        "type": "h2",
        "text": "Step 7: View Reports #"
      }
    ]
  },
  {
    "slug": "how-to-use-the-settings",
    "title": "Account & Dashboard Settings Guide",
    "excerpt": "Master your LLMClicks workspace. Learn how to connect Google Search Console, manage team permissions, update billing, and configure your account.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Settings_1.png",
    "category": "Account & Marketplace",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Getting Started & Account How to use the Settings How to Configure Account Settings This Settings section gives you 5 submenus : General settings, GSC connections, Billing, Team members, Pricing."
      },
      {
        "type": "h2",
        "text": "Steps to use the Settings #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h2",
        "text": "Step 1: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Settings to expand its options (if it isn’t already open).",
          "Click General Settings to open the section.",
          "Use Edit Profile to adjust your name or company details.",
          "Click the Google Search Console area to manage connections.",
          "Under Branding & Appearance: Upload your Custom Logo to white-label the app.",
          "Adjust Primary, Sidebar, and Accent colors to match your brand."
        ]
      },
      {
        "type": "p",
        "text": "If you don’t like the new look, click Reset to Default to restore the original theme."
      },
      {
        "type": "ul",
        "items": [
          "Update your name and company if needed, then click Save Changes.",
          "To change your password, fill all three fields and click Update Password.",
          "Review your Subscription Plan to understand your current limits.",
          "Use the Upgrade to Higher Tier area when you’re ready to scale up."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Turn the Email Notifications toggle ON/OFF depending on whether you want emails.",
          "Set Notification Frequency to how often you want alerts.",
          "For advanced control, adjust per-project settings inside each project.",
          "Use the API Key in external integrations (never share publicly).",
          "Click Regenerate Key if you need to rotate your key for security."
        ]
      },
      {
        "type": "h2",
        "text": "Step 2: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Settings to expand its options (if it isn’t already open).",
          "Click GSC Connections to open the section.",
          "If you see Expired, click Refresh or Add Google Account to re-authorize.",
          "Use Add Google Account to connect additional GSC accounts.",
          "Click the trash icon to remove accounts you no longer use."
        ]
      },
      {
        "type": "h2",
        "text": "Step 3: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Settings to expand its options (if it isn’t already open).",
          "Click Billings and Subscriptions to open the section.",
          "Check the Subscription card to confirm your active plan.",
          "Monitor Usage Overview to understand remaining credits.",
          "Use Quick Actions for upgrades, LTD codes, or payment portal access.",
          "Review Billing History for past invoices (once live).",
          "Use Plan Features to see whether your plan suits your needs or if you should upgrade."
        ]
      },
      {
        "type": "h2",
        "text": "Step 4: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Settings to expand its options (if it isn’t already open).",
          "Click Team Members to open the section.",
          "Use the Search box to locate a member in large teams.",
          "Click Invite Member to add new people.",
          "Review each member’s Role and Project Access to ensure correct permissions."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Enter one or more email addresses.",
          "Select the user role (Admin or Staff).",
          "Choose which projects the user can access.",
          "Click “Send Invitations” to invite team members instantly."
        ]
      },
      {
        "type": "h2",
        "text": "Step 4: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Settings to expand its options (if it isn’t already open).",
          "Click Pricing to open the section.",
          "Use Monthly/Annual toggle and currency dropdown at the top.",
          "The Professional plan is again marked “Most Popular”",
          "Click “Get Started” on your chosen card."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Compare Basic, Professional, and Agency plans side-by-side.",
          "Review limits like projects, data retention, branding, and query limits.",
          "Use this table to choose the best tracker tier."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Use this to quickly compare headline pricing and capacity without details.",
          "Click “View Full Optimizer Pricing” to go to the full Optimizer pricing screen where you can choose monthly/annual and add a plan."
        ]
      },
      {
        "type": "ul",
        "items": [
          "“Monthly” billing is selected.",
          "Currency selector (e.g. INR) is highlighted.",
          "The Professional plan is again marked “Best Value” with an “Add to Plan” button.",
          "A “Back to Subscription Plans” link at the top left."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Billing toggle set to “Annual (Save 20%)”.",
          "Currency and tax note (e.g. INR + GST included).",
          "Four annual add-on plans: Basic, Professional, Agency, Enterprise."
        ]
      },
      {
        "type": "ul",
        "items": [
          "The Professional plan is highlighted as “Best Value”."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Learn how to switch between monthly and annual billing.",
          "Understand cancellation rules and refund policies.",
          "Check how plan upgrades and proration work."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Review all features included in the On-Page SEO Optimizer (Page Audits, Content Analysis, Fan-Outs, GSC Integration).",
          "Scroll to the FAQs to understand billing, upgrades, and eligibility.",
          "Use this section to decide if the optimizer add-on fits your needs."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Settings",
          "Step 1:",
          "Step 2:",
          "Step 3:",
          "Step 4:",
          "Step 4:"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      }
    ]
  },
  {
    "slug": "how-to-use-local-query-generator",
    "title": "Local Query Generator Guide",
    "excerpt": "Learn how to generate geo-targeted AI search queries. Master the LLMClicks Local Query Generator to capture local intent and dominate regional AI visibility.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Local_query_1.png",
    "category": "AI Query Mapping",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs AI Query Mapping How to use Local Query Generator How to use Local Query Generator The Local Query Generator creates geo-targeted search queries for local businesses based on services, city, and customer intent. It mimics how real users search in AI assistants and Google for nearby solutions—helping you improve local SEO, AI visibility, and lead generation."
      },
      {
        "type": "h2",
        "text": "Steps to use the Local Query Generator #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click AI Query Generator to expand its options (if it isn’t already open).",
          "Click Local Query Generator to open the tool.",
          "Under AI Model Selection, choose the model you want (e.g. ChatGPT (OpenAI)).",
          "Fill the Business Information like (Business name, Business Website(optional), City/location)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Define your Business category/Niche like ( Digital Marketing Agency , Dental Clinic , Plumber , etc.).",
          "In List Main Services *, type services separated by commas, like Website Design, Logo design, etc.",
          "Areas served and Unique Selling points this fields are optional.",
          "Click Generate SMB Queries.",
          "The tool sends this info to the AI and creates a set of local search queries tailored to your niche, services and area."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Review overall queries Scroll through the list to see all generated search phrases your local customers might use."
        ]
      },
      {
        "type": "p",
        "text": "Click the intent dropdown (All Intents)."
      },
      {
        "type": "p",
        "text": "Choose a specific intent:"
      },
      {
        "type": "ul",
        "items": [
          "Local – “near me” / city-based.",
          "Transactional – ready-to-buy searches.",
          "Emergency – urgent services.",
          "Review / Comparison / Informational – research-focused queries."
        ]
      },
      {
        "type": "p",
        "text": "The list refreshes to show only that intent type."
      },
      {
        "type": "p",
        "text": "Click Edit parameters in the green banner if you want to change the business niche or services, update locations, and re-run generation to get a fresh query set."
      },
      {
        "type": "p",
        "text": "Tick the checkboxes beside queries you want to export or use in campaigns."
      },
      {
        "type": "ul",
        "items": [
          "Use the intent dropdown (here set to Transactional) to show only the type of queries you need, e.g., for Google Ads or service pages.",
          "Click Copy Selected to copy all selected queries to your clipboard.",
          "Click Download CSV to export the selected queries as a CSV file.",
          "Use the CSV in spreadsheets, reporting, or to import into other SEO/ads tools."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Local Query Generator",
          "Step 1 :",
          "Step 2 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-saas-query-generator",
    "title": "SaaS Query Generator Guide",
    "excerpt": "Step-by-step tutorial on building B2B AI search queries. Input your software features and integrations to instantly generate high-converting SaaS prompts.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/SAAS_query_1.png",
    "category": "AI Query Mapping",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs AI Query Mapping How to use SAAS Query Generator How to use SAAS Query Generator The SaaS Query Generator helps you instantly create high-intent, AI-friendly search queries for your software product. It converts your features, use cases, and benefits into natural-language questions that users ask on platforms like ChatGPT and Google. This allows you to track AI visibility, build targeted landing pages, and optimize content for LLM-driven discovery."
      },
      {
        "type": "h2",
        "text": "Steps to use the SAAS Query Generator #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click AI Query Generator to expand its options (if it isn’t already open).",
          "Click SAAS Query Generator to open the tool.",
          "Under AI Model Selection, choose the model you want (e.g. ChatGPT (OpenAI)).",
          "Fill in Product Name and (optionally) Product Website.",
          "Select Industry/Vertical, Search Intent, and Target Company Size that best match your SaaS.",
          "In Primary Use Case, describe your product in 1–2 sentences (this gives the generator context for smarter queries)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Key competitors and Geographic Focus both are optional.",
          "Under Target Customer Personas, tick the personas you want to generate queries for (e.g. Buyer, Technical Evaluator, End User, Finance/ROI Evaluator).",
          "In Number of Queries, type how many queries you want in total (e.g. 10 queries).",
          "Click Generate Queries at the bottom.",
          "The system will call the selected AI model and open a pop-up with generated queries (next image)."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Review each query line: Check the intent (Informational / Transactional / etc.) and make sure it aligns with your campaign goals.",
          "Confirm the persona and funnel stage (awareness/consideration/decision) are correct for your targeting.",
          "Use the match % to prioritize the strongest, most relevant queries."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Click Copy All to paste queries into a spreadsheet, prompt list, or ad/campaign planner.",
          "Or click Download CSV to save them as a structured file for later use."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the SAAS Query Generator",
          "Step 1 :",
          "Step 2 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-ai-brand-audit",
    "title": "Tutorial: How to Execute an AI Brand Audit",
    "excerpt": "A complete walkthrough of the LLMClicks.ai AI Brand Audit module. Discover how to evaluate ChatGPT mentions, analyze sentiment, and map brand health.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Brand_audit_1.png",
    "category": "Audits & Profiling",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Audits & Domain Profiling How to use AI Brand Audit How to use AI Brand Audit Search is changing. Buyers no longer just Google — they ask AI. If your brand isn’t showing up in AI-driven answers, you’re invisible."
      },
      {
        "type": "p",
        "text": "Our AI Brand Audit scans your website, generates real buyer-style queries, and tests them across AI platforms. The result? A clear picture of how visible your brand really is inside AI search results."
      },
      {
        "type": "h2",
        "text": "Steps to use the AI Brand Audit #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Instant Audit to expand its options (if it isn’t already open).",
          "Click Brand Audit to open the AI Brand Audit tool.",
          "Fill in the required fields (Website URL and Brand Name are essential).",
          "Choose Search Location if you want localized AI results.",
          "Select Business Type and Industry Category/Niche to help the tool generate relevant queries.",
          "Click on Analyze Website to run the domain synthesis and move to query generation."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Verify AI’s domain synthesis — ensure the domain type, core offer and topics match your business.",
          "If the synthesis is off, click Regenerate Analysis (or click Previous to change inputs) and try again.",
          "When happy with the synthesis, click Generate Queries to move on to query selection and platform testing."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "Select the AI-visibility queries that best reflect reputation/authority topics you want tested.",
          "Edit or remove any generated queries if you prefer a custom phrasing.",
          "Proceed to the results step (the wizard’s next stage) once your queries are selected."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Review the suggested human-search queries and check the ones you want to include.",
          "Edit any query text using the pencil icon, or remove a query with the trash icon.",
          "Click Regenerate All to get a fresh set of suggested human queries if these don’t fit.",
          "When ready, click Analyze Platforms to run the checks across the selected AI platforms."
        ]
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "Scan the four metric tiles to judge overall performance at a glance.",
          "Scroll the AI Search Query Results table to inspect each query and see which platforms returned your brand (and which returned “No results found”).",
          "Use this view to identify gaps where the brand is not appearing and which queries/platforms need improvement."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Review the summary numbers to quickly understand coverage and brand mentions.",
          "Click Open in New Tab to view the results separately or Download PDF to save/share the report.",
          "Use Start New Analysis to run another brand audit, or click Previous to change earlier inputs."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the AI Brand Audit",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-the-help-section",
    "title": "LLMClicks.ai Support Guide: Tickets, Video & Community",
    "excerpt": "Get unstuck fast. Follow this guide to access direct ticketing support, self-paced video training, and our exclusive user community.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Help_1.png",
    "category": "Getting Started",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Getting Started & Account How to use the help section How to use the help section This Help section gives you three levels of support: Direct support via ticket, Self-learning via YouTube, Community support via Facebook."
      },
      {
        "type": "h2",
        "text": "Steps to use the Help Section #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h2",
        "text": "Step 1: #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click Help to expand its options (if it isn’t already open).",
          "Click Support request to open the section.",
          "It is used when you want to: Report a bug or technical issue",
          "Request help with any feature",
          "Share feedback with the LLMClicks.ai team"
        ]
      },
      {
        "type": "p",
        "text": "When you click Help Videos: You are redirected to the official LLMClicks.ai YouTube channel on YouTube."
      },
      {
        "type": "p",
        "text": "When you click Join Community: A facebook login window opens."
      },
      {
        "type": "p",
        "text": "After logging in, you can:"
      },
      {
        "type": "ul",
        "items": [
          "Join the official LLMClicks.ai user community",
          "Connect with other users",
          "Ask questions and share strategies",
          "Get updates, tips, and announcements"
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Help Section",
          "Step 1:"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-optimization-wizard",
    "title": "Optimization Wizard Guide",
    "excerpt": "Step-by-step guide to applying LLM visibility recommendations. Use the Optimization Wizard to inject missing entities and resolve semantic content gaps fast.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Optimization_wizard_1.png",
    "category": "On-Page Optimization",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs On-Page Optimization How to use Optimization Wizard How to use Optimization Wizard Turn insights into actions. The Optimization Wizard transforms audits, mappings, coverage gaps, and embedding scores into a prioritized, step-by-step AI SEO improvement plan."
      },
      {
        "type": "h2",
        "text": "Steps to use the Optimization Wizard #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "The left sidebar Optimization Wizard menu item is highlighted — this is where you access that tool.",
          "Use the project selector to switch projects — each project has its own wizard progress.",
          "For a new project, start with Phase 1: connect Google Search Console, fetch pages, and fetch queries.",
          "Work through steps sequentially — the wizard unlocks later phases only after prerequisites are satisfied."
        ]
      },
      {
        "type": "p",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "If you haven’t connected GSC, click Connect GSC and choose the Google account that owns the site property.",
          "After connecting, fetch pages and then fetch queries so the wizard can analyze real performance and queries.",
          "If GSC access is missing for the selected account, use Connect New Google Account to add the correct account."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Finish all required steps in Phase 1 (Data Collection & Setup) first — Phase 2 unlocks automatically after prerequisites complete.",
          "Once unlocked, follow the tasks in order: cluster your queries, generate LLM variations, then run visibility checks across platforms.",
          "Use the small descriptions to estimate time and resource needs for each task."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "Click Review for any completed step to inspect results (connection details, imported page counts).",
          "If a step is not done, click Start to begin it.",
          "Use the Est. time and status indicators to plan — small steps usually finish quickly.",
          "If GSC connection failed, use the Review pane to troubleshoot the connection or reconnect."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Use the right card to select pages for which you want to fetch GSC keywords (check boxes).",
          "Click Fetch Selected to import keywords for chosen URLs; use Fetch All Pending if you want every pending page imported.",
          "Monitor the left panel for the Fetch GSC Queries progress and click Complete once the process finishes or auto-completes.",
          "If a step is slow, refresh or re-run the fetch for individual pages as needed."
        ]
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "Use this area to quickly check how far you’ve progressed through the 6-step wizard.",
          "If progress is low, expand the phases below to see which tasks are incomplete.",
          "Click the project selector (top-right) to switch projects and see that project’s wizard progress."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Optimization Wizard",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-on-page-audit",
    "title": "On-Page AI Audit Guide",
    "excerpt": "Learn how to run a comprehensive on-page audit for AI search. Master the LLMClicks auditor to optimize entity density, rendering, and semantic structure.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/On_page_audit_1.png",
    "category": "Audits & Profiling",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs On-Page Optimization How to use On Page Audit How to use On Page Audit The On-Page Audit tool analyzes the content and structure of your webpages to check how well they are optimized for AI search platforms like ChatGPT, Perplexity, Gemini, and Claude. It identifies missing elements, content gaps, and optimization opportunities that help your pages rank better in LLM-generated answers."
      },
      {
        "type": "h2",
        "text": "Steps to use the On Page Audit #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the dashboard, go to the left navigation menu.",
          "Click On-Page Analysis to expand its options (if it isn’t already open).",
          "Click On Page Audit to open the tool.",
          "From the On Page Audit list pick the project card you want to analyze (click the card area or the View button).",
          "If you need a fresh project, click New Project and complete the Create Project modal.",
          "After selecting View, you’ll be taken to the project’s On-Page workspace to Add Pages, connect GSC, and run audits or use the Wizard to follow guided optimization steps.",
          "Use the card settings (gear icon) to manage the project (rename, delete, or change settings)."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Fill Project Name and Domain (domain is required — this ties crawls and GSC pages to the project).",
          "Optionally enter Location, Business Type, Industry Category and Niche — these help category-specific guidance in later steps.",
          "Add team member emails if you want collaborators to receive invites.",
          "Click Create Project to create the project and return to the On-Page dashboard. If you change your mind click the X to close."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "After selecting view, Confirm you’re in the correct project by checking the project name at top.",
          "If you haven’t connected Google Search Console, click GSC Settings to link an account/property (this enables keyword / page mapping).",
          "Click Add Pages to add one or more site pages (manual add or import) — pages you add will populate the audit and the summary cards will update."
        ]
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "Paste the full canonical URL of the page you want audited into Page URL (include https:// ).",
          "Optionally add a friendly Page Title and choose the Page Type — this helps grouping and guidance during audits.",
          "Click Add Page to queue the page for analysis. After adding, the page appears in the Pages table and the audit will run (status will change from queued → in progress → completed).",
          "If you need to add many pages at once, switch the modal to the Bulk Add."
        ]
      },
      {
        "type": "ul",
        "items": [
          "From the Add Pages modal, click the Bulk Add tab (already selected in this screenshot) when you want to add many pages in one go.",
          "Create a plain-text list of the full canonical URLs you want audited, one URL per line.",
          "Prefer canonical/absolute URLs (including https:// ) to avoid duplicates or normalization issues.",
          "Click inside the URLs (one per line) box and paste your list. The UI notes that URLs will be automatically normalized.",
          "Click Add All Pages to queue the pages for analysis. Each URL will be added to the project’s Pages table and the system will begin auditing them (status will show queued → in progress → completed).",
          "If you change your mind, click the X in the top-right to close the modal without adding pages."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Click the page URL to open the full audit report for that page.",
          "If you’ve fixed issues, click the re-run icon to perform a fresh audit and update the score/metrics.",
          "Use the eye to quickly preview the last audit results without leaving the table.",
          "Remove obsolete pages using the trash icon.",
          "Use the table filters (All Status / All Sources) and search box to find pages quickly when you have many pages."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Click any category row to expand into the detailed checks and remediation tips (that’s where you’ll see each specific issue and suggested fixes).",
          "Use the Content Analysis tab for content-specific recommendations and Task Management to convert audit findings into assignable tasks."
        ]
      },
      {
        "type": "h3",
        "text": "Step 5 : #"
      },
      {
        "type": "ul",
        "items": [
          "Generate LLM queries (via the Search Queries / Generate LLM Queries flow), then run content analysis to see how well the page answers LLM-style queries and where content gaps exist."
        ]
      },
      {
        "type": "h3",
        "text": "Step 6 : #"
      },
      {
        "type": "ul",
        "items": [
          "Task Management tab is opened.",
          "This tab shows the total tasks, pending task, In progress task, completed tasks.",
          "We can filter the task as per task name or any related keyword.",
          "Used to manually add a custom task."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Create new task modal open after clicking the new task button.",
          "After enter all the details click on create task button to add a new task."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Automatically creates tasks based on audit failures (e.g., “Improve Text to HTML Ratio”). Click to generate tasks that match audit findings.",
          "After generating the task, a toast message is shown in the top right-side corner (Task Generated Successfully).",
          "Each task displays: title, short description, tags (Technical / Content / Priority), team/owner, date, and related section.",
          "Edit Task / Delete Task. Use Edit to change title/description/priority/assignee/due date. Use Delete to remove the task."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Used the edit (pencil) icon to change details.",
          "Edit task modal open.",
          "Change the details and click Update Task to save; Cancel to close without changes."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the On Page Audit",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :",
          "Step 5 :",
          "Step 6 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-content-comparison",
    "title": "Content Comparison Tool Guide",
    "excerpt": "Learn how to run a semantic content gap analysis. Use the Content Comparison module to benchmark your pages against top competitors and AI baselines.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Content_comparison_1.png",
    "category": "On-Page Optimization",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs On-Page Optimization How to use Content Comparison How to use Content Comparison See how your page stacks up against competitors cited by AI systems like ChatGPT, Perplexity, and Copilot. Identify content gaps, improve structure, and increase your chances of AI visibility."
      },
      {
        "type": "h2",
        "text": "Steps to use the Content Comparison #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click On-page Analysis to expand its options (if it isn’t already open).",
          "Click Content Comparison to open the tool."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Confirm you have the correct project selected (top-right).",
          "If the project has no comparisons yet, run a content analysis from the AI Visibility / Citations area or manually create a new comparison (seed + citations).",
          "After you create a comparison (via Content Analysis modal or the citations page), it will appear here."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "If the correct project selected, the content comparison table shows the (seed query, citations cound, created, actions).",
          "Click Content Comparison (play icon) to open the analysis results or re-run it.",
          "Use Entity Analysis for deeper semantic/entity extraction if needed.",
          "Use the trash icon to remove obsolete comparisons."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Paste your Seed URL into the top field (the page you want to analyze).",
          "Add one or more Citation URLs (competitor/reference pages) — one per line.",
          "Optionally click the edit icon if you need to adjust the seed.",
          "Click Start Content Analysis. Wait for processing, then review results (returned in the modal like in Image 1)."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Review the table rows to see which tags/content were found on the seed page and which matching citations contained similar text.",
          "Click Export CSV to download the full results for offline review or to share with teammates.",
          "Use the exported data to identify citation overlap, copyable snippets, or missing content to improve your page."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Content Comparison",
          "Step 1 :",
          "Step 2 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-content-embedding-analyzer",
    "title": "Content Embedding Analyzer Guide",
    "excerpt": "Learn how to analyze your content for LLM retrieval. Master the Content Embedding Analyzer to optimize semantic relevance and entity density for AI search.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/Content_embedding_1.png",
    "category": "On-Page Optimization",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs On-Page Optimization How to use Content Embedding Analyzer How to use Content Embedding Analyzer Go beyond keyword matching. Use AI-powered semantic analysis to check how well your content aligns with LLM queries and Google Search Console keywords — section by section."
      },
      {
        "type": "h2",
        "text": "Steps to use the Content Embedding Analyzer #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "From the Home, go to the left navigation menu.",
          "Click On-page Analysis to expand its options (if it isn’t already open).",
          "Click Content Embedding Analyzer to open the tool."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Choose Analysis Type (start with Comprehensive Analysis for full detail).",
          "Paste your page content in the Content Input box.",
          "Add up to 3 target LLM queries (one per line).",
          "Add up to 10 GSC keywords (one per line).",
          "Click Analyze Content.",
          "After processing, you’ll be taken to the Analysis Results screens (Overview, Section Analysis, Recommendations)."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "This is the Overview tab of the Analysis Results. It gives a high-level summary of how your content performed.",
          "LLM Queries – number of queries analyzed.",
          "GSC Keywords – number of keywords used in the analysis.",
          "LLM Score – overall similarity score between your content and LLM queries.",
          "GSC Score – overall similarity vs GSC keywords.",
          "LLM–GSC Overlap – how much the LLM space overlaps with your current organic keyword set.",
          "Sections – number of sections your content was split into.",
          "Use Export CSV to share a summary with your SEO / content team."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "This is the Section Analysis view, where you see performance by content section and by query/keyword.",
          "For each Section, look at: Which queries have the lowest scores (those topics need more coverage).",
          "Which GSC keywords have weak coverage (add them naturally to the section)."
        ]
      },
      {
        "type": "p",
        "text": "Focus first on sections marked poor or with 0% coverage."
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "This is the Recommendations tab of the Analysis Results. It turns the scores into actionable tasks.",
          "Sort recommendations mentally by: Priority (High first)",
          "Impact (CRITICAL / new page creation vs minor tweaks)."
        ]
      },
      {
        "type": "p",
        "text": "For each high-priority item:"
      },
      {
        "type": "ul",
        "items": [
          "Create a new page or update an existing one following the Specific Actions bullets.",
          "Use the suggested URL slug, entities, and schema hints to guide your implementation."
        ]
      },
      {
        "type": "p",
        "text": "Export the list via CSV and feed it into your task manager (e.g., ClickUp, Asana, Notion)."
      },
      {
        "type": "ul",
        "items": [
          "This is the GSC Keyword Recommendations view. It focuses specifically on GSC keywords that your content is under-serving, with suggested actions for each.",
          "For high priority keywords: Plan a new dedicated page (or major update) using all the Specific Actions.",
          "Make sure the page’s topic and slug align with the recommendation."
        ]
      },
      {
        "type": "p",
        "text": "Use this list as a GSC-driven content roadmap:"
      },
      {
        "type": "ul",
        "items": [
          "Start with CRITICAL + high priority keywords.",
          "Then move to medium/low priority once core gaps are covered."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the Content Embedding Analyzer",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  },
  {
    "slug": "how-to-use-llm-traffic-tracker",
    "title": "LLM Traffic Tracker Guide",
    "excerpt": "Step-by-step guide to tracking ChatGPT and Perplexity traffic. Uncover hidden AI referral data and measure the exact ROI of your generative optimization.",
    "date": "January 1, 2026",
    "image": "/legacy-assets/LLM_1.png",
    "category": "Visibility Tracking",
    "content": [
      {
        "type": "p",
        "text": "Signup for beta How to use AI Brand Audit How to use AI Domain Profiler Audit Tool How to use AI Listicle Marketplace How to use AI Visibility Predictor How to use Content Comparison Home Docs Visibility Tracking & Analytics How to use LLM Traffic Tracker How to use LLM Traffic Tracker The LLM Traffic Tracker is a free WordPress plugin by LLMClicks.ai that detects and logs visits from AI crawlers and language model bots. Get real data on how often AI models access your content — by date, page, and model type — and connect it to your LLMClicks.ai dashboard for advanced insights."
      },
      {
        "type": "h2",
        "text": "Steps to use the LLM Traffic Tracker #"
      },
      {
        "type": "ul",
        "items": [
          "Log in to the account with valid credentials.",
          "It navigates to the Home page."
        ]
      },
      {
        "type": "h3",
        "text": "Step 1 : #"
      },
      {
        "type": "ul",
        "items": [
          "The left sidebar LLM Traffic Tracker menu item is highlighted — this is where you access that tool.",
          "Click Enable Tracker to initialize tracking for the current project.",
          "Use Export Report to download crawl/visit data for external analysis or client reports.",
          "Use Share Dashboard to give teammates/clients view or limited access."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Download the plugin (or add the script manually) and paste the Tracking Code into your site/plugin.",
          "Click Test Tracking to confirm the dashboard registers a bot visit — look for the success toast."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Decide whether to track human visits (GDPR/privacy considerations).",
          "Keep Anonymize IP on if you need privacy-compliant data.",
          "Add your domain(s) to Allowed Domains to avoid tracking other hosts."
        ]
      },
      {
        "type": "h3",
        "text": "Step 2 : #"
      },
      {
        "type": "ul",
        "items": [
          "Click Test Tracking to confirm the dashboard registers a bot visit — look for the success toast."
        ]
      },
      {
        "type": "h3",
        "text": "Step 3 : #"
      },
      {
        "type": "ul",
        "items": [
          "Verify the correct project is selected using the project dropdown.",
          "Use the Overview metrics to confirm tracking is enabled and whether any LLMs have visited.",
          "If a platform is not detected, go to Setup to ensure tracking is installed."
        ]
      },
      {
        "type": "h3",
        "text": "Step 4 : #"
      },
      {
        "type": "ul",
        "items": [
          "Use the All Bots dropdown to filter to a single crawler (e.g., ChatGPT).",
          "Narrow results by Date Range or a specific Page URL to inspect visits for a page.",
          "Review Recent Bot Visits for the timestamps and referrers to verify when crawls occurred."
        ]
      },
      {
        "type": "h3",
        "text": "Step 5 : #"
      },
      {
        "type": "ul",
        "items": [
          "Check the Top Crawled Pages list to see which pages are most frequently indexed by LLMs.",
          "Expand the page row to open the source or see related queries (if supported).",
          "If important content isn’t appearing, ensure the page is not blocked (robots/meta) and is accessible."
        ]
      },
      {
        "type": "ul",
        "items": [
          "Steps to use the LLM Traffic Tracker",
          "Step 1 :",
          "Step 2 :",
          "Step 3 :",
          "Step 4 :",
          "Step 5 :"
        ]
      },
      {
        "type": "p",
        "text": "Leveraging cutting-edge AI technologies into your workflow, driving efficiency, innovation, and growth."
      },
      {
        "type": "h2",
        "text": "Quick Links"
      },
      {
        "type": "ul",
        "items": [
          "About us",
          "Pricing",
          "Contact",
          "Blog",
          "Comparison"
        ]
      },
      {
        "type": "h2",
        "text": "Support"
      },
      {
        "type": "ul",
        "items": [
          "Privacy Policy",
          "Terms"
        ]
      },
      {
        "type": "h2",
        "text": "Follow Us"
      },
      {
        "type": "ul",
        "items": [
          "LinkedIn",
          "Twitter",
          "Facebook",
          "Instagram",
          "YouTube"
        ]
      },
      {
        "type": "p",
        "text": "© LLMClicks.ai All Right Reserved 2026."
      }
    ]
  }
];

export const getDocBySlug = (slug: string) => docs.find((d) => d.slug === slug);
