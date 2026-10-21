import SidePanel from '../components/SidePanel';
import UOMComponent from '../components/UOM/UOMComponent';
import { useState } from "react";
import { useEffect } from 'react';
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from 'react-router-dom';


export default function DashboardPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = useState(
        () => window.matchMedia("(min-width: 1024px)").matches
    );
    const [activeTab, setActiveTab] = useState("UOM");
    async function handleLogout() {
        await logout();
        navigate("/login", { replace: true });
    }
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const handleBreakpointChange = (event) => {
            setIsOpen(event.matches);
        };

        mediaQuery.addEventListener("change", handleBreakpointChange);

        return () => {
            mediaQuery.removeEventListener("change", handleBreakpointChange);
        };
    }, []);
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0F1620] text-slate-100">

            {/* Background glow */}
            <div
                className="pointer-events-none fixed left-1/2 top-0 h-[36rem] w-[36rem]
                   -translate-x-1/2 -translate-y-1/3 rounded-full
                   bg-cyan-400/10 blur-[120px]"
                aria-hidden="true"
            />


            <div className="min-h-screen">
                <SidePanel setActiveTab={setActiveTab} activeTab={activeTab} onLogout={handleLogout} />

                <main
                    className={`min-h-screen p-6 pt-20 transition-all duration-300 ml-20`}
                >

                    {activeTab === "UOM" && <UOMComponent />}
                    {activeTab === "Dashboard" &&
                        <div>
                            <h1 className="text-2xl font-bold text-white">

                                Inventory Dashboard
                            </h1>

                            <p className="text-slate-400">
                                Inventory management system overview and insights
                            </p>
                        </div>

                    }



                </main>
            </div>

        </div>
    );
}