"use client";

import { useMemo } from "react";
import type { LeadName, ECGRecord } from "@/store/useECGStore";

const ALL_LEADS: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

const LAYOUT_3x4: [LeadName, LeadName, LeadName, LeadName][] = [
  ["I", "aVR", "V1", "V4"],
  ["II", "aVL", "V2", "V5"],
  ["III", "aVF", "V3", "V6"],
];

const W = 280;
const H = 100;
const GRID_SMALL = 5;
const GRID_LARGE = 25;

function LeadTrace({ waveform, speed, gain }: { waveform: number[]; speed: number; gain: number }) {
  const pts = useMemo(() => {
    const sampleEvery = Math.max(1, Math.floor(waveform.length / (W * 2)));
    const points: string[] = [];
    for (let i = 0; i < waveform.length; i += sampleEvery) {
      const x = (i / waveform.length) * (W - 20) + 10;
      const y = H / 2 - waveform[i] * (gain * 2);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }, [waveform, gain]);

  const gridLines = useMemo(() => {
    const lines: React.ReactNode[] = [];
    for (let x = 0; x <= W; x += GRID_SMALL) {
      const isBold = x % GRID_LARGE === 0;
      lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} stroke={isBold ? "#ddd" : "#f0f0f0"} strokeWidth={isBold ? 0.5 : 0.3} />);
    }
    for (let y = 0; y <= H; y += GRID_SMALL) {
      const isBold = y % GRID_LARGE === 0;
      lines.push(<line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} stroke={isBold ? "#ddd" : "#f0f0f0"} strokeWidth={isBold ? 0.5 : 0.3} />);
    }
    return lines;
  }, []);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        {gridLines}
        <polyline points={pts} fill="none" stroke="#1a1a2e" strokeWidth={0.6} />
      </svg>
    </div>
  );
}

function LeadCell({ lead, ecg }: { lead: LeadName; ecg: ECGRecord }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] font-bold text-[var(--action-primary)] pl-1">{lead}</p>
      <LeadTrace waveform={ecg.leads[lead]} speed={ecg.speed} gain={ecg.gain} />
    </div>
  );
}

export default function ECGViewer({ ecg }: { ecg: ECGRecord }) {
  const I = ecg.interpretation;

  const metric = (label: string, value: string) => (
    <div className="flex items-baseline justify-between border-b border-[var(--border-subtle)] py-1">
      <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      <span className="text-xs font-semibold text-[var(--text-primary)]">{value}</span>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{ecg.patientName}</p>
            <p className="text-xs text-[var(--text-secondary)]">{ecg.patientId} · {new Date(ecg.recordedAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-2 text-[10px]">
            <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 font-medium text-[var(--text-secondary)]">{ecg.speed} mm/s</span>
            <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 font-medium text-[var(--text-secondary)]">{ecg.gain} mm/mV</span>
            <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 font-medium text-[var(--text-secondary)]">{ecg.recordedBy}</span>
          </div>
        </div>
      </div>

      {/* Waveform grid */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
          {LAYOUT_3x4.flatMap((row) => row.map((lead) => (
            <div key={lead}>
              <LeadCell lead={lead} ecg={ecg} />
            </div>
          )))}
        </div>
        {/* Lead II rhythm strip */}
        <div className="mt-4 border-t border-[var(--border-subtle)] pt-3">
          <p className="text-[10px] font-bold text-[var(--action-primary)] pl-1 mb-1">II (Rhythm Strip)</p>
          <LeadTrace waveform={ecg.leads["II"]} speed={ecg.speed} gain={ecg.gain} />
        </div>
      </div>

      {/* Measurements */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">{metric("Rate", `${I.rate} bpm`)}</div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">{metric("PR Interval", `${I.prInterval} ms`)}</div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">{metric("QRS Duration", `${I.qrsDuration} ms`)}</div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">{metric("QTc", `${I.qtc} ms`)}</div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">{metric("Axis", `${I.axis}° (${I.axisClassification})`)}</div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 col-span-1 sm:col-span-2">{metric("Rhythm", I.rhythm)}</div>
      </div>

      {/* Summary & findings */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Interpretation</p>
        <p className="text-sm text-[var(--text-primary)] mb-3">{I.summary}</p>
        <ul className="space-y-0.5">
          {I.findings.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
              <span className="mt-0.5 block h-1.5 w-1.5 rounded-full bg-[var(--action-primary)] shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
