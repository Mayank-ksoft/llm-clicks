
## Goal

Build a WordPress-style CMS for this site (LLMClicks marketing site) covering: admin auth (first-run signup → login afterwards), menu management (parent/child + mega menu, drag-and-drop), footer widget management (5 columns), pages list with parent assignment, and per-page SEO management — all reflected live on the front end.

## Prerequisite

Enable **Lovable Cloud** (Supabase under the hood) — needed for admin auth, role storage, and CMS tables. Currently the project has no backend.

## Database schema (new migration)

1. `profiles` — id (FK auth.users), email, full_name, created_at.
2. `app_role` enum + `user_roles` table (id, user_id, role) — used to gate `/admin` via `has_role()` security-definer function. Standard Lovable pattern.
3. `pages` — id, path (unique, e.g. `/pricing`), title, parent_id (self-FK, nullable), section (enum: `features`/`resources`/`free_tools`/`company`/`legal`/`none`), created_at. Seeded from the current routes in `App.tsx`.
4. `page_seo` — page_id (FK), meta_title, meta_description, canonical_url, og_title, og_description, og_image, schema_jsonb (JSON-LD), tagline, robots, keywords, updated_at.
5. `menus` — id, location (enum: `primary_nav`, `footer_col_1..5`), label.
6. `menu_items` — id, menu_id, parent_id (self-FK), label, url, page_id (nullable FK), icon, description, is_mega (bool), position (int), open_in_new_tab.
7. `footer_settings` — singleton row: logo description, social links JSON, copyright.

RLS: public `SELECT` on `pages`, `page_seo`, `menus`, `menu_items`, `footer_settings`. Mutations restricted to `admin` role via `has_role(auth.uid(), 'admin')`. Grants added per the public-schema-grants rule.

## Admin auth flow

- New route `/admin/login`. On load, call an edge function `admin-bootstrap-status` that returns `{ hasAdmin: boolean }` (counts rows in `user_roles` where role='admin'; runs with service role so it doesn't need RLS exposure).
- If `hasAdmin === false` → render Signup form (email + password + name). On submit: `supabase.auth.signUp`, then call edge function `admin-bootstrap` which (a) verifies no admin exists yet, (b) inserts `user_roles(user_id, 'admin')` for the new user. Idempotent + race-safe.
- If `hasAdmin === true` → render Login form only. After login, check `has_role` → redirect to `/admin`.
- `<AdminGuard>` wraps all `/admin/*` routes: requires session + admin role, else redirect to `/admin/login`.

Email confirmations: disabled in cloud auth settings so first-run signup works instantly.

## Admin UI (`/admin/*`)

Sidebar layout (`AdminLayout`) with sections:

- **Dashboard** — counts + quick links.
- **Menus** — pick location (Primary Nav / Footer Col 1–5). Tree view with drag-and-drop using `@dnd-kit/core` + `@dnd-kit/sortable` (already plays well with React 18). Supports nesting (parent/child) and an "Is mega menu" toggle on top-level Primary Nav items. Each item: label, link target (free URL or pick from `pages`), icon name, description (used in mega menu cards), open-in-new-tab.
- **Footer** — edit the 5 column titles, the brand blurb, social links, copyright. Column link lists are managed under Menus → Footer Col N (one menu per column, drag-and-drop ordering).
- **Pages** — read-only list of all routes seeded from `App.tsx`. Click → detail page showing: path, current parent (Section dropdown: Features / Resources / Free Tools / Company / Legal / None) editable, and the full **SEO panel**: meta title, meta description, canonical URL, og title/description/image, JSON-LD schema (textarea, validated as JSON), tagline, robots, keywords. Save updates `page_seo`.
- **Users** — list admins (optional, simple).

## Front-end integration

- Install `react-helmet-async`, wrap `<HelmetProvider>` in `src/main.tsx`.
- New `<SeoHead pagePath="/pricing" />` component that fetches `page_seo` for the route via TanStack Query and renders Helmet tags. Falls back gracefully to existing `index.html` defaults if no row.
- Add `<SeoHead />` to the shared `Layout.tsx` (auto-detects `location.pathname`), so every page picks up admin-edited SEO without per-page wiring.
- New hooks: `usePrimaryNav()`, `useFooterMenus()`, `useFooterSettings()` — fetch from CMS tables via TanStack Query, cached.
- **Navbar.tsx** refactored to render from `usePrimaryNav()` instead of the hardcoded `featureLinks`/`resourceLinks`/`simpleLinks` arrays. Mega menu rendering driven by `is_mega` flag + children. Icons resolved via a `lucide-react` name→component map (the same icon set already in use). Hardcoded arrays seeded into DB so v1 ships identical to current UI.
- **Footer.tsx** refactored: brand column reads `footer_settings`; the 5 link columns render `menu_items` from each `footer_col_N` menu.

## Technical details

- New deps: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`, `react-helmet-async`.
- New files (high-level):
  - `supabase/migrations/<ts>_cms.sql` (schema, enums, RLS, grants, seed)
  - `supabase/functions/admin-bootstrap-status/index.ts`
  - `supabase/functions/admin-bootstrap/index.ts`
  - `src/integrations/supabase/client.ts` (auto-generated by enabling Cloud)
  - `src/lib/cms/iconMap.ts`, `src/lib/cms/queries.ts`
  - `src/hooks/usePrimaryNav.ts`, `useFooterMenus.ts`, `useFooterSettings.ts`, `usePageSeo.ts`
  - `src/components/seo/SeoHead.tsx`
  - `src/components/admin/AdminLayout.tsx`, `AdminGuard.tsx`
  - `src/pages/admin/AdminLogin.tsx`, `AdminDashboard.tsx`, `AdminMenus.tsx`, `AdminFooter.tsx`, `AdminPages.tsx`, `AdminPageDetail.tsx`, `AdminUsers.tsx`
  - Routes added to `src/App.tsx` under `/admin/*`.
- Existing pages stay untouched aside from `Layout.tsx` (adds `<SeoHead/>`) and `Navbar.tsx`/`Footer.tsx` (read from hooks).

## Out of scope (per your message)

- Editing page **body content** — only the SEO/parent metadata is editable. Content remains in the React components.
- Blog/Docs/KnowledgeHub article CMS — those already have their own data flow; not touched here.
- Public sign-up for end users — auth is admin-only.

## Open questions before I build

1. **Confirm Lovable Cloud is OK to enable** (this provisions the backend; no external account needed).
2. **Drag-and-drop library** — I'll use `@dnd-kit` (modern, React 18 friendly). OK?
3. **Pages list** — should I seed only the routes I see in `App.tsx` today, or also include the dynamic ones (`/blog/:slug`, `/features/:slug`, `/industries/:slug`, `/tools/:slug`) as templates (one row per pattern, SEO acts as default for the pattern)?
4. **First-run signup** — should it be open at `/admin/login` (anyone who finds the URL before you sign up could grab the admin seat), or should I hide it behind a one-time setup token printed to the console / required env var? Open is simpler; token is safer.

Reply with answers (or just "go") and I'll implement.
