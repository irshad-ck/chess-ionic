import React, { useEffect } from "react";
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
import { SplashScreen } from "@capacitor/splash-screen";
function App() {
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;

  useEffect(() => {
    const platform = isPlatform("android") || isPlatform("ios");
    // Change the background color and content color of the status bar
    const setStatusBar = async () => {
      await StatusBar.setBackgroundColor({ color: "#000000" }); // Set the background color
      await StatusBar.setStyle({ style: Style.Light }); // Set content color (Light or Dark)
    };

    const hideSplashScreen = async () => {
      // You can add any other initialization logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a 3s delay
      await SplashScreen.hide(); // Hide the splash screen after initialization
    };

    if (platform) {
      hideSplashScreen();
      setStatusBar();
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.socket?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        className={clsx(
          "min-h-screen transition-colors duration-500",
          currentTheme.background,
          currentTheme.text
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />

        <main className="container mx-auto px-4 py-8">
          <motion.div
            className="flex flex-col lg:flex-row items-start justify-center gap-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Chessboard />
            <GameInfo />
          </motion.div>
        </main>

        <Chat />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
