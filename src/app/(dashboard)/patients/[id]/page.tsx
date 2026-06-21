"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePatientStore } from "@/store/usePatientStore";
import type {
  Patient, LabResult, Visit, Medication, Document as PatientDoc,
} from "@/data/seedPatients";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { NewOrderDrawer } from "@/components/orders/NewOrderDrawer";
import { NewExaminationDrawer } from "@/components/examination/NewExaminationDrawer";
import { useExaminationStore } from "@/store/useExaminationStore";
import { useIPDStore } from "@/store/useIPDStore";
import { useBillingStore } from "@/store/useBillingStore";
import { usePharmacyStore } from "@/store/usePharmacyStore";
import type { OrderStatus, OrderType, Order } from "@/data/seedOrders";
import {
  ArrowLeft, ShieldAlert, HeartPulse, FlaskConical, Pill,
  FolderOpen, FileText, AlertTriangle, CheckCircle2, Clock,
  ChevronDown, ChevronUp, Building2, Calendar, Activity,
  Phone, User, Thermometer, Wind, Weight, Ruler,
  ClipboardList, ScanLine, UserCheck, Stethoscope, UtensilsCrossed, Plus, ChevronRight,
  ShieldCheck, PenLine, BedDouble, Receipt, Syringe, Eye, Lock,
} from "lucide-react";
import { PdfDownloadButton } from "@/components/ui/PdfActions";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function LabFlagBadge({ flag }: { flag?: string }) {
  if (!flag || flag === "N") return (
    <span className="inline-flex rounded-full bg-[var(--normal-bg)] px-2 py-0.5 text-xs font-medium text-[var(--normal-fg)]">Normal</span>
  );
  const isCrit = flag === "HH" || flag === "LL";
  const cls = isCrit
    ? "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-semibold"
    : "bg-[var(--warning-bg)] text-[var(--warning-fg)]";
  const label = flag === "HH" ? "▲▲ Crit High" : flag === "LL" ? "▼▼ Crit Low" : flag === "H" ? "▲ High" : "▼ Low";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${cls}`}>{label}</span>;
}

function VisitStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Completed":        "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    "Follow-up Needed": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    "Admitted":         "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    "Discharged":       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
      {status}
    </span>
  );
}

const COND_CLS: Record<string, string> = {
  CAD:         "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  CKD:         "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  COPD:        "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  DM:          "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  HTN:         "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Epilepsy:    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Asthma:      "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Hypothyroid: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Arthritis:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Obesity:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

function avatarColor(name: string) {
  const colors = [
    "bg-[var(--action-primary)]", "bg-[var(--info-fg)]",
    "bg-[var(--warning-fg)]",    "bg-[var(--critical-fg)]",
    "bg-[var(--normal-fg)]",
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return colors[h % colors.length];
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ── Left Clinical Sidebar ─────────────────────────────────────────────────────

function SidebarSection({ title, icon, children }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
        <span className="text-[var(--action-primary)]">{icon}</span>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ClinicalSidebar({ patient }: { patient: Patient }) {
  const v = patient.vitals;
  const activeMeds = patient.medications.filter((m) => m.active);

  const vitalRows = v ? [
    { icon: <Activity size={13} />,    label: "Blood Pressure", value: v.bp ? `${v.bp} mmHg` : "—",     warn: v.bp ? parseInt(v.bp) > 140 : false },
    { icon: <HeartPulse size={13} />,  label: "Pulse",          value: v.pulse ? `${v.pulse} bpm` : "—", warn: false },
    { icon: <Wind size={13} />,        label: "SpO\u2082",       value: v.spo2 ? `${v.spo2}%` : "—",      warn: (v.spo2 ?? 100) < 94 },
    { icon: <Thermometer size={13} />, label: "Temperature",    value: v.temp ? `${v.temp} \u00b0C` : "—", warn: (v.temp ?? 37) > 38 },
    { icon: <Weight size={13} />,      label: "Weight",         value: v.weight ? `${v.weight} kg` : "—", warn: false },
    { icon: <Ruler size={13} />,       label: "BMI",            value: v.bmi ? `${v.bmi}` : "—",          warn: (v.bmi ?? 0) > 30 },
  ] : [];

  return (
    <aside className="w-full lg:w-72 lg:shrink-0 space-y-3 lg:sticky lg:top-4 lg:self-start">

      {/* Vitals */}
      <SidebarSection title="Latest Vitals" icon={<Activity size={13} />}>
        {!v ? (
          <p className="text-xs text-[var(--text-secondary)]">No vitals recorded</p>
        ) : (
          <>
            <p className="mb-3 text-[10px] text-[var(--text-secondary)]">Recorded {fmtDate(v.recordedAt)}</p>
            <div className="space-y-2">
              {vitalRows.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                    row.warn
                      ? "bg-[var(--warning-bg)] border border-[var(--warning-fg)]/20"
                      : "bg-[var(--surface-sunken)]"
                  }`}
                >
                  <span className={`flex items-center gap-1.5 text-xs ${row.warn ? "text-[var(--warning-fg)]" : "text-[var(--text-secondary)]"}`}>
                    {row.icon} {row.label}
                  </span>
                  <span className={`text-sm font-bold tabular-nums ${row.warn ? "text-[var(--warning-fg)]" : "text-[var(--text-primary)]"}`}>
                    {row.value}{row.warn && <span className="ml-1 text-[10px]">&#9888;</span>}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </SidebarSection>

      {/* Allergies */}
      <SidebarSection title="Allergies" icon={<ShieldAlert size={13} />}>
        {patient.allergies.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-[var(--normal-fg)]">
            <CheckCircle2 size={13} /> No known allergies
          </div>
        ) : (
          <div className="space-y-1.5">
            {patient.allergies.map((a) => (
              <div
                key={a}
                className="flex items-center gap-2 rounded-lg border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-3 py-2"
              >
                <ShieldAlert size={12} className="shrink-0 text-[var(--critical-fg)]" />
                <span className="text-sm font-semibold text-[var(--critical-fg)]">{a}</span>
              </div>
            ))}
          </div>
        )}
      </SidebarSection>

      {/* Active Conditions */}
      <SidebarSection title="Active Conditions" icon={<HeartPulse size={13} />}>
        {patient.chronicConditions.length === 0 ? (
          <p className="text-xs text-[var(--text-secondary)]">No chronic conditions on record</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {patient.chronicConditions.map((c) => (
              <span
                key={c}
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${COND_CLS[c] ?? "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </SidebarSection>

      {/* Active Medications */}
      <SidebarSection title={`Active Meds (${activeMeds.length})`} icon={<Pill size={13} />}>
        {activeMeds.length === 0 ? (
          <p className="text-xs text-[var(--text-secondary)]">No active prescriptions</p>
        ) : (
          <div className="space-y-2">
            {activeMeds.map((m) => (
              <div key={m.id} className="flex items-start gap-2">
                <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--action-primary)]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{m.drug}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{m.dose} &middot; {m.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </SidebarSection>

      {/* Contact + Emergency */}
      <SidebarSection title="Contact" icon={<Phone size={13} />}>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[var(--text-secondary)]">Mobile</span>
            <span className="font-medium text-[var(--text-primary)]">{patient.phone}</span>
          </div>
          {patient.altPhone && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-secondary)]">Alt. No</span>
              <span className="font-medium text-[var(--text-primary)]">{patient.altPhone}</span>
            </div>
          )}
          {(patient.emergencyContactName || patient.emergencyContactPhone) && (
            <div className="mt-2 border-t border-[var(--border-default)] pt-2">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Emergency</p>
              <p className="font-medium text-[var(--text-primary)]">{patient.emergencyContactName || "—"}</p>
              <p className="text-xs text-[var(--text-secondary)]">{patient.emergencyContactPhone || "—"}</p>
            </div>
          )}
        </div>
      </SidebarSection>

      {/* Insurance */}
      {patient.insurance && (
        <SidebarSection title="Insurance" icon={<Building2 size={13} />}>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-[var(--text-primary)]">{patient.insurance.provider}</p>
            <p className="text-xs text-[var(--text-secondary)]">Policy: {patient.insurance.policyNumber}</p>
            <p className="text-xs text-[var(--text-secondary)]">{patient.insurance.coverageType}</p>
            <div className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              new Date(patient.insurance.validUntil) > new Date()
                ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"
            }`}>
              Valid till {fmtDate(patient.insurance.validUntil)}
            </div>
          </div>
        </SidebarSection>
      )}

    </aside>
  );
}

// ── Right Panel Tabs ──────────────────────────────────────────────────────────

function VisitsTab({ visits }: { visits: Visit[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (visits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Clock size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
        <p className="font-medium text-[var(--text-primary)]">No visits recorded</p>
      </div>
    );
  }

  const sorted = [...visits].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-2">
      {sorted.map((v) => (
        <div key={v.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <button
            className="flex w-full items-start gap-4 px-5 py-4 text-left hover:bg-[var(--surface-sunken)] transition-colors"
            onClick={() => setExpanded((e) => (e === v.id ? null : v.id))}
          >
            <div className="flex flex-col items-center text-center min-w-[44px]">
              <span className="text-lg font-bold tabular-nums text-[var(--action-primary)]">
                {new Date(v.date).getDate()}
              </span>
              <span className="text-[10px] uppercase text-[var(--text-secondary)]">
                {new Date(v.date).toLocaleString("en-IN", { month: "short", year: "2-digit" })}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{v.type}</span>
                <VisitStatusBadge status={v.status} />
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)] truncate">{v.chiefComplaint}</p>
              <p className="text-xs text-[var(--text-secondary)]">{v.doctor} &middot; {v.dept}</p>
            </div>
            <div className="shrink-0 text-[var(--text-secondary)]">
              {expanded === v.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </button>
          {expanded === v.id && (
            <div className="border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 space-y-1.5 text-sm">
              {v.diagnosis && (
                <p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Diagnosis </span>
                  <span className="text-[var(--text-primary)]">{v.diagnosis}</span>
                </p>
              )}
              {v.notes && (
                <p>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Notes </span>
                  <span className="text-[var(--text-primary)]">{v.notes}</span>
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function LabsTab({ labs }: { labs: LabResult[] }) {
  if (labs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FlaskConical size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
        <p className="font-medium text-[var(--text-primary)]">No lab results on record</p>
      </div>
    );
  }

  const sorted = [...labs].sort((a, b) => {
    const o: Record<string, number> = { HH: 0, LL: 0, H: 1, L: 1, N: 2 };
    const fa = o[a.flag ?? "N"] ?? 2;
    const fb = o[b.flag ?? "N"] ?? 2;
    return fa !== fb ? fa - fb : b.date.localeCompare(a.date);
  });

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
        <span>Test</span><span>Date</span><span>Value</span><span>Unit</span><span>Ref Range</span><span>Flag</span>
      </div>
      <div className="divide-y divide-[var(--border-default)]">
        {sorted.map((l) => (
          <div
            key={l.id}
            className={`grid grid-cols-2 gap-3 px-5 py-4 text-sm md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr] md:items-center md:gap-4 ${
              (l.flag === "HH" || l.flag === "LL") ? "bg-[var(--critical-bg)]" : ""
            }`}
          >
            <div className="col-span-2 md:col-span-1">
              <p className="font-medium text-[var(--text-primary)]">{l.testName}</p>
              <p className="text-xs text-[var(--text-secondary)]">By {l.orderedBy}</p>
            </div>
            <span className="text-[var(--text-secondary)]">{fmtDate(l.date)}</span>
            <span className="font-semibold text-[var(--text-primary)]">{l.value}</span>
            <span className="text-[var(--text-secondary)]">{l.unit || "—"}</span>
            <span className="text-[var(--text-secondary)]">{l.refRange}</span>
            <LabFlagBadge flag={l.flag} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MedList({ meds, label }: { meds: Medication[]; label: string }) {
  if (meds.length === 0) return null;
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</p>
      <div className="space-y-2">
        {meds.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 rounded-xl border border-[var(--border-default)] p-4 bg-[var(--surface-raised)] ${!m.active ? "opacity-60" : ""}`}>
            <div className={`mt-0.5 rounded-lg p-1.5 ${m.active ? "bg-[var(--action-subtle)] text-[var(--action-primary)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
              <Pill size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)]">{m.drug}</p>
              <p className="text-sm text-[var(--text-secondary)]">{m.dose} &middot; {m.frequency} &middot; {m.route}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Started {fmtDate(m.startDate)}{m.endDate ? ` \u00b7 Ended ${fmtDate(m.endDate)}` : ""} &middot; {m.prescribedBy}
              </p>
            </div>
            {m.active && (
              <span className="shrink-0 rounded-full bg-[var(--normal-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--normal-fg)]">Active</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MedsTab({ medications }: { medications: Medication[] }) {
  const active = medications.filter((m) => m.active);
  const past   = medications.filter((m) => !m.active);

  if (medications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Pill size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
        <p className="font-medium text-[var(--text-primary)]">No medications on record</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <MedList meds={active} label="Active Prescriptions" />
      <MedList meds={past}   label="Past Medications" />
    </div>
  );
}

// ── Tab: Meds & Pharmacy (merged) ────────────────────────────────────────────

function MedsPharmacyTab({ medications, rxHistory }: { medications: Medication[]; rxHistory: PrescriptionRx[] }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <Pill size={12} /> Medications
        </p>
        <MedsTab medications={medications} />
      </div>
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <Syringe size={12} /> Pharmacy Rx
        </p>
        <PharmacyTab rxHistory={rxHistory} />
      </div>
    </div>
  );
}

// ── Tab: Clinical (Examinations + Orders merged) ──────────────────────────────

function ClinicalTab({ patientId, patientName }: { patientId: string; patientName: string }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <FileText size={12} /> Examinations
        </p>
        <ExaminationsTab patientId={patientId} patientName={patientName} />
      </div>
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <ClipboardList size={12} /> Orders (CPOE)
        </p>
        <OrdersTab patientId={patientId} patientName={patientName} />
      </div>
    </div>
  );
}

// ── Tab: Admissions & Finance (IPD + Billing merged) ─────────────────────────

function FinanceTab({ admissions, bills }: { admissions: Admission[]; bills: Bill[] }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <BedDouble size={12} /> IPD Admissions
        </p>
        <IPDTab admissions={admissions} />
      </div>
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <Receipt size={12} /> Billing
        </p>
        <BillingTab bills={bills} />
      </div>
    </div>
  );
}

// ── Tab: Examinations ────────────────────────────────────────────────────────

const EXAM_STATUS_CLS: Record<string, string> = {
  "Draft":    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In Review":"bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Signed":   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Locked":   "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const EXAM_STATUS_ICON: Record<string, React.ReactNode> = {
  "Draft":    <PenLine size={11} />,
  "In Review":<Eye size={11} />,
  "Signed":   <ShieldCheck size={11} />,
  "Locked":   <Lock size={11} />,
};

function ExaminationsTab({ patientId, patientName }: { patientId: string; patientName: string }) {
  const getByPatient     = useExaminationStore((s) => s.getByPatient);
  const [newExamOpen, setNewExamOpen] = useState(false);
  const exams = getByPatient(patientId).sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  return (
    <div className="space-y-4">
      <NewExaminationDrawer
        open={newExamOpen}
        onClose={() => setNewExamOpen(false)}
        prefillPatientId={patientId}
        prefillPatientName={patientName}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{exams.length} examination{exams.length !== 1 ? "s" : ""} on record</p>
        <button
          onClick={() => setNewExamOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Plus size={13} /> New Examination
        </button>
      </div>
      {exams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
          <p className="font-medium text-[var(--text-primary)]">No examinations recorded</p>
          <button onClick={() => setNewExamOpen(true)} className="mt-2 text-sm text-[var(--action-primary)] underline">
            Start first examination
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/examination/${exam.id}`}
              className="group flex items-center gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--action-subtle)]">
                <FileText size={16} className="text-[var(--action-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[var(--action-primary)]">{exam.id}</span>
                  <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{exam.type}</span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${EXAM_STATUS_CLS[exam.status]}`}>
                    {EXAM_STATUS_ICON[exam.status]} {exam.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{exam.doctor} &middot; {exam.dept}</p>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {new Date(exam.startedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  {exam.subjective.chiefComplaint && ` · ${exam.subjective.chiefComplaint.slice(0, 60)}${exam.subjective.chiefComplaint.length > 60 ? "…" : ""}`}
                </p>
              </div>
              <ChevronRight size={13} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DocsTab({ documents }: { documents: PatientDoc[] }) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FolderOpen size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
        <p className="font-medium text-[var(--text-primary)]">No documents uploaded</p>
      </div>
    );
  }

  const docIconCls: Record<string, string> = {
    "ID Proof":          "text-[var(--info-fg)] bg-[var(--info-bg)]",
    "Insurance":         "text-[var(--normal-fg)] bg-[var(--normal-bg)]",
    "Lab Report":        "text-[var(--action-primary)] bg-[var(--action-subtle)]",
    "Prescription":      "text-[var(--warning-fg)] bg-[var(--warning-bg)]",
    "Discharge Summary": "text-[var(--critical-fg)] bg-[var(--critical-bg)]",
    "Other":             "text-[var(--text-secondary)] bg-[var(--surface-sunken)]",
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {documents.map((d) => (
        <div key={d.id} className="flex items-start gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
          <div className={`mt-0.5 rounded-lg p-2 ${docIconCls[d.type] ?? "text-[var(--text-secondary)] bg-[var(--surface-sunken)]"}`}>
            <FileText size={16} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">{d.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">{d.type}</p>
            <p className="text-xs text-[var(--text-secondary)]">{fmtDate(d.uploadedAt)} &middot; {d.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Orders ──────────────────────────────────────────────────────────────

const ORDER_TYPE_META: Record<OrderType, { icon: React.ReactNode; cls: string }> = {
  Lab:        { icon: <FlaskConical size={13} />,    cls: "bg-[var(--info-bg)] text-[var(--info-fg)]" },
  Medication: { icon: <Pill size={13} />,            cls: "bg-[var(--normal-bg)] text-[var(--normal-fg)]" },
  Imaging:    { icon: <ScanLine size={13} />,        cls: "bg-[var(--action-subtle)] text-[var(--action-primary)]" },
  Referral:   { icon: <UserCheck size={13} />,       cls: "bg-[var(--warning-bg)] text-[var(--warning-fg)]" },
  Procedure:  { icon: <Stethoscope size={13} />,     cls: "bg-[var(--critical-bg)] text-[var(--critical-fg)]" },
  Diet:       { icon: <UtensilsCrossed size={13} />, cls: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]" },
};

const ORDER_STATUS_CLS: Record<OrderStatus, string> = {
  Ordered:        "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged:   "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress":  "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:      "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:      "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function OrderGroup({ label, items }: { label: string; items: Order[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</p>
      <div className="space-y-2">
        {items.map((o) => {
          const meta = ORDER_TYPE_META[o.type];
          return (
            <Link
              key={o.id}
              href={`/orders/${o.id}`}
              className="group flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.cls}`}>
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{o.title}</span>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${ORDER_STATUS_CLS[o.status]}`}>{o.status}</span>
                  {o.priority === "STAT" && (
                    <span className="inline-flex rounded-full bg-[var(--critical-bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">STAT</span>
                  )}
                  {o.priority === "Urgent" && (
                    <span className="inline-flex rounded-full bg-[var(--warning-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">Urgent</span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{o.orderedBy} &middot; {fmtDateTime(o.orderedAt)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] text-[var(--text-secondary)]">{o.id}</span>
                <ChevronRight size={13} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function OrdersTab({ patientId, patientName }: { patientId: string; patientName: string }) {
  const getByPatient = useOrderStore((s) => s.getByPatient);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const orders = getByPatient(patientId).sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));

  const pending   = orders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled");
  const completed = orders.filter((o) => o.status === "Completed");
  const cancelled = orders.filter((o) => o.status === "Cancelled");

  return (
    <div className="space-y-5">
      <NewOrderDrawer
        open={newOrderOpen}
        onClose={() => setNewOrderOpen(false)}
        prefillPatientId={patientId}
        prefillPatientName={patientName}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-secondary)]">{orders.length} orders total</p>
        <button
          onClick={() => setNewOrderOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Plus size={13} /> New Order
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ClipboardList size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
          <p className="font-medium text-[var(--text-primary)]">No orders for this patient</p>
          <button onClick={() => setNewOrderOpen(true)} className="mt-2 text-sm text-[var(--action-primary)] underline">
            Place first order
          </button>
        </div>
      ) : (
        <>
          <OrderGroup label={`Active (${pending.length})`}   items={pending} />
          <OrderGroup label={`Completed (${completed.length})`} items={completed} />
          <OrderGroup label={`Cancelled (${cancelled.length})`} items={cancelled} />
        </>
      )}
    </div>
  );
}

// ── Tab: IPD History ──────────────────────────────────────────────────────────

import type { Admission } from "@/data/seedAdmissions";
import type { Bill } from "@/data/seedBills";
import type { PrescriptionRx } from "@/data/seedPharmacy";

function IPDTab({ admissions }: { admissions: Admission[] }) {
  const sorted = [...admissions].sort((a, b) => b.admittedAt.localeCompare(a.admittedAt));
  const STATUS_CLS: Record<string, string> = {
    Active:     "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Discharged: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Planned:    "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Transferred:"bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };
  if (sorted.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <BedDouble size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
      <p className="font-medium text-[var(--text-primary)]">No IPD admissions on record</p>
    </div>
  );
  return (
    <div className="space-y-3">
      {sorted.map((a) => (
        <Link key={a.id} href={`/ipd/${a.id}`} className="group flex items-start gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--info-bg)]">
            <BedDouble size={16} className="text-[var(--info-fg)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[var(--action-primary)]">{a.id}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[a.status] ?? ""}`}>{a.status}</span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Ward: {a.ward} · Bed: {a.bed}</p>
            <p className="text-xs text-[var(--text-secondary)]">Admitted: {fmtDate(a.admittedAt)}{a.status === "Discharged" ? ` · Exp. DC: ${fmtDate(a.expectedDischarge)}` : ""}</p>
            <p className="text-xs text-[var(--text-secondary)]">{a.attendingDoctor} · {a.admitDiagnosis}</p>
          </div>
          <ChevronRight size={13} className="mt-1 shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </div>
  );
}

// ── Tab: Billing ──────────────────────────────────────────────────────────────

function BillingTab({ bills }: { bills: Bill[] }) {
  const sorted = [...bills].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const STATUS_CLS: Record<string, string> = {
    Draft:            "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
    Pending:          "bg-[var(--info-bg)] text-[var(--info-fg)]",
    "Partially Paid": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Paid:             "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Overdue:          "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    Cancelled:        "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
    Waived:           "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  };
  const totalDue = bills.filter((b) => b.status === "Pending" || b.status === "Overdue").reduce((s, b) => s + b.amountDue, 0);
  if (sorted.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Receipt size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
      <p className="font-medium text-[var(--text-primary)]">No billing records</p>
    </div>
  );
  return (
    <div className="space-y-3">
      {totalDue > 0 && (
        <div className="rounded-xl border border-[var(--warning-fg)]/40 bg-[var(--warning-bg)] px-4 py-3 text-sm">
          <span className="font-semibold text-[var(--warning-fg)]">Outstanding balance: ₹{totalDue.toLocaleString("en-IN")}</span>
        </div>
      )}
      {sorted.map((b) => (
        <Link key={b.id} href={`/billing/${b.id}`} className="group flex items-start gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--action-subtle)]">
            <Receipt size={16} className="text-[var(--action-primary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[var(--action-primary)]">{b.id}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[b.status] ?? ""}`}>{b.status}</span>
              <span className="text-xs text-[var(--text-secondary)]">{b.category}</span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{fmtDate(b.createdAt)}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm font-semibold text-[var(--text-primary)]">₹{b.grandTotal.toLocaleString("en-IN")}</span>
              {b.amountDue > 0 && <span className="text-xs text-[var(--critical-fg)]">Due: ₹{b.amountDue.toLocaleString("en-IN")}</span>}
            </div>
          </div>
          <ChevronRight size={13} className="mt-1 shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </div>
  );
}

// ── Tab: Pharmacy ─────────────────────────────────────────────────────────────

function PharmacyTab({ rxHistory }: { rxHistory: PrescriptionRx[] }) {
  const sorted = [...rxHistory].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  const STATUS_CLS: Record<string, string> = {
    Pending:             "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Verified:            "bg-[var(--action-subtle)] text-[var(--action-primary)]",
    Dispensing:          "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Dispensed:           "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    "Partially Dispensed":"bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    "On Hold":           "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    Cancelled:           "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };
  if (sorted.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Syringe size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
      <p className="font-medium text-[var(--text-primary)]">No pharmacy records</p>
    </div>
  );
  return (
    <div className="space-y-3">
      {sorted.map((rx) => (
        <Link key={rx.id} href={`/pharmacy/${rx.id}`} className="group flex items-start gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--normal-bg)]">
            <Pill size={16} className="text-[var(--normal-fg)]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[var(--action-primary)]">{rx.id}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[rx.status] ?? ""}`}>{rx.status}</span>
              <span className="text-xs text-[var(--text-secondary)]">{rx.source}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">{rx.items.length} drug{rx.items.length !== 1 ? "s" : ""} · {rx.prescribedBy}</p>
            <p className="text-xs text-[var(--text-secondary)]">{fmtDate(rx.receivedAt)}</p>
          </div>
          <ChevronRight size={13} className="mt-1 shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </div>
  );
}

function DemographicsTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
          <User size={14} className="text-[var(--action-primary)]" /> Demographics
        </h3>
        <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          {([
            ["Date of Birth", fmtDate(patient.dob)],
            ["Sex",           patient.sex === "M" ? "Male" : patient.sex === "F" ? "Female" : "Other"],
            ["Blood Group",   patient.bloodGroup],
            ["UHID",          patient.uhid],
            ["ABHA ID",       patient.abhaId ?? "Not linked"],
            ["Occupation",    patient.occupation ?? "—"],
            ["Address",       patient.address],
            [patient.idProofType, patient.idProofNumber],
            ["Registered",    fmtDate(patient.registeredAt)],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label} className="flex flex-col gap-0.5 rounded-lg bg-[var(--surface-sunken)] p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</dt>
              <dd className="text-sm font-medium text-[var(--text-primary)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          <Calendar size={12} /> Visit History ({patient.visits.length})
        </p>
        <VisitsTab visits={patient.visits} />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const patient = usePatientStore((s) => s.getById(id));
  const router  = useRouter();
  const [activeTab, setActiveTab] = useState<"demographics" | "clinical" | "labs" | "meds" | "finance" | "docs">("clinical");

  const patientId = patient?.id ?? "";

  // Select raw arrays from Zustand (stable references) + memoize derived
  const orders = useOrderStore((s) => s.orders);
  const patientOrders = useMemo(() => orders.filter((o) => o.patientId === patientId), [orders, patientId]);
  const patientOrderCount = patientOrders.length;
  const patientPendingOrders = useMemo(() => patientOrders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled").length, [patientOrders]);

  const examinations = useExaminationStore((s) => s.examinations);
  const patientExams = useMemo(() => examinations.filter((e) => e.patientId === patientId), [examinations, patientId]);
  const examCount = patientExams.length;
  const examInProgress = useMemo(() => patientExams.filter((e) => e.status === "Draft").length, [patientExams]);

  const admissions = useIPDStore((s) => s.admissions);
  const ipdAdmissions = useMemo(() => admissions.filter((a) => a.patientId === patientId), [admissions, patientId]);
  const activeAdmission = useMemo(() => ipdAdmissions.find((a) => a.status === "Active"), [ipdAdmissions]);

  const allBills = useBillingStore((s) => s.bills);
  const bills = useMemo(() => allBills.filter((b) => b.patientId === patientId), [allBills, patientId]);
  const pendingBillTotal = useMemo(() => bills.filter((b) => b.status === "Pending" || b.status === "Overdue").reduce((s, b) => s + b.amountDue, 0), [bills]);

  const prescriptions = usePharmacyStore((s) => s.prescriptions);
  const rxHistory = useMemo(() => prescriptions.filter((r) => r.patientId === patientId), [prescriptions, patientId]);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">Patient not found</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">ID: {id}</p>
        <button
          onClick={() => router.push("/patients")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  const criticalLabCount = patient.labs.filter((l) => l.flag === "HH" || l.flag === "LL").length;
  const activeMedCount   = patient.medications.filter((m) => m.active).length;
  const sex = patient.sex === "M" ? "Male" : patient.sex === "F" ? "Female" : "Other";
  const activeRx = useMemo(() => rxHistory.filter((r) => r.status === "Pending" || r.status === "Verified" || r.status === "Dispensing").length, [rxHistory]);

  type Tab = "demographics" | "clinical" | "labs" | "meds" | "finance" | "docs";
  type TabDef = { id: Tab; label: string; icon: React.ReactNode; badge?: number; critical?: boolean };
  const TABS: TabDef[] = [
    { id: "demographics", label: "Info",                icon: <User size={13} /> },
    { id: "clinical",     label: "Clinical",            icon: <FileText size={13} />,
        badge: (examInProgress + patientPendingOrders) > 0 ? examInProgress + patientPendingOrders : (examCount + patientOrderCount) > 0 ? examCount + patientOrderCount : undefined },
    { id: "labs",         label: "Labs",                icon: <FlaskConical size={13} />, badge: criticalLabCount > 0 ? criticalLabCount : undefined, critical: criticalLabCount > 0 },
    { id: "meds",         label: "Meds & Pharmacy",     icon: <Pill size={13} />,
        badge: (activeMedCount + activeRx) > 0 ? activeMedCount + activeRx : undefined },
    { id: "finance",      label: "Admissions & Finance",icon: <Receipt size={13} />,
        badge: (ipdAdmissions.length + bills.length) > 0 ? ipdAdmissions.length + bills.length : undefined,
        critical: !!activeAdmission || pendingBillTotal > 0 },
    { id: "docs",         label: "Documents",           icon: <FolderOpen size={13} /> },
  ];

  return (
    <div className="space-y-5 pb-8">

      {/* ── Sticky patient identity header ──────────────────────────────────── */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-3 border-b border-[var(--border-default)]">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Patients</span>
          <span className="text-[var(--text-secondary)] mx-0.5">/</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{patient.name}</span>
        </div>

        {/* Identity strip */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white ${avatarColor(patient.name)}`}>
            {initials(patient.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{patient.name}</h1>
              {patient.allergies.length > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--critical-fg)]/30 bg-[var(--critical-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--critical-fg)]">
                  <ShieldAlert size={10} />
                  ALLERGY: {patient.allergies.join(", ")}
                </span>
              )}
              {patient.chronicConditions.length > 0 && (
                <span className="inline-flex rounded-full bg-[var(--warning-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--warning-fg)]">
                  Chronic Care
                </span>
              )}
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">{patient.uhid}</span>
              <span>{patient.age}y &middot; {sex}</span>
              <span className="font-semibold text-[var(--text-primary)]">{patient.bloodGroup}</span>
              {patient.abhaId && <span className="font-medium text-[var(--action-primary)]">&#10003; ABHA</span>}
              <span className="text-xs">{patient.phone}</span>
            </div>
          </div>
          {patient.id && (
            <PdfDownloadButton template="referral" id={patient.id} filename={`patient-${patient.id}-referral.pdf`} label="Referral PDF" />
          )}
        </div>
      </div>

      {/* ── Two-column body ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left: Clinical Sidebar */}
        <ClinicalSidebar patient={patient} />

        {/* Right: Tabbed deep-dive */}
        <div className="flex-1 min-w-0">

          {/* Tab bar — sticky below the identity header */}
          <div className="sticky top-[116px] z-[5] -mx-0 border-b border-[var(--border-default)] bg-[var(--surface-page)] mb-4">
            <div className="flex gap-0 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex shrink-0 items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === t.id
                      ? "border-[var(--action-primary)] text-[var(--action-primary)]"
                      : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {t.icon}
                  {t.label}
                  {t.badge !== undefined && (
                    <span className={`flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white ${
                      t.critical ? "bg-[var(--critical-fg)]" : "bg-[var(--action-primary)]"
                    }`}>
                      {t.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          {activeTab === "demographics" && <DemographicsTab patient={patient} />}
          {activeTab === "clinical"     && <ClinicalTab patientId={patient.id} patientName={patient.name} />}
          {activeTab === "labs"         && <LabsTab labs={patient.labs} />}
          {activeTab === "meds"         && <MedsPharmacyTab medications={patient.medications} rxHistory={rxHistory} />}
          {activeTab === "finance"      && <FinanceTab admissions={ipdAdmissions} bills={bills} />}
          {activeTab === "docs"         && <DocsTab documents={patient.documents} />}
        </div>

      </div>
    </div>
  );
}
