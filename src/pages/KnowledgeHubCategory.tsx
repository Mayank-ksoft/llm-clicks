import Layout from "@/components/layout/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";
import SimplePagination from "@/components/common/SimplePagination";
import { useKnowledgeHubCategory } from "@/lib/cms/publicContent";

const PAGE_SIZE = 8;

const KnowledgeHubCategory = () => {
  const { category } = useParams();
  const cat = useKnowledgeHubCategory(category);
  const [page, setPage] = useState(1);
  if (!cat) return <Navigate to="/knowledge-hub" replace />;

  const totalPages = Math.max(1, Math.ceil(cat.articles.length / PAGE_SIZE));
  const paged = cat.articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link to="/knowledge-hub" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="tag-pill mb-4"><BookOpen className="h-3 w-3" /> KNOWLEDGE HUB</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{cat.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{cat.description}</p>
          </motion.div>

          {cat.articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
              <p className="text-base font-medium mb-1">Articles coming soon</p>
              <p className="text-sm text-muted-foreground">
                We're actively researching and writing in this category. Check back soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                {paged.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/knowledge-hub/${cat.slug}/${a.slug}`}
                    className="rounded-2xl border border-border bg-card overflow-hidden group shimmer-card glow-hover block"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-secondary/40">
                      <img src={a.image} alt={a.imageAlt} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h2 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-colors">{a.title}</h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{a.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {a.readTime}</span>
                        <span className="text-accent font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
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

export default KnowledgeHubCategory;
