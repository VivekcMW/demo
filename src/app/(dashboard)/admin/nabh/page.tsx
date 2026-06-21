"use client";

import { useState, useEffect } from "react";
import {
  BarChart3, CheckCircle2, AlertTriangle, XCircle, FileText,
  RefreshCw, Calendar, Users, Activity, Syringe, Bed,
  Clock, Download, Shield, Plus,
} from "lucide-react";
import { CreateRegisterModal, CreateCommitteeModal, ManualIndicatorModal } from "./components";
import { PdfDownloadButton } from "@/components/ui/PdfActions";

interface IndicatorDef {
  id: string;
  name: string;
  category: string;
  nabhStandard: string;
  description: string;
  targetRate: string;
  computationType: string;
}

interface IndicatorValue {
  id: string;
  indicatorId: string;
  periodStart: string;
  periodEnd: string;
  numerator: string;
  denominator: string;
  rate: string;
  department: string | null;
  computedAt: string;
}

interface RegisterEntry {
  id: string;
  type: string;
  patientName: string;
  registerNumber: string;
  recordedAt: string;
  notifiedTo: string | null;
}

interface CommitteeReport {
  id: string;
  committee: string;
  meetingDate: string;
  chairperson: string;
  attendees: string[];
  minutes: string;
  decisions: { decision: string; responsible: string }[];
}

interface EvidencePack {
  id: string;
  title: string;
  nabhStandard: string | null;
  status: string;
  generatedAt: string;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const STATUS_CLS: Record<string, string> = {
  draft: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  final: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  archived: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

export default function NabhPage() {
  const [tab, setTab] = useState<"indicators" | "registers" | "committees" | "evidence">("indicators");
  const [definitions, setDefinitions] = useState<IndicatorDef[]>([]);
  const [indicatorValues, setIndicatorValues] = useState<IndicatorValue[]>([]);
  const [registers, setRegisters] = useState<RegisterEntry[]>([]);
  const [committees, setCommitteeReports] = useState<CommitteeReport[]>([]);
  const [evidencePacks, setEvidencePacks] = useState<EvidencePack[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("monthly");
  const [showCreateRegister, setShowCreateRegister] = useState(false);
  const [showCreateCommittee, setShowCreateCommittee] = useState(false);
  const [showManualIndicator, setShowManualIndicator] = useState(false);

  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    loadData();
  }, [tab, period]);

  async function loadData() {
    setLoading(true);
    try {
      if (tab === "indicators") {
        const [defs, vals] = await Promise.all([
          fetch(`${base}/api/v1/nabh/definitions`).then((r) => r.json()),
          fetch(`${base}/api/v1/nabh/indicators/values`).then((r) => r.json()),
        ]);
        setDefinitions(defs);
        setIndicatorValues(vals);
      } else if (tab === "registers") {
        const res = await fetch(`${base}/api/v1/nabh/registers`).then((r) => r.json());
        setRegisters(res.data || []);
      } else if (tab === "committees") {
        const res = await fetch(`${base}/api/v1/nabh/committees`).then((r) => r.json());
        setCommitteeReports(res.data || []);
      } else if (tab === "evidence") {
        const res = await fetch(`${base}/api/v1/nabh/evidence`).then((r) => r.json());
        setEvidencePacks(res.data || []);
      }
    } catch {
      // silently handle — mocks will work offline
    }
    setLoading(false);
  }

  async function computeAll() {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString().slice(0, 10);
    const periodEnd = now.toISOString().slice(0, 10);
    await fetch(`${base}/api/v1/nabh/indicators/compute-all`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ periodStart, periodEnd, periodType: period }),
    });
    loadData();
  }

  async function generateEvidence() {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).toISOString().slice(0, 10);
    const periodEnd = now.toISOString().slice(0, 10);
    await fetch(`${base}/api/v1/nabh/evidence/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `NABH Evidence Pack — ${fmtDate(periodStart)} to ${fmtDate(periodEnd)}`,
        periodStart,
        periodEnd,
        generatedBy: "admin",
      }),
    });
    loadData();
  }

  async function finalizeEvidence(id: string) {
    await fetch(`${base}/api/v1/nabh/evidence/${id}/finalize`, { method: "POST" });
    loadData();
  }

  const catCounts = definitions.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  const achieved = indicatorValues.filter((v) => {
    const def = definitions.find((d) => d.id === v.indicatorId);
    return def && Number(v.rate) >= Number(def.targetRate || 0);
  }).length;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">NABH 6th Edition Compliance</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Quality indicators, statutory registers, committee reports, and evidence packs</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-xs text-[var(--text-primary)]">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          {tab === "indicators" && (
            <button onClick={computeAll} className="flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]">
              <RefreshCw size={14} /> Compute All
            </button>
          )}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-[var(--action-primary)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Indicators</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{definitions.length}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{achieved}/{indicatorValues.length || definitions.length} achieved</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={16} className="text-[var(--action-primary)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Registers</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{registers.length}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Statutory entries</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-[var(--action-primary)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Committees</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{committees.length}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Meetings held</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-[var(--action-primary)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Evidence</span>
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{evidencePacks.length}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">Packs generated</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-[var(--border-default)]">
        <div className="flex items-center gap-1">
          {(["indicators", "registers", "committees", "evidence"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${tab === t ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 pb-2">
          {tab === "indicators" && (
            <button onClick={() => setShowManualIndicator(true)} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1.5 text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
              <Plus size={12} /> Manual Entry
            </button>
          )}
          {tab === "registers" && (
            <button onClick={() => setShowCreateRegister(true)} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1.5 text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
              <Plus size={12} /> New Entry
            </button>
          )}
          {tab === "committees" && (
            <button onClick={() => setShowCreateCommittee(true)} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1.5 text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
              <Plus size={12} /> New Report
            </button>
          )}
        </div>
      </div>

      {/* Tab content */}
      {loading ? (
        <div className="text-center py-12 text-sm text-[var(--text-secondary)]">Loading...</div>
      ) : tab === "indicators" ? (
        <div className="space-y-4">
          {Object.entries(catCounts).map(([cat, count]) => (
            <div key={cat} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 capitalize">{cat.replace(/_/g, " ")} ({count})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {definitions.filter((d) => d.category === cat).map((def) => {
                  const val = indicatorValues.find((v) => v.indicatorId === def.id);
                  const isAchieved = val && def.targetRate && Number(val.rate) >= Number(def.targetRate);
                  return (
                    <div key={def.id} className="rounded-lg bg-[var(--surface-sunken)] p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[var(--text-primary)]">{def.name}</span>
                        <span className="text-[10px] text-[var(--action-primary)] font-mono">{def.nabhStandard}</span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)]">{def.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2 text-[11px]">
                          {val ? (
                            <>
                              <span className="font-mono font-bold text-[var(--text-primary)]">{val.rate}%</span>
                              <span className="text-[var(--text-secondary)]">({val.numerator}/{val.denominator})</span>
                            </>
                          ) : (
                            <span className="text-[var(--text-secondary)]">Not computed</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {def.targetRate && (
                            <span className="text-[10px] text-[var(--text-secondary)]">Target: {def.targetRate}%</span>
                          )}
                          {isAchieved ? (
                            <CheckCircle2 size={14} className="text-[var(--normal-fg)]" />
                          ) : val ? (
                            <AlertTriangle size={14} className="text-[var(--warning-fg)]" />
                          ) : (
                            <Clock size={14} className="text-[var(--text-secondary)]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : tab === "registers" ? (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                <th className="text-left px-4 py-2.5 font-medium text-[var(--text-secondary)]">Reg #</th>
                <th className="text-left px-4 py-2.5 font-medium text-[var(--text-secondary)]">Type</th>
                <th className="text-left px-4 py-2.5 font-medium text-[var(--text-secondary)]">Patient</th>
                <th className="text-left px-4 py-2.5 font-medium text-[var(--text-secondary)]">Notified To</th>
                <th className="text-left px-4 py-2.5 font-medium text-[var(--text-secondary)]">Recorded At</th>
              </tr>
            </thead>
            <tbody>
              {registers.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--text-secondary)]">No register entries yet</td></tr>
              ) : registers.map((r) => (
                <tr key={r.id} className="border-b border-[var(--border-default)] hover:bg-[var(--surface-sunken)]">
                  <td className="px-4 py-2.5 font-mono text-[var(--text-primary)]">{r.registerNumber}</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded bg-[var(--action-subtle)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--action-primary)]">{r.type.replace(/_/g, " ")}</span>
                  </td>
                  <td className="px-4 py-2.5 text-[var(--text-primary)]">{r.patientName || "—"}</td>
                  <td className="px-4 py-2.5 text-[var(--text-secondary)]">{r.notifiedTo || "—"}</td>
                  <td className="px-4 py-2.5 text-[var(--text-secondary)]">{fmtTime(r.recordedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : tab === "committees" ? (
        <div className="space-y-3">
          {committees.length === 0 ? (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8 text-center text-sm text-[var(--text-secondary)]">No committee reports yet</div>
          ) : committees.map((cr) => (
            <div key={cr.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{cr.committee}</span>
                  <span className="text-xs text-[var(--text-secondary)] ml-2">{fmtDate(cr.meetingDate)}</span>
                </div>
                {cr.chairperson && <span className="text-xs text-[var(--text-secondary)]">Chair: {cr.chairperson}</span>}
              </div>
              {cr.attendees && cr.attendees.length > 0 && (
                <p className="text-[11px] text-[var(--text-secondary)] mb-2">{cr.attendees.length} attendees</p>
              )}
              {cr.decisions && cr.decisions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-medium text-[var(--text-secondary)] uppercase">Decisions</p>
                  {cr.decisions.map((d, i) => (
                    <p key={i} className="text-xs text-[var(--text-primary)] flex items-start gap-1">
                      <span className="text-[var(--action-primary)] mt-0.5">•</span>
                      {d.decision} — <span className="text-[var(--text-secondary)]">{d.responsible}</span>
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Evidence tab */
        <div className="space-y-3">
          <button onClick={generateEvidence} className="flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)] mb-4">
            <FileText size={14} /> Generate New Evidence Pack
          </button>
          {evidencePacks.length === 0 ? (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-8 text-center text-sm text-[var(--text-secondary)]">No evidence packs yet</div>
          ) : evidencePacks.map((ep) => (
            <div key={ep.id} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-[var(--action-primary)]" />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{ep.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Generated {fmtTime(ep.generatedAt)}
                    {ep.nabhStandard && ` • ${ep.nabhStandard}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLS[ep.status] || "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
                  {ep.status}
                </span>
                {ep.status === "draft" && (
                  <button onClick={() => finalizeEvidence(ep.id)} className="flex items-center gap-1 rounded-lg border border-[var(--border-default)] px-2.5 py-1.5 text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
                    <CheckCircle2 size={12} /> Finalize
                  </button>
                )}
                <PdfDownloadButton template="evidence-pack" id={ep.id} filename={`evidence-pack-${ep.id}.pdf`} label="Export" />
              </div>
            </div>
          ))}
        </div>
      )}
      {showCreateRegister && <CreateRegisterModal onClose={() => setShowCreateRegister(false)} onCreated={loadData} />}
      {showCreateCommittee && <CreateCommitteeModal onClose={() => setShowCreateCommittee(false)} onCreated={loadData} />}
      {showManualIndicator && <ManualIndicatorModal onClose={() => setShowManualIndicator(false)} onCreated={loadData} />}
    </>
  );
}
