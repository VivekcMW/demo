"use client";

import { Suspense } from "react";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarCheck2, Check, ChevronLeft } from "lucide-react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";

const DOCTORS = [
  { name: "Dr. A. Sharma",  dept: "General Medicine" },
  { name: "Dr. R. Mehta",   dept: "Cardiology" },
  { name: "Dr. P. Verma",   dept: "Orthopaedics" },
  { name: "Dr. S. Nair",    dept: "Paediatrics" },
  { name: "Dr. L. Pillai",  dept: "Gynaecology" },
  { name: "Dr. K. Iyer",    dept: "Neurology" },
  { name: "Dr. M. Das",     dept: "General Medicine" },
];

const TIME_SLOTS = [
  "08:00","08:20","08:40","09:00","09:20","09:40",
  "10:00","10:20","10:40","11:00","11:20","11:40",
  "12:00","14:00","14:20","14:40","15:00","15:20",
  "15:40","16:00","16:20","16:40","17:00","17:20",
];

const inputCls = "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] placeholder:text-[var(--text-secondary)]";
const labelCls = "block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1";

export default function NewAppointmentPage() {
  return (
    <Suspense>
      <NewAppointmentForm />
    </Suspense>
  );
}

function NewAppointmentForm() {
  const router       = useRouter();
  const params       = useSearchParams();
  const addAppt      = useAppointmentStore((s) => s.addAppointment);
  const patients     = usePatientStore((s) => s.patients);
  const { toast }    = useToast();

  const [patientSearch, setPatientSearch] = useState(params.get("name") ?? "");
  const [selectedPatient, setSelectedPatient] = useState<string>(params.get("name") ?? "");
  const [date,    setDate]   = useState(new Date().toISOString().slice(0, 10));
  const [time,    setTime]   = useState("");
  const [doctor,  setDoctor] = useState(DOCTORS[0].name);
  const [type,    setType]   = useState<"OPD" | "Tele" | "Follow-up">("OPD");
  const [age,     setAge]    = useState("");
  const [sex,     setSex]    = useState<"M" | "F" | "O">("M");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Patient autocomplete
  const suggestions = useMemo(() => {
    if (!patientSearch.trim() || patientSearch === selectedPatient) return [];
    const q = patientSearch.toLowerCase();
    return patients.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.phone?.includes(q) ||
      p.uhid?.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [patientSearch, patients, selectedPatient]);

  // Already booked slots for this doctor + date
  const appointments = useAppointmentStore((s) => s.appointments);
  const bookedSlots = useMemo(() =>
    appointments.filter((a) => a.doctor === doctor && a.date === date && a.status !== "Cancelled").map((a) => a.time),
    [appointments, doctor, date],
  );

  const canSubmit = selectedPatient && date && time && doctor;

  const handleSubmit = () => {
    const doc = DOCTORS.find((d) => d.name === doctor)!;
    const newAppt = addAppt({
      patient: selectedPatient,
      age: parseInt(age) || 30,
      sex: sex === "O" ? "M" : sex,
      date,
      time,
      doctor,
      dept: doc.dept,
      type,
    });
    toast(`Appointment booked: ${newAppt.id}`);
    router.push("/reception/appointments");
  };

  return (
    <div className="mx-auto max-w-2xl pb-8">
      <PageHeader
        title="Book Appointment"
        subtitle="Schedule a new patient appointment"
      />

      <div className="mt-6 space-y-5 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 sm:p-8">

        {/* Patient Search */}
        <div>
          <label className={labelCls}>Patient Name / UHID / Phone <span className="text-[var(--critical-fg)]">*</span></label>
          <div className="relative">
            <input
              className={inputCls}
              placeholder="Search existing patient or type new name…"
              value={patientSearch}
              onChange={(e) => { setPatientSearch(e.target.value); setSelectedPatient(""); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-lg">
                {suggestions.map((p) => (
                  <button key={p.id} type="button" onMouseDown={() => { setSelectedPatient(p.name); setPatientSearch(p.name); setAge(String(p.age)); setSex(p.sex); setShowSuggestions(false); }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-[var(--surface-sunken)]">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--action-subtle)] text-xs font-bold text-[var(--action-primary)]">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{p.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{p.phone} · {p.uhid}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          {!selectedPatient && patientSearch && (
            <button type="button" onClick={() => setSelectedPatient(patientSearch)}
              className="mt-1.5 text-xs text-[var(--action-primary)] hover:underline">
              + Use &quot;{patientSearch}&quot; as new patient name
            </button>
          )}
          {selectedPatient && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-[var(--normal-fg)]">
              <Check size={12} /> Patient selected: <strong>{selectedPatient}</strong>
            </p>
          )}
        </div>

        {/* Age + Sex */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Age (years)</label>
            <input type="number" min={0} max={150} className={inputCls} placeholder="e.g. 35" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Sex</label>
            <div className="flex gap-2">
              {(["M", "F", "O"] as const).map((s) => (
                <button key={s} type="button" onClick={() => setSex(s)}
                  className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${sex === s ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  {s === "M" ? "Male" : s === "F" ? "Female" : "Other"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor */}
        <div>
          <label className={labelCls}>Doctor <span className="text-[var(--critical-fg)]">*</span></label>
          <select className={inputCls} value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            {DOCTORS.map((d) => (
              <option key={d.name} value={d.name}>{d.name} — {d.dept}</option>
            ))}
          </select>
        </div>

        {/* Date + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Date <span className="text-[var(--critical-fg)]">*</span></label>
            <input type="date" className={inputCls} value={date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Visit Type</label>
            <div className="flex gap-2">
              {(["OPD", "Tele", "Follow-up"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setType(t)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${type === t ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <label className={labelCls}>Time Slot <span className="text-[var(--critical-fg)]">*</span></label>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
            {TIME_SLOTS.map((slot) => {
              const booked = bookedSlots.includes(slot);
              const selected = time === slot;
              return (
                <button key={slot} type="button" disabled={booked} onClick={() => setTime(slot)}
                  className={`rounded-lg border py-1.5 text-xs font-medium transition-colors ${
                    booked   ? "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] opacity-40 cursor-not-allowed" :
                    selected ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" :
                               "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                  }`}>
                  {slot}
                </button>
              );
            })}
          </div>
          {time && <p className="mt-1.5 text-xs text-[var(--normal-fg)] flex items-center gap-1"><Check size={12} /> Selected: {time}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button onClick={() => router.back()} className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            <ChevronLeft size={16} /> Back
          </button>
          <button onClick={handleSubmit} disabled={!canSubmit}
            className="flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50">
            <CalendarCheck2 size={15} /> Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
