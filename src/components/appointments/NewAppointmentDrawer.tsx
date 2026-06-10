"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, User, Calendar, Clock, Stethoscope, FileText, Phone, MapPin, ShieldAlert, Droplets } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { type ApptType } from "@/data/seedAppointments";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { usePatientStore } from "@/store/usePatientStore";

// ── Seed reference data ───────────────────────────────────────────────────────
const PATIENT_SUGGESTIONS = [
  { name: "Ravi Teja",          age: 42, sex: "M" as const, uhid: "AHC-00042" },
  { name: "Sunita Devi",        age: 58, sex: "F" as const, uhid: "AHC-00058" },
  { name: "Arjun Patel",        age: 31, sex: "M" as const, uhid: "AHC-00031" },
  { name: "Meena Sharma",       age: 65, sex: "F" as const, uhid: "AHC-00065" },
  { name: "Kavya Reddy",        age: 27, sex: "F" as const, uhid: "AHC-00027" },
  { name: "Mohan Lal",          age: 72, sex: "M" as const, uhid: "AHC-00072" },
  { name: "Fatima Sheikh",      age: 45, sex: "F" as const, uhid: "AHC-00045" },
  { name: "Vikram Pillai",      age: 36, sex: "M" as const, uhid: "AHC-00036" },
  { name: "Nalini Rao",         age: 62, sex: "F" as const, uhid: "AHC-00062" },
  { name: "Geeta Patil",        age: 50, sex: "F" as const, uhid: "AHC-00050" },
  { name: "Harish Nambiar",     age: 38, sex: "M" as const, uhid: "AHC-00038" },
  { name: "Lavanya Krishnan",   age: 29, sex: "F" as const, uhid: "AHC-00029" },
];

const DOCTORS = [
  { name: "Dr. Ananya Sharma",  dept: "General Medicine" },
  { name: "Dr. Rajiv Menon",    dept: "Cardiology" },
  { name: "Dr. Preethi Nair",   dept: "Gynaecology" },
  { name: "Dr. Arun Desai",     dept: "Orthopaedics" },
  { name: "Dr. Sunita Bhat",    dept: "Paediatrics" },
  { name: "Dr. Kiran Reddy",    dept: "Dermatology" },
  { name: "Dr. Mahesh Iyer",    dept: "ENT" },
  { name: "Dr. Divya Kumar",    dept: "Ophthalmology" },
];

// 20-min slots 08:00–17:40
const TIME_SLOTS: string[] = [];
for (let h = 8; h < 18; h++) {
  for (const m of [0, 20, 40]) {
    TIME_SLOTS.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
  preselectedDate?: string;
}

interface FormState {
  patientQuery: string;
  patientName: string;
  patientAge: string;
  patientDob: string;
  patientSex: "M" | "F" | "O" | "";
  patientPhone: string;
  patientAltPhone: string;
  patientBloodGroup: string;
  patientAddress: string;
  patientIdType: string;
  patientIdNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  knownAllergies: string;
  isWalkIn: boolean;
  date: string;
  time: string;
  type: ApptType;
  doctorIndex: number;
  chiefComplaint: string;
}

const DEFAULT_FORM: FormState = {
  patientQuery: "",
  patientName: "",
  patientAge: "",
  patientDob: "",
  patientSex: "",
  patientPhone: "",
  patientAltPhone: "",
  patientBloodGroup: "",
  patientAddress: "",
  patientIdType: "Aadhaar",
  patientIdNumber: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  knownAllergies: "",
  isWalkIn: false,
  date: "2026-06-10",
  time: "",
  type: "OPD",
  doctorIndex: 0,
  chiefComplaint: "",
};

// ── Component ────────────────────────────────────────────────────────────────
export function NewAppointmentDrawer({ open, onClose, onSuccess, preselectedDate }: Props) {
  const addAppointment = useAppointmentStore((s) => s.addAppointment);
  const appointments   = useAppointmentStore((s) => s.appointments);
  const addPatient     = usePatientStore((s) => s.addPatient);

  const [form, setForm] = useState<FormState>({
    ...DEFAULT_FORM,
    date: preselectedDate ?? "2026-06-10",
  });
  const [errors, setErrors]         = useState<Partial<Record<keyof FormState, string>>>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const patientRef = useRef<HTMLDivElement>(null);

  // Reset form when drawer opens
  useEffect(() => {
    if (open) {
      setForm({ ...DEFAULT_FORM, date: preselectedDate ?? "2026-06-10" });
      setErrors({});
      setSubmitted(false);
    }
  }, [open, preselectedDate]);

  // Close suggestions on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (patientRef.current && !patientRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Patient suggestions filtered by query
  const filteredSuggestions = form.patientQuery.length >= 1
    ? PATIENT_SUGGESTIONS.filter((p) =>
        p.name.toLowerCase().includes(form.patientQuery.toLowerCase())
      )
    : [];

  // Booked slots for selected date
  const bookedSlots = new Set(
    appointments
      .filter((a) => a.date === form.date && a.status !== "Cancelled")
      .map((a) => a.time)
  );

  const selectedDoctor = DOCTORS[form.doctorIndex];

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.patientName.trim()) e.patientName = "Patient name is required";
    if (!form.patientAge || isNaN(Number(form.patientAge)) || Number(form.patientAge) < 1)
      e.patientAge = "Valid age required";
    if (!form.patientSex) e.patientSex = "Sex is required";
    if (form.isWalkIn) {
      if (!form.patientPhone.trim() || !/^[6-9]\d{9}$/.test(form.patientPhone))
        e.patientPhone = "Valid 10-digit mobile required";
    }
    if (!form.date) e.date = "Date is required";
    if (!form.time) e.time = "Please select a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);

    setTimeout(() => {
      // If walk-in, register the patient first
      if (form.isWalkIn) {
        addPatient({
          name: form.patientName.trim(),
          age: Number(form.patientAge),
          dob: form.patientDob || undefined,
          sex: form.patientSex as "M" | "F" | "O",
          bloodGroup: (form.patientBloodGroup || undefined) as import("@/data/seedPatients").BloodGroup | undefined,
          phone: form.patientPhone,
          altPhone: form.patientAltPhone || undefined,
          address: form.patientAddress || undefined,
          idProofType: form.patientIdType || undefined,
          idProofNumber: form.patientIdNumber || undefined,
          emergencyContactName: form.emergencyContactName || undefined,
          emergencyContactPhone: form.emergencyContactPhone || undefined,
          allergies: form.knownAllergies ? form.knownAllergies.split(",").map((s) => s.trim()).filter(Boolean) : [],
        });
      }

      addAppointment({
        date: form.date,
        time: form.time,
        patient: form.patientName.trim(),
        age: Number(form.patientAge),
        sex: (form.patientSex === "O" ? "F" : form.patientSex) as "M" | "F",
        type: form.type,
        doctor: selectedDoctor.name,
        dept: selectedDoctor.dept,
        reason: form.chiefComplaint || undefined,
      });

      onSuccess(
        `Appointment booked for ${form.patientName.trim()} on ${form.date} at ${form.time}`
      );
      onClose();
    }, 600); // brief "saving" feel
  };

  if (!open) return null;

  return (
    <Drawer open={open} onClose={onClose} aria-label="New Appointment">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">New Appointment</h2>
            <p className="text-xs text-[var(--text-secondary)]">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-5 px-5 py-5">

            {/* ── Patient ─────────────────────────────────────────── */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <User size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Patient</p>
              </div>

              {/* Search / walk-in toggle */}
              <div className="mb-3 flex rounded-lg border border-[var(--border-default)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => { set("isWalkIn", false); set("patientQuery", ""); set("patientName", ""); }}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${!form.isWalkIn ? "bg-[var(--action-primary)] text-white" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Search existing
                </button>
                <button
                  type="button"
                  onClick={() => { set("isWalkIn", true); set("patientQuery", ""); }}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${form.isWalkIn ? "bg-[var(--action-primary)] text-white" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                >
                  Walk-in / New
                </button>
              </div>

              {!form.isWalkIn ? (
                <div ref={patientRef} className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    placeholder="Type patient name or UHID…"
                    value={form.patientQuery}
                    onChange={(e) => {
                      set("patientQuery", e.target.value);
                      set("patientName", e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                  />
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <ul className="absolute z-10 mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-lg overflow-hidden">
                      {filteredSuggestions.map((p) => (
                        <li key={p.uhid}>
                          <button
                            type="button"
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--action-subtle)]"
                            onClick={() => {
                              set("patientName", p.name);
                              set("patientQuery", p.name);
                              set("patientAge", String(p.age));
                              set("patientSex", p.sex);
                              setShowSuggestions(false);
                              setErrors((prev) => ({ ...prev, patientName: undefined, patientAge: undefined, patientSex: undefined }));
                            }}
                          >
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--action-subtle)] text-xs font-semibold text-[var(--action-primary)]">
                              {p.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[var(--text-primary)]">{p.name}</p>
                              <p className="text-xs text-[var(--text-secondary)]">{p.uhid} · {p.age}y {p.sex}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.patientName && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientName}</p>}
                </div>
              ) : (
                <div className="space-y-3">

                  {/* ── Step 1: Basic Identity ── */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] px-3 py-2 mb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Basic Info</p>
                  </div>

                  {/* Full name */}
                  <div>
                    <label className="mb-1 block text-xs text-[var(--text-secondary)]">Full Name *</label>
                    <input type="text" placeholder="e.g. Rahul Sharma"
                      value={form.patientName}
                      onChange={(e) => set("patientName", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                    {errors.patientName && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientName}</p>}
                  </div>

                  {/* Age + DOB */}
                  <div className="flex gap-2">
                    <div className="w-24 shrink-0">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Age *</label>
                      <input type="number" placeholder="Yrs" min={1} max={120}
                        value={form.patientAge}
                        onChange={(e) => set("patientAge", e.target.value)}
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                      {errors.patientAge && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientAge}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Date of Birth</label>
                      <input type="date" max="2026-06-10"
                        value={form.patientDob}
                        onChange={(e) => {
                          set("patientDob", e.target.value);
                          if (e.target.value) {
                            const age = new Date().getFullYear() - new Date(e.target.value).getFullYear();
                            set("patientAge", String(age));
                          }
                        }}
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                    </div>
                  </div>

                  {/* Sex + Blood group */}
                  <div className="flex gap-2 items-start">
                    <div>
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Sex *</label>
                      <div className="flex gap-1">
                        {(["M","F","O"] as const).map((s) => (
                          <button key={s} type="button" onClick={() => set("patientSex", s)}
                            className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors ${form.patientSex===s?"border-[var(--action-primary)] bg-[var(--action-primary)] text-white":"border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}
                          >{s=="O"?"Other":s}</button>
                        ))}
                      </div>
                      {errors.patientSex && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientSex}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Blood Group</label>
                      <div className="relative">
                        <Droplets size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
                        <select value={form.patientBloodGroup} onChange={(e) => set("patientBloodGroup", e.target.value)}
                          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]">
                          <option value="">Unknown</option>
                          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ── Step 2: Contact ── */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] px-3 py-2 mt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Contact</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Mobile *</label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
                        <input type="tel" placeholder="10-digit" maxLength={10}
                          value={form.patientPhone}
                          onChange={(e) => set("patientPhone", e.target.value.replace(/\D/g,""))}
                          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                        />
                      </div>
                      {errors.patientPhone && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientPhone}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Alt. Mobile</label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
                        <input type="tel" placeholder="Optional" maxLength={10}
                          value={form.patientAltPhone}
                          onChange={(e) => set("patientAltPhone", e.target.value.replace(/\D/g,""))}
                          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--text-secondary)]">Address</label>
                    <div className="relative">
                      <MapPin size={13} className="absolute left-2.5 top-3 text-[var(--text-secondary)]"/>
                      <textarea rows={2} placeholder="Street, City, PIN…"
                        value={form.patientAddress}
                        onChange={(e) => set("patientAddress", e.target.value)}
                        className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                    </div>
                  </div>

                  {/* ── Step 3: ID Proof ── */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] px-3 py-2 mt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">ID Proof</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-32 shrink-0">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">ID Type</label>
                      <select value={form.patientIdType} onChange={(e) => set("patientIdType", e.target.value)}
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]">
                        {["Aadhaar","PAN","ABHA","Voter ID","Passport","Driving Licence"].map((id) => <option key={id}>{id}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">ID Number</label>
                      <input type="text" placeholder="xxxx-xxxx-xxxx"
                        value={form.patientIdNumber}
                        onChange={(e) => set("patientIdNumber", e.target.value)}
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                    </div>
                  </div>

                  {/* ── Step 4: Emergency Contact ── */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] px-3 py-2 mt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Emergency Contact</p>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Name</label>
                      <input type="text" placeholder="Guardian / Relative"
                        value={form.emergencyContactName}
                        onChange={(e) => set("emergencyContactName", e.target.value)}
                        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs text-[var(--text-secondary)]">Mobile</label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"/>
                        <input type="tel" placeholder="10-digit" maxLength={10}
                          value={form.emergencyContactPhone}
                          onChange={(e) => set("emergencyContactPhone", e.target.value.replace(/\D/g,""))}
                          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Step 5: Clinical ── */}
                  <div className="rounded-lg bg-[var(--surface-sunken)] px-3 py-2 mt-1">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Clinical Notes</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs text-[var(--text-secondary)]">Known Allergies</label>
                    <div className="relative">
                      <ShieldAlert size={13} className="absolute left-2.5 top-3 text-[var(--warning-fg)]"/>
                      <textarea rows={2} placeholder="e.g. Penicillin, Sulfa drugs, Latex…"
                        value={form.knownAllergies}
                        onChange={(e) => set("knownAllergies", e.target.value)}
                        className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-8 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* Show age/sex once patient selected from search */}
              {!form.isWalkIn && form.patientAge && (
                <div className="mt-2 flex gap-2">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs text-[var(--text-secondary)]">Age</label>
                    <input
                      type="number"
                      min={1} max={120}
                      value={form.patientAge}
                      onChange={(e) => set("patientAge", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 block text-xs text-[var(--text-secondary)]">Sex</label>
                    <div className="flex gap-1">
                      {(["M", "F", "O"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => set("patientSex", s)}
                          className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${form.patientSex === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}
                        >
                          {s === "O" ? "Other" : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <hr className="border-[var(--border-default)]" />

            {/* ── Date & Time ──────────────────────────────────────── */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Calendar size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Date & Time</p>
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-xs text-[var(--text-secondary)]">Date *</label>
                <input
                  type="date"
                  value={form.date}
                  min="2026-06-10"
                  onChange={(e) => { set("date", e.target.value); set("time", ""); }}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                />
                {errors.date && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.date}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs text-[var(--text-secondary)]">Time slot *</label>
                {errors.time && <p className="mb-1 text-xs text-[var(--critical-fg)]">{errors.time}</p>}
                <div className="grid grid-cols-4 gap-1.5 max-h-44 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => {
                    const booked = bookedSlots.has(slot);
                    const selected = form.time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => set("time", slot)}
                        className={[
                          "rounded-md py-1.5 text-xs font-medium transition-colors",
                          booked
                            ? "cursor-not-allowed bg-[var(--surface-sunken)] text-[var(--text-secondary)] opacity-40 line-through"
                            : selected
                            ? "bg-[var(--action-primary)] text-white"
                            : "border border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-primary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)]",
                        ].join(" ")}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--action-primary)]" />Selected</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[var(--surface-sunken)] border border-[var(--border-default)] opacity-40" />Booked</span>
                </div>
              </div>
            </section>

            <hr className="border-[var(--border-default)]" />

            {/* ── Visit type ───────────────────────────────────────── */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Clock size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Visit Type</p>
              </div>
              <div className="flex gap-2">
                {(["OPD", "Tele", "Follow-up"] as ApptType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("type", t)}
                    className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors ${form.type === t ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-[var(--border-default)]" />

            {/* ── Doctor ───────────────────────────────────────────── */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Stethoscope size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Doctor</p>
              </div>
              <select
                value={form.doctorIndex}
                onChange={(e) => set("doctorIndex", Number(e.target.value))}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              >
                {DOCTORS.map((d, i) => (
                  <option key={i} value={i}>{d.name} — {d.dept}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                Department: <span className="font-medium text-[var(--text-primary)]">{selectedDoctor.dept}</span>
              </p>
            </section>

            <hr className="border-[var(--border-default)]" />

            {/* ── Chief complaint ──────────────────────────────────── */}
            <section>
              <div className="mb-3 flex items-center gap-2">
                <FileText size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Chief Complaint <span className="normal-case font-normal">(optional)</span></p>
              </div>
              <textarea
                rows={3}
                placeholder="Brief reason for visit…"
                value={form.chiefComplaint}
                onChange={(e) => set("chiefComplaint", e.target.value)}
                className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              />
            </section>
          </div>

          {/* Footer actions */}
          <div className="shrink-0 border-t border-[var(--border-default)] px-5 py-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
            >
              {submitted ? "Booking…" : "Book Appointment"}
            </button>
          </div>
        </form>
    </Drawer>
  );
}
