import { type JSX, useState } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface AdventureListProps {
  controls: PanelControls;
  onAdventureSelected: () => void;
}

export function AdventureList({ controls, onAdventureSelected }: AdventureListProps): JSX.Element {
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
      className="flex-1 min-h-0 overflow-hidden"
      footer={
        <button
          type="button"
          className="terminal-button text-accent"
          onClick={() => void refreshAdventures()}
        >
          Refresh
        </button>
      }
      controls={controls}
    >
      <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
        {isLoading && adventures.length === 0 ? (
          <li key="loading-row" className="text-textSecondary">
            Loading adventures…
          </li>
        ) : adventures.length === 0 ? (
          <li key="empty-row" className="text-textSecondary">
            No adventures yet.
          </li>
        ) : (
          adventures.map((adventure) => {
            const isActive =
              activeAdventure != null && adventure.id === activeAdventure.metadata.id;

            const onClickAdventureItem = async (): Promise<void> => {
              const wasSelected = await selectAdventure(adventure.id);
              if (!wasSelected) {
                return;
              }
              onAdventureSelected();
            };

            return (
              <li key={adventure.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => void onClickAdventureItem()}
                  className={`w-full rounded-panel border text-left transition-colors ${
                    isActive
                      ? "border-accent bg-accent/20 text-textPrimary"
                      : "border-border/40 bg-surface/70 text-textSecondary hover:border-accent hover:text-textPrimary"
                  }`}
                >
                  <div className="flex items-start justify-between uppercase">
                    <span className="text-textPrimary">{adventure.title}</span>
                    <span>{new Date(adventure.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-textSecondary">{adventure.seedPrompt}</p>
                </button>
                <div className="flex uppercase text-textSecondary">
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
          })
        )}
      </ul>
    </PanelCard>
  );
}
