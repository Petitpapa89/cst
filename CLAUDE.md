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

All coach profiles live in `composables/useCoaches.ts` as a plain array. Adding a new coach there automatically populates the coaches listing page, the home page preview, and enables a profile page at `/coaches/[slug]`. The slug must match the `slug` field in the array.

### Styling

Tailwind CSS (`@nuxtjs/tailwindcss`). Inter font via Google Fonts. Color palette: `slate-900` (navy/dark), `blue-600` (primary actions), `green-600` (facility/accent). No custom CSS — all styling is Tailwind utility classes.
