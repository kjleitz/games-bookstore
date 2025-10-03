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
      <div className="flex flex-col text-textSecondary">
        <label className="flex flex-col">
          <span className="terminal-label">Title</span>
          <input
            type="text"
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
            placeholder="Leave blank to use prompt title"
            className="terminal-input"
          />
        </label>
        <div className="flex flex-col">
          <span className="terminal-label">Prompt</span>
          <div className="flex flex-col">
            {prompts.map((prompt) => {
              const isSelected = prompt.id === selectedPromptId;
              return (
                <button
                  type="button"
                  key={prompt.id}
                  onClick={() => setSelectedPromptId(prompt.id)}
                  className={`rounded-panel border text-left transition-colors ${
                    isSelected
                      ? "border-accent bg-accent/15 text-textPrimary"
                      : "border-border/40 bg-surface/70 text-textSecondary hover:border-accent hover:text-textPrimary"
                  }`}
                >
                  <div className="text-textPrimary">{prompt.title}</div>
                  <p className="text-textSecondary">{prompt.synopsis}</p>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          disabled={isSubmitting || selectedPromptId == null}
          onClick={() => void handleCreateAdventure()}
          className="terminal-button terminal-button-primary disabled:opacity-50"
        >
          {isSubmitting ? "Creating…" : "Start Adventure"}
        </button>
      </div>
    </PanelCard>
  );
}
