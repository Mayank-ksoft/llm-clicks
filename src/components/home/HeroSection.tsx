import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import TrustedByMarquee from "./TrustedByMarquee";

// Heavy visual stack (framer-motion animations) is lazy — not LCP-critical.
const HeroVisual = lazy(() => import("./HeroVisual"));

const words = ["ChatGPT", "Perplexity", "Gemini", "Claude"];

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 md:pt-24 pb-10 px-4">
      {/* Static mesh gradient background (parallax removed — caused forced reflow each frame) */}
      <div className="absolute inset-0 accent-mesh pointer-events-none" />
      {/* Grain overlay desktop-only — paint cost on mobile pushes Speed Index */}
      <div className="absolute inset-0 grain-overlay pointer-events-none hidden md:block" />

      {/* Decorative shapes (desktop only to avoid mobile layout work) */}
      <div className="absolute top-32 left-[10%] w-16 h-16 border border-accent/10 rounded-2xl animate-spin-slow hidden md:block" />
      <div className="absolute bottom-20 right-[10%] w-12 h-12 border border-coral/10 rounded-full hidden md:block" />
      <div className="absolute top-1/4 right-[5%] w-72 h-72 bg-accent/5 animated-blob blur-3xl pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 left-[5%] w-60 h-60 bg-coral/5 animated-blob blur-3xl pointer-events-none hidden md:block" style={{ animationDelay: "4s" }} />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left column - text & CTA. NO entry animations on H1 so it paints immediately (LCP). */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 animate-pulse-glow" />
              Free 14-day trial · No credit card · Results in 2 minutes
            </div>

            <h1 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[3.6rem] leading-[1.08] font-bold tracking-tight mb-4">
              Your brand is invisible in{" "}
              <span className="relative inline-block">
                {/* Plain span — paints on first frame; no framer-motion dependency */}
                <span key={wordIndex} className="relative z-10 hero-word-fade">
                  {words[wordIndex]}
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/15 -skew-x-2 rounded-sm" />
              </span>
              . LLMClicks.ai fixes that.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-lg">
              Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand. Catch hallucinations before they cost you pipeline. Get recommended, not ignored.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg">
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
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Free 14-day trial</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Results in 2 minutes</span>
            </div>
          </div>

          {/* Right column - lazy-loaded animated visual (desktop only) */}
          <div className="hidden lg:block min-h-[420px]">
            <Suspense fallback={<div className="w-full h-full" aria-hidden="true" />}>
              <HeroVisual />
            </Suspense>
          </div>
        </div>

        <TrustedByMarquee />
      </div>
    </section>
  );
};

export default HeroSection;
