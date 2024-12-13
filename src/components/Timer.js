import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useGameStore } from "../store/useGameStore";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
export const Timer = ({ color }) => {
    const { timer, isWhiteTurn, game, isMatching, myPiece, isOpponentDisconnected, setGameOver, gameOver, } = useGameStore();
    const updateTimer = useGameStore((state) => state.updateTimer);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    useEffect(() => {
        if (game.isGameOver() ||
            isMatching ||
            isOpponentDisconnected ||
            gameOver.isOver)
            return;
        const interval = setInterval(() => {
            const now = Date.now();
            const delta = Math.floor((now - lastUpdate) / 1000);
            if (delta >= 1) {
                if ((isWhiteTurn && color === "white") ||
                    (!isWhiteTurn && color === "black")) {
                    updateTimer(color === "white" ? "w" : "b");
                    const currentTimer = color === "white" ? timer.white : timer.black;
                    if (currentTimer <= 0) {
                        const winner = color === "white" ? "Black" : "White";
                        setGameOver({
                            reason: "timeout",
                            winner,
                        });
                    }
                }
                setLastUpdate(now);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [isWhiteTurn, color, lastUpdate, isMatching, isOpponentDisconnected]);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };
    const time = color === "white" ? timer.white : timer.black;
    // Determine if this timer is active (it's the player's turn)
    const isActive = !isMatching &&
        !isOpponentDisconnected &&
        ((isWhiteTurn && color === "white") || (!isWhiteTurn && color === "black"));
    // Check if this timer belongs to the user
    const isUserTimer = (myPiece === "w" && color === "white") ||
        (myPiece === "b" && color === "black");
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    return (_jsxs(motion.div, { className: clsx("flex items-center justify-between p-3 backdrop-blur-sm rounded-lg", currentTheme.container), initial: { opacity: 0, y: color === "white" ? -20 : 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: color === "white" ? 0.2 : 0.3 }, children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${color === "white" ? "bg-white" : "bg-gray-900"}` }), _jsx("span", { className: "font-medium", dangerouslySetInnerHTML: {
                            __html: isMatching || isOpponentDisconnected
                                ? "Waiting ...&nbsp;&nbsp;&nbsp;&nbsp;"
                                : isUserTimer
                                    ? "You&nbsp;&nbsp;&nbsp;&nbsp;"
                                    : "Opponent&nbsp;&nbsp;&nbsp;&nbsp;",
                        } })] }), _jsxs("div", { className: `flex items-center space-x-2 ${isActive ? "text-red-500" : ""}`, children: [_jsx(Clock, { className: `w-4 h-4 ${isActive ? "animate-pulse" : ""}` }), _jsx("span", { className: " font-mono", children: formatTime(time) })] })] }));
};
