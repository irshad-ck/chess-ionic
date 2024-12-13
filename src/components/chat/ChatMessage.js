import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
export const ChatMessage = ({ message }) => {
    const { myPiece } = useGameStore();
    const isOwn = message.peice === myPiece;
    return (_jsx(motion.div, { className: `flex ${isOwn ? 'justify-end' : 'justify-start'} mb-2`, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: _jsxs("div", { className: `max-w-[80%] p-3 rounded-lg ${isOwn
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 dark:bg-gray-700 rounded-bl-none'}`, children: [_jsx("p", { className: "text-sm", children: message.message }), _jsx("span", { className: "text-xs opacity-75", children: message.timestamp.toTimeString().slice(0, 5) })] }) }));
};
