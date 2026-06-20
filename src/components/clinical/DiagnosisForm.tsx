"use client";

import { useState, useCallback } from "react";
import { Plus, Trash2, GripVertical, AlertCircle, ChevronDown, Info } from "lucide-react";
import { ICD10Search } from "./ICD10Search";
import type { DiagnosisEntry, Specialty, POAIndicator } from "@/lib/types/icd10";
import { POA_INDICATORS } from "@/lib/types/icd10";

// ─────────────────────────────────────────────────────────────────────────────
// DiagnosisForm Component
// Multi-entry form for capturing diagnoses with ICD-10 codes.
// ─────────────────────────────────────────────────────────────────────────────

interface DiagnosisFormProps {
  /** Current diagnoses */
  value: DiagnosisEntry[];
  /** Callback when diagnoses change */
  onChange: (diagnoses: DiagnosisEntry[]) => void;
  /** Current specialty for filtering */
  specialty?: Specialty;
  /** Require at least one primary diagnosis */
  requirePrimary?: boolean;
  /** Enable POA (Present on Admission) field - for inpatient */
  showPOA?: boolean;
  /** Max number of diagnoses */
  maxDiagnoses?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
}

const DIAGNOSIS_TYPES = ["Primary", "Secondary", "Complication", "Comorbidity"] as const;
const CERTAINTY_LEVELS = ["Confirmed", "Provisional", "Ruled Out", "Differential"] as const;

export function DiagnosisForm({
  value,
  onChange,
  specialty,
  requirePrimary = true,
  showPOA = false,
  maxDiagnoses = 10,
  disabled = false,
  error,
}: DiagnosisFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const hasPrimary = value.some((d) => d.type === "Primary");

  const addDiagnosis = useCallback(() => {
    if (value.length >= maxDiagnoses) return;

    const newEntry: DiagnosisEntry = {
      icdCode: "",
      description: "",
      type: hasPrimary ? "Secondary" : "Primary",
      certainty: "Confirmed",
      presentOnAdmission: showPOA ? "Y" : undefined,
    };
    onChange([...value, newEntry]);
    setExpandedIndex(value.length);
  }, [value, onChange, hasPrimary, maxDiagnoses, showPOA]);

  const updateDiagnosis = useCallback(
    (index: number, updates: Partial<DiagnosisEntry>) => {
      const updated = [...value];
      updated[index] = { ...updated[index], ...updates };

      // If setting this as Primary, make sure there's only one
      if (updates.type === "Primary") {
        updated.forEach((d, i) => {
          if (i !== index && d.type === "Primary") {
            updated[i] = { ...d, type: "Secondary" };
          }
        });
      }

      onChange(updated);
    },
    [value, onChange]
  );

  const removeDiagnosis = useCallback(
    (index: number) => {
      const updated = value.filter((_, i) => i !== index);
      onChange(updated);
      if (expandedIndex === index) setExpandedIndex(null);
    },
    [value, onChange, expandedIndex]
  );

  const handleCodeSelect = useCallback(
    (index: number, code: string, description: string) => {
      updateDiagnosis(index, { icdCode: code, description });
    },
    [updateDiagnosis]
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Diagnoses</h3>
          {requirePrimary && !hasPrimary && value.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-[var(--status-warning)]">
              <AlertCircle size={12} />
              Primary diagnosis required
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={addDiagnosis}
          disabled={disabled || value.length >= maxDiagnoses}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--action-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
          Add Diagnosis
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-1 rounded-lg bg-[var(--status-error)]/10 px-3 py-2 text-sm text-[var(--status-error)]">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {/* Empty state */}
      {value.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-[var(--border-default)] p-6 text-center">
          <AlertCircle size={24} className="mx-auto mb-2 text-[var(--text-tertiary)]" />
          <p className="text-sm text-[var(--text-secondary)]">No diagnoses added</p>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">
            Click "Add Diagnosis" to search and add ICD-10 codes
          </p>
        </div>
      )}

      {/* Diagnosis list */}
      <div className="space-y-2">
        {value.map((diagnosis, index) => (
          <div
            key={index}
            className={`rounded-lg border transition-colors ${
              diagnosis.type === "Primary"
                ? "border-[var(--action-primary)] bg-[var(--action-subtle)]/30"
                : "border-[var(--border-default)] bg-[var(--surface-raised)]"
            }`}
          >
            {/* Collapsed header */}
            <div
              className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <GripVertical size={14} className="text-[var(--text-tertiary)]" />

              <div className="flex-1 min-w-0">
                {diagnosis.icdCode ? (
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 font-mono text-xs font-medium text-[var(--action-primary)]">
                      {diagnosis.icdCode}
                    </span>
                    <span className="truncate text-sm text-[var(--text-primary)]">
                      {diagnosis.description}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-[var(--text-tertiary)] italic">Click to search ICD-10 code</span>
                )}
              </div>

              {/* Type badge */}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  diagnosis.type === "Primary"
                    ? "bg-[var(--action-primary)] text-white"
                    : diagnosis.type === "Complication"
                    ? "bg-[var(--status-error)]/10 text-[var(--status-error)]"
                    : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"
                }`}
              >
                {diagnosis.type}
              </span>

              {/* Certainty */}
              <span
                className={`text-xs ${
                  diagnosis.certainty === "Confirmed"
                    ? "text-[var(--status-success)]"
                    : diagnosis.certainty === "Ruled Out"
                    ? "text-[var(--text-tertiary)] line-through"
                    : "text-[var(--status-warning)]"
                }`}
              >
                {diagnosis.certainty}
              </span>

              {/* Actions */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeDiagnosis(index);
                }}
                disabled={disabled}
                className="rounded p-1 text-[var(--text-tertiary)] hover:bg-[var(--status-error)]/10 hover:text-[var(--status-error)] disabled:opacity-50"
              >
                <Trash2 size={14} />
              </button>

              <ChevronDown
                size={14}
                className={`text-[var(--text-tertiary)] transition-transform ${
                  expandedIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Expanded content */}
            {expandedIndex === index && (
              <div className="border-t border-[var(--border-default)] p-3 space-y-3">
                {/* ICD-10 Search */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                    ICD-10 Code
                  </label>
                  <ICD10Search
                    specialty={specialty}
                    value={diagnosis.icdCode}
                    onSelect={(code, desc) => handleCodeSelect(index, code, desc)}
                    billableOnly
                    disabled={disabled}
                  />
                </div>

                {/* Type & Certainty */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Type</label>
                    <select
                      value={diagnosis.type}
                      onChange={(e) => updateDiagnosis(index, { type: e.target.value as DiagnosisEntry["type"] })}
                      disabled={disabled}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    >
                      {DIAGNOSIS_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">Certainty</label>
                    <select
                      value={diagnosis.certainty}
                      onChange={(e) =>
                        updateDiagnosis(index, { certainty: e.target.value as DiagnosisEntry["certainty"] })
                      }
                      disabled={disabled}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    >
                      {CERTAINTY_LEVELS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* POA */}
                {showPOA && (
                  <div>
                    <label className="mb-1 flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)]">
                      Present on Admission (POA)
                      <Info size={12} className="text-[var(--text-tertiary)]" />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(Object.entries(POA_INDICATORS) as [POAIndicator, string][]).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => updateDiagnosis(index, { presentOnAdmission: key })}
                          disabled={disabled}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                            diagnosis.presentOnAdmission === key
                              ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
                              : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                          }`}
                        >
                          <span className="font-bold">{key}</span> - {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--text-secondary)]">
                    Notes (optional)
                  </label>
                  <textarea
                    value={diagnosis.notes || ""}
                    onChange={(e) => updateDiagnosis(index, { notes: e.target.value })}
                    disabled={disabled}
                    rows={2}
                    placeholder="Additional clinical notes..."
                    className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Limit warning */}
      {value.length >= maxDiagnoses && (
        <p className="text-xs text-[var(--text-tertiary)]">
          Maximum of {maxDiagnoses} diagnoses reached
        </p>
      )}
    </div>
  );
}
