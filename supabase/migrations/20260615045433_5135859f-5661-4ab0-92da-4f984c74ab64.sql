
-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by self" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Profiles updatable by self" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Pages
CREATE TYPE public.page_section AS ENUM ('features','resources','free_tools','company','legal','none');

CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  section public.page_section NOT NULL DEFAULT 'none',
  parent_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  is_dynamic BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pages TO authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pages readable by everyone" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Pages writable by admin" ON public.pages FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER pages_touch BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.page_seo (
  page_id UUID PRIMARY KEY REFERENCES public.pages(id) ON DELETE CASCADE,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  schema_jsonld JSONB,
  tagline TEXT,
  robots TEXT,
  keywords TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_seo TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.page_seo TO authenticated;
GRANT ALL ON public.page_seo TO service_role;
ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "SEO readable by everyone" ON public.page_seo FOR SELECT USING (true);
CREATE POLICY "SEO writable by admin" ON public.page_seo FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER page_seo_touch BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TYPE public.menu_location AS ENUM (
  'primary_nav','footer_col_1','footer_col_2','footer_col_3','footer_col_4','footer_col_5'
);

CREATE TABLE public.menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location public.menu_location NOT NULL UNIQUE,
  label TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menus TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.menus TO authenticated;
GRANT ALL ON public.menus TO service_role;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menus readable by everyone" ON public.menus FOR SELECT USING (true);
CREATE POLICY "Menus writable by admin" ON public.menus FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  url TEXT,
  page_id UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  icon TEXT,
  description TEXT,
  is_mega_trigger BOOLEAN NOT NULL DEFAULT false,
  is_column_group BOOLEAN NOT NULL DEFAULT false,
  open_in_new_tab BOOLEAN NOT NULL DEFAULT false,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Menu items readable by everyone" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Menu items writable by admin" ON public.menu_items FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER menu_items_touch BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX menu_items_menu_parent_idx ON public.menu_items (menu_id, parent_id, position);

CREATE TABLE public.footer_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  brand_blurb TEXT,
  copyright TEXT,
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.footer_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_settings TO authenticated;
GRANT ALL ON public.footer_settings TO service_role;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Footer readable by everyone" ON public.footer_settings FOR SELECT USING (true);
CREATE POLICY "Footer writable by admin" ON public.footer_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER footer_settings_touch BEFORE UPDATE ON public.footer_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.footer_settings (id, brand_blurb, copyright, social_links) VALUES (
  1,
  'Track, audit, and improve how ChatGPT, Perplexity, Gemini, and Claude represent your brand.',
  '© LLMClicks.ai. All rights reserved.',
  '[{"icon":"Linkedin","href":"https://www.linkedin.com/company/llmclicks-ai/"},{"icon":"Twitter","href":"https://x.com/llmclicksai"},{"icon":"Facebook","href":"https://www.facebook.com/llmclicksai"},{"icon":"Instagram","href":"https://www.instagram.com/llmclicksai/"},{"icon":"Youtube","href":"https://www.youtube.com/@llmclicksai"}]'::jsonb
);

INSERT INTO public.pages (path, title, section) VALUES
  ('/', 'Home', 'none'),
  ('/about-us', 'About Us', 'company'),
  ('/pricing', 'Pricing', 'none'),
  ('/contact', 'Contact', 'company'),
  ('/thank-you', 'Thank You', 'none'),
  ('/knowledge-hub', 'Knowledge Hub', 'resources'),
  ('/web-stories', 'Web Stories', 'resources'),
  ('/affiliate-program', 'Affiliate Program', 'resources'),
  ('/ai-visibility-tool-comparison', 'AI Visibility Tool Comparison', 'resources'),
  ('/industry-benchmarks', 'Industry Benchmarks', 'resources'),
  ('/industries', 'Industries', 'resources'),
  ('/privacy-policy', 'Privacy Policy', 'legal'),
  ('/terms', 'Terms', 'legal'),
  ('/blog', 'Blog', 'resources'),
  ('/docs', 'Docs', 'resources'),
  ('/ai-visibility-audit', 'AI Visibility Audit', 'features'),
  ('/ai-visibility-tracker', 'AI Visibility Tracker', 'features'),
  ('/ai-listicle-marketplace', 'AI Listicle Marketplace', 'features'),
  ('/on-page-optimiser', 'On-Page Optimiser', 'features'),
  ('/ai-query-mapper', 'AI Query Mapper', 'features'),
  ('/llm-traffic-tracker', 'LLM Traffic Tracker', 'features'),
  ('/optimization-wizard', 'Optimization Wizard', 'features'),
  ('/query-fan-out-coverage', 'Query Fan-Out Coverage', 'features'),
  ('/content-comparison', 'Content Comparison', 'features'),
  ('/content-embedding-analyzer', 'Content Embedding Analyzer', 'features'),
  ('/ai-visibility-checker', 'AI Visibility Checker', 'free_tools'),
  ('/ai-readiness-analyzer', 'AI Readiness Analyzer', 'free_tools'),
  ('/ai-domain-profiler', 'AI Domain Profiler', 'free_tools');

UPDATE public.pages SET parent_id = (SELECT id FROM public.pages WHERE path = '/on-page-optimiser')
  WHERE path IN ('/query-fan-out-coverage','/content-comparison','/content-embedding-analyzer');

INSERT INTO public.menus (location, label) VALUES
  ('primary_nav','Primary Navigation'),
  ('footer_col_1','Product'),
  ('footer_col_2','Free Tools'),
  ('footer_col_3','Resources'),
  ('footer_col_4','Company'),
  ('footer_col_5','Legal');
