import type { JSX, ReactNode } from "react";

import { GameProvider } from "../context/GameProvider";
import { SettingsProvider } from "../context/SettingsProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { ElectronAdventureRepository } from "../services/ElectronAdventureRepository";
import { ElectronSettingsGateway } from "../services/ElectronSettingsGateway";
import { GameService } from "../services/GameService";
import { InMemoryAdventureRepository } from "../services/InMemoryAdventureRepository";
import { InMemorySettingsGateway } from "../services/InMemorySettingsGateway";
import { MockStoryEngine } from "../services/MockStoryEngine";
import { SystemClock } from "../services/SystemClock";

const isElectronEnvironment = typeof window !== "undefined" && window.gameStore != null;

const adventureRepository = isElectronEnvironment
  ? new ElectronAdventureRepository()
  : new InMemoryAdventureRepository();

if (!isElectronEnvironment && adventureRepository instanceof InMemoryAdventureRepository) {
  adventureRepository.createPlaceholderAdventure();
}

const storyEngine = new MockStoryEngine();
const clock = new SystemClock();
const gameService = new GameService(adventureRepository, storyEngine, clock);

const settingsGateway = isElectronEnvironment
  ? new ElectronSettingsGateway()
  : new InMemorySettingsGateway();

export function AppProviders({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider>
      <SettingsProvider gateway={settingsGateway}>
        <GameProvider service={gameService}>{children}</GameProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
