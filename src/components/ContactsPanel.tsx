import type { JSX } from "react";

import { useGameContext } from "../context/useGameContext";
import { PanelCard } from "./PanelCard";

export function ContactsPanel(): JSX.Element {
  const { activeAdventure } = useGameContext();
  const contacts = activeAdventure?.structured.contacts ?? [];

  return (
    <PanelCard title="Contacts">
      {contacts.length === 0 ? (
        <p className="text-textSecondary">No contacts yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="rounded-panel border border-border/30 bg-surface/60 p-3"
            >
              <div className="flex items-center justify-between text-sm text-textPrimary">
                <span>{contact.name}</span>
                <span className="text-xs text-textSecondary">
                  {contact.channels[0]?.type ?? ""}
                </span>
              </div>
              <p className="mt-2 text-xs text-textSecondary">{contact.description}</p>
              <ul className="mt-3 flex flex-col gap-1 text-xs text-accent">
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
