import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function MapPanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const locations = activeAdventure?.structured.map ?? [];

  return (
    <PanelCard title="Map">
      {locations.length === 0 ? (
        <p className="text-textSecondary">No locations recorded yet.</p>
      ) : (
        <div className="space-y-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="rounded-panel border border-border/30 bg-surface/60 p-3"
            >
              <div className="flex items-center justify-between text-sm text-textPrimary">
                <span>{location.name}</span>
                <span className="text-xs text-textSecondary">
                  ({location.x}, {location.y})
                </span>
              </div>
              <p className="mt-2 text-xs text-textSecondary">{location.description}</p>
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  );
}
