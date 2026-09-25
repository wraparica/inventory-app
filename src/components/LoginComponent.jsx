import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent({ isLoading, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username, password);
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
                   duration-200 focus:border-cyan-400/60
                   focus:ring-2 focus:ring-cyan-400/10"
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
                   duration-200 focus:border-cyan-400/60
                   focus:ring-2 focus:ring-cyan-400/10"
                />

                <button
                    type="submit"
                    disabled={isLoading || !username.trim() || !password.trim()}
                    className="shrink-0 rounded-md border border-cyan-400/40
                   bg-cyan-400/10 px-4 py-3 font-mono text-xs uppercase
                   tracking-widest text-cyan-400 transition-all duration-200
                   hover:border-cyan-400/60 hover:bg-cyan-400/20
                   active:scale-[0.97] disabled:cursor-not-allowed
                   disabled:opacity-40 disabled:hover:bg-cyan-400/10
                   sm:px-5"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="px-4 py-3 font-mono text-xs uppercase
                   tracking-widest text-cyan-400 transition-all duration-200"
                >
                    Register
                </button>
            </div>
        </form>
    );
}