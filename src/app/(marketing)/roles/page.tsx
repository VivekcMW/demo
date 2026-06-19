"use client";

import Link from "next/link";
import {
  User,
  Stethoscope,
  CreditCard,
  ClipboardList,
  FlaskConical,
  Pill,
  HeartPulse,
  UserCog,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const roles = [
  {
    slug: "doctors",
    nameKey: "roles.doctorName",
    taglineKey: "roles.doctorTagline",
    icon: Stethoscope,
    descKey: "roles.doctorDesc",
  },
  {
    slug: "nurses",
    nameKey: "roles.nurseName",
    taglineKey: "roles.nurseTagline",
    icon: HeartPulse,
    descKey: "roles.nurseDesc",
  },
  {
    slug: "front-desk",
    nameKey: "roles.frontDeskName",
    taglineKey: "roles.frontDeskTagline",
    icon: ClipboardList,
    descKey: "roles.frontDeskDesc",
  },
  {
    slug: "billing-tpa-teams",
    nameKey: "roles.billingName",
    taglineKey: "roles.billingTagline",
    icon: CreditCard,
    descKey: "roles.billingDesc",
  },
  {
    slug: "lab-technicians",
    nameKey: "roles.labName",
    taglineKey: "roles.labTagline",
    icon: FlaskConical,
    descKey: "roles.labDesc",
  },
  {
    slug: "pharmacists",
    nameKey: "roles.pharmacistName",
    taglineKey: "roles.pharmacistTagline",
    icon: Pill,
    descKey: "roles.pharmacistDesc",
  },
  {
    slug: "administrators",
    nameKey: "roles.adminName",
    taglineKey: "roles.adminTagline",
    icon: UserCog,
    descKey: "roles.adminDesc",
  },
];

export default function RolesIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t("roles.heroBadge")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("roles.heroTitle")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8">
              {t("roles.heroSubtitle")}
            </p>
            <Button href="/book-demo" className="w-full sm:w-auto">{t("common.bookDemo")}</Button>
          </div>
        </Container>
      </section>

      {/* Role grid */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all duration-200"
              >
                <role.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--action-primary)] mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-[var(--action-primary)] transition-colors">
                  {t(role.nameKey)}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--action-primary)] mb-2 sm:mb-3">
                  {t(role.taglineKey)}
                </p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {t(role.descKey)}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  {t("common.seeTheirScreen")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
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
              {t("roles.ctaTitle")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("roles.ctaSubtitle")}
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
