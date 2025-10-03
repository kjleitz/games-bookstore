import { StructuredStateProjectionOptions } from "./StructuredStateProjectionOptions";
import { StructuredStateProjectionResult } from "./StructuredStateProjectionResult";

export interface StructuredStateProjector {
  project(options: StructuredStateProjectionOptions): Promise<StructuredStateProjectionResult>;
}
