import { skillGroups } from '../data/portfolio'
import { useReveal, useInView } from '../hooks/useReveal'
import './Skills.css'

/**
 * One group panel — a flat rectangle with a small accent uppercase title and a
 * stack of thin gradient bars that fill once the card scrolls into view.
 */
function SkillCard({ group, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <article
      ref={ref}
      className="skill-card card reveal"
      style={{ '--reveal-delay': `${index * 70}ms` }}
    >
      <header className="skill-head">
        <h3 className="skill-group">{group.title}</h3>
        <span className="skill-count">{group.skills.length} skills</span>
      </header>

      <ul className="skill-list">
        {group.skills.map((skill, i) => (
          <li key={skill.name} className="skill-item">
            {/* Label row sits above the bar: NAME ............ 95% */}
            <div className="skill-row">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-pct">{skill.level}%</span>
            </div>

            <div
              className="skill-track"
              role="progressbar"
              aria-valuenow={skill.level}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${skill.name} proficiency`}
            >
              <span
                className="skill-fill"
                style={{
                  width: inView ? `${skill.level}%` : '0%',
                  transitionDelay: `${i * 110}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">What I work with</span>
          <h2 className="section-title">
            Skills<span className="accent">.</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            The tools I reach for most, grouped by where they sit in the stack.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
