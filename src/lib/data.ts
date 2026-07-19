// ─── Services ───────────────────────────────────────────────────────────────
export const services = [
  {
    id: "saas",
    icon: "Layout",
    title: "Enterprise SaaS Solutions",
    description:
      "We architect and build scalable, multi-tenant SaaS platforms that handle millions of users. From subscription billing to complex permission systems — we engineer the backbone of modern digital businesses.",
    features: [
      "Multi-tenant Architecture",
      "Real-time Analytics",
      "API-first Design",
      "Auto-scaling Infrastructure",
    ],
    accent: "#38bdf8",
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "High-performance iOS & Android applications built with Flutter and React Native. Buttery-smooth animations, offline-first architecture, and pixel-perfect UIs that users love.",
    features: [
      "Flutter & React Native",
      "Offline-first Architecture",
      "60fps Animations",
      "App Store Optimization",
    ],
    accent: "#0ea5e9",
  },
  {
    id: "web",
    icon: "Globe",
    title: "Custom Web Apps & Portals",
    description:
      "Complex web applications engineered for performance and scale. Enterprise portals, customer dashboards, real-time collaboration tools — built with modern frameworks that stand the test of time.",
    features: [
      "Next.js & React",
      "Real-time Collaboration",
      "Progressive Web Apps",
      "SEO & Core Web Vitals",
    ],
    accent: "#7dd3fc",
  },
];

export { type Project, projects } from "./projects";

// ─── Process Steps ───────────────────────────────────────────────────────────
export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description:
      "Deep-dive sessions to understand your goals, users, and technical constraints. We map out every requirement before writing a single line of code.",
    icon: "Search",
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Crafting the Experience",
    description:
      "High-fidelity prototypes and system design documentation. We validate the architecture and UX with your team before development begins.",
    icon: "Palette",
    duration: "Week 2–3",
  },
  {
    number: "03",
    title: "Architecture",
    subtitle: "Engineering the Foundation",
    description:
      "We design scalable system architecture with security, performance, and maintainability as first-class concerns — built to grow with your business.",
    icon: "Layers",
    duration: "Week 3–4",
  },
  {
    number: "04",
    title: "Development",
    subtitle: "Building with Precision",
    description:
      "Sprint-based development with CI/CD pipelines, automated testing, and weekly demos. You see real progress every single week.",
    icon: "Code2",
    duration: "Week 4–12",
  },
  {
    number: "05",
    title: "Deployment",
    subtitle: "Launching to the World",
    description:
      "Zero-downtime deployments, performance monitoring, and post-launch support. We don't just ship — we ensure your product thrives in production.",
    icon: "Rocket",
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

export { type TeamMember, team, fullTeam } from "./team";

// ─── Stats ───────────────────────────────────────────────────────────────────
export const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "40+", label: "Happy Clients" },
  { value: "5+", label: "Years of Excellence" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

// ─── Industries ──────────────────────────────────────────────────────────────
export const industries = [
  {
    id: "healthcare",
    title: "Healthcare & MedTech",
    description:
      "HIPAA-compliant platforms, telemedicine apps, and secure patient portals.",
    icon: "HeartPulse",
    metric: "10M+",
    metricLabel: "Patient Records Secured",
    color: "#06b6d4", // Cyan
  },
  {
    id: "edtech",
    title: "Education & EdTech",
    description:
      "Scalable LMS platforms, virtual classrooms, and student analytics dashboards.",
    icon: "GraduationCap",
    metric: "200+",
    metricLabel: "Institutions Onboarded",
    color: "#3b82f6", // Blue
  },
  {
    id: "fintech",
    title: "FinTech & Banking",
    description:
      "High-frequency trading platforms, digital wallets, and blockchain solutions.",
    icon: "Wallet",
    metric: "$2B+",
    metricLabel: "Transactions Processed",
    color: "#10b981", // Emerald
  },
  {
    id: "retail",
    title: "E-commerce & Retail",
    description:
      "Omnichannel retail systems, multi-vendor marketplaces, and smart inventory.",
    icon: "ShoppingCart",
    metric: "50K+",
    metricLabel: "Daily Orders Handled",
    color: "#8b5cf6", // Violet
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    description:
      "Real-time fleet tracking, warehouse automation, and predictive route planning.",
    icon: "Truck",
    metric: "99.9%",
    metricLabel: "Tracking Accuracy",
    color: "#f59e0b", // Amber
  },
];
