import type { JSX } from "react";
import { useState } from "react";

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
import type { PanelControls } from "./components/PanelCard";
import { StoryPane } from "./components/StoryPane";
import { VitalsPanel } from "./components/VitalsPanel";

type PanelId = "vitals" | "appearance" | "inventory" | "journal" | "contacts" | "map";

type PanelColumnId = "left" | "right";

type CollapsedState = Partial<Record<PanelId, boolean>>;

type CenterPanelId = "newAdventure" | "adventureList";

interface PanelDefinition {
  render: (controls: PanelControls) => JSX.Element;
  wrapperClassName?: string;
}

const leftColumnPanels: PanelId[] = ["vitals", "appearance", "inventory"];

const rightColumnPanels: PanelId[] = ["journal", "contacts", "map"];

const panelColumnMap: Record<PanelId, PanelColumnId> = {
  vitals: "left",
  appearance: "left",
  inventory: "left",
  journal: "right",
  contacts: "right",
  map: "right",
};

const panelDefinitions: Record<PanelId, PanelDefinition> = {
  vitals: {
    render: (controls) => <VitalsPanel controls={controls} />,
  },
  appearance: {
    render: (controls) => <AppearancePanel controls={controls} />,
  },
  inventory: {
    render: (controls) => <InventoryPanel controls={controls} />,
  },
  journal: {
    render: (controls) => <JournalPanel controls={controls} />,
    wrapperClassName: "md:self-end md:w-full md:max-w-[44ch]",
  },
  contacts: {
    render: (controls) => <ContactsPanel controls={controls} />,
    wrapperClassName: "md:self-end md:w-full md:max-w-[44ch]",
  },
  map: {
    render: (controls) => <MapPanel controls={controls} />,
    wrapperClassName: "mt-auto md:self-stretch md:w-full md:max-w-none",
  },
};

const centerPanels: CenterPanelId[] = ["newAdventure", "adventureList"];

interface ExpandedState {
  left: PanelId | null;
  right: PanelId | null;
  center: CenterPanelId | null;
}

export function App(): JSX.Element {
  const [collapsedPanels, setCollapsedPanels] = useState<CollapsedState>({});
  const [collapsedCenterPanels, setCollapsedCenterPanels] = useState<
    Record<CenterPanelId, boolean>
  >({
    newAdventure: true,
    adventureList: true,
  });
  const [expandedPanels, setExpandedPanels] = useState<ExpandedState>({
    left: null,
    right: null,
    center: null,
  });

  const createControls = (panelId: PanelId): PanelControls => {
    const columnId = panelColumnMap[panelId];
    const isCollapsed = collapsedPanels[panelId] === true;
    const isExpanded = expandedPanels[columnId] === panelId;
    return {
      isCollapsed,
      isExpanded,
      onToggleCollapse: (): void => {
        setCollapsedPanels((previous) => {
          const next: CollapsedState = { ...previous };
          if (next[panelId] === true) {
            delete next[panelId];
          } else {
            next[panelId] = true;
          }
          return next;
        });
        setExpandedPanels((previous) => {
          if (previous[columnId] === panelId) {
            return { ...previous, [columnId]: null };
          }
          return previous;
        });
      },
      onToggleExpand: (): void => {
        setExpandedPanels((previous) => {
          const isCurrentlyExpanded = previous[columnId] === panelId;
          return { ...previous, [columnId]: isCurrentlyExpanded ? null : panelId };
        });
        setCollapsedPanels((previous) => {
          if (previous[panelId] !== true) {
            return previous;
          }
          const next: CollapsedState = { ...previous };
          delete next[panelId];
          return next;
        });
      },
    };
  };

  const createCenterControls = (panelId: CenterPanelId): PanelControls => {
    const isCollapsed = collapsedCenterPanels[panelId] === true;
    const isExpanded = expandedPanels.center === panelId;
    return {
      isCollapsed,
      isExpanded,
      onToggleCollapse: (): void => {
        setCollapsedCenterPanels((previous) => ({ ...previous, [panelId]: !previous[panelId] }));
        setExpandedPanels((previous) => {
          if (previous.center === panelId) {
            return { ...previous, center: null };
          }
          return previous;
        });
      },
      onToggleExpand: (): void => {
        setExpandedPanels((previous) => ({
          ...previous,
          center: previous.center === panelId ? null : panelId,
        }));
        setCollapsedCenterPanels((previous) => ({ ...previous, [panelId]: false }));
      },
    };
  };

  const renderColumnPanels = (columnPanels: PanelId[], columnId: PanelColumnId): JSX.Element[] => {
    const renderedPanels: JSX.Element[] = [];
    const expandedPanelId = expandedPanels[columnId];
    for (const panelId of columnPanels) {
      const controls = createControls(panelId);
      if (expandedPanelId != null && expandedPanelId !== panelId) {
        continue;
      }
      const definition = panelDefinitions[panelId];
      const baseClassName = definition.wrapperClassName ?? "";
      const wrapperClasses = ["flex", "flex-col"];
      if (controls.isExpanded) {
        wrapperClasses.push("flex-1", "basis-0", "min-h-0");
      } else if (controls.isCollapsed) {
        wrapperClasses.push("flex-none");
      } else {
        wrapperClasses.push("flex-1", "basis-0", "min-h-0");
      }
      if (baseClassName.length > 0) {
        wrapperClasses.push(baseClassName);
      }
      const wrapperClassName = wrapperClasses.join(" ");
      renderedPanels.push(
        <div key={panelId} className={wrapperClassName}>
          {definition.render(controls)}
        </div>,
      );
    }
    return renderedPanels;
  };

  const renderCenterPanels = (): JSX.Element[] => {
    const renderedPanels: JSX.Element[] = [];
    const expandedCenterPanel = expandedPanels.center;
    for (const panelId of centerPanels) {
      const controls = createCenterControls(panelId);
      if (expandedCenterPanel != null && expandedCenterPanel !== panelId) {
        continue;
      }
      const wrapperClasses = ["flex", "flex-col"];
      if (controls.isExpanded) {
        wrapperClasses.push("flex-1", "min-h-0");
      } else if (controls.isCollapsed) {
        wrapperClasses.push("flex-none");
      } else {
        wrapperClasses.push("flex-none", "max-h-[45vh]", "overflow-hidden");
      }
      const PanelComponent = panelId === "newAdventure" ? NewAdventurePanel : AdventureList;
      renderedPanels.push(
        <div key={panelId} className={wrapperClasses.join(" ")}>
          <PanelComponent controls={controls} />
        </div>,
      );
    }
    return renderedPanels;
  };

  return (
    <div className="flex h-screen flex-col overflow-x-hidden overflow-y-scroll bg-canvas text-textPrimary">
      <div className="flex-none">
        <AppHeader />
      </div>
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
        <main className="grid flex-1 min-h-0 grid-cols-[44ch_minmax(0,1fr)_44ch] gap-4 overflow-hidden px-4 pb-4 pt-2">
          <div className="flex min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto pr-1">
            {renderColumnPanels(leftColumnPanels, "left")}
          </div>
          <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
            {renderCenterPanels()}
            {expandedPanels.center == null && (
              <>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <StoryPane />
                </div>
                <div className="flex-none">
                  <ActionComposer />
                </div>
              </>
            )}
          </div>
          <div className="flex min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto pl-1">
            {renderColumnPanels(rightColumnPanels, "right")}
          </div>
        </main>
      </div>
      <div className="flex-none mb-[1em]">
        <AppFooter />
      </div>
    </div>
  );
}
