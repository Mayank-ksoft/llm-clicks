import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { industries } from "@/data/industries";

const Industries = () => (
  <Layout>
    <Helmet>
      <title>Industry Solutions for AI Search Visibility | LLMClicks.ai</title>
      <meta
        name="description"
        content="Generative Engine Optimization (GEO) strategies built for your vertical. See how LLMClicks.ai helps SaaS, Banking, Healthcare, and Retail brands win AI search."
      />
      <link rel="canonical" href="https://llmclicks.ai/industries/" />
    </Helmet>

    {/* Hero */}
    <section className="relative pt-12 md:pt-66 pb-16 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-[600px] opacity-40 pointer-events-none -z-10"
        style={{
          backgroundImage:
            "radial-gradient(hsl(var(--accent) / 0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />
      <div className="container mx-auto max-w-[1100px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.08em] text-[11px] text-accent bg-accent/10 px-3 py-1 rounded-full mb-6">
            <Sparkles className="h-3 w-3" /> Vertical Visibility Frameworks
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] tracking-tight max-w-3xl mx-auto">
            AI Search is Redefining Your Industry.
            <br />
            <span className="text-accent relative inline-block mt-2">
              Own the Answers.
              <span className="absolute bottom-1 left-0 w-full h-2 bg-accent/20 -z-10" />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-6">
            Generative Engine Optimization is not generic. AI evaluates software integrations differently than financial compliance. Select your vertical to discover your tailored visibility playbook.
          </p>

          <div className="pt-8 mt-8 border-t border-border max-w-2xl mx-auto">
            <p className="text-xs text-muted-foreground/70 font-bold uppercase tracking-widest mb-4">
              Protecting AI Market Share for Leaders In
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
              <span className="font-bold text-lg font-mono tracking-tight">FinTech</span>
              <span className="font-bold text-lg font-mono tracking-tight">Enterprise SaaS</span>
              <span className="font-bold text-lg font-mono tracking-tight">HealthTech</span>
              <span className="font-bold text-lg font-mono tracking-tight">Real Estate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Industry grid */}
    <section className="pb-20">
      <div className="container mx-auto max-w-[1100px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.3) }}
              >
                <Link
                  to={`/industries/${industry.slug}`}
                  className="group block relative h-full bg-card rounded-2xl border border-border p-8 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_-10px_hsl(var(--accent)/0.18)] transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-500" />
                  {industry.badge && (
                    <span
                      className={cn(
                        "absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10",
                        industry.badge.tone === "danger"
                          ? "bg-destructive/10 text-destructive border border-destructive/20"
                          : "bg-accent/10 text-accent"
                      )}
                    >
                      {industry.badge.label}
                    </span>
                  )}
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 border border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold mb-3">{industry.name}</h2>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                      {industry.cardTagline ?? industry.metaDescription}
                    </p>
                    <span className="text-accent font-medium text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Solutions <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Why context matters */}
    <section className="pb-24">
      <div className="container mx-auto max-w-[1100px] px-6">
        <div className="bg-card rounded-3xl border border-border p-8 md:p-16 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="h-1 w-12 bg-accent rounded mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Why Industry Context Matters in GEO
            </h2>
            <p className="text-muted-foreground">
              A generic visibility report tells you nothing. AI engines weight signals very differently across verticals — schema, citations, and review density each carry distinct weight by industry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Schema Sensitivity", d: "SoftwareApplication, MedicalEntity, FinancialProduct — each schema carries vertical-specific weight." },
              { t: "Citation Authority", d: "G2, Healthgrades, NerdWallet — every vertical has its own trusted citation graph." },
              { t: "YMYL Risk", d: "Healthcare, finance, and legal are scrutinised more strictly by every AI engine." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border p-6 bg-background/50">
                <h3 className="font-semibold mb-2">{c.t}</h3>
                <p className="text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="pb-24">
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't see your industry?</h2>
        <p className="text-muted-foreground mb-7">
          Run a free AI visibility audit and we'll show you exactly where your brand stands across ChatGPT, Perplexity, Gemini and Claude.
        </p>
        <Button
          size="lg"
          className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8"
          asChild
        >
          <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
            Run My Free Audit <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Industries;
