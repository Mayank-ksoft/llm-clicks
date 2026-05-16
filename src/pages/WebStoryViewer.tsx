import { useEffect, useState, useCallback } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getWebStory } from "@/data/webStories";

const SLIDE_MS = 7000;

const WebStoryViewer = () => {
  const { slug } = useParams();
  const story = slug ? getWebStory(slug) : undefined;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const total = story?.slides.length ?? 0;

  const next = useCallback(() => {
    setIndex((i) => (i + 1 < total ? i + 1 : i));
    setProgressKey((k) => k + 1);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : 0));
    setProgressKey((k) => k + 1);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!story || paused) return;
    if (index >= total - 1) return;
    const t = setTimeout(() => next(), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, paused, story, total, next, progressKey]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // SEO
  useEffect(() => {
    if (!story) return;
    document.title = `${story.title} | LLMClicks.ai Web Stories`;
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", story.excerpt);
    setMeta("og:title", story.title, "property");
    setMeta("og:description", story.excerpt, "property");
    setMeta("og:image", story.poster, "property");
    setMeta("og:type", "article", "property");
  }, [story]);

  if (!story) return <Navigate to="/web-stories" replace />;

  const slide = story.slides[index];

  return (
    <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
      {/* Close */}
      <Link
        to="/web-stories"
        aria-label="Close story"
        className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 text-background/90 hover:text-background text-sm"
      >
        <ArrowLeft className="h-4 w-4" /> All Stories
      </Link>
      <Link
        to="/web-stories"
        aria-label="Close"
        className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-background"
      >
        <X className="h-4 w-4" />
      </Link>

      {/* Stage */}
      <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-foreground">
        {/* Background image */}
        <img
          src={story.poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/90" />

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
          {story.slides.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full bg-background/25 overflow-hidden"
            >
              <motion.div
                key={`${i}-${progressKey}`}
                className="h-full bg-background"
                initial={{ width: i < index ? "100%" : "0%" }}
                animate={{ width: i < index ? "100%" : i === index ? "100%" : "0%" }}
                transition={{
                  duration: i === index ? SLIDE_MS / 1000 : 0,
                  ease: "linear",
                }}
                style={
                  i === index && paused
                    ? { animationPlayState: "paused" }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col justify-end p-6 pb-10 text-background"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-3">
              {slide.heading}
            </h2>
            <p className="text-sm md:text-base text-background/85 leading-relaxed mb-5">
              {slide.body}
            </p>
            {slide.cta && (
              <Button asChild size="lg" className="self-start">
                {slide.cta.href.startsWith("/") ? (
                  <Link to={slide.cta.href}>{slide.cta.label}</Link>
                ) : (
                  <a href={slide.cta.href} target="_blank" rel="noopener noreferrer">
                    {slide.cta.label}
                  </a>
                )}
              </Button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tap zones */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute inset-y-0 left-0 w-1/3"
        />
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute inset-y-0 right-0 w-1/3"
        />

        {/* Pause / Play */}
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play" : "Pause"}
          className="absolute top-8 right-3 z-10 h-8 w-8 rounded-full bg-background/15 hover:bg-background/25 backdrop-blur flex items-center justify-center text-background"
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Desktop arrows */}
      <button
        onClick={prev}
        aria-label="Previous"
        disabled={index === 0}
        className={cn(
          "hidden md:flex absolute left-8 h-12 w-12 rounded-full bg-background/10 hover:bg-background/20 items-center justify-center text-background transition-opacity",
          index === 0 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next"
        disabled={index === total - 1}
        className={cn(
          "hidden md:flex absolute right-8 h-12 w-12 rounded-full bg-background/10 hover:bg-background/20 items-center justify-center text-background transition-opacity",
          index === total - 1 && "opacity-30 cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WebStoryViewer;
