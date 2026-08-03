/**
 * The assistant's knowledge base.
 *
 * This is generated from `src/data/portfolio.js` — the exact same data the
 * website renders. That is deliberate: the bot and the page can never disagree,
 * and updating the portfolio automatically updates what the assistant knows.
 *
 * The whole thing is ~2K tokens, so it goes into the system prompt in full.
 * There is no retrieval step and no vector store: the model always sees every
 * fact, which removes the main way a grounded bot hallucinates (the retriever
 * failing to surface the relevant chunk).
 */

import {
  profile,
  about,
  education,
  certifications,
  skillGroups,
  experience,
  projects,
  services,
  techStack,
  socials,
} from '../src/data/portfolio.js'

const list = (items) => items.map((i) => `  - ${i}`).join('\n')

function section(heading, body) {
  return `## ${heading}\n${body}`
}

export function buildKnowledgeBase() {
  const identity = section(
    'Identity',
    [
      `Name: ${profile.name}`,
      `Titles: ${profile.roles.join(' | ')}`,
      `Location: ${profile.location}`,
      `Availability: ${profile.availability}`,
      `Tagline: ${profile.tagline}`,
    ].join('\n')
  )

  const contact = section(
    'Contact',
    [
      `Email: ${profile.email}`,
      `Phone / WhatsApp: ${profile.phone}`,
      `Resume / CV download: ${profile.cvUrl} (the "Download CV" button on the site)`,
      ...socials.map((s) => `${s.name}: ${s.url}`),
      'Preferred first contact: the contact form on the website, or email.',
    ].join('\n')
  )

  const summary = section('Professional summary', about.paragraphs.join('\n\n'))

  const facts = section(
    'Quick facts',
    [
      ...about.facts.map((f) => `${f.label}: ${f.value}`),
      ...about.details.map((d) => `${d.label}: ${d.value}`),
    ].join('\n')
  )

  const skills = section(
    'Skills',
    skillGroups
      .map((g) => `${g.title}:\n${list(g.skills.map((s) => s.name))}`)
      .join('\n')
  )

  const stack = section(
    'Core technologies',
    techStack.map((t) => t.name).join(', ')
  )

  const roles = section(
    'Work experience',
    experience
      .map((job) =>
        [
          `${job.role} — ${job.company} (${job.period})${job.current ? ' [current]' : ''}`,
          `  ${job.summary}`,
          list(job.points),
          `  Tech: ${job.stack.join(', ')}`,
        ].join('\n')
      )
      .join('\n\n')
  )

  const study = section(
    'Education',
    education.map((e) => `${e.qualification} — ${e.institute} (${e.period})`).join('\n')
  )

  const certs = section(
    'Certifications',
    certifications.map((c) => `${c.title} — ${c.detail}`).join('\n')
  )

  const work = section(
    'Projects',
    projects
      .map((p) =>
        [
          `${p.title} [${p.tags.join(', ')}]`,
          `  ${p.blurb}`,
          `  Features:\n${list(p.features)}`,
          `  Built with: ${p.stack.join(', ')}`,
          `  Links: demo=${p.demo}, repo=${p.repo}`,
        ].join('\n')
      )
      .join('\n\n')
  )

  const offering = section(
    'Services offered',
    services.map((s) => `${s.title}: ${s.text}`).join('\n')
  )

  return [
    identity,
    summary,
    facts,
    skills,
    stack,
    roles,
    study,
    certs,
    work,
    offering,
    contact,
  ].join('\n\n')
}

export const KNOWLEDGE_BASE = buildKnowledgeBase()
