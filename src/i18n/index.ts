import { LanguageCode } from "./config";

// Import all locale files
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";
import kn from "./locales/kn.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import bn from "./locales/bn.json";
import gu from "./locales/gu.json";
import ml from "./locales/ml.json";
import pa from "./locales/pa.json";
import or from "./locales/or.json";
import as from "./locales/as.json";
import ur from "./locales/ur.json";

export type TranslationKeys = typeof en;

const translations = {
  en,
  hi,
  mr,
  kn,
  ta,
  te,
  bn,
  gu,
  ml,
  pa,
  or,
  as,
  ur,
};

export function getTranslations(language: LanguageCode): TranslationKeys {
  return translations[language] || translations.en;
}
