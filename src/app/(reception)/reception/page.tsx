"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  UserPlus, CalendarCheck2, QrCode, BedDouble, Receipt,
  Users, Clock, CheckCircle2, XCircle, AlertTriangle,
  ArrowRight, ConciergeBell, TrendingUp,
} from "lucide-react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useQueueStore } from "@/store/useQueueStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useIPDStore } from "@/store/useIPDStore";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";

const TODAY = new Date().toISOString().slice(0, 10);

const STATUS_CLS: Record<string, string> = {
  Scheduled:    "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "In Progress":"bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Completed:    "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:    "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  "No Show":    "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const TYPE_CLS: Record<string, string> = {
  OPD:       "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Tele:      "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Follow-up":"bg-[var(--normal-bg)] text-[var(--normal-fg)]",
};

export default function ReceptionDashboard() {
  const appointments = useAppointmentStore((s) => s.appointments);
  const patients     = usePatientStore((s) => s.patients);
  const admissions   = useIPDStore((s) => s.admissions);
  const tokens       = useQueueStore((s) => s.tokens);

  const todayAppts = useMemo(() =>
    appointments.filter((a) => a.date === TODAY).sort((a, b) => a.time.localeCompare(b.time)),
    [appointments],
  );

  const totalWaiting = useMemo(() =>
    tokens.filter((t) => t.status === "waiting").length, [tokens]);

  const totalServing = useMemo(() =>
    tokens.filter((t) => t.status === "serving").length, [tokens]);

  const scheduled  = todayAppts.filter((a) => a.status === "Scheduled").length;
  const inProgress = todayAppts.filter((a) => a.status === "In Progress").length;
  const completed  = todayAppts.filter((a) => a.status === "Completed").length;
  const noShow     = todayAppts.filter((a) => a.status === "No Show").length;

  const pendingAdmissions = admissions.filter((a) => a.status === "Planned").length;

  const kpis = [
    { label: "Today's Appointments", value: todayAppts.length, icon: CalendarCheck2, colorClass: "text-[var(--action-primary)]", sub: `${scheduled} upcoming` },
    { label: "In Waiting Queue",      value: totalWaiting,     icon: Users,          colorClass: "text-[var(--warning-fg)]",     sub: `${totalServing} being seen` },
    { label: "Completed Today",       value: completed,         icon: CheckCircle2,   colorClass: "text-[var(--normal-fg)]",      sub: `${noShow} no-show` },
    { label: "Pending IPD Requests",  value: pendingAdmissions, icon: BedDouble,      colorClass: "text-[var(--info-fg)]",        sub: "admission pending" },
  ];

  const quickActions = [
    { label: "Register Patient",  href: "/reception/register",      icon: UserPlus,       color: "bg-[var(--action-primary)]" },
    { label: "Book Appointment",  href: "/reception/appointments/new",icon: CalendarCheck2,color: "bg-[var(--info-fg)]" },
    { label: "Check-in Patient",  href: "/reception/checkin",       icon: QrCode,         color: "bg-[var(--normal-fg)]" },
    { label: "New Bill",          href: "/reception/billing",       icon: Receipt,        color: "bg-[var(--warning-fg)]" },
    { label: "OPD Queue",         href: "/reception/queue",         icon: Users,          color: "bg-[var(--critical-fg)]" },
    { label: "IPD Requests",      href: "/reception/ipd",           icon: BedDouble,      color: "bg-[var(--action-primary)]" },
  ];

  // Recent upcoming appointments (next 8)
  const upcoming = todayAppts.filter((a) => a.status === "Scheduled" || a.status === "In Progress").slice(0, 8);

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Reception Dashboard"
        subtitle={`${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}`}
        action={
          <Link href="/reception/register" className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <UserPlus size={15} /> New Patient
          </Link>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={<k.icon size={16} />} colorClass={k.colorClass} sub={k.sub} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Quick Actions</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border-default)] p-3 text-center transition-all hover:border-[var(--action-primary)] hover:shadow-sm"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${a.color}`}>
                <a.icon size={18} />
              </div>
              <span className="text-xs font-medium text-[var(--text-primary)] leading-tight">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <CalendarCheck2 size={16} className="text-[var(--action-primary)]" />
              <p className="font-semibold text-sm text-[var(--text-primary)]">Today's Appointments</p>
            </div>
            <Link href="/reception/appointments" className="flex items-center gap-1 text-xs text-[var(--action-primary)] hover:underline">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <div className="py-10 text-center text-sm text-[var(--text-secondary)]">No upcoming appointments</div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {upcoming.map((a) => (
                <div key={a.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors">
                  <div className="w-12 shrink-0 text-center">
                    <p className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{a.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{a.patient}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{a.doctor} · {a.dept}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_CLS[a.type] ?? ""}`}>{a.type}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[a.status] ?? ""}`}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Queue Summary */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[var(--action-primary)]" />
              <p className="font-semibold text-sm text-[var(--text-primary)]">Live Queue</p>
            </div>
            <Link href="/reception/queue" className="flex items-center gap-1 text-xs text-[var(--action-primary)] hover:underline">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {["gen", "card", "ortho", "peds"].map((deptId) => {
              const deptTokens = tokens.filter((t) => t.deptId === deptId);
              const waiting    = deptTokens.filter((t) => t.status === "waiting").length;
              const serving    = deptTokens.find((t) => t.status === "serving");
              const deptNames: Record<string, string> = { gen: "Gen. Medicine", card: "Cardiology", ortho: "Ortho", peds: "Paeds" };
              return (
                <div key={deptId} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{deptNames[deptId]}</p>
                    {serving && <p className="text-[10px] text-[var(--text-secondary)]">Now: {serving.patientName}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {waiting > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--warning-bg)] text-[10px] font-bold text-[var(--warning-fg)]">{waiting}</span>
                    )}
                    <span className="text-xs text-[var(--text-secondary)]">waiting</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-[var(--border-default)] px-5 py-3">
            <Link href="/reception/queue" className="flex items-center justify-center gap-2 rounded-lg border border-[var(--action-primary)] py-2 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-subtle)] transition-colors">
              <Users size={13} /> Open Queue Board
            </Link>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Scheduled",   value: scheduled,  icon: Clock,         cls: "text-[var(--info-fg)]" },
          { label: "In Progress", value: inProgress, icon: TrendingUp,    cls: "text-[var(--warning-fg)]" },
          { label: "Completed",   value: completed,  icon: CheckCircle2,  cls: "text-[var(--normal-fg)]" },
          { label: "No Show",     value: noShow,     icon: XCircle,       cls: "text-[var(--critical-fg)]" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <s.icon size={20} className={`shrink-0 ${s.cls}`} />
            <div>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</p>
              <p className="text-xs text-[var(--text-secondary)]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
