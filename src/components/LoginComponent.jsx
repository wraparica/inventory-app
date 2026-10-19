import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/div.css';

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
            className="form-container">

            <div className="flex w-full flex-col gap-3 sm:flex-col sm:items-center-flex">

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    aria-label="Username"
                    className="form-input"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    aria-label="Password"
                    className="form-input"
                />

                <button
                    type="submit"
                    disabled={isLoading || !username.trim() || !password.trim()}
                    className="submit-button"
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="secondary-button"
                >
                    Register
                </button>
            </div>
        </form>
    );
}