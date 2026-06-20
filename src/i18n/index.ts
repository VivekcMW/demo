import { LanguageCode } from "./config";

// Import all locale files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import kn from "./locales/kn.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";

export type TranslationKeys = typeof en;

const translations = {
  en,
  hi,
  mr,
  kn,
  ta,
  te,
  // Fallback to English for languages not yet translated
  bn: en,
  gu: en,
  ml: en,
  pa: en,
};

export function getTranslations(language: LanguageCode): TranslationKeys {
  return translations[language] || translations.en;
}
