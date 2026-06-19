import { create } from "zustand";

export interface DialysisSession {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  preWeight: number;
  postWeight: number;
  ufTarget: number;
  ufAchieved: number;
  preBp: string;
  postBp: string;
  prePulse: number;
  postPulse: number;
  accessType: "AV Fistula" | "AV Graft" | "Tunneled Catheter" | "Non-tunneled Catheter";
  accessSite: string;
  heparinDose: number;
  dialyzer: string;
  dialysateK: number;
  dialysateCa: number;
  dialysateNa: number;
  dialysateTemp: number;
  qb: number;
  qd: number;
  durationMinutes: number;
  complications?: string;
  nurse: string;
  status: "Completed" | "In Progress" | "Scheduled" | "Cancelled";
  preUrea?: number;
  postUrea?: number;
  ktv?: number;
  urr?: number;
}

export interface CKDStage {
  date: string;
  egfr: number;
  creatinine: number;
  stage: number;
  stageLabel: string;
  albuminuria?: "A1" | "A2" | "A3";
}

function computeCKDStage(egfr: number): { stage: number; label: string } {
  if (egfr >= 90) return { stage: 1, label: "1" };
  if (egfr >= 60) return { stage: 2, label: "2" };
  if (egfr >= 45) return { stage: 3, label: "3a" };
  if (egfr >= 30) return { stage: 3, label: "3b" };
  if (egfr >= 15) return { stage: 4, label: "4" };
  return { stage: 5, label: "5" };
}

function computeKtV(preUrea: number, postUrea: number, preWeight: number, postWeight: number): number {
  const rr = postUrea / preUrea;
  const uf = (preWeight - postWeight) / postWeight;
  return -Math.log(rr - 0.008) + (4 - 3.5 * rr) * uf;
}

const seedDialysis: DialysisSession[] = [
  { id: "HD-001", patientId: "PT-0010", patientName: "Shiv Shankar Yadav", date: "2026-06-10", preWeight: 72.5, postWeight: 69.8, ufTarget: 3.0, ufAchieved: 2.7, preBp: "158/92", postBp: "132/78", prePulse: 84, postPulse: 76, accessType: "AV Fistula", accessSite: "Left Forearm (Radiocephalic)", heparinDose: 3000, dialyzer: "Fresenius FX80", dialysateK: 2.0, dialysateCa: 1.5, dialysateNa: 138, dialysateTemp: 36.5, qb: 350, qd: 500, durationMinutes: 240, nurse: "Nurse Radhika", status: "Completed", preUrea: 128, postUrea: 42, ktv: 1.4, urr: 67 },
  { id: "HD-002", patientId: "PT-0010", patientName: "Shiv Shankar Yadav", date: "2026-06-12", preWeight: 73.1, postWeight: 70.0, ufTarget: 3.5, ufAchieved: 3.1, preBp: "152/88", postBp: "128/74", prePulse: 80, postPulse: 72, accessType: "AV Fistula", accessSite: "Left Forearm (Radiocephalic)", heparinDose: 3500, dialyzer: "Fresenius FX80", dialysateK: 2.0, dialysateCa: 1.5, dialysateNa: 138, dialysateTemp: 36.5, qb: 350, qd: 500, durationMinutes: 240, complications: "Mild hypotension mid-session, responded to NS bolus", nurse: "Nurse Deepa", status: "Completed", preUrea: 135, postUrea: 45, ktv: 1.35, urr: 67 },
  { id: "HD-003", patientId: "PT-0010", patientName: "Shiv Shankar Yadav", date: "2026-06-14", preWeight: 72.8, postWeight: 69.5, ufTarget: 3.2, ufAchieved: 3.3, preBp: "148/86", postBp: "130/76", prePulse: 82, postPulse: 74, accessType: "AV Fistula", accessSite: "Left Forearm (Radiocephalic)", heparinDose: 3500, dialyzer: "Fresenius FX80", dialysateK: 2.0, dialysateCa: 1.5, dialysateNa: 138, dialysateTemp: 36.5, qb: 350, qd: 500, durationMinutes: 240, nurse: "Nurse Radhika", status: "Scheduled" },
  { id: "HD-004", patientId: "PT-0022", patientName: "Ramanathan Krishnan", date: "2026-06-11", preWeight: 68.2, postWeight: 65.9, ufTarget: 2.5, ufAchieved: 2.3, preBp: "162/94", postBp: "138/80", prePulse: 88, postPulse: 78, accessType: "Tunneled Catheter", accessSite: "Right IJV", heparinDose: 2500, dialyzer: "Fresenius FX60", dialysateK: 2.5, dialysateCa: 1.5, dialysateNa: 138, dialysateTemp: 36.5, qb: 300, qd: 500, durationMinutes: 240, nurse: "Nurse Deepa", status: "Completed", preUrea: 118, postUrea: 38, ktv: 1.38, urr: 68 },
  { id: "HD-005", patientId: "PT-0022", patientName: "Ramanathan Krishnan", date: "2026-06-14", preWeight: 68.8, postWeight: 66.0, ufTarget: 3.0, ufAchieved: 2.8, preBp: "158/90", postBp: "134/78", prePulse: 86, postPulse: 76, accessType: "Tunneled Catheter", accessSite: "Right IJV", heparinDose: 3000, dialyzer: "Fresenius FX60", dialysateK: 2.5, dialysateCa: 1.5, dialysateNa: 138, dialysateTemp: 36.5, qb: 300, qd: 500, durationMinutes: 240, complications: "Catheter flow issues — repositioned patient", nurse: "Nurse Radhika", status: "Scheduled" },
];

const seedCKD: CKDStage[] = [
  { date: "2024-12-10", egfr: 52, creatinine: 1.6, stage: 3, stageLabel: "3a", albuminuria: "A2" },
  { date: "2025-03-15", egfr: 48, creatinine: 1.7, stage: 3, stageLabel: "3b", albuminuria: "A2" },
  { date: "2025-06-20", egfr: 38, creatinine: 2.0, stage: 3, stageLabel: "3b", albuminuria: "A2" },
  { date: "2025-09-18", egfr: 29, creatinine: 2.4, stage: 4, stageLabel: "4", albuminuria: "A3" },
  { date: "2025-12-22", egfr: 18, creatinine: 3.2, stage: 4, stageLabel: "4", albuminuria: "A3" },
  { date: "2026-03-10", egfr: 12, creatinine: 4.1, stage: 5, stageLabel: "5", albuminuria: "A3" },
  { date: "2026-06-08", egfr: 8, creatinine: 5.8, stage: 5, stageLabel: "5", albuminuria: "A3" },
];

let dialCounter = seedDialysis.length + 1;

interface NephrologyStore {
  dialysisSessions: DialysisSession[];
  ckdStages: CKDStage[];
  addDialysisSession: (s: Omit<DialysisSession, "id">) => DialysisSession;
  updateDialysisSession: (id: string, updates: Partial<DialysisSession>) => void;
}

export const useNephrologyStore = create<NephrologyStore>((set) => ({
  dialysisSessions: seedDialysis,
  ckdStages: seedCKD,
  addDialysisSession(s) {
    const id = `HD-${String(dialCounter++).padStart(3, "0")}`;
    const ses: DialysisSession = { id, ...s };
    set((st) => ({ dialysisSessions: [...st.dialysisSessions, ses] }));
    return ses;
  },
  updateDialysisSession(id, updates) {
    set((st) => ({ dialysisSessions: st.dialysisSessions.map((s) => s.id === id ? { ...s, ...updates } : s) }));
  },
}));
