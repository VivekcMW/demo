// ── Types ─────────────────────────────────────────────────────────────────────

export type RxStatus =
  | "Pending"       // received, not yet verified
  | "Verified"      // pharmacist checked, ready to dispense
  | "Dispensing"    // currently being packed
  | "Dispensed"     // handed to patient/ward
  | "Partially Dispensed"  // some items out-of-stock
  | "On Hold"       // doctor clarification needed
  | "Cancelled";    // voided

export type RxSource   = "OPD" | "IPD" | "Emergency" | "Discharge";
export type DrugRoute  = "Oral" | "IV" | "IM" | "Topical" | "Inhaler" | "SL" | "SC";
export type DrugForm   = "Tablet" | "Capsule" | "Syrup" | "Injection" | "Cream" | "Drops" | "Inhaler" | "Patch";
export type StockStatus = "Available" | "Low Stock" | "Out of Stock";

export interface RxItem {
  id:           string;
  drug:         string;
  genericName:  string;
  form:         DrugForm;
  strength:     string;     // e.g. "500 mg"
  dose:         string;
  route:        DrugRoute;
  frequency:    string;     // "OD", "BD", etc.
  duration:     string;     // "5 days"
  qty:          number;     // total tablets/units to dispense
  qtyDispensed: number;
  unitPrice:    number;     // INR
  stockStatus:  StockStatus;
  substituted?: boolean;    // true if generic substitution was made
  instructions?: string;
}

export interface PrescriptionRx {
  id:            string;
  patientId:     string;
  patientName:   string;
  examId?:       string;    // link to examination
  admissionId?:  string;    // link to IPD admission (if IPD/Discharge)
  source:        RxSource;
  status:        RxStatus;
  receivedAt:    string;    // ISO datetime
  verifiedAt?:   string;
  dispensedAt?:  string;
  prescribedBy:  string;
  dept:          string;
  verifiedBy?:   string;
  dispensedBy?:  string;
  items:         RxItem[];
  notes?:        string;
  totalAmount:   number;    // sum of (item.qty * item.unitPrice)
  patientAge?:   number;
  patientSex?:   "M" | "F";
  allergies?:    string[];
}

// ── Drug catalogue (subset) ───────────────────────────────────────────────────

export interface DrugCatalogue {
  id:          string;
  name:        string;
  genericName: string;
  form:        DrugForm;
  strength:    string;
  unitPrice:   number;
  stockQty:    number;
  reorderAt:   number;
}

export const DRUG_CATALOGUE: DrugCatalogue[] = [
  { id: "DRG-001", name: "Metformin 500 mg",     genericName: "Metformin",         form: "Tablet",   strength: "500 mg", unitPrice: 2.50,  stockQty: 980, reorderAt: 200 },
  { id: "DRG-002", name: "Amlodipine 5 mg",      genericName: "Amlodipine",        form: "Tablet",   strength: "5 mg",   unitPrice: 3.00,  stockQty: 600, reorderAt: 150 },
  { id: "DRG-003", name: "Atorvastatin 10 mg",   genericName: "Atorvastatin",      form: "Tablet",   strength: "10 mg",  unitPrice: 5.50,  stockQty: 450, reorderAt: 100 },
  { id: "DRG-004", name: "Pantoprazole 40 mg",   genericName: "Pantoprazole",      form: "Tablet",   strength: "40 mg",  unitPrice: 6.00,  stockQty: 320, reorderAt: 80  },
  { id: "DRG-005", name: "Aspirin 75 mg",        genericName: "Aspirin",           form: "Tablet",   strength: "75 mg",  unitPrice: 1.50,  stockQty: 1200,reorderAt: 250 },
  { id: "DRG-006", name: "Losartan 50 mg",       genericName: "Losartan",          form: "Tablet",   strength: "50 mg",  unitPrice: 4.00,  stockQty: 180, reorderAt: 100 },
  { id: "DRG-007", name: "Levothyroxine 50 mcg", genericName: "Levothyroxine",     form: "Tablet",   strength: "50 mcg", unitPrice: 3.50,  stockQty: 240, reorderAt: 80  },
  { id: "DRG-008", name: "Salbutamol Inhaler",   genericName: "Salbutamol",        form: "Inhaler",  strength: "100 mcg",unitPrice: 85.00, stockQty: 45,  reorderAt: 20  },
  { id: "DRG-009", name: "Prednisolone 5 mg",    genericName: "Prednisolone",      form: "Tablet",   strength: "5 mg",   unitPrice: 2.00,  stockQty: 400, reorderAt: 100 },
  { id: "DRG-010", name: "Ceftriaxone 1 g Inj",  genericName: "Ceftriaxone",       form: "Injection",strength: "1 g",    unitPrice: 95.00, stockQty: 60,  reorderAt: 20  },
  { id: "DRG-011", name: "Ondansetron 4 mg",     genericName: "Ondansetron",       form: "Tablet",   strength: "4 mg",   unitPrice: 7.00,  stockQty: 280, reorderAt: 60  },
  { id: "DRG-012", name: "Amoxicillin 500 mg",   genericName: "Amoxicillin",       form: "Capsule",  strength: "500 mg", unitPrice: 8.00,  stockQty: 22,  reorderAt: 60  },
  { id: "DRG-013", name: "Paracetamol 500 mg",   genericName: "Paracetamol",       form: "Tablet",   strength: "500 mg", unitPrice: 1.00,  stockQty: 1500,reorderAt: 300 },
  { id: "DRG-014", name: "Omeprazole 20 mg",     genericName: "Omeprazole",        form: "Capsule",  strength: "20 mg",  unitPrice: 4.50,  stockQty: 0,   reorderAt: 100 },
  { id: "DRG-015", name: "Metoprolol 25 mg",     genericName: "Metoprolol",        form: "Tablet",   strength: "25 mg",  unitPrice: 3.50,  stockQty: 390, reorderAt: 100 },
  { id: "DRG-016", name: "Insulin Glargine 100U",genericName: "Insulin Glargine",  form: "Injection",strength: "100 U/mL",unitPrice:280.00,stockQty: 18,  reorderAt: 10  },
  { id: "DRG-017", name: "Furosemide 40 mg",     genericName: "Furosemide",        form: "Tablet",   strength: "40 mg",  unitPrice: 2.50,  stockQty: 350, reorderAt: 80  },
  { id: "DRG-018", name: "Clonazepam 0.5 mg",   genericName: "Clonazepam",        form: "Tablet",   strength: "0.5 mg", unitPrice: 4.00,  stockQty: 120, reorderAt: 50  },
  { id: "DRG-019", name: "Azithromycin 500 mg",  genericName: "Azithromycin",      form: "Tablet",   strength: "500 mg", unitPrice: 18.00, stockQty: 95,  reorderAt: 30  },
  { id: "DRG-020", name: "Glimepiride 2 mg",     genericName: "Glimepiride",       form: "Tablet",   strength: "2 mg",   unitPrice: 6.00,  stockQty: 210, reorderAt: 60  },
];

function stockStatus(qty: number, reorder: number): StockStatus {
  if (qty === 0) return "Out of Stock";
  if (qty <= reorder) return "Low Stock";
  return "Available";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function totalAmt(items: RxItem[]): number {
  return parseFloat(items.reduce((s, i) => s + i.qty * i.unitPrice, 0).toFixed(2));
}

// ── Seed Prescriptions ────────────────────────────────────────────────────────

export const seedPrescriptions: PrescriptionRx[] = [

  // ── RX-0001 – Dispensed, OPD, DM patient ──────────────────────────────────
  {
    id: "RX-0001", patientId: "PT-0001", patientName: "Anil Kumar Sharma",
    examId: "EXM-0001", source: "OPD", status: "Dispensed",
    receivedAt: "2026-06-08T10:05:00", verifiedAt: "2026-06-08T10:15:00", dispensedAt: "2026-06-08T10:30:00",
    prescribedBy: "Dr. Priya Mehta", dept: "Endocrinology",
    verifiedBy: "Pharm. Sneha Gupta", dispensedBy: "Pharm. Sneha Gupta",
    patientAge: 58, patientSex: "M", allergies: [],
    items: [
      { id: "RXI-001", drug: "Metformin 500 mg",   genericName: "Metformin",   form: "Tablet", strength: "500 mg", dose: "500 mg", route: "Oral", frequency: "BD",  duration: "30 days", qty: 60, qtyDispensed: 60, unitPrice: 2.50,  stockStatus: "Available" },
      { id: "RXI-002", drug: "Glimepiride 2 mg",   genericName: "Glimepiride", form: "Tablet", strength: "2 mg",   dose: "2 mg",  route: "Oral", frequency: "OD",  duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 6.00,  stockStatus: "Available" },
      { id: "RXI-003", drug: "Aspirin 75 mg",      genericName: "Aspirin",     form: "Tablet", strength: "75 mg",  dose: "75 mg", route: "Oral", frequency: "OD",  duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 1.50,  stockStatus: "Available" },
      { id: "RXI-004", drug: "Atorvastatin 10 mg", genericName: "Atorvastatin",form: "Tablet", strength: "10 mg",  dose: "10 mg", route: "Oral", frequency: "HS",  duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 5.50,  stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0002 – Dispensed, OPD, HTN patient ─────────────────────────────────
  {
    id: "RX-0002", patientId: "PT-0003", patientName: "Rajesh Verma",
    source: "OPD", status: "Dispensed",
    receivedAt: "2026-06-07T11:00:00", verifiedAt: "2026-06-07T11:10:00", dispensedAt: "2026-06-07T11:25:00",
    prescribedBy: "Dr. Suresh Patel", dept: "Cardiology",
    verifiedBy: "Pharm. Ravi Kumar", dispensedBy: "Pharm. Ravi Kumar",
    patientAge: 52, patientSex: "M", allergies: [],
    items: [
      { id: "RXI-005", drug: "Amlodipine 5 mg",    genericName: "Amlodipine", form: "Tablet", strength: "5 mg",  dose: "5 mg",  route: "Oral", frequency: "OD", duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 3.00, stockStatus: "Available" },
      { id: "RXI-006", drug: "Losartan 50 mg",     genericName: "Losartan",   form: "Tablet", strength: "50 mg", dose: "50 mg", route: "Oral", frequency: "OD", duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 4.00, stockStatus: "Low Stock" },
      { id: "RXI-007", drug: "Aspirin 75 mg",      genericName: "Aspirin",    form: "Tablet", strength: "75 mg", dose: "75 mg", route: "Oral", frequency: "OD", duration: "30 days", qty: 30, qtyDispensed: 30, unitPrice: 1.50, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0003 – Dispensed, Discharge, IPD ───────────────────────────────────
  {
    id: "RX-0003", patientId: "PT-0005", patientName: "Sunita Rani",
    admissionId: "ADM-0005", source: "Discharge", status: "Dispensed",
    receivedAt: "2026-06-06T14:00:00", verifiedAt: "2026-06-06T14:20:00", dispensedAt: "2026-06-06T14:45:00",
    prescribedBy: "Dr. Kavya Reddy", dept: "Obstetrics & Gynaecology",
    verifiedBy: "Pharm. Sneha Gupta", dispensedBy: "Pharm. Sneha Gupta",
    patientAge: 29, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-008", drug: "Paracetamol 500 mg", genericName: "Paracetamol",  form: "Tablet", strength: "500 mg", dose: "500 mg", route: "Oral", frequency: "TDS", duration: "5 days",  qty: 15, qtyDispensed: 15, unitPrice: 1.00, stockStatus: "Available" },
      { id: "RXI-009", drug: "Pantoprazole 40 mg", genericName: "Pantoprazole", form: "Tablet", strength: "40 mg",  dose: "40 mg",  route: "Oral", frequency: "OD",  duration: "10 days", qty: 10, qtyDispensed: 10, unitPrice: 6.00, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0004 – Dispensed, Emergency ────────────────────────────────────────
  {
    id: "RX-0004", patientId: "PT-0010", patientName: "Sita Kumari",
    source: "Emergency", status: "Dispensed",
    receivedAt: "2026-06-05T22:10:00", verifiedAt: "2026-06-05T22:20:00", dispensedAt: "2026-06-05T22:35:00",
    prescribedBy: "Dr. Harish Nair", dept: "Emergency",
    verifiedBy: "Pharm. Ravi Kumar", dispensedBy: "Pharm. Ravi Kumar",
    patientAge: 34, patientSex: "F", allergies: ["Penicillin"],
    items: [
      { id: "RXI-010", drug: "Ondansetron 4 mg",   genericName: "Ondansetron",  form: "Tablet",   strength: "4 mg", dose: "4 mg",  route: "Oral", frequency: "TDS", duration: "3 days", qty: 9,  qtyDispensed: 9,  unitPrice: 7.00,  stockStatus: "Available" },
      { id: "RXI-011", drug: "Ceftriaxone 1 g Inj",genericName: "Ceftriaxone",  form: "Injection",strength: "1 g",  dose: "1 g",   route: "IV",   frequency: "OD",  duration: "5 days", qty: 5,  qtyDispensed: 5,  unitPrice: 95.00, stockStatus: "Available" },
      { id: "RXI-012", drug: "Paracetamol 500 mg", genericName: "Paracetamol",  form: "Tablet",   strength: "500 mg",dose: "500 mg",route: "Oral", frequency: "TDS", duration: "3 days", qty: 9,  qtyDispensed: 9,  unitPrice: 1.00,  stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0005 – Dispensed, OPD, Thyroid ─────────────────────────────────────
  {
    id: "RX-0005", patientId: "PT-0012", patientName: "Indira Devi",
    source: "OPD", status: "Dispensed",
    receivedAt: "2026-06-05T09:30:00", verifiedAt: "2026-06-05T09:40:00", dispensedAt: "2026-06-05T09:55:00",
    prescribedBy: "Dr. Priya Mehta", dept: "Endocrinology",
    verifiedBy: "Pharm. Sneha Gupta", dispensedBy: "Pharm. Sneha Gupta",
    patientAge: 43, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-013", drug: "Levothyroxine 50 mcg",genericName: "Levothyroxine",form: "Tablet",strength: "50 mcg",dose: "50 mcg",route: "Oral",frequency: "OD",duration: "30 days",qty: 30,qtyDispensed: 30,unitPrice: 3.50,stockStatus: "Available" },
      { id: "RXI-014", drug: "Metformin 500 mg",    genericName: "Metformin",    form: "Tablet",strength: "500 mg",dose: "500 mg",route: "Oral",frequency: "BD",duration: "30 days",qty: 60,qtyDispensed: 60,unitPrice: 2.50,stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0006 – Partially Dispensed (Omeprazole out of stock) ───────────────
  {
    id: "RX-0006", patientId: "PT-0004", patientName: "Anjali Singh",
    source: "OPD", status: "Partially Dispensed",
    receivedAt: "2026-06-10T10:00:00", verifiedAt: "2026-06-10T10:10:00",
    prescribedBy: "Dr. Suresh Patel", dept: "Gastroenterology",
    verifiedBy: "Pharm. Ravi Kumar",
    patientAge: 38, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-015", drug: "Omeprazole 20 mg",    genericName: "Omeprazole",   form: "Capsule",strength: "20 mg",  dose: "20 mg",  route: "Oral",frequency: "BD",duration: "14 days",qty: 28,qtyDispensed: 0, unitPrice: 4.50, stockStatus: "Out of Stock", instructions: "Take 30 min before food" },
      { id: "RXI-016", drug: "Pantoprazole 40 mg",  genericName: "Pantoprazole", form: "Tablet", strength: "40 mg",  dose: "40 mg",  route: "Oral",frequency: "OD",duration: "7 days", qty: 7, qtyDispensed: 7, unitPrice: 6.00, stockStatus: "Available",   substituted: true },
      { id: "RXI-017", drug: "Metoclopramide 10 mg",genericName: "Metoclopramide",form:"Tablet", strength: "10 mg",  dose: "10 mg",  route: "Oral",frequency: "TDS",duration: "5 days",qty: 15,qtyDispensed: 15,unitPrice: 2.00, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0007 – On Hold (clarification needed) ──────────────────────────────
  {
    id: "RX-0007", patientId: "PT-0015", patientName: "Vikram Singh",
    source: "IPD", status: "On Hold",
    receivedAt: "2026-06-10T11:30:00",
    prescribedBy: "Dr. Ananya Joshi", dept: "Neurology",
    patientAge: 55, patientSex: "M", allergies: ["Sulfa"],
    items: [
      { id: "RXI-018", drug: "Clonazepam 0.5 mg",  genericName: "Clonazepam", form: "Tablet",strength: "0.5 mg",dose: "0.5 mg",route: "Oral",frequency: "BD",duration: "30 days",qty: 60,qtyDispensed: 0,unitPrice: 4.00, stockStatus: "Available", instructions: "Confirm dosage with prescriber — previous dose was 1 mg" },
      { id: "RXI-019", drug: "Metoprolol 25 mg",   genericName: "Metoprolol", form: "Tablet",strength: "25 mg", dose: "25 mg",route: "Oral",frequency: "BD",duration: "30 days",qty: 60,qtyDispensed: 0,unitPrice: 3.50, stockStatus: "Available" },
    ],
    notes: "Pharmacist query: Clonazepam 0.5 mg BD — patient was previously on 1 mg OD. Please confirm dose change with Dr. Ananya Joshi.",
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0008 – Pending (received, not yet verified) ────────────────────────
  {
    id: "RX-0008", patientId: "PT-0016", patientName: "Pooja Iyer",
    source: "OPD", status: "Pending",
    receivedAt: "2026-06-11T08:45:00",
    prescribedBy: "Dr. Priya Mehta", dept: "Endocrinology",
    patientAge: 32, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-020", drug: "Metformin 500 mg",   genericName: "Metformin",   form: "Tablet",strength: "500 mg",dose: "500 mg",route: "Oral",frequency: "BD", duration: "30 days",qty: 60,qtyDispensed: 0,unitPrice: 2.50, stockStatus: "Available" },
      { id: "RXI-021", drug: "Glimepiride 2 mg",   genericName: "Glimepiride", form: "Tablet",strength: "2 mg",  dose: "2 mg",  route: "Oral",frequency: "OD", duration: "30 days",qty: 30,qtyDispensed: 0,unitPrice: 6.00, stockStatus: "Available" },
      { id: "RXI-022", drug: "Pantoprazole 40 mg", genericName: "Pantoprazole",form: "Tablet",strength: "40 mg", dose: "40 mg", route: "Oral",frequency: "OD", duration: "30 days",qty: 30,qtyDispensed: 0,unitPrice: 6.00, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0009 – Verified, waiting dispense ──────────────────────────────────
  {
    id: "RX-0009", patientId: "PT-0013", patientName: "Ramesh Nair",
    source: "IPD", status: "Verified",
    receivedAt: "2026-06-11T09:00:00", verifiedAt: "2026-06-11T09:15:00",
    prescribedBy: "Dr. Suresh Patel", dept: "Cardiology",
    verifiedBy: "Pharm. Sneha Gupta",
    patientAge: 64, patientSex: "M", allergies: [],
    items: [
      { id: "RXI-023", drug: "Furosemide 40 mg",    genericName: "Furosemide",   form: "Tablet",strength: "40 mg", dose: "40 mg", route: "Oral",frequency: "OD", duration: "7 days",  qty: 7,  qtyDispensed: 0,unitPrice: 2.50, stockStatus: "Available" },
      { id: "RXI-024", drug: "Amlodipine 5 mg",     genericName: "Amlodipine",   form: "Tablet",strength: "5 mg",  dose: "5 mg",  route: "Oral",frequency: "OD", duration: "30 days", qty: 30, qtyDispensed: 0,unitPrice: 3.00, stockStatus: "Available" },
      { id: "RXI-025", drug: "Atorvastatin 10 mg",  genericName: "Atorvastatin", form: "Tablet",strength: "10 mg", dose: "10 mg", route: "Oral",frequency: "HS", duration: "30 days", qty: 30, qtyDispensed: 0,unitPrice: 5.50, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0010 – Dispensing in progress ──────────────────────────────────────
  {
    id: "RX-0010", patientId: "PT-0017", patientName: "Suresh Babu",
    source: "OPD", status: "Dispensing",
    receivedAt: "2026-06-11T09:30:00", verifiedAt: "2026-06-11T09:40:00",
    prescribedBy: "Dr. Kavya Reddy", dept: "Pulmonology",
    verifiedBy: "Pharm. Ravi Kumar",
    patientAge: 47, patientSex: "M", allergies: [],
    items: [
      { id: "RXI-026", drug: "Salbutamol Inhaler",  genericName: "Salbutamol",   form: "Inhaler",strength: "100 mcg",dose: "2 puffs",route: "Inhaler",frequency: "SOS",duration: "Ongoing", qty: 1, qtyDispensed: 0,unitPrice: 85.00,stockStatus: "Low Stock" },
      { id: "RXI-027", drug: "Prednisolone 5 mg",   genericName: "Prednisolone", form: "Tablet", strength: "5 mg",   dose: "10 mg", route: "Oral",  frequency: "OD", duration: "7 days",  qty: 7, qtyDispensed: 0,unitPrice: 2.00, stockStatus: "Available" },
      { id: "RXI-028", drug: "Azithromycin 500 mg", genericName: "Azithromycin", form: "Tablet", strength: "500 mg", dose: "500 mg",route: "Oral",  frequency: "OD", duration: "5 days",  qty: 5, qtyDispensed: 0,unitPrice: 18.00,stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0011 – Pending, Emergency ──────────────────────────────────────────
  {
    id: "RX-0011", patientId: "PT-0006", patientName: "Meena Kumari",
    source: "Emergency", status: "Pending",
    receivedAt: "2026-06-11T10:05:00",
    prescribedBy: "Dr. Harish Nair", dept: "Emergency",
    patientAge: 28, patientSex: "F", allergies: ["NSAIDs"],
    items: [
      { id: "RXI-029", drug: "Ondansetron 4 mg",    genericName: "Ondansetron",form: "Tablet",strength: "4 mg",  dose: "4 mg",  route: "Oral",frequency: "BD", duration: "3 days",qty: 6,  qtyDispensed: 0,unitPrice: 7.00, stockStatus: "Available" },
      { id: "RXI-030", drug: "Paracetamol 500 mg",  genericName: "Paracetamol",form: "Tablet",strength: "500 mg",dose: "500 mg",route: "Oral",frequency: "TDS",duration: "3 days",qty: 9,  qtyDispensed: 0,unitPrice: 1.00, stockStatus: "Available" },
      { id: "RXI-031", drug: "Ceftriaxone 1 g Inj", genericName: "Ceftriaxone",form: "Injection",strength: "1 g",dose: "1 g",  route: "IV",  frequency: "BD", duration: "5 days",qty: 10, qtyDispensed: 0,unitPrice: 95.00,stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0012 – Pending, IPD morning round ──────────────────────────────────
  {
    id: "RX-0012", patientId: "PT-0009", patientName: "Kavya Sharma",
    source: "IPD", status: "Pending",
    receivedAt: "2026-06-11T10:20:00",
    prescribedBy: "Dr. Ananya Joshi", dept: "Nephrology",
    patientAge: 45, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-032", drug: "Furosemide 40 mg",   genericName: "Furosemide",  form: "Tablet",strength: "40 mg",dose: "40 mg",route: "Oral",frequency: "BD",duration: "3 days",qty: 6,  qtyDispensed: 0,unitPrice: 2.50, stockStatus: "Available" },
      { id: "RXI-033", drug: "Amlodipine 5 mg",    genericName: "Amlodipine",  form: "Tablet",strength: "5 mg", dose: "5 mg", route: "Oral",frequency: "OD",duration: "7 days",qty: 7,  qtyDispensed: 0,unitPrice: 3.00, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0013 – Verified, IPD ────────────────────────────────────────────────
  {
    id: "RX-0013", patientId: "PT-0020", patientName: "Pradeep Kumar",
    source: "IPD", status: "Verified",
    receivedAt: "2026-06-11T10:45:00", verifiedAt: "2026-06-11T11:00:00",
    prescribedBy: "Dr. Suresh Patel", dept: "Cardiology",
    verifiedBy: "Pharm. Sneha Gupta",
    patientAge: 61, patientSex: "M", allergies: [],
    items: [
      { id: "RXI-034", drug: "Aspirin 75 mg",       genericName: "Aspirin",      form: "Tablet",strength: "75 mg", dose: "75 mg",route: "Oral",frequency: "OD",duration: "Ongoing",qty: 30,qtyDispensed: 0,unitPrice: 1.50, stockStatus: "Available" },
      { id: "RXI-035", drug: "Metoprolol 25 mg",    genericName: "Metoprolol",   form: "Tablet",strength: "25 mg",dose: "25 mg",route: "Oral",frequency: "BD",duration: "30 days",qty: 60,qtyDispensed: 0,unitPrice: 3.50, stockStatus: "Available" },
      { id: "RXI-036", drug: "Atorvastatin 10 mg",  genericName: "Atorvastatin", form: "Tablet",strength: "10 mg",dose: "10 mg",route: "Oral",frequency: "HS",duration: "Ongoing",qty: 30,qtyDispensed: 0,unitPrice: 5.50, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0014 – Cancelled ────────────────────────────────────────────────────
  {
    id: "RX-0014", patientId: "PT-0024", patientName: "Sanjay Mehta",
    source: "OPD", status: "Cancelled",
    receivedAt: "2026-06-10T14:00:00",
    prescribedBy: "Dr. Harish Nair", dept: "General Medicine",
    notes: "Cancelled — patient allergic to Amoxicillin (not noted in chart at time of prescribing).",
    patientAge: 49, patientSex: "M", allergies: ["Penicillin", "Amoxicillin"],
    items: [
      { id: "RXI-037", drug: "Amoxicillin 500 mg",  genericName: "Amoxicillin",  form: "Capsule",strength: "500 mg",dose: "500 mg",route: "Oral",frequency: "TDS",duration: "7 days",qty: 21,qtyDispensed: 0,unitPrice: 8.00, stockStatus: "Low Stock" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },

  // ── RX-0015 – Dispensed, Insulin IPD ──────────────────────────────────────
  {
    id: "RX-0015", patientId: "PT-0002", patientName: "Priya Sharma",
    admissionId: "ADM-0002", source: "IPD", status: "Dispensed",
    receivedAt: "2026-06-09T08:00:00", verifiedAt: "2026-06-09T08:15:00", dispensedAt: "2026-06-09T08:30:00",
    prescribedBy: "Dr. Priya Mehta", dept: "Endocrinology",
    verifiedBy: "Pharm. Ravi Kumar", dispensedBy: "Pharm. Ravi Kumar",
    patientAge: 35, patientSex: "F", allergies: [],
    items: [
      { id: "RXI-038", drug: "Insulin Glargine 100U",genericName: "Insulin Glargine",form: "Injection",strength: "100 U/mL",dose: "20 U",route: "SC",frequency: "OD HS",duration: "14 days",qty: 1,qtyDispensed: 1,unitPrice: 280.00,stockStatus: "Low Stock" },
      { id: "RXI-039", drug: "Metformin 500 mg",     genericName: "Metformin",       form: "Tablet",   strength: "500 mg",  dose: "500 mg",route: "Oral",frequency: "BD",    duration: "14 days",qty: 28,qtyDispensed: 28,unitPrice: 2.50, stockStatus: "Available" },
    ],
    get totalAmount() { return totalAmt(this.items); },
  },
];
