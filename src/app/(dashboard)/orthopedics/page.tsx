"use client";

import { useState } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { Bone, Search } from "lucide-react";

export default function OrthopedicsPage() {
  const { fractureTypes } = useSmallSpecialtyStore();
  const [query, setQuery] = useState("");

  const filtered = fractureTypes.filter((f) =>
    f.bone.toLowerCase().includes(query.toLowerCase()) ||
    f.type.toLowerCase().includes(query.toLowerCase()) ||
    f.aoCode.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Bone size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Orthopedics</h1><p className="text-sm text-[var(--text-secondary)]">Fracture classification reference</p></div></div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input type="text" placeholder="Search by bone, type or AO code…" value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((f, i) => (
          <div key={i} className="rounded-xl border-2 border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{f.bone} — {f.part}</p>
                <p className="text-[10px] font-mono text-[var(--action-primary)]">{f.aoCode}</p>
              </div>
              <span className="rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[9px] font-medium text-[var(--action-primary)]">{f.type}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-[var(--text-secondary)]">
              <span>Open: {f.open ? "Yes" : "No"}</span>
              <span>Displacement: {f.displacement}</span>
            </div>
            <svg viewBox="0 0 120 30" className="mt-2 w-full shrink-0">
              <rect x={10} y={4} width={100} height={18} rx={9} fill="#ddd" stroke="#aaa" strokeWidth={1} />
              <line x1={60} y1={4} x2={60} y2={22} stroke="#e74c3c" strokeWidth={2} strokeDasharray="3 2" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
