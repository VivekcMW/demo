"use client";

import { useMemo, useState } from "react";
import { usePulmonologyStore } from "@/store/usePulmonologyStore";
import { Wind, TrendingDown, TrendingUp } from "lucide-react";

const PATTERN_COLORS: Record<string, string> = {
  Normal: "var(--normal-fg)",
  Obstructive: "#e67e22",
  Restrictive: "#2d6a9f",
  Mixed: "var(--critical-fg)",
};

function SpirometryGraph({ fvc, fev1, pef, predicted }: { fvc: number; fev1: number; pef: number; predicted: { fvc: number; fev1: number; pef: number } }) {
  const W = 500;
  const H = 200;
  const PAD = { left: 50, right: 20, top: 20, bottom: 40 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const maxX = Math.max(fvc, predicted.fvc) * 1.3;
  const maxY = Math.max(pef, predicted.pef) * 1.3;

  const xScale = (v: number) => PAD.left + (v / maxX) * plotW;
  const yScale = (v: number) => PAD.top + (1 - v / maxY) * plotH;

  // Generate synthetic flow-volume curves
  const actualCurve = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let v = 0; v <= fvc; v += fvc / 40) {
      const flow = pef * Math.exp(-((v / fvc) ** 2) * 2.5) * (1 - v / fvc * 0.3);
      pts.push({ x: v, y: flow });
    }
    return pts;
  }, [fvc, pef]);

  const predictedCurve = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const pf = predicted.fvc;
    const pp = predicted.pef;
    for (let v = 0; v <= pf; v += pf / 40) {
      const flow = pp * Math.exp(-((v / pf) ** 2) * 2.5) * (1 - v / pf * 0.3);
      pts.push({ x: v, y: flow });
    }
    return pts;
  }, [predicted]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} stroke="#ccc" strokeWidth={0.5} />
      <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="#ccc" strokeWidth={0.5} />
      {[0.25, 0.5, 0.75].map((f) => {
        const x = xScale(maxX * f);
        const y = yScale(maxY * f);
        return <g key={f}><line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#f0f0f0" strokeWidth={0.3} /><text x={PAD.left - 4} y={y + 2} textAnchor="end" fontSize={6} fill="#aaa">{Math.round(maxY * f)}</text></g>;
      })}

      {/* Actual curve */}
      <polyline points={actualCurve.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join(" ")} fill="none" stroke="#2d6a9f" strokeWidth={2} strokeLinejoin="round" />
      {/* Predicted curve */}
      <polyline points={predictedCurve.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join(" ")} fill="none" stroke="#b2bec3" strokeWidth={1.5} strokeDasharray="5 3" />

      {/* Labels */}
      <text x={PAD.left + plotW / 2} y={H - 8} textAnchor="middle" fontSize={7} fill="#888">Volume (L)</text>
      <text x={8} y={PAD.top + plotH / 2} fontSize={7} fill="#888" transform={`rotate(-90, 8, ${PAD.top + plotH / 2})`}>Flow (L/s)</text>
      <line x1={PAD.left + 10} y1={H - 22} x2={PAD.left + 30} y2={H - 22} stroke="#2d6a9f" strokeWidth={2} />
      <text x={PAD.left + 33} y={H - 18} fontSize={6} fill="#555">Actual</text>
      <line x1={PAD.left + 70} y1={H - 22} x2={PAD.left + 90} y2={H - 22} stroke="#b2bec3" strokeWidth={1.5} strokeDasharray="5 3" />
      <text x={PAD.left + 93} y={H - 18} fontSize={6} fill="#555">Predicted</text>

      {/* FEV1 annotations */}
      <line x1={xScale(fev1)} y1={PAD.top} x2={xScale(fev1)} y2={H - PAD.bottom} stroke="#e74c3c" strokeWidth={0.5} strokeDasharray="2 2" />
      <text x={xScale(fev1)} y={PAD.top - 3} textAnchor="middle" fontSize={6} fill="#e74c3c">FEV₁</text>
    </svg>
  );
}

export default function PFTViewer() {
  const pftResults = usePulmonologyStore((s) => s.pftResults);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const pft = pftResults[selectedIdx];

  if (!pft) return <div className="p-8 text-center text-[var(--text-secondary)]">No PFT results available.</div>;

  const predicted = { fvc: pft.fvcPredicted, fev1: pft.fev1Predicted, pef: pft.pefPredicted };
  const fvcPercent = Math.round((pft.fvc / pft.fvcPredicted) * 100);
  const fev1Percent = Math.round((pft.fev1 / pft.fev1Predicted) * 100);
  const pefPercent = Math.round((pft.pef / pft.pefPredicted) * 100);

  const bar = (label: string, actual: number, predicted: number, pct: number) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--text-primary)]">{label}</p>
        <p className="text-xs tabular-nums text-[var(--text-secondary)]">{actual.toFixed(1)} / {predicted.toFixed(1)} <span className={`font-semibold ${pct < 80 ? "text-[var(--critical-fg)]" : pct < 90 ? "text-[var(--warning-fg)]" : "text-[var(--normal-fg)]"}`}>({pct}%)</span></p>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--surface-sunken)] overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: pct < 80 ? "var(--critical-fg)" : pct < 90 ? "var(--warning-fg)" : "var(--normal-fg)" }} />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* PFT selector */}
      <div className="flex gap-2">
        {pftResults.map((p, i) => (
          <button key={p.id} onClick={() => setSelectedIdx(i)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${selectedIdx === i ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)]"}`}>{p.patientName} <span className="text-[9px] opacity-70">({p.date})</span></button>
        ))}
      </div>

      {/* Main card */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] p-4">
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{pft.patientName}</p>
            <p className="text-xs text-[var(--text-secondary)]">{pft.patientId} · {pft.date}</p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ color: PATTERN_COLORS[pft.pattern], backgroundColor: `${PATTERN_COLORS[pft.pattern]}18` }}>{pft.pattern}</span>
            <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ color: PATTERN_COLORS[pft.severity === "Normal" ? "Normal" : "Obstructive"], backgroundColor: `${PATTERN_COLORS[pft.severity === "Normal" ? "Normal" : "Obstructive"]}18` }}>{pft.severity}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Flow-volume loop */}
          <div className="rounded-lg border border-[var(--border-subtle)] bg-white p-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">Flow-Volume Loop</p>
            <SpirometryGraph fvc={pft.fvc} fev1={pft.fev1} pef={pft.pef} predicted={predicted} />
          </div>

          {/* Bar chart values */}
          <div className="space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Spirometry Values</p>
            {bar("FVC (L)", pft.fvc, pft.fvcPredicted, fvcPercent)}
            {bar("FEV₁ (L)", pft.fev1, pft.fev1Predicted, fev1Percent)}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1">
              <p className="text-xs font-medium text-[var(--text-primary)]">FEV₁ / FVC</p>
              <p className={`text-xs font-semibold ${pft.fev1FvcRatio < 70 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>{pft.fev1FvcRatio}% {pft.fev1FvcRatio < 70 ? "(Obstructive)" : "(Normal)"}</p>
            </div>
            {bar("PEF (L/min)", pft.pef, pft.pefPredicted, pefPercent)}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1">
              <p className="text-xs font-medium text-[var(--text-primary)]">FEF₂₅₋₇₅</p>
              <p className="text-xs text-[var(--text-secondary)]">{pft.fef2575} / {pft.fef2575Predicted} L/s <span className={pft.fef2575 / pft.fef2575Predicted < 0.65 ? "text-[var(--critical-fg)]" : ""}>({Math.round(pft.fef2575 / pft.fef2575Predicted * 100)}%)</span></p>
            </div>
            {pft.tlc && pft.tlcPredicted && (
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1">
                <p className="text-xs font-medium text-[var(--text-primary)]">TLC (L)</p>
                <p className="text-xs text-[var(--text-secondary)]">{pft.tlc} / {pft.tlcPredicted} ({Math.round(pft.tlc / pft.tlcPredicted * 100)}%)</p>
              </div>
            )}
            {pft.dlco && pft.dlcoPredicted && (
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-1">
                <p className="text-xs font-medium text-[var(--text-primary)]">DLCO</p>
                <p className="text-xs text-[var(--text-secondary)]">{pft.dlco} / {pft.dlcoPredicted} ({Math.round(pft.dlco / pft.dlcoPredicted * 100)}%)</p>
              </div>
            )}
          </div>
        </div>

        {/* Interpretation */}
        <div className="border-t border-[var(--border-subtle)] p-4">
          <p className="text-xs font-semibold text-[var(--action-primary)] mb-1">Interpretation</p>
          <p className="text-sm text-[var(--text-primary)]">{pft.interpretation}</p>
        </div>
      </div>
    </div>
  );
}
