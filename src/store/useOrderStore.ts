import { create } from "zustand";
import { seedOrders } from "@/data/seedOrders";
import type { Order, OrderStatus, OrderType, OrderPriority, DiagnosticResult } from "@/data/seedOrders";

export type { Order, OrderStatus, OrderType, OrderPriority, DiagnosticResult };

export interface NewOrderPayload {
  patientId: string;
  patientName: string;
  orderedBy: string;
  type: OrderType;
  title: string;
  details: string;
  priority: OrderPriority;
  notes?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (payload: NewOrderPayload) => Order;
  updateStatus: (id: string, status: OrderStatus, by: string, note?: string) => void;
  cancelOrder: (id: string, by: string, note?: string) => void;
  addDiagnosticResult: (id: string, result: DiagnosticResult, by: string) => void;
  getById: (id: string) => Order | undefined;
  getByPatient: (patientId: string) => Order[];
}

let nextId = seedOrders.length + 1;

function padId(n: number) {
  return `ORD-${String(n).padStart(4, "0")}`;
}

function nowISO() {
  return new Date().toISOString().slice(0, 19);
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: seedOrders,

  addOrder(payload) {
    const id = padId(nextId++);
    const now = nowISO();
    const order: Order = {
      id,
      patientId:   payload.patientId,
      patientName: payload.patientName,
      orderedBy:   payload.orderedBy,
      orderedAt:   now,
      type:        payload.type,
      title:       payload.title,
      details:     payload.details,
      priority:    payload.priority,
      status:      "Ordered",
      notes:       payload.notes,
      statusHistory: [
        { status: "Ordered", at: now, by: payload.orderedBy },
      ],
    };
    set((s) => ({ orders: [order, ...s.orders] }));
    return order;
  },

  updateStatus(id, status, by, note) {
    const now = nowISO();
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id
          ? o
          : {
              ...o,
              status,
              statusHistory: [...o.statusHistory, { status, at: now, by, note }],
            }
      ),
    }));
  },

  cancelOrder(id, by, note) {
    get().updateStatus(id, "Cancelled", by, note ?? "Order cancelled");
  },

  addDiagnosticResult(id, result, by) {
    const now = nowISO();
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id
          ? o
          : {
              ...o,
              result,
              status: "Completed" as OrderStatus,
              statusHistory: [
                ...o.statusHistory,
                {
                  status: "Completed" as OrderStatus,
                  at: now,
                  by,
                  note: result.critical ? "⚠ Critical result reported" : "Result reported",
                },
              ],
            }
      ),
    }));
  },

  getById(id) {
    return get().orders.find((o) => o.id === id);
  },

  getByPatient(patientId) {
    return get().orders.filter((o) => o.patientId === patientId);
  },
}));
