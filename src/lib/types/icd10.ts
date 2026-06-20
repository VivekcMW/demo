// ICD-10 Types for frontend
// Matches the backend schema definitions

// ─────────────────────────────────────────────────────────────────────────────
// Chapter
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10Chapter {
  id: number;
  romanNumeral: string;
  title: string;
  codeRangeStart: string;
  codeRangeEnd: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Category
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10Category {
  code: string;
  chapterId: number;
  title: string;
  includes?: string[];
  excludes1?: string[];
  excludes2?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Code (CM - Clinical Modification)
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10Code {
  code: string;
  shortDesc: string;
  longDesc: string;
  categoryCode: string;
  chapterId: number;
  isBillable: boolean;
  isChronic: boolean;
  isComorbidity: boolean;
  isPediatric: boolean;
  isMaternity: boolean;
  isNewborn: boolean;
  ageRange?: string;
  sexSpecific?: "M" | "F";
  manifestationCode?: string;
  poa?: string;
  hccCategory?: number;
  commonSpecialties: string[];
  keywords: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PCS Code (Procedure Coding System)
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10PCSCode {
  code: string;
  description: string;
  section: string;
  bodySystem: string;
  rootOperation: string;
  bodyPart: string;
  approach: string;
  device: string;
  qualifier: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Specialty Favorite
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10SpecialtyFavorite {
  specialty: string;
  icdCode: string;
  displayOrder: number;
  createdAt: string;
  // Joined from icd10Codes
  shortDesc?: string;
  longDesc?: string;
  isBillable?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Search Result
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10SearchResult {
  code: string;
  shortDesc: string;
  longDesc: string;
  chapterTitle: string;
  categoryTitle: string;
  isBillable: boolean;
  isChronic: boolean;
  commonSpecialties: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Code Detail (with chapter info)
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10CodeDetail extends ICD10Code {
  chapterTitle: string;
  chapterRomanNumeral: string;
  categoryTitle: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PCS Search Result
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10PCSResult {
  code: string;
  description: string;
  section: string;
  rootOperation: string;
  bodyPart: string;
  approach: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Statistics
// ─────────────────────────────────────────────────────────────────────────────
export interface ICD10Stats {
  chapters: number;
  categories: number;
  codes: number;
  pcsCodes: number;
  favorites: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Diagnosis Entry (for forms)
// ─────────────────────────────────────────────────────────────────────────────
export interface DiagnosisEntry {
  id?: string;
  icdCode: string;
  description: string;
  type: "Primary" | "Secondary" | "Complication" | "Comorbidity";
  certainty: "Confirmed" | "Provisional" | "Ruled Out" | "Differential";
  presentOnAdmission?: "Y" | "N" | "U" | "W" | "1";
  notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Common Specialties for filtering
// ─────────────────────────────────────────────────────────────────────────────
export const SPECIALTIES = [
  "Internal Medicine",
  "Cardiology",
  "Pulmonology",
  "Gastroenterology",
  "Nephrology",
  "Endocrinology",
  "Neurology",
  "Pediatrics",
  "Obstetrics",
  "Gynecology",
  "Orthopedics",
  "General Surgery",
  "Emergency Medicine",
  "Psychiatry",
  "Dermatology",
  "Ophthalmology",
  "ENT",
  "Oncology",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];

// ─────────────────────────────────────────────────────────────────────────────
// POA Indicators (Present on Admission)
// ─────────────────────────────────────────────────────────────────────────────
export const POA_INDICATORS = {
  Y: "Present on admission",
  N: "Not present on admission",
  U: "Unknown",
  W: "Clinically undetermined",
  "1": "Exempt from POA reporting",
} as const;

export type POAIndicator = keyof typeof POA_INDICATORS;
