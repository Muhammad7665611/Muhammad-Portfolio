import { useReveal } from '../hooks/useReveal'
import './Stats.css'

/* Bare numbers band — no heading, just four boxes. Exactly one (Projects)
   is solid orange, mirroring the reference layout. */
const STATS = [
  { value: '18', label: 'Clients' },
  { value: '25+', label: 'Projects', highlight: true },
  { value: '6', label: 'Awards' },
  { value: '3+', label: 'Years Experience' },
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
