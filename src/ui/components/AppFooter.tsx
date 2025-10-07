import type { JSX } from "react";

import { useSettings } from "../hooks/useSettings";

export function AppFooter(): JSX.Element {
  const { settings, isLoading } = useSettings();

  return (
    <footer className="panel-shell flex items-center justify-between uppercase text-textSecondary">
      <span>Provider: {isLoading ? "Loading…" : (settings?.provider.provider ?? "Unknown")}</span>
      <span>Structured: {settings?.structuredDataMode ?? "single-pass"}</span>
    </footer>
  );
}
