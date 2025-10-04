import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface InventoryPanelProps {
  controls: PanelControls;
}

export function InventoryPanel({ controls }: InventoryPanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const items = activeAdventure?.structured.inventory ?? [];

  return (
    <PanelCard title="Inventory" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {items.length === 0 ? (
        <p className="text-textSecondary">No items collected yet.</p>
      ) : (
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="rounded-panel border border-border/40 bg-surface/70">
              <div className="flex items-start justify-between text-textPrimary">
                <span>{item.name}</span>
                <span className="uppercase text-textSecondary">x{item.quantity}</span>
              </div>
              <p className="text-textSecondary">{item.description}</p>
              <p className="uppercase text-accent">
                {item.isConsumable ? "Consumable" : "Persistent"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
