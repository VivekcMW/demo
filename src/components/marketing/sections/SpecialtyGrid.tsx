"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { SpecialtyCard } from "../cards/SpecialtyCard";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Baby, Droplets, Ribbon, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function SpecialtyGrid() {
  const { t } = useTranslation();

  const featuredSpecialties = [
    {
      name: t("specialtyGrid.obgName"),
      tagline: t("specialtyGrid.obgTagline"),
      href: "/specialties/obstetrics-gynaecology",
      icon: Baby,
      features: [
        t("specialtyGrid.obgFeature1"),
        t("specialtyGrid.obgFeature2"),
        t("specialtyGrid.obgFeature3"),
        t("specialtyGrid.obgFeature4"),
      ],
    },
    {
      name: t("specialtyGrid.nephroName"),
      tagline: t("specialtyGrid.nephroTagline"),
      href: "/specialties/nephrology-dialysis",
      icon: Droplets,
      features: [
        t("specialtyGrid.nephroFeature1"),
        t("specialtyGrid.nephroFeature2"),
        t("specialtyGrid.nephroFeature3"),
        t("specialtyGrid.nephroFeature4"),
      ],
    },
    {
      name: t("specialtyGrid.oncoName"),
      tagline: t("specialtyGrid.oncoTagline"),
      href: "/specialties/oncology",
      icon: Ribbon,
      features: [
        t("specialtyGrid.oncoFeature1"),
        t("specialtyGrid.oncoFeature2"),
        t("specialtyGrid.oncoFeature3"),
        t("specialtyGrid.oncoFeature4"),
      ],
    },
  ];

  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow={t("specialtyGrid.eyebrow")}
          title={t("specialtyGrid.title")}
          subtitle={t("specialtyGrid.subtitle")}
        />

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredSpecialties.map((specialty, index) => (
            <ScrollReveal key={specialty.name} delay={(index + 1) as 1 | 2 | 3}>
              <SpecialtyCard {...specialty} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={4}>
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 text-[var(--action-primary)] font-medium hover:gap-3 transition-all link-underline"
            >
              {t("specialtyGrid.exploreLink")}
              <ArrowRight className="w-4 h-4 icon-bounce" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
