import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '../../types/chat';
import { useGameStore } from '../../store/useGameStore';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const {myPiece} = useGameStore();
  const isOwn = message.peice === myPiece;
  return (
    <motion.div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isOwn
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.message}</p>
        <span className="text-xs opacity-75">
          {message.timestamp.toTimeString().slice(0,5)}
        </span>
      </div>
    </motion.div>
  );
};