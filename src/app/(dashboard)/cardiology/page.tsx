"use client";

import { useMemo } from "react";
import { useCardiologyStore } from "@/store/useCardiologyStore";
import { Heart, Activity } from "lucide-react";

export default function CardiologyPage() {
  const { echoReports, stressTests } = useCardiologyStore();

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Heart size={24} className="text-[var(--action-primary)]" />
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Cardiology</h1><p className="text-sm text-[var(--text-secondary)]">Echocardiography & stress test reporting</p></div>
      </div>

      {/* Echo section */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Echocardiogram Reports</p>
        {echoReports.map((e) => (
          <div key={e.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{e.patientName} <span className="text-xs font-normal text-[var(--text-secondary)]">({e.date} · {e.sonographer})</span></p>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                  {[
                    { label: "LVEF", value: `${e.lvef}% (${e.lvefMethod})` },
                    { label: "LVIDd/LVIDs", value: `${e.lvidD}/${e.lvidS} cm` },
                    { label: "IVSd/PWd", value: `${e.ivsd}/${e.pwd} cm` },
                    { label: "LA Vol Index", value: `${e.laVolumeIndexed} mL/m²` },
                    { label: "TAPSE", value: `${e.tapse} mm` },
                    { label: "RVSP", value: e.rvsp ? `${e.rvsp} mmHg` : "—" },
                  ].map((m) => <div key={m.label} className="rounded bg-[var(--surface-sunken)] p-1.5"><p className="text-[9px] font-medium text-[var(--text-secondary)]">{m.label}</p><p className="font-semibold text-[var(--text-primary)]">{m.value}</p></div>)}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">{[e.aorticValve, e.mitralValve, e.tricuspidValve, e.pulmonicValve].map((v, i) => { const n = ["Aortic","Mitral","Tricuspid","Pulmonic"][i]; return <span key={n} className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${v === "Normal" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{n}: {v}</span>; })}</div>
                <p className="mt-2 text-xs font-medium text-[var(--action-primary)]">{e.conclusion}</p>
                {e.recommendations && <p className="text-xs text-[var(--text-secondary)] italic mt-1">{e.recommendations}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stress test section */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Stress Tests</p>
        {stressTests.map((s) => (
          <div key={s.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{s.patientName} <span className="text-xs font-normal text-[var(--text-secondary)]">({s.date} · {s.protocol})</span></p>
                <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                  <div className="rounded bg-[var(--surface-sunken)] p-1.5"><p className="text-[9px] font-medium text-[var(--text-secondary)]">Duration</p><p className="font-semibold">{Math.floor(s.duration / 60)}:{String(s.duration % 60).padStart(2,"0")} min</p></div>
                  <div className="rounded bg-[var(--surface-sunken)] p-1.5"><p className="text-[9px] font-medium text-[var(--text-secondary)]">Max HR</p><p className="font-semibold text-[var(--text-primary)]">{s.maxHr}/{s.targetHr} ({s.achievedPct}%)</p></div>
                  <div className="rounded bg-[var(--surface-sunken)] p-1.5"><p className="text-[9px] font-medium text-[var(--text-secondary)]">BP</p><p className="font-semibold">{s.restingBP} → {s.maxBP}</p></div>
                  <div className="rounded bg-[var(--surface-sunken)] p-1.5"><p className="text-[9px] font-medium text-[var(--text-secondary)]">Duke Score</p><p className={`font-semibold ${s.dukeTreadmillScore && s.dukeTreadmillScore < 5 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>{s.dukeTreadmillScore ?? "—"}</p></div>
                </div>
                <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium ${s.ecgResponse.includes("Normal") ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{s.ecgResponse}</span>
                {s.arrhythmias && <span className="ml-1 rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[9px] font-medium text-[var(--critical-fg)]">{s.arrhythmias}</span>}
                <p className="mt-2 text-xs text-[var(--text-primary)]">{s.conclusion}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${s.functionalCapacity === "Excellent" || s.functionalCapacity === "Good" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>{s.functionalCapacity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
