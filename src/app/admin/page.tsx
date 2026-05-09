export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-sky-400">Admin Dashboard</h1>
      <p className="text-slate-300">
        Welcome to the secure Quantum Blaze administration panel.
      </p>
      <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">System Overview</h2>
        <p className="text-slate-400 text-sm">
          If you are seeing this, the proxy.ts routing and security checks have passed.
        </p>
      </div>
    </div>
  );
}
