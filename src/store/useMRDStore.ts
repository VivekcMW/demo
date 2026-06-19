import { create } from "zustand";

export type DocStatus = "Pending" | "Completed" | "Deficient" | "Reviewed";
export type DocType = "Discharge Summary" | "Operative Note" | "Consult Note" | "Progress Note" | "Nursing Note" | "Lab Report" | "Imaging Report" | "Consent Form" | "Death Summary" | "Referral Letter";

export interface MedicalRecordDoc {
  id: string;
  patientId: string;
  patientName: string;
  type: DocType;
  title: string;
  author: string;
  createdAt: string;
  completedAt?: string;
  status: DocStatus;
  deficiency?: string;
  version: number;
}

const seedDocs: MedicalRecordDoc[] = [
  { id: "MR-001", patientId: "PT-0001", patientName: "Anil Kumar Sharma", type: "Discharge Summary", title: "DM Discharge Summary", author: "Dr. Priya Mehta", createdAt: "2026-06-13T10:00:00", completedAt: "2026-06-13T10:30:00", status: "Completed", version: 1 },
  { id: "MR-002", patientId: "PT-0001", patientName: "Anil Kumar Sharma", type: "Progress Note", title: "IPD Day 1 Progress", author: "Dr. Priya Mehta", createdAt: "2026-06-08T16:00:00", status: "Completed", version: 1 },
  { id: "MR-003", patientId: "PT-0001", patientName: "Anil Kumar Sharma", type: "Consult Note", title: "Ophthalmology Consult", author: "Dr. Sharma", createdAt: "2026-06-09T11:00:00", status: "Deficient", deficiency: "Missing signature", version: 1 },
  { id: "MR-004", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", type: "Discharge Summary", title: "HTN Emergency Discharge", author: "Dr. Suresh Nair", createdAt: "2026-06-14T09:00:00", status: "Pending", version: 1 },
  { id: "MR-005", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", type: "Consent Form", title: "IV Labetalol Consent", author: "Dr. Suresh Nair", createdAt: "2026-06-09T15:00:00", status: "Deficient", deficiency: "Witness signature missing", version: 1 },
  { id: "MR-006", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", type: "Discharge Summary", title: "Asthma Exacerbation D/C", author: "Dr. Ananya Krishnan", createdAt: "2026-06-12T11:00:00", status: "Completed", version: 2 },
  { id: "MR-007", patientId: "PT-0010", patientName: "Kavya Subramaniam", type: "Operative Note", title: "Laparoscopic Cholecystectomy", author: "Dr. Ramesh Gupta", createdAt: "2026-06-15T14:00:00", status: "Pending", version: 1 },
  { id: "MR-008", patientId: "PT-0015", patientName: "Deepa Venkataraman", type: "Discharge Summary", title: "Post-LSCS Discharge", author: "Dr. Ananya Krishnan", createdAt: "2026-06-12T10:00:00", status: "Reviewed", version: 2 },
  { id: "MR-009", patientId: "PT-0019", patientName: "Anitha Rajan", type: "Operative Note", title: "Open Appendicectomy", author: "Dr. Suresh Nair", createdAt: "2026-06-11T14:30:00", completedAt: "2026-06-11T15:00:00", status: "Completed", version: 1 },
  { id: "MR-010", patientId: "PT-0030", patientName: "Madhuri Kulkarni", type: "Discharge Summary", title: "Pancreatitis D/C Summary", author: "Dr. Suresh Nair", createdAt: "2026-06-13T16:00:00", status: "Pending", version: 1 },
];

let counter = seedDocs.length + 1;

interface MRDStore {
  docs: MedicalRecordDoc[];
  getByPatient: (patientId: string) => MedicalRecordDoc[];
  getByStatus: (status: DocStatus) => MedicalRecordDoc[];
  updateStatus: (id: string, status: DocStatus, deficiency?: string) => void;
  getDeficient: () => MedicalRecordDoc[];
  getPending: () => MedicalRecordDoc[];
}

export const useMRDStore = create<MRDStore>((set, get) => ({
  docs: seedDocs,
  getByPatient(patientId) { return get().docs.filter((d) => d.patientId === patientId); },
  getByStatus(status) { return get().docs.filter((d) => d.status === status); },
  updateStatus(id, status, deficiency) {
    set((s) => ({ docs: s.docs.map((d) => d.id === id ? { ...d, status, deficiency, completedAt: status === "Completed" ? new Date().toISOString().slice(0, 19) : d.completedAt } : d) }));
  },
  getDeficient() { return get().docs.filter((d) => d.status === "Deficient"); },
  getPending() { return get().docs.filter((d) => d.status === "Pending"); },
}));
