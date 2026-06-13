import { z } from 'zod'
import nodemailer from 'nodemailer'
import { checkRateLimit } from '~/server/utils/rateLimiter'
import { sanitizeStr, escapeHtml } from '~/server/utils/sanitize'

const RENTAL_LABELS: Record<string, string> = {
  'team-practice': 'Team Practice',
  'private-game': 'Private Game',
  'small-sided': 'Small-Sided Match',
  'birthday': 'Birthday Soccer Event',
  'club-training': 'Club Training',
  'independent': 'Independent Trainer Session',
}

const Schema = z.object({
  rentalType: z.enum(['team-practice', 'private-game', 'small-sided', 'birthday', 'club-training', 'independent']),
  teamName: z.string().min(2, 'Team or group name is required').max(100),
  contactName: z.string().min(2, 'Contact name is required').max(100),
  email: z.string().email('A valid email address is required').max(254),
  phone: z.string().max(20).optional(),
  preferredDate: z.string().max(100).optional(),
  preferredTime: z.string().max(50).optional(),
  duration: z.string().max(20).optional(),
  playerCount: z.string().max(10).optional(),
  notes: z.string().max(2000).optional(),
  _honey: z.string().optional(),
})

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
  const preferredDate = sanitizeStr(d.preferredDate ?? '')
  const preferredTime = sanitizeStr(d.preferredTime ?? '')
  const duration = sanitizeStr(d.duration ?? '')
  const playerCount = sanitizeStr(d.playerCount ?? '')
  const notes = sanitizeStr(d.notes ?? '')

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
      ${row('Preferred Start Time', escapeHtml(preferredTime))}
      ${row('Duration', escapeHtml(duration))}
    </table>

    ${notes ? `
    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Additional Notes</h2>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;border:1px solid #e2e8f0">${escapeHtml(notes)}</div>
    ` : ''}

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
Preferred Time: ${preferredTime || 'Not specified'}
Duration: ${duration || 'Not specified'}
${notes ? `\nNotes:\n${notes}` : ''}`

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
