"use client";

import {
  Hero,
  TrustBar,
  StatsStrip,
  ProblemSection,
  VideoSection,
  HowItWorksSection,
  SpecialtyGrid,
  IndiaNativeSection,
  WorksEverywhereSection,
  ClinicalSafetySection,
  ComparisonSection,
  TestimonialSlider,
  CTASection,
  FAQSection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsStrip />
      <ProblemSection />
      <VideoSection />
      <HowItWorksSection />
      <SpecialtyGrid />
      <IndiaNativeSection />
      <WorksEverywhereSection />
      <ClinicalSafetySection />
      <ComparisonSection />
      <TestimonialSlider />
      <CTASection
        titleKey="cta.title"
        subtitleKey="cta.subtitle"
      />
      <FAQSection />
    </>
  );
}
