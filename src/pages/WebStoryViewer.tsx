import { useEffect, useState, useCallback, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWebStory } from "@/lib/cms/publicContent";
import { getCanonicalUrl, getPageMeta } from "@/lib/pageMeta";
import { syncRouteHeadTags } from "@/lib/headTags";

const DEFAULT_SLIDE_MS = 7000;

const WebStoryViewer = () => {
  const { slug } = useParams();
  const story = useWebStory(slug);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const total = story?.slides.length ?? 0;
  const storyPath = slug ? `/web-stories/${slug}` : "/web-stories";
  const meta = getPageMeta(storyPath);
  const canonical = getCanonicalUrl(storyPath);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [slideDuration, setSlideDuration] = useState(DEFAULT_SLIDE_MS);

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
    const t = setTimeout(() => next(), slideDuration);
    return () => clearTimeout(t);
  }, [index, paused, story, total, next, progressKey, slideDuration]);

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

  useEffect(() => {
    syncRouteHeadTags(meta.title, meta.description, canonical);
    const frame = window.requestAnimationFrame(() => {
      syncRouteHeadTags(meta.title, meta.description, canonical);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [meta.title, meta.description, canonical]);

  if (!story) return <Navigate to="/web-stories" replace />;

  const slide = story.slides[index];
  const hasVideo = Boolean(slide.video);

  // Pause/resume the active slide video.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused, index]);

  return (
    <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
      {(() => {
        return (
          <Helmet>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={canonical} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta property="og:image" content={story.poster} />
            <meta property="og:url" content={canonical} />
          </Helmet>
        );
      })()}
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
        {/* Background media — autoplay video with Ken Burns fallback to image */}
        <AnimatePresence mode="wait">
          {hasVideo ? (
            <motion.video
              key={`vid-${index}`}
              ref={videoRef}
              src={slide.video}
              poster={slide.poster || story.poster}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onLoadedMetadata={(e) => {
                const d = (e.currentTarget.duration || 0) * 1000;
                setSlideDuration(d > 2000 ? d : DEFAULT_SLIDE_MS);
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <motion.img
              key={`bg-${index}`}
              src={slide.image || slide.poster || story.poster}
              alt=""
              initial={{ opacity: 0, scale: 1.0 }}
              animate={{ opacity: 1, scale: 1.18 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.6 }, scale: { duration: slideDuration / 1000, ease: "linear" } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/90 pointer-events-none" />

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
                  duration: i === index ? slideDuration / 1000 : 0,
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
