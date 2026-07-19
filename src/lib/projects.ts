export interface Testimonial {
  message: string;
  clientName: string;
  clientImage?: string; // Optional, can fall back to initials if missing
  pharmacyName: string;
}

export interface SystemUser {
  name: string;
  logo?: string; // Optional, falls back to initials
  location: string;
  usage: string;
}

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
  screenshots?: string[];
  reports?: { name: string; url: string }[];
  users?: SystemUser[];
  testimonials?: Testimonial[];
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
    techStack: ["Electron", "React", "SQLite", "Node.js", "PostgreSQL", "Prisma"],
    metrics: ["10K+ Daily Txns", "Multi-Store", "Offline-ready"],
    themeColor: "#7dd3fc",
    mockupType: "desktop",
    imageUrl: "/images/projects/pos.png",
    createdAt: "2026-05-20T14:45:00Z",
  },
  {
    id: "cinevista",
    slug: "cinevista",
    orderNumber: 4,
    title: "CineVista",
    subtitle: "Cinema Booking Portal",
    description:
      "Sri Lanka's most immersive theatrical experience portal featuring Dolby Atmos, 4K Laser Projection, IMAX-grade comfort, and a multi-lingual, real-time ticket booking and seating layout system.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Context API"],
    metrics: ["Multi-lingual Support", "4K Laser Projection", "Interactive Seating"],
    themeColor: "#C9A84C",
    mockupType: "desktop",
    imageUrl: "/images/projects/cinevista.jpg",
    createdAt: "2026-07-18T10:00:00Z",
  },
  {
    id: "artflix",
    slug: "artflix",
    orderNumber: 5,
    title: "Artflics",
    subtitle: "Artisan E-Commerce Store",
    description:
      "A luxury bespoke framing and art photography ecommerce platform for Artflics Digital Colour Lab. Features custom framing previews, magnetic interactions, interactive pricing, and fluid product display systems.",
    techStack: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "React", "Framer Motion"],
    metrics: ["Bespoke Art Catalog", "Custom Frame Previews", "GSAP Scroll Parallax"],
    themeColor: "#b8966a",
    mockupType: "desktop",
    imageUrl: "/images/projects/artflix.jpg",
    createdAt: "2026-07-16T15:30:00Z",
  },
  {
    id: "stc-computer-shop",
    slug: "stc-computer-shop",
    orderNumber: 6,
    title: "STC Computer Shop",
    subtitle: "Interactive PC Builder & Store",
    description:
      "A robust customized PC builder and hardware e-commerce platform for STC Computer Shop. Features a dynamic compatibility-checking PC builder tool, responsive product catalog with multi-filters, shopping cart, and admin inventory management dashboard.",
    techStack: ["React", "Vite", "Firebase Auth", "Firestore", "Tailwind CSS", "React Router"],
    metrics: ["Custom PC Builder", "Compatibility Checking", "Inventory Dashboard"],
    themeColor: "#3b82f6",
    mockupType: "desktop",
    imageUrl: "/images/projects/stc-computer-shop.jpg",
    createdAt: "2026-07-14T08:45:00Z",
  },
  {
    id: "pharmacy-pos",
    slug: "pharmacy-pos",
    orderNumber: 7,
    title: "Pharmacy POS System",
    subtitle: "Healthcare Retail & Inventory Management",
    description:
      "A customized, offline-capable Point of Sale and inventory control system built specifically for pharmacies. It handles drug batch tracking, expiry notification loops, prescription billing, and automated sales reporting.",
    techStack: ["Electron", "React", "Node.js", "SQLite", "PostgreSQL", "Prisma"],
    metrics: [
      "Zero Dispensing Errors",
      "Batch Expiry Tracking",
      "100% Offline-Capable Transactions",
    ],
    themeColor: "#10b981",
    mockupType: "desktop",
    imageUrl: "/Projects/Pharmacy POS/Pharmacy POS SS/dashboard.png",
    createdAt: "2026-07-19T09:30:00Z",
    screenshots: [
      "/Projects/Pharmacy POS/Pharmacy POS SS/dashboard.png",
      "/Projects/Pharmacy POS/Pharmacy POS SS/invoice.png",
      "/Projects/Pharmacy POS/Pharmacy POS SS/login interface.png",
      "/Projects/Pharmacy POS/Pharmacy POS SS/product management.png",
    ],
    reports: [
      { name: "Close Sale Report", url: "/Projects/Pharmacy POS/Pharmacy POS Report/close-sale.pdf" },
      { name: "Invoice Bill 06-20", url: "/Projects/Pharmacy POS/Pharmacy POS Report/invoice_bill 06-20.pdf" },
      { name: "Sale Report", url: "/Projects/Pharmacy POS/Pharmacy POS Report/sale_report.pdf" },
      { name: "Stock Balance Report", url: "/Projects/Pharmacy POS/Pharmacy POS Report/stockBalance.pdf" },
    ],
    users: [
      { name: "Medicare Pharmacy", location: "Colombo, Sri Lanka", usage: "Main branch operations and drug sales" },
      { name: "Unity Health Pharmacy", location: "Kandy, Sri Lanka", usage: "Prescription billing and inventory management" },
      { name: "Suwasevana Pharmacy", location: "Galle, Sri Lanka", usage: "Batch tracking and expiry alerts" },
    ],
    testimonials: [
      {
        message: "The batch expiry alerts saved us from massive stock write-offs. This POS is incredibly reliable and works offline without internet issues.",
        clientName: "Dr. Amara Perera",
        pharmacyName: "Medicare Pharmacy",
      },
      {
        message: "Billing is lightning fast now, and the automated daily sales reporting has made our auditing completely pain-free.",
        clientName: "Nimal Fernando",
        pharmacyName: "Unity Health Pharmacy",
      },
    ],
  },
];
