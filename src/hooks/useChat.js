import { useCallback, useRef, useState } from 'react'

import { API_BASE, apiUrl } from '../lib/apiBase'

const GREETING = {
  role: 'assistant',
  content:
    "Hi — I'm Muhammad's assistant. Ask me about his experience, skills, projects, or how to get in touch.",
}

/**
 * Drives the chat panel: owns the transcript, streams the reply token-by-token
 * from the SSE endpoint, and keeps a single in-flight request at a time.
 */
export function useChat() {
  const [messages, setMessages] = useState([GREETING])
  const [status, setStatus] = useState('idle') // idle | streaming | error
  const abortRef = useRef(null)

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([GREETING])
    setStatus('idle')
  }, [])

  const stop = useCallback(() => {
    abortRef.current?.abort()
    setStatus('idle')
  }, [])

  const send = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed || status === 'streaming') return

      const outgoing = { role: 'user', content: trimmed }

      // Drop the canned greeting before sending — it isn't part of the real
      // conversation, and the API requires the history to open with a user turn.
      const history = messages.filter((m) => m !== GREETING)
      const payload = [...history, outgoing].map(({ role, content }) => ({ role, content }))

      setMessages((prev) => [...prev, outgoing, { role: 'assistant', content: '' }])
      setStatus('streaming')

      const controller = new AbortController()
      abortRef.current = controller

      /** Append to the assistant bubble we just opened. */
      const appendToLast = (chunk) =>
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          next[next.length - 1] = { ...last, content: last.content + chunk }
          return next
        })

      try {
        const res = await fetch(apiUrl('/api/chat'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) {
          const detail = await res.json().catch(() => ({}))
          // The API sends a visitor-safe `message` on every error shape
          // (503 not_configured, 429 rate_limited, 400 invalid_request).
          // Surface it rather than replacing it with a generic string.
          throw new Error(detail.message || `The assistant is unavailable (${res.status}).`)
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        // SSE frames are separated by a blank line and may split across chunks,
        // so hold a buffer and only consume complete frames.
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const frames = buffer.split('\n\n')
          buffer = frames.pop() ?? ''

          for (const frame of frames) {
            const line = frame.split('\n').find((l) => l.startsWith('data: '))
            if (!line) continue

            let event
            try {
              event = JSON.parse(line.slice(6))
            } catch {
              continue
            }

            if (event.type === 'delta') appendToLast(event.text)
            else if (event.type === 'notice') appendToLast(` ${event.message}`)
            else if (event.type === 'error') {
              appendToLast(event.message)
              setStatus('error')
            }
          }
        }

        setStatus((s) => (s === 'error' ? 'error' : 'idle'))
      } catch (err) {
        if (err.name === 'AbortError') return

        // fetch() rejects with a TypeError when the request never reached a
        // server at all — DNS, CORS, or (usually, in dev) nothing listening.
        const unreachable = err instanceof TypeError

        if (unreachable && import.meta.env.DEV) {
          console.error(
            `[chat] Could not reach ${API_BASE || window.location.origin}. Is the API running? Start it with:\n` +
              '  npm run dev:api'
          )
        }

        const fallback = unreachable
          ? "I couldn't reach the assistant just now. Please use the contact form below and Muhammad will reply directly."
          : err.message

        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          // Replace the empty bubble rather than leaving a blank one behind.
          next[next.length - 1] = { ...last, content: last.content || fallback }
          return next
        })
        setStatus('error')
      } finally {
        abortRef.current = null
      }
    },
    [messages, status]
  )

  return { messages, status, send, stop, reset }
}
