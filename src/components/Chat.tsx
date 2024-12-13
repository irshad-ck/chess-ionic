import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import socket from "../socket/socket";
import { useGameStore } from "../store/useGameStore";
import { Dropdown } from "primereact/dropdown";
import { Theme } from "../types/chess";
import * as Icons from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
import clsx from "clsx";

export const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, addMessage, isOpponentDisconnected, isMatching } =
    useGameStore();

  const { theme, setTheme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;

  const itemTemplate = (option: Theme) => {
    const Icon = Icons[option?.icon as keyof typeof Icons];
    return (
      <motion.button
        key={option?.type}
        onClick={() => setTheme(option?.type)}
        className={`p-2 rounded-md transition-all relative ${
          currentTheme.type === option?.type
            ? "bg-white/20 shadow-lg"
            : "hover:bg-white/10"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon className="w-5 h-5" />
        <motion.span
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentTheme?.type === option?.type ? 1 : 0 }}
        >
          {option?.name}
        </motion.span>
      </motion.button>
    );
  };

  const valueTemplate = (option: Theme) => {
    if (option) {
      const Icon = Icons[option?.icon as keyof typeof Icons];
      return (
        <motion.button
          key={option?.type}
          onClick={() => setTheme(option?.type)}
          className={`p-2 rounded-md transition-all relative ${
            currentTheme.type === option?.type
              ? "bg-white/20 shadow-lg"
              : "hover:bg-white/10"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-5 h-5" />
          <motion.span
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentTheme?.type === option?.type ? 1 : 0 }}
          >
            {option?.name}
          </motion.span>
        </motion.button>
      );
    }

    return null;
  };

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

      <div
        className={clsx(
          "fixed bottom-20 right-6 p-1 flex md:hidden rounded-full"
          // currentTheme.background
        )}
      >
        <Dropdown
          value={currentTheme}
          // onChange={(e) => setTheme(e.value?.name)}
          options={themes}
          valueTemplate={valueTemplate}
          itemTemplate={itemTemplate}
          optionLabel="name"
          placeholder=""
          panelClassName={clsx(currentTheme.background)}
          className={"w-full md:w-14rem"}
        />
      </div>

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
