import { useMemo, useState } from 'react'
import { projects, projectFilters } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import DeviceMock from './DeviceMock'
import { ArrowUpRight, GitHub, Check } from './Icons'
import './Projects.css'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const ref = useReveal()

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  )

  const countFor = (name) =>
    name === 'All' ? projects.length : projects.filter((p) => p.tags.includes(name)).length

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="shell">
        <div className="projects-head reveal">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <span className="eyebrow">
              <span className="dot" />
              Selected work
            </span>
            <h2 className="section-title">
              Projects<span className="accent">.</span>
            </h2>
            <p className="section-sub">
              A few things I&apos;ve designed, built and shipped. Filter by what you&apos;re looking for.
            </p>
          </div>

          <div className="project-filter" role="tablist" aria-label="Filter projects">
            <span className="project-filter-label">Project Filter</span>
            <div className="project-filter-chips">
              {projectFilters.map((name) => (
                <button
                  key={name}
                  role="tab"
                  aria-selected={filter === name}
                  className={`chip ${filter === name ? 'is-active' : ''}`}
                  onClick={() => setFilter(name)}
                >
                  {name}
                  <span className="chip-count">{countFor(name)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {visible.map((project, i) => (
            <article
              className="project-card glass reveal"
              key={project.title}
              style={{ '--p-accent': project.accent, '--reveal-delay': `${i * 90}ms` }}
            >
              <div className="project-preview">
                <DeviceMock
                  device={project.device}
                  variant={project.variant}
                  accent={project.accent}
                />
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-blurb">{project.blurb}</p>

                <ul className="project-features">
                  {project.features.map((f) => (
                    <li key={f}>
                      <Check width={14} height={14} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="project-stack">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    className="btn btn-primary btn-sm"
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                    <ArrowUpRight width={16} height={16} />
                  </a>
                  <a
                    className="btn btn-ghost btn-sm"
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHub width={16} height={16} />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="projects-empty">No projects in this category yet — check back soon.</p>
        )}
      </div>
    </section>
  )
}
