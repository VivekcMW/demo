// ── PRD 1.6 §3.6 — Insurance & Govt Claims ────────────────────────────────────

export type PreAuthStatus = "Draft" | "Submitted" | "Query" | "Approved" | "Partially Approved" | "Rejected";
export type ClaimStatus = "Draft" | "Submitted" | "Query" | "Approved" | "Partially Approved" | "Rejected" | "Settled";

export interface PreAuthCase {
  id: string;
  patientId: string;
  patientName: string;
  admissionId?: string;
  payerType: string;
  payerName: string;
  policyNumber: string;
  requestedAmount: number;
  approvedAmount?: number;
  documents: PreAuthDocument[];
  status: PreAuthStatus;
  deficiencyNotes?: string;
  submittedAt?: string;
  respondedAt?: string;
  createdAt: string;
  requestedBy: string;
}

export interface PreAuthDocument {
  id: string;
  name: string;
  type: "Medical Records" | "Lab Reports" | "Imaging" | "Prescription" | "ID Proof" | "Policy Copy" | "Other";
  uploadedAt: string;
  uploadedBy: string;
}

export interface ClaimCase {
  id: string;
  billId: string;
  preAuthId?: string;
  patientId: string;
  patientName: string;
  payerType: string;
  payerName: string;
  policyNumber: string;
  lineItems: ClaimLineItem[];
  totalClaimed: number;
  totalApproved?: number;
  status: ClaimStatus;
  deficiencyNotes?: string;
  submittedAt?: string;
  settledAt?: string;
  createdAt: string;
  submittedBy: string;
}

export interface ClaimLineItem {
  serviceCode: string;
  description: string;
  billedAmount: number;
  claimedAmount: number;
  approvedAmount?: number;
  rejectionReason?: string;
}

let preAuthCounter = 1;
let claimCounter = 1;
let docCounter = 1;

export function nextPreAuthId() { return `PA-${String(preAuthCounter++).padStart(4, "0")}`; }
export function nextClaimId() { return `CL-${String(claimCounter++).padStart(4, "0")}`; }
export function nextDocId() { return `DOC-${String(docCounter++).padStart(4, "0")}`; }

export const seedPreAuths: PreAuthCase[] = [
  {
    id: "PA-0001",
    patientId: "PT-0008", patientName: "Sunita Devi Yadav",
    admissionId: "ADM-0004",
    payerType: "Insurance", payerName: "ICICI Lombard",
    policyNumber: "ICICI-HC-2026-0045",
    requestedAmount: 50000,
    approvedAmount: 45000,
    documents: [
      { id: "DOC-0001", name: "Admission Notes", type: "Medical Records", uploadedAt: "2026-06-09T10:00:00", uploadedBy: "Dr. Priya Mehta" },
      { id: "DOC-0002", name: "Lab Reports", type: "Lab Reports", uploadedAt: "2026-06-09T10:30:00", uploadedBy: "Dr. Priya Mehta" },
    ],
    status: "Approved",
    submittedAt: "2026-06-09T09:00:00",
    respondedAt: "2026-06-10T11:00:00",
    createdAt: "2026-06-09T08:30:00",
    requestedBy: "Insurance Desk",
  },
  {
    id: "PA-0002",
    patientId: "PT-0004", patientName: "Karthik Balaji Sundaram",
    admissionId: "ADM-0018",
    payerType: "Insurance", payerName: "Star Health",
    policyNumber: "STAR-HEALTH-2026-1122",
    requestedAmount: 75000,
    documents: [
      { id: "DOC-0003", name: "Emergency Report", type: "Medical Records", uploadedAt: "2026-06-10T05:00:00", uploadedBy: "Dr. Suresh Nair" },
    ],
    status: "Submitted",
    submittedAt: "2026-06-10T04:30:00",
    createdAt: "2026-06-10T04:00:00",
    requestedBy: "Insurance Desk",
  },
];

export const seedClaims: ClaimCase[] = [
  {
    id: "CL-0001",
    billId: "BILL-0004",
    preAuthId: "PA-0001",
    patientId: "PT-0008", patientName: "Sunita Devi Yadav",
    payerType: "Insurance", payerName: "ICICI Lombard",
    policyNumber: "ICICI-HC-2026-0045",
    lineItems: [
      { serviceCode: "PROC-CHOLE", description: "Laparoscopic Cholecystectomy", billedAmount: 35000, claimedAmount: 35000, approvedAmount: 35000 },
      { serviceCode: "PROC-ANES", description: "Anaesthesia Charges", billedAmount: 8000, claimedAmount: 8000, approvedAmount: 7000 },
      { serviceCode: "BED-GEN", description: "Bed Charges (5 days)", billedAmount: 6000, claimedAmount: 6000, approvedAmount: 6000 },
      { serviceCode: "LAB-BP", description: "Post-op Lab Panel", billedAmount: 1200, claimedAmount: 1200, approvedAmount: 1200 },
      { serviceCode: "PHARM-ANTI", description: "IV Antibiotics", billedAmount: 2400, claimedAmount: 2400, approvedAmount: 2400 },
    ],
    totalClaimed: 52600,
    totalApproved: 51600,
    status: "Settled",
    submittedAt: "2026-06-11T09:00:00",
    settledAt: "2026-06-15T14:00:00",
    createdAt: "2026-06-10T12:00:00",
    submittedBy: "Insurance Desk",
  },
];
