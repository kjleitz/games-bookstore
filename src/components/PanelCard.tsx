import type { JSX, ReactNode } from "react";

export interface PanelControls {
  isCollapsed: boolean;
  isExpanded: boolean;
  onToggleCollapse: () => void;
  onToggleExpand: () => void;
}

interface PanelCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  controls: PanelControls;
}

export function PanelCard({
  title,
  children,
  footer,
  className,
  controls,
}: PanelCardProps): JSX.Element {
  const sectionClassName =
    className != null && className.length > 0
      ? `panel-shell flex flex-col ${className}`
      : "panel-shell flex flex-col";
  const collapseLabel = controls.isCollapsed ? "Show panel" : "Collapse panel";
  const expandLabel = controls.isExpanded ? "Restore height" : "Expand panel";
  const panelBodyState = controls.isCollapsed ? "collapsed" : "expanded";
  const panelBodyClassName = controls.isExpanded
    ? "panel-body panel-body-expanded"
    : "panel-body";

  return (
    <section className={sectionClassName}>
      <header className="panel-section-header">
        <span>[ {title} ]</span>
        <div className="flex items-start">
          {footer}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => controls.onToggleCollapse()}
              title={collapseLabel}
              aria-label={collapseLabel}
              className="terminal-button uppercase"
            >
              <span aria-hidden="true">{controls.isCollapsed ? "[+]" : "[-]"}</span>
            </button>
            <button
              type="button"
              onClick={() => controls.onToggleExpand()}
              title={expandLabel}
              aria-label={expandLabel}
              className="terminal-button uppercase"
            >
              <span aria-hidden="true">{controls.isExpanded ? "[.]" : "[:]"}</span>
            </button>
          </div>
        </div>
      </header>
      <div className={panelBodyClassName} data-state={panelBodyState}>
        <div className="panel-body-scroll text-textSecondary">{children}</div>
      </div>
    </section>
  );
}
