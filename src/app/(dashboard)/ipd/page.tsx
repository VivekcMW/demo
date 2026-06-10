"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIPDStore, type Admission, type BedInfo } from "@/store/useIPDStore";
import { usePatientStore } from "@/store/usePatientStore";
import { WARDS, type AdmissionPriority } from "@/data/seedAdmissions";
import {
  BedDouble, Search, SlidersHorizontal, X, RotateCcw,
  LayoutGrid, List, CheckCircle2, AlertTriangle, Clock,
  ShieldAlert, ChevronRight, User, Plus, Loader2,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const BED_STATUS_CLS: Record<string, string> = {
  Occupied:  "bg-[var(--action-primary)] text-white border-[var(--action-primary)]",
  Reserved:  "bg-[var(--info-bg)] text-[var(--info-fg)] border-[var(--info-fg)]/20",
  Cleaning:  "bg-[var(--warning-bg)] text-[var(--warning-fg)] border-[var(--warning-fg)]/20",
  Available: "bg-[var(--normal-bg)] text-[var(--normal-fg)] border-[var(--normal-fg)]/20",
};

const ADM_STATUS_CLS: Record<string, string> = {
  Active:      "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Planned:     "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Discharged:  "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Transferred: "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
};

const PRIORITY_CLS: Record<AdmissionPriority, string> = {
  General: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  HDU:     "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  ICU:     "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Admit Patient Drawer ──────────────────────────────────────────────────────

interface AdmitDrawerProps { open: boolean; onClose: () => void; }

function AdmitPatientDrawer({ open, onClose }: AdmitDrawerProps) {
  const admitPatient = useIPDStore((s) => s.admitPatient);
  const bedMap       = useIPDStore((s) => s.bedMap);
  const searchPts    = usePatientStore((s) => s.searchPatients);
  const router       = useRouter();

  const [ptQuery, setPtQuery]         = useState("");
  const [selectedPt, setSelectedPt]   = useState<{ id: string; name: string } | null>(null);
  const [ward, setWard]               = useState("");
  const [bed, setBed]                 = useState("");
  const [priority, setPriority]       = useState<AdmissionPriority>("General");
  const [diagnosis, setDiagnosis]     = useState("");
  const [doctor, setDoctor]           = useState("");
  const [expectedD, setExpectedD]     = useState("");
  const [notes, setNotes]             = useState("");
  const [saving, setSaving]           = useState(false);
  const [errors, setErrors]           = useState<Record<string, string>>({});

  const ptResults = useMemo(
    () => ptQuery.length > 1 ? searchPts(ptQuery).slice(0, 6) : [],
    [ptQuery, searchPts]
  );

  const availBeds = useMemo(
    () => bedMap.filter((b) => b.ward === ward && (b.status === "Available" || b.status === "Cleaning")),
    [bedMap, ward]
  );

  function validate() {
    const e: Record<string, string> = {};
    if (!selectedPt) e.pt = "Select a patient";
    if (!ward)       e.ward = "Required";
    if (!bed)        e.bed = "Required";
    if (!diagnosis)  e.diagnosis = "Required";
    if (!doctor)     e.doctor = "Required";
    if (!expectedD)  e.expectedD = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function reset() {
    setPtQuery(""); setSelectedPt(null); setWard(""); setBed("");
    setPriority("General"); setDiagnosis(""); setDoctor(""); setExpectedD("");
    setNotes(""); setErrors({});
  }

  function handleSubmit() {
    if (!validate() || !selectedPt) return;
    setSaving(true);
    setTimeout(() => {
      const adm = admitPatient({
        patientId: selectedPt.id,
        patientName: selectedPt.name,
        ward, bed, priority,
        admittedAt: new Date().toISOString().slice(0, 19),
        expectedDischarge: expectedD,
        attendingDoctor: doctor,
        admitDiagnosis: diagnosis,
        clinicalNotes: notes || undefined,
        admittedBy: doctor,
      });
      setSaving(false);
      reset();
      onClose();
      router.push(`/ipd/${adm.id}`);
    }, 600);
  }

  if (!open) return null;

  function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">{label}</label>
        {children}
        {error && <p className="mt-1 text-xs text-[var(--critical-fg)]">{error}</p>}
      </div>
    );
  }

  const inputCls = (err?: string) =>
    `w-full rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${err ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <BedDouble size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Admit Patient</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

          {/* Patient search */}
          <Field label="Patient *" error={errors.pt}>
            {selectedPt ? (
              <div className="flex items-center gap-3 rounded-lg border border-[var(--action-primary)] bg-[var(--action-subtle)] px-3 py-2.5">
                <User size={14} className="text-[var(--action-primary)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{selectedPt.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{selectedPt.id}</p>
                </div>
                <button onClick={() => setSelectedPt(null)} className="rounded p-0.5 text-[var(--text-secondary)] hover:text-[var(--critical-fg)]"><X size={13} /></button>
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
              </div>
            )}
          </Field>

          {/* Ward */}
          <Field label="Ward *" error={errors.ward}>
            <select
              value={ward}
              onChange={(e) => { setWard(e.target.value); setBed(""); }}
              className={inputCls(errors.ward)}
            >
              <option value="">Select ward…</option>
              {WARDS.map((w) => <option key={w.name} value={w.name}>{w.name}</option>)}
            </select>
          </Field>

          {/* Bed */}
          <Field label="Bed *" error={errors.bed}>
            <select
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              disabled={!ward}
              className={`${inputCls(errors.bed)} disabled:opacity-50`}
            >
              <option value="">Select bed…</option>
              {availBeds.map((b) => (
                <option key={b.bed} value={b.bed}>
                  {b.bed} — {b.status}
                </option>
              ))}
            </select>
            {ward && availBeds.length === 0 && (
              <p className="mt-1 text-xs text-[var(--warning-fg)]">No available beds in this ward</p>
            )}
          </Field>

          {/* Priority */}
          <Field label="Priority">
            <div className="flex gap-2">
              {(["General", "HDU", "ICU"] as AdmissionPriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition-colors ${
                    priority === p
                      ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>

          {/* Diagnosis */}
          <Field label="Admitting Diagnosis *" error={errors.diagnosis}>
            <input className={inputCls(errors.diagnosis)} value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g. Acute Myocardial Infarction" />
          </Field>

          {/* Attending Doctor */}
          <Field label="Attending Doctor *" error={errors.doctor}>
            <input className={inputCls(errors.doctor)} value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="e.g. Dr. Priya Mehta" />
          </Field>

          {/* Expected discharge */}
          <Field label="Expected Discharge Date *" error={errors.expectedD}>
            <input type="date" className={inputCls(errors.expectedD)} value={expectedD} onChange={(e) => setExpectedD(e.target.value)} />
          </Field>

          {/* Clinical notes */}
          <Field label="Clinical Notes">
            <textarea rows={3} className={`${inputCls()} resize-none`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Initial clinical observations…" />
          </Field>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Admitting…</> : "Admit Patient"}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterDrawerProps {
  open: boolean; onClose: () => void;
  wardFilter: string;      setWardFilter: (v: string) => void;
  priorityFilter: string;  setPriorityFilter: (v: string) => void;
  statusFilter: string;    setStatusFilter: (v: string) => void;
  hasFilters: boolean; onClear: () => void; resultCount: number;
}

function FilterDrawer({ open, onClose, wardFilter, setWardFilter, priorityFilter, setPriorityFilter, statusFilter, setStatusFilter, hasFilters, onClear, resultCount }: FilterDrawerProps) {
  if (!open) return null;
  function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
        {children}
      </button>
    );
  }
  const activeCount = [wardFilter, priorityFilter, statusFilter].filter(Boolean).length;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
            {activeCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Ward</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={wardFilter === ""} onClick={() => setWardFilter("")}>All</Btn>
              {WARDS.map((w) => <Btn key={w.name} active={wardFilter === w.name} onClick={() => setWardFilter(w.name)}>{w.name}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Priority</p>
            <div className="flex flex-wrap gap-2">
              {["", "General", "HDU", "ICU"].map((p) => <Btn key={p} active={priorityFilter === p} onClick={() => setPriorityFilter(p)}>{p || "All"}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status</p>
            <div className="flex flex-wrap gap-2">
              {["", "Active", "Planned", "Discharged", "Transferred"].map((s) => <Btn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s || "All"}</Btn>)}
            </div>
          </div>
        </div>
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button onClick={onClear} disabled={!hasFilters} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={onClose} className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">
            Show {resultCount}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Bed Card (grid view) ──────────────────────────────────────────────────────

function BedCard({ bed }: { bed: BedInfo }) {
  const isOccupied = bed.status === "Occupied";
  const isReserved = bed.status === "Reserved";
  const cls = BED_STATUS_CLS[bed.status] ?? BED_STATUS_CLS.Available;

  const content = (
    <div className={`relative rounded-xl border p-3 transition-all ${cls} ${isOccupied || isReserved ? "cursor-pointer hover:scale-[1.02] hover:shadow-md" : ""}`}>
      {/* Priority badge for ICU/HDU */}
      {bed.priority && bed.priority !== "General" && (
        <span className={`absolute right-2 top-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${bed.priority === "ICU" ? "bg-[var(--critical-bg)] text-[var(--critical-fg)]" : "bg-[var(--warning-bg)] text-[var(--warning-fg)]"}`}>
          {bed.priority}
        </span>
      )}
      <p className="text-xs font-bold">{bed.bed}</p>
      {isOccupied || isReserved ? (
        <p className="mt-1 line-clamp-2 text-[10px] leading-tight">{bed.patientName}</p>
      ) : (
        <p className="mt-1 text-[10px] capitalize opacity-70">{bed.status}</p>
      )}
    </div>
  );

  if ((isOccupied || isReserved) && bed.admissionId) {
    return <Link href={`/ipd/${bed.admissionId}`}>{content}</Link>;
  }
  return content;
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function IPDPage() {
  const admissions = useIPDStore((s) => s.admissions);
  const bedMap     = useIPDStore((s) => s.bedMap);

  const [view, setView]                 = useState<"map" | "list">("map");
  const [query, setQuery]               = useState("");
  const [wardFilter, setWardFilter]     = useState("");
  const [priorityFilter, setPriority]   = useState("");
  const [statusFilter, setStatus]       = useState("");
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [admitOpen, setAdmitOpen]       = useState(false);

  // KPIs from bed map
  const totalBeds    = bedMap.length;
  const occupied     = bedMap.filter((b) => b.status === "Occupied").length;
  const available    = bedMap.filter((b) => b.status === "Available").length;
  const criticalBeds = bedMap.filter((b) => b.priority === "ICU" || b.priority === "HDU").filter((b) => b.status === "Occupied").length;

  // Filtered admissions for list view
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return admissions.filter((a) => {
      if (q && !(a.id.toLowerCase().includes(q) || a.patientName.toLowerCase().includes(q) || a.attendingDoctor.toLowerCase().includes(q) || a.ward.toLowerCase().includes(q))) return false;
      if (wardFilter     && a.ward     !== wardFilter)     return false;
      if (priorityFilter && a.priority !== priorityFilter) return false;
      if (statusFilter   && a.status   !== statusFilter)   return false;
      return true;
    }).sort((a, b) => b.admittedAt.localeCompare(a.admittedAt));
  }, [admissions, query, wardFilter, priorityFilter, statusFilter]);

  const hasFilters  = !!(wardFilter || priorityFilter || statusFilter);
  const activeCount = [wardFilter, priorityFilter, statusFilter].filter(Boolean).length;

  function clearFilters() { setWardFilter(""); setPriority(""); setStatus(""); }

  // For bed map: filter bed map by ward
  const filteredBedMap = wardFilter
    ? bedMap.filter((b) => b.ward === wardFilter)
    : bedMap;

  // Group bed map by ward
  const bedsByWard = useMemo(() => {
    const map: Record<string, BedInfo[]> = {};
    for (const b of filteredBedMap) {
      if (!map[b.ward]) map[b.ward] = [];
      map[b.ward].push(b);
    }
    return map;
  }, [filteredBedMap]);

  const kpis = [
    { label: "Total Beds",    value: totalBeds,    icon: <BedDouble size={16} />,       cls: "text-[var(--action-primary)]" },
    { label: "Occupied",      value: occupied,     icon: <User size={16} />,            cls: "text-[var(--warning-fg)]" },
    { label: "Available",     value: available,    icon: <CheckCircle2 size={16} />,    cls: "text-[var(--normal-fg)]" },
    { label: "ICU / HDU",     value: criticalBeds, icon: <ShieldAlert size={16} />,     cls: "text-[var(--critical-fg)]" },
  ];

  return (
    <div className="space-y-5 pb-8">
      <AdmitPatientDrawer open={admitOpen} onClose={() => setAdmitOpen(false)} />
      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        wardFilter={wardFilter}     setWardFilter={setWardFilter}
        priorityFilter={priorityFilter} setPriorityFilter={setPriority}
        statusFilter={statusFilter}  setStatusFilter={setStatus}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">IPD / Beds</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Inpatient management &amp; bed workbench</p>
        </div>
        <button
          onClick={() => setAdmitOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Plus size={15} /> Admit Patient
        </button>
      </div>

      {/* KPI bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{k.label}</p>
              <span className={k.cls}>{k.icon}</span>
            </div>
            <p className={`mt-2 text-2xl font-bold tabular-nums ${k.cls}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            placeholder="Search patient, doctor, ward, admission ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {/* View toggle */}
        <div className="flex rounded-lg border border-[var(--border-default)] overflow-hidden">
          {(["map", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${view === v ? "bg-[var(--action-primary)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
            >
              {v === "map" ? <LayoutGrid size={13} /> : <List size={13} />}
              {v === "map" ? "Bed Map" : "List"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${hasFilters ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
        >
          <SlidersHorizontal size={14} /> Filters
          {activeCount > 0 && <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">{activeCount}</span>}
        </button>

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)]">
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>

      {/* Bed Map Legend */}
      {view === "map" && (
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {[
            { label: "Occupied",  cls: "bg-[var(--action-primary)]" },
            { label: "Reserved",  cls: "bg-[var(--info-bg)] border border-[var(--info-fg)]/30" },
            { label: "Cleaning",  cls: "bg-[var(--warning-bg)] border border-[var(--warning-fg)]/30" },
            { label: "Available", cls: "bg-[var(--normal-bg)] border border-[var(--normal-fg)]/30" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-sm ${l.cls}`} />
              <span className="text-[var(--text-secondary)]">{l.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Bed Map ── */}
      {view === "map" && (
        <div className="space-y-5">
          {Object.entries(bedsByWard).map(([ward, beds]) => (
            <div key={ward} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
                <div className="flex items-center gap-2">
                  <BedDouble size={14} className="text-[var(--action-primary)]" />
                  <span className="font-semibold text-sm text-[var(--text-primary)]">{ward}</span>
                  <span className="text-xs text-[var(--text-secondary)]">({beds.length} beds)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                  <span className="text-[var(--action-primary)] font-medium">{beds.filter((b) => b.status === "Occupied").length} occupied</span>
                  <span className="text-[var(--normal-fg)]">{beds.filter((b) => b.status === "Available").length} free</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                {beds.map((b) => <BedCard key={b.bed} bed={b} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── List View ── */}
      {view === "list" && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_2fr_1fr_1fr_1fr_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
            <span>Patient</span><span>Ward / Bed</span><span>Priority</span><span>Attending</span><span>Admitted</span><span>Exp. D/C</span><span>Status</span><span />
          </div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BedDouble size={32} className="mb-3 opacity-20 text-[var(--text-secondary)]" />
              <p className="text-sm text-[var(--text-secondary)]">No admissions match your filters</p>
              {hasFilters && <button onClick={clearFilters} className="mt-2 text-xs text-[var(--action-primary)] underline">Clear filters</button>}
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-default)]">
              {filtered.map((a) => (
                <Link
                  key={a.id}
                  href={`/ipd/${a.id}`}
                  className="group grid grid-cols-2 gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[2fr_1.5fr_1fr_2fr_1fr_1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{a.patientName}</p>
                    <p className="font-mono text-[10px] text-[var(--text-secondary)]">{a.patientId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{a.ward}</p>
                    <p className="text-xs text-[var(--text-secondary)]">Bed {a.bed}</p>
                  </div>
                  <span className={`hidden md:inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${PRIORITY_CLS[a.priority]}`}>{a.priority}</span>
                  <p className="hidden md:block text-sm text-[var(--text-secondary)]">{a.attendingDoctor}</p>
                  <p className="hidden md:block text-xs text-[var(--text-secondary)]">{fmtDate(a.admittedAt)}</p>
                  <p className="hidden md:block text-xs text-[var(--text-secondary)]">{fmtDate(a.expectedDischarge)}</p>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${ADM_STATUS_CLS[a.status]}`}>{a.status}</span>
                  <ChevronRight size={14} className="hidden md:block shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
