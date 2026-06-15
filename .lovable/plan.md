# CMS completion plan

## What already works (verified by reading code)

- `pages`, `page_seo`, `menus`, `menu_items`, `footer_settings`, `user_roles` + `has_role()` schema is in place (migrations were created earlier).
- `/admin/login` shows **Signup** when no admin row exists, else **Login** (via `admin-bootstrap-status` edge fn).
- `AdminGuard` checks `user_roles.role='admin'` and redirects otherwise.
- Admin pages already exist for **Dashboard / Menus / Footer / Pages / Page detail**.
- Menus admin has **drag-and-drop** (`@dnd-kit`), **parent/child nesting**, **`is_mega_trigger`** + **`is_column_group`** flags, per-location selector (Primary Nav + 5 footer columns).
- Footer admin edits brand blurb / socials / copyright; the 5 column link lists are managed under Menus.
- Pages admin lists every seeded page, edit screen lets you pick **Section** (features / resources / free_tools / company / legal / none) and **Parent page**, plus full SEO (meta title/desc, canonical, OG, JSON-LD schema, tagline, robots, keywords).
- `<CmsSeoOverride />` reads `page_seo` per pathname and overrides head via `react-helmet-async` — frontend reflects admin edits.
- `Navbar.tsx` still uses hardcoded arrays (not CMS-driven). `Footer.tsx` IS CMS-driven (reads `useCmsMenu` + falls back to hardcoded if empty).

## Gaps to close (this iteration)

### 1. Credential placeholders for the new Supabase project
- Update `supabase/config.toml` `project_id` to a `__YOUR_PROJECT_REF__` placeholder with a TODO comment.
- Update `.env.example` (create if missing) with `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`.
- Leave `src/integrations/supabase/client.ts` alone — it already reads from `import.meta.env`. Document in `.env.example` exactly where to paste keys.
- Note: the runtime CSP error (`rlbriopbtyymmwitkunu.supabase.co`) comes from a stale `.env` baked into the deployed bundle and a CSP that doesn't whitelist it. After you paste the new keys and rebuild, the CSP also needs to be widened. I'll update CSP in `index.html` / `vercel.json` (whichever ships it) to allow the new Supabase host once you give me the URL. For now I'll switch CSP to allow `https://*.supabase.co` so any Supabase project works.

### 2. Custom admin auth APIs (don't call `supabase.auth.*` from the client)
Two new edge functions + rewrite of `AdminLogin.tsx`:
- **`admin-signup`** (`POST {email,password,full_name}`): rejects if any admin exists; calls `admin.auth.admin.createUser` (service role) with `email_confirm: true`; inserts `user_roles(user_id,'admin')`; returns `{ session }` by calling `admin.auth.admin.generateLink('magiclink')` or simply issuing a password-grant via Supabase auth REST. Cleanest path: after createUser, call the GoTrue `/token?grant_type=password` endpoint server-side and return the access/refresh tokens.
- **`admin-login`** (`POST {email,password}`): verifies the user has `role='admin'` in `user_roles`; if yes, hits GoTrue `/token?grant_type=password` server-side and returns `{ access_token, refresh_token, user }`. If not admin, 403.
- Client (`AdminLogin.tsx`): no more `supabase.auth.signUp/signInWithPassword`. POSTs to these functions, then calls `supabase.auth.setSession({ access_token, refresh_token })` to hydrate the JS client so RLS-backed queries (`from('user_roles')`, etc.) work in the admin UI.
- Keep `admin-bootstrap-status` as the gate that decides Signup-vs-Login screen.
- Delete `admin-bootstrap` (folded into `admin-signup`).
- Input validation with `zod` on both functions; CORS headers; clear 400/401/403/409 errors.

### 3. SQL seed file for current page SEO (you paste into SQL editor)
- New file `supabase/seeds/page_seo.sql` — for every route in `App.tsx`, upserts a `pages` row (path/title/section) and a `page_seo` row populated from the values currently hardcoded in each page component (`shared/pageMeta.json` + per-page Helmet tags). One transaction, idempotent (uses `ON CONFLICT (path) DO UPDATE` on pages and `ON CONFLICT (page_id) DO UPDATE` on `page_seo`).
- Adds the corresponding unique constraints if missing (small migration: `supabase/migrations/<ts>_seo_seed_constraints.sql` adding `unique(page_id)` on `page_seo`).
- I'll source titles/descriptions from `shared/pageMeta.json` so the seed matches what's live today.

### 4. Small fixes / polish
- `AdminLayout` sidebar: add a top "View site" link.
- Page detail save toast: full reload hint already there; also call `qc.invalidateQueries({ queryKey: ["page-seo", path] })` with the actual path so other tabs update without a refresh.
- Pages list: group rows by section for readability.
- Navbar refactor to CMS-driven is **out of scope** for this iteration (would risk regressions on the marketing site). I'll log it as a TODO. Footer is already CMS-driven.

## Files touched

- `supabase/config.toml` — placeholder project_id + comment.
- `.env.example` (new) — keys with comments.
- `index.html` and/or `vercel.json` — CSP `connect-src` widened to `https://*.supabase.co` and `https://*.functions.supabase.co`.
- `supabase/functions/admin-signup/index.ts` (new), `admin-login/index.ts` (new).
- `supabase/functions/admin-bootstrap/` — delete.
- `src/pages/admin/AdminLogin.tsx` — switch to fetch calls + `setSession`.
- `supabase/seeds/page_seo.sql` (new).
- `supabase/migrations/<ts>_page_seo_unique.sql` (new) — small constraint add.
- `src/pages/admin/AdminPages.tsx` — section grouping.
- `src/components/admin/AdminLayout.tsx` — "View site" link.

## Out of scope (per your message)

- Editing page body content (only metadata + SEO).
- Refactoring `Navbar.tsx` to render from CMS (the data + admin UI already exist; the swap can come next).
- Public end-user auth.

## What I need from you afterwards

- The new Supabase URL + publishable (anon) key → paste into `.env` (or tell me and I'll set them).
- Then run `supabase/seeds/page_seo.sql` in the SQL editor to backfill SEO.
- First visit to `/admin/login` will show the Signup form to create the admin.

Reply **"go"** and I'll implement steps 1-4.
