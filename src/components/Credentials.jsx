import { education, certifications } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Check } from './Icons'
import './Credentials.css'

/**
 * Academic cap — defined locally rather than in Icons.jsx so this section owns
 * the only glyph it needs.
 */
function Cap(props) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.5 8.5 12 4l9.5 4.5L12 13 2.5 8.5Z" />
      <path d="M6.5 10.6V16c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-5.4" />
      <path d="M21.5 8.5v5" />
    </svg>
  )
}

export default function Credentials() {
  const ref = useReveal()

  return (
    <section id="education" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">Background</span>
          <h2 className="section-title">
            Education &amp; <span className="accent">Certifications</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            Where the formal grounding comes from, and what I&apos;ve certified along the way.
          </p>
        </div>

        <div className="cred-grid">
          {/* ---------- Education ---------- */}
          <div className="cred-col">
            <h3 className="cred-col-title reveal">Education</h3>

            <ol className="cred-list">
              {education.map((item, i) => (
                <li
                  className="cred-item reveal"
                  key={item.qualification}
                  style={{ '--reveal-delay': `${i * 90}ms` }}
                >
                  <span className="cred-icon" aria-hidden="true">
                    <Cap />
                  </span>

                  <div className="cred-body">
                    <span className="cred-period">{item.period}</span>
                    <h4 className="cred-title">{item.qualification}</h4>
                    <p className="cred-meta">{item.institute}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- Certifications ---------- */}
          <div className="cred-col">
            <h3 className="cred-col-title reveal">Certifications</h3>

            <ul className="cred-list">
              {certifications.map((item, i) => (
                <li
                  className="cred-item is-cert reveal"
                  key={item.title}
                  style={{ '--reveal-delay': `${i * 90}ms` }}
                >
                  <span className="cred-icon" aria-hidden="true">
                    <Check width={20} height={20} />
                  </span>

                  <div className="cred-body">
                    <h4 className="cred-title">{item.title}</h4>
                    <p className="cred-meta">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
