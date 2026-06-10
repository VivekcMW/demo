// ── Types ────────────────────────────────────────────────────────────────────

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "Unknown";
export type Sex = "M" | "F" | "O";
export type IdProofType = "Aadhaar" | "PAN" | "ABHA" | "Voter ID" | "Passport" | "Driving Licence";
export type ChronicCondition = "DM" | "HTN" | "CKD" | "Asthma" | "CAD" | "Hypothyroid" | "COPD" | "Arthritis" | "Epilepsy" | "Obesity";

export interface Vitals {
  bp?: string;       // "120/80"
  pulse?: number;    // bpm
  spo2?: number;     // %
  temp?: number;     // °C
  weight?: number;   // kg
  height?: number;   // cm
  bmi?: number;
  recordedAt: string; // ISO date
}

export interface Visit {
  id: string;
  date: string;         // "YYYY-MM-DD"
  type: "OPD" | "IPD" | "Emergency" | "Tele";
  doctor: string;
  dept: string;
  chiefComplaint: string;
  diagnosis?: string;
  notes?: string;
  status: "Completed" | "Follow-up Needed" | "Admitted" | "Discharged";
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  value: string;
  unit: string;
  refRange: string;
  flag?: "H" | "L" | "HH" | "LL" | "N"; // Normal by default
  orderedBy: string;
}

export interface Medication {
  id: string;
  drug: string;
  dose: string;
  frequency: string;
  route: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  active: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: "ID Proof" | "Insurance" | "Lab Report" | "Prescription" | "Discharge Summary" | "Other";
  uploadedAt: string;
  size: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  validUntil: string;
  coverageType: string;
}

export interface Patient {
  id: string;         // PT-XXXX
  uhid: string;       // UHID-XXXXXXXX
  name: string;
  age: number;
  dob: string;
  sex: Sex;
  bloodGroup: BloodGroup;
  phone: string;
  altPhone?: string;
  address: string;
  idProofType: IdProofType;
  idProofNumber: string;
  abhaId?: string;
  email?: string;
  occupation?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  allergies: string[];
  chronicConditions: ChronicCondition[];
  insurance?: InsuranceInfo;
  registeredAt: string;  // ISO date
  lastVisit?: string;
  vitals?: Vitals;
  visits: Visit[];
  labs: LabResult[];
  medications: Medication[];
  documents: Document[];
}

// ── Seed: 30 Patients ────────────────────────────────────────────────────────

export const seedPatients: Patient[] = [
  {
    id: "PT-0001",
    uhid: "UHID-20240001",
    name: "Ravi Teja",
    age: 42,
    dob: "1984-03-15",
    sex: "M",
    bloodGroup: "B+",
    phone: "9876543210",
    address: "12, MG Road, Hyderabad, Telangana - 500001",
    idProofType: "Aadhaar",
    idProofNumber: "2345-6789-0123",
    abhaId: "91-4521-3872-5612",
    emergencyContactName: "Sita Teja",
    emergencyContactPhone: "9876543211",
    allergies: ["Penicillin"],
    chronicConditions: ["HTN", "DM"],
    insurance: { provider: "Star Health", policyNumber: "SH-2024-88321", validUntil: "2027-03-31", coverageType: "Family Floater" },
    registeredAt: "2024-01-10",
    lastVisit: "2026-06-10",
    vitals: { bp: "138/88", pulse: 78, spo2: 98, temp: 37.1, weight: 82, height: 172, bmi: 27.7, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-001", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "BP review + fatigue", diagnosis: "HTN stage 2, T2DM controlled", status: "Follow-up Needed" },
      { id: "V-002", date: "2026-03-05", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Routine checkup", diagnosis: "HTN, DM follow-up", status: "Completed" },
    ],
    labs: [
      { id: "L-001", testName: "HbA1c", date: "2026-06-08", value: "7.8", unit: "%", refRange: "4.0–5.6", flag: "H", orderedBy: "Dr. Sharma" },
      { id: "L-002", testName: "Fasting Blood Sugar", date: "2026-06-08", value: "142", unit: "mg/dL", refRange: "70–100", flag: "H", orderedBy: "Dr. Sharma" },
      { id: "L-003", testName: "Serum Creatinine", date: "2026-06-08", value: "1.1", unit: "mg/dL", refRange: "0.7–1.3", flag: "N", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-001", drug: "Metformin", dose: "500 mg", frequency: "BD", route: "Oral", startDate: "2024-01-10", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-002", drug: "Amlodipine", dose: "5 mg", frequency: "OD", route: "Oral", startDate: "2024-01-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [
      { id: "D-001", name: "Aadhaar Card.pdf", type: "ID Proof", uploadedAt: "2024-01-10", size: "240 KB" },
      { id: "D-002", name: "Star Health Policy.pdf", type: "Insurance", uploadedAt: "2024-01-10", size: "1.2 MB" },
    ],
  },
  {
    id: "PT-0002",
    uhid: "UHID-20240002",
    name: "Sunita Devi",
    age: 58,
    dob: "1968-07-22",
    sex: "F",
    bloodGroup: "O+",
    phone: "9845021300",
    address: "45, Civil Lines, Patna, Bihar - 800001",
    idProofType: "ABHA",
    idProofNumber: "71-2341-8801-4512",
    abhaId: "71-2341-8801-4512",
    emergencyContactName: "Ram Prasad",
    emergencyContactPhone: "9845021301",
    allergies: ["Sulfa", "NSAIDs"],
    chronicConditions: ["DM", "Hypothyroid"],
    registeredAt: "2024-02-14",
    lastVisit: "2026-06-10",
    vitals: { bp: "126/80", pulse: 72, spo2: 99, temp: 36.9, weight: 68, height: 158, bmi: 27.2, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-003", date: "2026-06-10", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Thyroid follow-up, fatigue", diagnosis: "Hypothyroidism — dose adjustment", status: "Completed" },
    ],
    labs: [
      { id: "L-004", testName: "TSH", date: "2026-06-07", value: "6.8", unit: "mIU/L", refRange: "0.4–4.0", flag: "H", orderedBy: "Dr. Sharma" },
      { id: "L-005", testName: "Free T4", date: "2026-06-07", value: "0.72", unit: "ng/dL", refRange: "0.8–1.8", flag: "L", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-003", drug: "Levothyroxine", dose: "75 mcg", frequency: "OD (empty stomach)", route: "Oral", startDate: "2024-02-14", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0003",
    uhid: "UHID-20240003",
    name: "Arjun Patel",
    age: 31,
    dob: "1995-11-08",
    sex: "M",
    bloodGroup: "A+",
    phone: "9712345678",
    address: "7, Satellite Road, Ahmedabad, Gujarat - 380015",
    idProofType: "PAN",
    idProofNumber: "ABCPJ1234A",
    emergencyContactName: "Minal Patel",
    emergencyContactPhone: "9712345679",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2024-03-01",
    lastVisit: "2026-06-10",
    vitals: { bp: "118/76", pulse: 68, spo2: 99, temp: 37.0, weight: 74, height: 175, bmi: 24.2, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-004", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Fever and sore throat × 3 days", diagnosis: "Viral pharyngitis", status: "Completed" },
    ],
    labs: [
      { id: "L-006", testName: "CBC — WBC", date: "2026-06-10", value: "9.2", unit: "K/µL", refRange: "4.5–11.0", flag: "N", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-004", drug: "Paracetamol", dose: "650 mg", frequency: "TDS × 3 days", route: "Oral", startDate: "2026-06-10", endDate: "2026-06-13", prescribedBy: "Dr. Sharma", active: false },
    ],
    documents: [],
  },
  {
    id: "PT-0004",
    uhid: "UHID-20230004",
    name: "Meena Sharma",
    age: 65,
    dob: "1961-04-18",
    sex: "F",
    bloodGroup: "AB+",
    phone: "9900112233",
    address: "Sector 22, Chandigarh - 160022",
    idProofType: "Voter ID",
    idProofNumber: "CHD/11/223344",
    abhaId: "82-3312-7654-1234",
    emergencyContactName: "Suresh Sharma",
    emergencyContactPhone: "9900112234",
    allergies: ["Latex", "Contrast dye"],
    chronicConditions: ["HTN", "CAD", "CKD"],
    insurance: { provider: "New India Assurance", policyNumber: "NIA-654321", validUntil: "2026-12-31", coverageType: "Individual" },
    registeredAt: "2023-06-15",
    lastVisit: "2026-06-10",
    vitals: { bp: "148/92", pulse: 82, spo2: 97, temp: 37.2, weight: 63, height: 155, bmi: 26.2, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-005", date: "2026-06-10", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "BP uncontrolled, ankle swelling", diagnosis: "HTN — uncontrolled, CCF stage II", notes: "Echo ordered, cardiology referral given", status: "Follow-up Needed" },
      { id: "V-006", date: "2026-02-10", type: "IPD", doctor: "Dr. Mehta", dept: "Cardiology", chiefComplaint: "Chest pain", diagnosis: "NSTEMI", status: "Discharged" },
    ],
    labs: [
      { id: "L-007", testName: "Serum Creatinine", date: "2026-06-08", value: "2.1", unit: "mg/dL", refRange: "0.5–1.1", flag: "HH", orderedBy: "Dr. Sharma" },
      { id: "L-008", testName: "eGFR", date: "2026-06-08", value: "38", unit: "mL/min/1.73m²", refRange: ">60", flag: "LL", orderedBy: "Dr. Sharma" },
      { id: "L-009", testName: "BNP", date: "2026-06-08", value: "820", unit: "pg/mL", refRange: "<100", flag: "HH", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-005", drug: "Furosemide", dose: "40 mg", frequency: "OD", route: "Oral", startDate: "2026-02-15", prescribedBy: "Dr. Mehta", active: true },
      { id: "M-006", drug: "Atorvastatin", dose: "40 mg", frequency: "OD (night)", route: "Oral", startDate: "2023-06-15", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-007", drug: "Aspirin", dose: "75 mg", frequency: "OD", route: "Oral", startDate: "2026-02-15", prescribedBy: "Dr. Mehta", active: true },
    ],
    documents: [
      { id: "D-003", name: "Echo Report Feb 2026.pdf", type: "Lab Report", uploadedAt: "2026-02-20", size: "2.1 MB" },
      { id: "D-004", name: "NIA Insurance Card.jpg", type: "Insurance", uploadedAt: "2023-06-15", size: "380 KB" },
    ],
  },
  {
    id: "PT-0005",
    uhid: "UHID-20240005",
    name: "Kiran Bhat",
    age: 28,
    dob: "1998-09-30",
    sex: "M",
    bloodGroup: "B-",
    phone: "9632587410",
    address: "3rd Block, Jayanagar, Bengaluru - 560011",
    idProofType: "Aadhaar",
    idProofNumber: "9876-5432-1098",
    emergencyContactName: "Meera Bhat",
    emergencyContactPhone: "9632587411",
    allergies: [],
    chronicConditions: ["Asthma"],
    registeredAt: "2024-04-12",
    lastVisit: "2026-06-10",
    vitals: { bp: "112/72", pulse: 76, spo2: 96, temp: 37.0, weight: 65, height: 170, bmi: 22.5, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-007", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Wheezing, shortness of breath", diagnosis: "Acute exacerbation of asthma", status: "Completed" },
    ],
    labs: [
      { id: "L-010", testName: "Peak Flow Rate", date: "2026-06-10", value: "310", unit: "L/min", refRange: "480–620", flag: "LL", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-008", drug: "Salbutamol inhaler", dose: "100 mcg", frequency: "SOS", route: "Inhalation", startDate: "2024-04-12", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-009", drug: "Budesonide inhaler", dose: "200 mcg", frequency: "BD", route: "Inhalation", startDate: "2024-04-12", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0006",
    uhid: "UHID-20240006",
    name: "Priya Nair",
    age: 34,
    dob: "1992-01-25",
    sex: "F",
    bloodGroup: "O-",
    phone: "9448832100",
    address: "Fort Kochi, Ernakulam, Kerala - 682001",
    idProofType: "Passport",
    idProofNumber: "P1234567",
    emergencyContactName: "Anand Nair",
    emergencyContactPhone: "9448832101",
    allergies: ["Codeine"],
    chronicConditions: [],
    registeredAt: "2024-05-20",
    lastVisit: "2026-06-10",
    vitals: { bp: "110/70", pulse: 70, spo2: 99, temp: 36.8, weight: 56, height: 162, bmi: 21.3, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-008", date: "2026-06-10", type: "Tele", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Migraine, nausea", diagnosis: "Migraine without aura", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-010", drug: "Sumatriptan", dose: "50 mg", frequency: "SOS", route: "Oral", startDate: "2026-06-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0007",
    uhid: "UHID-20230007",
    name: "Mohan Lal",
    age: 72,
    dob: "1954-12-03",
    sex: "M",
    bloodGroup: "A-",
    phone: "9312000055",
    address: "Lodi Colony, New Delhi - 110003",
    idProofType: "Aadhaar",
    idProofNumber: "1122-3344-5566",
    abhaId: "54-8821-3309-7755",
    emergencyContactName: "Kamla Lal",
    emergencyContactPhone: "9312000056",
    allergies: ["Aspirin", "Iodine contrast"],
    chronicConditions: ["CAD", "HTN", "DM", "CKD"],
    insurance: { provider: "CGHS", policyNumber: "CGHS-DLH-77423", validUntil: "2027-03-31", coverageType: "Govt Employee" },
    registeredAt: "2023-03-08",
    lastVisit: "2026-06-10",
    vitals: { bp: "152/96", pulse: 88, spo2: 96, temp: 37.3, weight: 71, height: 168, bmi: 25.2, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-009", date: "2026-06-10", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Chest heaviness, pedal edema", diagnosis: "CAD + CCF — decompensated", notes: "Admitted for observation", status: "Admitted" },
      { id: "V-010", date: "2025-12-20", type: "IPD", doctor: "Dr. Mehta", dept: "Cardiology", chiefComplaint: "STEMI", diagnosis: "Anterior STEMI — post PCI", status: "Discharged" },
    ],
    labs: [
      { id: "L-011", testName: "Troponin I", date: "2026-06-10", value: "1.8", unit: "ng/mL", refRange: "<0.04", flag: "HH", orderedBy: "Dr. Sharma" },
      { id: "L-012", testName: "NT-proBNP", date: "2026-06-10", value: "4200", unit: "pg/mL", refRange: "<125", flag: "HH", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-011", drug: "Clopidogrel", dose: "75 mg", frequency: "OD", route: "Oral", startDate: "2025-12-22", prescribedBy: "Dr. Mehta", active: true },
      { id: "M-012", drug: "Bisoprolol", dose: "5 mg", frequency: "OD", route: "Oral", startDate: "2025-12-22", prescribedBy: "Dr. Mehta", active: true },
      { id: "M-013", drug: "Ramipril", dose: "5 mg", frequency: "OD", route: "Oral", startDate: "2025-12-22", prescribedBy: "Dr. Mehta", active: true },
    ],
    documents: [
      { id: "D-005", name: "Cath Lab Report Dec 2025.pdf", type: "Lab Report", uploadedAt: "2025-12-22", size: "3.4 MB" },
      { id: "D-006", name: "Discharge Summary Dec 2025.pdf", type: "Discharge Summary", uploadedAt: "2025-12-22", size: "1.1 MB" },
    ],
  },
  {
    id: "PT-0008",
    uhid: "UHID-20240008",
    name: "Fatima Sheikh",
    age: 45,
    dob: "1981-06-14",
    sex: "F",
    bloodGroup: "B+",
    phone: "9876001234",
    address: "Mohammed Ali Road, Mumbai - 400003",
    idProofType: "Aadhaar",
    idProofNumber: "4455-6677-8899",
    emergencyContactName: "Ibrahim Sheikh",
    emergencyContactPhone: "9876001235",
    allergies: [],
    chronicConditions: ["HTN", "Obesity"],
    registeredAt: "2024-06-01",
    lastVisit: "2026-06-10",
    vitals: { bp: "144/90", pulse: 80, spo2: 98, temp: 37.0, weight: 92, height: 160, bmi: 35.9, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-011", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Headache, giddiness", diagnosis: "HTN — poorly controlled", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-013", testName: "Fasting Lipid Profile — LDL", date: "2026-06-09", value: "182", unit: "mg/dL", refRange: "<100", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-014", drug: "Telmisartan", dose: "40 mg", frequency: "OD", route: "Oral", startDate: "2024-06-01", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0009",
    uhid: "UHID-20240009",
    name: "Rajesh Kumar",
    age: 53,
    dob: "1973-02-28",
    sex: "M",
    bloodGroup: "O+",
    phone: "9511223344",
    address: "Gomti Nagar, Lucknow - 226010",
    idProofType: "PAN",
    idProofNumber: "DEFPK5678B",
    emergencyContactName: "Seema Kumar",
    emergencyContactPhone: "9511223345",
    allergies: [],
    chronicConditions: ["DM", "HTN"],
    registeredAt: "2024-07-22",
    lastVisit: "2026-06-01",
    vitals: { bp: "130/84", pulse: 74, spo2: 98, temp: 36.9, weight: 78, height: 170, bmi: 27.0, recordedAt: "2026-06-01" },
    visits: [
      { id: "V-012", date: "2026-06-01", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Routine DM follow-up", diagnosis: "T2DM — adequate control", status: "Completed" },
    ],
    labs: [
      { id: "L-014", testName: "HbA1c", date: "2026-05-30", value: "6.9", unit: "%", refRange: "4.0–5.6", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-015", drug: "Glimepiride", dose: "2 mg", frequency: "OD (before breakfast)", route: "Oral", startDate: "2024-07-22", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0010",
    uhid: "UHID-20240010",
    name: "Anita Joshi",
    age: 39,
    dob: "1987-08-11",
    sex: "F",
    bloodGroup: "AB-",
    phone: "9900445566",
    address: "Shivajinagar, Pune - 411005",
    idProofType: "Driving Licence",
    idProofNumber: "MH-12-20150044443",
    emergencyContactName: "Vikram Joshi",
    emergencyContactPhone: "9900445567",
    allergies: ["Penicillin", "Amoxicillin"],
    chronicConditions: ["Arthritis"],
    registeredAt: "2024-08-30",
    lastVisit: "2026-06-10",
    vitals: { bp: "116/74", pulse: 76, spo2: 99, temp: 37.1, weight: 60, height: 163, bmi: 22.6, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-013", date: "2026-06-10", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Joint pain, morning stiffness", diagnosis: "Rheumatoid Arthritis — active disease", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-015", testName: "RA Factor", date: "2026-06-08", value: "128", unit: "IU/mL", refRange: "<14", flag: "HH", orderedBy: "Dr. Sharma" },
      { id: "L-016", testName: "CRP", date: "2026-06-08", value: "42", unit: "mg/L", refRange: "<10", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-016", drug: "Methotrexate", dose: "10 mg", frequency: "Once weekly", route: "Oral", startDate: "2024-08-30", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-017", drug: "Folic acid", dose: "5 mg", frequency: "OD (except MTX day)", route: "Oral", startDate: "2024-08-30", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0011",
    uhid: "UHID-20240011",
    name: "Deepak Verma",
    age: 61,
    dob: "1965-10-05",
    sex: "M",
    bloodGroup: "A+",
    phone: "9090909090",
    address: "Civil Lines, Jaipur - 302006",
    idProofType: "Aadhaar",
    idProofNumber: "3344-5566-7788",
    abhaId: "61-2233-4455-6677",
    emergencyContactName: "Kavita Verma",
    emergencyContactPhone: "9090909091",
    allergies: [],
    chronicConditions: ["COPD", "HTN"],
    insurance: { provider: "ICICI Lombard", policyNumber: "ICL-2025-44321", validUntil: "2026-09-30", coverageType: "Individual" },
    registeredAt: "2024-09-14",
    lastVisit: "2026-06-03",
    vitals: { bp: "134/86", pulse: 84, spo2: 94, temp: 37.0, weight: 68, height: 166, bmi: 24.7, recordedAt: "2026-06-03" },
    visits: [
      { id: "V-014", date: "2026-06-03", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Breathlessness on exertion", diagnosis: "COPD — moderate exacerbation", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-017", testName: "ABG — PaO2", date: "2026-06-03", value: "68", unit: "mmHg", refRange: "75–100", flag: "L", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-018", drug: "Tiotropium", dose: "18 mcg", frequency: "OD", route: "Inhalation", startDate: "2024-09-14", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0012",
    uhid: "UHID-20240012",
    name: "Kavya Reddy",
    age: 27,
    dob: "1999-03-17",
    sex: "F",
    bloodGroup: "B+",
    phone: "9988776655",
    address: "Banjara Hills, Hyderabad - 500034",
    idProofType: "Aadhaar",
    idProofNumber: "6677-8899-0011",
    emergencyContactName: "Sridhar Reddy",
    emergencyContactPhone: "9988776656",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2024-10-01",
    lastVisit: "2026-06-10",
    vitals: { bp: "108/68", pulse: 66, spo2: 100, temp: 36.7, weight: 52, height: 162, bmi: 19.8, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-015", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Severe acidity, burning chest", diagnosis: "GERD", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-019", drug: "Pantoprazole", dose: "40 mg", frequency: "OD (empty stomach)", route: "Oral", startDate: "2026-06-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0013",
    uhid: "UHID-20240013",
    name: "Suresh Iyer",
    age: 48,
    dob: "1978-05-20",
    sex: "M",
    bloodGroup: "O+",
    phone: "9443300221",
    address: "T Nagar, Chennai - 600017",
    idProofType: "Aadhaar",
    idProofNumber: "5544-3322-1100",
    abhaId: "48-5544-3322-1100",
    emergencyContactName: "Malathi Iyer",
    emergencyContactPhone: "9443300222",
    allergies: ["Sulfa"],
    chronicConditions: ["DM", "CKD"],
    registeredAt: "2024-10-10",
    lastVisit: "2026-06-10",
    vitals: { bp: "128/80", pulse: 72, spo2: 98, temp: 37.0, weight: 76, height: 169, bmi: 26.6, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-016", date: "2026-06-10", type: "Tele", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Swelling feet, breathlessness", diagnosis: "CKD stage 3b — fluid overload", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-018", testName: "Serum Creatinine", date: "2026-06-09", value: "2.8", unit: "mg/dL", refRange: "0.7–1.3", flag: "HH", orderedBy: "Dr. Sharma" },
      { id: "L-019", testName: "Potassium", date: "2026-06-09", value: "5.8", unit: "mEq/L", refRange: "3.5–5.0", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-020", drug: "Insulin Glargine", dose: "20 units", frequency: "OD (bedtime)", route: "SC", startDate: "2024-10-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0014",
    uhid: "UHID-20240014",
    name: "Rekha Singh",
    age: 55,
    dob: "1971-09-04",
    sex: "F",
    bloodGroup: "A+",
    phone: "9876002211",
    address: "Gomti Nagar Ext, Lucknow - 226010",
    idProofType: "Voter ID",
    idProofNumber: "UP/22/334455",
    emergencyContactName: "Sanjay Singh",
    emergencyContactPhone: "9876002212",
    allergies: [],
    chronicConditions: ["HTN", "Hypothyroid", "Obesity"],
    registeredAt: "2024-11-02",
    lastVisit: "2026-05-28",
    vitals: { bp: "146/92", pulse: 78, spo2: 98, temp: 37.1, weight: 88, height: 157, bmi: 35.7, recordedAt: "2026-05-28" },
    visits: [
      { id: "V-017", date: "2026-05-28", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Weight gain, fatigue, cold intolerance", diagnosis: "Hypothyroidism — poorly controlled", status: "Completed" },
    ],
    labs: [
      { id: "L-020", testName: "TSH", date: "2026-05-26", value: "9.2", unit: "mIU/L", refRange: "0.4–4.0", flag: "HH", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-021", drug: "Levothyroxine", dose: "100 mcg", frequency: "OD (empty stomach)", route: "Oral", startDate: "2024-11-02", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0015",
    uhid: "UHID-20240015",
    name: "Vinod Gupta",
    age: 50,
    dob: "1976-07-07",
    sex: "M",
    bloodGroup: "B+",
    phone: "9811234567",
    address: "Karol Bagh, Delhi - 110005",
    idProofType: "PAN",
    idProofNumber: "GHIPG7890C",
    emergencyContactName: "Sunita Gupta",
    emergencyContactPhone: "9811234568",
    allergies: ["NSAIDs"],
    chronicConditions: ["DM", "HTN", "CAD"],
    insurance: { provider: "Max Bupa", policyNumber: "MB-2024-33219", validUntil: "2027-06-30", coverageType: "Family Floater" },
    registeredAt: "2024-11-20",
    lastVisit: "2026-06-05",
    vitals: { bp: "136/88", pulse: 76, spo2: 97, temp: 37.0, weight: 85, height: 174, bmi: 28.1, recordedAt: "2026-06-05" },
    visits: [
      { id: "V-018", date: "2026-06-05", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Exertional angina", diagnosis: "Stable angina — CAD", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-021", testName: "Stress ECG", date: "2026-06-04", value: "Positive", unit: "", refRange: "Negative", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-022", drug: "Isosorbide Mononitrate", dose: "20 mg", frequency: "BD", route: "Oral", startDate: "2026-06-05", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0016",
    uhid: "UHID-20250016",
    name: "Nisha Pillai",
    age: 26,
    dob: "2000-02-14",
    sex: "F",
    bloodGroup: "O+",
    phone: "8921334455",
    address: "Vyttila, Kochi - 682019",
    idProofType: "Aadhaar",
    idProofNumber: "7788-9900-1122",
    emergencyContactName: "Thomas Pillai",
    emergencyContactPhone: "8921334456",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2025-01-08",
    lastVisit: "2026-06-08",
    vitals: { bp: "110/70", pulse: 68, spo2: 99, temp: 36.9, weight: 54, height: 158, bmi: 21.6, recordedAt: "2026-06-08" },
    visits: [
      { id: "V-019", date: "2026-06-08", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "UTI symptoms — burning micturition", diagnosis: "Uncomplicated UTI", status: "Completed" },
    ],
    labs: [
      { id: "L-022", testName: "Urine R/M — Pus cells", date: "2026-06-08", value: "20–25", unit: "/HPF", refRange: "0–5", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-023", drug: "Nitrofurantoin", dose: "100 mg", frequency: "BD × 7 days", route: "Oral", startDate: "2026-06-08", endDate: "2026-06-15", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0017",
    uhid: "UHID-20250017",
    name: "Harish Menon",
    age: 44,
    dob: "1982-04-02",
    sex: "M",
    bloodGroup: "A+",
    phone: "9845600112",
    address: "Kozhikode, Kerala - 673001",
    idProofType: "Aadhaar",
    idProofNumber: "2211-4433-6655",
    abhaId: "44-2211-4433-6655",
    emergencyContactName: "Leela Menon",
    emergencyContactPhone: "9845600113",
    allergies: [],
    chronicConditions: ["Epilepsy"],
    registeredAt: "2025-02-19",
    lastVisit: "2026-05-15",
    vitals: { bp: "120/78", pulse: 72, spo2: 99, temp: 37.0, weight: 72, height: 170, bmi: 24.9, recordedAt: "2026-05-15" },
    visits: [
      { id: "V-020", date: "2026-05-15", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "Neurology", chiefComplaint: "Seizure-free follow-up", diagnosis: "Generalised epilepsy — controlled", status: "Completed" },
    ],
    labs: [
      { id: "L-023", testName: "Valproate level", date: "2026-05-14", value: "68", unit: "µg/mL", refRange: "50–100", flag: "N", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-024", drug: "Sodium Valproate", dose: "500 mg", frequency: "BD", route: "Oral", startDate: "2025-02-19", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0018",
    uhid: "UHID-20250018",
    name: "Pooja Sinha",
    age: 33,
    dob: "1993-11-30",
    sex: "F",
    bloodGroup: "B+",
    phone: "9122334455",
    address: "Boring Road, Patna - 800001",
    idProofType: "Aadhaar",
    idProofNumber: "9900-8877-6655",
    emergencyContactName: "Amit Sinha",
    emergencyContactPhone: "9122334456",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2025-03-10",
    lastVisit: "2026-06-09",
    vitals: { bp: "108/70", pulse: 80, spo2: 99, temp: 38.1, weight: 58, height: 162, bmi: 22.1, recordedAt: "2026-06-09" },
    visits: [
      { id: "V-021", date: "2026-06-09", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "High fever, body aches × 4 days", diagnosis: "Dengue fever — NS1 positive", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-024", testName: "NS1 Antigen", date: "2026-06-09", value: "Positive", unit: "", refRange: "Negative", flag: "H", orderedBy: "Dr. Sharma" },
      { id: "L-025", testName: "Platelet count", date: "2026-06-09", value: "82000", unit: "/µL", refRange: "150000–400000", flag: "LL", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-025", drug: "Paracetamol", dose: "650 mg", frequency: "TDS", route: "Oral", startDate: "2026-06-09", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0019",
    uhid: "UHID-20250019",
    name: "Santosh Yadav",
    age: 37,
    dob: "1989-08-25",
    sex: "M",
    bloodGroup: "O+",
    phone: "9567891234",
    address: "Manikonda, Hyderabad - 500089",
    idProofType: "Aadhaar",
    idProofNumber: "1133-5577-9911",
    emergencyContactName: "Laxmi Yadav",
    emergencyContactPhone: "9567891235",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2025-04-22",
    lastVisit: "2026-06-10",
    vitals: { bp: "122/80", pulse: 74, spo2: 98, temp: 37.0, weight: 77, height: 173, bmi: 25.7, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-022", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Cough, cold × 1 week", diagnosis: "URTI — viral", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-026", drug: "Cetirizine", dose: "10 mg", frequency: "OD (night)", route: "Oral", startDate: "2026-06-10", endDate: "2026-06-17", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0020",
    uhid: "UHID-20250020",
    name: "Divya Menon",
    age: 29,
    dob: "1997-12-01",
    sex: "F",
    bloodGroup: "A+",
    phone: "9048123456",
    address: "Thrissur, Kerala - 680001",
    idProofType: "Aadhaar",
    idProofNumber: "4466-8811-2255",
    emergencyContactName: "Rajesh Menon",
    emergencyContactPhone: "9048123457",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2025-05-03",
    lastVisit: "2026-06-07",
    vitals: { bp: "106/68", pulse: 78, spo2: 99, temp: 36.8, weight: 50, height: 156, bmi: 20.5, recordedAt: "2026-06-07" },
    visits: [
      { id: "V-023", date: "2026-06-07", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Irregular periods, weight gain", diagnosis: "PCOS — suspect, USS ordered", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-026", testName: "LH/FSH Ratio", date: "2026-06-07", value: "3.2", unit: "", refRange: "<2.0", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [],
    documents: [],
  },
  {
    id: "PT-0021",
    uhid: "UHID-20250021",
    name: "Gopal Krishnan",
    age: 67,
    dob: "1959-01-19",
    sex: "M",
    bloodGroup: "O+",
    phone: "9442211333",
    address: "Madurai, Tamil Nadu - 625001",
    idProofType: "Aadhaar",
    idProofNumber: "3322-1100-9988",
    abhaId: "67-3322-1100-9988",
    emergencyContactName: "Saraswathi Krishnan",
    emergencyContactPhone: "9442211334",
    allergies: ["Penicillin"],
    chronicConditions: ["DM", "HTN", "CKD", "CAD"],
    insurance: { provider: "Oriental Insurance", policyNumber: "OI-2023-11122", validUntil: "2026-11-30", coverageType: "Senior Citizen" },
    registeredAt: "2023-08-05",
    lastVisit: "2026-06-02",
    vitals: { bp: "158/98", pulse: 86, spo2: 96, temp: 37.3, weight: 73, height: 165, bmi: 26.8, recordedAt: "2026-06-02" },
    visits: [
      { id: "V-024", date: "2026-06-02", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Reduced urine output, breathless", diagnosis: "CKD stage 4 — AKI on CKD", notes: "Nephrology referral given", status: "Admitted" },
    ],
    labs: [
      { id: "L-027", testName: "Serum Creatinine", date: "2026-06-02", value: "4.2", unit: "mg/dL", refRange: "0.7–1.3", flag: "HH", orderedBy: "Dr. Sharma" },
      { id: "L-028", testName: "Urea", date: "2026-06-02", value: "112", unit: "mg/dL", refRange: "10–50", flag: "HH", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-027", drug: "Erythropoietin", dose: "4000 IU", frequency: "3× per week", route: "SC", startDate: "2025-01-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [
      { id: "D-007", name: "Renal Biopsy 2024.pdf", type: "Lab Report", uploadedAt: "2024-04-15", size: "4.2 MB" },
    ],
  },
  {
    id: "PT-0022",
    uhid: "UHID-20250022",
    name: "Amrita Bose",
    age: 35,
    dob: "1991-06-22",
    sex: "F",
    bloodGroup: "B+",
    phone: "9831002233",
    address: "Salt Lake, Kolkata - 700064",
    idProofType: "Aadhaar",
    idProofNumber: "5566-7788-9900",
    emergencyContactName: "Subhash Bose",
    emergencyContactPhone: "9831002234",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2025-06-15",
    lastVisit: "2026-06-04",
    vitals: { bp: "112/72", pulse: 72, spo2: 99, temp: 36.8, weight: 58, height: 165, bmi: 21.3, recordedAt: "2026-06-04" },
    visits: [
      { id: "V-025", date: "2026-06-04", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Vertigo, tinnitus", diagnosis: "BPPV", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-028", drug: "Betahistine", dose: "16 mg", frequency: "TDS", route: "Oral", startDate: "2026-06-04", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0023",
    uhid: "UHID-20250023",
    name: "Mukesh Rawat",
    age: 46,
    dob: "1980-03-11",
    sex: "M",
    bloodGroup: "O+",
    phone: "9761122334",
    address: "Dehradun, Uttarakhand - 248001",
    idProofType: "Aadhaar",
    idProofNumber: "8877-6655-4433",
    emergencyContactName: "Geeta Rawat",
    emergencyContactPhone: "9761122335",
    allergies: ["Aspirin"],
    chronicConditions: ["HTN"],
    registeredAt: "2025-07-01",
    lastVisit: "2026-05-20",
    vitals: { bp: "142/88", pulse: 78, spo2: 98, temp: 37.0, weight: 80, height: 172, bmi: 27.0, recordedAt: "2026-05-20" },
    visits: [
      { id: "V-026", date: "2026-05-20", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Recurring headache", diagnosis: "Hypertensive headache", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-029", drug: "Losartan", dose: "50 mg", frequency: "OD", route: "Oral", startDate: "2025-07-01", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0024",
    uhid: "UHID-20250024",
    name: "Lata Mishra",
    age: 60,
    dob: "1966-09-14",
    sex: "F",
    bloodGroup: "A+",
    phone: "9415123456",
    address: "Allahabad, UP - 211001",
    idProofType: "Aadhaar",
    idProofNumber: "1234-5678-9012",
    abhaId: "60-1234-5678-9012",
    emergencyContactName: "Ramesh Mishra",
    emergencyContactPhone: "9415123457",
    allergies: [],
    chronicConditions: ["DM", "Hypothyroid", "HTN"],
    insurance: { provider: "LIC Health Plus", policyNumber: "LIC-HP-22334", validUntil: "2027-09-30", coverageType: "Individual" },
    registeredAt: "2025-08-12",
    lastVisit: "2026-05-30",
    vitals: { bp: "140/90", pulse: 76, spo2: 98, temp: 37.1, weight: 70, height: 155, bmi: 29.1, recordedAt: "2026-05-30" },
    visits: [
      { id: "V-027", date: "2026-05-30", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "DM follow-up, foot numbness", diagnosis: "T2DM with peripheral neuropathy", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-029", testName: "HbA1c", date: "2026-05-28", value: "8.2", unit: "%", refRange: "4.0–5.6", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-030", drug: "Pregabalin", dose: "75 mg", frequency: "BD", route: "Oral", startDate: "2025-08-12", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0025",
    uhid: "UHID-20250025",
    name: "Prakash Nair",
    age: 55,
    dob: "1971-10-10",
    sex: "M",
    bloodGroup: "B+",
    phone: "9895001122",
    address: "Thrippunithura, Kochi - 682301",
    idProofType: "Aadhaar",
    idProofNumber: "7654-3210-9876",
    emergencyContactName: "Sudha Nair",
    emergencyContactPhone: "9895001123",
    allergies: [],
    chronicConditions: ["CAD", "DM"],
    registeredAt: "2025-09-18",
    lastVisit: "2026-06-06",
    vitals: { bp: "128/82", pulse: 74, spo2: 98, temp: 37.0, weight: 79, height: 168, bmi: 28.0, recordedAt: "2026-06-06" },
    visits: [
      { id: "V-028", date: "2026-06-06", type: "Follow-up" as unknown as "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Post-angioplasty follow-up", diagnosis: "Stable CAD — post PCI", status: "Completed" },
    ],
    labs: [
      { id: "L-030", testName: "LDL Cholesterol", date: "2026-06-05", value: "78", unit: "mg/dL", refRange: "<70", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-031", drug: "Rosuvastatin", dose: "20 mg", frequency: "OD (night)", route: "Oral", startDate: "2025-09-18", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0026",
    uhid: "UHID-20260026",
    name: "Sneha Kapoor",
    age: 22,
    dob: "2004-01-28",
    sex: "F",
    bloodGroup: "AB+",
    phone: "9871234560",
    address: "Vasant Kunj, Delhi - 110070",
    idProofType: "Aadhaar",
    idProofNumber: "2468-1357-9012",
    emergencyContactName: "Rakesh Kapoor",
    emergencyContactPhone: "9871234561",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2026-01-15",
    lastVisit: "2026-06-09",
    vitals: { bp: "110/70", pulse: 70, spo2: 100, temp: 36.9, weight: 52, height: 162, bmi: 19.8, recordedAt: "2026-06-09" },
    visits: [
      { id: "V-029", date: "2026-06-09", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Skin rash, itching", diagnosis: "Urticaria — acute", status: "Completed" },
    ],
    labs: [],
    medications: [
      { id: "M-032", drug: "Hydroxyzine", dose: "25 mg", frequency: "OD (night)", route: "Oral", startDate: "2026-06-09", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0027",
    uhid: "UHID-20260027",
    name: "Bharat Thakur",
    age: 41,
    dob: "1985-05-15",
    sex: "M",
    bloodGroup: "O-",
    phone: "9321001122",
    address: "Nashik, Maharashtra - 422001",
    idProofType: "Aadhaar",
    idProofNumber: "9870-1234-5678",
    emergencyContactName: "Anjali Thakur",
    emergencyContactPhone: "9321001123",
    allergies: [],
    chronicConditions: ["Asthma", "Obesity"],
    registeredAt: "2026-02-08",
    lastVisit: "2026-06-10",
    vitals: { bp: "124/78", pulse: 82, spo2: 95, temp: 37.0, weight: 98, height: 175, bmi: 32.0, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-030", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Nighttime wheezing, dyspnea on exertion", diagnosis: "Asthma — partly controlled", status: "Follow-up Needed" },
    ],
    labs: [],
    medications: [
      { id: "M-033", drug: "Formoterol + Budesonide", dose: "6/200 mcg", frequency: "BD", route: "Inhalation", startDate: "2026-02-08", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0028",
    uhid: "UHID-20260028",
    name: "Jasmine Rodrigues",
    age: 30,
    dob: "1996-07-10",
    sex: "F",
    bloodGroup: "A-",
    phone: "9632148520",
    address: "Panaji, Goa - 403001",
    idProofType: "Passport",
    idProofNumber: "P9876543",
    emergencyContactName: "Mario Rodrigues",
    emergencyContactPhone: "9632148521",
    allergies: [],
    chronicConditions: [],
    registeredAt: "2026-03-20",
    lastVisit: "2026-06-08",
    vitals: { bp: "108/68", pulse: 72, spo2: 99, temp: 36.8, weight: 55, height: 163, bmi: 20.7, recordedAt: "2026-06-08" },
    visits: [
      { id: "V-031", date: "2026-06-08", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Lower abdominal pain, nausea", diagnosis: "Gastritis — H. pylori suspected", status: "Completed" },
    ],
    labs: [
      { id: "L-031", testName: "H. pylori Ag (stool)", date: "2026-06-08", value: "Positive", unit: "", refRange: "Negative", flag: "H", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-034", drug: "Triple therapy (OAC)", dose: "Omeprazole 20mg + Amoxicillin 1g + Clarithromycin 500mg", frequency: "BD × 14 days", route: "Oral", startDate: "2026-06-08", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0029",
    uhid: "UHID-20260029",
    name: "Ritesh Shah",
    age: 38,
    dob: "1988-02-25",
    sex: "M",
    bloodGroup: "B+",
    phone: "9687541230",
    address: "Navrangpura, Ahmedabad - 380009",
    idProofType: "PAN",
    idProofNumber: "JKLRS2345D",
    emergencyContactName: "Mona Shah",
    emergencyContactPhone: "9687541231",
    allergies: ["Codeine"],
    chronicConditions: [],
    registeredAt: "2026-04-10",
    lastVisit: "2026-06-10",
    vitals: { bp: "118/74", pulse: 70, spo2: 99, temp: 37.0, weight: 70, height: 172, bmi: 23.7, recordedAt: "2026-06-10" },
    visits: [
      { id: "V-032", date: "2026-06-10", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "Kidney stone pain — right flank", diagnosis: "Nephrolithiasis — right ureter", notes: "USS KUB ordered, urology referral", status: "Follow-up Needed" },
    ],
    labs: [
      { id: "L-032", testName: "Urine R/M — RBCs", date: "2026-06-10", value: "30–35", unit: "/HPF", refRange: "0–2", flag: "HH", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-035", drug: "Diclofenac", dose: "75 mg", frequency: "BD × 3 days", route: "Oral", startDate: "2026-06-10", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [],
  },
  {
    id: "PT-0030",
    uhid: "UHID-20260030",
    name: "Chandrika Iyer",
    age: 52,
    dob: "1974-11-11",
    sex: "F",
    bloodGroup: "AB+",
    phone: "9445123789",
    address: "Mylapore, Chennai - 600004",
    idProofType: "Aadhaar",
    idProofNumber: "1357-2468-9753",
    abhaId: "52-1357-2468-9753",
    emergencyContactName: "Krishnaswamy Iyer",
    emergencyContactPhone: "9445123790",
    allergies: ["Ibuprofen"],
    chronicConditions: ["DM", "HTN", "Hypothyroid"],
    insurance: { provider: "Bajaj Allianz", policyNumber: "BA-2025-77654", validUntil: "2027-11-30", coverageType: "Family Floater" },
    registeredAt: "2026-05-01",
    lastVisit: "2026-06-09",
    vitals: { bp: "136/84", pulse: 76, spo2: 98, temp: 37.1, weight: 72, height: 158, bmi: 28.8, recordedAt: "2026-06-09" },
    visits: [
      { id: "V-033", date: "2026-06-09", type: "OPD", doctor: "Dr. Sharma", dept: "General Medicine", chiefComplaint: "All 3 conditions — quarterly follow-up", diagnosis: "DM + HTN + Hypothyroid — reasonably controlled", status: "Completed" },
    ],
    labs: [
      { id: "L-033", testName: "HbA1c", date: "2026-06-07", value: "7.1", unit: "%", refRange: "4.0–5.6", flag: "H", orderedBy: "Dr. Sharma" },
      { id: "L-034", testName: "TSH", date: "2026-06-07", value: "3.8", unit: "mIU/L", refRange: "0.4–4.0", flag: "N", orderedBy: "Dr. Sharma" },
    ],
    medications: [
      { id: "M-036", drug: "Metformin", dose: "1000 mg", frequency: "BD", route: "Oral", startDate: "2026-05-01", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-037", drug: "Amlodipine", dose: "5 mg", frequency: "OD", route: "Oral", startDate: "2026-05-01", prescribedBy: "Dr. Sharma", active: true },
      { id: "M-038", drug: "Levothyroxine", dose: "50 mcg", frequency: "OD (empty stomach)", route: "Oral", startDate: "2026-05-01", prescribedBy: "Dr. Sharma", active: true },
    ],
    documents: [
      { id: "D-008", name: "Bajaj Allianz Policy.pdf", type: "Insurance", uploadedAt: "2026-05-01", size: "900 KB" },
    ],
  },
];
