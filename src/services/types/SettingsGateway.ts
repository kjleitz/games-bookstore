import { GameSettings } from "../../settings/types/GameSettings";

export interface SettingsGateway {
  loadSettings(): Promise<GameSettings | null>;
  saveSettings(settings: GameSettings): Promise<void>;
}
