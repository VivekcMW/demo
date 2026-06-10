"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useExaminationStore, type ExamType } from "@/store/useExaminationStore";
import { Drawer } from "@/components/ui/Drawer";
import { usePatientStore } from "@/store/usePatientStore";
import {
  FileText, X, Search, User, Loader2,
} from "lucide-react";

const EXAM_TYPES: ExamType[] = ["OPD", "IPD Review", "Emergency", "Follow-up", "Tele"];

const DEPARTMENTS = [
  "General Medicine", "Cardiology", "Pulmonology", "Endocrinology",
  "Gastroenterology", "Neurology", "Nephrology", "Oncology",
  "Orthopaedics", "Surgery", "Obstetrics & Gynaecology",
  "Paediatrics", "Psychiatry", "Dermatology", "ENT",
  "Ophthalmology", "Intensive Care", "Haematology", "Rheumatology",
];

interface Props {
  open: boolean;
  onClose: () => void;
  prefillPatientId?: string;
  prefillPatientName?: string;
  prefillAppointmentId?: string;
}

export function NewExaminationDrawer({ open, onClose, prefillPatientId, prefillPatientName, prefillAppointmentId }: Props) {
  const startExamination = useExaminationStore((s) => s.startExamination);
  const searchPts        = usePatientStore((s) => s.searchPatients);
  const router           = useRouter();

  const [ptQuery, setPtQuery]       = useState("");
  const [selectedPt, setSelectedPt] = useState<{ id: string; name: string } | null>(
    prefillPatientId && prefillPatientName ? { id: prefillPatientId, name: prefillPatientName } : null
  );
  const [type,   setType]   = useState<ExamType>("OPD");
  const [dept,   setDept]   = useState("General Medicine");
  const [doctor, setDoctor] = useState("Dr. Priya Mehta");
  const [apptRef, setApptRef] = useState(prefillAppointmentId ?? "");
  const [saving,  setSaving]  = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const ptResults = useMemo(
    () => ptQuery.length > 1 ? searchPts(ptQuery).slice(0, 6) : [],
    [ptQuery, searchPts]
  );

  function validate() {
    const e: Record<string, string> = {};
    if (!selectedPt) e.pt     = "Select a patient";
    if (!doctor.trim()) e.doctor = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function reset() {
    if (!prefillPatientId) setSelectedPt(null);
    setPtQuery(""); setType("OPD"); setDept("General Medicine");
    setDoctor("Dr. Priya Mehta"); setApptRef(""); setErrors({});
  }

  function handleStart() {
    if (!validate() || !selectedPt) return;
    setSaving(true);
    setTimeout(() => {
      const exam = startExamination({
        patientId:      selectedPt.id,
        patientName:    selectedPt.name,
        appointmentId:  apptRef.trim() || undefined,
        type,
        doctor:         doctor.trim(),
        dept,
      });
      setSaving(false);
      reset();
      onClose();
      router.push(`/examination/${exam.id}`);
    }, 400);
  }

  if (!open) return null;

  const inputCls = (err?: string) =>
    `w-full rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${err ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`;

  return (
    <Drawer open={open} onClose={onClose} maxWidth="max-w-md" aria-label="New Examination">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">New Examination</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

          {/* Patient */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Patient *</label>
            {selectedPt ? (
              <div className="flex items-center gap-3 rounded-lg border border-[var(--action-primary)] bg-[var(--action-subtle)] px-3 py-2.5">
                <User size={14} className="text-[var(--action-primary)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{selectedPt.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{selectedPt.id}</p>
                </div>
                {!prefillPatientId && (
                  <button onClick={() => setSelectedPt(null)} className="rounded p-0.5 text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><X size={13} /></button>
                )}
              </div>
            ) : (
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input
                  className={`${inputCls(errors.pt)} pl-8`}
                  placeholder="Search patient by name or ID…"
                  value={ptQuery}
                  onChange={(e) => setPtQuery(e.target.value)}
                />
                {ptResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-lg">
                    {ptResults.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPt({ id: p.id, name: p.name }); setPtQuery(""); }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-[var(--surface-sunken)] transition-colors"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white shrink-0">
                          {p.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{p.name}</p>
                          <p className="text-xs text-[var(--text-secondary)]">{p.id}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {errors.pt && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.pt}</p>}
              </div>
            )}
          </div>

          {/* Exam type */}
          <div>
            <label className="mb-2 block text-xs font-medium text-[var(--text-secondary)]">Examination Type *</label>
            <div className="grid grid-cols-3 gap-2">
              {EXAM_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-lg border py-2.5 text-xs font-semibold transition-colors ${type === t ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Department *</label>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className={inputCls()}
            >
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Doctor */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Consulting Doctor *</label>
            <input
              className={inputCls(errors.doctor)}
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              placeholder="e.g. Dr. Priya Mehta"
            />
            {errors.doctor && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.doctor}</p>}
          </div>

          {/* Appointment ref */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Appointment Reference <span className="font-normal text-[var(--text-secondary)]">(optional)</span></label>
            <input
              className={inputCls()}
              value={apptRef}
              onChange={(e) => setApptRef(e.target.value)}
              placeholder="APT-XXXX"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            Cancel
          </button>
          <button
            onClick={handleStart}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Starting…</> : "Start Examination"}
          </button>
        </div>
    </Drawer>
  );
}
