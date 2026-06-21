"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import { useRadiologyStore, type Modality } from "@/store/useRadiologyStore";
import type { DiagnosticResult } from "@/data/seedOrders";
import {
  ArrowLeft, ScanLine, AlertTriangle, CheckCircle2,
  ChevronRight, User, ShieldAlert, FileText, Image,
  Upload, Printer, Camera, Clock, History,
} from "lucide-react";
import { PdfActions } from "@/components/ui/PdfActions";

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function deduceModality(title: string): Modality | null {
  const p = title.toLowerCase();
  if (p.includes("ct ")) return "CT";
  if (p.includes("mri ") || p.includes("mr ")) return "MRI";
  if (p.includes("ultrasound") || p.includes("doppler") || p.includes("echocardiogram") || p.includes("echo")) return "Ultrasound";
  if (p.includes("mammography") || p.includes("mammo")) return "Mammography";
  if (p.includes("dex") || p.includes("dexa")) return "DEXA";
  if (p.includes("barium") || p.includes("ivp") || p.includes("hsg")) return "Fluoroscopy";
  if (p.includes("bone scan") || p.includes("nuclear")) return "Nuclear Medicine";
  if (p.includes("pet")) return "PET-CT";
  if (p.includes("ecg") || p.includes("ekg") || p.includes("chest") || p.includes("x-ray") || p.includes("knee") || p.includes("spine") || p.includes("pelvis") || p.includes("skull") || p.includes("wrist") || p.includes("ankle") || p.includes("shoulder")) return "X-Ray";
  return null;
}

function getBodyRegion(title: string): string {
  const p = title.toLowerCase();
  if (p.includes("chest") || p.includes("lung") || p.includes("cardiac") || p.includes("echo") || p.includes("ecg") || p.includes("ekg")) return "Chest";
  if (p.includes("brain") || p.includes("head") || p.includes("skull") || p.includes("mrv") || p.includes("ct head")) return "Head";
  if (p.includes("abdomen") || p.includes("liver") || p.includes("kub") || p.includes("mrcp") || p.includes("barium enema") || p.includes("ivp")) return "Abdomen";
  if (p.includes("spine") || p.includes("cervical") || p.includes("thoracic") || p.includes("lumbar") || p.includes("dex")) return "Spine";
  if (p.includes("pelvis") || p.includes("pelvic") || p.includes("hsg")) return "Pelvis";
  if (p.includes("knee") || p.includes("ankle") || p.includes("lower limb") || p.includes("doppler lower")) return "Lower Limb";
  if (p.includes("shoulder") || p.includes("wrist") || p.includes("upper limb") || p.includes("doppler upper")) return "Upper Limb";
  if (p.includes("breast") || p.includes("mammo")) return "Breast";
  if (p.includes("thyroid") || p.includes("carotid") || p.includes("neck")) return "Neck";
  if (p.includes("extremity") || p.includes("barium swallow") || p.includes("bone scan") || p.includes("pet")) return "Extremity";
  if (p.includes("vascular") || p.includes("angio")) return "Vascular";
  if (p.includes("whole body")) return "Whole Body";
  return "";
}

// ── Structured report form fields ─────────────────────────────────────────

interface StructuredData {
  [sectionKey: string]: {
    [fieldKey: string]: string;
  };
}

function StructuredReportForm({
  modality,
  bodyRegion,
  data,
  onChange,
}: {
  modality: Modality;
  bodyRegion: string;
  data: StructuredData;
  onChange: (d: StructuredData) => void;
}) {
  const { getReportTemplate } = useRadiologyStore();
  const template = getReportTemplate(modality, bodyRegion);

  if (!template) return null;

  function updateField(sectionKey: string, fieldKey: string, value: string) {
    onChange({
      ...data,
      [sectionKey]: {
        ...(data[sectionKey] ?? {}),
        [fieldKey]: value,
      },
    });
  }

  return (
    <div className="space-y-4">
      {template.sections.map((section) => (
        <div key={section.key} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{section.label}</p>
          </div>
          <div className="px-5 py-4 space-y-4">
            {section.fields.map((field) => {
              const val = data[section.key]?.[field.key] ?? "";
              if (field.type === "select" && field.options) {
                return (
                  <div key={field.key}>
                    <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">{field.label}</label>
                    <select
                      value={val}
                      onChange={(e) => updateField(section.key, field.key, e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    >
                      <option value="">Select {field.label}…</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (field.type === "textarea") {
                return (
                  <div key={field.key}>
                    <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">{field.label}</label>
                    <textarea
                      rows={3}
                      value={val}
                      onChange={(e) => updateField(section.key, field.key, e.target.value)}
                      className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                  </div>
                );
              }
              if (field.type === "boolean") {
                return (
                  <div key={field.key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={field.key}
                      checked={val === "true"}
                      onChange={(e) => updateField(section.key, field.key, e.target.checked ? "true" : "false")}
                      className="rounded border-[var(--border-default)] text-[var(--action-primary)]"
                    />
                    <label htmlFor={field.key} className="text-sm text-[var(--text-primary)]">{field.label}</label>
                  </div>
                );
              }
              return (
                <div key={field.key}>
                  <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">{field.label}</label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => updateField(section.key, field.key, e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Result view (read-only for completed) ──────────────────────────────────

function ResultView({ result }: { result: DiagnosticResult }) {
  return (
    <div className="space-y-4">
      {result.critical && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
          <ShieldAlert size={18} className="shrink-0 text-[var(--critical-fg)]" />
          <div>
            <p className="text-sm font-bold text-[var(--critical-fg)]">Critical Result — Immediate Physician Review Required</p>
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
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Radiologist Report</p>
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          <div className="px-5 py-4">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Findings</p>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{result.findings}</p>
          </div>
          {result.conclusion && (
            <div className="px-5 py-4">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Impression</p>
              <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{result.conclusion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Entry form ────────────────────────────────────────────────────────────

function ReportEntryForm({ orderId, onSubmit }: { orderId: string; onSubmit: () => void }) {
  const addDiagnosticResult = useOrderStore((s) => s.addDiagnosticResult);
  const updateStatus = useOrderStore((s) => s.updateStatus);
  const order = useOrderStore((s) => s.getById(orderId))!;
  const modality = deduceModality(order.title);
  const bodyRegion = getBodyRegion(order.title);
  const { getReportTemplate } = useRadiologyStore();
  const template = modality ? getReportTemplate(modality, bodyRegion as any) : undefined;

  const [reportedBy, setReportedBy] = useState("Radiologist");
  const [findings, setFindings] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [attachment, setAttachment] = useState("");
  const [structuredData, setStructuredData] = useState<StructuredData>({});
  const [criticalAlert, setCriticalAlert] = useState(false);
  const [readBackConfirmed, setReadBackConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const useStructured = !!template;

  function buildFindingsFromStructured(): string {
    const lines: string[] = [];
    for (const section of template!.sections) {
      const sectionData = structuredData[section.key];
      if (!sectionData) continue;
      const sectionLines: string[] = [];
      for (const field of section.fields) {
        const val = sectionData[field.key];
        if (val && val !== "false") {
          sectionLines.push(`${field.label}: ${val}`);
        }
      }
      if (sectionLines.length > 0) {
        lines.push(`[${section.label}]`);
        lines.push(...sectionLines.map((l) => `  ${l}`));
        lines.push("");
      }
    }
    return lines.join("\n").trim();
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!reportedBy.trim()) e.reportedBy = "Required";
    if (useStructured) {
      const generated = buildFindingsFromStructured();
      if (!generated) e.findings = "Fill in at least one structured field";
    } else {
      if (!findings.trim()) e.findings = "Required";
    }
    if (criticalAlert && !readBackConfirmed) {
      e.readBack = "Read-back confirmation is mandatory for critical findings";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSaveDraft() {
    updateStatus(orderId, "In-Progress", reportedBy, "Draft saved");
  }

  function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    const finalFindings = useStructured ? buildFindingsFromStructured() : findings.trim();
    const result: DiagnosticResult = {
      reportedAt: new Date().toISOString().slice(0, 19),
      reportedBy: reportedBy.trim(),
      findings: finalFindings,
      conclusion: conclusion.trim() || undefined,
      critical: criticalAlert,
      attachmentName: attachment.trim() || undefined,
    };
    setTimeout(() => {
      addDiagnosticResult(orderId, result, reportedBy.trim());
      setSaving(false);
      onSubmit();
    }, 600);
  }

  return (
    <div className="space-y-5">
      {criticalAlert && (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
          <ShieldAlert size={16} className="shrink-0 text-[var(--critical-fg)]" />
          <p className="text-sm font-bold text-[var(--critical-fg)]">
            Critical finding flagged — report will be marked for immediate physician review.
          </p>
        </div>
      )}

      {/* Reporter */}
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

      {/* Structured reporting */}
      {useStructured ? (
        <StructuredReportForm
          modality={modality!}
          bodyRegion={bodyRegion}
          data={structuredData}
          onChange={setStructuredData}
        />
      ) : (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Radiologist Report</p>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Findings *</label>
              <textarea
                rows={5}
                placeholder="Describe imaging findings, measurements, observations…"
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                className={`w-full resize-none rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${errors.findings ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
              />
              {errors.findings && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.findings}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Impression</label>
              <textarea
                rows={3}
                placeholder="Final impression or diagnosis…"
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              />
            </div>
          </div>
        </div>
      )}

      {useStructured && (
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Impression (free-text)</label>
          <textarea
            rows={3}
            placeholder="Final impression or diagnosis…"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>
      )}

      {/* Image viewer placeholder */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5 flex items-center gap-2">
          <Image size={14} className="text-[var(--action-primary)]" />
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Image Viewer</p>
        </div>
        <div className="p-5">
          <div className="rounded-xl border-2 border-dashed border-[var(--border-default)] p-8 text-center">
            <Camera size={36} className="mx-auto mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="text-sm font-medium text-[var(--text-primary)]">DICOM Viewer</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">DICOM viewer integration placeholder</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors">
                <Upload size={12} className="inline mr-1" /> Upload Images
              </button>
              <button className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
                <FileText size={12} className="inline mr-1" /> Launch DICOM Viewer
              </button>
            </div>
          </div>
          {/* Thumbnail grid placeholder */}
          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-[var(--surface-sunken)] flex items-center justify-center border border-[var(--border-default)]">
                <Image size={18} className="text-[var(--text-secondary)] opacity-30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attachment */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Attachment</p>
        </div>
        <div className="px-5 py-4">
          <input
            type="text"
            placeholder="e.g. ct-head-PT-0004.pdf (simulated)"
            value={attachment}
            onChange={(e) => setAttachment(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>
      </div>

      {/* Critical findings */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Critical Findings</p>
        </div>
        <div className="px-5 py-4 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={criticalAlert}
              onChange={(e) => {
                setCriticalAlert(e.target.checked);
                if (!e.target.checked) setReadBackConfirmed(false);
              }}
              className="rounded border-[var(--border-default)] text-[var(--critical-fg)]"
            />
            <span className="text-sm text-[var(--text-primary)]">Flag as critical finding</span>
          </label>
          {criticalAlert && (
            <div className="flex items-start gap-3 rounded-lg bg-[var(--critical-bg)] p-3">
              <input
                type="checkbox"
                checked={readBackConfirmed}
                onChange={(e) => setReadBackConfirmed(e.target.checked)}
                className="mt-0.5 rounded border-[var(--critical-fg)] text-[var(--critical-fg)]"
              />
              <div>
                <p className="text-sm font-medium text-[var(--critical-fg)]">Read-back Confirmation</p>
                <p className="text-xs text-[var(--critical-fg)] opacity-80">I confirm that the critical finding has been read back to the ordering physician.</p>
                {errors.readBack && <p className="mt-1 text-xs text-[var(--critical-fg)] font-bold">{errors.readBack}</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison placeholder */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Comparison with Prior Study</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-sm text-[var(--text-secondary)]">
            <History size={14} className="inline mr-1" />
            No prior imaging study available for comparison. (Placeholder — PACS integration pending.)
          </p>
        </div>
      </div>

      {/* Actions */}
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
          {saving ? "Submitting…" : "Complete Report"}
        </button>
        <PdfActions template="radiology-report" id={orderId} filename={`radiology-report-${orderId}.pdf`} />
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────

export default function RadiologyDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const order = useOrderStore((s) => s.getById(orderId));
  const radiOrders = useOrderStore((s) => s.orders).filter((o) => o.type === "Imaging");
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const latestOrder = useOrderStore((s) => s.getById(orderId))!;

  // Patient history — recent imaging for the same patient
  const patientHistory = useMemo(() => {
    if (!order) return [];
    return radiOrders
      .filter((o) => o.patientId === order.patientId && o.id !== order.id)
      .sort((a, b) => b.orderedAt.localeCompare(a.orderedAt))
      .slice(0, 5);
  }, [order, radiOrders]);

  if (!order || order.type !== "Imaging") {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          {!order ? "Order not found" : "This order is not an imaging study"}
        </p>
        <button onClick={() => router.push("/radiology")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to Radiology
        </button>
      </div>
    );
  }

  const isCompleted = order.status === "Completed";
  const isCancelled = order.status === "Cancelled";
  const canEnter = !isCompleted && !isCancelled;

  return (
    <div className="space-y-5 pb-8 print-root">
      {/* Print-only header */}
      <div className="print-header">
        <h1>Aarogya Hospital</h1>
        <p className="print-sub">Multi-Specialty Hospital &amp; Research Centre</p>
        <p className="print-contact">123 Healthcare Avenue, Medical District · Tel: +91-80-2345-6789 · info@aarogya.in</p>
      </div>
      <div className="print-title">Radiology Report</div>
      <div className="print-info-grid">
        <div><div className="label">Patient Name</div><div className="value">{order.patientName}</div></div>
        <div><div className="label">Patient ID</div><div className="value">{order.patientId}</div></div>
        <div><div className="label">Procedure</div><div className="value">{order.title}</div></div>
        <div><div className="label">Order ID</div><div className="value">{order.id}</div></div>
        <div><div className="label">Ordered By</div><div className="value">{order.orderedBy}</div></div>
        <div><div className="label">Date</div><div className="value">{fmtDateTime(order.orderedAt)}</div></div>
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
          <span className="text-sm text-[var(--text-secondary)]">Radiology</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{order.id}</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--action-subtle)] text-[var(--action-primary)]">
            <ScanLine size={20} />
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
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                latestOrder.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                : latestOrder.status === "In-Progress" ? "bg-[var(--action-subtle)] text-[var(--action-primary)]"
                : "bg-[var(--info-bg)] text-[var(--info-fg)]"
              }`}>
                {latestOrder.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{order.details}</p>
            {order.notes && (
              <p className="mt-1 text-xs text-[var(--warning-fg)] italic">Note: {order.notes}</p>
            )}
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {/* Left: sidebar */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0">
          {/* Order details */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Order Details</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Order ID", order.id],
                ["Modality", deduceModality(order.title) ?? "—"],
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

          {/* Patient card */}
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

          {/* Status timeline */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status Timeline</p>
            </div>
            <div className="px-4 py-3 space-y-3">
              {latestOrder.statusHistory.map((ev, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-2 w-2 rounded-full ${
                      ev.status === "Completed" ? "bg-[var(--normal-fg)]"
                      : ev.status === "In-Progress" ? "bg-[var(--action-primary)]"
                      : ev.status === "Cancelled" ? "bg-[var(--critical-fg)]"
                      : "bg-[var(--text-secondary)]"
                    }`} />
                    {i < latestOrder.statusHistory.length - 1 && (
                      <div className="w-px flex-1 bg-[var(--border-default)] mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-xs font-medium text-[var(--text-primary)]">{ev.status}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{fmtDateTime(ev.at)} by {ev.by}</p>
                    {ev.note && <p className="mt-0.5 text-[10px] text-[var(--text-secondary)] italic">{ev.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient history */}
          {patientHistory.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5 flex items-center gap-2">
                <Clock size={12} className="text-[var(--text-secondary)]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Recent Imaging</p>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {patientHistory.map((ph) => (
                  <Link
                    key={ph.id}
                    href={`/radiology/${ph.id}`}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-[var(--surface-sunken)] transition-colors group"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[var(--text-primary)] truncate">{ph.title}</p>
                      <p className="text-[10px] text-[var(--text-secondary)]">{fmtDateTime(ph.orderedAt)}</p>
                    </div>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                      ph.status === "Completed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                      : "bg-[var(--info-bg)] text-[var(--info-fg)]"
                    }`}>{ph.status}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Clinical indication */}
          {order.details && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Clinical Indication</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-[var(--text-primary)]">{order.details}</p>
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--critical-fg)]">This order has been cancelled — no report entry needed.</p>
            </div>
          )}
        </div>

        {/* Right: report entry or view */}
        <div className="flex-1 min-w-0">
          {submitted || latestOrder.status === "Completed" ? (
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
            <ReportEntryForm orderId={order.id} onSubmit={() => setSubmitted(true)} />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)] opacity-50" />
              <p className="font-medium text-[var(--text-primary)]">No report entry available</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Order status: {order.status}</p>
            </div>
          )}
        </div>
      </div>

      <div className="print-section">
        <h3>Radiologist Report</h3>
        {latestOrder.result ? (
          <div className="content">
            {latestOrder.result.findings}
            {latestOrder.result.conclusion ? `\n\nImpression:\n${latestOrder.result.conclusion}` : ""}
          </div>
        ) : (
          <p className="print-muted">Report not yet completed</p>
        )}
      </div>

      {latestOrder.result?.critical && (
        <p className="print-critical-badge">Critical Finding — Immediate Physician Review Required</p>
      )}

      <div className="print-signature">
        <div className="sig-block">
          <div className="sig-line" />
          <div className="sig-label">Reporting Radiologist</div>
          <div className="sig-name">{latestOrder.result?.reportedBy ?? order.orderedBy}</div>
        </div>
      </div>

      <div className="print-footer">
        <span>Digitally signed report</span>
        <span>Order ID: {order.id}</span>
        {latestOrder.result && <span>Reported: {fmtDateTime(latestOrder.result.reportedAt)}</span>}
      </div>
    </div>
  );
}
