import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Ortega",
    role: "Agency Founder",
    quote: "With LLMClicks, we finally understood why competitors showed up in ChatGPT answers and fixed it.",
    image: "https://llmclicks.ai/wp-content/uploads/2025/11/james-ortega-llmclicks-review-ai-visibility.webp",
  },
  {
    name: "Lena Chow",
    role: "SEO Manager",
    quote: "The AI Visibility Audit gave us a clear roadmap. We've doubled mentions in Perplexity within a month.",
    image: "https://llmclicks.ai/wp-content/uploads/2025/11/lena-chow-ai-visibility-audit-review.webp",
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-card relative">
    <div className="absolute inset-0 grain-overlay pointer-events-none" />
    <div className="container mx-auto relative z-10">
      <motion.div
        className="mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tag-pill mb-4">TESTIMONIALS</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold max-w-md">What our users say</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto px-12">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={t.name}>
                <motion.div
                  className="rounded-2xl border border-border bg-background p-8 md:p-10 relative shimmer-card glow-hover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Quote className="h-8 w-8 text-accent/20 mb-4" />
                  <p className="text-lg md:text-xl leading-relaxed mb-8 text-foreground">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <motion.img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover border-2 border-accent/20"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <p className="font-display font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-card border-border hover:bg-accent/5 hover:border-accent/20" />
          <CarouselNext className="bg-card border-border hover:bg-accent/5 hover:border-accent/20" />
        </Carousel>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
