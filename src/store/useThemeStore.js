import { create } from 'zustand';
export const useThemeStore = create((set) => ({
    theme: 'ocean',
    setTheme: (theme) => set({ theme }),
}));
