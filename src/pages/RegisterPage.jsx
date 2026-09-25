import RegisterComponent from '../components/RegisterComponent';
import { useRegister } from '../hooks/useRegister';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { data, status, error, register } = useRegister();

    useEffect(() => {
        if (status === 'success') {
            navigate('/login');
        }
    }, [status, navigate]);
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0F1620] text-slate-100">

            {/* Background glow */}
            <div
                className="pointer-events-none fixed left-1/2 top-0 h-[36rem] w-[36rem]
                   -translate-x-1/2 -translate-y-1/3 rounded-full
                   bg-cyan-400/10 blur-[120px]"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12 sm:max-w-lg sm:px-8 sm:py-16 md:max-w-xl">

                <header className="mb-8 sm:mb-10">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
                        Inventory
                    </p>
                    <h1 className="font-serif text-3xl text-slate-50 sm:text-4xl">Register</h1>
                </header>

                <RegisterComponent isLoading={false} onRegister={register} />
            </div>

        </div>
    );
}