"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, ChevronDown, Loader2, Bookmark, AlertCircle, Check } from "lucide-react";
import { searchICD10, getSpecialtyFavorites, recordUsage } from "@/services/icd10Service";
import type { ICD10SearchResult, ICD10SpecialtyFavorite, Specialty } from "@/lib/types/icd10";
import { SPECIALTIES } from "@/lib/types/icd10";
import { useDebounce } from "@/hooks/useDebounce";

// ─────────────────────────────────────────────────────────────────────────────
// ICD10Search Component
// Autocomplete search for ICD-10 codes with specialty filtering and favorites.
// ─────────────────────────────────────────────────────────────────────────────

interface ICD10SearchProps {
  /** Current specialty context for filtering */
  specialty?: Specialty;
  /** Callback when a code is selected */
  onSelect: (code: string, description: string) => void;
  /** Initial value (code) */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Show only billable codes */
  billableOnly?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Class name for container */
  className?: string;
}

export function ICD10Search({
  specialty,
  onSelect,
  value = "",
  placeholder = "Search ICD-10 code or diagnosis...",
  billableOnly = false,
  disabled = false,
  error,
  className = "",
}: ICD10SearchProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ICD10SearchResult[]>([]);
  const [favorites, setFavorites] = useState<ICD10SpecialtyFavorite[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | undefined>(specialty);
  const [showFilters, setShowFilters] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load favorites on specialty change
  useEffect(() => {
    if (selectedSpecialty) {
      getSpecialtyFavorites(selectedSpecialty)
        .then(setFavorites)
        .catch(() => setFavorites([]));
    } else {
      setFavorites([]);
    }
  }, [selectedSpecialty]);

  // Search on query change
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    searchICD10({
      q: debouncedQuery,
      specialty: selectedSpecialty,
      billable: billableOnly || undefined,
      limit: 20,
    })
      .then((r) => {
        setResults(r);
        setHighlightedIndex(-1);
      })
      .catch(() => setResults([]))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery, selectedSpecialty, billableOnly]);

  const handleSelect = useCallback(
    (code: string, description: string) => {
      setQuery(`${code} - ${description}`);
      setIsOpen(false);
      onSelect(code, description);

      // Record usage for learning
      if (selectedSpecialty) {
        recordUsage(code, selectedSpecialty).catch(() => {});
      }
    },
    [onSelect, selectedSpecialty]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    const items = results.length > 0 ? results : favorites;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.min(prev + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < items.length) {
          const item = items[highlightedIndex];
          if ("shortDesc" in item) {
            handleSelect(item.code, item.shortDesc);
          } else {
            handleSelect(item.icdCode, item.shortDesc || "");
          }
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  const showResults = results.length > 0;
  const showFavorites = !showResults && favorites.length > 0 && !query;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div
        className={`flex items-center gap-2 rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 transition-colors ${
          error
            ? "border-[var(--status-error)]"
            : isOpen
            ? "border-[var(--action-primary)] ring-2 ring-[var(--action-primary)]/20"
            : "border-[var(--border-default)]"
        } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        <Search size={16} className="text-[var(--text-secondary)] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
        />
        {isLoading && <Loader2 size={16} className="text-[var(--action-primary)] animate-spin" />}
        {query && !isLoading && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition-colors ${
            selectedSpecialty
              ? "bg-[var(--action-subtle)] text-[var(--action-primary)]"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          }`}
        >
          <span>{selectedSpecialty || "Filter"}</span>
          <ChevronDown size={12} className={showFilters ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-xs text-[var(--status-error)]">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}

      {/* Filter dropdown */}
      {showFilters && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 shadow-lg">
          <div className="mb-2 px-2 text-xs font-medium text-[var(--text-secondary)]">Specialty Filter</div>
          <button
            onClick={() => {
              setSelectedSpecialty(undefined);
              setShowFilters(false);
            }}
            className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors ${
              !selectedSpecialty
                ? "bg-[var(--action-subtle)] text-[var(--action-primary)]"
                : "text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"
            }`}
          >
            All Specialties
            {!selectedSpecialty && <Check size={14} />}
          </button>
          <div className="my-1 h-px bg-[var(--border-default)]" />
          <div className="max-h-48 overflow-y-auto">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelectedSpecialty(s);
                  setShowFilters(false);
                }}
                className={`flex w-full items-center justify-between rounded px-2 py-1.5 text-sm transition-colors ${
                  selectedSpecialty === s
                    ? "bg-[var(--action-subtle)] text-[var(--action-primary)]"
                    : "text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"
                }`}
              >
                {s}
                {selectedSpecialty === s && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results dropdown */}
      {isOpen && (showResults || showFavorites) && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-lg">
          <ul ref={listRef} className="max-h-72 overflow-y-auto p-1">
            {/* Favorites section */}
            {showFavorites && (
              <>
                <li className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--text-secondary)]">
                  <Bookmark size={12} />
                  <span>Quick Pick - {selectedSpecialty}</span>
                </li>
                {favorites.map((fav, idx) => (
                  <li key={fav.icdCode}>
                    <button
                      type="button"
                      onClick={() => handleSelect(fav.icdCode, fav.shortDesc || "")}
                      className={`w-full rounded px-3 py-2 text-left transition-colors ${
                        highlightedIndex === idx
                          ? "bg-[var(--action-subtle)]"
                          : "hover:bg-[var(--surface-sunken)]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 font-mono text-xs font-medium text-[var(--action-primary)]">
                          {fav.icdCode}
                        </span>
                        {fav.isBillable && (
                          <span className="rounded bg-[var(--status-success)]/10 px-1 py-0.5 text-[10px] font-medium text-[var(--status-success)]">
                            Billable
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-[var(--text-primary)]">{fav.shortDesc}</p>
                    </button>
                  </li>
                ))}
              </>
            )}

            {/* Search results */}
            {showResults &&
              results.map((result, idx) => (
                <li key={result.code}>
                  <button
                    type="button"
                    onClick={() => handleSelect(result.code, result.shortDesc)}
                    className={`w-full rounded px-3 py-2 text-left transition-colors ${
                      highlightedIndex === idx
                        ? "bg-[var(--action-subtle)]"
                        : "hover:bg-[var(--surface-sunken)]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[var(--surface-sunken)] px-1.5 py-0.5 font-mono text-xs font-medium text-[var(--action-primary)]">
                        {result.code}
                      </span>
                      {result.isBillable && (
                        <span className="rounded bg-[var(--status-success)]/10 px-1 py-0.5 text-[10px] font-medium text-[var(--status-success)]">
                          Billable
                        </span>
                      )}
                      {result.isChronic && (
                        <span className="rounded bg-[var(--status-warning)]/10 px-1 py-0.5 text-[10px] font-medium text-[var(--status-warning)]">
                          Chronic
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[var(--text-primary)]">{result.shortDesc}</p>
                    <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                      {result.chapterTitle} › {result.categoryTitle}
                    </p>
                  </button>
                </li>
              ))}
          </ul>

          {/* Footer hint */}
          <div className="border-t border-[var(--border-default)] px-3 py-2 text-xs text-[var(--text-tertiary)]">
            Use ↑↓ to navigate • Enter to select • Esc to close
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && !isLoading && results.length === 0 && !showFavorites && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center shadow-lg">
          <AlertCircle size={20} className="mx-auto mb-2 text-[var(--text-tertiary)]" />
          <p className="text-sm text-[var(--text-secondary)]">No ICD-10 codes found for "{query}"</p>
          <p className="mt-1 text-xs text-[var(--text-tertiary)]">Try a different search term or check spelling</p>
        </div>
      )}
    </div>
  );
}
