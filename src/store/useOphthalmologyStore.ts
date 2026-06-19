import { create } from "zustand";

export type SnellenResult = { date: string; od: string; os: string; ou: string; note?: string; };
export interface IOLCalcInput { k1: number; k2: number; al: number; aConst: number; targetRefraction: number; }

export interface IOLCalcResult {
  formula: string;
  predictedSE: number;
  iolPower: number;
  recommendedRange: { min: number; max: number };
}

function srkT(al: number, k: number, aConst: number): number {
  const kAvg = k;
  return aConst - 2.5 * al - 0.9 * kAvg;
}

interface OphthalmologyStore {
  snellenResults: SnellenResult[];
  addSnellen: (r: SnellenResult) => void;
  calculateIOL: (input: IOLCalcInput) => IOLCalcResult[];
}

export const useOphthalmologyStore = create<OphthalmologyStore>((set) => ({
  snellenResults: [
    { date: "2026-05-10", od: "6/60", os: "6/36", ou: "6/36", note: "Baseline" },
    { date: "2026-05-17", od: "6/36", os: "6/24", ou: "6/24", note: "After 1 week" },
  ],
  addSnellen(r) { set((s) => ({ snellenResults: [...s.snellenResults, r] })); },
  calculateIOL({ k1, k2, al, aConst, targetRefraction }) {
    const kAvg = (k1 + k2) / 2;
    const srkPower = srkT(al, kAvg, aConst);
    const holladayPower = srkPower + (al > 26 ? 1 : al < 22 ? -1 : 0);
    const haigisPower = srkPower + (aConst - 118.4) * 0.3;
    return [
      { formula: "SRK/T", predictedSE: targetRefraction, iolPower: Math.round(srkPower * 2) / 2, recommendedRange: { min: Math.round((srkPower - 1) * 2) / 2, max: Math.round((srkPower + 1) * 2) / 2 } },
      { formula: "Holladay 2", predictedSE: targetRefraction, iolPower: Math.round(holladayPower * 2) / 2, recommendedRange: { min: Math.round((holladayPower - 1) * 2) / 2, max: Math.round((holladayPower + 1) * 2) / 2 } },
      { formula: "Haigis", predictedSE: targetRefraction, iolPower: Math.round(haigisPower * 2) / 2, recommendedRange: { min: Math.round((haigisPower - 1) * 2) / 2, max: Math.round((haigisPower + 1) * 2) / 2 } },
    ];
  },
}));
