/**
 * Append-only contact log — one JSON object per line (JSONL).
 *
 * IMPORTANT: this is not durable storage. On an ephemeral filesystem — Render's
 * free tier, and most container hosts — the file is wiped on every redeploy and
 * every cold start. Treat it as a local triage/debug trail only. **Email is the
 * durable path** for a contact message; if you need real persistence, point
 * MESSAGES_FILE at a mounted disk or replace this module with a database.
 *
 * Consequence for callers: a failed write is not a failed submission. Nothing
 * here throws, so the route can always fall through to sending the email.
 */

import { randomUUID } from 'node:crypto'
import { appendFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const MESSAGES_FILE = resolve(process.env.MESSAGES_FILE || './data/messages.jsonl')

let dirReady = null

/** mkdir once per process rather than once per message — but retry after a failure. */
function ensureDir() {
  if (!dirReady) {
    dirReady = mkdir(dirname(MESSAGES_FILE), { recursive: true }).catch((err) => {
      dirReady = null
      throw err
    })
  }
  return dirReady
}

/**
 * Writes are serialised. A 4KB message is larger than the atomic-append window
 * on most filesystems, so two submissions landing at once could interleave into
 * a single unparseable line. Chaining costs nothing at this traffic level.
 */
let queue = Promise.resolve()

function enqueue(task) {
  const run = queue.then(task, task)
  queue = run.catch(() => {})
  return run
}

/**
 * Appends one record to the log.
 *
 * @param {object} record - the validated submission plus any request metadata
 * @returns {Promise<object>} the record with `id`, `receivedAt` and a
 *   `persisted` flag. `persisted: false` means the write failed and the caller
 *   is now the only thing standing between the message and the void.
 */
export async function saveMessage(record) {
  // Spread first: the id and timestamp are ours and must not be overridable by
  // whatever the caller passed through from the request body.
  const saved = {
    ...record,
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
  }

  try {
    await enqueue(async () => {
      await ensureDir()
      await appendFile(MESSAGES_FILE, `${JSON.stringify(saved)}\n`, 'utf8')
    })
    return { ...saved, persisted: true }
  } catch (err) {
    // Log why the disk refused us, never the visitor's message.
    console.error('[store]', err.message)
    return { ...saved, persisted: false }
  }
}
