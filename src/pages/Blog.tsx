import Layout from "@/components/layout/Layout";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, Search, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { posts } from "@/data/blogPosts";
import SimplePagination from "@/components/common/SimplePagination";
import { blogCategoryPath, getBlogCategoryBySlug, getBlogCategoryByTag, indexableBlogCategories } from "@/lib/blogCategories";

const PAGE_SIZE = 9;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

const Blog = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams] = useSearchParams();
  const legacyTag = searchParams.get("tag") || "";
  const legacyCategory = getBlogCategoryByTag(legacyTag);
  const activeCategory = categorySlug ? getBlogCategoryBySlug(categorySlug) : undefined;
  const activeTag = activeCategory?.tag || "";
  const redirectTo = legacyCategory
    ? blogCategoryPath(legacyCategory.slug)
    : categorySlug && (!activeCategory || !activeCategory.indexable)
      ? "/404"
      : "";

  // Tag counts
  const tagCounts = useMemo(() => {
    return posts.reduce<Record<string, number>>((acc, p) => {
      if (p.tag) acc[p.tag] = (acc[p.tag] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const tags = useMemo(
    () =>
      indexableBlogCategories
        .map((category) => ({ ...category, count: tagCounts[category.tag] || 0 }))
        .filter((category) => category.count > 0),
    [tagCounts],
  );

  const filteredPosts = useMemo(() => {
    let list = posts;
    if (activeTag) list = list.filter((p) => p.tag === activeTag);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) =>
      [p.title, p.excerpt, p.tag].some((f) => f?.toLowerCase().includes(q)),
    );
  }, [query, activeTag]);

  useEffect(() => { setPage(1); }, [query, activeTag]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const pagedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const showCategoryGrid = !query && !activeTag;

  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="tag-pill mb-4 mx-auto"><BookOpen className="h-3 w-3" /> BLOG</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Generative SEO & AI Insights</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Actionable strategies to dominate LLM search engines. Protect your SaaS pipeline from the zero-click reality.</p>
          </motion.div>

          <div className="max-w-xl mx-auto mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles by title, topic, or tag..."
              className="pl-11 h-12 rounded-full bg-card border-border"
              aria-label="Search blog posts"
            />
          </div>

          {/* Category cards */}
          {showCategoryGrid && (
            <>
              <h2 className="font-display text-2xl font-bold mb-5">Browse by category</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                {tags.map((t, i) => (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      to={blogCategoryPath(t.slug)}
                      className="block h-full rounded-2xl border border-border bg-card p-6 hover:border-accent/40 transition-colors shimmer-card group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                        <Tag className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-display text-lg font-bold mb-1 group-hover:text-accent transition-colors capitalize">
                        {t.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {t.description}
                      </p>
                      <span className="text-xs font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t.count} {t.count === 1 ? "article" : "articles"} <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Active tag header */}
          {activeTag && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Category</p>
                <h2 className="font-display text-2xl font-bold">{activeCategory?.label}</h2>
              </div>
              <Link
                to="/blog"
                className="text-sm text-muted-foreground hover:text-accent inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> All categories
              </Link>
            </div>
          )}

          {!showCategoryGrid && !activeTag && (
            <h2 className="font-display text-2xl font-bold mb-5">Search results</h2>
          )}

          {showCategoryGrid && (
            <h2 className="font-display text-2xl font-bold mb-5">Latest articles</h2>
          )}

          {filteredPosts.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">No articles match your search.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pagedPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="rounded-2xl border border-border bg-card overflow-hidden group cursor-pointer shimmer-card glow-hover block h-full"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-secondary/40 relative">
                        <img src={post.image} alt={post.title} loading="lazy" width={1024} height={640} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="tag-pill absolute top-3 left-3 z-10 backdrop-blur-md bg-background/70">{post.tag}</span>
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-muted-foreground mb-2">{post.date} · {post.readTime}</p>
                        <h3 className="font-display font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                        <span className="text-sm font-medium text-accent flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <SimplePagination page={page} totalPages={totalPages} onPageChange={setPage} className="mt-12" />
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
