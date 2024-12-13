import { Loader2 } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";
import { themes } from "../../config/themes";
import clsx from "clsx";

export function FindingMatch() {
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
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
        <h2 className="text-2xl font-bold mb-2">Finding a Match</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we connect you with an opponent...
        </p>
      </div>
    </div>
  );
}
