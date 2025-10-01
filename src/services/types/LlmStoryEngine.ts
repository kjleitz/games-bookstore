import { ExtractStructuredStateOptions } from "./ExtractStructuredStateOptions";
import { ExtractStructuredStateResult } from "./ExtractStructuredStateResult";
import { GenerateTurnOptions } from "./GenerateTurnOptions";
import { GenerateTurnResult } from "./GenerateTurnResult";

export interface LlmStoryEngine {
  generateTurn(options: GenerateTurnOptions): Promise<GenerateTurnResult>;
  extractStructuredState(
    options: ExtractStructuredStateOptions,
  ): Promise<ExtractStructuredStateResult>;
}
