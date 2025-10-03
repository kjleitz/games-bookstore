import type { JSX } from "react";

import { useSettings } from "../context/useSettings";

export function AppFooter(): JSX.Element {
  const { settings, isLoading } = useSettings();

  return (
    <footer className="panel-shell flex items-center justify-between uppercase tracking-[0.18em] text-textSecondary">
      <span>
        Provider: {isLoading ? "Loading…" : (settings?.provider.provider ?? "Unknown")}
      </span>
      <span>Structured: {settings?.structuredDataMode ?? "single-pass"}</span>
    </footer>
  );
}
