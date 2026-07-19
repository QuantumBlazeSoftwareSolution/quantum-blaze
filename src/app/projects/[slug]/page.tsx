"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Download, FileText, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/lib/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  // Find project
  const project = projects.find((p) => p.slug === slug);
  
  // State for lightbox modal
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050b14] text-white flex flex-col justify-center items-center px-4">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-sky-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  // Get initials for profile placeholders
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-400 relative">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Back navigation link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </button>

        {/* Project Header Header */}
        <header className="border-b border-slate-800/80 pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {project.subtitle}
            </span>
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: project.themeColor }}
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Grid layout for base project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main info columns */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tech Stack */}
            <section className="bg-slate-900/30 border border-slate-800/60 p-6 md:p-8 rounded-2xl">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Metrics */}
            <section className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">
                Key Deliverables & Performance Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-5 bg-slate-900/20 border border-slate-800/60 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: project.themeColor }}
                    />
                    <span className="text-sm font-medium text-slate-200">{metric}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Feature preview / image container */}
          <div className="w-full">
            <div className="sticky top-28 bg-slate-900/20 border border-slate-800/60 p-4 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Pharmacy POS Specific Modules ─── */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="border-t border-slate-800/80 pt-16 mb-16">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6">
              Application Interface Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((ss, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveImage(ss)}
                  className="group relative aspect-[16/10] rounded-xl border border-slate-800/80 bg-slate-900/10 overflow-hidden cursor-pointer hover:border-emerald-500/40 transition-colors"
                >
                  <Image 
                    src={ss} 
                    alt={`${project.title} screenshot ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-xs font-semibold uppercase tracking-wider bg-slate-900/90 text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-opacity">
                      View Screenshot
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.reports && project.reports.length > 0 && (
          <section className="border-t border-slate-800/80 pt-16 mb-16">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6">
              Sample System-Generated Reports
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.reports.map((report, idx) => (
                <a 
                  key={idx}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/10 hover:bg-slate-900/30 hover:border-emerald-500/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {report.name}
                      </h3>
                      <p className="text-xs text-slate-400">View Document (PDF)</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>
          </section>
        )}

        {project.users && project.users.length > 0 && (
          <section className="border-t border-slate-800/80 pt-16 mb-16">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6">
              Active Client Deployments
            </h2>
            <div className="space-y-4">
              {project.users.map((user, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-800/80 bg-slate-900/10 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 text-sm font-bold overflow-hidden relative">
                      {user.logo ? (
                        <Image 
                          src={user.logo} 
                          alt={`${user.name} logo`} 
                          fill
                          className="object-cover"
                        />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-200">{user.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl sm:text-right">
                    <span className="text-xs text-slate-500 block mb-0.5">Deployment Focus</span>
                    {user.usage}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.testimonials && project.testimonials.length > 0 && (
          <section className="border-t border-slate-800/80 pt-16">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-6">
              Client Feedbacks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.testimonials.map((feedback, idx) => (
                <div 
                  key={idx}
                  className="p-6 md:p-8 rounded-2xl border border-slate-800/80 bg-slate-900/10 flex flex-col justify-between"
                >
                  <div className="mb-6 relative">
                    <MessageSquare className="w-8 h-8 text-emerald-500/10 absolute -top-4 -left-4" />
                    <p className="text-sm leading-relaxed text-slate-300 italic relative z-10">
                      &ldquo;{feedback.message}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 border-t border-slate-800/60 pt-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                      {getInitials(feedback.clientName)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">{feedback.clientName}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{feedback.pharmacyName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Lightbox image preview modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-5xl w-full h-[80vh]">
            <Image 
              src={activeImage} 
              alt="Preview" 
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
