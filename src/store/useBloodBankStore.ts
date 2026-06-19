import { create } from "zustand";
import {
  seedBloodBankOrders,
  seedBloodInventory,
  type BloodBankOrder,
  type BloodInventory,
  type BloodGroup,
  type BloodProduct,
  type CrossMatchStatus,
  type TransfusionStatus,
} from "@/data/seedBloodBank";

let counter = seedBloodBankOrders.length + 1;
function nextId() { return `BB-${String(counter++).padStart(4, "0")}`; }

const now = () => new Date().toISOString().slice(0, 19);

interface BloodBankState {
  orders: BloodBankOrder[];
  inventory: BloodInventory[];

  addOrder: (order: Omit<BloodBankOrder, "id" | "orderedAt">) => BloodBankOrder;
  updateCrossMatchStatus: (id: string, status: CrossMatchStatus, result?: string) => void;
  startTransfusion: (id: string) => void;
  completeTransfusion: (id: string) => void;
  reportReaction: (id: string, notes: string) => void;
  cancelOrder: (id: string) => void;
  getById: (id: string) => BloodBankOrder | undefined;
  getByPatient: (patientId: string) => BloodBankOrder[];
  getInventoryByProduct: (product: BloodProduct) => BloodInventory[];
  consumeInventory: (product: BloodProduct, bloodGroup: BloodGroup, units: number) => void;
  addInventory: (item: BloodInventory) => void;
}

export const useBloodBankStore = create<BloodBankState>((set, get) => ({
  orders: seedBloodBankOrders,
  inventory: seedBloodInventory,

  addOrder(payload) {
    const order: BloodBankOrder = {
      id: nextId(),
      orderedAt: now(),
      ...payload,
    };
    set((s) => ({ orders: [order, ...s.orders] }));
    return order;
  },

  updateCrossMatchStatus(id, status, result) {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id ? o : { ...o, crossMatchStatus: status, crossMatchResult: result ?? o.crossMatchResult }
      ),
    }));
  },

  startTransfusion(id) {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id ? o : {
          ...o,
          status: "In-Progress" as TransfusionStatus,
          transfusionStartedAt: now(),
        }
      ),
    }));
  },

  completeTransfusion(id) {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id ? o : {
          ...o,
          status: "Completed" as TransfusionStatus,
          transfusionCompletedAt: now(),
        }
      ),
    }));
  },

  reportReaction(id, notes) {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id ? o : {
          ...o,
          status: "Reaction" as TransfusionStatus,
          reactionNotes: notes,
        }
      ),
    }));
  },

  cancelOrder(id) {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id !== id ? o : { ...o, status: "Cancelled" as TransfusionStatus }
      ),
    }));
  },

  getById(id) { return get().orders.find((o) => o.id === id); },
  getByPatient(pid) { return get().orders.filter((o) => o.patientId === pid); },
  getInventoryByProduct(product) {
    return get().inventory.filter((i) => i.product === product);
  },

  consumeInventory(product, bloodGroup, units) {
    set((s) => ({
      inventory: s.inventory.map((i) =>
        i.product === product && i.bloodGroup === bloodGroup
          ? { ...i, unitsAvailable: Math.max(0, i.unitsAvailable - units) }
          : i
      ),
    }));
  },

  addInventory(item) {
    set((s) => ({ inventory: [...s.inventory, item] }));
  },
}));

export type { BloodBankOrder, BloodInventory, BloodGroup, BloodProduct, TransfusionStatus, CrossMatchStatus };
