"use client";

import Link from "next/link";
import {
  Building2,
  Home,
  FlaskConical,
  Activity,
  Users,
  Network,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const facilities = [
  {
    slug: "clinics-polyclinics",
    nameKey: "facilities.clinicsName",
    descKey: "facilities.clinicsDesc",
    icon: Home,
    bedsKey: "facilities.clinicsBeds",
    featured: false,
  },
  {
    slug: "nursing-homes",
    nameKey: "facilities.nursingHomesName",
    descKey: "facilities.nursingHomesDesc",
    icon: Building2,
    bedsKey: "facilities.nursingHomesBeds",
    featured: false,
  },
  {
    slug: "multi-specialty-hospitals",
    nameKey: "facilities.multiSpecName",
    descKey: "facilities.multiSpecDesc",
    icon: Building2,
    bedsKey: "facilities.multiSpecBeds",
    featured: true,
  },
  {
    slug: "super-specialty-chains",
    nameKey: "facilities.chainName",
    descKey: "facilities.chainDesc",
    icon: Network,
    bedsKey: "facilities.chainBeds",
    featured: false,
  },
  {
    slug: "single-specialty-chains",
    nameKey: "facilities.singleChainName",
    descKey: "facilities.singleChainDesc",
    icon: Users,
    bedsKey: "facilities.singleChainBeds",
    featured: false,
  },
  {
    slug: "diagnostic-centers-labs",
    nameKey: "facilities.diagnosticName",
    descKey: "facilities.diagnosticDesc",
    icon: FlaskConical,
    bedsKey: "facilities.diagnosticBeds",
    featured: false,
  },
  {
    slug: "dialysis-daycare-centers",
    nameKey: "facilities.dialysisName",
    descKey: "facilities.dialysisDesc",
    icon: Activity,
    bedsKey: "facilities.dialysisBeds",
    featured: false,
  },
] as const;

export default function FacilitiesIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t("facilities.heroBadge")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("facilities.heroTitle")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8">
              {t("facilities.heroSubtitle")}
            </p>
            <Button href="/book-demo" className="w-full sm:w-auto">{t("common.bookDemoForYourFacility")}</Button>
          </div>
        </Container>
      </section>

      {/* Facility grid */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {facilities.map((facility) => (
              <Link
                key={facility.slug}
                href={`/facilities/${facility.slug}`}
                className={`group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border bg-white hover:shadow-xl transition-all duration-200 ${
                  facility.featured
                    ? "border-[var(--action-primary)] ring-1 ring-[var(--action-primary)]"
                    : "border-[var(--border-default)] hover:border-[var(--action-primary)]"
                }`}
              >
                {facility.featured && (
                  <div className="text-xs font-medium text-[var(--action-primary)] mb-3 sm:mb-4">
                    {t("facilities.mostCommon")}
                  </div>
                )}
                <facility.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--action-primary)] mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {t(facility.nameKey)}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {t(facility.descKey)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    {t(facility.bedsKey)}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {t("facilities.ctaTitle")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("facilities.ctaSubtitle")}
            </p>
            <Button href="/book-demo" variant="inverse" className="w-full sm:w-auto">
              {t("common.bookDemo")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
