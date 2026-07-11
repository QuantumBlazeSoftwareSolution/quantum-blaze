"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlowButton } from "@/components/ui/GlowButton";
import { ArrowRight, Rocket, Search } from "lucide-react";
import { type Project } from "@/lib/data";

export function ProjectsClient({ projects }: { projects: Project[] }) {
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
          <div className="space-y-32">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const techStack = Array.isArray(project.techStack) ? project.techStack : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="group relative"
                >
                  {/* Subtle connecting line between projects */}
                  {index !== projects.length - 1 && (
                    <div className="hidden lg:block absolute left-[50%] top-full h-32 w-px bg-gradient-to-b from-sky-500/20 to-transparent -translate-x-1/2 z-0" />
                  )}

                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10`}
                  >
                    {/* Image Column */}
                    <div
                      className={`lg:col-span-7 ${!isEven ? "lg:order-2" : ""}`}
                    >
                      <div className="relative rounded-[2rem] overflow-hidden glass border border-white/5 p-2 transition-all duration-500 hover:border-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />

                        <div
                          className="relative rounded-3xl overflow-hidden w-full bg-[#0a192f]"
                          style={{
                            aspectRatio:
                              project.mockupType === "mobile" ? "4/3" : "16/10",
                          }}
                        >
                          {/* Image Glow Backdrop */}
                          <div
                            className="absolute inset-0 blur-3xl rounded-3xl scale-90 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                            style={{ background: project.themeColor }}
                          />

                          {project.imageUrl && (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${project.mockupType === "mobile" ? "object-contain p-8" : ""}`}
                              sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <span
                          className="text-6xl font-bold opacity-10 font-quantum"
                          style={{ color: project.themeColor }}
                        >
                          {project.orderNumber}
                        </span>
                        <div
                          className="h-px flex-grow"
                          style={{
                            background: `linear-gradient(90deg, ${project.themeColor}40, transparent)`,
                          }}
                        />
                      </div>

                      <h3 className="text-sky-400 text-sm font-semibold tracking-widest uppercase mb-3">
                        {project.subtitle}
                      </h3>

                      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                      </h2>

                      <p className="text-slate-400 text-base leading-relaxed mb-8">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {techStack.map((tech: any) => (
                          <span
                            key={String(tech)}
                            className="px-3 py-1.5 rounded-md text-xs font-medium border border-white/10 bg-white/5 text-slate-300"
                          >
                            {String(tech)}
                          </span>
                        ))}
                      </div>

                      <div>
                        <GlowButton
                          variant="outline"
                          size="sm"
                          onClick={() => (window.location.href = "/#contact")}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2 inline-block" />
                        </GlowButton>
                      </div>
                    </div>
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
