// ── Types ────────────────────────────────────────────────────────────────────

export type BillStatus    = "Draft" | "Pending" | "Paid" | "Partially Paid" | "Overdue" | "Cancelled" | "Waived";
export type PaymentMethod = "Cash" | "UPI" | "Card" | "NEFT" | "Insurance" | "Cheque";
export type BillCategory  = "OPD" | "IPD" | "Lab" | "Imaging" | "Pharmacy" | "Procedure" | "Emergency";

export interface LineItem {
  id:          string;
  description: string;
  category:    BillCategory;
  qty:         number;
  unitPrice:   number;   // INR
  discount?:   number;   // INR, not %
  total:       number;   // (qty * unitPrice) - discount
}

export interface Payment {
  id:     string;
  paidAt: string;           // ISO datetime
  amount: number;           // INR
  method: PaymentMethod;
  ref?:   string;           // UPI txn / cheque no.
  by:     string;
}

export interface Bill {
  id:             string;
  patientId:      string;
  patientName:    string;
  admissionId?:   string;   // set for IPD bills
  category:       BillCategory;
  status:         BillStatus;
  createdAt:      string;   // ISO datetime
  dueDate:        string;   // ISO date
  items:          LineItem[];
  subtotal:       number;
  discountTotal:  number;
  tax:            number;   // GST (5% on applicable items)
  grandTotal:     number;
  amountPaid:     number;
  amountDue:      number;
  payments:       Payment[];
  notes?:         string;
  insuranceClaim?: string;  // insurance reference
  createdBy:      string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function calc(items: Omit<LineItem, "total">[]): { items: LineItem[]; subtotal: number; discountTotal: number; tax: number; grandTotal: number } {
  const lineItems = items.map((it) => ({ ...it, total: it.qty * it.unitPrice - (it.discount ?? 0) }));
  const subtotal  = lineItems.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const discountTotal = lineItems.reduce((s, i) => s + (i.discount ?? 0), 0);
  const taxable   = lineItems.filter((i) => i.category === "Imaging" || i.category === "Procedure").reduce((s, i) => s + i.total, 0);
  const tax       = Math.round(taxable * 0.05);
  const grandTotal = subtotal - discountTotal + tax;
  return { items: lineItems, subtotal, discountTotal, tax, grandTotal };
}

function paid(payments: Payment[]) {
  return payments.reduce((s, p) => s + p.amount, 0);
}

// ── Seed bills ────────────────────────────────────────────────────────────────

const b01 = calc([
  { id: "li-01-1", description: "OPD Consultation — Dr. Priya Mehta", category: "OPD",       qty: 1, unitPrice: 500 },
  { id: "li-01-2", description: "HbA1c Test",                          category: "Lab",       qty: 1, unitPrice: 350 },
  { id: "li-01-3", description: "Metformin 500mg × 30",               category: "Pharmacy",  qty: 1, unitPrice: 120 },
]);
const p01: Payment[] = [{ id: "py-01-1", paidAt: "2026-06-08T10:30:00", amount: 970, method: "UPI", ref: "UPI20260608103012", by: "Cashier Ravi" }];

const b02 = calc([
  { id: "li-02-1", description: "Emergency Consultation",              category: "Emergency", qty: 1, unitPrice: 800 },
  { id: "li-02-2", description: "12-Lead ECG",                         category: "Imaging",  qty: 1, unitPrice: 500 },
  { id: "li-02-3", description: "Troponin I — STAT",                  category: "Lab",       qty: 1, unitPrice: 600 },
  { id: "li-02-4", description: "IV Labetalol Infusion",              category: "Pharmacy",  qty: 1, unitPrice: 450 },
]);
const p02: Payment[] = [];

const b03 = calc([
  { id: "li-03-1", description: "OPD Consultation — Dr. Ananya Krishnan", category: "OPD",   qty: 1, unitPrice: 500 },
  { id: "li-03-2", description: "Spirometry / PFT",                    category: "Procedure", qty: 1, unitPrice: 800 },
  { id: "li-03-3", description: "Chest X-Ray PA",                      category: "Imaging",  qty: 1, unitPrice: 600 },
  { id: "li-03-4", description: "Montelukast 10mg × 30",              category: "Pharmacy",  qty: 1, unitPrice: 180 },
]);
const p03: Payment[] = [{ id: "py-03-1", paidAt: "2026-06-07T12:00:00", amount: 1000, method: "Cash", by: "Cashier Ravi" }];

const b04 = calc([
  { id: "li-04-1", description: "IPD Bed Charges — General Ward A × 5 days", category: "IPD",  qty: 5, unitPrice: 1200 },
  { id: "li-04-2", description: "Laparoscopic Cholecystectomy",         category: "Procedure", qty: 1, unitPrice: 35000 },
  { id: "li-04-3", description: "Anaesthesia Charges",                  category: "Procedure", qty: 1, unitPrice: 8000 },
  { id: "li-04-4", description: "Post-op Lab Panel",                    category: "Lab",       qty: 1, unitPrice: 1200 },
  { id: "li-04-5", description: "IV Antibiotics Course",               category: "Pharmacy",  qty: 1, unitPrice: 2400 },
]);
const p04: Payment[] = [
  { id: "py-04-1", paidAt: "2026-06-09T09:00:00", amount: 25000, method: "Insurance", ref: "ICICI-HC-2026-0045", by: "Insurance Desk" },
  { id: "py-04-2", paidAt: "2026-06-11T14:00:00", amount: 10000, method: "NEFT",      ref: "NEFT20260611001", by: "Cashier Ravi" },
];

const b05 = calc([
  { id: "li-05-1", description: "OPD Consultation — Dr. Suresh Nair",    category: "OPD",   qty: 1, unitPrice: 500 },
  { id: "li-05-2", description: "CBC + Widal Test",                       category: "Lab",   qty: 1, unitPrice: 450 },
  { id: "li-05-3", description: "Ceftriaxone 1g Injection × 5",         category: "Pharmacy", qty: 5, unitPrice: 180 },
]);
const p05: Payment[] = [{ id: "py-05-1", paidAt: "2026-06-10T17:30:00", amount: 1850, method: "Cash", by: "Cashier Ravi" }];

const b06 = calc([
  { id: "li-06-1", description: "IPD Bed Charges — General Ward B × 4 days", category: "IPD",  qty: 4, unitPrice: 1200 },
  { id: "li-06-2", description: "HRCT Chest",                            category: "Imaging",  qty: 1, unitPrice: 4500 },
  { id: "li-06-3", description: "Sputum Culture & Sensitivity",          category: "Lab",       qty: 1, unitPrice: 800 },
  { id: "li-06-4", description: "IV Piperacillin-Tazobactam",           category: "Pharmacy",  qty: 1, unitPrice: 3200 },
  { id: "li-06-5", description: "Physiotherapy Sessions × 3",           category: "Procedure", qty: 3, unitPrice: 600 },
]);
const p06: Payment[] = [{ id: "py-06-1", paidAt: "2026-06-10T11:00:00", amount: 8000, method: "UPI", ref: "UPI20260610110055", by: "Cashier Ravi" }];

const b07 = calc([
  { id: "li-07-1", description: "IPD Bed Charges — Surgical Ward × 6 days", category: "IPD",  qty: 6, unitPrice: 1200 },
  { id: "li-07-2", description: "Appendicectomy — Laparoscopic",         category: "Procedure", qty: 1, unitPrice: 28000 },
  { id: "li-07-3", description: "Anaesthesia Charges",                   category: "Procedure", qty: 1, unitPrice: 7000 },
  { id: "li-07-4", description: "Histopathology",                        category: "Lab",       qty: 1, unitPrice: 1500 },
  { id: "li-07-5", description: "Post-op Medications",                  category: "Pharmacy",   qty: 1, unitPrice: 1800 },
]);
const p07: Payment[] = [
  { id: "py-07-1", paidAt: "2026-06-07T10:00:00", amount: 20000, method: "Card", ref: "HDFC-XXXX-7821", by: "Cashier Ravi" },
  { id: "py-07-2", paidAt: "2026-06-09T09:00:00", amount: 12000, method: "NEFT", ref: "NEFT20260609002", by: "Cashier Ravi" },
];

const b08 = calc([
  { id: "li-08-1", description: "HDU Bed Charges × 3 days",              category: "IPD",      qty: 3, unitPrice: 4500 },
  { id: "li-08-2", description: "Cardiac Monitoring — Continuous",       category: "Procedure", qty: 1, unitPrice: 3000 },
  { id: "li-08-3", description: "Echocardiogram",                        category: "Imaging",  qty: 1, unitPrice: 2500 },
  { id: "li-08-4", description: "Troponin I × 3",                        category: "Lab",       qty: 3, unitPrice: 600 },
  { id: "li-08-5", description: "Heparin Infusion + Dual Antiplatelet", category: "Pharmacy",  qty: 1, unitPrice: 2800, discount: 500 },
]);
const p08: Payment[] = [
  { id: "py-08-1", paidAt: "2026-06-10T16:00:00", amount: 15000, method: "Insurance", ref: "STAR-HEALTH-2026-1122", by: "Insurance Desk" },
];

const b09 = calc([
  { id: "li-09-1", description: "ICU Bed Charges × 3 days",              category: "IPD",      qty: 3, unitPrice: 8000 },
  { id: "li-09-2", description: "Mechanical Ventilation",                category: "Procedure", qty: 1, unitPrice: 12000 },
  { id: "li-09-3", description: "ABG × 4",                               category: "Lab",       qty: 4, unitPrice: 400 },
  { id: "li-09-4", description: "ICU Nursing — Intensive",               category: "Procedure", qty: 1, unitPrice: 6000 },
  { id: "li-09-5", description: "Sedation Drugs",                        category: "Pharmacy",  qty: 1, unitPrice: 4200 },
]);
const p09: Payment[] = [];

const b10 = calc([
  { id: "li-10-1", description: "OPD Consultation — Dr. Priya Mehta",    category: "OPD",      qty: 1, unitPrice: 500 },
  { id: "li-10-2", description: "Neonatal Delivery — Normal Vaginal",    category: "Procedure", qty: 1, unitPrice: 12000 },
  { id: "li-10-3", description: "Maternity Bed × 3 days",                category: "IPD",      qty: 3, unitPrice: 1800 },
  { id: "li-10-4", description: "Post-natal Lab",                        category: "Lab",       qty: 1, unitPrice: 600 },
]);
const p10: Payment[] = [
  { id: "py-10-1", paidAt: "2026-06-10T23:00:00", amount: 10000, method: "Cash", by: "Cashier Ravi" },
];

const b11 = calc([
  { id: "li-11-1", description: "OPD Consultation — Dr. Ramesh Gupta",   category: "OPD",   qty: 1, unitPrice: 600 },
  { id: "li-11-2", description: "KFT Panel",                             category: "Lab",   qty: 1, unitPrice: 750 },
  { id: "li-11-3", description: "Telmisartan 40mg × 30",                category: "Pharmacy", qty: 1, unitPrice: 90 },
]);
const p11: Payment[] = [{ id: "py-11-1", paidAt: "2026-06-05T10:00:00", amount: 1440, method: "UPI", ref: "UPI20260605100012", by: "Cashier Ravi" }];

const b12 = calc([
  { id: "li-12-1", description: "OPD Consultation — Dr. Suresh Nair",    category: "OPD",      qty: 1, unitPrice: 600 },
  { id: "li-12-2", description: "2D Echo + Doppler",                     category: "Imaging",  qty: 1, unitPrice: 2200 },
  { id: "li-12-3", description: "TMT (Treadmill Test)",                  category: "Procedure", qty: 1, unitPrice: 1800 },
  { id: "li-12-4", description: "Atorvastatin + Aspirin × 30",          category: "Pharmacy",  qty: 1, unitPrice: 150 },
]);
const p12: Payment[] = [{ id: "py-12-1", paidAt: "2026-06-03T11:00:00", amount: 2500, method: "Card", ref: "SBI-XXXX-1234", by: "Cashier Ravi" }];

const b13 = calc([
  { id: "li-13-1", description: "Emergency Admission — Dengue",          category: "Emergency", qty: 1, unitPrice: 800 },
  { id: "li-13-2", description: "IPD Bed Charges × 2 days",              category: "IPD",      qty: 2, unitPrice: 1200 },
  { id: "li-13-3", description: "CBC Daily × 2",                         category: "Lab",       qty: 2, unitPrice: 350 },
  { id: "li-13-4", description: "IV Fluids + Nursing",                   category: "Pharmacy",  qty: 1, unitPrice: 900 },
]);
const p13: Payment[] = [{ id: "py-13-1", paidAt: "2026-06-11T09:00:00", amount: 2000, method: "UPI", ref: "UPI20260611090033", by: "Cashier Ravi" }];

const b14 = calc([
  { id: "li-14-1", description: "OPD Follow-up — Dr. Ananya Krishnan",   category: "OPD",   qty: 1, unitPrice: 400 },
  { id: "li-14-2", description: "Thyroid Function Test",                  category: "Lab",   qty: 1, unitPrice: 650 },
]);
const p14: Payment[] = [{ id: "py-14-1", paidAt: "2026-06-02T09:30:00", amount: 1050, method: "Cash", by: "Cashier Ravi" }];

const b15 = calc([
  { id: "li-15-1", description: "Emergency Consultation — Chest Pain",   category: "Emergency", qty: 1, unitPrice: 1000 },
  { id: "li-15-2", description: "CT Coronary Angiography",               category: "Imaging",  qty: 1, unitPrice: 8500 },
  { id: "li-15-3", description: "Cardiac Enzymes Panel",                 category: "Lab",       qty: 1, unitPrice: 1200 },
  { id: "li-15-4", description: "Emergency Medications",                 category: "Pharmacy",  qty: 1, unitPrice: 1800, discount: 300 },
]);
const p15: Payment[] = [];

// ── Exported seed list ────────────────────────────────────────────────────────

export const seedBills: Bill[] = [
  {
    id: "BILL-0001", patientId: "PT-0001", patientName: "Anil Kumar Sharma",
    category: "OPD", status: "Paid", createdAt: "2026-06-08T10:00:00", dueDate: "2026-06-15",
    ...b01, amountPaid: paid(p01), amountDue: b01.grandTotal - paid(p01),
    payments: p01, createdBy: "Front Desk",
  },
  {
    id: "BILL-0002", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai",
    admissionId: "ADM-0002",
    category: "IPD", status: "Pending", createdAt: "2026-06-09T15:00:00", dueDate: "2026-06-14",
    ...b02, amountPaid: paid(p02), amountDue: b02.grandTotal - paid(p02),
    payments: p02, createdBy: "Front Desk",
  },
  {
    id: "BILL-0003", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer",
    category: "OPD", status: "Partially Paid", createdAt: "2026-06-07T11:30:00", dueDate: "2026-06-12",
    ...b03, amountPaid: paid(p03), amountDue: b03.grandTotal - paid(p03),
    payments: p03, createdBy: "Front Desk",
  },
  {
    id: "BILL-0004", patientId: "PT-0008", patientName: "Sunita Devi Yadav",
    admissionId: "ADM-0004",
    category: "IPD", status: "Partially Paid",
    notes: "Insurance pre-auth ref: ICICI-HC-2026-0045",
    insuranceClaim: "ICICI-HC-2026-0045",
    createdAt: "2026-06-09T09:00:00", dueDate: "2026-06-16",
    ...b04, amountPaid: paid(p04), amountDue: b04.grandTotal - paid(p04),
    payments: p04, createdBy: "Billing Desk",
  },
  {
    id: "BILL-0005", patientId: "PT-0010", patientName: "Kavya Subramaniam",
    category: "IPD", status: "Paid", createdAt: "2026-06-10T17:00:00", dueDate: "2026-06-15",
    ...b05, amountPaid: paid(p05), amountDue: b05.grandTotal - paid(p05),
    payments: p05, createdBy: "Front Desk",
  },
  {
    id: "BILL-0006", patientId: "PT-0012", patientName: "Mohan Das Verma",
    admissionId: "ADM-0006",
    category: "IPD", status: "Partially Paid", createdAt: "2026-06-09T09:30:00", dueDate: "2026-06-13",
    ...b06, amountPaid: paid(p06), amountDue: b06.grandTotal - paid(p06),
    payments: p06, createdBy: "Billing Desk",
  },
  {
    id: "BILL-0007", patientId: "PT-0007", patientName: "Lakshmi Narasimhan",
    admissionId: "ADM-0025",
    category: "IPD", status: "Paid", createdAt: "2026-06-04T08:30:00", dueDate: "2026-06-09",
    ...b07, amountPaid: paid(p07), amountDue: b07.grandTotal - paid(p07),
    payments: p07, createdBy: "Billing Desk",
  },
  {
    id: "BILL-0008", patientId: "PT-0004", patientName: "Karthik Balaji Sundaram",
    admissionId: "ADM-0018",
    category: "IPD", status: "Partially Paid",
    notes: "Insurance claim filed — STAR HEALTH",
    insuranceClaim: "STAR-HEALTH-2026-1122",
    createdAt: "2026-06-10T03:30:00", dueDate: "2026-06-15",
    ...b08, amountPaid: paid(p08), amountDue: b08.grandTotal - paid(p08),
    payments: p08, createdBy: "Billing Desk",
  },
  {
    id: "BILL-0009", patientId: "PT-0006", patientName: "Ramesh Chandra Patel",
    admissionId: "ADM-0021",
    category: "IPD", status: "Overdue", createdAt: "2026-06-08T23:30:00", dueDate: "2026-06-10",
    ...b09, amountPaid: paid(p09), amountDue: b09.grandTotal - paid(p09),
    payments: p09, createdBy: "Billing Desk",
    notes: "Follow up with family for payment.",
  },
  {
    id: "BILL-0010", patientId: "PT-0015", patientName: "Deepa Venkataraman",
    admissionId: "ADM-0014",
    category: "IPD", status: "Partially Paid", createdAt: "2026-06-10T22:30:00", dueDate: "2026-06-14",
    ...b10, amountPaid: paid(p10), amountDue: b10.grandTotal - paid(p10),
    payments: p10, createdBy: "Front Desk",
  },
  {
    id: "BILL-0011", patientId: "PT-0009", patientName: "Suresh Ramamoorthy",
    category: "OPD", status: "Paid", createdAt: "2026-06-05T10:15:00", dueDate: "2026-06-12",
    ...b11, amountPaid: paid(p11), amountDue: b11.grandTotal - paid(p11),
    payments: p11, createdBy: "Front Desk",
  },
  {
    id: "BILL-0012", patientId: "PT-0021", patientName: "Rohit Sharma",
    category: "OPD", status: "Partially Paid", createdAt: "2026-06-03T11:00:00", dueDate: "2026-06-10",
    ...b12, amountPaid: paid(p12), amountDue: b12.grandTotal - paid(p12),
    payments: p12, createdBy: "Front Desk",
    notes: "Patient requested instalment payment.",
  },
  {
    id: "BILL-0013", patientId: "PT-0016", patientName: "Arjun Vikram Nair",
    admissionId: "ADM-0008",
    category: "IPD", status: "Partially Paid", createdAt: "2026-06-10T09:00:00", dueDate: "2026-06-14",
    ...b13, amountPaid: paid(p13), amountDue: b13.grandTotal - paid(p13),
    payments: p13, createdBy: "Billing Desk",
  },
  {
    id: "BILL-0014", patientId: "PT-0002", patientName: "Priya Venkateshwari",
    category: "OPD", status: "Paid", createdAt: "2026-06-02T09:00:00", dueDate: "2026-06-09",
    ...b14, amountPaid: paid(p14), amountDue: b14.grandTotal - paid(p14),
    payments: p14, createdBy: "Front Desk",
  },
  {
    id: "BILL-0015", patientId: "PT-0022", patientName: "Sarita Bhosale",
    category: "Emergency", status: "Overdue", createdAt: "2026-06-09T15:30:00", dueDate: "2026-06-10",
    ...b15, amountPaid: paid(p15), amountDue: b15.grandTotal - paid(p15),
    payments: p15, createdBy: "Front Desk",
    notes: "Patient pending cashless approval.",
  },
];
