import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, ArrowUpRight, Users, Clock, TrendingUp, BarChart3 } from "lucide-react";

const sources = [
  { name: "ChatGPT", sessions: 3421, conversions: 187, rate: 5.5 },
  { name: "Perplexity", sessions: 2108, conversions: 142, rate: 6.7 },
  { name: "Gemini", sessions: 1654, conversions: 89, rate: 5.4 },
  { name: "Claude", sessions: 987, conversions: 64, rate: 6.5 },
  { name: "Copilot", sessions: 542, conversions: 28, rate: 5.2 },
];

const dailyTraffic = [120, 145, 132, 168, 198, 187, 215, 242, 228, 265, 289, 278, 312, 298];

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
  return <span>{display.toLocaleString()}</span>;
};

const TrafficChart = ({ data, delay }: { data: number[]; delay: number }) => {
  const max = Math.max(...data);
  const h = 50;
  const barWidth = 100 / data.length;

  return (
    <motion.div className="flex items-end gap-[2px] h-[50px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="bg-accent/60 hover:bg-accent rounded-t-sm flex-1 transition-colors"
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * h}px` }}
          transition={{ delay: delay + 0.3 + i * 0.05, duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  );
};

const TrafficDashboardMockup = () => (
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
          app.llmclicks.ai/traffic
        </div>
      </div>
    </div>

    <div className="p-4 md:p-5 space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Users, label: "AI Referrals", value: 8712, color: "text-accent" },
          { icon: ArrowUpRight, label: "Conversions", value: 510, color: "text-emerald-500" },
          { icon: TrendingUp, label: "Growth", value: 34, suffix: "%", color: "text-accent" },
          { icon: Clock, label: "Avg. Session", value: 4.2, suffix: "m", color: "text-amber-500", isDecimal: true },
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
              {kpi.isDecimal ? kpi.value : <AnimatedNum value={kpi.value} delay={400 + i * 150} />}
              {kpi.suffix && <span className="text-xs text-muted-foreground font-normal">{kpi.suffix}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Sources */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <motion.div
          className="md:col-span-3 rounded-xl border border-border bg-background p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground">Daily AI Traffic</span>
            <span className="text-[10px] text-muted-foreground">Last 14 days</span>
          </div>
          <TrafficChart data={dailyTraffic} delay={0.8} />
        </motion.div>

        <motion.div
          className="md:col-span-2 rounded-xl border border-border bg-background p-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-xs font-semibold text-foreground block mb-2.5">Traffic by Source</span>
          <div className="space-y-2">
            {sources.map((s, i) => (
              <motion.div
                key={s.name}
                className="flex items-center justify-between py-1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              >
                <span className="text-[11px] font-medium text-foreground">{s.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-muted-foreground">{s.sessions.toLocaleString()}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">{s.rate}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[10px] text-muted-foreground">Tracking live referrals</span>
      </motion.div>
    </div>
  </div>
);

export default TrafficDashboardMockup;
