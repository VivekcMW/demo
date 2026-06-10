"use client";

import { type ReactNode } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Drawer } from "./Drawer";

// ── FilterDrawerShell ─────────────────────────────────────────────────────────
// Generic slide-in filter panel.  Drop filter sections as children.

interface FilterDrawerShellProps {
  open: boolean;
  onClose: () => void;
  /** Number of active (non-empty) filter values */
  activeCount: number;
  /** Number of items matching the current filters */
  resultCount: number;
  /** Singular noun for the result count label, e.g. "patient" → "3 patients" */
  resultLabel?: string;
  hasFilters: boolean;
  onClear: () => void;
  children: ReactNode;
}

export function FilterDrawerShell({
  open,
  onClose,
  activeCount,
  resultCount,
  resultLabel = "result",
  hasFilters,
  onClear,
  children,
}: FilterDrawerShellProps) {
  return (
    <Drawer open={open} onClose={onClose} maxWidth="max-w-xs" aria-label="Filters">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[var(--action-primary)]" />
          <h2 className="font-semibold text-[var(--text-primary)]">Filters</h2>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          aria-label="Close filters"
        >
          {/* X icon via inline SVG to avoid extra import */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Scrollable body — each FilterSection goes here */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
        {children}
      </div>

      {/* Footer */}
      <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
        <button
          onClick={onClear}
          disabled={!hasFilters}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] disabled:opacity-40 transition-colors"
        >
          <RotateCcw size={14} /> Reset
        </button>
        <button
          onClick={onClose}
          className="flex-1 rounded-lg bg-[var(--action-primary)] py-2.5 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors"
        >
          Show {resultCount} {resultLabel}{resultCount !== 1 ? "s" : ""}
        </button>
      </div>
    </Drawer>
  );
}

// ── FilterSection ─────────────────────────────────────────────────────────────
// Labeled group of toggle buttons inside a FilterDrawerShell.

interface FilterSectionProps {
  label: string;
  children: ReactNode;
}

export function FilterSection({ label, children }: FilterSectionProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ── FilterToggleBtn ───────────────────────────────────────────────────────────
// Toggle pill button used inside FilterSection.

interface FilterToggleBtnProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function FilterToggleBtn({ active, onClick, children }: FilterToggleBtnProps) {
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
