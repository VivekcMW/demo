"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useExaminationStore, type NoteStatus, type ExamType } from "@/store/useExaminationStore";
import {
  FileText, Search, SlidersHorizontal, X, RotateCcw, Plus,
  Clock, PenLine, ShieldCheck, ChevronRight, Eye, Lock,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<NoteStatus, string> = {
  "Draft":    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In Review":"bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Signed":   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Locked":   "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const STATUS_ICON: Record<NoteStatus, React.ReactNode> = {
  "Draft":    <PenLine size={12} />,
  "In Review":<Eye size={12} />,
  "Signed":   <ShieldCheck size={12} />,
  "Locked":   <Lock size={12} />,
};

const TYPE_CLS: Record<ExamType, string> = {
  "OPD":              "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  "IPD Review":       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "IPD Admission":    "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Procedure":        "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  "Discharge Summary":"bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Emergency":        "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  "Tele":             "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  "Follow-up":        "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
};

const ALL_STATUSES: NoteStatus[] = ["Draft", "In Review", "Signed", "Locked"];
const ALL_TYPES: ExamType[] = ["OPD", "IPD Review", "IPD Admission", "Emergency", "Tele", "Follow-up", "Procedure", "Discharge Summary"];

function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Shared UI bits ─────────────────────────────────────────────────────────────

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${active ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
      {children}
    </button>
  );
}

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterProps {
  open: boolean; onClose: () => void;
   statusFilter: NoteStatus | ""; setStatusFilter: (v: NoteStatus | "") => void;
  typeFilter: ExamType | ""; setTypeFilter: (v: ExamType | "") => void;
  deptFilter: string; setDeptFilter: (v: string) => void;
  depts: string[];
  hasFilters: boolean; onClear: () => void; resultCount: number;
}
function FilterDrawer({ open, onClose, statusFilter, setStatusFilter, typeFilter, setTypeFilter, deptFilter, setDeptFilter, depts, hasFilters, onClear, resultCount }: FilterProps) {
  if (!open) return null;
  const activeCount = [statusFilter, typeFilter, deptFilter].filter(Boolean).length;
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={statusFilter === ""} onClick={() => setStatusFilter("")}>All</Btn>
              {ALL_STATUSES.map((s) => <Btn key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>{s}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Type</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={typeFilter === ""} onClick={() => setTypeFilter("")}>All</Btn>
              {ALL_TYPES.map((t) => <Btn key={t} active={typeFilter === t} onClick={() => setTypeFilter(t)}>{t}</Btn>)}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Department</p>
            <div className="flex flex-wrap gap-2">
              <Btn active={deptFilter === ""} onClick={() => setDeptFilter("")}>All</Btn>
              {depts.map((d) => <Btn key={d} active={deptFilter === d} onClick={() => setDeptFilter(d)}>{d}</Btn>)}
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

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ExaminationPage() {
  const examinations = useExaminationStore((s) => s.examinations);

  const [query, setQuery]             = useState("");
  const [statusFilter, setStatus]     = useState<NoteStatus | "">("");
  const [typeFilter, setType]         = useState<ExamType | "">("");
  const [deptFilter, setDept]         = useState("");
  const [drawerOpen, setDrawerOpen]   = useState(false);

  // Derived dept list
  const depts = useMemo(() => [...new Set(examinations.map((e) => e.dept))].sort(), [examinations]);

  // KPIs
  const inDraft     = examinations.filter((e) => e.status === "Draft").length;
  const inReview    = examinations.filter((e) => e.status === "In Review").length;
  const signed      = examinations.filter((e) => e.status === "Signed").length;
  const thisWeek       = examinations.filter((e) => {
    const d = new Date(e.startedAt);
    const now = new Date();
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000;
  }).length;

  // Filtered
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return examinations
      .filter((e) => {
        if (q && !(e.id.toLowerCase().includes(q) || e.patientName.toLowerCase().includes(q) || e.doctor.toLowerCase().includes(q))) return false;
        if (statusFilter && e.status !== statusFilter) return false;
        if (typeFilter   && e.type   !== typeFilter)   return false;
        if (deptFilter   && e.dept   !== deptFilter)   return false;
        return true;
      })
      .sort((a, b) => {
        const srank: Record<NoteStatus, number> = { "Draft": 0, "In Review": 1, "Signed": 2, "Locked": 3 };
        const sd = srank[a.status] - srank[b.status];
        if (sd !== 0) return sd;
        return b.startedAt.localeCompare(a.startedAt);
      });
  }, [examinations, query, statusFilter, typeFilter, deptFilter]);

  const hasFilters  = !!(statusFilter || typeFilter || deptFilter);
  const activeCount = [statusFilter, typeFilter, deptFilter].filter(Boolean).length;
  function clearFilters() { setStatus(""); setType(""); setDept(""); }

  const kpis = [
    { label: "Drafts",     value: inDraft,  icon: <PenLine size={16} />,      cls: "text-[var(--warning-fg)]" },
    { label: "In Review",  value: inReview, icon: <Eye size={16} />,          cls: "text-[var(--info-fg)]" },
    { label: "Signed",     value: signed,   icon: <ShieldCheck size={16} />,  cls: "text-[var(--normal-fg)]" },
    { label: "This Week",  value: thisWeek, icon: <Clock size={16} />,        cls: "text-[var(--action-primary)]" },
  ];

  return (
    <div className="space-y-5 pb-8">
      <FilterDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
      statusFilter={statusFilter} setStatusFilter={(v: string) => setStatus(v as NoteStatus | "")}
      typeFilter={typeFilter}     setTypeFilter={(v: string) => setType(v as ExamType | "")}
      deptFilter={deptFilter}     setDeptFilter={setDept}
        depts={depts}
        hasFilters={hasFilters} onClear={clearFilters} resultCount={filtered.length}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Examination</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Clinical consultation &amp; SOAP documentation</p>
        </div>
        <Link
          href="/examination/new"
          className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <Plus size={15} /> New Examination
        </Link>
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
            placeholder="Search by exam ID, patient, doctor…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {/* Status quick-tabs */}
        <div className="flex gap-1">
          {(["", ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s as NoteStatus | "")}
              className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${statusFilter === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
            >
              {s ? STATUS_ICON[s as NoteStatus] : null}
              {s || "All"}
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

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_2fr_1.5fr_1fr_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Exam ID</span><span>Patient</span><span>Type</span><span>Dept</span><span>Doctor</span><span>Started</span><span>Status</span><span />
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText size={32} className="mb-3 opacity-20 text-[var(--text-secondary)]" />
            <p className="text-sm text-[var(--text-secondary)]">No examinations match your filters</p>
            {hasFilters && <button onClick={clearFilters} className="mt-2 text-xs text-[var(--action-primary)] underline">Clear filters</button>}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((exam) => (
              <Link
                key={exam.id}
                href={`/examination/${exam.id}`}
                className="group grid grid-cols-2 gap-4 px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[1fr_2fr_1fr_1fr_2fr_1.5fr_1fr_auto] md:items-center"
              >
                <p className="font-mono text-xs font-semibold text-[var(--action-primary)]">{exam.id}</p>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{exam.patientName}</p>
                  <p className="font-mono text-[10px] text-[var(--text-secondary)]">{exam.patientId}</p>
                </div>
                <span className={`hidden md:inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_CLS[exam.type]}`}>{exam.type}</span>
                <p className="hidden md:block text-xs text-[var(--text-secondary)]">{exam.dept}</p>
                <p className="hidden md:block text-sm text-[var(--text-secondary)]">{exam.doctor}</p>
                <p className="hidden md:block text-xs text-[var(--text-secondary)]">{fmtDateTime(exam.startedAt)}</p>
                <span className={`inline-flex items-center gap-1 w-fit rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[exam.status]}`}>
                  {STATUS_ICON[exam.status]} {exam.status}
                </span>
                <ChevronRight size={14} className="hidden md:block shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
