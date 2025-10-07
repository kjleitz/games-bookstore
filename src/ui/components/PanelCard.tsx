import type { JSX, ReactNode } from "react";
import { usePanelControls } from "../hooks/usePanelControls";
import { PanelId } from "../types/panels";

export interface PanelControls {
  isMinimized: boolean;
  isMaximized: boolean;
  onToggleMinimize: () => void;
  onToggleMaximize: () => void;
}

interface PanelCardProps {
  panelId: PanelId;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  scrollable?: boolean;
  subheader?: ReactNode;
  showControls?: boolean;
}

export function PanelCard({
  panelId,
  title,
  children,
  footer,
  className,
  scrollable = true,
  subheader,
  showControls = true,
}: PanelCardProps): JSX.Element {
  const controls = usePanelControls(panelId);

  const minimizeLabel = controls.isMinimized ? "Restore height" : "Minimize panel";
  const maximizeLabel = controls.isMaximized ? "Restore height" : "Maximize panel";
  const minimizeIcon = controls.isMinimized ? "[+]" : "[-]";
  const maximizeIcon = controls.isMaximized ? "[.]" : "[:]";
  const scrollablePanelBodyInnerClassName = scrollable ? "panel-body-scrollable-inner" : "";

  const panelShellStateClassName = controls.isMinimized
    ? "panel-shell-minimized"
    : controls.isMaximized
      ? "panel-shell-maximized"
      : "panel-shell-restored";

  const panelBodyStateClassName = controls.isMinimized
    ? "panel-body-minimized"
    : controls.isMaximized
      ? "panel-body-maximized"
      : "panel-body-restored";

  // const wrapperClasses = ["flex", "flex-col"];

  // if (controls.isMaximized) {
  //   wrapperClasses.push("flex-1", "basis-0", "min-h-0");
  // } else if (controls.isMinimized) {
  //   wrapperClasses.push("flex-none");
  // } else {
  //   wrapperClasses.push("flex-1", "basis-0", "min-h-0");
  // }

  // const wrapperClassName = wrapperClasses.join(" ");

  return (
    <section
      className={`panel-shell flex flex-col min-h-0 overflow-hidden ${className ?? ""} ${panelShellStateClassName}`}
    >
      <div className="panel-shell-inner">
        <header className="panel-section-header">
          <span>[ {title} ]</span>
          {subheader}
          {showControls && (
            <div className="flex items-start">
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => controls.toggleMinimize()}
                  title={minimizeLabel}
                  aria-label={minimizeLabel}
                  className="terminal-button uppercase"
                >
                  <span aria-hidden="true">{minimizeIcon}</span>
                </button>
                <button
                  type="button"
                  onClick={() => controls.toggleMaximize()}
                  title={maximizeLabel}
                  aria-label={maximizeLabel}
                  className="terminal-button uppercase"
                >
                  <span aria-hidden="true">{maximizeIcon}</span>
                </button>
              </div>
            </div>
          )}
        </header>
        <div className={`panel-body ${panelBodyStateClassName}`}>
          <div className={`panel-body-inner ${scrollablePanelBodyInnerClassName}`}>{children}</div>
        </div>
      </div>
    </section>
  );
}

// const panelDefinitions: Record<PanelId, PanelDefinition> = {
//   vitals: {
//     render: (controls) => <VitalsPanel controls={controls} />,
//   },
//   appearance: {
//     render: (controls) => <AppearancePanel controls={controls} />,
//   },
//   inventory: {
//     render: (controls) => <InventoryPanel controls={controls} />,
//   },
//   journal: {
//     render: (controls) => <JournalPanel controls={controls} />,
//     wrapperClassName: "md:self-end md:w-full md:max-w-[44ch]",
//   },
//   contacts: {
//     render: (controls) => <ContactsPanel controls={controls} />,
//     wrapperClassName: "md:self-end md:w-full md:max-w-[44ch]",
//   },
//   map: {
//     render: (controls) => <MapPanel controls={controls} />,
//     wrapperClassName: "mt-auto md:self-stretch md:w-full md:max-w-none",
//   },
// };

// const renderColumnPanels = (columnPanels: PanelId[], columnId: PanelColumnId): JSX.Element[] => {
//   const renderedPanels: JSX.Element[] = [];
//   const expandedPanelId = maximizedPanels[columnId];

//   for (const panelId of columnPanels) {
//     const controls = createControls(panelId);

//     if (expandedPanelId != null && expandedPanelId !== panelId) {
//       continue;
//     }

//     const definition = panelDefinitions[panelId];
//     const baseClassName = definition.wrapperClassName ?? "";
//     const wrapperClasses = ["flex", "flex-col"];

//     if (controls.isMaximized) {
//       wrapperClasses.push("flex-1", "basis-0", "min-h-0");
//     } else if (controls.isMinimized) {
//       wrapperClasses.push("flex-none");
//     } else {
//       wrapperClasses.push("flex-1", "basis-0", "min-h-0");
//     }

//     if (baseClassName.length > 0) {
//       wrapperClasses.push(baseClassName);
//     }

//     const wrapperClassName = wrapperClasses.join(" ");
//     renderedPanels.push(
//       <div key={panelId} className={wrapperClassName}>
//         {definition.render(controls)}
//       </div>,
//     );
//   }

//   return renderedPanels;
// };

// const renderCenterPanels = (): JSX.Element[] => {
//   const renderedPanels: JSX.Element[] = [];
//   const expandedCenterPanel = maximizedPanels.center;

//   for (const panelId of centerPanels) {
//     const controls = createCenterControls(panelId);

//     if (expandedCenterPanel != null && expandedCenterPanel !== panelId) {
//       continue;
//     }

//     const wrapperClasses = ["flex", "flex-col"];

//     if (controls.isMaximized) {
//       wrapperClasses.push("flex-1", "min-h-0");
//     } else if (controls.isMinimized) {
//       wrapperClasses.push("flex-none", "max-h-[45vh]", "overflow-hidden");
//     } else {
//       wrapperClasses.push("flex-1", "min-h-0", "max-h-[45vh]", "overflow-hidden");
//     }

//     if (panelId === "newAdventure") {
//       renderedPanels.push(
//         <div key={panelId} className={wrapperClasses.join(" ")}>
//           <NewAdventurePanel
//             controls={controls}
//             onAdventureStarted={collapseAfterStartingAdventure}
//           />
//         </div>,
//       );
//     } else {
//       renderedPanels.push(
//         <div key={panelId} className={wrapperClasses.join(" ")}>
//           <AdventureList controls={controls} onAdventureSelected={collapseNewAdventureOnly} />
//         </div>,
//       );
//     }
//   }
