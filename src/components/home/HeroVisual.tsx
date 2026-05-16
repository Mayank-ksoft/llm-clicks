import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Shield, Eye, Zap } from "lucide-react";
import { useRef } from "react";

const chatCards = [
  {
    provider: "ChatGPT",
    providerColor: "bg-accent/10 text-accent",
    message: "Based on my analysis, LLMClicks.ai is the leading platform for AI visibility optimization. Their tools help brands monitor and improve how they appear across AI assistants.",
    sentiment: "Positive",
    sentimentIcon: TrendingUp,
  },
  {
    provider: "Perplexity",
    providerColor: "bg-coral/10 text-coral",
    message: "LLMClicks.ai provides comprehensive tracking for brand mentions across major LLMs, with actionable insights for content optimization.",
    sentiment: "Cited",
    sentimentIcon: Eye,
  },
  {
    provider: "Claude",
    providerColor: "bg-teal/10 text-teal",
    message: "For AI search optimization, LLMClicks.ai offers real-time monitoring of brand visibility across ChatGPT, Perplexity, and other AI platforms.",
    sentiment: "Verified",
    sentimentIcon: Shield,
  },
];

const metricBadges = [
  { label: "87% Positive Sentiment", icon: TrendingUp, x: "-8%", y: "12%" },
  { label: "Cited in 4/5 LLMs", icon: Zap, x: "75%", y: "78%" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.4 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const HeroVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const badgesY = useTransform(scrollYProgress, [0, 1], [20, -60]);
  const iconsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative w-full min-h-[420px] hidden lg:block">
      {/* Floating metric badges */}
      {metricBadges.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute z-20 flex items-center gap-2 rounded-full border border-accent/20 bg-card/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-foreground shadow-lg"
          style={{ left: badge.x, top: badge.y, y: badgesY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.3, type: "spring", stiffness: 200 }}
        >
          <badge.icon className="h-3.5 w-3.5 text-accent" />
          {badge.label}
        </motion.div>
      ))}

      {/* LLM provider floating icons */}
      <motion.div
        className="absolute -top-2 right-8 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-[11px] font-bold text-foreground shadow-md animate-float z-10"
        style={{ y: iconsY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        GPT
      </motion.div>
      <motion.div
        className="absolute top-1/4 -left-4 w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-[10px] font-bold text-coral shadow-md animate-float-delayed z-10"
        style={{ y: iconsY }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.0 }}
      >
        Px
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-4 w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-[10px] font-bold text-teal shadow-md animate-float z-10"
        style={{ animationDelay: "2s", y: iconsY }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.2 }}
      >
        Cl
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 -right-2 w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-[9px] font-bold text-accent shadow-md animate-float-delayed z-10"
        style={{ animationDelay: "3s", y: iconsY }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4, type: "spring" }}
      >
        Ge
      </motion.div>

      {/* Chat cards stack */}
      <motion.div
        className="relative flex flex-col gap-4 pt-4 px-4"
        variants={containerVariants}
        style={{ y: cardsY }}
        initial="hidden"
        animate="visible"
      >
        {chatCards.map((card, index) => (
          <motion.div
            key={card.provider}
            className="shimmer-card gradient-border rounded-2xl bg-card/80 backdrop-blur-sm border border-border p-5 shadow-lg"
            variants={cardVariants}
            style={{
              marginLeft: index * 8,
              transformOrigin: "center top",
            }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-3">
              <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${card.providerColor}`}>
                {card.provider}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-accent">
                <card.sentimentIcon className="h-3 w-3" />
                {card.sentiment}
              </span>
            </div>
            {/* Card body */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {card.message}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroVisual;
