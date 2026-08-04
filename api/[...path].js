/**
 * Vercel serverless entry point for the whole API.
 *
 * The `[...path]` catch-all filename is load-bearing. Vercel maps it to every
 * request under /api/ — /api/health, /api/chat, /api/projects/fitness-app —
 * and, crucially, hands the function the ORIGINAL request URL. A plain
 * api/index.js would only answer the bare /api path and would need a rewrite
 * that rewrites the URL out from under Express, breaking its routing.
 *
 * Because the path arrives intact, the Express app's existing '/api/...' mounts
 * match exactly as they do locally. No route rewriting, no path stripping, no
 * duplicated routing table.
 *
 * An Express app is itself a (req, res) function, so it is already a valid
 * Vercel handler — there is no adapter layer here on purpose.
 */

import app from '../server/app.js'

export default app
