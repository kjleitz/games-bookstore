import type { JSX, ReactNode } from "react";

import { GameProvider } from "./GameProvider";
import { SettingsProvider } from "./SettingsProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ElectronAdventureRepository } from "../../services/ElectronAdventureRepository";
import { ElectronSettingsGateway } from "../../services/ElectronSettingsGateway";
import { GameService } from "../../services/GameService";
import { InMemoryAdventureRepository } from "../../services/InMemoryAdventureRepository";
import { InMemorySettingsGateway } from "../../services/InMemorySettingsGateway";
import { MockStoryEngine } from "../../services/MockStoryEngine";
import { MockStructuredStateProjector } from "../../services/MockStructuredStateProjector";
import { SystemClock } from "../../services/SystemClock";
import { PanelControlsProvider } from "./PanelControlsProvider";

const isElectronEnvironment = typeof window !== "undefined" && window.gameStore != null;

const adventureRepository = isElectronEnvironment
  ? new ElectronAdventureRepository()
  : new InMemoryAdventureRepository();

if (!isElectronEnvironment && adventureRepository instanceof InMemoryAdventureRepository) {
  adventureRepository.createPlaceholderAdventure();
}

const storyEngine = new MockStoryEngine();
const structuredStateProjector = new MockStructuredStateProjector();
const clock = new SystemClock();
const gameService = new GameService(
  adventureRepository,
  storyEngine,
  structuredStateProjector,
  clock,
);

const settingsGateway = isElectronEnvironment
  ? new ElectronSettingsGateway()
  : new InMemorySettingsGateway();

export function AppProviders({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider>
      <SettingsProvider gateway={settingsGateway}>
        <PanelControlsProvider>
          <GameProvider service={gameService}>{children}</GameProvider>
        </PanelControlsProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
