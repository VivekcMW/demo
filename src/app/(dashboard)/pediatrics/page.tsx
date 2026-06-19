"use client";

import { useMemo, useState } from "react";
import { usePediatricsStore, type GrowthMetric } from "@/store/usePediatricsStore";
import GrowthChart from "@/components/GrowthChart";
import { Baby, Syringe, Activity, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

const STATUS_CONFIG: Record<string, { icon: React.ElementType; cls: string }> = {
  Given: { icon: CheckCircle2, cls: "text-[var(--normal-fg)]" },
  Due: { icon: Clock, cls: "text-[var(--info-fg)]" },
  Overdue: { icon: AlertTriangle, cls: "text-[var(--critical-fg)]" },
  Scheduled: { icon: Clock, cls: "text-[var(--text-secondary)]" },
  "Not Applicable": { icon: Activity, cls: "text-[var(--text-disabled)]" },
};

export default function PediatricsPage() {
  const children = usePediatricsStore((s) => s.children);
  const updateVaccination = usePediatricsStore((s) => s.updateVaccination);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [growthMetric, setGrowthMetric] = useState<GrowthMetric>("weight");
  const [showGiven, setShowGiven] = useState(true);

  const child = children[selectedIdx];
  const ageMonths = child ? (new Date().getTime() - new Date(child.dob).getTime()) / (1000 * 60 * 60 * 24 * 30.44) : 0;

  const dueVacs = useMemo(() => child?.vaccinations.filter((v) => v.status === "Due" || v.status === "Overdue") ?? [], [child]);
  const upcomingVacs = useMemo(() => child?.vaccinations.filter((v) => v.status === "Scheduled") ?? [], [child]);

  const filteredVacs = useMemo(() => {
    if (!child) return [];
    return child.vaccinations.filter((v) => showGiven || v.status !== "Given");
  }, [child, showGiven]);

  const handleGive = (childId: string, vacId: string, name: string) => {
    updateVaccination(childId, vacId, { status: "Given", givenAt: new Date().toISOString(), givenBy: "Dr. Current", batchNo: `BATCH-${Date.now()}` });
  };

  if (!child) return <div className="p-8 text-center text-[var(--text-secondary)]">No pediatric patients found.</div>;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Baby size={24} className="text-[var(--action-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Pediatrics</h1>
            <p className="text-sm text-[var(--text-secondary)]">Growth monitoring & vaccination schedule</p>
          </div>
        </div>
        {/* Patient selector */}
        <select value={selectedIdx} onChange={(e) => setSelectedIdx(Number(e.target.value))} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none">
          {children.map((c, i) => <option key={c.id} value={i}>{c.patientName} ({Math.round(ageMonths)} mo)</option>)}
        </select>
      </div>

      {/* Patient info card */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div><span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">DOB</span><p className="text-sm font-semibold text-[var(--text-primary)]">{child.dob}</p></div>
          <div><span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">Age</span><p className="text-sm font-semibold text-[var(--text-primary)]">{Math.floor(ageMonths)} months ({Math.floor(ageMonths / 12)}y {Math.floor(ageMonths % 12)}m)</p></div>
          <div><span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">Sex</span><p className="text-sm font-semibold text-[var(--text-primary)]">{child.sex === "M" ? "Male" : "Female"}</p></div>
          <div><span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">Birth Weight</span><p className="text-sm font-semibold text-[var(--text-primary)]">{child.birthWeight} kg</p></div>
          <div><span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">Last Recorded</span><p className="text-sm font-semibold text-[var(--text-primary)]">{child.growthRecords.length > 0 ? child.growthRecords[child.growthRecords.length - 1].date : "—"}</p></div>
        </div>
      </div>

      {/* Due alerts */}
      {dueVacs.length > 0 && (
        <div className="rounded-xl border border-[var(--critical-fg)] bg-[var(--critical-bg)] p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-[var(--critical-fg)]" />
            <p className="text-sm font-semibold text-[var(--critical-fg)]">{dueVacs.length} vaccination{dueVacs.length > 1 ? "s" : ""} due or overdue</p>
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {dueVacs.map((v) => <span key={v.id} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-[var(--critical-fg)]">{v.name}</span>)}
          </div>
        </div>
      )}

      {/* Growth charts */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Growth Charts</p>
          <div className="flex gap-1">
            {(["weight", "height", "headCircumference", "bmi"] as GrowthMetric[]).map((m) => (
              <button key={m} onClick={() => setGrowthMetric(m)} className={`rounded-lg px-2 py-1 text-[10px] font-medium ${growthMetric === m ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)]"}`}>
                {m === "weight" ? "Wt" : m === "height" ? "Ht" : m === "headCircumference" ? "HC" : "BMI"}
              </button>
            ))}
          </div>
        </div>
        <GrowthChart records={child.growthRecords} metric={growthMetric} sex={child.sex} maxAge={24} />
      </div>

      {/* Vaccination schedule */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Syringe size={16} className="text-[var(--action-primary)]" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">Vaccination Schedule</p>
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)] cursor-pointer">
            <input type="checkbox" checked={showGiven} onChange={() => setShowGiven((p) => !p)} className="accent-[var(--action-primary)]" />
            Show given
          </label>
        </div>

        <div className="space-y-1">
          {filteredVacs.map((v) => {
            const sc = STATUS_CONFIG[v.status];
            const Icon = sc.icon;
            return (
              <div key={v.id} className={`flex items-center justify-between rounded-lg border ${v.status === "Overdue" ? "border-[var(--critical-fg)] bg-[var(--critical-bg)]" : v.status === "Given" ? "border-[var(--normal-fg)] bg-[var(--normal-bg)]" : "border-[var(--border-default)] bg-[var(--surface-raised)]"} px-3 py-2`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon size={12} className={sc.cls} />
                    <p className="text-sm font-medium text-[var(--text-primary)]">{v.name}</p>
                    <span className="text-[10px] text-[var(--text-secondary)]">({v.dose} · {v.route})</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Due: {v.dueAge} · Site: {v.site}{v.givenAt ? ` · Given: ${new Date(v.givenAt).toLocaleDateString()}` : ""}{v.batchNo ? ` · Batch: ${v.batchNo}` : ""}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${sc.cls} bg-white/80`}>{v.status}</span>
                  {(v.status === "Due" || v.status === "Overdue") && (
                    <button onClick={() => handleGive(child.id, v.id, v.name)} className="rounded bg-[var(--normal-fg)] px-2 py-0.5 text-[9px] font-semibold text-white hover:opacity-80">
                      Give Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
