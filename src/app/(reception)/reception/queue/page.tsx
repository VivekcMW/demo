"use client";

import { useState } from "react";
import {
  Users, ChevronRight, AlertTriangle, Clock,
  Plus, SkipForward, CheckCircle2, Activity,
} from "lucide-react";
import { useQueueStore } from "@/store/useQueueStore";
import { QUEUE_DEPTS, type TokenType } from "@/data/seedQueue";
import { PageHeader } from "@/components/ui/PageHeader";
const TYPE_CLS: Record<TokenType, string> = {
  OPD:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
  "Walk-in": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

// ── Walk-in modal ─────────────────────────────────────────────────────────────

function WalkInModal({ deptId, onClose }: { deptId: string; onClose: () => void }) {
  const addWalkIn = useQueueStore((s) => s.addWalkIn);
  const [name, setName] = useState("");
  const [uhid, setUhid] = useState("");
  const [type, setType] = useState<TokenType>("Walk-in");

  const submit = () => {
    if (!name.trim()) return;
    addWalkIn(deptId, name.trim(), uhid.trim(), type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">Add Walk-in Patient</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Patient Name <span className="text-[var(--critical-fg)]">*</span></label>
            <input className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm focus:border-[var(--action-primary)] outline-none" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">UHID (optional)</label>
            <input className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm focus:border-[var(--action-primary)] outline-none" placeholder="If registered" value={uhid} onChange={(e) => setUhid(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Type</label>
            <div className="flex gap-2">
              {(["Walk-in", "OPD", "Emergency"] as TokenType[]).map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors ${type === t ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={submit} disabled={!name.trim()} className="flex-1 rounded-lg bg-[var(--action-primary)] py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50">Add Token</button>
        </div>
      </div>
    </div>
  );
}

// ── Dept Queue Panel ──────────────────────────────────────────────────────────

function DeptQueuePanel({ dept }: { dept: typeof QUEUE_DEPTS[0] }) {
  const callNext  = useQueueStore((s) => s.callNext);
  const skipToken = useQueueStore((s) => s.skipToken);
  const getWaiting = useQueueStore((s) => s.getWaiting);
  const getServing = useQueueStore((s) => s.getServing);
  const tokens    = useQueueStore((s) => s.tokens);
  const estimatedWait = useQueueStore((s) => s.estimatedWait);

  const [showWalkIn, setShowWalkIn] = useState(false);

  const serving = getServing(dept.id);
  const waiting = getWaiting(dept.id);
  const done    = tokens.filter((t) => t.deptId === dept.id && t.status === "done").length;

  return (
    <>
      {showWalkIn && <WalkInModal deptId={dept.id} onClose={() => setShowWalkIn(false)} />}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Dept Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-[var(--text-primary)]">{dept.name}</p>
              {!dept.isOpen && <span className="rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--critical-fg)]">Closed</span>}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{dept.doctor}</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[var(--normal-fg)]" /> {done} done</span>
            <span className="flex items-center gap-1"><Clock size={12} className="text-[var(--warning-fg)]" /> {waiting.length} waiting</span>
          </div>
        </div>

        {/* Now Serving */}
        <div className="grid grid-cols-1 gap-px md:grid-cols-[1fr_2fr]">
          <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)] p-4 md:border-b-0 md:border-r">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--action-primary)] mb-1">Now Serving</p>
            {serving ? (
              <div>
                <p className="text-3xl font-black tabular-nums text-[var(--action-primary)]">
                  {String(serving.tokenNo).padStart(3, "0")}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)] truncate">{serving.patientName}</p>
                <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${TYPE_CLS[serving.type]}`}>{serving.type}</span>
              </div>
            ) : (
              <p className="text-sm text-[var(--text-secondary)] mt-2">— No one being seen</p>
            )}
            <div className="flex flex-col gap-2 mt-4">
              <button onClick={() => callNext(dept.id)} disabled={waiting.length === 0}
                className="flex items-center justify-center gap-2 rounded-lg bg-[var(--action-primary)] py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-40 transition-colors">
                <ChevronRight size={14} /> Call Next
              </button>
              <button onClick={() => setShowWalkIn(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
                <Plus size={13} /> Add Walk-in
              </button>
            </div>
          </div>

          {/* Waiting list */}
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Waiting Queue</p>
            {waiting.length === 0 ? (
              <p className="text-xs text-[var(--text-secondary)] py-4 text-center">No patients waiting</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {waiting.map((t, i) => (
                  <div key={t.id} className={`flex items-center justify-between rounded-lg px-3 py-2 ${t.type === "Emergency" ? "bg-[var(--critical-bg)] border border-[var(--critical-fg)]/20" : "bg-[var(--surface-sunken)]"}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold tabular-nums text-[var(--text-primary)] w-8">{String(t.tokenNo).padStart(3, "0")}</span>
                      <div>
                        <p className="text-xs font-medium text-[var(--text-primary)]">{t.patientName}</p>
                        <p className="text-[10px] text-[var(--text-secondary)]">~{estimatedWait(dept.id, i + 1)} min wait</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.type === "Emergency" && <AlertTriangle size={13} className="text-[var(--critical-fg)]" />}
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${TYPE_CLS[t.type]}`}>{t.type}</span>
                      <button onClick={() => skipToken(t.id)} title="Skip token"
                        className="rounded p-0.5 text-[var(--text-secondary)] hover:text-[var(--critical-fg)] transition-colors">
                        <SkipForward size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function QueuePage() {
  const tokens = useQueueStore((s) => s.tokens);
  const [activeTab, setActiveTab] = useState("all");

  const totalWaiting = tokens.filter((t) => t.status === "waiting").length;
  const totalServing = tokens.filter((t) => t.status === "serving").length;
  const totalDone    = tokens.filter((t) => t.status === "done").length;
  const emergencies  = tokens.filter((t) => t.type === "Emergency" && t.status === "waiting").length;

  const displayDepts = activeTab === "all" ? QUEUE_DEPTS : QUEUE_DEPTS.filter((d) => d.id === activeTab);

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="OPD Queue"
        subtitle="Live token management across all departments"
      />

      {/* Global KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Waiting",   value: totalWaiting, cls: "text-[var(--warning-fg)]",  icon: <Users size={16} /> },
          { label: "Being Seen",      value: totalServing, cls: "text-[var(--action-primary)]",icon: <Activity size={16} /> },
          { label: "Done Today",      value: totalDone,    cls: "text-[var(--normal-fg)]",    icon: <CheckCircle2 size={16} /> },
          { label: "Emergencies",     value: emergencies,  cls: "text-[var(--critical-fg)]",  icon: <AlertTriangle size={16} /> },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{k.label}</p>
              <span className={k.cls}>{k.icon}</span>
            </div>
            <p className={`mt-2 text-2xl font-bold tabular-nums ${k.cls}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Dept tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-1">
        <button onClick={() => setActiveTab("all")}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${activeTab === "all" ? "bg-[var(--action-primary)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>
          All Departments
        </button>
        {QUEUE_DEPTS.filter((d) => d.isOpen).map((d) => (
          <button key={d.id} onClick={() => setActiveTab(d.id)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${activeTab === d.id ? "bg-[var(--action-primary)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>
            {d.name.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Queue panels */}
      <div className={`grid gap-5 ${activeTab === "all" ? "lg:grid-cols-2" : ""}`}>
        {displayDepts.map((d) => (
          <DeptQueuePanel key={d.id} dept={d} />
        ))}
      </div>
    </div>
  );
}
