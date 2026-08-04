/**
 * Where the frontend looks for the API.
 *
 * In production the site and the API ship in one Vercel project on one domain,
 * so the base is an empty string and every call is a same-origin relative
 * request to /api/... — no CORS preflight, no hardcoded deployment URL, and
 * nothing to update when the domain changes.
 *
 * In local dev Vite (:5173) and the API (:8787) are separate processes, so the
 * base points at the local server. VITE_API_URL overrides both if you ever need
 * to aim the frontend somewhere else (a preview deployment, say).
 */
export const API_BASE =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8787' : '')

/** Join the base with a path, tolerating a trailing slash on the base. */
export const apiUrl = (path) => `${API_BASE.replace(/\/$/, '')}${path}`
