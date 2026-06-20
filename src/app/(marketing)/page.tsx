"use client";

import {
  Hero,
  StatsStrip,
  ProblemSection,
  VideoSection,
  SpecialtyGrid,
  IndiaNativeSection,
  WorksEverywhereSection,
  ClinicalSafetySection,
  ComparisonSection,
  CTASection,
  FAQSection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <ProblemSection />
      <VideoSection />
      <SpecialtyGrid />
      <IndiaNativeSection />
      <WorksEverywhereSection />
      <ClinicalSafetySection />
      <ComparisonSection />
      <CTASection
        titleKey="cta.title"
        subtitleKey="cta.subtitle"
      />
      <FAQSection />
    </>
  );
}
