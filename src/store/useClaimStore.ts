import { create } from "zustand";
import {
  seedPreAuths, seedClaims,
  nextPreAuthId, nextClaimId, nextDocId,
  type PreAuthCase, type PreAuthStatus,
  type ClaimCase, type ClaimStatus,
  type ClaimLineItem, type PreAuthDocument,
} from "@/data/seedClaims";
import { api } from "@/services/apiClient";

// ── Payloads ───────────────────────────────────────────────────────────────────

interface CreatePreAuthPayload {
  patientId: string;
  patientName: string;
  admissionId?: string;
  payerType: string;
  payerName: string;
  policyNumber: string;
  requestedAmount: number;
  requestedBy: string;
}

interface AddDocumentPayload {
  preAuthId: string;
  name: string;
  type: PreAuthDocument["type"];
  uploadedBy: string;
}

interface SubmitClaimPayload {
  billId: string;
  preAuthId?: string;
  patientId: string;
  patientName: string;
  payerType: string;
  payerName: string;
  policyNumber: string;
  lineItems: ClaimLineItem[];
  submittedBy: string;
}

// ── Store ──────────────────────────────────────────────────────────────────────

interface ClaimState {
  preAuths: PreAuthCase[];
  claims: ClaimCase[];
  loading: boolean;
  initialized: boolean;
  error: string | null;

  createPreAuth: (payload: CreatePreAuthPayload) => PreAuthCase;
  submitPreAuth: (id: string) => void;
  respondToPreAuth: (id: string, status: PreAuthStatus, approvedAmount?: number, notes?: string) => void;
  addDocument: (payload: AddDocumentPayload) => void;

  createClaim: (payload: SubmitClaimPayload) => ClaimCase;
  updateClaimStatus: (id: string, status: ClaimStatus, approvedAmount?: number, notes?: string) => void;
  settleClaim: (id: string) => void;

  getPreAuth: (id: string) => PreAuthCase | undefined;
  getPreAuthsByPatient: (patientId: string) => PreAuthCase[];
  getClaim: (id: string) => ClaimCase | undefined;
  getClaimsByPatient: (patientId: string) => ClaimCase[];
  getClaimsByBill: (billId: string) => ClaimCase[];
  refresh: () => Promise<void>;
}

export const useClaimStore = create<ClaimState>((set, get) => ({
  preAuths: seedPreAuths,
  claims: seedClaims,
  loading: false,
  initialized: false,
  error: null,

  createPreAuth(payload) {
    const pa: PreAuthCase = {
      id: nextPreAuthId(),
      patientId: payload.patientId,
      patientName: payload.patientName,
      admissionId: payload.admissionId,
      payerType: payload.payerType,
      payerName: payload.payerName,
      policyNumber: payload.policyNumber,
      requestedAmount: payload.requestedAmount,
      documents: [],
      status: "Draft",
      createdAt: new Date().toISOString().slice(0, 19),
      requestedBy: payload.requestedBy,
    };
    set((s) => ({ preAuths: [pa, ...s.preAuths] }));
    return pa;
  },

  submitPreAuth(id) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      preAuths: s.preAuths.map((p) =>
        p.id !== id ? p : { ...p, status: "Submitted" as PreAuthStatus, submittedAt: now }
      ),
    }));
  },

  respondToPreAuth(id, status, approvedAmount, notes) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      preAuths: s.preAuths.map((p) =>
        p.id !== id ? p : { ...p, status, approvedAmount, deficiencyNotes: notes, respondedAt: now }
      ),
    }));
  },

  addDocument({ preAuthId, name, type, uploadedBy }) {
    const doc: PreAuthDocument = {
      id: nextDocId(),
      name, type,
      uploadedAt: new Date().toISOString().slice(0, 19),
      uploadedBy,
    };
    set((s) => ({
      preAuths: s.preAuths.map((p) =>
        p.id !== preAuthId ? p : { ...p, documents: [...p.documents, doc] }
      ),
    }));
  },

  createClaim(payload) {
    const totalClaimed = payload.lineItems.reduce((s, i) => s + i.claimedAmount, 0);
    const claim: ClaimCase = {
      id: nextClaimId(),
      billId: payload.billId,
      preAuthId: payload.preAuthId,
      patientId: payload.patientId,
      patientName: payload.patientName,
      payerType: payload.payerType,
      payerName: payload.payerName,
      policyNumber: payload.policyNumber,
      lineItems: payload.lineItems,
      totalClaimed,
      status: "Draft",
      createdAt: new Date().toISOString().slice(0, 19),
      submittedBy: payload.submittedBy,
    };
    set((s) => ({ claims: [claim, ...s.claims] }));
    return claim;
  },

  updateClaimStatus(id, status, approvedAmount, notes) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      claims: s.claims.map((c) => {
        if (c.id !== id) return c;
        const updated = {
          ...c,
          status,
          totalApproved: approvedAmount ?? c.totalApproved,
          deficiencyNotes: notes ?? c.deficiencyNotes,
          submittedAt: status === "Submitted" ? now : c.submittedAt,
        };
        if (status === "Settled") updated.settledAt = now;
        return updated;
      }),
    }));
  },

  settleClaim(id) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      claims: s.claims.map((c) =>
        c.id !== id ? c : { ...c, status: "Settled" as ClaimStatus, settledAt: now }
      ),
    }));
  },

  getPreAuth(id) { return get().preAuths.find((p) => p.id === id); },
  getPreAuthsByPatient(patientId) { return get().preAuths.filter((p) => p.patientId === patientId); },
  getClaim(id) { return get().claims.find((c) => c.id === id); },
  getClaimsByPatient(patientId) { return get().claims.filter((c) => c.patientId === patientId); },
  getClaimsByBill(billId) { return get().claims.filter((c) => c.billId === billId); },

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<{ data: Record<string, unknown>[] }>("/billing");
      if (res?.data?.length) {
        const claims: ClaimCase[] = [];
        const preAuths: PreAuthCase[] = [];
        for (const bill of res.data) {
          const billData = bill as Record<string, unknown>;
          if (billData.claims) {
            claims.push(...(billData.claims as ClaimCase[]));
          }
          if (billData.preAuths) {
            preAuths.push(...(billData.preAuths as PreAuthCase[]));
          }
        }
        set({ claims, preAuths: preAuths.length ? preAuths : get().preAuths, loading: false, initialized: true });
        return;
      }
    } catch {
      // fall back to seed data
    }
    set({ loading: false, initialized: true });
  },
}));

export type { PreAuthCase, PreAuthStatus, ClaimCase, ClaimStatus, ClaimLineItem, PreAuthDocument };
