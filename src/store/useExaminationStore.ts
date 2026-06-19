import { create } from "zustand";
import { usePatientStore } from "./usePatientStore";
import {
  seedExaminations,
  type Examination,
  type ExamType,
  type NoteStatus,
  type Subjective,
  type Objective,
  type Assessment,
  type Plan,
  type NoteVersion,
  type NoteAddendum,
  type NoteContent,
  defaultSystemicFindings,
} from "@/data/seedExaminations";

// ── Payloads ──

export interface StartExamPayload {
  patientId:      string;
  patientName:    string;
  appointmentId?: string;
  type:           ExamType;
  doctor:         string;
  dept:           string;
  templateId?:    string;
  templateData?: Record<string, unknown>;
}

export interface SaveExamPayload {
  subjective:  Subjective;
  objective:   Objective;
  assessment:  Assessment;
  plan:        Plan;
  notes?:      string;
  templateId?:    string;
  templateData?: Record<string, unknown>;
}

export interface AddAddendumPayload {
  content: string;
  reason:  string;
  author:  string;
}

// ── Helpers ──

let counter = seedExaminations.length + 1;
function nextId() { return `EXM-${String(counter++).padStart(4, "0")}`; }
function now() { return new Date().toISOString().slice(0, 19); }

function computeContentHash(content: NoteContent): string {
  const str = JSON.stringify(content);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `hash-${Math.abs(hash).toString(16)}`;
}

// ── Store ──

interface ExaminationState {
  examinations: Examination[];

  // CRUD
  startExamination:    (payload: StartExamPayload) => Examination;
  saveDraft:           (id: string, data: SaveExamPayload, savedBy: string) => void;
  submitForReview:     (id: string) => void;
  signOff:             (id: string, by: string) => void;
  lockNote:            (id: string) => void;
  addAddendum:         (id: string, payload: AddAddendumPayload) => void;

  // Queries
  getById:      (id: string) => Examination | undefined;
  getByPatient: (patientId: string) => Examination[];
  getVersion:   (id: string, versionNumber: number) => NoteVersion | undefined;
}

export const useExaminationStore = create<ExaminationState>((set, get) => ({
  examinations: seedExaminations,

  startExamination(payload) {
    const id = nextId();
    const started = now();
    const content: NoteContent = {
      subjective:  { chiefComplaint: "", historyOfIllness: "" },
      objective:   { systemicFindings: defaultSystemicFindings() },
      assessment:  { diagnoses: [] },
      plan:        { orders: [], prescriptions: [] },
      templateId: payload.templateId,
      templateData: payload.templateData,
    };
    const version: NoteVersion = {
      versionNumber: 1,
      content,
      savedAt: started,
      savedBy: payload.doctor,
      changeSummary: "Note started",
    };
    const exam: Examination = {
      id, startedAt: started,
      patientId: payload.patientId, patientName: payload.patientName,
      appointmentId: payload.appointmentId,
      type: payload.type, status: "Draft",
      doctor: payload.doctor, dept: payload.dept,
      templateId: payload.templateId,
      templateData: payload.templateData,
      ...content,
      versions: [version],
      currentVersionNumber: 1,
      addenda: [],
    };
    set((s) => ({ examinations: [exam, ...s.examinations] }));
    return exam;
  },

  saveDraft(id, data, savedBy) {
    const nowStr = now();
    set((s) => ({
      examinations: s.examinations.map((e) => {
        if (e.id !== id) return e;
        const newVer: NoteVersion = {
          versionNumber: e.currentVersionNumber + 1,
          content: { ...data, notes: data.notes, templateId: data.templateId, templateData: data.templateData },
          savedAt: nowStr,
          savedBy,
          changeSummary: "Updated draft",
        };
        return {
          ...e,
          ...data,
          templateId: data.templateId ?? e.templateId,
          templateData: data.templateData ?? e.templateData,
          versions: [...e.versions, newVer],
          currentVersionNumber: newVer.versionNumber,
        };
      }),
    }));
    // Sync vitals to patient store
    const exam = get().examinations.find((x) => x.id === id);
    const v = data.objective?.vitals;
    if (exam && v && Object.keys(v).some((k) => k !== "recordedAt" && v[k as keyof typeof v] != null)) {
      try {
        usePatientStore.getState().updatePatient(exam.patientId, {
          vitals: { ...v, recordedAt: v.recordedAt ?? new Date().toISOString().slice(0, 10) },
        });
      } catch { /* ignore */ }
    }
  },

  submitForReview(id) {
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : { ...e, status: "In Review" as NoteStatus }
      ),
    }));
  },

  signOff(id, by) {
    const nowStr = now();
    set((s) => ({
      examinations: s.examinations.map((e) => {
        if (e.id !== id) return e;
        const latestContent: NoteContent = {
          subjective: e.subjective, objective: e.objective,
          assessment: e.assessment, plan: e.plan, notes: e.notes,
        };
        return {
          ...e,
          status: "Signed" as NoteStatus,
          signedBy: by,
          signedAt: nowStr,
          signedHash: computeContentHash(latestContent),
          completedAt: e.completedAt ?? nowStr,
        };
      }),
    }));
  },

  lockNote(id) {
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : { ...e, status: "Locked" as NoteStatus }
      ),
    }));
  },

  addAddendum(id, payload) {
    const nowStr = now();
    const addendum: NoteAddendum = {
      id: crypto.randomUUID(),
      content: payload.content,
      reason: payload.reason,
      author: payload.author,
      createdAt: nowStr,
    };
    set((s) => ({
      examinations: s.examinations.map((e) =>
        e.id !== id ? e : { ...e, addenda: [...e.addenda, addendum] }
      ),
    }));
  },

  getById(id) { return get().examinations.find((e) => e.id === id); },

  getByPatient(patientId) {
    return get().examinations.filter((e) => e.patientId === patientId);
  },

  getVersion(id, versionNumber) {
    const exam = get().examinations.find((e) => e.id === id);
    return exam?.versions.find((v) => v.versionNumber === versionNumber);
  },
}));

export type { Examination, ExamType, NoteStatus, Subjective, Objective, Assessment, Plan, NoteVersion, NoteAddendum, NoteContent };
