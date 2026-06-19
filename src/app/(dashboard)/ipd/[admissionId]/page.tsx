"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIPDStore, type Admission, type AdmissionPriority } from "@/store/useIPDStore";
import { useOrderStore, type Order } from "@/store/useOrderStore";
import { useNursingStore, type VitalsRecord, type MedAdminRecord, type IntakeOutputRecord, type SBARHandoff, type NursingTask, type NursingAssessment } from "@/store/useNursingStore";
import { NewOrderDrawer } from "@/components/orders/NewOrderDrawer";
import { NewExaminationDrawer } from "@/components/examination/NewExaminationDrawer";
import { WARDS } from "@/data/seedAdmissions";
import {
  ArrowLeft, BedDouble, User, ChevronRight, ClipboardList,
  CheckCircle2, AlertTriangle, Clock, Loader2,
  X, Edit2, Save, ScanLine, FlaskConical, Stethoscope, FileText,
  Heart, Pill, Droplets, ClipboardCheck, MessageSquareText, ListChecks,
  Plus, Syringe, Thermometer, Weight,
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

const ORDER_STATUS_CLS: Record<string, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
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

// ── Shared order components ────────────────────────────────────────────────────

function Group({ label, items }: { label: string; items: Order[] }) {
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

// ── Orders Tab ────────────────────────────────────────────────────────────────

function OrdersTab({ patientId, patientName }: { patientId: string; patientName: string }) {
  const getByPatient = useOrderStore((s) => s.getByPatient);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const orders = getByPatient(patientId);
  const active    = orders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled");
  const completed = orders.filter((o) => o.status === "Completed");

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

// ── Nursing Sub-tab ───────────────────────────────────────────────────────────

function fmtTime(d: string) {
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const NURSING_SUBTABS = [
  { id: "vitals" as const,     label: "Vitals",       icon: Heart },
  { id: "emar" as const,       label: "eMAR",         icon: Syringe },
  { id: "io" as const,         label: "I/O Chart",    icon: Droplets },
  { id: "assessment" as const,  label: "Assessment",   icon: ClipboardCheck },
  { id: "sbar" as const,       label: "SBAR Handoff", icon: MessageSquareText },
  { id: "tasks" as const,      label: "Tasks",        icon: ListChecks },
];

function NursingTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const [sub, setSub] = useState("vitals");

  return (
    <div className="space-y-4">
      {/* Sub-tab bar */}
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border-default)] pb-0">
        {NURSING_SUBTABS.map((st) => (
          <button
            key={st.id}
            onClick={() => setSub(st.id)}
            className={`flex shrink-0 items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-[1px] ${
              sub === st.id
                ? "border-[var(--action-primary)] text-[var(--action-primary)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <st.icon size={13} />
            {st.label}
          </button>
        ))}
      </div>

      {sub === "vitals" && <VitalsSubTab admissionId={admissionId} isActive={isActive} />}
      {sub === "emar" && <EMARSubTab admissionId={admissionId} isActive={isActive} />}
      {sub === "io" && <IOChartSubTab admissionId={admissionId} isActive={isActive} />}
      {sub === "assessment" && <NurseAssessmentSubTab admissionId={admissionId} isActive={isActive} />}
      {sub === "sbar" && <SBARSubTab admissionId={admissionId} isActive={isActive} />}
      {sub === "tasks" && <NursingTaskSubTab admissionId={admissionId} isActive={isActive} />}
    </div>
  );
}

// ── Vitals Flowsheet ─────────────────────────────────────────────────────────

function VitalsSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const vitals = useNursingStore((s) => s.getVitals(admissionId));
  const addVital = useNursingStore((s) => s.addVital);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ bp: "", pulse: "", spo2: "", temp: "", rr: "", weight: "", painScore: "", notes: "" });

  function handleAdd() {
    const r: Omit<VitalsRecord, "id"> = {
      admissionId,
      recordedAt: new Date().toISOString().slice(0, 19),
      recordedBy: "Nurse Station",
      bp: form.bp || "120/80",
      pulse: Number(form.pulse) || 80,
      spo2: Number(form.spo2) || 98,
      temp: Number(form.temp) || 36.8,
      rr: Number(form.rr) || 16,
      weight: form.weight ? Number(form.weight) : undefined,
      painScore: form.painScore ? Number(form.painScore) : undefined,
      notes: form.notes || undefined,
    };
    addVital(r);
    setShowAdd(false);
    setForm({ bp: "", pulse: "", spo2: "", temp: "", rr: "", weight: "", painScore: "", notes: "" });
  }

  const latest = vitals[vitals.length - 1];

  return (
    <div className="space-y-4">
      {/* Latest vitals card */}
      {latest && (
        <div className="grid grid-cols-4 gap-3 lg:grid-cols-7">
          {[
            { label: "BP", value: latest.bp, icon: Heart },
            { label: "Pulse", value: `${latest.pulse} bpm`, icon: Heart },
            { label: "SpO₂", value: `${latest.spo2}%`, icon: Thermometer },
            { label: "Temp", value: `${latest.temp}°C`, icon: Thermometer },
            { label: "RR", value: `${latest.rr} /min`, icon: Thermometer },
            ...(latest.weight ? [{ label: "Weight", value: `${latest.weight} kg`, icon: Weight }] : []),
            ...(latest.painScore != null ? [{ label: "Pain", value: `${latest.painScore}/10`, icon: ClipboardCheck }] : []),
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">{m.label}</p>
              <p className="mt-1 text-lg font-bold tabular-nums text-[var(--text-primary)]">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Vitals history */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Vitals History</p>
          {isActive && (
            <button onClick={() => setShowAdd((v) => !v)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
              <Plus size={12} /> Record Vitals
            </button>
          )}
        </div>
        {showAdd && (
          <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)]/30 px-5 py-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["bp", "pulse", "spo2", "temp", "rr", "weight", "painScore"].map((f) => (
                <div key={f}>
                  <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">{f === "painScore" ? "Pain (0-10)" : f}</label>
                  <input value={(form as Record<string, string>)[f]} onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))} placeholder="—" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={handleAdd} className="rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white">Save</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">Cancel</button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                {["Time", "BP", "Pulse", "SpO₂", "Temp", "RR", "Pain", "By"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-medium text-[var(--text-secondary)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...vitals].reverse().map((v) => (
                <tr key={v.id} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                  <td className="px-3 py-2 text-xs tabular-nums text-[var(--text-secondary)]">{fmtTime(v.recordedAt)}</td>
                  <td className="px-3 py-2 font-medium tabular-nums text-[var(--text-primary)]">{v.bp}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{v.pulse}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{v.spo2}%</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{v.temp}°C</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{v.rr}</td>
                  <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{v.painScore != null ? `${v.painScore}/10` : "—"}</td>
                  <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{v.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── eMAR ─────────────────────────────────────────────────────────────────────

function EMARSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const meds = useNursingStore((s) => s.medAdmin.filter((m) => m.admissionId === admissionId));
  const updateMed = useNursingStore((s) => s.updateMedAdmin);
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

  const today = "2026-06-10";
  const todayMeds = meds.filter((m) => m.scheduledAt.startsWith(today)).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  const STATUS_CLS: Record<string, string> = {
    Scheduled: "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Given: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Missed: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    Refused: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Held: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Medication Administration Record — {fmtDate(today)}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
              {["Drug", "Dose", "Route", "Scheduled", "Administered", "Status", "Given By"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium text-[var(--text-secondary)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todayMeds.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-[var(--text-secondary)]">No medications scheduled for today</td></tr>
            )}
            {todayMeds.map((m) => (
              <tr key={m.id} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{m.drug}</td>
                <td className="px-4 py-3 tabular-nums text-[var(--text-primary)]">{m.dose}</td>
                <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{m.route}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-[var(--text-secondary)]">{fmtTime(m.scheduledAt)}</td>
                <td className="px-4 py-3 text-xs tabular-nums text-[var(--text-secondary)]">{m.administeredAt ? fmtTime(m.administeredAt) : "—"}</td>
                <td className="px-4 py-3">
                  {isActive && m.status === "Scheduled" ? (
                    <select
                      value={m.status}
                      onChange={(e) => updateMed(m.id, { status: e.target.value as MedAdminRecord["status"], administeredAt: e.target.value === "Given" ? new Date().toISOString().slice(0, 19) : undefined, administeredBy: e.target.value === "Given" ? "Nurse Station" : undefined })}
                      className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1 text-xs outline-none focus:border-[var(--action-primary)]"
                    >
                      {["Scheduled", "Given", "Missed", "Refused", "Held"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[m.status]}`}>{m.status}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{m.administeredBy ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── I/O Chart ────────────────────────────────────────────────────────────────

function IOChartSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const records = useNursingStore((s) => s.getIO(admissionId));
  const addIO = useNursingStore((s) => s.addIO);
  const getIOTotals = useNursingStore((s) => s.getIOTotals);
  const totals = getIOTotals(admissionId);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ intakeOral: "", intakeIV: "", outputUrine: "", outputDrain: "", outputVomit: "", notes: "" });

  function handleAdd() {
    const r: Omit<IntakeOutputRecord, "id"> = {
      admissionId,
      recordedAt: new Date().toISOString().slice(0, 19),
      recordedBy: "Nurse Station",
      shift: "Morning",
      intakeOral: form.intakeOral ? Number(form.intakeOral) : undefined,
      intakeIV: form.intakeIV ? Number(form.intakeIV) : undefined,
      outputUrine: form.outputUrine ? Number(form.outputUrine) : undefined,
      outputDrain: form.outputDrain ? Number(form.outputDrain) : undefined,
      outputVomit: form.outputVomit ? Number(form.outputVomit) : undefined,
      notes: form.notes || undefined,
    };
    addIO(r);
    setShowAdd(false);
    setForm({ intakeOral: "", intakeIV: "", outputUrine: "", outputDrain: "", outputVomit: "", notes: "" });
  }

  return (
    <div className="space-y-4">
      {/* Totals card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--normal-fg)]">Total Intake</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--normal-fg)]">{totals.intake} mL</p>
        </div>
        <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--critical-fg)]">Total Output</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--critical-fg)]">{totals.output} mL</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Intake / Output Records</p>
          {isActive && (
            <button onClick={() => setShowAdd((v) => !v)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
              <Plus size={12} /> Add Record
            </button>
          )}
        </div>
        {showAdd && (
          <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)]/30 px-5 py-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { key: "intakeOral", label: "Oral Intake (mL)" },
                { key: "intakeIV", label: "IV Fluids (mL)" },
                { key: "outputUrine", label: "Urine (mL)" },
                { key: "outputDrain", label: "Drain (mL)" },
                { key: "outputVomit", label: "Vomitus (mL)" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">{f.label}</label>
                  <input value={(form as Record<string, string>)[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} placeholder="0" type="number" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={handleAdd} className="rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white">Save</button>
              <button onClick={() => setShowAdd(false)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">Cancel</button>
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                {["Shift", "Time", "Oral", "IV", "Urine", "Drain", "Vomit", "By"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-medium text-[var(--text-secondary)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...records].reverse().map((r) => (
                <tr key={r.id} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                  <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{r.shift}</td>
                  <td className="px-3 py-2 text-xs tabular-nums text-[var(--text-secondary)]">{fmtTime(r.recordedAt)}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{r.intakeOral ?? "—"}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{r.intakeIV ?? "—"}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{r.outputUrine ?? "—"}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{r.outputDrain ?? "—"}</td>
                  <td className="px-3 py-2 tabular-nums text-[var(--text-primary)]">{r.outputVomit ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-[var(--text-secondary)]">{r.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Nursing Assessment ───────────────────────────────────────────────────────

function NurseAssessmentSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const assessments = useNursingStore((s) => s.getAssessments(admissionId));
  const addAssessment = useNursingStore((s) => s.addAssessment);
  const [showForm, setShowForm] = useState(false);

  const initial = { consciousness: "Alert", mobility: "Independent", fallRisk: "0", bradenScore: "20", painScore: "0", nutritionalStatus: "Good", skinCondition: "Intact", allergies: "", notes: "" };
  type FormState = Record<string, string>;
  const [form, setForm] = useState<FormState>(initial);

  function handleAdd() {
    const score = Number(form.fallRisk);
    const braden = Number(form.bradenScore);
    addAssessment({
      admissionId, assessedAt: new Date().toISOString().slice(0, 19), assessedBy: "Nurse Station",
      type: "Daily", consciousness: form.consciousness as NursingAssessment["consciousness"], mobility: form.mobility as NursingAssessment["mobility"],
      fallRisk: score,
      fallRiskLevel: score >= 45 ? "High" : score >= 25 ? "Moderate" : "Low",
      bradenScore: braden,
      bradenRisk: braden <= 9 ? "Severe" : braden <= 12 ? "Moderate" : braden <= 15 ? "Mild" : "None",
      painScore: Number(form.painScore),
      nutritionalStatus: form.nutritionalStatus as NursingAssessment["nutritionalStatus"],
      skinCondition: form.skinCondition as NursingAssessment["skinCondition"],
      allergies: form.allergies ? form.allergies.split(",").map((s) => s.trim()) : [],
      notes: form.notes || undefined,
    });
    setShowForm(false);
    setForm(initial);
  }

  const latest = assessments[0];

  return (
    <div className="space-y-4">
      {latest && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Consciousness", value: latest.consciousness },
            { label: "Mobility", value: latest.mobility },
            { label: "Fall Risk", value: `${latest.fallRiskLevel} (${latest.fallRisk})` },
            { label: "Braden Score", value: `${latest.bradenScore} — ${latest.bradenRisk}` },
            { label: "Pain Score", value: `${latest.painScore}/10` },
            { label: "Skin", value: latest.skinCondition },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">{m.label}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Nursing Assessments</p>
          {isActive && (
            <button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
              <Plus size={12} /> New Assessment
            </button>
          )}
        </div>
        {showForm && (
          <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)]/30 px-5 py-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Consciousness</label>
                <select value={form.consciousness} onChange={(e) => setForm((p) => ({ ...p, consciousness: e.target.value }))} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]">
                  {["Alert", "Drowsy", "Confused", "Unresponsive"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Mobility</label>
                <select value={form.mobility} onChange={(e) => setForm((p) => ({ ...p, mobility: e.target.value }))} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]">
                  {["Independent", "Assistance", "Bedridden"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div><label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Fall Risk</label><input value={form.fallRisk} onChange={(e) => setForm((p) => ({ ...p, fallRisk: e.target.value }))} type="number" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]" /></div>
              <div><label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Braden Score</label><input value={form.bradenScore} onChange={(e) => setForm((p) => ({ ...p, bradenScore: e.target.value }))} type="number" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]" /></div>
              <div><label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Pain (0-10)</label><input value={form.painScore} onChange={(e) => setForm((p) => ({ ...p, painScore: e.target.value }))} type="number" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]" /></div>
              <div>
                <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Nutrition</label>
                <select value={form.nutritionalStatus} onChange={(e) => setForm((p) => ({ ...p, nutritionalStatus: e.target.value }))} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]">
                  {["Good", "Fair", "Poor"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Skin</label>
                <select value={form.skinCondition} onChange={(e) => setForm((p) => ({ ...p, skinCondition: e.target.value }))} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]">
                  {["Intact", "Rash", "Wound", "Pressure Ulcer"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div><label className="mb-1 block text-[10px] font-medium uppercase text-[var(--text-secondary)]">Allergies (comma-sep)</label><input value={form.allergies} onChange={(e) => setForm((p) => ({ ...p, allergies: e.target.value }))} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]" /></div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={handleAdd} className="rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white">Save Assessment</button>
              <button onClick={() => setShowForm(false)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">Cancel</button>
            </div>
          </div>
        )}
        <div className="divide-y divide-[var(--border-default)]">
          {assessments.map((a) => (
            <div key={a.id} className="px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--action-primary)]">{a.type}</span>
                <span className="text-xs text-[var(--text-secondary)]">{new Date(a.assessedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                <span className="text-xs text-[var(--text-secondary)]">by {a.assessedBy}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                {[
                  `Consciousness: ${a.consciousness}`,
                  `Mobility: ${a.mobility}`,
                  `Fall Risk: ${a.fallRiskLevel} (${a.fallRisk})`,
                  `Braden: ${a.bradenScore} — ${a.bradenRisk}`,
                  `Pain: ${a.painScore}/10`,
                  `Nutrition: ${a.nutritionalStatus}`,
                  `Skin: ${a.skinCondition}`,
                  `Allergies: ${a.allergies.join(", ")}`,
                ].map((s) => <span key={s} className="text-[var(--text-primary)]">{s}</span>)}
              </div>
              {a.notes && <p className="mt-2 text-xs italic text-[var(--text-secondary)]">{a.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SBAR Handoff ─────────────────────────────────────────────────────────────

function SBARSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const handoffs = useNursingStore((s) => s.getHandoffs(admissionId));
  const addHandoff = useNursingStore((s) => s.addHandoff);
  const completeHandoff = useNursingStore((s) => s.completeHandoff);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ situation: "", background: "", assessment: "", recommendation: "" });

  function handleAdd() {
    addHandoff({
      admissionId, createdAt: new Date().toISOString().slice(0, 19), createdBy: "Nurse Station",
      shift: "Morning", ...form, completed: false,
    });
    setShowForm(false);
    setForm({ situation: "", background: "", assessment: "", recommendation: "" });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">SBAR Handoff Notes</p>
          {isActive && (
            <button onClick={() => setShowForm((v) => !v)} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
              <Plus size={12} /> New Handoff
            </button>
          )}
        </div>
        {showForm && (
          <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)]/30 px-5 py-4 space-y-3">
            {[
              { key: "situation", label: "Situation", placeholder: "What is happening now?" },
              { key: "background", label: "Background", placeholder: "Relevant history / context" },
              { key: "assessment", label: "Assessment", placeholder: "What do you think is going on?" },
              { key: "recommendation", label: "Recommendation", placeholder: "What should be done?" },
            ].map((f) => (
              <div key={f.key}>
                <label className="mb-1 block text-[10px] font-semibold uppercase text-[var(--text-secondary)]">{f.label}</label>
                <textarea
                  rows={2} value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                />
              </div>
            ))}
            <div className="flex gap-2">
              <button onClick={handleAdd} className="rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white">Save Handoff</button>
              <button onClick={() => setShowForm(false)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">Cancel</button>
            </div>
          </div>
        )}
        <div className="divide-y divide-[var(--border-default)]">
          {handoffs.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-[var(--text-secondary)]">No handoff notes recorded</p>
          )}
          {handoffs.map((h) => (
            <div key={h.id} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${h.shift === "Morning" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : h.shift === "Evening" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{h.shift}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{new Date(h.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="text-xs text-[var(--text-secondary)]">by {h.createdBy}</span>
                </div>
                {!h.completed && isActive && (
                  <button onClick={() => completeHandoff(h.id)} className="flex items-center gap-1 text-xs font-medium text-[var(--action-primary)] hover:underline">
                    <CheckCircle2 size={12} /> Mark Complete
                  </button>
                )}
                {h.completed && <span className="text-xs text-[var(--normal-fg)]">✓ Completed</span>}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                {[
                  { label: "S", value: h.situation },
                  { label: "B", value: h.background },
                  { label: "A", value: h.assessment },
                  { label: "R", value: h.recommendation },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="font-bold text-[var(--action-primary)]">{s.label}: </span>
                    <span className="text-[var(--text-primary)]">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Nursing Tasks ────────────────────────────────────────────────────────────

function NursingTaskSubTab({ admissionId, isActive }: { admissionId: string; isActive: boolean }) {
  const tasks = useNursingStore((s) => s.getTasks(admissionId));
  const updateTask = useNursingStore((s) => s.updateTask);
  const [filter, setFilter] = useState<"all" | NursingTask["status"]>("all");

  const PRIORITY_CLS: Record<string, string> = {
    Routine: "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Urgent: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    STAT: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  };
  const STATUS_CLS: Record<string, string> = {
    Pending: "bg-[var(--info-bg)] text-[var(--info-fg)]",
    "In Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    Completed: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    Cancelled: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {(["all", "Pending", "In Progress", "Completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === f ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No tasks found</p>
          </div>
        )}
        {filtered.map((t) => (
          <div key={t.id} className={`rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 ${t.priority === "STAT" ? "border-l-4 border-l-[var(--critical-fg)]" : t.priority === "Urgent" ? "border-l-4 border-l-[var(--warning-fg)]" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-medium ${t.status === "Completed" ? "line-through text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>{t.task}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${PRIORITY_CLS[t.priority]}`}>{t.priority}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLS[t.status]}`}>{t.status}</span>
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Due: {new Date(t.dueAt).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                  {t.assignedTo && ` · Assigned: ${t.assignedTo}`}
                  {t.completedBy && ` · Done by: ${t.completedBy}`}
                </p>
              </div>
              {isActive && t.status !== "Completed" && t.status !== "Cancelled" && (
                <div className="flex gap-1.5 shrink-0">
                  {t.status === "Pending" && (
                    <button onClick={() => updateTask(t.id, { status: "In Progress", assignedTo: "Nurse Station" })} className="rounded-lg border border-[var(--border-default)] px-2 py-1 text-[10px] font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Start</button>
                  )}
                  {t.status === "In Progress" && (
                    <button onClick={() => updateTask(t.id, { status: "Completed", completedAt: new Date().toISOString().slice(0, 19), completedBy: "Nurse Station" })} className="rounded-lg bg-[var(--normal-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--normal-fg)]">Complete</button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Timeline Tab ─────────────────────────────────────────────────────────────

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
  const updateNotes = useIPDStore((s) => s.updateNotes);

  // Re-read on every render so UI reflects mutations
  const admission = useIPDStore((s) => s.admissions.find((a) => a.id === admissionId));

  const [tab, setTab]             = useState<"overview" | "orders" | "timeline" | "nursing">("overview");
  const [nursingSub, setNursingSub] = useState<"vitals" | "emar" | "io" | "assessment" | "sbar" | "tasks">("vitals");
  const [dischargeOpen, setDischargeOpen] = useState(false);
  const [transferOpen, setTransferOpen]   = useState(false);  const [newExamOpen,    setNewExamOpen]    = useState(false);  const [editingNotes, setEditingNotes]   = useState(false);
  const [notes, setNotes] = useState(() => admission?.clinicalNotes ?? "");

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
    { id: "nursing"  as const,  label: "Nursing"   },
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

          {/* ── Nursing tab ── */}
          {tab === "nursing" && (
            <NursingTab admissionId={admission.id} isActive={isActive} />
          )}
        </div>
      </div>
    </div>
  );
}
