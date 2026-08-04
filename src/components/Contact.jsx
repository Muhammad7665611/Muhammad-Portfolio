import { useEffect, useRef, useState } from 'react'
import { profile, socials, contactForm } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon, Send, Mail, Phone, MapPin, Check } from './Icons'
import { apiUrl } from '../lib/apiBase'
import './Contact.css'

const EMPTY = { name: '', email: '', message: '' }

// Shown when a send succeeds without the server supplying its own wording —
// i.e. the FormSubmit fallback. Matches what the API returns, so the two paths
// are indistinguishable to a visitor.
const SENT_NOTE = 'Thanks — your message has been sent. I usually reply within 24 hours.'

/** The API keys its 400 messages by field name; keep the ones this form renders. */
const fieldErrorsFrom = (fields = {}) => ({
  name: fields.name,
  email: fields.email,
  message: fields.message,
})

export default function Contact() {
  const ref = useReveal()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  // idle → sending → sent | error
  const [status, setStatus] = useState('idle')
  const [failure, setFailure] = useState('')
  const [notice, setNotice] = useState('')
  const [copied, setCopied] = useState(false)
  // Honeypot: real people never see it, bots fill it in.
  const botField = useRef(null)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell me your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'That email address looks off.'
    if (form.message.trim().length < 10) next.message = 'A little more detail helps — 10+ characters.'
    return next
  }

  // Drop the confirmation after a beat so the button returns to "Contact" and
  // the form reads as ready for another message. Cleared on unmount.
  useEffect(() => {
    if (status !== 'sent') return undefined
    const timer = setTimeout(() => setStatus('idle'), 6000)
    return () => clearTimeout(timer)
  }, [status])

  /** Copy the composed message so it can be pasted into any mail client. */
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(
        `${form.message}\n\n— ${form.name} (${form.email})`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  /**
   * Our own API. Separates "nothing there to talk to" — worth retrying
   * elsewhere — from "answered, and said no", which the visitor must hear.
   */
  const sendViaApi = async (payload) => {
    let res
    try {
      res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      // fetch() rejects with a TypeError only when the request never reached a
      // server at all — DNS, CORS, or (usually, in dev) nothing listening.
      if (err instanceof TypeError) return { unavailable: true }
      throw err
    }

    // 503 is the API telling us it has no delivery path configured yet. It is
    // the only status worth re-sending elsewhere; the rest are ours to own.
    if (res.status === 503) return { unavailable: true }

    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok !== true)
      return { message: data.message || `Server responded ${res.status}`, fields: data.fields }

    return { ok: true, message: data.message }
  }

  /**
   * Third-party fallback, kept so the form still delivers in deployments where
   * the API isn't up yet. Resolves on success, throws on anything else.
   */
  const sendViaFormSubmit = async ({ name, email, message }) => {
    const res = await fetch(contactForm.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio enquiry from ${name}`,
        _template: 'table',
        _captcha: 'false',
        // Ignored by FormSubmit, required by Web3Forms — harmless either way.
        access_key: contactForm.accessKey,
      }),
    })

    const data = await res.json().catch(() => ({}))
    // FormSubmit returns success as the string "true"; Web3Forms uses a boolean.
    const ok = res.ok && (data.success === true || data.success === 'true')
    if (!ok) throw new Error(data.message || `Server responded ${res.status}`)
  }

  /**
   * Wipe the fields and any leftover validation errors so the form is genuinely
   * fresh, not just visually cleared.
   */
  const confirm = (message) => {
    setNotice(message || SENT_NOTE)
    setStatus('sent')
    setForm(EMPTY)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    setFailure('')

    // The honeypot travels with the payload: the API answers a tripped one with
    // a normal-looking success and quietly drops it, which is a better place for
    // that decision than the client, where a bot can read the code.
    const payload = {
      name: form.name,
      email: form.email,
      message: form.message,
      botcheck: botField.current?.value || '',
    }

    try {
      const result = await sendViaApi(payload)

      if (result.ok) {
        confirm(result.message)
        return
      }

      if (!result.unavailable) {
        // A real answer from our API — 400, 429 or 500. Show it as-is and stop;
        // falling through would deliver the same message a second time.
        if (result.fields) setErrors(fieldErrorsFrom(result.fields))
        throw new Error(result.message)
      }

      // No API to hand the honeypot to, so make the call here instead: accept
      // and discard, rather than forwarding a bot into a real inbox.
      if (payload.botcheck) {
        confirm()
        return
      }

      await sendViaFormSubmit(payload)
      confirm()
    } catch (err) {
      setFailure(err.message || '')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">Let&apos;s build something</span>
          <h2 className="section-title">
            Contact<span className="accent">.</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            Need help? Fill in the form to get a quote and I&apos;ll get back to you soon — or
            reach me directly through the details on the right.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form card reveal" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={update('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <span className="field-error" id="err-name">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={update('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <span className="field-error" id="err-email">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                rows={5}
                placeholder="Tell me about the project, the timeline, and what success looks like."
                value={form.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-message' : undefined}
              />
              {errors.message && (
                <span className="field-error" id="err-message">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Honeypot — off-screen and untabbable, so only bots ever fill it */}
            <input
              ref={botField}
              type="text"
              name="botcheck"
              className="contact-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <button
              className="btn btn-primary contact-submit"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' && (
                <>
                  <span className="contact-spinner" aria-hidden="true" />
                  Sending…
                </>
              )}
              {status === 'sent' && (
                <>
                  <Check width={18} height={18} />
                  Message sent
                </>
              )}
              {(status === 'idle' || status === 'error') && (
                <>
                  <Send width={18} height={18} />
                  {status === 'error' ? 'Try again' : 'Contact'}
                </>
              )}
            </button>

            <p
              className={`contact-note${status === 'sent' ? ' is-ok' : ''}${
                status === 'error' ? ' is-error' : ''
              }`}
              role="status"
              aria-live="polite"
            >
              {status === 'sent' && (notice || SENT_NOTE)}
              {status === 'sending' && 'Sending your message…'}
              {status === 'error' && (
                <>
                  That didn&apos;t go through{failure ? ` (${failure})` : ''}. You can{' '}
                  <button type="button" className="contact-copy" onClick={copyMessage}>
                    {copied ? 'copied!' : 'copy your message'}
                  </button>{' '}
                  and email it to {profile.email}.
                </>
              )}
              {status === 'idle' && 'I read every message personally — no auto-responders.'}
            </p>
          </form>

          {/* Details */}
          <aside className="contact-side reveal" style={{ '--reveal-delay': '120ms' }}>
            <div className="contact-card card">
              <h3 className="contact-card-title">Contact details</h3>
              <span className="contact-card-rule" />

              <ul className="contact-list">
                <li>
                  <span className="contact-ico">
                    <Mail width={18} height={18} />
                  </span>
                  <span className="contact-pair">
                    <span className="contact-label">Email</span>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </span>
                </li>
                <li>
                  <span className="contact-ico">
                    <Phone width={18} height={18} />
                  </span>
                  <span className="contact-pair">
                    <span className="contact-label">Phone</span>
                    <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
                  </span>
                </li>
                <li>
                  <span className="contact-ico">
                    <MapPin width={18} height={18} />
                  </span>
                  <span className="contact-pair">
                    <span className="contact-label">Location</span>
                    <span>{profile.location}</span>
                  </span>
                </li>
              </ul>

              <div className="contact-socials">
                <span className="contact-label">Find me online</span>
                {/* Uniform orange-fill squares — no per-network brand colouring. */}
                <div className="social-row">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                      aria-label={s.name}
                      title={s.name}
                    >
                      <Icon name={s.icon} width={19} height={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-cta card">
              <span className="pulse" />
              <div>
                <strong>{profile.availability}</strong>
                <p>Typical reply time is under 24 hours.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
