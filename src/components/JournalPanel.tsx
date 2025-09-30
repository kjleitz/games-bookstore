import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function JournalPanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const journal = activeAdventure?.structured.journal ?? [];

  return (
    <PanelCard title="Journal">
      {journal.length === 0 ? (
        <p className="text-textSecondary">No entries yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {journal.map((entry) => (
            <li key={entry.id} className="rounded-panel border border-border/30 bg-surface/60 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                {new Date(entry.createdAt).toLocaleString()}
              </div>
              <h3 className="mt-1 text-sm font-semibold text-textPrimary">{entry.title}</h3>
              <p className="mt-2 text-sm text-textSecondary">{entry.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
