import { Suspense, lazy } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";

// Below-the-fold sections are lazy-loaded so the initial JS bundle stays
// small and the hero (LCP candidate) renders as fast as possible.
const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const WhySection = lazy(() => import("@/components/home/WhySection"));
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const MarketplaceSection = lazy(() => import("@/components/home/MarketplaceSection"));
const AudienceSection = lazy(() => import("@/components/home/AudienceSection"));
const FreeToolsSection = lazy(() => import("@/components/home/FreeToolsSection"));
const BetaCTA = lazy(() => import("@/components/home/BetaCTA"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const FinalCTA = lazy(() => import("@/components/home/FinalCTA"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Index = () => (
  <Layout>
    <HeroSection />
    <Suspense fallback={<SectionFallback />}>
      <StatsSection />
      <WhySection />
      <FeaturesSection />
      <MarketplaceSection />
      <AudienceSection />
      <FreeToolsSection />
      <BetaCTA />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </Suspense>
  </Layout>
);

export default Index;
