"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, CheckCircle2, Clock, User, AlertCircle } from "lucide-react";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useQueueStore } from "@/store/useQueueStore";
import { QUEUE_DEPTS } from "@/data/seedQueue";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";

const TODAY = new Date().toISOString().slice(0, 10);

// Map dept name keywords → queue dept id
const DEPT_MAP: Record<string, string> = {
  "general":      "gen",
  "medicine":     "gen",
  "cardiology":   "card",
  "ortho":        "ortho",
  "paediatric":   "peds",
  "gynaecology":  "gyn",
  "gynaecolog":   "gyn",
};

function guessDeptId(dept: string): string {
  const lower = dept.toLowerCase();
  for (const [key, id] of Object.entries(DEPT_MAP)) {
    if (lower.includes(key)) return id;
  }
  return "gen";
}

export default function CheckInPage() {
  const appointments  = useAppointmentStore((s) => s.appointments);
  const updateStatus  = useAppointmentStore((s) => s.updateStatus);
  const patients      = usePatientStore((s) => s.patients);
  const addWalkIn     = useQueueStore((s) => s.addWalkIn);
  const { toast }     = useToast();

  const searchRef = useRef<HTMLInputElement>(null);
  const [query,     setQuery]     = useState("");
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());

  // Auto-focus search on mount
  useEffect(() => { searchRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Find patients matching the query
    const matchedPatients = patients.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.phone?.includes(q) ||
      (p.uhid ?? "").toLowerCase().includes(q)
    );
    const matchedNames = new Set(matchedPatients.map((p) => p.name.toLowerCase()));

    // Get today's appointments for matched patients
    return appointments.filter((a) =>
      a.date === TODAY && (
        a.patient.toLowerCase().includes(q) ||
        matchedNames.has(a.patient.toLowerCase())
      )
    );
  }, [query, patients, appointments]);

  const handleCheckIn = (apptId: string, patientName: string, dept: string) => {
    updateStatus(apptId, "In Progress");
    const deptId = guessDeptId(dept);
    addWalkIn(deptId, patientName, "", "OPD");
    setCheckedIn((prev) => new Set([...prev, apptId]));
    toast(`${patientName} checked in — queue token assigned`);
  };

  const deptLabel = (deptId: string) => QUEUE_DEPTS.find((d) => d.id === deptId)?.name ?? deptId;

  return (
    <div className="pb-8">
      <PageHeader
        title="Check-in Station"
        subtitle="Search patient and mark appointment check-in"
      />

      {/* Big Search Bar */}
      <div className="mt-8 mx-auto max-w-2xl">
        <div className="relative">
          <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--action-primary)]" />
          <input
            ref={searchRef}
            type="text"
            className="w-full rounded-2xl border-2 border-[var(--action-primary)] bg-[var(--surface-raised)] py-4 pl-12 pr-5 text-lg text-[var(--text-primary)] shadow-lg outline-none focus:ring-2 focus:ring-[var(--action-primary)]/20 placeholder:text-[var(--text-secondary)]"
            placeholder="UHID  ·  Patient Name  ·  Phone number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              Clear
            </button>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-[var(--text-secondary)]">Keyboard-first: type and press Enter or click Check-in</p>
      </div>

      {/* Results */}
      <div className="mt-8 mx-auto max-w-2xl space-y-3">
        {query && results.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle size={36} className="text-[var(--text-secondary)]" />
            <p className="text-sm font-medium text-[var(--text-secondary)]">No appointments found for "{query}" today</p>
            <p className="text-xs text-[var(--text-secondary)]">Check spelling or use full UHID. Walk-in patients can be added from the Queue page.</p>
          </div>
        )}

        {results.map((a) => {
          const isChecked = checkedIn.has(a.id) || a.status === "In Progress" || a.status === "Completed";
          const alreadyDone = a.status === "Completed";
          return (
            <div key={a.id} className={`rounded-xl border-2 transition-colors ${isChecked ? "border-[var(--normal-fg)]/30 bg-[var(--normal-bg)]" : "border-[var(--border-default)] bg-[var(--surface-raised)]"} p-5`}>
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${isChecked ? "bg-[var(--normal-fg)] text-white" : "bg-[var(--action-subtle)] text-[var(--action-primary)]"}`}>
                  {isChecked ? <CheckCircle2 size={22} /> : a.patient.charAt(0)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-base font-semibold text-[var(--text-primary)]">{a.patient}</p>
                    <span className="rounded-full bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">{a.age}y · {a.sex === "M" ? "Male" : "Female"}</span>
                    <span className="rounded-full bg-[var(--action-subtle)] px-2 py-0.5 text-[10px] font-semibold text-[var(--action-primary)]">{a.type}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1"><Clock size={12} /> {a.time}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {a.doctor}</span>
                    <span className="text-xs">{a.dept}</span>
                  </div>
                  {a.reason && <p className="mt-1 text-xs text-[var(--text-secondary)] italic">"{a.reason}"</p>}
                </div>

                {/* Check-in button */}
                <div className="shrink-0">
                  {alreadyDone ? (
                    <span className="rounded-lg bg-[var(--normal-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--normal-fg)]">Completed</span>
                  ) : isChecked ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="rounded-lg bg-[var(--normal-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--normal-fg)] flex items-center gap-1">
                        <CheckCircle2 size={13} /> Checked In
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)]">Token assigned</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCheckIn(a.id, a.patient, a.dept)}
                      className="rounded-xl bg-[var(--action-primary)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--action-primary-hover)] transition-colors shadow-md hover:shadow-lg"
                    >
                      CHECK IN
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Idle state */}
      {!query && (
        <div className="mt-16 mx-auto max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--action-subtle)]">
            <Search size={28} className="text-[var(--action-primary)]" />
          </div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">Search a patient to begin check-in</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">Today's appointments will appear here</p>
        </div>
      )}
    </div>
  );
}
