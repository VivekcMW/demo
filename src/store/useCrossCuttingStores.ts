import { create } from "zustand";

// ── CSSD / Sterilization ──────────────────────────────────────────────────────

export interface CSSDInstrument {
  id: string; name: string; category: string; quantity: number; reorderLevel: number;
}
export interface CSSDCycle {
  id: string; date: string; autoclaveId: string; autoclaveName: string;
  cycleType: "Pre-vac" | "Gravity" | "Low Temp" | "ETO"; loadContents: string;
  temp: number; pressure: number; durationMin: number;
  chemicalIndicator: "Pass" | "Fail"; biologicalIndicator: "Pass" | "Fail" | "Pending";
  operator: string; status: "Completed" | "In Progress" | "Failed" | "Scheduled";
  notes?: string;
}

const seedInstruments: CSSDInstrument[] = [
  { id: "CST-001", name: "Laparoscopic Grasper", category: "Laparoscopy", quantity: 12, reorderLevel: 5 },
  { id: "CST-002", name: "Kelly Clamp", category: "General Surgery", quantity: 30, reorderLevel: 10 },
  { id: "CST-003", name: "Mosquito Forceps", category: "General Surgery", quantity: 40, reorderLevel: 15 },
  { id: "CST-004", name: "Needle Holder", category: "General Surgery", quantity: 25, reorderLevel: 8 },
  { id: "CST-005", name: "Bone Drill Bit (4mm)", category: "Orthopedics", quantity: 8, reorderLevel: 4 },
  { id: "CST-006", name: "Phacoemulsification Tip", category: "Ophthalmology", quantity: 4, reorderLevel: 2 },
  { id: "CST-007", name: "Surgical Scissors (Metzenbaum)", category: "General Surgery", quantity: 20, reorderLevel: 8 },
  { id: "CST-008", name: "Retractor (Army-Navy)", category: "General Surgery", quantity: 15, reorderLevel: 6 },
];

const seedCycles: CSSDCycle[] = [
  { id: "AUTO-001", date: "2026-06-15T06:00:00", autoclaveId: "AC-01", autoclaveName: "Autoclave #1 (Main OT)", cycleType: "Pre-vac", loadContents: "Lap chole set (5 trays) + minor set (3 trays)", temp: 134, pressure: 30, durationMin: 45, chemicalIndicator: "Pass", biologicalIndicator: "Pass", operator: "Nurse Radhika", status: "Completed" },
  { id: "AUTO-002", date: "2026-06-15T07:00:00", autoclaveId: "AC-01", autoclaveName: "Autoclave #1 (Main OT)", cycleType: "Gravity", loadContents: "Wrapped gowns (12), drapes (20)", temp: 121, pressure: 15, durationMin: 60, chemicalIndicator: "Pass", biologicalIndicator: "Pending", operator: "Nurse Radhika", status: "Completed" },
  { id: "AUTO-003", date: "2026-06-15T08:00:00", autoclaveId: "AC-02", autoclaveName: "Autoclave #2 (Endoscopy)", cycleType: "Low Temp", loadContents: "Endoscope (2), camera heads (3)", temp: 60, pressure: 0, durationMin: 30, chemicalIndicator: "Pass", biologicalIndicator: "Pending", operator: "Nurse Deepa", status: "In Progress" },
];

export interface CSSDStore { instruments: CSSDInstrument[]; cycles: CSSDCycle[]; }
export const useCSSDStore = create<CSSDStore>(() => ({ instruments: seedInstruments, cycles: seedCycles }));

// ── Birth & Death Registration ────────────────────────────────────────────────

export interface BirthRegistration {
  id: string; babyName: string; dob: string; time: string; sex: "M"|"F"|"O";
  motherName: string; fatherName: string; motherId: string;
  birthWeight: number; birthLength: number; deliveryType: "Normal"|"C-Section"|"Forceps"|"Vacuum";
  placeOfBirth: string; hospitalName: string; doctorName: string; certificateNumber?: string; registered: boolean;
}

export interface DeathRegistration {
  id: string; deceasedName: string; patientId: string; dod: string; time: string; age: number; sex: "M"|"F";
  causeOfDeath: string; icdCode?: string; placeOfDeath: string; certifiedBy: string; certificateNumber?: string; registered: boolean;
}

const seedBirths: BirthRegistration[] = [
  { id: "BTH-001", babyName: "Baby Girl Nair", dob: "2026-06-10", time: "14:32", sex: "F", motherName: "Deepa Venkataraman", fatherName: "Suresh Nair", motherId: "PT-0015", birthWeight: 3.15, birthLength: 50, deliveryType: "C-Section", placeOfBirth: "OT 1 — Major", hospitalName: "Demo Tech Hospital", doctorName: "Dr. Ananya Krishnan", certificateNumber: "BC-2026-001", registered: true },
  { id: "BTH-002", babyName: "Baby Boy Gupta", dob: "2026-06-12", time: "08:15", sex: "M", motherName: "Sunita Devi Yadav", fatherName: "Ramesh Gupta", motherId: "PT-0008", birthWeight: 2.95, birthLength: 49, deliveryType: "Normal", placeOfBirth: "Delivery Suite", hospitalName: "Demo Tech Hospital", doctorName: "Dr. Ananya Krishnan", certificateNumber: "BC-2026-002", registered: true },
];

const seedDeaths: DeathRegistration[] = [
  { id: "DTH-001", deceasedName: "Shiv Shankar Yadav", patientId: "PT-0010", dod: "2026-06-14", time: "11:40", age: 62, sex: "M", causeOfDeath: "Cardiorespiratory arrest due to septic shock (urosepsis)", icdCode: "R57.2", placeOfDeath: "ICU Bed 3", certifiedBy: "Dr. Suresh Nair", registered: true },
];

export interface RegistrationStore { births: BirthRegistration[]; deaths: DeathRegistration[]; }
export const useRegistrationStore = create<RegistrationStore>(() => ({ births: seedBirths, deaths: seedDeaths }));

// ── Ambulance / Transport ─────────────────────────────────────────────────────

export type AmbulanceStatus = "Available" | "On Call" | "En Route" | "At Scene" | "Transporting" | "Returning" | "Out of Service";
export interface Ambulance { id: string; vehicleNo: string; type: "Basic" | "ALS" | "Mobile ICU" | "Patient Transport"; equipment: string[]; crewCount: number; status: AmbulanceStatus; }
export interface AmbulanceTrip { id: string; ambulanceId: string; callTime: string; pickup: string; dropoff: string; patientName: string; patientId?: string; reason: string; crew: string[]; distance?: number; status: "Dispatched" | "Arrived" | "Transporting" | "Completed" | "Cancelled"; }

const seedAmbulances: Ambulance[] = [
  { id: "AMB-001", vehicleNo: "TN-01-AB-1234", type: "ALS", equipment: ["Defibrillator", "Ventilator", "Suction", "SpO2/ECG", "O2", "Stretcher", "Cervical collar"], crewCount: 2, status: "Available" },
  { id: "AMB-002", vehicleNo: "TN-01-AB-5678", type: "Basic", equipment: ["O2", "Stretcher", "First Aid"], crewCount: 2, status: "Available" },
  { id: "AMB-003", vehicleNo: "TN-01-CD-9012", type: "Mobile ICU", equipment: ["Ventilator", "Defibrillator", "Infusion pumps", "ECG monitor", "Blood gas analyzer", "O2", "Suction", "Stretcher"], crewCount: 3, status: "On Call" },
];

const seedTrips: AmbulanceTrip[] = [
  { id: "TRIP-001", ambulanceId: "AMB-003", callTime: "2026-06-15T09:15:00", pickup: "Patient Home — Anna Nagar", dropoff: "Demo Tech Hospital ER", patientName: "Krishna Murthy", reason: "Chest pain, suspected ACS", crew: ["EMT Rajesh", "Paramedic Sunita", "Driver Kumar"], status: "Completed" },
];

export interface AmbulanceStore { ambulances: Ambulance[]; trips: AmbulanceTrip[]; }
export const useAmbulanceStore = create<AmbulanceStore>(() => ({ ambulances: seedAmbulances, trips: seedTrips }));
