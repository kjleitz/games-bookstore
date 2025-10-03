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

export function PanelCard({ title, children, footer, className, controls }: PanelCardProps): JSX.Element {
  const sectionClassName = className != null && className.length > 0
    ? `panel-shell flex flex-col ${className}`
    : "panel-shell flex flex-col";
  const collapseLabel = controls.isCollapsed ? "Show panel" : "Collapse panel";
  const expandLabel = controls.isExpanded ? "Restore height" : "Expand panel";
  const bodyClassName = controls.isCollapsed
    ? "hidden"
    : "min-h-0 flex-1 overflow-y-auto text-textSecondary";

  return (
    <section className={sectionClassName}>
      <header className="panel-section-header">
        <span>[ {title} ]</span>
        <div className="flex items-center gap-2">
          {footer}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => controls.onToggleCollapse()}
              title={collapseLabel}
              aria-label={collapseLabel}
              className="terminal-button px-2 py-1 text-xs uppercase tracking-[0.2em]"
            >
              <span aria-hidden="true">{controls.isCollapsed ? "Show" : "Hide"}</span>
            </button>
            <button
              type="button"
              onClick={() => controls.onToggleExpand()}
              title={expandLabel}
              aria-label={expandLabel}
              className="terminal-button px-2 py-1 text-xs uppercase tracking-[0.2em]"
            >
              <span aria-hidden="true">{controls.isExpanded ? "Norm" : "Full"}</span>
            </button>
          </div>
        </div>
      </header>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
