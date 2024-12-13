import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { useThemeStore } from '../store/useThemeStore';
import { themes } from '../config/themes';

const pieces = [
  { type: 'q', label: 'Queen' },
  { type: 'r', label: 'Rook' },
  { type: 'b', label: 'Bishop' },
  { type: 'n', label: 'Knight' },
] as const;

export const PromotionPopup: React.FC = () => {
  const { promotion, promoteToSelected, myPiece } = useGameStore();
  const { theme } = useThemeStore();
  const currentTheme = themes.find((t) => t.type === theme)!;

  if (!promotion?.isPromoting || promotion.color !== myPiece) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
          Choose promotion piece
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {pieces.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => promoteToSelected(type)}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <img
                src={`/pieces/${currentTheme.type}/${myPiece}${type}.svg`}
                alt={label}
                className="w-16 h-16 mb-2"
              />
              <span className="text-sm font-medium dark:text-white">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
 