import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, Award, Target, BarChart3 } from "lucide-react";

const industries = [
  { name: "Your Brand", score: 78, color: "bg-accent" },
  { name: "Industry Avg", score: 52, color: "bg-muted-foreground/40" },
  { name: "Top 10%", score: 91, color: "bg-emerald-500/60" },
];

const categories = [
  { name: "Citation Rate", you: 72, avg: 45 },
  { name: "Query Coverage", you: 65, avg: 51 },
  { name: "Brand Accuracy", you: 84, avg: 58 },
  { name: "Sentiment Score", you: 79, avg: 62 },
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

const BenchmarksDashboardMockup = () => (
  <div className="w-full rounded-2xl border border-border bg-card overflow-hidden">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="bg-background rounded-md px-3 py-1 text-[10px] text-muted-foreground border border-border">
          app.llmclicks.ai/benchmarks
        </div>
      </div>
    </div>

    <div className="p-4 md:p-5 space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Award, label: "Percentile", value: 74, suffix: "th" },
          { icon: TrendingUp, label: "vs. Avg", value: 26, suffix: "%" , prefix: "+" },
          { icon: Target, label: "Rank", value: 12, suffix: "/50" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="rounded-xl border border-border bg-background p-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <kpi.icon className="h-3 w-3 text-accent" />
              <span className="text-[10px] text-muted-foreground font-medium">{kpi.label}</span>
            </div>
            <div className="font-display text-lg font-bold">
              {kpi.prefix && <span className="text-emerald-500">{kpi.prefix}</span>}
              <AnimatedNum value={kpi.value} delay={400 + i * 150} />
              <span className="text-xs text-muted-foreground font-normal">{kpi.suffix}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Benchmark bars */}
      <motion.div
        className="rounded-xl border border-border bg-background p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-semibold text-foreground block mb-3">Visibility Benchmark</span>
        <div className="space-y-2.5">
          {industries.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground w-20 shrink-0 font-medium">{item.name}</span>
              <div className="flex-1 h-4 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-foreground w-8 text-right">{item.score}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category comparison */}
      <motion.div
        className="rounded-xl border border-border bg-background p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <span className="text-xs font-semibold text-foreground block mb-3">Category Breakdown</span>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="p-2.5 rounded-lg bg-muted/20 border border-border/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
            >
              <span className="text-[10px] text-muted-foreground block mb-1">{cat.name}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-accent">{cat.you}</span>
                <span className="text-[9px] text-muted-foreground">vs {cat.avg} avg</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[10px] text-muted-foreground">Updated weekly</span>
      </motion.div>
    </div>
  </div>
);

export default BenchmarksDashboardMockup;
