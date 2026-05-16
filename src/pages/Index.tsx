import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import WhySection from "@/components/home/WhySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import MarketplaceSection from "@/components/home/MarketplaceSection";
import AudienceSection from "@/components/home/AudienceSection";
import FreeToolsSection from "@/components/home/FreeToolsSection";
import BetaCTA from "@/components/home/BetaCTA";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => (
  <Layout>
    <HeroSection />
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
  </Layout>
);

export default Index;
