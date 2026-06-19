"use client";

import { useMemo } from "react";
import type { GrowthMetric, GrowthRecord } from "@/store/usePediatricsStore";

interface GrowthChartProps {
  records: GrowthRecord[];
  metric: GrowthMetric;
  sex: "M" | "F";
  maxAge: number;
}

interface CentileCurve {
  label: string;
  p: number; // centile
  points: { x: number; y: number }[];
}

function generateCentile(label: string, p: number, baseFn: (age: number) => number, spread: (age: number) => number): CentileCurve {
  const points: { x: number; y: number }[] = [];
  for (let a = 0; a <= 60; a += 0.5) {
    const z = (() => { switch (label) { case "97th": return 1.88; case "85th": return 1.04; case "50th": return 0; case "15th": return -1.04; case "3rd": return -1.88; default: return 0; } })();
    points.push({ x: a, y: baseFn(a) + z * spread(a) });
  }
  return { label, p, points };
}

function weightFn(_sex: "M" | "F"): (age: number) => number {
  return (age) => {
    if (age <= 12) return 3.3 + age * 0.65;
    if (age <= 24) return 7.8 + (age - 12) * 0.25;
    if (age <= 60) return 10.2 + (age - 24) * 0.2;
    return 10.2 + 36 * 0.2;
  };
}

function heightFn(_sex: "M" | "F"): (age: number) => number {
  return (age) => {
    if (age <= 12) return 50 + age * 2.5;
    if (age <= 24) return 75 + (age - 12) * 1.2;
    if (age <= 60) return 85 + (age - 24) * 0.7;
    return 85 + 36 * 0.7;
  };
}

function hcFn(_sex: "M" | "F"): (age: number) => number {
  return (age) => {
    if (age <= 12) return 34 + age * 0.8;
    if (age <= 24) return 44 + (age - 12) * 0.2;
    return 46;
  };
}

function bmiFn(sex: "M" | "F"): (age: number) => number {
  return (age) => {
    const h = heightFn(sex)(age) / 100;
    const w = weightFn(sex)(age);
    return w / (h * h);
  };
}

function weightSpread(_sex: "M" | "F"): (age: number) => number {
  return (age) => 0.3 + age * 0.04;
}

function heightSpread(_sex: "M" | "F"): (age: number) => number {
  return (age) => 1.2 + age * 0.08;
}

function hcSpread(_sex: "M" | "F"): (age: number) => number {
  return (age) => 0.5 + age * 0.04;
}

function bmiSpread(sex: "M" | "F"): (age: number) => number {
  return (age) => 0.4 + age * 0.02;
}

const CENTILE_LABELS = [{ label: "97th", p: 97 }, { label: "85th", p: 85 }, { label: "50th", p: 50 }, { label: "15th", p: 15 }, { label: "3rd", p: 3 }];

const METRIC_CONFIG: Record<GrowthMetric, { label: string; unit: string; yMin: number; yMax: number; fn: (s: "M" | "F") => (a: number) => number; spread: (s: "M" | "F") => (a: number) => number }> = {
  weight: { label: "Weight", unit: "kg", yMin: 2, yMax: 20, fn: weightFn, spread: weightSpread },
  height: { label: "Length / Height", unit: "cm", yMin: 45, yMax: 120, fn: heightFn, spread: heightSpread },
  headCircumference: { label: "Head Circumference", unit: "cm", yMin: 30, yMax: 52, fn: hcFn, spread: hcSpread },
  bmi: { label: "BMI", unit: "kg/m²", yMin: 10, yMax: 22, fn: bmiFn, spread: bmiSpread },
};

export default function GrowthChart({ records, metric, sex, maxAge }: GrowthChartProps) {
  const cfg = METRIC_CONFIG[metric];

  const chartWidth = 600;
  const chartHeight = 320;
  const pad = { left: 45, right: 20, top: 20, bottom: 35 };
  const plotW = chartWidth - pad.left - pad.right;
  const plotH = chartHeight - pad.top - pad.bottom;

  const xScale = (age: number) => pad.left + (age / maxAge) * plotW;
  const yScale = (val: number) => pad.top + plotH - ((val - cfg.yMin) / (cfg.yMax - cfg.yMin)) * plotH;

  const centileCurves = useMemo(() => {
    const fn = cfg.fn(sex);
    const sp = cfg.spread(sex);
    return CENTILE_LABELS.map((cl) => generateCentile(cl.label, cl.p, fn, sp));
  }, [sex, cfg]);

  const xTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let a = 0; a <= maxAge; a += 6) ticks.push(a);
    return ticks;
  }, [maxAge]);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    const step = metric === "bmi" ? 2 : metric === "headCircumference" ? 2 : 5;
    for (let v = cfg.yMin; v <= cfg.yMax; v += step) ticks.push(v);
    return ticks;
  }, [cfg.yMin, cfg.yMax, metric]);

  const patientPoints = useMemo(() => {
    return records.map((r) => ({
      x: xScale(Math.min(r.ageMonths, maxAge)),
      y: yScale((() => { switch (metric) { case "weight": return r.weightKg; case "height": return r.heightCm; case "headCircumference": return r.headCircumferenceCm ?? 0; case "bmi": return r.bmi; } })()),
      age: r.ageMonths,
      val: (() => { switch (metric) { case "weight": return r.weightKg; case "height": return r.heightCm; case "headCircumference": return r.headCircumferenceCm ?? 0; case "bmi": return r.bmi; } })(),
    }));
  }, [records, metric]);

  if (records.length === 0) return <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border-default)] p-8 text-sm text-[var(--text-secondary)]">No growth records for this child.</div>;

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">{cfg.label} (WHO {sex})</p>
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {/* Y grid */}
        {yTicks.map((v) => (
          <g key={`y${v}`}>
            <line x1={pad.left} y1={yScale(v)} x2={chartWidth - pad.right} y2={yScale(v)} stroke="#eee" strokeWidth={0.5} />
            <text x={pad.left - 4} y={yScale(v) + 3} textAnchor="end" fontSize={8} fill="#888">{v}</text>
          </g>
        ))}
        {/* X grid */}
        {xTicks.map((a) => (
          <g key={`x${a}`}>
            <line x1={xScale(a)} y1={pad.top} x2={xScale(a)} y2={chartHeight - pad.bottom} stroke="#eee" strokeWidth={0.5} />
            <text x={xScale(a)} y={chartHeight - 8} textAnchor="middle" fontSize={8} fill="#888">{a}{a === maxAge ? "m" : ""}</text>
          </g>
        ))}

        {/* Centile curves */}
        {centileCurves.map((cc) => {
          const d = cc.points
            .filter((p) => p.x >= 0 && p.x <= maxAge)
            .map((p) => {
              const cx = xScale(p.x);
              const cy = yScale(p.y);
              return `${cx},${cy}`;
            })
            .join(" L ");
          const is50th = cc.label === "50th";
          const strokeColor = is50th ? "#e74c3c" : "#b2bec3";
          return <polyline key={cc.label} points={d} fill="none" stroke={strokeColor} strokeWidth={is50th ? 1.2 : 0.6} strokeDasharray={is50th ? "none" : "4 3"} />;
        })}

        {/* Centile labels */}
        {centileCurves.map((cc) => {
          const last = cc.points[cc.points.length - 1];
          return <text key={`l${cc.label}`} x={xScale(last.x) + 3} y={yScale(last.y) + 2} fontSize={7} fill="#888">{cc.label}</text>;
        })}

        {/* Patient data line */}
        {patientPoints.length > 1 && (
          <polyline
            points={patientPoints.map((p) => `${p.x},${p.y}`).join(" L ")}
            fill="none"
            stroke={"var(--action-primary)"}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Patient data dots */}
        {patientPoints.filter((p) => p.val > 0).map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill="white" stroke={"var(--action-primary)"} strokeWidth={2} />
            {/* Tooltip label on hover */}
            <title>{`Age: ${p.age}m · ${p.val} ${cfg.unit}`}</title>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[var(--text-secondary)]">
        <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-sm bg-[#e74c3c]" /> 50th</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-sm border border-dashed border-[#b2bec3]" /> 3rd/15th/85th/97th</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2 w-4 rounded-sm" style={{ backgroundColor: "var(--action-primary)" }} /> Patient</span>
      </div>
    </div>
  );
}
