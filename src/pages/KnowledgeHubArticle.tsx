import Layout from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, RefreshCw, ChevronUp } from "lucide-react";
import { type KHSection } from "@/data/knowledgeHub";
import { useKnowledgeHubArticle } from "@/lib/cms/publicContent";
import { useCmsArticleSeo } from "@/hooks/useCmsArticleSeo";
import ArticleSeo from "@/components/seo/ArticleSeo";
import { Button } from "@/components/ui/button";
import { blobImageSrc } from "@/lib/blobUrls";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

function renderParagraphContent(text: string): React.ReactNode {
  // Supports <a href="...">, <strong>, <em>, <code>
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

const renderSection = (s: KHSection, i: number) => {
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
          {renderParagraphContent(s.text)}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 mb-5 text-foreground/90">
          {s.items.map((it, j) => <li key={j} className="leading-relaxed">{renderParagraphContent(it)}</li>)}
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
      return <img key={i} src={s.src} alt={s.alt} loading="lazy" className="rounded-xl my-6 w-full" />;
    default:
      return null;
  }
};

const KnowledgeHubArticle = () => {
  const { category, slug } = useParams();
  const data = useKnowledgeHubArticle(category, slug);
  const { data: cmsSeo } = useCmsArticleSeo("kb_articles", slug);

  // Build TOC from H2s, ensuring each has a stable id
  const { sections, toc } = useMemo(() => {
    if (!data) return { sections: [] as KHSection[], toc: [] as { id: string; text: string }[] };
    const seen = new Set<string>();
    const t: { id: string; text: string }[] = [];
    const sx = data.article.content.map((s) => {
      if (s.type === "h2") {
        let id = s.id || slugify(s.text);
        let base = id;
        let n = 2;
        while (seen.has(id)) id = `${base}-${n++}`;
        seen.add(id);
        t.push({ id, text: s.text });
        return { ...s, id };
      }
      return s;
    });
    return { sections: sx, toc: t };
  }, [data]);

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

  if (!data) return <Navigate to="/knowledge-hub" replace />;
  const { category: cat, article } = data;

  return (
    <Layout>
      <article className="section-padding pt-28 md:pt-36 relative">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none -z-10" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link to="/knowledge-hub" className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" /> Back to Hub
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <Link to={`/knowledge-hub/${cat.slug}`} className="text-accent hover:underline">{cat.name}</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
            {/* Main column */}
            <div className="max-w-3xl">
              {/* CTA banner */}
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-display font-semibold mb-0.5">Test Your Crawlability</p>
                  <p className="text-sm text-muted-foreground">Are your robots.txt rules hurting your AI visibility? Run a free technical scan.</p>
                </div>
                <Button asChild size="sm">
                  <Link to="/ai-readiness-analyzer">Run Free Scan</Link>
                </Button>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-5">{article.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-8">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {article.readTime}</span>
                  {article.updated && (
                    <span className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Updated: {article.updated}</span>
                  )}
                </div>

                <img
                  src={blobImageSrc(cmsSeo?.hero_image) || article.image}
                  alt={cmsSeo?.hero_image_alt || article.imageAlt}
                  title={cmsSeo?.hero_image_title || undefined}
                  className="rounded-2xl w-full mb-3 border border-border"
                />
                {cmsSeo?.hero_image_caption && (
                  <p className="text-sm text-muted-foreground text-center mb-10">{cmsSeo.hero_image_caption}</p>
                )}
                <ArticleSeo data={cmsSeo} />

                {/* Mobile TOC (collapsible, inline) */}
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

                <div className="prose-content">
                  {sections.map(renderSection)}
                </div>
              </motion.div>

              {/* Footer CTA */}
              <div className="mt-16 rounded-2xl border border-border bg-card p-6 text-center">
                <h3 className="font-display text-xl font-bold mb-2">See how AI describes your brand</h3>
                <p className="text-sm text-muted-foreground mb-4">Get a free AI visibility audit across ChatGPT, Perplexity, Gemini and Claude.</p>
                <Button asChild>
                  <Link to="/ai-visibility-checker">Run Free Audit</Link>
                </Button>
              </div>
            </div>

            {/* Sticky TOC sidebar (desktop) */}
            {toc.length > 0 && (
              <aside className="hidden lg:block self-start sticky top-28">
                <div>
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
                      <nav className="max-h-[70vh] overflow-y-auto p-5">
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
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default KnowledgeHubArticle;
