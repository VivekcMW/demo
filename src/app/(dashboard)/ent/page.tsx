"use client";

import { useMemo } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { Ear } from "lucide-react";

export default function ENTPage() {
  const { audiograms } = useSmallSpecialtyStore();
  const a = audiograms[0];
  if (!a) return null;

  const freqs = [125, 250, 500, 1000, 2000, 4000, 8000];
  const maxDb = 110;
  const W = 500, H = 280, pad = { left: 40, right: 20, top: 20, bottom: 35 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const xScale = (f: number) => pad.left + (Math.log2(f / 125) / Math.log2(8000 / 125)) * plotW;
  const yScale = (db: number) => pad.top + (db / maxDb) * plotH;

  const leftPts = a.readings.map((r) => `${xScale(r.freq)},${yScale(r.dbLeft)}`).join(" ");
  const rightPts = a.readings.map((r) => `${xScale(r.freq)},${yScale(r.dbRight)}`).join(" ");

  const avgLeft = Math.round(a.readings.reduce((s, r) => s + r.dbLeft, 0) / a.readings.length);
  const avgRight = Math.round(a.readings.reduce((s, r) => s + r.dbRight, 0) / a.readings.length);
  const classify = (avg: number) => avg <= 20 ? "Normal" : avg <= 40 ? "Mild" : avg <= 60 ? "Moderate" : avg <= 80 ? "Severe" : "Profound";

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Ear size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">ENT</h1><p className="text-sm text-[var(--text-secondary)]">Audiogram & hearing classification</p></div></div>

      <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {[0, 20, 40, 60, 80, 100].map((db) => (
            <g key={db}><line x1={pad.left} y1={yScale(db)} x2={W - pad.right} y2={yScale(db)} stroke={db % 20 === 0 ? "#ddd" : "#f0f0f0"} strokeWidth={0.5} /><text x={pad.left - 4} y={yScale(db) + 2} textAnchor="end" fontSize={7} fill="#888">{db}</text></g>
          ))}
          {freqs.map((f) => {
            const x = xScale(f);
            return <g key={f}><line x1={x} y1={pad.top} x2={x} y2={H - pad.bottom} stroke="#f0f0f0" strokeWidth={0.5} /><text x={x} y={H - 6} textAnchor="middle" fontSize={6} fill="#888">{f}</text></g>;
          })}
          <polyline points={leftPts} fill="none" stroke="#2d6a9f" strokeWidth={2} strokeLinejoin="round" />
          {a.readings.map((r, i) => <circle key={i} cx={xScale(r.freq)} cy={yScale(r.dbLeft)} r={4} fill="white" stroke="#2d6a9f" strokeWidth={2} />)}
          <polyline points={rightPts} fill="none" stroke="#e74c3c" strokeWidth={2} strokeLinejoin="round" strokeDasharray="4 2" />
          {a.readings.map((r, i) => <circle key={i} cx={xScale(r.freq)} cy={yScale(r.dbRight)} r={4} fill="white" stroke="#e74c3c" strokeWidth={2} opacity={0.7} />)}
          <text x={pad.left + 10} y={pad.top + 10} fontSize={7} fill="#2d6a9f">● Left</text>
          <text x={pad.left + 60} y={pad.top + 10} fontSize={7} fill="#e74c3c">○ Right</text>
          <text x={pad.left + plotW / 2} y={H - 2} textAnchor="middle" fontSize={7} fill="#888">Frequency (Hz)</text>
          <text x={6} y={pad.top + plotH / 2} fontSize={7} fill="#888" transform={`rotate(-90, 6, ${pad.top + plotH / 2})`}>Hearing Level (dB HL)</text>
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "PTA (Left)", value: `${avgLeft} dB`, cls: classify(avgLeft) },
          { label: "PTA (Right)", value: `${avgRight} dB`, cls: classify(avgRight) },
          { label: "Left Grade", value: classify(avgLeft) },
          { label: "Right Grade", value: classify(avgRight) },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">{m.label}</p>
            <p className="mt-1 text-lg font-bold text-[var(--text-primary)]">{m.value}</p>
            {m.cls && <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${m.cls === "Normal" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : m.cls === "Mild" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : m.cls === "Moderate" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{m.cls}</span>}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <p className="text-xs font-semibold text-[var(--action-primary)]">Interpretation</p>
        <p className="text-sm text-[var(--text-primary)] mt-1">{a.interpretation}</p>
      </div>
    </div>
  );
}
