"use client";

import { useMemo } from "react";
import type { Partograph } from "@/store/useOBGYNStore";

const CHART_W = 800;
const CHART_H = 500;
const PAD = { top: 40, right: 50, bottom: 80, left: 60 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

// ── Auxiliary Views ───────────────────────────────────────────────────────────

function FetalHeartRateSection({ ptg }: { ptg: Partograph }) {
  const h = 60;
  const maxHour = 12;
  const xScale = (hr: number) => PAD.left + (hr / maxHour) * PLOT_W;
  const yScale = (fhr: number) => PAD.top - h + h - ((fhr - 100) / 80) * h;

  const baseline = ptg.entries.map((e) => ({
    x: xScale((new Date(e.time).getTime() - new Date(ptg.admissionDate).getTime()) / 3600000),
    y: yScale(e.fhrBaseline),
  }));

  return (
    <g>
      <text x={4} y={PAD.top - h + 10} fontSize={7} fill="#888" transform={`rotate(-90, 4, ${PAD.top - h + 10})`}>FHR</text>
      <text x={4} y={PAD.top - 8} fontSize={6} fill="#888" transform={`rotate(-90, 4, ${PAD.top - 8})`}>(bpm)</text>
      <line x1={PAD.left} y1={PAD.top - h} x2={CHART_W - PAD.right} y2={PAD.top - h} stroke="#ccc" strokeWidth={0.5} />
      <line x1={PAD.left} y1={PAD.top} x2={CHART_W - PAD.right} y2={PAD.top} stroke="#ccc" strokeWidth={0.5} />
      {[120, 140, 160].map((f) => (
        <g key={f}>
          <line x1={PAD.left} y1={yScale(f)} x2={CHART_W - PAD.right} y2={yScale(f)} stroke="#f0f0f0" strokeWidth={0.3} />
          <text x={PAD.left - 3} y={yScale(f) + 2} textAnchor="end" fontSize={6} fill="#aaa">{f}</text>
        </g>
      ))}
      {baseline.length > 1 && <polyline points={baseline.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#e74c3c" strokeWidth={1.5} />}
      {baseline.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#e74c3c" />)}
    </g>
  );
}

function ContractionsSection({ ptg }: { ptg: Partograph }) {
  const h = 60;
  const maxHour = 12;
  const xScale = (hr: number) => PAD.left + (hr / maxHour) * PLOT_W;
  const yScale = (c: number) => PAD.top + h - (c / 10) * h;

  const pts = ptg.entries.map((e) => ({
    x: xScale((new Date(e.time).getTime() - new Date(ptg.admissionDate).getTime()) / 3600000),
    y: yScale(e.contractionsPer10min),
  }));

  return (
    <g>
      <text x={4} y={PAD.top + h - 25} fontSize={7} fill="#888" transform={`rotate(-90, 4, ${PAD.top + h - 25})`}>Contractions</text>
      <text x={4} y={PAD.top + h - 8} fontSize={6} fill="#888" transform={`rotate(-90, 4, ${PAD.top + h - 8})`}>(per 10m)</text>
      <line x1={PAD.left} y1={PAD.top} x2={CHART_W - PAD.right} y2={PAD.top} stroke="#ccc" strokeWidth={0.5} />
      <line x1={PAD.left} y1={PAD.top + h} x2={CHART_W - PAD.right} y2={PAD.top + h} stroke="#ccc" strokeWidth={0.5} />
      {[2, 4, 6, 8, 10].map((c) => (
        <g key={c}>
          <line x1={PAD.left} y1={yScale(c)} x2={CHART_W - PAD.right} y2={yScale(c)} stroke="#f0f0f0" strokeWidth={0.3} />
          <text x={PAD.left - 3} y={yScale(c) + 2} textAnchor="end" fontSize={6} fill="#aaa">{c}</text>
        </g>
      ))}
      {pts.length > 1 && (
        <>
          <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#2d6a9f" strokeWidth={1.5} strokeLinejoin="round" />
          {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={2.5} fill="#2d6a9f" />)}
        </>
      )}
    </g>
  );
}

// ── Main Partograph ───────────────────────────────────────────────────────────

export default function PartographChart({ ptg }: { ptg: Partograph }) {
  const maxHour = 12;
  const xScale = (hr: number) => PAD.left + (hr / maxHour) * PLOT_W;
  const yScaleDilation = (cm: number) => PAD.top + 120 + PLOT_H - ((cm - 0) / 10) * (PLOT_H / 2);
  const yScaleStation = (st: number) => PAD.top + 120 + PLOT_H - ((st + 3) / 6) * (PLOT_H / 2);

  const hours = useMemo(() => {
    return ptg.entries.map((e) => (new Date(e.time).getTime() - new Date(ptg.admissionDate).getTime()) / 3600000);
  }, [ptg]);

  const dilationPoints = useMemo(() => {
    return ptg.entries.map((e, i) => {
      const h = hours[i];
      return { x: xScale(h), y: yScaleDilation(e.cervicalDilationCm), val: e.cervicalDilationCm };
    });
  }, [ptg, hours]);

  const stationPoints = useMemo(() => {
    return ptg.entries.map((e, i) => {
      const h = hours[i];
      return { x: xScale(h), y: yScaleStation(e.station), val: e.station };
    });
  }, [ptg, hours]);

  // Alert line: from 4cm at admission to 10cm at 10cm/hour rate
  // Starting at the first recorded dilation >= 4cm
  const firstEntry = ptg.entries.findIndex((e) => e.cervicalDilationCm >= 4);
  const alertStartH = firstEntry >= 0 ? hours[firstEntry] : 0;
  const alertStartDilation = firstEntry >= 0 ? ptg.entries[firstEntry].cervicalDilationCm : 4;
  const alertSlope = 1; // 1 cm/hour
  const alertEndH = alertStartH + (10 - alertStartDilation) / alertSlope;

  const xGrid = (h: number) => xScale(h);
  const tx = (h: number) => xScale(h);

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[var(--text-primary)]">
        WHO Partograph — {ptg.patientName} | Parity: {ptg.parity} | Gestation: {ptg.gestation} | Membranes: {ptg.membraneStatus}
      </p>

      <div className="rounded-xl border border-[var(--border-default)] bg-white p-2">
        <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* ── FHR Section ── */}
          <FetalHeartRateSection ptg={ptg} />

          {/* ── Contractions Section ── */}
          <ContractionsSection ptg={ptg} />

          {/* ── Main Partograph ── */}
          <g transform={`translate(0, ${120})`}>
            {/* Main plot area */}
            <rect x={PAD.left} y={0} width={PLOT_W} height={PLOT_H} fill="none" stroke="#ccc" strokeWidth={0.5} />

            {/* Y labels - Dilation */}
            <text x={4} y={PLOT_H / 2 - 25} fontSize={7} fill="#888" transform={`rotate(-90, 4, ${PLOT_H / 2 - 25})`}>Cervical Dilation (cm)</text>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((cm) => {
              const y = yScaleDilation(cm);
              return (
                <g key={cm}>
                  <line x1={PAD.left} y1={y} x2={CHART_W - PAD.right} y2={y} stroke={cm < 4 ? "#f0f0f0" : cm === 10 ? "#999" : "#e0e0e0"} strokeWidth={0.5} />
                  <text x={PAD.left - 4} y={y + 2} textAnchor="end" fontSize={7} fill="#555">{cm}</text>
                </g>
              );
            })}

            {/* Y labels - Station (right side) */}
            <text x={CHART_W - 8} y={PLOT_H / 2 - 25} fontSize={7} fill="#888" transform={`rotate(90, ${CHART_W - 8}, ${PLOT_H / 2 - 25})`}>Descent (Station)</text>
            {[-3, -2, -1, 0, 1, 2, 3].map((st) => {
              const y = yScaleStation(st);
              return <text key={st} x={CHART_W - PAD.right + 4} y={y + 2} textAnchor="start" fontSize={7} fill="#555">{st}</text>;
            })}

            {/* Alert line */}
            {alertEndH > alertStartH && (
              <line
                x1={xScale(alertStartH)} y1={yScaleDilation(alertStartDilation)}
                x2={xScale(alertEndH)} y2={yScaleDilation(10)}
                stroke="#e67e22" strokeWidth={1.5} strokeDasharray="6 3"
              />
            )}

            {/* Action line (4h after alert) */}
            {alertEndH > alertStartH && (
              <line
                x1={xScale(alertStartH + 4)} y1={yScaleDilation(alertStartDilation)}
                x2={xScale(alertEndH + 4)} y2={yScaleDilation(10)}
                stroke="#e74c3c" strokeWidth={1.5} strokeDasharray="6 3"
              />
            )}

            {/* Alert + Action labels */}
            <text x={xScale(alertStartH)} y={yScaleDilation(alertStartDilation) - 6} fontSize={6} fill="#e67e22">Alert</text>
            <text x={xScale(alertStartH + 4)} y={yScaleDilation(alertStartDilation) - 6} fontSize={6} fill="#e74c3c">Action</text>

            {/* Dilation data */}
            {dilationPoints.length > 1 && (
              <>
                <polyline points={dilationPoints.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#2d6a9f" strokeWidth={2} strokeLinejoin="round" />
                {dilationPoints.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={5} fill="white" stroke="#2d6a9f" strokeWidth={2} />
                    <title>{`${p.val} cm @ ${hours[i].toFixed(1)}h`}</title>
                  </g>
                ))}
              </>
            )}

            {/* Descent data */}
            {stationPoints.length > 1 && (
              <>
                <polyline points={stationPoints.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#8e44ad" strokeWidth={1.5} strokeLinejoin="round" strokeDasharray="4 2" />
                {stationPoints.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={3.5} fill="white" stroke="#8e44ad" strokeWidth={1.5} />
                    <title>{`Station ${p.val} @ ${hours[i].toFixed(1)}h`}</title>
                  </g>
                ))}
              </>
            )}

            {/* Time grid - X axis */}
            <line x1={PAD.left} y1={PLOT_H} x2={CHART_W - PAD.right} y2={PLOT_H} stroke="#999" strokeWidth={1} />
            {Array.from({ length: maxHour + 1 }, (_, h) => (
              <g key={h}>
                <line x1={xScale(h)} y1={0} x2={xScale(h)} y2={PLOT_H} stroke={h % 2 === 0 ? "#ddd" : "#f0f0f0"} strokeWidth={0.3} />
                <text x={xScale(h)} y={PLOT_H + 12} textAnchor="middle" fontSize={7} fill="#555">{h}</text>
              </g>
            ))}
            <text x={PAD.left + PLOT_W / 2} y={PLOT_H + 26} textAnchor="middle" fontSize={7} fill="#888">Time (hours from admission)</text>

            {/* Legend */}
            <line x1={PAD.left + 10} y1={PLOT_H + 38} x2={PAD.left + 30} y2={PLOT_H + 38} stroke="#2d6a9f" strokeWidth={2} />
            <text x={PAD.left + 33} y={PLOT_H + 42} fontSize={6} fill="#555">Dilation</text>
            <line x1={PAD.left + 70} y1={PLOT_H + 38} x2={PAD.left + 90} y2={PLOT_H + 38} stroke="#8e44ad" strokeWidth={1.5} strokeDasharray="4 2" />
            <text x={PAD.left + 93} y={PLOT_H + 42} fontSize={6} fill="#555">Descent</text>
            <line x1={PAD.left + 140} y1={PLOT_H + 38} x2={PAD.left + 160} y2={PLOT_H + 38} stroke="#e67e22" strokeWidth={1.5} strokeDasharray="6 3" />
            <text x={PAD.left + 163} y={PLOT_H + 42} fontSize={6} fill="#555">Alert Line</text>
            <line x1={PAD.left + 220} y1={PLOT_H + 38} x2={PAD.left + 240} y2={PLOT_H + 38} stroke="#e74c3c" strokeWidth={1.5} strokeDasharray="6 3" />
            <text x={PAD.left + 243} y={PLOT_H + 42} fontSize={6} fill="#555">Action Line</text>
          </g>
        </svg>
      </div>

      {/* Data table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-[var(--surface-sunken)]">
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Time</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Dilation</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Station</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Contr/10m</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">FHR</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Mould</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Oxytocin</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">BP</th>
              <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Pulse</th>
            </tr>
          </thead>
          <tbody>
            {ptg.entries.map((e, i) => (
              <tr key={i} className="border-t border-[var(--border-subtle)]">
                <td className="px-2 py-1 text-[var(--text-primary)]">{new Date(e.time).toLocaleString([], { hour: "2-digit", minute: "2-digit" })}</td>
                <td className="px-2 py-1 font-semibold text-[var(--action-primary)]">{e.cervicalDilationCm}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.station}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.contractionsPer10min}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.fhrBaseline}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.moulding || "—"}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.oxytocinDrops ? `${e.oxytocinDrops} mU/min` : "—"}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.bp || "—"}</td>
                <td className="px-2 py-1 text-[var(--text-primary)]">{e.pulse || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
