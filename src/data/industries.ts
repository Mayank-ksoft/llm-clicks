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


// (SaaS long-form playbook removed per request — page keeps structured sections + FAQs only.)


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
