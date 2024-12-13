import React from "react";
import { useThemeStore } from "../../store/useThemeStore";
import { themes } from "../../config/themes";
import clsx from "clsx";

interface Props {
  onQuit: () => void;
  onWait: () => void;
}

const DisconnectedPopup: React.FC<Props> = ({ onQuit, onWait }) => {
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={clsx(
          "p-8 rounded-lg shadow-xl text-center",
          currentTheme.background,
          currentTheme.text
        )}
      >
        {/* <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" /> */}
        <h2 className="text-2xl font-bold mb-2">Chess Master</h2>
        <p className={clsx("mb-6", currentTheme.text)}>
          Your opponent has disconnected. Find a new opponent!
        </p>
        <div className="flex justify-center gap-4">
          {/* <button
            onClick={onQuit}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Quit
          </button> */}
          <button
            onClick={onWait}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Find new opponent
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectedPopup;
