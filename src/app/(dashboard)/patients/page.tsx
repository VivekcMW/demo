"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePatientStore } from "@/store/usePatientStore";
import type { BloodGroup, ChronicCondition } from "@/data/seedPatients";
import {
  Search, Users, CalendarDays, HeartPulse, ShieldCheck,
  ChevronRight, SlidersHorizontal, X, UserPlus, RotateCcw,
} from "lucide-react";

// ── Design-system helpers ─────────────────────────────────────────────────────

const COND_CLS: Record<string, string> = {
  CAD:        "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  CKD:        "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  COPD:       "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  DM:         "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  HTN:        "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Epilepsy:   "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Asthma:     "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Hypothyroid:"bg-[var(--info-bg)] text-[var(--info-fg)]",
  Arthritis:  "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Obesity:    "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const AVATAR_COLORS = [
  "bg-[var(--action-primary)]", "bg-[var(--info-fg)]",
  "bg-[var(--warning-fg)]",    "bg-[var(--critical-fg)]",
  "bg-[var(--normal-fg)]",
];
function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const ALL_CONDITIONS: ChronicCondition[] = [
  "DM","HTN","CKD","Asthma","CAD","Hypothyroid","COPD","Arthritis","Epilepsy","Obesity",
];
const ALL_BLOOD_GROUPS: BloodGroup[] = ["A+","A-","B+","B-","AB+","AB-","O+","O-","Unknown"];

// ── Filter Drawer ─────────────────────────────────────────────────────────────

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  sexFilter: "" | "M" | "F" | "O";
  setSexFilter: (v: "" | "M" | "F" | "O") => void;
  bgFilter: BloodGroup | "";
  setBgFilter: (v: BloodGroup | "") => void;
  condFilter: ChronicCondition | "";
  setCondFilter: (v: ChronicCondition | "") => void;
  hasFilters: boolean;
  onClear: () => void;
  resultCount: number;
}

function FilterDrawer({
  open, onClose,
  sexFilter, setSexFilter,
  bgFilter, setBgFilter,
  condFilter, setCondFilter,
  hasFilters, onClear, resultCount,
}: FilterDrawerProps) {
  if (!open) return null;

  function Section({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{label}</p>
        {children}
      </div>
    );
  }

  function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
          active
            ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
            : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)]"
        }`}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
            {hasFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
                {[sexFilter, bgFilter, condFilter].filter(Boolean).length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable filter body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* Gender */}
          <Section label="Gender">
            <div className="flex flex-wrap gap-2">
              {(["", "M", "F", "O"] as const).map((s) => (
                <ToggleBtn key={s} active={sexFilter === s} onClick={() => setSexFilter(s)}>
                  {s === "" ? "All" : s === "M" ? "Male" : s === "F" ? "Female" : "Other"}
                </ToggleBtn>
              ))}
            </div>
          </Section>

          {/* Blood group */}
          <Section label="Blood Group">
            <div className="flex flex-wrap gap-2">
              <ToggleBtn active={bgFilter === ""} onClick={() => setBgFilter("")}>All</ToggleBtn>
              {ALL_BLOOD_GROUPS.slice(0, 8).map((g) => (
                <ToggleBtn key={g} active={bgFilter === g} onClick={() => setBgFilter(g)}>{g}</ToggleBtn>
              ))}
            </div>
          </Section>

          {/* Chronic condition */}
          <Section label="Chronic Condition">
            <div className="flex flex-wrap gap-2">
              <ToggleBtn active={condFilter === ""} onClick={() => setCondFilter("")}>All</ToggleBtn>
              {ALL_CONDITIONS.map((c) => (
                <ToggleBtn key={c} active={condFilter === c} onClick={() => setCondFilter(c)}>
                  {c}
                </ToggleBtn>
              ))}
            </div>
          </Section>

          {/* ABHA / Insurance quick filters — visual separators */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] p-4 text-xs text-[var(--text-secondary)]">
            <p className="font-semibold text-[var(--text-primary)] mb-1">Active filters summary</p>
            <p>Gender: <span className="font-medium text-[var(--text-primary)]">{sexFilter || "All"}</span></p>
            <p>Blood group: <span className="font-medium text-[var(--text-primary)]">{bgFilter || "All"}</span></p>
            <p>Condition: <span className="font-medium text-[var(--text-primary)]">{condFilter || "All"}</span></p>
            <p className="mt-2 font-medium text-[var(--action-primary)]">{resultCount} patient{resultCount !== 1 ? "s" : ""} match</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button
            onClick={onClear}
            disabled={!hasFilters}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-sunken)] disabled:opacity-40"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PatientsPage() {
  const patients = usePatientStore((s) => s.patients);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const [query, setQuery] = useState("");
  const [sexFilter, setSexFilter] = useState<"" | "M" | "F" | "O">("");
  const [bgFilter, setBgFilter] = useState<BloodGroup | "">("");
  const [condFilter, setCondFilter] = useState<ChronicCondition | "">("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ── KPI stats ──────────────────────────────────────────────────────────────
  const total = patients.length;
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const newThisMonth = patients.filter((p) => p.registeredAt >= monthStart).length;
  const chronicCount = patients.filter((p) => p.chronicConditions.length > 0).length;
  const abhaLinked = patients.filter((p) => p.abhaId).length;
  const abhaPercent = total ? Math.round((abhaLinked / total) * 100) : 0;

  // ── Filtered list ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return patients.filter((p) => {
      if (q && !(
        p.name.toLowerCase().includes(q) ||
        p.uhid.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.abhaId?.toLowerCase().includes(q) ?? false)
      )) return false;
      if (sexFilter && p.sex !== sexFilter) return false;
      if (bgFilter && p.bloodGroup !== bgFilter) return false;
      if (condFilter && !p.chronicConditions.includes(condFilter)) return false;
      return true;
    });
  }, [patients, query, sexFilter, bgFilter, condFilter]);

  const hasFilters = !!(sexFilter || bgFilter || condFilter);
  const activeFilterCount = [sexFilter, bgFilter, condFilter].filter(Boolean).length;

  function clearFilters() {
    setSexFilter(""); setBgFilter(""); setCondFilter("");
  }

  const kpis = [
    { Icon: Users,       label: "Total Patients", value: String(total),        iconCls: "text-[var(--action-primary)]", valCls: "text-[var(--action-primary)]" },
    { Icon: CalendarDays,label: "New This Month",  value: String(newThisMonth), iconCls: "text-[var(--info-fg)]",        valCls: "text-[var(--info-fg)]" },
    { Icon: HeartPulse,  label: "Chronic Care",    value: String(chronicCount), iconCls: "text-[var(--warning-fg)]",     valCls: "text-[var(--warning-fg)]" },
    { Icon: ShieldCheck, label: "ABHA Linked",     value: `${abhaPercent}%`,    iconCls: "text-[var(--normal-fg)]",      valCls: "text-[var(--normal-fg)]" },
  ];

  return (
    <div className="space-y-5 pb-8">

      {/* ── Filter drawer ───────────────────────────────────────────────────── */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sexFilter={sexFilter} setSexFilter={setSexFilter}
        bgFilter={bgFilter}   setBgFilter={setBgFilter}
        condFilter={condFilter} setCondFilter={setCondFilter}
        hasFilters={hasFilters}
        onClear={clearFilters}
        resultCount={filtered.length}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Patients</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{total} registered patients</p>
        </div>
        <Link
          href="/patients/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          <UserPlus size={15} />
          New Patient
        </Link>
      </div>

      {/* ── KPI bar ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{k.label}</p>
              <k.Icon size={16} className={k.iconCls} />
            </div>
            <p className={`mt-2 text-2xl font-bold tabular-nums ${k.valCls}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* ── Search + filter bar ────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search by name, UHID, phone or ABHA ID…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
          />
        </div>

        {/* Filter button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
            hasFilters
              ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
              : "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {sexFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {sexFilter === "M" ? "Male" : sexFilter === "F" ? "Female" : "Other"}
                <button onClick={() => setSexFilter("")}><X size={11} /></button>
              </span>
            )}
            {bgFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {bgFilter}
                <button onClick={() => setBgFilter("")}><X size={11} /></button>
              </span>
            )}
            {condFilter && (
              <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
                {condFilter}
                <button onClick={() => setCondFilter("")}><X size={11} /></button>
              </span>
            )}
            <button onClick={clearFilters} className="text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)]">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Patient table ──────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        {/* Table header */}
        <div className="hidden grid-cols-[2.5fr_1fr_1.5fr_2fr_1fr_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Patient</span>
          <span>Age / Sex</span>
          <span>Phone</span>
          <span>Conditions</span>
          <span>Last Visit</span>
          <span />
        </div>

        {!hydrated ? (
          <div className="divide-y divide-[var(--border-default)]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="skeleton h-9 w-9 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-3.5 w-40" />
                  <div className="skeleton h-3 w-24" />
                </div>
                <div className="hidden md:flex gap-8">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="font-medium text-[var(--text-primary)]">No patients found</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Try adjusting your search or filters</p>
            {hasFilters && (
              <button onClick={clearFilters} className="mt-4 rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/patients/${p.id}`}
                className="group grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-[var(--surface-sunken)] md:grid-cols-[2.5fr_1fr_1.5fr_2fr_1fr_auto] md:items-center md:gap-4"
              >
                {/* Patient name + UHID */}
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(p.name)}`}>
                    {initials(p.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--action-primary)]">{p.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{p.uhid}</p>
                  </div>
                </div>

                {/* Age / Sex */}
                <p className="text-sm text-[var(--text-primary)]">
                  {p.age}y {p.sex === "M" ? "♂" : p.sex === "F" ? "♀" : "—"}
                </p>

                {/* Phone */}
                <p className="text-sm text-[var(--text-primary)]">{p.phone}</p>

                {/* Chronic conditions */}
                <div className="flex flex-wrap gap-1">
                  {p.chronicConditions.length === 0 ? (
                    <span className="text-xs text-[var(--text-secondary)]">—</span>
                  ) : (
                    <>
                      {p.chronicConditions.slice(0, 3).map((c) => (
                        <span key={c} className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${COND_CLS[c] ?? "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
                          {c}
                        </span>
                      ))}
                      {p.chronicConditions.length > 3 && (
                        <span className="rounded-full bg-[var(--surface-sunken)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                          +{p.chronicConditions.length - 3}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Last visit */}
                <p className="text-sm text-[var(--text-secondary)]">
                  {p.lastVisit
                    ? new Date(p.lastVisit).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                    : "—"}
                </p>

                {/* Arrow */}
                <ChevronRight size={15} className="hidden text-[var(--text-secondary)] transition-colors group-hover:text-[var(--action-primary)] md:block" />
              </Link>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <div className="border-t border-[var(--border-default)] px-5 py-3">
            <p className="text-xs text-[var(--text-secondary)]">
              Showing {filtered.length} of {total} patients
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
