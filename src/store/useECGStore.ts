import { create } from "zustand";

export type LeadName = "I" | "II" | "III" | "aVR" | "aVL" | "aVF" | "V1" | "V2" | "V3" | "V4" | "V5" | "V6";

export interface ECGInterpretation {
  rate: number;
  rhythm: string;
  prInterval: number;
  qrsDuration: number;
  qtInterval: number;
  qtc: number;
  axis: number;
  axisClassification: string;
  summary: string;
  findings: string[];
}

export interface ECGRecord {
  id: string;
  patientId: string;
  patientName: string;
  recordedAt: string;
  recordedBy: string;
  leads: Record<LeadName, number[]>;
  interpretation: ECGInterpretation;
  machineId?: string;
  filterSettings?: string;
  speed: number;
  gain: number;
}

function gaussian(x: number, mean: number, sigma: number): number {
  return Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2));
}

function generateLeadWaveform(
  duration: number,
  sampleRate: number,
  rr: number,
  pAmp: number,
  qAmp: number,
  rAmp: number,
  sAmp: number,
  tAmp: number,
  pWidth: number,
  qrsWidth: number,
  tWidth: number,
): number[] {
  const n = Math.floor(duration * sampleRate);
  const waveform = new Array(n).fill(0);
  const totalCycles = Math.floor(duration / rr);

  for (let c = 0; c < totalCycles; c++) {
    const offset = c * rr * sampleRate;
    const prSeg = 0.16 * sampleRate;
    const pPeak = 0.08 * sampleRate;
    const qrsStart = (0.2 * sampleRate);
    const qPeak = 0.01 * sampleRate;
    const rPeak = 0.04 * sampleRate;
    const sPeak = 0.06 * sampleRate;
    const tStart = 0.3 * sampleRate;
    const tPeak = 0.38 * sampleRate;

    for (let i = 0; i < n; i++) {
      const t = i - offset;
      if (t < 0 || t >= rr * sampleRate) continue;
      const p = pAmp * gaussian(t, pPeak, pWidth * sampleRate);
      const q = qAmp * gaussian(t, qrsStart + qPeak, 0.01 * sampleRate);
      const r = rAmp * gaussian(t, qrsStart + rPeak, 0.015 * sampleRate);
      const s = sAmp * gaussian(t, qrsStart + sPeak, 0.015 * sampleRate);
      const tVal = tAmp * gaussian(t, tPeak, tWidth * sampleRate);
      waveform[i] += p + q + r + s + tVal;
    }
  }

  const max = Math.max(...waveform.map(Math.abs));
  if (max > 0) for (let i = 0; i < n; i++) waveform[i] /= max;
  return waveform;
}

interface LeadParams { pAmp: number; qAmp: number; rAmp: number; sAmp: number; tAmp: number; pWidth: number; qrsWidth: number; tWidth: number; }

const NORMAL_SINUS: Record<LeadName, LeadParams> = {
  I:   { pAmp: 0.12, qAmp: -0.02, rAmp: 0.8,  sAmp: -0.05, tAmp: 0.25, pWidth: 0.10, qrsWidth: 0.08, tWidth: 0.18 },
  II:  { pAmp: 0.20, qAmp: -0.03, rAmp: 1.0,  sAmp: -0.05, tAmp: 0.35, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
  III: { pAmp: 0.08, qAmp: -0.05, rAmp: 0.3,  sAmp: -0.12, tAmp: 0.12, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
  aVR: { pAmp: -0.14, qAmp: 0.01, rAmp: -0.05, sAmp: 0.02, tAmp: -0.25, pWidth: 0.10, qrsWidth: 0.08, tWidth: 0.18 },
  aVL: { pAmp: 0.05, qAmp: -0.03, rAmp: 0.5,  sAmp: -0.08, tAmp: 0.12, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
  aVF: { pAmp: 0.14, qAmp: -0.04, rAmp: 0.7,  sAmp: -0.10, tAmp: 0.25, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
  V1:  { pAmp: 0.06, qAmp: 0,   rAmp: 0.3,  sAmp: -0.50, tAmp: -0.10, pWidth: 0.11, qrsWidth: 0.10, tWidth: 0.18, },
  V2:  { pAmp: 0.08, qAmp: 0,   rAmp: 0.6,  sAmp: -0.60, tAmp: 0.10, pWidth: 0.11, qrsWidth: 0.10, tWidth: 0.18 },
  V3:  { pAmp: 0.10, qAmp: 0,   rAmp: 0.8,  sAmp: -0.40, tAmp: 0.18, pWidth: 0.11, qrsWidth: 0.09, tWidth: 0.18 },
  V4:  { pAmp: 0.12, qAmp: -0.02, rAmp: 1.2,  sAmp: -0.20, tAmp: 0.30, pWidth: 0.11, qrsWidth: 0.09, tWidth: 0.18 },
  V5:  { pAmp: 0.12, qAmp: -0.03, rAmp: 1.0,  sAmp: -0.10, tAmp: 0.28, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
  V6:  { pAmp: 0.10, qAmp: -0.02, rAmp: 0.7,  sAmp: -0.05, tAmp: 0.22, pWidth: 0.11, qrsWidth: 0.08, tWidth: 0.18 },
};

const ALL_LEADS: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

function generateECG(params: Record<LeadName, LeadParams>, hr: number): Record<LeadName, number[]> {
  const duration = 10; const sr = 500; const rr = 60 / hr;
  const leads: Partial<Record<LeadName, number[]>> = {};
  for (const lead of ALL_LEADS) leads[lead] = generateLeadWaveform(duration, sr, rr, params[lead].pAmp, params[lead].qAmp, params[lead].rAmp, params[lead].sAmp, params[lead].tAmp, params[lead].pWidth, params[lead].qrsWidth, params[lead].tWidth);
  return leads as Record<LeadName, number[]>;
}

function round(v: number, d: number = 1) { return Math.round(v * 10 ** d) / 10 ** d; }

let recCounter = 1;

const seedECGs: ECGRecord[] = (() => {
  const now = "2026-06-16T10:30:00";
  return [
    {
      id: "ECG-001", patientId: "PT-0001", patientName: "Anil Kumar Sharma", recordedAt: now, recordedBy: "Dr. Priya Mehta",
      leads: generateECG(NORMAL_SINUS, 72),
      speed: 25, gain: 10,
      interpretation: {
        rate: 72, rhythm: "Normal Sinus Rhythm", prInterval: 160, qrsDuration: 88, qtInterval: 380, qtc: round(380 / Math.sqrt(60 / 72)), axis: 45, axisClassification: "Normal Axis",
        summary: "Normal ECG. Normal sinus rhythm at 72 bpm. Normal axis. No ST-T changes.",
        findings: ["Normal sinus rhythm", "Normal PR interval (160 ms)", "Narrow QRS (88 ms)", "Normal QTc (calculated)", "Normal axis (+45°)", "No significant ST-T wave abnormalities"],
      },
    },
    {
      id: "ECG-002", patientId: "PT-0002", patientName: "Priya Venkatesh", recordedAt: "2026-06-15T14:15:00", recordedBy: "Dr. Ramesh Gupta",
      leads: (() => {
        const p = JSON.parse(JSON.stringify(NORMAL_SINUS)) as Record<LeadName, LeadParams>;
        p.II.rAmp = 1.5; p.III.rAmp = 0.9; p.aVF.rAmp = 1.2; p.V5.rAmp = 1.6; p.V6.rAmp = 1.2;
        p.V1.rAmp = 0.8; p.V2.rAmp = 1.2; p.V3.rAmp = 1.5; p.V4.rAmp = 1.8;
        return generateECG(p, 88);
      })(),
      speed: 25, gain: 10,
      interpretation: {
        rate: 88, rhythm: "Sinus Tachycardia", prInterval: 150, qrsDuration: 92, qtInterval: 340, qtc: round(340 / Math.sqrt(60 / 88)), axis: 60, axisClassification: "Normal Axis",
        summary: "Sinus tachycardia at 88 bpm. Left ventricular hypertrophy voltage criteria (Sokolow-Lyon). Normal axis. No ischemic changes.",
        findings: ["Sinus tachycardia at 88 bpm", "Normal PR interval (150 ms)", "LVH by voltage criteria (Sokolow-Lyon > 35 mm)", "Normal QTc", "Normal axis (+60°)", "No ST-T changes"],
      },
    },
    {
      id: "ECG-003", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", recordedAt: "2026-06-14T09:45:00", recordedBy: "Dr. Suresh Nair",
      leads: (() => {
        const p = JSON.parse(JSON.stringify(NORMAL_SINUS)) as Record<LeadName, LeadParams>;
        p.I.rAmp = 0.6; p.aVL.rAmp = 0.4; p.V1.rAmp = 0.15; p.V2.rAmp = 0.3;
        return generateECG(p, 58);
      })(),
      speed: 25, gain: 10,
      interpretation: {
        rate: 58, rhythm: "Sinus Bradycardia", prInterval: 180, qrsDuration: 90, qtInterval: 420, qtc: round(420 / Math.sqrt(60 / 58)), axis: 30, axisClassification: "Normal Axis",
        summary: "Sinus bradycardia at 58 bpm. Normal QTc. No ischemic changes. Consider if asymptomatic.",
        findings: ["Sinus bradycardia at 58 bpm", "Normal PR interval (180 ms)", "Narrow QRS (90 ms)", "Normal QTc (413 ms)", "Normal axis (+30°)", "No ST-T changes"],
      },
    },
  ];
})();

interface ECGStore {
  records: ECGRecord[];
  getByPatient: (patientId: string) => ECGRecord[];
  addRecord: (rec: Omit<ECGRecord, "id">) => ECGRecord;
}

export const useECGStore = create<ECGStore>((set, get) => ({
  records: seedECGs,
  getByPatient(patientId) { return get().records.filter((r) => r.patientId === patientId); },
  addRecord(rec) {
    const id = `ECG-${String(recCounter++).padStart(3, "0")}`;
    const r = { id, ...rec };
    set((s) => ({ records: [...s.records, r] }));
    return r;
  },
}));
