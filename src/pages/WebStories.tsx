import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { webStories } from "@/data/webStories";
import { usePageHeroContent } from "@/hooks/usePageHeroContent";

const WebStories = () => {
  const hero = usePageHeroContent({
    title: "Generative SEO & AI Visibility Stories",
    subtitle: "Swipe through our bite-sized strategic teardowns. Learn how to optimize your SaaS for ChatGPT, Gemini, and Perplexity in 15 seconds or less.",
  });
  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-x-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] accent-mesh opacity-30 pointer-events-none -z-10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            {hero.eyebrow && <div className="tag-pill mb-4 mx-auto">{hero.eyebrow}</div>}
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-5">{hero.title}</h1>
            {hero.subtitle && <p className="text-lg text-muted-foreground">{hero.subtitle}</p>}
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {webStories.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/web-stories/${story.slug}`}
                  className="group block relative aspect-[3/5] rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={story.poster}
                    alt={story.posterAlt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center bg-muted group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/30 to-transparent" />

                  {/* Play badge */}
                  <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center border border-border/60">
                    <Play className="h-3.5 w-3.5 text-foreground fill-foreground ml-0.5" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h2 className="font-display text-sm md:text-base font-bold leading-tight text-background">
                      {story.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Stop losing deals to AI blind spots.
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Run a comprehensive audit and uncover your exact citation gaps today.
            </p>
            <Button asChild size="lg">
              <Link to="/ai-visibility-checker">Run Free AI Visibility Audit</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WebStories;
