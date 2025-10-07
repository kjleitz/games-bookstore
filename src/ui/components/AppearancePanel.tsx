import type { JSX } from "react";

import { useGameContext } from "../hooks/useGameContext";
import { PanelCard } from "./PanelCard";

export function AppearancePanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const history = activeAdventure?.structured.appearanceHistory ?? [];

  return (
    <PanelCard panelId="appearance" title="Appearance">
      {history.length === 0 ? (
        <p className="text-textSecondary">No appearance changes logged.</p>
      ) : (
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
          {history.map((snapshot) => (
            <li key={snapshot.id} className="rounded-panel border border-border/40 bg-surface/70">
              <div className="uppercase text-textSecondary">
                {new Date(snapshot.createdAt).toLocaleString()}
              </div>
              <p className="text-textPrimary">{snapshot.summary}</p>
              {snapshot.details != null && <p className="text-textSecondary">{snapshot.details}</p>}
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
