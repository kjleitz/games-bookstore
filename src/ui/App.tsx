import type { JSX } from "react";
import { useCallback } from "react";

import { ActionComposer } from "./components/ActionComposer";
import { AdventureList } from "./components/AdventureList";
import { AppearancePanel } from "./components/AppearancePanel";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";
import { ContactsPanel } from "./components/ContactsPanel";
import { InventoryPanel } from "./components/InventoryPanel";
import { JournalPanel } from "./components/JournalPanel";
import { MapPanel } from "./components/MapPanel";
import { NewAdventurePanel } from "./components/NewAdventurePanel";
import { StoryPane } from "./components/StoryPane";
import { VitalsPanel } from "./components/VitalsPanel";
// import { useGameContext } from "./hooks/useGameContext";
import { usePanelControls } from "./hooks/usePanelControls";

export function App(): JSX.Element {
  // const { activeAdventure } = useGameContext();

  const newAdventurePanelControls = usePanelControls("newAdventure");

  const adventureListPanelControls = usePanelControls("adventureList");

  const collapseAfterStartingAdventure = useCallback((): void => {
    newAdventurePanelControls.minimize();
    adventureListPanelControls.minimize();
  }, []);

  const collapseNewAdventureOnly = useCallback((): void => {
    newAdventurePanelControls.minimize();
  }, []);

  return (
    <div className="app-root h-screen flex flex-col">
      <div className="app-header-container flex-none">
        <AppHeader />
      </div>
      <div className="app-main-container flex-1 min-h-0 overflow-hidden">
        <main className="app-main grid grid-cols-[44ch_minmax(0,1fr)_44ch] min-h-0 overflow-hidden">
          <div className="app-left-column-container flex flex-col min-h-0 overflow-hidden">
            <VitalsPanel />
            <AppearancePanel />
            <InventoryPanel />
          </div>
          <div className="app-center-column-container flex flex-col min-h-0 overflow-hidden max-h-[100vh]">
            <NewAdventurePanel
              onAdventureStarted={collapseAfterStartingAdventure}
              className="flex-none"
            />
            <AdventureList onAdventureSelected={collapseNewAdventureOnly} />
            <StoryPane />
            {/* <div className="min-h-0 overflow-hidden">
              <StoryPane />
            </div>
            <div className="flex-none">
              <ActionComposer />
            </div> */}
          </div>
          <div className="app-right-column-container flex flex-col min-h-0 overflow-hidden">
            <JournalPanel />
            <ContactsPanel />
            <MapPanel />
          </div>
        </main>
      </div>
      <div className="app-footer-container flex-none">
        <AppFooter />
      </div>
    </div>
  );
}
