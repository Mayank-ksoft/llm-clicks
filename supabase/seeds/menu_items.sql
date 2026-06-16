-- Seed menu_items for primary_nav and footer columns.
-- Safe to re-run: clears menu_items before inserting.
-- Requires migration 20260615045433_*.sql (menus + pages seeded).
--
-- Primary nav structure matches screenshot:
--   Home | About | Features (mega: Platform | Free Tools | On-Page Optimiser)
--        | Resources (dropdown) | Pricing | Comparison | Contact

BEGIN;

DELETE FROM public.menu_items;

-- ============================================================
-- PRIMARY NAV (top-level)
-- ============================================================
WITH m AS (SELECT id FROM public.menus WHERE location = 'primary_nav')
INSERT INTO public.menu_items (menu_id, label, url, position, is_mega_trigger)
SELECT m.id, v.label, v.url, v.pos, v.mega
FROM m, (VALUES
  ('Home',       '/',                              0, false),
  ('About',      '/about-us',                      1, false),
  ('Features',   NULL,                             2, true),
  ('Resources',  NULL,                             3, false),
  ('Pricing',    '/pricing',                       4, false),
  ('Comparison', '/ai-visibility-tool-comparison', 5, false),
  ('Contact',    '/contact',                       6, false)
) AS v(label, url, pos, mega);

-- ============================================================
-- FEATURES MEGA — 3 column groups
-- ============================================================
WITH parent AS (
  SELECT mi.id, mi.menu_id FROM public.menu_items mi
  JOIN public.menus m ON m.id = mi.menu_id
  WHERE m.location = 'primary_nav' AND mi.label = 'Features'
)
INSERT INTO public.menu_items (menu_id, parent_id, label, url, position, is_column_group)
SELECT parent.menu_id, parent.id, v.label, NULL, v.pos, true
FROM parent, (VALUES
  ('Platform',          0),
  ('Free Tools',        1),
  ('On-Page Optimiser', 2)
) AS v(label, pos);

-- Platform leaves
WITH grp AS (
  SELECT mi.id, mi.menu_id FROM public.menu_items mi
  JOIN public.menus m ON m.id = mi.menu_id
  WHERE m.location = 'primary_nav' AND mi.label = 'Platform' AND mi.is_column_group = true
)
INSERT INTO public.menu_items (menu_id, parent_id, label, url, icon, description, position)
SELECT grp.menu_id, grp.id, v.label, v.url, v.icon, v.descr, v.pos
FROM grp, (VALUES
  ('AI Visibility Audit',     '/ai-visibility-audit',     'Eye',        'Comprehensive AI presence analysis',   0),
  ('AI Visibility Tracker',   '/ai-visibility-tracker',   'BarChart3',  'Track brand mentions over time',       1),
  ('AI Listicle Marketplace', '/ai-listicle-marketplace', 'ShoppingBag','Buy placements in AI-cited listicles', 2),
  ('On-Page Optimiser',       '/on-page-optimiser',       'FileText',   'AI-friendly content optimization',     3),
  ('AI Query Mapper',         '/ai-query-mapper',         'Compass',    'Map queries to brand responses',       4),
  ('LLM Traffic Tracker',     '/llm-traffic-tracker',     'Activity',   'Monitor AI-driven traffic',            5),
  ('Optimization Wizard',     '/optimization-wizard',     'Wand2',      'Guided optimization workflows',        6)
) AS v(label, url, icon, descr, pos);

-- Free Tools column leaves
WITH grp AS (
  SELECT mi.id, mi.menu_id FROM public.menu_items mi
  JOIN public.menus m ON m.id = mi.menu_id
  WHERE m.location = 'primary_nav' AND mi.label = 'Free Tools' AND mi.is_column_group = true
)
INSERT INTO public.menu_items (menu_id, parent_id, label, url, icon, description, position)
SELECT grp.menu_id, grp.id, v.label, v.url, v.icon, v.descr, v.pos
FROM grp, (VALUES
  ('AI Visibility Checker', '/ai-visibility-checker', 'Search', 'Quick AI visibility check',          0),
  ('AI Readiness Analyzer', '/ai-readiness-analyzer', 'Zap',    'Check your AI readiness score',      1),
  ('AI Domain Profiler',    '/ai-domain-profiler',    'Globe',  'Profile your domain''s AI presence', 2)
) AS v(label, url, icon, descr, pos);

-- On-Page Optimiser column leaves
WITH grp AS (
  SELECT mi.id, mi.menu_id FROM public.menu_items mi
  JOIN public.menus m ON m.id = mi.menu_id
  WHERE m.location = 'primary_nav' AND mi.label = 'On-Page Optimiser' AND mi.is_column_group = true
)
INSERT INTO public.menu_items (menu_id, parent_id, label, url, description, position)
SELECT grp.menu_id, grp.id, v.label, v.url, v.descr, v.pos
FROM grp, (VALUES
  ('Query Fan-Out Coverage',     '/query-fan-out-coverage',     'Cover all sub-queries',      0),
  ('Content Comparison',         '/content-comparison',         'Benchmark vs competitors',   1),
  ('Content Embedding Analyzer', '/content-embedding-analyzer', 'Semantic alignment scoring', 2)
) AS v(label, url, descr, pos);

-- ============================================================
-- RESOURCES dropdown
-- ============================================================
WITH parent AS (
  SELECT mi.id, mi.menu_id FROM public.menu_items mi
  JOIN public.menus m ON m.id = mi.menu_id
  WHERE m.location = 'primary_nav' AND mi.label = 'Resources'
)
INSERT INTO public.menu_items (menu_id, parent_id, label, url, icon, description, position)
SELECT parent.menu_id, parent.id, v.label, v.url, v.icon, v.descr, v.pos
FROM parent, (VALUES
  ('Knowledge Hub',       '/knowledge-hub',       'Library',    'All resources in one place',    0),
  ('Blog',                '/blog',                'BookOpen',   'Generative SEO & AI insights',  1),
  ('Web Stories',         '/web-stories',         'PlayCircle', 'Bite-sized GEO teardowns',      2),
  ('Docs',                '/docs',                'LifeBuoy',   'Setup guides and tutorials',    3),
  ('Industry Benchmarks', '/industry-benchmarks', 'BarChart3',  'How your category ranks in AI', 4),
  ('Industry Solutions',  '/industries',          'Building2',  'GEO playbooks by vertical',     5),
  ('Affiliate Program',   '/affiliate-program',   'DollarSign', 'Earn up to 30% recurring',      6)
) AS v(label, url, icon, descr, pos);

-- ============================================================
-- FOOTER COLUMNS
-- ============================================================
WITH m AS (SELECT id FROM public.menus WHERE location = 'footer_col_1')
INSERT INTO public.menu_items (menu_id, label, url, position)
SELECT m.id, v.label, v.url, v.pos FROM m, (VALUES
  ('AI Visibility Audit',     '/ai-visibility-audit',     0),
  ('AI Visibility Tracker',   '/ai-visibility-tracker',   1),
  ('AI Listicle Marketplace', '/ai-listicle-marketplace', 2),
  ('On-Page Optimiser',       '/on-page-optimiser',       3),
  ('AI Query Mapper',         '/ai-query-mapper',         4),
  ('LLM Traffic Tracker',     '/llm-traffic-tracker',     5),
  ('Optimization Wizard',     '/optimization-wizard',     6),
  ('Pricing',                 '/pricing',                 7)
) AS v(label, url, pos);

WITH m AS (SELECT id FROM public.menus WHERE location = 'footer_col_2')
INSERT INTO public.menu_items (menu_id, label, url, position)
SELECT m.id, v.label, v.url, v.pos FROM m, (VALUES
  ('AI Visibility Checker', '/ai-visibility-checker', 0),
  ('AI Readiness Analyzer', '/ai-readiness-analyzer', 1),
  ('AI Domain Profiler',    '/ai-domain-profiler',    2)
) AS v(label, url, pos);

WITH m AS (SELECT id FROM public.menus WHERE location = 'footer_col_3')
INSERT INTO public.menu_items (menu_id, label, url, position)
SELECT m.id, v.label, v.url, v.pos FROM m, (VALUES
  ('Knowledge Hub',       '/knowledge-hub',                 0),
  ('Blog',                '/blog',                          1),
  ('Docs',                '/docs',                          2),
  ('Web Stories',         '/web-stories',                   3),
  ('Industry Benchmarks', '/industry-benchmarks',           4),
  ('Industries',          '/industries',                    5),
  ('Comparison',          '/ai-visibility-tool-comparison', 6)
) AS v(label, url, pos);

WITH m AS (SELECT id FROM public.menus WHERE location = 'footer_col_4')
INSERT INTO public.menu_items (menu_id, label, url, position)
SELECT m.id, v.label, v.url, v.pos FROM m, (VALUES
  ('About Us',          '/about-us',          0),
  ('Contact',           '/contact',           1),
  ('Affiliate Program', '/affiliate-program', 2)
) AS v(label, url, pos);

WITH m AS (SELECT id FROM public.menus WHERE location = 'footer_col_5')
INSERT INTO public.menu_items (menu_id, label, url, position)
SELECT m.id, v.label, v.url, v.pos FROM m, (VALUES
  ('Privacy Policy', '/privacy-policy', 0),
  ('Terms',          '/terms',          1)
) AS v(label, url, pos);

COMMIT;
