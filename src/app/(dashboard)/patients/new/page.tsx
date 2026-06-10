"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePatientStore } from "@/store/usePatientStore";
import type { Sex, BloodGroup } from "@/data/seedPatients";
import { DEPARTMENTS } from "@/data/seedUsers";
import { UserPlus, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const BLOOD_GROUPS: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];
const ID_TYPES = ["Aadhaar", "PAN", "ABHA", "Voter ID", "Passport", "Driving Licence"];
const ALLERGIES_COMMON = ["Penicillin", "Sulfa drugs", "Aspirin", "NSAIDs", "Latex", "Dust", "Pollen", "Peanuts", "Shellfish", "Contrast dye"];

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--text-secondary)]">
        {label} {required && <span className="text-[var(--critical-fg)]">*</span>}
      </label>
      {children}
    </div>
  );
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none ${props.className ?? ""}`} />;
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none ${props.className ?? ""}`} />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full border-b border-[var(--border-default)] pb-2 pt-2">
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{children}</h3>
    </div>
  );
}

export default function NewPatientPage() {
  const router = useRouter();
  const addPatient = usePatientStore((s) => s.addPatient);

  // Core fields
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState<Sex>("M");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("Unknown");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dept, setDept] = useState("General Medicine");

  // ID proof
  const [idType, setIdType] = useState("Aadhaar");
  const [idNumber, setIdNumber] = useState("");
  const [abhaId, setAbhaId] = useState("");

  // Emergency contact
  const [emgName, setEmgName] = useState("");
  const [emgPhone, setEmgPhone] = useState("");

  // Insurance
  const [insProvider, setInsProvider] = useState("");
  const [insPolicyNo, setInsPolicyNo] = useState("");
  const [insCoverage, setInsCoverage] = useState("");
  const [insValid, setInsValid] = useState("");

  // Allergies
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState("");

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Compute age from DOB
  function calcAge(dob: string): number {
    if (!dob) return 0;
    const diff = new Date().getTime() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  function toggleAllergy(a: string) {
    setSelectedAllergies((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  }

  function addCustomAllergy() {
    const a = customAllergy.trim();
    if (a && !selectedAllergies.includes(a)) setSelectedAllergies((prev) => [...prev, a]);
    setCustomAllergy("");
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!dob) e.dob = "Date of birth is required";
    if (dob && calcAge(dob) < 0) e.dob = "Invalid date of birth";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (phone && !/^\d{10}$/.test(phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (altPhone && !/^\d{10}$/.test(altPhone)) e.altPhone = "Enter a valid 10-digit number";
    if (emgPhone && !/^\d{10}$/.test(emgPhone)) e.emgPhone = "Enter a valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const patient = addPatient({
      name: name.trim(),
      age: calcAge(dob),
      dob,
      sex,
      bloodGroup,
      phone,
      altPhone: altPhone || undefined,
      address: address || undefined,
      idProofType: idType || undefined,
      idProofNumber: idNumber || undefined,
      emergencyContactName: emgName || undefined,
      emergencyContactPhone: emgPhone || undefined,
      allergies: selectedAllergies,
    });
    setSubmitted(true);
    setTimeout(() => router.push(`/patients/${patient.id}`), 1000);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--normal-bg)] mb-4">
          <CheckCircle2 size={32} className="text-[var(--normal-fg)]" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Patient registered successfully</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Redirecting to patient record…</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/patients" className="rounded-lg p-2 hover:bg-[var(--surface-sunken)] text-[var(--text-secondary)]">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">New Patient Registration</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Register a new OPD / walk-in patient</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Personal Information ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <Field label="Full Name" required>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Anil Kumar Sharma" />
                {errors.name && <p className="text-xs text-[var(--critical-fg)] mt-1">{errors.name}</p>}
              </Field>
            </div>
            <Field label="Date of Birth" required>
              <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} max={new Date().toISOString().slice(0,10)} />
              {errors.dob && <p className="text-xs text-[var(--critical-fg)] mt-1">{errors.dob}</p>}
              {dob && <p className="text-xs text-[var(--text-secondary)] mt-1">Age: {calcAge(dob)} years</p>}
            </Field>
            <Field label="Sex" required>
              <Select value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </Select>
            </Field>
            <Field label="Blood Group">
              <Select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}>
                {BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}
              </Select>
            </Field>
            <Field label="Primary Department">
              <Select value={dept} onChange={(e) => setDept(e.target.value)}>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </Select>
            </Field>
            <Field label="Occupation">
              <Input value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Teacher" />
            </Field>
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Mobile Number" required>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit number" maxLength={10} inputMode="numeric" />
              {errors.phone && <p className="text-xs text-[var(--critical-fg)] mt-1">{errors.phone}</p>}
            </Field>
            <Field label="Alternate Number">
              <Input value={altPhone} onChange={(e) => setAltPhone(e.target.value)} placeholder="Optional" maxLength={10} inputMode="numeric" />
              {errors.altPhone && <p className="text-xs text-[var(--critical-fg)] mt-1">{errors.altPhone}</p>}
            </Field>
            <div className="sm:col-span-2 lg:col-span-1">
              <Field label="Address">
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City, State" />
              </Field>
            </div>
          </div>
        </div>

        {/* ── ID Proof & ABHA ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Identity & ABHA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="ID Proof Type">
              <Select value={idType} onChange={(e) => setIdType(e.target.value)}>
                {ID_TYPES.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="ID Proof Number">
              <Input value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder={idType === "Aadhaar" ? "XXXX XXXX XXXX" : "Document number"} />
            </Field>
            <Field label="ABHA ID (optional)">
              <Input value={abhaId} onChange={(e) => setAbhaId(e.target.value)} placeholder="14-digit ABHA number" inputMode="numeric" maxLength={14} />
            </Field>
          </div>
        </div>

        {/* ── Emergency Contact ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Contact Name">
              <Input value={emgName} onChange={(e) => setEmgName(e.target.value)} placeholder="e.g. Sunita Sharma (Spouse)" />
            </Field>
            <Field label="Contact Phone">
              <Input value={emgPhone} onChange={(e) => setEmgPhone(e.target.value)} placeholder="10-digit number" maxLength={10} inputMode="numeric" />
              {errors.emgPhone && <p className="text-xs text-[var(--critical-fg)] mt-1">{errors.emgPhone}</p>}
            </Field>
          </div>
        </div>

        {/* ── Insurance ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Insurance (optional)</h2>
          <p className="text-xs text-[var(--text-secondary)] mb-4">Leave blank if patient is self-paying</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Provider">
              <Input value={insProvider} onChange={(e) => setInsProvider(e.target.value)} placeholder="e.g. Star Health" />
            </Field>
            <Field label="Policy Number">
              <Input value={insPolicyNo} onChange={(e) => setInsPolicyNo(e.target.value)} placeholder="Policy / Member ID" />
            </Field>
            <Field label="Coverage Type">
              <Input value={insCoverage} onChange={(e) => setInsCoverage(e.target.value)} placeholder="e.g. Family Floater" />
            </Field>
            <Field label="Valid Until">
              <Input type="date" value={insValid} onChange={(e) => setInsValid(e.target.value)} />
            </Field>
          </div>
        </div>

        {/* ── Allergies ── */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Known Allergies</h2>
          <p className="text-xs text-[var(--text-secondary)] mb-4">Select all that apply or add custom</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ALLERGIES_COMMON.map((a) => (
              <button key={a} type="button" onClick={() => toggleAllergy(a)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${selectedAllergies.includes(a) ? "border-[var(--critical-fg)] bg-[var(--critical-bg)] text-[var(--critical-fg)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--critical-fg)]"}`}>
                {a}
              </button>
            ))}
          </div>
          {selectedAllergies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedAllergies.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 rounded-full bg-[var(--critical-bg)] border border-[var(--critical-fg)]/30 px-2.5 py-1 text-xs font-medium text-[var(--critical-fg)]">
                  {a}
                  <button type="button" onClick={() => toggleAllergy(a)} className="ml-0.5 hover:opacity-70">×</button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input value={customAllergy} onChange={(e) => setCustomAllergy(e.target.value)} placeholder="Add custom allergy…" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomAllergy(); } }} className="max-w-xs" />
            <button type="button" onClick={addCustomAllergy} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Add</button>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end gap-3">
          <Link href="/patients" className="rounded-xl border border-[var(--border-default)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            Cancel
          </Link>
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <UserPlus size={15} /> Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}
