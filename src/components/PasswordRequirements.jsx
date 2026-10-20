export function PasswordRequirements({ passwordRules }) {
    return (
        <div className="mt-3 mb-4 rounded-md border border-[#253241] p-6 text-xs text-slate-400">
            <p className={passwordRules.hasMinLength ? "text-green-400" : ""}>
                ✓ At least 8 characters
            </p>

            <p className={passwordRules.hasUppercase ? "text-green-400" : ""}>
                ✓ One uppercase letter (A–Z)
            </p>

            <p className={passwordRules.hasNumber ? "text-green-400" : ""}>
                ✓ One number (0–9)
            </p>

            <p className={passwordRules.hasSymbol ? "text-green-400" : ""}>
                ✓ One symbol (!@#$...)
            </p>
        </div>
    );
}