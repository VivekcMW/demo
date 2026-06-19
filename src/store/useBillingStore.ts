import { create } from "zustand";
import {
  seedBills,
  type Bill,
  type BillStatus,
  type BillCategory,
  type LineItem,
  type Payment,
  type PaymentMethod,
} from "@/data/seedBills";
import { api } from "@/services/apiClient";

// ── Enhanced Types ─────────────────────────────────────────────────────────────

export interface DiscountApproval {
  id: string;
  billId: string;
  amount: number;
  reason: string;
  requestedBy: string;
  approvedBy?: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedAt: string;
  respondedAt?: string;
}

export interface RefundEvent {
  id: string;
  billId: string;
  amount: number;
  reason: string;
  method: PaymentMethod;
  ref?: string;
  processedBy: string;
  processedAt: string;
  originalPaymentIds: string[];
}

export interface ChargeEvent {
  id: string;
  billId: string;
  sourceModule: "Examination" | "Pharmacy" | "Diagnostics" | "IPD" | "Procedure" | "Manual";
  sourceId: string;
  item: Omit<LineItem, "id" | "total">;
  createdBy: string;
  createdAt: string;
}

export interface InterimBillCycle {
  id: string;
  admissionId: string;
  cycleNumber: number;
  fromDate: string;
  toDate: string;
  billId: string;
  createdAt: string;
}

// ── Payload types ─────────────────────────────────────────────────────────────

export interface CreateBillPayload {
  patientId:      string;
  patientName:    string;
  admissionId?:   string;
  category:       BillCategory;
  items:          Omit<LineItem, "id" | "total">[];
  dueDate:        string;
  notes?:         string;
  createdBy:      string;
  packageId?:     string;
  insuranceClaim?: string;
}

export interface RecordPaymentPayload {
  billId:  string;
  amount:  number;
  method:  PaymentMethod;
  ref?:    string;
  by:      string;
}

export interface RequestDiscountPayload {
  billId:     string;
  amount:     number;
  reason:     string;
  requestedBy: string;
}

export interface ApproveDiscountPayload {
  discountId: string;
  approved:   boolean;
  approvedBy: string;
}

export interface ProcessRefundPayload {
  billId:             string;
  amount:             number;
  reason:             string;
  method:             PaymentMethod;
  ref?:               string;
  originalPaymentIds: string[];
  processedBy:        string;
}

export interface ApplyPackagePayload {
  billId:     string;
  packageId:  string;
  price:      number;
  appliedBy:  string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let billCounter = seedBills.length + 1;
let lineCounter = 9000;
let payCounter  = 9000;
let discCounter = 1;
let refCounter  = 1;
let chargeCounter = 1;
let interimCounter = 1;

function nextBillId()    { return `BILL-${String(billCounter++).padStart(4, "0")}`; }
function nextLineId()    { return `li-${String(lineCounter++)}`; }
function nextPayId()     { return `py-${String(payCounter++)}`; }
function nextDiscId()    { return `DISC-${String(discCounter++).padStart(4, "0")}`; }
function nextRefundId()  { return `RF-${String(refCounter++).padStart(4, "0")}`; }
function nextChargeId()  { return `CE-${String(chargeCounter++).padStart(4, "0")}`; }
function nextInterimId() { return `IC-${String(interimCounter++).padStart(4, "0")}`; }

function recalcTotals(items: LineItem[], taxRate = 0.05) {
  const subtotal      = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const discountTotal = items.reduce((s, i) => s + (i.discount ?? 0), 0);
  const taxable       = items
    .filter((i) => i.category === "Imaging" || i.category === "Procedure")
    .reduce((s, i) => s + i.total, 0);
  const tax           = Math.round(taxable * taxRate);
  const grandTotal    = subtotal - discountTotal + tax;
  return { subtotal, discountTotal, tax, grandTotal };
}

function deriveStatus(amountPaid: number, grandTotal: number, dueDate: string, cancelled: boolean, waived: boolean): BillStatus {
  if (cancelled) return "Cancelled";
  if (waived)    return "Waived";
  if (amountPaid <= 0) {
    return new Date(dueDate) < new Date() ? "Overdue" : "Pending";
  }
  if (amountPaid >= grandTotal) return "Paid";
  return "Partially Paid";
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface BillingState {
  bills: Bill[];
  discountApprovals: DiscountApproval[];
  refunds: RefundEvent[];
  chargeEvents: ChargeEvent[];
  interimCycles: InterimBillCycle[];
  loading: boolean;
  initialized: boolean;
  error: string | null;

  createBill:       (payload: CreateBillPayload) => Bill;
  recordPayment:    (payload: RecordPaymentPayload) => void;
  cancelBill:       (id: string, by: string) => void;
  waiveBill:        (id: string, by: string, note?: string) => void;
  addLineItem:      (billId: string, item: Omit<LineItem, "id" | "total">) => void;
  removeLineItem:   (billId: string, lineId: string) => void;

  // Charge capture
  addChargeEvent:   (billId: string, sourceModule: ChargeEvent["sourceModule"], sourceId: string, item: Omit<LineItem, "id" | "total">, createdBy: string) => void;
  getChargeEvents:  (billId: string) => ChargeEvent[];
  getChargeEventsBySource: (sourceModule: string, sourceId: string) => ChargeEvent[];

  // Discount approval workflow
  requestDiscount:  (payload: RequestDiscountPayload) => DiscountApproval;
  respondDiscount:  (payload: ApproveDiscountPayload) => void;
  getPendingDiscounts: () => DiscountApproval[];

  // Refund workflow
  processRefund:    (payload: ProcessRefundPayload) => RefundEvent;
  getRefunds:       (billId: string) => RefundEvent[];

  // Package billing
  applyPackage:     (payload: ApplyPackagePayload) => void;

  // IPD interim billing
  createInterimBill: (admissionId: string, billId: string, cycleNumber: number, fromDate: string, toDate: string) => InterimBillCycle;
  getInterimCycles:  (admissionId: string) => InterimBillCycle[];

  getById:          (id: string) => Bill | undefined;
  getByPatient:     (patientId: string) => Bill[];
  refresh:          () => Promise<void>;
}

export const useBillingStore = create<BillingState>((set, get) => ({
  bills: seedBills,
  discountApprovals: [],
  refunds: [],
  chargeEvents: [],
  interimCycles: [],
  loading: false,
  initialized: false,
  error: null,

  createBill(payload) {
    const items: LineItem[] = payload.items.map((it) => ({
      ...it,
      id:    nextLineId(),
      total: it.qty * it.unitPrice - (it.discount ?? 0),
    }));
    const totals     = recalcTotals(items);
    const amountPaid = 0;
    const bill: Bill = {
      id:            nextBillId(),
      patientId:     payload.patientId,
      patientName:   payload.patientName,
      admissionId:   payload.admissionId,
      category:      payload.category,
      status:        "Draft",
      createdAt:     new Date().toISOString().slice(0, 19),
      dueDate:       payload.dueDate,
      items,
      ...totals,
      amountPaid,
      amountDue: totals.grandTotal,
      payments:  [],
      notes:     payload.notes,
      createdBy: payload.createdBy,
      insuranceClaim: payload.insuranceClaim,
    };
    set((s) => ({ bills: [bill, ...s.bills] }));
    return bill;
  },

  recordPayment({ billId, amount, method, ref, by }) {
    const now = new Date().toISOString().slice(0, 19);
    const payment: Payment = { id: nextPayId(), paidAt: now, amount, method, ref, by };
    set((s) => ({
      bills: s.bills.map((b) => {
        if (b.id !== billId) return b;
        const payments   = [...b.payments, payment];
        const amountPaid = payments.reduce((sum, p) => sum + p.amount, 0);
        const amountDue  = Math.max(0, b.grandTotal - amountPaid);
        const status     = deriveStatus(amountPaid, b.grandTotal, b.dueDate, false, false);
        return { ...b, payments, amountPaid, amountDue, status };
      }),
    }));
  },

  cancelBill(id, by) {
    set((s) => ({
      bills: s.bills.map((b) =>
        b.id !== id ? b : { ...b, status: "Cancelled" as BillStatus, notes: (b.notes ? b.notes + " | " : "") + `Cancelled by ${by}` }
      ),
    }));
  },

  waiveBill(id, by, note) {
    set((s) => ({
      bills: s.bills.map((b) =>
        b.id !== id ? b : {
          ...b,
          status: "Waived" as BillStatus,
          amountDue: 0,
          notes: (b.notes ? b.notes + " | " : "") + (note ?? `Waived by ${by}`),
        }
      ),
    }));
  },

  addLineItem(billId, item) {
    set((s) => ({
      bills: s.bills.map((b) => {
        if (b.id !== billId) return b;
        const newItem: LineItem = { ...item, id: nextLineId(), total: item.qty * item.unitPrice - (item.discount ?? 0) };
        const items   = [...b.items, newItem];
        const totals  = recalcTotals(items);
        const amountDue = Math.max(0, totals.grandTotal - b.amountPaid);
        const status  = deriveStatus(b.amountPaid, totals.grandTotal, b.dueDate, false, false);
        return { ...b, items, ...totals, amountDue, status };
      }),
    }));
  },

  removeLineItem(billId, lineId) {
    set((s) => ({
      bills: s.bills.map((b) => {
        if (b.id !== billId) return b;
        const items   = b.items.filter((i) => i.id !== lineId);
        const totals  = recalcTotals(items);
        const amountDue = Math.max(0, totals.grandTotal - b.amountPaid);
        const status  = deriveStatus(b.amountPaid, totals.grandTotal, b.dueDate, false, false);
        return { ...b, items, ...totals, amountDue, status };
      }),
    }));
  },

  // ── Charge capture ────────────────────────────────────────────────────────────

  addChargeEvent(billId, sourceModule, sourceId, item, createdBy) {
    const event: ChargeEvent = {
      id: nextChargeId(),
      billId, sourceModule, sourceId,
      item,
      createdBy,
      createdAt: new Date().toISOString().slice(0, 19),
    };
    set((s) => ({
      chargeEvents: [...s.chargeEvents, event],
    }));
    this.addLineItem(billId, item);
  },

  getChargeEvents(billId) {
    return get().chargeEvents.filter((e) => e.billId === billId);
  },

  getChargeEventsBySource(sourceModule, sourceId) {
    return get().chargeEvents.filter((e) => e.sourceModule === sourceModule && e.sourceId === sourceId);
  },

  // ── Discount approval ─────────────────────────────────────────────────────────

  requestDiscount({ billId, amount, reason, requestedBy }) {
    const discount: DiscountApproval = {
      id: nextDiscId(),
      billId, amount, reason,
      requestedBy,
      status: "Pending",
      requestedAt: new Date().toISOString().slice(0, 19),
    };
    set((s) => ({ discountApprovals: [...s.discountApprovals, discount] }));
    return discount;
  },

  respondDiscount({ discountId, approved, approvedBy }) {
    const now = new Date().toISOString().slice(0, 19);
    set((s) => ({
      discountApprovals: s.discountApprovals.map((d) => {
        if (d.id !== discountId) return d;
        return { ...d, status: approved ? ("Approved" as const) : ("Rejected" as const), approvedBy, respondedAt: now };
      }),
      // If approved, apply the discount to the bill
      bills: s.bills.map((b) => {
        const disc = s.discountApprovals.find((d) => d.id === discountId);
        if (!disc || !approved || b.id !== disc.billId) return b;
        // Apply discount to the last line item or as a new line
        const discountItem: LineItem = {
          id: nextLineId(),
          description: `Discount — ${disc.reason}`,
          category: "OPD",
          qty: 1,
          unitPrice: -disc.amount,
          discount: 0,
          total: -disc.amount,
        };
        const items = [...b.items, discountItem];
        const totals = recalcTotals(items);
        const amountDue = Math.max(0, totals.grandTotal - b.amountPaid);
        const status = deriveStatus(b.amountPaid, totals.grandTotal, b.dueDate, false, false);
        return { ...b, items, ...totals, amountDue, status };
      }),
    }));
  },

  getPendingDiscounts() {
    return get().discountApprovals.filter((d) => d.status === "Pending");
  },

  // ── Refund workflow ───────────────────────────────────────────────────────────

  processRefund({ billId, amount, reason, method, ref, originalPaymentIds, processedBy }) {
    const refund: RefundEvent = {
      id: nextRefundId(),
      billId, amount, reason, method, ref,
      originalPaymentIds,
      processedBy,
      processedAt: new Date().toISOString().slice(0, 19),
    };
    set((s) => ({
      refunds: [...s.refunds, refund],
      bills: s.bills.map((b) => {
        if (b.id !== billId) return b;
        const amountPaid = Math.max(0, b.amountPaid - amount);
        const amountDue = b.grandTotal - amountPaid;
        const status = deriveStatus(amountPaid, b.grandTotal, b.dueDate, false, false);
        return { ...b, amountPaid, amountDue, status };
      }),
    }));
    return refund;
  },

  getRefunds(billId) {
    return get().refunds.filter((r) => r.billId === billId);
  },

  // ── Package billing ───────────────────────────────────────────────────────────

  applyPackage({ billId, packageId, price, appliedBy }) {
    set((s) => ({
      bills: s.bills.map((b) => {
        if (b.id !== billId) return b;
        const pkgItem: LineItem = {
          id: nextLineId(),
          description: `Package — ${packageId}`,
          category: "Procedure",
          qty: 1,
          unitPrice: price,
          discount: 0,
          total: price,
        };
        const items = [pkgItem];
        const totals = recalcTotals(items);
        const amountDue = totals.grandTotal;
        return {
          ...b,
          items,
          ...totals,
          amountDue,
          notes: (b.notes ? b.notes + " | " : "") + `Package applied: ${packageId} by ${appliedBy}`,
        };
      }),
    }));
  },

  // ── IPD interim billing ───────────────────────────────────────────────────────

  createInterimBill(admissionId, billId, cycleNumber, fromDate, toDate) {
    const cycle: InterimBillCycle = {
      id: nextInterimId(),
      admissionId, cycleNumber, billId, fromDate, toDate,
      createdAt: new Date().toISOString().slice(0, 19),
    };
    set((s) => ({ interimCycles: [...s.interimCycles, cycle] }));
    return cycle;
  },

  getInterimCycles(admissionId) {
    return get().interimCycles.filter((c) => c.admissionId === admissionId);
  },

  getById(id) {
    return get().bills.find((b) => b.id === id);
  },

  getByPatient(patientId) {
    return get().bills.filter((b) => b.patientId === patientId);
  },

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<{ data: Record<string, unknown>[] }>("/billing");
      if (res?.data?.length) {
        set({ bills: res.data as unknown as Bill[], loading: false, initialized: true });
      }
    } catch (e) {
      set({ loading: false, error: (e as Error).message });
    }
  },
}));

export type { Bill, BillStatus, BillCategory, LineItem, Payment, PaymentMethod };
