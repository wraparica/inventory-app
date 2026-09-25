export function EmptyState() {
  return (
    <div className="rounded-md border border-dashed border-[#253241] px-6 py-12 text-center sm:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Standing by</p>
      <p className="mt-2 text-sm text-slate-400">Add item in inventory now.</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1118]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-[#253241] bg-[#111A24] px-10 py-8 text-center shadow-2xl">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/25 border-t-cyan-400"
          aria-hidden="true"
        />

        <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
          Logging in…
        </p>
      </div>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="animate-panel-in rounded-md border border-red-400/30 bg-red-400/5 px-6 py-8 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-red-400">Login failed..</p>
      <p className="mt-2 text-sm text-slate-400">{message}</p>
    </div>
  );
}

export function LoginState({data}) {
  return (
    <div className="animate-panel-in rounded-md border border-green-400/30 bg-green-400/5 px-6 py-8 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">Login successful!</p>
      <p className="mt-2 text-sm text-slate-400">Welcome {data.user.username}</p>
    </div>
  );
}