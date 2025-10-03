import { AppearanceSnapshot } from "./AppearanceSnapshot";
import { ContactProfile } from "./ContactProfile";
import { InventoryItem } from "./InventoryItem";
import { JournalEntry } from "./JournalEntry";
import { MapLocation } from "./MapLocation";
import { VitalsState } from "./VitalsState";

export interface StructuredState {
  inventory: InventoryItem[];
  journal: JournalEntry[];
  vitals: VitalsState;
  map: MapLocation[];
  contacts: ContactProfile[];
  appearanceHistory: AppearanceSnapshot[];
}
