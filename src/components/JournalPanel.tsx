import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface JournalPanelProps {
  controls: PanelControls;
}

export function JournalPanel({ controls }: JournalPanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const journal = activeAdventure?.structured.journal ?? [];

  return (
    <PanelCard title="Journal" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {journal.length === 0 ? (
        <p className="text-textSecondary">No entries yet.</p>
      ) : (
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
          {journal.map((entry) => (
            <li key={entry.id} className="rounded-panel border border-border/40 bg-surface/70">
              <div className="uppercase tracking-[0.18em] text-textSecondary">
                {new Date(entry.createdAt).toLocaleString()}
              </div>
              <h3 className="text-textPrimary">{entry.title}</h3>
              <p className="text-textSecondary">{entry.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
