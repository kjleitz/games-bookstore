import { ContactChannel } from "./ContactChannel";

export interface ContactProfile {
  id: string;
  name: string;
  description: string;
  channels: ContactChannel[];
}
