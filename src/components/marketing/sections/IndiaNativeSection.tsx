"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import {
  ShieldCheck,
  Languages,
  Receipt,
  FileCheck,
  Building2,
  CreditCard,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function IndiaNativeSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t("indiaNative.abdmTitle"),
      description: t("indiaNative.abdmDesc"),
    },
    {
      icon: Languages,
      title: t("indiaNative.languagesTitle"),
      description: t("indiaNative.languagesDesc"),
    },
    {
      icon: Receipt,
      title: t("indiaNative.gstTitle"),
      description: t("indiaNative.gstDesc"),
    },
    {
      icon: CreditCard,
      title: t("indiaNative.tpaTitle"),
      description: t("indiaNative.tpaDesc"),
    },
    {
      icon: FileCheck,
      title: t("indiaNative.nabhTitle"),
      description: t("indiaNative.nabhDesc"),
    },
    {
      icon: Building2,
      title: t("indiaNative.dpdpTitle"),
      description: t("indiaNative.dpdpDesc"),
    },
  ];

  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow={t("indiaNative.eyebrow")}
          title={t("indiaNative.title")}
          subtitle={t("indiaNative.subtitle")}
        />

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--action-subtle)] flex items-center justify-center">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--action-primary)]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
