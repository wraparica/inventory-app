import SidePanel from "../SidePanel";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SidePanel />

      <main className="min-h-screen p-6 pt-20 lg:ml-64 lg:pt-6">
        {children}
      </main>
    </div>
  );
}