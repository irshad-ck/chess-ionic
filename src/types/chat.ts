export type MessageSender = 'user' | 'opponent';

export interface Message {
  id: string;
  message: string;
  peice: string|null;
  timestamp: Date;
}