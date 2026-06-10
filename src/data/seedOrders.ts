// ── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus   = "Ordered" | "Acknowledged" | "In-Progress" | "Completed" | "Cancelled";
export type OrderType     = "Lab" | "Medication" | "Imaging" | "Referral" | "Procedure" | "Diet";
export type OrderPriority = "Routine" | "Urgent" | "STAT";

export interface StatusEvent {
  status: OrderStatus;
  at: string;
  by: string;
  note?: string;
}

export interface ResultParam {
  name: string;
  value: string;
  unit: string;
  refRange: string;
  flag?: "H" | "L" | "HH" | "LL" | "N";
}

export interface DiagnosticResult {
  reportedAt: string;
  reportedBy: string;
  findings: string;
  conclusion?: string;
  critical: boolean;
  attachmentName?: string;
  parameters?: ResultParam[];
}

export interface Order {
  id: string;
  patientId: string;
  patientName: string;
  orderedBy: string;
  orderedAt: string;
  type: OrderType;
  title: string;
  details: string;
  priority: OrderPriority;
  status: OrderStatus;
  statusHistory: StatusEvent[];
  notes?: string;
  linkedLabId?: string;
  result?: DiagnosticResult;
}

// ── Seed data ─────────────────────────────────────────────────────────────────

export const seedOrders: Order[] = [
  // ── PT-0001 Ravi Teja ──────────────────────────────────────────────────────
  {
    id: "ORD-0001",
    patientId: "PT-0001",
    patientName: "Ravi Teja",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T08:15:00",
    type: "Lab",
    title: "HbA1c",
    details: "Fasting sample · 3-month follow-up for DM",
    priority: "Routine",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T08:15:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T08:30:00", by: "Lab Technician Ramesh" },
      { status: "In-Progress",  at: "2026-06-11T09:00:00", by: "Lab Technician Ramesh" },
      { status: "Completed",    at: "2026-06-11T10:45:00", by: "Lab Technician Ramesh", note: "Result: 7.8%" },
    ],
    result: {
      reportedAt: "2026-06-11T10:45:00",
      reportedBy: "Lab Technician Ramesh",
      findings: "HbA1c measured by HPLC method.",
      conclusion: "HbA1c 7.8% — sub-optimal control. Lifestyle counselling and medication review advised.",
      critical: false,
      parameters: [
        { name: "HbA1c", value: "7.8", unit: "%", refRange: "4.0–5.6 (Normal), <7.0 (DM target)", flag: "H" },
      ],
    },
  },
  {
    id: "ORD-0002",
    patientId: "PT-0001",
    patientName: "Ravi Teja",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T08:17:00",
    type: "Medication",
    title: "Metformin 500mg",
    details: "BD after meals · 30-day supply",
    priority: "Routine",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T08:17:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T08:45:00", by: "Pharmacist Sunita" },
    ],
  },

  // ── PT-0004 Meena Sharma ───────────────────────────────────────────────────
  {
    id: "ORD-0003",
    patientId: "PT-0004",
    patientName: "Meena Sharma",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T09:00:00",
    type: "Lab",
    title: "Serum Creatinine + eGFR",
    details: "Urgent — CKD monitoring · compare with last month",
    priority: "Urgent",
    status: "In-Progress",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T09:00:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-11T09:10:00", by: "Lab Technician Ramesh" },
      { status: "In-Progress",  at: "2026-06-11T09:30:00", by: "Lab Technician Ramesh" },
    ],
  },
  {
    id: "ORD-0004",
    patientId: "PT-0004",
    patientName: "Meena Sharma",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T09:02:00",
    type: "Imaging",
    title: "Chest X-Ray (PA view)",
    details: "Rule out pulmonary oedema · HTN + CAD",
    priority: "Urgent",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T09:02:00", by: "Dr. Rajiv Mehta" },
    ],
  },
  {
    id: "ORD-0005",
    patientId: "PT-0004",
    patientName: "Meena Sharma",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T09:05:00",
    type: "Referral",
    title: "Nephrology Referral",
    details: "CKD Stage 3 — specialist evaluation for dialysis planning",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T09:05:00", by: "Dr. Rajiv Mehta" },
    ],
  },

  // ── PT-0007 Mohan Lal ──────────────────────────────────────────────────────
  {
    id: "ORD-0006",
    patientId: "PT-0007",
    patientName: "Mohan Lal",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-10T22:05:00",
    type: "Lab",
    title: "Troponin I (High Sensitivity)",
    details: "Emergency — chest pain onset 2h ago · serial at 0h and 3h",
    priority: "STAT",
    status: "Completed",
    notes: "Both serial results elevated. Cardiology alerted.",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T22:05:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-10T22:08:00", by: "Lab Technician Ramesh" },
      { status: "In-Progress",  at: "2026-06-10T22:15:00", by: "Lab Technician Ramesh" },
      { status: "Completed",    at: "2026-06-10T22:45:00", by: "Lab Technician Ramesh", note: "Troponin: 2.8 ng/L (HH)" },
    ],
    result: {
      reportedAt: "2026-06-10T22:45:00",
      reportedBy: "Lab Technician Ramesh",
      findings: "High sensitivity Troponin I measured at 0h and 3h. Both values critically elevated.",
      conclusion: "Serial Troponin elevation consistent with acute myocardial injury. Cardiology consulted.",
      critical: true,
      parameters: [
        { name: "Troponin I (0h)", value: "2.8", unit: "ng/L", refRange: "<0.04", flag: "HH" },
        { name: "Troponin I (3h)", value: "4.1", unit: "ng/L", refRange: "<0.04", flag: "HH" },
      ],
    },
  },
  {
    id: "ORD-0007",
    patientId: "PT-0007",
    patientName: "Mohan Lal",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-10T22:07:00",
    type: "Imaging",
    title: "12-Lead ECG",
    details: "STAT — ST changes evaluation",
    priority: "STAT",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T22:07:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-10T22:09:00", by: "Nurse Deepa" },
      { status: "In-Progress",  at: "2026-06-10T22:11:00", by: "Nurse Deepa" },
      { status: "Completed",    at: "2026-06-10T22:18:00", by: "Nurse Deepa", note: "ST elevation V2-V4 noted. Forwarded to cardiologist." },
    ],
    result: {
      reportedAt: "2026-06-10T22:18:00",
      reportedBy: "Nurse Deepa",
      findings: "12-lead ECG performed at bedside. ST elevation of 2–3mm noted in leads V2, V3, V4. Reciprocal changes in inferior leads.",
      conclusion: "Findings consistent with anterior STEMI. Primary PCI indicated. Cardiology paged immediately.",
      critical: true,
      attachmentName: "ecg-mohan-lal-2026-06-10.pdf",
    },
  },
  {
    id: "ORD-0008",
    patientId: "PT-0007",
    patientName: "Mohan Lal",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-10T22:10:00",
    type: "Medication",
    title: "Aspirin 325mg (loading)",
    details: "Stat single dose · chew and swallow",
    priority: "STAT",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T22:10:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-10T22:12:00", by: "Nurse Deepa" },
      { status: "Completed",    at: "2026-06-10T22:13:00", by: "Nurse Deepa", note: "Administered bedside." },
    ],
  },
  {
    id: "ORD-0009",
    patientId: "PT-0007",
    patientName: "Mohan Lal",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-10T22:20:00",
    type: "Referral",
    title: "Cardiology — Emergency Consult",
    details: "ACS workup · possible primary PCI",
    priority: "STAT",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T22:20:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-10T22:25:00", by: "Dr. Suresh Cardiology" },
    ],
  },

  // ── PT-0002 Priya Nair ─────────────────────────────────────────────────────
  {
    id: "ORD-0010",
    patientId: "PT-0002",
    patientName: "Priya Nair",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T10:00:00",
    type: "Lab",
    title: "TSH + Free T4",
    details: "Routine hypothyroid monitoring · 6-month review",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T10:00:00", by: "Dr. Ananya Krishnan" },
    ],
  },
  {
    id: "ORD-0011",
    patientId: "PT-0002",
    patientName: "Priya Nair",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T10:02:00",
    type: "Medication",
    title: "Levothyroxine 50mcg",
    details: "OD empty stomach · 30-day supply",
    priority: "Routine",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T10:02:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T10:15:00", by: "Pharmacist Sunita" },
      { status: "Completed",    at: "2026-06-11T10:30:00", by: "Pharmacist Sunita", note: "Dispensed." },
    ],
  },

  // ── PT-0003 Arjun Singh ────────────────────────────────────────────────────
  {
    id: "ORD-0012",
    patientId: "PT-0003",
    patientName: "Arjun Singh",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T11:00:00",
    type: "Imaging",
    title: "Ultrasound Abdomen",
    details: "RUQ pain · rule out cholelithiasis",
    priority: "Routine",
    status: "In-Progress",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T11:00:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T11:10:00", by: "Radiology Dept" },
      { status: "In-Progress",  at: "2026-06-11T11:30:00", by: "Sonographer Leela" },
    ],
  },
  {
    id: "ORD-0013",
    patientId: "PT-0003",
    patientName: "Arjun Singh",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T11:05:00",
    type: "Lab",
    title: "LFT (Liver Function Tests)",
    details: "Panel: ALT, AST, ALP, Bilirubin · fasting",
    priority: "Urgent",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T11:05:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T11:20:00", by: "Lab Technician Ramesh" },
    ],
  },

  // ── PT-0005 Lakshmi Devi ───────────────────────────────────────────────────
  {
    id: "ORD-0014",
    patientId: "PT-0005",
    patientName: "Lakshmi Devi",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-10T14:00:00",
    type: "Procedure",
    title: "Nebulisation (Salbutamol)",
    details: "2.5mg in 3ml NS · repeat every 20 min x 3 if needed",
    priority: "Urgent",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T14:00:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-10T14:05:00", by: "Nurse Deepa" },
      { status: "In-Progress",  at: "2026-06-10T14:10:00", by: "Nurse Deepa" },
      { status: "Completed",    at: "2026-06-10T14:45:00", by: "Nurse Deepa", note: "3 cycles given. SpO2 improved to 97%." },
    ],
  },
  {
    id: "ORD-0015",
    patientId: "PT-0005",
    patientName: "Lakshmi Devi",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-10T14:03:00",
    type: "Diet",
    title: "Soft Bland Diet",
    details: "Low sodium, no spicy food · post-exacerbation",
    priority: "Routine",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-10T14:03:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-10T14:30:00", by: "Dietician Mala" },
    ],
  },

  // ── PT-0006 Suresh Patel ───────────────────────────────────────────────────
  {
    id: "ORD-0016",
    patientId: "PT-0006",
    patientName: "Suresh Patel",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T07:30:00",
    type: "Lab",
    title: "Fasting Blood Sugar + PP Sugar",
    details: "DM annual review · serial 0h and 2h post-breakfast",
    priority: "Routine",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T07:30:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-11T07:40:00", by: "Lab Technician Ramesh" },
      { status: "In-Progress",  at: "2026-06-11T08:00:00", by: "Lab Technician Ramesh" },
      { status: "Completed",    at: "2026-06-11T10:20:00", by: "Lab Technician Ramesh", note: "FBS: 126mg/dL, PPBS: 198mg/dL" },
    ],
    result: {
      reportedAt: "2026-06-11T10:20:00",
      reportedBy: "Lab Technician Ramesh",
      findings: "Fasting and post-prandial blood glucose measured by glucose oxidase method.",
      conclusion: "FBS and PPBS both elevated above target. DM medication review recommended.",
      critical: false,
      parameters: [
        { name: "Fasting Blood Sugar",      value: "126", unit: "mg/dL", refRange: "70-100",  flag: "H" },
        { name: "Post-Prandial Blood Sugar", value: "198", unit: "mg/dL", refRange: "<140",   flag: "H" },
      ],
    },
  },
  {
    id: "ORD-0017",
    patientId: "PT-0006",
    patientName: "Suresh Patel",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T07:35:00",
    type: "Imaging",
    title: "ECG (Resting)",
    details: "Annual cardiac screen · DM + HTN",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T07:35:00", by: "Dr. Rajiv Mehta" },
    ],
  },

  // ── PT-0008 Kavitha Rao ────────────────────────────────────────────────────
  {
    id: "ORD-0018",
    patientId: "PT-0008",
    patientName: "Kavitha Rao",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T12:00:00",
    type: "Lab",
    title: "CBC with Differential",
    details: "Fatigue workup · anaemia screen",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T12:00:00", by: "Dr. Ananya Krishnan" },
    ],
  },
  {
    id: "ORD-0019",
    patientId: "PT-0008",
    patientName: "Kavitha Rao",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T12:02:00",
    type: "Medication",
    title: "Iron Sucrose 200mg IV",
    details: "Single dose · IV infusion over 30 min · pre-medication with antihistamine",
    priority: "Routine",
    status: "Cancelled",
    notes: "Cancelled — patient allergic to IV iron (prior reaction). Switch to oral.",
    statusHistory: [
      { status: "Ordered",   at: "2026-06-11T12:02:00", by: "Dr. Ananya Krishnan" },
      { status: "Cancelled", at: "2026-06-11T12:10:00", by: "Nurse Deepa", note: "Allergy flag raised. Order cancelled per Dr. instruction." },
    ],
  },
  {
    id: "ORD-0020",
    patientId: "PT-0008",
    patientName: "Kavitha Rao",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T12:12:00",
    type: "Medication",
    title: "Ferrous Sulphate 200mg",
    details: "OD after meals · 8-week course",
    priority: "Routine",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T12:12:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T12:20:00", by: "Pharmacist Sunita" },
    ],
  },

  // ── PT-0009 Vijay Kumar ────────────────────────────────────────────────────
  {
    id: "ORD-0021",
    patientId: "PT-0009",
    patientName: "Vijay Kumar",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T13:00:00",
    type: "Referral",
    title: "Orthopaedics Referral",
    details: "Knee OA — Arthritis management · physiotherapy evaluation",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T13:00:00", by: "Dr. Rajiv Mehta" },
    ],
  },
  {
    id: "ORD-0022",
    patientId: "PT-0009",
    patientName: "Vijay Kumar",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T13:02:00",
    type: "Imaging",
    title: "X-Ray Bilateral Knee (AP + Lateral)",
    details: "OA grading · weight bearing view",
    priority: "Routine",
    status: "In-Progress",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T13:02:00", by: "Dr. Rajiv Mehta" },
      { status: "Acknowledged", at: "2026-06-11T13:10:00", by: "Radiology Dept" },
      { status: "In-Progress",  at: "2026-06-11T13:20:00", by: "Radiographer Mohan" },
    ],
  },

  // ── PT-0010 Sunita Verma ───────────────────────────────────────────────────
  {
    id: "ORD-0023",
    patientId: "PT-0010",
    patientName: "Sunita Verma",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-09T09:00:00",
    type: "Procedure",
    title: "Wound Dressing Change",
    details: "Post-surgical wound · Betadine + sterile gauze · daily",
    priority: "Routine",
    status: "Completed",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-09T09:00:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-09T09:10:00", by: "Nurse Deepa" },
      { status: "Completed",    at: "2026-06-09T10:00:00", by: "Nurse Deepa", note: "Wound clean. No signs of infection." },
    ],
  },
  {
    id: "ORD-0024",
    patientId: "PT-0010",
    patientName: "Sunita Verma",
    orderedBy: "Dr. Ananya Krishnan",
    orderedAt: "2026-06-11T09:00:00",
    type: "Diet",
    title: "High Protein Diet",
    details: "Post-surgical recovery · 1.5g protein/kg body weight",
    priority: "Routine",
    status: "Acknowledged",
    statusHistory: [
      { status: "Ordered",      at: "2026-06-11T09:00:00", by: "Dr. Ananya Krishnan" },
      { status: "Acknowledged", at: "2026-06-11T09:30:00", by: "Dietician Mala" },
    ],
  },
  {
    id: "ORD-0025",
    patientId: "PT-0011",
    patientName: "Deepak Joshi",
    orderedBy: "Dr. Rajiv Mehta",
    orderedAt: "2026-06-11T14:00:00",
    type: "Lab",
    title: "Lipid Profile",
    details: "Fasting 12h · CAD risk screening · first visit",
    priority: "Routine",
    status: "Ordered",
    statusHistory: [
      { status: "Ordered", at: "2026-06-11T14:00:00", by: "Dr. Rajiv Mehta" },
    ],
  },
];
