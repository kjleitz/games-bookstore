import { type JSX, useMemo } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface VitalsPanelProps {
  controls: PanelControls;
}

export function VitalsPanel({ controls }: VitalsPanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const vitalsState = activeAdventure?.structured.vitals;

  const healthPercent = useMemo<number>(() => {
    if (vitalsState == null || vitalsState.maxHealth <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((vitalsState.currentHealth / vitalsState.maxHealth) * 100));
  }, [vitalsState]);

  return (
    <PanelCard title="Vitals" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {vitalsState == null ? (
        <p className="text-textSecondary">Vitals unavailable.</p>
      ) : (
        <div className="flex flex-col">
          <div>
            <div className="flex items-start justify-between uppercase text-textSecondary">
              <span>Health</span>
              <span>
                {vitalsState.currentHealth} / {vitalsState.maxHealth}
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
              {vitalsState.conditions.length === 0 ? (
                <li className="text-textSecondary">None</li>
              ) : (
                vitalsState.conditions.map((condition) => (
                  <li
                    key={condition.id}
                    className="rounded-panel border border-border/40 bg-surface/70"
                  >
                    <div className="flex items-center justify-between text-textPrimary">
                      <span>{condition.name}</span>
                      <span className="uppercase text-warning">{condition.severity}</span>
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
