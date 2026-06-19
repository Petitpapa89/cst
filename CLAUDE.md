# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (TMPDIR shortcut required on macOS to avoid Unix socket path length error)
TMPDIR=/tmp npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run the test suite (Vitest)
npm test

# Watch mode
npm run test:watch
```

Tests live in `test/` and run on Vitest. Pure logic (`server/utils/sanitize.ts`,
`rateLimiter.ts`, and the shared Zod schemas in `server/utils/schemas.ts`) runs in the
default node environment; component tests (`*.nuxt.spec.ts`) opt into the Nuxt environment
via a `// @vitest-environment nuxt` docblock and use `mountSuspended` from
`@nuxt/test-utils/runtime`. CI (`.github/workflows/ci.yml`) runs build + test on push/PR.
No linting is configured yet.

## Architecture

**Nuxt 3** app. `app.vue` delegates everything to `<NuxtLayout>` + `<NuxtPage>`. All pages automatically get `SiteHeader` / `SiteFooter` via `layouts/default.vue`.

### Booking model

There are **no calendars, no Stripe, no user accounts**. Every "book" or "rent" CTA leads to an inquiry form. Submitted forms POST to a Nitro server route which sends an email to Oumar via Gmail SMTP. He responds and schedules manually.

Three form → API pairs:
| Form page | API route | Purpose |
|---|---|---|
| `/inquire/training` | `POST /api/inquire/training` | Training session requests |
| `/inquire/facility` | `POST /api/inquire/facility` | Facility rental requests |
| `/contact` | `POST /api/contact` | General questions |

### Server layer (Nitro)

Every API route follows the same pattern:
1. Rate-limit by IP (`server/utils/rateLimiter.ts` — 5 req / 10 min, in-memory Map)
2. Parse body with `readBody()`
3. Validate with **Zod v4** (`result.error.issues[0]` for error messages — not `.errors`)
4. Check honeypot field — if filled, silently return `{ success: true }` without sending email
5. Sanitize strings with `sanitizeStr()` (strips `\r\n\t` — prevents email header injection)
6. HTML-escape with `escapeHtml()` before inserting user data into email HTML body
7. Send via Nodemailer using `useRuntimeConfig()` for SMTP credentials

### Email configuration

Credentials come from environment variables mapped in `nuxt.config.ts` → `runtimeConfig`:

```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO, SMTP_FROM
```

Copy `.env.example` → `.env` and fill in a Gmail App Password. If any of `SMTP_USER / SMTP_PASS / SMTP_TO` are missing, routes log to console and return HTTP 503 — they do not silently swallow the inquiry.

### Coach data

All coach profiles live in `composables/useCoaches.ts` as a plain array. Adding a new coach there automatically populates the `/coaches` listing page, where each card shows the coach's bio (long bios collapse behind a "More" toggle). There are no per-coach profile pages. The `slug` field is used as a stable `:key` for the list.

### Program & pricing data

All training programs and their prices live in `composables/usePrograms.ts` as a single source of truth. Both the home "Training Programs" section (`pages/index.vue`, uses `title`/`tagline`/`price`) and the `/programs` page (`pages/programs.vue`, uses `description`/`bestFor`/`cta`/`ctaBg`) render from it — so updating a price once keeps both pages in sync.

### Styling

Tailwind CSS (`@nuxtjs/tailwindcss`). Fonts via Google Fonts: **Inter** for body, **Anton** for big display headings (applied to `h1`/`h2` in `assets/css/main.css` via the `font-display` family).

Brand palette derived from the CST logo (green ball + orange lettering + black outlines):
- `green-*` — **primary / training** brand (CTAs, links, training pages, nav, header/footer accent).
- `orange-*` — **facility** brand. Use orange for anything facility-related (`/facility-rental`, `/inquire/facility`, the home "Indoor Facility" preview) to keep training vs. facility visually distinct.
- `slate-900` — dark sections (the logo's black).
- `green-500`/`green-100` — universal success/checkmark states (form-submitted confirmations, "Best For" list ticks) stay green regardless of page.

The logo lives at `public/images/logo.jpg` (white background — seat it on a white tile on dark bars). Training marketing photo at `public/images/training-action.jpg`. Aside from `assets/css/main.css` (heading font only), all styling is Tailwind utility classes.
