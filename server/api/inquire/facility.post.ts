import nodemailer from 'nodemailer'
import { checkRateLimit } from '~/server/utils/rateLimiter'
import { sanitizeStr, escapeHtml } from '~/server/utils/sanitize'
import { facilitySchema as Schema } from '~/server/utils/schemas'

const RENTAL_LABELS: Record<string, string> = {
  'team-practice': 'Team Practice',
  'private-game': 'Private Game',
  'small-sided': 'Small-Sided Match',
  'birthday': 'Birthday Soccer Event',
  'club-training': 'Club Training',
  'independent': 'Independent Trainer Session',
}

// Renders an ISO date (YYYY-MM-DD) as e.g. "Saturday, June 27, 2026".
// Appends T00:00:00 so it's parsed in local time, not shifted by UTC.
function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function row(label: string, value: string) {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 12px;color:#64748b;width:38%;font-size:14px;border-bottom:1px solid #e2e8f0;vertical-align:top">${label}</td>
    <td style="padding:8px 12px;font-weight:600;font-size:14px;border-bottom:1px solid #e2e8f0">${value}</td>
  </tr>`
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

  // Silently succeed for bots
  if (result.data._honey) return { success: true }

  const d = result.data
  const config = useRuntimeConfig()

  if (!config.smtpUser || !config.smtpPass || !config.smtpTo) {
    console.error('[CST] SMTP not configured. Facility inquiry from:', d.email)
    throw createError({ statusCode: 503, statusMessage: 'Email service is not configured yet. Please contact us directly.' })
  }

  const rentalLabel = RENTAL_LABELS[d.rentalType] ?? d.rentalType
  const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

  const teamName = sanitizeStr(d.teamName)
  const contactName = sanitizeStr(d.contactName)
  const email = sanitizeStr(d.email)
  const phone = sanitizeStr(d.phone ?? '')
  const preferredDate = d.preferredDate ? formatDate(sanitizeStr(d.preferredDate)) : ''
  const preferredTime = sanitizeStr(d.preferredTime ?? '')
  const duration = sanitizeStr(d.duration ?? '')
  const playerCount = sanitizeStr(d.playerCount ?? '')
  const scheduleNote = sanitizeStr(d.scheduleNote ?? '')

  // Build a human-readable recurrence summary, e.g. "Weekly until Saturday, August 1, 2026".
  const repeat = sanitizeStr(d.repeat ?? '')
  let recurrence = ''
  if (repeat && repeat !== 'Does not repeat') {
    if (d.repeatNoEnd) {
      recurrence = `${repeat} (ongoing, no end date)`
    } else if (d.repeatUntil) {
      recurrence = `${repeat} until ${formatDate(sanitizeStr(d.repeatUntil))}`
    } else {
      recurrence = repeat
    }
  }

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:24px">
<div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
  <div style="background:#0f172a;padding:24px 32px">
    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Chiennee Soccer Training</p>
    <h1 style="margin:6px 0 0;color:white;font-size:20px;font-weight:700">New Facility Rental Inquiry</h1>
    <p style="margin:4px 0 0;color:#475569;font-size:13px">${submitted} (ET)</p>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Rental Details</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row('Rental Type', escapeHtml(rentalLabel))}
      ${row('Team / Group Name', escapeHtml(teamName))}
      ${row('Est. Player Count', escapeHtml(playerCount))}
    </table>

    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Contact</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row('Contact Name', escapeHtml(contactName))}
      <tr>
        <td style="padding:8px 12px;color:#64748b;width:38%;font-size:14px;border-bottom:1px solid #e2e8f0">Email</td>
        <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #e2e8f0">
          <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;font-weight:600">${escapeHtml(email)}</a>
        </td>
      </tr>
      ${row('Phone', escapeHtml(phone))}
    </table>

    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Preferred Schedule</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row('Preferred Date', escapeHtml(preferredDate))}
      ${row('Recurrence', escapeHtml(recurrence))}
      ${row('Preferred Start Time', escapeHtml(preferredTime))}
      ${row('Duration', escapeHtml(duration))}
      ${row('Scheduling Notes', escapeHtml(scheduleNote))}
    </table>

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0">
      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#16a34a;color:white;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none;font-size:14px">Reply to Inquiry</a>
    </div>
  </div>
</div>
</body>
</html>`

  const text = `New Facility Rental Inquiry — ${rentalLabel}
Submitted: ${submitted} (ET)

Team / Group: ${teamName}
Contact: ${contactName}
Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${playerCount ? `Est. Players: ${playerCount}\n` : ''}
Preferred Date: ${preferredDate || 'Not specified'}
${recurrence ? `Recurrence: ${recurrence}\n` : ''}Preferred Time: ${preferredTime || 'Not specified'}
Duration: ${duration || 'Not specified'}
${scheduleNote ? `Scheduling Notes: ${scheduleNote}\n` : ''}`

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
    subject: `Facility Inquiry — ${rentalLabel} — ${teamName}`,
    html,
    text,
  })

  return { success: true }
})
