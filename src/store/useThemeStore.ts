import { create } from 'zustand';
import type { ThemeType } from '../types/chess';

interface ThemeStore {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'ocean',
  setTheme: (theme) => set({ theme }),
}));