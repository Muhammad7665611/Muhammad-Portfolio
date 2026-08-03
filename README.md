# Muhammad Ali Khan — Portfolio

A personal portfolio site: a React 18 + Vite single-page frontend backed by a small Express
API. The API serves the site's content as JSON, handles contact-form submissions (stored to
a local JSONL log and emailed over SMTP), and streams replies from a grounded AI assistant
that answers visitor questions about Muhammad's background, skills and projects. The
assistant is deliberately constrained: it is given the complete set of facts up front and
instructed to decline anything it wasn't given, so there is no retrieval step to fail and
nothing to hallucinate around.

## Architecture

| Directory | What it holds |
| --- | --- |
| `src/` | The Vite frontend — React components, styles, the `useChat` hook, and `src/data/portfolio.js`. |
| `server/` | The Express API. `routes/` has one module per feature; `lib/` has the provider abstraction, SMTP transport and message store. Its own `package.json` and `node_modules`. |
| `shared/` | Code both sides import. Currently just `knowledge.js`. |
| `public/` | Static assets served as-is, including the CV PDF at `public/cv/`. |

`src/data/portfolio.js` is the single source of truth for every piece of copy on the site.
The React components render from it, the content endpoints serve it, and `shared/knowledge.js`
compiles it into the assistant's knowledge base — a plain-text document embedded whole into
the system prompt. Because the knowledge base is generated from the same module the page
renders, the site and the bot cannot disagree: edit `portfolio.js` and both update together.

The assistant supports OpenAI and Anthropic behind one interface (`server/lib/provider.js`).
The provider is chosen from whichever API key is present, or forced with `LLM_PROVIDER`, and
the chat route never learns which one answered.

## Local development

The frontend and the API are separate npm packages with separate dependency trees. **Both
must be running** — the frontend calls the API for chat, the contact form and content.

```bash
# Terminal 1 — frontend, http://localhost:5173
npm install
npm run dev

# Terminal 2 — API, http://localhost:8787
cd server
npm install
cd ..
npm run dev:api
```

Then configure environment variables:

```bash
cp .env.example .env.local          # frontend
cp server/.env.example server/.env  # server — put your API key here
```

The API runs without an LLM key, but `POST /api/chat` returns `503 not_configured` until one
is set. `GET /api/health` reports whether the assistant is configured and which provider it
resolved to. Lint both packages from the repo root with `npm run lint`.

## Environment variables

### Frontend (`.env.local`, repo root)

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_URL` | No | Base URL of the API. Defaults to `http://localhost:8787`. Set to the Render URL in production. |

Vite inlines every `VITE_`-prefixed variable into the JavaScript bundle, where anyone can read
it. **The LLM API key and the SMTP password are server-side only and must never appear in a
`VITE_` variable.** They belong in `server/.env`, which is gitignored.

### Server (`server/.env`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | One of the two | OpenAI key. Its presence selects the OpenAI provider. |
| `ANTHROPIC_API_KEY` | One of the two | Anthropic key. Its presence selects the Anthropic provider. |
| `LLM_PROVIDER` | No | Forces `openai` or `anthropic` when both keys are set. |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini`. |
| `CLAUDE_MODEL` | No | Defaults to `claude-opus-5`. |
| `CLAUDE_EFFORT` | No | Anthropic reasoning effort. Defaults to `low`. |
| `PORT` | No | Defaults to `8787`. Render sets this automatically — do not override it there. |
| `ALLOWED_ORIGINS` | In production | Comma-separated CORS allowlist. Defaults to `http://localhost:5173`. |
| `SMTP_HOST` | For email | SMTP server hostname, e.g. `smtp.gmail.com`. |
| `SMTP_PORT` | No | Defaults to `587`. Port `465` switches to implicit TLS. |
| `SMTP_USER` | For email | SMTP account username. |
| `SMTP_PASS` | For email | SMTP password. For Gmail this must be an [App Password](https://myaccount.google.com/apppasswords), not the account password. |
| `MAIL_TO` | For email | Inbox that receives contact-form enquiries. |
| `MAIL_FROM` | No | From address. Falls back to `SMTP_USER`, which is what most relays require. |
| `MESSAGES_FILE` | No | Path to the contact-message JSONL log, relative to `server/`. Defaults to `./data/messages.jsonl`. |

Email is optional. Without `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `MAIL_TO` the contact
form still accepts and logs messages, but nothing reaches an inbox.

## API reference

All paths are relative to the API origin. Errors are always
`{ "error": "<snake_case_code>", "message": "<sentence>" }`.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness probe. Reports whether the assistant is configured and which provider is active. |
| `POST` | `/api/chat` | Streams an assistant reply as Server-Sent Events. Body: `{ messages: [{ role, content }] }`, 1–20 turns, first turn must be `user`. Frames are `delta`, `notice`, `error`, `done`. Rate limited to 30 requests per IP per 15 minutes. |
| `GET` | `/api/projects` | All projects. Optional `?tag=` filters by tag; `all` or an empty value returns everything. |
| `GET` | `/api/projects/:slug` | One project by slugified title. `404 not_found` if no match. |
| `GET` | `/api/skills` | Skill groups. |
| `GET` | `/api/experience` | Work history, education and certifications. |
| `GET` | `/api/profile` | Identity, about copy, social links and services. |
| `GET` | `/api/resume` | Where the CV PDF lives — URL, filename and last-modified date. The frontend host serves the bytes. |
| `POST` | `/api/contact` | Submits an enquiry. Body: `{ name, email, message, company? }`. Logged to disk and emailed. Rate limited to 5 requests per IP per hour. |

The content endpoints are public, read-only and cached for five minutes. Field-level
validation errors on `/api/contact` come back as a `fields` object alongside the standard
error shape, keyed by input name.

## Deployment

Frontend to Vercel, API to Render. Deploy the frontend first so you know its URL, then use
that URL for the API's CORS allowlist.

### Vercel (frontend)

1. Import the repository at [vercel.com/new](https://vercel.com/new). Leave the Root
   Directory as the repository root.
2. `vercel.json` already sets the framework preset, build command (`npm run build`), output
   directory (`dist`) and the SPA rewrite that makes deep links resolve to `index.html`.
   Accept the detected settings.
3. Add the environment variable `VITE_API_URL` set to the Render URL from the next section.
   On the first pass you will not have it yet — deploy, do Render, then come back and
   redeploy so the value is baked into the bundle. Vite inlines it at build time, so changing
   it requires a rebuild, not just a restart.
4. Note the resulting production URL, e.g. `https://muhammad-portfolio.vercel.app`.

### Render (API)

1. Create a new Blueprint instance at [dashboard.render.com](https://dashboard.render.com)
   and point it at this repository. `render.yaml` defines the service.
2. **Leave the Root Directory as the repository root.** This is the one setting that will
   silently break the deploy. The API imports `../../src/data/portfolio.js` and
   `../../shared/knowledge.js`, both of which sit outside `server/`. Rooting the service at
   `server/` makes those paths unreachable and the process exits on boot with
   `ERR_MODULE_NOT_FOUND`. The build and start commands in `render.yaml`
   (`cd server && npm install`, `cd server && npm start`) do the directory change themselves.
3. Fill in the prompted environment variables — the API key for one provider, and the SMTP
   settings if you want contact emails. Render stores them encrypted; they are never written
   to the repository.
4. Set `ALLOWED_ORIGINS` to the Vercel URL from the previous section, e.g.
   `https://muhammad-portfolio.vercel.app`. Include every origin that should be able to call
   the API, comma-separated and with no trailing slash. Miss this and every browser request
   from the live site fails CORS while `curl` keeps working.
5. Leave `PORT` alone — Render injects it.
6. After the first deploy, check `https://<service>.onrender.com/api/health`. It should
   return `{"ok":true,"assistant":true,"provider":"openai"}` (or `anthropic`). If `assistant`
   is `false`, the API key did not reach the service.
7. Go back to Vercel, set `VITE_API_URL` to the Render URL, and redeploy.

## Notes / known limitations

- **Cold starts.** Render's free tier sleeps a service after 15 minutes of inactivity. The
  first request after that has to boot the container, so the first chat message can take
  around 50 seconds before any token appears. Subsequent messages stream normally.
- **Contact messages are not durably stored.** The free filesystem is ephemeral, so
  `data/messages.jsonl` is wiped on every redeploy and cold start. Email is the durable
  delivery path — configure SMTP for anything public-facing. For real persistence, point
  `MESSAGES_FILE` at a mounted disk or replace `server/lib/store.js` with a database.
- **Placeholder content.** The projects in `src/data/portfolio.js` are still placeholders.
  Because the assistant's knowledge base is generated from that file, the bot will describe
  them as real work — replace them before sharing the site.
- **No conversation persistence.** Chat history lives in browser memory only and resets on
  reload; the server holds no session state.
