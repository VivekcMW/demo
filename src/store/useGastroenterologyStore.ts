import { create } from "zustand";

export interface EndoscopyReport {
  id: string; patientId: string; patientName: string; date: string; procedure: "EGD" | "Colonoscopy" | "ERCP" | "Sigmoidoscopy" | "Enteroscopy";
  indication: string; sedation: string; findings: string; biopsy: boolean; biopsySites?: string;
  polyps: number; polypectomy: boolean; polypDetails?: string; complications?: string; conclusion: string; followUp: string; endoscopist: string;
}

export interface IBDScore {
  id: string; patientId: string; patientName: string; date: string;
  type: "Crohn's Disease (CDAI)" | "Ulcerative Colitis (Mayo)";
  score: number; severity: "Remission" | "Mild" | "Moderate" | "Severe";
}

const seedEndoscopy: EndoscopyReport[] = [
  { id: "ENDO-001", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", date: "2026-06-05", procedure: "EGD", indication: "Epigastric pain, reflux, ? gastritis", sedation: "Midazolam 3mg + Fentanyl 50mcg", findings: "LA Grade B esophagitis. Erythematous antral gastritis. Duodenal bulb normal.", biopsy: true, biopsySites: "Antrum (2), Duodenum (2)", polyps: 0, polypectomy: false, conclusion: "Reflux esophagitis with chronic antral gastritis. Await H. pylori biopsy result.", followUp: "PPI 8 weeks. Repeat scope if symptoms persist.", endoscopist: "Dr. Nandini Rao" },
  { id: "ENDO-002", patientId: "PT-0010", patientName: "Shiv Shankar Yadav", date: "2026-06-10", procedure: "Colonoscopy", indication: "Hematochezia, ? colonic polyp screening", sedation: "Propofol 80mg", findings: "Good prep (Boston 8/9). 2 sessile polyps in sigmoid (5mm, 8mm) removed by cold snare. Diverticulosis noted.", biopsy: true, biopsySites: "Sigmoid polyps (2)", polyps: 2, polypectomy: true, polypDetails: "2 sigmoid polyps — 5mm tubular adenoma, 8mm tubulovillous adenoma", conclusion: "Tubulovillous adenoma (8mm) – low grade dysplasia. Complete resection.", followUp: "Repeat colonoscopy in 3 years.", endoscopist: "Dr. Nandini Rao" },
];

const seedIBD: IBDScore[] = [
  { id: "IBD-001", patientId: "PT-0012", patientName: "Kavita Menon", date: "2026-05-01", type: "Ulcerative Colitis (Mayo)", score: 7, severity: "Moderate" },
  { id: "IBD-002", patientId: "PT-0012", patientName: "Kavita Menon", date: "2026-06-01", type: "Ulcerative Colitis (Mayo)", score: 4, severity: "Mild" },
  { id: "IBD-003", patientId: "PT-0012", patientName: "Kavita Menon", date: "2026-06-15", type: "Ulcerative Colitis (Mayo)", score: 2, severity: "Remission" },
];

interface GastroenterologyStore {
  endoscopyReports: EndoscopyReport[]; ibdScores: IBDScore[];
  addEndoscopy: (r: Omit<EndoscopyReport, "id">) => void; addIBD: (r: Omit<IBDScore, "id">) => void;
  computeMayo: (stoolFreq: number, rectalBleeding: number, mucosa: number, physician: number) => { score: number; severity: string };
  computeCDAI: (stoolCount: number, abPain: number, wellBeing: number, extraIntestinal: number, mass: number, hct: number, weight: number) => number;
}
export const useGastroenterologyStore = create<GastroenterologyStore>((set) => ({
  endoscopyReports: seedEndoscopy, ibdScores: seedIBD,
  addEndoscopy(r) { const id = `ENDO-${String(seedEndoscopy.length + 1).padStart(3, "0")}`; set((s) => ({ endoscopyReports: [...s.endoscopyReports, { id, ...r }] })); },
  addIBD(r) { const id = `IBD-${String(seedIBD.length + 1).padStart(3, "0")}`; set((s) => ({ ibdScores: [...s.ibdScores, { id, ...r }] })); },
  computeMayo(stoolFreq, rectalBleeding, mucosa, physician) {
    const score = stoolFreq + rectalBleeding + mucosa + physician;
    const severity = score <= 2 ? "Remission" : score <= 5 ? "Mild" : score <= 7 ? "Moderate" : "Severe";
    return { score, severity };
  },
  computeCDAI(stoolCount, abPain, wellBeing, extraIntestinal, mass, hct, weight) {
    return stoolCount * 2 + abPain * 5 + wellBeing * 7 + extraIntestinal * 10 + mass * 10 + (hct > 42 ? 0 : 42 - hct) * 6 + weight * 1;
  },
}));
