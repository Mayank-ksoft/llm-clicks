import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageHero } from "@/hooks/usePageHero";

type PageHeroProps = {
  eyebrow?: string;
  defaultTitle: string;
  defaultSubtitle?: string;
  className?: string;
};

/**
 * Admin-controlled hero (H1 + subtitle + eyebrow). Renders CMS values when
 * present, falls back to the defaults passed by the page.
 */
const PageHero = ({ eyebrow, defaultTitle, defaultSubtitle, className }: PageHeroProps) => {
  const { pathname } = useLocation();
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const { data } = usePageHero(normalized);

  const title = (data?.h1 && data.h1.trim()) || defaultTitle;
  const subtitle = (data?.subtitle && data.subtitle.trim()) || defaultSubtitle;
  const tag = (data?.eyebrow && data.eyebrow.trim()) || eyebrow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className ?? "mb-16"}
    >
      {tag && <div className="tag-pill mb-4">{tag}</div>}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] tracking-tight text-balance">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default PageHero;