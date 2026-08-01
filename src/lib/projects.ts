export interface Testimonial {
  message: string;
  clientName: string;
  clientImage?: string;
  companyName: string;
}

export interface SystemUser {
  name: string;
  logo?: string;
  location: string;
  usage: string;
}

export interface Screenshot {
  url: string;
  title: string;
  subtitle: string;
  features: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  metrics: string[];
  themeColor: string;
  mockupType: "desktop" | "mobile";
  imageUrl: string;
  createdAt: string;
  updated_at: string;
  screenshots?: Screenshot[];
  reports?: { name: string; url: string }[];
  users?: SystemUser[];
  testimonials?: Testimonial[];
}

// ─── Projects ───────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "lms",
    slug: "lms",
    title: "Learning Management System",
    subtitle: "EdTech Platform",
    description:
      "A comprehensive LMS serving 50,000+ learners. Features include live video lectures, AI-powered assessments, custom course creation, and a real-time analytics dashboard for educators.",
    techStack: ["React", "Next.js", "MySQL", "Prisma ORM"],
    metrics: ["50K+ Active Users", "99.9% Uptime"],
    themeColor: "#38bdf8",
    mockupType: "desktop",
    imageUrl: "/images/projects/lms.jpg",
    createdAt: "2026-07-10T12:00:00Z",
    updated_at: "2026-07-10T15:00:00Z",
    screenshots: [
      {
        url: "/Projects/LMS/Screenshots/student-dashboard.png",
        title: "Student Learning Dashboard",
        subtitle: "Personalized Learning Hub",
        features: [
          "Course progress tracking",
          "Upcoming assignments & deadlines",
          "Performance analytics overview",
        ],
      },
      {
        url: "/Projects/LMS/Screenshots/course-viewer.png",
        title: "Interactive Course Viewer",
        subtitle: "Live & Recorded Lectures",
        features: [
          "HD video streaming with WebRTC",
          "Real-time Q&A chat panel",
          "Downloadable course materials",
        ],
      },
      {
        url: "/Projects/LMS/Screenshots/teacher-panel.png",
        title: "Educator Management Panel",
        subtitle: "Course & Student Management",
        features: [
          "Batch student enrollment controls",
          "Assignment creation & grading tools",
          "Class performance heatmaps",
        ],
      },
      {
        url: "/Projects/LMS/Screenshots/assessments.png",
        title: "AI-Powered Assessment Engine",
        subtitle: "Smart Evaluations",
        features: [
          "Auto-generated question banks",
          "Instant result computation",
          "Plagiarism detection integration",
        ],
      },
      {
        url: "/Projects/LMS/Screenshots/analytics-reports.png",
        title: "Analytics & Reports Dashboard",
        subtitle: "Data-Driven Insights",
        features: [
          "Enrollment trends & KPI tracking",
          "Course category distribution charts",
          "Top performing courses leaderboard",
        ],
      },
    ],
    users: [
      {
        name: "Quality Econ",
        location: "www.krishankasthuriarachchi.lk",
        usage: "Online A/L Economics tuition platform",
        logo: "/Projects/LMS/lms-logo.jpg",
      },
    ],
    testimonials: [
      {
        message:
          "The LMS platform has transformed how we deliver online education. Our students can access live lectures, recorded content, and assessments all in one place. The system handles thousands of concurrent users without any performance issues.",
        clientName: "Krishan Kasthuriarachchi",
        companyName: "Quality Econ",
        clientImage: "/Projects/LMS/lms-logo.jpg",
      },
    ],
  },
  {
    id: "roadservice",
    slug: "roadservice",
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
    updated_at: "2026-06-15T09:00:00Z",
  },
  {
    id: "pos",
    slug: "pos",
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
    updated_at: "2026-05-20T15:00:00Z",
  },
  {
    id: "cinevista",
    slug: "cinevista",
    title: "CineVista",
    subtitle: "Cinema Booking Portal",
    description:
      "Sri Lanka's most immersive theatrical experience portal featuring Dolby Atmos, 4K Laser Projection, IMAX-grade comfort, and a multi-lingual, real-time ticket booking and seating layout system.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Context API",
    ],
    metrics: [
      "Multi-lingual Support",
      "4K Laser Projection",
      "Interactive Seating",
    ],
    themeColor: "#C9A84C",
    mockupType: "desktop",
    imageUrl: "/images/projects/cinevista.jpg",
    createdAt: "2026-07-18T10:00:00Z",
    updated_at: "2026-07-18T12:00:00Z",
  },
  {
    id: "artflix",
    slug: "artflix",
    title: "Artflics",
    subtitle: "Artisan E-Commerce Store",
    description:
      "A luxury bespoke framing and art photography ecommerce platform for Artflics Digital Colour Lab. Features custom framing previews, magnetic interactions, interactive pricing, and fluid product display systems.",
    techStack: [
      "Next.js",
      "TypeScript",
      "GSAP",
      "Tailwind CSS",
      "React",
      "Framer Motion",
    ],
    metrics: [
      "Bespoke Art Catalog",
      "Custom Frame Previews",
      "GSAP Scroll Parallax",
    ],
    themeColor: "#b8966a",
    mockupType: "desktop",
    imageUrl: "/images/projects/artflix.jpg",
    createdAt: "2026-07-16T15:30:00Z",
    updated_at: "2026-07-16T16:00:00Z",
  },
  {
    id: "stc-computer-shop",
    slug: "stc-computer-shop",
    title: "STC Computer Shop",
    subtitle: "Interactive PC Builder & Store",
    description:
      "A robust customized PC builder and hardware e-commerce platform for STC Computer Shop. Features a dynamic compatibility-checking PC builder tool, responsive product catalog with multi-filters, shopping cart, and admin inventory management dashboard.",
    techStack: [
      "React",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "Tailwind CSS",
      "React Router",
    ],
    metrics: [
      "Custom PC Builder",
      "Compatibility Checking",
      "Inventory Dashboard",
    ],
    themeColor: "#3b82f6",
    mockupType: "desktop",
    imageUrl: "/images/projects/stc-computer-shop.jpg",
    createdAt: "2026-07-14T08:45:00Z",
    updated_at: "2026-07-14T09:00:00Z",
  },
  {
    id: "pharmacy-pos",
    slug: "pharmacy-pos",
    title: "Pharmacy POS System",
    subtitle: "Healthcare Retail & Inventory Management",
    description:
      "A customized, offline-capable Point of Sale and inventory control system built specifically for pharmacies. It handles drug batch tracking, expiry notification loops, prescription billing, and automated sales reporting.",
    techStack: ["Java", "JavaFX", "MySQL", "Hibernate ORM", "Jasper Reports"],
    metrics: [
      "Zero Dispensing Errors",
      "Batch Expiry Tracking",
      "100% Offline-Capable Transactions",
    ],
    themeColor: "#10b981",
    mockupType: "desktop",
    imageUrl: "/images/projects/pharmacy-pos.jpg",
    createdAt: "2026-07-19T09:30:00Z",
    updated_at: "2026-07-19T09:40:00Z",
    screenshots: [
      {
        url: "/Projects/Pharmacy POS/Pharmacy POS SS/login interface.png",
        title: "Secure User Authentication",
        subtitle: "Gatekeeping & Role Management",
        features: [
          "Role-based access controls",
          "Secure session tokens",
          "Instant user login validation",
        ],
      },
      {
        url: "/Projects/Pharmacy POS/Pharmacy POS SS/dashboard.png",
        title: "Real-time Performance Dashboard",
        subtitle: "Analytics Overview",
        features: [
          "Daily sales analytics graph",
          "Current day key performance metrics (KPIs)",
          "Inventory stock overview indicators",
        ],
      },
      {
        url: "/Projects/Pharmacy POS/Pharmacy POS SS/product management.png",
        title: "Comprehensive Inventory Controls",
        subtitle: "Stock & Expiry Management",
        features: [
          "Detailed batch tracking metrics",
          "Real-time expiry warning loops",
          "Single stock inventory list search",
        ],
      },
      {
        url: "/Projects/Pharmacy POS/Pharmacy POS SS/invoice.png",
        title: "Fast POS Billing Checkout",
        subtitle: "Invoice Generation",
        features: [
          "Real-time item selection & billing calculations",
          "Flexible tax & discount modifiers",
          "Direct transaction checkout validation",
        ],
      },
    ],
    reports: [
      {
        name: "Close Sale Report",
        url: "/Projects/Pharmacy POS/Pharmacy POS Report/close-sale.pdf",
      },
      {
        name: "Invoice Bill 06-20",
        url: "/Projects/Pharmacy POS/Pharmacy POS Report/invoice_bill 06-20.pdf",
      },
      {
        name: "Sale Report",
        url: "/Projects/Pharmacy POS/Pharmacy POS Report/sale_report.pdf",
      },
      {
        name: "Stock Balance Report",
        url: "/Projects/Pharmacy POS/Pharmacy POS Report/stockBalance.pdf",
      },
    ],
    users: [
      {
        name: "Ayusha Pharmacy & Grocery",
        location: "Welikadamulla, Sri Lanka",
        logo: "/Projects/Pharmacy POS/final logo.png",
        usage: "Daily retail sales & inventory management",
      },
    ],
    testimonials: [
      {
        message:
          "We purchased the single-stock POS system to streamline our new pharmacy business. We've been using it for over a year without any issues. The team has been extremely supportive, delivering custom modifications and sorting out our queries in record time.",
        clientName: "Milani Wijewardhana",
        clientImage: "/Projects/Pharmacy POS/final logo.png",
        companyName: "Ayusha Pharmacy & Grocery",
      },
    ],
  },
];
