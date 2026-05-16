import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, XCircle, BarChart3, TrendingUp, Eye } from "lucide-react";

const auditCategories = [
  { label: "Brand Mentions", score: 82, status: "good" },
  { label: "Citation Accuracy", score: 65, status: "warning" },
  { label: "Content Attribution", score: 91, status: "good" },
  { label: "Competitor Gap", score: 44, status: "critical" },
  { label: "Semantic Coverage", score: 73, status: "good" },
];

const recommendations = [
  { text: "Add structured FAQ schema to product pages", priority: "High", done: true },
  { text: "Improve entity disambiguation in About page", priority: "High", done: false },
  { text: "Add comparative data tables for AI parsing", priority: "Medium", done: false },
  { text: "Optimize meta descriptions for AI snippets", priority: "Low", done: true },
];

const AnimatedScore = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1200;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return <span>{display}</span>;
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "good") return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
  if (status === "warning") return <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />;
  return <XCircle className="h-3.5 w-3.5 text-red-400" />;
};

const scoreColor = (score: number) => {
  if (score >= 75) return "bg-emerald-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-400";
};

const AuditDashboardMockup = () => {
  const overallScore = 72;

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
            app.llmclicks.ai/audit
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* Overall Score + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.div
            className="rounded-xl border border-border bg-background p-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-[10px] text-muted-foreground font-medium mb-2">Overall AI Visibility</span>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                <motion.circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="hsl(168, 80%, 42%)" strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - overallScore / 100) }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xl font-bold">
                  <AnimatedScore value={overallScore} delay={500} />
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-2 rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-3">Category Breakdown</span>
            <div className="space-y-2.5">
              {auditCategories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <StatusIcon status={cat.status} />
                  <span className="text-[11px] text-foreground font-medium w-28 shrink-0">{cat.label}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${scoreColor(cat.score)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{cat.score}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div
          className="rounded-xl border border-border bg-background p-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-xs font-semibold text-foreground block mb-3">Top Recommendations</span>
          <div className="space-y-2">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2.5 py-1.5 px-2 rounded-md"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${rec.done ? "bg-accent border-accent" : "border-border"}`}>
                  {rec.done && <CheckCircle2 className="h-2.5 w-2.5 text-accent-foreground" />}
                </div>
                <span className={`text-[11px] flex-1 ${rec.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{rec.text}</span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${
                  rec.priority === "High" ? "bg-red-400/10 text-red-400" :
                  rec.priority === "Medium" ? "bg-amber-500/10 text-amber-500" :
                  "bg-muted text-muted-foreground"
                }`}>{rec.priority}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scan indicator */}
        <motion.div
          className="flex items-center gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-accent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-muted-foreground">Last scan: 2 hours ago</span>
        </motion.div>
      </div>
    </div>
  );
};

export default AuditDashboardMockup;
