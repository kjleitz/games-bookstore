import { createAdventureState } from "../domain/adventureFactory";
import type { AdventureState, AdventureSummary } from "../types/game";
import type {
  AdventureRepository,
  Clock,
  ExtractStructuredStateResult,
  GenerateTurnResult,
  LlmStoryEngine,
} from "../types/services";

export interface StartAdventureInput {
  title: string;
  seedPrompt: string;
  providerModel: string;
}

export class GameService {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly storyEngine: LlmStoryEngine,
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
    const turnResult: GenerateTurnResult = await this.storyEngine.generateTurn({ adventure, playerAction });
    const updatedAdventure: AdventureState = structuredClone(adventure);
    updatedAdventure.turns.push(turnResult.turn);
    updatedAdventure.metadata.updatedAt = this.clock.now();

    const extractionResult: ExtractStructuredStateResult = await this.storyEngine.extractStructuredState({
      adventure: updatedAdventure,
      mostRecentTurn: turnResult.turn,
    });

    const finalAdventure = extractionResult.adventure;
    finalAdventure.metadata.updatedAt = this.clock.now();

    await this.adventureRepository.saveAdventure(finalAdventure);
    return finalAdventure;
  }

  async deleteAdventure(adventureId: string): Promise<void> {
    await this.adventureRepository.deleteAdventure(adventureId);
  }
}
