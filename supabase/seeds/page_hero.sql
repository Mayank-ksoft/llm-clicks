-- Seed admin-editable hero copy (H1 + subtitle + eyebrow tagline) for every
-- public page. Idempotent — re-running overwrites with these defaults.
--
-- Run with:
--   psql "$DATABASE_URL" -f supabase/seeds/page_hero.sql
--
-- Requires migration 20260616120000_page_hero.sql to have applied first.

BEGIN;

WITH src(path, tagline, h1, subtitle) AS (VALUES
  ('/',                                 'AI VISIBILITY',  'Your brand in every AI answer. Perplexity, ChatGPT, Gemini — measured, audited, fixed.', 'Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.'),
  ('/about-us',                         'ABOUT US',       'About LLMClicks.ai and Our Mission to Redefine AI Visibility', 'Helping businesses understand and thrive in the age of AI-powered search.'),
  ('/pricing',                          'PRICING',        'Simple, transparent pricing for every team', 'Start free. Upgrade when you need more queries, brands, or workspaces.'),
  ('/contact',                          'CONTACT',        'Talk to the LLMClicks.ai team',                                  'Questions, demos, partnerships — we usually reply within one business day.'),
  ('/ai-visibility-tool-comparison',    'COMPARISON',     'LLMClicks.ai vs other AI visibility tools',                      'How we compare on tracking, audits, query fan-out, and price.'),
  ('/affiliate-program',                'PARTNERS',       'Earn recurring revenue with the LLMClicks.ai affiliate program', 'Up to 30% recurring commission for every brand you bring on board.'),
  ('/industry-benchmarks',              'BENCHMARKS',     'Industry benchmarks for AI search visibility',                   'See how brands in your category get cited by ChatGPT, Perplexity, Gemini and Claude.'),
  ('/knowledge-hub',                    'KNOWLEDGE HUB',  'Everything you need to win in AI search',                        'Guides, playbooks, and research on AI visibility and generative engine optimization.'),
  ('/web-stories',                      'WEB STORIES',    'Bite-sized GEO teardowns',                                       'Quick visual stories on how brands win and lose in AI search.'),
  ('/industries',                       'INDUSTRIES',     'GEO playbooks by industry',                                      'Vertical-specific strategies to get cited by AI search across your category.'),
  ('/privacy-policy',                   'LEGAL',          'Privacy Policy',                                                 'How LLMClicks.ai collects, uses, and protects your data.'),
  ('/terms',                            'LEGAL',          'Terms of Service',                                               'The terms that govern your use of LLMClicks.ai.'),
  ('/docs',                             'DOCS',           'LLMClicks.ai documentation',                                     'Setup guides, walkthroughs, and best-practice playbooks for every feature.'),
  ('/blog',                             'BLOG',           'Generative SEO and AI search insights',                          'Fresh research and tactics on AI visibility from the LLMClicks.ai team.'),
  ('/ai-visibility-audit',              'AUDIT',          '120-point AI Visibility Audit',                                  'Find why competitors get cited in ChatGPT and Perplexity — and your fix list.'),
  ('/ai-visibility-tracker',            'TRACKER',        'Track LLM mentions and citations over time',                     'Daily Share of Voice across ChatGPT, Perplexity, Google AI, and Copilot.'),
  ('/ai-listicle-marketplace',          'MARKETPLACE',    'Get cited in AI listicles where buyers research',                'Secure third-party placements that LLMs trust and cite.'),
  ('/on-page-optimiser',                'ON-PAGE',        'Optimise pages for AI retrieval',                                'Fix semantic structure, headings, and schema so LLMs read and cite you accurately.'),
  ('/ai-query-mapper',                  'QUERY MAPPER',   'Connect search queries to AI intent',                            'Map what users search to what ChatGPT and Perplexity answer about your brand.'),
  ('/llm-traffic-tracker',              'TRAFFIC',        'See which AI bots crawl your site',                              'Track GPTBot, ClaudeBot, PerplexityBot, and Googlebot per page.'),
  ('/optimization-wizard',              'WIZARD',         'A guided plan to win AI search',                                 'Step-by-step optimization personalized to your domain and category.'),
  ('/query-fan-out-coverage',           'FAN-OUT',        'Cover every sub-query in AI search',                             'Expand any seed query into 10-20 variations and measure citation gaps.'),
  ('/content-comparison',               'CONTENT',        'Benchmark content against AI answers',                           'Identify gaps, topic coverage differences, and clear wins vs competitors.'),
  ('/content-embedding-analyzer',       'EMBEDDINGS',     'Semantic alignment scoring for LLMs',                            'Improve embedding relevance to increase citation probability in RAG answers.'),
  ('/ai-visibility-checker',            'FREE TOOL',      'Free AI Visibility Checker',                                     'Check if your brand appears in ChatGPT, Perplexity, and Google AI answers — in 60 seconds.'),
  ('/ai-readiness-analyzer',            'FREE TOOL',      'Free AI Readiness Analyzer',                                     'Run a 9-point check to see if GPTBot, ClaudeBot, and PerplexityBot can read your site.'),
  ('/ai-domain-profiler',               'FREE TOOL',      'AI Domain Profiler',                                             'See how ChatGPT and Gemini perceive your brand — score, entity graph, and checklist.')
)
INSERT INTO public.page_seo (page_id, tagline, h1, subtitle)
SELECT p.id, s.tagline, s.h1, s.subtitle
FROM src s
JOIN public.pages p ON p.path = s.path
ON CONFLICT (page_id) DO UPDATE
SET tagline = EXCLUDED.tagline,
    h1 = EXCLUDED.h1,
    subtitle = EXCLUDED.subtitle;

COMMIT;
