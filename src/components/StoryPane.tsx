import { useMemo } from "react";

import { useGameContext } from "../context/useGameContext";
import type { StoryTurn } from "../types/game";

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
      <div className="flex h-full items-center justify-center rounded-panel border border-border/40 bg-surface/60 text-textSecondary">
        Loading…
      </div>
    );
  }

  if (activeAdventure == null) {
    return (
      <div className="flex h-full items-center justify-center rounded-panel border border-dashed border-border/40 bg-surface/40 text-textSecondary">
        Select or create an adventure to begin.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 rounded-panel border border-border/60 bg-surface/80 p-6 shadow-glow">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl text-textPrimary">{activeAdventure.metadata.title}</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-textSecondary">Interactive narrative</p>
        </div>
        {error != null && <span className="text-xs text-danger">{error}</span>}
      </header>
      <div className="flex-1 overflow-y-auto rounded-panel border border-border/40 bg-canvas/60 p-4">
        <ul className="flex flex-col gap-6 text-sm leading-relaxed text-textSecondary">
          {turns.map((turn) => (
            <li key={turn.id} className="rounded-panel border border-border/20 bg-surface/40 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-textSecondary">
                {new Date(turn.createdAt).toLocaleTimeString()}
              </div>
              <p className="mt-2 font-mono text-[13px] text-accent">&gt; {turn.playerAction}</p>
              <p className="mt-3 text-textPrimary">{turn.narrative}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
