import { about, profile } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Check, MapPin, Mail, ArrowRight, Download } from './Icons'
import portrait from '../assets/myself.jpeg'
import './About.css'

/**
 * Thin line-art constellation drawn over the portrait — overlapping triangles
 * and a star polygon, 1px white strokes, no fills.
 */
function PortraitWire() {
  return (
    <svg
      className="about-wire"
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1">
        <polygon points="200,26 386,470 14,470" />
        <polygon points="200,494 24,114 376,150" />
        {/* Five-point star polygon (self-crossing, unfilled) */}
        <polygon points="200,70 317.6,431.8 9.8,208.2 390.2,208.2 82.4,431.8" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1">
        <polygon points="60,52 348,288 94,472" />
        <polygon points="346,70 116,262 368,448" />
        <circle cx="200" cy="268" r="152" />
      </g>
    </svg>
  )
}

/** Which fact in the strip is rendered as the solid-accent highlight cell. */
const HIGHLIGHT_FACT = 1

export default function About() {
  const ref = useReveal()

  // The badge shows the real figure from the data ("3+ years" -> "3+"), with
  // the wording moved into the caption underneath it.
  const experience = about.facts.find((f) => f.label === 'Experience') ?? about.facts[0]
  const years = experience.value.replace(/[^0-9+]/g, '') || experience.value

  return (
    <section id="about" className="section" ref={ref}>
      <div className="shell">
        <div className="about-grid">
          {/* ---------- Left: image panel + experience badge ---------- */}
          <div className="about-media reveal">
            <div className="about-portrait">
              {/* Desaturated by default, colour returning on hover — mirrors
                  the reference's black-and-white about photo. */}
              <img
                className="about-photo"
                src={portrait}
                alt={`${profile.name}, ${profile.roles[0]}`}
                width="914"
                height="1280"
                loading="lazy"
              />
              <PortraitWire />
            </div>

            {/* Ticket badge with a torn top edge, overlapping the bottom-left corner */}
            <div className="about-badge">
              <span className="about-badge-num">{years}</span>
              <span className="about-badge-label">
                Years of
                <br />
                Experience
              </span>
            </div>
          </div>

          {/* ---------- Right: copy, details, actions ---------- */}
          <div className="about-body">
            <div className="about-head reveal">
              <span className="eyebrow">Get to know me</span>
              <h2 className="section-title">
                About <span className="accent">Me</span>
              </h2>
              <span className="title-rule" />
            </div>

            <h3 className="about-heading reveal" style={{ '--reveal-delay': '80ms' }}>
              Full Stack Developer building for web &amp; mobile
            </h3>

            <p className="about-lead reveal" style={{ '--reveal-delay': '120ms' }}>
              A short version of the story — what I build, how I work, and where I am right now.
            </p>

            {about.paragraphs.map((text, i) => (
              <p
                key={i}
                className="about-text reveal"
                style={{ '--reveal-delay': `${160 + i * 60}ms` }}
              >
                {text}
              </p>
            ))}

            <ul className="about-details reveal" style={{ '--reveal-delay': '300ms' }}>
              {about.details.map((d) => (
                <li key={d.label}>
                  <Check width={15} height={15} className="about-tick" />
                  <span className="about-detail-label">{d.label}</span>
                  <span className="about-detail-value">{d.value}</span>
                </li>
              ))}
            </ul>

            <div className="about-meta reveal" style={{ '--reveal-delay': '340ms' }}>
              <span>
                <MapPin width={15} height={15} />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`}>
                <Mail width={15} height={15} />
                {profile.email}
              </a>
            </div>

            <div className="about-actions reveal" style={{ '--reveal-delay': '380ms' }}>
              <a className="btn btn-primary" href="#contact">
                Hire Me!
                <ArrowRight width={18} height={18} />
              </a>
              <a className="btn btn-outline" href={profile.cvUrl} download>
                <Download width={18} height={18} />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Stat strip ---------- */}
        <div className="about-facts reveal">
          {about.facts.map((f, i) => (
            <div
              className={`about-fact${i === HIGHLIGHT_FACT ? ' is-highlight' : ''}`}
              key={f.label}
            >
              <span className="about-fact-value">{f.value}</span>
              <span className="about-fact-label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
