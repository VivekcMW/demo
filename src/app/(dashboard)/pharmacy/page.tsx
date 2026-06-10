"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePharmacyStore, type RxStatus } from "@/store/usePharmacyStore";
import type { PrescriptionRx } from "@/data/seedPharmacy";
import {
  Pill, Search, SlidersHorizontal, X, RotateCcw,
  Clock, CheckCircle2, AlertCircle, ShieldAlert,
  ChevronRight, Package, PackageCheck, PackageX, Loader2,
} from "lucide-react";

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

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterProps {
  open: boolean; onClose: () => void;
  statusFilter: RxStatus | ""; setStatusFilter: (v: RxStatus | "") => void;
  sourceFilter: string; setSourceFilter: (v: string) => void;
  deptFilter: string; setDeptFilter: (v: string) => void;
  depts: string[];
  hasFilters: boolean; onClear: () => void; resultCount: number;
}
function FilterDrawer({ open, onClose, statusFilter, setStatusFilter, sourceFilter, setSourceFilter, deptFilter, setDeptFilter, depts, hasFilters, onClear, resultCount }: FilterProps) {
  if (!open) return null;
  function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
        {children}
      </button>
    );
  }
  const activeCount = [statusFilter, sourceFilter, deptFilter].filter(Boolean).length;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
            {activeCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={statusFilter === ""} onClick={() => setStatusFilter("")}>All</Btn>
              {ALL_STATUSES.map((s) => <Btn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Source</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={sourceFilter === ""} onClick={() => setSourceFilter("")}>All</Btn>
              {ALL_SOURCES.map((s) => <Btn key={s} active={sourceFilter === s} onClick={() => setSourceFilter(s)}>{s}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Department</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={deptFilter === ""} onClick={() => setDeptFilter("")}>All</Btn>
              {depts.map((d) => <Btn key={d} active={deptFilter === d} onClick={() => setDeptFilter(d)}>{d}</Btn>)}
            </div>
          </div>
        </div>
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button onClick={onClear} disabled={!hasFilters} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            Show {resultCount}
          </button>
        </div>
      </div>
    </>
  );
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
  const activeRx        = prescriptions.filter((r) => ["Pending","Verified","Dispensing","Partially Dispensed"].includes(r.status));
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
      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        statusFilter={statusFilter} setStatusFilter={setStatus}
        sourceFilter={sourceFilter} setSourceFilter={setSource}
        deptFilter={deptFilter}     setDeptFilter={setDept}
        depts={depts}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Pharmacy</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Prescription dispensing &amp; drug management</p>
        </div>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{k.label}</p>
              <span className={k.cls}>{k.icon}</span>
            </div>
            <p className={`mt-2 text-2xl font-bold tabular-nums ${k.cls}`}>{k.value}</p>
          </div>
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

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            placeholder="Search by Rx ID, patient, doctor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {/* Quick-filter tabs */}
        <div className="flex gap-1 flex-wrap">
          {(["", "Pending", "Verified", "Dispensing", "On Hold"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s as RxStatus | "")}
              className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${statusFilter === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${hasFilters ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
        >
          <SlidersHorizontal size={14} /> Filters
          {activeCount > 0 && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>}
        </button>

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)]">
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Header row */}
        <div className="hidden md:grid grid-cols-[0.8fr_2fr_1fr_0.8fr_1.5fr_1.5fr_1fr_1fr_auto] gap-3 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Rx ID</span><span>Patient</span><span>Source</span><span>Items</span><span>Doctor</span><span>Received</span><span>Amount</span><span>Status</span><span />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Pill size={32} className="mb-3 opacity-20 text-[var(--text-secondary)]" />
            <p className="text-sm text-[var(--text-secondary)]">No prescriptions match your filters</p>
            {hasFilters && <button onClick={clearFilters} className="mt-2 text-xs text-[var(--action-primary)] underline">Clear filters</button>}
          </div>
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
