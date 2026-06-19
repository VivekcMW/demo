"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { Order, OrderStatus, OrderType } from "@/data/seedOrders";
import {
  FlaskConical, ScanLine, AlertTriangle, Clock,
  CheckCircle2, ChevronRight, Microscope, Activity,
} from "lucide-react";
import { FilterDrawerShell, FilterSection, FilterToggleBtn } from "@/components/ui/FilterDrawerShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

// ── DS helpers ────────────────────────────────────────────────────────────────

const TYPE_META: Partial<Record<OrderType, { label: string; icon: React.ReactNode; cls: string }>> = {
  Lab:     { label: "Lab",     icon: <FlaskConical size={13} />, cls: "bg-[var(--info-bg)] text-[var(--info-fg)]" },
  Imaging: { label: "Imaging", icon: <ScanLine size={13} />,    cls: "bg-[var(--action-subtle)] text-[var(--action-primary)]" },
};

const STATUS_CLS: Record<OrderStatus, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────

// ── Order row ─────────────────────────────────────────────────────────────────

function OrderRow({ order }: { order: Order }) {
  const meta = TYPE_META[order.type]!;
  const hasCritical = order.result?.critical;

  return (
    <Link
      href={`/diagnostics/${order.id}`}
      className="group flex items-center gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors"
    >
      {/* Type icon */}
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${meta.cls}`}>
        {meta.icon}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{order.title}</span>
          {order.priority === "STAT" && (
            <span className="inline-flex rounded-full bg-[var(--critical-bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">STAT</span>
          )}
          {order.priority === "Urgent" && (
            <span className="inline-flex rounded-full bg-[var(--warning-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">Urgent</span>
          )}
          {hasCritical && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">
              <AlertTriangle size={10} /> Critical Result
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">
          {order.patientName} &middot; {order.orderedBy} &middot; {fmtDateTime(order.orderedAt)}
        </p>
      </div>

      {/* Status + order ID */}
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[order.status]}`}>
          {order.status}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-secondary)]">{order.id}</span>
      </div>

      <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

// ── Group ────────────────────────────────────────────────────────────────────

function Group({ label, items, accent }: { label: string; items: Order[]; accent?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className={`flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-2.5 ${accent ?? "bg-[var(--surface-sunken)]"}`}>
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</span>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--action-primary)] px-1 text-[10px] font-bold text-white">{items.length}</span>
      </div>
      <div className="divide-y divide-[var(--border-default)]">
        {items.map((o) => <OrderRow key={o.id} order={o} />)}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DiagnosticsPage() {
  const allOrders = useOrderStore((s) => s.orders);
  const [query, setQuery]             = useState("");
  const [typeFilter, setTypeFilter]   = useState<"Lab" | "Imaging" | "">("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [drawerOpen, setDrawerOpen]   = useState(false);

  // Only show Lab + Imaging orders (diagnostics department)
  const diagOrders = useMemo(
    () => allOrders.filter((o) => o.type === "Lab" || o.type === "Imaging"),
    [allOrders]
  );

  // KPIs
  const pending      = diagOrders.filter((o) => o.status === "Ordered" || o.status === "Acknowledged").length;
  const inProgress   = diagOrders.filter((o) => o.status === "In-Progress").length;
  const statPending  = diagOrders.filter((o) => o.priority === "STAT" && o.status !== "Completed" && o.status !== "Cancelled").length;
  const today        = new Date().toISOString().slice(0, 10);
  const doneToday    = diagOrders.filter((o) => o.status === "Completed" && o.orderedAt.startsWith(today)).length;

  // Filtered + sorted
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return diagOrders
      .filter((o) => {
        if (q && !(
          o.id.toLowerCase().includes(q) ||
          o.patientName.toLowerCase().includes(q) ||
          o.title.toLowerCase().includes(q)
        )) return false;
        if (typeFilter   && o.type   !== typeFilter)   return false;
        if (statusFilter && o.status !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        // STAT first → Urgent → Routine; within same priority: In-Progress > Acknowledged > Ordered > Completed
        const prank: Record<string, number> = { STAT: 0, Urgent: 1, Routine: 2 };
        const srank: Record<string, number> = { "In-Progress": 0, Acknowledged: 1, Ordered: 2, Completed: 3, Cancelled: 4 };
        const pp = prank[a.priority] - prank[b.priority];
        if (pp !== 0) return pp;
        const ss = srank[a.status] - srank[b.status];
        if (ss !== 0) return ss;
        return b.orderedAt.localeCompare(a.orderedAt);
      });
  }, [diagOrders, query, typeFilter, statusFilter]);

  const hasFilters  = !!(typeFilter || statusFilter);
  const activeCount = [typeFilter, statusFilter].filter(Boolean).length;

  function clearFilters() { setTypeFilter(""); setStatusFilter(""); }

  // Group by priority for display
  const statRows    = filtered.filter((o) => o.priority === "STAT"    && o.status !== "Completed" && o.status !== "Cancelled");
  const urgentRows  = filtered.filter((o) => o.priority === "Urgent"  && o.status !== "Completed" && o.status !== "Cancelled");
  const routineRows = filtered.filter((o) => o.priority === "Routine" && o.status !== "Completed" && o.status !== "Cancelled");
  const doneRows    = filtered.filter((o) => o.status === "Completed");
  const cancelledRows = filtered.filter((o) => o.status === "Cancelled");

  const kpis = [
    { label: "Pending",       value: pending,    icon: <Clock size={16} />,          cls: "text-[var(--warning-fg)]" },
    { label: "In Progress",   value: inProgress, icon: <Activity size={16} />,       cls: "text-[var(--action-primary)]" },
    { label: "STAT Active",   value: statPending,icon: <AlertTriangle size={16} />,  cls: "text-[var(--critical-fg)]" },
    { label: "Done Today",    value: doneToday,  icon: <CheckCircle2 size={16} />,   cls: "text-[var(--normal-fg)]" },
  ];

  return (
    <div className="space-y-5 pb-8">

      <FilterDrawerShell
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeCount={activeCount} resultCount={filtered.length}
        resultLabel="request" hasFilters={hasFilters} onClear={clearFilters}
      >
        <FilterSection label="Department">
          {(["Lab", "Imaging"] as const).map((t) => (
            <FilterToggleBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(typeFilter === t ? "" : t)}>{t}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Status">
          {(["Ordered", "Acknowledged", "In-Progress", "Completed"] as const).map((s) => (
            <FilterToggleBtn key={s} active={statusFilter === s} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}>{s}</FilterToggleBtn>
          ))}
        </FilterSection>
      </FilterDrawerShell>

      <PageHeader title="Diagnostics Lab" subtitle="Lab &amp; Imaging requests workbench" />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by order ID, patient, test name…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeCount}
        onClear={clearFilters}
      />

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by order ID, patient, test name…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeCount}
        onClear={clearFilters}
      />

      {/* Grouped workbench */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Microscope size={36} />}
          message="No diagnostic requests match your filters"
          actionLabel={hasFilters ? "Clear filters" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="space-y-4">
          <Group
            label="STAT"
            items={statRows}
            accent="bg-[var(--critical-bg)] border-b-[var(--critical-fg)]/20"
          />
          <Group label="Urgent" items={urgentRows} accent="bg-[var(--warning-bg)]" />
          <Group label="Routine — Active" items={routineRows} />
          <Group label="Completed" items={doneRows} />
          <Group label="Cancelled" items={cancelledRows} />
        </div>
      )}
    </div>
  );
}
