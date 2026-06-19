import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageCode, defaultLanguage } from "@/i18n/config";

interface LanguageState {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLanguage,
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "aarogya-language",
    }
  )
);
