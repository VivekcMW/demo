"use client";

import { useState, useMemo } from "react";
import { ScanLine, Wifi, WifiOff, Search, Filter, Eye, Calendar, User, Activity, HardDrive } from "lucide-react";

interface Study {
  studyUid: string;
  patientId: string;
  patientName: string;
  studyDescription: string;
  studyDate: string;
  modality: string;
  seriesCount: number;
  instanceCount: number;
}

const MOCK_STUDIES: Study[] = [
  { studyUid: "1.2.840.113619.2.55.3.2831214267.1234.1", patientId: "PAT-0001", patientName: "Rajesh Kumar", studyDescription: "Chest CT - Routine Follow-up", studyDate: "2026-06-15", modality: "CT", seriesCount: 3, instanceCount: 120 },
  { studyUid: "1.2.840.113619.2.55.3.2831214267.1235.1", patientId: "PAT-0002", patientName: "Priya Sharma", studyDescription: "MRI Brain - Post Contrast", studyDate: "2026-06-14", modality: "MR", seriesCount: 5, instanceCount: 240 },
  { studyUid: "1.2.840.113619.2.55.3.2831214267.1236.1", patientId: "PAT-0003", patientName: "Anil Verma", studyDescription: "X-Ray Chest PA View", studyDate: "2026-06-13", modality: "DX", seriesCount: 1, instanceCount: 2 },
  { studyUid: "1.2.840.113619.2.55.3.2831214267.1237.1", patientId: "PAT-0001", patientName: "Rajesh Kumar", studyDescription: "Abdominal Ultrasound", studyDate: "2026-06-12", modality: "US", seriesCount: 4, instanceCount: 60 },
  { studyUid: "1.2.840.113619.2.55.3.2831214267.1238.1", patientId: "PAT-0004", patientName: "Sunita Patel", studyDescription: "Mammography Screening", studyDate: "2026-06-11", modality: "MG", seriesCount: 2, instanceCount: 8 },
];

const MODALITIES = ["CT", "MR", "DX", "US", "MG", "XA", "NM", "CR"];

export default function DICOMViewerPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [modalityFilter, setModalityFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [connected] = useState(true);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const filtered = useMemo(() => {
    return MOCK_STUDIES.filter((s) => {
      const q = patientSearch.toLowerCase();
      if (q && !s.patientName.toLowerCase().includes(q) && !s.patientId.toLowerCase().includes(q) && !s.studyDescription.toLowerCase().includes(q)) return false;
      if (modalityFilter && s.modality !== modalityFilter) return false;
      if (dateFrom && s.studyDate < dateFrom) return false;
      if (dateTo && s.studyDate > dateTo) return false;
      return true;
    });
  }, [patientSearch, modalityFilter, dateFrom, dateTo]);

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ScanLine size={24} className="text-[var(--action-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">DICOM Viewer</h1>
            <p className="text-sm text-[var(--text-secondary)]">Medical imaging — PACS integration</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${connected ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>
          {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
          {connected ? "PACS Connected" : "Disconnected"}
        </div>
      </div>

      {/* Search / Filter bar */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px] space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Search patients or studies</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} placeholder="Name, ID, or description…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Modality</label>
            <select value={modalityFilter} onChange={(e) => setModalityFilter(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="">All modalities</option>
              {MODALITIES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Study list */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)]">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-[var(--action-primary)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">Studies</span>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="divide-y divide-[var(--border-default)] max-h-[600px] overflow-y-auto">
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <ScanLine size={32} className="mx-auto mb-2 text-[var(--text-secondary)] opacity-30" />
                <p className="text-sm text-[var(--text-secondary)]">No studies match your filters</p>
              </div>
            )}
            {filtered.map((study) => (
              <div key={study.studyUid} onClick={() => setSelectedStudy(study)} className={`px-4 py-3 cursor-pointer transition-colors hover:bg-[var(--surface-sunken)] ${selectedStudy?.studyUid === study.studyUid ? "bg-[var(--action-subtle)]" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[var(--action-subtle)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--action-primary)]">{study.modality}</span>
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{study.studyDescription}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--text-secondary)]">
                      <span className="flex items-center gap-1"><User size={12} />{study.patientName}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />{study.studyDate}</span>
                      <span>{study.seriesCount} series · {study.instanceCount} instances</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)]">{study.patientId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          {selectedStudy ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[var(--action-primary)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">Study Details</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Patient</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.patientName}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">ID</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.patientId}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Modality</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.modality}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Date</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.studyDate}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Description</span><span className="font-medium text-[var(--text-primary)] text-right max-w-[200px]">{selectedStudy.studyDescription}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Series</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.seriesCount}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Instances</span><span className="font-medium text-[var(--text-primary)]">{selectedStudy.instanceCount}</span></div>
                <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Study UID</span><span className="font-mono text-[10px] text-[var(--text-primary)] break-all max-w-[200px] text-right">{selectedStudy.studyUid}</span></div>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
                <Eye size={16} /> Launch Viewer
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <HardDrive size={36} className="mb-2 text-[var(--text-secondary)] opacity-30" />
              <p className="text-sm font-medium text-[var(--text-primary)]">Select a study</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Click a study to view details and launch the Cornerstone3D viewer.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
