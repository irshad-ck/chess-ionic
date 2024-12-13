import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import socket from "../socket/socket";
import { useGameStore } from "../store/useGameStore";
export const Chat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, addMessage, isOpponentDisconnected, isMatching } = useGameStore();
    const handleSend = ({ message, peice, }) => {
        socket.onSendMessage({ message, peice });
        addMessage({ message, peice });
    };
    const containerRef = useRef(null);
    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current?.scrollHeight;
        }
    }, [messages.length]);
    const isGameNotStarted = isMatching || isOpponentDisconnected;
    return (_jsxs(_Fragment, { children: [!isGameNotStarted && (_jsx(motion.button, { onClick: () => setIsOpen(!isOpen), className: "fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(MessageSquare, { className: "w-6 h-6" }) })), _jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { initial: { opacity: 0, y: 20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 20, scale: 0.95 }, transition: { duration: 0.2 }, className: "fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden", children: [_jsx("div", { className: "p-4 border-b dark:border-gray-700", children: _jsx("h3", { className: "font-medium", children: "Chat" }) }), _jsx("div", { className: "h-96 p-4 overflow-y-auto messages-list", ref: containerRef, children: messages.map((message) => (_jsx(ChatMessage, { message: message }, message.id))) }), _jsx(ChatInput, { onSend: handleSend })] })) })] }));
};
