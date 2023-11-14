export interface ConversationMessage {
  readonly id: string;
  prompt: string;
  response: string;
  updatedAt: Date;
  readonly createdAt: Date;
}

export type Model = 'gpt-3.5-turbo'
| 'gpt-3.5-turbo-0301'
| 'gpt-3.5-turbo-1106'
| 'gpt-3.5-turbo-16k'
| 'gpt-3.5-turbo-16k-0613'
| 'gpt-4'
| 'gpt-4-0314'
| 'gpt-4-0613'
| 'gpt-4-1106-preview';

export interface Conversation {
  readonly id: string;
  label: string;
  model: Model;
  systemPrompt: string;
  messages: ConversationMessage[];
  readonly createdAt: Date;
}
