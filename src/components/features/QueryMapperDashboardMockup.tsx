import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, MessageSquare, Target, Zap, ArrowRight } from "lucide-react";

const queries = [
  { prompt: "Best project management tools for startups", relevance: 92, mentioned: true, position: 2 },
  { prompt: "How to improve team productivity", relevance: 78, mentioned: true, position: 5 },
  { prompt: "Affordable SaaS solutions for SMBs", relevance: 85, mentioned: false, position: null },
  { prompt: "Top tools for remote collaboration", relevance: 71, mentioned: true, position: 8 },
  { prompt: "Enterprise workflow automation software", relevance: 64, mentioned: false, position: null },
];

const intentCategories = [
  { label: "Transactional", count: 34, pct: 40 },
  { label: "Informational", count: 28, pct: 33 },
  { label: "Navigational", count: 15, pct: 18 },
  { label: "Comparative", count: 8, pct: 9 },
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

const QueryMapperDashboardMockup = () => {
  const [highlightedQuery, setHighlightedQuery] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedQuery((prev) => (prev + 1) % queries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
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
            app.llmclicks.ai/query-mapper
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Search, label: "Queries Mapped", value: 85, color: "text-accent" },
            { icon: MessageSquare, label: "Brand Mentions", value: 47, color: "text-accent" },
            { icon: Target, label: "Coverage Rate", value: 55, suffix: "%", color: "text-emerald-500" },
            { icon: Zap, label: "New This Week", value: 12, color: "text-amber-500" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="rounded-xl border border-border bg-background p-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <kpi.icon className={`h-3 w-3 ${kpi.color}`} />
                <span className="text-[10px] text-muted-foreground font-medium">{kpi.label}</span>
              </div>
              <div className="font-display text-lg font-bold">
                <AnimatedNum value={kpi.value} delay={400 + i * 150} />
                {kpi.suffix && <span className="text-xs text-muted-foreground font-normal">{kpi.suffix}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Queries + Intent */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <motion.div
            className="md:col-span-3 rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-3">Discovered Queries</span>
            <div className="space-y-1.5">
              {queries.map((q, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center gap-2 py-1.5 px-2 rounded-md text-[11px] transition-colors duration-300 ${
                    highlightedQuery === i ? "bg-accent/8" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                >
                  <Search className="h-3 w-3 text-muted-foreground shrink-0" />
                  <span className="flex-1 text-foreground font-medium truncate">{q.prompt}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{q.relevance}%</span>
                  {q.mentioned ? (
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">#{q.position}</span>
                  ) : (
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-400/10 text-red-400 font-semibold">Gap</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-3">Query Intent Distribution</span>
            <div className="space-y-3">
              {intentCategories.map((cat, i) => (
                <motion.div key={cat.label} className="space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }}>
                  <div className="flex justify-between">
                    <span className="text-[11px] font-medium text-foreground">{cat.label}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{cat.count} queries</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.pct}%` }}
                      transition={{ delay: 1.2 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <motion.div className="w-1.5 h-1.5 rounded-full bg-accent" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[10px] text-muted-foreground">Mapping 85 active queries</span>
        </motion.div>
      </div>
    </div>
  );
};

export default QueryMapperDashboardMockup;
