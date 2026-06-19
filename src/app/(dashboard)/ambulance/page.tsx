"use client";

import { useAmbulanceStore } from "@/store/useCrossCuttingStores";
import { Truck } from "lucide-react";

export default function AmbulancePage() {
  const { ambulances, trips } = useAmbulanceStore();
  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Truck size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Ambulance Management</h1><p className="text-sm text-[var(--text-secondary)]">Vehicle tracking, crew assignment & trip logs</p></div></div>
      <div className="grid grid-cols-3 gap-3">
        {ambulances.map((a) => (
          <div key={a.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
            <div className="flex justify-between"><p className="font-semibold text-sm text-[var(--text-primary)]">{a.vehicleNo}</p><span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${a.status === "Available" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{a.status}</span></div>
            <p className="text-xs text-[var(--text-secondary)]">{a.type} · Crew: {a.crewCount}</p>
            <p className="text-[10px] text-[var(--text-secondary)]">{a.equipment.join(", ")}</p>
          </div>
        ))}
      </div>
      <p className="text-xs font-semibold text-[var(--text-primary)]">Recent Trips</p>
      {trips.map((t) => (
        <div key={t.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 text-xs flex justify-between">
          <div><p className="font-medium text-[var(--text-primary)]">{t.patientName}</p><p className="text-[var(--text-secondary)]">{t.pickup} → {t.dropoff} · {t.crew.join(", ")}</p></div>
          <span className={`rounded px-1 py-0.5 text-[9px] font-medium ${t.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "text-[var(--info-fg)]"}`}>{t.status}</span>
        </div>
      ))}
    </div>
  );
}
