import { useMemo } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function DamagePanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const damageState = activeAdventure?.structured.damage;

  const healthPercent = useMemo<number>(() => {
    if (damageState == null || damageState.maxHealth <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((damageState.currentHealth / damageState.maxHealth) * 100));
  }, [damageState]);

  return (
    <PanelCard title="Vitals">
      {damageState == null ? (
        <p className="text-textSecondary">Vitals unavailable.</p>
      ) : (
        <div className="flex flex-col gap-3">
          <div>
            <div className="flex items-center justify-between text-xs text-textSecondary">
              <span>Health</span>
              <span>
                {damageState.currentHealth} / {damageState.maxHealth}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-surfaceMuted">
              <div className="h-full rounded-full bg-accent" style={{ width: `${healthPercent}%` }} />
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-textSecondary">Conditions</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {damageState.conditions.length === 0 ? (
                <li className="text-textSecondary">None</li>
              ) : (
                damageState.conditions.map((condition) => (
                  <li key={condition.id} className="rounded-panel border border-border/20 bg-surface/40 p-2">
                    <div className="flex items-center justify-between text-sm text-textPrimary">
                      <span>{condition.name}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-warning">{condition.severity}</span>
                    </div>
                    <p className="mt-1 text-xs text-textSecondary">{condition.description}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </PanelCard>
  );
}
