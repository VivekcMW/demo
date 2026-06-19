"use client";

import { useState, useMemo } from "react";
import { useECGStore } from "@/store/useECGStore";
import ECGViewer from "@/components/ECGViewer";
import { HeartPulse, ChevronLeft, ChevronRight } from "lucide-react";

export default function ECGPage() {
  const records = useECGStore((s) => s.records);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selected = records[selectedIdx];

  const grouped = useMemo(() => {
    const map = new Map<string, { patientId: string; patientName: string; count: number }>();
    for (const r of records) {
      const k = r.patientId;
      if (!map.has(k)) map.set(k, { patientId: r.patientId, patientName: r.patientName, count: 0 });
      map.get(k)!.count++;
    }
    return Array.from(map.values());
  }, [records]);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <HeartPulse size={24} className="text-[var(--action-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">ECG Viewer</h1>
            <p className="text-sm text-[var(--text-secondary)]">12-lead electrocardiogram review</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSelectedIdx((p) => Math.max(0, p - 1))} disabled={selectedIdx === 0} className="rounded-lg border border-[var(--border-default)] p-2 text-[var(--text-secondary)] disabled:opacity-30 hover:bg-[var(--surface-sunken)]"><ChevronLeft size={16} /></button>
          <span className="text-xs font-medium text-[var(--text-secondary)] tabular-nums">{selectedIdx + 1} / {records.length}</span>
          <button onClick={() => setSelectedIdx((p) => Math.min(records.length - 1, p + 1))} disabled={selectedIdx === records.length - 1} className="rounded-lg border border-[var(--border-default)] p-2 text-[var(--text-secondary)] disabled:opacity-30 hover:bg-[var(--surface-sunken)]"><ChevronRight size={16} /></button>
        </div>
      </div>

      {!selected && (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border-default)] p-12">
          <p className="text-sm text-[var(--text-secondary)]">No ECG records available.</p>
        </div>
      )}

      {selected && <ECGViewer ecg={selected} />}

      {records.length > 1 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">All Recordings</p>
          <div className="space-y-1">
            {records.map((r, i) => (
              <button key={r.id} onClick={() => setSelectedIdx(i)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${i === selectedIdx ? "bg-[var(--action-subtle)] text-[var(--action-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>
                <span className="font-medium">{r.patientName}</span>
                <span className="text-xs">{new Date(r.recordedAt).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
