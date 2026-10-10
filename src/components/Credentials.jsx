import { education, certifications } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Check, ArrowUpRight } from './Icons'
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

function Shield(props) {
  return (
    <svg
      width={38}
      height={38}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 2.5 20 5.5v5.3c0 5-3.4 8.6-8 10.7-4.6-2.1-8-5.7-8-10.7V5.5l8-3Z" />
      <path d="m8.5 11.8 2.3 2.3 4.8-5" />
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
            Continuous learning. Practical growth.
          </p>
        </div>

        <div className="cred-grid">
          {/* ---------- Education ---------- */}
          <section className="cred-panel cred-education">
            <header className="cred-panel-head reveal">
              <span className="cred-panel-icon" aria-hidden="true">
                <Cap width={38} height={38} />
              </span>
              <div>
                <h3 className="cred-panel-title">Education</h3>
                <p className="cred-panel-subtitle">Building a strong foundation for a secure future.</p>
              </div>
            </header>

            <ol className="cred-timeline">
              {education.map((item, i) => (
                <li
                  className={`cred-education-item reveal ${item.current ? 'is-current' : ''}`}
                  key={item.qualification}
                  style={{ '--reveal-delay': `${i * 90}ms` }}
                >
                  <span className="cred-timeline-dot" aria-hidden="true" />
                  <div className="cred-education-content">
                    <span className="cred-education-period">{item.period}</span>
                    <h4 className="cred-title">{item.qualification}</h4>
                    <p className="cred-meta">{item.institute}</p>
                    <span className={`cred-education-status ${item.current ? 'is-current' : ''}`}>
                      {item.current ? 'Currently Pursuing' : 'Completed'}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- Certifications ---------- */}
          <section className="cred-panel cred-certifications">
            <header className="cred-panel-head reveal">
              <span className="cred-panel-icon" aria-hidden="true">
                <Shield />
              </span>
              <div>
                <h3 className="cred-panel-title">Certifications</h3>
                <p className="cred-panel-subtitle">
                  Hands-on learning from industry-leading programs.
                </p>
              </div>
            </header>

            <ul className="cred-cert-list">
              {certifications.map((item, i) => (
                <li
                  className="cred-certificate-card reveal"
                  key={item.title}
                  style={{ '--reveal-delay': `${i * 90}ms` }}
                >
                  {item.program && (
                    <div className="cred-program-progress">
                      <div className="cred-program-title-row">
                        <h4>{item.program}</h4>
                        <span className="cred-program-status">In Progress</span>
                      </div>
                      <div className="cred-progress-labels">
                        <span>
                          {item.programCompleted} of {item.programTotal} courses completed
                        </span>
                        <span>
                          {Math.round((item.programCompleted / item.programTotal) * 100)}%
                        </span>
                      </div>
                      <progress
                        className="cred-progress"
                        value={item.programCompleted}
                        max={item.programTotal}
                        aria-label={`${item.program}: ${item.programCompleted} of ${item.programTotal} courses completed`}
                      />
                    </div>
                  )}

                  <div className="cred-course">
                    <span
                      className={`cred-provider-mark${item.issuer === 'Google' ? ' is-google' : ''}${item.issuerLogo ? ' is-codealpha' : ''}`}
                    >
                      {item.issuerLogo ? (
                        <img src={item.issuerLogo} alt={`${item.issuer} logo`} />
                      ) : (
                        <span aria-hidden="true">
                          {item.issuer === 'Google' ? 'G' : <Check width={24} height={24} />}
                        </span>
                      )}
                    </span>

                    <div className="cred-course-content">
                      <div className="cred-course-heading">
                        <div>
                          <p className="cred-course-provider">
                            {item.issuer}
                            {item.platform && <><span aria-hidden="true"> · </span>{item.platform}</>}
                            {item.period && !item.platform && <><span aria-hidden="true"> · </span>{item.period}</>}
                          </p>
                          <h4 className="cred-title">{item.title}</h4>
                        </div>
                        <div className="cred-badges">
                          {item.grade && (
                            <span className="cred-grade" aria-label={`Course grade ${item.grade}`}>
                              {item.grade}
                            </span>
                          )}
                          {(item.status || item.documentUrl) && (
                            <span className="cred-status">
                              <Check width={13} height={13} />
                              {item.status || 'Completed'}
                            </span>
                          )}
                        </div>
                      </div>

                      {item.completedAt && (
                        <p className="cred-completed-date">Completed {item.completedAt}</p>
                      )}

                      {item.detail && item.program && (
                        <p className="cred-meta">
                          Fundamentals of security, threats, risks, and vulnerabilities.
                        </p>
                      )}

                      {item.certificateUrl || item.documentUrl ? (
                        <a
                          className="cred-certificate-link"
                          href={item.certificateUrl || item.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View certificate: ${item.title}`}
                        >
                          View Certificate
                          <ArrowUpRight width={15} height={15} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
