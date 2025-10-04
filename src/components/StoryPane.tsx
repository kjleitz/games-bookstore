import { type JSX, useMemo } from "react";

import { useGameContext } from "../context/useGameContext";
import type { StoryTurn } from "../domain/types/StoryTurn";

export function StoryPane(): JSX.Element {
  const { activeAdventure, isLoading, error } = useGameContext();

  const turns = useMemo<StoryTurn[]>(() => {
    if (activeAdventure == null) {
      return [];
    }
    return activeAdventure.turns;
  }, [activeAdventure]);

  if (isLoading && activeAdventure == null) {
    return (
      <div className="panel-shell flex h-full items-center justify-center text-textSecondary">
        Loading…
      </div>
    );
  }

  if (activeAdventure == null) {
    return (
      <div className="panel-shell-muted flex h-full items-center justify-center text-textSecondary">
        Select or create an adventure to begin.
      </div>
    );
  }

  return (
    <div className="panel-shell flex h-full flex-col">
      <header className="panel-section-header">
        <span className="whitespace-nowrap">[ Story ]</span>
        <span className="mx-[1ch] text-textSecondary text-right">
          &gt; {activeAdventure.metadata.title}
        </span>
      </header>
      <span className="text-danger">{error}</span>
      <div className="panel-scroll">
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto text-textSecondary">
          {turns.map((turn) => (
            <li key={turn.id} className="story-turn-item border-accent/80">
              <p className="text-accent mb-[1em]">
                <span className="uppercase text-textSecondary mb-[1em]">
                  [{new Date(turn.createdAt).toLocaleTimeString()}]
                </span>{" "}
                &gt; {turn.playerAction}
              </p>
              <p className="text-textPrimary">{turn.narrative}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
