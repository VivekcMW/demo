"use client";

import { useMemo, useState } from "react";
import { usePhysiotherapyStore, type TherapyStatus, type SessionStatus } from "@/store/usePhysiotherapyStore";
import { Dumbbell, Calendar, CheckCircle2, Clock, AlertTriangle, Play, XCircle, ChevronDown, ChevronUp } from "lucide-react";

const STATUS_CLS: Record<string, string> = {
  Planned: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Active: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "On Hold": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Completed: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Discontinued: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const GOAL_ICONS: Record<string, string> = {
  Strengthening: "💪",
  "Range of Motion": "🔄",
  Stretching: "🧘",
  Balance: "⚖️",
  Gait: "🚶",
  Endurance: "🏃",
  Coordination: "🎯",
  Respiratory: "🫁",
};

export default function PhysiotherapyPage() {
  const plans = usePhysiotherapyStore((s) => s.plans);
  const sessions = usePhysiotherapyStore((s) => s.sessions);
  const updatePlanStatus = usePhysiotherapyStore((s) => s.updatePlanStatus);
  const updateSessionStatus = usePhysiotherapyStore((s) => s.updateSessionStatus);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<TherapyStatus | "all">("all");

  const filtered = useMemo(() => {
    return filterStatus === "all" ? plans : plans.filter((p) => p.status === filterStatus);
  }, [plans, filterStatus]);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Dumbbell size={24} className="text-[var(--action-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Physiotherapy</h1>
            <p className="text-sm text-[var(--text-secondary)]">Treatment plans, exercise protocols & session tracking</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Active Plans", value: plans.filter((p) => p.status === "Active").length, icon: Play, color: "var(--normal-fg)" },
          { label: "Sessions Today", value: sessions.filter((s) => s.date === new Date().toISOString().split("T")[0] && s.status === "Scheduled").length, icon: Calendar, color: "var(--action-primary)" },
          { label: "Completed Today", value: sessions.filter((s) => s.date === new Date().toISOString().split("T")[0] && s.status === "Completed").length, icon: CheckCircle2, color: "var(--normal-fg)" },
          { label: "Missed", value: sessions.filter((s) => s.status === "Missed").length, icon: AlertTriangle, color: "var(--critical-fg)" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
            <div className="flex items-center justify-between"><p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p><c.icon size={14} style={{ color: c.color }} /></div>
            <p className="mt-1 text-xl font-bold tabular-nums text-[var(--text-primary)]">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(["all", "Active", "Planned", "On Hold", "Completed"] as const).map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${filterStatus === s ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>{s === "all" ? "All" : s}</button>
        ))}
      </div>

      {/* Plans */}
      <div className="space-y-3">
        {filtered.map((plan) => {
          const planSessions = sessions.filter((s) => s.planId === plan.id);
          const upcomingSessions = planSessions.filter((s) => s.status === "Scheduled");
          const isExpanded = expandedPlan === plan.id;
          return (
            <div key={plan.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <button onClick={() => setExpandedPlan(isExpanded ? null : plan.id)} className="flex w-full items-start justify-between p-4 text-left hover:bg-[var(--surface-sunken)]">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{plan.patientName}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${STATUS_CLS[plan.status]}`}>{plan.status}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{plan.diagnosis} · {plan.therapist} · Started {plan.startDate}</p>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
                    <span>{plan.exercises.length} exercises</span>
                    <span>{planSessions.length} sessions</span>
                    <span>{upcomingSessions.length} upcoming</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {plan.status === "Planned" && <span onClick={(e) => { e.stopPropagation(); updatePlanStatus(plan.id, "Active"); }} className="cursor-pointer rounded bg-[var(--normal-fg)] px-2 py-0.5 text-[9px] font-semibold text-white">Activate</span>}
                  {plan.status === "Active" && <span onClick={(e) => { e.stopPropagation(); updatePlanStatus(plan.id, "On Hold"); }} className="cursor-pointer rounded bg-[var(--warning-bg)] px-2 py-0.5 text-[9px] font-medium text-[var(--warning-fg)]">Hold</span>}
                  {plan.status === "Active" && <span onClick={(e) => { e.stopPropagation(); updatePlanStatus(plan.id, "Completed"); }} className="cursor-pointer rounded bg-[var(--surface-sunken)] px-2 py-0.5 text-[9px] font-medium text-[var(--text-secondary)]">Complete</span>}
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-secondary)]" /> : <ChevronDown size={16} className="text-[var(--text-secondary)]" />}
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--border-subtle)] p-4 space-y-4">
                  {/* Exercise protocols */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">Exercise Protocol</p>
                    <div className="space-y-2">
                      {plan.exercises.map((ex) => (
                        <div key={ex.id} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span>{GOAL_ICONS[ex.goal] || "🏋️"}</span>
                                <p className="text-sm font-medium text-[var(--text-primary)]">{ex.name}</p>
                              </div>
                              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{ex.sets} sets × {ex.reps} reps{ex.holdSec ? ` (hold ${ex.holdSec}s)` : ""} · {ex.frequency} · {ex.goal}</p>
                            </div>
                          </div>
                          <p className="mt-1 text-[10px] italic text-[var(--text-secondary)]">{ex.instructions}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sessions */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">Session History</p>
                    <div className="space-y-1">
                      {planSessions.map((s) => (
                        <div key={s.id} className="flex items-center justify-between rounded-lg px-3 py-2 border border-[var(--border-subtle)]">
                          <div className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full ${s.status === "Completed" ? "bg-[var(--normal-fg)]" : s.status === "Scheduled" ? "bg-[var(--info-fg)]" : s.status === "Missed" ? "bg-[var(--critical-fg)]" : "bg-[var(--text-disabled)]"}`} />
                            <div>
                              <p className="text-xs font-medium text-[var(--text-primary)]">{s.date} at {s.time}</p>
                              <p className="text-[10px] text-[var(--text-secondary)]">{s.therapist} · {s.duration} min · {s.exercisesCompleted.filter((e) => e.completed).length}/{plan.exercises.length} exercises done</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`rounded px-1.5 py-0.5 text-[9px] font-medium ${s.status === "Completed" ? "text-[var(--normal-fg)]" : s.status === "Scheduled" ? "text-[var(--info-fg)]" : s.status === "Missed" ? "text-[var(--critical-fg)]" : "text-[var(--text-secondary)]"}`}>{s.status}</span>
                            {s.status === "Scheduled" && <button onClick={() => updateSessionStatus(s.id, "Completed")} className="rounded bg-[var(--normal-fg)] px-2 py-0.5 text-[9px] font-semibold text-white">Done</button>}
                            {s.status === "Scheduled" && <button onClick={() => updateSessionStatus(s.id, "Missed")} className="rounded border border-[var(--critical-fg)] px-2 py-0.5 text-[9px] font-medium text-[var(--critical-fg)]">Miss</button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {plan.notes && (
                    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-1">Clinical Notes</p>
                      <p className="text-xs text-[var(--text-primary)]">{plan.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
