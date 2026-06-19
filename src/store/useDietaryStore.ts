import { create } from "zustand";

export type DietType = "Normal" | "Diabetic" | "Soft" | "Liquid" | "Semi-Solid" | "Low Salt" | "Low Fat" | "High Protein" | "Renal" | "Gluten Free" | "Keto" | "Pediatric" | "NPO";
export type DietMeal = "Breakfast" | "Lunch" | "Evening Snack" | "Dinner";
export type DietStatus = "Ordered" | "Preparing" | "Delivered" | "Cancelled";

export interface DietOrder {
  id: string;
  admissionId: string;
  patientId: string;
  patientName: string;
  ward: string;
  bed: string;
  dietType: DietType;
  meals: DietMeal[];
  instructions?: string;
  orderedAt: string;
  orderedBy: string;
  status: DietStatus;
  startDate: string;
  endDate?: string;
}

const now = "2026-06-10T08:00:00";

const seedOrders: DietOrder[] = [
  { id: "DO-001", admissionId: "ADM-0001", patientId: "PT-0001", patientName: "Anil Kumar Sharma", ward: "General Ward A", bed: "A1", dietType: "Diabetic", meals: ["Breakfast", "Lunch", "Dinner"], instructions: "No added sugar. Calorie count 1800/day.", orderedAt: "2026-06-08T09:00:00", orderedBy: "Dr. Priya Mehta", status: "Delivered", startDate: "2026-06-08" },
  { id: "DO-002", admissionId: "ADM-0002", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", ward: "General Ward A", bed: "A2", dietType: "Low Salt", meals: ["Breakfast", "Lunch", "Dinner"], instructions: "Low sodium. Avoid pickles, papad.", orderedAt: "2026-06-09T15:00:00", orderedBy: "Dr. Suresh Nair", status: "Delivered", startDate: "2026-06-09" },
  { id: "DO-003", admissionId: "ADM-0003", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", ward: "General Ward A", bed: "A3", dietType: "Semi-Solid", meals: ["Breakfast", "Lunch", "Evening Snack", "Dinner"], instructions: "Avoid cold foods. Warm meals only.", orderedAt: "2026-06-07T11:30:00", orderedBy: "Dr. Ananya Krishnan", status: "Delivered", startDate: "2026-06-07" },
  { id: "DO-004", admissionId: "ADM-0001", patientId: "PT-0001", patientName: "Anil Kumar Sharma", ward: "General Ward A", bed: "A1", dietType: "Diabetic", meals: ["Breakfast", "Lunch", "Dinner"], orderedAt: "2026-06-10T10:00:00", orderedBy: "Dr. Priya Mehta", status: "Ordered", startDate: "2026-06-11", endDate: "2026-06-13" },
  { id: "DO-005", admissionId: "ADM-0004", patientId: "PT-0008", patientName: "Sunita Devi Yadav", ward: "General Ward A", bed: "A5", dietType: "Liquid", meals: ["Breakfast", "Lunch", "Dinner"], instructions: "Clear liquids. Full liquids day 2 post-op.", orderedAt: "2026-06-11T08:00:00", orderedBy: "Dr. Ramesh Gupta", status: "Preparing", startDate: "2026-06-12" },
];

let counter = seedOrders.length + 1;

interface DietaryStore {
  orders: DietOrder[];
  getByAdmission: (admissionId: string) => DietOrder[];
  getByWard: (ward: string) => DietOrder[];
  getActive: () => DietOrder[];
  addOrder: (o: Omit<DietOrder, "id">) => DietOrder;
  updateStatus: (id: string, status: DietStatus) => void;
}

export const useDietaryStore = create<DietaryStore>((set, get) => ({
  orders: seedOrders,
  getByAdmission(admissionId) { return get().orders.filter((o) => o.admissionId === admissionId); },
  getByWard(ward) { return get().orders.filter((o) => o.ward === ward); },
  getActive() { return get().orders.filter((o) => o.status !== "Cancelled" && o.status !== "Delivered"); },
  addOrder(o) {
    const id = `DO-${String(counter++).padStart(3, "0")}`;
    const rec = { id, ...o };
    set((s) => ({ orders: [...s.orders, rec] }));
    return rec;
  },
  updateStatus(id, status) { set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, status } : o) })); },
}));
