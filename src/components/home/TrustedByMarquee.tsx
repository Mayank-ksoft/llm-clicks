import { motion } from "framer-motion";

const brands = ["AgencyCo", "MarketFlow", "SEO Labs", "DataBridge", "GrowthPulse", "BrandAI"];

const TrustedByMarquee = () => (
  <motion.div
    className="mt-16 text-center overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
  >
    <p className="text-sm font-medium text-muted-foreground mb-5">Trusted by over 500 companies and agencies</p>
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {[...brands, ...brands, ...brands, ...brands].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display font-bold text-lg text-foreground/30 hover:text-foreground/60 transition-colors mx-8 whitespace-nowrap cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default TrustedByMarquee;
