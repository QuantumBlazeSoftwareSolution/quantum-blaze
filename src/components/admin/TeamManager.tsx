"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { createTeamMemberAction, updateTeamMemberAction, deleteTeamMemberAction } from "@/lib/actions/team";
import type { TeamMember } from "@/lib/db/schemas/team";
import { Plus, X, Trash2, Pencil, ExternalLink, Mail } from "lucide-react";
import { ViewToggle, type ViewMode } from "./ViewToggle";
import Image from "next/image";

const initialState: any = { error: undefined, success: undefined };

// ─── Gradient Presets ───────────────────────────────────────────────────────
export const GRADIENT_PRESETS: { key: string; label: string; classes: string; from: string }[] = [
  { key: "sky",     label: "Sky",     classes: "from-sky-400 to-blue-600",     from: "#38bdf8" },
  { key: "blue",    label: "Blue",    classes: "from-blue-500 to-indigo-700",   from: "#3b82f6" },
  { key: "cyan",    label: "Cyan",    classes: "from-cyan-400 to-sky-700",      from: "#22d3ee" },
  { key: "violet",  label: "Violet",  classes: "from-violet-500 to-purple-700", from: "#8b5cf6" },
  { key: "emerald", label: "Green",   classes: "from-emerald-400 to-teal-700",  from: "#34d399" },
  { key: "rose",    label: "Rose",    classes: "from-rose-400 to-pink-700",     from: "#fb7185" },
  { key: "amber",   label: "Amber",   classes: "from-amber-400 to-orange-600",  from: "#fbbf24" },
  { key: "slate",   label: "Slate",   classes: "from-slate-400 to-slate-700",   from: "#94a3b8" },
];

function getPreset(key: string) {
  return GRADIENT_PRESETS.find(p => p.key === key) ?? GRADIENT_PRESETS[0];
}

// ─── Gradient Picker ────────────────────────────────────────────────────────
function GradientPicker({ value, onChange }: { value: string; onChange: (k: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Card Gradient</label>
      <div className="flex gap-2 flex-wrap">
        {GRADIENT_PRESETS.map(p => (
          <button
            key={p.key}
            type="button"
            onClick={() => onChange(p.key)}
            title={p.label}
            className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.classes} transition-all ${
              value === p.key ? "ring-2 ring-white ring-offset-2 ring-offset-[#0a192f] scale-110" : "opacity-60 hover:opacity-100"
            }`}
          />
        ))}
      </div>
      <input type="hidden" name="gradient" value={value} />
    </div>
  );
}

// ─── Avatar ─────────────────────────────────────────────────────────────────
function MemberAvatar({ member, size = "md" }: { member: TeamMember; size?: "sm" | "md" | "lg" }) {
  const preset = getPreset(member.gradient);
  const sizeClasses = { sm: "w-10 h-10 text-base", md: "w-14 h-14 text-xl", lg: "w-24 h-24 text-3xl" };
  return (
    <div className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${preset.classes} flex items-center justify-center shrink-0 font-bold text-white shadow-lg`}>
      {member.image ? (
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <Image src={member.image} alt={member.name} fill sizes="96px" className="object-cover" />
        </div>
      ) : (
        member.name.charAt(0).toUpperCase()
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function TeamManager({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [addGradient, setAddGradient] = useState("sky");
  const [editGradient, setEditGradient] = useState("sky");
  const [, startTransition] = useTransition();

  const [addState, addFormAction, isAddPending] = useActionState(createTeamMemberAction, initialState);
  const [updateState, updateFormAction, isUpdatePending] = useActionState(updateTeamMemberAction, initialState);

  useEffect(() => { if (addState.success) setIsAdding(false); }, [addState.success]);
  useEffect(() => { if (updateState.success) setEditingMember(null); }, [updateState.success]);

  useEffect(() => {
    if (editingMember) setEditGradient(editingMember.gradient || "sky");
  }, [editingMember]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      startTransition(async () => { await deleteTeamMemberAction(id); });
    }
  };

  // ── Form ──────────────────────────────────────────────────────────────────
  const MemberForm = ({ action, state, isPending, defaultValues, gradientValue, onGradientChange, onCancel }: {
    action: any; state: any; isPending: boolean;
    defaultValues?: TeamMember | null;
    gradientValue: string; onGradientChange: (k: string) => void;
    onCancel: () => void;
  }) => (
    <form action={action} className="space-y-5">
      {defaultValues && <input type="hidden" name="id" value={defaultValues.id} />}
      {state.error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">{state.error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Full Name *</label>
          <input name="name" required defaultValue={defaultValues?.name} placeholder="e.g. Jane Doe"
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Role / Title *</label>
          <input name="role" required defaultValue={defaultValues?.role} placeholder="e.g. Lead Engineer"
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Email</label>
          <input name="email" type="email" defaultValue={defaultValues?.email ?? ""} placeholder="jane@quantumblaze.lk"
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Display Order</label>
          <input name="orderNumber" type="number" defaultValue={defaultValues?.orderNumber ?? 99} placeholder="e.g. 1"
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Short Bio</label>
          <textarea name="bio" rows={3} defaultValue={defaultValues?.bio ?? ""} placeholder="A brief description..."
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">Profile Image URL</label>
          <input name="image" type="url" defaultValue={defaultValues?.image ?? ""} placeholder="https://... or Google Drive link"
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">LinkedIn URL</label>
          <input name="linkedin" type="url" defaultValue={defaultValues?.linkedin ?? ""} placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-3 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 transition-all" />
        </div>
        <div className="md:col-span-2">
          <GradientPicker value={gradientValue} onChange={onGradientChange} />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium">Cancel</button>
        <GlowButton variant="solid" disabled={isPending} className="px-6 py-2.5 text-sm">
          {isPending ? "Saving..." : "Save Member"}
        </GlowButton>
      </div>
    </form>
  );

  return (
    <div className="space-y-6 relative">
      {/* Header Actions */}
      <div className="flex items-center justify-end gap-3">
        <ViewToggle view={viewMode} onToggle={setViewMode} />
        <GlowButton variant="solid" size="sm" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2 inline-block" />
          Add Member
        </GlowButton>
      </div>

      {/* ── Grid View ─────────────────────────────────────────────────── */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {initialMembers.map(member => {
            const preset = getPreset(member.gradient);
            return (
              <div key={member.id}
                className="group relative bg-[#141b2d] border border-white/8 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col gap-4"
              >
                {/* Top Actions (hover) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingMember(member)}
                    className="p-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-sky-500/20 hover:border-sky-400/30 transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(member.id)}
                    className="p-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-white hover:bg-red-500/20 hover:border-red-400/30 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4">
                  <MemberAvatar member={member} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{member.name}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{member.role}</p>
                  </div>
                </div>

                {/* Bio */}
                {member.bio && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{member.bio}</p>
                )}

                {/* Footer: Email + LinkedIn */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-sky-400 transition-colors truncate">
                      <Mail className="w-3 h-3 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                  {member.linkedin && member.linkedin !== "#" && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="ml-auto p-1.5 text-slate-500 hover:text-sky-400 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Gradient accent strip at bottom */}
                <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${preset.classes} opacity-0 group-hover:opacity-60 transition-opacity`} />
              </div>
            );
          })}
          {initialMembers.length === 0 && (
            <div className="col-span-3 py-20 text-center text-slate-500 font-medium">
              No team members yet. Click "Add Member" to get started.
            </div>
          )}
        </div>
      )}

      {/* ── List View ─────────────────────────────────────────────────── */}
      {viewMode === "list" && (
        <div className="bg-[#141b2d] rounded-xl border border-white/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-white/[0.03] text-slate-500 font-semibold border-b border-white/8 text-xs uppercase tracking-widest">
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {initialMembers.map(member => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group text-slate-300">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <MemberAvatar member={member} size="sm" />
                        <span className="font-semibold text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{member.role}</td>
                    <td className="px-6 py-4 text-slate-500">{member.email || "—"}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs px-2 py-1 bg-white/5 border border-white/8 rounded-lg text-slate-400">
                        #{String(member.orderNumber).padStart(2, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingMember(member)}
                          className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {initialMembers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-500 font-medium">
                      No team members yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01]">
            <span className="text-xs text-slate-600 font-medium">Showing {initialMembers.length} member{initialMembers.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      {/* ── Add Modal ─────────────────────────────────────────────────── */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020813]/80 backdrop-blur-md">
          <div className="bg-[#141b2d] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl relative">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#141b2d] z-10">
              <div>
                <h3 className="text-lg font-bold text-white">Add Team Member</h3>
                <p className="text-xs text-slate-500 mt-0.5">New member will appear on the public team page.</p>
              </div>
              <button onClick={() => setIsAdding(false)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8">
              <MemberForm action={addFormAction} state={addState} isPending={isAddPending}
                gradientValue={addGradient} onGradientChange={setAddGradient} onCancel={() => setIsAdding(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Slide-over ───────────────────────────────────────────── */}
      {editingMember && (
        <>
          <div className="fixed inset-0 z-40 bg-[#020813]/60 backdrop-blur-sm" onClick={() => setEditingMember(null)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#141b2d] border-l border-white/10 shadow-2xl overflow-y-auto">
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#141b2d] z-10">
              <div className="flex items-center gap-4">
                <MemberAvatar member={editingMember} size="sm" />
                <div>
                  <h3 className="text-base font-bold text-white">{editingMember.name}</h3>
                  <p className="text-xs text-slate-500">{editingMember.role}</p>
                </div>
              </div>
              <button onClick={() => setEditingMember(null)} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8">
              <MemberForm action={updateFormAction} state={updateState} isPending={isUpdatePending}
                defaultValues={editingMember} gradientValue={editGradient} onGradientChange={setEditGradient}
                onCancel={() => setEditingMember(null)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
