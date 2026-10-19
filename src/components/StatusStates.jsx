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
    <div className="loading-overlay">
    <div className="loading-dialog">
        <span
            className="loading-spinner"
            aria-hidden="true"
        />

        <p className="loading-label">
            Logging in…
        </p>
    </div>
</div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="error-panel">
    <p className="error-panel-title">
        Login failed..
    </p>

    <p className="error-panel-message">
        {message}
    </p>
</div>
  );
}

export function LoginState({data}) {
  return (
    <div className="success-panel">
    <p className="success-panel-title">
        Login successful!
    </p>

    <p className="success-panel-message">
        Welcome {data.user.username}
    </p>
</div>
  );
}
