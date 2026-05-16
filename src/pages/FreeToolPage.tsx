import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check, Zap } from "lucide-react";
import { useParams } from "react-router-dom";

type Step = { title: string; desc: string };
type Card = { title: string; desc: string };
type FAQ = { q: string; a: string };
type Tool = {
  title: string;
  tag: string;
  desc: string;
  ctaUrl: string;
  ctaLabel: string;
  intro: { heading: string; body: string; bullets: string[] };
  steps: Step[];
  features: Card[];
  audience: Card[];
  faqs: FAQ[];
  closing: { heading: string; sub: string; cta: string };
};

const toolData: Record<string, Tool> = {
  "ai-readiness-analyzer": {
    title: "Free AI Website Readiness Checker",
    tag: "FREE AI READINESS ANALYZER",
    desc: "Traditional SEO tools check for keywords. Our AI Readiness Analyzer verifies if your website architecture is actually readable by LLMs. Run a free technical audit to check agent crawlability, entity density, and semantic payload.",
    ctaUrl: "https://app.llmclicks.ai/free-ai-readiness-analyzer",
    ctaLabel: "Run Free LLM Audit",
    intro: {
      heading: "Why AI Search Readiness Matters",
      body: "The era of generative engines has arrived. Having a fast website with good backlinks is no longer enough to secure citations in ChatGPT, Perplexity, or Gemini. AI agents need clean semantic HTML, valid JSON-LD, and clear entity signals to cite you.",
      bullets: [
        "Agent Crawlability — robots.txt and headers checked for ChatGPT-User, ClaudeBot, PerplexityBot",
        "Semantic Payload Extraction across HTML5 architecture",
        "Entity Detection & Density to identify your brand cleanly",
        "Schema Validation tuned for LLM agents, not just rich snippets",
        "Token Efficiency (BLUF) — core answers in the first 100 words",
      ],
    },
    steps: [
      { title: "Enter Your URL", desc: "Input your target page. No installation or complex setup required." },
      { title: "60-Second Technical Scan", desc: "Our engine simulates an LLM crawler, analyzes DOM, and measures semantic clarity." },
      { title: "Review Your Roadmap", desc: "Receive a prioritized, step-by-step checklist of high-impact technical fixes." },
    ],
    features: [
      { title: "9-Page Technical Scan", desc: "Checks your top pages for structural and semantic readiness." },
      { title: "AI Readiness Score", desc: "Quantifies how easily LLMs can parse and extract your core payload." },
      { title: "Architecture Gap Finder", desc: "Identifies missing JSON-LD schema, weak DOM structure, and unclear entities." },
      { title: "Professional PDF Report", desc: "Branded, shareable, and perfect for technical stakeholder reviews." },
      { title: "No Signup Required", desc: "100% free. Get a frictionless technical analysis in seconds." },
      { title: "Entity Recognition", desc: "Discover if LLMs correctly map your products, people, and pricing." },
    ],
    audience: [
      { title: "Marketing Directors & CMOs", desc: "Evaluate generative engine readiness within your digital strategy." },
      { title: "Technical SEO Pros", desc: "Add LLM crawlability and payload checks to your client audits." },
      { title: "Founders & Growth Teams", desc: "Understand how machine learning models interpret your architecture." },
      { title: "Agencies", desc: "Use the technical report as a branded lead magnet." },
    ],
    faqs: [
      { q: "What is an AI Search Readiness Checker?", a: "A specialized technical SEO tool that evaluates how easily Answer Engines can crawl, parse, and comprehend your website. Unlike standard tools, it audits semantic structure and entity density, not rankings." },
      { q: "How is this different from an AI Visibility tool?", a: "Visibility tools track where you appear in AI responses. A Readiness Checker is diagnostic — it audits your code and content architecture to ensure you can be crawled and cited in the first place." },
      { q: "What signals does it look for?", a: "AI bot crawlability, clean semantic HTML, JSON-LD schema presence, entity clarity, and token-efficient content structuring." },
      { q: "How many pages does it scan?", a: "Up to nine key pages — typically Homepage, About, Core Services, and recent Blog posts. These pillar pages establish topical authority." },
    ],
    closing: { heading: "Is Your Website Ready for the AI Era?", sub: "You are one click away from understanding exactly how a machine reads your code.", cta: "Start Your Free Readiness Audit" },
  },
  "ai-domain-profiler": {
    title: "Free AI Domain Analysis & Visibility Tool",
    tag: "FREE AI DOMAIN PROFILER",
    desc: "The Free AI Domain Profiler reveals how AI models like ChatGPT and Claude understand and perceive your brand. Get insight into your AI reputation in 30 seconds.",
    ctaUrl: "https://app.llmclicks.ai/free-ai-domain-profiler",
    ctaLabel: "Analyze My Domain",
    intro: {
      heading: "What the AI Domain Profiler Does",
      body: "Our tool checks how AI models perceive your domain — not through SEO metrics, but through semantic, contextual, and reputational signals. You'll see what AI knows about your business, the categories linked to your brand, the citations shaping your profile, and the gaps holding you back.",
      bullets: [
        "AI Visibility Score (0–100) — are you a trusted authority ChatGPT cites?",
        "Entity Graph showing how models connect your brand to products and categories",
        "Trust & Citation Signals from Wikipedia, Crunchbase, news sources",
        "Cross-Model Comparison across ChatGPT, Claude, and Perplexity",
      ],
    },
    steps: [
      { title: "Enter Your Domain", desc: "Paste your domain and start the scan. No login required." },
      { title: "AI Knowledge Retrieval", desc: "We query ChatGPT, Claude, and Perplexity to extract how they currently interpret your brand." },
      { title: "Semantic Profiling", desc: "We cross-match your data with Wikipedia, Crunchbase, and schema.org databases." },
      { title: "Get Your Report", desc: "A visual dashboard with your AI Summary, Entity Map, and Trust Signals — ready to share." },
    ],
    features: [
      { title: "AI Brand Summary", desc: "How LLMs describe your business in one paragraph." },
      { title: "Entity Mapping", desc: "People, products, and organizations associated with your domain." },
      { title: "Visibility Signals", desc: "Mentions and sources that shape your model reputation." },
      { title: "Perception Strength", desc: "Whether AI confidently recognizes your brand category." },
      { title: "Cross-Model Comparison", desc: "View differences between ChatGPT, Claude, and Perplexity perceptions." },
      { title: "PDF Report", desc: "Download or share a visual summary with your team or clients." },
    ],
    audience: [
      { title: "Founders & CMOs", desc: "Profile your AI business model visibility." },
      { title: "SEO Professionals", desc: "Move from keywords to AI-driven SEO." },
      { title: "Agencies", desc: "Offer AI Reputation Audits to your clients." },
      { title: "Brand Managers", desc: "Identify weak signals shaping your AI reputation." },
    ],
    faqs: [
      { q: "What does the AI Domain Profiler check?", a: "It scans your domain for semantic clarity, entity associations, online citations, and category alignment — giving you a snapshot of what AI knows about your business." },
      { q: "How accurate is the profile?", a: "The profile blends real-time retrieval from multiple LLMs with structured data checks from Wikipedia, Crunchbase, and schema.org for a reliable AI reputation view." },
      { q: "What can I learn from the Entity Map?", a: "It shows how AI models connect your brand to people, products, categories, and organizations — revealing whether AI has the right context for your business." },
      { q: "How does it improve my AI visibility?", a: "It highlights gaps in semantic signals, missing entities, inconsistent messaging, or weak citation sources — with clear steps to fix each one." },
    ],
    closing: { heading: "See how AI perceives your brand before your customers do.", sub: "Get your free AI domain profile in 30 seconds — no login required.", cta: "Run My Free Domain Profile" },
  },
  "ai-visibility-checker": {
    title: "Check Your Brand's AI Search Visibility for Free",
    tag: "FREE AI VISIBILITY CHECKER",
    desc: "See how you rank in ChatGPT, Gemini, and Perplexity. Test up to 5 custom queries to see if AI recommends your brand or overlooks you entirely.",
    ctaUrl: "https://app.llmclicks.ai/free-ai-visibility-checker",
    ctaLabel: "Run Free AI Visibility Check",
    intro: {
      heading: "What the AI Visibility Checker Does",
      body: "Our free tool queries AI models like ChatGPT, Perplexity, and Claude to see whether they mention or recommend your brand for key queries in your niche. You'll see exactly where you stand and which competitors are taking your spot.",
      bullets: [
        "See if your brand is cited or recommended by AI",
        "Identify which competitors are getting featured instead",
        "Learn how AI describes your products or services",
        "Get actionable steps to improve inclusion in AI answers",
      ],
    },
    steps: [
      { title: "Enter Your Domain", desc: "We analyze how AI assistants respond to core queries related to your business." },
      { title: "Multi-Model Querying", desc: "Our system runs your brand through ChatGPT, Perplexity, and Claude across all intents." },
      { title: "AI Response Mapping", desc: "We extract mentions, rankings, and tone to determine your visibility strength." },
      { title: "Get Your Report", desc: "An interactive report with inclusion scores, competitor mentions, and AI summaries." },
    ],
    features: [
      { title: "AI Mention Tracking", desc: "Checks if ChatGPT, Perplexity, or Claude recommend your brand." },
      { title: "Competitor Mapping", desc: "Highlights which competitors appear instead." },
      { title: "Recommendation Score", desc: "Quantifies how likely AI is to mention you in user answers." },
      { title: "Query Intent Coverage", desc: "Tests across awareness, comparison, and purchase queries." },
      { title: "Visibility Report (PDF)", desc: "Clean, visual report for strategy or client reviews." },
      { title: "Free & Instant", desc: "No login or signup required — get your visibility score fast." },
    ],
    audience: [
      { title: "Marketing & Growth Leaders", desc: "Track brand awareness in AI-driven discovery." },
      { title: "Founders & Product Teams", desc: "See whether your company is being recommended by AI." },
      { title: "SEO & Content Experts", desc: "Extend audits beyond Google rankings to AI visibility." },
      { title: "Agencies", desc: "Use as a quick lead magnet for prospect conversations." },
    ],
    faqs: [
      { q: "What does the AI Visibility Checker measure?", a: "It tests whether your brand appears in responses from ChatGPT, Perplexity, and Claude for category queries — identifying mentions, recommendations, competitor placements, and context." },
      { q: "Is this tool free?", a: "Yes. You can check your brand's AI search visibility for free without a credit card or complex setup." },
      { q: "Which AI platforms does it analyze?", a: "ChatGPT, Perplexity, and Claude — covering most AI-driven discovery today." },
      { q: "Can I track competitor visibility too?", a: "Yes. The tool highlights which competitors appear, how often they're recommended, and the context AI uses to describe them." },
    ],
    closing: { heading: "Don't wait for customers to tell you they found someone else.", sub: "See if AI assistants already know your brand — and how to make them recommend you more often.", cta: "Run My Free Visibility Audit" },
  },
};

const FreeToolPage = ({ forcedSlug }: { forcedSlug?: string } = {}) => {
  const params = useParams();
  const slug = forcedSlug ?? params.slug;
  const tool = slug && toolData[slug] ? toolData[slug] : null;

  if (!tool) {
    return (
      <Layout>
        <section className="section-padding pt-28 md:pt-36">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold mb-4">Tool not found</h1>
            <p className="text-muted-foreground mb-6">The tool you're looking for doesn't exist.</p>
            <a href="/" className="text-accent underline hover:text-accent/80">Return to Home</a>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HERO */}
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
        <div className="absolute top-32 right-16 w-4 h-4 rounded-full bg-accent/20 animate-float pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="tag-pill mb-4 mx-auto"><Zap className="h-3 w-3" /> {tool.tag}</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl mx-auto">{tool.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-7">{tool.desc}</p>
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
              <a href={tool.ctaUrl} target="_blank" rel="noopener noreferrer">
                {tool.ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">No credit card required · Instant report</p>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-5">{tool.intro.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{tool.intro.body}</p>
            </div>
            <div className="space-y-3">
              {tool.intro.bullets.map((b, i) => (
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
            <h2 className="font-display text-3xl md:text-4xl font-bold">A few clicks to your free report</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tool.steps.map((s, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-card p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="text-xs font-mono text-accent mb-3">STEP {i + 1}</div>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="section-padding">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="tag-pill mx-auto mb-3">KEY FEATURES</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Everything inside your free report</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tool.features.map((f, i) => (
              <motion.div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors shimmer-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="tag-pill mx-auto mb-3">WHO SHOULD USE THIS</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Built for teams that take AI search seriously</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tool.audience.map((a, i) => (
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
            <p className="text-muted-foreground">Common questions about this free tool.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {tool.faqs.map((f, i) => (
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
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{tool.closing.heading}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{tool.closing.sub}</p>
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
              <a href={tool.ctaUrl} target="_blank" rel="noopener noreferrer">
                {tool.closing.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default FreeToolPage;
