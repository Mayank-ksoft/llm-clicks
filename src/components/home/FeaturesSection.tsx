import { motion } from "framer-motion";
import { Eye, BarChart3, TrendingUp, FileText, ShoppingBag, Quote, Activity, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import AuditDashboardMockup from "@/components/features/AuditDashboardMockup";
import TrackerDashboardMockup from "@/components/features/TrackerDashboardMockup";
import OnPageDashboardMockup from "@/components/features/OnPageDashboardMockup";
import BenchmarksDashboardMockup from "@/components/features/BenchmarksDashboardMockup";
import QueryMapperDashboardMockup from "@/components/features/QueryMapperDashboardMockup";
import TrafficDashboardMockup from "@/components/features/TrafficDashboardMockup";
import WizardDashboardMockup from "@/components/features/WizardDashboardMockup";
import MarketplaceMockup from "@/components/features/MarketplaceMockup";

const features = [
  {
    icon: Eye, tag: "AUDIT", title: "AI Visibility Audit",
    desc: "120-point accuracy check across ChatGPT, Perplexity, Claude, and Gemini. See where you appear, what is said about you, and whether any of it is accurate.",
    metrics: ["120-point check", "4 LLMs", "Accuracy score"],
    mockup: "audit", slug: "ai-visibility-audit",
  },
  {
    icon: BarChart3, tag: "TRACKING", title: "AI Visibility Tracker",
    desc: "Daily monitoring of your brand visibility score, position, and sentiment across all major LLMs. Track trends and get alerted when your presence drops.",
    metrics: ["Daily monitoring", "Sentiment", "Drop alerts"],
    mockup: "tracker", slug: "ai-visibility-tracker",
  },
  {
    icon: TrendingUp, tag: "BENCHMARKS", title: "Industry Benchmarks",
    desc: "Compare your AI visibility score against direct competitors. See exactly where they outperform you in LLM responses and which prompts you need to win.",
    metrics: ["Competitor gap", "Prompt wins", "Share of voice"],
    mockup: "benchmarks", slug: "content-comparison",
  },
  {
    icon: FileText, tag: "OPTIMIZATION", title: "On-Page Optimizer",
    desc: "Fix schema, EEAT signals, metadata, and content structure for maximum AI citation eligibility. Includes Content Embedding Analyzer and Content Comparison tools.",
    metrics: ["Schema fix", "EEAT", "Embedding analyzer"],
    mockup: "onpage", slug: "on-page-optimizer",
  },
  {
    icon: ShoppingBag, tag: "PLACEMENT", title: "AI Listicle Marketplace",
    desc: "Buy placements in AI-cited listicles that train ChatGPT and Perplexity to recommend your brand. The only GEO placement engine in the market.",
    metrics: ["1,200+ domains", "Vetted publishers", "Citation tracking"],
    mockup: "marketplace", slug: "ai-listicle-marketplace",
  },
  {
    icon: Quote, tag: "EMBEDDINGS", title: "Content Embedding Analyzer",
    desc: "Go beyond keyword matching. Transform your text into vectors to measure semantic alignment with LLM queries and GSC keywords section by section.",
    metrics: ["Vector scoring", "Section drift", "Rewrite tasks"],
    mockup: "onpage", slug: "content-embedding-analyzer",
  },
  {
    icon: Activity, tag: "TRAFFIC", title: "LLM Traffic Tracker",
    desc: "See actual referral traffic arriving from AI platforms in your analytics. Closes the loop between AI mention count and real business impact.",
    metrics: ["AI referrals", "Conversion tracking", "ROI proof"],
    mockup: "traffic", slug: "llm-traffic-tracker",
  },
  {
    icon: Compass, tag: "COVERAGE", title: "Query Fan-Out Coverage",
    desc: "Simulate the 20+ sub-queries Google AI generates and instantly check if your content covers them. The scientific way to win AI Overviews.",
    metrics: ["Fan-out simulation", "LLM Judge scoring", "Coverage map"],
    mockup: "mapper", slug: "query-fan-out-coverage",
  },
];

const FeaturesSection = () => (
  <section className="section-padding bg-card relative">
    <div className="absolute inset-0 grain-overlay pointer-events-none" />
    <div className="container mx-auto relative z-10">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tag-pill mb-4">PLATFORM FEATURES</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl">
          Every tool you need to win in AI search
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Eight modules built for the full GEO stack: from tracking and auditing to optimization and placement.
        </p>
      </motion.div>

      <div className="space-y-6">
        {features.map((f, i) => (
          <Link to={`/${f.slug === "on-page-optimizer" ? "on-page-optimiser" : f.slug}`} key={f.title} className="block">
            <motion.div
              className={`flex flex-col md:flex-row items-stretch gap-6 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex-1 rounded-2xl border border-border bg-background p-8 flex flex-col justify-center glow-hover">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <f.icon className="h-4.5 w-4.5 text-accent" />
                  </motion.div>
                  <div className="tag-pill">{f.tag}</div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {f.metrics.map((m, mi) => (
                    <motion.span
                      key={m}
                      className="rounded-full bg-accent/5 border border-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + mi * 0.1 }}
                    >
                      {m}
                    </motion.span>
                  ))}
                </div>
              </div>
              <motion.div
                className="flex-1 rounded-2xl border border-border overflow-hidden min-h-[260px] gradient-border group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {f.mockup === "audit" ? <AuditDashboardMockup /> :
                 f.mockup === "tracker" ? <TrackerDashboardMockup /> :
                 f.mockup === "onpage" ? <OnPageDashboardMockup /> :
                 f.mockup === "benchmarks" ? <BenchmarksDashboardMockup /> :
                 f.mockup === "mapper" ? <QueryMapperDashboardMockup /> :
                 f.mockup === "traffic" ? <TrafficDashboardMockup /> :
                 f.mockup === "wizard" ? <WizardDashboardMockup /> :
                 f.mockup === "marketplace" ? <MarketplaceMockup /> : null}
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
