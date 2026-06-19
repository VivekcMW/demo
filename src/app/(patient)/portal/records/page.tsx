"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useExaminationStore } from "@/store/useExaminationStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useMemo, useState, useEffect } from "react";
import {
  FileText, FlaskConical, ScanLine, ChevronDown, ChevronUp,
  AlertTriangle, ShieldAlert, Download,
} from "lucide-react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

const TABS = [
  { key: "all", label: "All Records", icon: FileText },
  { key: "exams", label: "Visit Notes", icon: FileText },
  { key: "labs", label: "Lab Reports", icon: FlaskConical },
  { key: "imaging", label: "Imaging", icon: ScanLine },
];

export default function RecordsPage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const examinations = useExaminationStore((s) => s.examinations);
  const orders = useOrderStore((s) => s.orders);

  const [tab, setTab] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const patientExams = useMemo(
    () => (patient ? examinations.filter((e) => e.patientId === patient.id).sort((a, b) => b.startedAt.localeCompare(a.startedAt)) : []),
    [examinations, patient]
  );
  const patientLabs = useMemo(
    () => (patient ? orders.filter((o) => o.patientId === patient.id && o.type === "Lab" && o.status === "Completed").sort((a, b) => b.orderedAt.localeCompare(a.orderedAt)) : []),
    [orders, patient]
  );
  const patientImaging = useMemo(
    () => (patient ? orders.filter((o) => o.patientId === patient.id && o.type === "Imaging" && o.status === "Completed").sort((a, b) => b.orderedAt.localeCompare(a.orderedAt)) : []),
    [orders, patient]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  const examsVisible = tab === "all" || tab === "exams";
  const labsVisible = tab === "all" || tab === "labs";
  const imagingVisible = tab === "all" || tab === "imaging";

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">Medical Records</h1>
        <p className="text-sm text-[var(--text-secondary)]">View your visit notes, lab reports, and imaging results</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${tab === t.key ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>
              <Icon size={13} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Record counts */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
          <p className="text-2xl font-bold text-[var(--action-primary)]">{patientExams.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Visit Notes</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
          <p className="text-2xl font-bold text-[var(--action-primary)]">{patientLabs.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Lab Reports</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3">
          <p className="text-2xl font-bold text-[var(--action-primary)]">{patientImaging.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Imaging</p>
        </div>
      </div>

      {/* Visit Notes */}
      {examsVisible && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <FileText size={13} /> Visit Notes ({patientExams.length})
            </p>
          </div>
          {patientExams.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <FileText size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
              <p className="text-sm text-[var(--text-secondary)]">No visit notes available</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {patientExams.map((exam) => {
                const open = expanded === exam.id;
                return (
                  <div key={exam.id}>
                    <button
                      onClick={() => setExpanded(open ? null : exam.id)}
                      className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--action-subtle)]">
                        <FileText size={14} className="text-[var(--action-primary)]" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{exam.doctor} — {exam.dept}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{fmtDate(exam.startedAt)} · {exam.type} · {exam.status}</p>
                      </div>
                      {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
                    </button>
                    {open && (
                      <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4 space-y-3">
                        {exam.subjective?.chiefComplaint && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Chief Complaint</p>
                            <p className="text-sm text-[var(--text-primary)]">{exam.subjective.chiefComplaint}</p>
                          </div>
                        )}
                        {exam.subjective?.historyOfIllness && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">History</p>
                            <p className="text-sm text-[var(--text-primary)]">{exam.subjective.historyOfIllness}</p>
                          </div>
                        )}
                        {exam.assessment?.diagnoses && exam.assessment.diagnoses.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Diagnoses</p>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {exam.assessment.diagnoses.map((d, i) => (
                                <span key={i} className="rounded-full border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-0.5 text-xs text-[var(--text-primary)]">
                                  {d.label}{d.code ? ` (${d.code})` : ""}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {exam.plan?.prescriptions && exam.plan.prescriptions.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Prescriptions</p>
                            {exam.plan.prescriptions.map((rx, i) => (
                              <p key={i} className="text-sm text-[var(--text-primary)]">{rx.drug} {rx.dose} {rx.route} {rx.frequency} × {rx.duration}</p>
                            ))}
                          </div>
                        )}
                        {exam.plan?.patientInstructions && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Instructions</p>
                            <p className="text-sm text-[var(--text-primary)]">{exam.plan.patientInstructions}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-[11px] text-[var(--text-secondary)] border-t border-[var(--border-default)] pt-2">
                          <span>Status: {exam.status}</span>
                          {exam.signedBy && <span>Signed: {exam.signedBy}</span>}
                          {exam.plan?.followUpDays && <span>Follow-up: {exam.plan.followUpDays} days</span>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Lab Reports */}
      {labsVisible && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <FlaskConical size={13} /> Lab Reports ({patientLabs.length})
            </p>
          </div>
          {patientLabs.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <FlaskConical size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
              <p className="text-sm text-[var(--text-secondary)]">No lab reports available</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {patientLabs.map((lab) => {
                const open = expanded === lab.id;
                return (
                  <div key={lab.id}>
                    <button
                      onClick={() => setExpanded(open ? null : lab.id)}
                      className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--info-bg)]">
                        <FlaskConical size={14} className="text-[var(--info-fg)]" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{lab.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{fmtDate(lab.orderedAt)} · {lab.orderedBy}</p>
                      </div>
                      {lab.result?.critical && <ShieldAlert size={14} className="shrink-0 text-[var(--critical-fg)]" />}
                      {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
                    </button>
                    {open && lab.result && (
                      <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4 space-y-3">
                        {lab.result.parameters && lab.result.parameters.length > 0 && (
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-[var(--border-default)] text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                                <td className="pb-1.5">Parameter</td>
                                <td className="pb-1.5">Value</td>
                                <td className="pb-1.5">Ref Range</td>
                                <td className="pb-1.5">Flag</td>
                              </tr>
                            </thead>
                            <tbody>
                              {lab.result.parameters.map((p, i) => (
                                <tr key={i} className={`${p.flag === "HH" || p.flag === "LL" ? "bg-[var(--critical-bg)]" : ""}`}>
                                  <td className="py-1 text-[var(--text-primary)]">{p.name}</td>
                                  <td className={`py-1 font-medium ${p.flag === "HH" || p.flag === "LL" ? "text-[var(--critical-fg)]" : "text-[var(--text-primary)]"}`}>{p.value}</td>
                                  <td className="py-1 text-[var(--text-secondary)]">{p.refRange}</td>
                                  <td className="py-1">
                                    {p.flag === "HH" || p.flag === "LL" ? (
                                      <span className="rounded-full bg-[var(--critical-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--critical-fg)]">
                                        {p.flag === "HH" ? "Critical High" : "Critical Low"}
                                      </span>
                                    ) : p.flag === "H" ? (
                                      <span className="rounded-full bg-[var(--warning-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">High</span>
                                    ) : p.flag === "L" ? (
                                      <span className="rounded-full bg-[var(--warning-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--warning-fg)]">Low</span>
                                    ) : (
                                      <span className="text-[var(--normal-fg)]">Normal</span>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        {lab.result.findings && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Findings</p>
                            <p className="text-sm text-[var(--text-primary)] mt-1">{lab.result.findings}</p>
                          </div>
                        )}
                        {lab.result.conclusion && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Conclusion</p>
                            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">{lab.result.conclusion}</p>
                          </div>
                        )}
                        <p className="text-[11px] text-[var(--text-secondary)]">Reported: {lab.result.reportedBy} on {fmtDateTime(lab.result.reportedAt)}</p>
                      </div>
                    )}
                    {open && !lab.result && (
                      <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4">
                        <p className="text-sm text-[var(--text-secondary)]">Report not yet available</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Imaging */}
      {imagingVisible && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <ScanLine size={13} /> Imaging Reports ({patientImaging.length})
            </p>
          </div>
          {patientImaging.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center">
              <ScanLine size={24} className="mb-2 text-[var(--text-secondary)] opacity-30" />
              <p className="text-sm text-[var(--text-secondary)]">No imaging reports available</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {patientImaging.map((img) => {
                const open = expanded === img.id;
                return (
                  <div key={img.id}>
                    <button
                      onClick={() => setExpanded(open ? null : img.id)}
                      className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--warning-bg)]">
                        <ScanLine size={14} className="text-[var(--warning-fg)]" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-[var(--text-primary)]">{img.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{fmtDate(img.orderedAt)} · {img.orderedBy}</p>
                      </div>
                      {img.result?.critical && <ShieldAlert size={14} className="shrink-0 text-[var(--critical-fg)]" />}
                      {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
                    </button>
                    {open && img.result && (
                      <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4 space-y-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Findings</p>
                          <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap mt-1">{img.result.findings}</p>
                        </div>
                        {img.result.conclusion && (
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Impression</p>
                            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">{img.result.conclusion}</p>
                          </div>
                        )}
                        <p className="text-[11px] text-[var(--text-secondary)]">Reported: {img.result.reportedBy} on {fmtDateTime(img.result.reportedAt)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
