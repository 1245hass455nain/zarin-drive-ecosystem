import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "ur";
type Theme = "dark" | "light";

interface AppState {
  language: Language;
  theme: Theme;
  isLoading: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "en",
      theme: "dark",
      isLoading: false,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: "zarin-app-store" },
  ),
);
