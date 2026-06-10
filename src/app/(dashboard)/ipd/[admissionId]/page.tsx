"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIPDStore, type Admission, type AdmissionPriority } from "@/store/useIPDStore";
import { useOrderStore } from "@/store/useOrderStore";
import { NewOrderDrawer } from "@/components/orders/NewOrderDrawer";
import { NewExaminationDrawer } from "@/components/examination/NewExaminationDrawer";
import { WARDS } from "@/data/seedAdmissions";
import {
  ArrowLeft, BedDouble, User, ChevronRight, ClipboardList,
  ShieldAlert, CheckCircle2, AlertTriangle, Clock, Loader2,
  X, Edit2, Save, ScanLine, FlaskConical, Stethoscope, FileText,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const PRIORITY_CLS: Record<AdmissionPriority, string> = {
  General: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  HDU:     "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  ICU:     "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const STATUS_CLS: Record<string, string> = {
  Active:      "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Planned:     "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Discharged:  "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Transferred: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

const ORDER_TYPE_ICON: Record<string, React.ReactNode> = {
  Lab:       <FlaskConical size={12} />,
  Imaging:   <ScanLine size={12} />,
  Medication: <Stethoscope size={12} />,
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

// ── Discharge Dialog ──────────────────────────────────────────────────────────

interface DischargeDialogProps {
  admissionId: string;
  onClose: () => void;
}

function DischargeDialog({ admissionId, onClose }: DischargeDialogProps) {
  const dischargePatient = useIPDStore((s) => s.dischargePatient);
  const router           = useRouter();
  const [summary, setSummary] = useState("");
  const [saving,  setSaving]  = useState(false);

  function handleSubmit() {
    if (!summary.trim()) return;
    setSaving(true);
    setTimeout(() => {
      dischargePatient(admissionId, summary.trim(), "Dr. Attending");
      setSaving(false);
      onClose();
      router.push("/ipd");
    }, 500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Discharge Patient</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="mb-4 rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-4 py-3">
          <p className="text-sm text-[var(--warning-fg)]">This action will mark the patient as discharged and free the bed.</p>
        </div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Discharge Summary *</label>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Final diagnosis, treatment given, discharge medications, follow-up instructions…"
          className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
        />
        {!summary.trim() && <p className="mt-1 text-xs text-[var(--critical-fg)]">Discharge summary is required</p>}
        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={saving || !summary.trim()}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60"
          >
            {saving ? <><Loader2 size={13} className="animate-spin" /> Discharging…</> : "Confirm Discharge"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Transfer Bed Form ─────────────────────────────────────────────────────────

interface TransferFormProps {
  admission: Admission;
  onClose: () => void;
}

function TransferBedForm({ admission, onClose }: TransferFormProps) {
  const transferBed = useIPDStore((s) => s.transferBed);
  const bedMap      = useIPDStore((s) => s.bedMap);

  const [newWard, setNewWard] = useState("");
  const [newBed,  setNewBed]  = useState("");
  const [saving,  setSaving]  = useState(false);

  const availBeds = newWard
    ? bedMap.filter((b) => b.ward === newWard && (b.status === "Available" || b.status === "Cleaning"))
    : [];

  function handleSubmit() {
    if (!newWard || !newBed) return;
    setSaving(true);
    setTimeout(() => {
      transferBed(admission.id, newWard, newBed, "Nurse Station");
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Transfer to New Bed</p>

      <select
        value={newWard}
        onChange={(e) => { setNewWard(e.target.value); setNewBed(""); }}
        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
      >
        <option value="">Select ward…</option>
        {WARDS.map((w) => <option key={w.name} value={w.name}>{w.name}</option>)}
      </select>

      <select
        value={newBed}
        onChange={(e) => setNewBed(e.target.value)}
        disabled={!newWard}
        className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] disabled:opacity-50"
      >
        <option value="">Select bed…</option>
        {availBeds.map((b) => <option key={b.bed} value={b.bed}>{b.bed} — {b.status}</option>)}
      </select>
      {newWard && availBeds.length === 0 && (
        <p className="text-xs text-[var(--warning-fg)]">No available beds in this ward</p>
      )}

      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
        <button
          onClick={handleSubmit}
          disabled={saving || !newWard || !newBed}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[var(--action-primary)] py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50"
        >
          {saving ? <><Loader2 size={11} className="animate-spin" /> Transferring…</> : "Confirm Transfer"}
        </button>
      </div>
    </div>
  );
}

// ── Orders Tab ────────────────────────────────────────────────────────────────

function OrdersTab({ patientId, patientName }: { patientId: string; patientName: string }) {
  const getByPatient = useOrderStore((s) => s.getByPatient);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const orders = getByPatient(patientId);
  const active    = orders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled");
  const completed = orders.filter((o) => o.status === "Completed");

  const ORDER_STATUS_CLS: Record<string, string> = {
    Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Acknowledged:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
    Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };

  function Group({ label, items }: { label: string; items: typeof orders }) {
    if (items.length === 0) return null;
    return (
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{label} ({items.length})</p>
        <div className="space-y-2">
          {items.map((o) => (
            <Link
              key={o.id}
              href={`/orders/${o.id}`}
              className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--action-subtle)] text-[var(--action-primary)]">
                {ORDER_TYPE_ICON[o.type] ?? <ClipboardList size={12} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">{o.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{o.type} · {fmtDate(o.orderedAt)}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${ORDER_STATUS_CLS[o.status]}`}>{o.status}</span>
              <ChevronRight size={13} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <NewOrderDrawer
        open={newOrderOpen}
        onClose={() => setNewOrderOpen(false)}
        prefillPatientId={patientId}
        prefillPatientName={patientName}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--text-secondary)]">{orders.length} order{orders.length !== 1 ? "s" : ""} on record</p>
        <button
          onClick={() => setNewOrderOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)]"
        >
          + New Order
        </button>
      </div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ClipboardList size={28} className="mb-2 text-[var(--text-secondary)] opacity-30" />
          <p className="text-sm text-[var(--text-secondary)]">No orders placed yet</p>
        </div>
      ) : (
        <>
          <Group label="Active" items={active} />
          <Group label="Completed" items={completed} />
        </>
      )}
    </div>
  );
}

// ── Timeline Tab ──────────────────────────────────────────────────────────────

function TimelineTab({ admission }: { admission: Admission }) {
  return (
    <div className="space-y-1">
      {[...admission.statusHistory].reverse().map((ev, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              ev.status === "Discharged" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
              : ev.status === "Transferred" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]"
              : "bg-[var(--action-subtle)] text-[var(--action-primary)]"
            }`}>
              {ev.status === "Discharged" ? <CheckCircle2 size={13} /> : <Clock size={13} />}
            </div>
            {i < admission.statusHistory.length - 1 && (
              <div className="my-1 w-0.5 flex-1 bg-[var(--border-default)]" />
            )}
          </div>
          <div className="pb-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_CLS[ev.status]}`}>{ev.status}</span>
              <span className="text-xs text-[var(--text-secondary)]">{fmtDateTime(ev.at)}</span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">{ev.note ?? ev.status}</p>
            <p className="text-xs text-[var(--text-secondary)]">by {ev.by}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function IPDDetailPage({ params }: { params: Promise<{ admissionId: string }> }) {
  const { admissionId } = use(params);
  const router   = useRouter();
  const getById  = useIPDStore((s) => s.getById);
  const updateNotes = useIPDStore((s) => s.updateNotes);

  // Re-read on every render so UI reflects mutations
  const admission = useIPDStore((s) => s.admissions.find((a) => a.id === admissionId));

  const [tab, setTab]             = useState<"overview" | "orders" | "timeline">("overview");
  const [dischargeOpen, setDischargeOpen] = useState(false);
  const [transferOpen, setTransferOpen]   = useState(false);  const [newExamOpen,    setNewExamOpen]    = useState(false);  const [editingNotes, setEditingNotes]   = useState(false);
  const [notes, setNotes]                 = useState("");

  useEffect(() => {
    if (admission) setNotes(admission.clinicalNotes ?? "");
  }, [admission?.id]);

  if (!admission) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">Admission not found</p>
        <button onClick={() => router.push("/ipd")} className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to IPD
        </button>
      </div>
    );
  }

  const isActive = admission.status === "Active" || admission.status === "Planned";
  const tabs = [
    { id: "overview" as const,  label: "Overview"  },
    { id: "orders"   as const,  label: "Orders"    },
    { id: "timeline" as const,  label: "Timeline"  },
  ];

  return (
    <div className="space-y-5 pb-8">
      {dischargeOpen && <DischargeDialog admissionId={admission.id} onClose={() => setDischargeOpen(false)} />}
      <NewExaminationDrawer
        open={newExamOpen}
        onClose={() => setNewExamOpen(false)}
        prefillPatientId={admission.patientId}
        prefillPatientName={admission.patientName}
      />

      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">IPD</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{admission.id}</span>
        </div>

        {/* Identity strip */}
        <div className="flex flex-wrap items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${PRIORITY_CLS[admission.priority]}`}>
            <BedDouble size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{admission.patientName}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_CLS[admission.priority]}`}>
                {admission.priority}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLS[admission.status]}`}>
                {admission.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{admission.admitDiagnosis}</p>
          </div>

          {/* Action buttons */}
          {isActive && (
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => setNewExamOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
              >
                <FileText size={13} /> Examine
              </button>
              <button
                onClick={() => setTransferOpen((v) => !v)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${transferOpen ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
              >
                Transfer Bed
              </button>
              <button
                onClick={() => setDischargeOpen(true)}
                className="rounded-xl bg-[var(--action-primary)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
              >
                Discharge
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left sidebar */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0 lg:sticky lg:top-40">

          {/* Admission details */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Admission Details</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Ward",              admission.ward],
                ["Bed",               admission.bed],
                ["Admitted",          fmtDateTime(admission.admittedAt)],
                ["Expected D/C",      fmtDate(admission.expectedDischarge)],
                ["Attending Doctor",  admission.attendingDoctor],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3 px-4 py-3">
                  <dt className="shrink-0 text-[var(--text-secondary)]">{label}</dt>
                  <dd className="font-medium text-[var(--text-primary)] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Patient quick-link */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Patient</p>
            </div>
            <Link
              href={`/patients/${admission.patientId}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-white">
                <User size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{admission.patientName}</p>
                <p className="text-xs text-[var(--action-primary)]">{admission.patientId}</p>
              </div>
              <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]" />
            </Link>
          </div>

          {/* Transfer form */}
          {transferOpen && (
            <TransferBedForm admission={admission} onClose={() => setTransferOpen(false)} />
          )}
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0">

          {/* Tab bar */}
          <div className="mb-4 flex gap-6 border-b border-[var(--border-default)]">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-2.5 text-sm font-medium transition-colors ${tab === t.id ? "border-b-2 border-[var(--action-primary)] text-[var(--action-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Overview tab ── */}
          {tab === "overview" && (
            <div className="space-y-4">
              {/* Admission Diagnosis */}
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
                <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Admitting Diagnosis</p>
                </div>
                <p className="px-5 py-4 text-sm font-medium text-[var(--text-primary)]">{admission.admitDiagnosis}</p>
              </div>

              {/* Clinical Notes */}
              <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
                <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Clinical Notes</p>
                  {isActive && !editingNotes && (
                    <button
                      onClick={() => setEditingNotes(true)}
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]"
                    >
                      <Edit2 size={11} /> Edit
                    </button>
                  )}
                </div>
                <div className="px-5 py-4">
                  {editingNotes ? (
                    <div className="space-y-3">
                      <textarea
                        rows={5}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingNotes(false); setNotes(admission.clinicalNotes ?? ""); }}
                          className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => { updateNotes(admission.id, notes); setEditingNotes(false); }}
                          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[var(--action-primary)] py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)]"
                        >
                          <Save size={11} /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className={`text-sm leading-relaxed ${admission.clinicalNotes ? "text-[var(--text-primary)]" : "italic text-[var(--text-secondary)]"}`}>
                      {admission.clinicalNotes ?? "No clinical notes recorded."}
                    </p>
                  )}
                </div>
              </div>

              {/* Discharge Summary — only if discharged/transferred */}
              {(admission.status === "Discharged" || admission.status === "Transferred") && admission.dischargeSummary && (
                <div className="rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] overflow-hidden">
                  <div className="border-b border-[var(--normal-fg)]/15 px-5 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--normal-fg)]">Discharge / Transfer Summary</p>
                  </div>
                  <p className="px-5 py-4 text-sm leading-relaxed text-[var(--normal-fg)]">{admission.dischargeSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* ── Orders tab ── */}
          {tab === "orders" && (
            <OrdersTab patientId={admission.patientId} patientName={admission.patientName} />
          )}

          {/* ── Timeline tab ── */}
          {tab === "timeline" && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Admission Timeline</p>
              </div>
              <div className="px-5 py-5">
                <TimelineTab admission={admission} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
