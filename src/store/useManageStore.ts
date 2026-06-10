"use client";

import { create } from "zustand";
import {
  seedDepartments, seedShifts, seedAnnouncements,
  type Department, type StaffShift, type SystemAnnouncement, type DeptStatus, type ShiftType,
} from "@/data/seedManage";

export type { Department, StaffShift, SystemAnnouncement, DeptStatus, ShiftType };

let _deptCounter = seedDepartments.length;
let _shiftCounter = seedShifts.length;
let _annCounter = seedAnnouncements.length;

type ManageStore = {
  departments: Department[];
  shifts: StaffShift[];
  announcements: SystemAnnouncement[];

  // Departments
  addDepartment: (data: Omit<Department, "id" | "createdAt">) => Department;
  updateDepartment: (id: string, data: Partial<Omit<Department, "id" | "createdAt">>) => void;
  toggleDeptStatus: (id: string) => void;
  deleteDepartment: (id: string) => void;

  // Shifts
  addShift: (data: Omit<StaffShift, "id">) => StaffShift;
  updateShift: (id: string, data: Partial<Omit<StaffShift, "id">>) => void;
  deleteShift: (id: string) => void;

  // Announcements
  addAnnouncement: (data: Omit<SystemAnnouncement, "id" | "postedAt">) => SystemAnnouncement;
  deleteAnnouncement: (id: string) => void;
};

export const useManageStore = create<ManageStore>((set) => ({
  departments: seedDepartments,
  shifts: seedShifts,
  announcements: seedAnnouncements,

  addDepartment: (data) => {
    _deptCounter += 1;
    const dept: Department = {
      id: `dept-${String(_deptCounter).padStart(3, "0")}`,
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    };
    set((s) => ({ departments: [...s.departments, dept] }));
    return dept;
  },

  updateDepartment: (id, data) =>
    set((s) => ({
      departments: s.departments.map((d) => (d.id === id ? { ...d, ...data } : d)),
    })),

  toggleDeptStatus: (id) =>
    set((s) => ({
      departments: s.departments.map((d) =>
        d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d
      ),
    })),

  deleteDepartment: (id) =>
    set((s) => ({ departments: s.departments.filter((d) => d.id !== id) })),

  addShift: (data) => {
    _shiftCounter += 1;
    const shift: StaffShift = { id: `sh-${String(_shiftCounter).padStart(3, "0")}`, ...data };
    set((s) => ({ shifts: [...s.shifts, shift] }));
    return shift;
  },

  updateShift: (id, data) =>
    set((s) => ({
      shifts: s.shifts.map((sh) => (sh.id === id ? { ...sh, ...data } : sh)),
    })),

  deleteShift: (id) =>
    set((s) => ({ shifts: s.shifts.filter((sh) => sh.id !== id) })),

  addAnnouncement: (data) => {
    _annCounter += 1;
    const ann: SystemAnnouncement = {
      id: `ann-${String(_annCounter).padStart(3, "0")}`,
      postedAt: new Date().toISOString(),
      ...data,
    };
    set((s) => ({ announcements: [ann, ...s.announcements] }));
    return ann;
  },

  deleteAnnouncement: (id) =>
    set((s) => ({ announcements: s.announcements.filter((a) => a.id !== id) })),
}));
