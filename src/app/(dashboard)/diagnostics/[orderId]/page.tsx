"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { DiagnosticResult, ResultParam } from "@/data/seedOrders";
import {
  ArrowLeft, FlaskConical, ScanLine, AlertTriangle, CheckCircle2,
  ChevronRight, User, Plus, Trash2, ShieldAlert, FileText,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

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

// ── Result View (read-only for completed) ─────────────────────────────────────

function ResultView({ result, type }: { result: DiagnosticResult; type: string }) {
  return (
    <div className="space-y-4">
      {/* Critical banner */}
      {result.critical && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
          <ShieldAlert size={18} className="shrink-0 text-[var(--critical-fg)]" />
          <div>
            <p className="text-sm font-bold text-[var(--critical-fg)]">Critical Result — Immediate Physician Review Required</p>
            <p className="text-xs text-[var(--critical-fg)] opacity-80">One or more parameters are critically out of range.</p>
          </div>
        </div>
      )}

      {/* Meta */}
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

      {/* Structured parameters for Lab */}
      {type === "Lab" && result.parameters && result.parameters.length > 0 && (
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

      {/* Findings + Conclusion */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {type === "Imaging" ? "Radiologist Report" : "Findings & Conclusion"}
          </p>
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

// ── Result Entry Form ─────────────────────────────────────────────────────────

interface EntryFormProps {
  orderId: string;
  orderType: string;
  onSubmit: () => void;
}

function ResultEntryForm({ orderId, orderType, onSubmit }: EntryFormProps) {
  const addDiagnosticResult = useOrderStore((s) => s.addDiagnosticResult);
  const updateStatus        = useOrderStore((s) => s.updateStatus);

  const isLab = orderType === "Lab";

  const [reportedBy, setReportedBy] = useState("Lab Technician Ramesh");
  const [findings, setFindings]     = useState("");
  const [conclusion, setConclusion] = useState("");
  const [attachment, setAttachment] = useState("");
  const [params, setParams]         = useState<ResultParam[]>(
    isLab ? [{ name: "", value: "", unit: "", refRange: "", flag: "N" }] : []
  );
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [saving, setSaving]         = useState(false);

  // Auto-detect critical flag from params
  const hasCritical = params.some((p) => p.flag === "HH" || p.flag === "LL");

  function addParam() {
    setParams((ps) => [...ps, { name: "", value: "", unit: "", refRange: "", flag: "N" }]);
  }

  function removeParam(i: number) {
    setParams((ps) => ps.filter((_, idx) => idx !== i));
  }

  function updateParam(i: number, key: keyof ResultParam, val: string) {
    setParams((ps) => ps.map((p, idx) => idx === i ? { ...p, [key]: val } : p));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!reportedBy.trim()) e.reportedBy = "Required";
    if (!findings.trim())   e.findings   = "Required";
    if (isLab && params.length === 0) e.params = "Add at least one parameter";
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
      reportedAt:     new Date().toISOString().slice(0, 19),
      reportedBy:     reportedBy.trim(),
      findings:       findings.trim(),
      conclusion:     conclusion.trim() || undefined,
      critical:       hasCritical,
      attachmentName: attachment.trim() || undefined,
      parameters:     isLab && params.length > 0 ? params : undefined,
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

      {/* Reported by */}
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

      {/* Parameters — Lab only */}
      {isLab && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Parameters</p>
            <button
              onClick={addParam}
              className="flex items-center gap-1 rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]"
            >
              <Plus size={12} /> Add row
            </button>
          </div>

          <div className="px-5 py-4 space-y-3">
            {errors.params && <p className="text-xs text-[var(--critical-fg)]">{errors.params}</p>}
            {/* Table header */}
            {params.length > 0 && (
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1.5fr_1fr_auto] gap-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                <span>Parameter</span><span>Value</span><span>Unit</span><span>Ref Range</span><span>Flag</span><span />
              </div>
            )}
            {params.map((p, i) => (
              <div key={i} className={`grid grid-cols-2 gap-2 md:grid-cols-[2fr_1fr_1fr_1.5fr_1fr_auto] md:items-center rounded-lg p-2 ${p.flag === "HH" || p.flag === "LL" ? "bg-[var(--critical-bg)]" : "bg-[var(--surface-sunken)]"}`}>
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
                  className="rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
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
                    p.flag === "HH" || p.flag === "LL"
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
            ))}
            {params.length === 0 && (
              <button
                onClick={addParam}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border-default)] py-4 text-sm text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] transition-colors"
              >
                <Plus size={14} /> Add first parameter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Findings + Conclusion */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {isLab ? "Findings" : "Radiologist Report"}
          </p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Findings *</label>
            <textarea
              rows={4}
              placeholder={isLab ? "Describe findings, methodology, sample quality…" : "Describe imaging findings, measurements, observations…"}
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
          {!isLab && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Attachment Name <span className="text-[var(--text-secondary)] font-normal">(simulated)</span></label>
              <input
                type="text"
                placeholder="e.g. chest-xray-PT-0004.pdf"
                value={attachment}
                onChange={(e) => setAttachment(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
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
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function DiagnosticsDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const order        = useOrderStore((s) => s.getById(orderId));
  const router       = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const latestOrder  = useOrderStore((s) => s.getById(orderId))!;

  if (!order || (order.type !== "Lab" && order.type !== "Imaging")) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          {!order ? "Order not found" : "This order type is not handled by Diagnostics"}
        </p>
        <button onClick={() => router.push("/diagnostics")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to Diagnostics
        </button>
      </div>
    );
  }

  const isCompleted  = order.status === "Completed";
  const isCancelled  = order.status === "Cancelled";
  const canEnter     = !isCompleted && !isCancelled;
  const typeIcon     = order.type === "Lab"
    ? <FlaskConical size={15} />
    : <ScanLine size={15} />;
  const typeCls = order.type === "Lab"
    ? "bg-[var(--info-bg)] text-[var(--info-fg)]"
    : "bg-[var(--action-subtle)] text-[var(--action-primary)]";

  function handleSubmitted() {
    setSubmitted(true);
    // re-read will show ResultView after store update
  }

  return (
    <div className="space-y-5 pb-8">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Diagnostics</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{order.id}</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${typeCls}`}>
            {typeIcon}
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

        {/* Left: order context */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0">

          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Order Details</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Order ID",   order.id],
                ["Type",       order.type],
                ["Priority",   order.priority],
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

          {/* Patient quick-link */}
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

          {/* Order history link */}
          <Link
            href={`/orders/${order.id}`}
            className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors group"
          >
            <span className="font-medium text-[var(--action-primary)]">View full order detail</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {isCancelled && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--critical-fg)]">This order has been cancelled — no result entry needed.</p>
            </div>
          )}
        </div>

        {/* Right: result entry or view */}
        <div className="flex-1 min-w-0">
          {submitted || latestOrder.status === "Completed" ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] px-4 py-3">
                <CheckCircle2 size={16} className="text-[var(--normal-fg)]" />
                <p className="text-sm font-semibold text-[var(--normal-fg)]">Report submitted successfully</p>
              </div>
              {latestOrder.result && (
                <ResultView result={latestOrder.result} type={latestOrder.type} />
              )}
            </div>
          ) : canEnter ? (
            <ResultEntryForm
              orderId={order.id}
              orderType={order.type}
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
    </div>
  );
}
