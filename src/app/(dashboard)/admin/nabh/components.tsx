"use client";

import { useState } from "react";
import { X } from "lucide-react";

const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// ── Register Entry Modal ───────────────────────────────────────────────

export function CreateRegisterModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [type, setType] = useState("birth");
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [recordedBy, setRecordedBy] = useState("admin");
  const [notifiedTo, setNotifiedTo] = useState("");
  const [details, setDetails] = useState("{}");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    let parsedDetails: Record<string, unknown>;
    try { parsedDetails = JSON.parse(details); } catch { setError("Invalid JSON in details"); return; }

    const res = await fetch(`${base}/api/v1/nabh/registers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, patientName, patientId, recordedBy, notifiedTo, details: parsedDetails }),
    });
    if (!res.ok) { setError("Failed to create entry"); return; }
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-[var(--surface-raised)] border border-[var(--border-default)] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">New Register Entry</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <SelectField label="Type" value={type} onChange={setType} options={["birth", "death", "notifiable_disease", "pcpndt"]} />
          <TextField label="Patient Name" value={patientName} onChange={setPatientName} />
          <TextField label="Patient ID" value={patientId} onChange={setPatientId} />
          <TextField label="Recorded By" value={recordedBy} onChange={setRecordedBy} />
          <TextField label="Notified To" value={notifiedTo} onChange={setNotifiedTo} />
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Details (JSON)</label>
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={4} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          {error && <p className="text-xs text-[var(--critical-fg)]">{error}</p>}
          <button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            Create Entry
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Committee Report Modal ──────────────────────────────────────────────

export function CreateCommitteeModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [committee, setCommittee] = useState("Infection Control Committee");
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().slice(0, 10));
  const [chairperson, setChairperson] = useState("");
  const [attendees, setAttendees] = useState("");
  const [agenda, setAgenda] = useState("");
  const [minutes, setMinutes] = useState("");
  const [createdBy, setCreatedBy] = useState("admin");
  const [error, setError] = useState("");

  const committeeTypes = [
    "Infection Control Committee",
    "Mortality Review Committee",
    "Safety Committee",
    "Pharmacy & Therapeutics Committee",
    "Ethics Committee",
    "Quality Assurance Committee",
    "Medical Audit Committee",
    "Blood Transfusion Committee",
  ];

  async function handleSubmit() {
    setError("");
    const res = await fetch(`${base}/api/v1/nabh/committees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        committee,
        meetingDate,
        chairperson,
        attendees: attendees.split(",").map((a) => a.trim()).filter(Boolean),
        agenda: agenda.split("\n").map((a) => a.trim()).filter(Boolean),
        minutes,
        createdBy,
      }),
    });
    if (!res.ok) { setError("Failed to create report"); return; }
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-xl rounded-xl bg-[var(--surface-raised)] border border-[var(--border-default)] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">New Committee Report</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <SelectField label="Committee" value={committee} onChange={setCommittee} options={committeeTypes} />
          <TextField label="Meeting Date" value={meetingDate} onChange={setMeetingDate} type="date" />
          <TextField label="Chairperson" value={chairperson} onChange={setChairperson} />
          <TextField label="Attendees (comma-separated)" value={attendees} onChange={setAttendees} />
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Agenda (one per line)</label>
            <textarea value={agenda} onChange={(e) => setAgenda(e.target.value)} rows={3} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[var(--text-secondary)]">Minutes</label>
            <textarea value={minutes} onChange={(e) => setMinutes(e.target.value)} rows={4} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
          </div>
          <TextField label="Created By" value={createdBy} onChange={setCreatedBy} />
          {error && <p className="text-xs text-[var(--critical-fg)]">{error}</p>}
          <button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Manual Indicator Entry Modal ────────────────────────────────────────

export function ManualIndicatorModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [indicatorId, setIndicatorId] = useState("");
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const [periodType, setPeriodType] = useState("monthly");
  const [error, setError] = useState("");

  const indicators = [
    { id: "HAND_HYGIENE_COMPLIANCE", name: "Hand Hygiene Compliance Rate" },
    { id: "PATIENT_SATISFACTION", name: "Patient Satisfaction Score" },
  ];

  async function handleSubmit() {
    setError("");
    if (!indicatorId || !numerator || !denominator) { setError("All fields required"); return; }
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().slice(0, 10);
    const periodEnd = now.toISOString().slice(0, 10);

    const res = await fetch(`${base}/api/v1/nabh/indicators/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indicatorId,
        periodStart,
        periodEnd,
        periodType,
        numerator: Number(numerator),
        denominator: Number(denominator),
      }),
    });
    if (!res.ok) { setError("Failed to save indicator"); return; }
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-[var(--surface-raised)] border border-[var(--border-default)] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Manual Indicator Entry</h2>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
        <div className="space-y-3">
          <SelectField label="Indicator" value={indicatorId} onChange={setIndicatorId} options={indicators.map((i) => i.id)} displayMap={indicators.reduce((a, i) => ({ ...a, [i.id]: i.name }), {} as Record<string, string>)} />
          <TextField label="Numerator" value={numerator} onChange={setNumerator} type="number" />
          <TextField label="Denominator" value={denominator} onChange={setDenominator} type="number" />
          <SelectField label="Period" value={periodType} onChange={setPeriodType} options={["daily", "weekly", "monthly", "quarterly"]} />
          {error && <p className="text-xs text-[var(--critical-fg)]">{error}</p>}
          <button onClick={handleSubmit} className="flex w-full items-center justify-center rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            Save Indicator
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared form widgets ─────────────────────────────────────────────────

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--action-primary)] outline-none" />
    </div>
  );
}

function SelectField({ label, value, onChange, options, displayMap }: { label: string; value: string; onChange: (v: string) => void; options: string[]; displayMap?: Record<string, string> }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[var(--text-secondary)]">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)]">
        {options.map((o) => <option key={o} value={o}>{displayMap?.[o] || o}</option>)}
      </select>
    </div>
  );
}
