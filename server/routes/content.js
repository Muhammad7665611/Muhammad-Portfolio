/**
 * Read-only content API.
 *
 * Everything here is served straight out of `src/data/portfolio.js` — the same
 * module the React app renders and `shared/knowledge.js` feeds to the assistant.
 * One source of truth means the API, the page and the bot can never drift apart.
 *
 * Public, unauthenticated, and free to serve: no database, no per-request work
 * beyond a filter. The data is never copied or mutated, only re-shaped.
 */

import { Router } from 'express'
import { z } from 'zod'
import { statSync } from 'node:fs'
import {
  profile,
  about,
  education,
  certifications,
  skillGroups,
  experience,
  projects,
  services,
  socials,
} from '../../src/data/portfolio.js'

const router = Router()

/**
 * Content only changes on redeploy, so browsers and any CDN in front of the API
 * can hold it for a few minutes. Set per response rather than as router-level
 * middleware: mounted at /api this router sits in front of the other routes, and
 * a blanket middleware would stamp the header on their replies too. Errors stay
 * uncached because they never go through here.
 */
function sendCached(res, payload) {
  res.set('Cache-Control', 'public, max-age=300')
  res.json(payload)
}

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Built once at startup — the project list is static for the life of the process.
const projectsBySlug = new Map(projects.map((p) => [slugify(p.title), p]))

/** Path and query params are visitor input; bound them before they reach a lookup. */
const slugSchema = z.string().trim().toLowerCase().regex(/^[a-z0-9-]{1,80}$/)
const tagSchema = z.string().trim().max(40)

router.get('/projects', (req, res) => {
  if (req.query.tag === undefined) return sendCached(res, { projects })

  // Rejects the array Express hands back for a repeated ?tag=a&tag=b as well.
  const parsed = tagSchema.safeParse(req.query.tag)
  if (!parsed.success) {
    return res
      .status(400)
      .json({ error: 'invalid_request', message: 'The tag filter must be a short piece of text.' })
  }

  // `projectFilters` in the source data uses "All" for its everything option and
  // an empty ?tag= carries the same intent — neither should filter anything out.
  const tag = parsed.data.toLowerCase()
  if (!tag || tag === 'all') return sendCached(res, { projects })

  // Any other unknown tag is not an error: the filter UI can ask for anything,
  // and an empty list is the honest answer.
  const matches = projects.filter((p) => p.tags.some((t) => t.toLowerCase() === tag))

  sendCached(res, { projects: matches })
})

router.get('/projects/:slug', (req, res) => {
  const parsed = slugSchema.safeParse(req.params.slug)
  const project = parsed.success ? projectsBySlug.get(parsed.data) : null

  if (!project) {
    return res.status(404).json({ error: 'not_found', message: 'No project matches that name.' })
  }

  sendCached(res, { project })
})

router.get('/skills', (req, res) => sendCached(res, { skillGroups }))

router.get('/experience', (req, res) =>
  sendCached(res, { experience, education, certifications })
)

router.get('/profile', (req, res) => sendCached(res, { profile, about, socials, services }))

/**
 * The CV is a static asset shipped with the frontend, so the stat below only
 * resolves when the API runs from the same checkout (local dev, single-host
 * deploy). On a split deploy `updatedAt` is null rather than a fabricated date.
 */
function resumeModifiedAt() {
  if (!profile.cvUrl.startsWith('/')) return null
  try {
    return statSync(new URL(`../../public${profile.cvUrl}`, import.meta.url)).mtime.toISOString()
  } catch {
    return null
  }
}

const resume = {
  url: profile.cvUrl,
  filename: profile.cvUrl.split('/').pop(),
  updatedAt: resumeModifiedAt(),
}

// Describes where the PDF lives; the frontend host serves the bytes.
router.get('/resume', (req, res) => sendCached(res, resume))

export default router
