"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarCheck2, Plus, Clock, User, Stethoscope, X } from "lucide-react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { KpiCard } from "@/components/ui/KpiCard";

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

const ALL_STATUSES = ["Scheduled", "In Progress", "Completed", "Cancelled", "No Show"];
const ALL_TYPES    = ["OPD", "Tele", "Follow-up"];

export default function ReceptionAppointmentsPage() {
  const appointments = useAppointmentStore((s) => s.appointments);
  const updateStatus = useAppointmentStore((s) => s.updateStatus);

  const [query,        setQuery]        = useState("");
  const [dateFilter,   setDateFilter]   = useState(TODAY);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [showFilters,  setShowFilters]  = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return appointments.filter((a) => {
      if (dateFilter && a.date !== dateFilter) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      if (typeFilter && a.type !== typeFilter) return false;
      if (q && !(a.patient.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q) || a.id.toLowerCase().includes(q))) return false;
      return true;
    }).sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, query, dateFilter, statusFilter, typeFilter]);

  const todayAppts = appointments.filter((a) => a.date === TODAY);
  const scheduled  = todayAppts.filter((a) => a.status === "Scheduled").length;
  const completed  = todayAppts.filter((a) => a.status === "Completed").length;
  const inProg     = todayAppts.filter((a) => a.status === "In Progress").length;

  const hasFilters = !!(statusFilter || typeFilter || dateFilter !== TODAY);
  const clearFilters = () => { setStatusFilter(""); setTypeFilter(""); setDateFilter(TODAY); };

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="Appointments"
        subtitle={`Showing ${filtered.length} appointment${filtered.length !== 1 ? "s" : ""}`}
        action={
          <Link href="/reception/appointments/new" className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <Plus size={15} /> Book Appointment
          </Link>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Scheduled"   value={scheduled} icon={<Clock size={16} />}         colorClass="text-[var(--info-fg)]" />
        <KpiCard label="In Progress" value={inProg}    icon={<User size={16} />}           colorClass="text-[var(--warning-fg)]" />
        <KpiCard label="Completed"   value={completed} icon={<CalendarCheck2 size={16} />} colorClass="text-[var(--normal-fg)]" />
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <SearchBar
              value={query} onChange={setQuery}
              placeholder="Search patient, doctor, department…"
              onFilterClick={() => setShowFilters((v) => !v)}
              hasFilters={hasFilters} activeCount={[statusFilter, typeFilter, dateFilter !== TODAY].filter(Boolean).length}
              onClear={clearFilters}
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2 rounded-lg bg-[var(--surface-sunken)] p-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] self-center">Status:</span>
              {ALL_STATUSES.map((s) => (
                <button key={s} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${statusFilter === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-[var(--text-secondary)] self-center">Type:</span>
              {ALL_TYPES.map((t) => (
                <button key={t} onClick={() => setTypeFilter(typeFilter === t ? "" : t)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${typeFilter === t ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden grid-cols-[80px_1fr_1fr_120px_100px_120px_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Time</span>
          <span>Patient</span>
          <span>Doctor / Dept</span>
          <span>Type</span>
          <span>Status</span>
          <span>Actions</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<CalendarCheck2 size={32} />} message="No appointments found" actionLabel="Book Appointment" onAction={() => window.location.href = "/reception/appointments/new"} />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((a) => (
              <div key={a.id} className="grid grid-cols-1 gap-2 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[80px_1fr_1fr_120px_100px_120px_auto] md:items-center md:gap-4">
                {/* Time */}
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-[var(--text-secondary)] shrink-0" />
                  <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{a.time}</span>
                </div>
                {/* Patient */}
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{a.patient}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.age}y · {a.sex === "M" ? "Male" : a.sex === "F" ? "Female" : "Other"}</p>
                </div>
                {/* Doctor */}
                <div>
                  <p className="text-sm text-[var(--text-primary)]">{a.doctor}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.dept}</p>
                </div>
                {/* Type */}
                <StatusBadge label={a.type} colorClass={TYPE_CLS[a.type] ?? ""} />
                {/* Status */}
                <StatusBadge label={a.status} colorClass={STATUS_CLS[a.status] ?? ""} />
                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {a.status === "Scheduled" && (
                    <button onClick={() => updateStatus(a.id, "In Progress")}
                      className="rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]">
                      Check-in
                    </button>
                  )}
                  {a.status === "In Progress" && (
                    <button onClick={() => updateStatus(a.id, "Completed")}
                      className="rounded-lg bg-[var(--normal-fg)] px-2.5 py-1 text-xs font-medium text-white hover:opacity-90">
                      Complete
                    </button>
                  )}
                  {(a.status === "Scheduled" || a.status === "In Progress") && (
                    <button onClick={() => updateStatus(a.id, "Cancelled")}
                      className="rounded-lg border border-[var(--critical-fg)] px-2.5 py-1 text-xs font-medium text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
