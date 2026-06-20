"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, logout as apiLogout } from "@/services/authService";
import { setAuthToken, getAuthToken } from "@/services/apiClient";
import { seedUsers, type SeedUser } from "@/data/seedUsers";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type AuthStore = {
  users: SeedUser[];
  currentUser: SeedUser | null;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; message: string }>;
  register: (input: RegisterInput) => { ok: true } | { ok: false; message: string };
  logout: () => void;
  checkSession: () => boolean;
};

function mergeUsersWithSeeds(persistedUsers?: SeedUser[]): SeedUser[] {
  const byEmail = new Map<string, SeedUser>();
  for (const user of seedUsers) byEmail.set(user.email.toLowerCase(), user);
  for (const user of persistedUsers ?? []) byEmail.set(user.email.toLowerCase(), user);
  return Array.from(byEmail.values());
}
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: seedUsers,
      currentUser: null,

      login: async (email, password) => {
        try {
          const result = await apiLogin(email, password);
          const matched = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
          set({
            currentUser: matched ?? {
              id: result.user.id,
              name: result.user.email.split("@")[0],
              email: result.user.email,
              password: "",
              role: result.user.role as SeedUser["role"],
              status: "Active",
              joinedAt: new Date().toISOString().slice(0, 10),
            },
          });
          return { ok: true as const };
        } catch {
          const matchedUser = get().users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
          );
          if (!matchedUser) return { ok: false as const, message: "Invalid email or password" };
          set({ currentUser: matchedUser });
          return { ok: true as const };
        }
      },

      register: ({ name, email, password }) => {
        const exists = get().users.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return { ok: false as const, message: "Email already registered" };
        const newUser: SeedUser = {
          id: `u-${crypto.randomUUID()}`,
          name, email, password,
          role: "doctor", status: "Active",
          joinedAt: new Date().toISOString().slice(0, 10),
        };
        set((state) => ({ users: [...state.users, newUser], currentUser: newUser }));
        return { ok: true as const };
      },

      logout: () => {
        apiLogout();
        set({ currentUser: null });
      },

      checkSession: () => !!getAuthToken(),
    }),
    {
      name: "aarogya-auth-store",
      // HIPAA §164.312(a)(2)(ii): Never persist passwords to localStorage
      partialize: (state) => ({
        currentUser: state.currentUser
          ? { ...state.currentUser, password: "" } // Strip password from persisted state
          : null,
        // Note: users list not persisted — seed data re-hydrates on load
      }),
      merge: (persistedState, currentState) => {
        const typedPersisted = (persistedState ?? {}) as Partial<AuthStore>;
        const users = mergeUsersWithSeeds();
        const currentUser = typedPersisted.currentUser
          ? users.find((u) => u.email.toLowerCase() === typedPersisted.currentUser!.email.toLowerCase()) ?? typedPersisted.currentUser
          : null;
        return { ...currentState, ...typedPersisted, users, currentUser };
      },
    },
  ),
);
