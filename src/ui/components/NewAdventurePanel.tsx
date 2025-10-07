import { type JSX, useEffect, useState } from "react";

import { useGameContext } from "../hooks/useGameContext";
import type { StoryPromptOption } from "../../domain/types/StoryPromptOption";
import { StaticPromptRepository } from "../../services/StaticPromptRepository";
import { PanelCard } from "./PanelCard";
import { OptionButton } from "./OptionButton";

const promptRepository = new StaticPromptRepository();

interface NewAdventurePanelProps {
  onAdventureStarted: () => void;
  className?: string;
}

export function NewAdventurePanel({
  onAdventureStarted,
  className = "",
}: NewAdventurePanelProps): JSX.Element {
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
    const didStart = await startAdventure({
      title,
      seedPrompt: prompt.seedPrompt,
      providerModel: "mock",
    });
    if (!didStart) {
      return;
    }
    onAdventureStarted();
    setCustomTitle("");
  };

  return (
    <PanelCard
      panelId="newAdventure"
      title="New Adventure"
      scrollable={false}
      className={`new-adventure-panel ${className}`}
    >
      <div className="flex flex-col text-textSecondary">
        <label className="flex">
          <label htmlFor="new-adventure-title" className="terminal-label terminal-label-inline">
            Title
          </label>
          <input
            id="new-adventure-title"
            type="text"
            value={customTitle}
            onChange={(event) => setCustomTitle(event.target.value)}
            placeholder="Leave blank to use prompt title"
            className="terminal-input flex-1"
          />
        </label>
        <div className="flex flex-col">
          <label htmlFor="new-adventure-prompts" className="terminal-label">
            Prompt
          </label>
          <div id="new-adventure-prompts" className="new-adventure-prompts flex flex-col">
            {prompts.map((prompt) => {
              const isSelected = prompt.id === selectedPromptId;
              return (
                <OptionButton
                  onClick={() => setSelectedPromptId(prompt.id)}
                  title={prompt.title}
                  synopsis={prompt.synopsis}
                  isSelected={isSelected}
                />
                // <button
                //   type="button"
                //   key={prompt.id}
                //   onClick={() => setSelectedPromptId(prompt.id)}
                //   className={`story-prompt-option rounded-panel text-left transition-colors ${
                //     isSelected
                //       ? "border-accent bg-accent/15 text-textPrimary"
                //       : "border-border/40 bg-surface/70 text-textSecondary hover:border-accent hover:text-textPrimary"
                //   }`}
                // >
                //   <div className="text-textPrimary">{prompt.title}</div>
                //   <p className="text-textSecondary">{prompt.synopsis}</p>
                // </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          disabled={isSubmitting || selectedPromptId == null}
          onClick={() => void handleCreateAdventure()}
          className="new-adventure-start-button terminal-button terminal-button-primary disabled:opacity-50"
        >
          {isSubmitting ? "Creating…" : "Start Adventure"}
        </button>
      </div>
    </PanelCard>
  );
}
