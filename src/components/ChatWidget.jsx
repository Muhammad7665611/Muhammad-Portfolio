import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { useChat } from '../hooks/useChat'
import { Send, Close, Spark } from './Icons'

/**
 * Chat bubble with three dots — the launcher reads as "message" at a glance,
 * which is a shape people already know how to use. Local to this file: it is
 * the only place that needs it.
 */
function MessageBubble(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.6 11.4a8.2 8.2 0 0 1-8.8 8.2 9.3 9.3 0 0 1-2.7-.4l-4.6 1.5 1.5-4.2a8 8 0 0 1-1.6-5.1 8.2 8.2 0 0 1 8.2-8.2 8.2 8.2 0 0 1 8 8.2Z" />
      <path d="M8.6 11.4h.01M12.2 11.4h.01M15.8 11.4h.01" />
    </svg>
  )
}
import './ChatWidget.css'

const SUGGESTIONS = [
  'What technologies does he work with?',
  'Tell me about Nura AI',
  'What experience does he have?',
  'How do I hire him?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const { messages, status, send, stop } = useChat()

  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  // Pin to the newest message as tokens stream in.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    send(draft)
    setDraft('')
  }

  const ask = (question) => {
    send(question)
    setDraft('')
  }

  const streaming = status === 'streaming'
  // Only offer the prompt chips on a fresh conversation.
  const showSuggestions = messages.length === 1 && !streaming

  return (
    <>
      <button
        className={`chat-fab ${open ? 'is-open' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant"
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        <MessageBubble width={23} height={23} />
        {/* Unread-style dot — the one thing that pulls the eye to a launcher
            that is otherwise a quiet, translucent circle. */}
        <span className="chat-fab-dot" aria-hidden="true" />
      </button>

      <div
        id="chat-panel"
        className={`chat-panel ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-label="AI assistant"
        aria-modal="false"
      >
        <header className="chat-head">
          <span className="chat-avatar" aria-hidden="true">
            <Spark width={17} height={17} />
          </span>
          <div className="chat-head-text">
            <strong>Ask about {profile.name.split(' ')[0]}</strong>
            <span>Answers from his portfolio only</span>
          </div>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close">
            <Close width={17} height={17} />
          </button>
        </header>

        <div className="chat-log" ref={scrollRef} role="log" aria-live="polite">
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1
            const pending = streaming && isLast && m.role === 'assistant' && !m.content

            return (
              <div className={`chat-msg is-${m.role}`} key={i}>
                <div className="chat-bubble">
                  {pending ? (
                    <span className="chat-typing" aria-label="Thinking">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            )
          })}

          {showSuggestions && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={submit}>
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask a question…"
            maxLength={2000}
            aria-label="Your question"
            disabled={streaming}
          />
          {streaming ? (
            <button type="button" onClick={stop} className="chat-send is-stop" aria-label="Stop">
              <span className="chat-stop-glyph" />
            </button>
          ) : (
            <button type="submit" className="chat-send" disabled={!draft.trim()} aria-label="Send">
              <Send width={17} height={17} />
            </button>
          )}
        </form>
      </div>
    </>
  )
}
