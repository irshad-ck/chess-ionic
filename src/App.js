import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./components/Header";
import { Chessboard } from "./components/Chessboard";
import { GameInfo } from "./components/GameInfo";
import { Chat } from "./components/Chat";
import { useThemeStore } from "./store/useThemeStore";
import { themes } from "./config/themes";
import { clsx } from "clsx";
import socket from "./socket/socket";
import { StatusBar, Style } from "@capacitor/status-bar";
import { isPlatform } from "@ionic/react";
function App() {
    const { theme } = useThemeStore();
    const currentTheme = themes.find((t) => t.type === theme);
    useEffect(() => {
        const platform = isPlatform("android") || isPlatform("ios");
        // Change the background color and content color of the status bar
        const setStatusBar = async () => {
            await StatusBar.setBackgroundColor({ color: "#000" }); // Set the background color
            await StatusBar.setStyle({ style: Style.Light }); // Set content color (Light or Dark)
        };
        if (platform) {
            setStatusBar();
        }
    }, []);
    useEffect(() => {
        return () => {
            socket.socket?.disconnect();
        };
    }, []);
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { className: clsx("min-h-screen transition-colors duration-500", currentTheme.background, currentTheme.text), initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(Header, {}), _jsx("main", { className: "container mx-auto px-4 py-8", children: _jsxs(motion.div, { className: "flex flex-col lg:flex-row items-start justify-center gap-8", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2 }, children: [_jsx(Chessboard, {}), _jsx(GameInfo, {})] }) }), _jsx(Chat, {})] }, theme) }));
}
export default App;
