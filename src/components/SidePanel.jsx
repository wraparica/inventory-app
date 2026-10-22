
import {
    LayoutDashboard,
    Package,
    Grid,
    Tag,
    Ruler,
    Settings,
    LogOut,
    CirclePile
} from "lucide-react";
const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Products", icon: Package },
    { name: "Categories", icon: Grid },
    { name: "Brands", icon: Tag },
    { name: "UOM", icon: Ruler },
    { name: "Settings", icon: Settings },
];

export default function SidePanel({ onLogout, activeTab, setActiveTab }) {
    return (
        <aside
            className="
        group fixed left-0 top-0 z-50
        flex h-screen w-[72px] flex-col
        overflow-hidden border-r border-slate-800
        bg-[#0F1620] text-slate-100
        transition-[width] duration-300 ease-in-out
        hover:w-64
    "
        >
            {/* Logo */}
            <div className="flex h-20 shrink-0 items-center px-6">
                <div className="flex min-w-[220px] items-center gap-4">
                    <CirclePile size={26} className="shrink-0 text-cyan-400" />
                    <span className="whitespace-nowrap text-lg font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Inventory App
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-3 pt-4">
                {menuItems.map(({ name, icon: Icon }) => (
                    <button
                        key={name}
                        type="button"
                        title={name}
                        onClick={() => setActiveTab(name)}
                        className={`flex h-12 w-full min-w-[220px] items-center gap-4 rounded-xl px-3 transition-colors ${activeTab === name
                            ? "bg-cyan-500/15 text-cyan-400"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                    >
                        <Icon size={22} className="ml-1 shrink-0" />
                        <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {name}
                        </span>
                    </button>
                ))}
            </nav>

            {/* Logout */}
            <div className="shrink-0 border-t border-slate-800 p-3">
                <button
                    onClick={onLogout}
                    title="Logout"
                    className="
                        flex h-12 min-w-[220px] items-center gap-4
                        rounded-xl px-3 text-slate-400
                        transition-colors hover:bg-red-500/10
                        hover:text-red-400
                    "
                >
                    <LogOut size={22} className="ml-1 shrink-0" />
                    <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        Logout
                    </span>
                </button>
            </div>
        </aside>
    );
}
