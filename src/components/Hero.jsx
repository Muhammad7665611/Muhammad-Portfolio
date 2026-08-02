import { profile } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Download, ArrowRight, Mail, ArrowDown } from './Icons'
import './Hero.css'

export default function Hero() {
  const ref = useReveal()

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="shell">
        <div className="hero-card glass">
          <div className="hero-glow" aria-hidden="true" />

          <span className="hero-status reveal">
            <span className="pulse" />
            {profile.availability}
          </span>

          <h1 className="hero-title reveal" style={{ '--reveal-delay': '80ms' }}>
            {profile.name}
            <span className="sep"> | </span>
            <span className="grad">Full Stack Developer</span>
            <span className="sep"> | </span>
            <span className="grad">React Native Developer</span>
            <span className="sep"> | </span>
            <span className="grad">
              AI Integration Special
              <span className="caret-host">
                ist
                <span className="caret" aria-hidden="true" />
              </span>
            </span>
          </h1>

          <p className="hero-tagline reveal" style={{ '--reveal-delay': '160ms' }}>
            {profile.tagline}
          </p>

          <div className="hero-actions reveal" style={{ '--reveal-delay': '240ms' }}>
            <a className="btn btn-primary" href={profile.cvUrl} download>
              <Download width={18} height={18} />
              Download CV
            </a>
            <a className="btn btn-ghost" href="#projects">
              View Projects
              <ArrowRight width={18} height={18} />
            </a>
            <a className="btn btn-ghost" href="#contact">
              <Mail width={18} height={18} />
              Contact Me
            </a>
          </div>

          <dl className="hero-stats reveal" style={{ '--reveal-delay': '320ms' }}>
            <div>
              <dt>3+</dt>
              <dd>Years experience</dd>
            </div>
            <div>
              <dt>25+</dt>
              <dd>Projects shipped</dd>
            </div>
            <div>
              <dt>18</dt>
              <dd>Happy clients</dd>
            </div>
          </dl>
        </div>

        <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
          <ArrowDown width={18} height={18} />
          <span>Scroll</span>
        </a>
      </div>
    </section>
  )
}
