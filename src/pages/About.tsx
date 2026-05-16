import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Lightbulb, Users, Heart, Linkedin, Facebook, Twitter, Award, Building2, Clock } from "lucide-react";
import founderImg from "@/assets/founder-shripad.webp";

const About = () => {
  useEffect(() => {
    document.title = "About LLMClicks.ai | Our Mission to Improve AI Visibility";
    
    const metaTags: Record<string, string> = {
      "description": "We help brands appear in AI search results. LLMClicks.ai is trusted by agencies and marketers to track, analyze, and boost visibility across ChatGPT and beyond.",
      "og:locale": "en_US",
      "og:type": "article",
      "og:title": "About LLMClicks.ai | Our Mission to Improve AI Visibility",
      "og:description": "We help brands appear in AI search results. LLMClicks.ai is trusted by agencies and marketers to track, analyze, and boost visibility across ChatGPT and beyond.",
      "og:url": "https://llmclicks.ai/about-us/",
      "og:image": "https://llmclicks.ai/wp-content/uploads/2025/08/llmclicks-favicon.webp",
      "og:image:width": "500",
      "og:image:height": "500",
      "og:image:type": "image/webp",
      "article:publisher": "https://www.facebook.com/llmclicksai",
      "article:modified_time": "2026-01-05T08:43:40+00:00",
      "twitter:card": "summary_large_image",
      "twitter:title": "About LLMClicks.ai | Our Mission to Improve AI Visibility",
      "twitter:description": "We help brands appear in AI search results. LLMClicks.ai is trusted by agencies and marketers to track, analyze, and boost visibility across ChatGPT and beyond.",
      "twitter:image": "https://llmclicks.ai/wp-content/uploads/2025/08/llmclicks-favicon.webp",
      "twitter:label1": "Est. reading time",
      "twitter:data1": "3 minutes",
    };

    const elements: HTMLMetaElement[] = [];
    Object.entries(metaTags).forEach(([key, value]) => {
      const isOgOrArticle = key.startsWith("og:") || key.startsWith("article:");
      const attr = isOgOrArticle ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        elements.push(el);
      }
      el.setAttribute("content", value);
    });

    // Set canonical
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://llmclicks.ai/about-us/");

    // JSON-LD
    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.text = JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"https://llmclicks.ai/about-us/","url":"https://llmclicks.ai/about-us/","name":"About LLMClicks.ai | Our Mission to Improve AI Visibility","isPartOf":{"@id":"https://llmclicks.ai/#website"},"primaryImageOfPage":{"@id":"https://llmclicks.ai/about-us/#primaryimage"},"image":{"@id":"https://llmclicks.ai/about-us/#primaryimage"},"thumbnailUrl":"https://llmclicks.ai/wp-content/uploads/2025/09/LLM_logo-removebg-preview.png","datePublished":"2025-09-03T03:50:33+00:00","dateModified":"2026-01-05T08:43:40+00:00","description":"We help brands appear in AI search results. LLMClicks.ai is trusted by agencies and marketers to track, analyze, and boost visibility across ChatGPT and beyond.","breadcrumb":{"@id":"https://llmclicks.ai/about-us/#breadcrumb"},"inLanguage":"en-US","potentialAction":[{"@type":"ReadAction","target":["https://llmclicks.ai/about-us/"]}]},{"@type":"ImageObject","inLanguage":"en-US","@id":"https://llmclicks.ai/about-us/#primaryimage","url":"https://llmclicks.ai/wp-content/uploads/2025/09/LLM_logo-removebg-preview.png","contentUrl":"https://llmclicks.ai/wp-content/uploads/2025/09/LLM_logo-removebg-preview.png","width":231,"height":77,"caption":"LLMClicks.ai Logo"},{"@type":"BreadcrumbList","@id":"https://llmclicks.ai/about-us/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://llmclicks.ai/"},{"@type":"ListItem","position":2,"name":"About Us"}]},{"@type":"WebSite","@id":"https://llmclicks.ai/#website","url":"https://llmclicks.ai/","name":"LLMClicks.ai","description":"","publisher":{"@id":"https://llmclicks.ai/#organization"},"potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://llmclicks.ai/?s={search_term_string}"},"query-input":{"@type":"PropertyValueSpecification","valueRequired":true,"valueName":"search_term_string"}}],"inLanguage":"en-US"},{"@type":"Organization","@id":"https://llmclicks.ai/#organization","name":"LLMClicks.ai","url":"https://llmclicks.ai/","logo":{"@type":"ImageObject","inLanguage":"en-US","@id":"https://llmclicks.ai/#/schema/logo/image/","url":"https://llmclicks.ai/wp-content/uploads/2025/08/llmclicks-favicon.webp","contentUrl":"https://llmclicks.ai/wp-content/uploads/2025/08/llmclicks-favicon.webp","width":500,"height":500,"caption":"LLMClicks.ai"},"image":{"@id":"https://llmclicks.ai/#/schema/logo/image/"},"sameAs":["https://www.facebook.com/llmclicksai","https://www.linkedin.com/company/llmclicks-ai/?viewAsMember=true"]}]});
    document.head.appendChild(jsonLd);

    return () => {
      elements.forEach(el => el.remove());
      jsonLd.remove();
      if (createdCanonical && canonical) canonical.remove();
    };
  }, []);

  return (
  <Layout>
    <section className="section-padding pt-28 md:pt-36 relative overflow-hidden">
      <div className="absolute inset-0 accent-mesh pointer-events-none opacity-50" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="tag-pill mb-4">ABOUT US</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] tracking-tight text-balance">About LLMClicks.ai and Our Mission to Redefine AI Visibility</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Helping businesses understand and thrive in the age of AI-powered search.
          </p>
        </motion.div>

        <motion.div className="rounded-2xl border border-border bg-card p-8 mb-10 gradient-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-2"><Heart className="h-5 w-5 text-coral" /> Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            At LLMClicks.ai, we help brands, agencies, and marketers understand, track, and optimize their presence across AI-powered search engines. With the rapid rise of platforms like ChatGPT, Gemini, Perplexity, and Claude, the way people search and discover information is shifting—and so should your strategy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Target, title: "Mission", desc: "To help every business gain visibility in AI-powered search.", color: "bg-accent/10 text-accent" },
            { icon: Lightbulb, title: "Vision", desc: "To redefine how businesses are discovered in the age of AI-driven search.", color: "bg-coral/10 text-coral" },
            { icon: Users, title: "Team", desc: "A passionate team of SEO experts, AI researchers, and product engineers.", color: "bg-teal/10 text-teal" },
          ].map((item, i) => (
            <motion.div key={item.title} className="rounded-2xl border border-border bg-card p-7 text-center hover:border-accent/20 transition-all" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className={`mx-auto mb-4 h-12 w-12 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder Section */}
        <motion.div
          className="rounded-2xl border border-border bg-card overflow-hidden gradient-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 pb-4">
            <div className="tag-pill mb-4">MEET OUR FOUNDER</div>
          </div>
          <div className="grid md:grid-cols-5 gap-6 px-8 pb-8">
            {/* Photo */}
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <motion.div
                className="relative w-48 h-48 md:w-full md:h-64 rounded-2xl overflow-hidden border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={founderImg}
                  alt="Shripad Deshmukh, Founder of LLMClicks.ai"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Bio */}
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl font-bold mb-1">Shripad Deshmukh</h3>
              <p className="text-sm text-accent font-medium mb-4">Founder, LLMClicks.ai</p>

              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
                <p>
                  Shripad Deshmukh created LLMClicks.ai because he saw something most people missed. Brands were doing everything to rank on Google, yet they had no idea how AI systems interpreted them. Businesses were becoming invisible in the places people now go for answers.
                </p>
                <p>
                  He has spent more than fifteen years building SEO and SaaS products that solve real problems for agencies and local businesses. He founded four companies, led large teams, and built platforms like GMB Briefcase, Agency Simplifier, and Citation Builder Pro.
                </p>
                <p>
                  AI search is changing how people discover businesses. Shripad built LLMClicks.ai to give companies a clear picture of how these systems talk about them. No mystery. No guesswork. Just visibility that helps good brands get seen.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { icon: Clock, label: "15+ Years", sub: "SEO, SaaS & digital growth" },
                  { icon: Building2, label: "4 Companies", sub: "Founded from scratch" },
                  { icon: Award, label: "Trusted Platforms", sub: "GMB Briefcase, Citation Builder Pro" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-background/50 p-3 text-center">
                    <stat.icon className="h-4 w-4 text-accent mx-auto mb-1.5" />
                    <p className="text-xs font-bold">{stat.label}</p>
                    <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex items-center gap-2">
                {[
                  { icon: Linkedin, href: "https://in.linkedin.com/in/shripaddeshmukh" },
                  { icon: Facebook, href: "https://www.facebook.com/deshmukhsc/" },
                  { icon: Twitter, href: "https://x.com/shripadde" },
                ].map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
  );
};

export default About;
