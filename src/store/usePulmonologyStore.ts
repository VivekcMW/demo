import { create } from "zustand";

export interface PFTResult {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  fvc: number;        // L
  fvcPredicted: number;
  fev1: number;       // L
  fev1Predicted: number;
  fev1FvcRatio: number; // %
  pef: number;        // L/min
  pefPredicted: number;
  fef2575: number;    // L/s
  fef2575Predicted: number;
  tlc?: number;       // L
  tlcPredicted?: number;
  dlco?: number;      // mL/min/mmHg
  dlcoPredicted?: number;
  interpretation: string;
  pattern: "Normal" | "Obstructive" | "Restrictive" | "Mixed";
  severity: "Normal" | "Mild" | "Moderate" | "Moderately Severe" | "Severe" | "Very Severe";
}

export interface ABGResult {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  ph: number;
  pco2: number;  // mmHg
  po2: number;   // mmHg
  hco3: number;  // mEq/L
  be: number;    // mEq/L
  so2: number;   // %
  lactate?: number;
  fiO2: number;  // fraction (e.g., 0.21)
  acidBaseStatus: string;
  oxygenation: string;
  interpretation: string;
}

const seedPFT: PFTResult[] = [
  { id: "PFT-001", patientId: "PT-0002", patientName: "Priya Venkatesh", date: "2026-06-10", fvc: 2.8, fvcPredicted: 3.5, fev1: 1.6, fev1Predicted: 2.9, fev1FvcRatio: 57, pef: 280, pefPredicted: 460, fef2575: 1.2, fef2575Predicted: 3.2, tlc: 5.8, tlcPredicted: 5.5, dlco: 18, dlcoPredicted: 22, interpretation: "Moderate obstructive pattern with reduced FEV1/FVC. Suggest bronchodilator reversibility testing.", pattern: "Obstructive", severity: "Moderate" },
  { id: "PFT-002", patientId: "PT-0008", patientName: "Sunita Devi Yadav", date: "2026-06-12", fvc: 2.1, fvcPredicted: 3.2, fev1: 1.8, fev1Predicted: 2.7, fev1FvcRatio: 86, pef: 340, pefPredicted: 420, fef2575: 2.8, fef2575Predicted: 3.0, tlc: 3.8, tlcPredicted: 5.2, interpretation: "Restrictive pattern with reduced TLC. FEV1/FVC normal. Consider ILD workup.", pattern: "Restrictive", severity: "Moderate" },
  { id: "PFT-003", patientId: "PT-0018", patientName: "Arun Kumar", date: "2026-06-14", fvc: 4.2, fvcPredicted: 4.0, fev1: 3.4, fev1Predicted: 3.3, fev1FvcRatio: 81, pef: 510, pefPredicted: 480, fef2575: 3.8, fef2575Predicted: 3.5, interpretation: "Normal spirometry. All values within normal limits.", pattern: "Normal", severity: "Normal" },
];

let pftCounter = seedPFT.length + 1;

const seedABG: ABGResult[] = [
  { id: "ABG-001", patientId: "PT-0007", patientName: "Mohan Lal", date: "2026-06-11T03:00:00", ph: 7.28, pco2: 55, po2: 65, hco3: 24, be: -2, so2: 90, lactate: 1.8, fiO2: 0.28, acidBaseStatus: "Respiratory Acidosis (Acute, Uncompensated)", oxygenation: "Moderate Hypoxemia", interpretation: "Acute respiratory acidosis. pH low, pCO2 high, HCO3 normal (no renal compensation yet). Likely due to pneumonia with CO2 retention. Moderate hypoxemia on 28% FiO2." },
  { id: "ABG-002", patientId: "PT-0015", patientName: "Deepa Venkataraman", date: "2026-06-15T14:00:00", ph: 7.51, pco2: 29, po2: 110, hco3: 22, be: +1, so2: 98, lactate: 0.9, fiO2: 0.21, acidBaseStatus: "Respiratory Alkalosis (Acute)", oxygenation: "Normal", interpretation: "Acute respiratory alkalosis. pH high, pCO2 low, HCO3 normal. Consistent with hyperventilation (anxiety? pain?). Normal oxygenation on room air." },
  { id: "ABG-003", patientId: "PT-0001", patientName: "Anil Kumar Sharma", date: "2026-06-13T08:30:00", ph: 7.35, pco2: 38, po2: 82, hco3: 18, be: -6, so2: 95, lactate: 2.1, fiO2: 0.21, acidBaseStatus: "Metabolic Acidosis (Partially Compensated)", oxygenation: "Normal", interpretation: "Metabolic acidosis with low HCO3 and negative base excess. pCO2 low-normal suggesting partial respiratory compensation. Consider DKA evaluation (lactate mildly elevated)." },
];

let abgCounter = seedABG.length + 1;

function computeSeverity(fev1PercentPredicted: number): PFTResult["severity"] {
  if (fev1PercentPredicted >= 80) return "Normal";
  if (fev1PercentPredicted >= 65) return "Mild";
  if (fev1PercentPredicted >= 50) return "Moderate";
  if (fev1PercentPredicted >= 35) return "Moderately Severe";
  if (fev1PercentPredicted >= 20) return "Severe";
  return "Very Severe";
}

function computePattern(fev1Fvc: number, tlc?: number, tlcPredicted?: number): PFTResult["pattern"] {
  if (fev1Fvc < 70) return "Obstructive";
  if (tlc && tlcPredicted && (tlc / tlcPredicted) < 0.8) return "Restrictive";
  if (fev1Fvc < 70 && tlc && tlcPredicted && (tlc / tlcPredicted) < 0.8) return "Mixed";
  return "Normal";
}

function classifyABG(ph: number, pco2: number, hco3: number, be: number, po2: number): { status: string; oxygenation: string } {
  let status: string;
  if (ph < 7.35) {
    if (pco2 > 45) status = "Respiratory Acidosis";
    else if (hco3 < 22) status = "Metabolic Acidosis";
    else status = "Mixed Acidosis";
  } else if (ph > 7.45) {
    if (pco2 < 35) status = "Respiratory Alkalosis";
    else if (hco3 > 26) status = "Metabolic Alkalosis";
    else status = "Mixed Alkalosis";
  } else status = "Normal";

  const expectedHCO3 = pco2 > 40 ? 24 + (pco2 - 40) * 0.1 : 24 - (40 - pco2) * 0.1;
  const compensation = Math.abs(hco3 - expectedHCO3) > 4 ? " (Partially Compensated)" : Math.abs(ph - 7.4) < 0.03 ? " (Fully Compensated)" : " (Acute, Uncompensated)";
  if (status !== "Normal") status += compensation;

  let oxygenation: string;
  if (po2 >= 80) oxygenation = "Normal";
  else if (po2 >= 60) oxygenation = "Mild Hypoxemia";
  else if (po2 >= 40) oxygenation = "Moderate Hypoxemia";
  else oxygenation = "Severe Hypoxemia";

  return { status, oxygenation };
}

interface PulmonologyStore {
  pftResults: PFTResult[];
  abgResults: ABGResult[];
  addPFT: (r: Omit<PFTResult, "id">) => PFTResult;
  addABG: (r: Omit<ABGResult, "id">) => ABGResult;
  classifyABG: (ph: number, pco2: number, hco3: number, be: number, po2: number) => { status: string; oxygenation: string };
}

export const usePulmonologyStore = create<PulmonologyStore>((set) => ({
  pftResults: seedPFT,
  abgResults: seedABG,
  addPFT(r) {
    const id = `PFT-${String(pftCounter++).padStart(3, "0")}`;
    const rec: PFTResult = { id, ...r };
    set((s) => ({ pftResults: [...s.pftResults, rec] }));
    return rec;
  },
  addABG(r) {
    const id = `ABG-${String(abgCounter++).padStart(3, "0")}`;
    const rec: ABGResult = { id, ...r };
    set((s) => ({ abgResults: [...s.abgResults, rec] }));
    return rec;
  },
  classifyABG(ph, pco2, hco3, be, po2) { return classifyABG(ph, pco2, hco3, be, po2); },
}));
