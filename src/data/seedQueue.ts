export type TokenStatus = "waiting" | "serving" | "done" | "skipped";
export type TokenType  = "OPD" | "Emergency" | "Walk-in";

export interface QueueToken {
  id: string;
  tokenNo: number;
  patientName: string;
  uhid: string;
  deptId: string;
  dept: string;
  doctor: string;
  type: TokenType;
  status: TokenStatus;
  arrivedAt: string;  // HH:MM
  calledAt?: string;
}

export interface QueueDept {
  id: string;
  name: string;
  doctor: string;
  avgMinPerPatient: number;
  isOpen: boolean;
}

export const QUEUE_DEPTS: QueueDept[] = [
  { id: "gen",   name: "General Medicine", doctor: "Dr. A. Sharma",   avgMinPerPatient: 12, isOpen: true },
  { id: "card",  name: "Cardiology",       doctor: "Dr. R. Mehta",    avgMinPerPatient: 20, isOpen: true },
  { id: "ortho", name: "Orthopaedics",     doctor: "Dr. P. Verma",    avgMinPerPatient: 15, isOpen: true },
  { id: "peds",  name: "Paediatrics",      doctor: "Dr. S. Nair",     avgMinPerPatient: 10, isOpen: true },
  { id: "gyn",   name: "Gynaecology",      doctor: "Dr. L. Pillai",   avgMinPerPatient: 15, isOpen: false },
];

export const seedTokens: QueueToken[] = [
  // General Medicine
  { id: "t-001", tokenNo: 1,  patientName: "Ravi Teja",         uhid: "UHID-202501-00001", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "done",    arrivedAt: "08:05", calledAt: "08:12" },
  { id: "t-002", tokenNo: 2,  patientName: "Sunita Devi",       uhid: "UHID-202501-00002", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "Follow-up" as TokenType, status: "done",    arrivedAt: "08:15", calledAt: "08:27" },
  { id: "t-003", tokenNo: 3,  patientName: "Arjun Patel",       uhid: "UHID-202501-00003", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "done",    arrivedAt: "08:30", calledAt: "08:45" },
  { id: "t-004", tokenNo: 4,  patientName: "Meena Sharma",      uhid: "UHID-202501-00004", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "done",    arrivedAt: "08:55", calledAt: "09:02" },
  { id: "t-005", tokenNo: 5,  patientName: "Kiran Bhat",        uhid: "UHID-202501-00005", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "serving", arrivedAt: "09:10", calledAt: "09:18" },
  { id: "t-006", tokenNo: 6,  patientName: "Priya Nair",        uhid: "UHID-202501-00006", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "waiting", arrivedAt: "09:15" },
  { id: "t-007", tokenNo: 7,  patientName: "Mohan Lal",         uhid: "UHID-202501-00007", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "Walk-in",   status: "waiting", arrivedAt: "09:20" },
  { id: "t-008", tokenNo: 8,  patientName: "Fatima Sheikh",     uhid: "UHID-202501-00008", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "waiting", arrivedAt: "09:30" },
  { id: "t-009", tokenNo: 9,  patientName: "Rajesh Kumar",      uhid: "UHID-202501-00009", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "Emergency", status: "waiting", arrivedAt: "09:35" },
  { id: "t-010", tokenNo: 10, patientName: "Anita Joshi",       uhid: "UHID-202501-00010", deptId: "gen",   dept: "General Medicine", doctor: "Dr. A. Sharma", type: "OPD",       status: "waiting", arrivedAt: "09:40" },

  // Cardiology
  { id: "t-011", tokenNo: 1,  patientName: "Suresh Iyer",       uhid: "UHID-202501-00013", deptId: "card",  dept: "Cardiology",       doctor: "Dr. R. Mehta",  type: "OPD",       status: "done",    arrivedAt: "08:00", calledAt: "08:08" },
  { id: "t-012", tokenNo: 2,  patientName: "Rekha Singh",       uhid: "UHID-202501-00014", deptId: "card",  dept: "Cardiology",       doctor: "Dr. R. Mehta",  type: "Follow-up" as TokenType, status: "serving", arrivedAt: "08:25", calledAt: "08:40" },
  { id: "t-013", tokenNo: 3,  patientName: "Vikram Pillai",     uhid: "UHID-202501-00016", deptId: "card",  dept: "Cardiology",       doctor: "Dr. R. Mehta",  type: "OPD",       status: "waiting", arrivedAt: "09:00" },
  { id: "t-014", tokenNo: 4,  patientName: "Nalini Rao",        uhid: "UHID-202501-00017", deptId: "card",  dept: "Cardiology",       doctor: "Dr. R. Mehta",  type: "OPD",       status: "waiting", arrivedAt: "09:05" },
  { id: "t-015", tokenNo: 5,  patientName: "Arun Menon",        uhid: "UHID-202501-00018", deptId: "card",  dept: "Cardiology",       doctor: "Dr. R. Mehta",  type: "Emergency", status: "waiting", arrivedAt: "09:10" },

  // Orthopaedics
  { id: "t-016", tokenNo: 1,  patientName: "Geeta Patil",       uhid: "UHID-202501-00019", deptId: "ortho", dept: "Orthopaedics",     doctor: "Dr. P. Verma",  type: "OPD",       status: "serving", arrivedAt: "08:45", calledAt: "09:00" },
  { id: "t-017", tokenNo: 2,  patientName: "Harish Nambiar",    uhid: "UHID-202501-00020", deptId: "ortho", dept: "Orthopaedics",     doctor: "Dr. P. Verma",  type: "OPD",       status: "waiting", arrivedAt: "09:00" },
  { id: "t-018", tokenNo: 3,  patientName: "Lavanya Krishnan",  uhid: "UHID-202501-00021", deptId: "ortho", dept: "Orthopaedics",     doctor: "Dr. P. Verma",  type: "Walk-in",   status: "waiting", arrivedAt: "09:15" },

  // Paediatrics
  { id: "t-019", tokenNo: 1,  patientName: "Shankar Gupta",     uhid: "UHID-202501-00022", deptId: "peds",  dept: "Paediatrics",      doctor: "Dr. S. Nair",   type: "OPD",       status: "done",    arrivedAt: "08:30", calledAt: "08:42" },
  { id: "t-020", tokenNo: 2,  patientName: "Divya Kapoor",      uhid: "UHID-202501-00023", deptId: "peds",  dept: "Paediatrics",      doctor: "Dr. S. Nair",   type: "OPD",       status: "serving", arrivedAt: "08:50", calledAt: "08:58" },
  { id: "t-021", tokenNo: 3,  patientName: "Ramesh Nair Jr.",   uhid: "UHID-202501-00024", deptId: "peds",  dept: "Paediatrics",      doctor: "Dr. S. Nair",   type: "Walk-in",   status: "waiting", arrivedAt: "09:05" },
  { id: "t-022", tokenNo: 4,  patientName: "Smita Desai Baby",  uhid: "UHID-202501-00025", deptId: "peds",  dept: "Paediatrics",      doctor: "Dr. S. Nair",   type: "OPD",       status: "waiting", arrivedAt: "09:10" },
];

export type VisitorStatus = "Inside" | "Checked Out";

export interface Visitor {
  id:          string;
  badgeNo:     string;
  visitorName: string;
  relation:    string;
  patientName: string;
  ward:        string;
  inTime:      string;
  outTime?:    string;
  status:      VisitorStatus;
}

export const seedVisitors: Visitor[] = [
  { id: "v-001", badgeNo: "VB-0001", visitorName: "Ramesh Kumar",  relation: "Son",      patientName: "Sunita Devi",   ward: "General Ward A",  inTime: "09:00", outTime: "10:30", status: "Checked Out" },
  { id: "v-002", badgeNo: "VB-0002", visitorName: "Priya Menon",   relation: "Wife",     patientName: "Arun Menon",    ward: "Cardiology",      inTime: "09:15", outTime: undefined, status: "Inside" },
  { id: "v-003", badgeNo: "VB-0003", visitorName: "Kavya Sharma",  relation: "Daughter", patientName: "Dr. V. Sharma", ward: "Orthopaedics",    inTime: "09:30", outTime: "11:00", status: "Checked Out" },
  { id: "v-004", badgeNo: "VB-0004", visitorName: "Suresh Nair",   relation: "Brother",  patientName: "Rekha Nair",    ward: "ICU",             inTime: "10:00", outTime: undefined, status: "Inside" },
  { id: "v-005", badgeNo: "VB-0005", visitorName: "Meena Pillai",  relation: "Mother",   patientName: "Arjun Pillai",  ward: "General Ward A",  inTime: "10:15", outTime: "11:45", status: "Checked Out" },
  { id: "v-006", badgeNo: "VB-0006", visitorName: "Deepak Verma",  relation: "Father",   patientName: "Baby Verma",    ward: "Paediatrics",     inTime: "10:30", outTime: undefined, status: "Inside" },
  { id: "v-007", badgeNo: "VB-0007", visitorName: "Anita Joshi",   relation: "Spouse",   patientName: "Raj Joshi",     ward: "Orthopaedics",    inTime: "11:00", outTime: "12:30", status: "Checked Out" },
  { id: "v-008", badgeNo: "VB-0008", visitorName: "Kiran Bhat",    relation: "Friend",   patientName: "Priya Bhat",    ward: "General Ward A",  inTime: "11:15", outTime: undefined, status: "Inside" },
];
