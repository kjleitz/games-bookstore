import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function AppearancePanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const history = activeAdventure?.structured.appearanceHistory ?? [];

  return (
    <PanelCard title="Appearance">
      {history.length === 0 ? (
        <p className="text-textSecondary">No appearance changes logged.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {history.map((snapshot) => (
            <li key={snapshot.id} className="rounded-panel border border-border/30 bg-surface/60 p-3">
              <div className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                {new Date(snapshot.createdAt).toLocaleString()}
              </div>
              <p className="mt-2 text-sm text-textPrimary">{snapshot.summary}</p>
              {snapshot.details != null && <p className="mt-2 text-xs text-textSecondary">{snapshot.details}</p>}
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
