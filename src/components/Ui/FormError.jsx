export default function FormError({ id, children, className = "" }) {
  if (!children) return null;

  return (
    <p
      id={id}
      className={`font-mono text-xs uppercase tracking-widest text-red-400 ${className}`}
      role="alert"
    >
      {children}
    </p>
  );
}