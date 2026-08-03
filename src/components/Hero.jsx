import { profile, about } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Download, ArrowRight, Mail } from './Icons'
import promoCard from '../assets/my-self.jpeg'
import './Hero.css'

export default function Hero() {
  const ref = useReveal()

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="shell">
        <div className="hero-grid">
          {/* ---------- Left: copy + actions ---------- */}
          <div className="hero-copy">
            <span className="eyebrow reveal">Hello, I am</span>

            <h1 className="hero-title reveal" style={{ '--reveal-delay': '80ms' }}>
              {profile.name}
              <span className="hero-dot">.</span>
            </h1>

            <p className="hero-roles reveal" style={{ '--reveal-delay': '140ms' }}>
              {profile.roles.map((role, i) => (
                <span key={role}>
                  {i > 0 && <span className="sep"> / </span>}
                  {role}
                </span>
              ))}
              <span className="caret" aria-hidden="true" />
            </p>

            <p className="hero-tagline reveal" style={{ '--reveal-delay': '200ms' }}>
              {profile.tagline}
            </p>

            <div className="hero-actions reveal" style={{ '--reveal-delay': '260ms' }}>
              <a className="btn btn-primary" href={profile.cvUrl} download>
                <Download width={18} height={18} />
                Download CV
              </a>
              <a className="btn btn-outline" href="#projects">
                View Projects
                <ArrowRight width={18} height={18} />
              </a>
              <a className="btn btn-dark" href="#contact">
                <Mail width={18} height={18} />
                Contact Me
              </a>
            </div>

            <span className="hero-status reveal" style={{ '--reveal-delay': '320ms' }}>
              <span className="pulse" aria-hidden="true" />
              {profile.availability}
            </span>

            {/* Driven by about.facts so the hero can't contradict the About
                section — first three entries only. */}
            <dl className="hero-stats reveal" style={{ '--reveal-delay': '380ms' }}>
              {about.facts.slice(0, 3).map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------- Right: portrait panel ---------- */}
          <div className="hero-media reveal" style={{ '--reveal-delay': '200ms' }}>
            <div className="hero-portrait">
              {/* Shown whole, not cropped — the card's own text sits at the
                  very top and bottom of the artwork. */}
              <img
                className="portrait-photo"
                src={promoCard}
                alt={`${profile.name} — ${profile.roles.join(', ')}`}
                width="816"
                height="1306"
                /* lowercase on purpose: React 18 only passes this through as a
                   raw DOM attribute; the camelCase form landed in React 19 */
                fetchpriority="high"
              />
            </div>
          </div>
        </div>

        {/* Scroll cue — orange mouse glyph with a dot that nudges downward */}
        <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
          <span className="mouse" aria-hidden="true">
            <span className="mouse-dot" />
          </span>
          <span>Scroll</span>
        </a>
      </div>
    </section>
  )
}
