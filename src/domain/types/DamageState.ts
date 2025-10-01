import { Condition } from "./Condition";

export interface DamageState {
  currentHealth: number;
  maxHealth: number;
  conditions: Condition[];
}
