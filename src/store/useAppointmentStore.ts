import { create } from "zustand";
import {
  todayAppointments,
  upcomingWeekAppointments,
  type Appointment,
  type ApptStatus,
} from "@/data/seedAppointments";

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appt: Omit<Appointment, "id" | "status">) => Appointment;
  cancelAppointment: (id: string, reason?: string) => void;
  updateStatus: (id: string, status: ApptStatus) => void;
}

let counter = 100;

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [
    ...todayAppointments,
    ...upcomingWeekAppointments,
  ],

  addAppointment: (appt) => {
    counter += 1;
    const newAppt: Appointment = {
      ...appt,
      id: `APT-${String(counter).padStart(3, "0")}`,
      status: "Scheduled",
    };
    set((s) => ({ appointments: [...s.appointments, newAppt] }));
    return newAppt;
  },

  cancelAppointment: (id, reason) => {
    set((s) => ({
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status: "Cancelled", reason: reason ?? "Cancelled" } : a
      ),
    }));
  },

  updateStatus: (id, status) => {
    set((s) => ({
      appointments: s.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    }));
  },
}));
