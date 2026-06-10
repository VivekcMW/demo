import { create } from "zustand";
import {
  seedExaminations,
  type Examination,
  type ExamType,
  type ExamStatus,
  type Subjective,
  type Objective,
  type Assessment,
  type Plan,
  defaultSystemicFindings,
} from "@/data/seedExaminations";

// ── Payload ───────────────────────────────────────────────────────────────────

export interface StartExamPayload {
  patientId:      string;
  patientName:    string;
  appointmentId?: string;
  type:           ExamType;
  doctor:         string;
  dept:           string;
}

export interface SaveExamPayload {
  subjective:  Subjective;
  objective:   Objective;
  assessment:  Assessment;
  plan:        Plan;
  notes?:      string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let counter = seedExaminations.length + 1;
function nextId() { return `EXM-${String(counter++).padStart(4, "0")}`; }

// ── Store ─────────────────────────────────────────────────────────────────────

interface ExaminationState {
  examinations: Examination[];

  startExamination:    (payload: StartExamPayload) => Examination;
  saveExamination:     (id: string, data: SaveExamPayload) => void;
  completeExamination: (id: string) => void;
  signOff:             (id: string, by: string) => void;

  getById:      (id: string) => Examination | undefined;
  getByPatient: (patientId: string) => Examination[];
}

export const useExaminationStore = create<ExaminationState>((set, get) => ({
  examinations: seedExaminations,

  startExamination(payload) {
    const now = new Date().toISOString().slice(0, 19);
    const exam: Examination = {
      id:            nextId(),
      patientId:     payload.patientId,
      patientName:   payload.patientName,
      appointmentId: payload.appointmentId,
      type:          payload.type,
      status:        "In Progress",
      startedAt:     now,
      doctor:        payload.doctor,
      dept:          payload.dept,
      subjective:    { chiefComplaint: "", historyOfIllness: "" },
      objective:     { systemicFindings: defaultSystemicFindings() },
      assessment:    { diagnoses: [] },
      plan:          { orders: [], prescriptions: [] },
    };
    set((s) => ({ examinations: [exam, ...s.examinations] }));
    return exam;
  },

  saveExamination(id, data) {
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : {
          ...e,
          subjective:  data.subjective,
          objective:   data.objective,
          assessment:  data.assessment,
          plan:        data.plan,
          notes:       data.notes,
        }
      ),
    }));
  },

  completeExamination(id) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : { ...e, status: "Completed" as ExamStatus, completedAt: now }
      ),
    }));
  },

  signOff(id, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : {
          ...e,
          status:       "Signed Off" as ExamStatus,
          completedAt:  e.completedAt ?? now,
          signedBy:     by,
          signedAt:     now,
        }
      ),
    }));
  },

  getById(id) { return get().examinations.find((e) => e.id === id); },
  getByPatient(patientId) { return get().examinations.filter((e) => e.patientId === patientId); },
}));

export type { Examination, ExamType, ExamStatus, Subjective, Objective, Assessment, Plan };
