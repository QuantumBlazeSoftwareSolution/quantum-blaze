"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowButton } from "@/components/ui/GlowButton";
import { useRouter } from "next/navigation";
import { type Project } from "@/lib/projects";
import { ArrowRight, Rocket, Search } from "lucide-react";

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#050b14] relative selection:bg-sky-500/30">
      <Navbar />

      {/* Hero Section (Sleek & Compact Header) */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        {/* Background glow effects */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ background: "rgba(14, 165, 233, 0.05)" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(14, 165, 233, 0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container-wide relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-sky-500/10 text-sky-400 text-xs font-semibold tracking-widest uppercase mb-4">
              <Search className="w-3.5 h-3.5" />
              Our Portfolio
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-200 tracking-tight leading-tight">
              Selected Case <span className="text-sky-400">Studies</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-10 pb-32 relative z-10">
        <div className="container-wide px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, index) => {
              const techStack = Array.isArray(project.techStack)
                ? project.techStack
                : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative flex flex-col transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative rounded-2xl overflow-hidden bg-[#0a192f] mb-6 aspect-[16/10] border border-white/5">
                    {/* Image Glow Backdrop */}
                    <div
                      className="absolute inset-0 blur-2xl rounded-2xl scale-90 opacity-10 transition-opacity duration-500 group-hover:opacity-25"
                      style={{ background: project.themeColor }}
                    />

                    {project.imageUrl && (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-103 ${project.mockupType === "mobile" ? "object-contain p-6" : ""}`}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    )}
                  </div>

                  {/* Header / Meta */}
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <h3 className="text-sky-400 text-xs font-semibold tracking-widest uppercase">
                      {project.subtitle}
                    </h3>
                    <span
                      className="text-3xl font-bold opacity-15 font-quantum"
                      style={{ color: project.themeColor }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {techStack.map((tech: any) => (
                      <span
                        key={String(tech)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-white/5 bg-white/5 text-slate-400"
                      >
                        {String(tech)}
                      </span>
                    ))}
                  </div>

                  {/* CTA Text Link */}
                  <div className="mt-2">
                    <button
                      onClick={() => router.push(`/projects/${project.slug}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors uppercase cursor-pointer"
                    >
                      Read Case Study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden border-t border-sky-500/10 bg-[#0a192f]">
        <div className="container-wide relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-2xl flex items-center justify-center mb-8 border border-sky-500/20">
              <Rocket className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Architect Your Digital Future?
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              Stop settling for average software. Let&apos;s build a
              high-performance, scalable product that dominates your industry.
            </p>
            <div className="flex justify-center">
              <GlowButton
                variant="solid"
                onClick={() => (window.location.href = "/#contact")}
              >
                Start Your Project
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
