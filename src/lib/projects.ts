export interface Project {
  id: string;
  slug: string;
  orderNumber: number;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics: string[];
  themeColor: string;
  mockupType: "desktop" | "mobile";
  imageUrl: string;
  createdAt: string;
}

// ─── Projects ───────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "lms",
    slug: "lms",
    orderNumber: 1,
    title: "Learning Management System",
    subtitle: "EdTech Platform",
    description:
      "A comprehensive LMS serving 50,000+ learners. Features include live video lectures, AI-powered assessments, custom course creation, and a real-time analytics dashboard for educators.",
    techStack: ["Next.js", "PostgreSQL", "WebRTC", "Prisma", "AWS", "Redis"],
    metrics: ["50K+ Active Users", "99.9% Uptime"],
    themeColor: "#38bdf8",
    mockupType: "desktop",
    imageUrl: "/images/projects/lms.jpg",
    createdAt: "2026-07-10T12:00:00Z",
  },
  {
    id: "roadservice",
    slug: "roadservice",
    orderNumber: 2,
    title: "Mobile Road-Service Application",
    subtitle: "Consumer Mobile App",
    description:
      "A comprehensive roadside assistance app connecting drivers to certified mechanics in real-time. Features GPS tracking, in-app payments, service history, and a mechanic marketplace — all in a blazingly fast Flutter app.",
    techStack: [
      "Flutter",
      "Node.js",
      "Google Maps API",
      "Stripe",
      "Firebase",
      "PostgreSQL",
    ],
    metrics: ["10K+ Downloads", "4.8★ App Rating", "< 3min Response"],
    themeColor: "#0ea5e9",
    mockupType: "mobile",
    imageUrl: "/images/projects/roadservice.png",
    createdAt: "2026-06-15T08:30:00Z",
  },
  {
    id: "pos",
    slug: "pos",
    orderNumber: 3,
    title: "Retail Point-of-Sale System",
    subtitle: "Enterprise Software",
    description:
      "A full-featured POS system for retail chains with inventory management, multi-store reporting, loyalty programs, and offline-capable transactions. Processes 10,000+ transactions per day with 100% reliability.",
    techStack: [
      "Electron",
      "React",
      "SQLite",
      "Node.js",
      "PostgreSQL",
      "Prisma",
    ],
    metrics: ["10K+ Daily Txns", "Multi-Store", "Offline-ready"],
    themeColor: "#7dd3fc",
    mockupType: "desktop",
    imageUrl: "/images/projects/pos.png",
    createdAt: "2026-05-20T14:45:00Z",
  },
  {
    id: "pharmacy-pos",
    slug: "pharmacy-pos",
    orderNumber: 4,
    title: "Quantum Blaze Pharmacy POS",
    subtitle: "Advanced Pharmacy Management Software",
    description:
      "A high-performance, 100% offline-first pharmacy management and POS system. Available in Single-Stock and Multi-Batch editions, the software features pre-loaded 6,500+ NMRA registered medicines, real-time expiry alerts, anti-theft inventory controls, and automatic daily hardware backups under a lifetime license model.",
    techStack: ["JavaFX", "Hibernate JPA", "MySQL", "Desktop Architecture"],
    metrics: ["6,500+ NMRA Meds", "100% Offline Capable", "Lifetime License"],
    themeColor: "#00E5FF",
    mockupType: "desktop",
    imageUrl: "/images/projects/pharmacy-pos.png",
    createdAt: "2026-07-11T16:00:00Z",
  },
];
