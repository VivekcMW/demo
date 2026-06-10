// ─── OPD Trend — last 30 days ────────────────────────────────────────────────
export const opdTrend = [
  { date: "12 May", total: 68, new: 28, followUp: 40 },
  { date: "13 May", total: 74, new: 32, followUp: 42 },
  { date: "14 May", total: 52, new: 20, followUp: 32 },
  { date: "15 May", total: 48, new: 18, followUp: 30 },
  { date: "16 May", total: 82, new: 35, followUp: 47 },
  { date: "17 May", total: 91, new: 40, followUp: 51 },
  { date: "18 May", total: 88, new: 38, followUp: 50 },
  { date: "19 May", total: 76, new: 30, followUp: 46 },
  { date: "20 May", total: 70, new: 27, followUp: 43 },
  { date: "21 May", total: 55, new: 22, followUp: 33 },
  { date: "22 May", total: 50, new: 19, followUp: 31 },
  { date: "23 May", total: 84, new: 36, followUp: 48 },
  { date: "24 May", total: 94, new: 42, followUp: 52 },
  { date: "25 May", total: 90, new: 39, followUp: 51 },
  { date: "26 May", total: 78, new: 31, followUp: 47 },
  { date: "27 May", total: 72, new: 29, followUp: 43 },
  { date: "28 May", total: 58, new: 24, followUp: 34 },
  { date: "29 May", total: 54, new: 21, followUp: 33 },
  { date: "30 May", total: 86, new: 37, followUp: 49 },
  { date: "31 May", total: 96, new: 44, followUp: 52 },
  { date: "01 Jun", total: 92, new: 41, followUp: 51 },
  { date: "02 Jun", total: 80, new: 33, followUp: 47 },
  { date: "03 Jun", total: 75, new: 30, followUp: 45 },
  { date: "04 Jun", total: 60, new: 25, followUp: 35 },
  { date: "05 Jun", total: 56, new: 22, followUp: 34 },
  { date: "06 Jun", total: 88, new: 38, followUp: 50 },
  { date: "07 Jun", total: 98, new: 45, followUp: 53 },
  { date: "08 Jun", total: 93, new: 42, followUp: 51 },
  { date: "09 Jun", total: 85, new: 36, followUp: 49 },
  { date: "10 Jun", total: 84, new: 35, followUp: 49 },
];

// ─── New vs Follow-up donut ───────────────────────────────────────────────────
export const caseTypeSplit = [
  { name: "New Patients", value: 35, color: "#0d9488" },
  { name: "Follow-up", value: 49, color: "#94a3b8" },
];

// ─── Top 10 Diagnoses this month ─────────────────────────────────────────────
export const topDiagnoses = [
  { name: "Fever / Viral Fever", count: 142, code: "R50.9" },
  { name: "Hypertension", count: 118, code: "I10" },
  { name: "Type 2 Diabetes", count: 104, code: "E11" },
  { name: "URTI / Common Cold", count: 98, code: "J06.9" },
  { name: "Acute Gastritis", count: 76, code: "K29.7" },
  { name: "Migraine", count: 62, code: "G43.9" },
  { name: "Asthma", count: 54, code: "J45.9" },
  { name: "Anaemia", count: 48, code: "D64.9" },
  { name: "Low Back Pain", count: 43, code: "M54.5" },
  { name: "Anxiety Disorder", count: 37, code: "F41.9" },
];

// ─── Patient Age Distribution ─────────────────────────────────────────────────
export const ageDistribution = [
  { band: "0–10", count: 42 },
  { band: "11–20", count: 58 },
  { band: "21–30", count: 124 },
  { band: "31–40", count: 148 },
  { band: "41–50", count: 136 },
  { band: "51–60", count: 112 },
  { band: "61–70", count: 84 },
  { band: "71+", count: 56 },
];

// ─── Today's OPD Queue ────────────────────────────────────────────────────────
export type QueueStatus = "Waiting" | "In Progress" | "Completed" | "No Show";

export const opdQueue = [
  { token: "T-001", name: "Ramesh Iyer", age: 54, sex: "M", wait: "42 min", status: "Completed" as QueueStatus },
  { token: "T-002", name: "Priya Nair", age: 32, sex: "F", wait: "38 min", status: "Completed" as QueueStatus },
  { token: "T-003", name: "Arjun Mehta", age: 67, sex: "M", wait: "29 min", status: "Completed" as QueueStatus },
  { token: "T-004", name: "Sunita Desai", age: 45, sex: "F", wait: "18 min", status: "In Progress" as QueueStatus },
  { token: "T-005", name: "Vikram Singh", age: 38, sex: "M", wait: "14 min", status: "Waiting" as QueueStatus },
  { token: "T-006", name: "Kavitha Reddy", age: 29, sex: "F", wait: "9 min", status: "Waiting" as QueueStatus },
  { token: "T-007", name: "Mohan Rao", age: 72, sex: "M", wait: "6 min", status: "Waiting" as QueueStatus },
  { token: "T-008", name: "Ananya Sharma", age: 24, sex: "F", wait: "2 min", status: "Waiting" as QueueStatus },
  { token: "T-009", name: "Deepak Joshi", age: 55, sex: "M", wait: "—", status: "No Show" as QueueStatus },
  { token: "T-010", name: "Leela Thomas", age: 61, sex: "F", wait: "—", status: "Waiting" as QueueStatus },
];

// ─── Pending Lab Results ───────────────────────────────────────────────────────
export type LabFlag = "HH" | "H" | "N" | "L" | "LL" | "Pending";

export const pendingLabResults = [
  { patient: "Ramesh Iyer", uhid: "AEH-10291", test: "HbA1c", ordered: "09 Jun 09:14", flag: "HH" as LabFlag, value: "11.2%", ref: "< 5.7%" },
  { patient: "Sunita Desai", uhid: "AEH-10185", test: "Serum Potassium", ordered: "10 Jun 07:50", flag: "LL" as LabFlag, value: "2.8 mEq/L", ref: "3.5–5.0" },
  { patient: "Arjun Mehta", uhid: "AEH-10044", test: "CBC — Haemoglobin", ordered: "10 Jun 08:30", flag: "L" as LabFlag, value: "9.4 g/dL", ref: "13–17" },
  { patient: "Priya Nair", uhid: "AEH-10312", test: "TSH", ordered: "10 Jun 10:05", flag: "H" as LabFlag, value: "6.8 µIU/mL", ref: "0.4–4.0" },
  { patient: "Vikram Singh", uhid: "AEH-10098", test: "Lipid Profile — LDL", ordered: "10 Jun 11:20", flag: "Pending" as LabFlag, value: "—", ref: "< 100 mg/dL" },
];

// ─── Upcoming Appointments ─────────────────────────────────────────────────────
export type ApptType = "OPD" | "Tele" | "Follow-up";

export const upcomingAppointments = [
  { time: "14:00", patient: "Kavitha Reddy", age: 29, sex: "F", type: "OPD" as ApptType },
  { time: "14:15", patient: "Mohan Rao", age: 72, sex: "M", type: "Follow-up" as ApptType },
  { time: "14:30", patient: "Ananya Sharma", age: 24, sex: "F", type: "Tele" as ApptType },
  { time: "15:00", patient: "Deepak Joshi", age: 55, sex: "M", type: "OPD" as ApptType },
  { time: "15:30", patient: "Leela Thomas", age: 61, sex: "F", type: "Follow-up" as ApptType },
];

// ─── Chronic Care Alerts ───────────────────────────────────────────────────────
export const chronicAlerts = [
  { patient: "Ramesh Iyer", uhid: "AEH-10291", condition: "Type 2 Diabetes", alert: "HbA1c overdue by 45 days", severity: "critical" as const },
  { patient: "Arjun Mehta", uhid: "AEH-10044", condition: "Hypertension", alert: "BP uncontrolled — 3 visits", severity: "warning" as const },
  { patient: "Leela Thomas", uhid: "AEH-10406", condition: "Hypothyroidism", alert: "TSH not checked in 6 months", severity: "warning" as const },
  { patient: "Mohan Rao", uhid: "AEH-10312", condition: "COPD", alert: "Follow-up missed — 2 months", severity: "info" as const },
];
