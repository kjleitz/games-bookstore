import { createStructuredState } from "../domain/adventureFactory";
import type { AdventureState } from "../domain/types/AdventureState";
import type { JournalEntry } from "../domain/types/JournalEntry";
import type { StoryTurn } from "../domain/types/StoryTurn";
import type { ExtractStructuredStateOptions } from "./types/ExtractStructuredStateOptions";
import type { ExtractStructuredStateResult } from "./types/ExtractStructuredStateResult";
import type { GenerateTurnOptions } from "./types/GenerateTurnOptions";
import type { GenerateTurnResult } from "./types/GenerateTurnResult";
import type { LlmStoryEngine } from "./types/LlmStoryEngine";

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

function createJournalEntry(turn: StoryTurn): JournalEntry | null {
  if (turn.playerAction.trim().length === 0) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    createdAt: turn.createdAt,
    title: `Action ${turn.playerAction}`,
    notes: `The engine recorded the player's intent: ${turn.playerAction}.`,
  };
}

export class MockStoryEngine implements LlmStoryEngine {
  generateTurn(options: GenerateTurnOptions): Promise<GenerateTurnResult> {
    const turn = createStoryTurn(options.adventure, options.playerAction);
    return Promise.resolve({ turn });
  }

  extractStructuredState(
    options: ExtractStructuredStateOptions,
  ): Promise<ExtractStructuredStateResult> {
    const clonedAdventure: AdventureState = structuredClone(options.adventure);
    if (clonedAdventure.structured == null) {
      clonedAdventure.structured = createStructuredState();
    }

    const newEntry = createJournalEntry(options.mostRecentTurn);
    if (newEntry != null) {
      clonedAdventure.structured.journal = [newEntry, ...clonedAdventure.structured.journal];
    }

    clonedAdventure.structured.damage = {
      ...clonedAdventure.structured.damage,
      currentHealth: Math.max(1, clonedAdventure.structured.damage.currentHealth - 1),
    };

    return Promise.resolve({ adventure: clonedAdventure });
  }
}
