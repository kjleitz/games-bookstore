import type { JSX } from "react";

import { ThemeToggle } from "./ThemeToggle";

export function AppHeader(): JSX.Element {
  return (
    <header className="panel-shell flex items-start justify-between border-l-4 border-accent">
      <div>
        <p className="uppercase text-accent">Games Bookstore</p>
        <h1 className="font-medium text-textPrimary">Adventure Interface</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
