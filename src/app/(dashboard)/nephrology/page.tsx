"use client";

import { useState, useMemo } from "react";
import { useNephrologyStore } from "@/store/useNephrologyStore";
import { TrendingDown, Droplets, Activity, Beaker } from "lucide-react";

export default function NephrologyPage() {
  const dialysisSessions = useNephrologyStore((s) => s.dialysisSessions);
  const ckdStages = useNephrologyStore((s) => s.ckdStages);
  const [tab, setTab] = useState<"dialysis" | "ckd">("dialysis");
  const [ktvPre, setKtvPre] = useState(100);
  const [ktvPost, setKtvPost] = useState(35);
  const [ktvPreWt, setKtvPreWt] = useState(70);
  const [ktvPostWt, setKtvPostWt] = useState(67);

  const avgUf = useMemo(() => {
    const completed = dialysisSessions.filter((s) => s.status === "Completed");
    if (completed.length === 0) return 0;
    return completed.reduce((s, d) => s + d.ufAchieved, 0) / completed.length;
  }, [dialysisSessions]);

  const ktv = useMemo(() => {
    const rr = ktvPost / ktvPre;
    const uf = (ktvPreWt - ktvPostWt) / ktvPostWt;
    const val = -Math.log(rr - 0.008) + (4 - 3.5 * rr) * uf;
    return { val: Math.round(val * 100) / 100, rr: Math.round(rr * 100), urr: Math.round((1 - rr) * 100) };
  }, [ktvPre, ktvPost, ktvPreWt, ktvPostWt]);

  // CKD staging graph SVG
  const ckdSvg = (
    <svg viewBox="0 0 600 250" className="w-full h-auto">
      {[{ y: 20, stage: "1", egfr: 110 }, { y: 65, stage: "2", egfr: 75 }, { y: 108, stage: "3a", egfr: 52 }, { y: 148, stage: "3b", egfr: 38 }, { y: 188, stage: "4", egfr: 22 }, { y: 225, stage: "5", egfr: 8 }].map((s) => (
        <g key={s.stage}>
          <line x1={40} y1={s.y} x2={550} y2={s.y} stroke="#eee" strokeWidth={0.5} />
          <text x={38} y={s.y + 3} textAnchor="end" fontSize={8} fill="#555">Stage {s.stage}</text>
          <text x={42} y={s.y + 3} fontSize={7} fill="#999">({s.egfr})</text>
        </g>
      ))}
      {/* GFR range bands */}
      <rect x={40} y={20} width={510} height={45} fill="#27ae60" opacity={0.08} rx={2} />
      <rect x={40} y={65} width={510} height={43} fill="#2d6a9f" opacity={0.08} rx={2} />
      <rect x={40} y={108} width={510} height={40} fill="#e67e22" opacity={0.08} rx={2} />
      <rect x={40} y={148} width={510} height={40} fill="#e74c3c" opacity={0.08} rx={2} />
      <rect x={40} y={188} width={510} height={37} fill="#c0392b" opacity={0.12} rx={2} />
      <rect x={40} y={225} width={510} height={25} fill="#7b241c" opacity={0.15} rx={2} />
      {/* Patient trajectory */}
      {ckdStages.length > 1 && (
        <polyline points={ckdStages.map((c, i) => `${40 + (i / (ckdStages.length - 1)) * 510},${20 + (1 - (c.egfr - 5) / 115) * 230}`).join(" ")} fill="none" stroke="var(--critical-fg)" strokeWidth={2} strokeLinejoin="round" />
      )}
      {ckdStages.map((c, i) => (
        <g key={i}>
          <circle cx={40 + (i / (ckdStages.length - 1)) * 510} cy={20 + (1 - (c.egfr - 5) / 115) * 230} r={4} fill="white" stroke="var(--critical-fg)" strokeWidth={2} />
          <title>{c.date}: eGFR {c.egfr}, Creat {c.creatinine}</title>
        </g>
      ))}
      <text x={300} y={248} textAnchor="middle" fontSize={7} fill="#888">Time →</text>
      <text x={5} y={120} fontSize={7} fill="#888" transform="rotate(-90, 5, 120)">eGFR (mL/min)</text>
    </svg>
  );

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Activity size={24} className="text-[var(--action-primary)]" />
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Nephrology</h1>
          <p className="text-sm text-[var(--text-secondary)]">Dialysis management, Kt/V calculator & CKD staging</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[{ id: "dialysis" as const, label: "Dialysis", icon: Droplets }, { id: "ckd" as const, label: "CKD Staging", icon: TrendingDown }].map((t) => {
          const Icon = t.icon;
          return <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}><Icon size={16} />{t.label}</button>;
        })}
      </div>

      {/* ── DIALYSIS TAB ── */}
      {tab === "dialysis" && (
        <div className="space-y-4">
          {/* Kt/V calculator */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Kt/V & URR Calculator (Daugirdas II)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {[
                { label: "Pre-UN (mg/dL)", v: ktvPre, set: setKtvPre },
                { label: "Post-UN (mg/dL)", v: ktvPost, set: setKtvPost },
                { label: "Pre-Wt (kg)", v: ktvPreWt, set: setKtvPreWt },
                { label: "Post-Wt (kg)", v: ktvPostWt, set: setKtvPostWt },
              ].map((f) => (
                <div key={f.label}><label className="text-[10px] font-medium text-[var(--text-secondary)]">{f.label}</label><input type="number" value={f.v} onChange={(e) => f.set(parseFloat(e.target.value) || 0)} className="mt-0.5 w-full rounded-lg border border-[var(--border-default)] bg-white px-2 py-1.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" /></div>
              ))}
            </div>
            <div className="flex gap-6 text-sm">
              <p><span className="text-[var(--text-secondary)]">Kt/V: </span><span className={`font-bold ${ktv.val >= 1.2 ? "text-[var(--normal-fg)]" : "text-[var(--critical-fg)]"}`}>{ktv.val}</span> {ktv.val >= 1.2 ? <span className="text-[var(--normal-fg)] text-[10px]">(Adequate)</span> : <span className="text-[var(--critical-fg)] text-[10px]">(Below target)</span>}</p>
              <p><span className="text-[var(--text-secondary)]">URR: </span><span className={`font-bold ${ktv.urr >= 65 ? "text-[var(--normal-fg)]" : "text-[var(--critical-fg)]"}`}>{ktv.urr}%</span></p>
              <p><span className="text-[var(--text-secondary)]">RR: </span><span className="font-bold text-[var(--text-primary)]">{ktv.rr}%</span></p>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">Completed Sessions</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{dialysisSessions.filter((s) => s.status === "Completed").length}</p>
            </div>
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">Avg UF Achieved</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{avgUf.toFixed(1)} <span className="text-xs font-normal text-[var(--text-secondary)]">L</span></p>
            </div>
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">Avg Duration</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{Math.round(dialysisSessions.reduce((s, d) => s + d.durationMinutes, 0) / dialysisSessions.length)} <span className="text-xs font-normal text-[var(--text-secondary)]">min</span></p>
            </div>
          </div>

          {/* Session list */}
          <div className="space-y-2">
            {dialysisSessions.map((s) => (
              <div key={s.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{s.patientName}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${s.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : s.status === "Scheduled" ? "bg-[var(--info-bg)] text-[var(--info-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{s.status}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{s.date} · {s.durationMinutes} min · Pre: {s.preBp} / Post: {s.postBp} · UF: {s.ufAchieved}/{s.ufTarget}L</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-[10px] text-[var(--text-secondary)]">
                      <span>{s.accessType} ({s.accessSite})</span>
                      <span>QB {s.qb} · QD {s.qd}</span>
                      <span>K⁺ {s.dialysateK} · Ca²⁺ {s.dialysateCa}</span>
                      {s.ktv && <span className={`font-semibold ${s.ktv >= 1.2 ? "text-[var(--normal-fg)]" : "text-[var(--critical-fg)]"}`}>Kt/V {s.ktv}</span>}
                      {s.complications && <span className="text-[var(--warning-fg)]">⚠ {s.complications}</span>}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{s.preWeight - s.postWeight} <span className="text-xs font-normal text-[var(--text-secondary)]">kg loss</span></p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{s.nurse}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CKD TAB ── */}
      {tab === "ckd" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">CKD Progression</p>
            {ckdSvg}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-[var(--surface-sunken)]">
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Date</th>
                  <th className="px-2 py-1.5 text-right font-medium text-[var(--text-secondary)]">eGFR</th>
                  <th className="px-2 py-1.5 text-right font-medium text-[var(--text-secondary)]">Creatinine</th>
                  <th className="px-2 py-1.5 text-center font-medium text-[var(--text-secondary)]">Stage</th>
                  <th className="px-2 py-1.5 text-center font-medium text-[var(--text-secondary)]">Albuminuria</th>
                </tr>
              </thead>
              <tbody>
                {ckdStages.map((c, i) => (
                  <tr key={i} className="border-t border-[var(--border-subtle)]">
                    <td className="px-2 py-1 text-[var(--text-primary)]">{c.date}</td>
                    <td className={`px-2 py-1 text-right font-semibold ${c.egfr < 30 ? "text-[var(--critical-fg)]" : c.egfr < 60 ? "text-[var(--warning-fg)]" : "text-[var(--normal-fg)]"}`}>{c.egfr}</td>
                    <td className="px-2 py-1 text-right text-[var(--text-primary)]">{c.creatinine}</td>
                    <td className="px-2 py-1 text-center"><span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${c.stage >= 4 ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]" : c.stage >= 3 ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--info-bg)] text-[var(--info-fg)]"}`}>Stage {c.stageLabel}</span></td>
                    <td className="px-2 py-1 text-center text-[var(--text-primary)]">{c.albuminuria || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
