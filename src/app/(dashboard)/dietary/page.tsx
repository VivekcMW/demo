"use client";

import { useMemo, useState } from "react";
import { useDietaryStore, type DietStatus, type DietType } from "@/store/useDietaryStore";
import { UtensilsCrossed, Clock, CheckCircle2, AlertTriangle, Search } from "lucide-react";

const STATUS_CLS: Record<DietStatus, string> = {
  Ordered: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Preparing: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Delivered: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

export default function DietaryPage() {
  const orders = useDietaryStore((s) => s.orders);
  const updateStatus = useDietaryStore((s) => s.updateStatus);
  const [search, setSearch] = useState("");
  const [filterDiet, setFilterDiet] = useState<DietType | "all">("all");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filterDiet !== "all" && o.dietType !== filterDiet) return false;
      if (search && !o.patientName.toLowerCase().includes(search.toLowerCase()) && !o.dietType.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [orders, search, filterDiet]);

  const active = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Dietary Management</h1>
          <p className="text-sm text-[var(--text-secondary)]">Patient meal orders & kitchen production</p>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or diet…" className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] w-52" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: orders.length, icon: UtensilsCrossed, color: "var(--action-primary)" },
          { label: "Active Orders", value: active, icon: Clock, color: "var(--warning-fg)" },
          { label: "Delivered Today", value: orders.filter((o) => o.status === "Delivered").length, icon: CheckCircle2, color: "var(--normal-fg)" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p><c.icon size={15} style={{ color: c.color }} /></div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--text-primary)]">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {(["all", "Diabetic", "Low Salt", "Soft", "Liquid", "Semi-Solid", "Normal"] as const).map((d) => (
          <button key={d} onClick={() => setFilterDiet(d)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${filterDiet === d ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>{d === "all" ? "All" : d}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((o) => (
          <div key={o.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{o.patientName}</p>
                  <span className="rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--action-primary)]">{o.dietType}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLS[o.status]}`}>{o.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{o.ward} ({o.bed}) · {o.meals.join(", ")}</p>
                {o.instructions && <p className="mt-1 text-xs italic text-[var(--text-secondary)]">{o.instructions}</p>}
              </div>
              <div className="flex gap-1.5 shrink-0">
                {o.status === "Ordered" && <button onClick={() => updateStatus(o.id, "Preparing")} className="rounded-lg bg-[var(--warning-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--warning-fg)]">Start Prep</button>}
                {o.status === "Preparing" && <button onClick={() => updateStatus(o.id, "Delivered")} className="rounded-lg bg-[var(--normal-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--normal-fg)]">Deliver</button>}
                {(o.status === "Ordered" || o.status === "Preparing") && <button onClick={() => updateStatus(o.id, "Cancelled")} className="rounded-lg border border-[var(--critical-fg)] px-2 py-1 text-[10px] font-medium text-[var(--critical-fg)]">Cancel</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
