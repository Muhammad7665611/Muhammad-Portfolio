import { useCallback, useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Star, Quote } from './Icons'
import './Testimonials.css'

export default function Testimonials() {
  const ref = useReveal()
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // The track is a centre-snapping carousel at every breakpoint: the card
  // nearest the middle of the scrollport is the "active" one, its neighbours
  // stay scrimmed at the edges. Keep the dashes below in sync with it.
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track || track.scrollWidth <= track.clientWidth + 4) return
    const centre = track.scrollLeft + track.clientWidth / 2
    let nearest = 0
    let smallest = Infinity
    Array.from(track.children).forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre)
      if (distance < smallest) {
        smallest = distance
        nearest = i
      }
    })
    setActive(Math.min(testimonials.length - 1, Math.max(0, nearest)))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener('scroll', syncActive, { passive: true })
    return () => track.removeEventListener('scroll', syncActive)
  }, [syncActive])

  // Bring the chosen card to the middle of the track. Measuring the card itself
  // keeps this exact whatever the card width resolves to at this breakpoint.
  const goTo = (i) => {
    const track = trackRef.current
    setActive(i)
    const card = track?.children[i]
    if (!card) return
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

  return (
    <section id="testimonials" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">Kind words</span>
          <h2 className="section-title">
            Testimonials<span className="accent">.</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            What the people I&apos;ve built for have to say about working together.
          </p>
        </div>

        <div
          className="t-track"
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="Testimonials carousel"
        >
          {testimonials.map((t, i) => (
            <figure
              className={`t-card card reveal ${active === i ? 'is-active' : ''}`}
              key={t.name}
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <Quote className="t-quote" width={46} height={46} aria-hidden="true" />

              {/* Circle is the one allowed exception to the sharp-edge rule */}
              <span className="t-avatar" aria-hidden="true">
                {t.initials}
              </span>

              <blockquote className="t-text">{t.quote}</blockquote>

              <div className="t-stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} width={15} height={15} filled={s < t.rating} />
                ))}
              </div>

              <figcaption className="t-person">
                <span className="t-name">{t.name}</span>
                <span className="t-role">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Pagination: short dashes, the active one accent and twice as wide */}
        <div className="t-dots" role="group" aria-label="Choose a testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`t-dot ${active === i ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={active === i ? 'true' : undefined}
            >
              <span className="t-dash" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
