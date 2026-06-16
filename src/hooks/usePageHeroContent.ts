import { useLocation } from "react-router-dom";
import { usePageHero } from "@/hooks/usePageHero";

type HeroDefaults = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

/**
 * Returns hero copy (title/subtitle/eyebrow) for the current route.
 * Overrides hardcoded defaults with admin-edited CMS values when available.
 * Lets pages keep their existing layout/styling — only the strings change.
 */
export function usePageHeroContent(defaults: HeroDefaults) {
  const { pathname } = useLocation();
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const { data } = usePageHero(normalized);
  return {
    title: (data?.h1 && data.h1.trim()) || defaults.title,
    subtitle: (data?.subtitle && data.subtitle.trim()) || defaults.subtitle,
    eyebrow: (data?.eyebrow && data.eyebrow.trim()) || defaults.eyebrow,
  };
}