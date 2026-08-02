/**
 * Inline SVG icon set — no icon library, no network requests.
 * Every icon draws on a 24x24 grid unless noted.
 */

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

/* ---------------------------------------------------------------- UI icons */

export const Download = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v12" />
    <path d="m7 11 5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M8 16 16 8" />
    <path d="M9 8h7v7" />
  </svg>
)

export const ArrowDown = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </svg>
)

export const Mail = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="m3.5 7 7.5 5.5a2 2 0 0 0 2 0L20.5 7" />
  </svg>
)

export const Phone = (p) => (
  <svg {...base} {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
  </svg>
)

export const MapPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Send = (p) => (
  <svg {...base} {...p}>
    <path d="M21 3 10.5 13.5" />
    <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
  </svg>
)

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
)

export const Menu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
)

export const Close = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6 18 18" />
    <path d="M18 6 6 18" />
  </svg>
)

export const Star = ({ filled = true, ...p }) => (
  <svg {...base} fill={filled ? 'currentColor' : 'none'} strokeWidth={1.4} {...p}>
    <path d="m12 3.6 2.6 5.3 5.9.86-4.25 4.14 1 5.86L12 17l-5.25 2.76 1-5.86L3.5 9.76l5.9-.86L12 3.6Z" />
  </svg>
)

export const Quote = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M9.6 6C6.5 7.6 4.8 10.3 4.8 13.6c0 2.7 1.6 4.4 3.8 4.4 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.6 1.7-3 3.4-3.9L9.6 6Zm8.8 0c-3.1 1.6-4.8 4.3-4.8 7.6 0 2.7 1.6 4.4 3.8 4.4 2 0 3.5-1.4 3.5-3.4 0-1.9-1.3-3.3-3.1-3.3-.3 0-.6 0-.9.1.4-1.6 1.7-3 3.4-3.9L18.4 6Z" />
  </svg>
)

export const ChevronDown = (p) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

/* ------------------------------------------------------------ Service icons */

export const Stack = (p) => (
  <svg {...base} {...p}>
    <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5" />
    <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
  </svg>
)

export const Mobile = (p) => (
  <svg {...base} {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
    <path d="M10.5 5.5h3" />
    <path d="M11 18.4h2" />
  </svg>
)

export const Spark = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.2 13.7 8 18.5 9.7 13.7 11.4 12 16.2 10.3 11.4 5.5 9.7 10.3 8 12 3.2Z" />
    <path d="M18 15.5 18.8 17.7 21 18.5 18.8 19.3 18 21.5 17.2 19.3 15 18.5 17.2 17.7 18 15.5Z" />
  </svg>
)

export const Window = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <path d="M2.5 9h19" />
    <path d="M6 6.5h.01M8.5 6.5h.01M11 6.5h.01" />
  </svg>
)

export const Server = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3.5" width="18" height="7" rx="2.2" />
    <rect x="3" y="13.5" width="18" height="7" rx="2.2" />
    <path d="M7 7h.01M7 17h.01" />
    <path d="M11 7h4M11 17h4" />
  </svg>
)

export const Gauge = (p) => (
  <svg {...base} {...p}>
    <path d="M3.6 17a9 9 0 1 1 16.8 0" />
    <path d="m12 13.5 4-4" />
    <circle cx="12" cy="14.6" r="1.6" />
  </svg>
)

export const Code = (p) => (
  <svg {...base} {...p}>
    <path d="m8 8-4 4 4 4" />
    <path d="m16 8 4 4-4 4" />
    <path d="m13.5 5-3 14" />
  </svg>
)

/* -------------------------------------------------------------- Brand marks */

export const React_ = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <circle cx="12" cy="12" r="2.1" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.1" fill="none">
      <ellipse cx="12" cy="12" rx="9.6" ry="3.7" />
      <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.6" ry="3.7" transform="rotate(120 12 12)" />
    </g>
  </svg>
)

export const Node = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <path
      d="M12 1.9 21.2 7v10L12 22.1 2.8 17V7L12 1.9Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M12.9 15.9c-2 0-2.6-.9-2.6-2h1.3c0 .6.3.9 1.3.9 1 0 1.3-.2 1.3-.8 0-.5-.2-.7-1.6-.9-1.6-.2-2.3-.6-2.3-1.9 0-1.1.9-1.8 2.4-1.8 1.7 0 2.5.7 2.5 1.9h-1.3c-.1-.6-.4-.8-1.2-.8-.9 0-1.1.3-1.1.7 0 .4.2.6 1.5.8 1.7.2 2.4.6 2.4 1.9 0 1.2-.9 2-2.6 2Z"
      fill="currentColor"
    />
  </svg>
)

export const Firebase = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...p}>
    <path d="M4 17.4 6.2 3.6c.1-.6.9-.7 1.2-.2l2.3 4.3L4 17.4Z" fill="#ffa000" />
    <path d="m4 17.4 8.3-14.9c.3-.6 1.1-.5 1.3.1l1.7 5.1L4 17.4Z" fill="#f57c00" opacity=".85" />
    <path d="M4 17.4 14 6.2l2.9 5.4L4 17.4Z" fill="#ffca28" />
    <path d="m4 17.4 15-8.6 1.1 8.3a1 1 0 0 1-.5 1l-6.7 3.7a1.6 1.6 0 0 1-1.5 0L4 17.4Z" fill="#ffa000" />
  </svg>
)

export const OpenAI = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <g stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3.1 18.7 7v7.9L12 18.8 5.3 14.9V7L12 3.1Z" />
      <path d="M12 3.1v7.8l6.7 4" />
      <path d="M12 10.9 5.3 14.9" />
      <path d="M12 18.8v-7.9" />
    </g>
    <circle cx="12" cy="10.9" r="1.5" fill="currentColor" />
  </svg>
)

export const MongoDB = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <path
      d="M12 2.2c2.6 3 4.7 5.6 4.7 9.3 0 3.3-2 5.6-4.7 7.2-2.7-1.6-4.7-3.9-4.7-7.2 0-3.7 2.1-6.3 4.7-9.3Z"
      fill="currentColor"
      opacity=".9"
    />
    <path d="M12 2.2v16.5" stroke="#05060b" strokeWidth="1" opacity=".55" />
    <path d="M12 18.7v3.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const GitHub = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
)

export const VSCode = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <path
      d="M17.6 2.2 8.9 10.4 4.6 7.1 2.5 8.2v7.6l2.1 1.1 4.3-3.3 8.7 8.2 3.9-1.9V4.1l-3.9-1.9Z"
      fill="currentColor"
      opacity=".28"
    />
    <path d="M17.6 2.2 21.5 4.1v15.8l-3.9 1.9-9.6-9.8 9.6-9.8Z" fill="currentColor" />
    <path d="M2.5 8.2 4.6 7.1l14.9 11.2-1.9 1.6L2.5 8.2Z" fill="currentColor" opacity=".55" />
  </svg>
)

export const Python = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <path
      d="M11.9 2.2c-2.6 0-4.4.9-4.4 2.9v2.2h4.6v.8H5.6c-2 0-3.4 1.5-3.4 4.1s1.2 4 3.1 4h1.6v-2.5c0-2.1 1.7-3.6 3.8-3.6h3.8c1.7 0 3-1.3 3-3V5.1c0-1.8-1.6-2.9-4-2.9h-1.6Zm-2.5 1.6a.9.9 0 1 1 0 1.9.9.9 0 0 1 0-1.9Z"
      fill="#4b8bbe"
    />
    <path
      d="M12.1 21.8c2.6 0 4.4-.9 4.4-2.9v-2.2h-4.6v-.8h6.5c2 0 3.4-1.5 3.4-4.1s-1.2-4-3.1-4h-1.6v2.5c0 2.1-1.7 3.6-3.8 3.6H9.5c-1.7 0-3 1.3-3 3v2.9c0 1.8 1.6 2.9 4 2.9h1.6Zm2.5-1.6a.9.9 0 1 1 0-1.9.9.9 0 0 1 0 1.9Z"
      fill="#ffd43b"
    />
  </svg>
)

/* -------------------------------------------------------------- Social marks */

export const LinkedIn = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M20.45 2H3.55A1.53 1.53 0 0 0 2 3.5v17A1.53 1.53 0 0 0 3.55 22h16.9A1.53 1.53 0 0 0 22 20.5v-17A1.53 1.53 0 0 0 20.45 2ZM8.1 18.7H5.15V9.6H8.1v9.1ZM6.62 8.35a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM18.9 18.7h-2.95v-4.43c0-1.06-.02-2.42-1.48-2.42-1.48 0-1.7 1.15-1.7 2.34v4.51H9.83V9.6h2.83v1.24h.04a3.1 3.1 0 0 1 2.79-1.53c2.98 0 3.53 1.96 3.53 4.52v4.87Z" />
  </svg>
)

export const WhatsApp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9a9.8 9.8 0 0 0 1.35 4.96L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01A9.9 9.9 0 0 0 22 11.93 9.9 9.9 0 0 0 12.04 2Zm5.8 14.05c-.25.69-1.45 1.32-2 1.36-.53.05-1.02.24-3.44-.72-2.9-1.15-4.73-4.13-4.87-4.32-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.24.58.8 2 .88 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.16-.3.37-.43.49-.14.14-.29.29-.13.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.28.38-.23.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.33.07.11.07.66-.18 1.35Z" />
  </svg>
)

export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false" {...p}>
    <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.25" fill="currentColor" />
  </svg>
)

/* ------------------------------------------------------------------ Registry */

const registry = {
  react: React_,
  node: Node,
  firebase: Firebase,
  openai: OpenAI,
  mongodb: MongoDB,
  github: GitHub,
  vscode: VSCode,
  python: Python,
  linkedin: LinkedIn,
  whatsapp: WhatsApp,
  instagram: Instagram,
  stack: Stack,
  mobile: Mobile,
  spark: Spark,
  window: Window,
  server: Server,
  gauge: Gauge,
  code: Code,
  mail: Mail,
  phone: Phone,
  mappin: MapPin,
}

/** Render an icon by its registry key. */
export function Icon({ name, ...props }) {
  const Cmp = registry[name]
  return Cmp ? <Cmp {...props} /> : null
}
