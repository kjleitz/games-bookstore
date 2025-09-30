import type { AdventureState } from "../types/game";

export function getCurrentTurn(adventure: AdventureState): number {
  return adventure.turns.length;
}

export function getLatestNarrative(adventure: AdventureState): string | null {
  if (adventure.turns.length === 0) {
    return null;
  }

  const lastTurn = adventure.turns[adventure.turns.length - 1];
  return lastTurn.narrative;
}

export function getAdventureTitle(adventure: AdventureState): string {
  return adventure.metadata.title;
}
