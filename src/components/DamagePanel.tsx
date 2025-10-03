import { type JSX, useMemo } from "react";

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
    <PanelCard title="Vitals" className="flex-1 min-h-0 overflow-hidden">
      {damageState == null ? (
        <p className="text-textSecondary">Vitals unavailable.</p>
      ) : (
        <div className="flex flex-col">
          <div>
            <div className="flex items-center justify-between uppercase tracking-[0.18em] text-textSecondary">
              <span>Health</span>
              <span>
                {damageState.currentHealth} / {damageState.maxHealth}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-surfaceMuted">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${healthPercent}%` }}
              />
            </div>
          </div>
          <div>
            <h3 className="terminal-label">Conditions</h3>
            <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
              {damageState.conditions.length === 0 ? (
                <li className="text-textSecondary">None</li>
              ) : (
                damageState.conditions.map((condition) => (
                  <li
                    key={condition.id}
                    className="rounded-panel border border-border/40 bg-surface/70"
                  >
                    <div className="flex items-center justify-between text-textPrimary">
                      <span>{condition.name}</span>
                      <span className="uppercase tracking-[0.18em] text-warning">
                        {condition.severity}
                      </span>
                    </div>
                    <p className="text-textSecondary">{condition.description}</p>
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
