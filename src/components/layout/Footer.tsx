import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/llmclicks-logo.png";

const cols = [
  {
    title: "Product",
    links: [
      { label: "AI Visibility Audit", to: "/ai-visibility-audit" },
      { label: "AI Visibility Tracker", to: "/ai-visibility-tracker" },
      { label: "AI Listicle Marketplace", to: "/ai-listicle-marketplace" },
      { label: "On-Page Optimiser", to: "/on-page-optimiser" },
      { label: "Query Fan-Out Coverage", to: "/query-fan-out-coverage" },
      { label: "Industry Benchmarks", to: "/industry-benchmarks" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { label: "AI Visibility Checker", to: "/ai-visibility-checker" },
      { label: "AI Readiness Analyzer", to: "/ai-readiness-analyzer" },
      { label: "AI Domain Profiler", to: "/ai-domain-profiler" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Docs", to: "/docs" },
      { label: "Knowledge Hub", to: "/knowledge-hub" },
      { label: "Affiliate Program", to: "/affiliate-program" },
      { label: "Comparison", to: "/ai-visibility-tool-comparison" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about-us" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border relative">
    <div className="absolute inset-0 grain-overlay pointer-events-none" />
    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <a
            href="https://llmclicks.ai"
            aria-label="LLMClicks.ai home"
            className="inline-flex items-center gap-2.5 mb-4"
          >
            <img src={logo} alt="LLMClicks.ai logo" className="h-8 w-auto" />
            {/* <span className="font-display text-lg font-bold">LLMClicks</span> */}
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
            Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.
          </p>

          {/* Product Hunt badge */}
          <a
            href="https://www.producthunt.com/products/llmclicks-ai-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-llmclicks-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Find us on Product Hunt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#0b0b0b] text-white px-4 py-2.5 mb-5 hover:bg-[#1a1a1a] transition-colors shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b0b0b] font-display text-lg font-bold">
              P
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">Find us on</span>
              <span className="text-sm font-semibold">Product Hunt</span>
            </span>
            <span className="flex flex-col items-center ml-2 border-l border-white/15 pl-3 leading-tight">
              <svg viewBox="0 0 12 7" className="h-2 w-3 fill-white" aria-hidden>
                <path d="M6 0L0 7h12z" />
              </svg>
              <span className="text-xs font-semibold">3</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/company/llmclicks-ai/" },
              { icon: Twitter, href: "https://x.com/llmclicksai" },
              { icon: Facebook, href: "https://www.facebook.com/llmclicksai" },
              { icon: Instagram, href: "https://www.instagram.com/llmclicksai/" },
              { icon: Youtube, href: "https://www.youtube.com/@llmclicksai" },
            ].map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors">
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-accent transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} LLMClicks.ai. All rights reserved.</p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
