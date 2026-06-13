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
- [ ] Commit working MVP on `feature_mvp` as checkpoint

### Phase 2 — Test infrastructure
- [ ] Dev deps: `vitest`, `@nuxt/test-utils`, `@vue/test-utils`, `happy-dom`
- [ ] `vitest.config.ts`
- [ ] Scripts: `test`, `test:watch`
- [ ] Update CLAUDE.md "no tests" note

### Phase 3 — Unit tests (riskiest code)
- [ ] Extract inline Zod schemas → `server/utils/schemas.ts`; re-import in 3 routes
- [ ] `sanitize.test.ts` — strips `\r\n\t`; escapes `& < > " '`
- [ ] `rateLimiter.test.ts` — allows 5, blocks 6th, resets after window
- [ ] `schemas.test.ts` — valid passes; bad email/short name/bad enum fail; honeypot accepted

### Phase 4 — Component / snapshot tests
- [ ] `SiteHeader` — renders nav, mobile toggle flips `aria-expanded` (`mountSuspended`)
- [ ] Snapshot `SiteHeader` + `SiteFooter`
- [ ] `useCoaches` — `getCoach(slug)` returns coach / null

### Phase 5 — Quality gate
- [ ] `.github/workflows/ci.yml` — install + build + test on push/PR
- [ ] (Optional) ESLint via `@nuxt/eslint` + `lint` script in CI

### Phase 6 — Feature backlog (deferred until 0–5 green)
- [ ] Dark mode via `@nuxtjs/color-mode` + `dark:` variants
- [ ] Accessibility audit pass
- [ ] More coaches in `useCoaches.ts` as content arrives

---

## Notes
- The grand "list" (personas, roadmap, KPIs, epics/stories) was aspirational — never created. It's a backlog, not lost work.
- Verify: `TMPDIR=/tmp npm run build` && `TMPDIR=/tmp npm test`.
- Full server-route e2e is out of scope for MVP; schema + util unit tests cover the risky logic.
