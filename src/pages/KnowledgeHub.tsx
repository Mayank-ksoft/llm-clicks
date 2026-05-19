import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ArrowRight, Library, Search, Calendar, BookOpen, Bot, Sparkles,
  MessageSquare, Database, TrendingUp, Briefcase, MapPin, Compass, Cog,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { knowledgeHubCategories } from "@/data/knowledgeHub";

const categoryIcons: Record<string, typeof BookOpen> = {
  "chatgpt-seo": MessageSquare,
  "agentic-search-aeo": Bot,
  "ai-overviews": Sparkles,
  "data-and-research": Database,
  "emerging-trends": TrendingUp,
  "geo-for-agencies": Briefcase,
  "local-ai-seo": MapPin,
  "perplexity-seo": Compass,
  "technical-geo": Cog,
};

const KnowledgeHub = () => {
  const [query, setQuery] = useState("");

  // Flat search results across all categories
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: Array<{ category: typeof knowledgeHubCategories[number]; article: typeof knowledgeHubCategories[number]["articles"][number] }> = [];
    knowledgeHubCategories.forEach((c) => {
      c.articles.forEach((a) => {
        if (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q)
        ) {
          results.push({ category: c, article: a });
        }
      });
    });
    return results;
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="tag-pill mb-4 mx-auto"><Library className="h-3 w-3" /> KNOWLEDGE HUB</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">LLMClicks.ai Knowledge Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technical documentation, AI playbooks, and GEO research for SaaS teams.
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
                placeholder="Search the knowledge hub…"
                className="pl-11 h-12 rounded-xl border-border focus-visible:ring-accent/40"
                aria-label="Search the knowledge hub"
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
            {isSearching && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for "{query}"
              </p>
            )}
          </motion.div>

          {/* Search results — flat article list */}
          {isSearching ? (
            searchResults.length === 0 ? (
              <p className="text-center text-muted-foreground py-16">
                No articles match "{query}". Try another keyword.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.map(({ category, article }) => (
                  <Link
                    key={`${category.slug}-${article.slug}`}
                    to={`/knowledge-hub/${category.slug}/${article.slug}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden group shimmer-card glow-hover block"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-secondary/40">
                      <img
                        src={article.image}
                        alt={article.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="tag-pill mb-2">{category.name}</span>
                      <h3 className="font-display font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> {article.date}
                        </span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            // Featured articles + Category cards
            <>
              {/* Platform Playbooks — show all published articles */}
              {(() => {
                const allArticles = knowledgeHubCategories.flatMap((cat) =>
                  cat.articles.map((a) => ({ category: cat, article: a }))
                );
                if (allArticles.length === 0) return null;
                return (
                  <div className="mb-16">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-2">
                      Platform Playbooks (ChatGPT, Perplexity, Gemini)
                    </h2>
                    <p className="text-center text-muted-foreground mb-8">
                      Tactical, step-by-step guides to ranking your brand inside ChatGPT, Perplexity, and Google AI Overviews.
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {allArticles.map(({ category: cat, article: a }) => (
                        <Link
                          key={`${cat.slug}-${a.slug}`}
                          to={`/knowledge-hub/${cat.slug}/${a.slug}`}
                          className="rounded-2xl border border-border bg-card overflow-hidden group shimmer-card glow-hover block"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-secondary/40 relative">
                            <img
                              src={a.image}
                              alt={a.imageAlt}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 tag-pill text-xs">{cat.name}</span>
                          </div>
                          <div className="p-5">
                            <h3 className="font-display font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                              {a.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{a.excerpt}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" /> {a.date}
                              </span>
                              <span>·</span>
                              <span>{a.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })()}

              <h2 className="font-display text-2xl font-bold mb-5">Browse by category</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {knowledgeHubCategories.map((cat, i) => {
                  const Icon = categoryIcons[cat.slug] || BookOpen;
                  const count = cat.articles.length;
                  return (
                    <motion.div
                      key={cat.slug}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={`/knowledge-hub/${cat.slug}`}
                        className="block h-full rounded-2xl border border-border bg-card p-6 hover:border-accent/40 transition-colors shimmer-card group"
                      >
                        <div className="h-10 w-10 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <h3 className="font-display text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cat.description}</p>
                        <span className="text-xs font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                          {count === 0 ? "Coming soon" : `${count} ${count === 1 ? "article" : "articles"}`}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default KnowledgeHub;
