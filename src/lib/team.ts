export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  bio: string;
  image: string;
  linkedin: string;
  gradient: string;
  orderNumber: number;
  visibility: boolean;
}

// ─── Team ────────────────────────────────────────────────────────────────────
export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Vihanga Heshan",
    role: "Founder & CEO",
    email: "vihanga@quantumblaze.lk",
    bio: "Visionary leader with a passion for building scalable digital products and architecting the future of tech.",
    image: "/team/vihanga-heshan-CEO.png",
    linkedin: "https://www.linkedin.com/in/vihanga-heshan",
    gradient: "from-sky-500 to-blue-700",
    orderNumber: 1,
    visibility: true,
  },
  {
    id: "co-founder",
    name: "Akil Abimanash",
    role: "Co Founder",
    email: "akil@quantumblaze.lk",
    bio: "Driving growth and strategic partnerships to establish Quantum Blaze as a market leader in digital innovation.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    gradient: "from-blue-500 to-indigo-700",
    orderNumber: 5,
    visibility: false,
  },
  {
    id: "lead-dev",
    name: "Ravishka Indraji",
    role: "Lead Software Developer",
    email: "ravishka@quantumblaze.lk",
    bio: "Expert in complex system architecture and full-stack engineering, ensuring robust and high-performance solutions.",
    image: "/team/Ravishka-Lead-SE.png",
    linkedin: "#",
    gradient: "from-sky-400 to-cyan-700",
    orderNumber: 2,
    visibility: true,
  },
  {
    id: "developer",
    name: "Supun Sulakshana",
    role: "Software Developer",
    email: "supun@quantumblaze.lk",
    bio: "Dedicated software engineer focused on building efficient, scalable backend systems and seamless integrations.",
    image: "/team/Supun-senior-developer.jpeg",
    linkedin: "#",
    gradient: "from-sky-500 to-blue-600",
    orderNumber: 4,
    visibility: true,
  },
  {
    id: "creator",
    name: "Thenuranga Dhananjaya",
    role: "Digital Creator",
    email: "thenuranga@quantumblaze.lk",
    bio: "Creative mind behind our digital storytelling and brand content, bridging the gap between tech and creativity.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256&h=256",
    linkedin: "#",
    gradient: "from-blue-600 to-indigo-800",
    orderNumber: 6,
    visibility: false,
  },
];

export const fullTeam = team;
