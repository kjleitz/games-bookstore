/// <reference types="vite-plugin-electron/electron-env" />

import type { AdventureState, AdventureSummary } from "../src/types/game";
import type { GameSettings } from "../src/types/settings";

declare namespace NodeJS {
  interface ProcessEnv {
    APP_ROOT: string;
    VITE_PUBLIC: string;
  }
}

declare global {
  interface Window {
    ipcRenderer: import("electron").IpcRenderer;
    gameStore: {
      listAdventures: () => Promise<AdventureSummary[]>;
      loadAdventure: (adventureId: string) => Promise<AdventureState | null>;
      saveAdventure: (adventure: AdventureState) => Promise<boolean>;
      deleteAdventure: (adventureId: string) => Promise<boolean>;
    };
    settingsStore: {
      loadSettings: () => Promise<GameSettings | null>;
      saveSettings: (settings: GameSettings) => Promise<boolean>;
    };
  }
}

export {};
