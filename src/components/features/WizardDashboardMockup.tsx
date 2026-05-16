import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Wand2, CheckCircle2, Circle, ArrowRight, Sparkles, Zap, Target } from "lucide-react";

const steps = [
  { label: "Content Structure Audit", status: "done", score: 92 },
  { label: "Schema Markup Optimization", status: "done", score: 88 },
  { label: "Entity & Keyword Mapping", status: "active", score: 65 },
  { label: "FAQ & Answer Optimization", status: "pending", score: null },
  { label: "Citation Link Building", status: "pending", score: null },
];

const tasks = [
  { text: "Add FAQ schema to /product page", impact: "High", done: true },
  { text: "Restructure H2/H3 hierarchy on /about", impact: "High", done: true },
  { text: "Add comparative data tables to /pricing", impact: "Medium", done: false },
  { text: "Improve entity definitions in blog posts", impact: "Medium", done: false },
  { text: "Add structured how-to markup", impact: "Low", done: false },
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

const WizardDashboardMockup = () => {
  const [activeStep, setActiveStep] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
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
            app.llmclicks.ai/wizard
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        {/* Progress KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Target, label: "Overall Progress", value: 48, suffix: "%" },
            { icon: Sparkles, label: "Score Improved", value: 22, suffix: "pts" },
            { icon: Zap, label: "Tasks Completed", value: 7, suffix: "/15" },
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
                <AnimatedNum value={kpi.value} delay={400 + i * 150} />
                <span className="text-xs text-muted-foreground font-normal">{kpi.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Steps + Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Wizard Steps */}
          <motion.div
            className="rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-3">Optimization Steps</span>
            <div className="space-y-1">
              {steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  className={`flex items-center gap-2.5 py-2 px-2 rounded-md transition-colors duration-300 ${
                    activeStep === i ? "bg-accent/8" : ""
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  {step.status === "done" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : step.status === "active" ? (
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center shrink-0"
                      animate={{ borderColor: ["hsl(168, 80%, 42%)", "hsl(168, 80%, 60%)", "hsl(168, 80%, 42%)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </motion.div>
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                  )}
                  <span className={`text-[11px] font-medium flex-1 ${
                    step.status === "done" ? "text-muted-foreground" : step.status === "active" ? "text-foreground" : "text-muted-foreground/50"
                  }`}>{step.label}</span>
                  {step.score && (
                    <span className="text-[9px] font-mono text-muted-foreground">{step.score}%</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tasks */}
          <motion.div
            className="rounded-xl border border-border bg-background p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-xs font-semibold text-foreground block mb-3">Priority Tasks</span>
            <div className="space-y-1.5">
              {tasks.map((task, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 py-1.5 px-2 rounded-md"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.08 }}
                >
                  <div className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${task.done ? "bg-accent border-accent" : "border-border"}`}>
                    {task.done && <CheckCircle2 className="h-2 w-2 text-accent-foreground" />}
                  </div>
                  <span className={`text-[10px] flex-1 ${task.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.text}</span>
                  <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${
                    task.impact === "High" ? "bg-red-400/10 text-red-400" :
                    task.impact === "Medium" ? "bg-amber-500/10 text-amber-500" :
                    "bg-muted text-muted-foreground"
                  }`}>{task.impact}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <Wand2 className="h-3 w-3 text-accent" />
          <span className="text-[10px] text-muted-foreground">AI-guided optimization in progress</span>
        </motion.div>
      </div>
    </div>
  );
};

export default WizardDashboardMockup;
