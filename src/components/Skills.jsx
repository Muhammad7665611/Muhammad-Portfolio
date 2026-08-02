import { skillGroups } from '../data/portfolio'
import { useReveal, useInView } from '../hooks/useReveal'
import './Skills.css'

function SkillCard({ group, index }) {
  const [ref, inView] = useInView({ threshold: 0.25 })

  return (
    <article
      ref={ref}
      className="skill-card glass reveal"
      style={{ '--accent-c': group.accent, '--reveal-delay': `${index * 70}ms` }}
    >
      <header className="skill-head">
        <span className="skill-chip">{group.title}</span>
        <span className="skill-count">{group.skills.length} skills</span>
      </header>

      <ul className="skill-list">
        {group.skills.map((skill, i) => (
          <li key={skill.name}>
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
          <span className="eyebrow">
            <span className="dot" />
            What I work with
          </span>
          <h2 className="section-title">
            Skills<span className="accent">.</span>
          </h2>
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
