import { useState } from 'react';
import '../styles/common.css';
import '../styles/div.css';

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
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email"
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
                    disabled={isLoading || !username.trim() || !email.trim() || !password.trim()}
                    className="submit-button"
                >
                    Register
                </button>
            </div>
        </form>
    );
}