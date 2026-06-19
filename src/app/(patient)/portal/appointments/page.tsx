"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useMemo, useState, useEffect } from "react";
import {
  Calendar, ChevronRight, Clock, X, Loader2,
  Plus, AlertTriangle, CheckCircle2,
} from "lucide-react";

const DOCTORS = [
  { name: "Dr. Priya Sharma", dept: "General Medicine" },
  { name: "Dr. Arjun Mehta", dept: "Cardiology" },
  { name: "Dr. Sneha Patel", dept: "Pediatrics" },
  { name: "Dr. Rajesh Kumar", dept: "Orthopedics" },
  { name: "Dr. Ananya Gupta", dept: "OBG" },
  { name: "Dr. Vikram Reddy", dept: "Dermatology" },
];

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(t: string) {
  return new Date(`2000-01-01T${t}`).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function BookAppointmentDialog({ onClose }: { onClose: () => void }) {
  const addAppointment = useAppointmentStore((s) => s.addAppointment);
  const patient = usePatientAuthStore((s) => {
    const id = s.loggedInPatientId;
    if (!id) return null;
    return usePatientStore.getState().patients.find((p) => p.id === id) ?? null;
  });

  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit() {
    if (!doctor || !date || !time) return;
    setSaving(true);
    setTimeout(() => {
      addAppointment({
        date,
        time,
        patient: patient?.name ?? "Unknown",
        age: patient?.age ?? 0,
        sex: patient?.sex === "O" ? "M" : (patient?.sex ?? "M") as "M" | "F",
        type: "OPD",
        doctor,
        dept: DOCTORS.find((d) => d.name === doctor)?.dept ?? "General Medicine",
        reason: reason.trim() || undefined,
      });
      setSaving(false);
      setDone(true);
    }, 500);
  }

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 text-center shadow-2xl">
          <CheckCircle2 size={40} className="mx-auto mb-3 text-[var(--normal-fg)]" />
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">Appointment Booked!</h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{fmtDate(date)} at {fmtTime(time)} with {doctor}</p>
          <button onClick={onClose} className="mt-4 rounded-xl bg-[var(--action-primary)] px-5 py-2 text-sm font-semibold text-white">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Book Appointment</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Doctor *</label>
            <select value={doctor} onChange={(e) => setDoctor(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]">
              <option value="">Select doctor</option>
              {DOCTORS.map((d) => <option key={d.name} value={d.name}>{d.name} — {d.dept}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().slice(0, 10)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Time *</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Reason (optional)</label>
            <textarea rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]"
              placeholder="Brief description of your concern…" />
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)]">Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !doctor || !date || !time}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? <><Loader2 size={13} className="animate-spin" /> Booking…</> : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const appointments = useAppointmentStore((s) => s.appointments);
  const cancelAppointment = useAppointmentStore((s) => s.cancelAppointment);

  const [showBook, setShowBook] = useState(false);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const patientAppts = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const all = appointments.filter((a) => a.patient === patient?.name);
    const sorted = all.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
    if (filter === "upcoming") return sorted.filter((a) => a.date >= today && a.status !== "Cancelled");
    return sorted.filter((a) => a.date < today || a.status === "Cancelled").reverse();
  }, [appointments, patient?.name, filter]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      {showBook && <BookAppointmentDialog onClose={() => setShowBook(false)} />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">My Appointments</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your visits to Aarogya Hospital</p>
        </div>
        <button onClick={() => setShowBook(true)}
          className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]">
          <Plus size={14} /> Book Appointment
        </button>
      </div>

      <div className="flex gap-2">
        {(["upcoming", "past"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)]"}`}>
            {f === "upcoming" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Doctor / Dept</span><span>Date & Time</span><span>Type</span><span>Status</span><span />
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          {patientAppts.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Calendar size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
              <p className="text-sm font-medium text-[var(--text-primary)]">No {filter} appointments</p>
              <button onClick={() => setShowBook(true)} className="mt-3 text-xs font-medium text-[var(--action-primary)] hover:underline">
                Book an appointment
              </button>
            </div>
          ) : (
            patientAppts.map((appt) => (
              <div key={appt.id} className="grid grid-cols-1 gap-2 px-5 py-3.5 md:grid-cols-[1fr_1fr_1fr_1fr_auto] md:items-center md:gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{appt.doctor}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{appt.dept}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[var(--text-primary)]">
                  <Clock size={12} className="text-[var(--text-secondary)]" />
                  {fmtDate(appt.date)} at {fmtTime(appt.time)}
                </div>
                <span className="inline-flex w-fit rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--action-primary)]">{appt.type}</span>
                <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${
                  appt.status === "Scheduled" ? "bg-[var(--info-bg)] text-[var(--info-fg)]"
                  : appt.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                  : appt.status === "Cancelled" ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]"
                  : appt.status === "In Progress" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]"
                  : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"
                }`}>{appt.status}</span>
                {appt.status === "Scheduled" && (
                  <button onClick={() => cancelAppointment(appt.id, "Cancelled by patient")}
                    className="text-xs font-medium text-[var(--critical-fg)] hover:underline">
                    Cancel
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
