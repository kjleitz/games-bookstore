import type { JSX, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type { SettingsGateway } from "../services/types/SettingsGateway";
import { SettingsContext, type SettingsContextValue } from "./SettingsContext";

export interface SettingsProviderProps {
  gateway: SettingsGateway;
  children: ReactNode;
}

export function SettingsProvider({ gateway, children }: SettingsProviderProps): JSX.Element {
  const [settings, setSettings] = useState<SettingsContextValue["settings"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const loaded = await gateway.loadSettings();
        setSettings(loaded);
        setError(null);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [gateway]);

  const updateSettings = useCallback(
    async (nextSettings: Parameters<SettingsContextValue["updateSettings"]>[0]): Promise<void> => {
      setIsLoading(true);
      try {
        await gateway.saveSettings(nextSettings);
        setSettings(nextSettings);
        setError(null);
      } catch (saveError) {
        setError(saveError instanceof Error ? saveError.message : "Failed to save settings");
      } finally {
        setIsLoading(false);
      }
    },
    [gateway],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, isLoading, error, updateSettings }),
    [settings, isLoading, error, updateSettings],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
