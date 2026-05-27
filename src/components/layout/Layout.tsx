import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getCanonicalUrl, getPageMeta } from "@/lib/pageMeta";
import { getPageSchema } from "@/lib/pageSchema";
import { syncRouteHeadTags } from "@/lib/headTags";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // Normalize: strip trailing slash except for root (used for meta/schema lookup).
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  // Canonical URL preserves the trailing slash to match the live site.
  const canonical = getCanonicalUrl(pathname);
  const { title, description } = getPageMeta(normalized);
  const schemaJson = getPageSchema(normalized);

  useEffect(() => {
    syncRouteHeadTags(title, description, canonical);
    const frame = window.requestAnimationFrame(() => {
      syncRouteHeadTags(title, description, canonical);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [title, description, canonical]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet key={normalized}>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {schemaJson && (
          <script type="application/ld+json">{schemaJson}</script>
        )}
      </Helmet>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
