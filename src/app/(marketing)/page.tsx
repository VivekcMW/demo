"use client";

import {
  Hero,
  ProblemSection,
  SpecialtyGrid,
  IndiaNativeSection,
  WorksEverywhereSection,
  ClinicalSafetySection,
  StatsStrip,
  TestimonialSlider,
  CTASection,
} from "@/components/marketing";
import { useTranslation } from "@/hooks/useTranslation";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <ProblemSection />
      <SpecialtyGrid />
      <IndiaNativeSection />
      <WorksEverywhereSection />
      <ClinicalSafetySection />
      <StatsStrip />
      <TestimonialSlider />
      <CTASection
        titleKey="cta.title"
        subtitleKey="cta.subtitle"
      />
    </>
  );
}
