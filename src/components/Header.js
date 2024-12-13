import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import Tooltip from "./tooltip/Tooltip";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
export const Header = () => {
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    const logo = currentTheme.type === "neon" || currentTheme.type === "dark" ? '/logo-white.png' : "/logo-black.png";
    return (_jsx(motion.header, { className: "w-full px-6 py-4 backdrop-blur-lg shadow-lg", initial: { y: -100 }, animate: { y: 0 }, transition: { type: "spring", stiffness: 100 }, children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsxs(motion.h1, { className: clsx("text-3xl font-bold flex items-center gap-3", currentTheme.text), initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: [_jsx("img", { src: logo, className: "w-auto h-[60px]" }), _jsx("span", { className: "mt-1", children: "Next Move" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(ThemeSelector, {}), _jsx(Tooltip, { children: _jsx(motion.button, { className: "p-2 hover:bg-white/10 rounded-full transition-colors", whileHover: { rotate: 180 }, transition: { duration: 0.3 }, children: _jsx(Settings, { className: "w-6 h-6" }) }), content: "Focus on your game!" })] })] }) }));
};
