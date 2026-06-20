"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { X, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const BEFORE = [
  "Billing terminal with patient records bolted on",
  "Generic forms — doctors fight the EMR, not use it",
  "Missed charges discovered at month-end",
  "TPA rejections caught after submission",
  "Shadow paper records at every nursing station",
  "Single-language UI, printed forms in another",
];

const AFTER = [
  "Clinical workflow first — billing flows from it",
  "42 specialty templates built with practicing clinicians",
  "Auto-flagging of billable procedures at point of care",
  "Real-time TPA pre-auth workflows with rejection analytics",
  "Nurses trust the system — zero paper backup",
  "12 Indian languages across screens, prints, and consent",
];

export function ProblemSection() {
  const { t } = useTranslation();

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          title={t("problem.title")}
          subtitle={t("problem.subtitle")}
        />

        <div className="mt-10 sm:mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* BEFORE */}
          <ScrollReveal variant="left">
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 overflow-hidden h-full">
              <div className="px-5 py-4 bg-red-100 border-b border-red-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-red-700">Legacy HIMS / Paper-based</span>
              </div>
              <ul className="px-5 py-5 space-y-3">
                {BEFORE.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-200 flex items-center justify-center">
                      <X className="w-3 h-3 text-red-600" />
                    </span>
                    <span className="text-sm text-red-800 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* AFTER */}
          <ScrollReveal variant="right">
            <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 overflow-hidden h-full">
              <div className="px-5 py-4 bg-teal-100 border-b border-teal-200 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-sm font-semibold text-teal-700">AarogyaEHR</span>
              </div>
              <ul className="px-5 py-5 space-y-3">
                {AFTER.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-teal-700" />
                    </span>
                    <span className="text-sm text-teal-900 leading-snug font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
