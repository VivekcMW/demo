import { cookies } from "next/headers";
import { LanguageCode, defaultLanguage } from "./config";
import { getTranslations, TranslationKeys } from "./index";

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let value: unknown = obj;
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof value === "string" ? value : path;
}

export async function getServerT() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aarogya-language")?.value || defaultLanguage) as LanguageCode;
  const translations = getTranslations(lang);

  return (key: string, replacements?: Record<string, string | number>) => {
    let value = getNestedValue(
      translations as unknown as Record<string, unknown>,
      key
    );
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        value = value.replace(`{${placeholder}}`, String(replacement));
      });
    }
    return value;
  };
}
