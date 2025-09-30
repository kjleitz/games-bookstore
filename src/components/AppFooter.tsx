import { useSettings } from "../context/useSettings";

export function AppFooter(): JSX.Element {
  const { settings, isLoading } = useSettings();

  return (
    <footer className="flex items-center justify-between rounded-panel border border-border/60 bg-surface/80 p-3 text-xs text-textSecondary shadow-glow">
      <span>LLM Provider: {isLoading ? "Loading…" : settings?.provider.provider ?? "Unknown"}</span>
      <span>Structured mode: {settings?.structuredDataMode ?? "single-pass"}</span>
    </footer>
  );
}
