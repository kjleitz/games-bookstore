import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard, type PanelControls } from "./PanelCard";

interface ContactsPanelProps {
  controls: PanelControls;
}

export function ContactsPanel({ controls }: ContactsPanelProps): JSX.Element {
  const { activeAdventure } = useGameContext();
  const contacts = activeAdventure?.structured.contacts ?? [];

  return (
    <PanelCard title="Contacts" className="flex-1 min-h-0 overflow-hidden" controls={controls}>
      {contacts.length === 0 ? (
        <p className="text-textSecondary">No contacts yet.</p>
      ) : (
        <ul className="flex h-full min-h-0 flex-col overflow-y-auto">
          {contacts.map((contact) => (
            <li key={contact.id} className="rounded-panel border border-border/40 bg-surface/70">
              <div className="flex items-start justify-between text-textPrimary">
                <span>{contact.name}</span>
                <span className="uppercase text-textSecondary">
                  {contact.channels[0]?.type ?? ""}
                </span>
              </div>
              <p className="text-textSecondary">{contact.description}</p>
              <ul className="flex flex-col text-accent">
                {contact.channels.map((channel) => (
                  <li key={`${contact.id}-${channel.type}-${channel.address}`}>
                    {channel.type}: {channel.address}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </PanelCard>
  );
}
