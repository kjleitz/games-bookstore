import { useCallback, useContext, useEffect, useState } from "react";

import { PanelControlsContext, PanelState } from "../context/PanelControlsContext";
import { PanelId } from "../types/panels";

export interface PanelControls {
  isMinimized: boolean;
  isMaximized: boolean;
  maximize: () => void;
  minimize: () => void;
  restore: () => void;
  toggleMinimize: () => void;
  toggleMaximize: () => void;
}

export function usePanelControls(panelId: PanelId): PanelControls {
  const store = useContext(PanelControlsContext);

  if (store == null) {
    throw new Error("usePanelControls must be used inside a ControlsProvider");
  }

  const [panelState, setPanelState] = useState<PanelState>(() => store.get(panelId));

  useEffect(
    () => store.subscribe(panelId, () => setPanelState(store.get(panelId))),
    [panelId, store],
  );

  const maximize = useCallback(
    () => store.update(panelId, () => ({ isMinimized: false, isMaximized: true })),
    [panelId, store],
  );

  const minimize = useCallback(
    () => store.update(panelId, () => ({ isMinimized: true, isMaximized: false })),
    [panelId, store],
  );

  const restore = useCallback(
    () => store.update(panelId, () => ({ isMinimized: false, isMaximized: false })),
    [panelId, store],
  );

  const toggleMinimize = useCallback(
    () =>
      store.update(panelId, (panelState) =>
        panelState.isMinimized
          ? { isMinimized: false, isMaximized: false }
          : { isMinimized: true, isMaximized: false },
      ),
    [panelId, store],
  );

  const toggleMaximize = useCallback(
    () =>
      store.update(panelId, (panelState) =>
        panelState.isMaximized
          ? { isMinimized: false, isMaximized: false }
          : { isMinimized: false, isMaximized: true },
      ),
    [panelId, store],
  );

  return {
    isMinimized: panelState.isMinimized,
    isMaximized: panelState.isMaximized,
    maximize,
    minimize,
    restore,
    toggleMinimize,
    toggleMaximize,
  };
}
