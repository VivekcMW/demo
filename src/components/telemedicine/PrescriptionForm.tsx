"use client";

import { useState } from "react";
import { Pill, Plus, X as XIcon } from "lucide-react";
import type { TelePrescription } from "@/store/useTelemedicineStore";

const ROUTE_OPTIONS = [
  "Oral",
  "IV",
  "IM",
  "SC",
  "Topical",
  "Inhalation",
  "Sublingual",
  "Rectal",
];

interface PrescriptionFormProps {
  prescriptions: TelePrescription[];
  onAdd: (rx: Omit<TelePrescription, "id">) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

export function PrescriptionForm({
  prescriptions,
  onAdd,
  onRemove,
  onClose,
}: PrescriptionFormProps) {
  const [drug, setDrug] = useState("");
  const [dose, setDose] = useState("");
  const [route, setRoute] = useState("Oral");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");

  function handleSubmit() {
    if (!drug.trim() || !dose.trim()) return;
    onAdd({
      drug: drug.trim(),
      dose: dose.trim(),
      route,
      frequency: frequency.trim(),
      duration: duration.trim(),
      instructions: instructions.trim() || undefined,
    });
    setDrug("");
    setDose("");
    setRoute("Oral");
    setFrequency("");
    setDuration("");
    setInstructions("");
  }

  const inputCls =
    "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2.5 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]";

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pill size={15} className="text-[var(--action-primary)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Add Prescription
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
        >
          <XIcon size={14} />
        </button>
      </div>

      <div className="mb-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input
            className={inputCls}
            placeholder="Drug"
            value={drug}
            onChange={(e) => setDrug(e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="Dose"
            value={dose}
            onChange={(e) => setDose(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <select
            className={inputCls}
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          >
            {ROUTE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <input
            className={inputCls}
            placeholder="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className={inputCls}
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="Instructions (optional)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!drug.trim() || !dose.trim()}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[var(--action-primary)] py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      {prescriptions.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-medium text-[var(--text-secondary)]">
            Current Prescriptions
          </p>
          <div className="space-y-1">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="flex items-center justify-between rounded-lg bg-[var(--surface-sunken)] px-2.5 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {rx.drug} {rx.dose}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {rx.route} · {rx.frequency} · {rx.duration}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(rx.id)}
                  className="ml-2 rounded p-0.5 text-[var(--critical-fg)] hover:bg-[var(--critical-bg)] shrink-0"
                >
                  <XIcon size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
