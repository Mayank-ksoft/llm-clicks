import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FileText, CheckCircle2, AlertTriangle, Layers, Type, Code2, Link2 } from "lucide-react";

const contentChecks = [
  { label: "Heading Structure", score: 95, icon: Type, status: "pass" },
  { label: "Schema Markup", score: 60, icon: Code2, status: "warn" },
  { label: "Internal Linking", score: 78, icon: Link2, status: "pass" },
  { label: "Content Depth", score: 42, icon: Layers, status: "fail" },
  { label: "FAQ Coverage", score: 85, icon: FileText, status: "pass" },
];

const competitors = [
  { name: "Your Site", score: 72, color: "bg-accent" },
  { name: "Competitor A", score: 84, color: "bg-amber-500" },
  { name: "Competitor B", score: 68, color: "bg-muted-foreground/40" },
  { name: "Competitor C", score: 55, color: "bg-muted-foreground/25" },
];

const embeddings = [
  { x: 25, y: 30, size: 18, label: "Product" },
  { x: 55, y: 20, size: 24, label: "Brand" },
  { x: 40, y: 60, size: 14, label: "FAQ" },
  { x: 70, y: 45, size: 20, label: "Reviews" },
  { x: 15, y: 65, size: 12, label: "Pricing" },
  { x: 80, y: 70, size: 16, label: "Support" },
];

const AnimatedNum = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1000;
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return <span>{display}</span>;
};

const OnPageDashboardMockup = () => (
  <div className="w-full rounded-2xl border border-border bg-card overflow-hidden">
    {/* Top bar */}
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-background rounded-md px-3 py-1 text-[10px] text-muted-foreground border border-border">
          app.llmclicks.ai/optimizer
        </div>
      </div>
    </div>

    <div className="p-4 md:p-5 space-y-4">
      {/* Content Checks */}
      <motion.div
        className="rounded-xl border border-border bg-background p-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-xs font-semibold text-foreground block mb-3">Query Fan-out Coverage</span>
        <div className="space-y-2.5">
          {contentChecks.map((check, i) => (
            <motion.div
              key={check.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <check.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-[11px] text-foreground font-medium w-28 shrink-0">{check.label}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    check.status === "pass" ? "bg-emerald-500" : check.status === "warn" ? "bg-amber-500" : "bg-red-400"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${check.score}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{check.score}</span>
              {check.status === "pass" ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              ) : (
                <AlertTriangle className={`h-3 w-3 ${check.status === "warn" ? "text-amber-500" : "text-red-400"}`} />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Competitor Comparison + Embeddings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div
          className="rounded-xl border border-border bg-background p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <span className="text-xs font-semibold text-foreground block mb-3">Competitor Comparison</span>
          <div className="space-y-3">
            {competitors.map((c, i) => (
              <motion.div key={c.name} className="space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 + i * 0.1 }}>
                <div className="flex justify-between">
                  <span className={`text-[11px] font-medium ${i === 0 ? "text-accent" : "text-muted-foreground"}`}>{c.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground"><AnimatedNum value={c.score} delay={1200 + i * 100} />/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${c.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.score}%` }}
                    transition={{ delay: 1.2 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-border bg-background p-4 relative overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs font-semibold text-foreground block mb-3">Content Embedding Map</span>
          <div className="relative h-32">
            {embeddings.map((dot, i) => (
              <motion.div
                key={dot.label}
                className="absolute flex flex-col items-center"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.3 + i * 0.12, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"
                  style={{ width: dot.size, height: dot.size }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
                <span className="text-[8px] text-muted-foreground mt-0.5">{dot.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Analysis indicator */}
      <motion.div className="flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[10px] text-muted-foreground">Analyzing 24 pages</span>
      </motion.div>
    </div>
  </div>
);

export default OnPageDashboardMockup;
