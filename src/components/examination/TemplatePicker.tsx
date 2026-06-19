"use client";

import { useState, useMemo } from "react";
import { getAllTemplates } from "@/data/templateRegistry";
import type { TemplateDefinition } from "@/data/templateSchema";
import { FileText, X, Search, ChevronRight } from "lucide-react";

// ── PRD §FR-CDE-010 — Template Type labels ─────────────────────────────────────

const TYPE_LABELS: Record<string, { label: string; icon: string; desc: string }> = {
  SOAP:      { label: "SOAP Note",       icon: "S", desc: "Subjective, Objective, Assessment, Plan" },
  Admission: { label: "Admission Note",  icon: "A", desc: "Structured inpatient admission" },
  Progress:  { label: "Progress Note",   icon: "P", desc: "Daily rounds and updates" },
  Procedure: { label: "Procedure Note",  icon: "P", desc: "Surgical and procedural documentation" },
  Discharge: { label: "Discharge Summary", icon: "D", desc: "Discharge summary with follow-up" },
  Allied:    { label: "Allied Assessment", icon: "A", desc: "Physio, dietetics, mental health" },
};

const TYPE_COLORS: Record<string, string> = {
  SOAP:      "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Admission: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Progress:  "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Procedure: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Discharge: "bg-amber-50 text-amber-700",
  Allied:    "bg-purple-50 text-purple-700",
};

// ── Picker Component ───────────────────────────────────────────────────────────

export interface TemplatePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: TemplateDefinition) => void;
  selectedId?: string;
  specialtyFilter?: string;
}

export function TemplatePicker({ open, onClose, onSelect, selectedId, specialtyFilter }: TemplatePickerProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const allTemplates = useMemo(() => {
    const all = getAllTemplates();
    if (specialtyFilter) {
      return all.filter((t) =>
        t.metadata.specialties.some((s) => s.toLowerCase() === specialtyFilter.toLowerCase())
      );
    }
    return all;
  }, [specialtyFilter]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allTemplates.filter((t) => {
      if (q && !t.name.toLowerCase().includes(q) && !t.metadata.description.toLowerCase().includes(q)) return false;
      if (typeFilter && t.type !== typeFilter) return false;
      return true;
    });
  }, [allTemplates, query, typeFilter]);

  const types = useMemo(() => [...new Set(allTemplates.map((t) => t.type))], [allTemplates]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex w-full max-w-2xl flex-col rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[var(--action-primary)]" />
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Select Template</h2>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
              <X size={18} />
            </button>
          </div>

          {/* Search + filter */}
          <div className="px-6 py-4 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]"
                placeholder="Search templates…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTypeFilter("")}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  !typeFilter
                    ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                    : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                }`}
              >
                All
              </button>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    typeFilter === t
                      ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                  }`}
                >
                  {TYPE_LABELS[t]?.label ?? t}
                </button>
              ))}
            </div>
          </div>

          {/* Template list */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <FileText size={28} className="mb-2 opacity-20 text-[var(--text-secondary)]" />
                <p className="text-sm text-[var(--text-secondary)]">No matching templates</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((t) => {
                  const meta = TYPE_LABELS[t.type];
                  const isSelected = t.id === selectedId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelect(t);
                        onClose();
                      }}
                      className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-[var(--action-primary)] bg-[var(--action-subtle)]"
                          : "border-[var(--border-default)] hover:border-[var(--action-primary)] hover:bg-[var(--surface-sunken)]"
                      }`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${TYPE_COLORS[t.type] ?? "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>
                        {meta?.icon ?? t.type.charAt(0)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--action-primary)] transition-colors">
                            {t.name}
                          </p>
                          {t.type !== "SOAP" && (
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${TYPE_COLORS[t.type]}`}>
                              {meta?.label ?? t.type}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{t.metadata.description}</p>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {t.metadata.specialties.slice(0, 3).map((s) => (
                            <span key={s} className="rounded-full bg-[var(--surface-sunken)] px-2 py-0.5 text-[10px] text-[var(--text-secondary)]">
                              {s}
                            </span>
                          ))}
                          {t.metadata.specialties.length > 3 && (
                            <span className="text-[10px] text-[var(--text-secondary)]">+{t.metadata.specialties.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={16} className="mt-2 shrink-0 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
