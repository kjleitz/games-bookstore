import type { AdventureMetadata } from "./types/AdventureMetadata";
import type { AdventureState } from "./types/AdventureState";
import type { StructuredState } from "./types/StructuredState";
import type { VitalsState } from "./types/VitalsState";

export const DEFAULT_VITALS_STATE: VitalsState = {
  currentHealth: 10,
  maxHealth: 10,
  conditions: [],
};

export function createStructuredState(): StructuredState {
  return {
    inventory: [],
    journal: [],
    vitals: { ...DEFAULT_VITALS_STATE },
    map: [],
    contacts: [],
    appearanceHistory: [],
  };
}

export function createAdventureMetadata(
  title: string,
  seedPrompt: string,
  providerModel: string,
): AdventureMetadata {
  const timestamp = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    createdAt: timestamp,
    updatedAt: timestamp,
    seedPrompt,
    providerModel,
  };
}

export function createAdventureState(
  title: string,
  seedPrompt: string,
  providerModel: string,
): AdventureState {
  return {
    metadata: createAdventureMetadata(title, seedPrompt, providerModel),
    turns: [],
    structured: createStructuredState(),
  };
}
