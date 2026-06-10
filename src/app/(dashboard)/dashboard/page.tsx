"use client";

import { useState } from "react";
import {
  Activity, FlaskConical,
  Clock, AlertTriangle, CheckCircle2, Info,
  AlertOctagon, ChevronRight, CalendarClock, X,
} from "lucide-react";
import { OpdTrendChart } from "@/components/charts/OpdTrendChart";
import { CaseTypeDonut } from "@/components/charts/CaseTypeDonut";
import { TopDiagnosesChart } from "@/components/charts/TopDiagnosesChart";
import { AgeDistributionChart } from "@/components/charts/AgeDistributionChart";
import {
  opdQueue, pendingLabResults, upcomingAppointments, chronicAlerts,
  type LabFlag,
} from "@/data/seedDashboard";

// ── helpers ──────────────────────────────────────────────────────────────────
function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Waiting":     "bg-[var(--info-bg)]     text-[var(--info-fg)]",
    "In Progress": "bg-[var(--warning-bg)]  text-[var(--warning-fg)] font-semibold",
    "Completed":   "bg-[var(--normal-bg)]   text-[var(--normal-fg)]",
    "No Show":     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

function LabFlagChip({ flag }: { flag: LabFlag }) {
  const map: Record<LabFlag, string> = {
    HH:      "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-semibold",
    LL:      "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-semibold",
    H:       "bg-[var(--warning-bg)]  text-[var(--warning-fg)]",
    L:       "bg-[var(--warning-bg)]  text-[var(--warning-fg)]",
    N:       "bg-[var(--normal-bg)]   text-[var(--normal-fg)]",
    Pending: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };
  const symbol: Record<LabFlag, string> = {
    HH: "▲▲ Critical High", LL: "▼▼ Critical Low",
    H: "▲ High", L: "▼ Low", N: "Normal", Pending: "Pending",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${map[flag]}`}>
      {symbol[flag]}
    </span>
  );
}

function ApptTypeBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    OPD:         "bg-[var(--info-bg)] text-[var(--info-fg)]",
    Tele:        "bg-[var(--action-subtle)] text-[var(--action-primary)]",
    "Follow-up": "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[type] ?? ""}`}>
      {type}
    </span>
  );
}

// ── critical labs (HH/LL only) ───────────────────────────────────────────────
const criticalLabs = pendingLabResults.filter((r) => r.flag === "HH" || r.flag === "LL");

export default function DashboardPage() {
  const [alertDismissed, setAlertDismissed] = useState(false);

  return (
    <div className="space-y-5 pb-8">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Good morning, Dr. Sharma</h1>
          <p className="text-sm text-[var(--text-secondary)]">Tuesday, 10 Jun 2026 · General Medicine OPD</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--normal-bg)] px-3 py-1 text-xs font-medium text-[var(--normal-fg)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--normal-fg)]" />
            OPD Open
          </span>
        </div>
      </div>

      {/* ── KPI snapshot ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Seen today",  value: "62",     sub: "3 left in queue",         icon: Activity,     color: "var(--normal-fg)" },
          { label: "Avg wait",    value: "18 min", sub: "↑ 3 min vs yesterday",     icon: Clock,        color: "var(--warning-fg)" },
          { label: "Lab pending", value: "5",      sub: "2 critical · 2 abnormal", icon: FlaskConical, color: "var(--critical-fg)" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p>
              <c.icon size={16} style={{ color: c.color }} />
            </div>
            <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{c.value}</p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* ══ PRIORITY 1 — CRITICAL LAB ALERTS ══════════════════════════
          Doctor MUST see this first. Someone's potassium is 2.8.          */}
      {criticalLabs.length > 0 && !alertDismissed && (
        <div className="rounded-xl border-2 border-[var(--critical-fg)] bg-[var(--critical-bg)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertOctagon size={18} className="text-[var(--critical-fg)]" />
            <p className="flex-1 text-sm font-semibold text-[var(--critical-fg)]">
              {criticalLabs.length} Critical Lab Result{criticalLabs.length > 1 ? "s" : ""} — Immediate Review Required
            </p>
            <button
              onClick={() => setAlertDismissed(true)}
              title="Dismiss alert"
              className="ml-auto rounded-md p-1 hover:bg-[var(--critical-fg)]/10 text-[var(--critical-fg)]"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {criticalLabs.map((r, i) => (
              <div key={i} className="flex flex-col gap-0.5 rounded-lg bg-white/60 px-4 py-2.5 dark:bg-black/20 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{r.patient}</span>
                  <span className="ml-2 font-mono text-xs text-[var(--text-secondary)]">{r.uhid}</span>
                  <span className="ml-3 text-sm text-[var(--text-primary)]">{r.test}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 sm:mt-0">
                  <span className="text-lg font-bold tabular-nums text-[var(--critical-fg)]">{r.value}</span>
                  <span className="text-xs text-[var(--text-secondary)]">Ref: {r.ref}</span>
                  <LabFlagChip flag={r.flag} />
                  <button className="text-xs font-medium text-[var(--critical-fg)] underline hover:no-underline">
                    Acknowledge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ PRIORITY 2 — LIVE OPD QUEUE ═══════════════════════════════
          Who is sitting outside? Who is next?                             */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">OPD Queue — Right Now</p>
            <p className="text-xs text-[var(--text-secondary)]">
              {opdQueue.filter(q => q.status === "Waiting").length} waiting ·{" "}
              {opdQueue.filter(q => q.status === "In Progress").length} in progress ·{" "}
              {opdQueue.filter(q => q.status === "Completed").length} done
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Clock size={13} />Avg wait: 18 min
          </div>
        </div>
        {/* Active / waiting patients shown prominently */}
        <div className="border-b border-[var(--border-default)] bg-[var(--action-subtle)] px-5 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--action-primary)]">Active</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                {["Token", "Patient", "Age / Sex", "Chief Complaint", "Wait", "Status"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-[var(--text-secondary)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* In Progress first */}
              {opdQueue.filter(q => q.status === "In Progress").map((row) => (
                <tr key={row.token} className="border-b border-[var(--border-default)] bg-[var(--warning-bg)]">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-[var(--warning-fg)]">{row.token}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--text-primary)]">{row.name}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{row.age}y {row.sex}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">—</td>
                  <td className="px-4 py-3 text-xs tabular-nums text-[var(--warning-fg)] font-medium">{row.wait}</td>
                  <td className="px-4 py-3"><StatusChip status={row.status} /></td>
                </tr>
              ))}
              {/* Waiting next */}
              {opdQueue.filter(q => q.status === "Waiting").map((row) => (
                <tr key={row.token} className="border-b border-[var(--border-default)] hover:bg-[var(--surface-sunken)]">
                  <td className="px-4 py-2.5 font-mono text-xs text-[var(--text-secondary)]">{row.token}</td>
                  <td className="px-4 py-2.5 font-medium text-[var(--text-primary)]">{row.name}</td>
                  <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">{row.age}y {row.sex}</td>
                  <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">—</td>
                  <td className="px-4 py-2.5 text-xs tabular-nums text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1"><Clock size={11} />{row.wait}</span>
                  </td>
                  <td className="px-4 py-2.5"><StatusChip status={row.status} /></td>
                </tr>
              ))}
              {/* Completed — collapsed/muted */}
              {opdQueue.filter(q => q.status === "Completed").map((row) => (
                <tr key={row.token} className="border-b border-[var(--border-default)] opacity-50 last:border-0">
                  <td className="px-4 py-2 font-mono text-xs text-[var(--text-secondary)]">{row.token}</td>
                  <td className="px-4 py-2 text-xs text-[var(--text-secondary)]">{row.name}</td>
                  <td className="px-4 py-2 text-xs text-[var(--text-secondary)]">{row.age}y {row.sex}</td>
                  <td className="px-4 py-2 text-xs text-[var(--text-secondary)]">—</td>
                  <td className="px-4 py-2 text-xs text-[var(--text-secondary)]">—</td>
                  <td className="px-4 py-2"><StatusChip status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ PRIORITY 3 — UPCOMING + PENDING ABNORMAL LABS ═════════════
          Next patients + labs that are abnormal but not critical          */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

        {/* Upcoming appointments */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-3">
            <CalendarClock size={16} className="text-[var(--action-primary)]" />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Up Next</p>
              <p className="text-xs text-[var(--text-secondary)]">Next 2 hours · {upcomingAppointments.length} scheduled</p>
            </div>
          </div>
          <ul className="divide-y divide-[var(--border-default)]">
            {upcomingAppointments.map((a, i) => (
              <li key={i} className={[
                "flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)]",
                i === 0 ? "bg-[var(--action-subtle)]" : "",
              ].join(" ")}>
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)]">
                  <span className="text-sm font-bold tabular-nums text-[var(--action-primary)]">{a.time.split(":")[0]}</span>
                  <span className="text-[10px] text-[var(--text-secondary)]">:{a.time.split(":")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--text-primary)]">{a.patient}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.age}y {a.sex}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ApptTypeBadge type={a.type} />
                  <ChevronRight size={14} className="text-[var(--text-secondary)]" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* All pending labs — sorted critical first */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Lab Results Inbox</p>
              <p className="text-xs text-[var(--text-secondary)]">
                {pendingLabResults.filter(r => r.flag === "HH" || r.flag === "LL").length} critical ·{" "}
                {pendingLabResults.filter(r => r.flag === "H" || r.flag === "L").length} abnormal ·{" "}
                {pendingLabResults.filter(r => r.flag === "Pending").length} awaited
              </p>
            </div>
          </div>
          <ul className="divide-y divide-[var(--border-default)]">
            {[...pendingLabResults]
              .sort((a, b) => {
                const order: Record<LabFlag, number> = { HH: 0, LL: 1, H: 2, L: 3, Pending: 4, N: 5 };
                return order[a.flag] - order[b.flag];
              })
              .map((row, i) => (
                <li key={i} className={[
                  "flex items-center gap-3 px-5 py-3 hover:bg-[var(--surface-sunken)]",
                  (row.flag === "HH" || row.flag === "LL") ? "bg-[var(--critical-bg)]" : "",
                ].join(" ")}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{row.patient}
                      <span className="ml-2 font-mono text-[10px] text-[var(--text-secondary)]">{row.uhid}</span>
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">{row.test} · Ref: {row.ref}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{row.value}</span>
                  <LabFlagChip flag={row.flag} />
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* ══ PRIORITY 4 — CHRONIC CARE GAPS ════════════════════════════
          Not urgent today but doctor should act this week               */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)]">
        <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-3">
          <AlertTriangle size={16} className="text-[var(--warning-fg)]" />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Chronic Care Gaps</p>
            <p className="text-xs text-[var(--text-secondary)]">Patients needing proactive follow-up</p>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-[var(--border-default)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
          {chronicAlerts.map((a, i) => {
            const iconMap = {
              critical: <AlertOctagon size={15} className="shrink-0 text-[var(--critical-fg)]" />,
              warning:  <AlertTriangle size={15} className="shrink-0 text-[var(--warning-fg)]" />,
              info:     <Info size={15} className="shrink-0 text-[var(--info-fg)]" />,
            };
            return (
              <div key={i} className={[
                "flex items-start gap-3 p-4",
                i >= 2 ? "border-t border-[var(--border-default)] sm:border-t-0" : "",
              ].join(" ")}>
                <div className="mt-0.5">{iconMap[a.severity]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {a.patient}
                    <span className="ml-1.5 font-mono text-[10px] text-[var(--text-secondary)]">{a.uhid}</span>
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.condition}</p>
                  <p className="mt-0.5 text-xs font-medium" style={{
                    color: a.severity === "critical" ? "var(--critical-fg)" : a.severity === "warning" ? "var(--warning-fg)" : "var(--info-fg)",
                  }}>{a.alert}</p>
                </div>
                <button title="Mark done">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--text-secondary)] hover:text-[var(--normal-fg)]" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ ANALYTICS (collapsed by default feel) ══════════
          Doctor checks this weekly, not every morning                    */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)]">
          Analytics &amp; Trends
        </p>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">OPD Trend — Last 14 days</p>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">New vs Follow-up consultations</p>
            <OpdTrendChart />
          </div>
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Case Mix — Today</p>
            <p className="mb-2 text-xs text-[var(--text-secondary)]">New vs Follow-up split</p>
            <CaseTypeDonut />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Top 10 Diagnoses</p>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">This month by case count</p>
            <TopDiagnosesChart />
          </div>
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
            <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Patient Age Distribution</p>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">All patients this month</p>
            <AgeDistributionChart />
          </div>
        </div>
      </div>

    </div>
  );
}

