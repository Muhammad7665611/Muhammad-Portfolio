import { techStack, techStackGroups } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './Icons'
import './TechStack.css'

const brandMarks = {
  javascript: 'JS',
  typescript: 'TS',
  html: 'HTML',
  css: 'CSS',
  next: 'N',
  expo: 'Ex',
  flutter: 'Fl',
  database: 'DB',
  django: 'Dj',
  codex: 'Cx',
  claude: 'Cl',
  cursor: 'Cu',
  security: 'SEC',
  domains: 'SD',
  threats: 'TH',
  risks: 'RK',
  vulnerabilities: 'VUL',
  git: 'Git',
  linux: 'Lx',
  ubuntu: 'Ub',
}

function Technology({ tech }) {
  const hasBrandIcon = !brandMarks[tech.icon]

  return (
    <div className="tech-item">
      <span className="tech-icon" style={{ '--t-accent': tech.color }}>
        {hasBrandIcon ? (
          <Icon name={tech.icon} width={23} height={23} />
        ) : (
          <span className="tech-brand-mark" aria-hidden="true">
            {brandMarks[tech.icon]}
          </span>
        )}
      </span>
      <span className="tech-name">{tech.name}</span>
    </div>
  )
}

export default function TechStack() {
  const ref = useReveal()

  return (
    <section id="tech" className="section tech" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">My toolkit</span>
          <h2 className="section-title">
            Tech <span className="accent">Stack</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            The languages, frameworks, and tools I use to build products from
            interface to infrastructure.
          </p>
        </div>

        <div className="tech-groups">
          {techStackGroups.map((group, index) => {
            const technologies = group.technologies
              .map((name) => techStack.find((tech) => tech.name === name))
              .filter(Boolean)

            return (
              <article
                className="tech-group card reveal"
                key={group.title}
                style={{ '--reveal-delay': `${index * 75}ms` }}
              >
                <header className="tech-group-head">
                  <div>
                    <h3 className="tech-group-title">{group.title}</h3>
                    <p className="tech-group-description">{group.description}</p>
                  </div>
                  <span className="tech-group-count">
                    {String(technologies.length).padStart(2, '0')}
                  </span>
                </header>
                <div className="tech-items">
                  {technologies.map((tech) => (
                    <Technology key={tech.name} tech={tech} />
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
