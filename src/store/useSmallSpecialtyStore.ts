import { create } from "zustand";

// ── ENT: Audiogram ────────────────────────────────────────────────────────────
export interface AudiogramReading { freq: number; dbLeft: number; dbRight: number; } // freq in Hz, db in HL
export interface Audiogram { id: string; patientId: string; patientName: string; date: string; readings: AudiogramReading[]; interpretation: string; }

const seedAudiograms: Audiogram[] = [
  { id: "AUD-001", patientId: "PT-0009", patientName: "Ravi Shankar Iyer", date: "2026-06-10",
    readings: [
      { freq: 250, dbLeft: 20, dbRight: 25 }, { freq: 500, dbLeft: 30, dbRight: 35 },
      { freq: 1000, dbLeft: 45, dbRight: 50 }, { freq: 2000, dbLeft: 55, dbRight: 50 },
      { freq: 4000, dbLeft: 65, dbRight: 60 }, { freq: 8000, dbLeft: 70, dbRight: 65 },
    ], interpretation: "Moderate-to-severe sensorineural hearing loss bilaterally, worse in high frequencies." },
];

// ── Psychiatry ────────────────────────────────────────────────────────────────
export interface MSESection { domain: string; findings: string; normal: boolean; }
export interface MSE { id: string; patientId: string; date: string; sections: MSESection[]; impression: string; }
export interface CSSRS { id: string; patientId: string; date: string; wishToDie: boolean; suicidalThoughts: boolean; method: boolean; intent: boolean; plan: boolean; preparatoryActs: boolean; score: number; }
export interface InvoluntaryHold { id: string; patientId: string; patientName: string; date: string; section: string; grounds: string; expiry: string; status: "Active" | "Expired" | "Revoked"; }

const seedMSE: MSE = { id: "MSE-001", patientId: "PT-0020", date: "2026-06-12",
  sections: [
    { domain: "Appearance & Behavior", findings: "Well-groomed, cooperative, eye contact present", normal: true },
    { domain: "Speech", findings: "Normal rate, rhythm, volume", normal: true },
    { domain: "Mood & Affect", findings: "Anxious, constricted affect", normal: false },
    { domain: "Thought Form", findings: "Linear, goal-directed", normal: true },
    { domain: "Thought Content", findings: "No delusions, no hallucinations", normal: true },
    { domain: "Cognition", findings: "Alert, oriented x3, MMSE 28/30", normal: true },
    { domain: "Insight & Judgment", findings: "Fair insight, intact judgment", normal: true },
  ], impression: "Generalized anxiety disorder. No psychosis or suicidality." };
const seedCSSRS: CSSRS = { id: "CS-001", patientId: "PT-0020", date: "2026-06-12", wishToDie: true, suicidalThoughts: true, method: false, intent: false, plan: false, preparatoryActs: false, score: 2 };
const seedHold: InvoluntaryHold = { id: "IH-001", patientId: "PT-0030", patientName: "Madhuri Kulkarni", date: "2026-06-14", section: "Section 89(1) Mental Healthcare Act 2017", grounds: "Suicidal attempt with intent, psychotic features, unable to care for self", expiry: "2026-06-21", status: "Active" };

// ── Rheumatology ──────────────────────────────────────────────────────────────
export interface DAS28Input { tender28: number; swollen28: number; patientGlobal: number; esr: number; crp?: number; }
export interface DAS28Result { score: number; diseaseActivity: string; remission: boolean; }

function computeDAS28(input: DAS28Input): DAS28Result {
  const score = Math.round((0.56 * Math.sqrt(input.tender28) + 0.28 * Math.sqrt(input.swollen28) + 0.7 * Math.log(input.esr + 1) + 0.014 * input.patientGlobal) * 100) / 100;
  const diseaseActivity = score <= 2.6 ? "Remission" : score <= 3.2 ? "Low" : score <= 5.1 ? "Moderate" : "High";
  return { score, diseaseActivity, remission: score <= 2.6 };
}

// ── Infectious Disease ────────────────────────────────────────────────────────
export interface QSOFA { rr: number; sbp: number; loc: boolean; score: number; }
export interface NEWS { rr: number; spo2: number; o2: boolean; sbp: number; hr: number; loc: boolean; temp: number; score: number; }

function computeQSOFA(rr: number, sbp: number, loc: boolean): QSOFA {
  return { rr, sbp, loc, score: (rr >= 22 ? 1 : 0) + (sbp <= 100 ? 1 : 0) + (loc ? 1 : 0) };
}

function computeNEWS(input: { rr: number; spo2: number; o2: boolean; sbp: number; hr: number; temp: number; loc: boolean }): number {
  let s = 0;
  if (input.rr <= 8 || input.rr >= 25) s += 3; else if (input.rr >= 21) s += 2; else if (input.rr >= 12) s += 0; else s += 1;
  if (input.spo2 <= 91) s += 3; else if (input.spo2 <= 93) s += 2; else if (input.spo2 <= 95) s += 1;
  if (input.o2) s += 2;
  if (input.sbp <= 90 || input.sbp >= 220) s += 3; else if (input.sbp <= 100) s += 2; else if (input.sbp <= 110) s += 1;
  if (input.hr <= 40 || input.hr >= 131) s += 3; else if (input.hr >= 111) s += 2; else if (input.hr >= 91) s += 1;
  if (input.loc) s += 3;
  if (input.temp <= 35) s += 3; else if (input.temp >= 39.1) s += 2; else if (input.temp >= 38.1) s += 1; else if (input.temp >= 36.1) s += 0; else s += 1;
  return s;
}

// ── Urology ───────────────────────────────────────────────────────────────────
export interface IPSSInput { incomplete: number; frequency: number; intermittency: number; urgency: number; weakStream: number; straining: number; nocturia: number; }
export interface IPSSResult { score: number; severity: "Mild" | "Moderate" | "Severe"; qol: number; }

function computeIPSS(i: IPSSInput): IPSSResult {
  const score = i.incomplete + i.frequency + i.intermittency + i.urgency + i.weakStream + i.straining + i.nocturia;
  return { score, severity: score <= 7 ? "Mild" : score <= 19 ? "Moderate" : "Severe", qol: 0 };
}

// ── Orthopedics ───────────────────────────────────────────────────────────────
export interface FractureClassification { bone: string; part: string; type: string; aoCode: string; open: boolean; displacement: "None" | "Minimal" | "Moderate" | "Complete"; }

const FRACTURE_TYPES: FractureClassification[] = [
  { bone: "Femur", part: "Neck", type: "Intracapsular", aoCode: "31-B", open: false, displacement: "Minimal" },
  { bone: "Femur", part: "Intertrochanteric", type: "Extracapsular", aoCode: "31-A", open: false, displacement: "Moderate" },
  { bone: "Tibia", part: "Pilon", type: "Intra-articular", aoCode: "43-C", open: true, displacement: "Complete" },
  { bone: "Ankle", part: "Malleolus", type: "Unimalleolar", aoCode: "44-A", open: false, displacement: "None" },
  { bone: "Radius", part: "Distal", type: "Colles", aoCode: "23-A", open: false, displacement: "Moderate" },
  { bone: "Humerus", part: "Proximal", type: "Neck", aoCode: "11-A", open: false, displacement: "Minimal" },
];

// ── Combined Store ────────────────────────────────────────────────────────────

interface SmallSpecialtyStore {
  audiograms: Audiogram[];
  mseEntries: MSE[];
  cssrsEntries: CSSRS[];
  holds: InvoluntaryHold[];
  computeDAS28: (i: DAS28Input) => DAS28Result;
  computeQSOFA: (rr: number, sbp: number, loc: boolean) => QSOFA;
  computeNEWS: typeof computeNEWS;
  computeIPSS: typeof computeIPSS;
  fractureTypes: typeof FRACTURE_TYPES;
}

export const useSmallSpecialtyStore = create<SmallSpecialtyStore>(() => ({
  audiograms: seedAudiograms,
  mseEntries: [seedMSE],
  cssrsEntries: [seedCSSRS],
  holds: [seedHold],
  computeDAS28,
  computeQSOFA,
  computeNEWS,
  computeIPSS,
  fractureTypes: FRACTURE_TYPES,
}));
