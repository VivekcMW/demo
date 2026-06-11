"use client";

import { useMemo, useState } from "react";
import { BedDouble, Check, PrinterCheck, UserCheck, Search } from "lucide-react";
import { useIPDStore } from "@/store/useIPDStore";
import type { Admission } from "@/data/seedAdmissions";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_CLS: Record<string, string> = {
  Planned:    "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Active:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Discharged: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Transferred:"bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

export default function IPDPage() {
  const admissions      = useIPDStore((s) => s.admissions);
  const confirmAdmit    = useIPDStore((s) => s.confirmAdmission);
  const { toast }    = useToast();

  const [query, setQuery]   = useState("");
  const [filter, setFilter] = useState<"all" | "Planned" | "Active">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return admissions.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (q && !(a.patientName.toLowerCase().includes(q) || a.ward.toLowerCase().includes(q) || a.attendingDoctor.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [admissions, query, filter]);

  const planned  = admissions.filter((a) => a.status === "Planned").length;
  const admitted = admissions.filter((a) => a.status === "Active").length;
  const beds     = admissions.filter((a) => a.bed).length;

  const handleConfirm = (id: string, name: string) => {
    confirmAdmit(id);
    toast(`${name} admission confirmed`);
  };

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="IPD Requests"
        subtitle="In-patient admission management"
      />

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Pending Requests" value={planned}  icon={<BedDouble size={16} />}  colorClass="text-[var(--info-fg)]" />
        <KpiCard label="Admitted"         value={admitted} icon={<UserCheck size={16} />}  colorClass="text-[var(--normal-fg)]" />
        <KpiCard label="Beds Assigned"    value={beds}     icon={<Check size={16} />}       colorClass="text-[var(--action-primary)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]"
            placeholder="Search patient, ward…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {(["all", "Planned", "Active"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${filter === f ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
            {f === "all" ? "All" : f === "Active" ? "Admitted" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden grid-cols-[1fr_1fr_100px_120px_100px_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Patient</span>
          <span>Ward / Doctor</span>
          <span>Bed</span>
          <span>Admit Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<BedDouble size={32} />} message="No IPD records found" />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((a) => (
              <div key={a.id} className="grid grid-cols-1 gap-2 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[1fr_1fr_100px_120px_100px_auto] md:items-center md:gap-4">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{a.patientName}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.patientId}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--text-primary)]">{a.ward}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{a.attendingDoctor}</p>
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  {a.bed ? <span className="font-semibold text-[var(--text-primary)]">{a.bed}</span> : <span className="text-xs italic">Not assigned</span>}
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{a.admittedAt.slice(0, 10)}</p>
                <StatusBadge label={a.status} colorClass={STATUS_CLS[a.status] ?? ""} />
                <div className="flex gap-2 flex-wrap">
                  {a.status === "Planned" && (
                    <button onClick={() => handleConfirm(a.id, a.patientName)}
                      className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]">
                      <UserCheck size={12} /> Confirm
                    </button>
                  )}
                  <button onClick={() => { window.print(); toast("Print sent"); }}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                    <PrinterCheck size={12} /> Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
