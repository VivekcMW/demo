import { create } from "zustand";
import { seedPatients, type Patient, type BloodGroup, type Sex } from "@/data/seedPatients";
import { api } from "@/services/apiClient";

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

interface PatientStore {
  patients: Patient[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
  addPatient: (payload: NewPatientPayload) => Promise<Patient>;
  updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>;
  searchPatients: (query: string) => Patient[];
  getById: (id: string) => Patient | undefined;
  refresh: () => Promise<void>;
}

function enrichFromSeed(apiPatient: Record<string, unknown>): Patient {
  const id = apiPatient.id as string;
  const seed = seedPatients.find((p) => p.id === id);
  return {
    id,
    uhid: (apiPatient.uhid as string) ?? "",
    name: apiPatient.name as string,
    age: apiPatient.age as number,
    dob: (apiPatient.dob as string) ?? "",
    sex: apiPatient.sex as Sex,
    bloodGroup: (apiPatient.bloodGroup as BloodGroup) ?? "Unknown",
    phone: apiPatient.phone as string,
    altPhone: apiPatient.altPhone as string | undefined,
    address: (apiPatient.address as string) ?? "",
    idProofType: (apiPatient.idProofType as Patient["idProofType"]) ?? "Aadhaar",
    idProofNumber: (apiPatient.idProofNumber as string) ?? "",
    abhaId: apiPatient.abhaId as string | undefined,
    email: apiPatient.email as string | undefined,
    occupation: apiPatient.occupation as string | undefined,
    emergencyContactName: (apiPatient.emergencyContactName as string) ?? "",
    emergencyContactPhone: (apiPatient.emergencyContactPhone as string) ?? "",
    allergies: (apiPatient.allergies as string[]) ?? seed?.allergies ?? [],
    chronicConditions: (apiPatient.chronicConditions as Patient["chronicConditions"]) ?? seed?.chronicConditions ?? [],
    insurance: seed?.insurance,
    registeredAt: (apiPatient.registeredAt as string) ?? new Date().toISOString(),
    lastVisit: apiPatient.lastVisit as string | undefined,
    vitals: seed?.vitals,
    visits: seed?.visits ?? [],
    labs: seed?.labs ?? [],
    medications: seed?.medications ?? [],
    documents: seed?.documents ?? [],
  };
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
  loading: false,
  initialized: false,
  error: null,

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<{ data: Record<string, unknown>[] }>("/patients");
      if (res?.data) {
        const merged = res.data.map(enrichFromSeed);
        set({ patients: merged, loading: false, initialized: true });
      }
    } catch (e) {
      set({ loading: false, error: (e as Error).message });
    }
  },

  addPatient: async (payload) => {
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

  updatePatient: async (id, updates) => {
    set((s) => ({
      patients: s.patients.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  },

  searchPatients(query) {
    const q = query.toLowerCase();
    return get().patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.uhid.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.id?.toLowerCase().includes(q),
    );
  },

  getById(id) {
    return get().patients.find((p) => p.id === id);
  },
}));
