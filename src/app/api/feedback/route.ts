import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type LogEntry = {
  level: string
  message: string
  timestamp: string
}

type FeedbackPayload = {
  comment?: string
  screenshot?: string | null
  consoleLogs?: LogEntry[]
  pageUrl?: string
  category?: string
  email?: string
}

const MAX_SCREENSHOT_BYTES = 700_000
const LOG_DIR = path.join(process.cwd(), 'logs', 'feedback')

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function writeJsonlLog(entry: Record<string, unknown>): Promise<void> {
  try {
    await fs.mkdir(LOG_DIR, { recursive: true })
    const day = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    const file = path.join(LOG_DIR, `${day}.jsonl`)
    await fs.appendFile(file, JSON.stringify(entry) + '\n', 'utf8')
  } catch (err) {
    // Non-fatal — in ephemeral environments (Railway/Docker) the filesystem
    // may be read-only or reset on redeploy. Email remains the source of truth.
    console.warn('[feedback] JSONL write failed:', err)
  }
}

async function sendEmail(params: {
  category: string
  comment: string
  pageUrl: string
  submitterEmail?: string
  screenshot?: string | null
  consoleLogs: LogEntry[]
  ipAddress: string
  userAgent: string
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'Classic Towing Site <feedback@classictowing.ca>'
  const to = process.env.EMAIL_TO || 'careers@classictowing.ca'

  if (!apiKey) {
    console.warn('[feedback] RESEND_API_KEY not set — skipping email notification')
    return
  }

  const resend = new Resend(apiKey)

  const logsHtml =
    params.consoleLogs.length === 0
      ? '<p style="color:#8A8A8A;font-size:12px;">No console logs captured.</p>'
      : `<pre style="background:#0A0A0A;color:#FAFAFA;padding:12px;border-radius:8px;font-size:11px;max-height:260px;overflow:auto;white-space:pre-wrap;">${escapeHtml(
          params.consoleLogs
            .slice(-25)
            .map((l) => `[${l.timestamp}] ${l.level.toUpperCase()} ${l.message}`)
            .join('\n')
        )}</pre>`

  const screenshotBlock = params.screenshot
    ? `<div style="margin:16px 0;"><img src="${params.screenshot}" alt="Screenshot" style="max-width:100%;border:1px solid #e5e5e5;border-radius:8px;" /></div>`
    : ''

  const attachments = params.screenshot
    ? [
        {
          filename: 'screenshot.jpg',
          content: params.screenshot.replace(/^data:image\/\w+;base64,/, ''),
        },
      ]
    : undefined

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:28px;background:#FAFAFA;color:#0A0A0A;">
      <div style="text-align:center;margin-bottom:20px;">
        <div style="display:inline-block;background:#CC1C1C;color:#fff;font-weight:700;padding:8px 14px;border-radius:8px;font-size:14px;letter-spacing:0.5px;">CLASSIC TOWING</div>
      </div>
      <h2 style="margin:0 0 8px 0;color:#0A0A0A;">New ${escapeHtml(params.category)} feedback</h2>
      <p style="color:#2A2A2A;margin:4px 0;"><strong>Category:</strong> ${escapeHtml(params.category)}</p>
      <p style="color:#2A2A2A;margin:4px 0;"><strong>Page:</strong> ${escapeHtml(params.pageUrl || 'N/A')}</p>
      ${params.submitterEmail ? `<p style="color:#2A2A2A;margin:4px 0;"><strong>From:</strong> ${escapeHtml(params.submitterEmail)}</p>` : '<p style="color:#8A8A8A;margin:4px 0;"><em>Anonymous submission</em></p>'}
      <p style="color:#8A8A8A;margin:4px 0;font-size:12px;"><strong>IP:</strong> ${escapeHtml(params.ipAddress)} &nbsp;·&nbsp; <strong>UA:</strong> ${escapeHtml(params.userAgent)}</p>

      <div style="background:#F5F0EB;border-left:4px solid #CC1C1C;border-radius:6px;padding:14px 16px;margin:16px 0;">
        <p style="color:#0A0A0A;margin:0;white-space:pre-wrap;line-height:1.5;">${escapeHtml(params.comment)}</p>
      </div>

      ${screenshotBlock}

      <h3 style="color:#0A0A0A;margin:20px 0 8px 0;font-size:14px;">Console logs (last 25)</h3>
      ${logsHtml}

      <p style="color:#8A8A8A;font-size:11px;margin-top:24px;text-align:center;">Sent automatically by the Classic Towing feedback widget.</p>
    </div>
  `

  await resend.emails.send({
    from,
    to,
    subject: `[Classic Towing] New ${params.category} feedback`,
    html,
    attachments,
  })
}

export async function POST(req: NextRequest) {
  let payload: FeedbackPayload
  try {
    payload = (await req.json()) as FeedbackPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const comment = payload.comment?.trim()
  if (!comment) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
  }

  if (payload.screenshot && payload.screenshot.length > MAX_SCREENSHOT_BYTES) {
    return NextResponse.json({ error: 'Screenshot too large' }, { status: 400 })
  }

  const category = (payload.category || 'bug').toString().slice(0, 32)
  const pageUrl = (payload.pageUrl || '').toString().slice(0, 500)
  const submitterEmail = payload.email?.trim().slice(0, 200)
  const consoleLogs = Array.isArray(payload.consoleLogs) ? payload.consoleLogs.slice(-100) : []
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'

  const entry = {
    id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    category,
    comment,
    pageUrl,
    submitterEmail: submitterEmail || null,
    consoleLogs,
    hasScreenshot: Boolean(payload.screenshot),
    ipAddress,
    userAgent,
    createdAt: new Date().toISOString(),
  }

  // 1) Append to JSONL log (best-effort; filesystem may be ephemeral)
  await writeJsonlLog(entry)

  // 2) Email notification (must not block the response)
  try {
    await sendEmail({
      category,
      comment,
      pageUrl,
      submitterEmail,
      screenshot: payload.screenshot ?? null,
      consoleLogs,
      ipAddress,
      userAgent,
    })
  } catch (err) {
    console.error('[feedback] Email send failed:', err)
  }

  return NextResponse.json({ ok: true, id: entry.id }, { status: 201 })
}
