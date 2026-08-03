import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import chatRouter from './routes/chat.js'
import contentRouter from './routes/content.js'
import contactRouter, { contactLimiter } from './routes/contact.js'
import { providerName, isConfigured } from './lib/provider.js'

const app = express()
const PORT = process.env.PORT || 8787

// Render/Vercel sit behind a proxy — without this, express-rate-limit sees
// every request as coming from the same IP and throttles all visitors together.
app.set('trust proxy', 1)

app.use(helmet())
app.use(express.json({ limit: '64kb' }))

const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin/curl requests arrive with no Origin header — allow those.
      if (!origin || allowed.includes(origin)) return cb(null, true)
      cb(new Error(`Origin ${origin} is not allowed`))
    },
  })
)

/**
 * Chat is the expensive endpoint and the whole abuse surface: every request
 * costs real tokens. Cap it per IP.
 */
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    error: 'rate_limited',
    message: "That's a lot of questions. Try again in a few minutes, or use the contact form.",
  },
})

app.get('/api/health', (req, res) => {
  // Surfaces a misconfigured deploy without leaking the key itself.
  res.json({ ok: true, assistant: isConfigured, provider: providerName })
})

app.use('/api/chat', chatLimiter, chatRouter)

// Contact carries its own stricter limiter (5/hour) — it reaches an inbox.
app.use('/api/contact', contactLimiter, contactRouter)

// Read-only content endpoints. Mounted last so its bare `/api` prefix can never
// shadow the two specific routes above.
app.use('/api', contentRouter)

app.use((req, res) => res.status(404).json({ error: 'not_found' }))

// Final safety net — CORS rejections land here too.
app.use((err, req, res, _next) => {
  console.error('[server]', err.message)
  res.status(500).json({ error: 'server_error', message: 'Unexpected server error.' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
  if (isConfigured) {
    console.log(`Assistant provider: ${providerName}`)
  } else {
    console.warn('⚠  No OPENAI_API_KEY or ANTHROPIC_API_KEY set — /api/chat returns 503.')
  }
})
