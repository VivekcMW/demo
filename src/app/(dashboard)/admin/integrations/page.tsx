"use client";

import { useState, useMemo } from "react";
import {
  Plug, Wifi, WifiOff, AlertTriangle, RefreshCw, Plus, X, CheckCircle2,
  Clock, ExternalLink, FileText, List,
} from "lucide-react";
import Link from "next/link";

interface Endpoint {
  id: string;
  name: string;
  type: string;
  url: string;
  status: "connected" | "disconnected" | "error";
  lastTested: string;
  errorCount: number;
}

const DEFAULT_ENDPOINTS: Endpoint[] = [
  { id: "ep-1", name: "LIS", type: "LIS", url: "https://lis.aarogya.internal/api", status: "connected", lastTested: "2026-06-19T14:30:00Z", errorCount: 0 },
  { id: "ep-2", name: "RIS", type: "RIS", url: "https://ris.aarogya.internal/api", status: "connected", lastTested: "2026-06-19T14:25:00Z", errorCount: 1 },
  { id: "ep-3", name: "PACS", type: "PACS", url: "https://pacs.aarogya.internal/dicomweb", status: "disconnected", lastTested: "2026-06-18T09:00:00Z", errorCount: 5 },
  { id: "ep-4", name: "ABDM", type: "ABDM", url: "https://abdm.sandbox.in/api/v1", status: "connected", lastTested: "2026-06-19T12:00:00Z", errorCount: 0 },
  { id: "ep-5", name: "HL7 Gateway", type: "HL7", url: "https://hl7.aarogya.internal/v2", status: "error", lastTested: "2026-06-19T10:00:00Z", errorCount: 12 },
];

interface LogEntry {
  id: string;
  source: string;
  status: "success" | "error";
  endpoint: string;
  message: string;
  timestamp: string;
  requestBody?: string;
  responseBody?: string;
}

const MOCK_LOGS: LogEntry[] = [
  { id: "log-1", source: "HL7", status: "success", endpoint: "HL7 Gateway", message: "ADT^A01 message processed", timestamp: "2026-06-19T14:30:00Z", requestBody: "MSH|...|ADT^A01|...", responseBody: "ACK|..." },
  { id: "log-2", source: "FHIR", status: "success", endpoint: "LIS", message: "Patient resource created", timestamp: "2026-06-19T14:28:00Z" },
  { id: "log-3", source: "DICOM", status: "error", endpoint: "PACS", message: "STOW-RS timeout after 30s", timestamp: "2026-06-19T14:00:00Z", requestBody: "DICOM dataset (2.1 MB)", responseBody: "HTTP 504 Gateway Timeout" },
  { id: "log-4", source: "ABDM", status: "success", endpoint: "ABDM", message: "Consent granted for PAT-0001", timestamp: "2026-06-19T13:45:00Z" },
  { id: "log-5", source: "HL7", status: "error", endpoint: "HL7 Gateway", message: "ORU^R01 parse failure: invalid segment", timestamp: "2026-06-19T13:30:00Z", requestBody: "MSH|...|ORU^R01|...", responseBody: "AE|..." },
  { id: "log-6", source: "FHIR", status: "success", endpoint: "RIS", message: "DiagnosticReport updated", timestamp: "2026-06-19T13:00:00Z" },
  { id: "log-7", source: "DICOM", status: "success", endpoint: "PACS", message: "WADO-RS retrieve study 1.2.840...", timestamp: "2026-06-19T12:30:00Z" },
  { id: "log-8", source: "ABDM", status: "error", endpoint: "ABDM", message: "Token refresh failed", timestamp: "2026-06-19T12:00:00Z" },
  { id: "log-9", source: "HL7", status: "success", endpoint: "HL7 Gateway", message: "SIU^S12 appointment scheduled", timestamp: "2026-06-19T11:00:00Z" },
  { id: "log-10", source: "FHIR", status: "error", endpoint: "LIS", message: "Validation error: missing identifier", timestamp: "2026-06-19T10:30:00Z" },
];

const STATUS_ICON: Record<string, React.ReactNode> = {
  connected: <Wifi size={16} className="text-[var(--normal-fg)]" />,
  disconnected: <WifiOff size={16} className="text-[var(--text-secondary)]" />,
  error: <AlertTriangle size={16} className="text-[var(--critical-fg)]" />,
};

const STATUS_CLS: Record<string, string> = {
  connected: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  disconnected: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  error: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function AddEndpointModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("HL7");
  const [url, setUrl] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-[var(--surface-raised)] border border-[var(--border-default)] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Add Integration Endpoint</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Endpoint Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. PACS Production" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option>HL7</option><option>FHIR</option><option>DICOM</option><option>ABDM</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Base URL</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <Plus size={16} /> Add Endpoint
          </button>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(DEFAULT_ENDPOINTS);
  const [showAdd, setShowAdd] = useState(false);

  function testConnection(id: string) {
    setEndpoints((prev) => prev.map((ep) => ep.id === id ? { ...ep, lastTested: new Date().toISOString(), status: "connected" as const, errorCount: 0 } : ep));
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Integration Management</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Configure and monitor external system integrations</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/integrations/logs" className="flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <List size={14} /> Logs
          </Link>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]">
            <Plus size={14} /> Add Endpoint
          </button>
        </div>
      </div>

      {/* Endpoint cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {endpoints.map((ep) => (
          <div key={ep.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plug size={16} className="text-[var(--action-primary)]" />
                <span className="font-medium text-sm text-[var(--text-primary)]">{ep.name}</span>
                <span className="rounded bg-[var(--action-subtle)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--action-primary)]">{ep.type}</span>
              </div>
              <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLS[ep.status]}`}>
                {STATUS_ICON[ep.status]}
                {ep.status.charAt(0).toUpperCase() + ep.status.slice(1)}
              </div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] truncate">{ep.url}</p>
            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
              <span className="flex items-center gap-1"><Clock size={11} />Last tested: {fmtTime(ep.lastTested)}</span>
              {ep.errorCount > 0 && <span className="text-[var(--critical-fg)]">{ep.errorCount} error{ep.errorCount > 1 ? "s" : ""}</span>}
            </div>
            <button onClick={() => testConnection(ep.id)} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--action-primary)] hover:border-[var(--action-primary)]">
              <RefreshCw size={12} /> Test Connection
            </button>
          </div>
        ))}
      </div>

      {/* Sync status overview */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <ExternalLink size={16} className="text-[var(--action-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Sync Status Overview</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Active Syncing", value: "3", cls: "text-[var(--normal-fg)]" },
            { label: "Pending Retry", value: "1", cls: "text-[var(--warning-fg)]" },
            { label: "Failed", value: "2", cls: "text-[var(--critical-fg)]" },
            { label: "Last Sync", value: "2 min ago", cls: "text-[var(--text-secondary)]" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-[var(--surface-sunken)] p-3">
              <p className={`text-2xl font-bold ${s.cls}`}>{s.value}</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent integration log preview */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[var(--action-primary)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">Integration Log</span>
          </div>
          <Link href="/admin/integrations/logs" className="text-xs font-medium text-[var(--action-primary)] hover:underline">View all</Link>
        </div>
        <div className="space-y-2">
          {MOCK_LOGS.slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-lg bg-[var(--surface-sunken)] px-3 py-2">
              <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${l.status === "success" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{l.status.toUpperCase()}</span>
              <span className="rounded bg-[var(--action-subtle)] px-1 py-0.5 text-[9px] font-medium text-[var(--action-primary)]">{l.source}</span>
              <span className="text-xs text-[var(--text-primary)] flex-1 truncate">{l.message}</span>
              <span className="text-[10px] text-[var(--text-secondary)] shrink-0">{fmtTime(l.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>

      {showAdd && <AddEndpointModal onClose={() => setShowAdd(false)} />}
    </>
  );
}
