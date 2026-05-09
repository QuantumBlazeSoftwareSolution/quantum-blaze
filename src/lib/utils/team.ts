/**
 * Map gradient preset keys to Tailwind CSS classes used in the public UI.
 */
export const TEAM_GRADIENTS: Record<string, string> = {
  sky: "from-sky-400 to-blue-600",
  blue: "from-blue-500 to-indigo-700",
  cyan: "from-cyan-400 to-sky-700",
  violet: "from-violet-500 to-purple-700",
  emerald: "from-emerald-400 to-teal-700",
  rose: "from-rose-400 to-pink-700",
  amber: "from-amber-400 to-orange-600",
  slate: "from-slate-400 to-slate-700",
};

export function getTeamGradient(key: string | null) {
  return TEAM_GRADIENTS[key || "sky"] || TEAM_GRADIENTS.sky;
}
