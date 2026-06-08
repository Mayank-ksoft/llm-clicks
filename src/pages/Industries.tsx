import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries";

const Industries = () => (
  <Layout>
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute inset-0 accent-mesh pointer-events-none opacity-40" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="tag-pill mb-4 mx-auto">
            <Sparkles className="h-3 w-3" /> INDUSTRY SOLUTIONS
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl mx-auto">
            AI Visibility & GEO Playbooks by Industry
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-specific GEO playbooks showing how brands in your vertical win citations in ChatGPT, Perplexity, Gemini, and Claude.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/industries/${industry.slug}`}
                  className="block h-full rounded-2xl border border-border bg-card p-6 shimmer-card hover:border-accent/40 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    {industry.placeholder && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70 bg-muted px-2 py-1 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-lg font-semibold mb-1.5 group-hover:text-accent transition-colors">
                    {industry.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {industry.placeholder
                      ? `In-depth GEO playbook for ${industry.shortName.toLowerCase()} brands — coming soon.`
                      : industry.metaDescription}
                  </p>
                  <span className="text-sm font-medium text-accent inline-flex items-center gap-1">
                    {industry.placeholder ? "Preview" : "Read playbook"}{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Don't see your industry?
        </h2>
        <p className="text-muted-foreground mb-7">
          Run a free AI visibility audit and we'll show you exactly where your brand stands across ChatGPT, Perplexity, Gemini and Claude.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover"
          asChild
        >
          <a
            href="https://app.llmclicks.ai/signup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Run My Free Audit <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Industries;
