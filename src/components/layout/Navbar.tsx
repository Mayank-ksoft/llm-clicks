import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Menu, X, Eye, BarChart3, FileText, Wand2, Activity, Compass, Zap, Globe, Search, ArrowRight, ShoppingBag, GitCompare, Layers, BookOpen, LifeBuoy, DollarSign, Library, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/llmclicks-logo.png";

type FeatureItem = {
  label: string;
  desc: string;
  icon: typeof Eye;
  to: string;
  children?: { label: string; to: string }[];
};

const onPageChildren = [
  { label: "Query Fan-Out Coverage", desc: "Cover all sub-queries", to: "/query-fan-out-coverage" },
  { label: "Content Comparison", desc: "Benchmark vs competitors", to: "/content-comparison" },
  { label: "Content Embedding Analyzer", desc: "Semantic alignment scoring", to: "/content-embedding-analyzer" },
];

const featureLinks: FeatureItem[] = [
  { label: "AI Visibility Audit", desc: "Comprehensive AI presence analysis", icon: Eye, to: "/ai-visibility-audit" },
  { label: "AI Visibility Tracker", desc: "Track brand mentions over time", icon: BarChart3, to: "/ai-visibility-tracker" },
  { label: "AI Listicle Marketplace", desc: "Buy placements in AI-cited listicles", icon: ShoppingBag, to: "/ai-listicle-marketplace" },
  {
    label: "On-Page Optimiser",
    desc: "AI-friendly content optimization",
    icon: FileText,
    to: "/on-page-optimiser",
    children: onPageChildren.map(({ label, to }) => ({ label, to })),
  },
  { label: "AI Query Mapper", desc: "Map queries to brand responses", icon: Compass, to: "/ai-query-mapper" },
  { label: "LLM Traffic Tracker", desc: "Monitor AI-driven traffic", icon: Activity, to: "/llm-traffic-tracker" },
  { label: "Optimization Wizard", desc: "Guided optimization workflows", icon: Wand2, to: "/optimization-wizard" },
];

const freeToolLinks = [
  { label: "AI Visibility Checker", desc: "Quick AI visibility check", icon: Search, to: "/ai-visibility-checker" },
  { label: "AI Readiness Analyzer", desc: "Check your AI readiness score", icon: Zap, to: "/ai-readiness-analyzer" },
  { label: "AI Domain Profiler", desc: "Profile your domain's AI presence", icon: Globe, to: "/ai-domain-profiler" },
];

const resourceLinks = [
  { label: "Knowledge Hub", desc: "All resources in one place", icon: Library, to: "/knowledge-hub" },
  { label: "Blog", desc: "Generative SEO & AI insights", icon: BookOpen, to: "/blog" },
  { label: "Web Stories", desc: "Bite-sized GEO teardowns", icon: PlayCircle, to: "/web-stories" },
  { label: "Docs", desc: "Setup guides and tutorials", icon: LifeBuoy, to: "/docs" },
  { label: "Industry Benchmarks", desc: "How your category ranks in AI", icon: BarChart3, to: "/industry-benchmarks" },
  { label: "Affiliate Program", desc: "Earn up to 30% recurring", icon: DollarSign, to: "/affiliate-program" },
];

const simpleLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about-us" },
  { label: "Pricing", to: "/pricing" },
  { label: "Comparison", to: "/ai-visibility-tool-comparison" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); setMobileSubOpen(null); }, [location.pathname]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/90 backdrop-blur-2xl border-b border-border/60 shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="LLMClicks.ai logo" className="h-8 w-auto" />
          {/* <span className="font-display text-lg font-bold tracking-tight">LLMClicks</span> */}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {simpleLinks.slice(0, 2).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                "px-3 py-2 text-sm transition-colors rounded-lg",
                location.pathname === link.to ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Features Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("Features")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm transition-colors rounded-lg",
              openDropdown === "Features" ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
            )}>
              Features <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", openDropdown === "Features" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {openDropdown === "Features" && (
                <motion.div
                  className="absolute -left-72 top-full pt-3"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="w-[920px] rounded-2xl bg-card border border-border shadow-2xl shadow-foreground/5 overflow-hidden">
                    <div className="grid grid-cols-3 gap-0">
                      {/* Column 1: Platform */}
                      <div className="p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2">Platform</p>
                        {featureLinks.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-accent/5 transition-colors group/item"
                          >
                            <div className="mt-0.5 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/20 group-hover/item:scale-110 transition-all">
                              <item.icon className="h-4 w-4 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium group-hover/item:text-accent transition-colors">{item.label}</p>
                              <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Column 2: Free Tools */}
                      <div className="p-4 bg-muted/20 border-l border-border">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-2">Free Tools</p>
                        {freeToolLinks.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-accent/5 transition-colors group/item"
                          >
                            <div className="mt-0.5 h-8 w-8 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-coral/20 group-hover/item:scale-110 transition-all">
                              <item.icon className="h-4 w-4 text-coral" />
                            </div>
                            <div>
                              <p className="text-sm font-medium group-hover/item:text-coral transition-colors">{item.label}</p>
                              <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-4 mx-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
                          <p className="text-sm font-semibold mb-1">Start Free</p>
                          <p className="text-xs text-muted-foreground mb-3">Get your AI visibility audit — no signup required.</p>
                          <Button size="sm" className="w-full rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 text-xs group/cta" asChild>
                            <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                              Try it now <ArrowRight className="ml-1 h-3 w-3 group-hover/cta:translate-x-0.5 transition-transform" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Column 3: On-Page Optimiser sub-pages */}
                      <div className="p-4 bg-gradient-to-br from-accent/5 to-transparent border-l border-border">
                        <div className="flex items-center gap-2 px-3 mb-2">
                          <FileText className="h-3.5 w-3.5 text-accent" />
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/80">On-Page Optimiser</p>
                        </div>
                        <Link
                          to="/on-page-optimiser"
                          className="block px-3 mb-3 text-xs text-muted-foreground/80 hover:text-accent transition-colors"
                        >
                          AI-friendly content optimization →
                        </Link>
                        <div className="space-y-1">
                          {onPageChildren.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="block rounded-xl px-3 py-2.5 hover:bg-accent/10 transition-colors group/item"
                            >
                              <p className="text-sm font-medium group-hover/item:text-accent transition-colors">{child.label}</p>
                              <p className="text-xs text-muted-foreground/70">{child.desc}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("Resources")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className={cn(
              "flex items-center gap-1 px-3 py-2 text-sm transition-colors rounded-lg",
              openDropdown === "Resources" ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
            )}>
              Resources <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", openDropdown === "Resources" && "rotate-180")} />
            </button>

            <AnimatePresence>
              {openDropdown === "Resources" && (
                <motion.div
                  className="absolute left-0 top-full pt-3"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className="w-[320px] rounded-2xl bg-card border border-border shadow-2xl shadow-foreground/5 overflow-hidden p-3">
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-accent/5 transition-colors group/item"
                      >
                        <div className="mt-0.5 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent/20 group-hover/item:scale-110 transition-all">
                          <item.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover/item:text-accent transition-colors">{item.label}</p>
                          <p className="text-xs text-muted-foreground/70">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {simpleLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={cn(
                "px-3 py-2 text-sm transition-colors rounded-lg",
                location.pathname === link.to ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-sm" asChild>
            <a href="https://app.llmclicks.ai" target="_blank" rel="noopener noreferrer">Log in</a>
          </Button>
          <Button size="sm" className="rounded-xl px-5 bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm shadow-accent/20" asChild>
            <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">Start free trial</a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl px-5 border-border text-foreground hover:bg-accent/10 hover:text-foreground hover:border-accent/30"
            asChild
          >
            <a href="https://calendly.com/llmclicks" target="_blank" rel="noopener noreferrer">Book a demo</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="border-t border-border bg-card lg:hidden overflow-y-auto max-h-[calc(100vh-4rem)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {simpleLinks.slice(0, 2).map((link) => (
                <Link key={link.label} to={link.to} className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/5">
                  {link.label}
                </Link>
              ))}

              {/* Features accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between py-2.5 px-3 text-sm text-muted-foreground rounded-lg hover:bg-accent/5"
                  onClick={() => setOpenDropdown(openDropdown === "mFeatures" ? null : "mFeatures")}
                >
                  Features
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === "mFeatures" && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openDropdown === "mFeatures" && (
                    <motion.div
                      className="ml-3 space-y-0.5 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 pt-2 pb-1">Platform</p>
                      {featureLinks.map((item) => (
                        <div key={item.to}>
                          <div className="flex items-center justify-between">
                            <Link to={item.to} className="flex flex-1 items-center gap-2.5 py-2 px-3 text-sm text-muted-foreground hover:text-accent">
                              <item.icon className="h-4 w-4 text-accent/60" />
                              {item.label}
                            </Link>
                            {item.children && (
                              <button
                                className="p-2 text-muted-foreground"
                                onClick={(e) => { e.preventDefault(); setMobileSubOpen(mobileSubOpen === item.label ? null : item.label); }}
                                aria-label="Toggle submenu"
                              >
                                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileSubOpen === item.label && "rotate-180")} />
                              </button>
                            )}
                          </div>
                          {item.children && mobileSubOpen === item.label && (
                            <div className="ml-9 border-l border-border pl-3 space-y-0.5">
                              {item.children.map((child) => (
                                <Link key={child.to} to={child.to} className="block py-2 px-3 text-sm text-muted-foreground hover:text-accent">
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 pt-3 pb-1">Free Tools</p>
                      {freeToolLinks.map((item) => (
                        <Link key={item.to} to={item.to} className="flex items-center gap-2.5 py-2 px-3 text-sm text-muted-foreground hover:text-accent">
                          <item.icon className="h-4 w-4 text-coral/60" />
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between py-2.5 px-3 text-sm text-muted-foreground rounded-lg hover:bg-accent/5"
                  onClick={() => setOpenDropdown(openDropdown === "mResources" ? null : "mResources")}
                >
                  Resources
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === "mResources" && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openDropdown === "mResources" && (
                    <motion.div
                      className="ml-3 space-y-0.5 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {resourceLinks.map((item) => (
                        <Link key={item.to} to={item.to} className="flex items-center gap-2.5 py-2 px-3 text-sm text-muted-foreground hover:text-accent">
                          <item.icon className="h-4 w-4 text-accent/60" />
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {simpleLinks.slice(2).map((link) => (
                <Link key={link.label} to={link.to} className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/5">
                  {link.label}
                </Link>
              ))}

              <div className="pt-3 space-y-2">
                <Button className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">Start free trial</a>
                </Button>
                <Button variant="outline" className="w-full rounded-xl border-border text-foreground hover:bg-accent/10 hover:text-foreground hover:border-accent/30" asChild>
                  <a href="https://calendly.com/llmclicks" target="_blank" rel="noopener noreferrer">Book a demo</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
