import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYou = () => (
  <Layout>
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 accent-mesh opacity-40 pointer-events-none" />
      <div className="absolute top-20 left-10 w-3 h-3 rounded-full bg-accent/30 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-2 h-2 rounded-full bg-accent/20 animate-float pointer-events-none" />

      <div className="container mx-auto max-w-2xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 ring-8 ring-accent/5"
        >
          <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={2.5} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="tag-pill mb-4 mx-auto"><MessageSquare className="h-3 w-3" /> MESSAGE RECEIVED</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">Thank you!</h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10">
            We've received your message and one of our team will get back to you within one business day. In the meantime, feel free to explore the platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-6 shadow-lg shadow-accent/20 group">
            <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">
              Start your free trial <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-xl px-6 border-border hover:bg-accent/5 hover:border-accent/30 hover:text-accent">
            <Link to="/"><Home className="mr-1.5 h-4 w-4" /> Back to homepage</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid sm:grid-cols-3 gap-3 text-sm"
        >
          {[
            { label: "Read the blog", to: "/blog" },
            { label: "Browse docs", to: "/docs" },
            { label: "See pricing", to: "/pricing" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="rounded-xl border border-border bg-card p-4 hover:border-accent/30 hover:text-accent transition-colors">
              {l.label} <ArrowRight className="inline h-3.5 w-3.5 ml-1" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default ThankYou;
