## Task 1 — Editable Author page

**Goal:** turn the hardcoded `/author/shripad-deshmukh/` page into a DB-driven page editable from the admin, seeded with the existing content.

### DB (new migration `supabase/migrations/..._authors_rich_profile.sql`)
Extend `public.authors` with the fields the current page renders:
- `role_title TEXT` (e.g. "Founder & CEO, LLMClicks.ai")
- `tagline TEXT` (short hero tagline under name)
- `long_bio_md TEXT` (multi-paragraph about section, markdown)
- `location TEXT`, `experience TEXT`, `specialization TEXT`
- `expertise_tags TEXT[]`
- `stats JSONB` (`[{num,label}]`)
- `founded_companies JSONB` (`[{name,role,href}]`)
- `cta_calendly_url TEXT`
- `meta_title TEXT`, `meta_description TEXT`, `og_image TEXT`
- `published BOOLEAN DEFAULT true`

Seed row for `slug='shripad-deshmukh'` with exactly the content currently in `AuthorShripad.tsx` (stats, expertise tags, founded companies, 3-paragraph bio, sidebar fields).

Add public `SELECT` policy on authors (it likely already has one — verified during migration).

### Frontend
- Replace `src/pages/AuthorShripad.tsx` with a generic `src/pages/AuthorProfile.tsx` route `/author/:slug` that fetches the row from Supabase and renders the same layout — published-articles section keeps filtering `posts` by `author.name`.
- Keep `/author/shripad-deshmukh` working (route param) and redirect old hardcoded route.
- Add `useAuthor(slug)` hook.

### Admin (`src/pages/admin/AdminAuthors.tsx`)
Replace inline form with a full editor (new `AdminAuthorEditor.tsx` at `/admin/authors/:id`) supporting every new field:
- Name, slug, role title, tagline, location, experience, specialization
- Avatar upload (uses the new Vercel Blob uploader from Task 2)
- Long bio (markdown editor, same `@uiw/react-md-editor` already in project)
- Expertise tags (chip input)
- Stats (repeatable num/label rows)
- Founded companies (repeatable name/role/href rows)
- Socials: twitter, linkedin, website, calendly
- SEO: meta title/description/og image
- Save → upsert; edits immediately reflect on `/author/:slug`.

## Task 2 — Vercel Blob image upload for Featured Image and OG Image

**Goal:** upload/replace/delete images directly from the blog editor (and KB/Docs/Web Stories editors that share the pattern) using Vercel Blob; URL is stored in existing `hero_image` / `og_image` / author `avatar_url` columns.

### Backend (Vercel serverless)
- `npm i @vercel/blob`
- `api/blob-upload.ts` — `POST` multipart/form-data → `put(filename, file, { access: 'public', addRandomSuffix: true })`; returns `{ url }`. Admin-auth-guarded via existing `shared/adminAuth`.
- `api/blob-delete.ts` — `POST { url }` → `del(url)`. Admin-guarded.
- New secret required: `BLOB_READ_WRITE_TOKEN` (added via secrets tool; user pastes from Vercel dashboard → Storage → Blob).

### Frontend
- New reusable `src/components/admin/ImageUploadField.tsx`:
  - Props: `value`, `onChange(url)`, `label`, optional `recommended` text.
  - Renders: label, current preview (if value), "Upload image" button + drag-drop, "Replace" / "Remove" buttons, manual URL input fallback.
  - On upload: POST to `/api/blob-upload`. On save of new url, if previous value was a Blob URL (`*.public.blob.vercel-storage.com`), call `/api/blob-delete` with the old URL. On Remove: delete + clear field.
- Wire into:
  - `AdminBlogEditor.tsx` Featured Image section (replacing the URL-only input — URL input kept as fallback).
  - Same editor's SEO → Open Graph → OG Image field.
  - `AdminDocsEditor.tsx`, `AdminKBEditor.tsx`, `AdminWebStoriesEditor.tsx` (same Featured + OG fields, identical pattern).
  - Author avatar in new author editor.
- Alt / Title / Caption fields stay as-is; the uploader only manages the URL.
- Frontend rendering already reads `hero_image` / `og_image`, so no frontend article-page changes needed — uploaded URL displays automatically.

### Image lifecycle rules
- Replace flow: new upload → save → on success, delete previous Blob URL (only if it was a Blob URL — legacy `/legacy-assets/*` paths are skipped).
- Explicit remove: delete from Blob + clear DB field on save.
- Deleting a post: best-effort delete of its `hero_image` + `og_image` Blob URLs (added to existing delete handlers).

## Files touched
- New: `supabase/migrations/<ts>_authors_rich_profile.sql`, `src/pages/AuthorProfile.tsx`, `src/pages/admin/AdminAuthorEditor.tsx`, `src/components/admin/ImageUploadField.tsx`, `api/blob-upload.ts`, `api/blob-delete.ts`, `src/hooks/useAuthor.ts`.
- Edited: `src/App.tsx` (route), `src/pages/admin/AdminAuthors.tsx` (list-only + link to editor), `AdminBlogEditor.tsx`, `AdminDocsEditor.tsx`, `AdminKBEditor.tsx`, `AdminWebStoriesEditor.tsx`, `src/lib/cms/blogApi.ts` (extend author type).
- Removed: `src/pages/AuthorShripad.tsx` (replaced by generic route).
- Secret: `BLOB_READ_WRITE_TOKEN` (asked once).

## Out of scope (confirm if you want any of these)
- Migrating already-uploaded Supabase Storage media in `AdminMedia` to Vercel Blob.
- Author-level analytics or multi-author drafting workflow.
- Image resizing/optimization pipeline (Blob serves originals).

Reply "go" and I'll implement, or tell me what to adjust (e.g. keep Supabase Storage instead of Vercel Blob, skip docs/KB editors, etc.).
