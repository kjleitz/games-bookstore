import { createContext } from "react";

import type { GameSettings } from "../types/settings";

export interface SettingsContextValue {
  settings: GameSettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (nextSettings: GameSettings) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
