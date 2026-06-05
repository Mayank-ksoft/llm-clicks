import Layout from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, BookOpen, Calendar, Compass, ShieldCheck, FileText,
  BarChart3, Settings, Search, ChevronRight, Download, List, FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { docs, getDocBySlug } from "@/data/docsArticles";
import SimplePagination from "@/components/common/SimplePagination";
import { DOCS_CATEGORIES, docsCategoryPath, getDocsCategoryBySlug } from "@/lib/docsCategories";

const DOCS_PAGE_SIZE = 10;

const categoryMeta: Record<string, { icon: typeof Compass; desc: string }> = {
  "AI Query Mapping": { icon: Compass, desc: "Map AI-style queries to the right pages and solve cannibalization." },
  "Audits & Profiling": { icon: ShieldCheck, desc: "Run audits, profile your domain, and interpret AI visibility results." },
  "Getting Started": { icon: Settings, desc: "Set up your account, invite your team, and configure your workspace." },
  "On-Page Optimization": { icon: FileText, desc: "Use the Optimizer, Embedding Analyzer, and Content Comparison tools." },
  "Visibility Tracking": { icon: BarChart3, desc: "Track AI visibility over time, monitor competitors, and analyze citations." },
  "Account & Marketplace": { icon: Settings, desc: "Manage settings, leads, and the AI Listicle Marketplace." },
};

const slugifyHeading = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const DocIndex = ({ categorySlug }: { categorySlug?: string }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const categoryFromSlug = getDocsCategoryBySlug(categorySlug);
  const activeCat = categoryFromSlug?.title || "";
  const invalidCategory = Boolean(categorySlug) && !categoryFromSlug;

  useEffect(() => { setPage(1); }, [query, activeCat]);

  const counts = docs.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});
  const categories = Object.entries(categoryMeta)
    .map(([title, meta]) => ({ title, ...meta, count: counts[title] || 0 }))
    .filter((c) => c.count > 0);

  const filtered = useMemo(() => {
    let list = docs;
    if (activeCat) list = list.filter((d) => d.category === activeCat);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.excerpt.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q),
    );
  }, [query, activeCat]);

  if (invalidCategory) {
    return <Navigate to="/docs" replace />;
  }

  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute inset-0 accent-mesh opacity-30 pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="tag-pill mb-4 mx-auto"><BookOpen className="h-3 w-3" /> HELP CENTER</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">LLMClicks.ai Docs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Setup guides, walkthroughs, and best-practice playbooks for every module of the platform.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            className="max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs by title, topic or category…"
                className="pl-11 h-12 rounded-xl border-border focus-visible:ring-accent/40"
                aria-label="Search documentation"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            {query && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {filtered.length} result{filtered.length === 1 ? "" : "s"} for "{query}"
              </p>
            )}
          </motion.div>

          {!query && !activeCat && (
            <>
              <h2 className="font-display text-2xl font-bold mb-5">Core Features & Guides</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                {categories.map((c, i) => (
                  <motion.div key={c.title}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <Link
                      to={docsCategoryPath(c.title)}
                      className="block rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors shimmer-card group h-full"
                    >
                      <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                        <c.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-display text-lg font-bold mb-1 group-hover:text-accent transition-colors">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
                      <span className="text-xs font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">{c.count} {c.count === 1 ? "doc" : "docs"} <ArrowRight className="h-3 w-3" /></span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {activeCat && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Category</p>
                <h2 className="font-display text-2xl font-bold">{activeCat}</h2>
              </div>
              <Link
                to="/docs"
                className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All categories
              </Link>
            </div>
          )}

          {!activeCat && (
            <h2 className="font-display text-2xl font-bold mb-5">{query ? "Search results" : "All Tutorials"}</h2>
          )}
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.slice((page - 1) * DOCS_PAGE_SIZE, page * DOCS_PAGE_SIZE).map((d, i) => (
              <motion.div key={d.slug}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <Link to={`/docs/${d.slug}`} className="block rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors group h-full">
                  <p className="text-xs text-muted-foreground mb-2">{d.date} · {d.category}</p>
                  <h3 className="font-display font-bold mb-2 group-hover:text-accent transition-colors">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">{d.excerpt}</p>
                  <span className="text-sm font-medium text-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read tutorial <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          {filtered.length > 0 && (
            <SimplePagination
              page={page}
              totalPages={Math.max(1, Math.ceil(filtered.length / DOCS_PAGE_SIZE))}
              onPageChange={setPage}
              className="mt-10"
            />
          )}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No docs match "{query}". Try another keyword.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

const DocDetail = ({ slug }: { slug: string }) => {
  const doc = getDocBySlug(slug);
  const [activeId, setActiveId] = useState<string>("");

  const toc = useMemo(() => {
    if (!doc) return [];
    return doc.content
      .filter((b) => b.type === "h2" || b.type === "h3")
      .map((b: any) => ({
        id: slugifyHeading(b.text),
        text: b.text.replace(/\s*#\s*$/, "").trim(),
        level: b.type as "h2" | "h3",
      }))
      .filter((h) => h.text.length > 0);
  }, [doc]);

  // Sibling docs in same category
  const categoryDocs = useMemo(() => {
    if (!doc) return [];
    return docs.filter((d) => d.category === doc.category);
  }, [doc]);

  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    toc.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (!doc) return <Navigate to="/docs" replace />;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <article className="pt-24 md:pt-32 pb-12 px-4 relative">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none -z-10" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6 print:hidden">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/docs">Docs</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to={docsCategoryPath(doc.category)}>{doc.category}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[260px]">{doc.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left sidebar — category nav */}
            <aside className="lg:col-span-3 print:hidden lg:self-start lg:sticky lg:top-24">
              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{doc.category}</p>
                  <nav className="space-y-1 text-sm">
                    {categoryDocs.map((d) => (
                      <Link
                        key={d.slug}
                        to={`/docs/${d.slug}`}
                        className={`block py-2 px-3 rounded-md transition-colors ${
                          d.slug === doc.slug
                            ? "bg-accent/10 text-accent font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {d.title}
                      </Link>
                    ))}
                  </nav>
                </div>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1.5 px-3">
                  <ArrowLeft className="h-3.5 w-3.5" /> All docs
                </Link>
              </div>
            </aside>

            {/* Main content */}
            <div className="lg:col-span-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="tag-pill">{doc.category}</div>
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-border hover:bg-accent/5 hover:border-accent/30 print:hidden hover:text-accent"
                  >
                    <FileDown className="mr-1.5 h-3.5 w-3.5" /> Download PDF
                  </Button>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold mb-5 leading-tight">{doc.title}</h1>
                {doc.excerpt && <p className="text-lg text-muted-foreground mb-6">{doc.excerpt}</p>}
                <div className="flex items-center gap-5 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Updated {doc.date}</span>
                </div>
              </motion.div>

              {doc.image && (
                <div className="rounded-2xl overflow-hidden border border-border mb-10 aspect-[16/10] bg-secondary/40">
                  <img src={doc.image} alt={doc.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-6 text-foreground/90 leading-relaxed">
                {doc.content.map((b, i) => {
                  if (b.type === "h2") {
                    const id = slugifyHeading(b.text);
                    return <h2 key={i} id={id} className="scroll-mt-28 font-display text-2xl md:text-3xl font-bold mt-12 mb-3">{b.text.replace(/\s*#\s*$/, "")}</h2>;
                  }
                  if (b.type === "h3") {
                    const id = slugifyHeading(b.text);
                    return <h3 key={i} id={id} className="scroll-mt-28 font-display text-xl font-semibold mt-8 mb-2">{b.text.replace(/\s*#\s*$/, "")}</h3>;
                  }
                  if (b.type === "ul") return (
                    <ul key={i} className="space-y-2 pl-5 list-disc marker:text-accent">
                      {b.items.map((it, j) => <li key={j} className="text-muted-foreground">{it}</li>)}
                    </ul>
                  );
                  if (b.type === "quote") return (
                    <blockquote key={i} className="border-l-2 border-accent pl-5 py-1 italic text-foreground/80 my-6">"{b.text}"</blockquote>
                  );
                  return <p key={i} className="text-muted-foreground">{b.text}</p>;
                })}
              </div>

              <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center gap-3 print:hidden">
                <Button onClick={handlePrint} variant="outline" className="rounded-xl border-border hover:bg-accent/5 hover:border-accent/30 hover:text-accent">
                  <Download className="mr-1.5 h-4 w-4" /> Download as PDF
                </Button>
                <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 group">
                  <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                    Try this in the app <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right sidebar — TOC */}
            <aside className="lg:col-span-3 print:hidden lg:self-start lg:sticky lg:top-24">
              <div>
                {toc.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      <List className="h-3.5 w-3.5" /> On this page
                    </p>
                    <nav className="space-y-1 text-sm max-h-[calc(100vh-12rem)] overflow-y-auto">
                      {toc.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block py-1.5 px-2 rounded-md border-l-2 transition-colors ${
                            h.level === "h3" ? "ml-3 text-xs" : ""
                          } ${
                            activeId === h.id
                              ? "border-accent text-accent bg-accent/5 font-medium"
                              : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
};

const Docs = () => {
  const { slug, categorySlug } = useParams<{ slug: string; categorySlug: string }>();
  if (categorySlug) return <DocIndex categorySlug={categorySlug} />;
  return slug ? <DocDetail slug={slug} /> : <DocIndex />;
};

export default Docs;
