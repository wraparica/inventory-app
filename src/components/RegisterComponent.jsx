import { useState } from 'react';

export default function RegisterComponent({ isLoading, onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, username, password);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 w-full">

            <div className="flex w-full flex-col gap-3 sm:flex-col sm:items-center-flex">

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    aria-label="Username"
                    className="min-w-0 flex-1 rounded-md border border-[#253241]
                   bg-[#101820] px-4 py-3 font-sans text-sm text-slate-100
                   placeholder:text-slate-500 outline-none transition-colors
                   duration-200 focus:border-amber-400/60
                   focus:ring-2 focus:ring-amber-400/10"
                />

                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email"
                    className="min-w-0 flex-1 rounded-md border border-[#253241]
                   bg-[#101820] px-4 py-3 font-sans text-sm text-slate-100
                   placeholder:text-slate-500 outline-none transition-colors
                   duration-200 focus:border-amber-400/60
                   focus:ring-2 focus:ring-amber-400/10"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    className="min-w-0 flex-1 rounded-md border border-[#253241]
                   bg-[#101820] px-4 py-3 font-sans text-sm text-slate-100
                   placeholder:text-slate-500 outline-none transition-colors
                   duration-200 focus:border-amber-400/60
                   focus:ring-2 focus:ring-amber-400/10"
                />

                <button
                    type="submit"
                    disabled={isLoading || !username.trim() || !email.trim() || !password.trim()}
                    className="shrink-0 rounded-md border border-amber-400/40
                   bg-amber-400/10 px-4 py-3 font-mono text-xs uppercase
                   tracking-widest text-amber-400 transition-all duration-200
                   hover:border-amber-400/60 hover:bg-amber-400/20
                   active:scale-[0.97] disabled:cursor-not-allowed
                   disabled:opacity-40 disabled:hover:bg-amber-400/10
                   sm:px-5"
                >
                    Register
                </button>
            </div>
        </form>
    );
}