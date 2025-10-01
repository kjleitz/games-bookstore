import type { AdventureState } from "../domain/types/AdventureState";
import type { AdventureSummary } from "../domain/types/AdventureSummary";
import { GameStore } from "../storage/types/GameStore";
import type { AdventureRepository } from "./types/AdventureRepository";

function requireGameStore(): GameStore {
  const { gameStore } = window ?? {};

  if (gameStore == null) {
    throw new Error("gameStore API is not available in this environment");
  }

  return gameStore;
}

export class ElectronAdventureRepository implements AdventureRepository {
  async listAdventures(): Promise<AdventureSummary[]> {
    const store = requireGameStore();
    return await store.listAdventures();
  }

  async loadAdventure(adventureId: string): Promise<AdventureState | null> {
    const store = requireGameStore();
    return await store.loadAdventure(adventureId);
  }

  async saveAdventure(adventure: AdventureState): Promise<void> {
    const store = requireGameStore();
    await store.saveAdventure(adventure);
  }

  async deleteAdventure(adventureId: string): Promise<void> {
    const store = requireGameStore();
    await store.deleteAdventure(adventureId);
  }
}
