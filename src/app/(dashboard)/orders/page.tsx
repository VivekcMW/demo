"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { OrderType, OrderStatus, OrderPriority } from "@/data/seedOrders";
import {
  ClipboardList, FlaskConical, Pill, ScanLine, UserCheck,
  Stethoscope, UtensilsCrossed, Plus, ChevronRight,
  AlertTriangle, Clock, CheckCircle2, X,
} from "lucide-react";
import { FilterDrawerShell, FilterSection, FilterToggleBtn } from "@/components/ui/FilterDrawerShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

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

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const orders = useOrderStore((s) => s.orders);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
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

      <FilterDrawerShell
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeCount={activeCount} resultCount={filtered.length}
        resultLabel="order" hasFilters={hasFilters} onClear={clearFilters}
      >
        <FilterSection label="Order Type">
          {ALL_TYPES.map((t) => (
            <FilterToggleBtn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t || "All"}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Status">
          {ALL_STATUSES.map((s) => (
            <FilterToggleBtn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s || "All"}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Priority">
          {ALL_PRIORITIES.map((p) => (
            <FilterToggleBtn key={p} active={priorityFilter === p} onClick={() => setPriorityFilter(p)}>{p || "All"}</FilterToggleBtn>
          ))}
        </FilterSection>
      </FilterDrawerShell>

      <PageHeader
        title="Orders (CPOE)"
        subtitle={`${total} total orders`}
        action={
          <Link href="/orders/new" className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <Plus size={15} /> New Order
          </Link>
        }
      />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by order ID, patient, title, doctor…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeCount}
        onClear={clearFilters}
      />
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
        </div>
      )}

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

        {!hydrated ? (
          <div className="divide-y divide-[var(--border-default)]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="skeleton h-8 w-8 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-48" />
                  <div className="skeleton h-3 w-32" />
                </div>
                <div className="hidden md:flex gap-6">
                  <div className="skeleton h-5 w-14 rounded-full" />
                  <div className="skeleton h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={36} />}
            message="No orders match your filters"
            actionLabel={hasFilters ? "Clear filters" : undefined}
            onAction={hasFilters ? clearFilters : undefined}
          />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((o, idx) => (
              <Link
                key={o.id}
                href={`/orders/${o.id}`}
                style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
                className="group flex flex-col gap-2 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors lg:grid lg:grid-cols-[1fr_1.5fr_1fr_2fr_1fr_1.5fr_1fr_1fr_auto] lg:items-center lg:gap-3 animate-slide-up"
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
