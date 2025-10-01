import type { JSX } from "react";

import { useTheme } from "../context/useTheme";

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-panel border border-border/40 bg-surface/60 px-3 py-2 text-xs uppercase tracking-[0.3em] text-textSecondary hover:border-accent hover:text-textPrimary"
    >
      {isDark ? "Switch Light" : "Switch Dark"}
    </button>
  );
}
