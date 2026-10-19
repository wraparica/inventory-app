import RegisterComponent from '../components/RegisterComponent';
import { useRegister } from '../hooks/useRegister';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/div.css';

export default function RegisterPage() {
    const navigate = useNavigate();
    const { data, status, error, register } = useRegister();

    useEffect(() => {
        if (status === 'success') {
            navigate('/login');
        }
    }, [status, navigate]);
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
                        Register
                    </h1>
                </header>

                <RegisterComponent isLoading={false} onRegister={register} />
            </div>

        </div>
    );
}