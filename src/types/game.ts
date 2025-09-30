export interface StoryTurn {
  id: string;
  createdAt: string;
  playerAction: string;
  narrative: string;
  wasActionAccepted: boolean;
  summary?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  isConsumable: boolean;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  title: string;
  notes: string;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  severity: "minor" | "moderate" | "severe";
}

export interface DamageState {
  currentHealth: number;
  maxHealth: number;
  conditions: Condition[];
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
}

export interface ContactChannel {
  type: "phone" | "radio" | "psychic" | "other";
  address: string;
  notes?: string;
}

export interface ContactProfile {
  id: string;
  name: string;
  description: string;
  channels: ContactChannel[];
}

export interface AppearanceSnapshot {
  id: string;
  createdAt: string;
  summary: string;
  details?: string;
}

export interface AdventureMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  seedPrompt: string;
  providerModel: string;
}

export interface StructuredState {
  inventory: InventoryItem[];
  journal: JournalEntry[];
  damage: DamageState;
  map: MapLocation[];
  contacts: ContactProfile[];
  appearanceHistory: AppearanceSnapshot[];
}

export interface AdventureState {
  metadata: AdventureMetadata;
  turns: StoryTurn[];
  structured: StructuredState;
}

export interface AdventureSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  seedPrompt: string;
}

export interface StoryPromptOption {
  id: string;
  title: string;
  synopsis: string;
  seedPrompt: string;
}
