import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useThemeStore } from "../../store/useThemeStore";
import { themes } from "../../config/themes";
import clsx from "clsx";
const DisconnectedPopup = ({ onQuit, onWait }) => {
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    return (_jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50", children: _jsxs("div", { className: clsx("p-8 rounded-lg shadow-xl text-center", currentTheme.background, currentTheme.text), children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: "Chess Master" }), _jsx("p", { className: clsx("mb-6", currentTheme.text), children: "Your opponent has disconnected. Find a new opponent!" }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx("button", { onClick: onWait, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition", children: "Find new opponent" }) })] }) }));
};
export default DisconnectedPopup;
