"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageCode } from "@/i18n/config";

interface LanguageSwitcherProps {
  variant?: "nav" | "footer";
}

export function LanguageSwitcher({ variant = "nav" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, currentLanguage, languages } =
    useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const isNav = variant === "nav";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${
          isNav
            ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-sunken)]"
            : "text-slate-400 hover:text-white hover:bg-slate-800"
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs sm:text-sm font-medium">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 py-2 rounded-xl shadow-lg border animate-fade-in ${
            isNav
              ? "bg-white border-[var(--border-default)] right-0 min-w-[180px]"
              : "bg-slate-800 border-slate-700 bottom-full mb-2 left-0 min-w-[160px]"
          }`}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {languages.map((lang) => {
              const isActive = language === lang.code;
              const isAvailable = ["en", "hi", "mr"].includes(lang.code);

              return (
                <button
                  key={lang.code}
                  onClick={() =>
                    isAvailable && handleLanguageChange(lang.code)
                  }
                  disabled={!isAvailable}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 text-left transition-colors ${
                    isNav
                      ? isActive
                        ? "bg-[var(--surface-sunken)] text-[var(--action-primary)]"
                        : isAvailable
                          ? "hover:bg-[var(--surface-sunken)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] opacity-50 cursor-not-allowed"
                      : isActive
                        ? "bg-slate-700 text-teal-400"
                        : isAvailable
                          ? "hover:bg-slate-700 text-slate-300"
                          : "text-slate-500 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {lang.nativeName}
                    </span>
                    <span
                      className={`text-xs ${isNav ? "text-[var(--text-secondary)]" : "text-slate-500"}`}
                    >
                      {lang.name}
                    </span>
                  </div>
                  {isActive && (
                    <Check className="w-4 h-4 flex-shrink-0" />
                  )}
                  {!isAvailable && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${isNav ? "bg-slate-100 text-slate-500" : "bg-slate-700 text-slate-500"}`}
                    >
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
