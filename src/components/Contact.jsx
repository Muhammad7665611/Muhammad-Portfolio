import { useState } from 'react'
import { profile, socials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon, Send, Mail, Phone, MapPin, Check } from './Icons'
import './Contact.css'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const ref = useReveal()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return

    // No backend wired up — hand the message to the visitor's mail client.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`

    setSent(true)
    setForm(EMPTY)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Let&apos;s build something
          </span>
          <h2 className="section-title">
            Contact<span className="accent">.</span>
          </h2>
          <p className="section-sub">
            Need help? Fill in the form to get a quote and I&apos;ll get back to you soon — or
            reach me directly through the details on the right.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <form className="contact-form glass reveal" onSubmit={handleSubmit} noValidate>
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

            <button className="btn btn-primary contact-submit" type="submit">
              {sent ? (
                <>
                  <Check width={18} height={18} />
                  Opening your mail app
                </>
              ) : (
                <>
                  <Send width={18} height={18} />
                  Contact
                </>
              )}
            </button>

            <p className="contact-note" role="status">
              {sent
                ? 'Your message was handed to your email client — hit send there and it reaches me.'
                : 'Submitting opens your email client with the message pre-filled.'}
            </p>
          </form>

          {/* Details */}
          <aside className="contact-side reveal" style={{ '--reveal-delay': '120ms' }}>
            <div className="contact-card glass">
              <h3 className="contact-card-title">Contact details</h3>

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
                <div className="social-row">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                      style={{ '--s-accent': s.color }}
                      aria-label={s.name}
                      title={s.name}
                    >
                      <Icon name={s.icon} width={19} height={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-cta glass">
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
