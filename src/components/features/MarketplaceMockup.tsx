import { motion } from "framer-motion";
import { Globe, BadgeCheck, ShoppingCart, Sparkles } from "lucide-react";

const listings = [
  { domain: "techradar.io", category: "SaaS Reviews", da: 78, score: 94, cited: ["GPT", "PPL", "CLD"], price: "$1,450", featured: true },
  { domain: "growthstack.co", category: "Marketing", da: 65, score: 88, cited: ["GPT", "PPL"], price: "$890" },
  { domain: "founderlist.com", category: "Top 10 Tools", da: 71, score: 91, cited: ["GPT", "CLD"], price: "$1,120" },
  { domain: "aibrief.dev", category: "Dev Tools", da: 58, score: 82, cited: ["PPL", "CLD"], price: "$640" },
];

const enginePill = (e: string) => {
  const map: Record<string, string> = {
    GPT: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    PPL: "bg-violet-500/15 text-violet-600 border-violet-500/30",
    CLD: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  };
  return map[e] || "bg-muted text-muted-foreground border-border";
};

const MarketplaceMockup = () => (
  <div className="relative w-full h-full rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/10 overflow-hidden">
    {/* Window chrome */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/40">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
        <ShoppingCart className="h-3 w-3 text-accent" /> AI Listicle Marketplace
      </div>
      <span className="text-[10px] text-muted-foreground tabular-nums">1,247 listings</span>
    </div>

    {/* Body */}
    <div className="p-4 space-y-2.5">
      {listings.map((l, i) => (
        <motion.div
          key={l.domain}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
          className={`relative rounded-xl border ${l.featured ? "border-accent/40 bg-accent/5" : "border-border bg-background/60"} p-2.5 sm:p-3`}
        >
          <div className="flex items-start gap-2.5 sm:gap-3">
            {/* Favicon */}
            <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg bg-gradient-to-br from-accent/20 to-coral/20 flex items-center justify-center">
              <Globe className="h-4 w-4 text-accent" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Row 1: domain + verified + price */}
              <div className="flex items-center gap-1.5">
                <p className="font-display text-[12px] sm:text-[13px] font-bold text-foreground truncate min-w-0">{l.domain}</p>
                <BadgeCheck className="h-3.5 w-3.5 text-accent shrink-0" />
                {l.featured && (
                  <span className="hidden xs:inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider text-accent shrink-0">
                    <Sparkles className="h-2.5 w-2.5" /> Top
                  </span>
                )}
                <span className="ml-auto font-display text-sm font-bold text-accent tabular-nums shrink-0">{l.price}</span>
              </div>

              {/* Row 2: category · DA · cited pills · align */}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{l.category}</span>
                <span className="text-[10px] text-muted-foreground/50">·</span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">DA {l.da}</span>

                <div className="flex items-center gap-1">
                  {l.cited.map((c) => (
                    <span
                      key={c}
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${enginePill(c)}`}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <span className="ml-auto text-[10px] text-muted-foreground tabular-nums whitespace-nowrap">
                  Align <span className="font-bold text-foreground">{l.score}</span>/100
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Footer summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-3 flex items-center justify-between rounded-lg bg-secondary/50 border border-border px-3 py-2"
      >
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Citations growing in <strong className="text-foreground">3 of 4</strong> placements</span>
        </div>
        <span className="text-[10px] font-bold text-accent">+38% avg lift</span>
      </motion.div>
    </div>
  </div>
);

export default MarketplaceMockup;
