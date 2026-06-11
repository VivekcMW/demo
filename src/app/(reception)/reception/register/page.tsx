"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Phone, Heart, ChevronRight, ChevronLeft,
  Check, UserPlus, Printer, Copy,
} from "lucide-react";
import { usePatientStore } from "@/store/usePatientStore";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";

// ── Types ─────────────────────────────────────────────────────────────────────

type Sex = "M" | "F" | "O";
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "Unknown";

interface Step1 { name: string; dob: string; age: string; sex: Sex | ""; abhaId: string; aadhaar: string; }
interface Step2 { mobile: string; altPhone: string; email: string; addressLine: string; city: string; pincode: string; emergencyName: string; emergencyPhone: string; }
interface Step3 { bloodGroup: BloodGroup | ""; allergies: string; chronicConditions: string[]; insuranceName: string; insuranceNo: string; referringDoctor: string; }

const BLOOD_GROUPS: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];
const CHRONIC_OPTIONS = ["Diabetes", "Hypertension", "Asthma", "COPD", "Heart Disease", "Kidney Disease", "Thyroid", "Arthritis", "Cancer", "Epilepsy", "Depression", "None"];

function generateUHID(): string {
  const now = new Date();
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const seq = String(Math.floor(Math.random() * 90000) + 10000);
  return `UHID-${ym}-${seq}`;
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = [
    { icon: User,  label: "Identity" },
    { icon: Phone, label: "Contact" },
    { icon: Heart, label: "Clinical" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const done   = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${done ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : active ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
                {done ? <Check size={16} /> : <s.icon size={15} />}
              </div>
              <span className={`text-[10px] font-medium ${active ? "text-[var(--action-primary)]" : "text-[var(--text-secondary)]"}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mb-4 h-0.5 w-16 transition-all ${i < current ? "bg-[var(--action-primary)]" : "bg-[var(--border-default)]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Form helpers ──────────────────────────────────────────────────────────────

const inputCls = (error?: boolean) =>
  `w-full rounded-lg border ${error ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"} bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] placeholder:text-[var(--text-secondary)]`;

const labelCls = "block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className={labelCls}>{label}{required && <span className="text-[var(--critical-fg)] ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

// ── Step 1: Identity ──────────────────────────────────────────────────────────

function IdentityStep({ data, onChange }: { data: Step1; onChange: (d: Partial<Step1>) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Full Name" required>
          <input className={inputCls(!data.name)} placeholder="e.g. Ravi Kumar Sharma" value={data.name} onChange={(e) => onChange({ name: e.target.value })} />
        </Field>
      </div>
      <Field label="Date of Birth">
        <input type="date" className={inputCls()} value={data.dob} onChange={(e) => onChange({ dob: e.target.value, age: e.target.value ? String(new Date().getFullYear() - new Date(e.target.value).getFullYear()) : data.age })} />
      </Field>
      <Field label="Age (years)" required>
        <input type="number" min={0} max={150} className={inputCls(!data.age)} placeholder="e.g. 35" value={data.age} onChange={(e) => onChange({ age: e.target.value })} />
      </Field>
      <Field label="Sex / Gender" required>
        <div className="flex gap-2">
          {(["M", "F", "O"] as const).map((s) => (
            <button key={s} type="button" onClick={() => onChange({ sex: s })}
              className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-colors ${data.sex === s ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
              {s === "M" ? "Male" : s === "F" ? "Female" : "Other"}
            </button>
          ))}
        </div>
      </Field>
      <Field label="ABHA ID">
        <input className={inputCls()} placeholder="14-digit ABHA number" value={data.abhaId} onChange={(e) => onChange({ abhaId: e.target.value })} maxLength={17} />
      </Field>
      <Field label="Aadhaar (last 4 digits)">
        <input className={inputCls()} placeholder="XXXX" maxLength={4} value={data.aadhaar} onChange={(e) => onChange({ aadhaar: e.target.value.replace(/\D/g, "").slice(0, 4) })} />
      </Field>
    </div>
  );
}

// ── Step 2: Contact ───────────────────────────────────────────────────────────

function ContactStep({ data, onChange }: { data: Step2; onChange: (d: Partial<Step2>) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Mobile Number" required>
        <input type="tel" className={inputCls(!data.mobile)} placeholder="10-digit mobile" maxLength={10} value={data.mobile} onChange={(e) => onChange({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
      </Field>
      <Field label="Alternate Phone">
        <input type="tel" className={inputCls()} placeholder="Optional" value={data.altPhone} onChange={(e) => onChange({ altPhone: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Email">
          <input type="email" className={inputCls()} placeholder="patient@email.com" value={data.email} onChange={(e) => onChange({ email: e.target.value })} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Address">
          <input className={inputCls()} placeholder="House no, Street, Area" value={data.addressLine} onChange={(e) => onChange({ addressLine: e.target.value })} />
        </Field>
      </div>
      <Field label="City">
        <input className={inputCls()} placeholder="e.g. Bengaluru" value={data.city} onChange={(e) => onChange({ city: e.target.value })} />
      </Field>
      <Field label="Pincode">
        <input className={inputCls()} placeholder="6-digit PIN" maxLength={6} value={data.pincode} onChange={(e) => onChange({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} />
      </Field>
      <Field label="Emergency Contact Name">
        <input className={inputCls()} placeholder="Contact person name" value={data.emergencyName} onChange={(e) => onChange({ emergencyName: e.target.value })} />
      </Field>
      <Field label="Emergency Contact Phone">
        <input type="tel" className={inputCls()} placeholder="10-digit mobile" maxLength={10} value={data.emergencyPhone} onChange={(e) => onChange({ emergencyPhone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
      </Field>
    </div>
  );
}

// ── Step 3: Clinical ──────────────────────────────────────────────────────────

function ClinicalStep({ data, onChange }: { data: Step3; onChange: (d: Partial<Step3>) => void }) {
  const toggleCond = (cond: string) => {
    const curr = data.chronicConditions;
    onChange({ chronicConditions: curr.includes(cond) ? curr.filter((c) => c !== cond) : [...curr, cond] });
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Blood Group">
        <select className={inputCls()} value={data.bloodGroup} onChange={(e) => onChange({ bloodGroup: e.target.value as BloodGroup })}>
          <option value="">Select blood group</option>
          {BLOOD_GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </Field>
      <Field label="Known Allergies">
        <input className={inputCls()} placeholder="e.g. Penicillin, Dust" value={data.allergies} onChange={(e) => onChange({ allergies: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Chronic Conditions">
          <div className="flex flex-wrap gap-2 mt-1">
            {CHRONIC_OPTIONS.map((c) => (
              <button key={c} type="button" onClick={() => toggleCond(c)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${data.chronicConditions.includes(c) ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                {c}
              </button>
            ))}
          </div>
        </Field>
      </div>
      <Field label="Insurance / TPA">
        <input className={inputCls()} placeholder="e.g. Star Health, CGHS" value={data.insuranceName} onChange={(e) => onChange({ insuranceName: e.target.value })} />
      </Field>
      <Field label="Policy / TPA Number">
        <input className={inputCls()} placeholder="Insurance policy number" value={data.insuranceNo} onChange={(e) => onChange({ insuranceNo: e.target.value })} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Referring Doctor (if any)">
          <input className={inputCls()} placeholder="e.g. Dr. R. Mehta, Apollo" value={data.referringDoctor} onChange={(e) => onChange({ referringDoctor: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────

function SuccessScreen({ uhid, patientName, onNew }: { uhid: string; patientName: string; onNew: () => void }) {
  const { toast } = useToast();
  const router = useRouter();
  const copy = () => { navigator.clipboard.writeText(uhid); toast("UHID copied to clipboard"); };

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--normal-bg)]">
        <Check size={32} className="text-[var(--normal-fg)]" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Patient Registered!</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{patientName} has been successfully registered.</p>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-[var(--action-primary)] bg-[var(--action-subtle)] px-8 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">Unique Health ID</p>
        <p className="text-2xl font-bold tabular-nums tracking-widest text-[var(--action-primary)]">{uhid}</p>
        <button onClick={copy} className="flex items-center gap-1.5 text-xs text-[var(--action-primary)] hover:underline mt-1">
          <Copy size={12} /> Copy UHID
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => window.print()} className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
          <Printer size={15} /> Print Patient Card
        </button>
        <button onClick={() => router.push(`/reception/appointments/new?uhid=${uhid}&name=${encodeURIComponent(patientName)}`)}
          className="flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
          Book Appointment
        </button>
        <button onClick={onNew} className="flex items-center gap-2 rounded-lg border border-[var(--action-primary)] px-4 py-2 text-sm font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
          <UserPlus size={15} /> Register Another
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const emptyStep1: Step1 = { name: "", dob: "", age: "", sex: "", abhaId: "", aadhaar: "" };
const emptyStep2: Step2 = { mobile: "", altPhone: "", email: "", addressLine: "", city: "", pincode: "", emergencyName: "", emergencyPhone: "" };
const emptyStep3: Step3 = { bloodGroup: "", allergies: "", chronicConditions: [], insuranceName: "", insuranceNo: "", referringDoctor: "" };

export default function RegisterPage() {
  const addPatient  = usePatientStore((s) => s.addPatient);
  const { toast }   = useToast();

  const [step, setStep]   = useState(0);
  const [s1, setS1]       = useState<Step1>(emptyStep1);
  const [s2, setS2]       = useState<Step2>(emptyStep2);
  const [s3, setS3]       = useState<Step3>(emptyStep3);
  const [submitted, setSubmitted] = useState(false);
  const [newUHID, setNewUHID]     = useState("");

  const canNext = () => {
    if (step === 0) return !!s1.name.trim() && !!s1.age && !!s1.sex;
    if (step === 1) return !!s2.mobile && s2.mobile.length === 10;
    return true;
  };

  const handleSubmit = () => {
    const uhid = generateUHID();
    setNewUHID(uhid);

    addPatient({
      name: s1.name.trim(),
      dob: s1.dob || undefined,
      age: parseInt(s1.age) || 0,
      sex: s1.sex as "M" | "F" | "O",
      phone: s2.mobile,
      altPhone: s2.altPhone || undefined,
      address: [s2.addressLine, s2.city, s2.pincode].filter(Boolean).join(", ") || undefined,
      bloodGroup: (s3.bloodGroup as "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | undefined) || undefined,
      emergencyContactName: s2.emergencyName || undefined,
      emergencyContactPhone: s2.emergencyPhone || undefined,
    });

    toast(`${s1.name} registered with UHID ${uhid}`);
    setSubmitted(true);
  };

  const handleNew = () => {
    setStep(0); setS1(emptyStep1); setS2(emptyStep2); setS3(emptyStep3);
    setSubmitted(false); setNewUHID("");
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg">
        <PageHeader title="Register Patient" subtitle="New patient registration" />
        <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8">
          <SuccessScreen uhid={newUHID} patientName={s1.name} onNew={handleNew} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pb-8">
      <PageHeader
        title="Register Patient"
        subtitle="Create a new patient record and generate UHID"
      />

      <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 sm:p-8">
        <StepIndicator current={step} total={3} />

        {/* UHID preview */}
        <div className="mb-6 flex items-center justify-between rounded-lg bg-[var(--action-subtle)] px-4 py-2.5">
          <span className="text-xs font-medium text-[var(--text-secondary)]">UHID will be auto-generated on submit</span>
          <span className="rounded-full bg-[var(--action-primary)] px-2.5 py-0.5 text-[10px] font-bold text-white">Step {step + 1} of 3</span>
        </div>

        {step === 0 && <IdentityStep data={s1} onChange={(d) => setS1((p) => ({ ...p, ...d }))} />}
        {step === 1 && <ContactStep  data={s2} onChange={(d) => setS2((p) => ({ ...p, ...d }))} />}
        {step === 2 && <ClinicalStep data={s3} onChange={(d) => setS3((p) => ({ ...p, ...d }))} />}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => setStep((p) => p - 1)}
            disabled={step === 0}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {step < 2 ? (
            <button
              onClick={() => setStep((p) => p + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]"
            >
              <UserPlus size={15} /> Register Patient
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
