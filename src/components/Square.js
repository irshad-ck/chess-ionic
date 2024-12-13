import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
const Square = ({ piece, isValidMove, isOpponentsPeice, }) => {
    // Determine piece styles
    const pieceClasses = `text-center text-xl font-bold ${piece && piece.toUpperCase() === piece ? "text-black" : "text-white"}`;
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    return (_jsxs(_Fragment, { children: [piece && (_jsx("span", { className: pieceClasses, children: _jsx("img", { className: `${piece == "bp" || piece == "wp" ? "h-[47px]" : "h-[55px]"}`, src: `/pieces/${currentTheme.type}/${piece}.svg`, alt: piece }) })), isValidMove ? (isOpponentsPeice ? (_jsx("div", { className: "absolute w-4 h-4 bg-red-500 rounded-full opacity-70 z-20" })) : (_jsx("div", { className: "absolute w-4 h-4 bg-green-500 rounded-full opacity-70 z-20" }))) : null] }));
};
export default Square;
