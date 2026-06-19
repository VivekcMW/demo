"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLabStore } from "@/store/useLabStore";
import type { Order } from "@/data/seedOrders";
import {
  FlaskConical, AlertTriangle, Clock, CheckCircle2,
  ChevronRight, Activity, ShieldAlert, Plus,
} from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_CLS: Record<string, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const DEPARTMENTS = ["All", "Biochemistry", "Hematology", "Microbiology", "Serology", "Others"] as const;

const CATEGORY_DEPT: Record<string, string> = {
  Biochemistry: "Biochemistry",
  Hematology: "Hematology",
  Microbiology: "Microbiology",
  Serology: "Serology",
  Immunology: "Others",
  Hormones: "Others",
  Toxicology: "Others",
  Molecular: "Others",
};

function getOrderCategory(order: Order): string {
  const title = order.title.toLowerCase();
  if (title.includes("cbc") || title.includes("hematology") || title.includes("pt/inr") || title.includes("aptt") || title.includes("esr") || title.includes("coagulation")) return "Hematology";
  if (title.includes("hba1c") || title.includes("sugar") || title.includes("creatinine") || title.includes("bun") || title.includes("lft") || title.includes("liver") || title.includes("bilirubin") || title.includes("lipid") || title.includes("cholesterol") || title.includes("troponin") || title.includes("ck-mb") || title.includes("electrolyte") || title.includes("kft") || title.includes("kidney") || title.includes("uric acid") || title.includes("ldh") || title.includes("calcium") || title.includes("phosphorus") || title.includes("magnesium") || title.includes("iron") || title.includes("tibc")) return "Biochemistry";
  if (title.includes("culture") || title.includes("stain") || title.includes("afb") || title.includes("gram")) return "Microbiology";
  if (title.includes("hbsag") || title.includes("anti-h") || title.includes("vdrl") || title.includes("tsh") || title.includes("t3") || title.includes("t4") || title.includes("vitamin") || title.includes("crp") || title.includes("procalcitonin") || title.includes("ferritin")) return "Serology";
  return "Others";
}

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function safeGetLabOrders(): Order[] {
  try {
    return useLabStore.getState().getLabOrders();
  } catch {
    return [];
  }
}

function LabOrderRow({ order }: { order: Order }) {
  const hasCritical = order.result?.critical;
  const category = getOrderCategory(order);

  return (
    <Link
      href={`/lab/${order.id}`}
      className="group flex items-center gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--info-bg)] text-[var(--info-fg)]">
        <FlaskConical size={15} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-primary)] truncate">{order.title}</span>
          <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">{category}</span>
          {order.priority === "STAT" && (
            <span className="inline-flex rounded-full bg-[var(--critical-bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">STAT</span>
          )}
          {order.priority === "Urgent" && (
            <span className="inline-flex rounded-full bg-[var(--warning-bg)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">Urgent</span>
          )}
          {hasCritical && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">
              <AlertTriangle size={10} /> Critical
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">
          {order.patientName} &middot; {order.orderedBy} &middot; {fmtDateTime(order.orderedAt)}
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[order.status]}`}>
          {order.status}
        </span>
        <span className="font-mono text-[10px] text-[var(--text-secondary)]">{order.id}</span>
      </div>

      {order.status === "In-Progress" && (
        <span className="shrink-0 rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-[10px] font-semibold text-white">
          Add Result
        </span>
      )}

      <ChevronRight size={14} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

function Group({ label, items, accent }: { label: string; items: Order[]; accent?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <div className={`flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-2.5 ${accent ?? "bg-[var(--surface-sunken)]"}`}>
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</span>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[var(--action-primary)] px-1 text-[10px] font-bold text-white">{items.length}</span>
      </div>
      <div className="divide-y divide-[var(--border-default)]">
        {items.map((o) => <LabOrderRow key={o.id} order={o} />)}
      </div>
    </div>
  );
}

export default function LabDashboard() {
  const [mounted, setMounted] = useState(false);
  const [labOrders, setLabOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<string>("All");

  useEffect(() => {
    setMounted(true);
    // Load lab orders after mount to avoid SSR issues
    try {
      const orders = useLabStore.getState().getLabOrders?.() ?? [];
      setLabOrders(orders);
    } catch {
      setLabOrders([]);
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-5 pb-8">
        <div className="flex items-center gap-3"><FlaskConical size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Laboratory</h1><p className="text-sm text-[var(--text-secondary)]">Lab orders workbench &amp; result entry</p></div></div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Pending Today", value: "—", icon: Clock, color: "var(--warning-fg)" },
            { label: "In Progress", value: "—", icon: Activity, color: "var(--action-primary)" },
            { label: "Completed Today", value: "—", icon: CheckCircle2, color: "var(--normal-fg)" },
            { label: "Critical Results", value: "—", icon: ShieldAlert, color: "var(--critical-fg)" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{k.label}</p>
                <k.icon size={16} style={{ color: k.color }} />
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{k.value}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8 text-center">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FlaskConical size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="font-medium text-[var(--text-primary)]">Loading laboratory data...</p>
          </div>
        </div>
      </div>
    );
  }

  const pendingToday = useMemo(
    () => labOrders.filter((o) => (o.status === "Ordered" || o.status === "Acknowledged") && o.orderedAt.startsWith(new Date().toISOString().slice(0, 10))).length,
    [labOrders]
  );
  const inProgress = useMemo(() => labOrders.filter((o) => o.status === "In-Progress").length, [labOrders]);
  const completedToday = useMemo(
    () => labOrders.filter((o) => o.status === "Completed" && o.orderedAt.startsWith(new Date().toISOString().slice(0, 10))).length,
    [labOrders]
  );
  const criticalResults = useMemo(() => labOrders.filter((o) => o.result?.critical).length, [labOrders]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return labOrders
      .filter((o) => {
        if (q && !(
          o.id.toLowerCase().includes(q) ||
          o.patientName.toLowerCase().includes(q) ||
          o.title.toLowerCase().includes(q)
        )) return false;
        if (dept !== "All") {
          const cat = getOrderCategory(o);
          if (dept === "Others" ? !["Biochemistry", "Hematology", "Microbiology", "Serology"].includes(cat) : cat !== dept) return false;
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
  }, [labOrders, query, dept]);

  const statRows = filtered.filter((o) => o.priority === "STAT" && o.status !== "Completed" && o.status !== "Cancelled");
  const urgentRows = filtered.filter((o) => o.priority === "Urgent" && o.status !== "Completed" && o.status !== "Cancelled");
  const routineRows = filtered.filter((o) => o.priority === "Routine" && o.status !== "Completed" && o.status !== "Cancelled");
  const doneRows = filtered.filter((o) => o.status === "Completed");
  const cancelledRows = filtered.filter((o) => o.status === "Cancelled");

  const kpis = [
    { label: "Pending Today", value: pendingToday, icon: <Clock size={16} />, cls: "text-[var(--warning-fg)]" },
    { label: "In Progress", value: inProgress, icon: <Activity size={16} />, cls: "text-[var(--action-primary)]" },
    { label: "Completed Today", value: completedToday, icon: <CheckCircle2 size={16} />, cls: "text-[var(--normal-fg)]" },
    { label: "Critical Results", value: criticalResults, icon: <ShieldAlert size={16} />, cls: "text-[var(--critical-fg)]" },
  ];

  const hasFilters = dept !== "All";
  function clearFilters() { setDept("All"); setQuery(""); }

  return (
    <div className="space-y-5 pb-8">
      <PageHeader title="Laboratory" subtitle="Lab orders workbench &amp; result entry" />

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={k.icon} colorClass={k.cls} />
        ))}
      </div>

      {/* Department tabs */}
      <div className="flex flex-wrap gap-2">
        {DEPARTMENTS.map((d) => (
          <button
            key={d}
            onClick={() => setDept(d)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              dept === d
                ? "bg-[var(--action-primary)] text-white"
                : "bg-[var(--surface-raised)] text-[var(--text-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-sunken)]"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by order ID, patient, test name…"
        onFilterClick={hasFilters ? clearFilters : undefined}
        hasFilters={hasFilters}
        activeCount={hasFilters ? 1 : 0}
        onClear={clearFilters}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FlaskConical size={36} />}
          message="No lab orders match your filters"
          actionLabel={hasFilters ? "Clear filters" : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <div className="space-y-4">
          {statRows.length > 0 && (
            <Group label="STAT" items={statRows} accent="bg-[var(--critical-bg)] border-b-[var(--critical-fg)]/20" />
          )}
          {urgentRows.length > 0 && (
            <Group label="Urgent" items={urgentRows} accent="bg-[var(--warning-bg)]" />
          )}
          <Group label="Routine — Active" items={routineRows} />
          <Group label="Completed" items={doneRows} />
          <Group label="Cancelled" items={cancelledRows} />
        </div>
      )}
    </div>
  );
}
