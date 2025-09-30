import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { GameService } from "../services/gameService";
import { GameContext, type GameContextValue } from "./gameContext";

export interface GameProviderProps {
  service: GameService;
  children: ReactNode;
}

export function GameProvider({ service, children }: GameProviderProps): JSX.Element {
  const [adventures, setAdventures] = useState<GameContextValue["adventures"]>([]);
  const [activeAdventure, setActiveAdventure] = useState<GameContextValue["activeAdventure"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAdventures = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const results = await service.listAdventures();
      setAdventures(results);
      setError(null);
    } catch (refreshError) {
      setError(refreshError instanceof Error ? refreshError.message : "Failed to list adventures");
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    void refreshAdventures();
  }, [refreshAdventures]);

  const selectAdventure = useCallback(
    async (adventureId: string): Promise<void> => {
      setIsLoading(true);
      try {
        const adventure = await service.loadAdventure(adventureId);
        if (adventure == null) {
          setError("Adventure not found");
          setActiveAdventure(null);
          return;
        }
        setActiveAdventure(adventure);
        setError(null);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load adventure");
        setActiveAdventure(null);
      } finally {
        setIsLoading(false);
      }
    },
    [service],
  );

  const startAdventure = useCallback(
    async (input: Parameters<GameContextValue["startAdventure"]>[0]): Promise<void> => {
      setIsSubmitting(true);
      try {
        const adventure = await service.startAdventure(input);
        setActiveAdventure(adventure);
        await refreshAdventures();
        setError(null);
      } catch (startError) {
        setError(startError instanceof Error ? startError.message : "Unable to start adventure");
      } finally {
        setIsSubmitting(false);
      }
    },
    [refreshAdventures, service],
  );

  const submitPlayerAction = useCallback(
    async (playerAction: Parameters<GameContextValue["submitPlayerAction"]>[0]): Promise<void> => {
      if (activeAdventure == null) {
        setError("No active adventure");
        return;
      }
      setIsSubmitting(true);
      try {
        const result = await service.recordTurn(activeAdventure, playerAction);
        setActiveAdventure(result);
        await refreshAdventures();
        setError(null);
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Unable to process action");
      } finally {
        setIsSubmitting(false);
      }
    },
    [activeAdventure, refreshAdventures, service],
  );

  const deleteAdventure = useCallback(
    async (adventureId: Parameters<GameContextValue["deleteAdventure"]>[0]): Promise<void> => {
      setIsSubmitting(true);
      try {
        await service.deleteAdventure(adventureId);
        if (activeAdventure != null && activeAdventure.metadata.id === adventureId) {
          setActiveAdventure(null);
        }
        await refreshAdventures();
        setError(null);
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Unable to delete adventure");
      } finally {
        setIsSubmitting(false);
      }
    },
    [activeAdventure, refreshAdventures, service],
  );

  const value = useMemo<GameContextValue>(
    () => ({
      adventures,
      activeAdventure,
      isLoading,
      isSubmitting,
      error,
      refreshAdventures,
      selectAdventure,
      startAdventure,
      submitPlayerAction,
      deleteAdventure,
    }),
    [
      adventures,
      activeAdventure,
      isLoading,
      isSubmitting,
      error,
      refreshAdventures,
      selectAdventure,
      startAdventure,
      submitPlayerAction,
      deleteAdventure,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
