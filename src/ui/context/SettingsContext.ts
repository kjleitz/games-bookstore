import { createContext } from "react";

import type { GameSettings } from "../../settings/types/GameSettings";

export interface SettingsContextValue {
  settings: GameSettings | null;
  isLoading: boolean;
  error: string | null;
  updateSettings: (nextSettings: GameSettings) => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);
