/**
 * Single source of truth for every piece of copy on the site.
 * Edit here — the components read from it.
 */

export const profile = {
  name: 'Muhammad Ali Khan',
  roles: ['Full-Stack Developer', 'AI Engineer', 'Cybersecurity Student'],
  tagline:
    'Full-stack developer and cybersecurity student building modern web and mobile applications with React, Next.js, Node.js, Express.js, PostgreSQL, Prisma and AI-powered features.',
  // City only — the CV carries the full street address, which does not belong
  // on a public page.
  location: 'Bahawalpur, Pakistan',
  email: 'alikhan.webdev.11@gmail.com',
  phone: '+92 328 766 5611',
  availability: 'Available for freelance, contract & full-time opportunities',
  cvUrl: '/cv/Muhammad-Ali-Khan-CV.pdf',
}

/** Education — follows the updated CV exactly. */
export const education = [
  {
    qualification: 'Bachelor of Science in Cybersecurity',
    institute: 'Allama Iqbal Open University, Islamabad',
    period: '2026 — 2030',
    current: true,
  },
  {
    qualification: 'Intermediate in Computer Science (ICS)',
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

/** Completed courses and credentials shown in the portfolio. */
export const certifications = [
  {
    title: 'Frontend Development Internship',
    issuer: 'CodeAlpha',
    period: 'Aug 2025 — Sep 2025',
    credentialId: 'CA/UDFI/1134146',
    detail:
      'Virtual internship programme in frontend development, completed as an active participant.',
    issuerLogo: '/documents/codealpha-frontend-internship.jpeg',
    // Scanned certificate in public/documents — rendered as a preview and
    // opened full size in a new tab.
    documentUrl: '/documents/codealpha-frontend-internship.jpeg',
    documentType: 'image',
    documentLabel: 'View certificate',
  },
  {
    title: 'Foundations of Cybersecurity',
    issuer: 'Google',
    platform: 'Coursera',
    completedAt: 'October 2026',
    status: 'Completed',
    grade: '98.02%',
    detail:
      "Successfully completed the first course in Google's Cybersecurity Professional Certificate program. Developed foundational knowledge of cybersecurity principles, common security threats, risk management, security operations, and protecting digital assets.",
    program: 'Google Cybersecurity Professional Certificate',
    programCompleted: 1,
    programTotal: 9,
    skills: [
      'Cybersecurity Fundamentals',
      'Threat Identification',
      'Risk Management',
      'Security Principles',
      'Security Operations',
    ],
    certificateUrl: 'https://coursera.org/verify/4H4XEPFHQONU',
  },
]

export const about = {
  heading: 'About Me',
  paragraphs: [
    'I am a Full-Stack Developer and Cybersecurity student who builds modern web and mobile applications. My work spans responsive interfaces, backend APIs, databases, and product integrations using React.js, Next.js, Node.js, Express.js, PostgreSQL, Prisma, and React Native.',
    'I enjoy taking a product from its frontend through its backend: connecting REST APIs, shaping database architecture, and preparing applications for deployment. I also develop AI-powered applications and conversational experiences using LLM APIs.',
    'Alongside software development, I am studying cybersecurity and building a practical foundation in security principles, threat identification, risk management, Linux, and web and network security. I care about making software useful, reliable, and security-conscious.',
  ],
  facts: [
    { label: 'Experience', value: '2+ yrs' },
    { label: 'Roles held', value: '3' },
    { label: 'Certifications', value: String(certifications.length) },
    { label: 'Response time', value: '< 24 hrs' },
  ],
  details: [
    { label: 'Current role', value: 'Full-Stack Developer' },
    { label: 'Based in', value: 'Bahawalpur, Pakistan' },
    { label: 'Languages', value: 'English, Urdu' },
    { label: 'Open to', value: 'Remote / Contract / Full-time' },
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
      { name: 'React.js', level: 92 },
      { name: 'Next.js', level: 85 },
      { name: 'React Native', level: 86 },
      { name: 'Vue.js', level: 68 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 90 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 86 },
      { name: 'REST APIs', level: 90 },
      { name: 'Python', level: 78 },
      { name: 'Django', level: 72 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'Prisma', level: 78 },
      { name: 'Firebase', level: 82 },
      { name: 'Database integration', level: 84 },
    ],
  },
  {
    title: 'AI & Automation',
    skills: [
      { name: 'LLM Applications', level: 84 },
      { name: 'AI Assistants', level: 82 },
      { name: 'Prompt Engineering', level: 80 },
      { name: 'AI APIs', level: 85 },
      { name: 'AI Agents', level: 76 },
      { name: 'Automation', level: 78 },
    ],
  },
  {
    title: 'Cybersecurity',
    skills: [
      { name: 'Cybersecurity Fundamentals', level: 78 },
      { name: 'Network Security', level: 76 },
      { name: 'Web Security', level: 75 },
      { name: 'Linux Security', level: 74 },
      { name: 'Security Analysis', level: 72 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 88 },
      { name: 'GitHub', level: 88 },
      { name: 'Linux', level: 80 },
      { name: 'Ubuntu', level: 78 },
      { name: 'API Integration', level: 90 },
      { name: 'Deployment', level: 82 },
    ],
  },
]

/** Roles and bullet points follow the uploaded CV. */
export const experience = [
  {
    role: 'Frontend Developer',
    company: 'Haytrix',
    period: 'January 2025 — August 2025',
    current: false,
    points: [
      'Developed responsive web applications using React.js.',
      'Collaborated with UI/UX designers and backend developers.',
      'Worked within Agile development methodologies.',
    ],
    stack: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Agile'],
  },
  {
    role: 'Backend Developer',
    company: 'Haytrix',
    period: 'August 2025 — September 2025',
    current: false,
    points: [
      'Created and tested RESTful APIs using Python (Django).',
      'Performed API testing with Postman.',
      'Integrated backend services with frontend applications.',
    ],
    stack: ['Python', 'Django', 'REST APIs', 'Postman'],
  },
  {
    role: 'Full Stack Developer',
    company: 'WebSolLive',
    period: 'November 2025 — Present',
    current: true,
    points: [
      'Developed mobile applications using React Native.',
      'Integrated APIs and Firebase services.',
      'Worked on application functionality and user experience.',
    ],
    stack: ['React Native', 'Firebase', 'REST APIs', 'JavaScript'],
  },
]

export const projectFilters = ['All', 'Web', 'Mobile', 'AI', 'Full Stack']

export const projects = [
  {
    title: 'Nura AI',
    featured: true,
    tags: ['AI', 'Full Stack', 'Web'],
    device: 'desktop',
    variant: 'chat',
    accent: '#22d3ee',
    blurb:
      'An AI assistant platform bringing conversational AI and full-stack product engineering together across web and mobile experiences.',
    features: [
      'AI-powered conversational experience',
      'Frontend, backend, database and AI integration',
      'Chat functionality for interacting with AI models',
      'Designed with future agents and automation in mind',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'React Native', 'LLM APIs'],
    demo: 'https://nura-ai-blush.vercel.app/',
    repo: 'https://github.com/Muhammad7665611/Nura-AI',
    previewUrl: 'https://nura-ai-blush.vercel.app/',
  },
  {
    title: 'Muhammad Ali Khan — Portfolio',
    tags: ['Web', 'Full Stack', 'AI'],
    device: 'desktop',
    variant: 'site',
    accent: '#f472b6',
    blurb:
      'A responsive developer portfolio with a content API, contact form, and a streaming AI assistant grounded in my portfolio data.',
    features: [
      'Responsive, accessible React single-page experience',
      'Express API for portfolio content and contact submissions',
      'Streaming AI assistant grounded in portfolio information',
      'Light and dark themes with reduced-motion-aware reveals',
    ],
    stack: ['React 18', 'Vite', 'CSS', 'Node.js', 'Express', 'OpenAI', 'Anthropic'],
    demo: 'https://muhammad-portfolio-snowy.vercel.app/',
    repo: 'https://github.com/Muhammad7665611/Muhammad-Portfolio',
    previewUrl: 'https://muhammad-portfolio-snowy.vercel.app/',
  },
  {
    title: 'McGee',
    label: 'First Project · Collaborative',
    tags: ['Web'],
    device: 'desktop',
    variant: 'site',
    accent: '#34d399',
    blurb:
      'My first project, built collaboratively with Ahmad Arif. The deployed McGee application includes a login experience.',
    features: [],
    stack: [],
    demo: 'https://mc-gee.vercel.app',
    repo: 'https://github.com/AhmadArif98/mc-gee',
    previewUrl: 'https://mc-gee.vercel.app',
  },
]

/** Educational cybersecurity work, separate from professional client projects. */
export const cybersecurityProjects = [
  {
    id: 'botium-toys-security-audit',
    title: 'Botium Toys — Security Audit',
    category: 'Cybersecurity / Risk Assessment / Compliance',
    projectType: 'Simulated Security Audit (Google Cybersecurity Certificate Activity)',
    status: 'Completed',
    description:
      "Completed a simulated internal security audit for Botium Toys as part of my Google Cybersecurity Professional Certificate studies. Reviewed organizational assets, evaluated security controls, assessed compliance best practices, identified security gaps, and documented recommendations to strengthen the organization's security posture.",
    riskScore: 8,
    riskLevel: 'High',
    tags: ['NIST CSF', 'PCI DSS', 'GDPR', 'SOC 1 / SOC 2'],
    skills: [
      'Security Auditing',
      'Risk Assessment',
      'NIST Cybersecurity Framework (CSF)',
      'Security Controls Assessment',
      'PCI DSS',
      'GDPR',
      'SOC 1 / SOC 2 Concepts',
      'Security Documentation',
      'Security Recommendations',
    ],
    overview:
      'A simulated internal audit of Botium Toys, a fictional organization, completed as an educational activity in the Google Cybersecurity Professional Certificate program. The review assessed the organization’s described assets, controls, and compliance practices; it was not a client engagement, penetration test, or independent certification.',
    objectives: [
      'Review the organization’s described assets and internal security controls.',
      'Identify security-control gaps and consider their potential risks.',
      'Compare described practices with relevant security and compliance concepts.',
      'Document practical recommendations to improve the security posture.',
    ],
    scope: [
      'Internal network',
      'Employee devices',
      'IT systems',
      'Organizational assets',
      'Data storage',
      'Security controls',
      'Compliance practices',
    ],
    riskSummary:
      'The simulated assessment identified gaps in security controls and compliance practices. The overall score reflects the supplied case-study assessment, not a measured production environment or external audit opinion.',
    riskScoreSource: 'Botium Toys Scope, Goals, and Risk Assessment Report',
    riskPriorities: [
      {
        risk: 'Unencrypted customer payment information',
        impact: 'Exposure of sensitive payment data and increased privacy or payment-security risk.',
        mitigation: 'Encrypt sensitive payment information in storage and transit.',
        priority: 'Critical',
      },
      {
        risk: 'Missing least privilege and separation of duties',
        impact: 'Excessive or conflicting access may enable unauthorized activity or make it harder to detect.',
        mitigation: 'Apply role-based least privilege and separate incompatible responsibilities.',
        priority: 'High',
      },
      {
        risk: 'No critical backups or disaster recovery plan',
        impact: 'Data loss or a significant interruption may make recovery difficult.',
        mitigation: 'Create protected, regular backups and document and test recovery procedures.',
        priority: 'High',
      },
      {
        risk: 'No intrusion detection system',
        impact: 'Suspicious network activity may go undetected for longer.',
        mitigation: 'Deploy IDS monitoring and define an alert review and escalation process.',
        priority: 'High',
      },
      {
        risk: 'Weak passwords and no centralized password management',
        impact: 'Account compromise may provide unauthorized access to systems or data.',
        mitigation: 'Strengthen password requirements and introduce centralized password management.',
        priority: 'High',
      },
    ],
    existingControls: [
      'Firewall',
      'Antivirus software',
      'Physical security locks',
      'CCTV surveillance',
      'Fire detection and prevention systems',
      'Data integrity and availability controls',
    ],
    complianceAssessment: [
      {
        name: 'NIST Cybersecurity Framework (CSF)',
        detail:
          'Used as a best-practice reference for considering security controls and areas for improvement.',
      },
      {
        name: 'PCI DSS',
        detail:
          'Considered payment-data protection practices, including the need to encrypt sensitive customer information.',
      },
      {
        name: 'GDPR',
        detail:
          'Reviewed data-protection concepts relevant to safeguarding customer information.',
      },
      {
        name: 'SOC 1 / SOC 2',
        detail:
          'Considered high-level assurance and control concepts; no formal SOC audit or attestation was performed.',
      },
    ],
    findings: [
      {
        title: 'Access governance',
        detail: 'Least-privilege access controls and separation of duties were missing.',
        recommendation:
          'Implement role-based access controls, least privilege, and separation of duties.',
      },
      {
        title: 'Customer payment data',
        detail: 'Customer payment information lacked encryption.',
        recommendation: 'Encrypt sensitive customer information in storage and transit.',
      },
      {
        title: 'Detection and response',
        detail: 'No intrusion detection system (IDS) was in place.',
        recommendation: 'Implement IDS monitoring and establish a process to review alerts.',
      },
      {
        title: 'Resilience and recovery',
        detail: 'Disaster recovery plans and critical data backups were missing.',
        recommendation:
          'Establish and test backup and disaster recovery procedures for critical data.',
      },
      {
        title: 'Authentication',
        detail:
          'Password requirements were weak and there was no centralized password management system.',
        recommendation:
          'Strengthen password policies and introduce centralized password management.',
      },
      {
        title: 'Asset management',
        detail: 'Asset inventory management was inadequate.',
        recommendation: 'Maintain an accurate, regularly reviewed asset inventory.',
      },
      {
        title: 'Legacy systems',
        detail: 'Legacy system maintenance schedules needed formalization.',
        recommendation: 'Formalize and track maintenance schedules for legacy systems.',
      },
    ],
    documentation: [
      { label: 'Controls and Compliance Checklist (PDF)', url: '/cv/Botium_Toys_Security_Audit.pdf' },
      { label: 'Risk Assessment Summary (PDF)', url: '/documents/Botium_Toys_Risk_Assessment_Summary.pdf' },
      { label: 'GitHub Repository', url: null },
    ],
  },
  {
    id: 'linux-file-permissions',
    title: 'Linux File Permissions',
    status: 'Planned',
  },
  {
    id: 'sql-security-queries',
    title: 'SQL Security Queries',
    status: 'Planned',
  },
  {
    id: 'network-security-analysis',
    title: 'Network Security Analysis',
    status: 'Planned',
  },
  {
    id: 'incident-handlers-journal',
    title: "Incident Handler's Journal",
    status: 'Planned',
  },
  {
    id: 'python-security-automation',
    title: 'Python Security Automation',
    status: 'Planned',
  },
]

export const services = [
  {
    icon: 'stack',
    title: 'Full Stack Development',
    text: 'End-to-end web applications and product experiences from frontend architecture to API and database integration.',
  },
  {
    icon: 'spark',
    title: 'AI & LLM App Development',
    text: 'Conversational assistants, AI-powered features and operational automation built around modern LLM APIs and product workflows.',
  },
  {
    icon: 'mobile',
    title: 'React Native Apps',
    text: 'Cross-platform mobile products built with React Native, focused on usability, performance and smooth integration.',
  },
  {
    icon: 'server',
    title: 'REST API & Database Design',
    text: 'Secure, scalable backend services with Node.js, Express.js, PostgreSQL and Prisma for modern application needs.',
  },
  {
    icon: 'window',
    title: 'Web App Development',
    text: 'Responsive single-page and product-focused web experiences designed for speed, accessibility and business value.',
  },
  {
    icon: 'gauge',
    title: 'Cybersecurity-Aware Development',
    text: 'Secure application thinking grounded in Linux, network and web security fundamentals while shipping reliable software.',
  },
]

/** Technologies and tools used across the profile, projects, and skill groups. */
export const techStack = [
  { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
  { name: 'TypeScript', icon: 'typescript', color: '#3178c6' },
  { name: 'HTML5', icon: 'html', color: '#e34f26' },
  { name: 'CSS3', icon: 'css', color: '#1572b6' },
  { name: 'React.js', icon: 'react', color: '#61dafb' },
  { name: 'Next.js', icon: 'next', color: '#ffffff' },
  { name: 'React Native', icon: 'react', color: '#61dafb' },
  { name: 'Expo', icon: 'expo', color: '#ffffff' },
  { name: 'Flutter', icon: 'flutter', color: '#54c5f8' },
  { name: 'Node.js', icon: 'node', color: '#68a063' },
  { name: 'Express.js', icon: 'node', color: '#68a063' },
  { name: 'Python', icon: 'python', color: '#4b8bbe' },
  { name: 'Django', icon: 'django', color: '#44b78b' },
  { name: 'PostgreSQL', icon: 'database', color: '#336791' },
  { name: 'Prisma', icon: 'database', color: '#2d3748' },
  { name: 'Firebase', icon: 'firebase', color: '#ffca28' },
  { name: 'Codex', icon: 'codex', color: '#10a37f' },
  { name: 'Claude', icon: 'claude', color: '#d97757' },
  { name: 'Cursor', icon: 'cursor', color: '#ffffff' },
  { name: 'OpenAI API', icon: 'openai', color: '#10a37f' },
  { name: 'VS Code', icon: 'vscode', color: '#007acc' },
  { name: 'Git', icon: 'git', color: '#f05032' },
  { name: 'GitHub', icon: 'github', color: '#ffffff' },
  { name: 'Linux', icon: 'linux', color: '#f5b301' },
  { name: 'Ubuntu', icon: 'ubuntu', color: '#e95420' },
  { name: 'Security Fundamentals', icon: 'security', color: '#22d3ee' },
  { name: 'Security Domains', icon: 'domains', color: '#60a5fa' },
  { name: 'Threats', icon: 'threats', color: '#f87171' },
  { name: 'Risks', icon: 'risks', color: '#fbbf24' },
  { name: 'Vulnerabilities', icon: 'vulnerabilities', color: '#a78bfa' },
]

export const techStackGroups = [
  {
    title: 'Frontend',
    description: 'Web languages and frameworks',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React.js', 'Next.js'],
  },
  {
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications',
    technologies: ['React Native', 'Expo', 'Flutter'],
  },
  {
    title: 'Backend',
    description: 'Server-side development',
    technologies: ['Node.js', 'Express.js', 'Python', 'Django'],
  },
  {
    title: 'Database & Storage',
    description: 'Data persistence and services',
    technologies: ['PostgreSQL', 'Prisma', 'Firebase'],
  },
  {
    title: 'AI Coding Tools',
    description: 'AI-assisted development',
    technologies: ['Codex', 'Claude', 'Cursor'],
  },
  {
    title: 'AI Integration',
    description: 'AI services integrated in projects',
    technologies: ['OpenAI API'],
  },
  {
    title: 'Development Tools',
    description: 'Editor, version control, and systems',
    technologies: ['VS Code', 'Git', 'GitHub', 'Ubuntu', 'Linux'],
  },
  {
    title: 'Cybersecurity Knowledge',
    description: 'Foundational cybersecurity concepts',
    technologies: [
      'Security Fundamentals',
      'Security Domains',
      'Threats',
      'Risks',
      'Vulnerabilities',
    ],
  },
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
  {
    name: 'Ahmad Arif',
    role: 'Senior Developer & Supervisor',
    company: 'WebSolLive',
    initials: 'A',
    accent: '#34d399',
    email: 'ahmadarifdev786@gmail.com',
    relationship:
      'My senior and direct supervisor, who guided me on professional development projects including Erafit.',
    status: 'Awaiting approval',
  },
  {
    name: 'Umar Hayat',
    role: 'Chief Executive Officer',
    company: 'Haytrix (Pvt) Ltd',
    location: 'Islamabad, ICT',
    initials: 'UH',
    accent: '#60a5fa',
    relationship: 'CEO of the company that issued my experience letter.',
    status: 'Awaiting approval',
  },
  {
    name: 'Dilshad Ahmad',
    role: 'CO',
    company: 'BISE Bahawalpur',
    initials: 'DA',
    accent: '#fbbf24',
    quote:
      'Muhammad Ali Khan is a dedicated developer with a strong willingness to learn. His thoughtful approach to problem-solving and commitment to improving his skills are qualities I appreciate.',
  },
  {
    name: 'Muhammad Arshad',
    role: 'UDC',
    company: 'Allama Iqbal Open University',
    initials: 'MA',
    accent: '#c084fc',
    quote:
      'Ali brings curiosity and dedication to his work. He welcomes feedback, approaches challenges thoughtfully, and keeps improving his development skills. His willingness to learn makes him a valuable team member.',
    status: 'Awaiting approval',
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
