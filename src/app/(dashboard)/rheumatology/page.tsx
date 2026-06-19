"use client";

import { useState, useMemo } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { Activity } from "lucide-react";

export default function RheumatologyPage() {
  const { computeDAS28 } = useSmallSpecialtyStore();
  const [input, setInput] = useState({ tender28: 6, swollen28: 3, patientGlobal: 45, esr: 28 });
  const result = useMemo(() => computeDAS28(input), [input]);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Activity size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Rheumatology</h1><p className="text-sm text-[var(--text-secondary)]">DAS28 calculator & joint assessment</p></div></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">DAS28 (ESR) Input</p>
          {[
            { k: "tender28" as const, label: "Tender Joint Count (0-28)", min: 0, max: 28 },
            { k: "swollen28" as const, label: "Swollen Joint Count (0-28)", min: 0, max: 28 },
            { k: "patientGlobal" as const, label: "Patient Global (VAS 0-100)", min: 0, max: 100 },
            { k: "esr" as const, label: "ESR (mm/hr)", min: 1, max: 150 },
          ].map((f) => (
            <div key={f.k}><label className="text-xs text-[var(--text-secondary)]">{f.label}</label>
              <input type="number" min={f.min} max={f.max} value={input[f.k]} onChange={(e) => setInput((p) => ({ ...p, [f.k]: Math.min(f.max, Math.max(f.min, parseInt(e.target.value) || 0)) }))}
                className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-6 text-center">
            <p className="text-xs font-medium text-[var(--text-secondary)]">DAS28 Score</p>
            <p className="text-4xl font-bold text-[var(--action-primary)]">{result.score}</p>
            <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${result.diseaseActivity === "Remission" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : result.diseaseActivity === "Low" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : result.diseaseActivity === "Moderate" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{result.diseaseActivity}</span>
            <p className="text-xs text-[var(--text-secondary)] mt-2">{result.remission ? "☑ Meets DAS28 remission criteria (score ≤ 2.6)" : "Does not meet remission criteria"}</p>
          </div>

          {/* Joint diagram SVG */}
          <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
            <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">28-Joint Count Diagram</p>
            <svg viewBox="0 0 400 250" className="w-full h-auto">
              {[
                { cx: 80, cy: 40, label: "Shoulders", r: 18, tender: input.tender28 > 0, swollen: input.swollen28 > 0 },
                { cx: 320, cy: 40, label: "Shoulders", r: 18, tender: input.tender28 > 0, swollen: input.swollen28 > 0 },
                { cx: 80, cy: 80, label: "Elbows", r: 12, tender: input.tender28 > 2, swollen: input.swollen28 > 1 },
                { cx: 320, cy: 80, label: "Elbows", r: 12, tender: input.tender28 > 2, swollen: input.swollen28 > 1 },
                { cx: 80, cy: 120, label: "Wrists", r: 10, tender: input.tender28 > 4, swollen: input.swollen28 > 2 },
                { cx: 320, cy: 120, label: "Wrists", r: 10, tender: input.tender28 > 4, swollen: input.swollen28 > 2 },
                { cx: 40, cy: 160, label: "MCPs", r: 8, tender: input.tender28 > 6, swollen: input.swollen28 > 3 },
                { cx: 60, cy: 170, label: "", r: 8 },
                { cx: 80, cy: 180, label: "", r: 8 },
                { cx: 100, cy: 190, label: "", r: 8 },
                { cx: 300, cy: 160, label: "MCPs", r: 8, tender: input.tender28 > 6, swollen: input.swollen28 > 3 },
                { cx: 320, cy: 170, label: "", r: 8 },
                { cx: 340, cy: 180, label: "", r: 8 },
                { cx: 360, cy: 190, label: "", r: 8 },
              ].map((j, i) => j.label !== "" && (
                <g key={i}>
                  <circle cx={j.cx} cy={j.cy} r={j.r} fill={j.tender ? "#e74c3c30" : j.swollen ? "#e67e2230" : "#f0f0f0"} stroke={j.tender ? "#e74c3c" : j.swollen ? "#e67e22" : "#ccc"} strokeWidth={1.5} />
                  <text x={j.cx} y={j.cy + 3} textAnchor="middle" fontSize={7} fill="#555">{j.label}</text>
                </g>
              ))}
              {/* PIPs */}
              {[120, 140, 160, 180, 200].map((y, i) => (
                <g key={`l${i}`}><circle cx={45 + i * 18} cy={y} r={4} fill={input.swollen28 > 3 ? "#e67e2230" : "#f0f0f0"} stroke={input.swollen28 > 3 ? "#e67e22" : "#ccc"} strokeWidth={1} /></g>
              ))}
              {[120, 140, 160, 180, 200].map((y, i) => (
                <g key={`r${i}`}><circle cx={315 + i * 18} cy={y} r={4} fill={input.swollen28 > 3 ? "#e67e2230" : "#f0f0f0"} stroke={input.swollen28 > 3 ? "#e67e22" : "#ccc"} strokeWidth={1} /></g>
              ))}
              <text x={200} y={235} textAnchor="middle" fontSize={7} fill="#888">Tender {input.tender28} / Swollen {input.swollen28}</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
