import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Send } from "lucide-react";
import { useGameStore } from "../../store/useGameStore";
export const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState("");
    const { myPiece } = useGameStore();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend({ message, peice: myPiece });
            setMessage("");
        }
    };
    return (_jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t dark:border-gray-700", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Type a message...", className: "flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[13rem]" }), _jsx("button", { type: "submit", className: "p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50", disabled: !message.trim(), children: _jsx(Send, { className: "w-5 h-5" }) })] }) }));
};
