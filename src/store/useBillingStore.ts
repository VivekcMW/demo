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
}

export interface RecordPaymentPayload {
  billId:  string;
  amount:  number;
  method:  PaymentMethod;
  ref?:    string;
  by:      string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let billCounter = seedBills.length + 1;
let lineCounter = 9000;
let payCounter  = 9000;

function nextBillId()  { return `BILL-${String(billCounter++).padStart(4, "0")}`; }
function nextLineId()  { return `li-${String(lineCounter++)}`; }
function nextPayId()   { return `py-${String(payCounter++)}`; }

function recalcTotals(items: LineItem[]) {
  const subtotal      = items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const discountTotal = items.reduce((s, i) => s + (i.discount ?? 0), 0);
  const taxable       = items
    .filter((i) => i.category === "Imaging" || i.category === "Procedure")
    .reduce((s, i) => s + i.total, 0);
  const tax           = Math.round(taxable * 0.05);
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

  createBill:     (payload: CreateBillPayload) => Bill;
  recordPayment:  (payload: RecordPaymentPayload) => void;
  cancelBill:     (id: string, by: string) => void;
  waiveBill:      (id: string, by: string, note?: string) => void;
  addLineItem:    (billId: string, item: Omit<LineItem, "id" | "total">) => void;
  removeLineItem: (billId: string, lineId: string) => void;

  getById:        (id: string) => Bill | undefined;
  getByPatient:   (patientId: string) => Bill[];
}

export const useBillingStore = create<BillingState>((set, get) => ({
  bills: seedBills,

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

  getById(id) {
    return get().bills.find((b) => b.id === id);
  },

  getByPatient(patientId) {
    return get().bills.filter((b) => b.patientId === patientId);
  },
}));

export type { Bill, BillStatus, BillCategory, LineItem, Payment, PaymentMethod };
