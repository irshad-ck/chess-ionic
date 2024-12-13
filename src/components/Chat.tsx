import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import socket from "../socket/socket";
import { useGameStore } from "../store/useGameStore";
export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage, isOpponentDisconnected, isMatching } =
    useGameStore();

  const handleSend = ({
    message,
    peice,
  }: {
    message: string;
    peice: string | null;
  }) => {
    socket.onSendMessage({ message, peice });
    addMessage({ message, peice });
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
  }, [messages.length]);
  const isGameNotStarted = isMatching || isOpponentDisconnected;

  return (
    <>
      {!isGameNotStarted && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-6 h-6" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-medium">Chat</h3>
            </div>

            <div
              className="h-96 p-4 overflow-y-auto messages-list"
              ref={containerRef}
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            <ChatInput onSend={handleSend} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
