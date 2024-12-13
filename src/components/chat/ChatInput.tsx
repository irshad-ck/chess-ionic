import React, { useState } from "react";
import { Send, Smile } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";

interface ChatInputProps {
  onSend: (data: {message: string, peice: string|null}) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const { myPiece } = useGameStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend({ message, peice: myPiece });
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
      <div className="flex items-center space-x-2">
        {/* <button
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[13rem]"
        />
        <button
          type="submit"
          className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
          disabled={!message.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
