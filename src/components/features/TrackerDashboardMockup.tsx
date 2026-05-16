import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, Eye, BarChart3, Activity, Globe } from "lucide-react";

const models = [
  { name: "ChatGPT", score: 78, change: +5, trend: "up" },
  { name: "Gemini", score: 64, change: +12, trend: "up" },
  { name: "Perplexity", score: 82, change: -2, trend: "down" },
  { name: "Claude", score: 71, change: +8, trend: "up" },
  { name: "Copilot", score: 55, change: 0, trend: "flat" },
];

const weeklyData = [42, 48, 45, 52, 58, 55, 63, 68, 65, 72, 78, 74];

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-3 w-3 text-emerald-500" />;
  if (trend === "down") return <TrendingDown className="h-3 w-3 text-red-400" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

const AnimatedNumber = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(start + (value - start) * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return <span>{display}</span>;
};

const MiniChart = ({ data, delay }: { data: number[]; delay: number }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = 120;
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <motion.svg
      width={w}
      height={h}
      className="overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.path
        d={pathD}
        fill="none"
        stroke="hsl(168, 80%, 42%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
      />
      {/* Glow */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="hsl(168, 80%, 42%)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.15}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
      />
      {/* Animated dot at end */}
      <motion.circle
        cx={points[points.length - 1]?.x}
        cy={points[points.length - 1]?.y}
        r="3"
        fill="hsl(168, 80%, 42%)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 1.6, duration: 0.3 }}
      />
      <motion.circle
        cx={points[points.length - 1]?.x}
        cy={points[points.length - 1]?.y}
        r="6"
        fill="hsl(168, 80%, 42%)"
        opacity={0.2}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1] }}
        transition={{ delay: delay + 1.6, duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.svg>
  );
};

const TrackerDashboardMockup = () => {
  const [activeModel, setActiveModel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % models.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-border bg-card overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-background rounded-md px-3 py-1 text-[10px] text-muted-foreground border border-border">
            app.llmclicks.ai/tracker
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Eye, label: "Visibility Score", value: 74, suffix: "/100", color: "text-accent" },
            { icon: BarChart3, label: "AI Mentions", value: 1247, suffix: "", color: "text-accent" },
            { icon: Activity, label: "Weekly Growth", value: 12, suffix: "%", color: "text-emerald-500" },
            { icon: Globe, label: "Models Tracked", value: 5, suffix: "", color: "text-accent" },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              className="rounded-xl border border-border bg-background p-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <kpi.icon className={`h-3 w-3 ${kpi.color}`} />
                <span className="text-[10px] text-muted-foreground font-medium">{kpi.label}</span>
              </div>
              <div className="font-display text-lg font-bold">
                <AnimatedNumber value={kpi.value} delay={400 + i * 150} />
                <span className="text-xs text-muted-foreground font-normal">{kpi.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart + Model Scores */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Trend Chart */}
          <motion.div
            className="md:col-span-3 rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-foreground">Visibility Trend</span>
              <span className="text-[10px] text-muted-foreground">Last 12 weeks</span>
            </div>
            <MiniChart data={weeklyData} delay={0.8} />
          </motion.div>

          {/* Model Scores */}
          <motion.div
            className="md:col-span-2 rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-2.5">Per-Model Scores</span>
            <div className="space-y-2">
              {models.map((m, i) => (
                <motion.div
                  key={m.name}
                  className={`flex items-center justify-between py-1 px-2 rounded-md transition-colors duration-300 ${
                    activeModel === i ? "bg-accent/8" : ""
                  }`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                >
                  <span className="text-[11px] font-medium text-foreground">{m.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.score}%` }}
                        transition={{ delay: 1.1 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{m.score}</span>
                    <TrendIcon trend={m.trend} />
                    <span
                      className={`text-[9px] font-mono ${
                        m.trend === "up" ? "text-emerald-500" : m.trend === "down" ? "text-red-400" : "text-muted-foreground"
                      }`}
                    >
                      {m.change > 0 ? "+" : ""}
                      {m.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live indicator */}
        <motion.div
          className="flex items-center gap-2 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-muted-foreground">Live tracking active</span>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackerDashboardMockup;
