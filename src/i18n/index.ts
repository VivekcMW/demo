import { LanguageCode } from "./config";

// Import all locale files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import kn from "./locales/kn.json";

export type TranslationKeys = typeof en;

const translations = {
  en,
  hi,
  mr,
  kn,
  // Fallback to English for languages not yet translated
  ta: en,
  te: en,
  bn: en,
  gu: en,
  ml: en,
  pa: en,
};

export function getTranslations(language: LanguageCode): TranslationKeys {
  return translations[language] || translations.en;
}
