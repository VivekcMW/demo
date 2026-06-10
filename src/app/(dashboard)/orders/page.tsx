"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { OrderType, OrderStatus, OrderPriority } from "@/data/seedOrders";
import {
  ClipboardList, FlaskConical, Pill, ScanLine, UserCheck,
  Stethoscope, UtensilsCrossed, Plus, Search, ChevronRight,
  SlidersHorizontal, X, RotateCcw, AlertTriangle, Clock, CheckCircle2,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const TYPE_META: Record<OrderType, { label: string; icon: React.ReactNode; cls: string }> = {
  Lab:       { label: "Lab",       icon: <FlaskConical size={13} />,     cls: "bg-[var(--info-bg)] text-[var(--info-fg)]" },
  Medication:{ label: "Medication",icon: <Pill size={13} />,             cls: "bg-[var(--normal-bg)] text-[var(--normal-fg)]" },
  Imaging:   { label: "Imaging",   icon: <ScanLine size={13} />,         cls: "bg-[var(--action-subtle)] text-[var(--action-primary)]" },
  Referral:  { label: "Referral",  icon: <UserCheck size={13} />,        cls: "bg-[var(--warning-bg)] text-[var(--warning-fg)]" },
  Procedure: { label: "Procedure", icon: <Stethoscope size={13} />,      cls: "bg-[var(--critical-bg)] text-[var(--critical-fg)]" },
  Diet:      { label: "Diet",      icon: <UtensilsCrossed size={13} />,  cls: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]" },
};

const STATUS_CLS: Record<OrderStatus, string> = {
  Ordered:      "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress":"bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:    "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:    "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const PRIORITY_CLS: Record<OrderPriority, string> = {
  Routine: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Urgent:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  STAT:    "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
};

function TypeBadge({ type }: { type: OrderType }) {
  const m = TYPE_META[type];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${m.cls}`}>
      {m.icon} {m.label}
    </span>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[status]}`}>
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: OrderPriority }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${PRIORITY_CLS[priority]}`}>
      {priority}
    </span>
  );
}

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

const ALL_TYPES:    (OrderType | "")[]    = ["", "Lab", "Medication", "Imaging", "Referral", "Procedure", "Diet"];
const ALL_STATUSES: (OrderStatus | "")[]  = ["", "Ordered", "Acknowledged", "In-Progress", "Completed", "Cancelled"];
const ALL_PRIORITIES: (OrderPriority | "")[] = ["", "Routine", "Urgent", "STAT"];

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  typeFilter: OrderType | "";
  setTypeFilter: (v: OrderType | "") => void;
  statusFilter: OrderStatus | "";
  setStatusFilter: (v: OrderStatus | "") => void;
  priorityFilter: OrderPriority | "";
  setPriorityFilter: (v: OrderPriority | "") => void;
  hasFilters: boolean;
  onClear: () => void;
  resultCount: number;
}

function FilterDrawer({
  open, onClose, typeFilter, setTypeFilter, statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter, hasFilters, onClear, resultCount,
}: FilterDrawerProps) {
  if (!open) return null;

  function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
          active
            ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
            : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)]"
        }`}
      >
        {children}
      </button>
    );
  }

  function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{label}</p>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
    );
  }

  const activeCount = [typeFilter, statusFilter, priorityFilter].filter(Boolean).length;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <Section label="Order Type">
            {ALL_TYPES.map((t) => (
              <ToggleBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>
                {t || "All"}
              </ToggleBtn>
            ))}
          </Section>
          <Section label="Status">
            {ALL_STATUSES.map((s) => (
              <ToggleBtn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
                {s || "All"}
              </ToggleBtn>
            ))}
          </Section>
          <Section label="Priority">
            {ALL_PRIORITIES.map((p) => (
              <ToggleBtn key={p} active={priorityFilter === p} onClick={() => setPriorityFilter(p)}>
                {p || "All"}
              </ToggleBtn>
            ))}
          </Section>
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] p-4 text-xs text-[var(--text-secondary)]">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Active filters</p>
            <p>Type: <span className="font-medium text-[var(--text-primary)]">{typeFilter || "All"}</span></p>
            <p>Status: <span className="font-medium text-[var(--text-primary)]">{statusFilter || "All"}</span></p>
            <p>Priority: <span className="font-medium text-[var(--text-primary)]">{priorityFilter || "All"}</span></p>
            <p className="mt-2 font-medium text-[var(--action-primary)]">{resultCount} order{resultCount !== 1 ? "s" : ""} match</p>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button
            onClick={onClear}
            disabled={!hasFilters}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40 transition-colors"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter]       = useState<OrderType | "">("");
  const [statusFilter, setStatusFilter]   = useState<OrderStatus | "">("");
  const [priorityFilter, setPriorityFilter] = useState<OrderPriority | "">("");
  const [drawerOpen, setDrawerOpen]       = useState(false);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const total       = orders.length;
  const pending     = orders.filter((o) => o.status === "Ordered" || o.status === "Acknowledged" || o.status === "In-Progress").length;
  const stat        = orders.filter((o) => o.priority === "STAT" && o.status !== "Completed" && o.status !== "Cancelled").length;
  const today       = new Date().toISOString().slice(0, 10);
  const completedToday = orders.filter((o) => o.status === "Completed" && o.orderedAt.startsWith(today)).length;

  // ── Filtered ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return orders.filter((o) => {
      if (q && !(
        o.id.toLowerCase().includes(q) ||
        o.patientName.toLowerCase().includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.orderedBy.toLowerCase().includes(q)
      )) return false;
      if (typeFilter     && o.type     !== typeFilter)     return false;
      if (statusFilter   && o.status   !== statusFilter)   return false;
      if (priorityFilter && o.priority !== priorityFilter) return false;
      return true;
    }).sort((a, b) => {
      // STAT first, then by time desc
      const p: Record<string, number> = { STAT: 0, Urgent: 1, Routine: 2 };
      return p[a.priority] !== p[b.priority]
        ? p[a.priority] - p[b.priority]
        : b.orderedAt.localeCompare(a.orderedAt);
    });
  }, [orders, query, typeFilter, statusFilter, priorityFilter]);

  const hasFilters  = !!(typeFilter || statusFilter || priorityFilter);
  const activeCount = [typeFilter, statusFilter, priorityFilter].filter(Boolean).length;

  function clearFilters() {
    setTypeFilter(""); setStatusFilter(""); setPriorityFilter("");
  }

  const kpis = [
    { label: "Total Orders",     value: total,         icon: <ClipboardList size={16} />, cls: "text-[var(--action-primary)]" },
    { label: "Active",           value: pending,       icon: <Clock size={16} />,         cls: "text-[var(--warning-fg)]" },
    { label: "STAT Pending",     value: stat,          icon: <AlertTriangle size={16} />, cls: "text-[var(--critical-fg)]" },
    { label: "Completed Today",  value: completedToday,icon: <CheckCircle2 size={16} />,  cls: "text-[var(--normal-fg)]" },
  ];

  return (
    <div className="space-y-5 pb-8">

      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        typeFilter={typeFilter}         setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}     setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Orders (CPOE)</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{total} total orders</p>
        </div>
        <Link
          href="/orders/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Plus size={15} /> New Order
        </Link>
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

      {/* Search + filter bar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search by order ID, patient, title, doctor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            hasFilters
              ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
              : "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {typeFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {typeFilter} <button onClick={() => setTypeFilter("")}><X size={11} /></button>
              </span>
            )}
            {statusFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {statusFilter} <button onClick={() => setStatusFilter("")}><X size={11} /></button>
              </span>
            )}
            {priorityFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {priorityFilter} <button onClick={() => setPriorityFilter("")}><X size={11} /></button>
              </span>
            )}
            <button onClick={clearFilters} className="text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)]">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-[1fr_1.5fr_1fr_2fr_1fr_1.5fr_1fr_1fr_auto] gap-3 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Order ID</span>
          <span>Patient</span>
          <span>Type</span>
          <span>Title</span>
          <span>Priority</span>
          <span>Ordered By</span>
          <span>Time</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClipboardList size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="font-medium text-[var(--text-primary)]">No orders match your filters</p>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-2 text-sm text-[var(--action-primary)] underline">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((o) => (
              <Link
                key={o.id}
                href={`/orders/${o.id}`}
                className="group flex flex-col gap-2 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors lg:grid lg:grid-cols-[1fr_1.5fr_1fr_2fr_1fr_1.5fr_1fr_1fr_auto] lg:items-center lg:gap-3"
              >
                {/* Order ID */}
                <span className="font-mono text-xs font-semibold text-[var(--action-primary)]">{o.id}</span>

                {/* Patient */}
                <span className="text-sm font-medium text-[var(--text-primary)]">{o.patientName}</span>

                {/* Type */}
                <TypeBadge type={o.type} />

                {/* Title */}
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{o.title}</p>
                  {o.details && (
                    <p className="text-xs text-[var(--text-secondary)] truncate">{o.details}</p>
                  )}
                </div>

                {/* Priority */}
                <PriorityBadge priority={o.priority} />

                {/* Ordered by */}
                <span className="text-xs text-[var(--text-secondary)] truncate">{o.orderedBy}</span>

                {/* Time */}
                <span className="text-xs text-[var(--text-secondary)]">{fmtDateTime(o.orderedAt)}</span>

                {/* Status */}
                <StatusBadge status={o.status} />

                {/* Arrow */}
                <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
