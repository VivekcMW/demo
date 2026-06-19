"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { AlertTriangle, Eye, Palette, Bell } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function ClinicalSafetySection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Bell,
      title: t("clinicalSafety.allergyTitle"),
      description: t("clinicalSafety.allergyDesc"),
    },
    {
      icon: AlertTriangle,
      title: t("clinicalSafety.alertTitle"),
      description: t("clinicalSafety.alertDesc"),
    },
    {
      icon: Eye,
      title: t("clinicalSafety.colorTitle"),
      description: t("clinicalSafety.colorDesc"),
    },
    {
      icon: Palette,
      title: t("clinicalSafety.monitorTitle"),
      description: t("clinicalSafety.monitorDesc"),
    },
  ];

  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow={t("clinicalSafety.eyebrow")}
          title={t("clinicalSafety.title")}
          subtitle={t("clinicalSafety.subtitle")}
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-2 sm:p-0">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 text-green-600 mb-3 sm:mb-4">
                <feature.icon className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/platform/safety"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-[var(--action-primary)] font-medium hover:gap-3 transition-all"
          >
            {t("clinicalSafety.safetyLink")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
