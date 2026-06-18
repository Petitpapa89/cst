# CST MVP — Plan of Attack

> **Durable progress tracker.** This is the source of truth across sessions. If context
> is lost, read this file first. Check items off (`- [ ]` → `- [x]`) as they're completed.

## Goal

Stop adding features to an unverified, uncommitted, untested app.
Order: **verify → preserve → test → gate**, then resume the feature backlog on solid ground.

## Status legend
`- [x]` done · `- [ ]` not started · 🔜 next

---

### Phase 0 — Verify it works ✅ DONE (2026-06-13)
- [x] `TMPDIR=/tmp npm run build` compiles (all pages + 3 API routes)
- [x] Dev server serves `/`, `/inquire/training`, `/coaches`, `/coaches/oumar-djiba` → 200
- [x] API validation confirmed: 422 invalid body, 503 valid-but-no-SMTP (logged, not swallowed)

### Phase 1 — Tracker + preserve the MVP
- [x] Write `PLAN.md` (this file)
- [x] Memory pointer `memory/mvp-lockdown-plan.md` + `MEMORY.md` line
- [x] Commit working MVP on `feature_mvp` as checkpoint

### Phase 2 — Test infrastructure ✅ DONE
- [x] Dev deps: `vitest`, `@nuxt/test-utils`, `@vue/test-utils`, `happy-dom`
- [x] `vitest.config.ts`
- [x] Scripts: `test`, `test:watch`
- [x] Update CLAUDE.md "no tests" note

### Phase 3 — Unit tests (riskiest code) ✅ DONE
- [x] Extract inline Zod schemas → `server/utils/schemas.ts`; re-import in 3 routes
- [x] `sanitize.test.ts` — strips `\r\n\t`; escapes `& < > " '`
- [x] `rateLimiter.test.ts` — allows 5, blocks 6th, resets after window
- [x] `schemas.test.ts` — valid passes; bad email/short name/bad enum fail; honeypot accepted

### Phase 4 — Component / snapshot tests ✅ DONE (27 tests green)
- [x] `SiteHeader` — renders nav, mobile toggle flips `aria-expanded` (`mountSuspended`)
- [x] Snapshot `SiteHeader` + `SiteFooter`
- [x] `useCoaches` — `getCoach(slug)` returns coach / null

### Phase 5 — Quality gate
- [x] `.github/workflows/ci.yml` — install + build + test on push/PR
- [ ] (Optional) ESLint via `@nuxt/eslint` + `lint` script in CI

### Phase 6 — Feature backlog (deferred until 0–5 green)
- [x] Coach-selection dropdown on `/inquire/training` (reads `useCoaches()`; submits coach name; no API change)
- [x] Add a second coach to `useCoaches.ts` — ⚠️ currently a **placeholder** (`slug: assistant-coach`, TODO bio/philosophy); replace with real details before deploy
- [ ] Dark mode via `@nuxtjs/color-mode` + `dark:` variants
- [ ] Accessibility audit pass
- [ ] Replace the placeholder coach with real content as it arrives

---

## Notes
- The grand "list" (personas, roadmap, KPIs, epics/stories) was aspirational — never created. It's a backlog, not lost work.
- Verify: `TMPDIR=/tmp npm run build` && `TMPDIR=/tmp npm test`.
- Full server-route e2e is out of scope for MVP; schema + util unit tests cover the risky logic.
- Email/SMTP is configured in local `.env` (Gmail app password) and **verified working end-to-end** (real inquiry delivered). `.env` is gitignored — credentials are not committed.
- Composable edits (`useCoaches.ts`) don't always hot-reload; restart the dev server + hard-refresh if coach changes don't appear.
