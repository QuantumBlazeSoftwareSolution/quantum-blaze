"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { createAdminAction, updateAdminStatusAction } from "@/lib/actions/admins";
import { ShieldAlert, Plus, X, UserCog, Power, PowerOff } from "lucide-react";

const initialState: any = { error: undefined, success: undefined };

type AdminUserDisplay = {
  id: string;
  email: string;
  name: string;
  role: "super_admin" | "admin";
  status: "active" | "disabled" | "suspended";
};

export function UserManager({ initialAdmins }: { initialAdmins: AdminUserDisplay[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [state, formAction, isPending] = useActionState(createAdminAction, initialState);
  const [isPendingStatus, startTransition] = useTransition();

  // Close modal on success
  useEffect(() => {
    if (state.success) {
      setIsAdding(false);
    }
  }, [state.success]);

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";
    if (confirm(`Are you sure you want to ${newStatus === "active" ? "activate" : "disable"} this admin account?`)) {
      startTransition(async () => {
        await updateAdminStatusAction(id, newStatus);
      });
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header Actions */}
      <div className="flex items-center justify-end">
        <GlowButton variant="solid" size="sm" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2 inline-block" />
          Add Administrator
        </GlowButton>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a2235] rounded-xl border border-[#1e293b] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[#1f293f] text-slate-400 font-medium border-b border-[#2a3653]">
                <th className="px-8 py-5">Administrator</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              {initialAdmins.map((admin) => (
                <tr 
                  key={admin.id} 
                  className="hover:bg-[#1e293b]/50 transition-colors group text-slate-300"
                >
                  <td className="px-8 py-5 font-medium text-white flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0a192f] border border-white/10 flex items-center justify-center text-sky-400 font-bold uppercase tracking-wider">
                       {admin.name.charAt(0)}
                    </div>
                    <div>
                      <div className="tracking-tight">{admin.name}</div>
                      <span className="block text-xs text-slate-500 font-normal mt-0.5">{admin.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
                      admin.role === "super_admin" 
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                        : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                    }`}>
                      {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        admin.status === "active" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : 
                        admin.status === "suspended" ? "bg-amber-400" : "bg-slate-500"
                      }`} />
                      <span className={`text-xs font-medium capitalize ${
                        admin.status === "active" ? "text-emerald-400" : 
                        admin.status === "suspended" ? "text-amber-400" : "text-slate-500"
                      }`}>
                        {admin.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {admin.role !== "super_admin" && (
                        <button 
                          onClick={() => handleToggleStatus(admin.id, admin.status)}
                          disabled={isPendingStatus}
                          className={`p-2 rounded-lg transition-all ${
                            admin.status === "active" 
                              ? "text-slate-500 hover:text-red-400 hover:bg-red-500/10" 
                              : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                          } disabled:opacity-50`}
                          title={admin.status === "active" ? "Disable Account" : "Activate Account"}
                        >
                          {admin.status === "active" ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {initialAdmins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-slate-500 font-medium">
                    No administrators found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal (Slide-over style but centered for minimalist feel) */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020813]/80 backdrop-blur-md transition-opacity">
          <div className="bg-[#141b2d] w-full max-w-md rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-500/10 rounded-lg">
                  <UserCog className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">New Administrator</h3>
              </div>
              <button 
                onClick={() => setIsAdding(false)}
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Form */}
            <form action={formAction} className="p-8 space-y-5">
              {state.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{state.error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Jane Doe" 
                  className="w-full px-5 py-3.5 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 font-medium focus:outline-none focus:border-sky-500/50 focus:bg-[#0a192f] transition-all" 
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  placeholder="jane@quantumblaze.lk" 
                  className="w-full px-5 py-3.5 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 font-medium focus:outline-none focus:border-sky-500/50 focus:bg-[#0a192f] transition-all" 
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 ml-1">Temporary Password</label>
                <input 
                  type="text" 
                  name="password" 
                  required 
                  placeholder="Minimum 8 characters" 
                  className="w-full px-5 py-3.5 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white placeholder-slate-600 font-medium focus:outline-none focus:border-sky-500/50 focus:bg-[#0a192f] transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 ml-1">Access Level</label>
                <select 
                  name="role" 
                  className="w-full px-5 py-3.5 bg-[#0a192f]/50 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-sky-500/50 appearance-none cursor-pointer transition-all"
                >
                  <option value="admin">Admin (Projects & Content)</option>
                  <option value="super_admin">Super Admin (Full Access)</option>
                </select>
              </div>

              <div className="pt-4 mt-2">
                <GlowButton variant="solid" disabled={isPending} className="w-full justify-center py-3.5 text-base font-semibold shadow-lg shadow-sky-500/20">
                  {isPending ? "Creating Account..." : "Create Account"}
                </GlowButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
