import { motion } from "framer-motion";
import { ArrowRight, Search, Gauge, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    icon: Search,
    title: "AI Visibility Checker",
    desc: "See how your brand appears across ChatGPT, Perplexity, Claude, and Gemini. Test up to 5 queries. Results in under 2 minutes.",
    cta: "Run Free Check",
    to: "/ai-visibility-checker",
  },
  {
    icon: Gauge,
    title: "AI Readiness Analyzer",
    desc: "Score how well your website content is structured for AI citation. Identifies the technical gaps stopping LLMs from citing your pages.",
    cta: "Analyze My Site",
    to: "/ai-readiness-analyzer",
  },
  {
    icon: Globe,
    title: "AI Domain Profiler",
    desc: "Profile any domain's AI visibility footprint. See how competitors appear across LLMs and identify the sources they are being cited from.",
    cta: "Profile a Domain",
    to: "/ai-domain-profiler",
  },
];

const FreeToolsSection = () => (
  <section className="section-padding bg-card relative">
    <div className="absolute inset-0 grain-overlay pointer-events-none" />
    <div className="container mx-auto relative z-10">
      <motion.div
        className="mb-12 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tag-pill mb-4">NO CREDIT CARD REQUIRED</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
          Start with three free tools
        </h2>
        <p className="text-muted-foreground">
          Not a trial. Not a time-limited demo. Permanent free access to three tools that show you exactly where you stand in AI search right now.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {tools.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link
              to={t.to}
              className="block h-full rounded-2xl border border-border bg-background p-7 hover:border-accent/30 hover:shadow-xl transition-all duration-300 group shimmer-card glow-hover"
            >
              <div className="mb-4 h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                <t.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.desc}</p>
              <span className="text-sm font-medium flex items-center gap-1.5 text-accent group-hover:gap-2.5 transition-all">
                {t.cta} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FreeToolsSection;
