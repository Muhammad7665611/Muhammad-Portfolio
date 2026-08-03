import { Router } from 'express'
import { z } from 'zod'
import { getProvider, isConfigured } from '../lib/provider.js'

const router = Router()

/**
 * Visitor messages are untrusted input. Cap both the number of turns and the
 * size of each one so nobody can push a novel through the context window on
 * someone else's API budget.
 */
const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
})

/** SSE frame helper — one JSON payload per event. */
function send(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`)
}

router.post('/', async (req, res) => {
  const parsed = chatSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'Expected { messages: [{ role, content }] } with 1-20 short turns.',
    })
  }

  const { messages } = parsed.data

  // Both providers require the conversation to open with a user turn.
  if (messages[0].role !== 'user') {
    return res
      .status(400)
      .json({ error: 'invalid_request', message: 'Conversation must start with a user message.' })
  }

  if (!isConfigured) {
    return res.status(503).json({
      error: 'not_configured',
      message: 'The assistant is not set up yet. Please use the contact form.',
    })
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    // Stops nginx/proxies from buffering the stream into one lump
    'X-Accel-Buffering': 'no',
  })

  // If the visitor closes the tab mid-answer, stop paying for tokens.
  const controller = new AbortController()
  req.on('close', () => controller.abort())

  let provider
  try {
    provider = await getProvider()

    const { finishReason } = await provider.streamReply({
      messages,
      signal: controller.signal,
      onDelta: (text) => send(res, { type: 'delta', text }),
    })

    // Check the finish reason BEFORE trusting the output — a safety refusal
    // returns a successful response with empty or partial content, not an error.
    if (finishReason === 'refusal' || finishReason === 'content_filter') {
      send(res, {
        type: 'error',
        message: "I can't help with that one. Ask me about Muhammad's work instead.",
      })
    } else if (finishReason === 'max_tokens' || finishReason === 'length') {
      send(res, { type: 'notice', message: '…(response truncated)' })
    }

    send(res, { type: 'done' })
    res.end()
  } catch (err) {
    if (controller.signal.aborted) return res.end()

    const known = provider?.describeError?.(err) ?? null
    if (!known) console.error('[chat]', err)

    send(res, {
      type: 'error',
      message: known || 'Something went wrong reaching the assistant. Please try again.',
    })
    send(res, { type: 'done' })
    res.end()
  }
})

export default router
