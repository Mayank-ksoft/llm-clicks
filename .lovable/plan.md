
## Task 1 — Restore the navbar/footer look (screenshots 1 & 3)

**Footer (`src/components/layout/Footer.tsx`)**
- Bug: grid is `lg:grid-cols-6` but content is brand (`lg:col-span-2`) + 5 link columns = 7 cells. The 5th column (Legal) wraps to a new row. Change grid to `lg:grid-cols-7` and keep brand at `lg:col-span-2`, so 2 + 5 = 7 fits cleanly on one row.
- Keep current CMS data flow (columns come from `footer_col_1..5` menus).

**Navbar (`src/components/layout/Navbar.tsx`)**
- The original screenshot shows a **3-column mega panel** under Features (Platform / Free Tools / On-Page Optimiser sub-section). The CMS `CmsDropdown` only renders a flat 1-or-2-column grid, so the mega look is lost once CMS items exist.
- Fix: when a CMS top-level node has children that themselves contain `is_column_group` children (or has nested children), render a 3-column mega layout (column-group headings + their leaves), with the existing hover-card style. Keep the simple dropdown path for nodes with no grandchildren.
- Update seed so Features has 3 column groups (`Platform`, `Free Tools`, `On-Page Optimiser`) with `is_column_group=true`, each containing the right leaves, matching screenshot 1.

## Task 2 — Footer admin clarity (5 columns)

The 5 footer columns are already CMS-managed at `/admin/menus` (location selector). `AdminFooter` only edits blurb/copyright/socials. To make this obvious:
- In `AdminFooter.tsx`, add a small "Footer columns" section with 5 buttons that deep-link to `/admin/menus?location=footer_col_N`, each labeled with the column title and a preview of the current link count.
- `AdminMenus.tsx`: read `?location=` from the URL on mount and pre-select that location.

## Task 3 — Admin SEO actually shows on the frontend

**Root cause**: `Layout.tsx` calls `syncRouteHeadTags(title, description, canonical)` on every render using the **static** `pageMeta.json`. That runs after Helmet, so `CmsSeoOverride`'s tags are overwritten by the static values. Result: admin edits never appear.

**Fix**:
- Remove the `syncRouteHeadTags` imperative call from `Layout.tsx` (Helmet already manages title/description/canonical/og:*).
- Move that fallback responsibility into `CmsSeoOverride`: when CMS data exists for the path, emit those tags via Helmet (current behavior); when it doesn't, the static `<Helmet>` block in `Layout` is the source of truth — no DOM-mutating sync needed.
- Add `queryClient.invalidateQueries(["page-seo", path])` is already called on save; the user just needs a hard refresh or route change to re-fetch — keep existing 60s `staleTime`.

## Task 4 — Per-page **H1 title** and **subtitle** managed from admin

Currently `page_seo.tagline` exists but isn't used anywhere visible. The user wants the big H1 ("About LLMClicks.ai and Our Mission…") and the subtitle below it to be admin-driven on every page.

**Schema** (new migration `*_page_hero.sql`):
- `ALTER TABLE public.page_seo ADD COLUMN h1 TEXT, ADD COLUMN subtitle TEXT;` (kept nullable so frontend falls back to hardcoded text).

**Hook** (`src/hooks/usePageHero.ts`):
- `usePageHero(path)` returns `{ h1, subtitle, eyebrow }` (eyebrow = existing `tagline`).
- Reuses the same `page_seo` query keyed on path.

**Admin** (`AdminPageDetail.tsx`):
- Add a new "Hero" card above "SEO" with `H1 title` and `Subtitle` inputs, plus the existing `Tagline` (eyebrow). Save through the same upsert.

**Frontend consumption** — wire only the pages that ship a visible hero today:
- `src/pages/About.tsx` — replace the hardcoded H1 + subtitle.
- `src/pages/Pricing.tsx`, `Contact.tsx`, `Comparison.tsx`, `Affiliate.tsx`, `IndustryBenchmarks.tsx`, `KnowledgeHub.tsx`, `WebStories.tsx`, `Industries.tsx`, `Privacy.tsx`, `Terms.tsx`, `Docs.tsx`, `Blog.tsx` — same pattern.
- `src/pages/FeaturePage.tsx` and `FreeToolPage.tsx` — use CMS hero with fallback to the per-slug content already in those files.

Pattern (small helper component):
```tsx
<PageHero
  eyebrow="ABOUT US"
  defaultTitle="About LLMClicks.ai and Our Mission to Redefine AI Visibility"
  defaultSubtitle="Helping businesses understand and thrive in the age of AI-powered search."
/>
```
Internally calls `usePageHero(pathname)` and shows CMS values when present.

**Seed** (`supabase/seeds/page_hero.sql`):
- Idempotent `UPDATE public.page_seo SET h1 = ..., subtitle = ...` per known path (About, Pricing, Contact, Comparison, Affiliate, Industry Benchmarks, Knowledge Hub, Web Stories, Industries, Privacy, Terms, Docs, Blog, and each feature/free-tool slug).
- Documented at the top with a one-line `psql -f` instruction.

## Files touched

```text
supabase/migrations/<ts>_page_hero.sql          (new)
supabase/seeds/page_hero.sql                    (new)
supabase/seeds/menu_items.sql                   (rework Features mega groups)
src/hooks/usePageHero.ts                        (new)
src/components/PageHero.tsx                     (new)
src/components/layout/Footer.tsx                (grid fix)
src/components/layout/Navbar.tsx                (3-col mega for CMS Features)
src/components/layout/Layout.tsx                (drop syncRouteHeadTags)
src/components/seo/CmsSeoOverride.tsx           (no change unless needed)
src/pages/admin/AdminPageDetail.tsx             (Hero card)
src/pages/admin/AdminFooter.tsx                 (5 quick-link buttons to menus)
src/pages/admin/AdminMenus.tsx                  (honor ?location= query)
src/pages/About.tsx + ~12 other hero pages      (PageHero wiring)
```

## Out of scope (please confirm if you want any of these)

- No SSR/prerender changes — admin SEO will appear for JS-executing crawlers (Googlebot) and users; the static `index.html` and `pageMeta.json` still serve as the no-JS fallback.
- Not editing `shared/pageMeta.json` — the admin DB is now the live source; the JSON stays as the build-time fallback.
- Not adding image/video upload to the hero — text only for now.

Reply **"go"** to implement, or call out anything you want changed.
