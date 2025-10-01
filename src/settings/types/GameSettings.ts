import { EngineTuning } from "./EngineTuning";
import { ProviderSettings } from "./ProviderSettings";
import { StructuredDataMode } from "./StructuredDataMode";

export interface GameSettings {
  adventureDirectory: string;
  provider: ProviderSettings;
  engine: EngineTuning;
  structuredDataMode: StructuredDataMode;
}
