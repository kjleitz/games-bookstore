import type { JSX, ReactNode } from "react";

interface PanelCardProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function PanelCard({ title, children, footer }: PanelCardProps): JSX.Element {
  return (
    <section className="flex flex-col gap-3 rounded-panel border border-border/60 bg-surface/80 p-4 shadow-glow">
      <header className="flex items-center justify-between">
        <h2 className="font-display text-sm uppercase tracking-[0.3em] text-textSecondary">
          {title}
        </h2>
        {footer}
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto text-sm text-textSecondary">{children}</div>
    </section>
  );
}
