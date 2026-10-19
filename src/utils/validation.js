export function validateUsername(username) {
    return username.trim().length >= 3;
}

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

export function validatePassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9\s]/.test(password);
    const hasMinLength = password.length >= 8;

    return {
        isValid:
            hasUppercase &&
            hasNumber &&
            hasSymbol &&
            hasMinLength,
        hasUppercase,
        hasNumber,
        hasSymbol,
        hasMinLength,
    };
}