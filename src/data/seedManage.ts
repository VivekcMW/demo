export type DeptStatus = "Active" | "Inactive";
export type ShiftType = "Morning" | "Afternoon" | "Night" | "Emergency";

export type Department = {
  id: string;
  name: string;
  head: string;           // doctor name
  headId: string;
  floor: string;
  bedCount: number;
  staffCount: number;
  status: DeptStatus;
  createdAt: string;
  phone?: string;
};

export type StaffShift = {
  id: string;
  staffName: string;
  staffId: string;
  role: string;
  department: string;
  shiftType: ShiftType;
  startTime: string;   // "08:00"
  endTime: string;     // "16:00"
  days: string[];      // ["Mon","Tue","Wed","Thu","Fri"]
  isActive: boolean;
};

export type SystemAnnouncement = {
  id: string;
  title: string;
  body: string;
  priority: "High" | "Medium" | "Low";
  postedBy: string;
  postedAt: string;
};

export const seedDepartments: Department[] = [
  { id: "dept-001", name: "Cardiology",      head: "Dr. Ananya Sharma", headId: "u-doc-001", floor: "3rd Floor",  bedCount: 20, staffCount: 12, status: "Active",   createdAt: "2018-01-10", phone: "080-4455-3001" },
  { id: "dept-002", name: "General Medicine", head: "Dr. Kiran Patel",   headId: "u-doc-002", floor: "2nd Floor",  bedCount: 40, staffCount: 25, status: "Active",   createdAt: "2018-01-10", phone: "080-4455-3002" },
  { id: "dept-003", name: "Orthopaedics",     head: "Dr. Suresh Nair",   headId: "u-doc-003", floor: "4th Floor",  bedCount: 15, staffCount: 8,  status: "Active",   createdAt: "2019-03-20", phone: "080-4455-3003" },
  { id: "dept-004", name: "Paediatrics",      head: "Dr. Priya Menon",   headId: "u-doc-004", floor: "2nd Floor",  bedCount: 20, staffCount: 14, status: "Active",   createdAt: "2019-06-01", phone: "080-4455-3004" },
  { id: "dept-005", name: "Neurology",        head: "Dr. Vikram Singh",  headId: "u-doc-005", floor: "5th Floor",  bedCount: 12, staffCount: 7,  status: "Active",   createdAt: "2020-02-15", phone: "080-4455-3005" },
  { id: "dept-006", name: "Gynaecology",      head: "Dr. Ananya Sharma", headId: "u-doc-001", floor: "3rd Floor",  bedCount: 18, staffCount: 10, status: "Active",   createdAt: "2019-09-01", phone: "080-4455-3006" },
  { id: "dept-007", name: "Emergency",        head: "Dr. Kiran Patel",   headId: "u-doc-002", floor: "Ground Floor", bedCount: 10, staffCount: 30, status: "Active", createdAt: "2018-01-10", phone: "080-4455-3007" },
  { id: "dept-008", name: "Pharmacy",         head: "Arun Kumar",        headId: "u-phm-001", floor: "Ground Floor", bedCount: 0,  staffCount: 5,  status: "Active", createdAt: "2018-01-10", phone: "080-4455-3008" },
  { id: "dept-009", name: "Pathology",        head: "Ravi Shankar",      headId: "u-lab-001", floor: "Basement",   bedCount: 0,  staffCount: 6,  status: "Active",   createdAt: "2018-01-10", phone: "080-4455-3009" },
  { id: "dept-010", name: "Radiology",        head: "Pooja Joshi",       headId: "u-lab-002", floor: "1st Floor",  bedCount: 0,  staffCount: 4,  status: "Inactive", createdAt: "2020-11-01", phone: "080-4455-3010" },
  { id: "dept-011", name: "Administration",   head: "Rahul Verma",       headId: "u-admin-001", floor: "1st Floor", bedCount: 0, staffCount: 8, status: "Active",    createdAt: "2018-01-10", phone: "080-4455-3011" },
  { id: "dept-012", name: "Oncology",         head: "Dr. Vikram Singh",  headId: "u-doc-005", floor: "6th Floor",  bedCount: 14, staffCount: 9,  status: "Active",   createdAt: "2021-07-01", phone: "080-4455-3012" },
];

export const seedShifts: StaffShift[] = [
  { id: "sh-001", staffName: "Dr. Ananya Sharma", staffId: "u-doc-001", role: "Doctor",      department: "Cardiology",      shiftType: "Morning",   startTime: "08:00", endTime: "14:00", days: ["Mon","Tue","Wed","Thu","Fri"], isActive: true  },
  { id: "sh-002", staffName: "Dr. Kiran Patel",   staffId: "u-doc-002", role: "Doctor",      department: "General Medicine", shiftType: "Morning",   startTime: "09:00", endTime: "17:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-003", staffName: "Dr. Suresh Nair",   staffId: "u-doc-003", role: "Doctor",      department: "Orthopaedics",    shiftType: "Morning",   startTime: "08:00", endTime: "16:00", days: ["Mon","Tue","Wed","Thu","Fri"], isActive: true  },
  { id: "sh-004", staffName: "Meena Pillai",       staffId: "u-nrs-001", role: "Nurse",       department: "Cardiology",      shiftType: "Morning",   startTime: "07:00", endTime: "15:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-005", staffName: "Sanjana Reddy",      staffId: "u-nrs-002", role: "Nurse",       department: "General Medicine", shiftType: "Afternoon", startTime: "15:00", endTime: "23:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-006", staffName: "Kavitha Rao",        staffId: "u-nrs-003", role: "Nurse",       department: "ICU",             shiftType: "Night",     startTime: "23:00", endTime: "07:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], isActive: true },
  { id: "sh-007", staffName: "Arun Kumar",         staffId: "u-phm-001", role: "Pharmacist",  department: "Pharmacy",        shiftType: "Morning",   startTime: "08:00", endTime: "16:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-008", staffName: "Ravi Shankar",       staffId: "u-lab-001", role: "Lab Technician", department: "Pathology",   shiftType: "Morning",   startTime: "07:00", endTime: "15:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-009", staffName: "Nalini Das",         staffId: "u-rec-001", role: "Receptionist",department: "Administration",  shiftType: "Morning",   startTime: "08:00", endTime: "17:00", days: ["Mon","Tue","Wed","Thu","Fri","Sat"], isActive: true  },
  { id: "sh-010", staffName: "Dr. Priya Menon",    staffId: "u-doc-004", role: "Doctor",      department: "Paediatrics",     shiftType: "Afternoon", startTime: "13:00", endTime: "21:00", days: ["Mon","Tue","Wed","Thu","Fri"], isActive: true  },
];

export const seedAnnouncements: SystemAnnouncement[] = [
  { id: "ann-001", title: "Scheduled Maintenance — 14 Jun 2026", body: "The EHR system will be unavailable from 02:00–04:00 AM on 14 Jun for database maintenance.", priority: "High", postedBy: "Rahul Verma", postedAt: "2026-06-10T09:00:00" },
  { id: "ann-002", title: "New Pharmacy Dispensing Protocol", body: "Effective from 15 Jun, all controlled substances require dual pharmacist sign-off before dispensing.", priority: "High", postedBy: "Rahul Verma", postedAt: "2026-06-08T11:30:00" },
  { id: "ann-003", title: "Infection Control Refresher — Mandatory", body: "All clinical staff must complete the online infection control module by 20 Jun 2026.", priority: "Medium", postedBy: "Dr. Ananya Sharma", postedAt: "2026-06-05T08:00:00" },
  { id: "ann-004", title: "Welcome: Dr. Priya Menon joins Paediatrics", body: "Please join us in welcoming Dr. Priya Menon who has joined the Paediatrics department.", priority: "Low", postedBy: "Rahul Verma", postedAt: "2026-06-01T10:00:00" },
];
