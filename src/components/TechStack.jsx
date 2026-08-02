import { techStack } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './Icons'
import './TechStack.css'

export default function TechStack() {
  const ref = useReveal()

  return (
    <section id="tech" className="section tech" ref={ref}>
      <div className="shell">
        <div className="section-head center reveal">
          <span className="eyebrow">
            <span className="dot" />
            Daily drivers
          </span>
          <h2 className="section-title">
            Tech <span className="accent">Stack</span>
          </h2>
          <p className="section-sub">
            The technologies behind most of what I ship.
          </p>
        </div>

        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <div
              className="tech-tile glass reveal"
              key={tech.name}
              style={{ '--t-accent': tech.color, '--reveal-delay': `${i * 55}ms` }}
            >
              <div className="tech-icon">
                <Icon name={tech.icon} width={34} height={34} />
              </div>
              <span className="tech-name">{tech.name}</span>
              <span className="tech-halo" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Continuous marquee of the same stack — adds motion without noise */}
        <div className="tech-marquee reveal" aria-hidden="true">
          <div className="tech-marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span className="tech-marquee-item" key={`${tech.name}-${i}`}>
                <Icon name={tech.icon} width={18} height={18} style={{ color: tech.color }} />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
