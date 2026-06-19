import { create } from "zustand";
import {
  seedTeleconsultations,
  type TelePrescription,
  type CallStatus,
} from "@/data/seedTelemedicine";
import { api } from "@/services/apiClient";

export type { CallStatus, TelePrescription };

export interface Teleconsultation {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  doctor: string;
  scheduledAt: string;
  scheduledDuration: number;
  callStatus: CallStatus;
  callStartedAt?: string;
  callEndedAt?: string;
  actualDuration?: number;
  reason: string;
  notes?: string;
  videoEnabled: boolean;
  audioEnabled: boolean;
  isRecording: boolean;
  screenShare: boolean;
  prescriptions: TelePrescription[];
}

export interface TelemedicineStats {
  totalToday: number;
  pending: number;
  completed: number;
  missed: number;
  inProgress: number;
  averageWaitMinutes: number;
}

const TODAY = "2026-06-10";

let idCounter = seedTeleconsultations.length + 1;
function nextId() {
  return `TEL-${String(idCounter++).padStart(4, "0")}`;
}
function now() {
  return new Date().toISOString().slice(0, 19);
}
function inToday(dt: string) {
  return dt.startsWith(TODAY);
}

interface TelemedicineState {
  consultations: Teleconsultation[];
  activeCallId: string | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;

  refresh: () => Promise<void>;

  addConsultation: (data: {
    patientId: string;
    patientName: string;
    doctor: string;
    scheduledAt: string;
    scheduledDuration: number;
    reason: string;
    appointmentId?: string;
  }) => Teleconsultation;

  updateCallStatus: (id: string, status: CallStatus) => void;
  startCall: (id: string) => void;
  endCall: (id: string) => void;
  cancelConsultation: (id: string) => void;
  toggleVideo: (id: string) => void;
  toggleAudio: (id: string) => void;
  toggleRecording: (id: string) => void;
  toggleScreenShare: (id: string) => void;
  addPrescription: (id: string, rx: Omit<TelePrescription, "id">) => void;
  removePrescription: (id: string, rxId: string) => void;
  clearPrescriptions: (id: string) => void;
  setActiveCall: (id: string | null) => void;

  getById: (id: string) => Teleconsultation | undefined;
  getByPatient: (patientId: string) => Teleconsultation[];
  getTodayConsultations: () => Teleconsultation[];
  getByDoctor: (doctor: string) => Teleconsultation[];
  getWaitingRoom: () => Teleconsultation[];
  getStats: () => TelemedicineStats;
}

export const useTelemedicineStore = create<TelemedicineState>((set, get) => ({
  consultations: seedTeleconsultations.map((s) => ({ ...s })),
  activeCallId: null,
  loading: false,
  initialized: false,
  error: null,

  async refresh() {
    set({ initialized: true });
  },

  addConsultation(data) {
    const id = nextId();
    const c: Teleconsultation = {
      id,
      ...data,
      callStatus: "Scheduled",
      videoEnabled: false,
      audioEnabled: false,
      isRecording: false,
      screenShare: false,
      prescriptions: [],
    };
    set((s) => ({ consultations: [...s.consultations, c] }));
    return c;
  },

  updateCallStatus(id, callStatus) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, callStatus } : c
      ),
    }));
  },

  startCall(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id
          ? {
              ...c,
              callStatus: "In-Progress" as CallStatus,
              callStartedAt: now(),
              videoEnabled: true,
              audioEnabled: true,
              screenShare: false,
            }
          : c
      ),
      activeCallId: id,
    }));
  },

  endCall(id) {
    const c = get().consultations.find((x) => x.id === id);
    const end = now();
    const started = c?.callStartedAt;
    const actualDuration =
      started
        ? Math.round(
            (new Date(end).getTime() - new Date(started).getTime()) / 1000
          )
        : undefined;
    set((s) => ({
      consultations: s.consultations.map((x) =>
        x.id === id
          ? {
              ...x,
              callStatus: "Completed" as CallStatus,
              callEndedAt: end,
              actualDuration,
              videoEnabled: false,
              audioEnabled: false,
              isRecording: false,
              screenShare: false,
            }
          : x
      ),
      activeCallId: null,
    }));
  },

  cancelConsultation(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, callStatus: "Cancelled" as CallStatus } : c
      ),
    }));
  },

  toggleVideo(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, videoEnabled: !c.videoEnabled } : c
      ),
    }));
  },

  toggleAudio(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, audioEnabled: !c.audioEnabled } : c
      ),
    }));
  },

  toggleRecording(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, isRecording: !c.isRecording } : c
      ),
    }));
  },

  toggleScreenShare(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, screenShare: !c.screenShare } : c
      ),
    }));
  },

  addPrescription(id, rx) {
    const newRx: TelePrescription = {
      ...rx,
      id: `RX-TEL-${crypto.randomUUID().slice(0, 8)}`,
    };
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id
          ? { ...c, prescriptions: [...c.prescriptions, newRx] }
          : c
      ),
    }));
  },

  removePrescription(id, rxId) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id
          ? {
              ...c,
              prescriptions: c.prescriptions.filter((r) => r.id !== rxId),
            }
          : c
      ),
    }));
  },

  clearPrescriptions(id) {
    set((s) => ({
      consultations: s.consultations.map((c) =>
        c.id === id ? { ...c, prescriptions: [] } : c
      ),
    }));
  },

  setActiveCall(id) {
    set({ activeCallId: id });
  },

  getById(id) {
    return get().consultations.find((c) => c.id === id);
  },

  getByPatient(patientId) {
    return get().consultations.filter((c) => c.patientId === patientId);
  },

  getTodayConsultations() {
    return get().consultations.filter((c) => inToday(c.scheduledAt));
  },

  getByDoctor(doctor) {
    return get().consultations.filter((c) => c.doctor === doctor);
  },

  getWaitingRoom() {
    return get().consultations.filter(
      (c) => c.callStatus === "Scheduled" && inToday(c.scheduledAt)
    );
  },

  getStats() {
    const today = get().getTodayConsultations();
    const completed = today.filter((c) => c.callStatus === "Completed");
    const inProgress = today.filter((c) => c.callStatus === "In-Progress");
    const missed = today.filter((c) => c.callStatus === "Missed");
    const scheduled = today.filter((c) => c.callStatus === "Scheduled");

    const waitTimes = completed
      .map((c) => {
        if (!c.callStartedAt) return 0;
        const scheduledTime = new Date(c.scheduledAt).getTime();
        const startTime = new Date(c.callStartedAt).getTime();
        return Math.max(0, (startTime - scheduledTime) / 60000);
      })
      .filter((t) => t > 0);
    const averageWaitMinutes =
      waitTimes.length > 0
        ? Math.round(
            waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length
          )
        : 0;

    const inProgressToday = inProgress.length;
    const pending = scheduled.length + inProgressToday;

    return {
      totalToday: today.length,
      completed: completed.length,
      missed: missed.length,
      inProgress: inProgressToday,
      pending,
      averageWaitMinutes,
    };
  },
}));
