"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Monitor, Wifi, WifiOff, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function WorksEverywhereSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Monitor,
      title: t("worksEverywhere.screenTitle"),
      description: t("worksEverywhere.screenDesc"),
    },
    {
      icon: Wifi,
      title: t("worksEverywhere.speedTitle"),
      description: t("worksEverywhere.speedDesc"),
    },
    {
      icon: WifiOff,
      title: t("worksEverywhere.offlineTitle"),
      description: t("worksEverywhere.offlineDesc"),
    },
    {
      icon: Users,
      title: t("worksEverywhere.sharedTitle"),
      description: t("worksEverywhere.sharedDesc"),
    },
  ];

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow={t("worksEverywhere.eyebrow")}
          title={t("worksEverywhere.title")}
          subtitle={t("worksEverywhere.subtitle")}
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-[var(--border-default)] text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[var(--action-subtle)] text-[var(--action-primary)] mb-3 sm:mb-4">
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
      </Container>
    </section>
  );
}
