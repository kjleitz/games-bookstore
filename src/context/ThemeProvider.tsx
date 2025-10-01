import { type JSX, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import type { ThemeName } from "../settings/types/ThemeName";
import { ThemeContext, type ThemeContextValue } from "./themeContext";

const THEME_STORAGE_KEY = "games-bookstore-theme";

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }

    return "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.body.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeName): void => {
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback((): void => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
