"use client";

import { useState } from "react";
import Link from "next/link";
import { useBillingStore, type Bill, type BillStatus, type BillCategory } from "@/store/useBillingStore";
import { Receipt, IndianRupee, AlertTriangle, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { FilterDrawerShell, FilterSection, FilterToggleBtn } from "@/components/ui/FilterDrawerShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

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
  const q = query.toLowerCase().trim();
  const filtered = bills
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
      if (a.status === "Overdue" && b.status !== "Overdue") return -1;
      if (b.status === "Overdue" && a.status !== "Overdue") return 1;
      return b.createdAt.localeCompare(a.createdAt);
    });

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
      <FilterDrawerShell
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeCount={activeCount} resultCount={filtered.length}
        resultLabel="bill" hasFilters={hasFilters} onClear={clearFilters}
      >
        <FilterSection label="Status">
          <FilterToggleBtn active={statusFilter === ""} onClick={() => setStatusFilter("")}>All</FilterToggleBtn>
          {ALL_STATUSES.map((s) => (
            <FilterToggleBtn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Category">
          <FilterToggleBtn active={categoryFilter === ""} onClick={() => setCategoryFilter("")}>All</FilterToggleBtn>
          {ALL_CATEGORIES.map((c) => (
            <FilterToggleBtn key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)}>{c}</FilterToggleBtn>
          ))}
        </FilterSection>
      </FilterDrawerShell>

      <PageHeader title="Billing" subtitle="Patient invoices &amp; payment tracking" />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by bill ID, patient name or ID…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeCount}
        onClear={clearFilters}
      />

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
          <EmptyState
            icon={<Receipt size={32} />}
            message="No bills match your filters"
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={hasFilters ? clearFilters : undefined}
          />
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
      <StatusBadge colorClass={CATEGORY_CLS[bill.category]} label={bill.category} className="hidden md:inline-flex" />

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
      <StatusBadge colorClass={STATUS_CLS[bill.status]} label={bill.status} />

      <ChevronRight size={14} className="hidden md:block shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
