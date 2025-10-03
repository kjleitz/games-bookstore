import { Condition } from "./Condition";

export interface VitalsState {
  currentHealth: number;
  maxHealth: number;
  conditions: Condition[];
}
