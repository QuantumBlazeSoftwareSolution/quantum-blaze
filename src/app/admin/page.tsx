export default function AdminDashboard() {
  return (
    <div>
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl max-w-2xl">
        <h2 className="text-xl font-semibold mb-2">System Overview</h2>
        <p className="text-slate-400 text-sm">
          If you are seeing this, the proxy.ts routing and security checks have passed.
        </p>
      </div>
    </div>
  );
}
