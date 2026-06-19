"use client";

import { useMemo } from "react";
import type { CTGTrace } from "@/store/useOBGYNStore";

const W = 800;
const H_FHR = 120;
const H_TOC = 60;
const PAD = 40;
const GAP = 10;

export default function CTGViewer({ ctg }: { ctg: CTGTrace }) {
  const maxTime = ctg.durationMinutes * 60;

  const xScale = (t: number) => PAD + (t / maxTime) * (W - PAD * 2);
  const yScaleFHR = (fhr: number) => 10 + H_FHR - ((fhr - 50) / 150) * H_FHR;
  const yScaleTOC = (toc: number) => H_FHR + GAP + 10 + H_TOC - (toc / 100) * (H_TOC - 20);

  const fhrPoints = useMemo(() => {
    return ctg.readings.filter((_, i) => i % 3 === 0).map((r) => ({
      x: xScale(r.time),
      y: yScaleFHR(r.fhr),
      val: r.fhr,
      time: r.time,
    }));
  }, [ctg]);

  const tocPoints = useMemo(() => {
    return ctg.readings.filter((_, i) => i % 3 === 0).map((r) => ({
      x: xScale(r.time),
      y: yScaleTOC(r.toc),
      val: r.toc,
    }));
  }, [ctg]);

  const intpColors: Record<string, string> = { Normal: "var(--normal-fg)", Suspicious: "#e67e22", Pathological: "var(--critical-fg)" };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-[var(--text-primary)]">Cardiotocography (CTG) — {ctg.patientName}</p>
        <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{ color: intpColors[ctg.interpretation], backgroundColor: `${intpColors[ctg.interpretation]}18` }}>
          {ctg.interpretation}
        </span>
      </div>

      {/* Waveform */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white p-2">
        <svg viewBox={`0 0 ${W} ${H_FHR + H_TOC + GAP + 30}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* FHR Section */}
          <rect x={PAD} y={0} width={W - PAD * 2} height={H_FHR} fill="none" stroke="#ccc" strokeWidth={0.5} />
          <text x={4} y={H_FHR / 2} fontSize={7} fill="#888" transform={`rotate(-90, 4, ${H_FHR / 2})`}>FHR (bpm)</text>
          {[60, 90, 120, 140, 160, 180, 210].map((f) => {
            const y = yScaleFHR(f);
            const isBaseline = f === 140;
            return (
              <g key={f}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke={isBaseline ? "#e67e22" : "#f0f0f0"} strokeWidth={isBaseline ? 1 : 0.3} />
                <text x={PAD - 3} y={y + 2} textAnchor="end" fontSize={6} fill={isBaseline ? "#e67e22" : "#aaa"}>{f}</text>
              </g>
            );
          })}
          <polyline points={fhrPoints.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#1a1a2e" strokeWidth={1} />
          {/* FHR baseline band */}
          <rect x={PAD} y={yScaleFHR(ctg.baseline + 10)} width={W - PAD * 2} height={yScaleFHR(ctg.baseline - 10) - yScaleFHR(ctg.baseline + 10)} fill="#e67e22" opacity={0.08} />

          {/* TOC Section */}
          <rect x={PAD} y={H_FHR + GAP} width={W - PAD * 2} height={H_TOC} fill="none" stroke="#ccc" strokeWidth={0.5} />
          <text x={4} y={H_FHR + GAP + H_TOC / 2} fontSize={7} fill="#888" transform={`rotate(-90, 4, ${H_FHR + GAP + H_TOC / 2})`}>UC</text>
          {[0, 50, 100].map((t) => {
            const y = yScaleTOC(t);
            return <text key={t} x={PAD - 3} y={y + 2} textAnchor="end" fontSize={6} fill="#aaa">{t}</text>;
          })}
          <polyline points={tocPoints.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#2d6a9f" strokeWidth={1.5} />
          {/* Contraction shading */}
          {ctg.readings.filter((_, i) => i % 6 === 0).filter((r) => r.toc > 50).map((r, i) => (
            <rect key={i} x={xScale(r.time) - 4} y={H_FHR + GAP + 5} width={8} height={H_TOC - 10} fill="#2d6a9f" opacity={0.1} rx={2} />
          ))}

          {/* Time axis */}
          <line x1={PAD} y1={H_FHR + GAP + H_TOC + 5} x2={W - PAD} y2={H_FHR + GAP + H_TOC + 5} stroke="#ccc" strokeWidth={0.5} />
          {Array.from({ length: Math.ceil(ctg.durationMinutes / 2) + 1 }, (_, i) => {
            const t = i * 120;
            return <text key={i} x={xScale(t)} y={H_FHR + GAP + H_TOC + 16} textAnchor="middle" fontSize={6} fill="#aaa">{i * 2}m</text>;
          })}
        </svg>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Baseline", value: `${ctg.baseline} bpm` },
          { label: "Variability", value: ctg.variability },
          { label: "Accelerations", value: `${ctg.accelerations} in ${ctg.durationMinutes}m` },
          { label: "Decelerations", value: ctg.decelerations },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2">
            <p className="text-[9px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">{m.label}</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{m.value}</p>
          </div>
        ))}
      </div>

      {ctg.notes && (
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-0.5">Interpretation</p>
          <p className="text-xs text-[var(--text-primary)]">{ctg.notes}</p>
        </div>
      )}
    </div>
  );
}
