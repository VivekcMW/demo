"use client";

import { useMemo, useState } from "react";
import type { FetalMeasurement, FetalGrowthRecord } from "@/store/useOBGYNStore";

interface FetalGrowthChartProps {
  records: FetalGrowthRecord[];
  metric: FetalMeasurement;
}

interface CentileData {
  weeks: number;
  p5: number;
  p50: number;
  p95: number;
}

const BPD_CENTILES: CentileData[] = [
  { weeks: 14, p5: 24, p50: 28, p95: 32 }, { weeks: 16, p5: 30, p50: 34, p95: 38 },
  { weeks: 18, p5: 36, p50: 41, p95: 45 }, { weeks: 20, p5: 43, p50: 48, p95: 52 },
  { weeks: 22, p5: 49, p50: 54, p95: 59 }, { weeks: 24, p5: 54, p50: 60, p95: 65 },
  { weeks: 26, p5: 59, p50: 65, p95: 71 }, { weeks: 28, p5: 64, p50: 71, p95: 76 },
  { weeks: 30, p5: 69, p50: 76, p95: 81 }, { weeks: 32, p5: 74, p50: 80, p95: 85 },
  { weeks: 34, p5: 78, p50: 84, p95: 90 }, { weeks: 36, p5: 81, p50: 88, p95: 93 },
  { weeks: 38, p5: 84, p50: 91, p95: 97 }, { weeks: 40, p5: 86, p50: 93, p95: 99 },
];

const HC_CENTILES: CentileData[] = [
  { weeks: 14, p5: 99, p50: 106, p95: 113 }, { weeks: 16, p5: 120, p50: 128, p95: 136 },
  { weeks: 18, p5: 140, p50: 148, p95: 156 }, { weeks: 20, p5: 160, p50: 168, p95: 176 },
  { weeks: 22, p5: 178, p50: 186, p95: 195 }, { weeks: 24, p5: 194, p50: 204, p95: 213 },
  { weeks: 26, p5: 210, p50: 220, p95: 230 }, { weeks: 28, p5: 225, p50: 235, p95: 245 },
  { weeks: 30, p5: 238, p50: 250, p95: 260 }, { weeks: 32, p5: 251, p50: 265, p95: 275 },
  { weeks: 34, p5: 262, p50: 278, p95: 288 }, { weeks: 36, p5: 272, p50: 290, p95: 300 },
  { weeks: 38, p5: 282, p50: 300, p95: 310 }, { weeks: 40, p5: 290, p50: 308, p95: 318 },
];

const AC_CENTILES: CentileData[] = [
  { weeks: 14, p5: 92, p50: 100, p95: 108 }, { weeks: 16, p5: 112, p50: 120, p95: 129 },
  { weeks: 18, p5: 130, p50: 140, p95: 150 }, { weeks: 20, p5: 148, p50: 158, p95: 168 },
  { weeks: 22, p5: 166, p50: 178, p95: 188 }, { weeks: 24, p5: 184, p50: 196, p95: 208 },
  { weeks: 26, p5: 202, p50: 215, p95: 227 }, { weeks: 28, p5: 220, p50: 234, p95: 247 },
  { weeks: 30, p5: 238, p50: 254, p95: 267 }, { weeks: 32, p5: 256, p50: 273, p95: 287 },
  { weeks: 34, p5: 274, p50: 292, p95: 307 }, { weeks: 36, p5: 292, p50: 311, p95: 326 },
  { weeks: 38, p5: 310, p50: 330, p95: 345 }, { weeks: 40, p5: 328, p50: 348, p95: 364 },
];

const FL_CENTILES: CentileData[] = [
  { weeks: 14, p5: 13, p50: 16, p95: 19 }, { weeks: 16, p5: 19, p50: 22, p95: 25 },
  { weeks: 18, p5: 24, p50: 27, p95: 30 }, { weeks: 20, p5: 29, p50: 33, p95: 37 },
  { weeks: 22, p5: 34, p50: 38, p95: 42 }, { weeks: 24, p5: 39, p50: 43, p95: 47 },
  { weeks: 26, p5: 44, p50: 48, p95: 52 }, { weeks: 28, p5: 49, p50: 53, p95: 58 },
  { weeks: 30, p5: 53, p50: 58, p95: 63 }, { weeks: 32, p5: 57, p50: 62, p95: 67 },
  { weeks: 34, p5: 61, p50: 67, p95: 72 }, { weeks: 36, p5: 65, p50: 71, p95: 76 },
  { weeks: 38, p5: 68, p50: 74, p95: 80 }, { weeks: 40, p5: 71, p50: 77, p95: 83 },
];

const EFW_CENTILES: CentileData[] = [
  { weeks: 14, p5: 80, p50: 110, p95: 150 }, { weeks: 16, p5: 160, p50: 210, p95: 270 },
  { weeks: 18, p5: 280, p50: 350, p95: 430 }, { weeks: 20, p5: 430, p50: 520, p95: 630 },
  { weeks: 22, p5: 620, p50: 740, p95: 870 }, { weeks: 24, p5: 850, p50: 1000, p95: 1170 },
  { weeks: 26, p5: 1140, p50: 1330, p95: 1530 }, { weeks: 28, p5: 1470, p50: 1700, p95: 1940 },
  { weeks: 30, p5: 1840, p50: 2110, p95: 2400 }, { weeks: 32, p5: 2250, p50: 2550, p95: 2880 },
  { weeks: 34, p5: 2680, p50: 3010, p95: 3390 }, { weeks: 36, p5: 3110, p50: 3480, p95: 3900 },
  { weeks: 38, p5: 3500, p50: 3950, p95: 4420 }, { weeks: 40, p5: 3800, p50: 4300, p95: 4820 },
];

const METRICS: Record<FetalMeasurement, { label: string; unit: string; color: string; centiles: CentileData[]; extract: (r: FetalGrowthRecord) => number | undefined }> = {
  BPD: { label: "Biparietal Diameter", unit: "mm", color: "#2d6a9f", centiles: BPD_CENTILES, extract: (r) => r.bpd },
  HC: { label: "Head Circumference", unit: "mm", color: "#8e44ad", centiles: HC_CENTILES, extract: (r) => r.hc },
  AC: { label: "Abdominal Circumference", unit: "mm", color: "#e67e22", centiles: AC_CENTILES, extract: (r) => r.ac },
  FL: { label: "Femur Length", unit: "mm", color: "#27ae60", centiles: FL_CENTILES, extract: (r) => r.fl },
  EFW: { label: "Estimated Fetal Weight", unit: "g", color: "#e74c3c", centiles: EFW_CENTILES, extract: (r) => r.efw },
};

export default function FetalGrowthChart({ records, metric }: FetalGrowthChartProps) {
  const cfg = METRICS[metric];
  const W = 600;
  const H = 320;
  const PAD = { left: 50, right: 20, top: 20, bottom: 35 };

  const minWeeks = 14;
  const maxWeeks = 42;
  const xScale = (w: number) => PAD.left + ((w - minWeeks) / (maxWeeks - minWeeks)) * (W - PAD.left - PAD.right);
  const dataMin = Math.min(...cfg.centiles.map((c) => c.p5));
  const dataMax = Math.max(...cfg.centiles.map((c) => c.p95));
  const yScale = (v: number) => PAD.top + H - PAD.bottom - ((v - dataMin) / (dataMax - dataMin)) * (H - PAD.top - PAD.bottom);

  const sortedCentiles = cfg.centiles;
  const p5d = sortedCentiles.map((c) => `${xScale(c.weeks)},${yScale(c.p5)}`);
  const p50d = sortedCentiles.map((c) => `${xScale(c.weeks)},${yScale(c.p50)}`);
  const p95d = sortedCentiles.map((c) => `${xScale(c.weeks)},${yScale(c.p95)}`);

  const patientPoints = useMemo(() => {
    return records.filter((r) => cfg.extract(r) !== undefined).map((r) => ({
      x: xScale(r.gestationWeeks),
      y: yScale(cfg.extract(r)!),
      w: r.gestationWeeks,
      v: cfg.extract(r)!,
      p: r.percentiles[metric] ?? 50,
    }));
  }, [records, metric, cfg]);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Y grid */}
        {Array.from({ length: 6 }, (_, i) => {
          const v = dataMin + (i / 5) * (dataMax - dataMin);
          const y = yScale(v);
          return (
            <g key={i}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="#f0f0f0" strokeWidth={0.5} />
              <text x={PAD.left - 4} y={y + 2} textAnchor="end" fontSize={7} fill="#888">{Math.round(v)}</text>
            </g>
          );
        })}

        {/* X grid */}
        {Array.from({ length: Math.floor((maxWeeks - minWeeks) / 2) + 1 }, (_, i) => {
          const w = minWeeks + i * 4;
          const x = xScale(w);
          return (
            <g key={i}>
              <line x1={x} y1={PAD.top} x2={x} y2={H - PAD.bottom} stroke="#f0f0f0" strokeWidth={0.5} />
              <text x={x} y={H - 8} textAnchor="middle" fontSize={7} fill="#888">{w}</text>
            </g>
          );
        })}

        {/* Centile curves */}
        <polyline points={p5d.join(" ")} fill="none" stroke="#b2bec3" strokeWidth={0.6} strokeDasharray="4 3" />
        <polyline points={p95d.join(" ")} fill="none" stroke="#b2bec3" strokeWidth={0.6} strokeDasharray="4 3" />
        <polyline points={p50d.join(" ")} fill="none" stroke={cfg.color} strokeWidth={1.2} />

        {/* Centile fill (5th - 95th) */}
        <polygon
          points={[...p5d, ...p95d.reverse()].join(" ")}
          fill={cfg.color}
          opacity={0.06}
        />

        {/* Labels */}
        <text x={xScale(40)} y={yScale(sortedCentiles.find((c) => c.weeks === 38)!.p5) + 2} fontSize={6} fill="#b2bec3">5th</text>
        <text x={xScale(40)} y={yScale(sortedCentiles.find((c) => c.weeks === 38)!.p50) - 3} fontSize={6} fill={cfg.color}>50th</text>
        <text x={xScale(40)} y={yScale(sortedCentiles.find((c) => c.weeks === 38)!.p95) + 2} fontSize={6} fill="#b2bec3">95th</text>

        {/* Patient data */}
        {patientPoints.length > 0 && (
          <>
            <polyline points={patientPoints.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={cfg.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {patientPoints.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={cfg.color} strokeWidth={2} />
                <title>{`Wk ${p.w}: ${p.v} ${cfg.unit} (p${p.p})`}</title>
              </g>
            ))}
          </>
        )}

        {/* X-axis label */}
        <text x={PAD.left + (W - PAD.left - PAD.right) / 2} y={H - 1} textAnchor="middle" fontSize={7} fill="#888">Gestational Age (weeks)</text>
      </svg>
    </div>
  );
}
