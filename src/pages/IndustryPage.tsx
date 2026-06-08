import Layout from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown, Check, X, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getIndustryBySlug, industries, type IndustrySection } from "@/data/industries";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);

function renderInline(text: string): React.ReactNode {
  const tokenRegex = /<a\s+href="([^"]+)">(.*?)<\/a>|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<code>(.*?)<\/code>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = tokenRegex.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    if (m[1] !== undefined) parts.push(<Link key={key++} to={m[1]} className="text-accent hover:underline font-medium">{m[2]}</Link>);
    else if (m[3] !== undefined) parts.push(<strong key={key++} className="font-semibold">{m[3]}</strong>);
    else if (m[4] !== undefined) parts.push(<em key={key++}>{m[4]}</em>);
    else if (m[5] !== undefined) parts.push(<code key={key++} className="bg-secondary/60 border border-border rounded px-1.5 py-0.5 text-xs font-mono">{m[5]}</code>);
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? parts : text;
}

const renderSection = (s: IndustrySection, i: number) => {
  switch (s.type) {
    case "h2":
      return <h2 key={i} id={s.id} className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-28">{s.text}</h2>;
    case "h3":
      return <h3 key={i} id={s.id} className="font-display text-xl font-semibold mt-8 mb-3 scroll-mt-28">{s.text}</h3>;
    case "p":
      return <p key={i} className="text-base leading-relaxed text-foreground/90 mb-4">{renderInline(s.text)}</p>;
    case "ul":
      return <ul key={i} className="list-disc pl-6 space-y-2 mb-5 text-foreground/90">{s.items.map((it, j) => <li key={j} className="leading-relaxed">{renderInline(it)}</li>)}</ul>;
    case "quote":
      return <blockquote key={i} className="border-l-4 border-accent bg-secondary/40 px-5 py-4 my-5 rounded-r-lg italic text-sm text-foreground/80">{s.text}</blockquote>;
    case "code":
      return <pre key={i} className="bg-secondary/60 border border-border rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-5 font-mono whitespace-pre"><code>{s.text}</code></pre>;
    case "table":
      return (
        <div key={i} className="overflow-x-auto my-6 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60"><tr>{s.headers.map((h, j) => <th key={j} className="text-left font-semibold px-4 py-3 border-b border-border">{h}</th>)}</tr></thead>
            <tbody>{s.rows.map((row, j) => <tr key={j} className="border-b border-border last:border-0"><>{row.map((c, k) => <td key={k} className="px-4 py-3 align-top text-foreground/90">{c}</td>)}</></tr>)}</tbody>
          </table>
        </div>
      );
    case "image":
      return <img key={i} src={s.src} alt={s.alt} loading="lazy" className="rounded-xl my-6 w-full h-auto object-contain bg-card" />;
    default:
      return null;
  }
};

const MonoPill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block font-mono uppercase tracking-[0.08em] text-[11px] text-accent bg-accent/10 px-3 py-1 rounded-full">
    {children}
  </span>
);

const BrandBar = ({ className }: { className?: string }) => (
  <div className={cn("h-[3px] w-12 bg-accent rounded mb-6", className)} />
);

const IndustryPage = () => {
  const { slug } = useParams();
  const industry = slug ? getIndustryBySlug(slug) : null;

  const { sections, toc } = useMemo(() => {
    if (!industry?.content) return { sections: [] as IndustrySection[], toc: [] as { id: string; text: string }[] };
    const seen = new Set<string>();
    const t: { id: string; text: string }[] = [];
    const sx = industry.content.map((s) => {
      if (s.type === "h2") {
        let id = s.id || slugify(s.text);
        const base = id;
        let n = 2;
        while (seen.has(id)) id = `${base}-${n++}`;
        seen.add(id);
        t.push({ id, text: s.text });
        return { ...s, id };
      }
      return s;
    });
    return { sections: sx, toc: t };
  }, [industry]);

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!toc.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (v[0]) setActiveId(v[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  if (!industry) return <Navigate to="/industries" replace />;

  const related = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);
  const faqSchema = industry.faqs && industry.faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: industry.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <Layout>
      <Helmet>
        <title>{industry.metaTitle}</title>
        <meta name="description" content={industry.metaDescription} />
        <link rel="canonical" href={`https://llmclicks.ai/industries/${industry.slug}/`} />
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {/* Breadcrumb */}
      <div className="container mx-auto max-w-[1100px] px-6 pt-28 md:pt-32 pb-4">
        <nav className="text-sm text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-accent">Home</Link></li>
            <li>/</li>
            <li><Link to="/industries" className="hover:text-accent inline-flex items-center gap-1"><ArrowLeft className="h-3.5 w-3.5" />Industries</Link></li>
            <li>/</li>
            <li className="font-medium text-foreground">{industry.shortName}</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="container mx-auto max-w-[1100px] px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-6 space-y-6">
            {industry.heroPill && <MonoPill>{industry.heroPill}</MonoPill>}
            <h1 className="font-display text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.15] tracking-tight">
              {industry.heroTitle}
              {industry.heroTitleAccent && (
                <>
                  {" "}
                  <span className="text-accent relative inline-block">
                    {industry.heroTitleAccent}
                    <span className="absolute bottom-1 left-0 w-full h-1.5 bg-accent/20 -z-10" />
                  </span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {industry.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild size="lg" className="rounded-md bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                  Run Free AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md">
                <a href="https://calendly.com/shripad" target="_blank" rel="noopener noreferrer">Book a Demo</a>
              </Button>
            </div>

            {industry.trustNote && (
              <div className="pt-6 mt-2 border-t border-border">
                <p className="text-xs font-bold mb-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  {industry.trustNote}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground">
                  <span>ChatGPT</span><span>·</span>
                  <span>Perplexity</span><span>·</span>
                  <span>Claude</span><span>·</span>
                  <span>Gemini</span><span>·</span>
                  <span>Copilot</span><span>·</span>
                  <span>Grok</span>
                </div>
              </div>
            )}

            {(industry.date || industry.readTime) && (
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                {industry.date && <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {industry.date}</span>}
                {industry.readTime && <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {industry.readTime}</span>}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-6">
            {industry.journey ? (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="text-xs text-muted-foreground font-mono mb-6 uppercase tracking-wider">
                  {industry.journey.title}
                </div>
                <div className="space-y-3">
                  {industry.journey.steps.map((step, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center gap-4 p-3 rounded-lg",
                        step.active
                          ? "bg-accent/10 border border-accent/20"
                          : "bg-secondary/40"
                      )}
                    >
                      {step.index && (
                        <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                          {step.index}
                        </div>
                      )}
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : industry.heroImage ? (
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <img
                  src={industry.heroImage}
                  alt={industry.heroImageAlt ?? industry.heroTitle}
                  className="w-full h-auto object-contain"
                  loading="eager"
                />
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="text-xs text-muted-foreground font-mono mb-6 uppercase tracking-wider">
                  AI Share of Voice — Sample
                </div>
                <div className="space-y-5">
                  {[
                    { label: "ChatGPT", value: 78 },
                    { label: "Perplexity", value: 64 },
                    { label: "Top Competitor", value: 30, muted: true },
                  ].map((row) => (
                    <div key={row.label} className={row.muted ? "opacity-60" : ""}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">{row.label}</span>
                        <span className="font-mono">{row.value}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            row.muted ? "bg-muted-foreground/40" : "bg-accent"
                          )}
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Without / With comparison */}
      {(industry.withoutItems?.length || industry.withItems?.length) ? (
        <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">How LLMClicks Helps {industry.shortName} Teams</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-destructive/15 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                  <X className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">Without LLMClicks</h3>
              </div>
              <ul className="space-y-4">
                {(industry.withoutItems ?? []).map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" /> {it}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 relative overflow-hidden shadow-[0_8px_30px_-10px_hsl(var(--accent)/0.18)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -z-10" />
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-accent/15">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">With LLMClicks.ai</h3>
              </div>
              <ul className="space-y-4">
                {(industry.withItems ?? []).map((it, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* Pain cards */}
      {industry.painCards?.length ? (
        <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16">
          <BrandBar />
          <h2 className="text-3xl font-bold mb-4 tracking-tight">
            Why {industry.shortName} Brands Struggle in AI Search
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            AI search engines are intercepting your buyers before they reach your website. Traditional SEO cannot fix these vulnerabilities.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.painCards.map((c, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-8 hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Helps cards */}
      {industry.helpsCards?.length ? (
        <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16">
          <BrandBar />
          <h2 className="text-3xl font-bold mb-4 tracking-tight">How LLMClicks.ai Helps</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Everything your product, marketing, and SEO teams need to win conversational search in your category.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {industry.helpsCards.map((c, i) => (
              <article key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-accent/30 hover:-translate-y-0.5 transition-all">
                <h3 className="font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Outcomes */}
      {industry.outcomes?.length ? (
        <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl font-bold mb-10 tracking-tight">Business Outcomes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {industry.outcomes.map((o) => (
              <div key={o} className="bg-card border border-border rounded-xl px-4 py-5 font-semibold">
                {o}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Long-form content (SaaS) */}
      {industry.content && industry.content.length > 0 && (
        <section className="container mx-auto max-w-[1100px] px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
            <article className="max-w-3xl">
              <BrandBar />
              <h2 className="text-3xl font-bold mb-6 tracking-tight">The Complete {industry.shortName} GEO Playbook</h2>
              {toc.length > 0 && (
                <details className="lg:hidden mb-8 rounded-2xl border border-border bg-card p-4">
                  <summary className="cursor-pointer font-semibold">On This Page</summary>
                  <ol className="mt-4 space-y-2 text-sm list-decimal pl-5">
                    {toc.map((t) => (
                      <li key={t.id}><a href={`#${t.id}`} className="text-foreground/80 hover:text-accent">{t.text}</a></li>
                    ))}
                  </ol>
                </details>
              )}
              <div className="prose-content">{sections.map(renderSection)}</div>
            </article>
            <aside className="hidden lg:block self-start sticky top-28">
              {toc.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5">
                  <p className="font-semibold mb-3">On This Page</p>
                  <ol className="space-y-2 text-sm list-decimal pl-5">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className={cn(
                            "block transition-colors",
                            activeId === t.id
                              ? "text-accent font-semibold"
                              : "text-foreground/80 hover:text-accent"
                          )}
                        >
                          {t.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      {/* Placeholder fallback */}
      {industry.placeholder && (
        <section className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">In-depth playbook coming soon</h2>
            <p className="text-sm text-muted-foreground mb-6">
              We're putting the finishing touches on the full GEO playbook for the {industry.shortName.toLowerCase()} industry. In the meantime, run a free AI visibility audit to see where your brand stands today.
            </p>
            <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                Run Free AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      )}

      {/* FAQ */}
      {industry.faqs && industry.faqs.length > 0 && (
        <section className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {industry.faqs.map((f, i) => (
              <details key={i} className="group bg-card border border-border rounded-2xl p-5">
                <summary className="cursor-pointer font-semibold list-none flex items-start justify-between gap-3 text-sm">
                  <span>{f.q}</span>
                  <ChevronDown className="h-4 w-4 mt-1 text-accent transition-transform group-open:rotate-180 shrink-0" />
                </summary>
                <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="container mx-auto max-w-[1100px] px-6 py-16 md:py-24">
        <div className="bg-card rounded-3xl border border-accent/20 p-10 md:p-16 text-center shadow-[0_8px_40px_-15px_hsl(var(--accent)/0.2)]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See How AI Describes Your {industry.shortName} Brand.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Monitor visibility, identify inaccurate information, and improve how AI platforms recommend your organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-md bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                Run Free AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-md">
              <a href="https://calendly.com/shripad" target="_blank" rel="noopener noreferrer">Book a Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="container mx-auto max-w-[1100px] px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">Related Industries</h2>
          <Link to="/industries" className="text-sm font-medium text-accent hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((r) => {
            const RIcon = r.icon;
            return (
              <Link
                key={r.slug}
                to={`/industries/${r.slug}`}
                className="group flex flex-col gap-3 bg-card border border-border rounded-xl p-5 hover:border-accent/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <RIcon className="h-4 w-4" />
                </div>
                <span className="font-semibold text-sm group-hover:text-accent transition-colors">{r.shortName}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default IndustryPage;
