import type { JSX, ReactNode } from "react";

interface PanelCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function PanelCard({ title, children, footer, className }: PanelCardProps): JSX.Element {
  const sectionClassName = className != null && className.length > 0
    ? `panel-shell flex flex-col ${className}`
    : "panel-shell flex flex-col";
  return (
    <section className={sectionClassName}>
      <header className="panel-section-header">
        <span>[ {title} ]</span>
        {footer}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto text-textSecondary">{children}</div>
    </section>
  );
}
