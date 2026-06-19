"use client";

import { useState, useMemo } from "react";
import { DraftingCompass, Activity } from "lucide-react";

// ── PASI Calculator ───────────────────────────────────────────────────────────

type PasiRegion = { label: string; area: number };
const PASI_REGIONS: PasiRegion[] = [
  { label: "Head/Neck", area: 10 },
  { label: "Upper Limbs", area: 20 },
  { label: "Trunk", area: 30 },
  { label: "Lower Limbs", area: 40 },
];

type PasiScore = 0 | 1 | 2 | 3 | 4;
const SCORE_LABELS = ["None (0)", "Mild (1)", "Moderate (2)", "Severe (3)", "Very Severe (4)"];

function computePASI(erythema: PasiScore[], scaling: PasiScore[], thickness: PasiScore[], area: number[]): number {
  return PASI_REGIONS.reduce((sum, _, i) => {
    const m = i === 0 ? 0.1 : i === 1 ? 0.2 : i === 2 ? 0.3 : 0.4;
    return sum + (erythema[i] + scaling[i] + thickness[i]) * area[i] * m * 0.01;
  }, 0);
}

function pasiSeverity(pasi: number): string {
  if (pasi < 5) return "Mild";
  if (pasi < 10) return "Moderate";
  if (pasi < 20) return "Severe";
  return "Very Severe";
}

// ── BSA Body Map ──────────────────────────────────────────────────────────────

type BodyPart = { label: string; pct: number; defaultChecked: boolean };
const BODY_PARTS: BodyPart[] = [
  { label: "Head & Neck", pct: 9, defaultChecked: false },
  { label: "Anterior Trunk", pct: 18, defaultChecked: false },
  { label: "Posterior Trunk", pct: 18, defaultChecked: false },
  { label: "Left Upper Limb", pct: 9, defaultChecked: false },
  { label: "Right Upper Limb", pct: 9, defaultChecked: false },
  { label: "Left Lower Limb", pct: 18, defaultChecked: false },
  { label: "Right Lower Limb", pct: 18, defaultChecked: false },
  { label: "Perineum/Genitalia", pct: 1, defaultChecked: false },
];

export default function DermatologyPage() {
  const [tab, setTab] = useState<"pasi" | "bsa">("pasi");

  // PASI state
  const [erythema, setErythema] = useState<PasiScore[]>([0, 0, 0, 0]);
  const [scaling, setScaling] = useState<PasiScore[]>([0, 0, 0, 0]);
  const [thickness, setThickness] = useState<PasiScore[]>([0, 0, 0, 0]);
  const [area, setArea] = useState([0, 0, 0, 0]);
  const pasi = useMemo(() => computePASI(erythema, scaling, thickness, area), [erythema, scaling, thickness, area]);
  const pasiSev = pasiSeverity(pasi);

  // BSA state
  const [bsaChecked, setBsaChecked] = useState<boolean[]>(BODY_PARTS.map(() => false));
  const bsaTotal = useMemo(() => BODY_PARTS.reduce((sum, p, i) => sum + (bsaChecked[i] ? p.pct : 0), 0), [bsaChecked]);

  const scoreSelect = (label: string, vals: PasiScore[], setter: (v: PasiScore[]) => void) => (
    <div className="space-y-1">
      <p className="text-[10px] font-medium text-[var(--text-secondary)]">{label}</p>
      <div className="grid grid-cols-4 gap-1">
        {PASI_REGIONS.map((r, i) => (
          <select key={r.label} value={vals[i]} onChange={(e) => { const n = [...vals]; n[i] = parseInt(e.target.value) as PasiScore; setter(n); }} className="rounded border border-[var(--border-default)] px-1 py-0.5 text-[9px] outline-none bg-white">
            {[0, 1, 2, 3, 4].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        ))}
      </div>
      <div className="flex text-[8px] text-[var(--text-secondary)] gap-2">
        {PASI_REGIONS.map((r, i) => <span key={r.label} className="flex-1 text-center">{r.label}</span>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <DraftingCompass size={24} className="text-[var(--action-primary)]" />
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Dermatology</h1><p className="text-sm text-[var(--text-secondary)]">PASI scoring, BSA estimation & lesion tracking</p></div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[{ id: "pasi" as const, label: "PASI Score", icon: Activity }, { id: "bsa" as const, label: "BSA Map", icon: DraftingCompass }].map((t) => {
          const Icon = t.icon;
          return <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}><Icon size={16} />{t.label}</button>;
        })}
      </div>

      {tab === "pasi" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
            {scoreSelect("Erythema", erythema, setErythema)}
            {scoreSelect("Scaling", scaling, setScaling)}
            {scoreSelect("Thickness", thickness, setThickness)}
            <div>
              <p className="text-[10px] font-medium text-[var(--text-secondary)] mb-1">Area Involvement (%)</p>
              <div className="grid grid-cols-4 gap-2">
                {PASI_REGIONS.map((r, i) => (
                  <div key={r.label}><label className="text-[9px] text-[var(--text-secondary)]">{r.label} (0-100)</label><input type="number" min={0} max={100} value={area[i]} onChange={(e) => { const n = [...area]; n[i] = Math.min(100, Math.max(0, parseInt(e.target.value) || 0)); setArea(n); }} className="w-full rounded border border-[var(--border-default)] px-2 py-1 text-xs outline-none bg-white" /></div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-4 text-center">
            <p className="text-xs font-medium text-[var(--text-secondary)]">PASI Score</p>
            <p className="text-4xl font-bold text-[var(--action-primary)]">{pasi.toFixed(1)}</p>
            <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${pasiSev === "Mild" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : pasiSev === "Moderate" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{pasiSev}</span>
          </div>
        </div>
      )}

      {tab === "bsa" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs font-semibold mb-3 text-[var(--text-primary)]">Body Surface Area</p>
            {BODY_PARTS.map((bp, i) => (
              <label key={bp.label} className="flex items-center gap-3 py-1.5 cursor-pointer">
                <input type="checkbox" checked={bsaChecked[i]} onChange={() => { const n = [...bsaChecked]; n[i] = !n[i]; setBsaChecked(n); }} className="accent-[var(--action-primary)]" />
                <span className="text-sm text-[var(--text-primary)] flex-1">{bp.label}</span>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">{bp.pct}%</span>
              </label>
            ))}
          </div>

          <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-8 flex flex-col items-center justify-center">
            <p className="text-xs font-medium text-[var(--text-secondary)]">Total BSA Affected</p>
            <p className="text-5xl font-bold text-[var(--action-primary)]">{bsaTotal}%</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">Rule of Nines estimation</p>
            <div className="mt-4 w-full max-h-48 aspect-[3/4] border-2 border-[var(--border-default)] rounded-xl bg-white/50 flex items-center justify-center">
              <svg viewBox="0 0 120 200" className="h-full">
                <ellipse cx={60} cy={18} rx={32} ry={18} fill={bsaChecked[0] ? "#e74c3c40" : "none"} stroke={bsaChecked[0] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <rect x={32} y={36} width={56} height={50} rx={4} fill={bsaChecked[1] ? "#e74c3c40" : "none"} stroke={bsaChecked[1] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <rect x={32} y={36} width={56} height={50} rx={4} fill={bsaChecked[2] ? "#2d6a9f40" : "none"} stroke={bsaChecked[2] ? "#2d6a9f" : "#ccc"} strokeWidth={1} opacity={0.5} />
                <rect x={6} y={36} width={24} height={60} rx={4} fill={bsaChecked[3] ? "#e74c3c40" : "none"} stroke={bsaChecked[3] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <rect x={90} y={36} width={24} height={60} rx={4} fill={bsaChecked[4] ? "#e74c3c40" : "none"} stroke={bsaChecked[4] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <rect x={6} y={100} width={24} height={70} rx={4} fill={bsaChecked[5] ? "#e74c3c40" : "none"} stroke={bsaChecked[5] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <rect x={90} y={100} width={24} height={70} rx={4} fill={bsaChecked[6] ? "#e74c3c40" : "none"} stroke={bsaChecked[6] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
                <polygon points="35,170 85,170 70,195 50,195" fill={bsaChecked[7] ? "#e74c3c40" : "none"} stroke={bsaChecked[7] ? "#e74c3c" : "#ccc"} strokeWidth={1} />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
