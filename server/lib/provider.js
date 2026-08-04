/**
 * Provider selection.
 *
 * Both providers expose the same tiny surface — `streamReply`, `describeError`,
 * `info` — so the chat route never learns which one it is talking to. The whole
 * knowledge base and system prompt are shared, so switching providers does not
 * change what the assistant knows or how it is instructed to behave.
 *
 * Chosen by LLM_PROVIDER, or inferred from whichever API key is present.
 *
 * Both modules are imported STATICALLY. They used to be loaded with a dynamic
 * import() because each SDK throws at construction when its key is missing, so
 * importing both eagerly broke whichever one you weren't using. That constraint
 * is gone — each provider now builds its client lazily on first use — and
 * static imports matter on Vercel: the bundler traces static imports to decide
 * which files ship in the function. A conditional import() is easy to miss, and
 * the failure mode is a runtime MODULE_NOT_FOUND in production only.
 */

import * as openaiProvider from './providers/openai.js'
import * as anthropicProvider from './providers/anthropic.js'

function resolveName() {
  const explicit = (process.env.LLM_PROVIDER || '').trim().toLowerCase()
  if (explicit === 'openai' || explicit === 'anthropic') return explicit

  if (process.env.OPENAI_API_KEY) return 'openai'
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic'
  return null
}

export const providerName = resolveName()

/** True when a usable key is configured — surfaced on /api/health. */
export const isConfigured = Boolean(providerName)

/**
 * Kept async so callers can keep `await getProvider()` unchanged — awaiting a
 * non-promise is a no-op.
 */
export async function getProvider() {
  if (!providerName) {
    throw new Error('No LLM provider configured — set OPENAI_API_KEY or ANTHROPIC_API_KEY')
  }
  return providerName === 'openai' ? openaiProvider : anthropicProvider
}
