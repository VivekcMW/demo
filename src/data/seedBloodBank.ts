export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type BloodProduct =
  | "PRBC"
  | "FFP"
  | "Platelets"
  | "Cryoprecipitate"
  | "Whole Blood"
  | "Packed RBC";
export type CrossMatchStatus =
  | "Pending"
  | "Compatible"
  | "Incompatible"
  | "Not Required";
export type TransfusionStatus =
  | "Ordered"
  | "Cross-Matched"
  | "In-Progress"
  | "Completed"
  | "Reaction"
  | "Cancelled";

export interface BloodBankOrder {
  id: string;
  patientId: string;
  patientName: string;
  patientBloodGroup: BloodGroup;
  product: BloodProduct;
  units: number;
  crossMatchStatus: CrossMatchStatus;
  crossMatchResult?: string;
  status: TransfusionStatus;
  orderedBy: string;
  orderedAt: string;
  urgency: "Routine" | "Urgent" | "Emergency";
  reason: string;
  transfusionStartedAt?: string;
  transfusionCompletedAt?: string;
  reactionNotes?: string;
  notes?: string;
}

export interface BloodInventory {
  id: string;
  product: BloodProduct;
  bloodGroup: BloodGroup;
  unitsAvailable: number;
  expiryDate: string;
  donorId?: string;
  donationDate: string;
}

export const BLOOD_GROUPS: BloodGroup[] = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
];

export const BLOOD_PRODUCTS: BloodProduct[] = [
  "PRBC", "FFP", "Platelets", "Cryoprecipitate", "Whole Blood", "Packed RBC",
];

export const seedBloodBankOrders: BloodBankOrder[] = [
  {
    id: "BB-0001", patientId: "PT-0001", patientName: "Anil Kumar Sharma",
    patientBloodGroup: "O+", product: "PRBC", units: 2,
    crossMatchStatus: "Compatible", status: "Cross-Matched",
    orderedBy: "Dr. Suresh Patel", orderedAt: "2026-06-16T09:00:00",
    urgency: "Urgent", reason: "Post-operative anaemia, Hb 7.2 g/dL",
    crossMatchResult: "Cross-match compatible — no agglutination",
  },
  {
    id: "BB-0002", patientId: "PT-0005", patientName: "Sunita Rani",
    patientBloodGroup: "B+", product: "FFP", units: 3,
    crossMatchStatus: "Pending", status: "Ordered",
    orderedBy: "Dr. Harish Nair", orderedAt: "2026-06-16T10:30:00",
    urgency: "Emergency", reason: "Massive transfusion protocol, coagulopathy",
  },
  {
    id: "BB-0003", patientId: "PT-0010", patientName: "Sita Kumari",
    patientBloodGroup: "A+", product: "Platelets", units: 1,
    crossMatchStatus: "Not Required", status: "Completed",
    orderedBy: "Dr. Kavya Reddy", orderedAt: "2026-06-15T14:00:00",
    urgency: "Routine", reason: "Platelet count 20,000/µL, ITP",
    transfusionStartedAt: "2026-06-15T15:00:00",
    transfusionCompletedAt: "2026-06-15T16:30:00",
  },
  {
    id: "BB-0004", patientId: "PT-0012", patientName: "Indira Devi",
    patientBloodGroup: "AB-", product: "Cryoprecipitate", units: 5,
    crossMatchStatus: "Pending", status: "Ordered",
    orderedBy: "Dr. Priya Mehta", orderedAt: "2026-06-16T08:15:00",
    urgency: "Urgent", reason: "Fibrinogen deficiency, suspected DIC",
  },
  {
    id: "BB-0005", patientId: "PT-0003", patientName: "Rajesh Verma",
    patientBloodGroup: "O-", product: "Whole Blood", units: 2,
    crossMatchStatus: "Compatible", status: "In-Progress",
    orderedBy: "Dr. Harish Nair", orderedAt: "2026-06-16T11:00:00",
    urgency: "Emergency", reason: "Trauma with haemorrhagic shock",
    crossMatchResult: "Compatible — emergency release",
    transfusionStartedAt: "2026-06-16T11:30:00",
  },
  {
    id: "BB-0006", patientId: "PT-0015", patientName: "Vikram Singh",
    patientBloodGroup: "A+", product: "PRBC", units: 1,
    crossMatchStatus: "Compatible", status: "Cross-Matched",
    orderedBy: "Dr. Ananya Joshi", orderedAt: "2026-06-16T07:00:00",
    urgency: "Routine", reason: "Pre-operative optimisation, Hb 8.5 g/dL",
    crossMatchResult: "Compatible — type and screen done",
  },
  {
    id: "BB-0007", patientId: "PT-0016", patientName: "Pooja Iyer",
    patientBloodGroup: "B-", product: "Packed RBC", units: 2,
    crossMatchStatus: "Not Required", status: "Completed",
    orderedBy: "Dr. Kavya Reddy", orderedAt: "2026-06-14T10:00:00",
    urgency: "Urgent", reason: "Symptomatic anaemia in pregnancy",
    transfusionStartedAt: "2026-06-14T11:00:00",
    transfusionCompletedAt: "2026-06-14T14:00:00",
  },
  {
    id: "BB-0008", patientId: "PT-0017", patientName: "Suresh Babu",
    patientBloodGroup: "AB+", product: "FFP", units: 3,
    crossMatchStatus: "Compatible", status: "Reaction",
    orderedBy: "Dr. Suresh Patel", orderedAt: "2026-06-15T09:00:00",
    urgency: "Urgent", reason: "Liver disease, prolonged INR",
    crossMatchResult: "Compatible",
    transfusionStartedAt: "2026-06-15T10:00:00",
    reactionNotes: "Fever, chills, and urticaria after 30 min — transfusion stopped, antihistamines given",
  },
  {
    id: "BB-0009", patientId: "PT-0009", patientName: "Kavya Sharma",
    patientBloodGroup: "A-", product: "Platelets", units: 1,
    crossMatchStatus: "Pending", status: "Ordered",
    orderedBy: "Dr. Priya Mehta", orderedAt: "2026-06-16T12:00:00",
    urgency: "Routine", reason: "Thrombocytopenia secondary to chemotherapy",
  },
  {
    id: "BB-0010", patientId: "PT-0020", patientName: "Pradeep Kumar",
    patientBloodGroup: "O+", product: "PRBC", units: 2,
    crossMatchStatus: "Pending", status: "Cancelled",
    orderedBy: "Dr. Ananya Joshi", orderedAt: "2026-06-15T16:00:00",
    urgency: "Routine", reason: "Pre-operative anaemia workup",
    notes: "Cancelled — Hb improved with iron therapy, transfusion not required",
  },
];

export const seedBloodInventory: BloodInventory[] = [
  // ── PRBC ──────────────────────────────────────────────────────────────
  { id: "INV-001", product: "PRBC", bloodGroup: "A+",  unitsAvailable: 12, expiryDate: "2026-08-15", donationDate: "2026-05-15" },
  { id: "INV-002", product: "PRBC", bloodGroup: "A-",  unitsAvailable: 4,  expiryDate: "2026-08-20", donationDate: "2026-05-20" },
  { id: "INV-003", product: "PRBC", bloodGroup: "B+",  unitsAvailable: 8,  expiryDate: "2026-08-10", donationDate: "2026-05-10" },
  { id: "INV-004", product: "PRBC", bloodGroup: "B-",  unitsAvailable: 3,  expiryDate: "2026-08-25", donationDate: "2026-05-25" },
  { id: "INV-005", product: "PRBC", bloodGroup: "AB+", unitsAvailable: 2,  expiryDate: "2026-09-01", donationDate: "2026-06-01" },
  { id: "INV-006", product: "PRBC", bloodGroup: "AB-", unitsAvailable: 1,  expiryDate: "2026-09-05", donationDate: "2026-06-05" },
  { id: "INV-007", product: "PRBC", bloodGroup: "O+",  unitsAvailable: 20, expiryDate: "2026-07-30", donationDate: "2026-04-30" },
  { id: "INV-008", product: "PRBC", bloodGroup: "O-",  unitsAvailable: 6,  expiryDate: "2026-08-18", donationDate: "2026-05-18" },
  // ── FFP ───────────────────────────────────────────────────────────────
  { id: "INV-009", product: "FFP", bloodGroup: "A+",  unitsAvailable: 10, expiryDate: "2027-02-15", donationDate: "2026-05-15" },
  { id: "INV-010", product: "FFP", bloodGroup: "A-",  unitsAvailable: 3,  expiryDate: "2027-03-01", donationDate: "2026-06-01" },
  { id: "INV-011", product: "FFP", bloodGroup: "B+",  unitsAvailable: 6,  expiryDate: "2027-01-20", donationDate: "2026-04-20" },
  { id: "INV-012", product: "FFP", bloodGroup: "B-",  unitsAvailable: 2,  expiryDate: "2027-02-28", donationDate: "2026-05-28" },
  { id: "INV-013", product: "FFP", bloodGroup: "AB+", unitsAvailable: 1,  expiryDate: "2027-03-15", donationDate: "2026-06-15" },
  { id: "INV-014", product: "FFP", bloodGroup: "AB-", unitsAvailable: 0,  expiryDate: "2027-01-10", donationDate: "2026-04-10" },
  { id: "INV-015", product: "FFP", bloodGroup: "O+",  unitsAvailable: 15, expiryDate: "2027-02-10", donationDate: "2026-05-10" },
  { id: "INV-016", product: "FFP", bloodGroup: "O-",  unitsAvailable: 4,  expiryDate: "2027-01-25", donationDate: "2026-04-25" },
  // ── Platelets ─────────────────────────────────────────────────────────
  { id: "INV-017", product: "Platelets", bloodGroup: "A+",  unitsAvailable: 5,  expiryDate: "2026-06-23", donationDate: "2026-06-16" },
  { id: "INV-018", product: "Platelets", bloodGroup: "A-",  unitsAvailable: 2,  expiryDate: "2026-06-24", donationDate: "2026-06-17" },
  { id: "INV-019", product: "Platelets", bloodGroup: "B+",  unitsAvailable: 4,  expiryDate: "2026-06-22", donationDate: "2026-06-15" },
  { id: "INV-020", product: "Platelets", bloodGroup: "B-",  unitsAvailable: 1,  expiryDate: "2026-06-25", donationDate: "2026-06-18" },
  { id: "INV-021", product: "Platelets", bloodGroup: "AB+", unitsAvailable: 0,  expiryDate: "2026-06-20", donationDate: "2026-06-13" },
  { id: "INV-022", product: "Platelets", bloodGroup: "AB-", unitsAvailable: 0,  expiryDate: "2026-06-21", donationDate: "2026-06-14" },
  { id: "INV-023", product: "Platelets", bloodGroup: "O+",  unitsAvailable: 8,  expiryDate: "2026-06-22", donationDate: "2026-06-15" },
  { id: "INV-024", product: "Platelets", bloodGroup: "O-",  unitsAvailable: 3,  expiryDate: "2026-06-24", donationDate: "2026-06-17" },
  // ── Cryoprecipitate ───────────────────────────────────────────────────
  { id: "INV-025", product: "Cryoprecipitate", bloodGroup: "A+",  unitsAvailable: 6,  expiryDate: "2026-09-15", donationDate: "2026-05-15" },
  { id: "INV-026", product: "Cryoprecipitate", bloodGroup: "A-",  unitsAvailable: 2,  expiryDate: "2026-09-20", donationDate: "2026-05-20" },
  { id: "INV-027", product: "Cryoprecipitate", bloodGroup: "B+",  unitsAvailable: 4,  expiryDate: "2026-09-10", donationDate: "2026-05-10" },
  { id: "INV-028", product: "Cryoprecipitate", bloodGroup: "B-",  unitsAvailable: 1,  expiryDate: "2026-09-25", donationDate: "2026-05-25" },
  { id: "INV-029", product: "Cryoprecipitate", bloodGroup: "AB+", unitsAvailable: 5,  expiryDate: "2026-10-01", donationDate: "2026-06-01" },
  { id: "INV-030", product: "Cryoprecipitate", bloodGroup: "AB-", unitsAvailable: 3,  expiryDate: "2026-10-05", donationDate: "2026-06-05" },
  { id: "INV-031", product: "Cryoprecipitate", bloodGroup: "O+",  unitsAvailable: 7,  expiryDate: "2026-08-30", donationDate: "2026-04-30" },
  { id: "INV-032", product: "Cryoprecipitate", bloodGroup: "O-",  unitsAvailable: 2,  expiryDate: "2026-09-18", donationDate: "2026-05-18" },
  // ── Whole Blood ───────────────────────────────────────────────────────
  { id: "INV-033", product: "Whole Blood", bloodGroup: "A+",  unitsAvailable: 4,  expiryDate: "2026-08-01", donationDate: "2026-06-01" },
  { id: "INV-034", product: "Whole Blood", bloodGroup: "A-",  unitsAvailable: 1,  expiryDate: "2026-08-05", donationDate: "2026-06-05" },
  { id: "INV-035", product: "Whole Blood", bloodGroup: "B+",  unitsAvailable: 3,  expiryDate: "2026-07-30", donationDate: "2026-05-30" },
  { id: "INV-036", product: "Whole Blood", bloodGroup: "B-",  unitsAvailable: 1,  expiryDate: "2026-08-10", donationDate: "2026-06-10" },
  { id: "INV-037", product: "Whole Blood", bloodGroup: "AB+", unitsAvailable: 0,  expiryDate: "2026-07-25", donationDate: "2026-05-25" },
  { id: "INV-038", product: "Whole Blood", bloodGroup: "AB-", unitsAvailable: 0,  expiryDate: "2026-08-15", donationDate: "2026-06-15" },
  { id: "INV-039", product: "Whole Blood", bloodGroup: "O+",  unitsAvailable: 10, expiryDate: "2026-07-28", donationDate: "2026-05-28" },
  { id: "INV-040", product: "Whole Blood", bloodGroup: "O-",  unitsAvailable: 5,  expiryDate: "2026-08-08", donationDate: "2026-06-08" },
  // ── Packed RBC ─────────────────────────────────────────────────────
  { id: "INV-041", product: "Packed RBC", bloodGroup: "A+",  unitsAvailable: 9,  expiryDate: "2026-08-12", donationDate: "2026-05-12" },
  { id: "INV-042", product: "Packed RBC", bloodGroup: "A-",  unitsAvailable: 3,  expiryDate: "2026-08-18", donationDate: "2026-05-18" },
  { id: "INV-043", product: "Packed RBC", bloodGroup: "B+",  unitsAvailable: 6,  expiryDate: "2026-08-05", donationDate: "2026-05-05" },
  { id: "INV-044", product: "Packed RBC", bloodGroup: "B-",  unitsAvailable: 2,  expiryDate: "2026-08-22", donationDate: "2026-05-22" },
  { id: "INV-045", product: "Packed RBC", bloodGroup: "AB+", unitsAvailable: 1,  expiryDate: "2026-08-28", donationDate: "2026-05-28" },
  { id: "INV-046", product: "Packed RBC", bloodGroup: "AB-", unitsAvailable: 0,  expiryDate: "2026-09-02", donationDate: "2026-06-02" },
  { id: "INV-047", product: "Packed RBC", bloodGroup: "O+",  unitsAvailable: 18, expiryDate: "2026-07-25", donationDate: "2026-04-25" },
  { id: "INV-048", product: "Packed RBC", bloodGroup: "O-",  unitsAvailable: 7,  expiryDate: "2026-08-15", donationDate: "2026-05-15" },
];

export const COMPATIBILITY_MATRIX: Record<BloodGroup, BloodGroup[]> = {
  "A+":  ["A+", "A-", "O+", "O-"],
  "A-":  ["A-", "O-"],
  "B+":  ["B+", "B-", "O+", "O-"],
  "B-":  ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+":  ["O+", "O-"],
  "O-":  ["O-"],
};
