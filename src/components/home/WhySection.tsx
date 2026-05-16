import { motion } from "framer-motion";
import { Eye, MessageSquare, Quote, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  { icon: Eye, num: "01", title: "AI Visibility Audit", desc: "Instantly see what AI knows about your brand across ChatGPT, Perplexity, Claude, and Gemini.", link: "/ai-visibility-audit" },
  { icon: MessageSquare, num: "02", title: "Prompt Tracking & Competitor Benchmarking", desc: "Track share of voice across LLMs and compare against direct rivals on the prompts that matter.", link: "/ai-visibility-tracker" },
  { icon: Quote, num: "03", title: "Citation Analyzer", desc: "Discover which sources AI trusts when answering queries in your category — and replicate them.", link: "/content-comparison" },
  { icon: FileSearch, num: "04", title: "On-Page Audit", desc: "Fix schema, EEAT, meta, and content structure for maximum AI citation eligibility.", link: "/on-page-optimiser" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const WhySection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 accent-mesh pointer-events-none opacity-50" />

    <div className="container mx-auto relative z-10">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tag-pill mb-4">WHY AI VISIBILITY MATTERS</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl">
          AI assistants are the new search engines
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          If your business isn't mentioned in AI responses, you're invisible to customers. These four pillars cover everything you need to win.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {cards.map((card) => (
          <motion.div key={card.title} variants={cardVariants}>
            <Link
              to={card.link}
              className="block rounded-2xl bg-card border border-border p-7 hover:shadow-xl hover:border-accent/30 transition-all duration-300 group h-full relative overflow-hidden shimmer-card glow-hover"
            >
              <span className="absolute top-4 right-6 font-display text-6xl font-bold text-muted/60 select-none group-hover:text-accent/10 transition-colors duration-300">{card.num}</span>
              <div className="relative z-10">
                <div className="mb-4 h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <card.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-foreground transition-colors">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                <span className="text-sm font-medium flex items-center gap-1.5 text-accent group-hover:gap-2.5 transition-all">
                  Explore <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhySection;
