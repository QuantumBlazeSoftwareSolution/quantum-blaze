"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

interface TechItem {
  name: string;
  category: string;
  description: string;
  logo: React.ReactNode;
}

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "Database & Cache",
  "Cloud & DevOps",
];

const techItems: TechItem[] = [
  {
    name: "Next.js",
    category: "Frontend",
    description: "Production-grade React framework for static & server rendering.",
    logo: (
      <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 180 180">
        <path d="M142.124 165.75L71.393 72.825V148.5H53.625V42.75H72.812L134.908 124.08V42.75H152.625V165.75H142.124ZM90 0C39.99 0 0 39.99 0 90C0 140.01 39.99 180 90 180C140.01 180 180 140.01 180 90C180 39.99 140.01 0 90 0Z" />
      </svg>
    ),
  },
  {
    name: "React",
    category: "Frontend",
    description: "Component-based UI library for modern web ecosystems.",
    logo: (
      <svg className="w-8 h-8 text-sky-400 fill-none stroke-current stroke-[1.5]" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="8" ry="20" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="20" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="8" ry="20" transform="rotate(120 50 50)" />
        <circle cx="50" cy="50" r="3" className="fill-sky-400" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Statically typed superset of JavaScript for bulletproof code.",
    logo: (
      <svg className="w-8 h-8 text-blue-500 fill-current" viewBox="0 0 100 100">
        <path d="M0 0h100v100H0z" className="fill-[#007acc]" />
        <path d="M85 85H70V58H58v27H43V15h42zm-58 0H12V32h28v12H27v29h15v12z" className="fill-white" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS framework for fast, custom layout styling.",
    logo: (
      <svg className="w-8 h-8 text-cyan-400 fill-current" viewBox="0 0 100 100">
        <path d="M50 25c-8.3 0-14.6 4.2-18.8 12.5C37.5 25 43.8 20.8 50 20.8c12.5 0 18.8 6.3 18.8 18.8 0 8.3-4.2 14.6-12.5 18.8 12.5-6.3 16.7-12.5 12.5-18.8C64.6 31.3 58.3 25 50 25zm-25 25c-8.3 0-14.6 4.2-18.8 12.5C12.5 50 18.8 45.8 25 45.8c12.5 0 18.8 6.3 18.8 18.8 0 8.3-4.2 14.6-12.5 18.8 12.5-6.3 16.7-12.5 12.5-18.8-4.2-8.3-10.5-12.5-18.8-12.5z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for building fast, scalable network applications.",
    logo: (
      <svg className="w-8 h-8 text-green-500 fill-current" viewBox="0 0 100 100">
        <path d="M46.7 15.5l-26.6 15.3c-2.4 1.4-3.9 4-3.9 6.8v30.7c0 2.8 1.5 5.4 3.9 6.8l26.6 15.3c2.4 1.4 5.3 1.4 7.7 0l26.6-15.3c2.4-1.4 3.9-4 3.9-6.8V37.6c0-2.8-1.5-5.4-3.9-6.8L54.4 15.5c-2.4-1.4-5.3-1.4-7.7 0z" className="fill-none stroke-current stroke-[4]" />
        <path d="M50 30v40m-15-20l30 0" className="stroke-current stroke-[4]" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend",
    description: "Versatile programming language for web backends and data systems.",
    logo: (
      <svg className="w-8 h-8 text-yellow-500 fill-current" viewBox="0 0 100 100">
        <path d="M50 10c-16 0-15 7-15 11v8h30v-4c0-4.4-3.6-15-15-15zm-7 6a2 2 0 110-4 2 2 0 010 4zm22 55c16 0 15-7 15-11v-8H50v4c0 4.4 3.6 15 15 15zm-7-6a2 2 0 110-4 2 2 0 010 4z" />
        <path d="M35 29c-10 0-15 5-15 15v16c0 10 5 15 15 15h30c10 0 15-5 15-15V44c0-10-5-15-15-15H35zm0 15v26H28V44h7zm37 0v26h-7V44h7z" className="opacity-80" />
      </svg>
    ),
  },
  {
    name: "Flutter",
    category: "Mobile",
    description: "Google's UI toolkit for natively compiled cross-platform apps.",
    logo: (
      <svg className="w-8 h-8 text-sky-400 fill-current" viewBox="0 0 100 100">
        <path d="M52 10L25 37l12 12L76 10H52zm-2 36L25 71l12 12L74 46H50z" />
      </svg>
    ),
  },
  {
    name: "React Native",
    category: "Mobile",
    description: "Open-source framework for building native apps using React.",
    logo: (
      <svg className="w-8 h-8 text-sky-300 fill-none stroke-current stroke-[2]" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="10" ry="25" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="10" ry="25" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="50" rx="10" ry="25" transform="rotate(150 50 50)" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Database & Cache",
    description: "Robust open-source relational database supporting heavy transactions.",
    logo: (
      <svg className="w-8 h-8 text-blue-400 fill-current" viewBox="0 0 100 100">
        <path d="M50 12c-20 0-30 12-30 25c0 10 6 18 15 22l-3 15h10l2-10c2 0 4 .5 6 .5c15 0 25-10 25-24.5C75 25 68 12 50 12z" />
      </svg>
    ),
  },
  {
    name: "Redis",
    category: "Database & Cache",
    description: "In-memory database used as a cache and message broker.",
    logo: (
      <svg className="w-8 h-8 text-red-500 fill-current" viewBox="0 0 100 100">
        <path d="M12 25h76L76 50H24L12 25zm6 30h64L68 80H32L18 55z" />
      </svg>
    ),
  },
  {
    name: "Prisma",
    category: "Database & Cache",
    description: "Next-generation ORM for Node.js & TypeScript.",
    logo: (
      <svg className="w-8 h-8 text-indigo-400 fill-current" viewBox="0 0 100 100">
        <path d="M50 10L15 70h70L50 10zm0 18L70 62H30L50 28z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    description: "Secure, reliable, and scalable cloud computing services.",
    logo: (
      <svg className="w-8 h-8 text-orange-400 fill-current" viewBox="0 0 100 100">
        <path d="M20 50c0-15 15-20 30-20s30 5 30 20S65 70 50 70 20 65 20 50z" className="opacity-20" />
        <path d="M30 65s15 10 20 10 20-10 20-10m-35 5s12 15 15 15 15-15 15-15" fill="none" className="stroke-current stroke-[4]" />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    description: "Platform for containerizing and shipping software application code.",
    logo: (
      <svg className="w-8 h-8 text-sky-400 fill-current" viewBox="0 0 100 100">
        <path d="M10 50c0 15 10 25 25 25h40c10 0 15-8 15-15 0-10-8-12-8-12s3-2 3-8c0-8-8-10-8-10H10v20z" />
        <rect x="20" y="25" width="8" height="8" className="fill-slate-900" />
        <rect x="32" y="25" width="8" height="8" className="fill-slate-900" />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    category: "Cloud & DevOps",
    description: "Open-source container orchestration engine for automated scaling.",
    logo: (
      <svg className="w-8 h-8 text-blue-500 fill-current" viewBox="0 0 100 100">
        <path d="M50 10l35 15v40L50 90 15 65V25l35-15zm0 10L23 32v30L50 80l27-18V32L50 20z" />
      </svg>
    ),
  },
];

function TiltCard({ item }: { item: TechItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tracking cursor offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs to make animations buttery-smooth
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-52 w-full group"
    >
      <BorderGlow
        edgeSensitivity={30}
        glowColor="200 80 80"
        backgroundColor="#070f1d"
        borderRadius={16}
        glowRadius={30}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#0ea5e9', '#38bdf8', '#7dd3fc']}
        className="w-full h-full border-none"
      >
        <div 
          className="p-6 h-full flex flex-col justify-between"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          <div>
            <div className="w-12 h-12 p-2 bg-slate-950/80 rounded-xl border border-slate-900 flex items-center justify-center shrink-0 mb-4 group-hover:scale-105 group-hover:border-sky-500/30 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all duration-300">
              {item.logo}
            </div>
            <h3 className="font-bold text-slate-100 text-sm md:text-base group-hover:text-sky-300 transition-colors duration-200">
              {item.name}
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400/80 mt-0.5 block">
              {item.category}
            </span>
          </div>

          <p 
            className="text-xs text-slate-400 mt-3 leading-relaxed relative z-10"
            style={{ transform: "translateZ(15px)" }}
          >
            {item.description}
          </p>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech =
    activeCategory === "All"
      ? techItems
      : techItems.filter((t) => t.category === activeCategory);

  return (
    <section 
      id="techstack"
      className="relative py-24 bg-[#050b14]/60 overflow-hidden border-t border-slate-900"
    >
      {/* Visual background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[150px] bg-sky-500/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 font-grotesk">
            The Power Under <span className="text-sky-400">the Hood</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed">
            We master the tools that define modern software — from frontend frameworks to cloud infrastructure.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-slate-900 pb-6">
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer overflow-hidden"
              >
                <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"}`}>
                  {cat}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-sky-500/10 border border-sky-500/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={tech.name}
                style={{ perspective: 1000 }}
              >
                <TiltCard item={tech} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
