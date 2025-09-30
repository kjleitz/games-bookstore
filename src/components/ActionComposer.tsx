import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { useGameContext } from "../context/useGameContext";

export function ActionComposer(): ReactElement | null {
  const { activeAdventure, submitPlayerAction, isSubmitting } = useGameContext();
  const [actionText, setActionText] = useState("");

  if (activeAdventure == null) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const trimmed = actionText.trim();
    if (trimmed.length === 0) {
      return;
    }
    await submitPlayerAction(trimmed);
    setActionText("");
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="mt-4 flex items-center gap-3 rounded-panel border border-border/60 bg-surface/80 p-4 shadow-glow">
      <label className="flex-1">
        <span className="sr-only">Player action</span>
        <input
          type="text"
          value={actionText}
          onChange={(event) => setActionText(event.target.value)}
          placeholder="Describe a concise action"
          className="w-full rounded-panel border border-border/40 bg-canvas/60 px-3 py-3 font-mono text-sm text-textPrimary focus:border-accent focus:outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-panel border border-accent bg-accent/10 px-4 py-3 font-semibold uppercase tracking-[0.25em] text-textPrimary transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-50"
      >
        {isSubmitting ? "Processing…" : "Send"}
      </button>
    </form>
  );
}
