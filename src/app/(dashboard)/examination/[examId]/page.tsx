"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useExaminationStore, type NoteStatus, type Examination } from "@/store/useExaminationStore";
import { usePharmacyStore } from "@/store/usePharmacyStore";
import { useToast } from "@/components/ui/ToastProvider";
import { getTemplate } from "@/data/templateRegistry";
import {
  type SystemicFinding,
  type Rx, type Diagnosis,
  ICD_SUGGESTIONS, DEFAULT_SYSTEMS,
} from "@/data/seedExaminations";
import type { Vitals } from "@/data/seedPatients";
import { SchemaForm, useSchemaForm } from "@/components/examination/SchemaForm";
import { submitOrderSetItems } from "@/services/orderSetBridge";
import type { TemplateField } from "@/data/templateSchema";
import {
  ChevronLeft, FileText, ShieldCheck, CheckCircle2, Save,
  Plus, Trash2, User, ClipboardList, Stethoscope, Activity,
  FlaskConical, AlertCircle, X, Pill, ChevronDown, ChevronUp, Send,
  Eye, Lock, History, FilePlus, ArrowRight, Printer,
} from "lucide-react";
import { PdfActions } from "@/components/ui/PdfActions";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<NoteStatus, string> = {
  "Draft":    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In Review":"bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Signed":   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Locked":   "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const STATUS_ICON: Record<NoteStatus, React.ReactNode> = {
  "Draft":    <FileText size={11} />,
  "In Review":<Eye size={11} />,
  "Signed":   <ShieldCheck size={11} />,
  "Locked":   <Lock size={11} />,
};

function fmtDT(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

function uuid4() { return crypto.randomUUID(); }

const ROUTES = ["Oral","IV","IM","Topical","Inhaler","SL","SC"] as const;
const DIAG_TYPES = ["Primary","Secondary","Differential"] as const;
const DIAG_STATUSES = ["Active","Resolved","Chronic"] as const;
const FREQ_OPTS = ["OD","BD","TDS","QID","SOS","HS","Weekly","Monthly"];

// ── Section anchor IDs ────────────────────────────────────────────────────────
const SECTIONS = [
  { id: "subjective",  label: "S — Subjective", icon: <ClipboardList size={14} /> },
  { id: "objective",   label: "O — Objective",  icon: <Stethoscope size={14} /> },
  { id: "assessment",  label: "A — Assessment", icon: <FlaskConical size={14} /> },
  { id: "plan",        label: "P — Plan",       icon: <Activity size={14} /> },
];

// ── Vitals mini-form ──────────────────────────────────────────────────────────

function VitalsForm({ vitals, onChange, readOnly }: {
  vitals: Partial<Vitals>;
  onChange: (v: Partial<Vitals>) => void;
  readOnly: boolean;
}) {
  function upd(k: keyof Vitals, val: string) {
    if (k === "recordedAt" || k === "bp") {
      onChange({ ...vitals, [k]: val });
      return;
    }
    const num = parseFloat(val);
    const update: Partial<Vitals> = { [k]: isNaN(num) ? undefined : num };
    const w = k === "weight" ? (isNaN(num) ? vitals.weight : num) : vitals.weight;
    const h = k === "height" ? (isNaN(num) ? vitals.height : num) : vitals.height;
    if (w && h) update.bmi = parseFloat((w / ((h / 100) ** 2)).toFixed(1));
    onChange({ ...vitals, ...update });
  }
  const inp = "rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm w-full outline-none focus:border-[var(--action-primary)]";
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {[
        { label: "BP (mmHg)", key: "bp", type: "text" },
        { label: "Pulse (bpm)", key: "pulse", type: "number" },
        { label: "SpO₂ (%)", key: "spo2", type: "number" },
        { label: "Temp (°C)", key: "temp", type: "number" },
        { label: "Weight (kg)", key: "weight", type: "number" },
        { label: "Height (cm)", key: "height", type: "number" },
      ].map(({ label, key, type }) => (
        <div key={key}>
          <label className="mb-1 block text-xs text-[var(--text-secondary)]">{label}</label>
          <input
            type={type}
            readOnly={readOnly}
            className={inp}
            value={(vitals as Record<string, unknown>)[key] as string ?? ""}
            onChange={(e) => !readOnly && upd(key as keyof Vitals, e.target.value)}
            placeholder="—"
          />
        </div>
      ))}
      <div>
        <label className="mb-1 block text-xs text-[var(--text-secondary)]">BMI (auto)</label>
        <div className={`${inp} bg-[var(--surface-sunken)] text-[var(--text-secondary)]`}>
          {vitals.bmi ?? "—"}
        </div>
      </div>
    </div>
  );
}

// ── Systemic findings accordion ───────────────────────────────────────────────

function SystemicRow({ sf, onChange, readOnly }: { sf: SystemicFinding; onChange: (sf: SystemicFinding) => void; readOnly: boolean }) {
  const [open, setOpen] = useState(!sf.normal);
  return (
    <div className="rounded-lg border border-[var(--border-default)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm"
      >
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full shrink-0 ${sf.normal ? "bg-green-500" : "bg-red-500"}`} />
          <span className="font-medium text-[var(--text-primary)]">{sf.system}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-secondary)] truncate max-w-[200px]">{sf.finding || "—"}</span>
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </div>
      </button>
      {open && (
        <div className="border-t border-[var(--border-default)] px-4 py-3 space-y-2">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm">
              <input
                type="checkbox"
                checked={sf.normal}
                disabled={readOnly}
                onChange={(e) => onChange({ ...sf, normal: e.target.checked, finding: e.target.checked ? "Normal" : sf.finding })}
                className="accent-[var(--action-primary)] h-4 w-4"
              />
              Mark Normal
            </label>
          </div>
          <textarea
            rows={2}
            readOnly={readOnly}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]"
            value={sf.finding}
            onChange={(e) => !readOnly && onChange({ ...sf, finding: e.target.value, normal: e.target.value.toLowerCase().includes("normal") })}
            placeholder="Enter finding…"
          />
        </div>
      )}
    </div>
  );
}

// ── Rx row ────────────────────────────────────────────────────────────────────

function RxRow({ rx, onChange, onDelete, readOnly }: { rx: Rx; onChange: (r: Rx) => void; onDelete: () => void; readOnly: boolean }) {
  const inp = "rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]";
  return (
    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-2 items-start py-3 border-b border-[var(--border-default)] last:border-b-0">
      <div>
        <input readOnly={readOnly} className={`${inp} w-full`} placeholder="Drug name" value={rx.drug} onChange={(e) => !readOnly && onChange({ ...rx, drug: e.target.value })} />
      </div>
      <input readOnly={readOnly} className={`${inp} w-full`} placeholder="Dose" value={rx.dose} onChange={(e) => !readOnly && onChange({ ...rx, dose: e.target.value })} />
      <select disabled={readOnly} className={`${inp} w-full`} value={rx.route} onChange={(e) => !readOnly && onChange({ ...rx, route: e.target.value as Rx["route"] })}>
        {ROUTES.map((r) => <option key={r}>{r}</option>)}
      </select>
      <select disabled={readOnly} className={`${inp} w-full`} value={rx.frequency} onChange={(e) => !readOnly && onChange({ ...rx, frequency: e.target.value })}>
        {FREQ_OPTS.map((f) => <option key={f}>{f}</option>)}
      </select>
      <input readOnly={readOnly} className={`${inp} w-full`} placeholder="Duration" value={rx.duration} onChange={(e) => !readOnly && onChange({ ...rx, duration: e.target.value })} />
      {!readOnly && (
        <button onClick={onDelete} className="mt-0.5 rounded p-1 text-[var(--text-secondary)] hover:text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

// ── Diagnosis row ─────────────────────────────────────────────────────────────

function DiagRow({ d, onChange, onDelete, readOnly }: { d: Diagnosis; onChange: (d: Diagnosis) => void; onDelete: () => void; readOnly: boolean }) {
  const inp = "rounded border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-xs outline-none focus:border-[var(--action-primary)]";
  return (
    <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-2 items-center py-3 border-b border-[var(--border-default)] last:border-b-0">
      <input readOnly={readOnly} className={`${inp} w-full font-mono`} placeholder="ICD code" value={d.code ?? ""} onChange={(e) => !readOnly && onChange({ ...d, code: e.target.value })} />
      <input readOnly={readOnly} className={`${inp} w-full`} placeholder="Diagnosis label" value={d.label} onChange={(e) => !readOnly && onChange({ ...d, label: e.target.value })} />
      <select disabled={readOnly} className={`${inp} w-full`} value={d.type} onChange={(e) => !readOnly && onChange({ ...d, type: e.target.value as Diagnosis["type"] })}>
        {DIAG_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>
      <select disabled={readOnly} className={`${inp} w-full`} value={d.status} onChange={(e) => !readOnly && onChange({ ...d, status: e.target.value as Diagnosis["status"] })}>
        {DIAG_STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
      {!readOnly && (
        <button onClick={onDelete} className="rounded p-1 text-[var(--text-secondary)] hover:text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]">
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

// ── Template-Driven (non-SOAP) Editor ──────────────────────────────────────────

function collectOrderSetFieldValues(
  fields: TemplateField[],
  values: Record<string, unknown>
): string[] {
  const ids: string[] = [];
  for (const f of fields) {
    if (f.type === "orderSet") {
      const v = values[f.key];
      if (Array.isArray(v)) ids.push(...v);
    }
    if (f.fields) ids.push(...collectOrderSetFieldValues(f.fields, values));
  }
  return ids;
}

function SchemaFormEditor({ examId, exam, template }: {
  examId: string;
  exam: Examination;
  template: NonNullable<ReturnType<typeof getTemplate>>;
}) {
  const store = useExaminationStore();
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);

  const initialValues = (exam.templateData ?? {}) as Record<string, unknown>;
  const { values, setValue } = useSchemaForm(initialValues);

  const isReadOnly = exam.status === "Signed" || exam.status === "Locked";

  function handleSave() {
    store.saveDraft(examId, {
      subjective: exam.subjective,
      objective: exam.objective,
      assessment: exam.assessment,
      plan: exam.plan,
      templateData: values,
    }, exam.doctor ?? "Unknown");

    const selectedIds = collectOrderSetFieldValues(
      template.sections.flatMap((s) => s.fields),
      values
    );
    if (selectedIds.length > 0) {
      const res = submitOrderSetItems(
        selectedIds,
        exam.patientId,
        exam.patientName,
        exam.doctor ?? "Unknown"
      );
      if (res.created > 0) {
        toast(`${res.created} order(s) created from order sets`, "success");
      }
      if (res.failed > 0) {
        toast(`${res.failed} order set item(s) not found`, "warning");
      }
    }

    setSaved(true);
    toast("Draft saved", "success");
    setTimeout(() => setSaved(false), 2000);
  }

  const handleSaveRef = { current: null as (() => void) | null };
  handleSaveRef.current = handleSave;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && !isReadOnly) {
        e.preventDefault();
        handleSaveRef.current?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusCls = STATUS_CLS[exam.status];
  const statusIcon = STATUS_ICON[exam.status];

  return (
    <div className="mx-auto max-w-5xl pb-8 print-root">
      {/* Print-only header */}
      <div className="print-header">
        <h1>Aarogya Hospital</h1>
        <p className="print-sub">Multi-Specialty Hospital &amp; Research Centre</p>
        <p className="print-contact">123 Healthcare Avenue, Medical District · Tel: +91-80-2345-6789 · info@aarogya.in</p>
      </div>
      <div className="print-title">{template.name}</div>
      <div className="print-info-grid">
        <div><div className="label">Patient Name</div><div className="value">{exam.patientName}</div></div>
        <div><div className="label">Patient ID</div><div className="value">{exam.patientId}</div></div>
        <div><div className="label">Exam ID</div><div className="value">{exam.id}</div></div>
        <div><div className="label">Date</div><div className="value">{fmtDT(exam.startedAt)}</div></div>
        <div><div className="label">Doctor</div><div className="value">{exam.doctor}</div></div>
        <div><div className="label">Department</div><div className="value">{exam.dept}</div></div>
        <div><div className="label">Template</div><div className="value">{template.name}</div></div>
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <Link href="/examination" className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
            <ChevronLeft size={14} />
          </Link>
          <span className="text-sm text-[var(--text-secondary)]">Examination</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">{exam.id}</h1>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusCls}`}>
              {statusIcon} {exam.status}
            </span>
            <span className="rounded-full bg-[var(--action-subtle)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--action-primary)]">
              {template.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PdfActions template="opd-slip" id={examId} filename={`opd-slip-${examId}.pdf`} />
            {!isReadOnly && (
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
              >
                <Save size={14} /> {saved ? "Saved!" : "Save Draft"}
              </button>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--text-secondary)]">
          <span>Patient: {exam.patientName}</span>
          <span>Doctor: {exam.doctor}</span>
          <span>Dept: {exam.dept}</span>
        </div>
      </div>

      {/* SchemaForm */}
      <div className="mt-6">
        <SchemaForm
          template={template}
          values={values}
          onChange={setValue}
          readOnly={isReadOnly}
        />
      </div>

      {/* Print-only template values */}
      <div className="print-section">
        <h3>Template Data</h3>
        {template.sections.map((section) => {
          const sectionHasData = section.fields.some((f) => {
            const v = values[f.key];
            return v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);
          });
          if (!sectionHasData) return null;
          return (
            <div key={section.key} style={{ marginBottom: "8pt" }}>
              <p className="print-bold" style={{ fontSize: "8pt", marginBottom: "3pt" }}>{section.label}</p>
              {section.fields.map((f) => {
                const v = values[f.key];
                if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) return null;
                const displayVal = Array.isArray(v) ? v.join(", ") : String(v);
                return (
                  <p key={f.key} style={{ fontSize: "8pt", margin: "1pt 0", paddingLeft: "8pt" }}>
                    <span className="print-bold">{f.label || f.key}: </span>
                    {displayVal}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="print-signature">
        <div className="sig-block">
          <div className="sig-line" />
          <div className="sig-label">Attending Physician</div>
          <div className="sig-name">{exam.doctor}</div>
        </div>
      </div>

      <div className="print-footer">
        <span>Clinical note — {template.name}</span>
        <span>Exam ID: {exam.id}</span>
        <span>Generated: {fmtDT(new Date().toISOString())}</span>
      </div>
    </div>
  );
}

// ── SOAP Editor (existing hardcoded form) ───────────────────────────────────────

function SOAPEditor({ examId, exam }: {
  examId: string;
  exam: Examination;
}) {
  const store = useExaminationStore();
  const { toast } = useToast();

  // Local draft state
  const [chiefComplaint, setCC]   = useState(exam.subjective.chiefComplaint   ?? "");
  const [hpi,            setHPI]  = useState(exam.subjective.historyOfIllness ?? "");
  const [ros,            setROS]  = useState(exam.subjective.reviewOfSystems  ?? "");
  const [genAppearance,  setGA]   = useState(exam.objective.generalAppearance ?? "");
  const today = new Date().toISOString().slice(0, 10);
  const [vitals, setVitals] = useState<Partial<Vitals>>(exam.objective.vitals ?? { recordedAt: today });
  const [sysFindings,    setSysFindings] = useState<SystemicFinding[]>(
    exam.objective.systemicFindings ?? DEFAULT_SYSTEMS.map((s) => ({ system: s, finding: "Normal", normal: true }))
  );
  const [showAbnormalOnly, setShowAbnormalOnly] = useState(false);
  const [diagnoses,   setDiagnoses] = useState<Diagnosis[]>(exam.assessment.diagnoses ?? []);
  const [prescriptions, setRx]   = useState<Rx[]>(exam.plan.prescriptions ?? []);
  const [procedures,  setProcs]  = useState(exam.plan.procedures  ?? "");
  const [referrals,   setRefs]   = useState(exam.plan.referrals   ?? "");
  const [followUp,    setFollowUp] = useState(exam.plan.followUpDays ?? 0);
  const [ptInstr,     setPtInstr] = useState(exam.plan.patientInstructions ?? "");
  const [notes,       setNotes]  = useState(exam.notes ?? "");
  const [saved,       setSaved]    = useState(false);
  const [signed,      setSigned]   = useState(false);
  const [rxSent,      setRxSent]   = useState(false);
  const [activeSection, setActiveSection] = useState("subjective");
  const [showAddendumForm, setShowAddendumForm] = useState(false);
  const [addendumText, setAddendumText] = useState("");
  const [addendumReason, setAddendumReason] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);

  const handleSaveRef = { current: null as (() => void) | null };
  const isReadOnly = exam.status === "Signed" || exam.status === "Locked";

  function handleSave() {
    store.saveDraft(examId, buildPayload(), exam.doctor ?? "Unknown");
    setSaved(true);
    toast("Examination draft saved", "success");
    setTimeout(() => setSaved(false), 2000);
  }
  handleSaveRef.current = handleSave;

  // Ctrl+S / Cmd+S keyboard shortcut to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && !isReadOnly) {
        e.preventDefault();
        handleSaveRef.current?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ICD suggestions from chief complaint
  const icdSuggestions = useMemo(() => {
    const cc = chiefComplaint.toLowerCase();
    const suggestions: Array<{ code: string; label: string }> = [];
    for (const [kw, items] of Object.entries(ICD_SUGGESTIONS)) {
      if (cc.includes(kw)) suggestions.push(...items);
    }
    return [...new Map(suggestions.map((s) => [s.code, s])).values()].slice(0, 6);
  }, [chiefComplaint]);

  const createRx = usePharmacyStore((s) => s.createPrescription);

  const currentStatus = exam.status;
  const hasAddenda = exam.addenda.length > 0;
  const totalVersions = exam.versions.length;

  function handleSendToPharmacy() {
    if (prescriptions.length === 0) return;
    createRx({
      patientId:    exam.patientId,
      patientName:  exam.patientName,
      examId:       exam.id,
      source:       exam.type === "IPD Review" ? "IPD" : exam.type === "Emergency" ? "Emergency" : "OPD",
      prescribedBy: exam.doctor,
      dept:         exam.dept,
      items: prescriptions.map((rx, idx) => ({
        id:           `RXI-NEW-${Date.now()}-${idx}`,
        drug:         rx.drug,
        genericName:  rx.drug,
        form:         "Tablet" as const,
        strength:     rx.dose,
        dose:         rx.dose,
        route:        rx.route,
        frequency:    rx.frequency,
        duration:     rx.duration,
        qty:          parseInt(rx.duration) || 10,
        unitPrice:    0,
        stockStatus:  "Available" as const,
        instructions: rx.instructions,
      })),
      notes: `Sent from Examination ${exam.id}`,
    });
    setRxSent(true);
    setTimeout(() => setRxSent(false), 3000);
  }

  function buildPayload() {
    return {
      subjective:  { chiefComplaint, historyOfIllness: hpi, reviewOfSystems: ros },
      objective:   { vitals: (vitals.bp || vitals.pulse || vitals.spo2 || vitals.temp || vitals.weight || vitals.height) ? (vitals as Vitals) : undefined, generalAppearance: genAppearance, systemicFindings: sysFindings },
      assessment:  { diagnoses },
      plan:        { orders: exam.plan.orders ?? [], prescriptions, procedures, referrals, followUpDays: followUp || undefined, patientInstructions: ptInstr },
      notes,
    };
  }

  function handleSubmitForReview() {
    store.saveDraft(examId, buildPayload(), exam?.doctor ?? "Unknown");
    store.submitForReview(examId);
    toast("Examination submitted for review", "success");
  }

  function handleSignOff() {
    store.saveDraft(examId, buildPayload(), exam.doctor ?? "Unknown");
    store.signOff(examId, exam.doctor ?? "Unknown");
    setSigned(true);
    toast("Examination signed off successfully", "success");
  }

  function handleAddAddendum() {
    if (!addendumText.trim() || !addendumReason.trim()) return;
    store.addAddendum(examId, {
      content: addendumText,
      reason: addendumReason,
      author: exam.doctor ?? "Unknown",
    });
    setAddendumText("");
    setAddendumReason("");
    setShowAddendumForm(false);
    toast("Addendum added to note", "success");
  }

  function updateSysFinding(idx: number, sf: SystemicFinding) {
    setSysFindings((prev) => prev.map((x, i) => i === idx ? sf : x));
  }

  function addDiagnosis() {
    setDiagnoses((prev) => [...prev, { code: "", label: "", type: "Primary", status: "Active" }]);
  }

  function addRx() {
    setRx((prev) => [...prev, { id: uuid4(), drug: "", dose: "", route: "Oral", frequency: "OD", duration: "5 days" }]);
  }

  const ta = "w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] resize-none";

  return (
    <div className="space-y-0 pb-8 print-root">
      {/* Print-only header */}
      <div className="print-header">
        <h1>Aarogya Hospital</h1>
        <p className="print-sub">Multi-Specialty Hospital &amp; Research Centre</p>
        <p className="print-contact">123 Healthcare Avenue, Medical District · Tel: +91-80-2345-6789 · info@aarogya.in</p>
      </div>
      <div className="print-title">Clinical Consultation Note</div>
      <div className="print-info-grid">
        <div><div className="label">Patient Name</div><div className="value">{exam.patientName}</div></div>
        <div><div className="label">Patient ID</div><div className="value">{exam.patientId}</div></div>
        <div><div className="label">Exam ID</div><div className="value">{exam.id}</div></div>
        <div><div className="label">Date</div><div className="value">{fmtDT(exam.startedAt)}</div></div>
        <div><div className="label">Doctor</div><div className="value">{exam.doctor}</div></div>
        <div><div className="label">Department</div><div className="value">{exam.dept}</div></div>
        <div><div className="label">Type</div><div className="value">{exam.type}</div></div>
        <div><div className="label">Status</div><div className="value">{exam.status}</div></div>
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-[var(--border-default)] bg-[var(--surface-raised)] px-0 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/examination" className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
              <ChevronLeft size={15} /> Back
            </Link>
            <span className="text-[var(--border-default)]">/</span>
            <div>
              <p className="font-mono text-xs text-[var(--text-secondary)]">{examId}</p>
              <h1 className="text-base font-semibold text-[var(--text-primary)] leading-tight">{exam.patientName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLS[currentStatus]}`}>
              {STATUS_ICON[currentStatus]}
              {currentStatus}
              {hasAddenda && <span className="ml-1 rounded-full bg-[var(--critical-bg)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--critical-fg)]">+{exam.addenda.length}</span>}
            </span>
            {exam.templateId && exam.templateId !== "soap-default" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-semibold text-[var(--action-primary)]">
                {getTemplate(exam.templateId)?.name ?? "Custom"}
              </span>
            )}
            <button
              onClick={() => setShowTimeline((v) => !v)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
              title="Version history"
            >
              <History size={12} /> v{totalVersions}
            </button>

            {currentStatus === "Draft" && (
              <>
                <PdfActions template="opd-slip" id={examId} filename={`opd-slip-${examId}.pdf`} showPrint={false} />
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    saved
                      ? "border-[var(--normal-fg)] bg-[var(--normal-bg)] text-[var(--normal-fg)] scale-[1.03]"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  }`}
                >
                  {saved ? (
                    <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2.5}>
                      <polyline points="2 7 6 11 12 3" className="animate-check" />
                    </svg>
                  ) : (
                    <Save size={13} />
                  )}
                  {saved ? "Saved!" : <span>Save <kbd className="ml-1 rounded border border-[var(--border-default)] px-1 py-0.5 text-[10px] font-mono opacity-50">⌘S</kbd></span>}
                </button>
                <button
                  onClick={handleSubmitForReview}
                  className="flex items-center gap-2 rounded-xl border border-[var(--action-primary)] px-3 py-2 text-sm font-semibold text-[var(--action-primary)] hover:bg-[var(--action-subtle)]"
                >
                  <Eye size={13} /> Submit for Review
                </button>
                <button
                  onClick={handleSignOff}
                  className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]"
                >
                  <ShieldCheck size={13} /> Sign Off
                </button>
              </>
            )}

            {currentStatus === "In Review" && (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                >
                  <Save size={13} /> Update Draft
                </button>
                <button
                  onClick={handleSignOff}
                  className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]"
                >
                  <ShieldCheck size={13} /> Approve &amp; Sign
                </button>
              </>
            )}

            {currentStatus === "Signed" && (
              <>
                <button
                  onClick={() => setShowAddendumForm((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--critical-fg)] px-3 py-2 text-sm font-medium text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]"
                >
                  <FilePlus size={13} /> Add Addendum
                </button>
                <button
                  onClick={() => store.lockNote(examId)}
                  className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                >
                  <Lock size={13} /> Lock Note
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Lifecycle banner */}
      {(currentStatus === "Signed" || currentStatus === "Locked" || signed) && (
        <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 mt-4 text-sm ${currentStatus === "Locked" ? "border-slate-200 bg-slate-50 text-slate-700" : "border-green-200 bg-green-50 text-green-800"}`}>
          {currentStatus === "Locked" ? <Lock size={16} className="shrink-0" /> : <CheckCircle2 size={16} className="shrink-0" />}
          <div>
            <p className="font-semibold">Examination {currentStatus === "Locked" ? "Locked" : "Signed"}</p>
            <p className="text-xs mt-0.5">By {exam.signedBy ?? exam.doctor} on {fmtDT(exam.signedAt ?? exam.completedAt)}{currentStatus === "Locked" && " — No further edits allowed"}</p>
          </div>
        </div>
      )}

      {/* In Review banner */}
      {currentStatus === "In Review" && (
        <div className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 mt-4 text-sm text-sky-800">
          <Eye size={16} className="shrink-0" />
          <div>
            <p className="font-semibold">Pending Review</p>
            <p className="text-xs text-sky-700 mt-0.5">This note has been submitted for review — {totalVersions} version{totalVersions !== 1 ? "s" : ""} saved</p>
          </div>
        </div>
      )}

      {/* ── Version Timeline ── */}
      {showTimeline && (
        <div className="mt-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-3">
            <div className="flex items-center gap-2">
              <History size={15} className="text-[var(--action-primary)]" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">Version History</p>
            </div>
            <button onClick={() => setShowTimeline(false)} className="rounded p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={14} /></button>
          </div>
          <div className="divide-y divide-[var(--border-default)] max-h-64 overflow-y-auto">
            {[...exam.versions].reverse().map((v) => (
              <div key={v.versionNumber} className="flex items-center gap-3 px-5 py-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--action-subtle)] text-[10px] font-bold text-[var(--action-primary)]">
                  {v.versionNumber === exam.currentVersionNumber ? <CheckCircle2 size={12} /> : v.versionNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--text-primary)]">v{v.versionNumber} {v.versionNumber === exam.currentVersionNumber && <span className="text-[10px] text-[var(--normal-fg)]">(current)</span>}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{v.changeSummary} · {fmtDT(v.savedAt)} by {v.savedBy}</p>
                </div>
              </div>
            ))}
          </div>
          {hasAddenda && (
            <div className="border-t border-[var(--border-default)] bg-[var(--critical-bg)]/30 px-5 py-3">
              <p className="text-xs font-semibold text-[var(--critical-fg)]">This note has {exam.addenda.length} addendum/amendments</p>
            </div>
          )}
        </div>
      )}

      {/* ── Addendum Form ── */}
      {showAddendumForm && currentStatus === "Signed" && (
        <div className="mt-4 rounded-xl border-2 border-[var(--critical-fg)]/30 bg-[var(--critical-bg)] overflow-hidden">
          <div className="flex items-center gap-2 border-b border-[var(--critical-fg)]/20 px-5 py-3">
            <FilePlus size={15} className="text-[var(--critical-fg)]" />
            <p className="text-sm font-semibold text-[var(--critical-fg)]">Add Addendum</p>
            <p className="text-[11px] text-[var(--text-secondary)] ml-1">— Original signed note will not be altered</p>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Reason for Addendum *</label>
              <input
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--critical-fg)]"
                placeholder="e.g. Additional diagnosis, omitted finding…"
                value={addendumReason}
                onChange={(e) => setAddendumReason(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Addendum Content *</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--critical-fg)] resize-none"
                placeholder="Enter additional information…"
                value={addendumText}
                onChange={(e) => setAddendumText(e.target.value)}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowAddendumForm(false); setAddendumText(""); setAddendumReason(""); }}
                className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                Cancel
              </button>
              <button onClick={handleAddAddendum} disabled={!addendumText.trim() || !addendumReason.trim()}
                className="flex items-center gap-2 rounded-lg bg-[var(--critical-fg)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                <ArrowRight size={13} /> Add Addendum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Existing Addenda display ── */}
      {hasAddenda && (
        <div className="mt-4 space-y-3">
          {exam.addenda.map((a) => (
            <div key={a.id} className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--critical-fg)]/20 px-5 py-2.5">
                <div className="flex items-center gap-2">
                  <FilePlus size={13} className="text-[var(--critical-fg)]" />
                  <p className="text-xs font-semibold text-[var(--critical-fg)]">Addendum</p>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)]">{fmtDT(a.createdAt)} by {a.author}</p>
              </div>
              <div className="px-5 py-3">
                <p className="text-[11px] font-medium text-[var(--text-secondary)] mb-1">Reason: {a.reason}</p>
                <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{a.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-6">
        {/* Left panel */}
        <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 space-y-4">
          {/* SOAP nav */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <p className="bg-[var(--surface-sunken)] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">SOAP Sections</p>
            <div className="divide-y divide-[var(--border-default)]">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors ${activeSection === s.id ? "bg-[var(--action-subtle)] font-semibold text-[var(--action-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Patient mini-card */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Patient</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--action-primary)] text-xs font-bold text-white shrink-0">
                {exam.patientName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{exam.patientName}</p>
                <p className="font-mono text-[10px] text-[var(--text-secondary)]">{exam.patientId}</p>
              </div>
            </div>
            <Link href={`/patients/${exam.patientId}`} className="flex items-center gap-1 text-xs text-[var(--action-primary)] hover:underline">
              <User size={11} /> View Patient Record
            </Link>
          </div>

          {/* Exam info */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-xs space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-2">Exam Info</p>
            {[
              { label: "Type",     value: exam.type },
              { label: "Dept",     value: exam.dept },
              { label: "Doctor",   value: exam.doctor },
              { label: "Template", value: (exam.templateId ? getTemplate(exam.templateId)?.name : undefined) ?? "SOAP Note" },
              { label: "Started",  value: fmtDT(exam.startedAt) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-2">
                <span className="text-[var(--text-secondary)]">{label}</span>
                <span className="font-medium text-[var(--text-primary)] text-right">{value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center SOAP editor */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* ── S: Subjective ── */}
          <section id="subjective" className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center gap-3 bg-[var(--surface-sunken)] border-b border-[var(--border-default)] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--action-primary)] text-white text-sm font-bold shrink-0">S</div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Subjective</h2>
                <p className="text-xs text-[var(--text-secondary)]">Chief complaint &amp; history</p>
              </div>
            </div>
            <div className="px-5 py-5 space-y-4" onClick={() => setActiveSection("subjective")}>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Chief Complaint *</label>
                <textarea
                  rows={2}
                  readOnly={isReadOnly}
                  className={ta}
                  value={chiefComplaint}
                  onChange={(e) => setCC(e.target.value)}
                  placeholder="Patient's primary presenting complaint…"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">History of Present Illness</label>
                <textarea
                  rows={4}
                  readOnly={isReadOnly}
                  className={ta}
                  value={hpi}
                  onChange={(e) => setHPI(e.target.value)}
                  placeholder="Onset, duration, severity, associated symptoms, aggravating/relieving factors…"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Review of Systems</label>
                <textarea
                  rows={3}
                  readOnly={isReadOnly}
                  className={ta}
                  value={ros}
                  onChange={(e) => setROS(e.target.value)}
                  placeholder="Any other system complaints…"
                />
              </div>
            </div>
          </section>

          {/* ── O: Objective ── */}
          <section id="objective" className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center gap-3 bg-[var(--surface-sunken)] border-b border-[var(--border-default)] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white text-sm font-bold shrink-0">O</div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Objective</h2>
                <p className="text-xs text-[var(--text-secondary)]">Vitals &amp; physical examination</p>
              </div>
            </div>
            <div className="px-5 py-5 space-y-5" onClick={() => setActiveSection("objective")}>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Vitals</p>
                <VitalsForm vitals={vitals} onChange={setVitals} readOnly={isReadOnly} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">General Appearance</label>
                <textarea
                  rows={2}
                  readOnly={isReadOnly}
                  className={ta}
                  value={genAppearance}
                  onChange={(e) => setGA(e.target.value)}
                  placeholder="e.g. Conscious, cooperative, no acute distress…"
                />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Systemic Examination</p>
                  <button
                    type="button"
                    onClick={() => setShowAbnormalOnly((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      showAbnormalOnly
                        ? "border-[var(--critical-fg)] bg-[var(--critical-bg)] text-[var(--critical-fg)]"
                        : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                    }`}
                  >
                    {showAbnormalOnly ? "Showing abnormal" : "Show all"}
                  </button>
                </div>
                <div className="space-y-2">
                  {sysFindings
                    .filter((sf) => !showAbnormalOnly || !sf.normal)
                    .map((sf) => (
                      <SystemicRow
                        key={sf.system}
                        sf={sf}
                        onChange={(updated) => updateSysFinding(sysFindings.findIndex((s) => s.system === sf.system), updated)}
                        readOnly={isReadOnly}
                      />
                    ))}
                  {showAbnormalOnly && sysFindings.every((sf) => sf.normal) && (
                    <p className="rounded-lg border border-[var(--border-default)] px-4 py-3 text-sm text-[var(--text-secondary)]">All systems normal</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── A: Assessment ── */}
          <section id="assessment" className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center gap-3 bg-[var(--surface-sunken)] border-b border-[var(--border-default)] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-white text-sm font-bold shrink-0">A</div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Assessment</h2>
                <p className="text-xs text-[var(--text-secondary)]">Diagnoses &amp; clinical impression</p>
              </div>
            </div>
            <div className="px-5 py-5 space-y-4" onClick={() => setActiveSection("assessment")}>
              {/* ICD suggestions */}
              {icdSuggestions.length > 0 && !isReadOnly && (
                <div>
                  <p className="mb-2 text-xs text-[var(--text-secondary)]">Suggested diagnoses (from chief complaint):</p>
                  <div className="flex flex-wrap gap-2">
                    {icdSuggestions.map((s) => (
                      <button
                        key={s.code}
                        onClick={() => {
                          if (!diagnoses.find((d) => d.code === s.code)) {
                            setDiagnoses((prev) => [...prev, { code: s.code, label: s.label, type: "Primary", status: "Active" }]);
                          }
                        }}
                        className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-3 py-1 text-xs font-medium text-[var(--action-primary)] hover:bg-[var(--action-primary)] hover:text-white transition-colors"
                      >
                        <Plus size={10} /> {s.code} — {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Diagnoses table */}
              <div>
                <div className="hidden grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-2 border-b border-[var(--border-default)] pb-2 sm:grid">
                  {["ICD Code", "Diagnosis", "Type", "Status", ""].map((h, i) => (
                    <p key={i} className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{h}</p>
                  ))}
                </div>
                {diagnoses.length === 0 ? (
                  <p className="py-6 text-center text-sm text-[var(--text-secondary)] opacity-60">No diagnoses added yet</p>
                ) : (
                  diagnoses.map((d, i) => (
                    <DiagRow
                      key={i}
                      d={d}
                      onChange={(upd) => setDiagnoses((prev) => prev.map((x, j) => j === i ? upd : x))}
                      onDelete={() => setDiagnoses((prev) => prev.filter((_, j) => j !== i))}
                      readOnly={isReadOnly}
                    />
                  ))
                )}
                {!isReadOnly && (
                  <button onClick={addDiagnosis} className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-[var(--border-default)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)] w-full justify-center">
                    <Plus size={13} /> Add Diagnosis
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ── P: Plan ── */}
          <section id="plan" className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center gap-3 bg-[var(--surface-sunken)] border-b border-[var(--border-default)] px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-700 text-white text-sm font-bold shrink-0">P</div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">Plan</h2>
                <p className="text-xs text-[var(--text-secondary)]">Prescriptions, orders, referrals &amp; follow-up</p>
              </div>
            </div>
            <div className="px-5 py-5 space-y-6" onClick={() => setActiveSection("plan")}>

              {/* Rx builder */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Pill size={14} className="text-[var(--action-primary)]" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Prescriptions</p>
                  </div>
                  {!isReadOnly && (
                    <button onClick={addRx} className="flex items-center gap-1 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)]">
                      <Plus size={11} /> Add Drug
                    </button>
                  )}
                </div>
                {prescriptions.length === 0 ? (
                  <p className="text-center text-xs text-[var(--text-secondary)] py-4 opacity-60">No prescriptions added yet</p>
                ) : (
                  <div>
                    <div className="hidden sm:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] gap-2 border-b border-[var(--border-default)] pb-2 mb-1">
                      {["Drug", "Dose", "Route", "Freq", "Duration", ""].map((h, i) => (
                        <p key={i} className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">{h}</p>
                      ))}
                    </div>
                    {prescriptions.map((rx, i) => (
                      <RxRow
                        key={rx.id}
                        rx={rx}
                        onChange={(upd) => setRx((prev) => prev.map((x, j) => j === i ? upd : x))}
                        onDelete={() => setRx((prev) => prev.filter((_, j) => j !== i))}
                        readOnly={isReadOnly}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Send to Pharmacy */}
              {prescriptions.length > 0 && !isReadOnly && (
                <div className="flex items-center justify-between rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{prescriptions.length} drug{prescriptions.length !== 1 ? "s" : ""} prescribed</p>
                    <p className="text-xs text-[var(--text-secondary)]">Send to pharmacy for dispensing</p>
                  </div>
                  <button
                    onClick={handleSendToPharmacy}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                      rxSent
                        ? "bg-green-600 text-white"
                        : "bg-[var(--action-primary)] text-white hover:bg-[var(--action-primary-hover)]"
                    }`}
                  >
                    {rxSent ? <><CheckCircle2 size={13} /> Sent!</> : <><Send size={13} /> Send to Pharmacy</>}
                  </button>
                </div>
              )}

              {/* Procedures & Referrals */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Procedures Ordered</label>
                  <textarea rows={3} readOnly={isReadOnly} className={ta} value={procedures} onChange={(e) => setProcs(e.target.value)} placeholder="e.g. ECG, Wound dressing…" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Referrals</label>
                  <textarea rows={3} readOnly={isReadOnly} className={ta} value={referrals} onChange={(e) => setRefs(e.target.value)} placeholder="e.g. Refer to Cardiology…" />
                </div>
              </div>

              {/* Follow-up */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Follow-up (days)</label>
                  <input
                    type="number"
                    min={0}
                    readOnly={isReadOnly}
                    className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]"
                    value={followUp || ""}
                    onChange={(e) => setFollowUp(parseInt(e.target.value) || 0)}
                    placeholder="e.g. 14"
                  />
                </div>
              </div>

              {/* Patient instructions */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Patient Instructions</label>
                <textarea rows={3} readOnly={isReadOnly} className={ta} value={ptInstr} onChange={(e) => setPtInstr(e.target.value)} placeholder="Dietary advice, activity restrictions, warning signs to watch for…" />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Clinical Notes (internal)</label>
                <textarea rows={2} readOnly={isReadOnly} className={ta} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Private notes for clinical team…" />
              </div>
            </div>
          </section>

          {/* Bottom action row */}
          {currentStatus === "Draft" && (
            <div className="flex justify-end gap-3">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  saved
                    ? "border-[var(--normal-fg)] bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                }`}
              >
                {saved ? (
                  <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth={2.5}>
                    <polyline points="2 7 6 11 12 3" className="animate-check" />
                  </svg>
                ) : <Save size={14} />}
                {saved ? "Saved!" : "Save Draft"}
              </button>
              <button onClick={handleSubmitForReview} className="flex items-center gap-2 rounded-xl border border-[var(--action-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--action-primary)] hover:bg-[var(--action-subtle)]">
                <Eye size={14} /> Submit for Review
              </button>
              <button onClick={handleSignOff} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]">
                <ShieldCheck size={14} /> Sign Off
              </button>
            </div>
          )}
          {currentStatus === "In Review" && (
            <div className="flex justify-end gap-3">
              <button onClick={handleSignOff} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]">
                <ShieldCheck size={14} /> Approve &amp; Sign
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Print-only clinical note */}
      <div className="print-section">
        <h3>Subjective</h3>
        <div className="content">
          <span className="print-bold">Chief Complaint: </span>{chiefComplaint}
          {hpi ? `\n\nHistory of Present Illness: \n${hpi}` : ""}
          {ros ? `\n\nReview of Systems: \n${ros}` : ""}
        </div>
      </div>

      <div className="print-section">
        <h3>Objective</h3>
        {(vitals.bp || vitals.pulse || vitals.spo2 || vitals.temp || vitals.weight || vitals.height) ? (
          <>
            <p className="print-bold" style={{ fontSize: "8pt", marginBottom: "4pt" }}>Vital Signs</p>
            <div className="print-vitals">
              {vitals.bp ? <div className="vital-item"><div className="vital-label">BP</div><div className="vital-value">{vitals.bp}</div></div> : null}
              {vitals.pulse ? <div className="vital-item"><div className="vital-label">Pulse</div><div className="vital-value">{vitals.pulse} bpm</div></div> : null}
              {vitals.spo2 ? <div className="vital-item"><div className="vital-label">SpO2</div><div className="vital-value">{vitals.spo2}%</div></div> : null}
              {vitals.temp ? <div className="vital-item"><div className="vital-label">Temp</div><div className="vital-value">{vitals.temp}°C</div></div> : null}
              {vitals.weight ? <div className="vital-item"><div className="vital-label">Weight</div><div className="vital-value">{vitals.weight} kg</div></div> : null}
              {vitals.bmi ? <div className="vital-item"><div className="vital-label">BMI</div><div className="vital-value">{vitals.bmi}</div></div> : null}
            </div>
          </>
        ) : null}
        {genAppearance && <p className="content" style={{ marginTop: "4pt" }}><span className="print-bold">General Appearance: </span>{genAppearance}</p>}
        <p className="print-bold" style={{ fontSize: "8pt", marginTop: "6pt", marginBottom: "3pt" }}>Systemic Examination</p>
        {sysFindings.map((sf) => (
          <p key={sf.system} style={{ fontSize: "8pt", margin: "1pt 0", paddingLeft: "8pt" }}>
            <span className="print-bold">{sf.system}: </span>
            {sf.normal ? "Normal" : sf.finding}
          </p>
        ))}
      </div>

      <div className="print-section">
        <h3>Assessment</h3>
        {diagnoses.length > 0 ? (
          <table className="print-table">
            <thead>
              <tr>
                <th>ICD Code</th>
                <th>Diagnosis</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.map((d, i) => (
                <tr key={i}>
                  <td className="print-muted">{d.code || "—"}</td>
                  <td className="print-bold">{d.label}</td>
                  <td>{d.type}</td>
                  <td>{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="print-muted">No diagnoses recorded</p>
        )}
      </div>

      <div className="print-section">
        <h3>Plan</h3>
        {prescriptions.length > 0 && (
          <>
            <p className="print-bold" style={{ fontSize: "8pt", marginBottom: "3pt" }}>Prescriptions</p>
            <div className="print-rx-grid">
              <div className="rx-header">Drug</div>
              <div className="rx-header">Dose</div>
              <div className="rx-header">Route</div>
              <div className="rx-header">Frequency</div>
              <div className="rx-header">Duration</div>
              {prescriptions.map((rx, i) => (
                <>
                  <div key={`d-${i}`} className="rx-cell">{rx.drug}</div>
                  <div key={`s-${i}`} className="rx-cell">{rx.dose}</div>
                  <div key={`r-${i}`} className="rx-cell">{rx.route}</div>
                  <div key={`f-${i}`} className="rx-cell">{rx.frequency}</div>
                  <div key={`u-${i}`} className="rx-cell">{rx.duration}</div>
                </>
              ))}
            </div>
          </>
        )}
        {procedures && <p className="content" style={{ marginTop: "4pt" }}><span className="print-bold">Procedures: </span>{procedures}</p>}
        {referrals && <p className="content"><span className="print-bold">Referrals: </span>{referrals}</p>}
        {followUp ? <p className="content"><span className="print-bold">Follow-up: </span>{followUp} days</p> : null}
        {ptInstr && <p className="content"><span className="print-bold">Patient Instructions: </span>{ptInstr}</p>}
      </div>

      {exam.status === "Signed" && (
        <div className="print-section">
          <h3>Addenda</h3>
          {exam.addenda.length > 0 ? exam.addenda.map((a) => (
            <div key={a.id} style={{ marginBottom: "6pt", padding: "4pt 8pt", border: "1px solid #e2e8f0", borderRadius: "2pt" }}>
              <p style={{ fontSize: "7pt", color: "#b91c1c" }}>Addendum — {a.reason} ({fmtDT(a.createdAt)})</p>
              <p className="content">{a.content}</p>
            </div>
          )) : <p className="print-muted">No addenda</p>}
        </div>
      )}

      <div className="print-signature">
        <div className="sig-block">
          <div className="sig-line" />
          <div className="sig-label">Attending Physician</div>
          <div className="sig-name">{exam.doctor}</div>
        </div>
        {exam.signedBy && (
          <div className="sig-block">
            <div className="sig-line" />
            <div className="sig-label">Signed Off By</div>
            <div className="sig-name">{exam.signedBy}</div>
            <div className="sig-label" style={{ marginTop: "2pt" }}>{fmtDT(exam.signedAt)}</div>
          </div>
        )}
      </div>

      <div className="print-footer">
        <span>Clinical consultation note — Aarogya Hospital</span>
        <span>Exam ID: {exam.id}</span>
        <span>Generated: {fmtDT(new Date().toISOString())}</span>
      </div>
    </div>
  );
}

// ── Page Dispatcher ───────────────────────────────────────────────────────────

export default function ExaminationEditorPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);
  const exam = useExaminationStore((s) => s.getById(examId));
  const template = exam ? getTemplate(exam.templateId ?? "soap-default") : undefined;

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertCircle size={36} className="mb-4 text-[var(--text-secondary)] opacity-40" />
        <p className="text-[var(--text-secondary)]">Examination not found</p>
        <Link href="/examination" className="mt-3 text-sm text-[var(--action-primary)] underline">Back to list</Link>
      </div>
    );
  }

  if (template && template.type !== "SOAP") {
    return <SchemaFormEditor examId={examId} exam={exam} template={template} />;
  }

  return <SOAPEditor examId={examId} exam={exam} />;
}
