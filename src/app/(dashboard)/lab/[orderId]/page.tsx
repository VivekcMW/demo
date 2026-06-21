"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useLabStore } from "@/store/useLabStore";
import type { DiagnosticResult, ResultParam } from "@/data/seedOrders";
import {
  ArrowLeft, FlaskConical, AlertTriangle, CheckCircle2,
  ChevronRight, User, Plus, Trash2, ShieldAlert, FileText,
  Printer, History, Clock,
} from "lucide-react";
import { PdfActions } from "@/components/ui/PdfActions";

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

const FLAG_OPTIONS = ["N", "H", "L", "HH", "LL"] as const;
type FlagOption = typeof FLAG_OPTIONS[number];

const FLAG_CLS: Record<FlagOption, string> = {
  N:  "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  H:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  L:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  HH: "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
  LL: "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
};

function FlagBadge({ flag }: { flag?: string }) {
  if (!flag || flag === "N") return (
    <span className="inline-flex rounded-full bg-[var(--normal-bg)] px-2 py-0.5 text-xs font-medium text-[var(--normal-fg)]">Normal</span>
  );
  const cls = FLAG_CLS[flag as FlagOption] ?? FLAG_CLS.N;
  const label = flag === "HH" ? "▲▲ Crit High" : flag === "LL" ? "▼▼ Crit Low" : flag === "H" ? "▲ High" : "▼ Low";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs ${cls}`}>{label}</span>;
}

function useAutoFlag(orderTitle: string) {
  const catalog = useLabStore((s) => s.catalog);
  return useMemo(() => {
    const matched = catalog.find((t) =>
      orderTitle.toLowerCase().includes(t.name.toLowerCase()) ||
      t.name.toLowerCase().includes(orderTitle.toLowerCase())
    );
    if (!matched || matched.parameters.length === 0) return null;
    return matched;
  }, [orderTitle, catalog]);
}

function prefillParams(testCatalog: NonNullable<ReturnType<typeof useAutoFlag>>): ResultParam[] {
  return testCatalog.parameters.map((p) => ({
    name: p.name,
    value: "",
    unit: p.unit,
    refRange: p.refRange,
    flag: "N" as const,
  }));
}

function autoDetectFlag(value: string, refRangeLow?: number, refRangeHigh?: number, criticalLow?: number, criticalHigh?: number): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "N";
  if (criticalHigh !== undefined && num >= criticalHigh) return "HH";
  if (criticalLow !== undefined && num <= criticalLow) return "LL";
  if (refRangeHigh !== undefined && num > refRangeHigh) return "H";
  if (refRangeLow !== undefined && num < refRangeLow) return "L";
  return "N";
}

function ResultView({ result }: { result: DiagnosticResult }) {
  return (
    <div className="space-y-4">
      {result.critical && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
          <ShieldAlert size={18} className="shrink-0 text-[var(--critical-fg)]" />
          <div>
            <p className="text-sm font-bold text-[var(--critical-fg)]">Critical Result — Immediate Physician Review Required</p>
            <p className="text-xs text-[var(--critical-fg)] opacity-80">One or more parameters are critically out of range.</p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Report Details</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-[var(--border-default)]">
          {[
            ["Reported At", fmtDateTime(result.reportedAt)],
            ["Reported By", result.reportedBy],
            ...(result.attachmentName ? [["Attachment", result.attachmentName]] : []),
          ].map(([label, value]) => (
            <div key={label} className="bg-[var(--surface-raised)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{label}</p>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {result.parameters && result.parameters.length > 0 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Parameters</p>
          </div>
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]/50 px-5 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            <span>Parameter</span><span>Value</span><span>Unit</span><span>Ref Range</span><span>Flag</span>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {result.parameters.map((p, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 gap-3 px-5 py-3 text-sm md:grid-cols-[2fr_1fr_1fr_1.5fr_1fr] md:items-center md:gap-4 ${
                  p.flag === "HH" || p.flag === "LL" ? "bg-[var(--critical-bg)]" : ""
                }`}
              >
                <span className="font-medium text-[var(--text-primary)]">{p.name}</span>
                <span className="font-bold tabular-nums text-[var(--text-primary)]">{p.value}</span>
                <span className="text-[var(--text-secondary)]">{p.unit}</span>
                <span className="text-[var(--text-secondary)]">{p.refRange}</span>
                <FlagBadge flag={p.flag} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Findings & Conclusion</p>
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          <div className="px-5 py-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Findings</p>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{result.findings}</p>
          </div>
          {result.conclusion && (
            <div className="px-5 py-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Conclusion / Impression</p>
              <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">{result.conclusion}</p>
            </div>
          )}
          {result.attachmentName && (
            <div className="flex items-center gap-3 px-5 py-3">
              <FileText size={15} className="text-[var(--action-primary)]" />
              <span className="text-sm font-medium text-[var(--action-primary)]">{result.attachmentName}</span>
              <span className="text-xs text-[var(--text-secondary)]">(simulated attachment)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface EntryFormProps {
  orderId: string;
  orderTitle: string;
  onSubmit: () => void;
}

function ResultEntryForm({ orderId, orderTitle, onSubmit }: EntryFormProps) {
  const addDiagnosticResult = useOrderStore((s) => s.addDiagnosticResult);
  const updateStatus = useOrderStore((s) => s.updateStatus);
  const catalog = useLabStore((s) => s.catalog);
  const store = useLabStore;

  const matchedTest = useAutoFlag(orderTitle);
  const [qualitative, setQualitative] = useState(false);
  const [reportedBy, setReportedBy] = useState("Lab Technician Ramesh");
  const [findings, setFindings] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [attachment, setAttachment] = useState("");
  const [params, setParams] = useState<ResultParam[]>(
    matchedTest ? prefillParams(matchedTest) : [{ name: "", value: "", unit: "", refRange: "", flag: "N" }]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const hasCritical = params.some((p) => p.flag === "HH" || p.flag === "LL");

  function addParam() {
    setParams((ps) => [...ps, { name: "", value: "", unit: "", refRange: "", flag: "N" }]);
  }

  function removeParam(i: number) {
    setParams((ps) => ps.filter((_, idx) => idx !== i));
  }

  function updateParam(i: number, key: keyof ResultParam, val: string) {
    setParams((ps) => ps.map((p, idx) => {
      if (idx !== i) return p;
      const updated = { ...p, [key]: val };
      if (key === "value" && matchedTest && matchedTest.parameters[i]) {
        const mp = matchedTest.parameters[i];
        updated.flag = autoDetectFlag(val, mp.refRangeLow, mp.refRangeHigh, mp.criticalLow, mp.criticalHigh) as ResultParam["flag"];
      }
      return updated;
    }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!reportedBy.trim()) e.reportedBy = "Required";
    if (!findings.trim()) e.findings = "Required";
    if (params.length === 0) e.params = "Add at least one parameter";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSaveDraft() {
    updateStatus(orderId, "In-Progress", reportedBy, "Draft saved");
  }

  function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    const result: DiagnosticResult = {
      reportedAt: new Date().toISOString().slice(0, 19),
      reportedBy: reportedBy.trim(),
      findings: findings.trim(),
      conclusion: conclusion.trim() || undefined,
      critical: hasCritical,
      attachmentName: attachment.trim() || undefined,
      parameters: params.length > 0 ? params : undefined,
    };
    setTimeout(() => {
      addDiagnosticResult(orderId, result, reportedBy.trim());
      setSaving(false);
      onSubmit();
    }, 600);
  }

  return (
    <div className="space-y-5">
      {hasCritical && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
          <ShieldAlert size={16} className="shrink-0 text-[var(--critical-fg)]" />
          <p className="text-sm font-bold text-[var(--critical-fg)]">Critical value detected — report will be flagged for immediate physician review.</p>
        </div>
      )}

      {/* Qualitative toggle */}
      <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-5 py-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={qualitative}
            onChange={(e) => setQualitative(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border-default)] accent-[var(--action-primary)]"
          />
          <span className="text-sm font-medium text-[var(--text-primary)]">Qualitative result (e.g. Positive/Negative, microscopy)</span>
        </label>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Reported By</p>
        </div>
        <div className="px-5 py-4">
          <input
            type="text"
            value={reportedBy}
            onChange={(e) => setReportedBy(e.target.value)}
            className={`w-full rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${errors.reportedBy ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
          />
          {errors.reportedBy && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.reportedBy}</p>}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Parameters</p>
          {!qualitative && (
            <button
              onClick={addParam}
              className="flex items-center gap-1 rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]"
            >
              <Plus size={12} /> Add row
            </button>
          )}
        </div>

        <div className="px-5 py-4 space-y-3">
          {errors.params && <p className="text-xs text-[var(--critical-fg)]">{errors.params}</p>}
          {qualitative ? (
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Result</label>
                <select
                  value={params[0]?.value ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setParams([{ name: "Result", value: v, unit: "", refRange: matchedTest?.parameters[0]?.refRange ?? "", flag: v === "Positive" || v === "Reactive" ? "H" : "N" }]);
                  }}
                  className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                >
                  <option value="">Select result</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                  <option value="Reactive">Reactive</option>
                  <option value="Non-reactive">Non-reactive</option>
                  <option value="Detected">Detected</option>
                  <option value="Not detected">Not detected</option>
                </select>
              </div>
              {matchedTest && (
                <p className="text-xs text-[var(--text-secondary)]">
                  Expected: {matchedTest.parameters[0]?.refRange ?? "N/A"}
                </p>
              )}
            </div>
          ) : (
            <>
              {params.length > 0 && (
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_auto] gap-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                  <span>Parameter</span><span>Value</span><span>Unit</span><span>Ref Range</span><span>Flag</span><span />
                </div>
              )}
              {params.map((p, i) => {
                const crit = p.flag === "HH" || p.flag === "LL";
                return (
                  <div key={i} className={`grid grid-cols-2 gap-2 md:grid-cols-[2fr_1fr_1fr_1.5fr_1fr_auto] md:items-center rounded-lg p-2 ${crit ? "bg-[var(--critical-bg)]" : "bg-[var(--surface-sunken)]"}`}>
                    <input
                      placeholder="Parameter name"
                      value={p.name}
                      onChange={(e) => updateParam(i, "name", e.target.value)}
                      className="rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                    <input
                      placeholder="Value"
                      value={p.value}
                      onChange={(e) => updateParam(i, "value", e.target.value)}
                      className={`rounded border px-2 py-1.5 text-xs outline-none focus:border-[var(--action-primary)] ${crit ? "border-[var(--critical-fg)] bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold" : "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-primary)]"}`}
                    />
                    <input
                      placeholder="Unit"
                      value={p.unit}
                      onChange={(e) => updateParam(i, "unit", e.target.value)}
                      className="rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                    <input
                      placeholder="Ref range"
                      value={p.refRange}
                      onChange={(e) => updateParam(i, "refRange", e.target.value)}
                      className="rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                    <select
                      value={p.flag ?? "N"}
                      onChange={(e) => updateParam(i, "flag", e.target.value)}
                      className={`rounded border border-[var(--border-default)] px-2 py-1.5 text-xs font-semibold outline-none focus:border-[var(--action-primary)] ${
                        crit
                          ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]"
                          : p.flag === "H" || p.flag === "L"
                          ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]"
                          : "bg-[var(--surface-raised)] text-[var(--text-primary)]"
                      }`}
                    >
                      {FLAG_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <button
                      onClick={() => removeParam(i)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--critical-bg)] hover:text-[var(--critical-fg)] transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
              {params.length === 0 && (
                <button
                  onClick={addParam}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border-default)] py-4 text-sm text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] transition-colors"
                >
                  <Plus size={14} /> Add first parameter
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Findings</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Findings *</label>
            <textarea
              rows={4}
              placeholder="Describe findings, methodology, sample quality…"
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className={`w-full resize-none rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${errors.findings ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
            />
            {errors.findings && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.findings}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Conclusion / Impression</label>
            <textarea
              rows={2}
              placeholder="Final diagnosis or clinical impression…"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Attachment Name <span className="text-[var(--text-secondary)] font-normal">(simulated)</span></label>
            <input
              type="text"
              placeholder="e.g. microscopy-slide-PT-0004.jpg"
              value={attachment}
              onChange={(e) => setAttachment(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSaveDraft}
          className="flex-1 rounded-xl border border-[var(--border-default)] py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
        >
          Save Draft
        </button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex-1 rounded-xl bg-[var(--action-primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors disabled:opacity-60"
        >
          {saving ? "Submitting…" : "Submit Report"}
        </button>
        <PdfActions template="lab-report" id={orderId} filename={`lab-report-${orderId}.pdf`} />
      </div>
    </div>
  );
}

export default function LabDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const order = useOrderStore((s) => s.getById(orderId));
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const latestOrder = useOrderStore((s) => s.getById(orderId))!;

  const patientLabHistory = useMemo(() => {
    if (!order) return [];
    return latestOrder
      ? useOrderStore.getState().orders.filter(
          (o) => o.patientId === order.patientId && o.id !== orderId && o.type === "Lab" && o.status === "Completed" && o.result
        ).slice(0, 5)
      : [];
  }, [order, orderId]);

  if (!order || order.type !== "Lab") {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          {!order ? "Order not found" : "This order type is not handled by Lab"}
        </p>
        <button onClick={() => router.push("/lab")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to Lab
        </button>
      </div>
    );
  }

  const isCompleted = order.status === "Completed";
  const isCancelled = order.status === "Cancelled";
  const canEnter = !isCompleted && !isCancelled;

  function handleSubmitted() {
    setSubmitted(true);
  }

  return (
    <div className="space-y-5 pb-8 print-root">

      {/* Print-only header */}
      <div className="print-header">
        <h1>Aarogya Hospital</h1>
        <p className="print-sub">Multi-Specialty Hospital &amp; Research Centre</p>
        <p className="print-contact">123 Healthcare Avenue, Medical District · Tel: +91-80-2345-6789 · info@aarogya.in</p>
      </div>
      <div className="print-title">Laboratory Report</div>
      <div className="print-info-grid">
        <div><div className="label">Patient Name</div><div className="value">{order.patientName}</div></div>
        <div><div className="label">Patient ID</div><div className="value">{order.patientId}</div></div>
        <div><div className="label">Test</div><div className="value">{order.title}</div></div>
        <div><div className="label">Order ID</div><div className="value">{order.id}</div></div>
        <div><div className="label">Ordered By</div><div className="value">{order.orderedBy}</div></div>
        <div><div className="label">Date</div><div className="value">{fmtDateTime(order.orderedAt)}</div></div>
        {order.priority === "STAT" && <div><div className="label">Priority</div><div className="value">STAT</div></div>}
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Lab</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{order.id}</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--info-bg)] text-[var(--info-fg)]">
            <FlaskConical size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{order.title}</h1>
              {order.priority === "STAT" && (
                <span className="rounded-full bg-[var(--critical-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--critical-fg)]">STAT</span>
              )}
              {order.priority === "Urgent" && (
                <span className="rounded-full bg-[var(--warning-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--warning-fg)]">Urgent</span>
              )}
              {latestOrder.result?.critical && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--critical-bg)] px-2.5 py-0.5 text-xs font-bold text-[var(--critical-fg)]">
                  <ShieldAlert size={11} /> Critical
                </span>
              )}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                latestOrder.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                : latestOrder.status === "In-Progress" ? "bg-[var(--action-subtle)] text-[var(--action-primary)]"
                : "bg-[var(--info-bg)] text-[var(--info-fg)]"
              }`}>
                {latestOrder.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{order.details}</p>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left sidebar */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0">

          {/* Order details */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Order Details</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Order ID", order.id],
                ["Priority", order.priority],
                ["Ordered By", order.orderedBy],
                ["Ordered At", fmtDateTime(order.orderedAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[var(--text-secondary)]">{label}</dt>
                  <dd className="font-medium text-[var(--text-primary)] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Patient */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Patient</p>
            </div>
            <Link
              href={`/patients/${order.patientId}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--action-primary)] text-xs font-bold text-white">
                <User size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{order.patientName}</p>
                <p className="text-xs text-[var(--action-primary)]">{order.patientId}</p>
              </div>
              <ChevronRight size={14} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <History size={13} className="text-[var(--text-secondary)]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Timeline</p>
            </div>
            <div className="divide-y divide-[var(--border-default)]">
              {order.statusHistory.map((ev, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex h-2 w-2 shrink-0 rounded-full bg-[var(--action-primary)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--text-primary)]">{ev.status}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{fmtDateTime(ev.at)} by {ev.by}</p>
                    {ev.note && <p className="text-[10px] text-[var(--text-secondary)] italic">— {ev.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient lab history */}
          {patientLabHistory.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
                <Clock size={13} className="text-[var(--text-secondary)]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Recent Labs</p>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {patientLabHistory.map((h) => (
                  <Link key={h.id} href={`/lab/${h.id}`} className="flex items-center justify-between px-4 py-2.5 hover:bg-[var(--surface-sunken)] transition-colors group">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--text-primary)] truncate">{h.title}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">{fmtDateTime(h.orderedAt)}</p>
                    </div>
                    <ChevronRight size={12} className="shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--critical-fg)]">This order has been cancelled — no result entry needed.</p>
            </div>
          )}
        </div>

        {/* Right: result entry or view */}
        <div className="flex-1 min-w-0">
          {submitted || isCompleted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] px-4 py-3">
                <CheckCircle2 size={16} className="text-[var(--normal-fg)]" />
                <p className="text-sm font-semibold text-[var(--normal-fg)]">Report submitted successfully</p>
              </div>
              {latestOrder.result && (
                <ResultView result={latestOrder.result} />
              )}
            </div>
          ) : canEnter ? (
            <ResultEntryForm
              orderId={order.id}
              orderTitle={order.title}
              onSubmit={handleSubmitted}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)] opacity-50" />
              <p className="font-medium text-[var(--text-primary)]">No result entry available</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Order status: {order.status}</p>
            </div>
          )}
        </div>

      </div>

      {/* Print-only results */}
      {latestOrder.result && (
        <div className="print-section">
          <h3>Test Results</h3>
          <table className="print-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Ref Range</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {latestOrder.result.parameters?.map((p, i) => {
                const flagCls = p.flag === "HH" || p.flag === "LL" ? "print-flag-critical" : p.flag === "H" || p.flag === "L" ? "print-flag-abnormal" : "print-flag-normal";
                const flagLbl = p.flag === "HH" ? "▲▲ Crit High" : p.flag === "LL" ? "▼▼ Crit Low" : p.flag === "H" ? "▲ High" : p.flag === "L" ? "▼ Low" : "Normal";
                return (
                  <tr key={i} className={p.flag === "HH" || p.flag === "LL" ? "critical-row" : ""}>
                    <td className="print-bold">{p.name}</td>
                    <td>{p.value}</td>
                    <td className="print-muted">{p.unit}</td>
                    <td className="print-muted">{p.refRange}</td>
                    <td className={flagCls}>{flagLbl}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {latestOrder.result && (
        <div className="print-section">
          <h3>Findings &amp; Conclusion</h3>
          <div className="content">{latestOrder.result.findings}</div>
          {latestOrder.result.conclusion && (
            <>
              <h3 style={{ marginTop: "8pt" }}>Conclusion</h3>
              <div className="content">{latestOrder.result.conclusion}</div>
            </>
          )}
        </div>
      )}

      {latestOrder.result?.critical && (
        <p className="print-critical-badge">Critical Result — Immediate Physician Review Required</p>
      )}

      <div className="print-signature">
        <div className="sig-block">
          <div className="sig-line" />
          <div className="sig-label">Lab Technician</div>
          <div className="sig-name">{latestOrder.result?.reportedBy ?? order.orderedBy}</div>
        </div>
        <div className="sig-block">
          <div className="sig-line" />
          <div className="sig-label">Reviewed By</div>
        </div>
      </div>

      <div className="print-footer">
        <span>Electronically generated report</span>
        <span>Order ID: {order.id}</span>
        {latestOrder.result && <span>Reported: {fmtDateTime(latestOrder.result.reportedAt)}</span>}
      </div>
    </div>
  );
}
