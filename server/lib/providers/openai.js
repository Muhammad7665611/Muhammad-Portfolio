import OpenAI from 'openai'
import { SYSTEM_PROMPT } from '../systemPrompt.js'

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

/**
 * The client is built on first use, not at module load.
 *
 * `new OpenAI()` throws when OPENAI_API_KEY is absent. At module scope that
 * would crash the whole function on cold start — including /api/health and the
 * content routes, which have nothing to do with the assistant. Deferring it
 * means a missing key degrades to one failing endpoint instead of a dead API.
 *
 * Cached across invocations: on a warm serverless instance this runs once.
 */
let client = null

function getClient() {
  if (!client) client = new OpenAI()
  return client
}

/**
 * Streams a grounded reply from OpenAI Chat Completions.
 *
 * The system prompt is ~1.5K tokens, which clears OpenAI's automatic
 * prompt-caching threshold — no cache_control plumbing needed, it just happens
 * and discounts the repeated prefix.
 *
 * @returns {Promise<{ finishReason: string | null }>}
 */
export async function streamReply({ messages, onDelta, signal }) {
  const stream = await getClient().chat.completions.create(
    {
      model: MODEL,
      // Newer param name; `max_tokens` is deprecated on current models.
      max_completion_tokens: 800,
      // Unlike Claude Opus 5 (which rejects sampling params outright), OpenAI
      // still exposes temperature — low value keeps answers close to the KB.
      temperature: 0.3,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      stream: true,
    },
    { signal }
  )

  let finishReason = null

  for await (const chunk of stream) {
    const choice = chunk.choices?.[0]
    if (!choice) continue

    const text = choice.delta?.content
    if (text) onDelta(text)

    if (choice.finish_reason) finishReason = choice.finish_reason
  }

  return { finishReason }
}

/** Maps SDK errors onto a visitor-safe message. Returns null if unrecognised. */
export function describeError(err) {
  if (err instanceof OpenAI.RateLimitError) {
    return 'The assistant is busy right now. Give it a moment and try again.'
  }
  if (err instanceof OpenAI.AuthenticationError) {
    console.error('[openai] OPENAI_API_KEY missing, invalid, or revoked')
    return 'The assistant is not configured correctly. Please use the contact form.'
  }
  if (err instanceof OpenAI.PermissionDeniedError) {
    console.error('[openai] key lacks access to model', MODEL)
    return 'The assistant is not configured correctly. Please use the contact form.'
  }
  if (err instanceof OpenAI.APIConnectionError) {
    return 'Could not reach the assistant. Check your connection and try again.'
  }
  return null
}

export const info = { provider: 'openai', model: MODEL }
