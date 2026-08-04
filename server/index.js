/**
 * Local development server.
 *
 * This file exists only to put the Express app on a port for `npm run dev:api`.
 * Vercel never loads it — production enters through api/[...path].js, which
 * imports the same app from ./app.js. Keeping listen() isolated here is what
 * makes the app deployable as a serverless function: a function must export a
 * handler and return, not bind a socket and run forever.
 */

import 'dotenv/config'
import app from './app.js'
import { providerName, isConfigured } from './lib/provider.js'

const PORT = process.env.PORT || 8787

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
  if (isConfigured) {
    console.log(`Assistant provider: ${providerName}`)
  } else {
    console.warn('⚠  No OPENAI_API_KEY or ANTHROPIC_API_KEY set — /api/chat returns 503.')
  }
})
