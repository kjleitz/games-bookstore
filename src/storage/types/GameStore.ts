import { AdventureState } from "../../domain/types/AdventureState";
import { AdventureSummary } from "../../domain/types/AdventureSummary";

export interface GameStore {
  listAdventures(): Promise<AdventureSummary[]>;
  loadAdventure(adventureId: string): Promise<AdventureState | null>;
  saveAdventure(adventure: unknown): Promise<true>;
  deleteAdventure(adventureId: string): Promise<true>;
}
