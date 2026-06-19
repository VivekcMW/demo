import { create } from "zustand";
import { api } from "@/services/apiClient";

// ── Inventory ─────────────────────────────────────────────────────────────
export interface InventoryItem {
  id: string;
  name: string;
  category: "Consumable" | "Supply" | "Equipment" | "Instrument";
  department: string;
  stock: number;
  unit: string;
  reorderLevel: number;
  reorderQty: number;
  location: string;
  vendor: string;
  unitCost: number;
  lastRestocked: string;
}

const seedInventory: InventoryItem[] = [
  { id: "INV-001", name: "Surgical Gloves (Sterile)", category: "Consumable", department: "OT", stock: 2400, unit: "pairs", reorderLevel: 500, reorderQty: 2000, location: "Store A-1", vendor: "MediGlove Inc.", unitCost: 8, lastRestocked: "2026-06-10" },
  { id: "INV-002", name: "3cc Syringes", category: "Consumable", department: "General", stock: 5600, unit: "pcs", reorderLevel: 1000, reorderQty: 5000, location: "Store A-2", vendor: "SurgiKit Ltd.", unitCost: 5, lastRestocked: "2026-06-08" },
  { id: "INV-003", name: "IV Cannula (22G)", category: "Consumable", department: "General", stock: 800, unit: "pcs", reorderLevel: 200, reorderQty: 1000, location: "Store A-2", vendor: "VascuCare", unitCost: 18, lastRestocked: "2026-06-05" },
  { id: "INV-004", name: "Infusion Sets", category: "Consumable", department: "IPD", stock: 340, unit: "pcs", reorderLevel: 150, reorderQty: 500, location: "Store A-3", vendor: "DripFlow", unitCost: 22, lastRestocked: "2026-06-01" },
  { id: "INV-005", name: "Suture Materials (Assorted)", category: "Supply", department: "OT", stock: 180, unit: "boxes", reorderLevel: 50, reorderQty: 100, location: "Store B-1", vendor: "Ethicon", unitCost: 450, lastRestocked: "2026-05-28" },
  { id: "INV-006", name: "Oxygen Masks (Adult)", category: "Supply", department: "IPD", stock: 220, unit: "pcs", reorderLevel: 100, reorderQty: 200, location: "Store B-1", vendor: "AirwayPlus", unitCost: 35, lastRestocked: "2026-06-09" },
  { id: "INV-007", name: "Wheelchair", category: "Equipment", department: "General", stock: 12, unit: "pcs", reorderLevel: 5, reorderQty: 10, location: "Equipment Bay", vendor: "MobilityTech", unitCost: 8500, lastRestocked: "2026-04-15" },
  { id: "INV-008", name: "Stethoscope (Littmann)", category: "Instrument", department: "General", stock: 25, unit: "pcs", reorderLevel: 10, reorderQty: 15, location: "Equipment Bay", vendor: "3M Healthcare", unitCost: 4200, lastRestocked: "2026-05-01" },
  { id: "INV-009", name: "Urine Collection Bags", category: "Consumable", department: "IPD", stock: 600, unit: "pcs", reorderLevel: 200, reorderQty: 500, location: "Store A-3", vendor: "UroCare", unitCost: 12, lastRestocked: "2026-06-02" },
  { id: "INV-010", name: "Thermometer (Digital)", category: "Equipment", department: "General", stock: 40, unit: "pcs", reorderLevel: 15, reorderQty: 20, location: "Equipment Bay", vendor: "TempTech", unitCost: 350, lastRestocked: "2026-05-20" },
];

// ── HR / Staff ────────────────────────────────────────────────────────────
export interface StaffMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: number;
  phone: string;
  email: string;
  joinDate: string;
  status: "Active" | "On Leave" | "Inactive";
  shift: "Day" | "Night" | "Rotating";
}

const seedStaff: StaffMember[] = [
  { id: "EMP-001", name: "Dr. Ananya Krishnan", designation: "Senior Consultant", department: "Internal Medicine", qualification: "MD Internal Medicine", experience: 12, phone: "+91-98765-43210", email: "ananya.k@aarogya.app", joinDate: "2019-03-01", status: "Active", shift: "Day" },
  { id: "EMP-002", name: "Dr. Rajesh Menon", designation: "Consultant", department: "Cardiology", qualification: "DM Cardiology", experience: 8, phone: "+91-98765-43211", email: "rajesh.m@aarogya.app", joinDate: "2020-06-15", status: "Active", shift: "Day" },
  { id: "EMP-003", name: "Nurse Priya Sharma", designation: "Staff Nurse", department: "IPD", qualification: "GNM", experience: 5, phone: "+91-98765-43212", email: "priya.s@aarogya.app", joinDate: "2021-01-10", status: "Active", shift: "Night" },
  { id: "EMP-004", name: "Ravi Deshmukh", designation: "Lab Technician", department: "Laboratory", qualification: "DMLT", experience: 6, phone: "+91-98765-43213", email: "ravi.d@aarogya.app", joinDate: "2020-09-01", status: "Active", shift: "Rotating" },
  { id: "EMP-005", name: "Sneha Patel", designation: "Pharmacist", department: "Pharmacy", qualification: "B.Pharm", experience: 4, phone: "+91-98765-43214", email: "sneha.p@aarogya.app", joinDate: "2022-03-20", status: "On Leave", shift: "Day" },
];

// ── Assets ────────────────────────────────────────────────────────────────
export interface Asset {
  id: string;
  name: string;
  type: "Medical" | "IT" | "Furniture" | "Vehicle";
  model: string;
  serialNo: string;
  department: string;
  location: string;
  purchaseDate: string;
  warrantyExpiry: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: "Operational" | "Under Maintenance" | "Retired" | "Faulty";
  vendor: string;
  cost: number;
}

const seedAssets: Asset[] = [
  { id: "AST-001", name: "MRI Scanner", type: "Medical", model: "Siemens Magnetom Vida 3T", serialNo: "MR-8492-AL", department: "Radiology", location: "Ground Floor - MRI Suite", purchaseDate: "2023-01-15", warrantyExpiry: "2028-01-14", lastMaintenance: "2026-05-20", nextMaintenance: "2026-07-20", status: "Operational", vendor: "Siemens Healthcare", cost: 45000000 },
  { id: "AST-002", name: "Ventilator", type: "Medical", model: "Drager Evita V800", serialNo: "VN-3821-BX", department: "ICU", location: "ICU Bay 1-4", purchaseDate: "2024-06-01", warrantyExpiry: "2029-05-31", lastMaintenance: "2026-06-01", nextMaintenance: "2026-08-01", status: "Operational", vendor: "Drager Medical", cost: 2800000 },
  { id: "AST-003", name: "X-Ray Machine", type: "Medical", model: "GE Definium 6500", serialNo: "XR-6712-CM", department: "Radiology", location: "X-Ray Room 1", purchaseDate: "2022-11-20", warrantyExpiry: "2027-11-19", lastMaintenance: "2026-04-10", nextMaintenance: "2026-07-10", status: "Faulty", vendor: "GE Healthcare", cost: 8500000 },
  { id: "AST-004", name: "Ambulance (ALS)", type: "Vehicle", model: "Force Traveller 3350", serialNo: "VH-42-AB-2023", department: "Emergency", location: "Ambulance Bay", purchaseDate: "2023-05-10", warrantyExpiry: "2027-05-09", lastMaintenance: "2026-05-25", nextMaintenance: "2026-08-25", status: "Operational", vendor: "Force Motors", cost: 2400000 },
  { id: "AST-005", name: "Hospital Bed (Electric)", type: "Furniture", model: "Hill-Rom Advanta", serialNo: "BR-1122-DT", department: "IPD", location: "Ward 2A", purchaseDate: "2024-08-01", warrantyExpiry: "2029-07-31", lastMaintenance: "2026-03-01", nextMaintenance: "2026-09-01", status: "Under Maintenance", vendor: "Hill-Rom", cost: 185000 },
];

// ── CME / Learning ────────────────────────────────────────────────────────
export interface CMERecord {
  id: string;
  staffId: string;
  staffName: string;
  courseName: string;
  provider: string;
  type: "Conference" | "Workshop" | "Online Course" | "Grand Round" | "Certification";
  credits: number;
  date: string;
  completed: boolean;
  expiryDate?: string;
  notes?: string;
}

const seedCME: CMERecord[] = [
  { id: "CME-001", staffId: "EMP-001", staffName: "Dr. Ananya Krishnan", courseName: "ACC Cardiology Update 2026", provider: "American College of Cardiology", type: "Conference", credits: 24, date: "2026-04-15", completed: true, notes: "Focused on newer anti-coagulation guidelines" },
  { id: "CME-002", staffId: "EMP-002", staffName: "Dr. Rajesh Menon", courseName: "Advanced Cardiac Life Support", provider: "AHA", type: "Certification", credits: 16, date: "2026-05-20", completed: true, expiryDate: "2028-05-20" },
  { id: "CME-003", staffId: "EMP-003", staffName: "Nurse Priya Sharma", courseName: "Critical Care Nursing Workshop", provider: "Indian Nursing Council", type: "Workshop", credits: 12, date: "2026-06-01", completed: true },
  { id: "CME-004", staffId: "EMP-001", staffName: "Dr. Ananya Krishnan", courseName: "Diabetes Management in Primary Care", provider: "API", type: "Online Course", credits: 8, date: "2026-07-01", completed: false, notes: "Self-paced online module" },
  { id: "CME-005", staffId: "EMP-004", staffName: "Ravi Deshmukh", courseName: "Molecular Diagnostics Symposium", provider: "ACBI", type: "Conference", credits: 10, date: "2026-08-10", completed: false },
];

// ── Combined Store ────────────────────────────────────────────────────────

interface OperationsStore {
  inventory: InventoryItem[];
  staff: StaffMember[];
  assets: Asset[];
  cmeRecords: CMERecord[];
  loading: boolean;
  initialized: boolean;
  error: string | null;

  refresh: () => Promise<void>;
  updateStock: (id: string, delta: number) => void;
  restockItem: (id: string, qty: number) => void;
  getLowStock: () => InventoryItem[];
  getInventoryByDepartment: (dept: string) => InventoryItem[];

  getActiveStaff: () => StaffMember[];
  getStaffByDepartment: (dept: string) => StaffMember[];

  updateAssetStatus: (id: string, status: Asset["status"]) => void;

  getPendingCME: () => CMERecord[];
  getCMEByStaff: (staffId: string) => CMERecord[];
  getTotalCredits: (staffId: string) => number;
}

export const useOperationsStore = create<OperationsStore>((set, get) => ({
  inventory: seedInventory.map((i) => ({ ...i })),
  staff: seedStaff.map((s) => ({ ...s })),
  assets: seedAssets.map((a) => ({ ...a })),
  cmeRecords: seedCME.map((c) => ({ ...c })),
  loading: false,
  initialized: false,
  error: null,

  async refresh() {
    set({ loading: true, error: null });
    try {
      const [invRes, astRes, cmeRes, stfRes] = await Promise.all([
        api.get<{ data: InventoryItem[] }>("/inventory").catch(() => null),
        api.get<{ data: Asset[] }>("/assets").catch(() => null),
        api.get<{ data: CMERecord[] }>("/cme").catch(() => null),
        api.get<{ data: StaffMember[] }>("/staff").catch(() => null),
      ]);
      set({
        inventory: invRes?.data ?? get().inventory,
        assets: astRes?.data ?? get().assets,
        cmeRecords: cmeRes?.data ?? get().cmeRecords,
        staff: stfRes?.data ?? get().staff,
        loading: false,
        initialized: true,
      });
    } catch {
      set({ loading: false, error: "Failed to fetch operations data" });
    }
  },

  updateStock(id, delta) {
    set((s) => ({
      inventory: s.inventory.map((i) =>
        i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i
      ),
    }));
  },

  restockItem(id, qty) {
    set((s) => ({
      inventory: s.inventory.map((i) =>
        i.id === id
          ? { ...i, stock: i.stock + qty, lastRestocked: new Date().toISOString().slice(0, 10) }
          : i
      ),
    }));
  },

  getLowStock() {
    return get().inventory.filter((i) => i.stock <= i.reorderLevel);
  },

  getInventoryByDepartment(dept) {
    return get().inventory.filter((i) => i.department === dept);
  },

  getActiveStaff() {
    return get().staff.filter((s) => s.status === "Active");
  },

  getStaffByDepartment(dept) {
    return get().staff.filter((s) => s.department === dept);
  },

  updateAssetStatus(id, status) {
    set((s) => ({
      assets: s.assets.map((a) => (a.id === id ? { ...a, status } : a)),
    }));
  },

  getPendingCME() {
    return get().cmeRecords.filter((c) => !c.completed);
  },

  getCMEByStaff(staffId) {
    return get().cmeRecords.filter((c) => c.staffId === staffId);
  },

  getTotalCredits(staffId) {
    return get()
      .cmeRecords.filter((c) => c.staffId === staffId && c.completed)
      .reduce((sum, c) => sum + c.credits, 0);
  },
}));
