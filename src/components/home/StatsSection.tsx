import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, suffix: "%", label: "Agencies improved AI mentions within 4 weeks" },
  { value: 1, suffix: "B+", label: "AI queries tracked across ChatGPT, Bing, and Google AI" },
  { value: 1000, suffix: "+", label: "Active users across industries, from healthcare to SaaS" },
  { value: 50, suffix: "%", label: "Decline in organic traffic predicted by Gartner through 2028" },
  { value: 1, suffix: "B+", label: "People search with AI every day across ChatGPT, Perplexity & Gemini" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 2000 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl font-bold text-accent">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-8 lg:gap-y-0 lg:divide-x divide-border">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="text-center px-4 lg:px-6"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Counter target={stat.value} suffix={stat.suffix} />
            <p className="mt-2 text-muted-foreground text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
