"use client";

import { useOperationsStore } from "@/store/useOperationsStore";
import { HardDrive, Wrench, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function AssetsPage() {
  const { assets, updateAssetStatus } = useOperationsStore();
  const [filter, setFilter] = useState("All");
  const statuses = ["All", ...new Set(assets.map((a) => a.status))];

  const filtered = filter === "All" ? assets : assets.filter((a) => a.status === filter);
  const faulty = assets.filter((a) => a.status === "Faulty" || a.status === "Under Maintenance");

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><HardDrive size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Assets</h1><p className="text-sm text-[var(--text-secondary)]">Equipment register & maintenance tracking</p></div></div>

      {faulty.length > 0 && (
        <div className="rounded-xl border-2 border-[var(--critical-fg)] bg-[var(--critical-bg)] p-3 flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0 text-[var(--critical-fg)]" />
          <p className="text-xs text-[var(--critical-fg)] font-medium">{faulty.length} asset(s) require attention — faulty or under maintenance</p>
        </div>
      )}

      <div className="flex gap-2">
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${filter === s ? "bg-[var(--action-primary)] text-white" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{s}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((a) => (
          <div key={a.id} className="rounded-xl border-2 border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-sm font-semibold text-[var(--text-primary)]">{a.name}</p><p className="text-[10px] text-[var(--text-secondary)]">{a.model} · {a.serialNo}</p></div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${a.status === "Operational" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : a.status === "Faulty" ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]" : a.status === "Under Maintenance" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{a.status}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-[var(--text-secondary)]">
              <span>Dept: {a.department}</span>
              <span>Location: {a.location}</span>
              <span>Purchased: {a.purchaseDate}</span>
              <span>Warranty: {a.warrantyExpiry}</span>
              <span>Last Maint: {a.lastMaintenance}</span>
              <span>Next Due: <span className={new Date(a.nextMaintenance) < new Date() ? "text-[var(--warning-fg)] font-medium" : ""}>{a.nextMaintenance}</span></span>
            </div>
            <div className="mt-2 flex gap-1">
              {a.status === "Operational" && <button onClick={() => updateAssetStatus(a.id, "Under Maintenance")} className="rounded bg-[var(--warning-bg)] px-2 py-1 text-[9px] font-medium text-[var(--warning-fg)]"><Wrench size={10} className="inline mr-0.5" />Maintenance</button>}
              {a.status === "Under Maintenance" && <button onClick={() => updateAssetStatus(a.id, "Operational")} className="rounded bg-[var(--normal-bg)] px-2 py-1 text-[9px] font-medium text-[var(--normal-fg)]">Mark Operational</button>}
              <button onClick={() => updateAssetStatus(a.id, "Faulty")} className="rounded bg-[var(--critical-bg)] px-2 py-1 text-[9px] font-medium text-[var(--critical-fg)]">Report Fault</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
