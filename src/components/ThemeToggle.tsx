import type { JSX } from "react";

import { useTheme } from "../context/useTheme";

export function ThemeToggle(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="terminal-button"
    >
      {isDark ? "Switch Light" : "Switch Dark"}
    </button>
  );
}
