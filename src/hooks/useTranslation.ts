"use client";

import { useCallback } from "react";
import { useLanguageStore } from "@/store/languageStore";
import { getTranslations, TranslationKeys } from "@/i18n";
import { languages, getLanguageByCode, LanguageCode } from "@/i18n/config";

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let value: unknown = obj;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path; // Return key as fallback
    }
  }

  return typeof value === "string" ? value : path;
}

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore();
  const translations = getTranslations(language);

  const t = useCallback(
    (key: TranslationKey, replacements?: Record<string, string | number>) => {
      let value = getNestedValue(
        translations as unknown as Record<string, unknown>,
        key
      );

      // Handle replacements like {year}
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, replacement]) => {
          value = value.replace(`{${placeholder}}`, String(replacement));
        });
      }

      return value;
    },
    [translations]
  );

  const currentLanguage = getLanguageByCode(language);

  return {
    t,
    language,
    setLanguage,
    currentLanguage,
    languages,
    isRTL: currentLanguage.dir === ("rtl" as "ltr" | "rtl"),
  };
}

// Helper to suggest language based on detected region
export function getSuggestedLanguage(region: string | null): LanguageCode {
  if (!region) return "en";

  const regionToLanguage: Record<string, LanguageCode> = {
    "Uttar Pradesh": "hi",
    "Madhya Pradesh": "hi",
    Bihar: "hi",
    Rajasthan: "hi",
    Jharkhand: "hi",
    Chhattisgarh: "hi",
    Uttarakhand: "hi",
    Haryana: "hi",
    "Himachal Pradesh": "hi",
    Delhi: "hi",
    Maharashtra: "mr",
    "Tamil Nadu": "ta",
    Telangana: "te",
    "Andhra Pradesh": "te",
    "West Bengal": "bn",
    Gujarat: "gu",
    Karnataka: "kn",
    Kerala: "ml",
    Punjab: "pa",
  };

  return regionToLanguage[region] || "en";
}
