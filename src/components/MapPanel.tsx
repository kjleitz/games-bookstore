import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface MapPanelProps {
  controls: PanelControls;
}

export function MapPanel({ controls }: MapPanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const locations = activeAdventure?.structured.map ?? [];

  return (
    <PanelCard title="Map" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {locations.length === 0 ? (
        <p className="text-textSecondary">No locations recorded yet.</p>
      ) : (
        <div className="flex h-full min-h-0 flex-col overflow-y-auto">
          {locations.map((location) => (
            <div
              key={location.id}
              className="rounded-panel border border-border/40 bg-surface/70"
            >
              <div className="flex items-center justify-between text-textPrimary">
                <span>{location.name}</span>
                <span className="uppercase tracking-[0.18em] text-textSecondary">
                  ({location.x}, {location.y})
                </span>
              </div>
              <p className="text-textSecondary">{location.description}</p>
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  );
}
