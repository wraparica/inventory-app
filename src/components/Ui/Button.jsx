export default function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex shrink-0 items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-40";

  const variants = {
    primary:
      "bg-cyan-500 px-4 py-3 text-sm font-medium text-slate-950 hover:bg-cyan-400",

    secondary:
      "border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-100 hover:bg-slate-700",

    danger:
      "bg-red-600 px-4 py-3 text-sm text-white hover:bg-red-500",

    outline:
      "border border-cyan-400/40 bg-cyan-400/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-400/20 active:scale-[0.97] disabled:hover:bg-cyan-400/10 sm:px-5",

    ghost:
      "px-4 py-3 font-mono text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300",

    delete:
      "border border-red-400/40 bg-red-400/10 px-4 py-3 font-mono text-xs uppercase tracking-widest text-red-400 hover:border-red-400/60 hover:bg-red-400/20 active:scale-[0.97] disabled:hover:bg-red-400/10 sm:px-5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}