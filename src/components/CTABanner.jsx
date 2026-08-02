import { useReveal } from '../hooks/useReveal'
import './CTABanner.css'

/**
 * Full-width availability band. Stands in for the reference's photographic
 * panel with a flat textured surface, a hairline border and one solid orange
 * call to action.
 */
export default function CTABanner() {
  const ref = useReveal()

  return (
    <section id="cta" className="cta" ref={ref} aria-labelledby="cta-title">
      <div className="shell">
        <div className="cta-panel">
          <div className="cta-content reveal">
            <span className="cta-kicker reveal">Have any Project in mind?</span>

            <h2 className="cta-title reveal" id="cta-title" style={{ '--reveal-delay': '90ms' }}>
              I&apos;m Available for Freelancing
            </h2>

            <a
              className="btn btn-primary cta-btn reveal"
              href="#contact"
              style={{ '--reveal-delay': '180ms' }}
            >
              Hire Me!
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
