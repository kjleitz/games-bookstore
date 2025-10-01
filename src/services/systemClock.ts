import type { Clock } from "./types/Clock";

export class SystemClock implements Clock {
  now(): string {
    return new Date().toISOString();
  }
}
