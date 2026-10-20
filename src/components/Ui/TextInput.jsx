export default function TextInput({
  value,
  onChange,
  onBlur,
  type = "text",
  name,
  placeholder = "",
  ariaLabel,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      aria-label={ariaLabel ?? placeholder}
      className={`min-w-0 w-full rounded-md border border-[#253241]
        bg-[#101820] px-4 py-3 font-sans text-sm text-slate-100
        placeholder:text-slate-500 outline-none transition-colors
        duration-200 focus:border-cyan-400/60
        focus:ring-2 focus:ring-cyan-400/10
        ${className}`}
      {...props}
    />
  );
}