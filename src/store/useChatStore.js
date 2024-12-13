import { create } from "zustand";
export const useChatStore = create((set) => ({
    messages: [],
    addMessage: ({ message, peice }) => set((state) => ({
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
