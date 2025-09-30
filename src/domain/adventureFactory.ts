import type { AdventureMetadata, AdventureState, DamageState, StructuredState } from "../types/game";

export const DEFAULT_DAMAGE_STATE: DamageState = {
  currentHealth: 10,
  maxHealth: 10,
  conditions: [],
};

export function createStructuredState(): StructuredState {
  return {
    inventory: [],
    journal: [],
    damage: { ...DEFAULT_DAMAGE_STATE },
    map: [],
    contacts: [],
    appearanceHistory: [],
  };
}

export function createAdventureMetadata(title: string, seedPrompt: string, providerModel: string): AdventureMetadata {
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

export function createAdventureState(title: string, seedPrompt: string, providerModel: string): AdventureState {
  return {
    metadata: createAdventureMetadata(title, seedPrompt, providerModel),
    turns: [],
    structured: createStructuredState(),
  };
}
