import { useState } from 'react';
import '../styles/common.css';
import '../styles/div.css';
import {
    validateUsername,
    validateEmail,
    validatePassword,
} from '../utils/validation';


export default function RegisterComponent({ isLoading, onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const passwordRules = validatePassword(password);
    const [showPassword, setShowPassword] = useState(false);
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
                    onChange={
                        (e) => {
                            setUsername(e.target.value);

                            if (errors.username) {
                                setErrors((prev) => ({
                                    ...prev,
                                    username: '',
                                }));
                            }
                        }
                    }
                    onBlur={() => {
                        if (username.trim().length < 3) {
                            setErrors((prev) => ({
                                ...prev,
                                username: 'Username must be at least 3 characters.',
                            }));
                        }
                    }}

                    placeholder="Username"
                    aria-label="Username"
                    className="form-input"
                />

                {errors.username && (
                    <p id="username-error" className="error-panel-title" role="alert">
                        {errors.username}
                    </p>
                )}

                <input
                    type="text"
                    value={email}
                    onChange={
                        (e) => {
                            setEmail(e.target.value);

                            if (errors.email) {
                                setErrors((prev) => ({
                                    ...prev,
                                    email: '',
                                }));
                            }
                        }
                    }
                    onBlur={() => {
                        if (!validateEmail(email)) {
                            setErrors((prev) => ({
                                ...prev,
                                email: 'Enter a valid email address.',
                            }));
                        }
                    }}
                    placeholder="Email"
                    aria-label="Email"
                    className="form-input"
                />

                {errors.email && (
                    <p id="email-error" className="error-panel-title" role="alert">
                        {errors.email}
                    </p>
                )}

                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                            if (errors.password) {
                                setErrors((prev) => ({
                                    ...prev,
                                    password: '',
                                }));
                            }
                        }}
                        onBlur={() => {
                            if (!passwordRules.isValid) {
                                setErrors((prev) => ({
                                    ...prev,
                                    password: 'Password does not meet all requirements.',
                                }));
                            }
                        }}
                        placeholder="Password"
                        aria-label="Password"
                        className="form-input"
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                
                {errors.password && (
                    <p id="email-error" className="error-panel-title" role="alert">
                        {errors.password}
                    </p>
                )}

                <div className="password-requirements">
                    <p className={passwordRules.hasMinLength ? 'valid' : ''}>
                        ✓ At least 8 characters
                    </p>
                    <p className={passwordRules.hasUppercase ? 'valid' : ''}>
                        ✓ One uppercase letter (A–Z)
                    </p>
                    <p className={passwordRules.hasNumber ? 'valid' : ''}>
                        ✓ One number (0–9)
                    </p>
                    <p className={passwordRules.hasSymbol ? 'valid' : ''}>
                        ✓ One symbol (!@#$...)
                    </p>
                </div>


                <button
                    type="submit"
                    disabled={
                        isLoading ||
                        Object.values(errors).some((error) => error !== '') ||
                        !username.trim() ||
                        !email.trim() ||
                        !password.trim()
                    }
                    className="submit-button"
                >
                    Register
                </button>
            </div>
        </form>
    );
}