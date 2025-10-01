import type { StoryPromptOption } from "../domain/types/StoryPromptOption";
import type { PromptRepository } from "./types/PromptRepository";

const PROMPTS: StoryPromptOption[] = [
  {
    id: "orbital-library",
    title: "Orbital Library of Forgotten Games",
    synopsis:
      "You are the new steward of an orbital archive where stories manifest as living simulations.",
    seedPrompt:
      "You awaken inside the Orbital Library of Forgotten Games. The AI archivist requests your help cataloguing interactive narratives on the brink of collapse.",
  },
  {
    id: "subterranean-court",
    title: "Subterranean Court of Echoes",
    synopsis: "Descend beneath a ruined city to broker peace between rival echo dynasties.",
    seedPrompt:
      "Deep below the city, the Court of Echoes hums with discordant voices. As an impartial envoy, you must rebuild trust while piecing together why the echoes are fading.",
  },
  {
    id: "clockwork-market",
    title: "Clockwork Midnight Market",
    synopsis: "Navigate a shifting bazaar where every trade edits the past.",
    seedPrompt:
      "The Clockwork Midnight Market only appears for those in need. Each stall offers tools to rewrite history, but the cost is always personal.",
  },
];

export class StaticPromptRepository implements PromptRepository {
  listPrompts(): Promise<StoryPromptOption[]> {
    return Promise.resolve(PROMPTS);
  }
}
