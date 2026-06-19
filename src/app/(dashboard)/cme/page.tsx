"use client";

import { useOperationsStore } from "@/store/useOperationsStore";
import { GraduationCap, Award, Clock } from "lucide-react";
import { useState } from "react";

export default function CMEPage() {
  const { cmeRecords, getPendingCME, getTotalCredits } = useOperationsStore();
  const [tab, setTab] = useState<"all" | "pending">("all");

  const pending = getPendingCME();
  const displayed = tab === "pending" ? pending : cmeRecords;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><GraduationCap size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">CME & Learning</h1><p className="text-sm text-[var(--text-secondary)]">Continuing medical education, credits & certifications</p></div></div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--text-primary)]">{cmeRecords.length}</p><p className="text-xs text-[var(--text-secondary)]">Total Records</p></div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--normal-fg)]">{cmeRecords.filter((c) => c.completed).length}</p><p className="text-xs text-[var(--text-secondary)]">Completed</p></div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--warning-fg)]">{pending.length}</p><p className="text-xs text-[var(--text-secondary)]">Pending</p></div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        <button onClick={() => setTab("all")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "all" ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)]"}`}>All Records</button>
        <button onClick={() => setTab("pending")} className={`px-4 py-2 text-sm font-medium border-b-2 ${tab === "pending" ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)]"}`}>Pending ({pending.length})</button>
      </div>

      <div className="space-y-2">
        {displayed.map((c) => (
          <div key={c.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between">
              <div><p className="text-sm font-semibold text-[var(--text-primary)]">{c.courseName}</p><p className="text-xs text-[var(--text-secondary)]">{c.staffName} · {c.provider}</p></div>
              <div className="text-right"><span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${c.completed ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{c.completed ? "Completed" : "Pending"}</span><p className="text-[10px] text-[var(--text-secondary)] mt-1">{c.credits} credits</p></div>
            </div>
            <div className="mt-1 flex items-center gap-3 text-[10px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1"><Award size={10} />{c.type}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{c.date}</span>
              {c.expiryDate && <span>Expires: {c.expiryDate}</span>}
            </div>
            {c.notes && <p className="mt-1 text-[10px] italic text-[var(--text-secondary)]">{c.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
