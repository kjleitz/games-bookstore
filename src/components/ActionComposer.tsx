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
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="panel-shell flex flex-col sm:flex-row sm:items-end"
    >
      <label className="flex-1">
        <span className="terminal-label">Player action</span>
        <input
          type="text"
          value={actionText}
          onChange={(event) => setActionText(event.target.value)}
          placeholder="Describe a concise action"
          className="terminal-input w-full"
        />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="terminal-button terminal-button-primary whitespace-nowrap text-textPrimary disabled:opacity-50"
      >
        {isSubmitting ? "Processing…" : "Send"}
      </button>
    </form>
  );
}
