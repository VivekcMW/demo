"use client";

import { useState } from "react";
import { useGastroenterologyStore } from "@/store/useGastroenterologyStore";
import { Activity } from "lucide-react";

type Tab = "endoscopy" | "ibd";

export default function GastroenterologyPage() {
  const { endoscopyReports, ibdScores, computeMayo } = useGastroenterologyStore();
  const [tab, setTab] = useState<Tab>("endoscopy");
  const [mayoInput, setMayo] = useState({ stoolFreq: 0, rectalBleeding: 0, mucosa: 0, physician: 0 });
  const mayo = computeMayo(mayoInput.stoolFreq, mayoInput.rectalBleeding, mayoInput.mucosa, mayoInput.physician);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Activity size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Gastroenterology</h1><p className="text-sm text-[var(--text-secondary)]">Endoscopy reports & IBD scoring</p></div></div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {(["endoscopy","ibd"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)]"}`}>
            {t === "endoscopy" ? "Endoscopy Reports" : "IBD Scoring (Mayo)"}
          </button>
        ))}
      </div>

      {tab === "endoscopy" && (
        <div className="space-y-3">
          {endoscopyReports.map((e) => (
            <div key={e.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{e.patientName} <span className="text-xs font-normal text-[var(--text-secondary)]">({e.date} · {e.procedure})</span></p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">Indication: {e.indication} · Sedation: {e.sedation} · Endoscopist: {e.endoscopist}</p>
                  <p className="text-xs mt-1 text-[var(--text-primary)]">{e.findings}</p>
                  {e.polyps > 0 && <p className="text-xs text-[var(--action-primary)] mt-1">Polyps: {e.polyps} ({e.polypectomy ? "removed" : "observed"}) · {e.polypDetails}</p>}
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[var(--text-secondary)]">{e.biopsy ? `Biopsy: ${e.biopsySites}` : "No biopsy"}</span>
                    {e.complications && <span className="rounded bg-[var(--critical-bg)] px-1.5 py-0.5 text-[var(--critical-fg)]">⚠ {e.complications}</span>}
                  </div>
                  <p className="mt-1 text-xs font-medium text-[var(--action-primary)]">{e.conclusion}</p>
                  <p className="text-xs text-[var(--text-secondary)] italic">Follow-up: {e.followUp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "ibd" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-[var(--text-primary)]">Mayo Score Calculator (Ulcerative Colitis)</p>
            {[
              { k: "stoolFreq" as const, label: "Stool Frequency (0-3)", min: 0, max: 3 },
              { k: "rectalBleeding" as const, label: "Rectal Bleeding (0-3)", min: 0, max: 3 },
              { k: "mucosa" as const, label: "Mucosal Appearance (0-3)", min: 0, max: 3 },
              { k: "physician" as const, label: "Physician Global (0-3)", min: 0, max: 3 },
            ].map((f) => (
              <div key={f.k}>
                <label className="text-xs text-[var(--text-secondary)]">{f.label}</label>
                <input type="number" min={f.min} max={f.max} value={mayoInput[f.k]} onChange={(e) => setMayo((p) => ({ ...p, [f.k]: Math.min(f.max, Math.max(f.min, parseInt(e.target.value) || 0)) }))}
                  className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-6 text-center">
              <p className="text-xs font-medium text-[var(--text-secondary)]">Mayo Score</p>
              <p className="text-4xl font-bold text-[var(--action-primary)]">{mayo.score}</p>
              <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${mayo.severity === "Remission" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : mayo.severity === "Mild" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : mayo.severity === "Moderate" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{mayo.severity}</span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-[var(--text-primary)]">Historical Scores</p>
              {ibdScores.map((s, i) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-2 text-xs">
                  <span className="text-[var(--text-primary)]">{s.date} · {s.type}</span>
                  <span className={`font-semibold ${s.severity === "Remission" ? "text-[var(--normal-fg)]" : s.severity === "Mild" ? "text-[var(--info-fg)]" : s.severity === "Moderate" ? "text-[var(--warning-fg)]" : "text-[var(--critical-fg)]"}`}>{s.score} ({s.severity})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
