import { create } from "zustand";

interface LocationState {
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  isDetected: boolean;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: {
    city: string;
    region: string;
    country: string;
    countryCode: string;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  city: null,
  region: null,
  country: null,
  countryCode: null,
  isDetected: false,
  isLoading: false,
  error: null,
  setLocation: (location) =>
    set({
      city: location.city,
      region: location.region,
      country: location.country,
      countryCode: location.countryCode,
      isDetected: true,
      isLoading: false,
      error: null,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () =>
    set({
      city: null,
      region: null,
      country: null,
      countryCode: null,
      isDetected: false,
      isLoading: false,
      error: null,
    }),
}));
