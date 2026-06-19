"use client";

import { Container } from "../ui/Container";
import { useTranslation } from "@/hooks/useTranslation";

export function StatsStrip() {
  const { t } = useTranslation();

  const stats = [
    { value: "40", unit: "sec", label: t("stats.avgOpdBillTime") },
    { value: "9", unit: "", label: t("stats.indianLanguages") },
    { value: "42", unit: "", label: t("stats.specialtyWorkflows") },
    { value: "99.9%", unit: "", label: t("stats.uptimeSla") },
    { value: "<3", unit: "wks", label: t("stats.clinicGoLive") },
  ];

  return (
    <section className="py-8 sm:py-12 bg-[var(--action-primary)]">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {stat.value}
                {stat.unit && (
                  <span className="text-sm sm:text-lg md:text-xl font-normal text-teal-200 ml-0.5 sm:ml-1">
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-teal-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
