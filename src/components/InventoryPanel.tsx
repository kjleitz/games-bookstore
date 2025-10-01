import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function InventoryPanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const items = activeAdventure?.structured.inventory ?? [];

  return (
    <PanelCard title="Inventory">
      {items.length === 0 ? (
        <p className="text-textSecondary">No items collected yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-panel border border-border/30 bg-surface/60 p-3">
              <div className="flex items-center justify-between text-sm text-textPrimary">
                <span>{item.name}</span>
                <span className="text-xs text-textSecondary">x{item.quantity}</span>
              </div>
              <p className="mt-2 text-xs text-textSecondary">{item.description}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-accent">
                {item.isConsumable ? "Consumable" : "Persistent"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
