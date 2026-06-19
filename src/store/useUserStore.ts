"use client";

import { create } from "zustand";
import { seedUsers, type SeedUser, type UserRole, type UserStatus } from "@/data/seedUsers";
import { api } from "@/services/apiClient";

export type { SeedUser, UserRole, UserStatus };

export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  phone?: string;
  qualification?: string;
};

type UserStore = {
  users: SeedUser[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
  createUser: (payload: CreateUserPayload) => { ok: true; user: SeedUser } | { ok: false; message: string };
  updateUser: (id: string, data: Partial<Omit<SeedUser, "id" | "password">>) => void;
  changePassword: (id: string, newPassword: string) => void;
  setStatus: (id: string, status: UserStatus) => void;
  deleteUser: (id: string) => void;
  getById: (id: string) => SeedUser | undefined;
  refresh: () => Promise<void>;
};

let _idCounter = seedUsers.length;

export const useUserStore = create<UserStore>((set, get) => ({
  users: seedUsers,
  loading: false,
  initialized: false,
  error: null,

  createUser: (payload) => {
    const exists = get().users.some(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );
    if (exists) return { ok: false, message: "Email already in use." };

    _idCounter += 1;
    const user: SeedUser = {
      id: `u-new-${String(_idCounter).padStart(3, "0")}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      department: payload.department,
      phone: payload.phone,
      qualification: payload.qualification,
      status: "Active",
      joinedAt: new Date().toISOString().slice(0, 10),
      lastActive: new Date().toISOString().slice(0, 10),
    };
    set((s) => ({ users: [...s.users, user] }));
    return { ok: true, user };
  },

  updateUser: (id, data) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),

  changePassword: (id, newPassword) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === id ? { ...u, password: newPassword } : u)),
    })),

  setStatus: (id, status) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === id ? { ...u, status } : u)),
    })),

  deleteUser: (id) =>
    set((s) => ({ users: s.users.filter((u) => u.id !== id) })),

  getById: (id) => get().users.find((u) => u.id === id),

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      set({ initialized: true, loading: false });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Failed to refresh users", loading: false });
    }
  },
}));
