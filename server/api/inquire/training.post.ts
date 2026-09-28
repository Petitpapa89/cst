import nodemailer from 'nodemailer'
import { checkRateLimit } from '~/server/utils/rateLimiter'
import { sanitizeStr, escapeHtml } from '~/server/utils/sanitize'
import { trainingSchema as Schema } from '~/server/utils/schemas'

const TRAINING_LABELS: Record<string, string> = {
  '1on1': '1-on-1 Private Training',
  'small-group': 'Small Group Training',
  'ages-3-6': 'Ages 3–6 Group Training',
  'team': 'Team Training',
  'speed-agility': 'Speed & Agility',
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

  // Silently succeed for bots that filled the honeypot
  if (result.data._honey) return { success: true }

  const d = result.data
  const config = useRuntimeConfig()

  if (!config.smtpUser || !config.smtpPass || !config.smtpTo) {
    console.error('[CST] SMTP not configured. Training inquiry from:', d.email)
    throw createError({ statusCode: 503, statusMessage: 'Email service is not configured yet. Please contact us directly.' })
  }

  const typeLabel = TRAINING_LABELS[d.trainingType] ?? d.trainingType
  // Team/small-group inquiries describe a group, not one player.
  const isGroup = d.trainingType === 'team' || d.trainingType === 'small-group'
  const groupNoun = d.trainingType === 'team' ? 'Team' : 'Group'
  const daysStr = d.preferredDays?.join(', ') || ''
  const submitted = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

  const playerName = sanitizeStr(d.playerName)
  const email = sanitizeStr(d.email)
  const phone = sanitizeStr(d.phone ?? '')
  const parentName = sanitizeStr(d.parentName ?? '')
  const coachPref = sanitizeStr(d.coachPreference ?? '')
  const preferredTime = sanitizeStr(d.preferredTime ?? '')
  const message = sanitizeStr(d.message ?? '')
  const playerAge = sanitizeStr(d.playerAge)

  const html = `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;background:#f8fafc;margin:0;padding:24px">
<div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
  <div style="background:#0f172a;padding:24px 32px">
    <p style="margin:0;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:.08em">Chiennee Soccer Training</p>
    <h1 style="margin:6px 0 0;color:white;font-size:20px;font-weight:700">New Training Inquiry</h1>
    <p style="margin:4px 0 0;color:#475569;font-size:13px">${submitted} (ET)</p>
  </div>
  <div style="padding:32px">
    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Training Request</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row('Training Type', escapeHtml(typeLabel))}
      ${row('Coach Preference', escapeHtml(coachPref))}
    </table>

    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">${isGroup ? `${groupNoun} Information` : 'Player Information'}</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row(isGroup ? `${groupNoun} Name` : 'Player Name', escapeHtml(playerName))}
      ${row(isGroup ? `${groupNoun} Age Range` : 'Player Age', escapeHtml(playerAge))}
      ${row('Parent / Guardian', escapeHtml(parentName))}
    </table>

    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Contact</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr>
        <td style="padding:8px 12px;color:#64748b;width:38%;font-size:14px;border-bottom:1px solid #e2e8f0">Email</td>
        <td style="padding:8px 12px;font-size:14px;border-bottom:1px solid #e2e8f0">
          <a href="mailto:${escapeHtml(email)}" style="color:#2563eb;font-weight:600">${escapeHtml(email)}</a>
        </td>
      </tr>
      ${row('Phone', escapeHtml(phone))}
    </table>

    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Availability</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${row('Preferred Days', escapeHtml(daysStr))}
      ${row('Preferred Time', escapeHtml(preferredTime))}
    </table>

    ${message ? `
    <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Message</h2>
    <div style="background:#f8fafc;border-radius:8px;padding:16px;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;border:1px solid #e2e8f0">${escapeHtml(message)}</div>
    ` : ''}

    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e2e8f0">
      <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#2563eb;color:white;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none;font-size:14px">Reply to Inquiry</a>
    </div>
  </div>
</div>
</body>
</html>`

  const text = `New Training Inquiry — ${typeLabel}
Submitted: ${submitted} (ET)

${isGroup ? groupNoun : 'Player'}: ${playerName} (${isGroup ? 'Age range' : 'Age'}: ${playerAge})
${parentName ? `Parent/Guardian: ${parentName}\n` : ''}Email: ${email}
${phone ? `Phone: ${phone}\n` : ''}${coachPref ? `Coach Preference: ${coachPref}\n` : ''}
Preferred Days: ${daysStr || 'Not specified'}
${preferredTime ? `Preferred Time: ${preferredTime}\n` : ''}${message ? `\nMessage:\n${message}` : ''}`

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
    subject: `Training Inquiry — ${typeLabel} — ${playerName}`,
    html,
    text,
  })

  return { success: true }
})
