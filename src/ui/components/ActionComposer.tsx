import type { FormEvent, KeyboardEvent, ReactElement } from "react";
import { useState } from "react";

import { useGameContext } from "../hooks/useGameContext";

export function ActionComposer(): ReactElement | null {
  const { activeAdventure, submitPlayerAction, isSubmitting } = useGameContext();
  const [actionText, setActionText] = useState("");

  if (activeAdventure == null) {
    return null;
  }

  const submitAction = async (): Promise<void> => {
    if (isSubmitting) {
      return;
    }
    const trimmed = actionText.trim();
    if (trimmed.length === 0) {
      return;
    }
    await submitPlayerAction(trimmed);
    setActionText("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await submitAction();
  };

  const handleComposerKeyDown = async (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ): Promise<void> => {
    if (event.key !== "Enter" || event.shiftKey) {
      return;
    }
    event.preventDefault();
    await submitAction();
  };

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="action-composer panel-shell flex flex-col sm:flex-row sm:items-end"
    >
      <label className="flex-1">
        <span className="terminal-label">Player action</span>
        <textarea
          value={actionText}
          rows={3}
          onChange={(event) => setActionText(event.target.value)}
          onKeyDown={(event) => void handleComposerKeyDown(event)}
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
