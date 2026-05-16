import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "What does LLMClicks.ai actually do?", a: "LLMClicks.ai helps you understand how your brand appears inside AI search engines like ChatGPT, Google AI, Perplexity, and Bing. Instead of guessing what these models know about you, the platform shows the exact queries where your brand appears, how often it gets recommended, and what content is influencing your visibility." },
  { q: "How does the AI Visibility Audit work?", a: "The AI Visibility Audit analyzes how LLMs respond to queries related to your brand, competitors, and industry. It checks your appearance rate across hundreds of AI generated responses, evaluates your citations, highlights visibility gaps, and identifies the content that influences AI rankings." },
  { q: "Does LLMClicks track my visibility every day?", a: "Yes. The AI Visibility Tracker monitors your brand visibility on a daily basis and alerts you when your presence increases or drops inside AI generated search results. You can track appearance trends, monitor fluctuations, and compare with competitors." },
  { q: "Which AI platforms do you analyze?", a: "LLMClicks.ai tracks your visibility across the major AI platforms people use for search. This includes ChatGPT, Google AI Overviews, Perplexity, Bing Copilot, and other leading language models." },
  { q: "Do you offer a free trial or demo?", a: "Yes. You can test the platform with a free 14-day trial and see how your brand performs across AI search results. If you prefer a walkthrough, you can also book a demo with our team." },
  { q: "How does LLMClicks help me increase AI citations?", a: "LLMClicks.ai shows you which content pieces, pages, and website signals influence AI models when they decide which brands to recommend. Using insights from the AI Visibility Audit and Tracker, you can identify missing content, strengthen entity associations, and optimize the pages that matter most." },
];

const FAQSection = () => (
  <section className="section-padding">
    <div className="container mx-auto max-w-3xl">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="tag-pill mb-4">FAQ</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">Common questions</h2>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6 data-[state=open]:shadow-sm data-[state=open]:border-accent/20 transition-all">
            <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5 text-base">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
