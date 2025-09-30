import { ActionComposer } from "./components/ActionComposer";
import { AdventureList } from "./components/AdventureList";
import { AppFooter } from "./components/AppFooter";
import { AppHeader } from "./components/AppHeader";
import { AppearancePanel } from "./components/AppearancePanel";
import { ContactsPanel } from "./components/ContactsPanel";
import { DamagePanel } from "./components/DamagePanel";
import { InventoryPanel } from "./components/InventoryPanel";
import { JournalPanel } from "./components/JournalPanel";
import { MapPanel } from "./components/MapPanel";
import { NewAdventurePanel } from "./components/NewAdventurePanel";
import { StoryPane } from "./components/StoryPane";

export function App(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-canvas p-chrome text-textPrimary">
      <AppHeader />
      <main className="grid flex-1 grid-cols-[280px_minmax(0,1fr)_320px] gap-4">
        <div className="flex flex-col gap-4 overflow-hidden">
          <NewAdventurePanel />
          <AdventureList />
        </div>
        <div className="flex flex-col overflow-hidden">
          <StoryPane />
          <ActionComposer />
        </div>
        <div className="grid grid-rows-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4 overflow-hidden">
          <DamagePanel />
          <InventoryPanel />
          <JournalPanel />
        </div>
      </main>
      <section className="grid gap-4 md:grid-cols-3">
        <MapPanel />
        <ContactsPanel />
        <AppearancePanel />
      </section>
      <AppFooter />
    </div>
  );
}
