import React from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import Tooltip from "./tooltip/Tooltip";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";

export const Header: React.FC = () => {
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;
  const logo =
    currentTheme.type === "neon" || currentTheme.type === "dark"
      ? "/logo-white.png"
      : "/logo-black.png";
  return (
    <motion.header
      className="w-full px-6 py-4 backdrop-blur-lg shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.h1
          className={clsx(
            "text-3xl font-bold flex items-center gap-3",
            currentTheme.text
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img src={logo} className="w-auto h-[60px]" />
          <span className="mt-1">Next Move</span>
        </motion.h1>

        <div className="flex items-center">
          <ThemeSelector />

          <Tooltip
            children={
              <motion.button
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            }
            content="Focus on your game!"
          />
        </div>
      </div>
    </motion.header>
  );
};
