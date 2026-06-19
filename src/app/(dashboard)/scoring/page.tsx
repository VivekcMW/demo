"use client";

import { useState, useMemo } from "react";
import {
  Brain, Activity, Heart, Stethoscope, Wind,
  Baby, AlertTriangle, Scale, Pill, Thermometer,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const BADGE: Record<string, string> = {
  Low: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Moderate: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  High: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Severe: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Crit: "bg-[var(--critical-bg)] text-white",
  None: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Mild: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Major: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

function ScoreBadge({ level }: { level: string }) {
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE[level] ?? ""}`}>{level}</span>;
}

function CalcCard({ title, icon: Icon, children, open: initOpen }: { title: string; icon: React.ElementType; children: React.ReactNode; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(initOpen ?? false);
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
      <button onClick={() => setIsOpen((v) => !v)} className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-[var(--surface-sunken)] transition-colors">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--action-subtle)] text-[var(--action-primary)]">
          <Icon size={16} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
          <p className="text-xs text-[var(--text-secondary)]">{isOpen ? "Click to close" : "Click to open calculator"}</p>
        </div>
        <span className={`text-xs text-[var(--text-secondary)] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && <div className="border-t border-[var(--border-default)] px-5 py-4">{children}</div>}
    </div>
  );
}

function RadioGroup({ options, value, onChange, name }: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="space-y-1.5">
      {options.map((o) => (
        <label key={o.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${value === o.value ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"}`}>
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="sr-only" />
          <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${value === o.value ? "border-[var(--action-primary)]" : "border-[var(--border-default)]"}`}>
            {value === o.value && <div className="h-2 w-2 rounded-full bg-[var(--action-primary)]" />}
          </div>
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}

function SelectRow({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  const id = label.replace(/\s+/g, "-");
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="shrink-0 text-xs font-medium text-[var(--text-secondary)] w-24">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── GCS Calculator ───────────────────────────────────────────────────────────

function GCSCalculator() {
  const [eye, setEye] = useState("4");
  const [verbal, setVerbal] = useState("5");
  const [motor, setMotor] = useState("6");
  const total = Number(eye) + Number(verbal) + Number(motor);
  const severity = total >= 13 ? "Mild" : total >= 9 ? "Moderate" : "Severe";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">Eye Opening</p>
          <RadioGroup name="gcs-eye" value={eye} onChange={setEye} options={[
            { value: "4", label: "Spontaneous (4)" },
            { value: "3", label: "To speech (3)" },
            { value: "2", label: "To pain (2)" },
            { value: "1", label: "None (1)" },
          ]} />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">Verbal Response</p>
          <RadioGroup name="gcs-verbal" value={verbal} onChange={setVerbal} options={[
            { value: "5", label: "Oriented (5)" },
            { value: "4", label: "Confused (4)" },
            { value: "3", label: "Inappropriate (3)" },
            { value: "2", label: "Incomprehensible (2)" },
            { value: "1", label: "None (1)" },
          ]} />
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">Motor Response</p>
          <RadioGroup name="gcs-motor" value={motor} onChange={setMotor} options={[
            { value: "6", label: "Obeys commands (6)" },
            { value: "5", label: "Localises pain (5)" },
            { value: "4", label: "Withdraws (4)" },
            { value: "3", label: "Flexion (3)" },
            { value: "2", label: "Extension (2)" },
            { value: "1", label: "None (1)" },
          ]} />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Brain size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">GCS Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/15</span>
        <ScoreBadge level={severity} />
      </div>
    </div>
  );
}

// ── APGAR Calculator ─────────────────────────────────────────────────────────

function APGARCalculator() {
  const [appearance, setAppearance] = useState("2");
  const [pulse, setPulse] = useState("2");
  const [grimace, setGrimace] = useState("2");
  const [activity, setActivity] = useState("2");
  const [respiration, setRespiration] = useState("2");
  const total = [appearance, pulse, grimace, activity, respiration].reduce((s, v) => s + Number(v), 0);
  const severity = total >= 7 ? "Low" : total >= 4 ? "Moderate" : "Severe";

  const cats = [
    { label: "Appearance (Skin)", value: appearance, set: setAppearance, opts: [{ v: "2", l: "Pink all over" }, { v: "1", l: "Body pink, blue extremities" }, { v: "0", l: "Blue / Pale all over" }] },
    { label: "Pulse (HR)", value: pulse, set: setPulse, opts: [{ v: "2", l: ">100 bpm" }, { v: "1", l: "<100 bpm" }, { v: "0", l: "Absent" }] },
    { label: "Grimace (Reflex)", value: grimace, set: setGrimace, opts: [{ v: "2", l: "Cough/sneeze/cry" }, { v: "1", l: "Facial grimace only" }, { v: "0", l: "No response" }] },
    { label: "Activity (Tone)", value: activity, set: setActivity, opts: [{ v: "2", l: "Active / Flexed" }, { v: "1", l: "Some flexion" }, { v: "0", l: "Limp / Flaccid" }] },
    { label: "Respiration", value: respiration, set: setRespiration, opts: [{ v: "2", l: "Strong cry, regular" }, { v: "1", l: "Weak cry / irregular" }, { v: "0", l: "Absent" }] },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {cats.map((c) => (
          <div key={c.label}>
            <p className="mb-2 text-xs font-semibold text-[var(--text-secondary)]">{c.label}</p>
            <RadioGroup name={`apgar-${c.label}`} value={c.value} onChange={c.set} options={c.opts.map((o) => ({ value: o.v, label: o.l }))} />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Baby size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">APGAR Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/10</span>
        <ScoreBadge level={severity} />
      </div>
    </div>
  );
}

// ── NIHSS (Simplified) ──────────────────────────────────────────────────────

function NIHSSPanel() {
  const items = [
    { id: "1a", label: "1a. Level of Consciousness", opts: [{ v: "0", l: "Alert" }, { v: "1", l: "Drowsy" }, { v: "2", l: "Obtunded" }, { v: "3", l: "Coma" }] },
    { id: "1b", label: "1b. LOC Questions (month, age)", opts: [{ v: "0", l: "Both correct" }, { v: "1", l: "One correct" }, { v: "2", l: "Both incorrect" }] },
    { id: "1c", label: "1c. LOC Commands (eye, hand)", opts: [{ v: "0", l: "Both correct" }, { v: "1", l: "One correct" }, { v: "2", l: "Both incorrect" }] },
    { id: "2", label: "2. Best Gaze", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Partial gaze palsy" }, { v: "2", l: "Forced deviation" }] },
    { id: "3", label: "3. Visual Fields", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Partial hemianopia" }, { v: "2", l: "Complete hemianopia" }, { v: "3", l: "Bilateral blindness" }] },
    { id: "4", label: "4. Facial Palsy", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Minor" }, { v: "2", l: "Partial" }, { v: "3", l: "Complete" }] },
    { id: "5a", label: "5a. Motor Arm — Left", opts: [{ v: "0", l: "No drift" }, { v: "1", l: "Drift" }, { v: "2", l: "Some effort" }, { v: "3", l: "No effort" }, { v: "4", l: "No movement" }] },
    { id: "5b", label: "5b. Motor Arm — Right", opts: [{ v: "0", l: "No drift" }, { v: "1", l: "Drift" }, { v: "2", l: "Some effort" }, { v: "3", l: "No effort" }, { v: "4", l: "No movement" }] },
    { id: "6a", label: "6a. Motor Leg — Left", opts: [{ v: "0", l: "No drift" }, { v: "1", l: "Drift" }, { v: "2", l: "Some effort" }, { v: "3", l: "No effort" }, { v: "4", l: "No movement" }] },
    { id: "6b", label: "6b. Motor Leg — Right", opts: [{ v: "0", l: "No drift" }, { v: "1", l: "Drift" }, { v: "2", l: "Some effort" }, { v: "3", l: "No effort" }, { v: "4", l: "No movement" }] },
    { id: "7", label: "7. Limb Ataxia", opts: [{ v: "0", l: "Absent" }, { v: "1", l: "Present (1 limb)" }, { v: "2", l: "Present (2 limbs)" }] },
    { id: "8", label: "8. Sensory", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Mild loss" }, { v: "2", l: "Severe loss" }] },
    { id: "9", label: "9. Best Language", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Mild aphasia" }, { v: "2", l: "Severe aphasia" }, { v: "3", l: "Mute / global" }] },
    { id: "10", label: "10. Dysarthria", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Mild" }, { v: "2", l: "Severe" }] },
    { id: "11", label: "11. Extinction / Neglect", opts: [{ v: "0", l: "Normal" }, { v: "1", l: "Mild" }, { v: "2", l: "Severe" }] },
  ];

  const [scores, setScores] = useState<Record<string, string>>({});
  const total = Object.values(scores).reduce((s, v) => s + Number(v), 0);
  const sev = total <= 4 ? "Mild" : total <= 10 ? "Moderate" : total <= 15 ? "High" : "Major";

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id}>
          <p className="mb-1.5 text-xs font-medium text-[var(--text-secondary)]">{item.label}</p>
          <select
            value={scores[item.id] ?? ""}
            onChange={(e) => setScores((p) => ({ ...p, [item.id]: e.target.value }))}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]"
          >
            <option value="">Select…</option>
            {item.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Brain size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">NIHSS Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/42</span>
        <ScoreBadge level={sev} />
      </div>
    </div>
  );
}

// ── TIMI for UA/NSTEMI ─────────────────────────────────────────────────────

function TIMIPanel() {
  const [factors, setFactors] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setFactors((p) => ({ ...p, [k]: !p[k] }));

  const items = [
    { key: "age65", label: "Age ≥ 65 years" },
    { key: "risk3", label: "≥ 3 CAD risk factors (DM, HTN, FH, smoking, dyslipidaemia)" },
    { key: "knownCAD", label: "Known CAD (stenosis ≥ 50%)" },
    { key: "asa7", label: "Aspirin use in past 7 days" },
    { key: "severeAngina", label: "Severe angina (≥ 2 episodes in 24h)" },
    { key: "ecgChanges", label: "ST deviation ≥ 0.5 mm" },
    { key: "biomarker", label: "Elevated cardiac biomarkers" },
  ];

  const total = items.filter((item) => factors[item.key]).length;
  const risk = total <= 2 ? "Low" : total <= 4 ? "Moderate" : "High";

  return (
    <div className="space-y-4">
      <p className="text-xs text-[var(--text-secondary)]">Select all that apply:</p>
      {items.map((item) => (
        <label key={item.key} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"}`}>
          <input type="checkbox" checked={!!factors[item.key]} onChange={() => toggle(item.key)} className="sr-only" />
          <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-primary)]" : "border-[var(--border-default)]"}`}>
            {factors[item.key] && <span className="text-[9px] text-white">✓</span>}
          </div>
          <span>{item.label}</span>
        </label>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Heart size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">TIMI Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/7</span>
        <ScoreBadge level={risk} />
        <span className="text-xs text-[var(--text-secondary)]">
          {(total <= 2 ? "4.7%" : total <= 4 ? "13%" : "28%")} 14-day MACE risk
        </span>
      </div>
    </div>
  );
}

// ── CHADS-VASc ──────────────────────────────────────────────────────────────

function CHADSVascPanel() {
  const [factors, setFactors] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setFactors((p) => ({ ...p, [k]: !p[k] }));

  const items = [
    { key: "chf", label: "C — CHF/LV dysfunction (1 pt)", pts: 1 },
    { key: "htn", label: "H — Hypertension (1 pt)", pts: 1 },
    { key: "age65_74", label: "A₂ — Age 65-74 years (1 pt)", pts: 1 },
    { key: "age75", label: "A — Age ≥ 75 years (2 pts)", pts: 2 },
    { key: "dm", label: "D — Diabetes mellitus (1 pt)", pts: 1 },
    { key: "stroke", label: "S₂ — Stroke/TIA/Thromboembolism (2 pts)", pts: 2 },
    { key: "vasc", label: "V — Vascular disease (1 pt)", pts: 1 },
    { key: "female", label: "Sc — Female sex (1 pt)", pts: 1 },
  ];

  const total = items.reduce((s, item) => s + (factors[item.key] ? item.pts : 0), 0);
  const riskPct = [0, 1.3, 2.2, 3.2, 4.0, 6.7, 9.8, 9.6, 6.7, 15.2, 14.2, 11.1, 10.0][Math.min(total, 12)];
  const risk = total === 0 ? "Low" : total <= 1 ? "Low" : total <= 3 ? "Moderate" : "High";

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <label key={item.key} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"}`}>
          <input type="checkbox" checked={!!factors[item.key]} onChange={() => toggle(item.key)} className="sr-only" />
          <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-primary)]" : "border-[var(--border-default)]"}`}>
            {factors[item.key] && <span className="text-[9px] text-white">✓</span>}
          </div>
          <span className="flex-1">{item.label}</span>
        </label>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Heart size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">CHA₂DS₂-VASc:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}</span>
        <ScoreBadge level={risk} />
        <span className="text-xs text-[var(--text-secondary)]">{riskPct}% annual stroke risk</span>
      </div>
    </div>
  );
}

// ── SOFA Score (Simplified) ─────────────────────────────────────────────────

function SOFAPanel() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setScores((p) => ({ ...p, [k]: v }));

  const systems = [
    { id: "resp", label: "Respiration (PaO₂/FiO₂)", opts: [{ v: "0", l: ">400 (0)" }, { v: "1", l: "≤400 (1)" }, { v: "2", l: "≤300 (2)" }, { v: "3", l: "≤200 + vent (3)" }, { v: "4", l: "≤100 + vent (4)" }] },
    { id: "coag", label: "Coagulation (Platelets ×10³/µL)", opts: [{ v: "0", l: ">150 (0)" }, { v: "1", l: "≤150 (1)" }, { v: "2", l: "≤100 (2)" }, { v: "3", l: "≤50 (3)" }, { v: "4", l: "≤20 (4)" }] },
    { id: "liver", label: "Liver (Bilirubin mg/dL)", opts: [{ v: "0", l: "<1.2 (0)" }, { v: "1", l: "1.2–1.9 (1)" }, { v: "2", l: "2.0–5.9 (2)" }, { v: "3", l: "6.0–11.9 (3)" }, { v: "4", l: ">12.0 (4)" }] },
    { id: "cvs", label: "Cardiovascular (MAP / vasopressors)", opts: [{ v: "0", l: "MAP ≥70 (0)" }, { v: "1", l: "MAP <70 (1)" }, { v: "2", l: "Dop ≤5 (2)" }, { v: "3", l: "Dop >5 or Epi ≤0.1 (3)" }, { v: "4", l: "Dop >15 or Epi >0.1 (4)" }] },
    { id: "cns", label: "CNS (GCS)", opts: [{ v: "0", l: "15 (0)" }, { v: "1", l: "13–14 (1)" }, { v: "2", l: "10–12 (2)" }, { v: "3", l: "6–9 (3)" }, { v: "4", l: "<6 (4)" }] },
    { id: "renal", label: "Renal (Creatinine mg/dL / urine)", opts: [{ v: "0", l: "<1.2 (0)" }, { v: "1", l: "1.2–1.9 (1)" }, { v: "2", l: "2.0–3.4 (2)" }, { v: "3", l: "3.5–4.9 or UOP <500 (3)" }, { v: "4", l: ">5.0 or UOP <200 (4)" }] },
  ];

  const total = Object.values(scores).reduce((s, v) => s + Number(v), 0);
  const mort = total < 6 ? "<10%" : total < 10 ? "15–40%" : total < 12 ? "40–60%" : ">80%";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {systems.map((sys) => (
        <div key={sys.id}>
          <p className="mb-1.5 text-xs font-semibold text-[var(--text-secondary)]">{sys.label}</p>
          <select value={scores[sys.id] ?? ""} onChange={(e) => set(sys.id, e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]">
            <option value="">Select…</option>
            {sys.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      ))}
      <div className="col-span-full flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Activity size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">SOFA Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/24</span>
        <span className="text-xs text-[var(--text-secondary)]">Est. mortality: {mort}</span>
      </div>
    </div>
  );
}

// ── CURB-65 ─────────────────────────────────────────────────────────────────

function CURB65Panel() {
  const [factors, setFactors] = useState<Record<string, boolean>>({});
  const [bun, setBun] = useState("");
  const toggle = (k: string) => setFactors((p) => ({ ...p, [k]: !p[k] }));

  const score = (factors.confusion ? 1 : 0) + (factors.age65 ? 1 : 0) + (Number(bun) > 20 ? 1 : 0) + (factors.rr30 ? 1 : 0) + (factors.bpLow ? 1 : 0);
  const sev = score <= 1 ? "Low" : score === 2 ? "Moderate" : "High";
  const mort = score === 0 ? "0.6%" : score === 1 ? "2.7%" : score === 2 ? "6.8%" : score === 3 ? "14%" : score >= 4 ? "27.8%" : "";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { key: "confusion", label: "C — Confusion (new onset)" },
          { key: "age65", label: "U — BUN > 20 mg/dL" },
          { key: "rr30", label: "R — Respiratory rate ≥ 30/min" },
          { key: "bpLow", label: "B — BP (SBP <90 / DBP ≤60)" },
          { key: "age65", label: "65 — Age ≥ 65 years" },
        ].map((item) => (
          <label key={item.key} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"}`}>
            <input type="checkbox" checked={!!factors[item.key]} onChange={() => toggle(item.key)} className="sr-only" />
            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${factors[item.key] ? "border-[var(--action-primary)] bg-[var(--action-primary)]" : "border-[var(--border-default)]"}`}>
              {factors[item.key] && <span className="text-[9px] text-white">✓</span>}
            </div>
            <span>{item.label}</span>
          </label>
        ))}
        <div>
          <p className="mb-1.5 text-xs font-medium text-[var(--text-secondary)]">U — BUN (mg/dL)</p>
          <input value={bun} onChange={(e) => setBun(e.target.value)} type="number" placeholder="Enter BUN" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]" />
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Wind size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">CURB-65:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{score}/5</span>
        <ScoreBadge level={sev} />
        <span className="text-xs text-[var(--text-secondary)]">Mortality: {mort}</span>
      </div>
    </div>
  );
}

// ── PHQ-9 ───────────────────────────────────────────────────────────────────

function PHQ9Panel() {
  const items = [
    "1. Little interest or pleasure in doing things",
    "2. Feeling down, depressed, or hopeless",
    "3. Trouble falling/staying asleep, sleeping too much",
    "4. Feeling tired or having little energy",
    "5. Poor appetite or overeating",
    "6. Feeling bad about yourself — or that you've let yourself/family down",
    "7. Trouble concentrating on things (reading, TV)",
    "8. Moving/speaking slowly or being fidgety/restless",
    "9. Thoughts that you'd be better off dead or hurting yourself",
  ];

  const opts = [
    { v: "0", l: "Not at all" },
    { v: "1", l: "Several days" },
    { v: "2", l: "More than half the days" },
    { v: "3", l: "Nearly every day" },
  ];

  const [scores, setScores] = useState<Record<string, string>>({});
  const total = Object.values(scores).reduce((s, v) => s + Number(v), 0);
  const sev = total <= 4 ? "None" : total <= 9 ? "Mild" : total <= 14 ? "Moderate" : total <= 19 ? "Mod" : "Severe";

  return (
    <div className="space-y-4">
      <p className="text-xs text-[var(--text-secondary)]">Over the last 2 weeks, how often have you been bothered by:</p>
      {items.map((item, i) => (
        <div key={i} className="rounded-lg border border-[var(--border-default)] p-3">
          <p className="mb-2 text-xs font-medium text-[var(--text-primary)]">{item}</p>
          <div className="flex gap-1">
            {opts.map((o) => (
              <button
                key={o.v}
                onClick={() => setScores((p) => ({ ...p, [String(i)]: o.v }))}
                className={`flex-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors ${scores[String(i)] === o.v ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Stethoscope size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">PHQ-9:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/27</span>
        <ScoreBadge level={sev} />
        <span className="text-xs text-[var(--text-secondary)]">{scores["8"] === "1" || scores["8"] === "2" || scores["8"] === "3" ? "Suicidal ideation flagged — urgent review" : ""}</span>
      </div>
    </div>
  );
}

// ── PEWS (Simplified) ───────────────────────────────────────────────────────

function PEWSPanel() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setScores((p) => ({ ...p, [k]: v }));

  const items = [
    { id: "behaviour", label: "Behaviour", opts: [{ v: "0", l: "Playing/appropriate" }, { v: "1", l: "Sleeping/irritable" }, { v: "2", l: "Lethargic/confused" }, { v: "3", l: "Unresponsive" }] },
    { id: "cvs", label: "CVS (Cap refill / HR)", opts: [{ v: "0", l: "CR <2s, HR normal" }, { v: "1", l: "CR 2-3s, HR >20 above normal" }, { v: "2", l: "CR >3s, HR >30 above" }, { v: "3", l: "CR >4s, HR >40 or <60" }] },
    { id: "resp", label: "Respiratory", opts: [{ v: "0", l: "Normal, no distress" }, { v: "1", l: "RR >10 above, O₂ req" }, { v: "2", l: "RR >20, retractions" }, { v: "3", l: "RR >30, grunting, FiO₂ >40%" }] },
  ];

  const total = Object.values(scores).reduce((s, v) => s + Number(v), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.id}>
            <p className="mb-1.5 text-xs font-semibold text-[var(--text-secondary)]">{item.label}</p>
            <select value={scores[item.id] ?? ""} onChange={(e) => set(item.id, e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]">
              <option value="">Select…</option>
              {item.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Activity size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">PEWS:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/9</span>
        <ScoreBadge level={total <= 2 ? "Low" : total <= 4 ? "Moderate" : "High"} />
        <span className="text-xs text-[var(--text-secondary)]">{total >= 4 ? "Consider escalation to PICU review" : ""}</span>
      </div>
    </div>
  );
}

// ── Pain Score (FLACC) ──────────────────────────────────────────────────────

function PainFLACCPanel() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setScores((p) => ({ ...p, [k]: v }));

  const items = [
    { id: "face", label: "Face", opts: [{ v: "0", l: "No particular expression" }, { v: "1", l: "Occasional grimace/frown" }, { v: "2", l: "Frequent/constant quivering chin" }] },
    { id: "legs", label: "Legs", opts: [{ v: "0", l: "Normal position/relaxed" }, { v: "1", l: "Uneasy/restless/tense" }, { v: "2", l: "Kicking/legs drawn up" }] },
    { id: "activity", label: "Activity", opts: [{ v: "0", l: "Lying quietly, normal position" }, { v: "1", l: "Squirming/shifting/tense" }, { v: "2", l: "Arched/rigid/jerking" }] },
    { id: "cry", label: "Cry", opts: [{ v: "0", l: "No cry (awake/asleep)" }, { v: "1", l: "Moans/whimpers, occasional complaint" }, { v: "2", l: "Crying steadily/screams/sobs" }] },
    { id: "consol", label: "Consolability", opts: [{ v: "0", l: "Content/relaxed" }, { v: "1", l: "Reassured by touch/hug in <1 min" }, { v: "2", l: "Difficult to console/comfort" }] },
  ];

  const total = Object.values(scores).reduce((s, v) => s + Number(v), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {items.map((item) => (
          <div key={item.id}>
            <p className="mb-1.5 text-xs font-semibold text-[var(--text-secondary)]">{item.label}</p>
            <select value={scores[item.id] ?? ""} onChange={(e) => set(item.id, e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]">
              <option value="">Select…</option>
              {item.opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-xl bg-[var(--surface-sunken)] px-4 py-3">
        <Thermometer size={18} className="text-[var(--action-primary)]" />
        <span className="text-sm font-medium text-[var(--text-secondary)]">FLACC Score:</span>
        <span className="text-2xl font-bold tabular-nums text-[var(--action-primary)]">{total}/10</span>
        <ScoreBadge level={total === 0 ? "None" : total <= 3 ? "Mild" : total <= 6 ? "Moderate" : "High"} />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const CALCULATORS = [
  { id: "gcs", title: "Glasgow Coma Scale (GCS)", icon: Brain, comp: GCSCalculator },
  { id: "nihss", title: "NIH Stroke Scale (NIHSS)", icon: Brain, comp: NIHSSPanel },
  { id: "timi", title: "TIMI UA/NSTEMI Risk Score", icon: Heart, comp: TIMIPanel },
  { id: "chads", title: "CHA₂DS₂-VASc (AF Stroke Risk)", icon: Heart, comp: CHADSVascPanel },
  { id: "sofa", title: "SOFA Score (Sepsis)", icon: Activity, comp: SOFAPanel },
  { id: "curb65", title: "CURB-65 (Pneumonia Severity)", icon: Wind, comp: CURB65Panel },
  { id: "phq9", title: "PHQ-9 (Depression Screening)", icon: Stethoscope, comp: PHQ9Panel },
  { id: "pews", title: "PEWS (Paediatric Early Warning)", icon: Activity, comp: PEWSPanel },
  { id: "apgar", title: "APGAR Score (Newborn)", icon: Baby, comp: APGARCalculator },
  { id: "flacc", title: "FLACC Pain Scale (Paediatric)", icon: Thermometer, comp: PainFLACCPanel },
] as const;

export default function ScoringPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => CALCULATORS.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Scoring Calculators</h1>
          <p className="text-sm text-[var(--text-secondary)]">Clinical scoring tools for assessment & risk stratification</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search calculators…"
          className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] w-full sm:w-64"
        />
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: "Neurology", value: "GCS, NIHSS" },
          { label: "Cardiology", value: "TIMI, CHA₂DS₂-VASc" },
          { label: "Critical Care", value: "SOFA" },
          { label: "Pulmonology", value: "CURB-65" },
          { label: "Mental Health", value: "PHQ-9" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">{k.label}</p>
            <p className="mt-1 text-xs font-semibold text-[var(--text-primary)]">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-12 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No calculators match &quot;{search}&quot;</p>
          </div>
        )}
        {filtered.map((calc) => (
          <CalcCard key={calc.id} title={calc.title} icon={calc.icon}>
            <calc.comp />
          </CalcCard>
        ))}
      </div>
    </div>
  );
}
