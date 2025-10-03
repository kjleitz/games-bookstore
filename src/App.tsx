import type { JSX } from "react";

import { ActionComposer } from "./components/ActionComposer";
import { AdventureList } from "./components/AdventureList";
import { AppearancePanel } from "./components/AppearancePanel";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";
import { ContactsPanel } from "./components/ContactsPanel";
import { DamagePanel } from "./components/DamagePanel";
import { InventoryPanel } from "./components/InventoryPanel";
import { JournalPanel } from "./components/JournalPanel";
import { MapPanel } from "./components/MapPanel";
import { NewAdventurePanel } from "./components/NewAdventurePanel";
import { StoryPane } from "./components/StoryPane";

export function App(): JSX.Element {
  return (
    <div className="flex h-screen flex-col overflow-x-hidden overflow-y-scroll bg-canvas text-textPrimary">
      <div className="flex-none">
        <AppHeader />
      </div>
      <div className="flex flex-1 min-h-0 flex-col overflow-x-hidden overflow-y-scroll">
        <main className="grid flex-1 min-h-0 grid-cols-[48ch_minmax(0,1fr)_48ch] overflow-x-hidden overflow-y-scroll">
          <div className="flex h-full min-h-0 flex-col overflow-x-hidden overflow-y-scroll">
            <div className="flex-none">
              <NewAdventurePanel />
            </div>
            <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-scroll">
              <AdventureList />
            </div>
          </div>
          <div className="flex h-full min-h-0 flex-col overflow-x-hidden overflow-y-scroll">
            <div className="flex-1 min-h-0 overflow-x-hidden overflow-y-scroll">
              <StoryPane />
            </div>
            <div className="flex-none">
              <ActionComposer />
            </div>
          </div>
          <div className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] overflow-x-hidden overflow-y-scroll">
            <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
              <DamagePanel />
            </div>
            <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
              <InventoryPanel />
            </div>
            <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
              <JournalPanel />
            </div>
          </div>
        </main>
        <section className="grid flex-1 min-h-0 overflow-x-hidden overflow-y-scroll md:grid-cols-3">
          <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
            <MapPanel />
          </div>
          <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
            <ContactsPanel />
          </div>
          <div className="min-h-0 overflow-x-hidden overflow-y-scroll">
            <AppearancePanel />
          </div>
        </section>
      </div>
      <div className="flex-none">
        <AppFooter />
      </div>
    </div>
  );
}
