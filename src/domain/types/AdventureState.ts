import { AdventureMetadata } from "./AdventureMetadata";
import { StoryTurn } from "./StoryTurn";
import { StructuredState } from "./StructuredState";

export interface AdventureState {
  metadata: AdventureMetadata;
  turns: StoryTurn[];
  structured: StructuredState;
}
