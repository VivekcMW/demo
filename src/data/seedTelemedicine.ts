export type CallStatus =
  | "Scheduled"
  | "Ringing"
  | "In-Progress"
  | "Completed"
  | "Missed"
  | "Cancelled";

export interface TelePrescription {
  id: string;
  drug: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface TeleconsultationSeed {
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

const now = "2026-06-10T14:00:00";

export const seedTeleconsultations: TeleconsultationSeed[] = [
  // ── Scheduled (4) ──────────────────────────────────────────────────────
  {
    id: "TEL-0001",
    patientId: "PT-0017",
    patientName: "Harish Menon",
    doctor: "Dr. Ananya Krishnan",
    scheduledAt: "2026-06-10T14:00:00",
    scheduledDuration: 20,
    callStatus: "Scheduled",
    reason: "Mental health check-in — anxiety follow-up",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },
  {
    id: "TEL-0002",
    patientId: "PT-0018",
    patientName: "Pooja Sinha",
    doctor: "Dr. Rajiv Mehta",
    scheduledAt: "2026-06-10T14:30:00",
    scheduledDuration: 15,
    callStatus: "Scheduled",
    reason: "Fever/cough follow-up — post dengue recovery",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },
  {
    id: "TEL-0003",
    patientId: "PT-0020",
    patientName: "Divya Menon",
    doctor: "Dr. Ananya Krishnan",
    scheduledAt: "2026-06-10T15:00:00",
    scheduledDuration: 15,
    callStatus: "Scheduled",
    reason: "Skin rash consultation — urticaria assessment",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },
  {
    id: "TEL-0004",
    patientId: "PT-0019",
    patientName: "Santosh Yadav",
    doctor: "Dr. Rajiv Mehta",
    scheduledAt: "2026-06-10T15:30:00",
    scheduledDuration: 10,
    callStatus: "Scheduled",
    reason: "Medication refill — cetirizine repeat",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },

  // ── In-Progress (2) ────────────────────────────────────────────────────
  {
    id: "TEL-0005",
    appointmentId: "APT-006",
    patientId: "PT-0006",
    patientName: "Priya Nair",
    doctor: "Dr. Ananya Krishnan",
    scheduledAt: "2026-06-10T13:45:00",
    scheduledDuration: 15,
    callStatus: "In-Progress",
    callStartedAt: "2026-06-10T13:45:00",
    reason: "Migraine follow-up — sumatriptan response check",
    videoEnabled: true,
    audioEnabled: true,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },
  {
    id: "TEL-0006",
    appointmentId: "APT-013",
    patientId: "PT-0013",
    patientName: "Suresh Iyer",
    doctor: "Dr. Rajiv Mehta",
    scheduledAt: "2026-06-10T13:50:00",
    scheduledDuration: 20,
    callStatus: "In-Progress",
    callStartedAt: "2026-06-10T13:50:00",
    reason: "Diabetes follow-up — report review (HbA1c, KFT)",
    videoEnabled: true,
    audioEnabled: true,
    isRecording: false,
    screenShare: false,
    prescriptions: [
      { id: "RX-TEL-001", drug: "Insulin Glargine", dose: "22 units", route: "SC", frequency: "OD (bedtime)", duration: "Ongoing", instructions: "Increase from 20 to 22 units" },
    ],
  },

  // ── Completed (3) ──────────────────────────────────────────────────────
  {
    id: "TEL-0007",
    patientId: "PT-0009",
    patientName: "Rajesh Kumar",
    doctor: "Dr. Ananya Krishnan",
    scheduledAt: "2026-06-10T09:00:00",
    scheduledDuration: 15,
    callStatus: "Completed",
    callStartedAt: "2026-06-10T09:02:00",
    callEndedAt: "2026-06-10T09:14:00",
    actualDuration: 720,
    reason: "Follow-up hypertension — BP log review",
    notes: "BP well controlled at 128/84 on current meds. Continue glimepiride. Follow-up in 3 months.",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [
      { id: "RX-TEL-002", drug: "Glimepiride", dose: "2 mg", route: "Oral", frequency: "OD (before breakfast)", duration: "3 months", instructions: "Continue same dose" },
    ],
  },
  {
    id: "TEL-0008",
    patientId: "PT-0010",
    patientName: "Anita Joshi",
    doctor: "Dr. Rajiv Mehta",
    scheduledAt: "2026-06-10T10:00:00",
    scheduledDuration: 15,
    callStatus: "Completed",
    callStartedAt: "2026-06-10T10:05:00",
    callEndedAt: "2026-06-10T10:18:00",
    actualDuration: 780,
    reason: "Medication refill — methotrexate for RA",
    notes: "RA disease activity stable. Continue current regimen. Lab monitoring done.",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [
      { id: "RX-TEL-003", drug: "Methotrexate", dose: "10 mg", route: "Oral", frequency: "Once weekly", duration: "3 months", instructions: "Continue with folic acid" },
      { id: "RX-TEL-004", drug: "Folic acid", dose: "5 mg", route: "Oral", frequency: "OD (except MTX day)", duration: "3 months" },
    ],
  },
  {
    id: "TEL-0009",
    patientId: "PT-0008",
    patientName: "Fatima Sheikh",
    doctor: "Dr. Ananya Krishnan",
    scheduledAt: "2026-06-10T11:00:00",
    scheduledDuration: 15,
    callStatus: "Completed",
    callStartedAt: "2026-06-10T11:00:00",
    callEndedAt: "2026-06-10T11:12:00",
    actualDuration: 720,
    reason: "Post-op check — wound healing assessment",
    notes: "Surgical site healing well. No signs of infection. Continue telmisartan. Follow-up in 2 weeks.",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },

  // ── Missed (1) ─────────────────────────────────────────────────────────
  {
    id: "TEL-0010",
    patientId: "PT-0011",
    patientName: "Deepak Verma",
    doctor: "Dr. Rajiv Mehta",
    scheduledAt: "2026-06-10T11:30:00",
    scheduledDuration: 15,
    callStatus: "Missed",
    reason: "COPD follow-up — worsening breathlessness",
    notes: "Patient unreachable. SMS reminder sent. Reschedule requested.",
    videoEnabled: false,
    audioEnabled: false,
    isRecording: false,
    screenShare: false,
    prescriptions: [],
  },
];
