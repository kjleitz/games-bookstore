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
        <span>[ {activeAdventure.metadata.title} ]</span>
        {error != null && <span className="text-danger">{error}</span>}
      </header>
      <div className="panel-scroll">
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto text-textSecondary">
          {turns.map((turn) => (
            <li key={turn.id} className="border-l-2 border-accent/80">
              <div className="uppercase tracking-[0.18em] text-textSecondary">
                {new Date(turn.createdAt).toLocaleTimeString()}
              </div>
              <p className="text-accent">&gt; {turn.playerAction}</p>
              <p className="text-textPrimary">{turn.narrative}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
