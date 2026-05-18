import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User, ChevronRight, ArrowUpRight, Twitter, Linkedin, Link as LinkIcon, List, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getPostBySlug, posts } from "@/data/blogPosts";
import { useToast } from "@/hooks/use-toast";
import authorShripad from "@/assets/author-shripad.png";

const slugifyHeading = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string>("");

  const toc = useMemo(() => {
    if (!post) return [];
    return post.content
      .filter((b) => b.type === "h2")
      .map((b: any) => ({ id: slugifyHeading(b.text), text: b.text }));
  }, [post]);

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

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const modifiedDate = post.date; // dataset has only one date — surface as "Last updated"
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link copied", description: "Article URL is on your clipboard." });
    } catch {
      toast({ title: "Couldn't copy", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <article className="pt-24 md:pt-32 pb-12 px-4 relative">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none -z-10" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/blog">Blog</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to={`/blog?tag=${post.tag}`}>{post.tag}</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator><ChevronRight /></BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[260px]">{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main */}
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="tag-pill mb-5">{post.tag}</div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold mb-6 leading-[1.1] tracking-tight">
                  {post.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-7 leading-relaxed">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                  <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Published {post.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-accent" /> Updated {modifiedDate}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl overflow-hidden border border-border mb-8 aspect-[16/10] bg-secondary/40"
              >
                <img src={post.image} alt={post.title} width={1024} height={640} className="w-full h-full object-cover" />
              </motion.div>

              {/* Summarize with AI bar */}
              <div className="rounded-2xl border border-border bg-card/60 p-4 mb-10 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> Summarize with
                </span>
                {[
                  { name: "ChatGPT", url: `https://chatgpt.com/?q=${encodeURIComponent(`Please analyze and summarize this article, highlighting key insights: ${shareUrl}`)}` },
                  { name: "Claude", url: `https://claude.ai/new?q=${encodeURIComponent(`Please analyze and summarize this article, highlighting key insights: ${shareUrl}`)}` },
                  { name: "Perplexity", url: `https://www.perplexity.ai/?q=${encodeURIComponent(`Please analyze and summarize this article, highlighting key insights: ${shareUrl}`)}` },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-border hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    {s.name}
                  </a>
                ))}
              </div>

              <div className="space-y-5 text-foreground/90 text-[1.0625rem] leading-[1.75]">
                {post.content.map((block, i) => {
                  if (block.type === "h2") {
                    const id = slugifyHeading(block.text);
                    return (
                      <h2
                        key={i}
                        id={id}
                        className="scroll-mt-28 font-display text-[1.75rem] md:text-[2rem] font-bold mt-14 mb-4 leading-tight tracking-tight border-l-[3px] border-accent pl-4"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "h3")
                    return (
                      <h3
                        key={i}
                        className="font-display text-xl md:text-[1.375rem] font-semibold mt-10 mb-3 leading-snug text-foreground"
                      >
                        {block.text}
                      </h3>
                    );
                  if (block.type === "ul")
                    return (
                      <ul key={i} className="space-y-2.5 pl-5 list-disc marker:text-accent">
                        {block.items.map((it, j) => <li key={j} className="text-foreground/80 leading-[1.7]">{it}</li>)}
                      </ul>
                    );
                  if (block.type === "quote")
                    return (
                      <blockquote key={i} className="border-l-2 border-accent pl-5 py-1 italic text-foreground/85 my-6 text-lg">
                        "{block.text}"
                      </blockquote>
                    );
                  return <p key={i} className="text-foreground/80">{block.text}</p>;
                })}
              </div>

              {/* Share row */}
              <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium mr-1">Share:</span>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <button onClick={copyLink} className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors" aria-label="Copy link">
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Author bio */}
              <div className="mt-10 rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start gap-5">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-accent to-coral flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0">
                  {post.author === "Shripad Deshmukh" ? (
                    <img src={authorShripad} alt={post.author} className="h-full w-full object-cover" />
                  ) : (
                    post.author.split(" ").map((w) => w[0]).slice(0, 2).join("")
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Written by</p>
                  <h3 className="font-display font-bold text-lg mb-1">{post.author}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Founder at LLMClicks.ai — helping SaaS brands track and improve how AI assistants represent them. Two decades in SEO, content strategy, and Generative Engine Optimization.
                  </p>
                  <div className="flex gap-2">
                    <a href="https://www.linkedin.com/company/llmclicks-ai/" target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                      LinkedIn <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <a href="https://x.com/llmclicksai" target="_blank" rel="noopener noreferrer" className="text-xs text-accent font-medium inline-flex items-center gap-1 hover:gap-2 transition-all ml-3">
                      X / Twitter <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:self-start lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:grid lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-5">
              <div className="space-y-5 lg:contents">
                {/* TOC */}
                {toc.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5 lg:min-h-0 lg:flex lg:flex-col">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                      <List className="h-3.5 w-3.5" /> Table of contents
                    </p>
                    <nav className="space-y-1.5 text-sm lg:min-h-0 lg:overflow-y-auto lg:pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
                      {toc.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block py-1.5 px-2 rounded-md border-l-2 transition-colors ${
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

                {/* Sticky CTA */}
                <div className="rounded-2xl p-6 relative overflow-hidden text-white" style={{ background: "linear-gradient(145deg, hsl(var(--navy)) 0%, hsl(180 30% 14%) 100%)" }}>
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: "hsl(var(--accent) / 0.25)" }} />
                  <div className="relative z-10">
                    <p className="tag-pill mb-3 bg-white/10 border-white/20 text-white">FREE TRIAL</p>
                    <h3 className="font-display text-xl font-bold mb-2 leading-tight">See how AI describes your brand</h3>
                    <p className="text-sm text-white/70 mb-5">Run a free AI visibility audit across ChatGPT, Perplexity, Gemini and Claude in under 2 minutes.</p>
                    <Button asChild className="w-full rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 group">
                      <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                        Start free <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button asChild variant="ghost" className="w-full mt-2 rounded-xl text-white hover:bg-white/10 hover:text-white">
                      <a href="https://calendly.com/shripadclicks" target="_blank" rel="noopener noreferrer">Book a demo</a>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="section-padding border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Continue reading</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="rounded-2xl border border-border bg-card overflow-hidden group shimmer-card glow-hover block">
                <div className="aspect-[16/10] overflow-hidden bg-secondary/40">
                  <img src={p.image} alt={p.title} loading="lazy" width={1024} height={640} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="tag-pill mb-2">{p.tag}</span>
                  <h3 className="font-display font-bold text-base mb-2 group-hover:text-accent transition-colors line-clamp-2">{p.title}</h3>
                  <span className="text-sm font-medium text-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
