"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { FileSpreadsheet, Stethoscope, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function ProblemSection() {
  const { t } = useTranslation();

  const painPoints = [
    {
      icon: FileSpreadsheet,
      title: t("problem.billingFirstTitle"),
      description: t("problem.billingFirstDesc"),
    },
    {
      icon: Stethoscope,
      title: t("problem.doctorsFightTitle"),
      description: t("problem.doctorsFightDesc"),
    },
    {
      icon: TrendingUp,
      title: t("problem.revenueLeakageTitle"),
      description: t("problem.revenueLeakageDesc"),
    },
  ];

  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          title={t("problem.title")}
          subtitle={t("problem.subtitle")}
        />

        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {painPoints.map((point, index) => (
            <div key={index} className="text-center p-4 sm:p-0">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-red-50 text-red-600 mb-4 sm:mb-5">
                <point.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2">
                {point.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
