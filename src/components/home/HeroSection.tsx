import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import TrustedByMarquee from "./TrustedByMarquee";
import HeroVisual from "./HeroVisual";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const words = ["ChatGPT", "Perplexity", "Gemini", "Claude"];

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-20 md:pt-24 pb-10 px-4">
      {/* Animated mesh gradient background */}
      <motion.div className="absolute inset-0 accent-mesh pointer-events-none" style={{ y: bgY }} />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Animated geometric decorations */}
      <div className="absolute top-20 right-[15%] w-3 h-3 rounded-full bg-accent/30 animate-float" />
      <div className="absolute top-40 right-[25%] w-2 h-2 rounded-full bg-coral/30 animate-float-delayed" />
      <div className="absolute top-32 left-[10%] w-16 h-16 border border-accent/10 rounded-2xl animate-spin-slow hidden md:block" />
      <div className="absolute bottom-20 right-[10%] w-12 h-12 border border-coral/10 rounded-full animate-float hidden md:block" />
      {/* Animated blob */}
      <div className="absolute top-1/4 right-[5%] w-72 h-72 bg-accent/5 animated-blob blur-3xl pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 left-[5%] w-60 h-60 bg-coral/5 animated-blob blur-3xl pointer-events-none hidden md:block" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left column - text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Eyebrow badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse-glow" />
              Free 14-day trial · No credit card · Results in 2 minutes
            </motion.div>

            <h1 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[3.6rem] leading-[1.08] font-bold tracking-tight mb-4">
              Your brand is invisible in{" "}
              <span className="relative inline-block">
                <motion.span
                  key={wordIndex}
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {words[wordIndex]}
                </motion.span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-accent/15 -skew-x-2 rounded-sm"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              . LLMClicks.ai fixes that.
            </h1>

            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand. Catch hallucinations before they cost you pipeline. Get recommended, not ignored.
            </motion.p>

            {/* URL input */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value.replace(/[<>"']/g, ""))}
                placeholder="Enter your website URL"
                maxLength={2048}
                autoComplete="url"
                data-testid="input-url"
                className="flex-1 rounded-xl border border-border bg-card px-5 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/40 transition-all"
              />
              <Button className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-3 whitespace-nowrap shadow-lg shadow-accent/20 group" asChild>
                <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                  Signup for Free <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" className="rounded-xl px-6 py-3 whitespace-nowrap border-border hover:bg-accent/5 hover:border-accent/30" asChild>
                <a href="https://calendly.com/shripad" target="_blank" rel="noopener noreferrer">
                  Book a Demo
                </a>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Free 14-day trial</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Results in 2 minutes</span>
            </motion.div>
          </motion.div>

          {/* Right column - animated visual */}
          <HeroVisual />
        </div>

        <TrustedByMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
