import { AppearanceSnapshot } from "./AppearanceSnapshot";
import { ContactProfile } from "./ContactProfile";
import { DamageState } from "./DamageState";
import { InventoryItem } from "./InventoryItem";
import { JournalEntry } from "./JournalEntry";
import { MapLocation } from "./MapLocation";

export interface StructuredState {
  inventory: InventoryItem[];
  journal: JournalEntry[];
  damage: DamageState;
  map: MapLocation[];
  contacts: ContactProfile[];
  appearanceHistory: AppearanceSnapshot[];
}
