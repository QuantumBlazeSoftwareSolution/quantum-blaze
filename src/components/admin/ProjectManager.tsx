"use client";

import { useActionState, useEffect, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { createProjectAction, deleteProjectAction } from "@/lib/actions/projects";
import type { Project } from "@/lib/db/schemas/projects";
import { Trash2, Plus, X } from "lucide-react";

const initialState: any = { error: undefined, success: undefined };

export function ProjectManager({ initialProjects }: { initialProjects: Project[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [state, formAction, isPending] = useActionState(createProjectAction, initialState);

  // Close modal on success
  useEffect(() => {
    if (state.success) {
      setIsAdding(false);
    }
  }, [state.success]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProjectAction(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Projects Portfolio</h2>
          <p className="text-slate-400 text-sm">Manage the case studies displayed on the public website.</p>
        </div>
        <GlowButton variant="solid" size="sm" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2 inline-block" />
          Add Project
        </GlowButton>
      </div>

      {/* Projects Table */}
      <div className="bg-[#1a2235] rounded-xl border border-[#1e293b] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[#1f293f] text-slate-400 font-medium border-b border-[#2a3653]">
                <th className="px-6 py-4 w-12 text-center">No.</th>
                <th className="px-6 py-4">Project Title</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Mockup</th>
                <th className="px-6 py-4">Theme</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {initialProjects.map((project) => (
                <tr 
                  key={project.id} 
                  className="hover:bg-[#1e293b]/50 transition-colors group text-slate-300"
                >
                  <td className="px-6 py-4 text-center">
                    <span 
                      className="font-mono text-xs px-2 py-1 rounded bg-black/20 border border-white/5"
                      style={{ color: project.themeColor }}
                    >
                      {project.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0a192f] border border-white/5 overflow-hidden flex items-center justify-center">
                       {/* Placeholder for project icon or tiny preview */}
                       <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.themeColor }} />
                    </div>
                    <div>
                      {project.title}
                      <span className="block text-xs text-slate-500 font-normal mt-0.5">{project.subtitle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{project.slug}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 capitalize text-slate-400">
                      {project.mockupType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: project.themeColor }} />
                      <span className="uppercase text-slate-400">{project.themeColor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {initialProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No projects found. Click "Add Project" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer / Pagination placeholder */}
        <div className="bg-[#1f293f]/50 border-t border-[#1e293b] px-6 py-4 flex items-center justify-between text-xs text-slate-400">
          <div>Showing {initialProjects.length} projects</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-[#2a3653] hover:bg-[#344265] text-white transition-colors cursor-not-allowed opacity-50">Previous</button>
            <button className="px-3 py-1 rounded bg-[#2a3653] hover:bg-[#344265] text-white transition-colors cursor-not-allowed opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Add Project Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020813]/80 backdrop-blur-sm">
          <div className="glass w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAdding(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold text-white mb-6">Create New Project</h3>
            
            <form action={formAction} className="space-y-6">
              {state.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                  {state.error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Slug (ID)</label>
                  <input type="text" name="slug" required placeholder="e.g. fintech-app" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Order Number</label>
                  <input type="text" name="orderNumber" required placeholder="e.g. 04" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Project Title</label>
                  <input type="text" name="title" required placeholder="Project Name" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Subtitle</label>
                  <input type="text" name="subtitle" required placeholder="Industry / Type" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Description</label>
                  <textarea name="description" required rows={3} placeholder="Detailed project description..." className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50 resize-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Tech Stack (Comma separated)</label>
                  <input type="text" name="techStack" placeholder="React, Node.js, PostgreSQL" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Metrics (Comma separated)</label>
                  <input type="text" name="metrics" placeholder="10K+ Users, 99.9% Uptime" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Theme Color</label>
                  <div className="flex gap-4">
                    <input type="color" name="themeColor" defaultValue="#38bdf8" className="h-12 w-12 rounded-xl cursor-pointer bg-transparent" />
                    <div className="flex-grow text-xs text-slate-500 flex items-center">Select accent color</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Mockup Type</label>
                  <select name="mockupType" className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50 appearance-none cursor-pointer">
                    <option value="desktop">Desktop (16:10)</option>
                    <option value="mobile">Mobile (9:19)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
                  <input type="text" name="imageUrl" required placeholder="/images/projects/new.png or https://lh3.googleusercontent.com/d/..." className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-sky-500/50" />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl text-slate-400 font-medium hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <GlowButton variant="solid" disabled={isPending}>
                  {isPending ? "Saving Project..." : "Save Project"}
                </GlowButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
