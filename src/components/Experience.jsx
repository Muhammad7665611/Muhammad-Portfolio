import { experience } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import './Experience.css'

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Where I&apos;ve worked
          </span>
          <h2 className="section-title">
            Experience<span className="accent">.</span>
          </h2>
          <p className="section-sub">
            Three years of shipping — the roles, the responsibilities, and what came out of them.
          </p>
        </div>

        <ol className="timeline">
          {experience.map((job, i) => (
            <li
              className="timeline-item reveal"
              key={job.role + job.period}
              style={{ '--reveal-delay': `${i * 110}ms` }}
            >
              <div className="timeline-date">
                <span className="timeline-period">{job.period}</span>
                {job.current && <span className="timeline-now">Current</span>}
              </div>

              <div className="timeline-marker" aria-hidden="true">
                <span className={`timeline-dot ${job.current ? 'is-current' : ''}`} />
              </div>

              <article className="timeline-card glass">
                <header className="timeline-head">
                  <h3 className="timeline-role">{job.role}</h3>
                  <span className="timeline-company">{job.company}</span>
                </header>

                <p className="timeline-summary">{job.summary}</p>

                <ul className="timeline-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <div className="timeline-stack">
                  {job.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
