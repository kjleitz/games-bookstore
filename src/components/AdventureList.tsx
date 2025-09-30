import { useState } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function AdventureList(): JSX.Element {
  const {
    adventures,
    activeAdventure,
    selectAdventure,
    deleteAdventure,
    refreshAdventures,
    isLoading,
  } = useGameContext();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  return (
    <PanelCard
      title="Adventures"
      footer={
        <button
          type="button"
          className="text-xs uppercase tracking-[0.25em] text-accent transition-colors hover:text-textPrimary"
          onClick={() => void refreshAdventures()}
        >
          Refresh
        </button>
      }
    >
      {isLoading && <p className="text-textSecondary">Loading adventures…</p>}
      {!isLoading && adventures.length === 0 && <p>No adventures yet.</p>}
      <ul className="flex flex-col gap-3">
        {adventures.map((adventure) => {
          const isActive = activeAdventure != null && adventure.id === activeAdventure.metadata.id;
          return (
            <li key={adventure.id} className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => void selectAdventure(adventure.id)}
                className={`w-full rounded-panel border px-3 py-2 text-left transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-textPrimary"
                    : "border-border/40 bg-surface/60 text-textSecondary hover:border-accent/60 hover:text-textPrimary"
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em]">
                  <span>{adventure.title}</span>
                  <span>{new Date(adventure.updatedAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-xs text-textSecondary">{adventure.seedPrompt}</p>
              </button>
              <div className="flex gap-2 text-xs text-textSecondary">
                {pendingDeleteId === adventure.id ? (
                  <>
                    <span>Delete?</span>
                    <button
                      type="button"
                      className="text-danger"
                      onClick={() => {
                        void deleteAdventure(adventure.id);
                        setPendingDeleteId(null);
                      }}
                    >
                      Confirm
                    </button>
                    <button type="button" onClick={() => setPendingDeleteId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => setPendingDeleteId(adventure.id)}>
                    Delete
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}
