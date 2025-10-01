import type { GameSettings } from "../settings/types/GameSettings";
import { SettingsStore } from "../storage/types/SettingsStore";
import type { SettingsGateway } from "./types/SettingsGateway";

function requireSettingsStore(): SettingsStore {
  const { settingsStore } = window ?? {};

  if (settingsStore == null) {
    throw new Error("settingsStore API is not available in this environment");
  }

  return settingsStore;
}

export class ElectronSettingsGateway implements SettingsGateway {
  async loadSettings(): Promise<GameSettings | null> {
    const store = requireSettingsStore();
    return await store.loadSettings();
  }

  async saveSettings(settings: GameSettings): Promise<void> {
    const store = requireSettingsStore();
    await store.saveSettings(settings);
  }
}
