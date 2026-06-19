"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePharmacyStore, type RxStatus } from "@/store/usePharmacyStore";
import type { PrescriptionRx } from "@/data/seedPharmacy";
import {
  Pill, Clock, CheckCircle2, AlertCircle, ShieldAlert,
  ChevronRight, Package, PackageCheck, PackageX, Loader2,
} from "lucide-react";
import { FilterDrawerShell, FilterSection, FilterToggleBtn } from "@/components/ui/FilterDrawerShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

// ── DS helpers ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<RxStatus, string> = {
  "Pending":              "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Verified":             "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  "Dispensing":           "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "Dispensed":            "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Partially Dispensed":  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "On Hold":              "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  "Cancelled":            "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const STATUS_ICON: Record<RxStatus, React.ReactNode> = {
  "Pending":              <Clock size={11} />,
  "Verified":             <CheckCircle2 size={11} />,
  "Dispensing":           <Loader2 size={11} />,
  "Dispensed":            <PackageCheck size={11} />,
  "Partially Dispensed":  <Package size={11} />,
  "On Hold":              <AlertCircle size={11} />,
  "Cancelled":            <PackageX size={11} />,
};

const SOURCE_CLS: Record<string, string> = {
  OPD:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  IPD:       "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Discharge: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
};

const ALL_STATUSES: RxStatus[] = ["Pending", "Verified", "Dispensing", "Partially Dispensed", "Dispensed", "On Hold", "Cancelled"];
const ALL_SOURCES = ["OPD", "IPD", "Emergency", "Discharge"] as const;

function fmtDT(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true });
}

function progressBar(rx: PrescriptionRx) {
  const total    = rx.items.reduce((s, i) => s + i.qty, 0);
  const dispensed= rx.items.reduce((s, i) => s + i.qtyDispensed, 0);
  const pct = total > 0 ? Math.round((dispensed / total) * 100) : 0;
  return { pct, dispensed, total };
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PharmacyPage() {
  const prescriptions = usePharmacyStore((s) => s.prescriptions);
  const verifyRx      = usePharmacyStore((s) => s.verifyRx);

  const [query,        setQuery]       = useState("");
  const [statusFilter, setStatus]      = useState<RxStatus | "">("");
  const [sourceFilter, setSource]      = useState("");
  const [deptFilter,   setDept]        = useState("");
  const [drawerOpen,   setDrawerOpen]  = useState(false);

  const depts = useMemo(() => [...new Set(prescriptions.map((r) => r.dept))].sort(), [prescriptions]);

  // KPIs
  const pendingCount    = prescriptions.filter((r) => r.status === "Pending").length;
  const dispensingCount = prescriptions.filter((r) => r.status === "Dispensing" || r.status === "Verified").length;
  const onHoldCount     = prescriptions.filter((r) => r.status === "On Hold").length;
  const dispensedToday  = prescriptions.filter((r) => r.status === "Dispensed" && r.dispensedAt?.startsWith(new Date().toISOString().slice(0, 10))).length;

  // Filter
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const srank: Record<RxStatus, number> = {
      "On Hold": 0, "Pending": 1, "Verified": 2, "Dispensing": 3,
      "Partially Dispensed": 4, "Dispensed": 5, "Cancelled": 6,
    };
    return prescriptions
      .filter((r) => {
        if (q && !(r.id.toLowerCase().includes(q) || r.patientName.toLowerCase().includes(q) || r.prescribedBy.toLowerCase().includes(q))) return false;
        if (statusFilter && r.status !== statusFilter) return false;
        if (sourceFilter && r.source !== sourceFilter) return false;
        if (deptFilter   && r.dept   !== deptFilter)   return false;
        return true;
      })
      .sort((a, b) => {
        const sd = srank[a.status] - srank[b.status];
        if (sd !== 0) return sd;
        return b.receivedAt.localeCompare(a.receivedAt);
      });
  }, [prescriptions, query, statusFilter, sourceFilter, deptFilter]);

  const hasFilters  = !!(statusFilter || sourceFilter || deptFilter);
  const activeCount = [statusFilter, sourceFilter, deptFilter].filter(Boolean).length;
  function clearFilters() { setStatus(""); setSource(""); setDept(""); }

  const kpis = [
    { label: "Awaiting Verification", value: pendingCount,    cls: "text-[var(--info-fg)]",     icon: <Clock size={16} /> },
    { label: "Ready / Dispensing",    value: dispensingCount, cls: "text-[var(--action-primary)]",icon: <Package size={16} /> },
    { label: "On Hold",               value: onHoldCount,     cls: "text-[var(--critical-fg)]", icon: <AlertCircle size={16} /> },
    { label: "Dispensed Today",       value: dispensedToday,  cls: "text-[var(--normal-fg)]",   icon: <PackageCheck size={16} /> },
  ];

  return (
    <div className="space-y-5 pb-8">
      <FilterDrawerShell
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeCount={activeCount} resultCount={filtered.length}
        resultLabel="prescription" hasFilters={hasFilters} onClear={clearFilters}
      >
        <FilterSection label="Status">
          <FilterToggleBtn active={statusFilter === ""} onClick={() => setStatus("")}>All</FilterToggleBtn>
          {ALL_STATUSES.map((s) => (
            <FilterToggleBtn key={s} active={statusFilter === s} onClick={() => setStatus(s)}>{s}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Source">
          <FilterToggleBtn active={sourceFilter === ""} onClick={() => setSource("")}>All</FilterToggleBtn>
          {ALL_SOURCES.map((s) => (
            <FilterToggleBtn key={s} active={sourceFilter === s} onClick={() => setSource(s)}>{s}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Department">
          <FilterToggleBtn active={deptFilter === ""} onClick={() => setDept("")}>All</FilterToggleBtn>
          {depts.map((d) => (
            <FilterToggleBtn key={d} active={deptFilter === d} onClick={() => setDept(d)}>{d}</FilterToggleBtn>
          ))}
        </FilterSection>
      </FilterDrawerShell>

      <PageHeader title="Pharmacy" subtitle="Prescription dispensing &amp; drug management" />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      {/* Active alert strip */}
      {onHoldCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3 text-sm text-[var(--critical-fg)]">
          <AlertCircle size={15} className="shrink-0" />
          <p><span className="font-semibold">{onHoldCount} prescription{onHoldCount > 1 ? "s" : ""} on hold</span> — require pharmacist or prescriber attention.</p>
          <button onClick={() => { setStatus("On Hold"); }} className="ml-auto shrink-0 text-xs underline hover:no-underline">View</button>
        </div>
      )}

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by Rx ID, patient, doctor…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeCount}
        onClear={clearFilters}
      />

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Header row */}
        <div className="hidden md:grid grid-cols-[0.8fr_2fr_1fr_0.8fr_1.5fr_1.5fr_1fr_1fr_auto] gap-3 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Rx ID</span><span>Patient</span><span>Source</span><span>Items</span><span>Doctor</span><span>Received</span><span>Amount</span><span>Status</span><span />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Pill size={32} />}
            message="No prescriptions match your filters"
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={hasFilters ? clearFilters : undefined}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((rx) => {
              const prog = progressBar(rx);
              const hasAllergyAlert = (rx.allergies?.length ?? 0) > 0;
              return (
                <div
                  key={rx.id}
                  className={`group relative ${rx.status === "On Hold" ? "bg-[var(--critical-bg)]/30" : ""}`}
                >
                  {/* On-hold left border accent */}
                  {rx.status === "On Hold" && (
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-[var(--critical-fg)]" />
                  )}
                  <Link
                    href={`/pharmacy/${rx.id}`}
                    className="grid grid-cols-2 gap-3 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[0.8fr_2fr_1fr_0.8fr_1.5fr_1.5fr_1fr_1fr_auto] md:items-center"
                  >
                    <p className="font-mono text-xs font-semibold text-[var(--action-primary)]">{rx.id}</p>

                    {/* Patient */}
                    <div className="flex items-center gap-2 min-w-0">
                      {hasAllergyAlert && (
                        <ShieldAlert size={13} className="shrink-0 text-[var(--critical-fg)]" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{rx.patientName}</p>
                        <p className="font-mono text-[10px] text-[var(--text-secondary)]">{rx.patientId}</p>
                      </div>
                    </div>

                    {/* Source */}
                    <span className={`hidden md:inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${SOURCE_CLS[rx.source]}`}>{rx.source}</span>

                    {/* Items count */}
                    <p className="hidden md:block text-xs text-[var(--text-secondary)]">{rx.items.length} drug{rx.items.length !== 1 ? "s" : ""}</p>

                    {/* Doctor */}
                    <p className="hidden md:block text-sm text-[var(--text-secondary)] truncate">{rx.prescribedBy}</p>

                    {/* Received */}
                    <p className="hidden md:block text-xs text-[var(--text-secondary)]">{fmtDT(rx.receivedAt)}</p>

                    {/* Amount */}
                    <p className="hidden md:block text-sm font-medium text-[var(--text-primary)] tabular-nums">
                      ₹{rx.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>

                    {/* Status + progress */}
                    <div className="space-y-1">
                      <span className={`inline-flex items-center gap-1 w-fit rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[rx.status]}`}>
                        {STATUS_ICON[rx.status]} {rx.status}
                      </span>
                      {(rx.status === "Dispensing" || rx.status === "Partially Dispensed") && (
                        <div className="hidden md:block">
                          <div className="h-1 w-full rounded-full bg-[var(--surface-sunken)]">
                            <div className="h-1 rounded-full bg-[var(--action-primary)]" style={{ width: `${prog.pct}%` }} />
                          </div>
                          <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{prog.dispensed}/{prog.total} units</p>
                        </div>
                      )}
                    </div>

                    <ChevronRight size={14} className="hidden md:block shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Quick-verify button for Pending */}
                  {rx.status === "Pending" && (
                    <div className="hidden md:flex items-center justify-end gap-2 px-5 pb-3 -mt-2">
                      <button
                        onClick={(e) => { e.preventDefault(); verifyRx(rx.id, "Pharm. User"); }}
                        className="flex items-center gap-1.5 rounded-lg border border-[var(--action-primary)] bg-[var(--action-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--action-primary)] hover:bg-[var(--action-primary)] hover:text-white transition-colors"
                      >
                        <CheckCircle2 size={12} /> Verify
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Drug stock alerts */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
          <AlertCircle size={14} className="text-[var(--warning-fg)]" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Stock Alerts</p>
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          {usePharmacyStore.getState().catalogue
            .filter((d) => d.stockQty <= d.reorderAt)
            .map((drug) => {
              const isOut = drug.stockQty === 0;
              return (
                <div key={drug.id} className="flex items-center gap-3 px-5 py-3">
                  <div className={`h-2 w-2 rounded-full shrink-0 ${isOut ? "bg-[var(--critical-fg)]" : "bg-[var(--warning-fg)]"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{drug.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{drug.genericName} · {drug.form}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold tabular-nums ${isOut ? "text-[var(--critical-fg)]" : "text-[var(--warning-fg)]"}`}>
                      {drug.stockQty} units
                    </p>
                    <span className={`text-[10px] font-semibold ${isOut ? "text-[var(--critical-fg)]" : "text-[var(--warning-fg)]"}`}>
                      {isOut ? "OUT OF STOCK" : "LOW STOCK"}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
