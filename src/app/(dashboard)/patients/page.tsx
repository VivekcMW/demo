"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePatientStore } from "@/store/usePatientStore";
import type { BloodGroup, ChronicCondition } from "@/data/seedPatients";
import { Users, CalendarDays, HeartPulse, ShieldCheck, ChevronRight, UserPlus, X } from "lucide-react";
import { FilterDrawerShell, FilterSection, FilterToggleBtn } from "@/components/ui/FilterDrawerShell";
import { KpiCard } from "@/components/ui/KpiCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchBar } from "@/components/ui/SearchBar";
import { EmptyState } from "@/components/ui/EmptyState";

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
      <FilterDrawerShell
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        activeCount={activeFilterCount} resultCount={filtered.length}
        resultLabel="patient" hasFilters={hasFilters} onClear={clearFilters}
      >
        <FilterSection label="Gender">
          {(["M", "F", "O"] as const).map((s) => (
            <FilterToggleBtn key={s} active={sexFilter === s} onClick={() => setSexFilter(sexFilter === s ? "" : s)}>
              {s === "M" ? "Male" : s === "F" ? "Female" : "Other"}
            </FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Blood Group">
          <FilterToggleBtn active={bgFilter === ""} onClick={() => setBgFilter("")}>All</FilterToggleBtn>
          {ALL_BLOOD_GROUPS.slice(0, 8).map((g) => (
            <FilterToggleBtn key={g} active={bgFilter === g} onClick={() => setBgFilter(bgFilter === g ? "" : g)}>{g}</FilterToggleBtn>
          ))}
        </FilterSection>
        <FilterSection label="Chronic Condition">
          <FilterToggleBtn active={condFilter === ""} onClick={() => setCondFilter("")}>All</FilterToggleBtn>
          {ALL_CONDITIONS.map((c) => (
            <FilterToggleBtn key={c} active={condFilter === c} onClick={() => setCondFilter(condFilter === c ? "" : c)}>{c}</FilterToggleBtn>
          ))}
        </FilterSection>
      </FilterDrawerShell>

      <PageHeader
        title="Patients"
        subtitle={`${total} registered patients`}
        action={
          <Link href="/patients/new" className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <UserPlus size={15} /> New Patient
          </Link>
        }
      />

      {/* ── KPI bar ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={<k.Icon size={16} />} colorClass={k.iconCls} />
        ))}
      </div>

      <SearchBar
        value={query} onChange={setQuery}
        placeholder="Search by name, UHID, phone or ABHA ID…"
        onFilterClick={() => setDrawerOpen(true)}
        hasFilters={hasFilters} activeCount={activeFilterCount}
        onClear={clearFilters}
      />
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
              {bgFilter} <button onClick={() => setBgFilter("")}><X size={11} /></button>
            </span>
          )}
          {condFilter && (
            <span className="flex items-center gap-1 rounded-full border border-[var(--action-primary)] bg-[var(--action-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--action-primary)]">
              {condFilter} <button onClick={() => setCondFilter("")}><X size={11} /></button>
            </span>
          )}
        </div>
      )}

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
            {filtered.map((p, idx) => (
              <Link
                key={p.id}
                href={`/patients/${p.id}`}
                style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
                className="group grid grid-cols-1 gap-3 px-5 py-4 transition-colors hover:bg-[var(--surface-sunken)] md:grid-cols-[2.5fr_1fr_1.5fr_2fr_1fr_auto] md:items-center md:gap-4 animate-slide-up"
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
