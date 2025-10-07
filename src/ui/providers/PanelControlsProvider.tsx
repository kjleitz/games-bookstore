import { useMemo } from "react";
import { createPanelControlsStore, PanelControlsContext } from "../context/PanelControlsContext";

export const PanelControlsProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMemo(() => createPanelControlsStore(), []);
  return <PanelControlsContext.Provider value={store}>{children}</PanelControlsContext.Provider>;
};
