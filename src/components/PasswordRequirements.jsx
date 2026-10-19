export function PasswordRequirements({passwordRules}) {
    return (
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
    );
}