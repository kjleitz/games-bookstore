import type { JSX } from "react";

import { ThemeToggle } from "./ThemeToggle";

export function AppHeader(): JSX.Element {
  return (
    <header className="panel-shell flex items-center justify-between border-l-4 border-accent">
      <div>
        <p className="uppercase tracking-[0.2em] text-accent">Games Bookstore</p>
        <h1 className="font-medium text-textPrimary">Interactive Fiction CLI</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
