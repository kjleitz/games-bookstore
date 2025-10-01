import { StoryPromptOption } from "../../domain/types/StoryPromptOption";

export interface PromptRepository {
  listPrompts(): Promise<StoryPromptOption[]>;
}
