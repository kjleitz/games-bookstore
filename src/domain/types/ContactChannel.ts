export interface ContactChannel {
  type: "phone" | "radio" | "psychic" | "other";
  address: string;
  notes?: string;
}
