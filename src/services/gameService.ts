import { createAdventureState } from "../domain/adventureFactory";
import type { AdventureState } from "../domain/types/AdventureState";
import type { AdventureSummary } from "../domain/types/AdventureSummary";
import type { AdventureRepository } from "./types/AdventureRepository";
import type { Clock } from "./types/Clock";
import type { GenerateTurnResult } from "./types/GenerateTurnResult";
import type { StoryEngine } from "./types/StoryEngine";
import type { StructuredStateProjectionResult } from "./types/StructuredStateProjectionResult";
import type { StructuredStateProjector } from "./types/StructuredStateProjector";

export interface StartAdventureInput {
  title: string;
  seedPrompt: string;
  providerModel: string;
}

export class GameService {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly storyEngine: StoryEngine,
    private readonly structuredStateProjector: StructuredStateProjector,
    private readonly clock: Clock,
  ) {}

  async listAdventures(): Promise<AdventureSummary[]> {
    return this.adventureRepository.listAdventures();
  }

  async loadAdventure(adventureId: string): Promise<AdventureState | null> {
    return this.adventureRepository.loadAdventure(adventureId);
  }

  async startAdventure(input: StartAdventureInput): Promise<AdventureState> {
    const adventure = createAdventureState(input.title, input.seedPrompt, input.providerModel);
    const now = this.clock.now();
    adventure.metadata.createdAt = now;
    adventure.metadata.updatedAt = now;
    await this.adventureRepository.saveAdventure(adventure);
    return adventure;
  }

  async recordTurn(adventure: AdventureState, playerAction: string): Promise<AdventureState> {
    const turnResult: GenerateTurnResult = await this.storyEngine.generateTurn({
      adventure,
      playerAction,
    });
    const updatedAdventure: AdventureState = structuredClone(adventure);
    updatedAdventure.turns.push(turnResult.turn);
    updatedAdventure.metadata.updatedAt = this.clock.now();

    const projectionResult: StructuredStateProjectionResult =
      await this.structuredStateProjector.project({
        adventure: updatedAdventure,
        mostRecentTurn: turnResult.turn,
      });

    updatedAdventure.structured = projectionResult.structured;
    updatedAdventure.metadata.updatedAt = this.clock.now();

    await this.adventureRepository.saveAdventure(updatedAdventure);
    return updatedAdventure;
  }

  async deleteAdventure(adventureId: string): Promise<void> {
    await this.adventureRepository.deleteAdventure(adventureId);
  }
}
