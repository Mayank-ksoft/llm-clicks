# Full Content Management System

Today the CMS only controls SEO meta and hero text on pages whose **bodies live in TypeScript files** (`src/data/blogPosts.ts`, `docsArticles.ts`, `knowledgeHub.ts`, `webStories.ts`, `industries.ts`). To edit a post you must touch code. This plan moves all that content into the database, adds full CRUD admin modules, and rebuilds the public pages to render from the DB.

This is a large, multi-step build. I'll ship it in phases so you can review and use each piece as it lands instead of waiting for everything.

## Phase 1 — Database + migration (foundation)

New tables (all with RLS + `service_role` grants, public read for published rows, admin write via `has_role(auth.uid(),'admin')`):

- `authors` — name, slug, bio, avatar, social links
- `categories` — name, slug, type (`blog` | `docs` | `knowledge_hub`), parent_id
- `tags` — name, slug
- `blog_posts` — slug, title, excerpt, **body (markdown)**, hero_image, author_id, category_id, status (`draft`|`published`), published_at, reading_time, seo overrides
- `blog_post_tags` (join)
- `docs_articles` — slug, title, category_id, body, status, published_at, order
- `kb_articles` — slug, title, category_id, body, status, published_at
- `web_stories` — slug, title, poster, pages (JSONB), status, published_at
- `media_assets` — bucket key, url, alt, width, height, uploaded_by (Supabase Storage bucket `cms-media`, public)
- `redirects` — from_path, to_path, status_code (301/302), enabled

Migration scripts will seed these tables from the existing `src/data/*.ts` files so nothing disappears on day one.

## Phase 2 — Admin modules (separate sections per type)

A new left-nav group "Content" with dedicated pages:

- `/admin/blog` — list + search + filter (status, category, author) + create/edit/delete
- `/admin/knowledge-hub`
- `/admin/docs`
- `/admin/web-stories`
- `/admin/industries` (edit-only — fixed set)
- `/admin/media` — upload, browse, alt text
- `/admin/authors`
- `/admin/categories` (per type tabs)
- `/admin/tags`
- `/admin/redirects`

Each list page shows: title, slug, status badge, author, last modified, actions. Bulk actions: publish, unpublish, delete.

Editor screen per content type includes:

- Title, slug (auto + editable), excerpt
- **Markdown editor** with live preview (`@uiw/react-md-editor`)
- Hero image picker (from media library or upload)
- Author, category, tags pickers
- Status (draft/published) + publish date
- SEO panel: meta title, description, canonical, OG image, robots (index/noindex), keywords, JSON-LD schema
- Internal-link helper: search existing pages, insert markdown link
- FAQ block builder (adds FAQPage JSON-LD)
- Save as draft / Publish / Preview

## Phase 3 — Public site rewiring

Replace static-data imports with Supabase queries (React Query):

- `Blog.tsx`, `BlogPost.tsx` → `blog_posts` + `categories` + `authors`
- `Docs.tsx`, `DocsArticle` → `docs_articles`
- `KnowledgeHub*` → `kb_articles`
- `WebStories*` → `web_stories`
- Markdown rendered with `react-markdown` + `remark-gfm` + syntax highlighting
- Breadcrumbs derived from `categories.parent_id`
- Author bio block on posts; category and tag archive pages

## Phase 4 — Sitemap, redirects, build-time SEO

- `scripts/generate-sitemap.ts` → fetch published rows from DB instead of importing TS data
- `scripts/prerender-meta.ts` already DB-backed; extend to inject Article/FAQPage/Breadcrumb JSON-LD
- Add `api/_middleware` (Vercel) or a small Express handler in `server/index.ts` that reads `redirects` table and 301s before the SPA loads
- Auto-rebuild trigger: a "Republish static SEO" button in admin that calls a Vercel deploy hook (you'll paste the hook URL into secrets)

## Phase 5 — Nice-to-haves (after the core ships)

- Revision history per post (auto-snapshot on save)
- Scheduled publishing (cron edge function flips `status` at `published_at`)
- Role: `editor` (can edit, can't delete or manage users)
- Image optimization on upload (resize + webp)
- AI assist: "Generate meta description", "Suggest internal links" via Lovable AI Gateway

## Coverage of your SEO checklist

| Requirement | Phase |
|---|---|
| CRUD blog / KH / docs / web stories | 2 |
| Upload & manage images | 2 (media library) |
| Slugs, meta title/desc, canonical, robots, OG, keywords, JSON-LD | 2 (SEO panel) |
| Internal linking helper | 2 |
| Authors, categories, tags | 2 |
| Redirect (301) management | 2 + 4 |
| Sitemap auto-generation | 4 |
| Breadcrumbs | 3 |
| Drafts / status, last modified, author, search, filter | 2 (list pages) |
| Schema markup (Article, FAQ, Breadcrumb) | 2 + 4 |

## Technical notes

- Storage: a public Supabase bucket `cms-media` for images; private bucket if you later need gated assets.
- Markdown over a WYSIWYG so SEO content stays portable and diffable.
- Body is stored as markdown text, not HTML, to avoid XSS in admin paste and to keep rendering consistent.
- Existing data is migrated, not replaced — your current posts keep their URLs and content.
- All admin writes go through RLS policies keyed on `has_role(auth.uid(),'admin')`; no service-role keys in the browser.

## Suggested rollout order

1. Phase 1 migration + seed (no UI change yet, safe)
2. Phase 2 blog module end-to-end (proves the pattern)
3. Phase 3 blog public rewiring (you can edit a live post)
4. Repeat 2+3 for docs, KH, web stories
5. Media library, authors, categories, tags, redirects
6. Phase 4 sitemap + redirect middleware
7. Phase 5 niceties

## What I need from you to start

1. **Approve this plan** (or tell me to cut/reorder).
2. Confirm I can create a public Supabase Storage bucket `cms-media` for images.
3. Markdown editor OK, or do you want a block/WYSIWYG editor (heavier, slower, more brittle for SEO)?
4. For redirects: are you on Vercel (so I can use middleware), or should the SPA handle it client-side as a fallback?
5. Should drafts be viewable via a tokenised preview URL, or admin-only?

Once you reply, I'll start with Phase 1 (migration + seed) in the next turn.
