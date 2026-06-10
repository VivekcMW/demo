"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { seedUsers, type SeedUser } from "@/data/seedUsers";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type AuthStore = {
  users: SeedUser[];
  currentUser: SeedUser | null;
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string };
  register: (input: RegisterInput) => { ok: true } | { ok: false; message: string };
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: seedUsers,
      currentUser: null,
      login: (email, password) => {
        const matchedUser = get().users.find(
          (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
        );

        if (!matchedUser) {
          return { ok: false as const, message: "Invalid email or password" };
        }

        set({ currentUser: matchedUser });
        return { ok: true as const };
      },
      register: ({ name, email, password }) => {
        const exists = get().users.some((user) => user.email.toLowerCase() === email.toLowerCase());

        if (exists) {
          return { ok: false as const, message: "Email already registered" };
        }

        const newUser: SeedUser = {
          id: `u-${crypto.randomUUID()}`,
          name,
          email,
          password,
          role: "doctor",
          status: "Active",
          joinedAt: new Date().toISOString().slice(0, 10),
        };

        set((state) => ({ users: [...state.users, newUser], currentUser: newUser }));
        return { ok: true as const };
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "aarogya-auth-store",
      partialize: (state) => ({ users: state.users, currentUser: state.currentUser }),
    },
  ),
);
