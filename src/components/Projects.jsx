import { useMemo, useState } from 'react'
import { projects, projectFilters, socials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import DeviceMock from './DeviceMock'
import { ArrowRight, ArrowUpRight, GitHub } from './Icons'
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
  const availableFilters = projectFilters.filter((name) => name === 'All' || countFor(name) > 0)

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="shell">
        <div className="section-head project-heading reveal">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">
            Selected Projects
          </h2>
          <p className="section-sub">
            A selection of my work across web, mobile, and AI.
          </p>
        </div>

        <div className="project-filter reveal" style={{ '--reveal-delay': '80ms' }}>
          <span className="project-filter-label" id="project-filter-label">
            Explore by category
          </span>
          <div className="project-filter-chips" role="group" aria-labelledby="project-filter-label">
            {availableFilters.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={filter === name}
                className={`chip ${filter === name ? 'is-active' : ''}`}
                onClick={() => setFilter(name)}
              >
                {name}
                <span className="chip-count">{countFor(name)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid reveal" style={{ '--reveal-delay': '160ms' }}>
          {projects.map((project) => {
            const isHidden = !visible.includes(project)
            const isFeature = project.featured === true

            return (
              <article
                key={project.title}
                aria-hidden={isHidden}
                className={`project-card card${isFeature ? ' is-featured' : ''}${
                  isHidden ? ' is-filtered' : ''
                }`}
              >
                {isFeature ? (
                  <div className="project-feature-layout">
                    <div className="project-body">
                      <span className="project-eyebrow">Featured · Personal Project</span>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-blurb">{project.blurb}</p>
                      <div className="project-stack">
                        {project.stack.slice(0, 6).map((tech) => (
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
                          View Project
                          <ArrowUpRight width={16} height={16} />
                        </a>
                        <a
                          className="btn btn-outline btn-sm"
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Project Details
                          <ArrowUpRight width={16} height={16} />
                        </a>
                      </div>
                    </div>
                    <div className="project-feature-preview" aria-label={`${project.title} concept preview`}>
                      {project.previewUrl ? (
                        <iframe
                          className="project-live-preview"
                          src={project.previewUrl}
                          title={`${project.title} live website preview`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      ) : (
                        <>
                          <DeviceMock
                            device={project.device}
                            variant={project.variant}
                            accent={project.accent}
                          />
                          <span className="project-preview-caption">Concept preview</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="project-preview">
                      {project.previewUrl ? (
                        <iframe
                          className="project-live-preview"
                          src={project.previewUrl}
                          title={`${project.title} live website preview`}
                          loading="lazy"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      ) : (
                        <>
                          <DeviceMock
                            device={project.device}
                            variant={project.variant}
                            accent={project.accent}
                          />
                          <span className="project-preview-caption">Concept preview</span>
                        </>
                      )}
                    </div>
                    <div className="project-body">
                      <span className="project-eyebrow">
                        {project.label || project.tags.join(' · ')}
                      </span>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-blurb">{project.blurb}</p>
                      <div className="project-stack">
                        {project.stack.slice(0, 4).map((tech) => (
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
                          View Project
                          <ArrowUpRight width={16} height={16} />
                        </a>
                        {project.repo !== '#' && (
                          <a
                            className="btn btn-dark btn-sm"
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <GitHub width={16} height={16} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
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
