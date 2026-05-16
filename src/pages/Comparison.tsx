import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Check, X, Minus, ArrowRight, Search, Shield, FileCheck, RefreshCw, Sparkles, Building2, Users, Briefcase, BarChart3, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stats = [
  { value: "120", label: "Accuracy Checks Per Audit" },
  { value: "5+", label: "LLMs Analyzed in Real Time" },
  { value: "1M+", label: "AI Answers Processed" },
  { value: "2 Years", label: "AI Accuracy R&D" },
];

const criteria = [
  { icon: Search, title: "LLM Coverage", desc: "Which AI models are tracked and how comprehensively." },
  { icon: FileCheck, title: "Audit Depth", desc: "Visibility alone is not enough. Accuracy diagnostics reveal the truth." },
  { icon: Shield, title: "Hallucination Detection", desc: "Identify false claims that damage trust." },
  { icon: RefreshCw, title: "Rewrite Scoring", desc: "Measure how content changes improve AI accuracy." },
];

const compFeatures = [
  "Core focus",
  "Audit depth",
  "Hallucination detection",
  "Multi-LLM coverage",
  "Rewrite scoring",
];

const competitors = [
  {
    name: "LLMClicks.ai",
    highlight: true,
    values: [
      "Accuracy intelligence and rewrite scoring",
      "120-point accuracy audit",
      "Automated and scored",
      "ChatGPT, Perplexity, Google AI, Claude, Copilot",
      "Yes with accuracy lift predictions",
    ],
  },
  {
    name: "Otterly",
    values: [
      "Mentions and citations",
      "GEO audits and prompt checks",
      "Not available",
      "Multiple engines",
      "No",
    ],
  },
  {
    name: "Peec AI",
    values: [
      "Visibility and sentiment",
      "Visibility metrics",
      "Not available",
      "Major AI models",
      "No",
    ],
  },
  {
    name: "Profound",
    values: [
      "Enterprise AEO analytics",
      "Enterprise reporting",
      "Basic response analysis",
      "ChatGPT and Claude",
      "No",
    ],
  },
  {
    name: "Ziptie",
    values: [
      "AI Overviews and indexing",
      "Content optimization",
      "Not available",
      "Google Overviews, GPT, Perplexity",
      "No",
    ],
  },
  {
    name: "Waikay",
    values: [
      "Prompt tracking and GEO plans",
      "Action plan templates",
      "Fact checks",
      "ChatGPT, Google AI, Claude, Sonar",
      "No",
    ],
  },
  {
    name: "Goodie",
    values: [
      "AEO optimization",
      "Optimization hub",
      "Not available",
      "Large AEO model set",
      "No",
    ],
  },
  {
    name: "Scrunch",
    values: [
      "AI friendly site mirroring",
      "Technical crawl intelligence",
      "Error detection",
      "Broad LLM support",
      "No",
    ],
  },
];

const useCases = [
  { icon: Sparkles, title: "For SaaS Founders", desc: "Detect competitive leaks and correct product misinformation before it affects conversions." },
  { icon: Briefcase, title: "For Agencies", desc: "Deliver AI accuracy audits and next generation AEO services that clients cannot get elsewhere." },
  { icon: Building2, title: "For Enterprise Teams", desc: "Monitor misinformation, compliance risks and global AI narratives at scale." },
  { icon: BarChart3, title: "For SEO Teams", desc: "Move beyond SEO rankings and optimize for multi model AI visibility and accuracy." },
];

const faqs = [
  { q: "How is LLMClicks.ai different from Otterly or Ziptie?", a: "Other tools focus on visibility. LLMClicks.ai focuses on accuracy, hallucination reduction and rewrite improvement." },
  { q: "Does LLMClicks.ai track more than ChatGPT?", a: "Yes. We monitor Perplexity, Google AI, Claude and Copilot with unified logs." },
  { q: "Can I detect hallucinations about my brand?", a: "Yes. Automated scoring highlights misinformation and incorrect claims." },
  { q: "Is this suitable for agencies?", a: "Agencies use LLMClicks.ai to deliver AI accuracy audits and new AEO service offerings." },
  { q: "Do I need to install code on my site?", a: "No. LLMClicks.ai works without any site changes or technical setup." },
  { q: "How does pricing compare?", a: "LLMClicks.ai offers flexible transparent pricing designed to support growth." },
];

const row = { hidden: { opacity: 0, x: -10 }, visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.04 } }) };

const Comparison = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="tag-pill mb-4 mx-auto">COMPARISON</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">AI Search Visibility Tracking Tools Comparison</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            LLMClicks.ai helps you understand exactly how AI platforms describe your brand by measuring accuracy, scoring hallucinations, and comparing performance across ChatGPT, Perplexity, Google AI, Claude and Copilot.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Unlike most tools that only track whether you were mentioned, LLMClicks.ai analyzes the truthfulness and completeness of those answers. You see where AI gets your messaging right, where it misrepresents your product, and how your competitors appear in the same conversations.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            This gives you a deeper view of AI search visibility so you can fix inaccuracies, improve your presence, and influence how AI recommends you to potential customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-8 shadow-lg shadow-accent/20 group" asChild>
              <a href="https://llmclicks.ai/industry-benchmarks/" target="_blank" rel="noopener noreferrer">
                Request AI Visibility Benchmark <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl px-8 border-border hover:border-accent/20 hover:bg-accent/5" asChild>
              <a href="https://llmclicks.ai/ai-visibility-checker/" target="_blank" rel="noopener noreferrer">
                Run Full AI Mention Audit
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shimmer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="font-display text-3xl font-bold text-accent mb-1">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* How We Compared */}
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">How We Compared the Platforms</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We evaluated nine leading platforms using the criteria that matter most for brand trust. This includes model coverage, audit depth, hallucination detection, rewrite scoring, and competitive share of voice.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {criteria.map((c, i) => (
            <motion.div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <c.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-bold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Comparison Table */}
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag-pill mb-4 mx-auto">SIDE BY SIDE</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">LLMClicks.ai vs 7 Competitors</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">See exactly how we stack up across the criteria that matter most.</p>
        </motion.div>
        <motion.div
          className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl shadow-foreground/5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground sticky left-0 bg-card z-20 border-b border-border">
                    Feature
                  </th>
                  {competitors.map((t) => (
                    <th
                      key={t.name}
                      className={`py-5 px-3 font-display font-bold text-center text-sm border-b border-border whitespace-nowrap ${
                        t.highlight
                          ? "bg-gradient-to-b from-accent/15 to-accent/5 text-accent relative pt-9"
                          : "text-muted-foreground"
                      }`}
                    >
                      {t.highlight && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground shadow-md whitespace-nowrap">
                            <Crown className="h-3 w-3" /> BEST
                          </span>
                        </div>
                      )}
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compFeatures.map((feature, fi) => (
                  <motion.tr
                    key={feature}
                    className={`group/row border-b border-border/40 last:border-0 ${fi % 2 === 1 ? "bg-muted/20" : ""}`}
                    custom={fi}
                    variants={row}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <td className={`py-4 px-6 font-medium text-foreground sticky left-0 z-10 ${fi % 2 === 1 ? "bg-muted/20" : "bg-card"} group-hover/row:bg-accent/5 transition-colors`}>
                      {feature}
                    </td>
                    {competitors.map((t) => {
                      const value = t.values[fi];
                      const isNo = value.toLowerCase() === "no" || value.toLowerCase().includes("not available");
                      return (
                        <td
                          key={t.name}
                          className={`py-4 px-3 text-center text-xs leading-relaxed transition-colors ${
                            t.highlight
                              ? "bg-accent/5 text-foreground font-medium border-x border-accent/20"
                              : isNo
                              ? "text-muted-foreground/50"
                              : "text-muted-foreground"
                          } group-hover/row:bg-accent/[0.03]`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            {t.highlight ? (
                              <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                            ) : isNo ? (
                              <X className="h-3.5 w-3.5 text-muted-foreground/40 flex-shrink-0" />
                            ) : (
                              <Minus className="h-3 w-3 text-muted-foreground/30 flex-shrink-0" />
                            )}
                            <span>{value}</span>
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border-t border-border px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">LLMClicks.ai</span> is the only platform offering accuracy intelligence with rewrite scoring.
            </p>
            <Button size="sm" className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/20 group" asChild>
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                Try LLMClicks.ai free <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Use Cases */}
    <section className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold">AI Visibility Use Cases</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="rounded-2xl border border-border bg-card p-7 hover:border-accent/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <uc.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="tag-pill mb-4 mx-auto">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">We're here to help</h2>
          <p className="text-muted-foreground">Got questions? We've got answers.</p>
        </motion.div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <AccordionItem value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>

    {/* Bottom CTA */}
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, hsl(var(--navy)) 0%, hsl(220 28% 14%) 40%, hsl(180 20% 12%) 100%)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "hsl(var(--accent) / 0.12)" }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
              Ready to See How AI Views Your Brand?
            </h2>
            <p className="text-primary-foreground/60 mb-8">Get your accuracy benchmark and a prioritized action plan.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-8 shadow-lg shadow-accent/25 group" asChild>
                <a href="https://llmclicks.ai/ai-visibility-checker/" target="_blank" rel="noopener noreferrer">
                  Request AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" className="rounded-xl px-8 bg-primary-foreground text-navy hover:bg-primary-foreground/90 font-medium" asChild>
                <a href="https://llmclicks.ai/industry-benchmarks/" target="_blank" rel="noopener noreferrer">
                  Run Competitive Benchmark
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Comparison;
