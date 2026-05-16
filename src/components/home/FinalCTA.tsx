import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        className="rounded-3xl p-10 md:p-16 lg:p-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, hsl(var(--navy)) 0%, hsl(220 28% 14%) 40%, hsl(180 20% 12%) 100%)",
        }}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient glow blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          style={{ background: "hsl(var(--accent) / 0.12)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
          style={{ background: "hsl(var(--coral) / 0.08)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating dots */}
        <div className="absolute top-12 right-[15%] w-3 h-3 rounded-full bg-accent/40 animate-float" />
        <div className="absolute bottom-20 right-[25%] w-2 h-2 rounded-full bg-coral/25 animate-float-delayed" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-lg">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs text-accent font-medium mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-3 w-3 animate-pulse-glow" /> Free Beta Access
            </motion.div>

            <motion.h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-primary-foreground leading-[1.12]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              See what AI is saying about your brand right now
            </motion.h2>

            <motion.p
              className="text-primary-foreground/60 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Run your first free AI Visibility Audit. No credit card. No setup call. See exactly how ChatGPT, Perplexity, and Gemini represent your brand today.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-8 shadow-lg shadow-accent/25 group"
                asChild
              >
                <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
                  Get started free <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                className="rounded-xl px-8 bg-primary-foreground text-navy hover:bg-primary-foreground/90 font-medium"
                asChild
              >
                <a href="https://calendly.com/shripad" target="_blank" rel="noopener noreferrer">
                  Book a demo
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right side decorative element */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              className="relative w-64 h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
            >
              <div className="absolute inset-0 rounded-full border border-accent/10 animate-spin-slow" />
              <div className="absolute inset-6 rounded-full border border-accent/15 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "25s" }} />
              <div className="absolute inset-12 rounded-full border border-accent/20 animate-spin-slow" style={{ animationDuration: "35s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/15 backdrop-blur-sm flex items-center justify-center border border-accent/20">
                  <Sparkles className="h-7 w-7 text-accent animate-pulse-glow" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
