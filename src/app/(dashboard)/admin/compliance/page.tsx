"use client";

import { useState, useEffect } from "react";
import {
  Shield, CheckCircle2, AlertTriangle, XCircle, FileText,
  ExternalLink, Activity, RefreshCw, Server, Wifi,
} from "lucide-react";

interface ComplianceSummary {
  certification: string;
  generatedAt: string;
  summary: {
    total: number;
    implemented: number;
    partial: number;
    missing: number;
    percentage: number;
  };
  byCategory: Record<string, { total: number; implemented: number; partial: number; missing: number }>;
}

interface GatewayHealth {
  connected: boolean;
  mode: string;
  sessionValid: boolean;
  message: string;
}

interface AbhaStat {
  totalSyncs: number;
  completed: number;
  failed: number;
  lastSync: string | null;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default function CompliancePage() {
  const [report, setReport] = useState<ComplianceSummary | null>(null);
  const [gateway, setGateway] = useState<GatewayHealth | null>(null);
  const [phrStats, setPhrStats] = useState<AbhaStat | null>(null);
  const [loading, setLoading] = useState(true);

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [r, g, p] = await Promise.all([
        fetch(`${base}/api/v1/compliance/summary`).then((r) => r.json()),
        fetch(`${base}/api/v1/abdm/gateway/health`).then((r) => r.json()),
        fetch(`${base}/api/v1/abdm/phr/stats`).then((r) => r.json()),
      ]);
      setReport(r);
      setGateway(g);
      setPhrStats(p);
    } catch {
    }
    setLoading(false);
  }

  if (loading) return <div className="text-center py-12 text-sm text-[var(--text-secondary)]">Loading...</div>;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Certifications & Compliance</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">MeitY/STQC EMR, ABDM, NABH — certification readiness dashboard</p>
        </div>
        <button onClick={loadAll} className="flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Certification readiness card */}
      {report && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-[var(--action-primary)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">{report.certification} Certification Readiness</span>
            <span className="text-[10px] text-[var(--text-secondary)]">Last verified: {fmtTime(report.generatedAt)}</span>
          </div>

          {/* Overall score */}
          <div className="flex items-center gap-6 mb-5">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--surface-sunken)" strokeWidth="6" />
                <circle cx="36" cy="36" r="30" fill="none" stroke="var(--action-primary)" strokeWidth="6" strokeDasharray={`${(report.summary.percentage / 100) * 188.5} 188.5`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[var(--text-primary)]">{report.summary.percentage}%</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className="text-[var(--normal-fg)]" />
                <span className="text-[var(--text-primary)]">{report.summary.implemented} Implemented</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle size={16} className="text-[var(--warning-fg)]" />
                <span className="text-[var(--text-primary)]">{report.summary.partial} Partial</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <XCircle size={16} className="text-[var(--critical-fg)]" />
                <span className="text-[var(--text-primary)]">{report.summary.missing} Missing</span>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(report.byCategory).map(([cat, counts]) => (
              <div key={cat} className="rounded-lg bg-[var(--surface-sunken)] p-3">
                <p className="text-xs font-medium text-[var(--text-primary)] capitalize mb-2">{cat.replace(/_/g, " ")}</p>
                <div className="flex items-center gap-2 text-[11px]">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--border-default)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--action-primary)]"
                      style={{ width: `${counts.total > 0 ? (counts.implemented / counts.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-[var(--text-secondary)] font-mono">{counts.implemented}/{counts.total}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gap analysis link */}
          <a
            href={`${base}/api/v1/compliance/gap-analysis`}
            target="_blank"
            className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-[var(--action-primary)] hover:underline"
          >
            <ExternalLink size={12} /> View full gap analysis
          </a>
        </div>
      )}

      {/* ABDM Gateway status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wifi size={16} className={gateway?.connected ? "text-[var(--normal-fg)]" : "text-[var(--critical-fg)]"} />
            <span className="text-sm font-semibold text-[var(--text-primary)]">ABDM Gateway</span>
            <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${gateway?.connected ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>
              {gateway?.connected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
            <p>Mode: <span className="font-mono text-[var(--text-primary)]">{gateway?.mode}</span></p>
            <p>Session: <span className={`font-mono ${gateway?.sessionValid ? "text-[var(--normal-fg)]" : "text-[var(--critical-fg)]"}`}>{gateway?.sessionValid ? "Valid" : "Invalid"}</span></p>
            <p className="text-[10px] mt-1">{gateway?.message}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-[var(--action-primary)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">PHR Sync Status</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--text-primary)]">{phrStats?.totalSyncs || 0}</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Total</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--normal-fg)]">{phrStats?.completed || 0}</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[var(--critical-fg)]">{phrStats?.failed || 0}</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Failed</p>
            </div>
          </div>
          {phrStats?.lastSync && (
            <p className="text-[10px] text-[var(--text-secondary)] mt-2">Last sync: {fmtTime(phrStats.lastSync)}</p>
          )}
        </div>
      </div>

      {/* Resource links */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileText size={16} className="text-[var(--action-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Certification Resources</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <a href={`${base}/api/v1/compliance/report?certification=MeitY/STQC%20EMR`} target="_blank"
            className="rounded-lg bg-[var(--surface-sunken)] p-3 text-xs hover:bg-[var(--border-default)] transition-colors">
            <p className="font-medium text-[var(--text-primary)] mb-1">Full Certification Report</p>
            <p className="text-[var(--text-secondary)]">Detailed STQC evidence with source references</p>
          </a>
          <a href={`${base}/api/v1/nabh/evidence`} target="_blank"
            className="rounded-lg bg-[var(--surface-sunken)] p-3 text-xs hover:bg-[var(--border-default)] transition-colors">
            <p className="font-medium text-[var(--text-primary)] mb-1">NABH Evidence Packs</p>
            <p className="text-[var(--text-secondary)]">One-click audit evidence generation</p>
          </a>
          <a href={`${base}/api/v1/nabh/definitions`} target="_blank"
            className="rounded-lg bg-[var(--surface-sunken)] p-3 text-xs hover:bg-[var(--border-default)] transition-colors">
            <p className="font-medium text-[var(--text-primary)] mb-1">NABH Quality Indicators</p>
            <p className="text-[var(--text-secondary)]">All 16 indicators with target rates</p>
          </a>
          <a href={`${base}/api/v1/abdm/gateway/config`} target="_blank"
            className="rounded-lg bg-[var(--surface-sunken)] p-3 text-xs hover:bg-[var(--border-default)] transition-colors">
            <p className="font-medium text-[var(--text-primary)] mb-1">ABDM Gateway Config</p>
            <p className="text-[var(--text-secondary)]">Current gateway mode and HIP details</p>
          </a>
        </div>
      </div>
    </>
  );
}
