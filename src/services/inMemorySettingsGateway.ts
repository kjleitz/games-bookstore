import type { GameSettings } from "../types/settings";
import type { SettingsGateway } from "../types/services";

const DEFAULT_SETTINGS: GameSettings = {
  adventureDirectory: "adventures",
  provider: {
    provider: "openai",
    modelName: "gpt-4o-mini",
  },
  engine: {
    temperature: 0.8,
    maxTokens: 512,
    topP: 0.9,
  },
  structuredDataMode: "single-pass",
};

export class InMemorySettingsGateway implements SettingsGateway {
  private current: GameSettings | null = structuredClone(DEFAULT_SETTINGS);

  loadSettings(): Promise<GameSettings | null> {
    return Promise.resolve(this.current != null ? structuredClone(this.current) : null);
  }

  saveSettings(settings: GameSettings): Promise<void> {
    this.current = structuredClone(settings);
    return Promise.resolve();
  }
}
