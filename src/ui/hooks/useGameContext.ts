import { useContext } from "react";

import { GameContext, type GameContextValue } from "../context/GameContext";

export function useGameContext(): GameContextValue {
  const context = useContext(GameContext);
  if (context == null) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
