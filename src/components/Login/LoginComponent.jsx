import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from "../Ui/TextInput";
import Button from "../Ui/Button";

export default function LoginComponent({ isLoading, onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username, password);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 w-full">

            <div className="flex w-full flex-col gap-3 sm:flex-col sm:items-center-flex">

                <TextInput
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    ariaLabel="Username"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        aria-label="Password"
                        className="w-full rounded-md border border-[#253241]
                   bg-[#101820] py-3 pl-4 pr-16 font-sans text-sm
                   text-slate-100 placeholder:text-slate-500
                   outline-none transition-colors duration-200
                   focus:border-cyan-400/60
                   focus:ring-2 focus:ring-cyan-400/10"
                    />

                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center
                   text-sm text-slate-400 transition-colors
                   hover:text-cyan-400"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <Button
                    type="submit"
                    variant="outline"
                    disabled={isLoading || !username.trim() || !password.trim()}
                >
                    Login
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </div>
        </form>
    );
}