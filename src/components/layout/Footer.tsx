import { Link } from "react-router-dom";
import logo from "@/assets/llmclicks-logo.png";
import { useFooterSettings } from "@/hooks/useFooterSettings";
import { useCmsMenu, type MenuLocation, type MenuNode } from "@/hooks/useCmsMenu";
import { getIcon } from "@/lib/cms/iconMap";

const fallbackCols = [
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

const fallbackSocials = [
  { icon: "Linkedin", href: "https://www.linkedin.com/company/llmclicks-ai/" },
  { icon: "Twitter", href: "https://x.com/llmclicksai" },
  { icon: "Facebook", href: "https://www.facebook.com/llmclicksai" },
  { icon: "Instagram", href: "https://www.instagram.com/llmclicksai/" },
  { icon: "Youtube", href: "https://www.youtube.com/@llmclicksai" },
];

const fallbackBlurb =
  "Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.";

const FOOTER_LOCATIONS: { location: MenuLocation; fallbackIndex: number }[] = [
  { location: "footer_col_1", fallbackIndex: 0 },
  { location: "footer_col_2", fallbackIndex: 1 },
  { location: "footer_col_3", fallbackIndex: 2 },
  { location: "footer_col_4", fallbackIndex: 3 },
  { location: "footer_col_5", fallbackIndex: -1 },
];

const FooterColumn = ({
  location,
  fallbackIndex,
}: {
  location: MenuLocation;
  fallbackIndex: number;
}) => {
  const { data } = useCmsMenu(location);
  const tree = data?.tree ?? [];
  const fallback = fallbackIndex >= 0 ? fallbackCols[fallbackIndex] : null;

  const title = data?.tree.length ? menuTitleFor(location) : fallback?.title ?? "";
  const links: { label: string; to: string; newTab?: boolean }[] = tree.length
    ? tree.map((n: MenuNode) => ({
        label: n.label,
        to: n.url ?? "#",
        newTab: n.open_in_new_tab,
      }))
    : fallback?.links.map((l) => ({ label: l.label, to: l.to })) ?? [];

  if (!title && links.length === 0) return null;

  return (
    <div>
      <h4 className="font-display font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={`${l.to}-${i}`}>
            {l.newTab ? (
              <a
                href={l.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                to={l.to}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const LOCATION_LABELS: Record<MenuLocation, string> = {
  primary_nav: "",
  footer_col_1: "Product",
  footer_col_2: "Free Tools",
  footer_col_3: "Resources",
  footer_col_4: "Company",
  footer_col_5: "Legal",
};
function menuTitleFor(loc: MenuLocation) {
  return LOCATION_LABELS[loc] ?? "";
}

const Footer = () => {
  const { data: settings } = useFooterSettings();
  const blurb = settings?.brand_blurb ?? fallbackBlurb;
  const socials = settings?.social_links?.length ? settings.social_links : fallbackSocials;
  const copyright = settings?.copyright ?? `© ${new Date().getFullYear()} LLMClicks.ai. All rights reserved.`;
  return (
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
            {blurb}
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
            {socials.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors">
                  {Icon ? <Icon className="h-4 w-4" /> : <span className="text-xs">{social.icon.slice(0,1)}</span>}
                </a>
              );
            })}
          </div>
        </div>

        {FOOTER_LOCATIONS.map((c) => (
          <FooterColumn key={c.location} location={c.location} fallbackIndex={c.fallbackIndex} />
        ))}
      </div>

      <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{copyright}</p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
