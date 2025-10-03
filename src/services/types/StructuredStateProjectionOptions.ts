import { AdventureState } from "../../domain/types/AdventureState";
import { StoryTurn } from "../../domain/types/StoryTurn";

export interface StructuredStateProjectionOptions {
  adventure: AdventureState;
  mostRecentTurn: StoryTurn;
}
