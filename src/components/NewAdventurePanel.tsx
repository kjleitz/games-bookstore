import { type JSX, useEffect, useState } from "react";

import { useGameContext } from "../context/useGameContext";
import type { StoryPromptOption } from "../domain/types/StoryPromptOption";
import { StaticPromptRepository } from "../services/StaticPromptRepository";
import { PanelCard } from "./PanelCard";

const promptRepository = new StaticPromptRepository();

export function NewAdventurePanel(): JSX.Element {
  const { startAdventure, isSubmitting } = useGameContext();
  const [prompts, setPrompts] = useState<StoryPromptOption[]>([]);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState("");

  useEffect(() => {
    const loadPrompts = async (): Promise<void> => {
      const options = await promptRepository.listPrompts();
      setPrompts(options);
      if (options.length > 0) {
        setSelectedPromptId(options[0].id);
      }
    };

    void loadPrompts();
  }, []);

  const handleCreateAdventure = async (): Promise<void> => {
    const prompt = prompts.find((option) => option.id === selectedPromptId);
    if (prompt == null) {
      return;
    }

    const title = customTitle.trim().length > 0 ? customTitle : prompt.title;
    await startAdventure({
      title,
      seedPrompt: prompt.seedPrompt,
      providerModel: "mock",
    });
    setCustomTitle("");
  };

  return (
    <PanelCard title="New Adventure">
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-[0.2em] text-textSecondary">Title</span>
          <input
            type="text"
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
            placeholder="Leave blank to use prompt title"
            className="rounded-panel border border-border/40 bg-surface/60 px-3 py-2 text-textPrimary focus:border-accent focus:outline-none"
          />
        </label>
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-textSecondary">Prompt</span>
          <div className="flex flex-col gap-2">
            {prompts.map((prompt) => {
              const isSelected = prompt.id === selectedPromptId;
              return (
                <button
                  type="button"
                  key={prompt.id}
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`rounded-panel border px-3 py-2 text-left transition-colors ${
                    isSelected
                      ? "border-accent bg-accent/10 text-textPrimary"
                      : "border-border/40 bg-surface/60 text-textSecondary hover:border-accent/60 hover:text-textPrimary"
                  }`}
                >
                  <div className="text-sm font-semibold text-textPrimary">{prompt.title}</div>
                  <p className="mt-1 text-xs text-textSecondary">{prompt.synopsis}</p>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          disabled={isSubmitting || selectedPromptId == null}
          onClick={() => void handleCreateAdventure()}
          className="rounded-panel border border-accent bg-accent/10 px-3 py-2 font-semibold text-textPrimary transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-50"
        >
          {isSubmitting ? "Creating…" : "Start Adventure"}
        </button>
      </div>
    </PanelCard>
  );
}
