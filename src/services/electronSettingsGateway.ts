import type { GameSettings } from "../types/settings";
import type { SettingsGateway } from "../types/services";

function requireSettingsStore(): typeof window.settingsStore {
  if (typeof window === "undefined" || window.settingsStore == null) {
    throw new Error("settingsStore API is not available in this environment");
  }
  return window.settingsStore;
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
