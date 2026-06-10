export type ApptStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "No Show";

export type ApptType = "OPD" | "Tele" | "Follow-up";

export interface Appointment {
  id: string;
  date: string;        // "YYYY-MM-DD"
  time: string;        // "HH:MM"
  patient: string;
  age: number;
  sex: "M" | "F";
  type: ApptType;
  doctor: string;
  dept: string;
  status: ApptStatus;
  reason?: string;     // for cancellations / no-shows
}

// ── Today: 10 Jun 2026 ──────────────────────────────────────────────────────
export const todayAppointments: Appointment[] = [
  { id: "APT-001", date: "2026-06-10", time: "08:00", patient: "Ravi Teja",       age: 42, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-002", date: "2026-06-10", time: "08:20", patient: "Sunita Devi",     age: 58, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-003", date: "2026-06-10", time: "08:40", patient: "Arjun Patel",     age: 31, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-004", date: "2026-06-10", time: "09:00", patient: "Meena Sharma",    age: 65, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-005", date: "2026-06-10", time: "09:20", patient: "Kiran Bhat",      age: 28, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-006", date: "2026-06-10", time: "09:40", patient: "Priya Nair",      age: 34, sex: "F", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-007", date: "2026-06-10", time: "10:00", patient: "Mohan Lal",       age: 72, sex: "M", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-008", date: "2026-06-10", time: "10:20", patient: "Fatima Sheikh",   age: 45, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-009", date: "2026-06-10", time: "10:40", patient: "Rajesh Kumar",    age: 53, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Cancelled", reason: "Patient request" },
  { id: "APT-010", date: "2026-06-10", time: "11:00", patient: "Anita Joshi",     age: 39, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-011", date: "2026-06-10", time: "11:20", patient: "Deepak Verma",    age: 61, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "No Show",  reason: "Unreachable" },
  { id: "APT-012", date: "2026-06-10", time: "11:40", patient: "Kavya Reddy",     age: 27, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-013", date: "2026-06-10", time: "12:00", patient: "Suresh Iyer",     age: 48, sex: "M", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-014", date: "2026-06-10", time: "12:20", patient: "Rekha Singh",     age: 55, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "No Show",  reason: "No response" },
  { id: "APT-015", date: "2026-06-10", time: "13:00", patient: "Lunch Break",     age: 0,  sex: "M", type: "OPD",       doctor: "—",           dept: "—",                status: "Cancelled", reason: "Break" },
  { id: "APT-016", date: "2026-06-10", time: "14:00", patient: "Vikram Pillai",   age: 36, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-017", date: "2026-06-10", time: "14:20", patient: "Nalini Rao",      age: 62, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Completed" },
  { id: "APT-018", date: "2026-06-10", time: "14:40", patient: "Arun Menon",      age: 44, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Cancelled", reason: "Doctor request" },
  { id: "APT-019", date: "2026-06-10", time: "15:00", patient: "Geeta Patil",     age: 50, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "In Progress" },
  { id: "APT-020", date: "2026-06-10", time: "15:20", patient: "Harish Nambiar",  age: 38, sex: "M", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-021", date: "2026-06-10", time: "15:40", patient: "Lavanya Krishnan",age: 29, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-022", date: "2026-06-10", time: "16:00", patient: "Shankar Gupta",   age: 67, sex: "M", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-023", date: "2026-06-10", time: "16:20", patient: "Divya Kapoor",    age: 33, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-024", date: "2026-06-10", time: "16:40", patient: "Ramesh Nair",     age: 56, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-025", date: "2026-06-10", time: "17:00", patient: "Smita Desai",     age: 41, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-026", date: "2026-06-10", time: "17:20", patient: "Nitin Joshi",     age: 24, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-027", date: "2026-06-10", time: "17:40", patient: "Padma Subramaniam",age:70, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-028", date: "2026-06-10", time: "18:00", patient: "Tarun Mehta",     age: 47, sex: "M", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
];

// ── Upcoming: 11–17 Jun 2026 ────────────────────────────────────────────────
export const upcomingWeekAppointments: Appointment[] = [
  { id: "APT-029", date: "2026-06-11", time: "09:00", patient: "Bindu Varma",     age: 45, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-030", date: "2026-06-11", time: "09:20", patient: "Sachin Kulkarni", age: 38, sex: "M", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-031", date: "2026-06-11", time: "10:00", patient: "Leela Pandey",    age: 63, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-032", date: "2026-06-11", time: "14:00", patient: "Prakash Shetty",  age: 52, sex: "M", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-033", date: "2026-06-12", time: "09:00", patient: "Nirmala Hegde",   age: 57, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-034", date: "2026-06-12", time: "10:40", patient: "Satish Reddy",    age: 31, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-035", date: "2026-06-12", time: "15:00", patient: "Usha Bhat",       age: 68, sex: "F", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-036", date: "2026-06-13", time: "09:20", patient: "Girish Rao",      age: 43, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-037", date: "2026-06-13", time: "11:00", patient: "Mala Krishnan",   age: 36, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-038", date: "2026-06-14", time: "09:00", patient: "Ashok Naidu",     age: 59, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-039", date: "2026-06-14", time: "10:20", patient: "Chitra Menon",    age: 48, sex: "F", type: "Tele",      doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-040", date: "2026-06-15", time: "09:40", patient: "Vinod Sharma",    age: 55, sex: "M", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-041", date: "2026-06-16", time: "10:00", patient: "Kamala Devi",     age: 72, sex: "F", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-042", date: "2026-06-16", time: "11:20", patient: "Raj Malhotra",    age: 40, sex: "M", type: "OPD",       doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
  { id: "APT-043", date: "2026-06-17", time: "09:00", patient: "Seetha Laxmi",    age: 33, sex: "F", type: "Follow-up",  doctor: "Dr. Sharma",  dept: "General Medicine", status: "Scheduled" },
];

// ── Cancellation/No-show log (last 10) ──────────────────────────────────────
export const cancellationLog = todayAppointments.filter(
  (a) => (a.status === "Cancelled" || a.status === "No Show") && a.patient !== "Lunch Break"
);
