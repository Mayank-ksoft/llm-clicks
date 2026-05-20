import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SITE_ORIGIN = "https://llmclicks.ai";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  // Normalize: strip trailing slash except for root.
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  const canonical = `${SITE_ORIGIN}${normalized}`;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
