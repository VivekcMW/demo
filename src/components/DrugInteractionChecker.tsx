"use client";

import { useState, useMemo } from "react";
import {
  checkInteractions,
  ALL_INTERACTING_DRUGS,
  SEED_PATIENT_DRUGS,
  type DrugInteraction,
  type InteractionSeverity,
} from "@/data/drugInteractions";
import { AlertTriangle, ShieldAlert, AlertCircle, Info, X, Search, Pill } from "lucide-react";
import { usePharmacyStore } from "@/store/usePharmacyStore";

const SEVERITY_CONFIG: Record<InteractionSeverity, { icon: React.ElementType; label: string; cls: string; bgCls: string }> = {
  Contraindicated: { icon: ShieldAlert, label: "Contraindicated", cls: "text-[var(--critical-fg)]", bgCls: "bg-[var(--critical-bg)] border-[var(--critical-fg)]" },
  Major: { icon: AlertTriangle, label: "Major", cls: "text-[var(--critical-fg)]", bgCls: "bg-[var(--critical-bg)] border-[var(--critical-fg)]" },
  Moderate: { icon: AlertCircle, label: "Moderate", cls: "text-[var(--warning-fg)]", bgCls: "bg-[var(--warning-bg)] border-[var(--warning-fg)]" },
  Minor: { icon: Info, label: "Minor", cls: "text-[var(--info-fg)]", bgCls: "bg-[var(--info-bg)] border-[var(--info-fg)]" },
};

function SeverityBadge({ severity }: { severity: InteractionSeverity }) {
  const cfg = SEVERITY_CONFIG[severity];
  const Icon = cfg.icon;
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bgCls} ${cfg.cls}`}><Icon size={10} />{cfg.label}</span>;
}

function InteractionCard({ ix }: { ix: DrugInteraction }) {
  const cfg = SEVERITY_CONFIG[ix.severity];
  const Icon = cfg.icon;
  return (
    <div className={`rounded-xl border-2 p-4 ${cfg.bgCls} ${cfg.cls}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon size={18} />
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{ix.drugA} ↔ {ix.drugB}</p>
            <SeverityBadge severity={ix.severity} />
            <span className="ml-2 rounded bg-[var(--surface-raised)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-secondary)]">{ix.evidence}</span>
            <span className="ml-1 rounded bg-[var(--surface-raised)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--text-secondary)]">{ix.category}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-white/40 p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Mechanism</p>
          <p className="mt-0.5 text-xs text-[var(--text-primary)]">{ix.mechanism}</p>
        </div>
        <div className="rounded-lg bg-white/40 p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Clinical Effect</p>
          <p className="mt-0.5 text-xs text-[var(--text-primary)]">{ix.effect}</p>
        </div>
        <div className="rounded-lg bg-white/40 p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Recommendation</p>
          <p className="mt-0.5 text-xs text-[var(--text-primary)]">{ix.recommendation}</p>
        </div>
      </div>
    </div>
  );
}

export default function DrugInteractionChecker() {
  const catalogue = usePharmacyStore((s) => s.catalogue);
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [patientFilter, setPatientFilter] = useState<string>("all");

  const allDrugs = useMemo(() => {
    const names = new Set<string>();
    catalogue.forEach((d) => names.add(d.genericName));
    ALL_INTERACTING_DRUGS.forEach((d) => names.add(d));
    return Array.from(names).sort();
  }, [catalogue]);

  const filteredDrugs = useMemo(() => {
    if (!search) return [];
    const q = search.toLowerCase();
    return allDrugs.filter((d) => d.toLowerCase().includes(q) && !selectedDrugs.includes(d)).slice(0, 10);
  }, [search, allDrugs, selectedDrugs]);

  const interactions = useMemo(() => checkInteractions(selectedDrugs), [selectedDrugs]);

  const worstSeverity = useMemo(() => {
    if (interactions.length === 0) return null;
    const rank: InteractionSeverity[] = ["Contraindicated", "Major", "Moderate", "Minor"];
    for (const s of rank) if (interactions.some((ix) => ix.severity === s)) return s;
    return "Minor" as InteractionSeverity;
  }, [interactions]);

  const addDrug = (drug: string) => {
    if (!selectedDrugs.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
    setSearch("");
    setShowDropdown(false);
  };

  const removeDrug = (drug: string) => {
    setSelectedDrugs(selectedDrugs.filter((d) => d !== drug));
  };

  const loadPatient = (patientId: string) => {
    const p = SEED_PATIENT_DRUGS.find((pd) => pd.patientId === patientId);
    if (p) setSelectedDrugs(p.drugs);
  };

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert size={24} className="text-[var(--action-primary)]" />
          <div>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">Drug Interaction Checker</h1>
            <p className="text-sm text-[var(--text-secondary)]">Check interactions between drugs before prescribing</p>
          </div>
        </div>
      </div>

      {/* Quick load patient */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">Quick Load Patient</p>
        <div className="flex flex-wrap gap-2">
          {SEED_PATIENT_DRUGS.map((p) => (
            <button key={p.patientId} onClick={() => loadPatient(p.patientId)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${selectedDrugs.length > 0 ? "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]" : "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"}`}>
              {p.patientName}
              <span className="ml-1 text-[9px] opacity-70">({p.drugs.length} drugs)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Drug selector */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Selected Drugs {selectedDrugs.length > 0 && <span className="ml-1 text-[var(--text-disabled)]">({selectedDrugs.length})</span>}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {selectedDrugs.map((d) => (
            <span key={d} className="inline-flex items-center gap-1 rounded-full bg-[var(--action-subtle)] px-3 py-1 text-xs font-medium text-[var(--action-primary)]">
              <Pill size={10} />
              {d}
              <button onClick={() => removeDrug(d)} className="ml-0.5 rounded-full p-0.5 hover:bg-[var(--action-primary)] hover:text-white"><X size={10} /></button>
            </span>
          ))}
          {selectedDrugs.length === 0 && <span className="text-xs text-[var(--text-disabled)] italic">Add drugs below or load a patient above</span>}
        </div>

        <div className="relative">
          <div className="flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2">
            <Search size={14} className="mr-2 text-[var(--text-secondary)]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Search and add a drug…"
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-disabled)]"
            />
          </div>
          {showDropdown && search && filteredDrugs.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-lg max-h-48 overflow-y-auto">
              {filteredDrugs.map((d) => (
                <button key={d} onMouseDown={() => addDrug(d)} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--action-subtle)]">
                  <Pill size={12} className="text-[var(--text-secondary)]" />
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {selectedDrugs.length >= 2 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Interaction Results</p>
              <span className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">{interactions.length} found</span>
            </div>
            {worstSeverity && <SeverityBadge severity={worstSeverity} />}
          </div>

          {interactions.length === 0 && (
            <div className="rounded-xl border-2 border-[var(--normal-fg)] bg-[var(--normal-bg)] p-6 text-center">
              <Info size={24} className="mx-auto text-[var(--normal-fg)]" />
              <p className="mt-2 text-sm font-semibold text-[var(--normal-fg)]">No known interactions</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">No interactions found between the selected drugs in our database.</p>
            </div>
          )}

          {interactions.map((ix, i) => <InteractionCard key={i} ix={ix} />)}
        </div>
      )}

      {selectedDrugs.length < 2 && selectedDrugs.length > 0 && (
        <div className="rounded-xl border border-dashed border-[var(--border-default)] bg-[var(--surface-raised)] p-6 text-center">
          <Info size={20} className="mx-auto text-[var(--text-secondary)]" />
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Add at least one more drug to check for interactions.</p>
        </div>
      )}
    </div>
  );
}
