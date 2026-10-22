
import { useState } from 'react';
import TextInput from "../Ui/TextInput";
import FormError from "../Ui/FormError";
import Button from "../Ui/Button";

import {
    validateEmail,
    validatePassword,
} from '../../utils/validation';
import { useNavigate } from 'react-router-dom';

import { PasswordRequirements } from '../PasswordRequirements';

export default function RegisterComponent({ isLoading, onRegister }) {
    const navigate = useNavigate();
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
                <TextInput
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                    ariaLabel="Username"
                    aria-invalid={Boolean(errors.username)}
                    aria-describedby={
                        errors.username ? "username-error" : undefined
                    }
                    autoComplete="username"
                    required
                />

                {errors.username && (
                    <FormError id="username-error">
                        {errors.username}
                    </FormError>
                )}



                {/* Email */}
                <TextInput
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    ariaLabel="Email"
                    aria-invalid={Boolean(errors.username)}
                    aria-describedby={
                        errors.username ? "username-error" : undefined
                    }
                    autoComplete="email"
                    required
                />

                {errors.email && (
                    <FormError id="email-error">
                        {errors.email}
                    </FormError>
                )}

                {/* Password */}
                <div className="relative">
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
                        className="w-full rounded-md border border-[#253241]
                   bg-[#101820] py-3 pl-4 pr-16 font-sans text-sm
                   text-slate-100 placeholder:text-slate-500
                   outline-none transition-colors duration-200
                   focus:border-cyan-400/60
                   focus:ring-2 focus:ring-cyan-400/10"
                        required
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

                {errors.password && (
                    <FormError id="password-error">
                        {errors.password}
                    </FormError>
                )}

                <PasswordRequirements passwordRules={passwordRules} />

                {/* Submit */}
                <Button
                    type="submit"
                    variant="outline"
                    disabled={isLoading || !isFormValid}
                >
                    {isLoading ? "Registering..." : "Register"}
                </Button>

                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => navigate("/login", { replace: true })}
                >
                    Login
                </Button>

            </div>
        </form>
    );
}
