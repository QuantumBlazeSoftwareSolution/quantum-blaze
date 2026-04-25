// ─── Services ───────────────────────────────────────────────────────────────
export const services = [
  {
    id: "saas",
    icon: "🏗️",
    title: "Enterprise SaaS Solutions",
    description:
      "We architect and build scalable, multi-tenant SaaS platforms that handle millions of users. From subscription billing to complex permission systems — we engineer the backbone of modern digital businesses.",
    features: ["Multi-tenant Architecture", "Real-time Analytics", "API-first Design", "Auto-scaling Infrastructure"],
    accent: "#38bdf8",
  },
  {
    id: "mobile",
    icon: "📱",
    title: "Mobile App Development",
    description:
      "High-performance iOS & Android applications built with Flutter and React Native. Buttery-smooth animations, offline-first architecture, and pixel-perfect UIs that users love.",
    features: ["Flutter & React Native", "Offline-first Architecture", "60fps Animations", "App Store Optimization"],
    accent: "#0ea5e9",
  },
  {
    id: "web",
    icon: "🌐",
    title: "Custom Web Apps & Portals",
    description:
      "Complex web applications engineered for performance and scale. Enterprise portals, customer dashboards, real-time collaboration tools — built with modern frameworks that stand the test of time.",
    features: ["Next.js & React", "Real-time Collaboration", "Progressive Web Apps", "SEO & Core Web Vitals"],
    accent: "#7dd3fc",
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "lms",
    number: "01",
    title: "Multi-Tenant Learning Management System",
    subtitle: "EdTech Platform",
    description:
      "A comprehensive LMS serving 50,000+ learners across 200+ institutions. Features include live video lectures, AI-powered assessments, multi-tenant white-labeling, and a real-time analytics dashboard for educators.",
    tech: ["Next.js", "PostgreSQL", "WebRTC", "Prisma", "AWS", "Redis"],
    metrics: ["50K+ Active Users", "200+ Institutions", "99.9% Uptime"],
    color: "#38bdf8",
    mockupType: "desktop",
  },
  {
    id: "roadservice",
    number: "02",
    title: "Mobile Road-Service Application",
    subtitle: "Consumer Mobile App",
    description:
      "A comprehensive roadside assistance app connecting drivers to certified mechanics in real-time. Features GPS tracking, in-app payments, service history, and a mechanic marketplace — all in a blazingly fast Flutter app.",
    tech: ["Flutter", "Node.js", "Google Maps API", "Stripe", "Firebase", "PostgreSQL"],
    metrics: ["10K+ Downloads", "4.8★ App Rating", "< 3min Response"],
    color: "#0ea5e9",
    mockupType: "mobile",
  },
  {
    id: "pos",
    number: "03",
    title: "Retail Point-of-Sale System",
    subtitle: "Enterprise Software",
    description:
      "A full-featured POS system for retail chains with inventory management, multi-store reporting, loyalty programs, and offline-capable transactions. Processes 10,000+ transactions per day with 100% reliability.",
    tech: ["Electron", "React", "SQLite", "Node.js", "PostgreSQL", "Prisma"],
    metrics: ["10K+ Daily Txns", "Multi-Store", "Offline-ready"],
    color: "#7dd3fc",
    mockupType: "desktop",
  },
];

// ─── Process Steps ───────────────────────────────────────────────────────────
export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description:
      "Deep-dive sessions to understand your goals, users, and technical constraints. We map out every requirement before writing a single line of code.",
    icon: "🔍",
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Crafting the Experience",
    description:
      "High-fidelity prototypes and system design documentation. We validate the architecture and UX with your team before development begins.",
    icon: "🎨",
    duration: "Week 2–3",
  },
  {
    number: "03",
    title: "Architecture",
    subtitle: "Engineering the Foundation",
    description:
      "We design scalable system architecture with security, performance, and maintainability as first-class concerns — built to grow with your business.",
    icon: "🏛️",
    duration: "Week 3–4",
  },
  {
    number: "04",
    title: "Development",
    subtitle: "Building with Precision",
    description:
      "Sprint-based development with CI/CD pipelines, automated testing, and weekly demos. You see real progress every single week.",
    icon: "⚡",
    duration: "Week 4–12",
  },
  {
    number: "05",
    title: "Deployment",
    subtitle: "Launching to the World",
    description:
      "Zero-downtime deployments, performance monitoring, and post-launch support. We don't just ship — we ensure your product thrives in production.",
    icon: "🚀",
    duration: "Week 12+",
  },
];

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Flutter", category: "Mobile" },
  { name: "React Native", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Redis", category: "Cache" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "GraphQL", category: "API" },
  { name: "Firebase", category: "Platform" },
  { name: "Stripe", category: "Payments" },
  { name: "WebRTC", category: "Real-time" },
  { name: "Tailwind", category: "Styling" },
  { name: "Supabase", category: "BaaS" },
  { name: "Vercel", category: "Hosting" },
];

// ─── Team ────────────────────────────────────────────────────────────────────
export const team = [
  {
    id: "ceo",
    name: "Aryan Perera",
    role: "CEO & Co-Founder",
    bio: "Visionary leader with 10+ years building scalable digital products for global markets.",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-500 to-blue-700",
  },
  {
    id: "cto",
    name: "Kavinda Silva",
    role: "CTO & Lead Architect",
    bio: "Full-stack engineer and cloud architect. Expert in distributed systems and high-scale applications.",
    linkedin: "#",
    github: "#",
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "design",
    name: "Nimasha Fernando",
    role: "Head of Design",
    bio: "UI/UX designer obsessed with creating immersive digital experiences that convert and delight.",
    linkedin: "#",
    github: "#",
    gradient: "from-cyan-500 to-sky-700",
  },
  {
    id: "mobile",
    name: "Ravindu Jayaweera",
    role: "Lead Mobile Engineer",
    bio: "Flutter & React Native specialist. Has shipped 20+ apps to the App Store and Google Play.",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-400 to-cyan-700",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────
export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "40+", label: "Happy Clients" },
  { value: "5+", label: "Years of Excellence" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];
