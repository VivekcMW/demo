"use client";

import { useState, useMemo } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { AlertTriangle, Activity } from "lucide-react";

type Tab = "qsofa" | "news";

export default function InfectiousDiseasePage() {
  const { computeQSOFA, computeNEWS } = useSmallSpecialtyStore();
  const [tab, setTab] = useState<Tab>("qsofa");

  const [qInput, setQInput] = useState({ rr: 24, sbp: 88, loc: false });
  const qsofa = useMemo(() => computeQSOFA(qInput.rr, qInput.sbp, qInput.loc), [qInput]);

  const [nInput, setNInput] = useState({ rr: 22, spo2: 92, o2: false, sbp: 95, hr: 110, temp: 38.5, loc: false });
  const newsScore = useMemo(() => computeNEWS(nInput), [nInput]);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><AlertTriangle size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Infectious Disease</h1><p className="text-sm text-[var(--text-secondary)]">Sepsis screening & clinical monitoring</p></div></div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[{ id:"qsofa" as Tab, label:"qSOFA Score", icon:AlertTriangle }, { id:"news" as Tab, label:"NEWS2", icon:Activity }].map((t) => {
          const Icon = t.icon;
          return <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 ${tab===t.id?"border-[var(--action-primary)] text-[var(--action-primary)]":"border-transparent text-[var(--text-secondary)]"}`}><Icon size={16}/>{t.label}</button>;
        })}
      </div>

      {tab === "qsofa" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
            <p className="text-xs font-semibold text-[var(--text-primary)]">qSOFA (Quick SOFA) Variables</p>
            {[
              { k: "rr" as const, label: "Respiratory Rate (≥22 = +1)", min: 5, max: 60 },
              { k: "sbp" as const, label: "Systolic BP (≤100 = +1)", min: 50, max: 200 },
            ].map((f) => (
              <div key={f.k}><label className="text-xs text-[var(--text-secondary)]">{f.label}</label>
                <input type="number" min={f.min} max={f.max} value={qInput[f.k]} onChange={(e) => setQInput((p) => ({ ...p, [f.k]: parseInt(e.target.value) || 0 }))}
                  className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
              </div>
            ))}
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={qInput.loc} onChange={(e) => setQInput((p) => ({ ...p, loc: e.target.checked }))} className="accent-[var(--action-primary)]" /><span className="text-[var(--text-primary)]">Altered mental status (GCS &lt;15 = +1)</span></label>
          </div>
          <div className={`rounded-xl border-2 p-6 text-center flex flex-col items-center justify-center ${qsofa.score >= 2 ? "border-[var(--critical-fg)] bg-[var(--critical-bg)]" : "border-[var(--normal-fg)] bg-[var(--normal-bg)]"}`}>
            <p className="text-xs font-medium text-[var(--text-secondary)]">qSOFA Score</p>
            <p className={`text-5xl font-bold ${qsofa.score >= 2 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>{qsofa.score}/3</p>
            <p className="text-xs mt-2 text-[var(--text-primary)]">{qsofa.score >= 2 ? "⚠ HIGH RISK — Suspect sepsis. Consider ICU, lactate, cultures, broad-spectrum antibiotics." : "Low risk for sepsis deterioration."}</p>
          </div>
        </div>
      )}

      {tab === "news" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
            <p className="text-xs font-semibold text-[var(--text-primary)]">NEWS2 Parameters</p>
            {[
              { k: "rr" as const, label: "Respiratory Rate (/min)", min: 5, max: 60 },
              { k: "spo2" as const, label: "SpO₂ (%)", min: 70, max: 100 },
              { k: "sbp" as const, label: "Systolic BP (mmHg)", min: 50, max: 250 },
              { k: "hr" as const, label: "Heart Rate (/min)", min: 30, max: 220 },
              { k: "temp" as const, label: "Temperature (°C)", min: 34, max: 42 },
            ].map((f) => (
              <div key={f.k}><label className="text-xs text-[var(--text-secondary)]">{f.label}</label>
                <input type="number" min={f.min} max={f.max} value={nInput[f.k]} onChange={(e) => setNInput((p) => ({ ...p, [f.k]: parseFloat(e.target.value) || 0 }))} step={f.k === "temp" ? 0.1 : 1}
                  className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
              </div>
            ))}
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={nInput.o2} onChange={(e) => setNInput((p) => ({ ...p, o2: e.target.checked }))} className="accent-[var(--action-primary)]" /><span className="text-[var(--text-primary)]">On supplemental oxygen</span></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={nInput.loc} onChange={(e) => setNInput((p) => ({ ...p, loc: e.target.checked }))} className="accent-[var(--action-primary)]" /><span className="text-[var(--text-primary)]">New confusion / altered mental status</span></label>
          </div>
          <div className={`rounded-xl border-2 p-6 text-center flex flex-col items-center justify-center ${newsScore >= 7 ? "border-[var(--critical-fg)] bg-[var(--critical-bg)]" : newsScore >= 5 ? "border-[var(--warning-fg)] bg-[var(--warning-bg)]" : "border-[var(--normal-fg)] bg-[var(--normal-bg)]"}`}>
            <p className="text-xs font-medium text-[var(--text-secondary)]">NEWS2 Score</p>
            <p className={`text-5xl font-bold ${newsScore >= 7 ? "text-[var(--critical-fg)]" : newsScore >= 5 ? "text-[var(--warning-fg)]" : newsScore >= 3 ? "text-[var(--info-fg)]" : "text-[var(--normal-fg)]"}`}>{newsScore}</p>
            <p className="text-xs mt-2 text-[var(--text-primary)]">
              {newsScore >= 7 ? "⚠ HIGH — Urgent ICU review. Immediate clinical response." : newsScore >= 5 ? "⚠ MEDIUM — Urgent ward review. Escalate within 1 hour." : newsScore >= 3 ? "LOW — Regular monitoring. Escalate if trend worsens." : "NORMAL — Continue routine monitoring."}
            </p>
            <div className="mt-3 flex gap-2">{[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((v) => (
              <div key={v} className={`h-4 w-2 rounded-sm ${v <= newsScore ? v >= 7 ? "bg-[var(--critical-fg)]" : v >= 5 ? "bg-[var(--warning-fg)]" : v >= 3 ? "bg-[var(--info-fg)]" : "bg-[var(--normal-fg)]" : "bg-[var(--surface-sunken)]"}`} />
            ))}</div>
          </div>
        </div>
      )}
    </div>
  );
}
