-- CMS: featured-image metadata, Open Graph / Twitter card overrides.
-- Run with: psql $DATABASE_URL -f migrations/0002_cms_image_meta_social_cards.sql

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['blog_posts','docs_articles','kb_articles','web_stories']
  LOOP
    EXECUTE format('ALTER TABLE public.%I
      ADD COLUMN IF NOT EXISTS hero_image_alt TEXT,
      ADD COLUMN IF NOT EXISTS hero_image_title TEXT,
      ADD COLUMN IF NOT EXISTS hero_image_caption TEXT,
      ADD COLUMN IF NOT EXISTS og_title TEXT,
      ADD COLUMN IF NOT EXISTS og_description TEXT,
      ADD COLUMN IF NOT EXISTS twitter_title TEXT,
      ADD COLUMN IF NOT EXISTS twitter_description TEXT,
      ADD COLUMN IF NOT EXISTS twitter_image TEXT', t);
  END LOOP;
END $$;

ALTER TABLE public.web_stories
  ADD COLUMN IF NOT EXISTS poster_alt TEXT,
  ADD COLUMN IF NOT EXISTS poster_title TEXT,
  ADD COLUMN IF NOT EXISTS poster_caption TEXT;