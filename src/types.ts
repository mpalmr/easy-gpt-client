export interface ConversationMessage {
  readonly id: string;
  prompt: string;
  response: string;
  updatedAt: Date;
  readonly createdAt: Date;
}

export interface Conversation {
  readonly id: string;
  label: string;
  systemPrompt: string;
  messages: ConversationMessage[];
  readonly createdAt: Date;
}
