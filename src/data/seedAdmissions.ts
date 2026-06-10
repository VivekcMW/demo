// ── Types ────────────────────────────────────────────────────────────────────

export type AdmissionStatus = "Active" | "Planned" | "Discharged" | "Transferred";
export type BedStatus       = "Occupied" | "Available" | "Cleaning" | "Reserved";
export type AdmissionPriority = "General" | "HDU" | "ICU";

export interface StatusEvent {
  at:  string;
  by:  string;
  status: AdmissionStatus;
  note?: string;
}

export interface Admission {
  id:                 string;
  patientId:          string;
  patientName:        string;
  ward:               string;
  bed:                string;
  status:             AdmissionStatus;
  priority:           AdmissionPriority;
  admittedAt:         string;   // ISO datetime
  expectedDischarge:  string;   // ISO date
  attendingDoctor:    string;
  admitDiagnosis:     string;
  clinicalNotes?:     string;
  dischargeSummary?:  string;
  statusHistory:      StatusEvent[];
}

// ── Bed map ────────────────────────────────────────────────────────────────────
// Each entry: { ward, bed, bedStatus }
// This is derived from seeded admissions + extras

export interface BedInfo {
  ward:    string;
  bed:     string;
  status:  BedStatus;
  admissionId?: string;  // if Occupied
  patientName?: string;
  priority?: AdmissionPriority;
}

// Ward capacities (used to generate full bed map in the store)
export const WARDS: { name: string; beds: number; priority: AdmissionPriority }[] = [
  { name: "General Ward A",  beds: 10, priority: "General" },
  { name: "General Ward B",  beds: 8,  priority: "General" },
  { name: "Surgical Ward",   beds: 8,  priority: "General" },
  { name: "Maternity Ward",  beds: 6,  priority: "General" },
  { name: "HDU",             beds: 4,  priority: "HDU"     },
  { name: "ICU",             beds: 4,  priority: "ICU"     },
];

// ── Seed data ─────────────────────────────────────────────────────────────────

export const seedAdmissions: Admission[] = [
  // ── General Ward A (beds A1-A10) ──
  {
    id: "ADM-0001",
    patientId: "PT-0001", patientName: "Anil Kumar Sharma",
    ward: "General Ward A", bed: "A1",
    status: "Active", priority: "General",
    admittedAt: "2026-06-08T09:15:00",
    expectedDischarge: "2026-06-13",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Uncontrolled Type 2 Diabetes Mellitus",
    clinicalNotes: "Patient presented with FBS 320 mg/dL. IV insulin drip initiated. Monitor q4h.",
    statusHistory: [
      { at: "2026-06-08T09:15:00", by: "Dr. Priya Mehta", status: "Active", note: "Admitted via OPD referral" },
    ],
  },
  {
    id: "ADM-0002",
    patientId: "PT-0003", patientName: "Rajesh Narayan Pillai",
    ward: "General Ward A", bed: "A2",
    status: "Active", priority: "General",
    admittedAt: "2026-06-09T14:30:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Hypertensive Emergency with Target Organ Damage",
    clinicalNotes: "BP 190/120 on admission. Started IV labetalol. Neuro obs q2h.",
    statusHistory: [
      { at: "2026-06-09T14:30:00", by: "Dr. Suresh Nair", status: "Active", note: "Emergency admission" },
    ],
  },
  {
    id: "ADM-0003",
    patientId: "PT-0005", patientName: "Meera Lakshmi Iyer",
    ward: "General Ward A", bed: "A3",
    status: "Active", priority: "General",
    admittedAt: "2026-06-07T11:00:00",
    expectedDischarge: "2026-06-12",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Acute Exacerbation of Asthma",
    clinicalNotes: "SpO2 88% on arrival. Nebulisation q4h, IV methylprednisolone.",
    statusHistory: [
      { at: "2026-06-07T11:00:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Walk-in emergency" },
    ],
  },
  {
    id: "ADM-0004",
    patientId: "PT-0008", patientName: "Sunita Devi Yadav",
    ward: "General Ward A", bed: "A5",
    status: "Planned", priority: "General",
    admittedAt: "2026-06-12T08:00:00",
    expectedDischarge: "2026-06-16",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Elective Cholecystectomy",
    clinicalNotes: "Pre-op workup complete. NPO from midnight.",
    statusHistory: [
      { at: "2026-06-10T10:00:00", by: "Dr. Ramesh Gupta", status: "Planned", note: "Scheduled for laparoscopic surgery" },
    ],
  },
  {
    id: "ADM-0005",
    patientId: "PT-0010", patientName: "Kavya Subramaniam",
    ward: "General Ward A", bed: "A6",
    status: "Active", priority: "General",
    admittedAt: "2026-06-10T16:45:00",
    expectedDischarge: "2026-06-15",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Enteric Fever",
    clinicalNotes: "Widal positive. IV ceftriaxone 2g OD. Temp charting q6h.",
    statusHistory: [
      { at: "2026-06-10T16:45:00", by: "Dr. Priya Mehta", status: "Active", note: "Admitted via OPD" },
    ],
  },

  // ── General Ward B (beds B1-B8) ──
  {
    id: "ADM-0006",
    patientId: "PT-0012", patientName: "Mohan Das Verma",
    ward: "General Ward B", bed: "B1",
    status: "Active", priority: "General",
    admittedAt: "2026-06-09T09:00:00",
    expectedDischarge: "2026-06-13",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Community Acquired Pneumonia",
    clinicalNotes: "CXR: right lower lobe consolidation. IV piperacillin-tazobactam.",
    statusHistory: [
      { at: "2026-06-09T09:00:00", by: "Dr. Suresh Nair", status: "Active", note: "Admitted" },
    ],
  },
  {
    id: "ADM-0007",
    patientId: "PT-0014", patientName: "Pooja Ramchandra Singh",
    ward: "General Ward B", bed: "B2",
    status: "Active", priority: "General",
    admittedAt: "2026-06-08T13:20:00",
    expectedDischarge: "2026-06-12",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Urinary Tract Infection with Pyelonephritis",
    clinicalNotes: "Urine culture sent. IV gentamicin. Fluids 3L/day.",
    statusHistory: [
      { at: "2026-06-08T13:20:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Emergency referral" },
    ],
  },
  {
    id: "ADM-0008",
    patientId: "PT-0016", patientName: "Arjun Vikram Nair",
    ward: "General Ward B", bed: "B4",
    status: "Active", priority: "General",
    admittedAt: "2026-06-10T08:30:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Dengue Fever with Thrombocytopenia",
    clinicalNotes: "Platelet count 45,000. Daily CBC. IV fluids. Strict bed rest.",
    statusHistory: [
      { at: "2026-06-10T08:30:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Admitted" },
    ],
  },
  {
    id: "ADM-0009",
    patientId: "PT-0018", patientName: "Geetha Krishnamurthy",
    ward: "General Ward B", bed: "B5",
    status: "Planned", priority: "General",
    admittedAt: "2026-06-13T07:00:00",
    expectedDischarge: "2026-06-17",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Total Knee Replacement — Right",
    clinicalNotes: "Pre-op bloods done. PT/INR normal. Planned spinal anaesthesia.",
    statusHistory: [
      { at: "2026-06-09T09:00:00", by: "Dr. Priya Mehta", status: "Planned", note: "Elective surgery scheduled" },
    ],
  },

  // ── Surgical Ward (beds S1-S8) ──
  {
    id: "ADM-0010",
    patientId: "PT-0020", patientName: "Vijay Shankar Reddy",
    ward: "Surgical Ward", bed: "S1",
    status: "Active", priority: "General",
    admittedAt: "2026-06-06T10:00:00",
    expectedDischarge: "2026-06-11",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Post-op Day 5 — Appendicectomy",
    clinicalNotes: "Wound healthy. Oral feeds tolerated. Planned discharge tomorrow pending final review.",
    statusHistory: [
      { at: "2026-06-06T10:00:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Post-op admission" },
    ],
  },
  {
    id: "ADM-0011",
    patientId: "PT-0022", patientName: "Sarita Bhosale",
    ward: "Surgical Ward", bed: "S2",
    status: "Active", priority: "General",
    admittedAt: "2026-06-09T15:00:00",
    expectedDischarge: "2026-06-15",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Inguinal Hernia — Awaiting Surgery",
    clinicalNotes: "Pre-op fasting. Surgery scheduled for tomorrow 8 AM.",
    statusHistory: [
      { at: "2026-06-09T15:00:00", by: "Dr. Suresh Nair", status: "Active", note: "Admitted pre-op" },
    ],
  },
  {
    id: "ADM-0012",
    patientId: "PT-0024", patientName: "Naresh Tiwari",
    ward: "Surgical Ward", bed: "S4",
    status: "Active", priority: "General",
    admittedAt: "2026-06-10T11:30:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Pilonidal Sinus Excision",
    clinicalNotes: "Day 1 post-op. Wound packing done. IV antibiotics.",
    statusHistory: [
      { at: "2026-06-10T11:30:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Post-op admission" },
    ],
  },
  {
    id: "ADM-0013",
    patientId: "PT-0026", patientName: "Lalitha Chandrasekhar",
    ward: "Surgical Ward", bed: "S6",
    status: "Planned", priority: "General",
    admittedAt: "2026-06-13T06:00:00",
    expectedDischarge: "2026-06-18",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Hysterectomy — Fibroid Uterus",
    clinicalNotes: "Consent obtained. Pre-op crossmatch done. Group B+.",
    statusHistory: [
      { at: "2026-06-11T08:00:00", by: "Dr. Ramesh Gupta", status: "Planned", note: "Elective" },
    ],
  },

  // ── Maternity Ward (beds M1-M6) ──
  {
    id: "ADM-0014",
    patientId: "PT-0015", patientName: "Deepa Venkataraman",
    ward: "Maternity Ward", bed: "M1",
    status: "Active", priority: "General",
    admittedAt: "2026-06-10T22:10:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Active Labour — G2P1, 39 Weeks",
    clinicalNotes: "CTG reassuring. Cervix 6 cm dilated. Progress normal.",
    statusHistory: [
      { at: "2026-06-10T22:10:00", by: "Dr. Priya Mehta", status: "Active", note: "In labour" },
    ],
  },
  {
    id: "ADM-0015",
    patientId: "PT-0019", patientName: "Anitha Rajan",
    ward: "Maternity Ward", bed: "M2",
    status: "Active", priority: "General",
    admittedAt: "2026-06-09T07:00:00",
    expectedDischarge: "2026-06-12",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Post-LSCS Day 2",
    clinicalNotes: "Wound healthy. Breastfeeding initiated. Lochia normal.",
    statusHistory: [
      { at: "2026-06-09T07:00:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Post-op" },
    ],
  },
  {
    id: "ADM-0016",
    patientId: "PT-0023", patientName: "Rekha Pillai",
    ward: "Maternity Ward", bed: "M3",
    status: "Active", priority: "General",
    admittedAt: "2026-06-11T04:30:00",
    expectedDischarge: "2026-06-13",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Pre-eclampsia with Severe Features",
    clinicalNotes: "BP 160/105. MgSO4 loading done. Fetal monitoring continuous.",
    statusHistory: [
      { at: "2026-06-11T04:30:00", by: "Dr. Priya Mehta", status: "Active", note: "Emergency admission" },
    ],
  },
  {
    id: "ADM-0017",
    patientId: "PT-0027", patientName: "Sindhu Krishnan",
    ward: "Maternity Ward", bed: "M5",
    status: "Planned", priority: "General",
    admittedAt: "2026-06-12T06:00:00",
    expectedDischarge: "2026-06-16",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Elective LSCS — Breech Presentation, 38W",
    clinicalNotes: "Consent and blood crossmatch done.",
    statusHistory: [
      { at: "2026-06-10T10:00:00", by: "Dr. Priya Mehta", status: "Planned", note: "Scheduled LSCS" },
    ],
  },

  // ── HDU (beds H1-H4) ──
  {
    id: "ADM-0018",
    patientId: "PT-0004", patientName: "Karthik Balaji Sundaram",
    ward: "HDU", bed: "H1",
    status: "Active", priority: "HDU",
    admittedAt: "2026-06-10T03:20:00",
    expectedDischarge: "2026-06-13",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Acute Coronary Syndrome — NSTEMI",
    clinicalNotes: "Troponin 2.4 (↑↑). Aspirin + clopidogrel loaded. Heparin infusion running. Cardiology review pending.",
    statusHistory: [
      { at: "2026-06-10T03:20:00", by: "Dr. Suresh Nair", status: "Active", note: "Emergency HDU admission" },
    ],
  },
  {
    id: "ADM-0019",
    patientId: "PT-0009", patientName: "Suresh Ramamoorthy",
    ward: "HDU", bed: "H2",
    status: "Active", priority: "HDU",
    admittedAt: "2026-06-09T18:00:00",
    expectedDischarge: "2026-06-12",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Severe Community Acquired Pneumonia — PSI Class IV",
    clinicalNotes: "On non-invasive ventilation BiPAP 12/4. IV meropenem. Daily HFNC trials.",
    statusHistory: [
      { at: "2026-06-09T18:00:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Step-up from ward" },
    ],
  },
  {
    id: "ADM-0020",
    patientId: "PT-0013", patientName: "Bharathi Murugesan",
    ward: "HDU", bed: "H3",
    status: "Active", priority: "HDU",
    admittedAt: "2026-06-11T07:45:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Diabetic Ketoacidosis",
    clinicalNotes: "pH 7.15 on ABG. IV insulin + bicarbonate running. Hourly BG monitoring.",
    statusHistory: [
      { at: "2026-06-11T07:45:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Emergency admission" },
    ],
  },

  // ── ICU (beds I1-I4) ──
  {
    id: "ADM-0021",
    patientId: "PT-0006", patientName: "Ramesh Chandra Patel",
    ward: "ICU", bed: "I1",
    status: "Active", priority: "ICU",
    admittedAt: "2026-06-08T23:00:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Acute Respiratory Failure — Post-aspiration Pneumonia",
    clinicalNotes: "Intubated & mechanically ventilated. AC mode: TV 420, RR 16, PEEP 6. Sedation: Midazolam + Fentanyl.",
    statusHistory: [
      { at: "2026-06-08T23:00:00", by: "Dr. Suresh Nair", status: "Active", note: "Intubated in Emergency, transferred to ICU" },
    ],
  },
  {
    id: "ADM-0022",
    patientId: "PT-0011", patientName: "Pradeep Venkatesh",
    ward: "ICU", bed: "I2",
    status: "Active", priority: "ICU",
    admittedAt: "2026-06-10T14:00:00",
    expectedDischarge: "2026-06-16",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Haemorrhagic Stroke — Basal Ganglia Bleed",
    clinicalNotes: "GCS 9/15. CT: 25mL thalamic haemorrhage. BP target <140 systolic. Neurosurgery on standby.",
    statusHistory: [
      { at: "2026-06-10T14:00:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Transferred from Emergency" },
    ],
  },
  {
    id: "ADM-0023",
    patientId: "PT-0017", patientName: "Padma Raghunathan",
    ward: "ICU", bed: "I3",
    status: "Active", priority: "ICU",
    admittedAt: "2026-06-11T01:30:00",
    expectedDischarge: "2026-06-15",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Septic Shock — Source: Intra-abdominal",
    clinicalNotes: "On noradrenaline 0.15 mcg/kg/min. Blood cultures ×2 sent. CT abdomen: free fluid, likely perforated viscus.",
    statusHistory: [
      { at: "2026-06-11T01:30:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Emergency ICU admission" },
    ],
  },

  // ── Discharged (historical) ──
  {
    id: "ADM-0024",
    patientId: "PT-0002", patientName: "Priya Venkateshwari",
    ward: "General Ward A", bed: "A8",
    status: "Discharged", priority: "General",
    admittedAt: "2026-06-03T10:00:00",
    expectedDischarge: "2026-06-08",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Acute Gastroenteritis",
    clinicalNotes: "Responded well to IV fluids. No fever for 48h.",
    dischargeSummary: "Patient stable. Discharged with ORS, probiotics, and dietary advice. Follow-up in 1 week.",
    statusHistory: [
      { at: "2026-06-03T10:00:00", by: "Dr. Priya Mehta", status: "Active", note: "Admitted" },
      { at: "2026-06-08T11:00:00", by: "Dr. Priya Mehta", status: "Discharged", note: "Clinically stable, discharged" },
    ],
  },
  {
    id: "ADM-0025",
    patientId: "PT-0007", patientName: "Lakshmi Narasimhan",
    ward: "Surgical Ward", bed: "S7",
    status: "Discharged", priority: "General",
    admittedAt: "2026-06-04T08:00:00",
    expectedDischarge: "2026-06-09",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Appendicectomy",
    clinicalNotes: "Laparoscopic appendicectomy done on day 1. Uneventful recovery.",
    dischargeSummary: "Wound healing well. Sutures intact. Discharged with antibiotics for 5 days and wound care instructions.",
    statusHistory: [
      { at: "2026-06-04T08:00:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Emergency admission" },
      { at: "2026-06-09T10:00:00", by: "Dr. Ramesh Gupta", status: "Discharged", note: "Fit for discharge" },
    ],
  },
  {
    id: "ADM-0026",
    patientId: "PT-0021", patientName: "Rohit Sharma",
    ward: "HDU", bed: "H4",
    status: "Discharged", priority: "HDU",
    admittedAt: "2026-06-05T19:00:00",
    expectedDischarge: "2026-06-10",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Acute Heart Failure — EF 35%",
    clinicalNotes: "Diuresis achieved. Echo improved. Step-down to ward on day 3.",
    dischargeSummary: "Patient euvolaemic. Discharged on furosemide, carvedilol, ramipril. Echo follow-up in 6 weeks.",
    statusHistory: [
      { at: "2026-06-05T19:00:00", by: "Dr. Suresh Nair", status: "Active", note: "Admitted" },
      { at: "2026-06-10T09:00:00", by: "Dr. Suresh Nair", status: "Discharged", note: "Compensated, safe for discharge" },
    ],
  },
  {
    id: "ADM-0027",
    patientId: "PT-0025", patientName: "Sudha Narayanan",
    ward: "General Ward B", bed: "B7",
    status: "Discharged", priority: "General",
    admittedAt: "2026-06-06T12:00:00",
    expectedDischarge: "2026-06-10",
    attendingDoctor: "Dr. Priya Mehta",
    admitDiagnosis: "Iron Deficiency Anaemia — Severe",
    clinicalNotes: "Hb 5.2 g/dL on admission. IV iron sucrose 3 doses. Post-transfusion Hb 8.9.",
    dischargeSummary: "Hb improved. Discharged on oral iron + folic acid. GI evaluation advised.",
    statusHistory: [
      { at: "2026-06-06T12:00:00", by: "Dr. Priya Mehta", status: "Active", note: "Admitted" },
      { at: "2026-06-10T14:00:00", by: "Dr. Priya Mehta", status: "Discharged", note: "Stable" },
    ],
  },

  // ── Transferred ──
  {
    id: "ADM-0028",
    patientId: "PT-0029", patientName: "Ganesh Murugan",
    ward: "ICU", bed: "I4",
    status: "Transferred", priority: "ICU",
    admittedAt: "2026-06-09T16:00:00",
    expectedDischarge: "2026-06-15",
    attendingDoctor: "Dr. Ramesh Gupta",
    admitDiagnosis: "Polytrauma — RTA",
    clinicalNotes: "Stabilised. Transferred to higher-centre NIMHANS for neurosurgical intervention.",
    dischargeSummary: "Patient transferred to tertiary care for neurosurgery.",
    statusHistory: [
      { at: "2026-06-09T16:00:00", by: "Dr. Ramesh Gupta", status: "Active", note: "Admitted via Emergency" },
      { at: "2026-06-11T10:30:00", by: "Dr. Ramesh Gupta", status: "Transferred", note: "Transferred to NIMHANS for neurosurgical intervention" },
    ],
  },

  // ── Additional active beds to reach ~25 occupied ──
  {
    id: "ADM-0029",
    patientId: "PT-0028", patientName: "Venkatesh Iyer",
    ward: "General Ward A", bed: "A9",
    status: "Active", priority: "General",
    admittedAt: "2026-06-11T09:00:00",
    expectedDischarge: "2026-06-15",
    attendingDoctor: "Dr. Ananya Krishnan",
    admitDiagnosis: "Chronic Obstructive Pulmonary Disease — Acute Exacerbation",
    clinicalNotes: "FEV1/FVC 0.52. Nebulisation q4h. IV hydrocortisone. Chest physio.",
    statusHistory: [
      { at: "2026-06-11T09:00:00", by: "Dr. Ananya Krishnan", status: "Active", note: "Admitted" },
    ],
  },
  {
    id: "ADM-0030",
    patientId: "PT-0030", patientName: "Madhuri Kulkarni",
    ward: "Surgical Ward", bed: "S8",
    status: "Active", priority: "General",
    admittedAt: "2026-06-11T11:30:00",
    expectedDischarge: "2026-06-14",
    attendingDoctor: "Dr. Suresh Nair",
    admitDiagnosis: "Acute Pancreatitis — Mild",
    clinicalNotes: "Lipase 1240 U/L. NPO + IV fluids. Adequate analgesia. BISAP score 1.",
    statusHistory: [
      { at: "2026-06-11T11:30:00", by: "Dr. Suresh Nair", status: "Active", note: "Admitted" },
    ],
  },
];
