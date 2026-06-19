import { create } from "zustand";

// ── Partograph ────────────────────────────────────────────────────────────────

export interface PartographEntry {
  time: string;
  cervicalDilationCm: number;
  station: number;
  contractionsPer10min: number;
  fhrBaseline: number;
  moulding?: "None" | "+" | "++" | "+++";
  caput?: "None" | "+" | "++" | "+++";
  liquor?: "Clear" | "Meconium" | "Blood-stained";
  oxytocinDrops?: number;
  drugs?: string;
  bp?: string;
  pulse?: number;
  temp?: number;
  urineProtein?: string;
  urineKetones?: string;
  notes?: string;
}

export interface Partograph {
  id: string;
  patientId: string;
  patientName: string;
  admissionDate: string;
  parity: string;
  gestation: string;
  membraneStatus: "Intact" | "Ruptured" | "Artificial Rupture";
  rupturedAt?: string;
  entries: PartographEntry[];
  alertLineStart?: number; // hour index when alert line starts
  actionLineOffset?: number; // hours from alert to action line (default 4)
}

// ── CTG ──────────────────────────────────────────────────────────────────────

export interface CTGReading {
  time: number; // seconds from start
  fhr: number;  // fetal heart rate bpm
  toc: number;  // tocodynamometer (contractions) relative amplitude
}

export interface CTGTrace {
  id: string;
  patientId: string;
  patientName: string;
  startTime: string;
  durationMinutes: number;
  baseline: number;
  variability: "Absent" | "Minimal" | "Moderate" | "Marked";
  accelerations: number;
  decelerations: "None" | "Early" | "Variable" | "Late" | "Prolonged";
  interpretation: "Normal" | "Suspicious" | "Pathological";
  readings: CTGReading[];
  notes?: string;
}

// ── Fetal Growth ──────────────────────────────────────────────────────────────

export type FetalMeasurement = "BPD" | "HC" | "AC" | "FL" | "EFW";

export interface FetalGrowthRecord {
  date: string;
  gestationWeeks: number;
  bpd?: number;  // biparietal diameter mm
  hc?: number;   // head circumference mm
  ac?: number;   // abdominal circumference mm
  fl?: number;   // femur length mm
  efw?: number;  // estimated fetal weight g
  percentiles: Partial<Record<FetalMeasurement, number>>;
  recordedBy: string;
}

// ── Seed Data Helpers ─────────────────────────────────────────────────────────

function randomBetween(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10;
}

function generatePartograph(): Partograph {
  const now = "2026-06-16";
  const entries: PartographEntry[] = [];
  const startDilation = 3;
  const progress = [0, 0.2, 0.5, 0.8, 1.2, 1.8, 2.5, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0, 0]; // cervical change pattern

  for (let h = 0; h < 8; h++) {
    const hr = `${8 + h}`.padStart(2, "0");
    const dilation = Math.min(10, Math.round((startDilation + progress[h]) * 10) / 10);
    const station = Math.max(-3, Math.min(3, Math.round((-3 + h * 0.7) * 10) / 10));
    entries.push({
      time: `${now}T${hr}:00:00`,
      cervicalDilationCm: dilation,
      station,
      contractionsPer10min: Math.round(2 + h * 0.4),
      fhrBaseline: Math.round(130 + Math.random() * 30),
      moulding: dilation < 5 ? "None" : h < 6 ? "+" : "++",
      caput: dilation < 4 ? "None" : h < 5 ? "+" : "++",
      liquor: "Clear",
      oxytocinDrops: h >= 4 ? 10 + (h - 4) * 5 : undefined,
      bp: `${100 + Math.round(Math.random() * 20)}/${60 + Math.round(Math.random() * 10)}`,
      pulse: Math.round(76 + Math.random() * 14),
      temp: Math.round(36.5 + Math.random() * 0.5),
    });
  }
  return { id: "PTG-001", patientId: "PT-0015", patientName: "Deepa Venkataraman", admissionDate: `${now}T08:00:00`, parity: "G2P1L1", gestation: "39+2", membraneStatus: "Intact", entries };
}

function generateCTG(): CTGTrace {
  const readings: CTGReading[] = [];
  for (let s = 0; s < 1200; s += 2) {
    const baseline = 140;
    const decel = s >= 400 && s <= 480 ? -30 : s >= 700 && s <= 780 ? -25 : 0;
    const variability = Math.sin(s * 0.1) * 5 + Math.sin(s * 0.05) * 3;
    const accel = (Math.sin(s * 0.02) > 0.95) ? 15 : 0;
    readings.push({ time: s, fhr: Math.round(baseline + variability + accel + decel), toc: Math.round(Math.max(0, Math.sin(s * 0.05) * 50 + Math.sin(s * 0.03) * 30 + 20)) });
  }
  return {
    id: "CTG-001", patientId: "PT-0015", patientName: "Deepa Venkataraman",
    startTime: "2026-06-16T09:00:00", durationMinutes: 20,
    baseline: 140, variability: "Moderate", accelerations: 3, decelerations: "Early",
    interpretation: "Normal", readings,
    notes: "Reactive tracing. 3 accelerations in 20 min. Early decelerations with contractions. Normal variability.",
  };
}

interface FetalGrowthParams {
  weeks: number;
  bpd: number; hc: number; ac: number; fl: number; efw: number;
  pBpd: number; pHc: number; pAc: number; pFl: number; pEfw: number;
}

function generateFetalGrowth(): FetalGrowthRecord[] {
  const base: FetalGrowthParams[] = [
    { weeks: 20, bpd: 48, hc: 175, ac: 145, fl: 32, efw: 350, pBpd: 55, pHc: 50, pAc: 45, pFl: 60, pEfw: 40 },
    { weeks: 24, bpd: 59, hc: 215, ac: 185, fl: 42, efw: 650, pBpd: 50, pHc: 50, pAc: 50, pFl: 50, pEfw: 50 },
    { weeks: 28, bpd: 70, hc: 255, ac: 230, fl: 52, efw: 1200, pBpd: 50, pHc: 50, pAc: 55, pFl: 50, pEfw: 50 },
    { weeks: 32, bpd: 80, hc: 290, ac: 270, fl: 61, efw: 1900, pBpd: 45, pHc: 50, pAc: 50, pFl: 55, pEfw: 50 },
    { weeks: 36, bpd: 87, hc: 315, ac: 310, fl: 68, efw: 2750, pBpd: 45, pHc: 50, pAc: 50, pFl: 50, pEfw: 50 },
    { weeks: 38, bpd: 90, hc: 325, ac: 330, fl: 71, efw: 3100, pBpd: 40, pHc: 45, pAc: 50, pFl: 50, pEfw: 50 },
    { weeks: 39, bpd: 91, hc: 328, ac: 338, fl: 72, efw: 3350, pBpd: 40, pHc: 45, pAc: 50, pFl: 45, pEfw: 50 },
  ];
  const now = new Date("2026-06-16");
  return base.map((b, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (base.length - 1 - i) * 14);
    return {
      date: d.toISOString().split("T")[0],
      gestationWeeks: b.weeks,
      bpd: b.bpd, hc: b.hc, ac: b.ac, fl: b.fl,
      efw: b.efw,
      percentiles: { BPD: b.pBpd, HC: b.pHc, AC: b.pAc, FL: b.pFl, EFW: b.pEfw },
      recordedBy: "Dr. Ananya Krishnan",
    };
  });
}

interface OBGYNStore {
  partographs: Partograph[];
  ctgTraces: CTGTrace[];
  fetalGrowth: FetalGrowthRecord[];
  activePartograph: string | null;
  setActivePartograph: (id: string | null) => void;
  addPartographEntry: (ptgId: string, entry: PartographEntry) => void;
}

export const useOBGYNStore = create<OBGYNStore>((set, get) => ({
  partographs: [generatePartograph()],
  ctgTraces: [generateCTG()],
  fetalGrowth: generateFetalGrowth(),
  activePartograph: "PTG-001",
  setActivePartograph(id) { set({ activePartograph: id }); },
  addPartographEntry(ptgId, entry) {
    set((s) => ({ partographs: s.partographs.map((p) => p.id === ptgId ? { ...p, entries: [...p.entries, entry] } : p) }));
  },
}));
