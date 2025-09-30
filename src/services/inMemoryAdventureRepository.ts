import { createStructuredState } from "../domain/adventureFactory";
import type { AdventureState, AdventureSummary } from "../types/game";
import type { AdventureRepository } from "../types/services";

export class InMemoryAdventureRepository implements AdventureRepository {
  private readonly adventures = new Map<string, AdventureState>();

  constructor(initialAdventures?: AdventureState[]) {
    if (initialAdventures != null) {
      for (const adventure of initialAdventures) {
        this.adventures.set(adventure.metadata.id, structuredClone(adventure));
      }
    }
  }

  listAdventures(): Promise<AdventureSummary[]> {
    const summaries = Array.from(this.adventures.values()).map((adventure) => ({
      id: adventure.metadata.id,
      title: adventure.metadata.title,
      createdAt: adventure.metadata.createdAt,
      updatedAt: adventure.metadata.updatedAt,
      seedPrompt: adventure.metadata.seedPrompt,
    }));
    summaries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
    return Promise.resolve(summaries);
  }

  loadAdventure(adventureId: string): Promise<AdventureState | null> {
    const adventure = this.adventures.get(adventureId);
    return Promise.resolve(adventure != null ? structuredClone(adventure) : null);
  }

  saveAdventure(adventure: AdventureState): Promise<void> {
    this.adventures.set(adventure.metadata.id, structuredClone(adventure));
    return Promise.resolve();
  }

  deleteAdventure(adventureId: string): Promise<void> {
    this.adventures.delete(adventureId);
    return Promise.resolve();
  }

  createPlaceholderAdventure(): AdventureState {
    const id = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const placeholder: AdventureState = {
      metadata: {
        id,
        title: "Prototype Adventure",
        createdAt: timestamp,
        updatedAt: timestamp,
        seedPrompt: "A mysterious terminal welcomes the player aboard an interstellar library.",
        providerModel: "mock",
      },
      turns: [
        {
          id: crypto.randomUUID(),
          createdAt: timestamp,
          playerAction: "look around",
          narrative:
            "Neon glyphs flicker to life as you step into the atrium of the Games Bookstore. Shelves rearrange themselves, anticipating your curiosity.",
          wasActionAccepted: true,
          summary: "Arrived at the Games Bookstore atrium.",
        },
      ],
      structured: {
        ...createStructuredState(),
        inventory: [
          {
            id: crypto.randomUUID(),
            name: "Chrono Compass",
            description: "A brass instrument that hums softly when pointed toward narrative anomalies.",
            quantity: 1,
            isConsumable: false,
          },
        ],
        journal: [
          {
            id: crypto.randomUUID(),
            createdAt: timestamp,
            title: "Grand Opening",
            notes: "Met the archivist AI who offered me a tour of living stories.",
          },
        ],
      },
    };

    this.adventures.set(id, placeholder);
    return structuredClone(placeholder);
  }
}
