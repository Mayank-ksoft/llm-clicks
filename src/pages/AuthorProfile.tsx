import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Linkedin, Twitter, ArrowUpRight, ArrowRight, MapPin, Clock, Star, Briefcase, User, MessageSquare, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuthor } from "@/hooks/useAuthor";
import { posts } from "@/data/blogPosts";
import { absoluteBlobImageSrc, blobImageSrc } from "@/lib/blobUrls";

const AuthorProfile = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: author, isLoading, error } = useAuthor(slug);

  if (isLoading) {
    return <Layout><div className="container mx-auto max-w-6xl px-4 py-20 text-muted-foreground">Loading…</div></Layout>;
  }
  if (error || !author || !author.published) {
    return <Navigate to="/blog" replace />;
  }

  const authoredPosts = posts.filter((p) => p.author === author.name).slice(0, 6);
  const fallbackPosts = authoredPosts.length > 0 ? authoredPosts : posts.slice(0, 6);

  const stats = author.stats ?? [];
  const tags = author.expertise_tags ?? [];
  const companies = author.founded_companies ?? [];
  const bioParagraphs = (author.long_bio_md ?? "").split(/\n\n+/).filter(Boolean);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": `https://llmclicks.ai/author/${author.slug}/`,
      name: author.name,
      jobTitle: author.role_title ?? undefined,
      description: author.tagline ?? author.bio ?? undefined,
      url: `https://llmclicks.ai/author/${author.slug}/`,
      image: absoluteBlobImageSrc(author.avatar_url) || undefined,
      worksFor: { "@type": "Organization", name: "LLMClicks.ai", url: "https://llmclicks.ai" },
      sameAs: [author.linkedin, author.twitter, author.website].filter(Boolean),
      knowsAbout: tags,
    },
  };

  // Render very-light markdown: **bold** within paragraphs.
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
      const m = /^\*\*([^*]+)\*\*$/.exec(p);
      return m ? <span key={i} className="text-foreground font-medium">{m[1]}</span> : <span key={i}>{p}</span>;
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>{author.meta_title ?? `${author.name} | LLMClicks.ai`}</title>
        <meta name="description" content={author.meta_description ?? author.bio ?? ""} />
        {author.og_image && <meta property="og:image" content={absoluteBlobImageSrc(author.og_image)} />}
        <link rel="canonical" href={`/author/${author.slug}`} />
        <script type="application/ld+json">{JSON.stringify(profileSchema)}</script>
      </Helmet>

      <div className="container mx-auto max-w-6xl px-4 pt-6">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          <span className="text-foreground">{author.name}</span>
        </nav>
      </div>

      <section className="container mx-auto max-w-6xl px-4 pt-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-accent/40 animate-[spin_12s_linear_infinite]" />
            {author.avatar_url ? (
              <img
                src={blobImageSrc(author.avatar_url)}
                alt={author.name}
                width={120}
                height={120}
                className="relative z-10 h-[120px] w-[120px] rounded-full object-cover object-top border-2 border-accent/30"
              />
            ) : (
              <div className="relative z-10 h-[120px] w-[120px] rounded-full bg-muted border-2 border-accent/30 flex items-center justify-center text-3xl text-muted-foreground">
                {author.name.charAt(0)}
              </div>
            )}
            <span className="absolute bottom-1 right-1 z-20 h-7 w-7 rounded-full bg-accent border-2 border-background flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
          </div>

          <div>
            {author.role_title && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-medium px-3 py-1 uppercase tracking-wider mb-3">
                ✦ {author.role_title}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.1] mb-2">
              {(() => {
                const parts = author.name.split(" ");
                if (parts.length < 2) return author.name;
                return <>{parts.slice(0, -1).join(" ")} <span className="text-accent">{parts.slice(-1)}</span></>;
              })()}
            </h1>
            {author.tagline && (
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-6 leading-relaxed">{author.tagline}</p>
            )}

            {stats.length > 0 && (
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-7">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold tracking-tight leading-none">{s.num}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/ai-visibility-audit" className="inline-flex items-center gap-1.5 rounded-lg bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors">
                Run Free AI Audit <ArrowRight className="h-4 w-4" />
              </Link>
              {author.cta_calendly_url && (
                <a href={author.cta_calendly_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-5 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors">
                  Book a Demo
                </a>
              )}
              <div className="flex gap-2 ml-1">
                {author.linkedin && (
                  <a href={author.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4"><div className="h-px bg-border" /></div>

      <div className="container mx-auto max-w-6xl px-4 py-14 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-[11px] font-medium tracking-widest uppercase text-accent mb-3">About the author</p>
          <div className="h-[3px] w-12 bg-accent rounded mb-5" />
          <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
            {bioParagraphs.length > 0
              ? bioParagraphs.map((p, i) => <p key={i}>{renderInline(p)}</p>)
              : author.bio && <p>{author.bio}</p>}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-7">
              {tags.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent">{t}</span>
              ))}
            </div>
          )}

          {companies.length > 0 && (
            <>
              <p className="text-[11px] font-medium tracking-widest uppercase text-accent mt-10 mb-3">Founded companies</p>
              <div className="h-[3px] w-12 bg-accent rounded mb-5" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companies.map((c) => (
                  <a key={c.name} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    className="rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40">
                    <div className="font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.role}</div>
                  </a>
                ))}
              </div>
            </>
          )}

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
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block rounded-xl border border-border bg-card px-5 py-5 transition-all hover:translate-x-1 hover:border-accent/40">
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

        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-medium mb-4">Author details</p>
            {[
              { Icon: User, label: "Full name", value: author.name },
              author.role_title && { Icon: Briefcase, label: "Role", value: author.role_title },
              author.experience && { Icon: Clock, label: "Experience", value: author.experience },
              author.specialization && { Icon: Star, label: "Specialization", value: author.specialization },
              author.location && { Icon: MapPin, label: "Based in", value: author.location },
            ].filter(Boolean).map((row: any, i, arr) => (
              <div key={row.label} className={`flex items-start gap-3 py-3 text-sm ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                <row.Icon className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">{row.label}</div>
                  <div className="text-foreground/90">{row.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden text-white" style={{ background: "linear-gradient(145deg, hsl(var(--navy)) 0%, hsl(180 30% 14%) 100%)" }}>
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none" style={{ background: "hsl(var(--accent) / 0.25)" }} />
            <div className="relative z-10">
              <p className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">Free tool</p>
              <h3 className="font-display text-lg font-semibold mb-2 leading-snug">Is your brand visible in ChatGPT?</h3>
              <p className="text-sm text-white/70 mb-5">Run a 120-point AI Visibility Audit and find out in minutes. No credit card required.</p>
              <Link to="/ai-visibility-audit" className="block w-full text-center rounded-lg bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium hover:bg-accent/90 transition-colors">
                Run Free Audit →
              </Link>
            </div>
          </div>

          {(author.linkedin || author.twitter || author.cta_calendly_url) && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm font-medium mb-4">Connect with {author.name.split(" ")[0]}</p>
              {[
                author.linkedin && { Icon: Linkedin, label: "LinkedIn", value: author.linkedin.replace(/^https?:\/\//, ""), href: author.linkedin },
                author.twitter && { Icon: Twitter, label: "X / Twitter", value: "@" + author.twitter.replace(/^https?:\/\/(?:www\.)?(?:twitter|x)\.com\//i, "").replace(/\/$/, ""), href: author.twitter },
                author.cta_calendly_url && { Icon: MessageSquare, label: "Book a demo", value: author.cta_calendly_url.replace(/^https?:\/\//, ""), href: author.cta_calendly_url },
              ].filter(Boolean).map((row: any, i, arr) => (
                <div key={row.label} className={`flex items-start gap-3 py-3 text-sm ${i < arr.length - 1 ? "border-b border-border" : ""}`}>
                  <row.Icon className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{row.label}</div>
                    <a href={row.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline inline-flex items-center gap-1 truncate">
                      {row.value} <ArrowUpRight className="h-3 w-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </Layout>
  );
};

export default AuthorProfile;
