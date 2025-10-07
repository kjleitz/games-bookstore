import { createContext } from "react";

export interface PanelState {
  isMinimized: boolean;
  isMaximized: boolean;
}

interface Store {
  get(id: string): PanelState;
  set(id: string, next: PanelState): void;
  update(id: string, fn: (curr: PanelState) => PanelState): void;
  subscribe(id: string, fn: () => void): () => void;
}

export function createPanelControlsStore(): Store {
  const statesMap = new Map<string, PanelState>();
  const listenersMap = new Map<string, Set<() => void>>();

  const ensure = (panelId: string): void => {
    if (!statesMap.has(panelId)) {
      statesMap.set(panelId, { isMinimized: false, isMaximized: false });
    }

    if (!listenersMap.has(panelId)) {
      listenersMap.set(panelId, new Set());
    }
  };

  const get: Store["get"] = (panelId) => {
    ensure(panelId);
    return statesMap.get(panelId)!;
  };

  const notify = (panelId: string): void => {
    const listeners = listenersMap.get(panelId);
    if (listeners == null) return;

    listeners.forEach((fn) => fn());
  };

  const set: Store["set"] = (panelId, next) => {
    ensure(panelId);
    statesMap.set(panelId, {
      isMinimized: next.isMaximized ? false : next.isMinimized,
      isMaximized: next.isMinimized ? false : next.isMaximized,
    });
    notify(panelId);
  };

  const update: Store["update"] = (panelId, fn) => {
    set(panelId, fn(get(panelId)));
  };

  const subscribe: Store["subscribe"] = (panelId, fn) => {
    ensure(panelId);
    const listeners = listenersMap.get(panelId);
    listeners?.add(fn);
    return () => listeners?.delete(fn);
  };

  return { get, set, update, subscribe };
}

export const PanelControlsContext = createContext<Store | null>(null);
