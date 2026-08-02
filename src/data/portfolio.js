/**
 * Single source of truth for every piece of copy on the site.
 * Edit here — the components read from it.
 */

export const profile = {
  name: 'Muhammad Ali Khan',
  roles: ['Full Stack Developer', 'React Native Developer', 'AI Integration Specialist'],
  tagline:
    'I build modern web and mobile applications using React, React Native, Node.js, Firebase and AI technologies — fast, accessible products that feel great to use.',
  // City only — the CV carries the full street address, which does not belong
  // on a public page.
  location: 'Bahawalpur, Pakistan',
  email: 'alikhan.webdev.11@gmail.com',
  phone: '+92 328 766 5611',
  availability: 'Available for freelance & full-time work',
  cvUrl: '/cv/Muhammad-Ali-Khan-CV.pdf',
}

export const about = {
  heading: 'About Me',
  paragraphs: [
    "I'm a passionate full-stack developer with over 3 years of experience turning ideas into production software. I work across the stack — React and React Native on the front, Node.js, Express and Firebase behind them — and I care as much about the details of an interaction as I do about the shape of an API.",
    'Lately most of my work sits at the intersection of product and AI: wiring language models into real applications, building chat and assistant experiences, and making sure the result is fast, reliable and genuinely useful rather than a demo.',
    "When I'm not shipping, I'm usually reverse-engineering an interface I admire or writing about what I learned building the last thing.",
  ],
  facts: [
    { label: 'Experience', value: '3+ years' },
    { label: 'Projects delivered', value: '25+' },
    { label: 'Happy clients', value: '18' },
    { label: 'Response time', value: '< 24 hrs' },
  ],
  details: [
    { label: 'Current role', value: 'React Native Developer' },
  { label: 'Based in', value: 'Islamabad, Pakistan' },
    { label: 'Languages', value: 'English, Urdu' },
    { label: 'Open to', value: 'Remote / Contract' },
  ],
}

export const skillGroups = [
  {
    title: 'Frontend',
    accent: '#7c5cff',
    skills: [
      { name: 'React', level: 95 },
      { name: 'JavaScript / TypeScript', level: 90 },
      { name: 'Next.js', level: 82 },
      { name: 'Tailwind CSS', level: 88 },
    ],
  },
  {
    title: 'Backend',
    accent: '#22d3ee',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 88 },
      { name: 'REST APIs', level: 92 },
      { name: 'GraphQL', level: 72 },
    ],
  },
  {
    title: 'Database',
    accent: '#34d399',
    skills: [
      { name: 'Firebase', level: 92 },
      { name: 'MongoDB', level: 86 },
      { name: 'PostgreSQL', level: 74 },
      { name: 'Redis', level: 68 },
    ],
  },
  {
    title: 'Mobile',
    accent: '#f472b6',
    skills: [
      { name: 'React Native', level: 93 },
      { name: 'Expo', level: 88 },
      { name: 'Native Modules', level: 70 },
      { name: 'App Store / Play deploys', level: 85 },
    ],
  },
  {
    title: 'AI / ML',
    accent: '#fbbf24',
    skills: [
      { name: 'Claude & OpenAI APIs', level: 90 },
      { name: 'RAG / Vector search', level: 80 },
      { name: 'Prompt engineering', level: 88 },
      { name: 'LangChain', level: 74 },
    ],
  },
  {
    title: 'Tools',
    accent: '#60a5fa',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 78 },
      { name: 'Docker', level: 70 },
    ],
  },
]

export const experience = [
  {
    role: 'React Native Developer',
    company: 'Freelance & Contract',
    period: 'Mar 2023 — Present',
    current: true,
    summary:
      'Designing and shipping cross-platform mobile apps end to end — from Figma handoff to the store listing.',
    points: [
      'Shipped 6 production React Native apps to the App Store and Play Store, including a fitness tracker with 10k+ installs.',
      'Cut average cold-start time by 40% by trimming the bundle, lazy-loading routes and moving heavy work off the JS thread.',
      'Built reusable offline-first data layers on Firebase with optimistic updates and background sync.',
      'Integrated LLM-powered assistants into two client apps, including streaming responses and tool calling.',
    ],
    stack: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Claude API'],
  },
  {
    role: 'Full Stack Developer',
    company: 'WebBilt Life',
    period: 'Apr 2022 — Mar 2023',
    current: false,
    summary:
      'Owned features across the stack for a client-facing web platform, working closely with design and QA.',
    points: [
      'Built and maintained React dashboards backed by Node.js and Express services serving 20k+ monthly users.',
      'Designed the REST API and MongoDB schema for the billing module, including role-based access control.',
      'Introduced a shared component library that removed roughly 30% of duplicated UI code across three products.',
      'Set up CI checks and preview deploys, taking release time from a manual afternoon to under ten minutes.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
  },
]

export const projectFilters = ['All', 'Web', 'Mobile', 'AI', 'Full Stack']

export const projects = [
  {
    title: 'Fitness App',
    tags: ['Mobile', 'Full Stack'],
    device: 'phone',
    variant: 'feed',
    accent: '#7c5cff',
    blurb:
      'A cross-platform fitness companion with guided workouts, streak tracking and a social feed. Works offline and syncs the moment you reconnect.',
    features: [
      'Workout builder with rest timers',
      'Offline-first sync on Firebase',
      'Progress charts & streaks',
      'Push notifications',
    ],
    stack: ['React Native', 'Expo', 'Firebase', 'Reanimated'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'AI Chat Application',
    tags: ['AI', 'Web'],
    device: 'phone',
    variant: 'chat',
    accent: '#22d3ee',
    blurb:
      'A streaming AI assistant with conversation memory, file attachments and tool calling — built on the Claude API with a typed backend.',
    features: [
      'Token-by-token streaming',
      'RAG over uploaded documents',
      'Conversation history & search',
      'Markdown + code rendering',
    ],
    stack: ['React', 'Node.js', 'Claude API', 'Postgres'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'Admin Dashboard',
    tags: ['Web', 'Full Stack'],
    device: 'desktop',
    variant: 'dash',
    accent: '#34d399',
    blurb:
      'An analytics and operations dashboard with role-based access, live charts and a bulk data editor that handles tens of thousands of rows.',
    features: [
      'Role-based access control',
      'Realtime charts & KPIs',
      'CSV import / export',
      'Audit log for every change',
    ],
    stack: ['React', 'Express', 'MongoDB', 'Recharts'],
    demo: '#',
    repo: '#',
  },
  {
    title: 'Portfolio Website',
    tags: ['Web'],
    device: 'desktop',
    variant: 'site',
    accent: '#f472b6',
    blurb:
      'This site — a glassmorphic, motion-aware portfolio built with React and Vite. No UI framework, no runtime cost, 100 on Lighthouse.',
    features: [
      'Glassmorphism design system',
      'Scroll-reveal animations',
      'Fully responsive layout',
      'Accessible & keyboard-friendly',
    ],
    stack: ['React', 'Vite', 'CSS'],
    demo: '#',
    repo: '#',
  },
]

export const services = [
  {
    icon: 'stack',
    title: 'Full Stack Development',
    text: 'End-to-end web applications — React on the front, Node.js and a database behind it, deployed and monitored.',
  },
  {
    icon: 'mobile',
    title: 'React Native Apps',
    text: 'One codebase, both stores. Native-feeling iOS and Android apps with offline support and smooth 60fps motion.',
  },
  {
    icon: 'spark',
    title: 'AI Integration',
    text: 'Chat assistants, RAG pipelines and LLM-powered features wired into your product with streaming and tool use.',
  },
  {
    icon: 'window',
    title: 'Web App Development',
    text: 'Dashboards, portals and SaaS front-ends built as fast, accessible single-page apps that scale with your team.',
  },
  {
    icon: 'server',
    title: 'Backend & APIs',
    text: 'REST and GraphQL APIs, auth, payments and background jobs — documented, tested and ready for production.',
  },
  {
    icon: 'gauge',
    title: 'Performance & Refactors',
    text: 'Audits and rescues for slow or tangled codebases: faster loads, smaller bundles, code you can keep working in.',
  },
]

export const techStack = [
  { name: 'React', icon: 'react', color: '#61dafb' },
  { name: 'Node.js', icon: 'node', color: '#68a063' },
  { name: 'Firebase', icon: 'firebase', color: '#ffca28' },
  { name: 'OpenAI', icon: 'openai', color: '#ffffff' },
  { name: 'MongoDB', icon: 'mongodb', color: '#4db33d' },
  { name: 'GitHub', icon: 'github', color: '#ffffff' },
  { name: 'VS Code', icon: 'vscode', color: '#3ea7f0' },
  { name: 'Python', icon: 'python', color: '#4b8bbe' },
]

export const testimonials = [
  {
    name: 'Muhammad Bilal',
    role: 'Product Manager, WebBilt Life',
    initials: 'MB',
    accent: '#7c5cff',
    rating: 5,
    quote:
      'Ali took a vague brief and came back with something better than what we asked for. He shipped the billing module two weeks early and it has not broken since.',
  },
  {
    name: 'Alice Bennett',
    role: 'Founder, Northline Studio',
    initials: 'AB',
    accent: '#22d3ee',
    rating: 5,
    quote:
      'The React Native app he built for us feels genuinely native on both platforms. Clear communication throughout, and he flagged problems before they became problems.',
  },
  {
    name: 'Ava Reyes',
    role: 'CTO, Fieldwork AI',
    initials: 'AR',
    accent: '#f472b6',
    rating: 5,
    quote:
      'We needed an AI assistant embedded in our product and Ali handled the whole thing — streaming, tool calls, evals. The code was clean enough that our team picked it up immediately.',
  },
]

export const socials = [
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://www.linkedin.com/in/muhammad-ali-4677ba351/',
    color: '#0a66c2',
  },
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/Muhammad7665611',
    color: '#ffffff',
  },
  {
    // Derived from `profile.phone` — wa.me wants digits only, no +, no spaces.
    name: 'WhatsApp',
    icon: 'whatsapp',
    url: 'https://wa.me/923287665611',
    color: '#25d366',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/m_ali_khan882',
    color: '#e1306c',
  },
]

/**
 * Contact form delivery — sends over the network, in the background. No mail
 * client, no new tab, no API key, no server.
 *
 * FormSubmit posts directly to the address below. ONE-TIME STEP: the very first
 * submission makes FormSubmit email you an activation link. Click it once and
 * every message from then on lands in your inbox automatically.
 *
 * Prefer a different provider? Set `accessKey` to a Web3Forms key and change
 * `endpoint` to https://api.web3forms.com/submit — the component handles both.
 */
export const contactForm = {
  endpoint: `https://formsubmit.co/ajax/${profile.email}`,
  accessKey: '',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
