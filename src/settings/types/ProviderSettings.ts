import { ModelProvider } from "./ModelProvider";

export interface ProviderSettings {
  provider: ModelProvider;
  modelName: string;
  apiKey?: string;
  endpoint?: string;
  port?: number;
}
