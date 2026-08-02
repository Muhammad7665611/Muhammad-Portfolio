import { about, profile } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Check, MapPin, Mail } from './Icons'
import './About.css'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Get to know me
          </span>
          <h2 className="section-title">
            About <span className="accent">Me</span>
          </h2>
          <p className="section-sub">
            A short version of the story — what I build, how I work, and where I am right now.
          </p>
        </div>

        <div className="about-grid">
          {/* Portrait */}
          <div className="about-media reveal">
            <div className="portrait glass">
              <div className="portrait-inner">
                {/* Placeholder silhouette — drop a real photo in here when ready */}
                <svg viewBox="0 0 200 240" className="portrait-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="pgrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7c5cff" stopOpacity=".55" />
                      <stop offset="1" stopColor="#22d3ee" stopOpacity=".35" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="82" r="42" fill="url(#pgrad)" />
                  <path d="M22 240c0-45 35-78 78-78s78 33 78 78Z" fill="url(#pgrad)" />
                </svg>
                <span className="portrait-hint">Your photo here</span>
              </div>
              <div className="portrait-ring" aria-hidden="true" />
            </div>

            <div className="about-badge glass">
              <span className="about-badge-num">3+</span>
              <span className="about-badge-label">
                Years
                <br />
                experience
              </span>
            </div>
          </div>

          {/* Copy */}
          <div className="about-body">
            <h3 className="about-heading reveal">
              Full Stack Developer building for web &amp; mobile
            </h3>

            {about.paragraphs.map((text, i) => (
              <p
                key={i}
                className="about-text reveal"
                style={{ '--reveal-delay': `${80 + i * 60}ms` }}
              >
                {text}
              </p>
            ))}

            <ul className="about-details reveal" style={{ '--reveal-delay': '260ms' }}>
              {about.details.map((d) => (
                <li key={d.label}>
                  <Check width={16} height={16} className="tick" />
                  <span className="about-detail-label">{d.label}</span>
                  <span className="about-detail-value">{d.value}</span>
                </li>
              ))}
            </ul>

            <div className="about-meta reveal" style={{ '--reveal-delay': '320ms' }}>
              <span>
                <MapPin width={16} height={16} />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`}>
                <Mail width={16} height={16} />
                {profile.email}
              </a>
            </div>
          </div>
        </div>

        {/* Fact strip */}
        <div className="about-facts reveal">
          {about.facts.map((f) => (
            <div className="fact glass" key={f.label}>
              <span className="fact-value">{f.value}</span>
              <span className="fact-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
