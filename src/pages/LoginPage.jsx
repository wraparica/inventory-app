import LoginComponent from '../components/LoginComponent';
import { useLogin } from '../hooks/useLogin';
import { EmptyState, LoadingState, ErrorState, LoginState } from '../components/StatusStates';


export default function LoginPage() {
    const { data, status, error, login } = useLogin();
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0F1620] text-slate-100">

            {/* Background glow */}
            <div
                className="pointer-events-none fixed left-1/2 top-0 h-[36rem] w-[36rem]
                   -translate-x-1/2 -translate-y-1/3 rounded-full
                   bg-amber-400/10 blur-[120px]"
                aria-hidden="true"
            />

            <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-12 sm:max-w-lg sm:px-8 sm:py-16 md:max-w-xl">

                <header className="mb-8 sm:mb-10">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                        Inventory
                    </p>
                    <h1 className="font-serif text-3xl text-slate-50 sm:text-4xl">Login</h1>
                </header>

                <LoginComponent isLoading={false} onLogin={login} />
                <div className="mt-6">

                    {(status === "loading") && <LoadingState />}

                    {status === "error" && (
                        <ErrorState message={error} />
                    )}

                    {status === "success" && (
                        <LoginState data={data} />
                    )}
                    

                </div>
            </div>

        </div>
    );
}