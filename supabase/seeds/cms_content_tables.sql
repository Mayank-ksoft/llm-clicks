-- ============================================================
-- CMS Content Tables — Phase 1
-- Run via: psql "$DATABASE_URL" -f supabase/seeds/cms_content_tables.sql
-- (or paste into Supabase SQL editor)
--
-- Idempotent: uses CREATE IF NOT EXISTS, DO blocks for enums,
-- and DROP POLICY IF EXISTS before each CREATE POLICY.
-- ============================================================

-- Enums ------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.category_type AS ENUM ('blog','docs','knowledge_hub');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Authors ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  twitter TEXT,
  linkedin TEXT,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.authors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.authors TO authenticated;
GRANT ALL ON public.authors TO service_role;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authors readable by everyone" ON public.authors;
CREATE POLICY "Authors readable by everyone" ON public.authors FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authors writable by admin" ON public.authors;
CREATE POLICY "Authors writable by admin" ON public.authors FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS authors_touch ON public.authors;
CREATE TRIGGER authors_touch BEFORE UPDATE ON public.authors FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Categories -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  type public.category_type NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (type, slug)
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Categories readable by everyone" ON public.categories;
CREATE POLICY "Categories readable by everyone" ON public.categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Categories writable by admin" ON public.categories;
CREATE POLICY "Categories writable by admin" ON public.categories FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS categories_touch ON public.categories;
CREATE TRIGGER categories_touch BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Tags -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tags TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.tags TO authenticated;
GRANT ALL ON public.tags TO service_role;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Tags readable by everyone" ON public.tags;
CREATE POLICY "Tags readable by everyone" ON public.tags FOR SELECT USING (true);
DROP POLICY IF EXISTS "Tags writable by admin" ON public.tags;
CREATE POLICY "Tags writable by admin" ON public.tags FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Blog posts -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body_markdown TEXT,
  body_blocks JSONB,
  hero_image TEXT,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  tag_legacy TEXT,
  reading_time TEXT,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image TEXT,
  robots TEXT,
  keywords TEXT,
  schema_jsonld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published blog posts readable by everyone" ON public.blog_posts;
CREATE POLICY "Published blog posts readable by everyone" ON public.blog_posts FOR SELECT
  USING (status = 'published' OR public.is_admin());
DROP POLICY IF EXISTS "Blog posts writable by admin" ON public.blog_posts;
CREATE POLICY "Blog posts writable by admin" ON public.blog_posts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS blog_posts_touch ON public.blog_posts;
CREATE TRIGGER blog_posts_touch BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts(category_id);

CREATE TABLE IF NOT EXISTS public.blog_post_tags (
  post_id UUID NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
GRANT SELECT ON public.blog_post_tags TO anon, authenticated;
GRANT INSERT, DELETE ON public.blog_post_tags TO authenticated;
GRANT ALL ON public.blog_post_tags TO service_role;
ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Post tags readable by everyone" ON public.blog_post_tags;
CREATE POLICY "Post tags readable by everyone" ON public.blog_post_tags FOR SELECT USING (true);
DROP POLICY IF EXISTS "Post tags writable by admin" ON public.blog_post_tags;
CREATE POLICY "Post tags writable by admin" ON public.blog_post_tags FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Docs articles ----------------------------------------------
CREATE TABLE IF NOT EXISTS public.docs_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  body_markdown TEXT,
  body_blocks JSONB,
  hero_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_label TEXT,
  reading_time TEXT,
  position INT NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image TEXT,
  robots TEXT,
  keywords TEXT,
  schema_jsonld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.docs_articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.docs_articles TO authenticated;
GRANT ALL ON public.docs_articles TO service_role;
ALTER TABLE public.docs_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published docs readable by everyone" ON public.docs_articles;
CREATE POLICY "Published docs readable by everyone" ON public.docs_articles FOR SELECT
  USING (status = 'published' OR public.is_admin());
DROP POLICY IF EXISTS "Docs writable by admin" ON public.docs_articles;
CREATE POLICY "Docs writable by admin" ON public.docs_articles FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS docs_articles_touch ON public.docs_articles;
CREATE TRIGGER docs_articles_touch BEFORE UPDATE ON public.docs_articles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Knowledge Hub articles -------------------------------------
CREATE TABLE IF NOT EXISTS public.kb_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body_markdown TEXT,
  body_blocks JSONB,
  hero_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  category_slug TEXT NOT NULL,
  reading_time TEXT,
  position INT NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  updated_legacy TEXT,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image TEXT,
  robots TEXT,
  keywords TEXT,
  schema_jsonld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_slug, slug)
);
GRANT SELECT ON public.kb_articles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.kb_articles TO authenticated;
GRANT ALL ON public.kb_articles TO service_role;
ALTER TABLE public.kb_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published KB readable by everyone" ON public.kb_articles;
CREATE POLICY "Published KB readable by everyone" ON public.kb_articles FOR SELECT
  USING (status = 'published' OR public.is_admin());
DROP POLICY IF EXISTS "KB writable by admin" ON public.kb_articles;
CREATE POLICY "KB writable by admin" ON public.kb_articles FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS kb_articles_touch ON public.kb_articles;
CREATE TRIGGER kb_articles_touch BEFORE UPDATE ON public.kb_articles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Web Stories ------------------------------------------------
CREATE TABLE IF NOT EXISTS public.web_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  poster TEXT,
  pages JSONB,
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image TEXT,
  robots TEXT,
  keywords TEXT,
  schema_jsonld JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.web_stories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.web_stories TO authenticated;
GRANT ALL ON public.web_stories TO service_role;
ALTER TABLE public.web_stories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Published web stories readable by everyone" ON public.web_stories;
CREATE POLICY "Published web stories readable by everyone" ON public.web_stories FOR SELECT
  USING (status = 'published' OR public.is_admin());
DROP POLICY IF EXISTS "Web stories writable by admin" ON public.web_stories;
CREATE POLICY "Web stories writable by admin" ON public.web_stories FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS web_stories_touch ON public.web_stories;
CREATE TRIGGER web_stories_touch BEFORE UPDATE ON public.web_stories FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Media assets -----------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  alt TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_assets TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Media readable by everyone" ON public.media_assets;
CREATE POLICY "Media readable by everyone" ON public.media_assets FOR SELECT USING (true);
DROP POLICY IF EXISTS "Media writable by admin" ON public.media_assets;
CREATE POLICY "Media writable by admin" ON public.media_assets FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-media', 'cms-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "cms-media public read" ON storage.objects;
CREATE POLICY "cms-media public read" ON storage.objects FOR SELECT
  USING (bucket_id = 'cms-media');
DROP POLICY IF EXISTS "cms-media admin write" ON storage.objects;
CREATE POLICY "cms-media admin write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND public.is_admin());
DROP POLICY IF EXISTS "cms-media admin update" ON storage.objects;
CREATE POLICY "cms-media admin update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND public.is_admin());
DROP POLICY IF EXISTS "cms-media admin delete" ON storage.objects;
CREATE POLICY "cms-media admin delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND public.is_admin());

-- Redirects --------------------------------------------------
CREATE TABLE IF NOT EXISTS public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL UNIQUE,
  to_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308)),
  enabled BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.redirects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Redirects readable by everyone" ON public.redirects;
CREATE POLICY "Redirects readable by everyone" ON public.redirects FOR SELECT USING (true);
DROP POLICY IF EXISTS "Redirects writable by admin" ON public.redirects;
CREATE POLICY "Redirects writable by admin" ON public.redirects FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP TRIGGER IF EXISTS redirects_touch ON public.redirects;
CREATE TRIGGER redirects_touch BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

COMMIT;
