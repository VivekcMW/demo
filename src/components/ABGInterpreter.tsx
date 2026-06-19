"use client";

import { useState, useMemo } from "react";
import { Wind, Activity } from "lucide-react";

type ABGInput = { ph: number; pco2: number; po2: number; hco3: number; be: number; fiO2: number };

function classifyABG(ph: number, pco2: number, hco3: number, be: number, po2: number) {
  let status: string;
  if (ph < 7.35) {
    if (pco2 > 45) status = "Respiratory Acidosis";
    else if (hco3 < 22) status = "Metabolic Acidosis";
    else status = "Mixed Acidosis";
  } else if (ph > 7.45) {
    if (pco2 < 35) status = "Respiratory Alkalosis";
    else if (hco3 > 26) status = "Metabolic Alkalosis";
    else status = "Mixed Alkalosis";
  } else {
    if (pco2 > 45 && hco3 > 26) status = "Fully Compensated Respiratory Acidosis";
    else if (pco2 < 35 && hco3 < 22) status = "Fully Compensated Respiratory Alkalosis";
    else status = "Normal";
  }
  if (status.includes("Acidosis") || status.includes("Alkalosis")) {
    const expectedHCO3 = pco2 > 40 ? 24 + (pco2 - 40) * 0.1 : 24 - (40 - pco2) * 0.1;
    if (Math.abs(hco3 - expectedHCO3) > 4) status = status.replace(")", ") (Partially Compensated");
    else if (Math.abs(ph - 7.4) < 0.03) status = status.replace(")", ") (Fully Compensated");
    else status = status.replace(")", ") (Acute)");
  }
  let oxygenation: string;
  if (po2 >= 80) oxygenation = "Normal";
  else if (po2 >= 60) oxygenation = "Mild Hypoxemia";
  else if (po2 >= 40) oxygenation = "Moderate Hypoxemia";
  else oxygenation = "Severe Hypoxemia";
  return { status, oxygenation };
}

const normalRanges = {
  ph: { min: 7.35, max: 7.45 },
  pco2: { min: 35, max: 45 },
  po2: { min: 80, max: 100 },
  hco3: { min: 22, max: 26 },
  be: { min: -2, max: 2 },
};

function RangeIndicator({ value, range, label, unit }: { value: number; range: { min: number; max: number }; label: string; unit: string }) {
  const isLow = value < range.min;
  const isHigh = value > range.max;
  const status = isLow ? "Low" : isHigh ? "High" : "Normal";
  const color = isLow || isHigh ? "var(--critical-fg)" : "var(--normal-fg)";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium text-[var(--text-secondary)]">{label}</p>
        <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${isLow || isHigh ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]" : "bg-[var(--normal-bg)] text-[var(--normal-fg)]"}`}>{status}</span>
      </div>
      <p className="text-lg font-bold tabular-nums" style={{ color }}>{value} <span className="text-xs font-normal text-[var(--text-secondary)]">{unit}</span></p>
      <p className="text-[9px] text-[var(--text-secondary)]">Range: {range.min}–{range.max}</p>
    </div>
  );
}

function ABGInputForm({ onCalculate }: { onCalculate: (v: ABGInput) => void }) {
  const [vals, setVals] = useState<ABGInput>({ ph: 7.35, pco2: 40, po2: 90, hco3: 24, be: 0, fiO2: 0.21 });
  const update = (k: keyof ABGInput, v: number) => setVals((p) => ({ ...p, [k]: v }));

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Enter ABG Values</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { key: "ph" as const, label: "pH", min: 6.8, max: 7.8, step: 0.01 },
          { key: "pco2" as const, label: "pCO₂ (mmHg)", min: 10, max: 120, step: 1 },
          { key: "po2" as const, label: "pO₂ (mmHg)", min: 20, max: 200, step: 1 },
          { key: "hco3" as const, label: "HCO₃ (mEq/L)", min: 5, max: 50, step: 0.5 },
          { key: "be" as const, label: "Base Excess", min: -15, max: 15, step: 0.5 },
          { key: "fiO2" as const, label: "FiO₂ (fraction)", min: 0.21, max: 1.0, step: 0.01 },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-[10px] font-medium text-[var(--text-secondary)]">{f.label}</label>
            <input type="number" value={vals[f.key]} onChange={(e) => update(f.key, parseFloat(e.target.value) || 0)} step={f.step} min={f.min} max={f.max} className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
          </div>
        ))}
      </div>
      <button onClick={() => onCalculate(vals)} className="mt-3 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
        Interpret ABG
      </button>
    </div>
  );
}

export default function ABGInterpreter() {
  const [input, setInput] = useState<ABGInput | null>(null);
  const result = useMemo(() => input ? classifyABG(input.ph, input.pco2, input.hco3, input.be, input.po2) : null, [input]);

  return (
    <div className="space-y-4">
      <ABGInputForm onCalculate={setInput} />

      {result && input && (
        <div className="space-y-4">
          {/* Results cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3"><RangeIndicator value={input.ph} range={normalRanges.ph} label="pH" unit="" /></div>
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3"><RangeIndicator value={input.pco2} range={normalRanges.pco2} label="pCO₂" unit="mmHg" /></div>
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3"><RangeIndicator value={input.po2} range={normalRanges.po2} label="pO₂" unit="mmHg" /></div>
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3"><RangeIndicator value={input.hco3} range={normalRanges.hco3} label="HCO₃" unit="mEq/L" /></div>
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3"><RangeIndicator value={input.be} range={normalRanges.be} label="Base Excess" unit="mEq/L" /></div>
            <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
              <p className="text-[10px] font-medium text-[var(--text-secondary)]">FiO₂</p>
              <p className="text-lg font-bold tabular-nums text-[var(--text-primary)]">{Math.round(input.fiO2 * 100)} <span className="text-xs font-normal text-[var(--text-secondary)]">%</span></p>
              {input.po2 > 0 && input.fiO2 > 0 && (
                <>
                  <p className="text-[10px] font-medium text-[var(--text-secondary)] mt-1">P/F Ratio</p>
                  <p className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{Math.round(input.po2 / input.fiO2)}</p>
                </>
              )}
            </div>
          </div>

          {/* Interpretation */}
          <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Interpretation</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--text-secondary)]">Acid-Base:</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${result.status.includes("Normal") ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{result.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--text-secondary)]">Oxygenation:</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${result.oxygenation === "Normal" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : result.oxygenation.includes("Mild") ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{result.oxygenation}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[var(--text-secondary)]">P/F Ratio:</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{Math.round(input.po2 / input.fiO2)} {input.po2 / input.fiO2 < 300 ? <span className="text-[var(--critical-fg)]">(ARDS critierion if &lt;300)</span> : ""}</span>
              </div>
              <details className="text-xs text-[var(--text-secondary)] mt-2">
                <summary className="cursor-pointer font-medium text-[var(--action-primary)]">Clinical Inference</summary>
                <div className="mt-2 space-y-1">
                  <p>• {result.status.includes("Respiratory Acidosis") ? "Hypoventilation — consider COPD, sedation, neuromuscular weakness, or chest wall restriction." : result.status.includes("Respiratory Alkalosis") ? "Hyperventilation — consider anxiety, pain, PE, hypoxia, or mechanical overventilation." : result.status.includes("Metabolic Acidosis") ? "Check anion gap. Consider DKA, lactic acidosis, renal failure, or diarrhea (if high AG vs non-AG)." : result.status.includes("Metabolic Alkalosis") ? "Consider vomiting, diuretics, or volume contraction." : "Acid-base status within normal limits."}</p>
                  <p>• {result.oxygenation.includes("Hypoxemia") ? `Consider V/Q mismatch, shunt, or hypoventilation. ${result.oxygenation.includes("Severe") ? "Evaluate for ARDS, severe pneumonia, or PE." : result.oxygenation.includes("Moderate") ? "Assess need for supplemental oxygen." : "Monitor oxygen saturation."}` : "Oxygenation adequate."}</p>
                  <p>• P/F Ratio: {input.po2 / input.fiO2 < 300 ? `Mild ARDS (200-300). ${input.po2 / input.fiO2 < 200 ? `${input.po2 / input.fiO2 < 100 ? "Severe" : "Moderate"} ARDS (Berlin criteria).` : ""}` : `Normal (>300).`}</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
