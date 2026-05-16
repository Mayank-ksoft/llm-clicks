import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Check, DollarSign, Trophy, Clock, BarChart3, ShieldCheck, TrendingUp } from "lucide-react";

const stats = [
  { value: "30%", label: "Max recurring commission per referral, every month" },
  { value: "90 Days", label: "Cookie window on every referral click" },
  { value: "3 Tiers", label: "Bronze, Silver, Gold commission levels" },
  { value: "$0", label: "Cost to join. Always free." },
];

const benefits = [
  { icon: DollarSign, title: "Recurring Commission Up to 30%", desc: "Earn every month your referral stays a customer. Not a one-time bounty — a subscription that renews and pays you again and again." },
  { icon: Trophy, title: "Tiered Rewards System", desc: "Start at Bronze and unlock Silver and Gold as your referrals generate revenue. Higher tiers apply to your entire portfolio, not just new referrals." },
  { icon: Clock, title: "90-Day Cookie Window", desc: "Someone clicks your link today and signs up in 60 days — you still get paid. One of the longest attribution windows in the AI tool category." },
  { icon: BarChart3, title: "Real-Time Dashboard", desc: "Track clicks, conversions, total earned, pending, and available balance in real time. Full visibility into every referral and commission." },
  { icon: ShieldCheck, title: "Low Churn Product", desc: "Once a brand sees what AI is saying about them, they don't cancel. LLMClicks has strong retention because the data creates immediate dependency." },
  { icon: TrendingUp, title: "High-Value Market", desc: "Every SaaS company, agency, and brand manager is a potential referral. AI visibility is the fastest-growing marketing category in 2026." },
];

const tiers = [
  {
    name: "Bronze", rate: "0.2%", level: "Entry level", unlock: "Starts at $0 generated",
    highlight: false,
    features: ["Access to affiliate dashboard", "Unique referral link", "90-day cookie tracking", "Monthly payout reports", "Real-time click tracking"],
  },
  {
    name: "Silver", rate: "15%", level: "Recurring commission", unlock: "Unlock at $24,800 generated",
    highlight: false,
    features: ["Everything in Bronze", "15% recurring commission", "Priority support", "Co-marketing opportunities", "Silver Partner badge"],
  },
  {
    name: "Gold", rate: "30%", level: "Maximum recurring", unlock: "Unlock at $50,000 generated",
    highlight: true,
    features: ["Everything in Silver", "30% recurring commission", "Dedicated partner manager", "Joint webinar opportunities", "Gold Partner badge"],
  },
];

const steps = [
  { title: "Apply", desc: "Sign up from inside your LLMClicks dashboard. Takes under 2 minutes. No approval wait for existing users." },
  { title: "Get Your Link", desc: "Access your unique referral link, share buttons for Twitter, LinkedIn, WhatsApp, and your personal referral code." },
  { title: "Share and Refer", desc: "Drop your link in blog posts, newsletters, social media, client recommendations — anywhere your audience will see it." },
  { title: "Get Paid", desc: "Monthly payouts once you hit the minimum threshold. Track every click, conversion, and commission in real time." },
];

const audience = [
  { title: "SEO Agencies", desc: "Every client needs AI visibility tracking. Refer them and earn monthly commission for as long as they stay.", est: "Est. $50–$300/mo per client" },
  { title: "SEO Bloggers & Creators", desc: "Write about AI visibility, GEO, or LLM tracking. Readers actively researching the topic convert at higher rates.", est: "Compounding income from content" },
  { title: "Consultants & Coaches", desc: "Recommend LLMClicks as part of AI search strategy engagements. The data validates your recommendations every month.", est: "Est. $30–$150/mo per client" },
];

const faqs = [
  { q: "How much can I earn?", a: "There is no ceiling. You earn a percentage of every referral's subscription every month for as long as they stay. At Gold (30%), a single referral on a $499/month plan earns you $149.70 every month. Refer 10 such customers and that is $1,497/month in recurring income." },
  { q: "How long is the cookie window?", a: "90 days. If someone clicks your referral link today and signs up any time within the next 90 days, you receive commission on their subscription. One of the longest attribution windows in the category." },
  { q: "Do I need to be a LLMClicks customer to join?", a: "Not required. The program is open to anyone. That said, affiliates who use LLMClicks convert their audience at higher rates because they can speak from direct experience." },
  { q: "How and when do I get paid?", a: "Monthly payouts once you reach the minimum withdrawal threshold. There is a 30-day hold for refund clearance on new commissions. Available balance is visible at all times in your dashboard." },
  { q: "How do the tiers work?", a: "Start at Bronze. When your referrals generate $24,800 in total revenue, you unlock Silver at 15%. At $50,000, you unlock Gold at 30%. Tier upgrades apply to your entire portfolio of active referrals, not just new ones." },
  { q: "What happens if a referred customer cancels?", a: "You stop earning commission for that customer the month they cancel. Commissions already paid are yours — no clawback. LLMClicks has strong retention, so cancellations are infrequent compared to most SaaS." },
];

const Affiliate = () => (
  <Layout>
    {/* HERO */}
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute inset-0 accent-mesh opacity-50 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="tag-pill mb-4 mx-auto">AFFILIATE PROGRAM · NOW LIVE</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl mx-auto">Refer Brands to LLMClicks. Earn Recurring Revenue.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-7">Every brand in your network needs AI visibility. You get paid every month they stay a customer. No cap. No expiry. Commission that compounds as you grow.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
              <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">Join the Program <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Free to join · No minimum referrals · Monthly payouts</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {stats.map((s, i) => (
            <motion.div key={i} className="rounded-2xl border border-border bg-card p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">{s.value}</div>
              <p className="text-xs md:text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* BENEFITS */}
    <section className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="tag-pill mx-auto mb-3">WHY PARTNER WITH US</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Everything That Makes This Program Worth Joining</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">We built the affiliate program the way we build the product: with the partner's ROI as the primary objective.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div key={i} className="rounded-2xl border border-border bg-card p-6 hover:border-accent/30 transition-colors shimmer-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="h-9 w-9 rounded-lg bg-accent/15 flex items-center justify-center mb-3">
                <b.icon className="h-4 w-4 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* TIERS */}
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="tag-pill mx-auto mb-3">COMMISSION TIERS</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Three Tiers. One Goal: Reward Your Growth.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              className={`rounded-2xl border bg-card p-7 relative ${t.highlight ? "border-accent/60 shadow-lg shadow-accent/10" : "border-border"}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 tag-pill bg-accent text-accent-foreground border-accent">Most Rewarding</div>
              )}
              <h3 className="font-display text-2xl font-bold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.level}</p>
              <div className="mt-4 mb-1 font-display text-5xl font-bold text-accent">{t.rate}</div>
              <p className="text-xs text-muted-foreground mb-5">{t.unlock}</p>
              <ul className="space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* HOW IT WORKS */}
    <section id="how-it-works" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="tag-pill mx-auto mb-3">HOW IT WORKS</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Start Earning in Four Steps</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">From sign-up to first payout in under a week. Built to remove every friction point between you and recurring income.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i} className="rounded-2xl border border-border bg-card p-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-xs font-mono text-accent mb-3">STEP {i + 1}</div>
              <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* AUDIENCE */}
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="tag-pill mx-auto mb-3">WHO SHOULD JOIN</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Built for Anyone With an Audience That Cares About AI Search</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {audience.map((a, i) => (
            <motion.div key={i} className="rounded-2xl border border-border bg-card p-6" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <h3 className="font-display text-lg font-bold mb-2">{a.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.desc}</p>
              <span className="tag-pill">{a.est}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <div className="tag-pill mx-auto mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Common Questions About the Program</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div className="rounded-3xl border border-border bg-card p-10 md:p-14 text-center gradient-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Start Earning Recurring Revenue From Every Referral</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Join the affiliate program now and get your referral link in under two minutes. Free to join · 90-day cookie · Up to 30% recurring commission · Monthly payouts.</p>
          <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 glow-hover" asChild>
            <a href="https://app.llmclicks.ai/signup" target="_blank" rel="noopener noreferrer">Join the Affiliate Program <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Affiliate;
