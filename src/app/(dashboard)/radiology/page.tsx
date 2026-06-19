"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useRadiologyStore, MODALITY_GROUP } from "@/store/useRadiologyStore";
import type { Order, OrderStatus } from "@/data/seedOrders";
import type { Modality } from "@/store/useRadiologyStore";
import {
  ScanLine, AlertTriangle, Clock, CheckCircle2, ChevronRight,
  Search, FileText, Activity, Filter,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

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

function deduceModality(title: string): string {
  const p = title.toLowerCase();
  if (p.includes("ct ")) return "CT";
  if (p.includes("mri ") || p.includes("mr ")) return "MRI";
  if (p.includes("ultrasound") || p.includes("doppler") || p.includes("echocardiogram") || p.includes("echo")) return "Ultrasound";
  if (p.includes("mammography") || p.includes("mammo")) return "Mammography";
  if (p.includes("dex") || p.includes("dexa")) return "DEXA";
  if (p.includes("barium") || p.includes("ivp") || p.includes("hsg")) return "Fluoroscopy";
  if (p.includes("bone scan") || p.includes("nuclear")) return "Nuclear Medicine";
  if (p.includes("pet")) return "PET-CT";
  if (p.includes("ecg") || p.includes("ekg") || p.includes("chest") || p.includes("x-ray") || p.includes("knee") || p.includes("spine") || p.includes("pelvis") || p.includes("skull") || p.includes("wrist") || p.includes("ankle") || p.includes("shoulder")) return "X-Ray";
  return "";
}

export default function RadiologyPage() {
  const allOrders = useOrderStore((s) => s.orders);
  const { getPendingReports } = useRadiologyStore();
  const [query, setQuery] = useState("");
  const [modalityTab, setModalityTab] = useState("All");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");

  const radOrders = useMemo(
    () => allOrders.filter((o) => o.type === "Imaging"),
    [allOrders]
  );

  const pending = radOrders.filter((o) => o.status !== "Completed" && o.status !== "Cancelled");
  const pendingCount = pending.length;
  const inProgress = radOrders.filter((o) => o.status === "In-Progress").length;
  const statPending = radOrders.filter((o) => o.priority === "STAT" && o.status !== "Completed" && o.status !== "Cancelled").length;
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = radOrders.filter((o) => o.status === "Completed" && o.orderedAt.startsWith(today)).length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return radOrders
      .filter((o) => {
        if (q && !(
          o.id.toLowerCase().includes(q) ||
          o.patientName.toLowerCase().includes(q) ||
          o.title.toLowerCase().includes(q)
        )) return false;
        if (statusFilter && o.status !== statusFilter) return false;
        if (modalityTab !== "All") {
          const m = deduceModality(o.title);
          const g = MODALITY_GROUP[m as Modality] ?? m;
          if (modalityTab === "Others") {
            if (m !== "" && g !== "Others") return false;
          } else if (m !== modalityTab) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const prank: Record<string, number> = { STAT: 0, Urgent: 1, Routine: 2 };
        const srank: Record<string, number> = { "In-Progress": 0, Acknowledged: 1, Ordered: 2, Completed: 3, Cancelled: 4 };
        const pp = prank[a.priority] - prank[b.priority];
        if (pp !== 0) return pp;
        const ss = srank[a.status] - srank[b.status];
        if (ss !== 0) return ss;
        return b.orderedAt.localeCompare(a.orderedAt);
      });
  }, [radOrders, query, modalityTab, statusFilter]);

  const statRows = filtered.filter((o) => o.priority === "STAT" && o.status !== "Completed" && o.status !== "Cancelled");
  const urgentRows = filtered.filter((o) => o.priority === "Urgent" && o.status !== "Completed" && o.status !== "Cancelled");
  const routineRows = filtered.filter((o) => o.priority === "Routine" && o.status !== "Completed" && o.status !== "Cancelled");
  const doneRows = filtered.filter((o) => o.status === "Completed");
  const cancelledRows = filtered.filter((o) => o.status === "Cancelled");
  const hasFilters = !!(statusFilter);
  const activeCount = [statusFilter].filter(Boolean).length;

  function clearFilters() { setStatusFilter(""); setQuery(""); }

  const kpis = [
    { label: "Pending Reports", value: pendingCount, icon: <Clock size={16} />, cls: "text-[var(--warning-fg)]" },
    { label: "In Progress", value: inProgress, icon: <Activity size={16} />, cls: "text-[var(--action-primary)]" },
    { label: "STAT Studies", value: statPending, icon: <AlertTriangle size={16} />, cls: "text-[var(--critical-fg)]" },
    { label: "Completed Today", value: completedToday, icon: <CheckCircle2 size={16} />, cls: "text-[var(--normal-fg)]" },
  ];

  const modalityTabs = ["All", "X-Ray", "Ultrasound", "CT", "MRI", "Mammography", "Others"];

  return (
    <div className="space-y-5 pb-8">
      <PageHeader title="Radiology" subtitle="Imaging workbench &amp; reporting" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by order ID, patient, procedure…"
        onFilterClick={() => {}}
        hasFilters={hasFilters}
        activeCount={activeCount}
        onClear={clearFilters}
      />

      {/* Modality tabs */}
      <div className="flex flex-wrap gap-1">
        {modalityTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setModalityTab(tab)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              modalityTab === tab
                ? "bg-[var(--action-primary)] text-white"
                : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table view for worklist */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<ScanLine size={36} />}
          message="No imaging orders match your criteria"
          actionLabel={hasFilters ? "Clear filters" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="space-y-4">
          {statRows.length > 0 && (
            <div className="rounded-xl border-2 border-[var(--critical-fg)]/30 bg-[var(--critical-bg)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-[var(--critical-bg)] border-b border-[var(--critical-fg)]/20">
                <AlertTriangle size={14} className="text-[var(--critical-fg)]" />
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--critical-fg)]">STAT</span>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--critical-fg)] px-1 text-[10px] font-bold text-white">{statRows.length}</span>
              </div>
              <div className="divide-y divide-[var(--critical-fg)]/10">
                {statRows.map((o) => <RadiologyRow key={o.id} order={o} />)}
              </div>
            </div>
          )}
          {urgentRows.length > 0 && (
            <div className="rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--warning-fg)]/10">
                <Clock size={14} className="text-[var(--warning-fg)]" />
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--warning-fg)]">Urgent</span>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--warning-fg)] px-1 text-[10px] font-bold text-white">{urgentRows.length}</span>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {urgentRows.map((o) => <RadiologyRow key={o.id} order={o} />)}
              </div>
            </div>
          )}
          {routineRows.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Routine</span>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--action-primary)] px-1 text-[10px] font-bold text-white">{routineRows.length}</span>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {routineRows.map((o) => <RadiologyRow key={o.id} order={o} />)}
              </div>
            </div>
          )}
          {doneRows.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                <CheckCircle2 size={13} className="text-[var(--normal-fg)]" />
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Completed</span>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--normal-fg)] px-1 text-[10px] font-bold text-white">{doneRows.length}</span>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {doneRows.map((o) => <RadiologyRow key={o.id} order={o} />)}
              </div>
            </div>
          )}
          {cancelledRows.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Cancelled</span>
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--text-secondary)] px-1 text-[10px] font-bold text-white">{cancelledRows.length}</span>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {cancelledRows.map((o) => <RadiologyRow key={o.id} order={o} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RadiologyRow({ order }: { order: Order }) {
  return (
    <div className="group flex items-center gap-4 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--action-subtle)] text-[var(--action-primary)]">
        <ScanLine size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/radiology/${order.id}`} className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--action-primary)] truncate">
            {order.title}
          </Link>
          {order.priority === "STAT" && (
            <span className="inline-flex rounded-full bg-[var(--critical-bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">STAT</span>
          )}
          {order.priority === "Urgent" && (
            <span className="inline-flex rounded-full bg-[var(--warning-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">Urgent</span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
          {order.patientName} &middot; {order.id} &middot; {fmtDateTime(order.orderedAt)}
        </p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[order.status]}`}>
          {order.status}
        </span>
      </div>
      {order.status !== "Completed" && order.status !== "Cancelled" && (
        <Link
          href={`/radiology/${order.id}`}
          className="shrink-0 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          Add Report
        </Link>
      )}
      <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
