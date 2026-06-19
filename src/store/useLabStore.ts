import { create } from "zustand";
import { api } from "@/services/apiClient";
import { useOrderStore } from "./useOrderStore";
import type { Order } from "@/data/seedOrders";

export interface LabTestParam {
  name: string;
  unit: string;
  refRange: string;
  refRangeLow?: number;
  refRangeHigh?: number;
  criticalLow?: number;
  criticalHigh?: number;
}

export interface LabTestCatalog {
  id: string;
  name: string;
  category: "Biochemistry" | "Hematology" | "Microbiology" | "Serology" | "Immunology" | "Hormones" | "Toxicology" | "Molecular";
  sampleType: "Blood" | "Serum" | "Plasma" | "Urine" | "CSF" | "Stool" | "Sputum" | "Swab" | "Tissue";
  container: string;
  parameters: LabTestParam[];
  price: number;
  turnaroundHours: number;
  instructions?: string;
}

export interface LabPanel {
  id: string;
  name: string;
  description: string;
  tests: string[];
  price: number;
}

export interface LabWorklistFilters {
  status: string;
  priority: string;
  search: string;
  department: string;
}

const seedCatalog: LabTestCatalog[] = [
  // ── Biochemistry ──────────────────────────────────────────────────────────
  { id: "LT-001", name: "HbA1c", category: "Biochemistry", sampleType: "Blood", container: "EDTA Lavender", parameters: [{ name: "HbA1c", unit: "%", refRange: "4.0–5.6", refRangeLow: 4.0, refRangeHigh: 5.6 }], price: 400, turnaroundHours: 4 },
  { id: "LT-002", name: "Fasting Blood Sugar", category: "Biochemistry", sampleType: "Blood", container: "Fluoride Grey", parameters: [{ name: "FBS", unit: "mg/dL", refRange: "70–100", refRangeLow: 70, refRangeHigh: 100, criticalLow: 40, criticalHigh: 400 }], price: 60, turnaroundHours: 1 },
  { id: "LT-003", name: "Post-Prandial Blood Sugar", category: "Biochemistry", sampleType: "Blood", container: "Fluoride Grey", parameters: [{ name: "PPBS", unit: "mg/dL", refRange: "<140", refRangeHigh: 140 }], price: 60, turnaroundHours: 1 },
  { id: "LT-004", name: "Serum Creatinine", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Creatinine", unit: "mg/dL", refRange: "0.6–1.2", refRangeLow: 0.6, refRangeHigh: 1.2, criticalHigh: 4.0 }], price: 80, turnaroundHours: 2 },
  { id: "LT-005", name: "Blood Urea Nitrogen", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "BUN", unit: "mg/dL", refRange: "7–20", refRangeLow: 7, refRangeHigh: 20 }], price: 80, turnaroundHours: 2 },
  { id: "LT-006", name: "Uric Acid", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Uric Acid", unit: "mg/dL", refRange: "3.4–7.0", refRangeLow: 3.4, refRangeHigh: 7.0 }], price: 100, turnaroundHours: 2 },
  { id: "LT-007", name: "Total Bilirubin", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Total Bilirubin", unit: "mg/dL", refRange: "0.3–1.2", refRangeLow: 0.3, refRangeHigh: 1.2, criticalHigh: 15 }], price: 80, turnaroundHours: 2 },
  { id: "LT-008", name: "Direct Bilirubin", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Direct Bilirubin", unit: "mg/dL", refRange: "0.0–0.3", refRangeLow: 0.0, refRangeHigh: 0.3 }], price: 80, turnaroundHours: 2 },
  { id: "LT-009", name: "AST (SGOT)", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "AST", unit: "U/L", refRange: "10–40", refRangeLow: 10, refRangeHigh: 40 }], price: 80, turnaroundHours: 2 },
  { id: "LT-010", name: "ALT (SGPT)", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "ALT", unit: "U/L", refRange: "7–56", refRangeLow: 7, refRangeHigh: 56 }], price: 80, turnaroundHours: 2 },
  { id: "LT-011", name: "ALP (Alkaline Phosphatase)", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "ALP", unit: "U/L", refRange: "44–147", refRangeLow: 44, refRangeHigh: 147 }], price: 80, turnaroundHours: 2 },
  { id: "LT-012", name: "GGT", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "GGT", unit: "U/L", refRange: "5–40", refRangeLow: 5, refRangeHigh: 40 }], price: 100, turnaroundHours: 2 },
  { id: "LT-013", name: "Total Protein", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Total Protein", unit: "g/dL", refRange: "6.4–8.3", refRangeLow: 6.4, refRangeHigh: 8.3 }], price: 80, turnaroundHours: 2 },
  { id: "LT-014", name: "Albumin", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Albumin", unit: "g/dL", refRange: "3.5–5.0", refRangeLow: 3.5, refRangeHigh: 5.0 }], price: 80, turnaroundHours: 2 },
  { id: "LT-015", name: "Sodium", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Sodium", unit: "mEq/L", refRange: "136–145", refRangeLow: 136, refRangeHigh: 145, criticalLow: 120, criticalHigh: 160 }], price: 80, turnaroundHours: 2 },
  { id: "LT-016", name: "Potassium", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Potassium", unit: "mEq/L", refRange: "3.5–5.1", refRangeLow: 3.5, refRangeHigh: 5.1, criticalLow: 2.5, criticalHigh: 6.5 }], price: 80, turnaroundHours: 2 },
  { id: "LT-017", name: "Chloride", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Chloride", unit: "mEq/L", refRange: "98–106", refRangeLow: 98, refRangeHigh: 106 }], price: 80, turnaroundHours: 2 },
  { id: "LT-018", name: "Bicarbonate", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Bicarbonate", unit: "mEq/L", refRange: "22–29", refRangeLow: 22, refRangeHigh: 29 }], price: 80, turnaroundHours: 2 },
  { id: "LT-019", name: "Calcium", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Calcium", unit: "mg/dL", refRange: "8.5–10.5", refRangeLow: 8.5, refRangeHigh: 10.5, criticalLow: 6.0, criticalHigh: 14.0 }], price: 80, turnaroundHours: 2 },
  { id: "LT-020", name: "Phosphorus", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Phosphorus", unit: "mg/dL", refRange: "2.5–4.5", refRangeLow: 2.5, refRangeHigh: 4.5 }], price: 80, turnaroundHours: 2 },
  { id: "LT-021", name: "Magnesium", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Magnesium", unit: "mg/dL", refRange: "1.7–2.2", refRangeLow: 1.7, refRangeHigh: 2.2, criticalLow: 1.0, criticalHigh: 5.0 }], price: 100, turnaroundHours: 2 },
  { id: "LT-022", name: "LDH", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "LDH", unit: "U/L", refRange: "140–280", refRangeLow: 140, refRangeHigh: 280 }], price: 120, turnaroundHours: 2 },
  { id: "LT-023", name: "CK-MB", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "CK-MB", unit: "U/L", refRange: "<25", refRangeHigh: 25 }], price: 200, turnaroundHours: 2 },
  { id: "LT-024", name: "Troponin I (High Sensitivity)", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Troponin I", unit: "ng/L", refRange: "<0.04", refRangeHigh: 0.04, criticalHigh: 1.0 }], price: 600, turnaroundHours: 1 },
  { id: "LT-025", name: "Total Cholesterol", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Total Cholesterol", unit: "mg/dL", refRange: "<200", refRangeHigh: 200 }], price: 100, turnaroundHours: 3 },
  { id: "LT-026", name: "Triglycerides", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Triglycerides", unit: "mg/dL", refRange: "<150", refRangeHigh: 150 }], price: 100, turnaroundHours: 3 },
  { id: "LT-027", name: "HDL Cholesterol", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "HDL", unit: "mg/dL", refRange: ">40", refRangeLow: 40 }], price: 100, turnaroundHours: 3 },
  { id: "LT-028", name: "LDL Cholesterol", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "LDL", unit: "mg/dL", refRange: "<100", refRangeHigh: 100 }], price: 100, turnaroundHours: 3 },
  { id: "LT-029", name: "Serum Iron", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Iron", unit: "µg/dL", refRange: "60–170", refRangeLow: 60, refRangeHigh: 170 }], price: 120, turnaroundHours: 3 },
  { id: "LT-030", name: "Total Iron Binding Capacity", category: "Biochemistry", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "TIBC", unit: "µg/dL", refRange: "240–450", refRangeLow: 240, refRangeHigh: 450 }], price: 120, turnaroundHours: 3 },

  // ── Hematology ────────────────────────────────────────────────────────────
  { id: "LT-031", name: "CBC with Differential", category: "Hematology", sampleType: "Blood", container: "EDTA Lavender", parameters: [
    { name: "Hb", unit: "g/dL", refRange: "13–17", refRangeLow: 13, refRangeHigh: 17, criticalLow: 6, criticalHigh: 20 },
    { name: "RBC", unit: "M/µL", refRange: "4.5–5.5", refRangeLow: 4.5, refRangeHigh: 5.5 },
    { name: "WBC", unit: "K/µL", refRange: "4–11", refRangeLow: 4, refRangeHigh: 11, criticalLow: 1, criticalHigh: 50 },
    { name: "Platelets", unit: "K/µL", refRange: "150–410", refRangeLow: 150, refRangeHigh: 410, criticalLow: 20, criticalHigh: 1000 },
    { name: "Neutrophils", unit: "%", refRange: "40–80", refRangeLow: 40, refRangeHigh: 80 },
    { name: "Lymphocytes", unit: "%", refRange: "20–40", refRangeLow: 20, refRangeHigh: 40 },
    { name: "Eosinophils", unit: "%", refRange: "1–6", refRangeLow: 1, refRangeHigh: 6 },
    { name: "Monocytes", unit: "%", refRange: "2–10", refRangeLow: 2, refRangeHigh: 10 },
    { name: "HCT", unit: "%", refRange: "40–54", refRangeLow: 40, refRangeHigh: 54 },
    { name: "MCV", unit: "fL", refRange: "80–100", refRangeLow: 80, refRangeHigh: 100 },
    { name: "MCH", unit: "pg", refRange: "27–34", refRangeLow: 27, refRangeHigh: 34 },
    { name: "MCHC", unit: "g/dL", refRange: "32–36", refRangeLow: 32, refRangeHigh: 36 },
    { name: "RDW", unit: "%", refRange: "11.5–14.5", refRangeLow: 11.5, refRangeHigh: 14.5 },
  ], price: 300, turnaroundHours: 3, instructions: "Mix well, avoid hemolysis" },
  { id: "LT-032", name: "PT / INR", category: "Hematology", sampleType: "Plasma", container: "Citrate Blue", parameters: [
    { name: "PT", unit: "sec", refRange: "11–13.5", refRangeLow: 11, refRangeHigh: 13.5, criticalHigh: 30 },
    { name: "INR", unit: "", refRange: "0.8–1.2", refRangeLow: 0.8, refRangeHigh: 1.2, criticalHigh: 5 },
  ], price: 200, turnaroundHours: 2, instructions: "Fill exactly to mark" },
  { id: "LT-033", name: "aPTT", category: "Hematology", sampleType: "Plasma", container: "Citrate Blue", parameters: [{ name: "aPTT", unit: "sec", refRange: "25–35", refRangeLow: 25, refRangeHigh: 35, criticalHigh: 70 }], price: 200, turnaroundHours: 2 },
  { id: "LT-034", name: "ESR", category: "Hematology", sampleType: "Blood", container: "EDTA Lavender", parameters: [{ name: "ESR", unit: "mm/hr", refRange: "1–13", refRangeLow: 1, refRangeHigh: 13 }], price: 80, turnaroundHours: 2 },
  { id: "LT-035", name: "Reticulocyte Count", category: "Hematology", sampleType: "Blood", container: "EDTA Lavender", parameters: [{ name: "Reticulocyte", unit: "%", refRange: "0.5–2.5", refRangeLow: 0.5, refRangeHigh: 2.5 }], price: 120, turnaroundHours: 3 },
  { id: "LT-036", name: "Peripheral Smear", category: "Hematology", sampleType: "Blood", container: "EDTA Lavender+Slide", parameters: [{ name: "Peripheral Smear", unit: "", refRange: "Normal morphology" }], price: 100, turnaroundHours: 4, instructions: "Prepare 2 smears" },

  // ── Microbiology ──────────────────────────────────────────────────────────
  { id: "LT-037", name: "Blood Culture", category: "Microbiology", sampleType: "Blood", container: "BacT/Alert Bottles", parameters: [{ name: "Blood Culture", unit: "", refRange: "No growth" }], price: 500, turnaroundHours: 72, instructions: "Collect 2 sets from different sites" },
  { id: "LT-038", name: "Urine Culture / Sensitivity", category: "Microbiology", sampleType: "Urine", container: "Sterile Universal", parameters: [{ name: "Colony Count", unit: "CFU/mL", refRange: "<10^4" }, { name: "Organism", unit: "", refRange: "No growth" }], price: 200, turnaroundHours: 48 },
  { id: "LT-039", name: "Sputum Culture / Sensitivity", category: "Microbiology", sampleType: "Sputum", container: "Sterile Universal", parameters: [{ name: "Sputum C/S", unit: "", refRange: "Normal flora" }], price: 250, turnaroundHours: 72 },
  { id: "LT-040", name: "Gram Stain", category: "Microbiology", sampleType: "Swab", container: "Sterile Swab", parameters: [{ name: "Gram Stain", unit: "", refRange: "No organisms seen" }], price: 100, turnaroundHours: 2 },
  { id: "LT-041", name: "AFB Smear", category: "Microbiology", sampleType: "Sputum", container: "Sterile Universal", parameters: [{ name: "AFB Smear", unit: "", refRange: "Negative" }], price: 150, turnaroundHours: 24, instructions: "3 consecutive early morning samples" },

  // ── Serology ──────────────────────────────────────────────────────────────
  { id: "LT-042", name: "HBsAg", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "HBsAg", unit: "", refRange: "Non-reactive" }], price: 250, turnaroundHours: 4 },
  { id: "LT-043", name: "Anti-HCV", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Anti-HCV", unit: "", refRange: "Non-reactive" }], price: 400, turnaroundHours: 4 },
  { id: "LT-044", name: "Anti-HIV 1&2", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "HIV Serology", unit: "", refRange: "Non-reactive" }], price: 350, turnaroundHours: 4 },
  { id: "LT-045", name: "VDRL", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "VDRL", unit: "", refRange: "Non-reactive" }], price: 100, turnaroundHours: 4 },
  { id: "LT-046", name: "TSH", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "TSH", unit: "µIU/mL", refRange: "0.35–4.94", refRangeLow: 0.35, refRangeHigh: 4.94 }], price: 300, turnaroundHours: 4 },
  { id: "LT-047", name: "Free T4", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Free T4", unit: "ng/dL", refRange: "0.7–1.8", refRangeLow: 0.7, refRangeHigh: 1.8 }], price: 300, turnaroundHours: 4 },
  { id: "LT-048", name: "Free T3", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Free T3", unit: "pg/mL", refRange: "2.0–4.4", refRangeLow: 2.0, refRangeHigh: 4.4 }], price: 300, turnaroundHours: 4 },
  { id: "LT-049", name: "Vitamin D (25-OH)", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Vitamin D", unit: "ng/mL", refRange: "30–100", refRangeLow: 30, refRangeHigh: 100, criticalLow: 10 }], price: 600, turnaroundHours: 6 },
  { id: "LT-050", name: "Vitamin B12", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Vitamin B12", unit: "pg/mL", refRange: "200–900", refRangeLow: 200, refRangeHigh: 900, criticalLow: 100 }], price: 500, turnaroundHours: 6 },
  { id: "LT-051", name: "Ferritin", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Ferritin", unit: "ng/mL", refRange: "20–300", refRangeLow: 20, refRangeHigh: 300 }], price: 400, turnaroundHours: 4 },
  { id: "LT-052", name: "CRP", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "CRP", unit: "mg/L", refRange: "<5", refRangeHigh: 5 }], price: 300, turnaroundHours: 3 },
  { id: "LT-053", name: "Procalcitonin", category: "Serology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Procalcitonin", unit: "ng/mL", refRange: "<0.5", refRangeHigh: 0.5 }], price: 800, turnaroundHours: 4 },

  // ── Immunology ────────────────────────────────────────────────────────────
  { id: "LT-054", name: "ANA (Antinuclear Antibody)", category: "Immunology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "ANA", unit: "", refRange: "Negative (titer <1:80)" }], price: 600, turnaroundHours: 24 },
  { id: "LT-055", name: "Anti-dsDNA", category: "Immunology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Anti-dsDNA", unit: "IU/mL", refRange: "<30", refRangeHigh: 30 }], price: 700, turnaroundHours: 24 },
  { id: "LT-056", name: "Rheumatoid Factor", category: "Immunology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "RF", unit: "IU/mL", refRange: "<14", refRangeHigh: 14 }], price: 350, turnaroundHours: 4 },
  { id: "LT-057", name: "Anti-CCP", category: "Immunology", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Anti-CCP", unit: "U/mL", refRange: "<5", refRangeHigh: 5 }], price: 800, turnaroundHours: 24 },

  // ── Hormones ──────────────────────────────────────────────────────────────
  { id: "LT-058", name: "FSH", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "FSH", unit: "mIU/mL", refRange: "Follicular: 3–8, Luteal: 2–6" }], price: 400, turnaroundHours: 6 },
  { id: "LT-059", name: "LH", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "LH", unit: "mIU/mL", refRange: "Follicular: 2–12, Luteal: 1–11" }], price: 400, turnaroundHours: 6 },
  { id: "LT-060", name: "Prolactin", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Prolactin", unit: "ng/mL", refRange: "4–23", refRangeLow: 4, refRangeHigh: 23 }], price: 400, turnaroundHours: 6 },
  { id: "LT-061", name: "Testosterone", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Testosterone", unit: "ng/dL", refRange: "280–1100", refRangeLow: 280, refRangeHigh: 1100 }], price: 500, turnaroundHours: 6 },
  { id: "LT-062", name: "Estradiol", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Estradiol", unit: "pg/mL", refRange: "Follicular: 20–80" }], price: 500, turnaroundHours: 6 },
  { id: "LT-063", name: "Progesterone", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Progesterone", unit: "ng/mL", refRange: "Follicular: <0.5, Luteal: 4–28" }], price: 500, turnaroundHours: 6 },
  { id: "LT-064", name: "Cortisol (AM)", category: "Hormones", sampleType: "Serum", container: "Plain Red", parameters: [{ name: "Cortisol", unit: "µg/dL", refRange: "6–23", refRangeLow: 6, refRangeHigh: 23 }], price: 450, turnaroundHours: 6 },

  // ── Molecular ─────────────────────────────────────────────────────────────
  { id: "LT-065", name: "COVID-19 RT-PCR", category: "Molecular", sampleType: "Swab", container: "VTM Tube", parameters: [{ name: "SARS-CoV-2 RT-PCR", unit: "", refRange: "Negative" }], price: 500, turnaroundHours: 24 },
  { id: "LT-066", name: "Dengue RT-PCR", category: "Molecular", sampleType: "Blood", container: "EDTA Lavender", parameters: [{ name: "Dengue RT-PCR", unit: "", refRange: "Negative" }], price: 1500, turnaroundHours: 24 },
  { id: "LT-067", name: "MTB GeneXpert", category: "Molecular", sampleType: "Sputum", container: "Sterile Universal", parameters: [{ name: "MTB Detected", unit: "", refRange: "Not detected" }, { name: "Rifampicin Resistance", unit: "", refRange: "Not detected" }], price: 1200, turnaroundHours: 4 },
];

const seedPanels: LabPanel[] = [
  { id: "LP-001", name: "CBC Panel", description: "Complete blood count with differential", tests: ["LT-031"], price: 300 },
  { id: "LP-002", name: "LFT Panel", description: "Liver function tests — Bilirubin, enzymes, proteins", tests: ["LT-007", "LT-008", "LT-009", "LT-010", "LT-011", "LT-012", "LT-013", "LT-014"], price: 600 },
  { id: "LP-003", name: "KFT Panel", description: "Kidney function tests — electrolytes, creatinine, BUN", tests: ["LT-004", "LT-005", "LT-015", "LT-016", "LT-017", "LT-018"], price: 450 },
  { id: "LP-004", name: "Lipid Profile Panel", description: "Total cholesterol, triglycerides, HDL, LDL", tests: ["LT-025", "LT-026", "LT-027", "LT-028"], price: 350 },
  { id: "LP-005", name: "Pre-op Panel", description: "CBC, PT/INR, KFT, LFT — pre-surgery workup", tests: ["LT-031", "LT-032", "LT-004", "LT-009", "LT-010"], price: 800 },
  { id: "LP-006", name: "Diabetic Panel", description: "HbA1c, FBS, PPBS, KFT, Lipid Profile", tests: ["LT-001", "LT-002", "LT-003", "LT-004", "LT-005", "LT-025", "LT-026", "LT-027", "LT-028"], price: 1200 },
  { id: "LP-007", name: "Anemia Panel", description: "CBC, Iron studies, Vitamin B12, Ferritin", tests: ["LT-031", "LT-029", "LT-030", "LT-050", "LT-051"], price: 1000 },
  { id: "LP-008", name: "Thyroid Panel", description: "TSH, FT4, FT3", tests: ["LT-046", "LT-047", "LT-048"], price: 800 },
  { id: "LP-009", name: "Liver Panel", description: "Comprehensive liver workup", tests: ["LT-007", "LT-008", "LT-009", "LT-010", "LT-011", "LT-012", "LT-013", "LT-014", "LT-022"], price: 700 },
  { id: "LP-010", name: "Coagulation Panel", description: "PT/INR, aPTT", tests: ["LT-032", "LT-033"], price: 350 },
];

interface LabStore {
  catalog: LabTestCatalog[];
  panels: LabPanel[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getTestById: (id: string) => LabTestCatalog | undefined;
  getTestsByCategory: (category: LabTestCatalog["category"]) => LabTestCatalog[];
  getPanelById: (id: string) => LabPanel | undefined;
  getAllPanels: () => LabPanel[];
  getLabOrders: () => Order[];
  getLabOrdersByStatus: (status: string) => Order[];
  getLabOrdersByPriority: (priority: string) => Order[];
  getCriticalResults: () => Order[];
  calculateReferenceRange: (testId: string, paramIndex: number, value: number) => { flag: string; critical: boolean };
}

export const useLabStore = create<LabStore>((set, get) => ({
  catalog: seedCatalog,
  panels: seedPanels,
  loading: false,
  initialized: false,
  error: null,

  async refresh() {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get<{ data: LabTestCatalog[] }>("/lab/catalog");
      set({ catalog: data, loading: false, initialized: true });
    } catch {
      set({ catalog: seedCatalog, loading: false, initialized: true, error: "Failed to load catalog from server, using seed data" });
    }
  },

  getTestById(id) {
    return get().catalog.find((t) => t.id === id);
  },

  getTestsByCategory(category) {
    return get().catalog.filter((t) => t.category === category);
  },

  getPanelById(id) {
    return get().panels.find((p) => p.id === id);
  },

  getAllPanels() {
    return get().panels;
  },

  getLabOrders() {
    return useOrderStore.getState().orders.filter((o) => o.type === "Lab");
  },

  getLabOrdersByStatus(status) {
    return get().getLabOrders().filter((o) => o.status === status);
  },

  getLabOrdersByPriority(priority) {
    return get().getLabOrders().filter((o) => o.priority === priority);
  },

  getCriticalResults() {
    return get().getLabOrders().filter((o) => o.result?.critical === true);
  },

  calculateReferenceRange(testId, paramIndex, value) {
    const test = get().catalog.find((t) => t.id === testId);
    if (!test || !test.parameters[paramIndex]) return { flag: "N", critical: false };
    const param = test.parameters[paramIndex];
    let flag = "N";
    let critical = false;
    if (param.criticalHigh !== undefined && value >= param.criticalHigh) {
      flag = "HH"; critical = true;
    } else if (param.criticalLow !== undefined && value <= param.criticalLow) {
      flag = "LL"; critical = true;
    } else if (param.refRangeHigh !== undefined && value > param.refRangeHigh) {
      flag = "H";
    } else if (param.refRangeLow !== undefined && value < param.refRangeLow) {
      flag = "L";
    }
    return { flag, critical };
  },
}));
