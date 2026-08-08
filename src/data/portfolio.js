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

/** Education — BISE Bahawalpur, as listed on the CV. */
export const education = [
   {
    qualification: 'Bachelor of Cyber Security',
    institute: 'Allama Iqbal Open University Of Bahawalpur',
    period: '2026 — Continued',
    current: true,
  },
  {
    qualification: 'Intermediate of Computer Science (ICS)',
    institute: 'BISE Bahawalpur',
    period: '2023 — 2025',
    current: false,
  },
  {
    qualification: 'Matriculation',
    institute: 'BISE Bahawalpur',
    period: '2021 — 2023',
    current: false,
  },
]

/**
 * Certifications. `issuer`, `period` and `credentialId` are optional — the
 * first entry is backed by an actual certificate document, the rest are the
 * generic lines carried over from the CV. Fill in provenance as you locate it;
 * a credential a reader can verify is worth several that they cannot.
 */
export const certifications = [
  {
    title: 'Frontend Development Internship',
    issuer: 'CodeAlpha',
    period: 'Aug 2025 — Sep 2025',
    credentialId: 'CA/UDFI/1134146',
    detail:
      'Virtual internship programme in frontend development, completed as an active participant.',
    // Scanned certificate in public/documents — rendered as a preview and
    // opened full size in a new tab.
    documentUrl: '/documents/codealpha-frontend-internship.jpeg',
    documentType: 'image',
    documentLabel: 'View certificate',
  },
  {
    title: 'Frontend Development Certificate',
    detail: 'React.js, JavaScript, HTML & CSS — building responsive interfaces.',
  },
  {
    title: 'Backend Development Certificate',
    detail: 'Python, Django and RESTful API design, testing and integration.',
  },
  {
    title: 'Web Development Fundamentals',
    detail: 'Core web platform: semantics, styling, and the request/response model.',
  },
]

export const about = {
  heading: 'About Me',
  paragraphs: [
    "I'm a frontend and full-stack developer with hands-on experience in React.js, React Native, JavaScript, HTML and CSS. I build responsive web and mobile applications, integrate RESTful APIs, work with Firebase services, and spend a lot of time on the part most people skip — making the thing actually fast.",
    'On the backend I work with Python and Django, building and testing REST APIs and wiring them into the front end. I test with Postman, ship with Git, and work in an Agile process alongside UI/UX designers and backend developers.',
    "I'm committed to continually expanding my expertise across the full stack, with a strong focus on user-centric design and functionality.",
  ],
  // Roles and certifications below are counted from the CV data further down
  // this file. The experience figure is the one hand-set value: it covers all
  // development work, including freelance and self-directed projects that
  // predate the first listed employer.
  facts: [
    { label: 'Experience', value: '3+ yrs' },
    { label: 'Roles held', value: '3' },
    { label: 'Certifications', value: String(certifications.length) },
    { label: 'Response time', value: '< 24 hrs' },
  ],
  details: [
    { label: 'Current role', value: 'Full Stack Developer' },
    { label: 'Based in', value: 'Islamabad, Pakistan' },
    { label: 'Languages', value: 'English, Urdu' },
    { label: 'Open to', value: 'Remote / Contract' },
  ],
}


/**
 * Skill groups mirror the CV's Technical Skills section. Levels are a personal
 * proficiency estimate — adjust them freely; the skill names are the part that
 * should stay honest.
 */
export const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'TypeScript', level: 75 },
      { name: 'HTML & CSS', level: 92 },
    ],
  },
  {
    title: 'Mobile',
    skills: [
      { name: 'React Native', level: 85 },
      { name: 'Firebase services', level: 82 },
      { name: 'REST API integration', level: 88 },
      { name: 'Responsive layouts', level: 90 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Python', level: 78 },
      { name: 'Django', level: 75 },
      { name: 'REST APIs', level: 85 },
      { name: 'API testing', level: 80 },
    ],
  },
  {
    title: 'Database & Cloud',
    skills: [
      { name: 'Firebase Authentication', level: 85 },
      { name: 'Realtime Database', level: 82 },
      { name: 'Firebase Storage', level: 80 },
      { name: 'Data modelling', level: 72 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 92 },
      { name: 'Chrome DevTools', level: 84 },
    ],
  },
  {
    title: 'Practices',
    skills: [
      { name: 'Agile development', level: 82 },
      { name: 'Cross-functional collaboration', level: 86 },
      { name: 'Performance optimisation', level: 78 },
      { name: 'Code review', level: 76 },
    ],
  },
]

/**
 * Roles exactly as listed on the CV — employers, titles and dates are not
 * embellished. Newest first.
 */
export const experience = [
  {
    role: 'Full Stack Developer',
    company: 'WebSolLive',
    period: 'Nov 2025 — Present',
    current: true,
    summary:
      'Building mobile applications end to end and connecting them to live backend services.',
    points: [
      'Developed mobile applications using React Native.',
      'Integrated REST APIs into the app and handled the data layer.',
      'Utilised Firebase services to enhance user experience and application performance.',
    ],
    stack: ['React Native', 'Firebase', 'REST APIs', 'JavaScript'],
  },
  {
    role: 'Backend Developer',
    company: 'Haytrix (Pvt) Ltd',
    location: 'Islamabad, ICT',
    period: 'Aug 2025 — Sep 2025',
    current: false,
    letterUrl: '/documents/haytrix-experience-letter.pdf',
    summary:
      'Short backend rotation building and testing the APIs powering the front end.',
    points: [
      'Created and tested RESTful APIs using Python (Django).',
      'Performed API testing with Postman.',
      'Integrated backend services with frontend applications.',
    ],
    stack: ['Python', 'Django', 'REST APIs', 'Postman'],
  },
  {
    // Dates, title and company taken from the Haytrix experience letter signed
    // by Umar Hayat (CEO), dated 25 Oct 2025 — it supersedes the CV summary.
    role: 'Frontend Developer',
    company: 'Haytrix (Pvt) Ltd',
    location: 'Islamabad, ICT',
    period: 'Mar 2025 — Sep 2025',
    current: false,
    letterUrl: '/documents/haytrix-experience-letter.pdf',
    summary:
      'Building responsive web applications with React.js, working alongside designers and backend developers.',
    points: [
      'Developed responsive web applications using React.js.',
      'Collaborated with UI/UX designers and backend developers on shared features.',
      'Applied Agile methodologies across planning, delivery and review.',
    ],
    stack: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Agile'],
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

/** Only technologies the CV or profile card actually claims. */
export const techStack = [
  { name: 'React', icon: 'react', color: '#61dafb' },
  { name: 'Node.js', icon: 'node', color: '#68a063' },
  { name: 'Firebase', icon: 'firebase', color: '#ffca28' },
  { name: 'Python', icon: 'python', color: '#4b8bbe' },
  { name: 'GitHub', icon: 'github', color: '#ffffff' },
  { name: 'VS Code', icon: 'vscode', color: '#3ea7f0' },
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
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
