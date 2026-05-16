import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { useState } from "react";

type Currency = "USD" | "INR";

const tiers: {
  name: string;
  priceUSD: string;
  strikeUSD: string;
  priceINR: string;
  strikeINR: string;
  spots: string;
  features: string[];
  highlight: boolean;
}[] = [
  {
    name: "Starter Package",
    priceUSD: "$159",
    strikeUSD: "$199",
    priceINR: "₹16,800",
    strikeINR: "₹21,000",
    spots: "0 / 500 spots claimed",
    features: [
      "300 AI visibility checks/month",
      "1 project",
      "50 page audits/month",
      "AI Visibility Tracker",
      "Citation Analysis",
      "Industry Benchmarks",
      "Executive Summary Reports",
    ],
    highlight: false,
  },
  {
    name: "Professional Package",
    priceUSD: "$239",
    strikeUSD: "$299",
    priceINR: "₹24,800",
    strikeINR: "₹31,000",
    spots: "0 / 500 spots claimed",
    features: [
      "700 AI visibility checks/month",
      "10 projects",
      "Unlimited page audits/month",
      "AI Visibility Tracker",
      "Citation Analysis",
      "Industry Benchmarks",
      "Executive Summary Reports",
      "Custom branding",
    ],
    highlight: true,
  },
  {
    name: "Agency Package",
    priceUSD: "$399",
    strikeUSD: "$499",
    priceINR: "₹40,800",
    strikeINR: "₹51,000",
    spots: "0 / 200 spots claimed",
    features: [
      "1,500 AI visibility checks/month",
      "30 projects",
      "Unlimited page audits/month",
      "AI Visibility Tracker",
      "Citation Analysis",
      "Industry Benchmarks",
      "Executive Summary Reports",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <Layout>
      <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
        <div className="absolute inset-0 accent-mesh pointer-events-none opacity-40" />
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <div className="tag-pill mb-4 mx-auto w-fit">LIFETIME DEAL PLANS</div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 max-w-2xl mx-auto">
              Simple AI visibility packages for every team
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Transparent, value-driven pricing built for modern AI workflows. Pay once, use forever.
            </p>
          </motion.div>

          {/* Currency toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full border border-border bg-card p-1">
              {(["USD", "INR"] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-5 py-1.5 text-sm font-medium rounded-full transition-all ${
                    currency === c ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`rounded-2xl p-7 flex flex-col relative ${
                  tier.highlight ? "bg-foreground text-background gradient-border" : "bg-card border border-border"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="font-display text-xl font-bold mb-1">{tier.name}</h3>
                <p className={`text-xs mb-4 ${tier.highlight ? "opacity-60" : "text-muted-foreground"}`}>Pay once, use forever</p>
                <div className="mb-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold">
                    {currency === "USD" ? tier.priceUSD : tier.priceINR}
                  </span>
                  <span className={`text-sm line-through ${tier.highlight ? "opacity-50" : "text-muted-foreground"}`}>
                    {currency === "USD" ? tier.strikeUSD : tier.strikeINR}
                  </span>
                </div>
                <p className={`text-xs mb-6 ${tier.highlight ? "opacity-60" : "text-muted-foreground"}`}>{tier.spots}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                      <span className={tier.highlight ? "opacity-80" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-xl ${
                    tier.highlight
                      ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                  asChild
                >
                  <a href="https://app.llmclicks.ai/lifetime-deal" target="_blank" rel="noopener noreferrer">
                    Get Lifetime Access <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All plans include a free 14-day trial. Cancel anytime.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
