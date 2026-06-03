import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Linkedin, Twitter, ArrowUpRight, ArrowRight, MapPin, Clock, Star, Briefcase, User, MessageSquare, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import founderShripad from "@/assets/founder-shripad.webp";
import { posts } from "@/data/blogPosts";

const expertiseTags = [
  "Generative Engine Optimization",
  "AI Visibility Tracking",
  "Technical SEO",
  "LLM Citation Analysis",
  "Entity Optimization",
  "SaaS Growth",
  "Share of Model",
  "Prompt Tracking",
];

const foundedCompanies = [
  { name: "LLMClicks.ai", role: "Founder & CEO · 2024–Present", href: "https://llmclicks.ai" },
  { name: "GMB Briefcase", role: "Founder · Google Business Optimization", href: "https://gmbbriefcase.com" },
  { name: "Agency Simplifier", role: "Founder · Agency Management SaaS", href: "https://agencysimplifier.com" },
  { name: "Citation Builder Pro", role: "Founder · Local SEO Citations", href: "#" },
];

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    "@id": "https://llmclicks.ai/author/shripad-deshmukh/",
    name: "Shripad Deshmukh",
    givenName: "Shripad",
    familyName: "Deshmukh",
    jobTitle: "Founder & CEO",
    description:
      "4x SaaS founder with 15+ years of SEO expertise. Pioneer of Generative Engine Optimization (GEO). Founder of LLMClicks.ai, GMB Briefcase, Agency Simplifier, and Citation Builder Pro.",
    url: "https://llmclicks.ai/author/shripad-deshmukh/",
    worksFor: { "@type": "Organization", name: "LLMClicks.ai", url: "https://llmclicks.ai" },
    sameAs: ["https://www.linkedin.com/in/shripaddeshmukh", "https://twitter.com/shripaddeshmukh"],
    knowsAbout: [
      "Generative Engine Optimization",
      "AI Visibility Tracking",
      "Technical SEO",
      "LLM Citation Analysis",
      "SaaS Growth",
    ],
  },
};

const AuthorShripad = () => {
  const authoredPosts = posts.filter((p) => p.author === "Shripad Deshmukh").slice(0, 6);
  const fallbackPosts = authoredPosts.length > 0 ? authoredPosts : posts.slice(0, 6);

  return (
    <Layout>
      <Helmet>
        <title>Shripad Deshmukh — Founder & CEO | LLMClicks.ai</title>
        <meta
          name="description"
          content="Shripad Deshmukh is a 4x SaaS founder and pioneer of Generative Engine Optimization (GEO). Founder & CEO of LLMClicks.ai with 15+ years of SEO expertise."
        />
        <script type="application/ld+json">{JSON.stringify(profileSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-6xl px-4 pt-6">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-foreground">Shripad Deshmukh</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-accent/40 animate-[spin_12s_linear_infinite]" />
            <img
              src={founderShripad}
              alt="Shripad Deshmukh"
              width={120}
              height={120}
              className="relative z-10 h-[120px] w-[120px] rounded-full object-cover border-2 border-accent/30"
            />
            <span className="absolute bottom-1 right-1 z-20 h-7 w-7 rounded-full bg-accent border-2 border-background flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-medium px-3 py-1 uppercase tracking-wider mb-3">
              ✦ Founder & CEO · LLMClicks.ai
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-2">
              Shripad <span className="text-accent">Deshmukh</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">
              Pioneer of Generative Engine Optimization (GEO). 4x SaaS founder helping brands engineer technical visibility across AI search engines.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mb-7">
              {[
                { num: "15+", label: "Years in SEO" },
                { num: "4×", label: "SaaS Founder" },
                { num: "GEO", label: "Pioneer" },
                { num: "6+", label: "LLMs Tracked" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-semibold tracking-tight leading-none">{s.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/ai-visibility-audit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors"
              >
                Run Free AI Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://calendly.com/shripad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-5 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors"
              >
                Book a Demo
              </a>
              <div className="flex gap-2 ml-1">
                <a href="https://www.linkedin.com/in/shripaddeshmukh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://twitter.com/shripaddeshmukh" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="h-px bg-border" />
      </div>

      {/* Main + Sidebar */}
      <div className="container mx-auto max-w-6xl px-4 py-14 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
        {/* Left */}
        <div>
          <p className="text-[11px] font-medium tracking-widest uppercase text-accent mb-3">About the author</p>
          <div className="h-[3px] w-12 bg-accent rounded mb-5" />
          <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">Shripad Deshmukh</span> built LLMClicks.ai because he spotted a problem most people missed: brands were spending everything to rank on Google, yet had no idea how AI systems interpreted or described them. As buyers shifted to asking ChatGPT and Perplexity for recommendations, those brands were becoming invisible in the places that now drive decisions.
            </p>
            <p>
              With more than <span className="text-foreground font-medium">15 years building SEO and SaaS products</span>, Shripad has founded four companies, led large teams, and shipped platforms used by thousands of agencies and local businesses globally. His earlier platforms — <span className="text-foreground font-medium">GMB Briefcase</span>, <span className="text-foreground font-medium">Agency Simplifier</span>, and <span className="text-foreground font-medium">Citation Builder Pro</span> — grew because they focused on results, not jargon.
            </p>
            <p>
              Today, Shripad pioneers <span className="text-foreground font-medium">Generative Engine Optimization (GEO)</span>: the discipline of engineering how AI systems like ChatGPT, Perplexity, Gemini, Grok, and Claude perceive, cite, and recommend brands. LLMClicks.ai is the platform he built to make that measurable, trackable, and actionable for every B2B marketing team and agency.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-7">
            {expertiseTags.map((t) => (
              <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent">
                {t}
              </span>
            ))}
          </div>

          {/* Founded Companies */}
          <p className="text-[11px] font-medium tracking-widest uppercase text-accent mt-10 mb-3">Founded companies</p>
          <div className="h-[3px] w-12 bg-accent rounded mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {foundedCompanies.map((c) => (
              <a
                key={c.name}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="font-medium text-foreground">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.role}</div>
              </a>
            ))}
          </div>

          {/* Published Articles */}
          <div className="mt-14">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-accent mb-3">Published articles</p>
                <div className="h-[3px] w-12 bg-accent rounded" />
              </div>
              <Link to="/blog" className="text-sm text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
                All articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {fallbackPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group block rounded-xl border border-border bg-card px-5 py-5 transition-all hover:translate-x-1 hover:border-accent/40"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="px-2 py-0.5 rounded bg-accent/10 text-accent">{p.tag}</span>
                    <span>{p.date}</span>
                    <span>{p.readTime}</span>
                  </div>
                  <div className="font-medium text-foreground group-hover:text-accent transition-colors">{p.title}</div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium mb-4">Author details</p>
            {[
              { Icon: User, label: "Full name", value: "Shripad Deshmukh" },
              { Icon: Briefcase, label: "Role", value: "Founder & CEO, LLMClicks.ai" },
              { Icon: Clock, label: "Experience", value: "15+ years in SEO & SaaS" },
              { Icon: Star, label: "Specialization", value: "Generative Engine Optimization" },
              { Icon: MapPin, label: "Based in", value: "India" },
            ].map(({ Icon, label, value }, i, arr) => (
              <div key={label} className={`flex items-start gap-3 py-3 text-sm ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <Icon className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-foreground/90">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden text-white" style={{ background: "linear-gradient(145deg, hsl(var(--navy)) 0%, hsl(180 30% 14%) 100%)" }}>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: "hsl(var(--accent) / 0.25)" }} />
            <div className="relative z-10">
              <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">Free tool</p>
              <h3 className="font-display text-lg font-semibold mb-2 leading-snug">Is your brand visible in ChatGPT?</h3>
              <p className="text-sm text-white/70 mb-5">Run Shripad's 120-point AI Visibility Audit and find out in minutes. No credit card required.</p>
              <Link to="/ai-visibility-audit" className="block w-full text-center rounded-lg bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors">
                Run Free Audit →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium mb-4">Connect with Shripad</p>
            {[
              { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/shripaddeshmukh", href: "https://linkedin.com/in/shripaddeshmukh" },
              { Icon: Twitter, label: "X / Twitter", value: "@shripaddeshmukh", href: "https://twitter.com/shripaddeshmukh" },
              { Icon: MessageSquare, label: "Book a demo", value: "calendly.com/shripad", href: "https://calendly.com/shripad" },
            ].map(({ Icon, label, value, href }, i, arr) => (
              <div key={label} className={`flex items-start gap-3 py-3 text-sm ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <Icon className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1 truncate">
                    {value} <ArrowUpRight className="h-3 w-3 flex-shrink-0" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default AuthorShripad;
