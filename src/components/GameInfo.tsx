import React from "react";
import { Timer } from "./Timer";
import clsx from "clsx";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../config/themes";
import { CapturedPieces } from "./CapturedPeices";
import { useGameStore } from "../store/useGameStore";

export const GameInfo: React.FC = () => {
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;
  const { whiteCaptured, blackCaptured } = useGameStore();
  return (
    <div className="flex flex-row sm:flex-row md:flex-col 
    gap-8 mt-10 

    "
    >
      {/* Player Timers */}
      <div>
        <div className="space-y-2 flex-row mb-2">
          <Timer color="white" />
        </div>

        <div
          className={clsx(
            "flex-shrink-0  backdrop-blur-sm rounded-lg p-4",
            currentTheme.container
          )}
        >
          <h3 className="font-medium  mb-2">Black Captured</h3>
          <div className="overflow-y-auto space-y-1">
            <CapturedPieces color="white" pieces={whiteCaptured} />
          </div>
        </div>
      </div>

      <div>
        <div className="space-y-2 flex-row mb-2">
          <Timer color="black" />
        </div>

        <div
          className={clsx(
            "flex-shrink-0 backdrop-blur-sm rounded-lg p-4",
            currentTheme.container
          )}
        >
          <h3 className="font-medium mb-2">White Captured</h3>
          <div className="overflow-y-auto space-y-1">
            <CapturedPieces color="black" pieces={blackCaptured} />
          </div>
        </div>
      </div>
    </div>
  );
};
