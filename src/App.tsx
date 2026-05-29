import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getLegacyRedirect } from "../shared/legacyRedirects";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Comparison from "./pages/Comparison";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ScrollToTop from "./components/ScrollToTop";
import FeaturePage from "./pages/FeaturePage";
import FreeToolPage from "./pages/FreeToolPage";
import Affiliate from "./pages/Affiliate";
import Docs from "./pages/Docs";
import IndustryBenchmarks from "./pages/IndustryBenchmarks";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ThankYou from "./pages/ThankYou";
import KnowledgeHub from "./pages/KnowledgeHub";
import KnowledgeHubCategory from "./pages/KnowledgeHubCategory";
import KnowledgeHubArticle from "./pages/KnowledgeHubArticle";
import WebStories from "./pages/WebStories";
import WebStoryViewer from "./pages/WebStoryViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const legacyRedirect = getLegacyRedirect(window.location.pathname, window.location.search);
if (legacyRedirect) {
  window.location.replace(legacyRedirect.destination);
}

// Renders FeaturePage / FreeToolPage at a fixed slug (root paths matching the live site).
const FeatureAt = ({ slug }: { slug: string }) => <FeaturePage forcedSlug={slug} />;
const ToolAt = ({ slug }: { slug: string }) => <FreeToolPage forcedSlug={slug} />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Marketing pages (mirror live URL slugs) */}
          <Route path="/about-us" element={<About />} />
          <Route path="/about" element={<Navigate to="/about-us" replace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/knowledge-hub/:category" element={<KnowledgeHubCategory />} />
          <Route path="/knowledge-hub/:category/:slug" element={<KnowledgeHubArticle />} />
          <Route path="/web-stories" element={<WebStories />} />
          <Route path="/web-stories/:slug" element={<WebStoryViewer />} />
          <Route path="/affiliate-program" element={<Affiliate />} />
          <Route path="/ai-visibility-tool-comparison" element={<Comparison />} />
          <Route path="/comparison" element={<Navigate to="/ai-visibility-tool-comparison" replace />} />
          <Route path="/industry-benchmarks" element={<IndustryBenchmarks />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Blog & Docs */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/category/:categorySlug" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/:slug" element={<Docs />} />

          {/* Feature pages — root paths, exact live slugs */}
          <Route path="/ai-visibility-audit" element={<FeatureAt slug="ai-visibility-audit" />} />
          <Route path="/ai-visibility-tracker" element={<FeatureAt slug="ai-visibility-tracker" />} />
          <Route path="/ai-listicle-marketplace" element={<FeatureAt slug="ai-listicle-marketplace" />} />
          <Route path="/on-page-optimiser" element={<FeatureAt slug="on-page-optimizer" />} />
          <Route path="/on-page-optimizer" element={<Navigate to="/on-page-optimiser" replace />} />
          <Route path="/ai-query-mapper" element={<FeatureAt slug="ai-query-mapper" />} />
          <Route path="/llm-traffic-tracker" element={<FeatureAt slug="llm-traffic-tracker" />} />
          <Route path="/optimization-wizard" element={<FeatureAt slug="optimization-wizard" />} />
          <Route path="/query-fan-out-coverage" element={<FeatureAt slug="query-fan-out-coverage" />} />
          <Route path="/content-comparison" element={<FeatureAt slug="content-comparison" />} />
          <Route path="/content-embedding-analyzer" element={<FeatureAt slug="content-embedding-analyzer" />} />

          {/* Free tools — root paths, exact live slugs */}
          <Route path="/ai-visibility-checker" element={<ToolAt slug="ai-visibility-checker" />} />
          <Route path="/ai-readiness-analyzer" element={<ToolAt slug="ai-readiness-analyzer" />} />
          <Route path="/ai-domain-profiler" element={<ToolAt slug="ai-domain-profiler" />} />

          {/* Legacy redirects (keep old internal links working) */}
          <Route path="/features/:slug" element={<FeaturePage />} />
          <Route path="/tools/:slug" element={<FreeToolPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
