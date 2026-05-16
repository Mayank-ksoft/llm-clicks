import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import MarketplaceMockup from "@/components/features/MarketplaceMockup";

const bullets = [
  "Browse 1,200+ domains verified as cited by ChatGPT, Perplexity, and Claude",
  "Every listing shows AI Citation Presence badges and a Topical Alignment Score",
  "Buy placements directly from verified, LinkedIn-vetted publishers",
  "One-click placement from your AI Visibility Audit to the marketplace",
  "Track citation improvement after each placement goes live",
];

const MarketplaceSection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 accent-mesh pointer-events-none opacity-40" />
    <div className="container mx-auto relative z-10">
      <motion.div
        className="rounded-3xl border border-border bg-card p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="tag-pill mb-4 inline-flex"><ShoppingBag className="h-3 w-3" /> ONLY ON LLMCLICKS</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 leading-tight">
            The only GEO Placement Engine in the market
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Standard guest posts do not influence LLMs. Generative engines build recommendations from "Top 10" and "Best of" listicles. The AI Listicle Marketplace connects your brand directly to the publishers who own those listicles.
          </p>
          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 group">
            <Link to="/ai-listicle-marketplace">
              Explore the Marketplace <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-coral/20 blur-3xl rounded-full" />
          <div className="relative">
            <MarketplaceMockup />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default MarketplaceSection;
