"use client";

import { use, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useExaminationStore } from "@/store/useExaminationStore";
import { usePharmacyStore } from "@/store/usePharmacyStore";
import {
  type SystemicFinding, type SystemName,
  type Rx, type Diagnosis,
  ICD_SUGGESTIONS, DEFAULT_SYSTEMS,
} from "@/data/seedExaminations";
import type { Vitals } from "@/data/seedPatients";
import {
  ChevronLeft, FileText, ShieldCheck, CheckCircle2, Save,
  Plus, Trash2, User, ClipboardList, Stethoscope, Activity,
  FlaskConical, AlertCircle, X, Pill, ChevronDown, ChevronUp, Send,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_CLS = {
  "In Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "Completed":   "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Signed Off":  "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
} as const;

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExaminationEditorPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = use(params);
  const store = useExaminationStore();
  const exam  = store.getById(examId);

  // Local draft state
  const [chiefComplaint, setCC]   = useState(exam?.subjective.chiefComplaint   ?? "");
  const [hpi,            setHPI]  = useState(exam?.subjective.historyOfIllness ?? "");
  const [ros,            setROS]  = useState(exam?.subjective.reviewOfSystems  ?? "");
  const [genAppearance,  setGA]   = useState(exam?.objective.generalAppearance ?? "");
  const today = new Date().toISOString().slice(0, 10);
  const [vitals, setVitals] = useState<Partial<Vitals>>(exam?.objective.vitals ?? { recordedAt: today });
  const [sysFindings,    setSysFindings] = useState<SystemicFinding[]>(
    exam?.objective.systemicFindings ?? DEFAULT_SYSTEMS.map((s) => ({ system: s, finding: "Normal", normal: true }))
  );
  const [diagnoses,   setDiagnoses] = useState<Diagnosis[]>(exam?.assessment.diagnoses ?? []);
  const [prescriptions, setRx]   = useState<Rx[]>(exam?.plan.prescriptions ?? []);
  const [procedures,  setProcs]  = useState(exam?.plan.procedures  ?? "");
  const [referrals,   setRefs]   = useState(exam?.plan.referrals   ?? "");
  const [followUp,    setFollowUp] = useState(exam?.plan.followUpDays ?? 0);
  const [ptInstr,     setPtInstr] = useState(exam?.plan.patientInstructions ?? "");
  const [notes,       setNotes]  = useState(exam?.notes ?? "");
  const [saved,       setSaved]  = useState(false);
  const [signed,      setSigned] = useState(false);
  const [rxSent,      setRxSent] = useState(false);
  const [activeSection, setActiveSection] = useState("subjective");

  // Sync if store updates externally
  useEffect(() => {
    if (!exam) return;
    setCC(exam.subjective.chiefComplaint ?? "");
    setHPI(exam.subjective.historyOfIllness ?? "");
    setROS(exam.subjective.reviewOfSystems ?? "");
    setGA(exam.objective.generalAppearance ?? "");
    setVitals(exam.objective.vitals ?? { recordedAt: new Date().toISOString().slice(0, 10) });
    setSysFindings(exam.objective.systemicFindings);
    setDiagnoses(exam.assessment.diagnoses);
    setRx(exam.plan.prescriptions);
    setProcs(exam.plan.procedures ?? "");
    setRefs(exam.plan.referrals ?? "");
    setFollowUp(exam.plan.followUpDays ?? 0);
    setPtInstr(exam.plan.patientInstructions ?? "");
    setNotes(exam.notes ?? "");
  }, []); // intentionally only on mount

  if (!exam) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertCircle size={36} className="mb-4 text-[var(--text-secondary)] opacity-40" />
        <p className="text-[var(--text-secondary)]">Examination not found</p>
        <Link href="/examination" className="mt-3 text-sm text-[var(--action-primary)] underline">Back to list</Link>
      </div>
    );
  }

  const isReadOnly = exam.status === "Signed Off";
  const currentStatus = exam.status;

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

  function handleSendToPharmacy() {
    if (!exam || prescriptions.length === 0) return;
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
      plan:        { orders: exam?.plan.orders ?? [], prescriptions, procedures, referrals, followUpDays: followUp || undefined, patientInstructions: ptInstr },
      notes,
    };
  }

  function handleSave() {
    store.saveExamination(examId, buildPayload());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSignOff() {
    store.saveExamination(examId, buildPayload());
    store.signOff(examId, exam?.doctor ?? "Unknown");
    setSigned(true);
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
    <div className="space-y-0 pb-8">
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
              {currentStatus === "Signed Off" ? <ShieldCheck size={11} /> : <FileText size={11} />}
              {currentStatus}
            </span>
            {!isReadOnly && (
              <>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${saved ? "border-green-600 bg-green-50 text-green-700" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
                >
                  <Save size={13} /> {saved ? "Saved!" : "Save Draft"}
                </button>
                <button
                  onClick={handleSignOff}
                  className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]"
                >
                  <ShieldCheck size={13} /> Complete &amp; Sign Off
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Signed off banner */}
      {(isReadOnly || signed) && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 mt-4 text-sm text-green-800">
          <CheckCircle2 size={16} className="shrink-0" />
          <div>
            <p className="font-semibold">Examination Signed Off</p>
            <p className="text-xs text-green-700 mt-0.5">By {exam.signedBy ?? exam.doctor} on {fmtDT(exam.signedAt ?? exam.completedAt)}</p>
          </div>
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
              { label: "Type",    value: exam.type },
              { label: "Dept",    value: exam.dept },
              { label: "Doctor",  value: exam.doctor },
              { label: "Started", value: fmtDT(exam.startedAt) },
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Systemic Examination</p>
                <div className="space-y-2">
                  {sysFindings.map((sf, i) => (
                    <SystemicRow key={sf.system} sf={sf} onChange={(updated) => updateSysFinding(i, updated)} readOnly={isReadOnly} />
                  ))}
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
          {!isReadOnly && (
            <div className="flex justify-end gap-3">
              <button onClick={handleSave} className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                <Save size={14} /> Save Draft
              </button>
              <button onClick={handleSignOff} className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)]">
                <ShieldCheck size={14} /> Complete &amp; Sign Off
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
