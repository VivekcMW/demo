import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// ── Types ────────────────────────────────────────────────────────────────────

export type OTStatus = "Available" | "In Use" | "Cleaning" | "Maintenance" | "Reserved";
export type OTProcedureStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled";
export type OTUrgency = "Elective" | "Urgent" | "Emergency";
export type AnaesthesiaType = "General" | "Spinal" | "Epidural" | "Local" | "Regional" | "Monitored" | "None";

export interface OTTheatre {
  id: string;
  name: string;
  floor: string;
  specialties: string[];
  status: OTStatus;
  equipment: string[];
}

export interface OTProcedure {
  id: string;
  patientId: string;
  patientName: string;
  procedureName: string;
  specialty: string;
  surgeon: string;
  anaesthetist: string;
  anaesthesiaType: AnaesthesiaType;
  theatreId: string;
  scheduledAt: string;
  estimatedDuration: number;
  status: OTProcedureStatus;
  urgency: OTUrgency;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  whochecklist?: WHOChecklist;
}

export interface WHOChecklist {
  signInCompleted: boolean;
  signInAt?: string;
  signInBy?: string;
  timeOutCompleted: boolean;
  timeOutAt?: string;
  timeOutBy?: string;
  signOutCompleted: boolean;
  signOutAt?: string;
  signOutBy?: string;
}

// ── Seed data ─────────────────────────────────────────────────────────────────

const seedTheatres: OTTheatre[] = [
  { id: "OT-001", name: "OT 1 — Major", floor: "Ground", specialties: ["General Surgery", "Cardiothoracic", "Vascular"], status: "In Use", equipment: ["C-arm", "Laparoscopy tower", "Anaesthesia machine", "Diathermy", "Suction"] },
  { id: "OT-002", name: "OT 2 — Ortho", floor: "Ground", specialties: ["Orthopedics", "Spine"], status: "Available", equipment: ["C-arm", "Microscope", "Pneumatic drill", "Diathermy", "Image intensifier"] },
  { id: "OT-003", name: "OT 3 — Laparoscopic", floor: "First", specialties: ["General Surgery", "Gynaecology", "Urology"], status: "Cleaning", equipment: ["Laparoscopy tower", "Harmonic scalpel", "Cystoscope", "Diathermy"] },
  { id: "OT-004", name: "OT 4 — Emergency", floor: "Ground", specialties: ["Emergency", "General Surgery", "Orthopedics"], status: "Available", equipment: ["C-arm", "Anaesthesia machine", "Resuscitation cart", "Defibrillator"] },
  { id: "OT-005", name: "OT 5 — Ophthalmic", floor: "First", specialties: ["Ophthalmology"], status: "Available", equipment: ["Surgical microscope", "Phacoemulsifier", "Vitrectomy system"] },
  { id: "OT-006", name: "OT 6 — ENT", floor: "First", specialties: ["ENT", "Maxillofacial"], status: "Maintenance", equipment: ["Microscope", "Endoscopy stack", "Drill system", "Nerve monitor"] },
  { id: "OT-007", name: "OT 7 — Cardiac", floor: "Ground", specialties: ["Cardiothoracic", "Vascular"], status: "Available", equipment: ["Heart-lung machine", "C-arm", "IABP", "Transoesophageal echo"] },
  { id: "OT-008", name: "OT 8 — Minor OT", floor: "Second", specialties: ["Dental", "Plastic", "Dermatology"], status: "Available", equipment: ["Microscope", "Diathermy", "Suction"] },
];

const seedProcedures: OTProcedure[] = [
  { id: "OP-001", patientId: "PT-0008", patientName: "Sunita Devi Yadav", procedureName: "Laparoscopic Cholecystectomy", specialty: "General Surgery", surgeon: "Dr. Ramesh Gupta", anaesthetist: "Dr. Mehta", anaesthesiaType: "General", theatreId: "OT-003", scheduledAt: "2026-06-12T09:00:00", estimatedDuration: 120, status: "Scheduled", urgency: "Elective", notes: "Elective, pre-op workup complete" },
  { id: "OP-002", patientId: "PT-0007", patientName: "Mohan Lal", procedureName: "Emergency Laparotomy — Suspected Perforation", specialty: "General Surgery", surgeon: "Dr. Suresh Nair", anaesthetist: "Dr. Priya", anaesthesiaType: "General", theatreId: "OT-004", scheduledAt: "2026-06-10T23:00:00", estimatedDuration: 150, status: "In Progress", urgency: "Emergency", startedAt: "2026-06-10T23:15:00", notes: "Emergency case — perforated DU", whochecklist: { signInCompleted: true, signInAt: "2026-06-10T23:00:00", signInBy: "Nurse Deepa", timeOutCompleted: true, timeOutAt: "2026-06-10T23:10:00", timeOutBy: "Dr. Suresh Nair", signOutCompleted: false } },
  { id: "OP-003", patientId: "PT-0015", patientName: "Deepa Venkataraman", procedureName: "Emergency LSCS", specialty: "Obstetrics & Gynaecology", surgeon: "Dr. Ananya Krishnan", anaesthetist: "Dr. Mehta", anaesthesiaType: "Spinal", theatreId: "OT-001", scheduledAt: "2026-06-10T22:30:00", estimatedDuration: 60, status: "Completed", urgency: "Urgent", startedAt: "2026-06-10T22:35:00", completedAt: "2026-06-10T23:25:00", whochecklist: { signInCompleted: true, signInAt: "2026-06-10T22:30:00", signInBy: "Nurse Radhika", timeOutCompleted: true, timeOutAt: "2026-06-10T22:35:00", timeOutBy: "Dr. Ananya Krishnan", signOutCompleted: true, signOutAt: "2026-06-10T23:30:00", signOutBy: "Nurse Radhika" } },
  { id: "OP-004", patientId: "PT-0030", patientName: "Madhuri Kulkarni", procedureName: "Exploratory Laparotomy — Source Control", specialty: "General Surgery", surgeon: "Dr. Ramesh Gupta", anaesthetist: "Dr. Priya", anaesthesiaType: "General", theatreId: "OT-001", scheduledAt: "2026-06-11T08:00:00", estimatedDuration: 180, status: "Scheduled", urgency: "Urgent" },
  { id: "OP-005", patientId: "PT-0019", patientName: "Anitha Rajan", procedureName: "Open Appendicectomy", specialty: "General Surgery", surgeon: "Dr. Suresh Nair", anaesthetist: "Dr. Mehta", anaesthesiaType: "Spinal", theatreId: "OT-004", scheduledAt: "2026-06-11T14:00:00", estimatedDuration: 60, status: "Scheduled", urgency: "Elective" },
  { id: "OP-006", patientId: "PT-0020", patientName: "Vijay Shankar Reddy", procedureName: "Wound Debridement + Secondary Suturing", specialty: "General Surgery", surgeon: "Dr. Ananya Krishnan", anaesthetist: "Dr. Priya", anaesthesiaType: "Local", theatreId: "OT-008", scheduledAt: "2026-06-11T11:00:00", estimatedDuration: 45, status: "Completed", urgency: "Elective", completedAt: "2026-06-11T11:40:00", whochecklist: { signInCompleted: true, signInAt: "2026-06-11T11:00:00", signInBy: "Nurse Deepa", timeOutCompleted: true, timeOutAt: "2026-06-11T11:05:00", timeOutBy: "Dr. Ananya Krishnan", signOutCompleted: true, signOutAt: "2026-06-11T11:45:00", signOutBy: "Nurse Deepa" } },
];

let opCounter = seedProcedures.length + 1;

// ── Store ─────────────────────────────────────────────────────────────────────

interface OTStore {
  theatres: OTTheatre[];
  procedures: OTProcedure[];

  getById: (id: string) => OTProcedure | undefined;
  getByTheatre: (theatreId: string) => OTProcedure[];
  getByDate: (date: string) => OTProcedure[];
  getScheduled: () => OTProcedure[];
  getInProgress: () => OTProcedure[];
  startProcedure: (id: string, by: string) => void;
  completeProcedure: (id: string, by: string) => void;
  cancelProcedure: (id: string, by: string) => void;
  updateChecklist: (id: string, phase: "signIn" | "timeOut" | "signOut", by: string) => void;
  updateTheatreStatus: (id: string, status: OTStatus) => void;
}

export const useOTStore = create<OTStore>((set, get) => ({
  theatres: seedTheatres,
  procedures: seedProcedures,

  getById(id) { return get().procedures.find((p) => p.id === id); },
  getByTheatre(theatreId) { return get().procedures.filter((p) => p.theatreId === theatreId); },
  getByDate(date) { return get().procedures.filter((p) => p.scheduledAt.startsWith(date)); },
  getScheduled() { return get().procedures.filter((p) => p.status === "Scheduled"); },
  getInProgress() { return get().procedures.filter((p) => p.status === "In Progress"); },

  startProcedure(id, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({ procedures: s.procedures.map((p) => p.id === id ? { ...p, status: "In Progress" as const, startedAt: now } : p) }));
  },

  completeProcedure(id, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({ procedures: s.procedures.map((p) => p.id === id ? { ...p, status: "Completed" as const, completedAt: now } : p) }));
  },

  cancelProcedure(id, by) {
    set((s) => ({ procedures: s.procedures.map((p) => p.id === id ? { ...p, status: "Cancelled" as const } : p) }));
  },

  updateChecklist(id, phase, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      procedures: s.procedures.map((p) => {
        if (p.id !== id) return p;
        const cl = { ...(p.whochecklist ?? { signInCompleted: false, timeOutCompleted: false, signOutCompleted: false }) };
        if (phase === "signIn") { cl.signInCompleted = true; cl.signInAt = now; cl.signInBy = by; }
        if (phase === "timeOut") { cl.timeOutCompleted = true; cl.timeOutAt = now; cl.timeOutBy = by; }
        if (phase === "signOut") { cl.signOutCompleted = true; cl.signOutAt = now; cl.signOutBy = by; }
        return { ...p, whochecklist: cl };
      }),
    }));
  },

  updateTheatreStatus(id, status) {
    set((s) => ({ theatres: s.theatres.map((t) => t.id === id ? { ...t, status } : t) }));
  },
}));
