"use client";

import { useState, useMemo } from "react";
import { useSmallSpecialtyStore } from "@/store/useSmallSpecialtyStore";
import { Stethoscope } from "lucide-react";

export default function UrologyPage() {
  const { computeIPSS } = useSmallSpecialtyStore();
  const [answers, setAnswers] = useState([1, 0, 2, 0, 1, 0, 1]);
  const qs = [
    "Incomplete emptying",
    "Frequency",
    "Intermittency",
    "Urgency",
    "Weak stream",
    "Straining",
    "Nocturia",
  ];
  const labels = ["Not at all (0)", "< 1 in 5 (1)", "< half (2)", "~ half (3)", "> half (4)", "~ always (5)"];
  const nocturiaLabels = ["Zero (0)", "Once (1)", "Twice (2)", "3× (3)", "4× (4)", "5+ (5)"];

  const result = useMemo(() => computeIPSS({ incomplete: answers[0], frequency: answers[1], intermittency: answers[2], urgency: answers[3], weakStream: answers[4], straining: answers[5], nocturia: answers[6] }), [answers]);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Stethoscope size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Urology</h1><p className="text-sm text-[var(--text-secondary)]">IPSS — International Prostate Symptom Score</p></div></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
          <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Over the past month, how often have you…</p>
          {qs.map((q, i) => (
            <div key={i}>
              <p className="text-xs text-[var(--text-primary)] font-medium">{q}</p>
              <div className="mt-0.5 flex gap-1">
                {(i === 6 ? nocturiaLabels : labels).map((l, j) => (
                  <button key={j} onClick={() => setAnswers((a) => { const n = [...a]; n[i]=j; return n; })}
                    className={`h-8 flex-1 rounded text-[9px] font-medium leading-tight ${answers[i]===j ? "bg-[var(--action-primary)] text-white" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{l.split(" ")[0]}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border-2 border-[var(--action-primary)] bg-[var(--action-subtle)] p-6 text-center">
            <p className="text-xs font-medium text-[var(--text-secondary)]">IPSS Total Score</p>
            <p className="text-4xl font-bold text-[var(--text-primary)]">{result.score}/35</p>
            <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${result.severity === "Mild" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : result.severity === "Moderate" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{result.severity}</span>
            <p className="text-xs text-[var(--text-secondary)] mt-2">{result.severity === "Severe" ? "Severe symptoms — consider urology referral and treatment" : result.severity === "Moderate" ? "Moderate symptoms — offer medical therapy" : "Mild symptoms — watchful waiting or lifestyle advice"}</p>
          </div>

          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs font-semibold text-[var(--text-primary)] mb-2">Symptom Breakdown</p>
            <div className="space-y-1.5">
              {answers.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-24 text-[10px] text-[var(--text-secondary)] truncate">{qs[i]}</span>
                  <div className="flex-1 h-2 rounded-full bg-[var(--surface-sunken)]">
                    <div className="h-full rounded-full bg-[var(--action-primary)]" style={{ width: `${(a / 5) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-medium text-[var(--text-primary)] w-4 text-right">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
