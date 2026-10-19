import LoginComponent from '../components/LoginComponent';
import { useLogin } from '../hooks/useLogin';
import { EmptyState, LoadingState, ErrorState, LoginState } from '../components/StatusStates';
import '../styles/div.css';


export default function LoginPage() {
    const { data, status, error, login } = useLogin();
    return (
        <div className="page-container">

            {/* Background glow */}
            <div
                className="background-glow"
                aria-hidden="true"
            />

            <div className="page-content">

                <header className="page-header">
                    <p className="page-header-label">
                        Inventory
                    </p>
                    <h1 className="page-header-title">
                        Login
                    </h1>
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