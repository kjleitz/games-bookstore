import { type GameStore } from "./storage/types/GameStore";
import { type SettingsStore } from "./storage/types/SettingsStore";

declare global {
  interface Window {
    gameStore?: GameStore;
    settingsStore?: SettingsStore;
  }
}
