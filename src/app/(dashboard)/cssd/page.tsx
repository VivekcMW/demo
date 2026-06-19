"use client";

import { useCSSDStore } from "@/store/useCrossCuttingStores";
import { FlaskConical } from "lucide-react";

export default function CSSDPage() {
  const { instruments, cycles } = useCSSDStore();
  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><FlaskConical size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">CSSD / Sterilization</h1><p className="text-sm text-[var(--text-secondary)]">Instrument tracking & autoclave cycle management</p></div></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-primary)]">Instruments</p>
          {instruments.map((i) => (
            <div key={i.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 flex justify-between text-xs">
              <span>{i.name} <span className="text-[var(--text-secondary)]">({i.category})</span></span>
              <span className={`font-semibold ${i.quantity <= i.reorderLevel ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>{i.quantity}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-primary)]">Autoclave Cycles</p>
          {cycles.map((c) => (
            <div key={c.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 text-xs">
              <div className="flex justify-between"><span className="font-medium text-[var(--text-primary)]">{c.autoclaveName}</span><span className={`rounded px-1 py-0.5 ${c.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--info-bg)] text-[var(--info-fg)]"}`}>{c.status}</span></div>
              <p className="text-[var(--text-secondary)]">{c.cycleType} · {c.temp}°C · {c.durationMin}min · BI: {c.biologicalIndicator}</p>
              <p className="text-[var(--text-secondary)] truncate">{c.loadContents}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
