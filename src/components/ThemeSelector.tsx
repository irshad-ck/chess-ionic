import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { themes } from '../config/themes';
import { useThemeStore } from '../store/useThemeStore';

export const ThemeSelector: React.FC = () => {
  const { theme: currentTheme, setTheme } = useThemeStore();

  return (
    <motion.div 
      className="flex space-x-2 bg-white/10 backdrop-blur-sm p-2 rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {themes.map(({ type, name, icon }) => {
        const Icon = Icons[icon as keyof typeof Icons];
        return (
          <motion.button
            key={type}
            onClick={() => setTheme(type)}
            className={`p-2 rounded-md transition-all relative ${
              currentTheme === type
                ? 'bg-white/20 shadow-lg'
                : 'hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5" />
            <motion.span
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentTheme === type ? 1 : 0 }}
            >
              {name}
            </motion.span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};