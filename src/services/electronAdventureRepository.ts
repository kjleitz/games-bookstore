import type { AdventureState, AdventureSummary } from "../types/game";
import type { AdventureRepository } from "../types/services";

function requireGameStore(): typeof window.gameStore {
  if (typeof window === "undefined" || window.gameStore == null) {
    throw new Error("gameStore API is not available in this environment");
  }
  return window.gameStore;
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
