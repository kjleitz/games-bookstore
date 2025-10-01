import { AdventureState } from "../../domain/types/AdventureState";
import { AdventureSummary } from "../../domain/types/AdventureSummary";

export interface AdventureRepository {
  listAdventures(): Promise<AdventureSummary[]>;
  loadAdventure(adventureId: string): Promise<AdventureState | null>;
  saveAdventure(adventure: AdventureState): Promise<void>;
  deleteAdventure(adventureId: string): Promise<void>;
}
