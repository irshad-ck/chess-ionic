import { create } from "zustand";
import type { Message } from "../types/chat";

interface ChatStore {
  messages: Message[];
  addMessage: (data: {message: string, peice: Message["peice"]}) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: ({message, peice}) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          message,
          peice,
          timestamp: new Date(),
        },
      ],
    })),
}));
