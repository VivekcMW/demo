"use client";

import { useState } from "react";
import { useOphthalmologyStore } from "@/store/useOphthalmologyStore";
import { Eye, Calculator } from "lucide-react";

export default function OphthalmologyPage() {
  const { snellenResults, calculateIOL } = useOphthalmologyStore();
  const [tab, setTab] = useState<"snellen" | "iol">("snellen");
  const [iolInput, setIolInput] = useState({ k1: 44.0, k2: 44.5, al: 23.5, aConst: 118.4, target: -0.5 });
  const iolResults = calculateIOL({ k1: iolInput.k1, k2: iolInput.k2, al: iolInput.al, aConst: iolInput.aConst, targetRefraction: iolInput.target });

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Eye size={24} className="text-[var(--action-primary)]" />
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Ophthalmology</h1><p className="text-sm text-[var(--text-secondary)]">Visual acuity tracking & IOL power calculation</p></div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[{ id: "snellen" as const, label: "Snellen Acuity", icon: Eye }, { id: "iol" as const, label: "IOL Calculator", icon: Calculator }].map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              <Icon size={16} />{t.label}
            </button>
          );
        })}
      </div>

      {tab === "snellen" && (
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[var(--surface-sunken)]">
                  <th className="px-3 py-2 text-left font-medium text-[var(--text-secondary)]">Date</th>
                  <th className="px-3 py-2 text-left font-medium text-[var(--text-secondary)]">OD</th>
                  <th className="px-3 py-2 text-left font-medium text-[var(--text-secondary)]">OS</th>
                  <th className="px-3 py-2 text-left font-medium text-[var(--text-secondary)]">OU</th>
                  <th className="px-3 py-2 text-left font-medium text-[var(--text-secondary)]">Note</th>
                </tr>
              </thead>
              <tbody>
                {snellenResults.map((r, i) => (
                  <tr key={i} className="border-t border-[var(--border-subtle)]">
                    <td className="px-3 py-2 text-[var(--text-primary)]">{r.date}</td>
                    <td className="px-3 py-2 font-semibold text-[var(--text-primary)]">{r.od}</td>
                    <td className="px-3 py-2 font-semibold text-[var(--text-primary)]">{r.os}</td>
                    <td className="px-3 py-2 text-[var(--text-primary)]">{r.ou}</td>
                    <td className="px-3 py-2 text-[var(--text-secondary)]">{r.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "iol" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            {[
              { k: "k1", label: "K1 (D)", v: iolInput.k1, set: (v: number) => setIolInput((p) => ({ ...p, k1: v })) },
              { k: "k2", label: "K2 (D)", v: iolInput.k2, set: (v: number) => setIolInput((p) => ({ ...p, k2: v })) },
              { k: "al", label: "AL (mm)", v: iolInput.al, set: (v: number) => setIolInput((p) => ({ ...p, al: v })) },
              { k: "aConst", label: "A-constant", v: iolInput.aConst, set: (v: number) => setIolInput((p) => ({ ...p, aConst: v })) },
              { k: "target", label: "Target (D)", v: iolInput.target, set: (v: number) => setIolInput((p) => ({ ...p, target: v })) },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-xs font-medium text-[var(--text-secondary)]">{f.label}</label>
                <input type="number" value={f.v} onChange={(e) => f.set(parseFloat(e.target.value) || 0)} step="0.1"
                  className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {iolResults.map((r) => (
              <div key={r.formula} className="rounded-xl border border-[var(--border-default)] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--action-primary)]">{r.formula}</p>
                <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{r.iolPower} <span className="text-xs font-normal text-[var(--text-secondary)]">D</span></p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Range: {r.recommendedRange.min} – {r.recommendedRange.max} D</p>
                <p className="text-xs text-[var(--text-secondary)]">Target SE: {r.predictedSE} D</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
