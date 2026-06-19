"use client";

import { useState } from "react";
import { useOncologyStore } from "@/store/useOncologyStore";
import { Syringe, AlertTriangle, Activity } from "lucide-react";

type Tab = "plans" | "toxicity" | "recist";

export default function OncologyPage() {
  const { regimens, plans, ctcaeEntries, recistLesions } = useOncologyStore();
  const [tab, setTab] = useState<Tab>("plans");

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Syringe size={24} className="text-[var(--action-primary)]" />
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Oncology</h1><p className="text-sm text-[var(--text-secondary)]">Chemo protocols, CTCAE toxicity & RECIST 1.1</p></div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {(["plans","toxicity","recist"] as Tab[]).map((t) => {
          const icons: Record<Tab, React.ElementType> = { plans: Syringe, toxicity: AlertTriangle, recist: Activity };
          const Icon = icons[t];
          const labels: Record<Tab, string> = { plans: "Protocols", toxicity: "CTCAE v5", recist: "RECIST 1.1" };
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)]"}`}>
              <Icon size={16} /> {labels[t]}
            </button>
          );
        })}
      </div>

      {tab === "plans" && (
        <div className="space-y-4">
          {plans.map((p) => {
            const reg = regimens.find((r) => r.id === p.regimenId);
            return (
              <div key={p.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{p.patientName} — {p.diagnosis}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{reg?.name} · Cycle {p.currentCycle}/{p.totalCycles}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${p.status === "Active" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{p.status}</span>
                </div>
                {reg && (
                  <div className="mt-2 space-y-1">
                    {reg.drugs.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-subtle)] text-[9px] text-[var(--action-primary)]">{i + 1}</span>
                        <span className="font-medium text-[var(--text-primary)]">{d.name}</span>
                        <span className="text-[var(--text-secondary)]">{d.dose} · {d.route} · {d.frequency}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === "toxicity" && (
        <div className="space-y-2">
          {ctcaeEntries.map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{c.term}</p>
                <p className="text-xs text-[var(--text-secondary)]">{c.date} · Attribution: {c.attribution} · Action: {c.action}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${c.grade <= 2 ? "bg-[var(--warning-fg)]" : c.grade <= 3 ? "bg-[var(--critical-fg)]" : "bg-black"}`}>{c.grade}</span>
                {c.resolved ? <span className="text-[9px] text-[var(--normal-fg)]">Resolved</span> : <span className="text-[9px] text-[var(--warning-fg)]">Active</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "recist" && (
        <div className="space-y-3">
          <div className="mobile-table-wrap">
          <table className="w-full text-xs rounded-xl border border-[var(--border-default)]">
            <thead><tr className="bg-[var(--surface-sunken)]"><th className="px-2 py-1.5 text-left text-[var(--text-secondary)]">Site</th><th className="px-2 py-1.5 text-left text-[var(--text-secondary)]">Date</th><th className="px-2 py-1.5 text-right text-[var(--text-secondary)]">LD (mm)</th><th className="px-2 py-1.5 text-center text-[var(--text-secondary)]">Target</th><th className="px-2 py-1.5 text-center text-[var(--text-secondary)]">Response</th></tr></thead>
            <tbody>
              {recistLesions.map((l, i) => (
                <tr key={i} className="border-t border-[var(--border-subtle)]">
                  <td className="px-2 py-1 text-[var(--text-primary)]">{l.site}</td>
                  <td className="px-2 py-1 text-[var(--text-primary)]">{l.date}</td>
                  <td className="px-2 py-1 text-right font-semibold text-[var(--text-primary)]">{l.longestDiameter}</td>
                  <td className="px-2 py-1 text-center">{l.target ? "✓" : "—"}</td>
                  <td className="px-2 py-1 text-center">
                    <span className={`rounded px-1.5 py-0.5 font-medium ${l.response === "CR" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : l.response === "PR" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : l.response === "SD" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : l.response === "PD" ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]" : "text-[var(--text-disabled)]"}`}>{l.response || "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {(() => {
            const baseline = recistLesions.filter((l) => l.target && l.date === "2026-04-10");
            const followup = recistLesions.filter((l) => l.target && l.date === "2026-06-10");
            if (baseline.length === 0 || followup.length === 0) return null;
            const sumBase = baseline.reduce((s, l) => s + l.longestDiameter, 0);
            const sumFup = followup.reduce((s, l) => s + l.longestDiameter, 0);
            const pctChange = ((sumFup / sumBase) - 1) * 100;
            return (
              <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] p-3 text-xs">
                <p><strong className="text-[var(--text-primary)]">Baseline sum LD:</strong> {sumBase} mm</p>
                <p><strong className="text-[var(--text-primary)]">Follow-up sum LD:</strong> {sumFup} mm</p>
                <p><strong className="text-[var(--text-primary)]">Percent change:</strong> {pctChange.toFixed(1)}%</p>
                <p><strong className="text-[var(--text-primary)]">Best response:</strong> {pctChange <= -30 ? "PR (Partial Response)" : pctChange >= 20 ? "PD (Progressive Disease)" : "SD (Stable Disease)"}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
