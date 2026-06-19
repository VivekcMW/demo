"use client";

import { ScanLine, Info, HardDrive, Wifi, WifiOff } from "lucide-react";

export default function DICOMViewerPage() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <ScanLine size={24} className="text-[var(--action-primary)]" />
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">DICOM Viewer</h1>
          <p className="text-sm text-[var(--text-secondary)]">Medical imaging viewer — PACS integration</p>
        </div>
      </div>

      {/* Status card */}
      <div className="rounded-xl border-2 border-[var(--warning-fg)] bg-[var(--warning-bg)] p-4 flex items-center gap-3">
        <WifiOff size={20} className="shrink-0 text-[var(--warning-fg)]" />
        <div>
          <p className="text-sm font-semibold text-[var(--warning-fg)]">PACS Backend Not Connected</p>
          <p className="text-xs text-[var(--text-primary)]">This viewer requires a DICOMweb-compatible PACS server. Configure the endpoint in Settings &gt; Integrations.</p>
        </div>
      </div>

      {/* Architecture overview */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <div className="flex items-center gap-2 mb-4"><Info size={18} className="text-[var(--action-primary)]" /><p className="text-sm font-semibold text-[var(--text-primary)]">Architecture & Integration</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[var(--text-secondary)]">
          <div className="space-y-2 p-3 rounded-lg bg-[var(--surface-sunken)]">
            <HardDrive size={20} className="text-[var(--action-primary)]" />
            <p className="font-medium text-[var(--text-primary)]">DICOMweb QIDO-RS</p>
            <p>Query studies/series/instances via REST. Supports modality, date range, patient ID filters.</p>
          </div>
          <div className="space-y-2 p-3 rounded-lg bg-[var(--surface-sunken)]">
            <ScanLine size={20} className="text-[var(--action-primary)]" />
            <p className="font-medium text-[var(--text-primary)]">Cornerstone.js Rendering</p>
            <p>Zero-footprint DICOM rendering in browser using Cornerstone3D. Supports CT, MR, XA, US, NM.</p>
          </div>
          <div className="space-y-2 p-3 rounded-lg bg-[var(--surface-sunken)]">
            <Wifi size={20} className="text-[var(--action-primary)]" />
            <p className="font-medium text-[var(--text-primary)]">WADO-RS & STOW-RS</p>
            <p>Retrieve and store instances via DICOMweb. Multi-frame, 4D, segmentation support planned.</p>
          </div>
        </div>
      </div>

      {/* Study browser placeholder */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Study Browser</p>
        <p className="text-xs text-[var(--text-secondary)] mb-4">Patient studies will appear here when connected to a PACS server.</p>
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-[var(--border-default)] rounded-lg">
          <ScanLine size={48} className="mb-3 text-[var(--text-secondary)] opacity-20" />
          <p className="text-sm font-medium text-[var(--text-primary)]">No Studies Loaded</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-md">
            Search by patient ID, study date, or modality. Supports CT, MR, X-Ray, Ultrasound, and Nuclear Medicine.
          </p>
        </div>
      </div>

      {/* Supported modalities */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Supported Modalities</p>
        <div className="flex flex-wrap gap-2">
          {[
            { code: "CT", name: "Computed Tomography" },
            { code: "MR", name: "Magnetic Resonance" },
            { code: "DX", name: "Digital Radiography" },
            { code: "US", name: "Ultrasound" },
            { code: "XA", name: "X-Ray Angiography" },
            { code: "NM", name: "Nuclear Medicine" },
            { code: "MG", name: "Mammography" },
            { code: "CR", name: "Computed Radiography" },
          ].map((m) => (
            <div key={m.code} className="rounded-lg border border-[var(--border-default)] bg-[var(--action-subtle)] px-3 py-2 text-center">
              <p className="text-sm font-bold text-[var(--action-primary)]">{m.code}</p>
              <p className="text-[9px] text-[var(--text-secondary)]">{m.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration steps */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-2">Integration Checklist</p>
        <div className="space-y-2 text-xs text-[var(--text-secondary)]">
          {[
            "1. Configure DICOMweb QIDO-RS / WADO-RS endpoint URL in Settings",
            "2. Set authentication (API key or OAuth 2.0 client credentials)",
            "3. Map modalities to department rooms for auto-routing",
            "4. Install Cornerstone3D via npm (cornerstone-tools, cornerstone-math)",
            "5. Enable study/series prefetching for faster load times",
            "6. Configure HL7 ORU^R01 feed for auto-populating radiology reports",
          ].map((step, i) => (
            <p key={i} className="text-[var(--text-primary)]">{step}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
