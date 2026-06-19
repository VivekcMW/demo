import { create } from "zustand";

export interface ChemoRegimen { id: string; name: string; cycles: number; frequencyWeeks: number; drugs: { name: string; dose: string; route: string; frequency: string }[]; }
export interface ChemoPlan { id: string; patientId: string; patientName: string; regimenId: string; diagnosis: string; startDate: string; currentCycle: number; totalCycles: number; status: "Active" | "Completed" | "Delayed" | "Halted"; }
export interface CTCAEEntry { id: string; patientId: string; date: string; term: string; grade: 1|2|3|4|5; attribution: "Unrelated"|"Unlikely"|"Possible"|"Probable"|"Definite"; action: "None"|"Dose Reduced"|"Held"|"Discontinued"; resolved: boolean; }
export interface RECISTLesion { id: string; site: string; date: string; longestDiameter: number; target: boolean; response?: "CR"|"PR"|"SD"|"PD"; }

const seedRegimens: ChemoRegimen[] = [
  { id: "CHEMO-R-001", name: "CHOP (R-CHOP)", cycles: 6, frequencyWeeks: 3, drugs: [{ name: "Rituximab", dose: "375 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Cyclophosphamide", dose: "750 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Doxorubicin", dose: "50 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Vincristine", dose: "1.4 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Prednisolone", dose: "100 mg", route: "Oral", frequency: "Day 1-5" }] },
  { id: "CHEMO-R-002", name: "FOLFOX-6", cycles: 12, frequencyWeeks: 2, drugs: [{ name: "Oxaliplatin", dose: "85 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Leucovorin", dose: "400 mg/m²", route: "IV", frequency: "Day 1" }, { name: "5-FU Bolus", dose: "400 mg/m²", route: "IV", frequency: "Day 1" }, { name: "5-FU Infusion", dose: "2400 mg/m²", route: "IV", frequency: "46h CI" }] },
  { id: "CHEMO-R-003", name: "Paclitaxel + Carboplatin (Triple Negative Breast)", cycles: 6, frequencyWeeks: 3, drugs: [{ name: "Paclitaxel", dose: "175 mg/m²", route: "IV", frequency: "Day 1" }, { name: "Carboplatin", dose: "AUC 5-6", route: "IV", frequency: "Day 1" }] },
  { id: "CHEMO-R-004", name: "ABVD (Hodgkin's)", cycles: 6, frequencyWeeks: 2, drugs: [{ name: "Doxorubicin", dose: "25 mg/m²", route: "IV", frequency: "Day 1, 15" }, { name: "Bleomycin", dose: "10 U/m²", route: "IV", frequency: "Day 1, 15" }, { name: "Vinblastine", dose: "6 mg/m²", route: "IV", frequency: "Day 1, 15" }, { name: "Dacarbazine", dose: "375 mg/m²", route: "IV", frequency: "Day 1, 15" }] },
];

const seedPlans: ChemoPlan[] = [
  { id: "CP-001", patientId: "PT-0025", patientName: "Lakshmi Narayanan", regimenId: "CHEMO-R-001", diagnosis: "Diffuse Large B-cell Lymphoma", startDate: "2026-04-15", currentCycle: 4, totalCycles: 6, status: "Active" },
  { id: "CP-002", patientId: "PT-0028", patientName: "Gopalakrishnan Nair", regimenId: "CHEMO-R-002", diagnosis: "Stage III Colon Cancer", startDate: "2026-05-01", currentCycle: 5, totalCycles: 12, status: "Active" },
];

const seedCTCAE: CTCAEEntry[] = [
  { id: "CTC-001", patientId: "PT-0025", date: "2026-05-10", term: "Nausea", grade: 2, attribution: "Probable", action: "None", resolved: true },
  { id: "CTC-002", patientId: "PT-0025", date: "2026-05-25", term: "Febrile Neutropenia", grade: 3, attribution: "Definite", action: "Held", resolved: true },
  { id: "CTC-003", patientId: "PT-0025", date: "2026-06-08", term: "Peripheral Neuropathy (Motor)", grade: 2, attribution: "Possible", action: "Dose Reduced", resolved: false },
  { id: "CTC-004", patientId: "PT-0028", date: "2026-05-20", term: "Diarrhea", grade: 2, attribution: "Probable", action: "None", resolved: true },
  { id: "CTC-005", patientId: "PT-0028", date: "2026-06-05", term: "Fatigue", grade: 2, attribution: "Possible", action: "None", resolved: false },
];

const seedLesions: RECISTLesion[] = [
  { id: "L-001", site: "Liver Segment IV", date: "2026-04-10", longestDiameter: 48, target: true },
  { id: "L-002", site: "Liver Segment VIII", date: "2026-04-10", longestDiameter: 32, target: true },
  { id: "L-003", site: "Retroperitoneal LN", date: "2026-04-10", longestDiameter: 22, target: true },
  { id: "L-004", site: "Liver Segment IV", date: "2026-06-10", longestDiameter: 28, target: true, response: "PR" },
  { id: "L-005", site: "Liver Segment VIII", date: "2026-06-10", longestDiameter: 18, target: true, response: "PR" },
  { id: "L-006", site: "Retroperitoneal LN", date: "2026-06-10", longestDiameter: 15, target: true, response: "SD" },
];

interface OncologyStore {
  regimens: ChemoRegimen[]; plans: ChemoPlan[]; ctcaeEntries: CTCAEEntry[]; recistLesions: RECISTLesion[];
  addCTCAE: (e: Omit<CTCAEEntry, "id">) => void; addLesion: (l: Omit<RECISTLesion, "id">) => void;
}
export const useOncologyStore = create<OncologyStore>((set) => ({
  regimens: seedRegimens, plans: seedPlans, ctcaeEntries: seedCTCAE, recistLesions: seedLesions,
  addCTCAE(e) { const id = `CTC-${String(seedCTCAE.length + 1).padStart(3, "0")}`; set((s) => ({ ctcaeEntries: [...s.ctcaeEntries, { id, ...e }] })); },
  addLesion(l) { const id = `L-${String(seedLesions.length + 1).padStart(3, "0")}`; set((s) => ({ recistLesions: [...s.recistLesions, { id, ...l }] })); },
}));
