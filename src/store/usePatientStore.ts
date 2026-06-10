import { create } from "zustand";
import { seedPatients, type Patient, type BloodGroup, type ChronicCondition, type Sex } from "@/data/seedPatients";

// ── New patient payload (from walk-in registration) ──────────────────────────

export interface NewPatientPayload {
  name: string;
  age: number;
  dob?: string;
  sex: Sex;
  bloodGroup?: BloodGroup;
  phone: string;
  altPhone?: string;
  address?: string;
  idProofType?: string;
  idProofNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  allergies?: string[];
}

// ── Store state & actions ─────────────────────────────────────────────────────

interface PatientStore {
  patients: Patient[];
  addPatient: (payload: NewPatientPayload) => Patient;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  searchPatients: (query: string) => Patient[];
  getById: (id: string) => Patient | undefined;
}

let nextId = seedPatients.length + 1;

function generateId(): string {
  const n = String(nextId++).padStart(4, "0");
  return `PT-${n}`;
}

function generateUhid(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `UHID-${year}${rand}`;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  patients: seedPatients,

  addPatient(payload) {
    const newPatient: Patient = {
      id: generateId(),
      uhid: generateUhid(),
      name: payload.name,
      age: payload.age,
      dob: payload.dob ?? "",
      sex: payload.sex,
      bloodGroup: payload.bloodGroup ?? "Unknown",
      phone: payload.phone,
      altPhone: payload.altPhone,
      address: payload.address ?? "",
      idProofType: (payload.idProofType as Patient["idProofType"]) ?? "Aadhaar",
      idProofNumber: payload.idProofNumber ?? "",
      emergencyContactName: payload.emergencyContactName ?? "",
      emergencyContactPhone: payload.emergencyContactPhone ?? "",
      allergies: payload.allergies ?? [],
      chronicConditions: [],
      registeredAt: new Date().toISOString().split("T")[0],
      visits: [],
      labs: [],
      medications: [],
      documents: [],
    };
    set((s) => ({ patients: [newPatient, ...s.patients] }));
    return newPatient;
  },

  updatePatient(id, updates) {
    set((s) => ({
      patients: s.patients.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  },

  searchPatients(query) {
    const q = query.toLowerCase().trim();
    if (!q) return get().patients;
    return get().patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.uhid.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.abhaId?.toLowerCase().includes(q) ?? false)
    );
  },

  getById(id) {
    return get().patients.find((p) => p.id === id);
  },
}));
