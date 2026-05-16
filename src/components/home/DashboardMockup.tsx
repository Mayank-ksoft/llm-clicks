import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef } from "react";

const DashboardMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

  return (
    <motion.div
      ref={ref}
      className="mt-16 max-w-5xl mx-auto"
      style={{ perspective: 1200, rotateX, scale }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl bg-card border border-border shadow-2xl shadow-foreground/5 overflow-hidden gradient-border shimmer-card">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/40 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-coral/60" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-teal/40" />
          </div>
          <div className="flex-1 mx-8">
            <div className="h-6 rounded-lg bg-background border border-border max-w-md mx-auto flex items-center px-3">
              <span className="text-[10px] text-muted-foreground">app.llmclicks.ai/dashboard</span>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 md:p-8 bg-card">
          {/* Top prompt bar */}
          <motion.div
            className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-accent/5 border border-accent/10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Prompt</p>
              <p className="text-sm font-medium">What is the top-rated AI visibility tool for SEO teams?</p>
            </div>
            <div className="sm:ml-auto flex gap-2 flex-wrap">
              {["GPT", "Gem", "PPX", "Cld"].map((m, i) => (
                <motion.div
                  key={m}
                  className="h-7 w-7 rounded-lg bg-muted border border-border flex items-center justify-center text-[9px] font-bold text-muted-foreground"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                >
                  {m}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Searches Performed */}
            <motion.div
              className="rounded-xl border border-border p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">Searches Performed</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-accent" initial={{ width: 0 }} whileInView={{ width: "78%" }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-border" initial={{ width: 0 }} whileInView={{ width: "22%" }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.8 }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">No</span>
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] font-semibold text-muted-foreground">Top Queries</p>
                {["AI visibility tools for SEO...", "Best brand monitoring in AI...", "How to track LLM mentions..."].map((q, i) => (
                  <motion.div
                    key={q}
                    className="text-[10px] text-muted-foreground/70 py-1 px-2 rounded bg-muted/50 truncate"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    {q}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Searches Cited */}
            <motion.div
              className="rounded-xl border border-border p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="text-xs font-semibold text-muted-foreground mb-3">Searches Cited</h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-foreground/30" initial={{ width: 0 }} whileInView={{ width: "65%" }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.8 }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Yours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-border" initial={{ width: 0 }} whileInView={{ width: "45%" }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.8 }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">Competitor</span>
                </div>
              </div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Top Domains</p>
              {["llmclicks.ai", "competitor1.com", "seotools.io"].map((d, i) => (
                <motion.div
                  key={d}
                  className="flex items-center gap-2 py-1"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border"}`} />
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Sentiment */}
            <motion.div
              className="rounded-xl border border-border p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-muted-foreground">Sentiment</h4>
                <span className="text-[10px] text-muted-foreground">% of total</span>
              </div>
              <div className="flex items-center justify-center my-4">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 100" }}
                      whileInView={{ strokeDasharray: "64 36" }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold">64%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent" /> Positive</span>
                  <span className="font-medium">64%</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted" /> Mixed</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-coral" /> Negative</span>
                  <span className="font-medium">6%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardMockup;
