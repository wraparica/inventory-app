import { useState } from "react";
import {
    Menu,
    X,
    LayoutDashboard,
    Package,
    Tags,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Products", icon: Package, path: "/login" },
    { name: "Categories", icon: Tags, path: "/categories" },
    { name: "Settings", icon: Settings, path: "/settings" },
];

export default function SidePanel({ isOpen, setIsOpen }) {

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 z-50 rounded-lg
                   bg-slate-800 p-2 text-white lg:hidden"
                aria-label="Toggle sidebar"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64
        flex-col border-r border-slate-700/50 backdrop-blur-xl
        text-white transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-center border-b border-slate-700 px-6 pt-6 pb-6">
                    <header>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
                            Welcome
                        </p>

                        <h1 className="font-serif text-3xl text-slate-50 sm:text-4xl">
                            Dashboard
                        </h1>
                    </header>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-2 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.name}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 rounded-lg
                  px-4 py-3 text-slate-300
                  transition hover:bg-slate-800
                  hover:text-cyan-400"
                            >
                                <Icon size={15} />
                                <span>{item.name}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-slate-700 p-4">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="flex w-full items-center gap-3
              rounded-lg px-4 py-3 text-slate-300
              transition hover:bg-red-500/10
              hover:text-red-400"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}