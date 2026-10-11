import { useEffect, useMemo, useRef, useState } from 'react'
import { cybersecurityProjects, projects, projectFilters, socials } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import DeviceMock from './DeviceMock'
import { ArrowRight, ArrowUpRight, Download, GitHub } from './Icons'
import './Projects.css'

/** Where the "View All" button points — the GitHub profile from the data file. */
const allWorkUrl = socials.find((s) => s.name === 'GitHub')?.url ?? '#projects'

function isValidDocumentationUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false

  try {
    return ['http:', 'https:'].includes(new URL(url, window.location.origin).protocol)
  } catch {
    return false
  }
}

function SecurityIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 4 40 10v12c0 10-6.7 17.5-16 22-9.3-4.5-16-12-16-22V10l16-6Z" />
      <path d="M17 24h14M24 17v14" />
      <circle cx="24" cy="24" r="8.5" />
    </svg>
  )
}

function CaseStudyDialog({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const documentationLinks = project.documentation.filter((item) =>
    isValidDocumentationUrl(item.url)
  )
  const recommendations = project.findings.map((item) => item.recommendation)

  return (
    <dialog
      className="case-study-dialog"
      ref={dialogRef}
      aria-labelledby="case-study-title"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        event.currentTarget.close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.currentTarget.close()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="case-study-content">
        <header className="case-study-header">
          <div>
            <span className="case-study-kicker">Simulated educational case study</span>
            <h2 id="case-study-title">{project.title}</h2>
            <p>{project.projectType}</p>
          </div>
          <button
            type="button"
            className="case-study-close"
            aria-label="Close case study"
            autoFocus
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <p className="case-study-disclaimer">
          Botium Toys is a fictional organization. This was a learning activity—not a real client
          engagement, penetration test, or independent compliance audit.
        </p>

        <section className="case-study-section" aria-labelledby="case-study-overview">
          <h3 id="case-study-overview">1. Project Overview</h3>
          <p>{project.overview}</p>
          <p><strong>Organization:</strong> Botium Toys (Fictional Case Study)</p>
          <p><strong>Category:</strong> {project.category}</p>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-objectives">
          <h3 id="case-study-objectives">2. Audit Objectives</h3>
          <ul className="case-study-list">
            {project.objectives.map((objective) => <li key={objective}>{objective}</li>)}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-scope">
          <h3 id="case-study-scope">3. Scope and Assets</h3>
          <p>The simulated review covered the following areas:</p>
          <ul className="case-study-tag-list">
            {project.scope.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-risk">
          <h3 id="case-study-risk">4. Risk Assessment</h3>
          <div className="risk-overview">
            <div className="case-study-risk is-high" aria-label={`Overall risk score ${project.riskScore} out of 10, ${project.riskLevel} risk`}>
              <strong>{project.riskScore}<span>/10</span></strong>
              <span>{project.riskLevel} Risk</span>
            </div>
            <p className="risk-score-source">
              Overall score supplied by the <strong>{project.riskScoreSource}</strong>; it is not an independently calculated score.
            </p>
          </div>
          <p>{project.riskSummary}</p>
          <h4>Key security findings</h4>
          <ul className="risk-overview-findings">
            {project.findings.map((finding) => (
              <li key={finding.title}>{finding.detail}</li>
            ))}
          </ul>
          <h4>Existing safeguards</h4>
          <ul className="case-study-tag-list risk-safeguards">
            {project.existingControls.map((control) => <li key={control}>{control}</li>)}
          </ul>
          <h4>Suggested priority recommendations</h4>
          <p className="risk-priority-disclaimer">
            These priority levels are suggested for practical triage; they are not priorities assigned in the source assessment.
          </p>
          <ol className="risk-priorities">
            {project.riskPriorities.map((item) => (
              <li key={item.risk}>
                <div className="risk-priority-heading">
                  <strong>{item.risk}</strong>
                  <span className={`risk-priority-level is-${item.priority.toLowerCase()}`}>
                    {item.priority} priority
                  </span>
                </div>
                <span><strong>Potential impact:</strong> {item.impact}</span>
                <span><strong>Suggested mitigation:</strong> {item.mitigation}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-controls">
          <h3 id="case-study-controls">5. Security Controls Assessment</h3>
          <h4>Existing controls described in the case study</h4>
          <ul className="case-study-list">
            {project.existingControls.map((control) => <li key={control}>{control}</li>)}
          </ul>
          <p>
            The review also identified gaps in access governance, encryption, monitoring,
            recovery readiness, authentication, and asset management.
          </p>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-compliance">
          <h3 id="case-study-compliance">6. Compliance Assessment</h3>
          <p>
            Frameworks and standards were considered as learning references. This exercise does
            not represent a formal compliance assessment, certification, or attestation.
          </p>
          <ul className="case-study-frameworks">
            {project.complianceAssessment.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-findings">
          <h3 id="case-study-findings">7. Key Findings</h3>
          <ul className="case-study-findings">
            {project.findings.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-recommendations">
          <h3 id="case-study-recommendations">8. Recommendations</h3>
          <ul className="case-study-list">
            {recommendations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-skills">
          <h3 id="case-study-skills">9. Skills Demonstrated</h3>
          <ul className="case-study-tag-list">
            {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>

        <section className="case-study-section" aria-labelledby="case-study-documents">
          <h3 id="case-study-documents">10. Documentation</h3>
          <ul className="case-study-documents">
            {project.documentation.map((item) => {
              const href = isValidDocumentationUrl(item.url)
              return (
                <li key={item.label}>
                  {href ? (
                    <div className="case-study-doc-actions">
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.label}<ArrowUpRight width={15} height={15} />
                      </a>
                      {item.url.toLowerCase().includes('.pdf') && (
                        <a
                          className="case-study-doc-download"
                          href={item.url}
                          download
                          aria-label={`Download ${item.label}`}
                        >
                          <Download width={15} height={15} />
                          <span>Download</span>
                        </a>
                      )}
                    </div>
                  ) : (
                    <span>{item.label}<span className="case-study-doc-status">Not added yet</span></span>
                  )}
                </li>
              )
            })}
          </ul>
          {documentationLinks.length < project.documentation.length && (
            <p className="case-study-doc-note">
              The GitHub repository link is not included yet.
            </p>
          )}
        </section>
      </div>
    </dialog>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null)
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

        <section className="cybersecurity-projects" id="cybersecurity-projects" aria-labelledby="cybersecurity-heading">
          <div className="cybersecurity-heading">
            <span className="eyebrow">Security learning</span>
            <h3 id="cybersecurity-heading">Cybersecurity Projects</h3>
            <p>
              Practical learning alongside my Full Stack work. Educational simulations are
              clearly distinguished from professional engagements.
            </p>
          </div>

          <div className="cybersecurity-grid">
            {cybersecurityProjects.map((project) => {
              const isCompleted = project.status === 'Completed'
              const checklist = project.documentation?.find(
                (item) => item.label === 'Controls and Compliance Checklist (PDF)' && isValidDocumentationUrl(item.url)
              )
              const riskSummary = project.documentation?.find(
                (item) => item.label === 'Risk Assessment Summary (PDF)' && isValidDocumentationUrl(item.url)
              )
              const repository = project.documentation?.find(
                (item) => item.label === 'GitHub Repository' && isValidDocumentationUrl(item.url)
              )

              return (
                <article
                  className={`cyber-project-card${isCompleted ? ' is-completed' : ' is-planned'}`}
                  key={project.id}
                >
                  {isCompleted ? (
                    <>
                      <div className="cyber-project-topline">
                        <span className="cyber-project-icon"><SecurityIcon /></span>
                        <span className={`cyber-project-status${isCompleted ? ' is-done' : ''}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="cyber-project-category">{project.category}</p>
                      <h4>{project.title}</h4>
                      <p className="cyber-project-type">{project.projectType}</p>
                      <p className="cyber-project-description">{project.description}</p>
                      <div className="cyber-project-risk">
                        <span>Risk assessment</span>
                        <strong>{project.riskScore}/10 · {project.riskLevel}</strong>
                      </div>
                      <div className="cyber-project-tags" aria-label="Frameworks and standards">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <div className="cyber-project-actions">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setSelectedCaseStudy(project)}
                        >
                          View Case Study
                          <ArrowRight width={16} height={16} />
                        </button>
                        {checklist && (
                          <a
                            className="btn btn-outline btn-sm"
                            href={checklist.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Checklist &amp; Recommendations
                            <ArrowUpRight width={16} height={16} />
                          </a>
                        )}
                        {riskSummary && (
                          <a
                            className="btn btn-outline btn-sm"
                            href={riskSummary.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View Risk Summary
                            <ArrowUpRight width={16} height={16} />
                          </a>
                        )}
                        {repository && (
                          <a
                            className="btn btn-dark btn-sm"
                            href={repository.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <GitHub width={15} height={15} />
                            GitHub
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="cyber-planned-content">
                      <span className="cyber-planned-mark" aria-hidden="true">+</span>
                      <div>
                        <span className="cyber-project-status">{project.status}</span>
                        <h4>{project.title}</h4>
                      </div>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <div className="projects-cta reveal">
          <a className="btn btn-primary" href={allWorkUrl} target="_blank" rel="noreferrer">
            View All Projects
            <ArrowRight width={16} height={16} />
          </a>
        </div>
      </div>
      {selectedCaseStudy && (
        <CaseStudyDialog
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </section>
  )
}
