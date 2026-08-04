/**
 * The Express application — transport-agnostic.
 *
 * This module deliberately does NOT call app.listen(). It just builds and
 * exports the app, so the same code can run two ways:
 *
 *   • Locally  — server/index.js imports it and calls listen() (port 8787).
 *   • Vercel   — api/[...path].js imports it and exports it as the serverless
 *                handler. An Express app *is* a (req, res) function, which is
 *                exactly the signature Vercel invokes, so no adapter is needed.
 *
 * Everything at module scope here runs once per cold start, not per request.
 */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import chatRouter from './routes/chat.js'
import contentRouter from './routes/content.js'
import contactRouter, { contactLimiter } from './routes/contact.js'
import { providerName, isConfigured } from './lib/provider.js'

const app = express()

// Vercel terminates TLS at its edge and forwards the client IP in
// x-forwarded-for. Without this, express-rate-limit sees every request as
// coming from the proxy and throttles all visitors as one.
app.set('trust proxy', 1)

// Vercel serves the API from the same origin as the site, so no cross-origin
// asset policy is needed and the default CORP header would only get in the way.
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(express.json({ limit: '64kb' }))

/**
 * CORS is a no-op in the default single-project deploy — the frontend calls
 * /api/... on its own origin, so browsers never send an Origin header worth
 * checking. It stays for two cases that do cross origins: local dev (Vite on
 * :5173 → API on :8787) and any future split deployment.
 */
const allowed = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, cb) {
      // Same-origin requests and curl arrive with no Origin header.
      if (!origin || allowed.includes(origin)) return cb(null, true)
      cb(new Error(`Origin ${origin} is not allowed`))
    },
  })
)

/**
 * Chat is the expensive endpoint and the entire abuse surface: every request
 * spends real tokens.
 *
 * ⚠ On serverless this is best-effort only. The default MemoryStore lives in
 * one instance's heap, and Vercel runs many short-lived instances — a caller
 * spread across instances gets a fresh budget each time. See the deployment
 * notes for the durable fix (a shared KV store).
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
  res.json({
    ok: true,
    assistant: isConfigured,
    provider: providerName,
    runtime: process.env.VERCEL ? 'vercel' : 'node',
  })
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

export default app
