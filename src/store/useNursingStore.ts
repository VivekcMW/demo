import { create } from "zustand";
import { useOrderStore } from "./useOrderStore";

// ── Types ────────────────────────────────────────────────────────────────────

export interface VitalsRecord {
  id: string;
  admissionId: string;
  recordedAt: string;
  recordedBy: string;
  bp: string;
  pulse: number;
  spo2: number;
  temp: number;
  rr: number;
  weight?: number;
  painScore?: number;
  notes?: string;
}

export interface MedAdminRecord {
  id: string;
  admissionId: string;
  orderId?: string;
  drug: string;
  dose: string;
  route: string;
  scheduledAt: string;
  administeredAt?: string;
  administeredBy?: string;
  status: "Scheduled" | "Given" | "Missed" | "Refused" | "Held";
  notes?: string;
}

export interface IntakeOutputRecord {
  id: string;
  admissionId: string;
  recordedAt: string;
  recordedBy: string;
  shift: "Morning" | "Evening" | "Night";
  intakeOral?: number;
  intakeIV?: number;
  intakeFeed?: number;
  outputUrine?: number;
  outputStool?: number;
  outputDrain?: number;
  outputVomit?: number;
  notes?: string;
}

export interface NursingAssessment {
  id: string;
  admissionId: string;
  assessedAt: string;
  assessedBy: string;
  type: "Admission" | "Daily" | "Shift";
  consciousness: "Alert" | "Drowsy" | "Confused" | "Unresponsive";
  mobility: "Independent" | "Assistance" | "Bedridden";
  fallRisk: number;
  fallRiskLevel: "Low" | "Moderate" | "High";
  bradenScore: number;
  bradenRisk: "None" | "Mild" | "Moderate" | "Severe";
  painScore: number;
  nutritionalStatus: "Good" | "Fair" | "Poor";
  skinCondition: "Intact" | "Rash" | "Wound" | "Pressure Ulcer";
  allergies: string[];
  notes?: string;
}

export interface SBARHandoff {
  id: string;
  admissionId: string;
  createdAt: string;
  createdBy: string;
  shift: "Morning" | "Evening" | "Night";
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  completed: boolean;
}

export interface NursingTask {
  id: string;
  admissionId: string;
  orderId?: string;
  task: string;
  dueAt: string;
  priority: "Routine" | "Urgent" | "STAT";
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  assignedTo?: string;
  completedAt?: string;
  completedBy?: string;
  notes?: string;
}

// ── Seed data ─────────────────────────────────────────────────────────────────

const now = "2026-06-10T10:00:00";

const seedVitals: VitalsRecord[] = [
  { id: "VT-001", admissionId: "ADM-0001", recordedAt: "2026-06-10T06:00:00", recordedBy: "Nurse Radhika", bp: "138/86", pulse: 80, spo2: 97, temp: 36.8, rr: 18 },
  { id: "VT-002", admissionId: "ADM-0001", recordedAt: "2026-06-10T10:00:00", recordedBy: "Nurse Radhika", bp: "136/84", pulse: 78, spo2: 98, temp: 36.9, rr: 17, painScore: 2 },
  { id: "VT-003", admissionId: "ADM-0001", recordedAt: "2026-06-10T14:00:00", recordedBy: "Nurse Priya",   bp: "134/82", pulse: 76, spo2: 98, temp: 36.7, rr: 16, weight: 82 },
  { id: "VT-004", admissionId: "ADM-0002", recordedAt: "2026-06-10T06:00:00", recordedBy: "Nurse Deepa",   bp: "188/118", pulse: 98, spo2: 96, temp: 37.0, rr: 20, painScore: 4 },
  { id: "VT-005", admissionId: "ADM-0002", recordedAt: "2026-06-10T08:00:00", recordedBy: "Nurse Deepa",   bp: "168/102", pulse: 92, spo2: 97, temp: 36.9, rr: 18 },
  { id: "VT-006", admissionId: "ADM-0002", recordedAt: "2026-06-10T10:00:00", recordedBy: "Nurse Deepa",   bp: "152/94", pulse: 88, spo2: 98, temp: 36.8, rr: 17 },
];

const seedMedAdmin: MedAdminRecord[] = [
  { id: "MA-001", admissionId: "ADM-0001", orderId: "ORD-0001", drug: "Metformin 500mg", dose: "500mg", route: "Oral", scheduledAt: "2026-06-10T08:00:00", administeredAt: "2026-06-10T08:15:00", administeredBy: "Nurse Radhika", status: "Given" },
  { id: "MA-002", admissionId: "ADM-0001", orderId: "ORD-0001", drug: "Metformin 500mg", dose: "500mg", route: "Oral", scheduledAt: "2026-06-10T20:00:00", status: "Scheduled" },
  { id: "MA-003", admissionId: "ADM-0001", drug: "Telmisartan 40mg", dose: "40mg", route: "Oral", scheduledAt: "2026-06-10T08:00:00", administeredAt: "2026-06-10T08:10:00", administeredBy: "Nurse Radhika", status: "Given" },
  { id: "MA-004", admissionId: "ADM-0001", drug: "Atorvastatin 20mg", dose: "20mg", route: "Oral", scheduledAt: "2026-06-10T21:00:00", status: "Scheduled" },
  { id: "MA-005", admissionId: "ADM-0002", drug: "IV Labetalol 20mg", dose: "20mg", route: "IV", scheduledAt: "2026-06-10T06:00:00", administeredAt: "2026-06-10T06:10:00", administeredBy: "Nurse Deepa", status: "Given" },
  { id: "MA-006", admissionId: "ADM-0002", drug: "Amlodipine 10mg", dose: "10mg", route: "Oral", scheduledAt: "2026-06-10T08:00:00", administeredAt: "2026-06-10T08:20:00", administeredBy: "Nurse Deepa", status: "Given" },
  { id: "MA-007", admissionId: "ADM-0002", drug: "IV Labetalol 20mg", dose: "20mg", route: "IV", scheduledAt: "2026-06-10T14:00:00", status: "Scheduled" },
  { id: "MA-008", admissionId: "ADM-0003", drug: "Salbutamol Neb 2.5mg", dose: "2.5mg", route: "Inhaler", scheduledAt: "2026-06-10T06:00:00", administeredAt: "2026-06-10T06:05:00", administeredBy: "Nurse Radhika", status: "Given" },
  { id: "MA-009", admissionId: "ADM-0003", drug: "Salbutamol Neb 2.5mg", dose: "2.5mg", route: "Inhaler", scheduledAt: "2026-06-10T10:00:00", administeredAt: "2026-06-10T10:10:00", administeredBy: "Nurse Radhika", status: "Given" },
];

const seedIO: IntakeOutputRecord[] = [
  { id: "IO-001", admissionId: "ADM-0001", recordedAt: "2026-06-10T08:00:00", recordedBy: "Nurse Radhika", shift: "Morning", intakeOral: 500, intakeIV: 0, intakeFeed: 0, outputUrine: 300, outputStool: 0, outputDrain: 0, outputVomit: 0 },
  { id: "IO-002", admissionId: "ADM-0001", recordedAt: "2026-06-10T14:00:00", recordedBy: "Nurse Priya", shift: "Morning", intakeOral: 800, intakeIV: 0, intakeFeed: 350, outputUrine: 500, outputStool: 1, outputDrain: 0, outputVomit: 0 },
  { id: "IO-003", admissionId: "ADM-0002", recordedAt: "2026-06-10T08:00:00", recordedBy: "Nurse Deepa", shift: "Morning", intakeOral: 200, intakeIV: 500, intakeFeed: 0, outputUrine: 150, outputStool: 0, outputDrain: 0, outputVomit: 1 },
  { id: "IO-004", admissionId: "ADM-0002", recordedAt: "2026-06-10T14:00:00", recordedBy: "Nurse Deepa", shift: "Morning", intakeOral: 400, intakeIV: 1000, outputUrine: 400, outputStool: 0, outputDrain: 0, outputVomit: 0 },
  { id: "IO-005", admissionId: "ADM-0003", recordedAt: "2026-06-10T08:00:00", recordedBy: "Nurse Radhika", shift: "Morning", intakeOral: 300, intakeIV: 0, outputUrine: 200, outputStool: 0, outputDrain: 0, outputVomit: 0 },
];

const seedAssessments: NursingAssessment[] = [
  { id: "NA-001", admissionId: "ADM-0001", assessedAt: "2026-06-08T10:00:00", assessedBy: "Nurse Radhika", type: "Admission", consciousness: "Alert", mobility: "Independent", fallRisk: 15, fallRiskLevel: "Low", bradenScore: 20, bradenRisk: "None", painScore: 1, nutritionalStatus: "Good", skinCondition: "Intact", allergies: ["No known allergies"], notes: "Patient ambulatory, no immediate concerns." },
  { id: "NA-002", admissionId: "ADM-0002", assessedAt: "2026-06-09T15:00:00", assessedBy: "Nurse Deepa", type: "Admission", consciousness: "Alert", mobility: "Assistance", fallRisk: 28, fallRiskLevel: "Moderate", bradenScore: 16, bradenRisk: "Mild", painScore: 5, nutritionalStatus: "Fair", skinCondition: "Intact", allergies: ["No known allergies"], notes: "HTN emergency. Bed rest. Fall precautions." },
  { id: "NA-003", admissionId: "ADM-0003", assessedAt: "2026-06-07T11:30:00", assessedBy: "Nurse Radhika", type: "Admission", consciousness: "Alert", mobility: "Assistance", fallRisk: 22, fallRiskLevel: "Low", bradenScore: 18, bradenRisk: "Mild", painScore: 2, nutritionalStatus: "Fair", skinCondition: "Intact", allergies: ["No known allergies"], notes: "Asthma exacerbation. O2 therapy. Monitor SpO2." },
];

const seedHandoffs: SBARHandoff[] = [
  { id: "SB-001", admissionId: "ADM-0001", createdAt: "2026-06-10T07:30:00", createdBy: "Nurse Radhika (Night)", shift: "Morning", situation: "DM patient stable, vitals improving", background: "Admitted 2 days ago for uncontrolled DM. On Metformin + Glipizide + Telmisartan.", assessment: "BP 136/84, pulse 78, SpO2 98%, afebrile. No hypo/hyperglycaemic episodes overnight.", recommendation: "Continue current management. FBS monitoring before breakfast. Endo review pending.", completed: true },
  { id: "SB-002", admissionId: "ADM-0002", createdAt: "2026-06-10T07:30:00", createdBy: "Nurse Deepa (Night)", shift: "Morning", situation: "HTN emergency — BP improving but still elevated", background: "Admitted yesterday with BP 190/122. On IV Labetalol + Amlodipine.", assessment: "BP trend: 188/118 → 168/102 → 152/94. Neuro obs stable. No LOC.", recommendation: "Continue IV labetalol. Monitor BP q2h. Cardiology review this AM.", completed: false },
];

const seedTasks: NursingTask[] = [
  { id: "NT-001", admissionId: "ADM-0001", task: "FBS (Fasting Blood Sugar) — before breakfast", dueAt: "2026-06-10T07:00:00", priority: "Routine", status: "Completed", completedAt: "2026-06-10T06:45:00", completedBy: "Nurse Radhika" },
  { id: "NT-002", admissionId: "ADM-0001", task: "OPH referral follow-up — confirm appointment", dueAt: "2026-06-10T10:00:00", priority: "Routine", status: "Completed", completedAt: "2026-06-10T09:30:00", completedBy: "Nurse Radhika" },
  { id: "NT-003", admissionId: "ADM-0001", task: "Daily foot examination", dueAt: "2026-06-10T12:00:00", priority: "Routine", status: "Pending" },
  { id: "NT-004", admissionId: "ADM-0002", task: "Neuro obs q2h — check GCS and pupils", dueAt: "2026-06-10T08:00:00", priority: "Urgent", status: "Completed", completedAt: "2026-06-10T08:00:00", completedBy: "Nurse Deepa" },
  { id: "NT-005", admissionId: "ADM-0002", task: "IV Labetalol infusion — check rate and BP response", dueAt: "2026-06-10T08:00:00", priority: "Urgent", status: "Completed", completedAt: "2026-06-10T08:05:00", completedBy: "Nurse Deepa" },
  { id: "NT-006", admissionId: "ADM-0002", task: "Neuro obs q2h", dueAt: "2026-06-10T10:00:00", priority: "Urgent", status: "In Progress", assignedTo: "Nurse Deepa" },
  { id: "NT-007", admissionId: "ADM-0003", task: "SpO2 monitoring — continuous", dueAt: "2026-06-10T06:00:00", priority: "Urgent", status: "In Progress", assignedTo: "Nurse Radhika" },
  { id: "NT-008", admissionId: "ADM-0003", task: "Nebulisation — Salbutamol + Ipratropium", dueAt: "2026-06-10T10:00:00", priority: "Routine", status: "Completed", completedAt: "2026-06-10T10:10:00", completedBy: "Nurse Radhika" },
  { id: "NT-009", admissionId: "ADM-0003", task: "Nebulisation — scheduled", dueAt: "2026-06-10T14:00:00", priority: "Routine", status: "Pending" },
];

// ── Counter helpers ──────────────────────────────────────────────────────────

let vtCounter = seedVitals.length + 1;
let maCounter = seedMedAdmin.length + 1;
let ioCounter = seedIO.length + 1;
let naCounter = seedAssessments.length + 1;
let sbCounter = seedHandoffs.length + 1;
let ntCounter = seedTasks.length + 1;

function fmtNow() { return new Date().toISOString().slice(0, 19); }

// ── Store ─────────────────────────────────────────────────────────────────────

interface NursingStore {
  vitals: VitalsRecord[];
  medAdmin: MedAdminRecord[];
  intakeOutput: IntakeOutputRecord[];
  assessments: NursingAssessment[];
  handoffs: SBARHandoff[];
  tasks: NursingTask[];

  addVital: (r: Omit<VitalsRecord, "id">) => VitalsRecord;
  getVitals: (admissionId: string) => VitalsRecord[];
  getLatestVital: (admissionId: string) => VitalsRecord | undefined;

  addMedAdmin: (r: Omit<MedAdminRecord, "id">) => MedAdminRecord;
  updateMedAdmin: (id: string, updates: Partial<MedAdminRecord>) => void;
  getMedScheduled: (admissionId: string, date: string) => MedAdminRecord[];

  addIO: (r: Omit<IntakeOutputRecord, "id">) => IntakeOutputRecord;
  getIO: (admissionId: string) => IntakeOutputRecord[];
  getIOTotals: (admissionId: string, shift?: string) => { intake: number; output: number };

  addAssessment: (r: Omit<NursingAssessment, "id">) => NursingAssessment;
  getAssessments: (admissionId: string) => NursingAssessment[];

  addHandoff: (r: Omit<SBARHandoff, "id">) => SBARHandoff;
  completeHandoff: (id: string) => void;
  getHandoffs: (admissionId: string) => SBARHandoff[];

  addTask: (r: Omit<NursingTask, "id">) => NursingTask;
  updateTask: (id: string, updates: Partial<NursingTask>) => void;
  getTasks: (admissionId: string) => NursingTask[];
}

export const useNursingStore = create<NursingStore>((set, get) => ({
  vitals: seedVitals,
  medAdmin: seedMedAdmin,
  intakeOutput: seedIO,
  assessments: seedAssessments,
  handoffs: seedHandoffs,
  tasks: seedTasks,

  // ── Vitals ──
  addVital(r) {
    const id = `VT-${String(vtCounter++).padStart(3, "0")}`;
    const rec: VitalsRecord = { id, ...r };
    set((s) => ({ vitals: [...s.vitals, rec] }));
    return rec;
  },
  getVitals(admissionId) {
    return get().vitals.filter((v) => v.admissionId === admissionId).sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));
  },
  getLatestVital(admissionId) {
    const records = get().getVitals(admissionId);
    return records[records.length - 1];
  },

  // ── Med Admin ──
  addMedAdmin(r) {
    const id = `MA-${String(maCounter++).padStart(3, "0")}`;
    const rec: MedAdminRecord = { id, ...r };
    set((s) => ({ medAdmin: [...s.medAdmin, rec] }));
    return rec;
  },
  updateMedAdmin(id, updates) {
    set((s) => ({ medAdmin: s.medAdmin.map((m) => m.id === id ? { ...m, ...updates } : m) }));
  },
  getMedScheduled(admissionId, date) {
    return get().medAdmin.filter((m) => m.admissionId === admissionId && m.scheduledAt.startsWith(date));
  },

  // ── I/O ──
  addIO(r) {
    const id = `IO-${String(ioCounter++).padStart(3, "0")}`;
    const rec: IntakeOutputRecord = { id, ...r };
    set((s) => ({ intakeOutput: [...s.intakeOutput, rec] }));
    return rec;
  },
  getIO(admissionId) {
    return get().intakeOutput.filter((io) => io.admissionId === admissionId).sort((a, b) => a.recordedAt.localeCompare(b.recordedAt));
  },
  getIOTotals(admissionId, shift) {
    const records = shift ? get().intakeOutput.filter((io) => io.admissionId === admissionId && io.shift === shift) : get().intakeOutput.filter((io) => io.admissionId === admissionId);
    const intake = records.reduce((s, r) => s + (r.intakeOral ?? 0) + (r.intakeIV ?? 0) + (r.intakeFeed ?? 0), 0);
    const output = records.reduce((s, r) => s + (r.outputUrine ?? 0) + (r.outputDrain ?? 0) + (r.outputVomit ?? 0), 0);
    return { intake, output };
  },

  // ── Assessment ──
  addAssessment(r) {
    const id = `NA-${String(naCounter++).padStart(3, "0")}`;
    const rec: NursingAssessment = { id, ...r };
    set((s) => ({ assessments: [...s.assessments, rec] }));
    return rec;
  },
  getAssessments(admissionId) {
    return get().assessments.filter((a) => a.admissionId === admissionId).sort((a, b) => b.assessedAt.localeCompare(a.assessedAt));
  },

  // ── SBAR ──
  addHandoff(r) {
    const id = `SB-${String(sbCounter++).padStart(3, "0")}`;
    const rec: SBARHandoff = { id, ...r };
    set((s) => ({ handoffs: [...s.handoffs, rec] }));
    return rec;
  },
  completeHandoff(id) {
    set((s) => ({ handoffs: s.handoffs.map((h) => h.id === id ? { ...h, completed: true } : h) }));
  },
  getHandoffs(admissionId) {
    return get().handoffs.filter((h) => h.admissionId === admissionId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  // ── Tasks ──
  addTask(r) {
    const id = `NT-${String(ntCounter++).padStart(3, "0")}`;
    const rec: NursingTask = { id, ...r };
    set((s) => ({ tasks: [...s.tasks, rec] }));
    return rec;
  },
  updateTask(id, updates) {
    set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? { ...t, ...updates } : t) }));
  },
  getTasks(admissionId) {
    return get().tasks.filter((t) => t.admissionId === admissionId).sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  },
}));
