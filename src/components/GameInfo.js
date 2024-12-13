import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Timer } from "./Timer";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
import { CapturedPieces } from "./CapturedPeices";
import { useGameStore } from "../store/useGameStore";
export const GameInfo = () => {
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    const { whiteCaptured, blackCaptured } = useGameStore();
    return (_jsxs("div", { className: "flex flex-row sm:flex-row md:flex-col \n    gap-8 mt-10 \n\n    ", children: [_jsxs("div", { children: [_jsx("div", { className: "space-y-2 flex-row mb-2", children: _jsx(Timer, { color: "white" }) }), _jsxs("div", { className: clsx("flex-shrink-0  backdrop-blur-sm rounded-lg p-4", currentTheme.container), children: [_jsx("h3", { className: "font-medium  mb-2", children: "Black Captured" }), _jsx("div", { className: "overflow-y-auto space-y-1", children: _jsx(CapturedPieces, { color: "white", pieces: whiteCaptured }) })] })] }), _jsxs("div", { children: [_jsx("div", { className: "space-y-2 flex-row mb-2", children: _jsx(Timer, { color: "black" }) }), _jsxs("div", { className: clsx("flex-shrink-0 backdrop-blur-sm rounded-lg p-4", currentTheme.container), children: [_jsx("h3", { className: "font-medium mb-2", children: "White Captured" }), _jsx("div", { className: "overflow-y-auto space-y-1", children: _jsx(CapturedPieces, { color: "black", pieces: blackCaptured }) })] })] })] }));
};
