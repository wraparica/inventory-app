
import { useState } from 'react';

import '../styles/common.css';
import '../styles/div.css';

import {
    validateEmail,
    validatePassword,
} from '../utils/validation';

import { PasswordRequirements } from '../components/PasswordRequirements';

export default function RegisterComponent({ isLoading, onRegister }) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const passwordRules = validatePassword(form.password);

    const validateField = (name, value) => {
        switch (name) {
            case 'username':
                return value.trim().length < 3
                    ? 'Username must be at least 3 characters.'
                    : '';

            case 'email':
                return !validateEmail(value)
                    ? 'Enter a valid email address.'
                    : '';

            case 'password':
                return !validatePassword(value).isValid
                    ? 'Password does not meet all requirements.'
                    : '';

            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the field error while the user corrects it.
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            username: validateField('username', form.username),
            email: validateField('email', form.email),
            password: validateField('password', form.password),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        onRegister(
            form.email.trim(),
            form.username.trim(),
            form.password
        );
    };

    const isFormValid =
        form.username.trim().length >= 3 &&
        validateEmail(form.email) &&
        passwordRules.isValid;

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="flex w-full flex-col gap-3 sm:flex-col sm:items-center-flex">

                {/* Username */}
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                    aria-label="Username"
                    aria-invalid={Boolean(errors.username)}
                    aria-describedby={
                        errors.username ? 'username-error' : undefined
                    }
                    autoComplete="username"
                    className="form-input"
                    required
                />

                {errors.username && (
                    <p
                        id="username-error"
                        className="error-panel-title"
                        role="alert"
                    >
                        {errors.username}
                    </p>
                )}

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    aria-label="Email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                        errors.email ? 'email-error' : undefined
                    }
                    autoComplete="email"
                    className="form-input"
                    required
                />

                {errors.email && (
                    <p
                        id="email-error"
                        className="error-panel-title"
                        role="alert"
                    >
                        {errors.email}
                    </p>
                )}

                {/* Password */}
                <div className="password-field">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        aria-label="Password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                            errors.password ? 'password-error' : undefined
                        }
                        autoComplete="new-password"
                        className="form-input"
                        required
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>

                    
                </div>

                {errors.password && (
                        <p
                            id="password-error"
                            className="error-panel-title"
                            role="alert"
                        >
                            {errors.password}
                        </p>
                    )}

                <PasswordRequirements passwordRules={passwordRules} />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="submit-button"
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

            </div>
        </form>
    );
}
