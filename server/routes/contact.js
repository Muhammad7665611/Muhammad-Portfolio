import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { isMailConfigured, sendContactEmail } from '../lib/mailer.js'
import { saveMessage } from '../lib/store.js'

const router = Router()

/**
 * Contact costs nothing to serve but everything to abuse — each submission
 * lands in a real inbox. Five an hour is more than any human needs and useless
 * to a spam bot. Applied by index.js when the router is mounted.
 */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'rate_limited',
    message: "You've already sent a few messages. Please try again later, or email directly.",
  },
})

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(100, 'That name is too long.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(200, 'That email address is too long.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write at least a sentence or two.')
    .max(4000, 'That message is too long — please keep it under 4000 characters.'),
  company: z.string().trim().max(200, 'That company name is too long.').optional(),
  // Honeypot. The field is hidden in the form, so a real visitor never fills it.
  botcheck: z.string().max(200).optional(),
})

const SENT_MESSAGE = 'Thanks — your message has been sent. I usually reply within 24 hours.'

/**
 * One message per field, keyed by field name, so the form can highlight inputs
 * without parsing zod's issue array on the client.
 */
function fieldErrors(error) {
  const fields = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === 'string' && !fields[key]) fields[key] = issue.message
  }
  return fields
}

router.post('/', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Please check the highlighted fields and try again.',
      fields: fieldErrors(parsed.error),
    })
  }

  const { name, email, message, company, botcheck } = parsed.data

  // Honeypot tripped. Mirror the success response exactly — including the flags
  // a genuine submission would return — so the bot gets no signal to learn from
  // and no reason to retry with the field left blank.
  if (botcheck) {
    return res.json({
      ok: true,
      message: SENT_MESSAGE,
      persisted: true,
      emailed: isMailConfigured,
    })
  }

  try {
    // Persist first: the log write is local and fast, so even if SMTP is down
    // or unconfigured the message still exists somewhere.
    const saved = await saveMessage({
      name,
      email,
      company: company || null,
      message,
      // Kept for spam triage later; never shown to anyone.
      ip: req.ip,
      userAgent: req.get('user-agent') || null,
    })

    let emailed = false
    if (isMailConfigured) {
      try {
        await sendContactEmail({ name, email, message, company })
        emailed = true
      } catch (err) {
        // Not fatal on its own — log the transport failure, never the body.
        console.error('[contact]', err.message)
      }
    }

    // The only real failure is losing the message entirely: no inbox, no file.
    if (!emailed && !saved.persisted) {
      if (!isMailConfigured) {
        return res.status(503).json({
          error: 'not_configured',
          message: 'The contact form is not set up yet. Please email directly.',
        })
      }
      return res.status(500).json({
        error: 'server_error',
        message: 'Your message could not be delivered. Please email directly instead.',
      })
    }

    res.json({ ok: true, message: SENT_MESSAGE, persisted: saved.persisted, emailed })
  } catch (err) {
    // Express 4 does not catch rejected async handlers, so this must not escape.
    console.error('[contact]', err)
    res.status(500).json({
      error: 'server_error',
      message: 'Something went wrong sending your message. Please try again.',
    })
  }
})

export default router
