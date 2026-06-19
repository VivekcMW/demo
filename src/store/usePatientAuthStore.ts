"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { usePatientStore } from "./usePatientStore";

interface PatientAuthState {
  loggedInPatientId: string | null;
  login: (uhidOrPhone: string) => boolean;
  logout: () => void;
  getLoggedInPatient: () => ReturnType<typeof usePatientStore.getState>["patients"][0] | null;
}

export const usePatientAuthStore = create<PatientAuthState>()(
  persist(
    (set, get) => ({
      loggedInPatientId: null,

      login(uhidOrPhone: string) {
        const q = uhidOrPhone.trim().toLowerCase();
        const patient = usePatientStore
          .getState()
          .patients.find(
            (p) =>
              p.uhid.toLowerCase() === q ||
              p.phone === q ||
              p.abhaId?.toLowerCase() === q
          );
        if (patient) {
          set({ loggedInPatientId: patient.id });
          return true;
        }
        return false;
      },

      logout() {
        set({ loggedInPatientId: null });
      },

      getLoggedInPatient() {
        const id = get().loggedInPatientId;
        if (!id) return null;
        return usePatientStore.getState().patients.find((p) => p.id === id) ?? null;
      },
    }),
    { name: "aarogya-patient-auth" }
  )
);
