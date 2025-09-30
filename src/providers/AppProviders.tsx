import type { ReactNode } from "react";

import { GameProvider } from "../context/GameProvider";
import { SettingsProvider } from "../context/SettingsProvider";
import { ThemeProvider } from "../context/ThemeProvider";
import { ElectronAdventureRepository } from "../services/electronAdventureRepository";
import { ElectronSettingsGateway } from "../services/electronSettingsGateway";
import { GameService } from "../services/gameService";
import { InMemoryAdventureRepository } from "../services/inMemoryAdventureRepository";
import { InMemorySettingsGateway } from "../services/inMemorySettingsGateway";
import { MockStoryEngine } from "../services/mockStoryEngine";
import { SystemClock } from "../services/systemClock";

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

const settingsGateway = isElectronEnvironment ? new ElectronSettingsGateway() : new InMemorySettingsGateway();

export function AppProviders({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider>
      <SettingsProvider gateway={settingsGateway}>
        <GameProvider service={gameService}>{children}</GameProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
