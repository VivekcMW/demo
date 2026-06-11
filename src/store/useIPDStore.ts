import { create } from "zustand";
import {
  seedAdmissions,
  WARDS,
  type Admission,
  type AdmissionStatus,
  type AdmissionPriority,
  type BedInfo,
  type StatusEvent,
} from "@/data/seedAdmissions";

// ── Payload types ─────────────────────────────────────────────────────────────

export interface AdmitPayload {
  patientId:         string;
  patientName:       string;
  ward:              string;
  bed:               string;
  priority:          AdmissionPriority;
  admittedAt:        string;
  expectedDischarge: string;
  attendingDoctor:   string;
  admitDiagnosis:    string;
  clinicalNotes?:    string;
  admittedBy:        string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let counter = seedAdmissions.length + 1;
function nextId() {
  return `ADM-${String(counter++).padStart(4, "0")}`;
}

// Build full bed map: all ward beds, mark occupied/reserved from admissions
function buildBedMap(admissions: Admission[]): BedInfo[] {
  const activeByBed: Record<string, Admission> = {};
  for (const a of admissions) {
    if (a.status === "Active" || a.status === "Planned") {
      activeByBed[`${a.ward}|${a.bed}`] = a;
    }
  }

  const beds: BedInfo[] = [];
  const bedPrefixes: Record<string, string> = {
    "General Ward A": "A",
    "General Ward B": "B",
    "Surgical Ward":  "S",
    "Maternity Ward": "M",
    "HDU":            "H",
    "ICU":            "I",
  };

  for (const ward of WARDS) {
    const prefix = bedPrefixes[ward.name] ?? ward.name[0];
    for (let i = 1; i <= ward.beds; i++) {
      const bed = `${prefix}${i}`;
      const key = `${ward.name}|${bed}`;
      const adm = activeByBed[key];

      if (adm) {
        beds.push({
          ward: ward.name,
          bed,
          status:       adm.status === "Planned" ? "Reserved" : "Occupied",
          admissionId:  adm.id,
          patientName:  adm.patientName,
          priority:     adm.priority,
        });
      } else {
        // Cleaning beds: A4, B3, B6, S3, S5, M4, M6
        const cleaningBeds = ["A4", "B3", "B6", "S3", "S5", "M4", "M6"];
        beds.push({
          ward: ward.name,
          bed,
          status: cleaningBeds.includes(bed) ? "Cleaning" : "Available",
          priority: ward.priority,
        });
      }
    }
  }
  return beds;
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface IPDState {
  admissions: Admission[];

  // Derived bed map (recomputed on mutations)
  bedMap: BedInfo[];

  // Actions
  admitPatient:       (payload: AdmitPayload) => Admission;
  confirmAdmission:   (id: string) => void;
  dischargePatient:   (id: string, summary: string, by: string) => void;
  transferBed:        (id: string, newWard: string, newBed: string, by: string) => void;
  updateNotes:        (id: string, notes: string) => void;

  // Selectors
  getById:         (id: string) => Admission | undefined;
  getByPatient:    (patientId: string) => Admission[];
}

export const useIPDStore = create<IPDState>((set, get) => ({
  admissions: seedAdmissions,
  bedMap:     buildBedMap(seedAdmissions),

  admitPatient(payload) {
    const now = new Date().toISOString().slice(0, 19);
    const event: StatusEvent = {
      at: now, by: payload.admittedBy,
      status: "Active", note: "Admitted",
    };
    const admission: Admission = {
      id:                nextId(),
      patientId:         payload.patientId,
      patientName:       payload.patientName,
      ward:              payload.ward,
      bed:               payload.bed,
      status:            "Active",
      priority:          payload.priority,
      admittedAt:        payload.admittedAt || now,
      expectedDischarge: payload.expectedDischarge,
      attendingDoctor:   payload.attendingDoctor,
      admitDiagnosis:    payload.admitDiagnosis,
      clinicalNotes:     payload.clinicalNotes,
      statusHistory:     [event],
    };
    set((s) => {
      const admissions = [admission, ...s.admissions];
      return { admissions, bedMap: buildBedMap(admissions) };
    });
    return admission;
  },

  confirmAdmission(id) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => {
      const admissions = s.admissions.map((a) =>
        a.id !== id ? a : {
          ...a,
          status: "Active" as AdmissionStatus,
          statusHistory: [
            ...a.statusHistory,
            { at: now, by: "Reception", status: "Active" as AdmissionStatus, note: "Admission confirmed at reception" },
          ],
        }
      );
      return { admissions, bedMap: buildBedMap(admissions) };
    });
  },

  dischargePatient(id, summary, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => {
      const admissions = s.admissions.map((a) =>
        a.id !== id ? a : {
          ...a,
          status:          "Discharged" as AdmissionStatus,
          dischargeSummary: summary,
          statusHistory:   [
            ...a.statusHistory,
            { at: now, by, status: "Discharged" as AdmissionStatus, note: "Discharged" },
          ],
        }
      );
      return { admissions, bedMap: buildBedMap(admissions) };
    });
  },

  transferBed(id, newWard, newBed, by) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => {
      const admissions = s.admissions.map((a) =>
        a.id !== id ? a : {
          ...a,
          ward: newWard,
          bed:  newBed,
          statusHistory: [
            ...a.statusHistory,
            {
              at: now, by,
              status: a.status,
              note: `Transferred to ${newWard} — Bed ${newBed}`,
            },
          ],
        }
      );
      return { admissions, bedMap: buildBedMap(admissions) };
    });
  },

  updateNotes(id, notes) {
    set((s) => ({
      admissions: s.admissions.map((a) =>
        a.id !== id ? a : { ...a, clinicalNotes: notes }
      ),
    }));
  },

  getById(id) {
    return get().admissions.find((a) => a.id === id);
  },

  getByPatient(patientId) {
    return get().admissions.filter((a) => a.patientId === patientId);
  },
}));

export type { Admission, AdmissionStatus, AdmissionPriority, BedInfo };
