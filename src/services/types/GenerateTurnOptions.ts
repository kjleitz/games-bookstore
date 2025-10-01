import { AdventureState } from "../../domain/types/AdventureState";

export interface GenerateTurnOptions {
  adventure: AdventureState;
  playerAction: string;
}
