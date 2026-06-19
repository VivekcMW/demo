"use client";

import { useState } from "react";
import { useOTStore, type OTStatus, type OTProcedureStatus, type OTUrgency } from "@/store/useOTStore";
import { useShallow } from "zustand/react/shallow";
import {
  Stethoscope, Clock, CheckCircle2, AlertTriangle, X,
  ChevronRight, Plus, Search, ShieldCheck,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const OT_STATUS_CLS: Record<OTStatus, string> = {
  Available: "bg-[var(--normal-bg)] text-[var(--normal-fg)] border-[var(--normal-fg)]/20",
  "In Use": "bg-[var(--critical-bg)] text-[var(--critical-fg)] border-[var(--critical-fg)]/20",
  Cleaning: "bg-[var(--warning-bg)] text-[var(--warning-fg)] border-[var(--warning-fg)]/20",
  Maintenance: "bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border-default)]",
  Reserved: "bg-[var(--info-bg)] text-[var(--info-fg)] border-[var(--info-fg)]/20",
};

const PROC_STATUS_CLS: Record<OTProcedureStatus, string> = {
  Scheduled: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "In Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Completed: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const URGENCY_CLS: Record<OTUrgency, string> = {
  Elective: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Urgent: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(d: string) {
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Theatre Card ──────────────────────────────────────────────────────────────

function TheatreCard({ theatreId, onClick }: { theatreId: string; onClick: () => void }) {
  const t = useOTStore(useShallow((s) => s.theatres.find((th) => th.id === theatreId)));
  if (!t) return null;
  return (
    <button onClick={onClick} className="text-left w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
          <p className="text-xs text-[var(--text-secondary)]">Floor {t.floor}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${OT_STATUS_CLS[t.status]}`}>{t.status}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {t.specialties.map((s) => (
          <span key={s} className="rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[10px] text-[var(--action-primary)]">{s}</span>
        ))}
      </div>
    </button>
  );
}

// ── WHO Checklist Dialog ──────────────────────────────────────────────────────

function WHOChecklistDialog({ procedureId, onClose }: { procedureId: string; onClose: () => void }) {
  const proc = useOTStore(useShallow((s) => s.getById(procedureId)));
  const updateChecklist = useOTStore(useShallow((s) => s.updateChecklist));
  if (!proc) return null;
  const cl = proc.whochecklist ?? { signInCompleted: false, timeOutCompleted: false, signOutCompleted: false };

  const phases = [
    { key: "signIn" as const, label: "Sign In (Before Anaesthesia)", items: ["Patient identity confirmed", "Site marked", "Consent verified", "Anaesthesia safety check complete", "Pulse oximeter on & functioning"], done: cl.signInCompleted, at: cl.signInAt, by: cl.signInBy },
    { key: "timeOut" as const, label: "Time Out (Before Incision)", items: ["All team members introduced by name/role", "Surgeon: procedure, critical steps, duration", "Anaesthesia: concerns", "Nursing: sterility confirmed, equipment ready", "Antibiotic prophylaxis given within 60 min", "Essential imaging displayed"], done: cl.timeOutCompleted, at: cl.timeOutAt, by: cl.timeOutBy },
    { key: "signOut" as const, label: "Sign Out (Before Patient Leaves)", items: ["Name of procedure recorded", "Instrument, sponge, needle counts correct", "Specimens labelled correctly", "Equipment issues addressed", "Recovery plan discussed"], done: cl.signOutCompleted, at: cl.signOutAt, by: cl.signOutBy },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">WHO Surgical Safety Checklist</h3>
            <p className="text-xs text-[var(--text-secondary)]">{proc.procedureName} — {proc.patientName}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="space-y-4">
          {phases.map((ph) => (
            <div key={ph.key} className={`rounded-xl border p-4 ${ph.done ? "border-[var(--normal-fg)]/20 bg-[var(--normal-bg)]" : "border-[var(--border-default)]"}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-[var(--text-primary)]">{ph.label}</p>
                <button
                  onClick={() => updateChecklist(procedureId, ph.key, "Nurse Station")}
                  disabled={ph.done}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${ph.done ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--action-primary)] text-white hover:bg-[var(--action-primary-hover)]"}`}
                >
                  {ph.done ? `✓ Done ${ph.at ? fmtTime(ph.at) : ""}` : "Mark Complete"}
                </button>
              </div>
              <ul className="space-y-1">
                {ph.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                    <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full ${ph.done ? "bg-[var(--normal-fg)] text-white" : "border border-[var(--border-default)]"}`}>
                      {ph.done && <span className="text-[9px]">✓</span>}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)]">Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Procedure Detail Panel ────────────────────────────────────────────────────

function ProcedurePanel({ procedureId, onClose }: { procedureId: string; onClose: () => void }) {
  const proc = useOTStore(useShallow((s) => s.getById(procedureId)));
  const startProcedure = useOTStore(useShallow((s) => s.startProcedure));
  const completeProcedure = useOTStore(useShallow((s) => s.completeProcedure));
  const cancelProcedure = useOTStore(useShallow((s) => s.cancelProcedure));
  const [showWHO, setShowWHO] = useState(false);

  if (!proc) return null;

  return (
    <>
      {showWHO && <WHOChecklistDialog procedureId={procedureId} onClose={() => setShowWHO(false)} />}
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{proc.procedureName}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{proc.patientName} · {proc.patientId}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Specialty", proc.specialty],
              ["Surgeon", proc.surgeon],
              ["Anaesthetist", proc.anaesthetist],
              ["Anaesthesia", proc.anaesthesiaType],
              ["Scheduled", fmtDateTime(proc.scheduledAt)],
              ["Duration", `${proc.estimatedDuration} min`],
              ["Urgency", proc.urgency],
              ["Status", proc.status],
              ...(proc.startedAt ? [["Started", fmtDateTime(proc.startedAt)]] : []),
              ...(proc.completedAt ? [["Completed", fmtDateTime(proc.completedAt)]] : []),
            ].map(([label, value]) => (
              <div key={label} className="border-b border-[var(--border-default)] pb-2">
                <dt className="text-[10px] font-medium uppercase text-[var(--text-secondary)]">{label}</dt>
                <dd className="mt-0.5 font-medium text-[var(--text-primary)]">
                  {label === "Urgency" ? <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${URGENCY_CLS[value as OTUrgency]}`}>{value}</span> : label === "Status" ? <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PROC_STATUS_CLS[value as OTProcedureStatus]}`}>{value}</span> : value}
                </dd>
              </div>
            ))}
          </dl>
          {proc.notes && <p className="mt-3 text-xs text-[var(--text-secondary)]">Notes: {proc.notes}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {proc.status === "Scheduled" && (
              <button onClick={() => { startProcedure(proc.id, "Nurse Station"); }} className="rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white">Start Procedure</button>
            )}
            {proc.status === "In Progress" && (
              <>
                <button onClick={() => setShowWHO(true)} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]">
                  <ShieldCheck size={12} /> WHO Checklist
                </button>
                <button onClick={() => { completeProcedure(proc.id, "Nurse Station"); }} className="rounded-lg bg-[var(--normal-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--normal-fg)]">Complete</button>
              </>
            )}
            {(proc.status === "Scheduled" || proc.status === "In Progress") && (
              <button onClick={() => { cancelProcedure(proc.id, "Nurse Station"); onClose(); }} className="rounded-lg border border-[var(--critical-fg)] px-3 py-1.5 text-xs font-medium text-[var(--critical-fg)]">Cancel</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TheatrePage() {
  const theatres = useOTStore(useShallow((s) => s.theatres ?? []));
  const procedures = useOTStore(useShallow((s) => s.procedures ?? []));
  const [tab, setTab] = useState<"theatres" | "schedule">("theatres");
  const [detailProc, setDetailProc] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState("2026-06-11");

  const todayProcs = useOTStore(useShallow((s) => s.getByDate?.(dateFilter) ?? []));
  const inProg = procedures.filter((p) => p.status === "In Progress").length;
  const sched = procedures.filter((p) => p.status === "Scheduled").length;

  return (
    <div className="space-y-5 pb-8">
      {detailProc && <ProcedurePanel procedureId={detailProc} onClose={() => setDetailProc(null)} />}

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Operation Theatre Management</h1>
          <p className="text-sm text-[var(--text-secondary)]">OT scheduling, workflow & safety checklists</p>
        </div>
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Theatres", value: theatres.length, sub: `${theatres.filter((t) => t.status === "Available").length} available`, icon: Stethoscope, color: "var(--action-primary)" },
          { label: "In Progress", value: inProg, sub: "Active surgeries", icon: Clock, color: "var(--warning-fg)" },
          { label: "Scheduled", value: sched, sub: "Upcoming procedures", icon: CheckCircle2, color: "var(--info-fg)" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p>
              <c.icon size={15} style={{ color: c.color }} />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--text-primary)]">{c.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-6 border-b border-[var(--border-default)]">
        {[{ id: "theatres" as const, label: "Theatres" }, { id: "schedule" as const, label: "Schedule" }].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`pb-2.5 text-sm font-medium transition-colors ${tab === t.id ? "border-b-2 border-[var(--action-primary)] text-[var(--action-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{t.label}</button>
        ))}
      </div>

      {tab === "theatres" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {theatres.map((t) => (
            <TheatreCard key={t.id} theatreId={t.id} onClick={() => setDetailProc(procedures.find((p) => p.theatreId === t.id && p.status === "In Progress")?.id ?? null)} />
          ))}
        </div>
      )}

      {tab === "schedule" && (
        <div className="space-y-2">
          {todayProcs.length === 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-12 text-center">
              <p className="text-sm text-[var(--text-secondary)]">No procedures scheduled for this date</p>
            </div>
          )}
          {todayProcs.map((p) => (
            <button key={p.id} onClick={() => setDetailProc(p.id)} className="w-full text-left rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 hover:bg-[var(--surface-sunken)] transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{p.procedureName}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${URGENCY_CLS[p.urgency]}`}>{p.urgency}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${PROC_STATUS_CLS[p.status]}`}>{p.status}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{p.patientName} · {p.surgeon} · {fmtTime(p.scheduledAt)} ({p.estimatedDuration} min)</p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)]" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
