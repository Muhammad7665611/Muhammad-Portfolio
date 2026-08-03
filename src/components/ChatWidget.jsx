import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { useChat } from '../hooks/useChat'
import { Send, Close, Spark } from './Icons'
import './ChatWidget.css'

const SUGGESTIONS = [
  'What has he worked on?',
  'Which projects suit my startup?',
  'What are his strongest skills?',
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
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        {open ? <Close width={20} height={20} /> : <Spark width={20} height={20} />}
        {!open && <span className="chat-fab-label">Ask AI</span>}
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
            <span>AI assistant · answers from his portfolio only</span>
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
