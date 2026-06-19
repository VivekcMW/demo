"use client";

import { Container } from "../ui/Container";
import { ShieldCheck, Languages, Building2, FileCheck, Scale, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { useTranslation } from "@/hooks/useTranslation";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "ABDM Milestone-3 certified",
  },
  {
    icon: FileCheck,
    label: "NABH 6th edition aligned",
  },
  {
    icon: Scale,
    label: "DPDP Act ready",
  },
  {
    icon: Building2,
    label: "ISO 27001",
  },
  {
    icon: Languages,
    label: "9 Indian languages",
  },
];

const hospitalLogos = [
  { name: "Apollo Hospitals", initials: "AH" },
  { name: "Fortis Healthcare", initials: "FH" },
  { name: "Max Healthcare", initials: "MH" },
  { name: "Manipal Hospitals", initials: "MH" },
  { name: "Aster DM Healthcare", initials: "AD" },
  { name: "Narayana Health", initials: "NH" },
  { name: "KIMS Hospitals", initials: "KH" },
  { name: "Yashoda Hospitals", initials: "YH" },
];

export function TrustBar() {
  const { t } = useTranslation();

  return (
    <section className="py-4 sm:py-6 bg-[var(--surface-sunken)] border-y border-[var(--border-default)]">
      <Container>
        <ScrollReveal>
          {/* Certification badges */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-4">
            {trustItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--text-secondary)] group cursor-default"
              >
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--action-primary)] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Hospital logos */}
          <div className="pt-4 border-t border-[var(--border-default)]">
            <p className="text-xs text-[var(--text-muted)] text-center mb-3 sm:mb-4">
              {t("trust.trustedBy")}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6">
              {hospitalLogos.map((hospital, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-[var(--border-default)] text-xs sm:text-sm text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:shadow-sm transition-all group"
                >
                  <div className="w-6 h-6 rounded-full bg-[var(--action-subtle)] text-[var(--action-primary)] flex items-center justify-center font-semibold text-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                    {hospital.initials}
                  </div>
                  <span className="whitespace-nowrap font-medium">{hospital.name}</span>
                  <CheckCircle2 className="w-3 h-3 text-[var(--action-primary)] flex-shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] text-center mt-3">
              {t("trust.andMore")}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
