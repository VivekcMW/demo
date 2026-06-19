"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown, Check } from "lucide-react";

interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  id?: string;
}

export function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  label,
  id,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle selection
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  // Remove a selected item
  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((s) => s !== option));
  };

  // Clear all
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      
      {/* Trigger button */}
      <button
        type="button"
        id={id}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
          }
        }}
        className="w-full min-h-[48px] px-4 py-2 rounded-lg border border-[var(--border-default)] bg-white text-left flex items-center gap-2 focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
      >
        <div className="flex-1 flex flex-wrap gap-1.5">
          {selected.length === 0 ? (
            <span className="text-[var(--text-secondary)]">{placeholder}</span>
          ) : (
            selected.map((option) => (
              <span
                key={option}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm"
              >
                {option}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => removeOption(option, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      removeOption(option, e as unknown as React.MouseEvent);
                    }
                  }}
                  className="hover:bg-[var(--action-primary)]/20 rounded p-0.5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            ))
          )}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {selected.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              onClick={clearAll}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  clearAll(e as unknown as React.MouseEvent);
                }
              }}
              className="p-1 hover:bg-slate-100 rounded cursor-pointer"
              title="Clear all"
            >
              <X className="w-4 h-4 text-[var(--text-secondary)]" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg border border-[var(--border-default)] shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-[var(--border-default)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-[var(--border-default)] bg-white text-sm focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[var(--text-secondary)] text-center">
                No results found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 hover:bg-[var(--bg-subtle)] transition-colors ${
                      isSelected ? "bg-[var(--action-primary)]/5" : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? "bg-[var(--action-primary)] border-[var(--action-primary)]"
                          : "border-[var(--border-default)]"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={isSelected ? "text-[var(--action-primary)] font-medium" : "text-foreground"}>
                      {option}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer with count */}
          {selected.length > 0 && (
            <div className="px-4 py-2 border-t border-[var(--border-default)] bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)]">
              {selected.length} selected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
