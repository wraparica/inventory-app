import DashboardComponent from '../components/Dashboard/DashboardComponent';
import { EmptyState, LoadingState, ErrorState, LoginState } from '../components/StatusStates';
import SidePanel from '../components/SidePanel';
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react';


export default function DashboardPage() {
    const data = location.state?.data;
    const [isOpen, setIsOpen] = useState(
        () => window.matchMedia("(min-width: 1024px)").matches
    );

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
                <SidePanel isOpen={isOpen} setIsOpen={setIsOpen} />

                <main
                    className={`min-h-screen p-6 pt-20 transition-all duration-300 ${isOpen ? "ml-64" : "ml-0"
                        }`}
                >
                    <h1 className="text-2xl font-bold text-white">
                        Dashboard Content
                    </h1>

                    <p className="mt-4 text-slate-400">
                        This content expands when the sidebar closes.
                    </p>
                </main>
            </div>

        </div>
    );
}