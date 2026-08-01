"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";
import {
  NextJSIcon,
  ReactJSIcon,
  TypescriptIcon,
  TailwindIcon,
  NodeJSIcon,
  PythonIcon,
  FlutterIcon,
  PostgreSQLIcon,
  RedisIcon,
  AWSIcon,
  DockerIcon,
  KubernetesIcon,
  JavaIcon,
  SpringBootIcon,
  NestJSIcon,
  MongoDBIcon,
  MySQLIcon,
} from "../TechIcons";

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
    logo: <NextJSIcon />,
  },
  {
    name: "React",
    category: "Frontend",
    description: "Component-based UI library for modern web ecosystems.",
    logo: <ReactJSIcon />,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Statically typed superset of JavaScript for bulletproof code.",
    logo: <TypescriptIcon />,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS framework for fast, custom layout styling.",
    logo: <TailwindIcon />,
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for building fast, scalable network applications.",
    logo: <NodeJSIcon />,
  },
  {
    name: "Python",
    category: "Backend",
    description: "Versatile programming language for web backends and data systems.",
    logo: <PythonIcon />,
  },
  {
    name: "Flutter",
    category: "Mobile",
    description: "Google's UI toolkit for natively compiled cross-platform apps.",
    logo: <FlutterIcon />,
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
    logo: <PostgreSQLIcon />,
  },
  {
    name: "Redis",
    category: "Database & Cache",
    description: "In-memory database used as a cache and message broker.",
    logo: <RedisIcon />,
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
    logo: <AWSIcon />,
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    description: "Platform for containerizing and shipping software application code.",
    logo: <DockerIcon />,
  },
  {
    name: "Kubernetes",
    category: "Cloud & DevOps",
    description: "Open-source container orchestration engine for automated scaling.",
    logo: <KubernetesIcon />,
  },
  {
    name: "Java",
    category: "Backend",
    description: "Object-oriented, class-based language built for secure enterprise systems.",
    logo: <JavaIcon />,
  },
  {
    name: "Spring Boot",
    category: "Backend",
    description: "Open-source Java-based framework used to build stand-alone, production-ready microservices.",
    logo: <SpringBootIcon />,
  },
  {
    name: "NestJS",
    category: "Backend",
    description: "A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.",
    logo: <NestJSIcon />,
  },
  {
    name: "MongoDB",
    category: "Database & Cache",
    description: "Document-based distributed database designed for modern web applications.",
    logo: <MongoDBIcon />,
  },
  {
    name: "NeonDB",
    category: "Database & Cache",
    description: "Serverless Postgres database built for performance, scalability, and branching workflows.",
    logo: (
      <svg className="w-8 h-8 text-green-400 fill-current" viewBox="0 0 100 100">
        <path d="M20 70l30-50 30 50H20zm12-8h36L50 32 32 62z" />
      </svg>
    ),
  },
  {
    name: "Drizzle ORM",
    category: "Database & Cache",
    description: "Next-gen TypeScript ORM designed for speed, type safety, and developer efficiency.",
    logo: (
      <svg className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="35" fill="none" className="stroke-current stroke-[4]" />
        <circle cx="40" cy="40" r="5" />
        <circle cx="60" cy="40" r="5" />
        <path d="M35 60c5 5 15 10 25 0" fill="none" className="stroke-current stroke-[4]" />
      </svg>
    ),
  },
  {
    name: "MySQL",
    category: "Database & Cache",
    description: "Fast, reliable, and secure open-source relational database management system.",
    logo: <MySQLIcon />,
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
