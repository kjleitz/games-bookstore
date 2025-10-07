import { createContext } from "react";

import type { AdventureState } from "../../domain/types/AdventureState";
import type { AdventureSummary } from "../../domain/types/AdventureSummary";
import type { StartAdventureInput } from "../../services/GameService";

export interface GameContextValue {
  adventures: AdventureSummary[];
  activeAdventure: AdventureState | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  refreshAdventures: () => Promise<void>;
  selectAdventure: (adventureId: string) => Promise<boolean>;
  startAdventure: (input: StartAdventureInput) => Promise<boolean>;
  submitPlayerAction: (playerAction: string) => Promise<void>;
  deleteAdventure: (adventureId: string) => Promise<void>;
}

export const GameContext = createContext<GameContextValue | undefined>(undefined);
