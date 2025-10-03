import type { AdventureState } from "../domain/types/AdventureState";
import type { StoryTurn } from "../domain/types/StoryTurn";
import type { GenerateTurnOptions } from "./types/GenerateTurnOptions";
import type { GenerateTurnResult } from "./types/GenerateTurnResult";
import type { StoryEngine } from "./types/StoryEngine";

function buildNarrative(playerAction: string, turnNumber: number): string {
  const action = playerAction.trim();
  if (action.length === 0) {
    return "You hesitate, and the terminal hums expectantly.";
  }

  const normalizedAction = action.toLowerCase();
  if (normalizedAction.includes("inventory")) {
    return "Drawer panels unfold, revealing artifacts waiting for a story.";
  }

  if (normalizedAction.includes("map")) {
    return "Lines of light trace a new region across the holomap.";
  }

  return `Turn ${turnNumber}: ${playerAction} — the story engine weaves the outcome into the scene.`;
}

function createStoryTurn(adventure: AdventureState, playerAction: string): StoryTurn {
  const timestamp = new Date().toISOString();
  const turnNumber = adventure.turns.length + 1;
  return {
    id: crypto.randomUUID(),
    createdAt: timestamp,
    playerAction,
    narrative: buildNarrative(playerAction, turnNumber),
    wasActionAccepted: true,
  };
}

export class MockStoryEngine implements StoryEngine {
  generateTurn(options: GenerateTurnOptions): Promise<GenerateTurnResult> {
    const turn = createStoryTurn(options.adventure, options.playerAction);
    return Promise.resolve({ turn });
  }
}
