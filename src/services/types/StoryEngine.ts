import { GenerateTurnOptions } from "./GenerateTurnOptions";
import { GenerateTurnResult } from "./GenerateTurnResult";

export interface StoryEngine {
  generateTurn(options: GenerateTurnOptions): Promise<GenerateTurnResult>;
}
