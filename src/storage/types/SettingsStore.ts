import { GameSettings } from "../../settings/types/GameSettings";

export interface SettingsStore {
  loadSettings(): Promise<GameSettings | null>;
  saveSettings(settings: unknown): Promise<true>;
}
