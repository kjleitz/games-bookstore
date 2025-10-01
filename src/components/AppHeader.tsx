import type { JSX } from "react";

import { ThemeToggle } from "./ThemeToggle";

export function AppHeader(): JSX.Element {
  return (
    <header className="flex items-center justify-between rounded-panel border border-border/60 bg-surface/80 p-4 shadow-glow">
      <div>
        <h1 className="font-display text-lg text-textPrimary">Games Bookstore</h1>
        <p className="text-xs uppercase tracking-[0.3em] text-textSecondary">
          Interactive fiction terminal
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
