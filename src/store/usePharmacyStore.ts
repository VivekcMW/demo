import { create } from "zustand";
import { api } from "@/services/apiClient";
import {
  seedPrescriptions,
  DRUG_CATALOGUE,
  type PrescriptionRx,
  type RxStatus,
  type RxItem,
} from "@/data/seedPharmacy";

// ── Payloads ──────────────────────────────────────────────────────────────────

export interface CreateRxPayload {
  patientId:     string;
  patientName:   string;
  examId?:       string;
  admissionId?:  string;
  source:        PrescriptionRx["source"];
  prescribedBy:  string;
  dept:          string;
  items:         Omit<RxItem, "qtyDispensed">[];
  notes?:        string;
  patientAge?:   number;
  patientSex?:   "M" | "F";
  allergies?:    string[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let counter = seedPrescriptions.length + 1;
function nextId() { return `RX-${String(counter++).padStart(4, "0")}`; }

function deriveStatus(items: RxItem[]): RxStatus {
  const total     = items.length;
  const dispensed = items.filter((i) => i.qtyDispensed >= i.qty).length;
  if (dispensed === total)   return "Dispensed";
  if (dispensed > 0)         return "Partially Dispensed";
  return "Dispensing";
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface PharmacyState {
  prescriptions: PrescriptionRx[];
  catalogue:     typeof DRUG_CATALOGUE;
  loading:       boolean;
  initialized:   boolean;
  error:         string | null;

  // Lifecycle
  refresh: () => Promise<void>;

  // Worklist actions
  createPrescription:  (payload: CreateRxPayload) => PrescriptionRx;
  verifyRx:            (id: string, by: string) => void;
  dispenseItem:        (rxId: string, itemId: string, qtyDispensed: number, by: string) => void;
  dispenseAll:         (id: string, by: string) => void;
  holdRx:              (id: string, note: string) => void;
  cancelRx:            (id: string, note: string) => void;
  resumeRx:            (id: string) => void;   // On Hold → Pending

  // Queries
  getById:      (id: string) => PrescriptionRx | undefined;
  getByPatient: (patientId: string) => PrescriptionRx[];
  getActive:    () => PrescriptionRx[];        // Pending | Verified | Dispensing | Partially Dispensed | On Hold
}

const now = () => new Date().toISOString().slice(0, 19);

export const usePharmacyStore = create<PharmacyState>((set, get) => ({
  prescriptions: seedPrescriptions,
  catalogue:     DRUG_CATALOGUE,
  loading:       false,
  initialized:   false,
  error:         null,

  async refresh() {
    set({ loading: true, error: null });
    try {
      const data: any[] = await api.get("/orders");
      const prescriptions: PrescriptionRx[] = data.map((item) => ({
        ...item,
        items: item.rx_items ?? [],
        totalAmount: parseFloat(
          ((item.rx_items ?? []).reduce((s: number, i: any) => s + i.qty * i.unitPrice, 0) as number).toFixed(2),
        ),
      }));
      set({ prescriptions, loading: false, initialized: true });
    } catch (e) {
      set({
        prescriptions: seedPrescriptions,
        loading: false,
        initialized: true,
        error: e instanceof Error ? e.message : "Failed to load orders",
      });
    }
  },

  createPrescription(payload) {
    const rx: PrescriptionRx = {
      id:           nextId(),
      patientId:    payload.patientId,
      patientName:  payload.patientName,
      examId:       payload.examId,
      admissionId:  payload.admissionId,
      source:       payload.source,
      status:       "Pending",
      receivedAt:   now(),
      prescribedBy: payload.prescribedBy,
      dept:         payload.dept,
      items:        payload.items.map((i) => ({ ...i, qtyDispensed: 0 })),
      notes:        payload.notes,
      patientAge:   payload.patientAge,
      patientSex:   payload.patientSex,
      allergies:    payload.allergies,
      totalAmount:  parseFloat(payload.items.reduce((s, i) => s + i.qty * i.unitPrice, 0).toFixed(2)),
    };
    set((s) => ({ prescriptions: [rx, ...s.prescriptions] }));
    return rx;
  },

  verifyRx(id, by) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) =>
        rx.id !== id || rx.status !== "Pending" ? rx : {
          ...rx, status: "Verified" as RxStatus, verifiedAt: now(), verifiedBy: by,
        }
      ),
    }));
  },

  dispenseItem(rxId, itemId, qtyDispensed, by) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) => {
        if (rx.id !== rxId) return rx;
        const updatedItems = rx.items.map((i) =>
          i.id !== itemId ? i : { ...i, qtyDispensed: Math.min(i.qty, qtyDispensed) }
        );
        const newStatus = deriveStatus(updatedItems);
        const dispensedAt = newStatus === "Dispensed" ? now() : rx.dispensedAt;
        return {
          ...rx,
          items: updatedItems,
          status: newStatus,
          dispensedAt,
          dispensedBy: by,
          totalAmount: parseFloat(updatedItems.reduce((sum, i) => sum + i.qty * i.unitPrice, 0).toFixed(2)),
        };
      }),
    }));
  },

  dispenseAll(id, by) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) => {
        if (rx.id !== id) return rx;
        const updatedItems = rx.items.map((i) => ({ ...i, qtyDispensed: i.qty }));
        return {
          ...rx,
          items: updatedItems,
          status: "Dispensed" as RxStatus,
          dispensedAt: now(),
          dispensedBy: by,
        };
      }),
    }));
  },

  holdRx(id, note) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) =>
        rx.id !== id ? rx : {
          ...rx,
          status: "On Hold" as RxStatus,
          notes: note,
        }
      ),
    }));
  },

  cancelRx(id, note) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) =>
        rx.id !== id ? rx : {
          ...rx,
          status: "Cancelled" as RxStatus,
          notes: note,
        }
      ),
    }));
  },

  resumeRx(id) {
    set((s) => ({
      prescriptions: s.prescriptions.map((rx) =>
        rx.id !== id || rx.status !== "On Hold" ? rx : {
          ...rx, status: "Pending" as RxStatus,
        }
      ),
    }));
  },

  getById(id)           { return get().prescriptions.find((r) => r.id === id); },
  getByPatient(pid)     { return get().prescriptions.filter((r) => r.patientId === pid); },
  getActive()           {
    const active: RxStatus[] = ["Pending", "Verified", "Dispensing", "Partially Dispensed", "On Hold"];
    return get().prescriptions.filter((r) => active.includes(r.status));
  },
}));

export type { PrescriptionRx, RxStatus, RxItem };
