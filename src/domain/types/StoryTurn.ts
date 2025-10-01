export interface StoryTurn {
  id: string;
  createdAt: string;
  playerAction: string;
  narrative: string;
  wasActionAccepted: boolean;
  summary?: string;
}
