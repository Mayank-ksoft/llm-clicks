import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SITE_ORIGIN, getPageMeta } from "@/lib/pageMeta";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // Normalize: strip trailing slash except for root.
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const canonical = `${SITE_ORIGIN}${normalized}`;
  const { title, description } = getPageMeta(normalized);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
