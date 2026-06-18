import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getLegacyRedirect } from "../shared/legacyRedirects";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting — keeps the initial JS bundle small for LCP.
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Comparison = lazy(() => import("./pages/Comparison"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FeaturePage = lazy(() => import("./pages/FeaturePage"));
const FreeToolPage = lazy(() => import("./pages/FreeToolPage"));
const Affiliate = lazy(() => import("./pages/Affiliate"));
const Docs = lazy(() => import("./pages/Docs"));
const IndustryBenchmarks = lazy(() => import("./pages/IndustryBenchmarks"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const KnowledgeHub = lazy(() => import("./pages/KnowledgeHub"));
const KnowledgeHubCategory = lazy(() => import("./pages/KnowledgeHubCategory"));
const KnowledgeHubArticle = lazy(() => import("./pages/KnowledgeHubArticle"));
const WebStories = lazy(() => import("./pages/WebStories"));
const WebStoryViewer = lazy(() => import("./pages/WebStoryViewer"));
const AuthorShripad = lazy(() => import("./pages/AuthorShripad"));
const Industries = lazy(() => import("./pages/Industries"));
const IndustryPage = lazy(() => import("./pages/IndustryPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMenus = lazy(() => import("./pages/admin/AdminMenus"));
const AdminFooter = lazy(() => import("./pages/admin/AdminFooter"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));
const AdminPageDetail = lazy(() => import("./pages/admin/AdminPageDetail"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
import AdminGuard from "./components/admin/AdminGuard";

const queryClient = new QueryClient();

const legacyRedirect = getLegacyRedirect(window.location.pathname, window.location.search);
if (legacyRedirect) {
  window.location.replace(legacyRedirect.destination);
}

const FeatureAt = ({ slug }: { slug: string }) => <FeaturePage forcedSlug={slug} />;
const ToolAt = ({ slug }: { slug: string }) => <FreeToolPage forcedSlug={slug} />;

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin" aria-label="Loading" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />

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
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryPage />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:categorySlug" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/category/:categorySlug" element={<Docs />} />
            <Route path="/docs/:slug" element={<Docs />} />

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

            <Route path="/ai-visibility-checker" element={<ToolAt slug="ai-visibility-checker" />} />
            <Route path="/ai-readiness-analyzer" element={<ToolAt slug="ai-readiness-analyzer" />} />
            <Route path="/ai-domain-profiler" element={<ToolAt slug="ai-domain-profiler" />} />

            <Route path="/features/:slug" element={<FeaturePage />} />
            <Route path="/tools/:slug" element={<FreeToolPage />} />

            <Route path="/author/shripad-deshmukh" element={<AuthorShripad />} />
            <Route path="/author/llmclicks" element={<Navigate to="/author/shripad-deshmukh" replace />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
            <Route path="/admin/menus" element={<AdminGuard><AdminMenus /></AdminGuard>} />
            <Route path="/admin/footer" element={<AdminGuard><AdminFooter /></AdminGuard>} />
            <Route path="/admin/pages" element={<AdminGuard><AdminPages /></AdminGuard>} />
            <Route path="/admin/pages/:id" element={<AdminGuard><AdminPageDetail /></AdminGuard>} />
            <Route path="/admin/blog" element={<AdminGuard><AdminBlog /></AdminGuard>} />
            <Route path="/admin/blog/new" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />
            <Route path="/admin/blog/:id" element={<AdminGuard><AdminBlogEditor /></AdminGuard>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
