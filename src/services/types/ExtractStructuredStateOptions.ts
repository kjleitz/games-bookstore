import { AdventureState } from "../../domain/types/AdventureState";
import { StoryTurn } from "../../domain/types/StoryTurn";

export interface ExtractStructuredStateOptions {
  adventure: AdventureState;
  mostRecentTurn: StoryTurn;
}
