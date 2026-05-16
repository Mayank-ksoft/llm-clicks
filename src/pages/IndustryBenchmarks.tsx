import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Target, TrendingUp, Award } from "lucide-react";
import BenchmarksDashboardMockup from "@/components/features/BenchmarksDashboardMockup";

const verticals = [
  { name: "SaaS & B2B Software", visibility: 64, leaders: ["HubSpot", "Notion", "Asana"], gaps: 36 },
  { name: "E-commerce", visibility: 48, leaders: ["Shopify", "Amazon", "Etsy"], gaps: 52 },
  { name: "Insurance", visibility: 41, leaders: ["Geico", "Progressive", "State Farm"], gaps: 59 },
  { name: "Healthcare", visibility: 38, leaders: ["Mayo Clinic", "Cleveland Clinic", "WebMD"], gaps: 62 },
  { name: "Legal Services", visibility: 33, leaders: ["FindLaw", "Justia", "Avvo"], gaps: 67 },
  { name: "Fintech", visibility: 56, leaders: ["Stripe", "Plaid", "Wise"], gaps: 44 },
];

const IndustryBenchmarks = () => (
  <Layout>
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute inset-0 accent-mesh pointer-events-none opacity-40" />
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="tag-pill mb-4 mx-auto"><BarChart3 className="h-3 w-3" /> INDUSTRY BENCHMARKS</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl mx-auto">
            Compare Your AI Visibility Against Your Industry
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See exactly where you stand versus direct competitors. Our benchmarks reveal who AI assistants recommend in your category and what it takes to overtake them.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-7 glow-hover" asChild>
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                See Your Industry Benchmark <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div className="rounded-2xl border border-border overflow-hidden gradient-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <BenchmarksDashboardMockup />
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-center">Live Benchmark Snapshots</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          A snapshot of how brands rank across major AI assistants in each vertical. Updated weekly.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {verticals.map((v, i) => (
            <motion.div
              key={v.name}
              className="rounded-2xl border border-border bg-card p-6 shimmer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-lg font-semibold">{v.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">{v.visibility}% covered</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${v.visibility}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
              <div className="text-xs text-muted-foreground mb-2">Top recommended brands</div>
              <div className="flex flex-wrap gap-2">
                {v.leaders.map((b) => (
                  <span key={b} className="text-xs px-2 py-1 rounded-md bg-muted">{b}</span>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Visibility gap</span>
                <span className="font-semibold text-coral">{v.gaps}% of prompts unowned</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Target, title: "Direct competitor scoring", desc: "Pick up to 10 rivals and watch your share of voice across ChatGPT, Perplexity, Gemini and Claude." },
            { icon: TrendingUp, title: "Weekly trend deltas", desc: "Spot the prompts where competitors are gaining ground and the ones you're starting to win." },
            { icon: Award, title: "Category authority signals", desc: "Surface the citation sources AI keeps trusting in your vertical so you can match them." },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold mb-1.5">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Find out where you rank</h2>
        <p className="text-muted-foreground mb-7">
          Run a free benchmark for your category and see exactly which competitors AI recommends instead of you.
        </p>
        <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
          <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
            Run My Free Benchmark <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </Layout>
);

export default IndustryBenchmarks;
