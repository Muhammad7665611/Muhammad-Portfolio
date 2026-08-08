import { useMemo, useState } from 'react'
import { projects, projectFilters, socials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import DeviceMock from './DeviceMock'
import { ArrowRight, ArrowUpRight, GitHub, Check } from './Icons'
import './Projects.css'

/** Where the "View All" button points — the GitHub profile from the data file. */
const allWorkUrl = socials.find((s) => s.name === 'GitHub')?.url ?? '#projects'

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
        <div className="section-head center reveal">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">
            Projects<span className="accent">.</span>
          </h2>
          <span className="title-rule" />
          <p className="section-sub">
            A few things I&apos;ve designed, built and shipped. Filter by what you&apos;re looking for.
          </p>
        </div>

        <div className="project-filter reveal" style={{ '--reveal-delay': '80ms' }}>
          <span className="project-filter-label" id="project-filter-label">
            Project Filter
          </span>
          <div className="project-filter-chips" role="tablist" aria-labelledby="project-filter-label">
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

        {/* Every card stays mounted — filtering only toggles `is-filtered`, so the
            scroll-reveal observer (which runs once) never loses track of a tile and
            the accent feature panel keeps its slot in the grid. */}
        <div className="projects-grid">
          {projects.map((project, i) => {
            const isFeature = (i + 1) % 4 === 0 // every 4th tile = solid accent panel
            const isHidden = !visible.includes(project)

            return (
              <article
                key={project.title}
                className={`project-card card reveal${isFeature ? ' is-feature' : ''}${
                  isHidden ? ' is-filtered' : ''
                }`}
                style={{ '--reveal-delay': `${i * 90}ms` }}
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
                  <span className="project-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
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
                      className="btn btn-dark btn-sm"
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
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="projects-empty">No projects in this category yet — check back soon.</p>
        )}

        <div className="projects-cta reveal">
          <a className="btn btn-primary" href={allWorkUrl} target="_blank" rel="noreferrer">
            View All Projects
            <ArrowRight width={16} height={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
