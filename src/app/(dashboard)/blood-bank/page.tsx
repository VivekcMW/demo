"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useBloodBankStore } from "@/store/useBloodBankStore";
import type { BloodBankOrder } from "@/data/seedBloodBank";
import {
  Droplets, AlertTriangle, Clock, CheckCircle2,
  ChevronRight, Activity, Plus,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_CLS: Record<string, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Cross-Matched": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  "In-Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Reaction:      "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const URGENCY_CLS: Record<string, string> = {
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
  Urgent:    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Routine:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
};

const FILTER_TABS: { label: string; key: string }[] = [
  { label: "All", key: "" },
  { label: "Cross-Match Pending", key: "crossmatch-pending" },
  { label: "In-Progress", key: "In-Progress" },
  { label: "Completed", key: "Completed" },
  { label: "Reactions", key: "Reaction" },
];

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function OrderRow({ order }: { order: BloodBankOrder }) {
  return (
    <Link
      href={`/blood-bank/${order.id}`}
      className="group flex items-center gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--critical-bg)] text-[var(--critical-fg)]">
        <Droplets size={15} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{order.patientName}</span>
          <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${URGENCY_CLS[order.urgency]}`}>
            {order.urgency}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">
          {order.product} &middot; {order.units} unit{order.units > 1 ? "s" : ""} &middot; {order.patientBloodGroup} &middot; {order.orderedBy} &middot; {fmtDateTime(order.orderedAt)}
        </p>
      </div>

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

export default function BloodBankPage() {
  const orders = useBloodBankStore((s) => s.orders);
  const inventory = useBloodBankStore((s) => s.inventory);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const totalToday = orders.filter((o) => o.orderedAt.startsWith(today)).length;
  const crossMatchPending = orders.filter((o) => o.crossMatchStatus === "Pending").length;
  const inProgressCount = orders.filter((o) => o.status === "In-Progress").length;
  const lowStock = inventory.filter((i) => i.unitsAvailable > 0 && i.unitsAvailable < 5).length;

  const kpis = [
    { label: "Orders Today", value: totalToday, icon: <Clock size={16} />, cls: "text-[var(--info-fg)]" },
    { label: "Cross-Match Pending", value: crossMatchPending, icon: <Activity size={16} />, cls: "text-[var(--warning-fg)]" },
    { label: "In Progress", value: inProgressCount, icon: <Droplets size={16} />, cls: "text-[var(--action-primary)]" },
    { label: "Inventory Alerts", value: lowStock, icon: <AlertTriangle size={16} />, cls: "text-[var(--critical-fg)]" },
  ];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return orders.filter((o) => {
      if (q && !(
        o.id.toLowerCase().includes(q) ||
        o.patientName.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.patientBloodGroup.toLowerCase().includes(q)
      )) return false;
      if (tab === "crossmatch-pending" && o.crossMatchStatus !== "Pending") return false;
      if (tab && tab !== "crossmatch-pending" && o.status !== tab) return false;
      return true;
    }).sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));
  }, [orders, query, tab]);

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="Blood Bank"
        subtitle="Transfusion medicine — orders & inventory"
        action={
          <button className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <Plus size={15} /> New Blood Order
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by order ID, patient, product, blood group…"
      />

      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              tab === t.key
                ? "bg-[var(--action-primary)] text-white"
                : "bg-[var(--surface-raised)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-sunken)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Droplets size={36} />}
          message="No blood bank orders match your filters"
        />
      ) : (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden divide-y divide-[var(--border-default)]">
          {filtered.map((o) => <OrderRow key={o.id} order={o} />)}
        </div>
      )}
    </div>
  );
}
