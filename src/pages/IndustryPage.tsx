import Layout from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getIndustryBySlug, industries, type IndustrySection } from "@/data/industries";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

function renderInline(text: string): React.ReactNode {
  const tokenRegex = /<a\s+href="([^"]+)">(.*?)<\/a>|<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<code>(.*?)<\/code>/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(
        <Link key={key++} to={match[1]} className="text-accent hover:underline font-medium">
          {match[2]}
        </Link>
      );
    } else if (match[3] !== undefined) {
      parts.push(<strong key={key++} className="font-semibold text-foreground">{match[3]}</strong>);
    } else if (match[4] !== undefined) {
      parts.push(<em key={key++}>{match[4]}</em>);
    } else if (match[5] !== undefined) {
      parts.push(
        <code key={key++} className="bg-secondary/60 border border-border rounded px-1.5 py-0.5 text-xs font-mono">
          {match[5]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length > 0 ? parts : text;
}

const renderSection = (s: IndustrySection, i: number) => {
  switch (s.type) {
    case "h2":
      return (
        <h2 key={i} id={s.id} className="font-display text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-28">
          {s.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} id={s.id} className="font-display text-xl font-semibold mt-8 mb-3 scroll-mt-28">
          {s.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-base leading-relaxed text-foreground/90 mb-4">
          {renderInline(s.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 mb-5 text-foreground/90">
          {s.items.map((it, j) => (
            <li key={j} className="leading-relaxed">{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i} className="border-l-4 border-accent bg-secondary/40 px-5 py-4 my-5 rounded-r-lg italic text-sm text-foreground/80">
          {s.text}
        </blockquote>
      );
    case "code":
      return (
        <pre key={i} className="bg-secondary/60 border border-border rounded-xl p-4 overflow-x-auto text-xs leading-relaxed my-5 font-mono whitespace-pre">
          <code>{s.text}</code>
        </pre>
      );
    case "table":
      return (
        <div key={i} className="overflow-x-auto my-6 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60">
              <tr>
                {s.headers.map((h, j) => (
                  <th key={j} className="text-left font-display font-semibold px-4 py-3 border-b border-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, j) => (
                <tr key={j} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  {row.map((cell, k) => (
                    <td key={k} className="px-4 py-3 align-top text-foreground/90">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <img key={i} src={s.src} alt={s.alt} loading="lazy" className="rounded-xl my-6 w-full h-auto object-contain bg-card" />
      );
    default:
      return null;
  }
};

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
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (!industry) return <Navigate to="/industries" replace />;

  const related = industries.filter((i) => i.slug !== industry.slug).slice(0, 4);

  // FAQ JSON-LD
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
      {faqSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>
      )}

      <article className="section-padding pt-28 md:pt-36 relative">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none -z-10" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link to="/industries" className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> All Industries
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-accent">{industry.shortName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-5">
                  {industry.heroTitle}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {industry.heroSubtitle}
                </p>

                {(industry.date || industry.readTime) && (
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-8">
                    {industry.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {industry.date}
                      </span>
                    )}
                    {industry.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {industry.readTime}
                      </span>
                    )}
                  </div>
                )}

                {industry.heroImage && (
                  <div className="mb-10 rounded-2xl border border-border bg-card overflow-hidden">
                    <img
                      src={industry.heroImage}
                      alt={industry.heroImageAlt ?? industry.heroTitle}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

                {industry.placeholder ? (
                  <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
                    <h2 className="font-display text-xl font-semibold mb-2">In-depth playbook coming soon</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      We're putting the finishing touches on the full GEO playbook for the {industry.shortName.toLowerCase()} industry. In the meantime, run a free AI visibility audit to see where your brand stands today.
                    </p>
                    <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                        Run Free AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <>
                    {toc.length > 0 && (
                      <details className="lg:hidden mb-8 rounded-2xl border border-border bg-card p-4">
                        <summary className="cursor-pointer font-display font-semibold">On This Page</summary>
                        <ol className="mt-4 space-y-2 text-sm list-decimal pl-5">
                          {toc.map((item) => (
                            <li key={item.id}>
                              <a href={`#${item.id}`} className="text-foreground/80 hover:text-accent">{item.text}</a>
                            </li>
                          ))}
                        </ol>
                      </details>
                    )}

                    <div className="prose-content">{sections.map(renderSection)}</div>

                    {industry.faqs && industry.faqs.length > 0 && (
                      <div className="mt-16">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                          Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                          {industry.faqs.map((f, i) => (
                            <details key={i} className="rounded-2xl border border-border bg-card p-5 group">
                              <summary className="cursor-pointer font-display font-semibold list-none flex items-start justify-between gap-3">
                                <span>{f.q}</span>
                                <ChevronUp className="h-4 w-4 mt-1 text-muted-foreground transition-transform group-open:rotate-180" />
                              </summary>
                              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{f.a}</p>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>

              <div className="mt-16 rounded-2xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-xl font-bold mb-2">See how AI describes your brand</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a free AI visibility audit across ChatGPT, Perplexity, Gemini and Claude. Results in under 2 minutes.
                </p>
                <Button asChild className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                    Run Free AI Visibility Audit <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <aside className="hidden lg:block self-start sticky top-28 space-y-6">
              {toc.length > 0 && (
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setTocOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-4 border-b border-border"
                    aria-expanded={tocOpen}
                  >
                    <span className="font-display text-lg font-bold">On This Page</span>
                    <ChevronUp className={cn("h-4 w-4 text-muted-foreground transition-transform", !tocOpen && "rotate-180")} />
                  </button>
                  {tocOpen && (
                    <nav className="max-h-[60vh] overflow-y-auto p-5">
                      <ol className="space-y-3 text-sm list-decimal pl-6 marker:text-muted-foreground marker:font-medium">
                        {toc.map((item) => {
                          const isActive = activeId === item.id;
                          return (
                            <li key={item.id} className="leading-snug">
                              <a
                                href={`#${item.id}`}
                                className={cn(
                                  "block transition-colors",
                                  isActive
                                    ? "text-accent font-semibold underline underline-offset-4"
                                    : "text-foreground/80 hover:text-accent"
                                )}
                              >
                                {item.text}
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>
                  )}
                </div>
              )}

              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  More Industries
                </p>
                <ul className="space-y-1.5">
                  {related.map((r) => {
                    const RIcon = r.icon;
                    return (
                      <li key={r.slug}>
                        <Link
                          to={`/industries/${r.slug}`}
                          className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-accent/5 text-sm text-foreground/80 hover:text-accent transition-colors"
                        >
                          <RIcon className="h-4 w-4 text-accent/70" />
                          {r.shortName}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default IndustryPage;
