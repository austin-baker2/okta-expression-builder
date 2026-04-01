import { useExpression } from "../hooks/useExpression";

export default function Header() {
  const { mode, setMode, profileOpen, setProfileOpen } = useExpression();

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-border bg-bg-deep">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-accent" />
        <h1 className="text-base font-bold font-display tracking-tight text-text">
          Okta Expression Builder
        </h1>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="px-3 py-1 text-xs font-mono tracking-wide uppercase border border-border text-text-secondary hover:text-text hover:border-accent hover:bg-accent-dim transition-all duration-200"
        >
          {profileOpen ? "Hide" : "Show"} Profile
        </button>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-mono uppercase tracking-wider transition-colors ${
              mode === "easy" ? "text-accent" : "text-text-muted"
            }`}
          >
            Easy
          </span>
          <button
            onClick={() => setMode(mode === "easy" ? "advanced" : "easy")}
            className="relative w-10 h-5 border border-border bg-bg-surface transition-colors hover:border-accent"
            aria-label={`Switch to ${mode === "easy" ? "advanced" : "easy"} mode`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-accent transition-transform duration-200 ${
                mode === "advanced" ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
          <span
            className={`text-xs font-mono uppercase tracking-wider transition-colors ${
              mode === "advanced" ? "text-accent" : "text-text-muted"
            }`}
          >
            Advanced
          </span>
        </div>
      </div>
    </header>
  );
}
