"use client";

import { useActionState, useEffect, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { createProjectAction, deleteProjectAction } from "@/lib/actions/projects";
import type { Project } from "@/lib/db/schemas/projects";
import { Trash2, Plus, X } from "lucide-react";

const initialState = { error: undefined, success: undefined };

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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialProjects.map((project) => (
          <div key={project.id} className="glass p-5 rounded-2xl border border-white/10 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-white/5 border border-white/10"
                style={{ color: project.themeColor }}
              >
                {project.orderNumber}
              </div>
              <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1 leading-tight line-clamp-2">{project.title}</h3>
            <p className="text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">{project.subtitle}</p>
            
            <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">{project.description}</p>
            
            <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between text-xs text-slate-500">
              <span>{project.slug}</span>
              <span className="capitalize">{project.mockupType}</span>
            </div>
          </div>
        ))}
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
