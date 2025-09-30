export type ModelProvider = "openai" | "anthropic" | "ollama";

export type StructuredDataMode = "inline" | "single-pass" | "per-entity";

export interface ProviderSettings {
  provider: ModelProvider;
  modelName: string;
  apiKey?: string;
  endpoint?: string;
  port?: number;
}

export interface EngineTuning {
  temperature: number;
  maxTokens: number;
  topP: number;
}

export interface GameSettings {
  adventureDirectory: string;
  provider: ProviderSettings;
  engine: EngineTuning;
  structuredDataMode: StructuredDataMode;
}

export type ThemeName = "dark" | "light";
