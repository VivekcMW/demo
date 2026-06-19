"use client";

import { useState } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { Brain, AlertTriangle, Lock } from "lucide-react";

type Tab = "mse" | "cssrs" | "hold";

export default function PsychiatryPage() {
  const { mseEntries, cssrsEntries, holds } = useSmallSpecialtyStore();
  const [tab, setTab] = useState<Tab>("mse");
  const mse = mseEntries[0];
  const cssrs = cssrsEntries[0];

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Brain size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Psychiatry</h1><p className="text-sm text-[var(--text-secondary)]">Mental Status Exam, suicide assessment & involuntary holds</p></div></div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {([{ id:"mse" as Tab, label:"MSE", icon:Brain }, { id:"cssrs" as Tab, label:"C-SSRS", icon:AlertTriangle }, { id:"hold" as Tab, label:"Involuntary Hold", icon:Lock }] as const).map((t) => {
          const Icon = t.icon;
          return <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 ${tab===t.id?"border-[var(--action-primary)] text-[var(--action-primary)]":"border-transparent text-[var(--text-secondary)]"}`}><Icon size={16}/>{t.label}</button>;
        })}
      </div>

      {tab === "mse" && mse && (
        <div className="space-y-2">
          <p className="text-xs text-[var(--text-secondary)]">{mse.date} · {mse.patientId}</p>
          {mse.sections.map((s,i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <div className="flex-1"><p className="text-sm font-medium text-[var(--text-primary)]">{s.domain}</p><p className="text-xs text-[var(--text-secondary)]">{s.findings}</p></div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${s.normal ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{s.normal ? "Normal" : "Abnormal"}</span>
            </div>
          ))}
          <div className="rounded-xl border border-[var(--action-primary)] bg-[var(--action-subtle)] p-3">
            <p className="text-xs font-semibold text-[var(--action-primary)]">Impression</p>
            <p className="text-sm text-[var(--text-primary)]">{mse.impression}</p>
          </div>
        </div>
      )}

      {tab === "cssrs" && cssrs && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Wish to be dead", val: cssrs.wishToDie },
              { label: "Suicidal thoughts", val: cssrs.suicidalThoughts },
              { label: "Method (non-specific)", val: cssrs.method },
              { label: "Intent without plan", val: cssrs.intent },
              { label: "Specific plan", val: cssrs.plan },
              { label: "Preparatory acts", val: cssrs.preparatoryActs },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg border p-3 flex justify-between ${item.val ? "border-[var(--critical-fg)] bg-[var(--critical-bg)]" : "border-[var(--border-default)] bg-[var(--surface-raised)]"}`}>
                <span className="text-sm text-[var(--text-primary)]">{item.label}</span>
                <span className={`font-bold ${item.val ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>{item.val ? "Yes" : "No"}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border-2 border-[var(--critical-fg)] bg-[var(--critical-bg)] p-4 text-center">
            <p className="text-lg font-bold text-[var(--critical-fg)]">C-SSRS Score: {cssrs.score}/6</p>
            <p className="text-xs text-[var(--critical-fg)]">{cssrs.score >= 4 ? "HIGH RISK — Immediate safety precautions required" : cssrs.score >= 2 ? "Moderate risk — Monitor closely" : "Low risk"}</p>
          </div>
        </div>
      )}

      {tab === "hold" && (
        <div className="space-y-2">
          {holds.map((h) => (
            <div key={h.id} className="rounded-xl border-2 border-[var(--warning-fg)] bg-[var(--warning-bg)] p-4">
              <div className="flex items-start justify-between">
                <div><p className="text-sm font-semibold text-[var(--text-primary)]">{h.patientName} — {h.section}</p><p className="text-xs text-[var(--text-secondary)]">{h.date} · Expires: {h.expiry}</p></div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${h.status==="Active"?"bg-[var(--critical-bg)] text-[var(--critical-fg)]":"bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{h.status}</span>
              </div>
              <p className="text-xs text-[var(--text-primary)] mt-2">Grounds: {h.grounds}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
