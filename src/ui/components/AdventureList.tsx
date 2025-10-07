import { type JSX, useState } from "react";

import { useGameContext } from "../hooks/useGameContext";
import { PanelCard } from "./PanelCard";
import { OptionButton } from "./OptionButton";

interface AdventureListProps {
  onAdventureSelected: () => void;
  className?: string;
}

export function AdventureList({
  onAdventureSelected,
  className = "",
}: AdventureListProps): JSX.Element {
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
      panelId="adventureList"
      title="Past Adventures"
      className={`adventure-list-panel ${className}`}
      footer={
        <button
          type="button"
          className="terminal-button text-accent"
          onClick={() => void refreshAdventures()}
        >
          Refresh
        </button>
      }
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
            const isSelected =
              activeAdventure != null && adventure.id === activeAdventure.metadata.id;

            const onClickAdventureItem = async (): Promise<void> => {
              const wasSelected = await selectAdventure(adventure.id);
              if (!wasSelected) {
                return;
              }
              onAdventureSelected();
            };

            return (
              <li key={adventure.id} className="flex items-start">
                <OptionButton
                  title={
                    <div className="flex items-start justify-between uppercase">
                      <span className="text-textPrimary">{adventure.title}</span>
                      <span>{new Date(adventure.updatedAt).toLocaleDateString()}</span>
                    </div>
                  }
                  synopsis={adventure.seedPrompt}
                  onClick={() => void onClickAdventureItem()}
                  isSelected={isSelected}
                />
                <div className="adventure-list-item-controls flex flex-col items-start uppercase text-textSecondary">
                  {pendingDeleteId !== adventure.id ? (
                    <button
                      type="button"
                      className="terminal-button mr-[1ch]"
                      onClick={() => setPendingDeleteId(adventure.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <>
                      <span className="pl-[1ch]">Delete?</span>
                      <button
                        type="button"
                        className="text-danger terminal-button"
                        onClick={() => {
                          void deleteAdventure(adventure.id);
                          setPendingDeleteId(null);
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="terminal-button"
                        onClick={() => setPendingDeleteId(null)}
                      >
                        Cancel
                      </button>
                    </>
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
