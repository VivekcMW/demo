import { create } from "zustand";

export type VaccinationStatus = "Given" | "Due" | "Overdue" | "Scheduled" | "Not Applicable";
export type GrowthMetric = "weight" | "height" | "headCircumference" | "bmi";

export interface Vaccination {
  id: string;
  name: string;
  dueAge: string;
  dueAgeMonths: number;
  dose: string;
  route: string;
  site: string;
  status: VaccinationStatus;
  givenAt?: string;
  givenBy?: string;
  batchNo?: string;
  notes?: string;
}

export interface GrowthRecord {
  date: string;
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  bmi: number;
  recordedBy: string;
}

export interface ChildPatient {
  id: string;
  patientId: string;
  patientName: string;
  dob: string;
  sex: "M" | "F";
  birthWeight: number;
  birthLength: number;
  growthRecords: GrowthRecord[];
  vaccinations: Vaccination[];
}

function monthsAgo(m: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() - m);
  return d.toISOString().split("T")[0];
}

const now = new Date();

const IAP_SCHEDULE: Omit<Vaccination, "id">[] = [
  { name: "BCG", dueAge: "At Birth", dueAgeMonths: 0, dose: "0.05 mL", route: "Intradermal", site: "Left Upper Arm", status: "Given", givenAt: monthsAgo(6), givenBy: "Dr. Sharma", batchNo: "BCG-2401" },
  { name: "Hepatitis B (Birth)", dueAge: "At Birth", dueAgeMonths: 0, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(6), givenBy: "Dr. Sharma", batchNo: "HBV-2308" },
  { name: "OPV (0)", dueAge: "At Birth", dueAgeMonths: 0, dose: "2 drops", route: "Oral", site: "Oral", status: "Given", givenAt: monthsAgo(6), givenBy: "Dr. Sharma", batchNo: "OPV-2307" },
  { name: "DPT (1)", dueAge: "6 weeks", dueAgeMonths: 1.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(4.5), givenBy: "Dr. Sharma", batchNo: "DPT-2311" },
  { name: "IPV (1)", dueAge: "6 weeks", dueAgeMonths: 1.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(4.5), givenBy: "Dr. Sharma", batchNo: "IPV-2309" },
  { name: "Rotavirus (1)", dueAge: "6 weeks", dueAgeMonths: 1.5, dose: "1.5 mL", route: "Oral", site: "Oral", status: "Given", givenAt: monthsAgo(4.5), givenBy: "Dr. Sharma", batchNo: "RV-2312" },
  { name: "PCV (1)", dueAge: "6 weeks", dueAgeMonths: 1.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(4.5), givenBy: "Dr. Sharma", batchNo: "PCV-2402" },
  { name: "DPT (2)", dueAge: "10 weeks", dueAgeMonths: 2.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(3.5), givenBy: "Dr. Sharma", batchNo: "DPT-2311" },
  { name: "IPV (2)", dueAge: "10 weeks", dueAgeMonths: 2.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(3.5), givenBy: "Dr. Sharma", batchNo: "IPV-2401" },
  { name: "Rotavirus (2)", dueAge: "10 weeks", dueAgeMonths: 2.5, dose: "1.5 mL", route: "Oral", site: "Oral", status: "Given", givenAt: monthsAgo(3.5), givenBy: "Dr. Sharma", batchNo: "RV-2312" },
  { name: "PCV (2)", dueAge: "10 weeks", dueAgeMonths: 2.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(3.5), givenBy: "Dr. Sharma", batchNo: "PCV-2402" },
  { name: "DPT (3)", dueAge: "14 weeks", dueAgeMonths: 3.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(2.5), givenBy: "Dr. Sharma", batchNo: "DPT-2311" },
  { name: "IPV (3)", dueAge: "14 weeks", dueAgeMonths: 3.5, dose: "0.5 mL", route: "IM", site: "Anterolateral Thigh", status: "Given", givenAt: monthsAgo(2.5), givenBy: "Dr. Sharma", batchNo: "IPV-2401" },
  { name: "Rotavirus (3)", dueAge: "14 weeks", dueAgeMonths: 3.5, dose: "1.5 mL", route: "Oral", site: "Oral", status: "Given", givenAt: monthsAgo(2.5), givenBy: "Dr. Sharma", batchNo: "RV-2403" },
  { name: "PCV (Booster)", dueAge: "9-12 months", dueAgeMonths: 10, dose: "0.5 mL", route: "IM", site: "Vastus Lateralis", status: "Due" },
  { name: "Measles / MR (1)", dueAge: "9-12 months", dueAgeMonths: 9, dose: "0.5 mL", route: "SC", site: "Right Upper Arm", status: "Due" },
  { name: "JE (1)", dueAge: "9-12 months", dueAgeMonths: 10, dose: "0.5 mL", route: "SC", site: "Left Upper Arm", status: "Due" },
  { name: "DPT (Booster 1)", dueAge: "16-24 months", dueAgeMonths: 18, dose: "0.5 mL", route: "IM", site: "Vastus Lateralis", status: "Scheduled" },
  { name: "OPV (Booster)", dueAge: "16-24 months", dueAgeMonths: 18, dose: "2 drops", route: "Oral", site: "Oral", status: "Scheduled" },
  { name: "Measles / MR (2)", dueAge: "16-24 months", dueAgeMonths: 18, dose: "0.5 mL", route: "SC", site: "Right Upper Arm", status: "Scheduled" },
  { name: "JE (2)", dueAge: "16-24 months", dueAgeMonths: 18, dose: "0.5 mL", route: "SC", site: "Left Upper Arm", status: "Scheduled" },
  { name: "Typhoid (Booster)", dueAge: "2 years", dueAgeMonths: 24, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Scheduled" },
  { name: "Hepatitis A (1)", dueAge: "12-15 months", dueAgeMonths: 13, dose: "0.5 mL", route: "IM", site: "Vastus Lateralis", status: "Scheduled" },
  { name: "Hepatitis A (2)", dueAge: "18-24 months", dueAgeMonths: 20, dose: "0.5 mL", route: "IM", site: "Vastus Lateralis", status: "Scheduled" },
  { name: "DPT (Booster 2)", dueAge: "4-6 years", dueAgeMonths: 60, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Due" },
  { name: "MMR (3)", dueAge: "4-6 years", dueAgeMonths: 60, dose: "0.5 mL", route: "SC", site: "Upper Arm", status: "Due" },
  { name: "HPV (1)", dueAge: "9-14 years (Girls)", dueAgeMonths: 110, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Not Applicable" },
  { name: "HPV (2)", dueAge: "9-14 years (Girls)", dueAgeMonths: 114, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Not Applicable" },
  { name: "Tdap", dueAge: "10-12 years", dueAgeMonths: 130, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Not Applicable" },
  { name: "Typhoid (Repeat)", dueAge: "Every 3 years", dueAgeMonths: 36, dose: "0.5 mL", route: "IM", site: "Deltoid", status: "Not Applicable" },
];

function generateGrowthRecord(ageMonths: number, weightBase: number, heightBase: number, hcBase: number, variation: number): GrowthRecord {
  const d = new Date(now);
  d.setMonth(d.getMonth() - (6 - ageMonths));
  const w = weightBase + (ageMonths * 0.5) + (Math.random() - 0.5) * variation;
  const h = heightBase + (ageMonths * 1.8) + (Math.random() - 0.5) * variation * 0.5;
  const hc = hcBase + (ageMonths * 0.3) + (Math.random() - 0.5) * variation * 0.3;
  return {
    date: d.toISOString().split("T")[0],
    ageMonths: Math.round(ageMonths * 10) / 10,
    weightKg: Math.round(w * 10) / 10,
    heightCm: Math.round(h * 10) / 10,
    headCircumferenceCm: Math.round(hc * 10) / 10,
    bmi: Math.round((w / ((h / 100) ** 2)) * 10) / 10,
    recordedBy: "Dr. Sharma",
  };
}

const seedChildren: ChildPatient[] = [
  {
    id: "CH-0001", patientId: "PT-0010", patientName: "Aarav Sharma", dob: "2025-12-01", sex: "M",
    birthWeight: 3.2, birthLength: 50,
    growthRecords: [0, 1, 2, 3, 4, 5, 6].map((m) => generateGrowthRecord(m, 3.2, 50, 34, 0.4)),
    vaccinations: IAP_SCHEDULE.map((v, i) => ({ id: `VAC-${String(i + 1).padStart(3, "0")}`, ...v })),
  },
  {
    id: "CH-0002", patientId: "PT-0018", patientName: "Priya Nair", dob: "2026-03-15", sex: "F",
    birthWeight: 2.9, birthLength: 48,
    growthRecords: [0, 1, 2, 3].map((m) => generateGrowthRecord(m, 2.9, 48, 33, 0.3)),
    vaccinations: IAP_SCHEDULE.slice(0, 15).map((v, i) => ({ id: `VAC-${String(100 + i + 1).padStart(3, "0")}`, ...v })),
  },
];

let vacCounter = seedChildren.reduce((max, c) => Math.max(max, ...c.vaccinations.map((v) => parseInt(v.id.replace("VAC-", "")))), 0) + 1;
let childCounter = seedChildren.length + 1;

interface PediatricsStore {
  children: ChildPatient[];
  getByPatient: (patientId: string) => ChildPatient | undefined;
  addChild: (c: Omit<ChildPatient, "id">) => ChildPatient;
  addGrowthRecord: (childId: string, rec: GrowthRecord) => void;
  updateVaccination: (childId: string, vacId: string, updates: Partial<Vaccination>) => void;
  getDueVaccinations: (childId: string) => Vaccination[];
}

export const usePediatricsStore = create<PediatricsStore>((set, get) => ({
  children: seedChildren,
  getByPatient(patientId) { return get().children.find((c) => c.patientId === patientId); },
  addChild(c) {
    const id = `CH-${String(childCounter++).padStart(5, "0")}`;
    const child: ChildPatient = { id, ...c };
    set((s) => ({ children: [...s.children, child] }));
    return child;
  },
  addGrowthRecord(childId, rec) {
    set((s) => ({ children: s.children.map((c) => c.id === childId ? { ...c, growthRecords: [...c.growthRecords, rec] } : c) }));
  },
  updateVaccination(childId, vacId, updates) {
    set((s) => ({ children: s.children.map((c) => c.id === childId ? { ...c, vaccinations: c.vaccinations.map((v) => v.id === vacId ? { ...v, ...updates } : v) } : c) }));
  },
  getDueVaccinations(childId) {
    const c = get().children.find((ch) => ch.id === childId);
    if (!c) return [];
    const ageMonths = (now.getTime() - new Date(c.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.44);
    return c.vaccinations.filter((v) => v.status === "Due" || v.status === "Overdue" || (v.status === "Scheduled" && v.dueAgeMonths <= ageMonths));
  },
}));
