"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Timer, AlertTriangle, Play, Square, RotateCcw } from "lucide-react";

// ── ESI Triage ─────────────────────────────────────────────────────────────────

type ESILevel = 1 | 2 | 3 | 4 | 5;

interface ESIQuestion {
  id: string;
  text: string;
  critical: boolean;
}

const ESI_PROTOCOL: ESIQuestion[][] = [
  [
    { id: "es_a1", text: "Does patient require immediate life-saving intervention? (Airway, Emergency meds, etc.)", critical: true },
    { id: "es_a2", text: "Is patient in respiratory arrest / cardiac arrest?", critical: true },
    { id: "es_a3", text: "Severe respiratory distress / SpO₂ < 90% on RA?", critical: true },
    { id: "es_a4", text: "Unresponsive / altered mental status?", critical: true },
    { id: "es_a5", text: "Major trauma with unstable vitals?", critical: true },
  ],
  [
    { id: "es_b1", text: "High-risk situation? (e.g., chest pain with cardiac hx, stroke symptoms)", critical: true },
    { id: "es_b2", text: "Severe pain / distress (≥ 7/10)?", critical: false },
    { id: "es_b3", text: "New-onset confusion or lethargy?", critical: true },
    { id: "es_b4", text: "Dangerous mechanism of injury?", critical: false },
  ],
  [
    { id: "es_c1", text: "Multiple resources needed? (≥ 2 labs, imaging, IV fluids, etc.)", critical: false },
    { id: "es_c2", text: "Abnormal vital signs (HR > 100, RR > 20, temp > 38.5)?", critical: false },
    { id: "es_c3", text: "Moderate pain / distress (4-6/10)?", critical: false },
  ],
  [
    { id: "es_d1", text: "Single resource needed? (e.g., only blood test, only X-ray)", critical: false },
    { id: "es_d2", text: "Stable with mild symptoms only?", critical: false },
  ],
];

const ESI_LABELS: Record<ESILevel, { label: string; color: string; targetMins: string }> = {
  1: { label: "Resuscitation", color: "var(--critical-fg)", targetMins: "Immediate" },
  2: { label: "Emergent", color: "#e67e22", targetMins: "<10 min" },
  3: { label: "Urgent", color: "#f1c40f", targetMins: "<30 min" },
  4: { label: "Less Urgent", color: "var(--normal-fg)", targetMins: "<60 min" },
  5: { label: "Non-Urgent", color: "var(--text-secondary)", targetMins: "<120 min" },
};

// ── Trauma Timer ──────────────────────────────────────────────────────────────

function useTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
  };
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => { stop(); setElapsed(0); };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return { elapsed, running, start, stop, reset };
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function EmergencyPage() {
  const [tab, setTab] = useState<"esi" | "trauma">("esi");

  // ESI state
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [level, setLevel] = useState<ESILevel | null>(null);

  const evaluateESI = () => {
    const aYes = ESI_PROTOCOL[0].filter((q) => answers[q.id]).length;
    if (aYes >= 1) setLevel(1);
    else {
      const bYes = ESI_PROTOCOL[1].filter((q) => answers[q.id]).length;
      if (bYes >= 1) setLevel(2);
      else {
        const cYes = ESI_PROTOCOL[2].filter((q) => answers[q.id]).length;
        if (cYes >= 2) setLevel(3);
        else {
          const dYes = ESI_PROTOCOL[3].filter((q) => answers[q.id]).length;
          setLevel(dYes >= 1 ? 4 : 5);
        }
      }
    }
  };

  const timer = useTimer();
  const traumaPhases = ["Arrival", "Primary Survey", "Resus", "Secondary Survey", "Imaging", "Disposition"];

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Timer size={24} className="text-[var(--action-primary)]" />
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Emergency Medicine</h1><p className="text-sm text-[var(--text-secondary)]">ESI triage scoring & trauma team timer</p></div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[{ id: "esi" as const, label: "ESI Triage", icon: AlertTriangle }, { id: "trauma" as const, label: "Trauma Timer", icon: Timer }].map((t) => {
          const Icon = t.icon;
          return <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}><Icon size={16} />{t.label}</button>;
        })}
      </div>

      {tab === "esi" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            {ESI_PROTOCOL.map((group, gi) => (
              <div key={gi} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
                <p className="text-xs font-semibold text-[var(--action-primary)] mb-2">Level {gi === 0 ? "1" : gi === 1 ? "2" : gi === 2 ? "3+" : "4/5"} Assessment</p>
                <div className="space-y-2">
                  {group.map((q) => (
                    <label key={q.id} className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" checked={!!answers[q.id]} onChange={() => setAnswers((p) => ({ ...p, [q.id]: !p[q.id] }))} className="mt-0.5 accent-[var(--action-primary)]" />
                      <span className="text-sm text-[var(--text-primary)] flex-1">{q.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={evaluateESI} className="rounded-lg bg-[var(--action-primary)] px-6 py-2 text-sm font-semibold text-white hover:opacity-90">Calculate ESI Level</button>
          </div>

          <div className="space-y-3">
            {([1, 2, 3, 4, 5] as ESILevel[]).map((l) => {
              const info = ESI_LABELS[l];
              const isActive = level === l;
              return (
                <div key={l} className={`rounded-xl border-2 p-4 ${isActive ? "bg-[var(--action-subtle)]" : "border-[var(--border-default)] bg-[var(--surface-raised)] opacity-50"}`} style={isActive ? { borderColor: info.color } : {}}>
                  <p className="text-2xl font-bold" style={{ color: isActive ? info.color : "var(--text-secondary)" }}>Level {l}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{info.label}</p>
                  <p className="text-xs text-[var(--text-secondary)]">Target: {info.targetMins}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "trauma" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8 text-center">
              <p className={`text-7xl font-bold tabular-nums font-mono ${timer.running ? "text-[var(--action-primary)]" : "text-[var(--text-secondary)]"}`}>{formatTime(timer.elapsed)}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Elapsed time since activation</p>
              <div className="flex justify-center gap-3 mt-4">
                {!timer.running ? <button onClick={timer.start} className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"><Play size={14} /> Start</button> : <button onClick={timer.stop} className="flex items-center gap-1.5 rounded-lg bg-[var(--warning-fg)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"><Square size={14} /> Stop</button>}
                <button onClick={timer.reset} className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><RotateCcw size={14} /> Reset</button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {traumaPhases.map((phase, i) => (
                <div key={phase} className={`rounded-lg border p-2 text-center ${timer.elapsed > 0 && i <= Math.floor(timer.elapsed / 120) ? "bg-[var(--normal-bg)] border-[var(--normal-fg)]" : "bg-[var(--surface-sunken)] border-[var(--border-subtle)]"}`}>
                  <p className="text-[9px] font-semibold text-[var(--text-secondary)]">{phase}</p>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{i * 2}:00</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-[var(--text-primary)]">Team Members</p>
            {["Team Lead", "Airway", "Chest", "IV Access", "Monitor/Recorder", "Runner", "Radiology", "Blood Bank"].map((r) => (
              <label key={r} className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 py-2 cursor-pointer hover:bg-[var(--surface-sunken)]">
                <input type="checkbox" className="accent-[var(--action-primary)]" />
                <span className="text-xs text-[var(--text-primary)]">{r}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
