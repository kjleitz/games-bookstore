export interface Condition {
  id: string;
  name: string;
  description: string;
  severity: "minor" | "moderate" | "severe";
}
