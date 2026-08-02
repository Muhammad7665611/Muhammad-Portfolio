import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Star, Quote } from './Icons'
import './Testimonials.css'

export default function Testimonials() {
  const ref = useReveal()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // On narrow screens the track becomes a scroll-snap carousel; keep the dots
  // in sync with wherever the user has scrolled it.
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track || track.scrollWidth <= track.clientWidth + 4) return
    const index = Math.round(track.scrollLeft / (track.scrollWidth / testimonials.length))
    setActive(Math.min(testimonials.length - 1, Math.max(0, index)))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', syncActive, { passive: true })
    return () => track.removeEventListener('scroll', syncActive)
  }, [syncActive])

  const goTo = (i) => {
    const track = trackRef.current
    setActive(i)
    if (!track) return
    track.scrollTo({ left: (track.scrollWidth / testimonials.length) * i, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Kind words
          </span>
          <h2 className="section-title">
            Testimonials<span className="accent">.</span>
          </h2>
          <p className="section-sub">
            What the people I&apos;ve built for have to say about working together.
          </p>
        </div>

        <div className="t-track" ref={trackRef}>
          {testimonials.map((t, i) => (
            <figure
              className="t-card glass reveal"
              key={t.name}
              style={{ '--t-accent': t.accent, '--reveal-delay': `${i * 90}ms` }}
            >
              <Quote className="t-quote" width={30} height={30} aria-hidden="true" />

              <blockquote className="t-text">{t.quote}</blockquote>

              <div
                className="t-stars"
                role="img"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} width={15} height={15} filled={s < t.rating} />
                ))}
              </div>

              <figcaption className="t-person">
                <span className="t-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span className="t-meta">
                  <span className="t-name">{t.name}</span>
                  <span className="t-role">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="t-dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              className={`t-dot ${active === i ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${t.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
