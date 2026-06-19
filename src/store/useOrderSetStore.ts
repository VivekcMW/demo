import { create } from "zustand";
import { seedOrderSets } from "@/data/seedOrderSets";
import type { OrderSetDefinition, OrderSetItem } from "@/data/seedOrderSets";

export type { OrderSetDefinition, OrderSetItem };

interface OrderSetStore {
  orderSets: OrderSetDefinition[];
  getBySpecialty: (specialty: string) => OrderSetDefinition[];
  getById: (id: string) => OrderSetDefinition | undefined;
  getByIds: (ids: string[]) => OrderSetDefinition[];
}

export const useOrderSetStore = create<OrderSetStore>((set, get) => ({
  orderSets: seedOrderSets,

  getBySpecialty(specialty) {
    return get().orderSets.filter(
      (os) => os.specialty.toLowerCase() === specialty.toLowerCase() && os.status === "active"
    );
  },

  getById(id) {
    return get().orderSets.find((os) => os.id === id);
  },

  getByIds(ids) {
    return get().orderSets.filter((os) => ids.includes(os.id));
  },
}));
