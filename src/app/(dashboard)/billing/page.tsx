"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useBillingStore, type Bill, type BillStatus, type BillCategory } from "@/store/useBillingStore";
import {
  Receipt, Search, SlidersHorizontal, X, RotateCcw,
  IndianRupee, AlertTriangle, CheckCircle2, Clock,
  ChevronRight, TrendingUp,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<BillStatus, string> = {
  Draft:            "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Pending:          "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Partially Paid": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Paid:             "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Overdue:          "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled:        "bg-[var(--surface-sunken)] text-[var(--text-secondary)] line-through",
  Waived:           "bg-[var(--action-subtle)] text-[var(--action-primary)]",
};

const CATEGORY_CLS: Record<BillCategory, string> = {
  OPD:       "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  IPD:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Lab:       "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Imaging:   "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Pharmacy:  "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Procedure: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const ALL_STATUSES: BillStatus[]   = ["Draft", "Pending", "Partially Paid", "Paid", "Overdue", "Cancelled", "Waived"];
const ALL_CATEGORIES: BillCategory[] = ["OPD", "IPD", "Lab", "Imaging", "Pharmacy", "Procedure", "Emergency"];

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterDrawerProps {
  open: boolean; onClose: () => void;
  statusFilter: BillStatus | ""; setStatusFilter: (v: BillStatus | "") => void;
  categoryFilter: BillCategory | ""; setCategoryFilter: (v: BillCategory | "") => void;
  hasFilters: boolean; onClear: () => void; resultCount: number;
}

function FilterDrawer({ open, onClose, statusFilter, setStatusFilter, categoryFilter, setCategoryFilter, hasFilters, onClear, resultCount }: FilterDrawerProps) {
  if (!open) return null;
  function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
        {children}
      </button>
    );
  }
  const activeCount = [statusFilter, categoryFilter].filter(Boolean).length;
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Category</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={categoryFilter === ""} onClick={() => setCategoryFilter("")}>All</Btn>
              {ALL_CATEGORIES.map((c) => <Btn key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)}>{c}</Btn>)}
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

export default function BillingPage() {
  const bills = useBillingStore((s) => s.bills);

  const [query, setQuery]                   = useState("");
  const [statusFilter, setStatusFilter]     = useState<BillStatus | "">("");
  const [categoryFilter, setCategoryFilter] = useState<BillCategory | "">("");
  const [drawerOpen, setDrawerOpen]         = useState(false);

  // KPIs
  const totalRevenue   = bills.filter((b) => b.status === "Paid" || b.status === "Partially Paid").reduce((s, b) => s + b.amountPaid, 0);
  const outstandingDue = bills.filter((b) => b.status !== "Cancelled" && b.status !== "Waived" && b.status !== "Paid").reduce((s, b) => s + b.amountDue, 0);
  const overdueCount   = bills.filter((b) => b.status === "Overdue").length;
  const pendingCount   = bills.filter((b) => b.status === "Pending" || b.status === "Partially Paid" || b.status === "Draft").length;

  // Filtered
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return bills
      .filter((b) => {
        if (q && !(
          b.id.toLowerCase().includes(q) ||
          b.patientName.toLowerCase().includes(q) ||
          b.patientId.toLowerCase().includes(q)
        )) return false;
        if (statusFilter   && b.status   !== statusFilter)   return false;
        if (categoryFilter && b.category !== categoryFilter) return false;
        return true;
      })
      .sort((a, b) => {
        // Overdue first, then by createdAt desc
        if (a.status === "Overdue" && b.status !== "Overdue") return -1;
        if (b.status === "Overdue" && a.status !== "Overdue") return 1;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [bills, query, statusFilter, categoryFilter]);

  const hasFilters  = !!(statusFilter || categoryFilter);
  const activeCount = [statusFilter, categoryFilter].filter(Boolean).length;
  function clearFilters() { setStatusFilter(""); setCategoryFilter(""); }

  const kpis = [
    { label: "Total Collected",  value: `₹${fmt(totalRevenue)}`,   icon: <IndianRupee size={16} />, cls: "text-[var(--normal-fg)]" },
    { label: "Outstanding Due",  value: `₹${fmt(outstandingDue)}`, icon: <TrendingUp size={16} />,  cls: "text-[var(--warning-fg)]" },
    { label: "Overdue Bills",    value: overdueCount,               icon: <AlertTriangle size={16} />, cls: "text-[var(--critical-fg)]" },
    { label: "Pending / Draft",  value: pendingCount,               icon: <Clock size={16} />,       cls: "text-[var(--info-fg)]" },
  ];

  return (
    <div className="space-y-5 pb-8">
      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        statusFilter={statusFilter}   setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Billing</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">Patient invoices &amp; payment tracking</p>
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

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            placeholder="Search by bill ID, patient name or ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
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
        {/* Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Bill ID</span>
          <span>Patient</span>
          <span>Category</span>
          <span>Date</span>
          <span>Total</span>
          <span>Paid</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Receipt size={32} className="mb-3 opacity-20 text-[var(--text-secondary)]" />
            <p className="text-sm text-[var(--text-secondary)]">No bills match your filters</p>
            {hasFilters && <button onClick={clearFilters} className="mt-2 text-xs text-[var(--action-primary)] underline">Clear filters</button>}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((bill) => (
              <BillRow key={bill.id} bill={bill} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BillRow({ bill }: { bill: Bill }) {
  const pct = bill.grandTotal > 0 ? Math.min(100, (bill.amountPaid / bill.grandTotal) * 100) : 0;

  return (
    <Link
      href={`/billing/${bill.id}`}
      className="group grid grid-cols-2 gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_auto] md:items-center"
    >
      {/* Bill ID */}
      <div>
        <p className="font-mono text-xs font-semibold text-[var(--action-primary)]">{bill.id}</p>
        {bill.admissionId && <p className="text-[10px] text-[var(--text-secondary)]">{bill.admissionId}</p>}
      </div>

      {/* Patient */}
      <div className="md:col-auto col-span-1">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{bill.patientName}</p>
        <p className="font-mono text-[10px] text-[var(--text-secondary)]">{bill.patientId}</p>
      </div>

      {/* Category */}
      <span className={`hidden md:inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_CLS[bill.category]}`}>
        {bill.category}
      </span>

      {/* Date */}
      <p className="hidden md:block text-xs text-[var(--text-secondary)]">{fmtDate(bill.createdAt)}</p>

      {/* Grand total */}
      <div className="hidden md:block">
        <p className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">₹{fmt(bill.grandTotal)}</p>
      </div>

      {/* Payment progress */}
      <div className="hidden md:block">
        <p className="text-xs font-medium tabular-nums text-[var(--normal-fg)]">₹{fmt(bill.amountPaid)}</p>
        <div className="mt-1 h-1 w-full rounded-full bg-[var(--border-default)]">
          <div
            className="h-1 rounded-full bg-[var(--normal-fg)] transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Status */}
      <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[bill.status]}`}>
        {bill.status}
      </span>

      <ChevronRight size={14} className="hidden md:block shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
