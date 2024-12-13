import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useThemeStore } from '../store/useThemeStore';
import { themes } from '../config/themes';
const pieces = [
    { type: 'q', label: 'Queen' },
    { type: 'r', label: 'Rook' },
    { type: 'b', label: 'Bishop' },
    { type: 'n', label: 'Knight' },
];
export const PromotionPopup = () => {
    const { promotion, promoteToSelected, myPiece } = useGameStore();
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    if (!promotion?.isPromoting || promotion.color !== myPiece)
        return null;
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-center dark:text-white", children: "Choose promotion piece" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: pieces.map(({ type, label }) => (_jsxs("button", { onClick: () => promoteToSelected(type), className: "flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors", children: [_jsx("img", { src: `/pieces/${currentTheme.type}/${myPiece}${type}.svg`, alt: label, className: "w-16 h-16 mb-2" }), _jsx("span", { className: "text-sm font-medium dark:text-white", children: label })] }, type))) })] }) }));
};
