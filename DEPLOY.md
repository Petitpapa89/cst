# Deploying CST to production

Goal: get the site live **as cheaply as possible** (target ~$10/year — just a domain).

## ✅ LIVE (deployed via Path A — Netlify)

- **URL:** https://chienneesoccertraining.com (apex; `www` redirects to it; HTTP→HTTPS)
- **Host:** Netlify free tier, auto-deploys on push to `main`. Build config in `netlify.toml`
  (publish `dist`, Node 20).
- **Email:** SMTP via Porkbun (`smtp.porkbun.com`, `support@chienneesoccertraining.com`) —
  6 `SMTP_*` values set as **Netlify environment variables** (not committed). Verified
  sending in production.
- **DNS:** kept at **Porkbun** (external DNS, *not* Netlify nameservers) so the email
  **MX records (`fwd1/fwd2.porkbun.com`) stay intact**. Apex = ALIAS → `*.netlify.app`
  (or A `75.2.60.5`); `www` = CNAME → `chienneesoccertraining.netlify.app`.
- **HTTPS:** free Let's Encrypt cert, auto-renewed by Netlify.
- **Gotcha hit:** Netlify's secrets scanner failed the build on the SMTP values baked into
  the SSR server bundle. Fixed via `SECRETS_SCAN_OMIT_PATHS = ".netlify/functions-internal/**"`
  in `netlify.toml` (server-side only, never shipped to the browser) + placeholder-only
  `.env.example`.

The original plan/notes are kept below for reference.

---

## The one constraint that drives everything

This site is **not static**. The routes `/api/inquire/training`, `/api/inquire/facility`,
and `/api/contact` run server-side (Nitro) and send email via **Nodemailer over Gmail SMTP**
(`server/api/**`, configured through `runtimeConfig` in `nuxt.config.ts`).

So the host **must support a Node/serverless backend**. This means:
- ❌ Plain static hosting (GitHub Pages, plain S3) won't work.
- ❌ Cloudflare Workers/Pages Functions won't run Nodemailer (Workers have no raw TCP/SMTP)
  **unless** email is switched to an HTTP API (see Path B).
- ✅ Netlify Functions, Vercel Functions, Render, Fly.io, Railway all work (Lambda-style
  Node runtimes allow outbound SMTP on port 587).

## Costs

| Item | Cost | Notes |
|---|---|---|
| Domain | ~$10/yr | Only unavoidable cost. Cheapest: **Cloudflare Registrar** (at-cost) or **Porkbun**. Avoid GoDaddy renewal markups. |
| Hosting | **$0** | Free tier covers a low-traffic inquiry site. |
| Email | **$0** | Gmail SMTP (free, ~500/day) to start, or Resend free tier later. |
| SSL + DNS | **$0** | Included by the host. |

> Note: **Vercel's free "Hobby" tier is non-commercial** per their ToS. CST is a business,
> so prefer Netlify (no such restriction on its free tier).

---

## Path A — Netlify (recommended: no code changes)

Nodemailer/SMTP works as-is. Commercial use allowed on the free tier. Only downside is a
minor serverless cold-start on the form endpoints (irrelevant for inquiry forms).

1. **Push to GitHub** (the repo has no remote yet):
   ```bash
   gh repo create chiennee-soccer-training --private --source=. --push
   ```
2. **Connect to Netlify**: New site → import from GitHub → pick the repo.
   Netlify auto-detects Nuxt and builds with the Nitro `netlify` preset (no config needed).
   - Build command: `npm run build`  ·  Publish dir: auto (`dist` / Nitro output).
3. **Set environment variables** (Site settings → Environment variables):
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_TO`, `SMTP_FROM`
   (use a Gmail **App Password** for `SMTP_PASS`). Optionally the
   `NUXT_PUBLIC_ANALYTICS_UMAMI_*` vars.
4. **Add the domain**: buy it (Cloudflare Registrar / Porkbun), then in Netlify → Domain
   management add the custom domain and follow the DNS instructions (or use Netlify DNS).
   HTTPS provisions automatically.
5. **Verify**: submit each form on the live site and confirm the email arrives.

## Path B — Cloudflare Pages + Resend (cheapest/fastest, small code change)

Best performance and fully free hosting, but requires swapping the email backend because
Cloudflare can't run Nodemailer/SMTP.

1. Sign up for **Resend**, verify the sending domain (DNS records), get an API key.
2. Replace Nodemailer with a `fetch()` call to the Resend API in the 4 server routes
   (keep the same Zod validation / sanitize / honeypot logic — only the send step changes).
3. Set the Nitro preset to `cloudflare-pages` and deploy via Cloudflare Pages (connect
   GitHub repo). Add `RESEND_API_KEY` (+ any public vars) as environment variables.
4. Domain via **Cloudflare Registrar** (at-cost) — DNS is already in Cloudflare.

**Recommendation:** launch on **Path A (Netlify)** for simplicity; migrate to Path B later
if cold starts ever bother you.

---

## Pre-deploy checklist

- [ ] `npm run build` succeeds locally and `npm test` is green.
- [ ] Repo pushed to GitHub.
- [ ] Gmail **App Password** generated; SMTP env vars ready (never commit `.env`).
- [ ] Domain purchased.
- [ ] Env vars set in the host dashboard.
- [ ] Custom domain + HTTPS configured.
- [ ] All three forms tested on the live URL → emails received by `SMTP_TO`.
