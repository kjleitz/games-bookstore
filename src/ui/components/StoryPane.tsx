import { type JSX, useMemo } from "react";

import { useGameContext } from "../hooks/useGameContext";
import type { StoryTurn } from "../../domain/types/StoryTurn";
import { PanelCard } from "./PanelCard";
import { ActionComposer } from "./ActionComposer";

interface StoryPaneProps {
  className?: string;
}

export function StoryPane({ className = "" }: StoryPaneProps): JSX.Element {
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
    <PanelCard
      panelId="story"
      title="Story"
      scrollable={false}
      showControls={false}
      subheader={
        <span className="mx-[1ch] text-textSecondary text-right">
          &gt; {activeAdventure.metadata.title}
        </span>
      }
      className={`story-panel flex flex-col ${className}`}
    >
      <span className="text-danger flex-none">{error}</span>

      <ul className="story-text panel-scroll flex flex-col min-h-0 overflow-y-scroll text-textSecondary">
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

      <ActionComposer />
    </PanelCard>
  );
}
