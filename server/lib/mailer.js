/**
 * Contact-form mail transport.
 *
 * Deliberately dumb: one SMTP account, one destination inbox. The interesting
 * part is the direction of trust — everything in the mail body was typed by an
 * anonymous visitor, so it is escaped before it reaches an HTML mail client, and
 * their address goes in Reply-To rather than From (spoofing the From breaks
 * SPF/DKIM and gets the whole domain filed as spam).
 */

import nodemailer from 'nodemailer'

const HOST = process.env.SMTP_HOST
const PORT = Number(process.env.SMTP_PORT || 587)
const USER = process.env.SMTP_USER
const PASS = process.env.SMTP_PASS
const MAIL_TO = process.env.MAIL_TO
// Most relays reject a From they do not own, so fall back to the authenticated
// account rather than sending something that will bounce.
const MAIL_FROM = process.env.MAIL_FROM || USER

/** True only when a message can actually be delivered somewhere. */
export const isMailConfigured = Boolean(HOST && USER && PASS && MAIL_TO)

let transporter = null

/**
 * Built on first send, not at import time — an unconfigured deploy should
 * degrade to "contact form is off", not crash the whole API on boot.
 */
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      // 465 is implicit TLS. 587 and 25 open in plaintext and upgrade via
      // STARTTLS, which nodemailer negotiates on its own.
      secure: PORT === 465,
      auth: { user: USER, pass: PASS },
    })
  }
  return transporter
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}

/**
 * Sends one enquiry to MAIL_TO.
 *
 * Throws if the transport rejects it — the caller decides whether that is fatal
 * (it usually is not, because the message was written to the log first).
 *
 * @returns {Promise<string|undefined>} the SMTP message id, for the server log
 */
export async function sendContactEmail({ name, email, message, company }) {
  if (!isMailConfigured) {
    throw new Error('SMTP is not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_TO')
  }

  // Newlines in a header value are the classic header-injection vector.
  // Nodemailer encodes headers, but stripping them costs one regex.
  const safeName = name.replace(/[\r\n]+/g, ' ').trim()

  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
    '',
    '— sent from the portfolio contact form',
  ]
    .filter((line) => line !== null)
    .join('\n')

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <p style="margin:0 0 16px"><strong>New enquiry from the portfolio contact form</strong></p>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 16px">
        <tr><td style="padding:2px 12px 2px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${company ? `<tr><td style="padding:2px 12px 2px 0;color:#666">Company</td><td>${escapeHtml(company)}</td></tr>` : ''}
      </table>
      <div style="white-space:pre-wrap;border-left:3px solid #ddd;padding:0 0 0 12px">${escapeHtml(message)}</div>
    </div>
  `.trim()

  const info = await getTransporter().sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    // The whole point: hitting Reply in the inbox answers the visitor.
    replyTo: { name: safeName, address: email },
    subject: `Portfolio enquiry from ${safeName}`,
    text,
    html,
  })

  return info.messageId
}
