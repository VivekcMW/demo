"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { Order, OrderStatus, OrderType } from "@/data/seedOrders";
import {
  FlaskConical, ScanLine, Search, AlertTriangle, Clock,
  CheckCircle2, ChevronRight, SlidersHorizontal, X, RotateCcw,
  Microscope, Activity,
} from "lucide-react";

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

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  typeFilter: "Lab" | "Imaging" | "";
  setTypeFilter: (v: "Lab" | "Imaging" | "") => void;
  statusFilter: OrderStatus | "";
  setStatusFilter: (v: OrderStatus | "") => void;
  hasFilters: boolean;
  onClear: () => void;
  resultCount: number;
}

function FilterDrawer({
  open, onClose, typeFilter, setTypeFilter, statusFilter, setStatusFilter,
  hasFilters, onClear, resultCount,
}: FilterDrawerProps) {
  if (!open) return null;

  function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
          active
            ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
            : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
        }`}
      >
        {children}
      </button>
    );
  }

  const activeCount = [typeFilter, statusFilter].filter(Boolean).length;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>
            )}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Department</p>
            <div className="flex flex-wrap gap-2">
              {(["", "Lab", "Imaging"] as const).map((t) => (
                <Btn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t || "All"}</Btn>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status</p>
            <div className="flex flex-wrap gap-2">
              {(["", "Ordered", "Acknowledged", "In-Progress", "Completed"] as const).map((s) => (
                <Btn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s || "All"}</Btn>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] p-4 text-xs text-[var(--text-secondary)]">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Active filters</p>
            <p>Dept: <span className="font-medium text-[var(--text-primary)]">{typeFilter || "All"}</span></p>
            <p>Status: <span className="font-medium text-[var(--text-primary)]">{statusFilter || "All"}</span></p>
            <p className="mt-2 font-medium text-[var(--action-primary)]">{resultCount} request{resultCount !== 1 ? "s" : ""} match</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button
            onClick={onClear}
            disabled={!hasFilters}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>
    </>
  );
}

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

  return (
    <div className="space-y-5 pb-8">

      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        typeFilter={typeFilter}   setTypeFilter={setTypeFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">Diagnostics Lab</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">Lab &amp; Imaging requests workbench</p>
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

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search by order ID, patient, test name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {/* Type quick-toggle */}
        <div className="flex gap-1">
          {(["", "Lab", "Imaging"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                typeFilter === t
                  ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                  : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
              }`}
            >
              {t === "Lab" && <FlaskConical size={12} />}
              {t === "Imaging" && <ScanLine size={12} />}
              {t || "All"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            hasFilters
              ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
              : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>
          )}
        </button>

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)]">
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>

      {/* Grouped workbench */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Microscope size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
          <p className="font-medium text-[var(--text-primary)]">No diagnostic requests match your filters</p>
          {hasFilters && <button onClick={clearFilters} className="mt-2 text-sm text-[var(--action-primary)] underline">Clear filters</button>}
        </div>
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
