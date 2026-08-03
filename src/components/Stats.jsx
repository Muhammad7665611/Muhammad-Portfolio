import { experience, certifications } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import './Stats.css'

/* Bare numbers band — no heading, just four boxes, exactly one solid orange.
   Counts are derived from the CV data so they can never drift out of sync;
   only the tenure figure is written by hand (first role started Jan 2025). */
const companies = new Set(experience.map((job) => job.company)).size

const STATS = [
  { value: '1.5+', label: 'Years Experience' },
  { value: String(experience.length), label: 'Roles Held', highlight: true },
  { value: String(companies), label: 'Companies' },
  { value: String(certifications.length), label: 'Certifications' },
]

export default function Stats() {
  const ref = useReveal()

  return (
    <section id="stats" className="stats" ref={ref} aria-label="Work in numbers">
      <div className="shell">
        <ul className="stats-row">
          {STATS.map((stat, i) => (
            <li
              className={`stat-box reveal${stat.highlight ? ' is-highlight' : ''}`}
              key={stat.label}
              style={{ '--reveal-delay': `${i * 90}ms` }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-rule" aria-hidden="true" />
              <span className="stat-label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
