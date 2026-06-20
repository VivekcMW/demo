export const languages = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", dir: "ltr" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", dir: "ltr" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", dir: "ltr" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", dir: "ltr" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", dir: "ltr" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", dir: "ltr" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", dir: "ltr" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", dir: "ltr" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

// Map Indian states/regions to preferred language
export const regionToLanguage: Record<string, LanguageCode> = {
  // Hindi belt
  "Uttar Pradesh": "hi",
  "Madhya Pradesh": "hi",
  "Bihar": "hi",
  "Rajasthan": "hi",
  "Jharkhand": "hi",
  "Chhattisgarh": "hi",
  "Uttarakhand": "hi",
  "Haryana": "hi",
  "Himachal Pradesh": "hi",
  "Delhi": "hi",
  "Odisha": "hi",
  "Assam": "hi",
  // Regional languages
  "Maharashtra": "mr",
  "Tamil Nadu": "ta",
  "Telangana": "te",
  "Andhra Pradesh": "te",
  "West Bengal": "bn",
  "Gujarat": "gu",
  "Karnataka": "kn",
  "Kerala": "ml",
  "Punjab": "pa",
};

export function getLanguageByCode(code: string) {
  return languages.find((lang) => lang.code === code) || languages[0];
}
