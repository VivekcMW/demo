"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Check, Minus, X } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  { label: "Specialty-deep clinical workflows", aarogya: true, legacy: false, paper: false },
  { label: "12 Indian languages (UI + prints)", aarogya: true, legacy: "partial", paper: false },
  { label: "ABDM / ABHA built in (M3)", aarogya: true, legacy: "partial", paper: false },
  { label: "GST + TPA billing", aarogya: true, legacy: true, paper: false },
  { label: "NABH audit trail", aarogya: true, legacy: false, paper: false },
  { label: "Offline-tolerant mode", aarogya: true, legacy: false, paper: true },
  { label: "Go-live under 3 weeks", aarogya: true, legacy: false, paper: true },
  { label: "Per-patient pricing", aarogya: true, legacy: false, paper: true },
  { label: "Mobile + shared-terminal friendly", aarogya: true, legacy: "partial", paper: true },
  { label: "Drug interaction / allergy alerts", aarogya: true, legacy: "partial", paper: false },
];

function Cell({ value }: { readonly value: boolean | "partial" }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100">
        <Check className="w-3.5 h-3.5 text-teal-700" />
      </span>
    );
  if (value === "partial")
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
        <Minus className="w-3.5 h-3.5 text-amber-600" />
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
      <X className="w-3.5 h-3.5 text-red-600" />
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow="Why switch"
          title="How AarogyaEHR compares."
          subtitle="Every feature that matters for an Indian hospital — compared honestly."
        />

        <ScrollReveal>
          <div className="mt-10 sm:mt-14 max-w-3xl mx-auto overflow-hidden rounded-2xl border border-(--border-default) shadow-lg">
            {/* Header row */}
            <div className="grid grid-cols-4 bg-(--surface-sunken) border-b border-(--border-default)">
              <div className="p-4 col-span-1 text-xs font-semibold text-(--text-secondary) uppercase tracking-wide">
                Feature
              </div>
              <div className="p-4 text-center border-l border-(--border-default) bg-(--action-subtle)">
                <span className="text-sm font-bold text-(--action-primary)">AarogyaEHR</span>
              </div>
              <div className="p-4 text-center border-l border-(--border-default)">
                <span className="text-sm font-semibold text-(--text-secondary)">Legacy HIMS</span>
              </div>
              <div className="p-4 text-center border-l border-(--border-default)">
                <span className="text-sm font-semibold text-(--text-secondary)">Paper / Excel</span>
              </div>
            </div>

            {/* Feature rows */}
            {FEATURES.map((row) => (
              <div
                key={row.label}
                className={`grid grid-cols-4 border-b border-(--border-default) last:border-0 ${
                  FEATURES.indexOf(row) % 2 === 0 ? "bg-white" : "bg-(--surface-sunken)/40"
                }`}
              >
                <div className="p-3 sm:p-4 col-span-1 flex items-center">
                  <span className="text-xs sm:text-sm text-foreground font-medium">{row.label}</span>
                </div>
                <div className="p-3 sm:p-4 flex items-center justify-center border-l border-(--border-default) bg-(--action-subtle)/30">
                  <Cell value={row.aarogya} />
                </div>
                <div className="p-3 sm:p-4 flex items-center justify-center border-l border-(--border-default)">
                  <Cell value={row.legacy} />
                </div>
                <div className="p-3 sm:p-4 flex items-center justify-center border-l border-(--border-default)">
                  <Cell value={row.paper} />
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex justify-center gap-6 text-xs text-(--text-secondary)">
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-teal-600" /> Included</span>
            <span className="flex items-center gap-1.5"><Minus className="w-3 h-3 text-amber-600" /> Partial / Add-on</span>
            <span className="flex items-center gap-1.5"><X className="w-3 h-3 text-red-500" /> Not available</span>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
