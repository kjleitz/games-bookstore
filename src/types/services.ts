import type { AdventureState, AdventureSummary, StoryPromptOption, StoryTurn } from "./game";
import type { GameSettings } from "./settings";

export interface AdventureRepository {
  listAdventures(): Promise<AdventureSummary[]>;
  loadAdventure(adventureId: string): Promise<AdventureState | null>;
  saveAdventure(adventure: AdventureState): Promise<void>;
  deleteAdventure(adventureId: string): Promise<void>;
}

export interface PromptRepository {
  listPrompts(): Promise<StoryPromptOption[]>;
}

export interface LlmStoryEngine {
  generateTurn(options: GenerateTurnOptions): Promise<GenerateTurnResult>;
  extractStructuredState(options: ExtractStructuredStateOptions): Promise<ExtractStructuredStateResult>;
}

export interface GenerateTurnOptions {
  adventure: AdventureState;
  playerAction: string;
}

export interface GenerateTurnResult {
  turn: StoryTurn;
}

export interface ExtractStructuredStateOptions {
  adventure: AdventureState;
  mostRecentTurn: StoryTurn;
}

export interface ExtractStructuredStateResult {
  adventure: AdventureState;
}

export interface SettingsGateway {
  loadSettings(): Promise<GameSettings | null>;
  saveSettings(settings: GameSettings): Promise<void>;
}

export interface Clock {
  now(): string;
}
