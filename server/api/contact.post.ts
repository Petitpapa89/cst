import nodemailer from 'nodemailer'
import { checkRateLimit } from '~/server/utils/rateLimiter'
import { sanitizeStr, escapeHtml } from '~/server/utils/sanitize'
import { contactSchema as Schema } from '~/server/utils/schemas'

const INTEREST_LABELS: Record<string, string> = {
  training: 'Training Sessions',
  facility: 'Facility Rental',
  general: 'General Question',
}

export default defineEventHandler(async (event) => {
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ??
    (event.node.req.socket as { remoteAddress?: string })?.remoteAddress ??
    'unknown'

  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please wait before submitting again.' })
  }

  let body: unknown
  try {
    body = await readBody(event)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request.' })
  }

  const result = Schema.safeParse(body)
  if (!result.success) {
    const msg = result.error.issues?.[0]?.message ?? 'Please check your form and try again.'
    throw createError({ statusCode: 422, statusMessage: msg })
  }

  if (result.data._honey) return { success: true }

  const d = result.data
  const config = useRuntimeConfig()

  if (!config.smtpUser || !config.smtpPass || !config.smtpTo) {
    console.error('[CST] SMTP not configured. Contact from:', d.email)
    throw createError({ statusCode: 503, statusMessage: 'Email service is not configured yet. Please contact us directly.' })
  }

  const name = sanitizeStr(d.name)
  const email = sanitizeStr(d.email)
  const phone = sanitizeStr(d.phone ?? '')
  const playerAge = sanitizeStr(d.playerAge ?? '')
  const message = sanitizeStr(d.message)
  const interestLabel = INTEREST_LABELS[d.interest] ?? d.interest
  const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:24px">
<div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
  <div style="background:#0f172a;padding:24px 32px">
    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Chiennee Soccer Training</p>
    <h1 style="margin:6px 0 0;color:white;font-size:20px;font-weight:700">New Contact Message</h1>
    <p style="margin:4px 0 0;color:#475569;font-size:13px">${submitted} (ET)</p>
  </div>
  <div style="padding:32px">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr><td style="padding:8px 12px;color:#64748b;width:38%;font-size:14px;border-bottom:1px solid #e2e8f0">Name</td><td style="padding:8px 12px;font-weight:600;font-size:14px;border-bottom:1px solid #e2e8f0">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px 12px;color:#64748b;font-size:14px;border-bottom:1px solid #e2e8f0">Email</td><td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #e2e8f0"><a href="mailto:${escapeHtml(email)}" style="color:#2563eb;font-weight:600">${escapeHtml(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding:8px 12px;color:#64748b;font-size:14px;border-bottom:1px solid #e2e8f0">Phone</td><td style="padding:8px 12px;font-weight:600;font-size:14px;border-bottom:1px solid #e2e8f0">${escapeHtml(phone)}</td></tr>` : ''}
      ${playerAge ? `<tr><td style="padding:8px 12px;color:#64748b;font-size:14px;border-bottom:1px solid #e2e8f0">Player Age</td><td style="padding:8px 12px;font-weight:600;font-size:14px;border-bottom:1px solid #e2e8f0">${escapeHtml(playerAge)}</td></tr>` : ''}
      <tr><td style="padding:8px 12px;color:#64748b;font-size:14px;border-bottom:1px solid #e2e8f0">Interested In</td><td style="padding:8px 12px;font-weight:600;font-size:14px;border-bottom:1px solid #e2e8f0">${escapeHtml(interestLabel)}</td></tr>
    </table>
    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Message</h2>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;border:1px solid #e2e8f0">${escapeHtml(message)}</div>
    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0">
      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#2563eb;color:white;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none;font-size:14px">Reply to ${escapeHtml(name)}</a>
    </div>
  </div>
</div>
</body>
</html>`

  const transporter = nodemailer.createTransport({
    host: config.smtpHost || 'smtp.gmail.com',
    port: Number(config.smtpPort || 587),
    secure: false,
    auth: { user: config.smtpUser, pass: config.smtpPass },
  })

  await transporter.sendMail({
    from: config.smtpFrom || `CST Website <${config.smtpUser}>`,
    to: config.smtpTo,
    replyTo: email,
    subject: `Contact — ${interestLabel} — ${name}`,
    html,
    text: `New Contact Message\nFrom: ${name} <${email}>\nInterested In: ${interestLabel}\n${phone ? `Phone: ${phone}\n` : ''}${playerAge ? `Player Age: ${playerAge}\n` : ''}\nMessage:\n${message}`,
  })

  return { success: true }
})
