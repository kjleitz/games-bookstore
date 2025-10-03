import { createStructuredState } from "../domain/adventureFactory";
import type { AdventureState } from "../domain/types/AdventureState";
import type { JournalEntry } from "../domain/types/JournalEntry";
import type { StructuredState } from "../domain/types/StructuredState";
import type { StoryTurn } from "../domain/types/StoryTurn";
import type { StructuredStateProjector } from "./types/StructuredStateProjector";
import type { StructuredStateProjectionOptions } from "./types/StructuredStateProjectionOptions";
import type { StructuredStateProjectionResult } from "./types/StructuredStateProjectionResult";

function cloneStructuredState(adventure: AdventureState): StructuredState {
  if (adventure.structured == null) {
    return createStructuredState();
  }

  return structuredClone<StructuredState>(adventure.structured);
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

export class MockStructuredStateProjector implements StructuredStateProjector {
  project(options: StructuredStateProjectionOptions): Promise<StructuredStateProjectionResult> {
    const structuredState = cloneStructuredState(options.adventure);
    const journalEntry = createJournalEntry(options.mostRecentTurn);
    if (journalEntry != null) {
      structuredState.journal = [journalEntry, ...structuredState.journal];
    }

    structuredState.damage = {
      ...structuredState.damage,
      currentHealth: Math.max(1, structuredState.damage.currentHealth - 1),
    };

    return Promise.resolve({ structured: structuredState });
  }
}
