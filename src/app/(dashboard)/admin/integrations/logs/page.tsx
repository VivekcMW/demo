"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";

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
  { id: "log-1", source: "HL7", status: "success", endpoint: "HL7 Gateway", message: "ADT^A01 message processed", timestamp: "2026-06-19T14:30:00Z", requestBody: "MSH|^~\\&|SENDING|SENDER|RECV|RECVER|202606191430||ADT^A01|MSG001|P|2.5\rEVN|A01|202606191430\rPID|1||PAT-0001||Kumar^Rajesh||19800512|M", responseBody: "MSH|^~\\&|RECV|RECVER|SENDING|SENDER|202606191430||ACK|ACK001|P|2.5\rMSA|AA|MSG001" },
  { id: "log-2", source: "FHIR", status: "success", endpoint: "LIS", message: "Patient resource created via $export import", timestamp: "2026-06-19T14:28:00Z" },
  { id: "log-3", source: "DICOM", status: "error", endpoint: "PACS", message: "STOW-RS timeout after 30s", timestamp: "2026-06-19T14:00:00Z", requestBody: "DICOM dataset (2.1 MB)", responseBody: "HTTP 504 Gateway Timeout" },
  { id: "log-4", source: "ABDM", status: "success", endpoint: "ABDM", message: "Consent granted for PAT-0001 via ABDM HIE", timestamp: "2026-06-19T13:45:00Z" },
  { id: "log-5", source: "HL7", status: "error", endpoint: "HL7 Gateway", message: "ORU^R01 parse failure: invalid segment at line 12", timestamp: "2026-06-19T13:30:00Z", requestBody: "MSH|^~\\&|LIS|LAB|HIS|HOSPITAL|202606191330||ORU^R01|MSG002|P|2.5\rPID|1||PAT-0002\rOBR|1|ORD-001||LIPID PROFILE\rOBX|1|NM|14690-0||190|mg/dL|||N", responseBody: "MSH|^~\\&|HIS|HOSPITAL|LIS|LAB|202606191330||ACK|ACK002|P|2.5\rMSA|AE|MSG002\rERR|^^^&lt;Unrecognized segment&gt;" },
  { id: "log-6", source: "FHIR", status: "success", endpoint: "RIS", message: "DiagnosticReport updated for PAT-0003", timestamp: "2026-06-19T13:00:00Z" },
  { id: "log-7", source: "DICOM", status: "success", endpoint: "PACS", message: "WADO-RS retrieve study 1.2.840.113619.2.55.3.2831214267.1234.1", timestamp: "2026-06-19T12:30:00Z" },
  { id: "log-8", source: "ABDM", status: "error", endpoint: "ABDM", message: "Token refresh failed — invalid client credentials", timestamp: "2026-06-19T12:00:00Z" },
  { id: "log-9", source: "HL7", status: "success", endpoint: "HL7 Gateway", message: "SIU^S12 appointment scheduled for Dr. Sharma", timestamp: "2026-06-19T11:00:00Z" },
  { id: "log-10", source: "FHIR", status: "error", endpoint: "LIS", message: "Validation error: missing required identifier on Practitioner", timestamp: "2026-06-19T10:30:00Z" },
  { id: "log-11", source: "DICOM", status: "success", endpoint: "PACS", message: "QIDO-RS query returned 5 studies for PAT-0004", timestamp: "2026-06-19T10:00:00Z" },
  { id: "log-12", source: "ABDM", status: "success", endpoint: "ABDM", message: "Health record push for PAT-0002 completed", timestamp: "2026-06-19T09:30:00Z" },
  { id: "log-13", source: "HL7", status: "error", endpoint: "HL7 Gateway", message: "Connection refused: target server unreachable", timestamp: "2026-06-19T09:00:00Z" },
  { id: "log-14", source: "FHIR", status: "success", endpoint: "RIS", message: "ImagingStudy created for PAT-0001", timestamp: "2026-06-19T08:30:00Z" },
  { id: "log-15", source: "DICOM", status: "success", endpoint: "PACS", message: "STOW-RS stored instance successfully", timestamp: "2026-06-19T08:00:00Z" },
];

const PAGE_SIZE = 8;

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function IntegrationLogsPage() {
  const [sourceFilter, setSourceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return MOCK_LOGS.filter((l) => {
      if (sourceFilter && l.source !== sourceFilter) return false;
      if (statusFilter && l.status !== statusFilter) return false;
      if (dateFrom && l.timestamp < dateFrom) return false;
      if (dateTo && l.timestamp > dateTo + "T23:59:59Z") return false;
      if (search && !l.message.toLowerCase().includes(search.toLowerCase()) && !l.endpoint.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [sourceFilter, statusFilter, dateFrom, dateTo, search]);

  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/integrations" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><ArrowLeft size={18} /></Link>
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Integration Logs</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Detailed log of all integration events</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px] space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Search</label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} placeholder="Search messages or endpoints…" className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] pl-9 pr-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:border-[var(--action-primary)] outline-none" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Source</label>
            <select value={sourceFilter} onChange={(e) => { setSourceFilter(e.target.value); setPage(0); }} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="">All sources</option>
              <option>HL7</option><option>FHIR</option><option>DICOM</option><option>ABDM</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Status</label>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <option value="">All statuses</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">From</label>
            <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(0); }} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">To</label>
            <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(0); }} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]" />
          </div>
          {(sourceFilter || statusFilter || dateFrom || dateTo || search) && (
            <button onClick={() => { setSourceFilter(""); setStatusFilter(""); setDateFrom(""); setDateTo(""); setSearch(""); setPage(0); }} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Log table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="divide-y divide-[var(--border-default)]">
          {paged.length === 0 && (
            <div className="py-16 text-center text-sm text-[var(--text-secondary)]">No log entries match your filters.</div>
          )}
          {paged.map((l) => {
            const open = expanded.has(l.id);
            return (
              <div key={l.id}>
                <button onClick={() => toggle(l.id)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-[var(--surface-sunken)] transition-colors">
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${l.status === "success" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{l.status.toUpperCase()}</span>
                  <span className="rounded bg-[var(--action-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--action-primary)] shrink-0">{l.source}</span>
                  <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] text-[var(--text-secondary)] shrink-0">{l.endpoint}</span>
                  <span className="text-xs text-[var(--text-primary)] flex-1 truncate">{l.message}</span>
                  <span className="text-[10px] text-[var(--text-secondary)] shrink-0">{fmtTime(l.timestamp)}</span>
                  {open ? <ChevronUp size={14} className="shrink-0 text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="shrink-0 text-[var(--text-secondary)]" />}
                </button>
                {open && (l.requestBody || l.responseBody) && (
                  <div className="border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-6 py-3 space-y-2">
                    {l.requestBody && (
                      <div className="space-y-1">
                        <p className="text-[10px] font-medium text-[var(--text-secondary)]">REQUEST</p>
                        <pre className="text-[11px] text-[var(--text-primary)] bg-[var(--surface-raised)] rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">{l.requestBody}</pre>
                      </div>
                    )}
                    {l.responseBody && (
                      <div className="space-y-1">
                        <p className="text-[10px] font-medium text-[var(--text-secondary)]">RESPONSE</p>
                        <pre className="text-[11px] text-[var(--text-primary)] bg-[var(--surface-raised)] rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">{l.responseBody}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] disabled:opacity-30 hover:text-[var(--text-primary)]">Previous</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${i === page ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{i + 1}</button>
          ))}
          <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-[var(--border-default)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] disabled:opacity-30 hover:text-[var(--text-primary)]">Next</button>
        </div>
      )}
    </div>
  );
}
