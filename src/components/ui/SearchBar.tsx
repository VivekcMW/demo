"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

// ── SearchBar ─────────────────────────────────────────────────────────────────
// Search input + optional filter button with active count badge.
//
// Usage:
//   <SearchBar
//     value={query} onChange={setQuery}
//     placeholder="Search patients…"
//     onFilterClick={() => setDrawerOpen(true)}
//     hasFilters={hasFilters} activeCount={3}
//     onClear={clearFilters}
//   />

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  /** Show the filter button (SlidersHorizontal). Omit to hide it. */
  onFilterClick?: () => void;
  hasFilters?: boolean;
  activeCount?: number;
  /** Show a "Clear" link when filters are active */
  onClear?: () => void;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  onFilterClick,
  hasFilters = false,
  activeCount = 0,
  onClear,
  className = "",
}: SearchBarProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] transition-colors"
        />
      </div>

      {/* Filter button */}
      {onFilterClick && (
        <button
          onClick={onFilterClick}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            hasFilters
              ? "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
              : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--action-primary)] text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      )}

      {/* Clear filters link */}
      {hasFilters && onClear && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] underline hover:text-[var(--critical-fg)] transition-colors"
        >
          <RotateCcw size={11} /> Clear
        </button>
      )}
    </div>
  );
}
