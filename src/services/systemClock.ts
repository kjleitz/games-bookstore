import type { Clock } from "../types/services";

export class SystemClock implements Clock {
  now(): string {
    return new Date().toISOString();
  }
}
