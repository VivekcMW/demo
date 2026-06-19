import { create } from "zustand";
import {
  todayAppointments,
  upcomingWeekAppointments,
  type Appointment,
  type ApptStatus,
} from "@/data/seedAppointments";
import { api } from "@/services/apiClient";

interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
  addAppointment: (appt: Omit<Appointment, "id" | "status">) => Appointment;
  cancelAppointment: (id: string, reason?: string) => void;
  updateStatus: (id: string, status: ApptStatus) => void;
  refresh: () => Promise<void>;
}

let counter = 100;

function mapApiAppt(raw: Record<string, unknown>): Appointment | null {
  const datetime = raw.datetime as string | undefined;
  if (!datetime) return null;
  const d = new Date(datetime);
  return {
    id: raw.id as string,
    date: d.toISOString().slice(0, 10),
    time: d.toTimeString().slice(0, 5),
    patient: (raw.patientId as string) ?? "Unknown",
    age: 0,
    sex: "M",
    type: "OPD",
    doctor: (raw.doctorId as string) ?? "",
    dept: (raw.department as string) ?? "",
    status: (raw.status as ApptStatus) ?? "Scheduled",
    reason: raw.reason as string | undefined,
  };
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [
    ...todayAppointments,
    ...upcomingWeekAppointments,
  ],
  loading: false,
  initialized: false,
  error: null,

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get<{ data: Record<string, unknown>[] }>("/appointments");
      if (res?.data?.length) {
        const mapped = res.data.map(mapApiAppt).filter(Boolean) as Appointment[];
        set({ appointments: mapped.length ? mapped : [ ...todayAppointments, ...upcomingWeekAppointments ], loading: false, initialized: true });
      }
    } catch (e) {
      set({ loading: false, error: (e as Error).message });
    }
  },

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
