import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface AppearancePanelProps {
  controls: PanelControls;
}

export function AppearancePanel({ controls }: AppearancePanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const history = activeAdventure?.structured.appearanceHistory ?? [];

  return (
    <PanelCard title="Appearance" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {history.length === 0 ? (
        <p className="text-textSecondary">No appearance changes logged.</p>
      ) : (
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
          {history.map((snapshot) => (
            <li
              key={snapshot.id}
              className="rounded-panel border border-border/40 bg-surface/70"
            >
              <div className="uppercase tracking-[0.18em] text-textSecondary">
                {new Date(snapshot.createdAt).toLocaleString()}
              </div>
              <p className="text-textPrimary">{snapshot.summary}</p>
              {snapshot.details != null && (
                <p className="text-textSecondary">{snapshot.details}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
