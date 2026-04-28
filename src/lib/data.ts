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
    image: "/images/projects/lms.png",
  },
  {
    id: "roadservice",
    number: "02",
    title: "Mobile Road-Service Application",
    subtitle: "Consumer Mobile App",
    description:
      "A comprehensive roadside assistance app connecting drivers to certified mechanics in real-time. Features GPS tracking, in-app payments, service history, and a mechanic marketplace — all in a blazingly fast Flutter app.",
    tech: [
      "Flutter",
      "Node.js",
      "Google Maps API",
      "Stripe",
      "Firebase",
      "PostgreSQL",
    ],
    metrics: ["10K+ Downloads", "4.8★ App Rating", "< 3min Response"],
    color: "#0ea5e9",
    mockupType: "mobile",
    image: "/images/projects/roadservice.png",
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
    image: "/images/projects/pos.png",
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

// ─── Team ────────────────────────────────────────────────────────────────────
export const team = [
  {
    id: "founder",
    name: "Vihanga Heshan",
    role: "Founder & CEO",
    bio: "Visionary leader with 10+ years building scalable digital products for global markets.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-500 to-blue-700",
  },
  {
    id: "cto",
    name: "Ravishka Indraji",
    role: "Tech Lead",
    bio: "Full-stack engineer and cloud architect. Expert in distributed systems and high-scale applications.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "design",
    name: "Lakshan Maduranga",
    role: "Head of Design",
    bio: "UI/UX designer obsessed with creating immersive digital experiences that convert and delight.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-400 to-cyan-700",
  },
  {
    id: "admin",
    name: "Supun Sulakshana",
    role: "Administrator & HR",
    bio: "Administrator and HR with a passion for building great products.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-cyan-500 to-sky-700",
  },
];

export const fullTeam = [
  ...team,
  {
    id: "frontend",
    name: "Kasun Perera",
    role: "Frontend Engineer",
    bio: "React and Next.js specialist focused on creating buttery-smooth user interfaces.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    id: "backend",
    name: "Nimesh Silva",
    role: "Backend Engineer",
    bio: "Node.js and Database expert. Ensures our APIs are blazing fast and secure.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-blue-600 to-indigo-800",
  },
  {
    id: "qa",
    name: "Amandi Fernando",
    role: "QA Automation Engineer",
    bio: "Dedicated to breaking things before users do. Masters in automated testing pipelines.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-cyan-400 to-sky-600",
  },
  {
    id: "mobile_dev",
    name: "Thilina Bandara",
    role: "Mobile Developer",
    bio: "Flutter enthusiast. Builds beautiful iOS and Android apps from a single codebase.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    github: "#",
    gradient: "from-sky-600 to-cyan-800",
  },
];

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
    description: "HIPAA-compliant platforms, telemedicine apps, and secure patient portals.",
    icon: "HeartPulse",
    metric: "10M+",
    metricLabel: "Patient Records Secured",
    color: "#06b6d4", // Cyan
  },
  {
    id: "edtech",
    title: "Education & EdTech",
    description: "Scalable LMS platforms, virtual classrooms, and student analytics dashboards.",
    icon: "GraduationCap",
    metric: "200+",
    metricLabel: "Institutions Onboarded",
    color: "#3b82f6", // Blue
  },
  {
    id: "fintech",
    title: "FinTech & Banking",
    description: "High-frequency trading platforms, digital wallets, and blockchain solutions.",
    icon: "Wallet",
    metric: "$2B+",
    metricLabel: "Transactions Processed",
    color: "#10b981", // Emerald
  },
  {
    id: "retail",
    title: "E-commerce & Retail",
    description: "Omnichannel retail systems, multi-vendor marketplaces, and smart inventory.",
    icon: "ShoppingCart",
    metric: "50K+",
    metricLabel: "Daily Orders Handled",
    color: "#8b5cf6", // Violet
  },
  {
    id: "logistics",
    title: "Logistics & Supply Chain",
    description: "Real-time fleet tracking, warehouse automation, and predictive route planning.",
    icon: "Truck",
    metric: "99.9%",
    metricLabel: "Tracking Accuracy",
    color: "#f59e0b", // Amber
  },
];

