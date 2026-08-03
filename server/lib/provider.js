/**
 * Provider selection.
 *
 * Both providers expose the same tiny surface — `streamReply`, `describeError`,
 * `info` — so the chat route never learns which one it is talking to. The whole
 * knowledge base and system prompt are shared, so switching providers does not
 * change what the assistant knows or how it is instructed to behave.
 *
 * Chosen by LLM_PROVIDER, or inferred from whichever API key is present.
 * The provider module is imported lazily because each SDK throws at construction
 * time when its key is missing — importing both eagerly would break whichever
 * one you are not using.
 */

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

let cached = null

export async function getProvider() {
  if (!providerName) {
    throw new Error('No LLM provider configured — set OPENAI_API_KEY or ANTHROPIC_API_KEY')
  }
  if (!cached) {
    cached =
      providerName === 'openai'
        ? await import('./providers/openai.js')
        : await import('./providers/anthropic.js')
  }
  return cached
}
