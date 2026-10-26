import { useState } from "react";

export default function Switch({ checked, onChange, label }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm text-slate-300">
                {label}
            </span>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    checked ? "bg-cyan-500" : "bg-slate-600"
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        checked ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
        </label>
    );
}

