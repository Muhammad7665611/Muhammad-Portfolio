import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT } from '../systemPrompt.js'

const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5'
const EFFORT = process.env.CLAUDE_EFFORT || 'low'

/**
 * Built on first use, not at module load — see the note in providers/openai.js.
 * `new Anthropic()` throws without ANTHROPIC_API_KEY, which at module scope
 * would take the entire serverless function down on cold start.
 */
let client = null

function getClient() {
  if (!client) client = new Anthropic()
  return client
}

/**
 * Streams a grounded reply from Claude.
 *
 * @returns {Promise<{ finishReason: string | null }>}
 */
export async function streamReply({ messages, onDelta, signal }) {
  const stream = getClient().messages.stream(
    {
      model: MODEL,
      max_tokens: 2000,
      // Adaptive thinking at low effort. Leaving thinking ON avoids the
      // disabled-thinking failure mode where <thinking> tags leak into the
      // visible reply; `low` keeps it fast and cheap.
      thinking: { type: 'adaptive' },
      output_config: { effort: EFFORT },
      // Cache breakpoint: the ~1.5K-token knowledge base bills at ~0.1x on
      // every message after the first.
      system: [
        { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
      ],
      messages,
    },
    { signal }
  )

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      onDelta(event.delta.text)
    }
  }

  const final = await stream.finalMessage()
  return { finishReason: final.stop_reason }
}

/** Maps SDK errors onto a visitor-safe message. Returns null if unrecognised. */
export function describeError(err) {
  if (err instanceof Anthropic.RateLimitError) {
    return 'The assistant is busy right now. Give it a moment and try again.'
  }
  if (err instanceof Anthropic.AuthenticationError) {
    console.error('[anthropic] ANTHROPIC_API_KEY missing or invalid')
    return 'The assistant is not configured correctly. Please use the contact form.'
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return 'Could not reach the assistant. Check your connection and try again.'
  }
  return null
}

export const info = { provider: 'anthropic', model: MODEL }
