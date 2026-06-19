"use client";

import { useState } from "react";
import { useOBGYNStore, type FetalMeasurement } from "@/store/useOBGYNStore";
import PartographChart from "@/components/PartographChart";
import CTGViewer from "@/components/CTGViewer";
import FetalGrowthChart from "@/components/FetalGrowthChart";
import { Baby, Activity, HeartPulse, BarChart3 } from "lucide-react";

type Tab = "partograph" | "ctg" | "growth";

export default function OBGYNPage() {
  const partographs = useOBGYNStore((s) => s.partographs);
  const ctgTraces = useOBGYNStore((s) => s.ctgTraces);
  const fetalGrowth = useOBGYNStore((s) => s.fetalGrowth);
  const [tab, setTab] = useState<Tab>("partograph");
  const [growthMetric, setGrowthMetric] = useState<FetalMeasurement>("AC");

  const ptg = partographs[0];
  const ctg = ctgTraces[0];

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "partograph", label: "Partograph", icon: Activity },
    { id: "ctg", label: "CTG Trace", icon: HeartPulse },
    { id: "growth", label: "Fetal Growth", icon: BarChart3 },
  ];

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Baby size={24} className="text-[var(--action-primary)]" />
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Obstetrics & Gynaecology</h1>
          <p className="text-sm text-[var(--text-secondary)]">Labor monitoring, CTG interpretation & fetal growth assessment</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              <Icon size={16} />
              {t.label}
              {t.badge && <span className="rounded-full bg-[var(--action-subtle)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--action-primary)]">{t.badge}</span>}
            </button>
          );
        })}
      </div>

      {/* Partograph Tab */}
      {tab === "partograph" && ptg && <PartographChart ptg={ptg} />}

      {/* CTG Tab */}
      {tab === "ctg" && ctg && <CTGViewer ctg={ctg} />}

      {/* Fetal Growth Tab */}
      {tab === "growth" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {(["BPD", "HC", "AC", "FL", "EFW"] as FetalMeasurement[]).map((m) => (
              <button key={m} onClick={() => setGrowthMetric(m)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${growthMetric === m ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>
                {m === "EFW" ? "EFW (g)" : m}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--border-default)] bg-white p-3">
            <FetalGrowthChart records={fetalGrowth} metric={growthMetric} />
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--border-default)]">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-[var(--surface-sunken)]">
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Date</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">Weeks</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">BPD</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">HC</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">AC</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">FL</th>
                  <th className="px-2 py-1.5 text-left font-medium text-[var(--text-secondary)]">EFW</th>
                </tr>
              </thead>
              <tbody>
                {fetalGrowth.map((r, i) => (
                  <tr key={i} className="border-t border-[var(--border-subtle)]">
                    <td className="px-2 py-1 text-[var(--text-primary)]">{r.date}</td>
                    <td className="px-2 py-1 font-semibold text-[var(--text-primary)]">{r.gestationWeeks}</td>
                    <td className="px-2 py-1 text-[var(--text-primary)]">{r.bpd ?? "—"}</td>
                    <td className="px-2 py-1 text-[var(--text-primary)]">{r.hc ?? "—"}</td>
                    <td className="px-2 py-1 text-[var(--text-primary)]">{r.ac ?? "—"}</td>
                    <td className="px-2 py-1 text-[var(--text-primary)]">{r.fl ?? "—"}</td>
                    <td className="px-2 py-1 font-semibold text-[var(--action-primary)]">{r.efw ?? "—"}</td>
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
