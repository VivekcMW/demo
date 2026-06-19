import { Metadata } from "next";
import {
  Hero,
  TrustBar,
  ProblemSection,
  SpecialtyGrid,
  IndiaNativeSection,
  WorksEverywhereSection,
  ClinicalSafetySection,
  StatsStrip,
  TestimonialSlider,
  CTASection,
} from "@/components/marketing";

export const metadata: Metadata = {
  title: "AarogyaEHR — Hospital EHR & HIMS built for India | ABDM-ready",
  description:
    "Specialty-deep EHR for Indian hospitals and clinics. ABDM/ABHA built in, 9 Indian languages, NABH-ready, works offline-tolerant on any hospital PC. Book a demo.",
  keywords: [
    "EHR India",
    "HIMS software",
    "hospital management software India",
    "ABDM compliant EHR",
    "EMR software India",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Trust bar - moved up for immediate credibility */}
      <TrustBar />

      {/* Problem statement */}
      <ProblemSection />

      {/* Specialty depth */}
      <SpecialtyGrid />

      {/* India-native features */}
      <IndiaNativeSection />

      {/* Works everywhere */}
      <WorksEverywhereSection />

      {/* Clinical safety */}
      <ClinicalSafetySection />

      {/* Stats strip */}
      <StatsStrip />

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Closing CTA */}
      <CTASection
        title="See AarogyaEHR on your own patients' journeys."
        subtitle="A 45-minute demo, configured to your specialty mix. No slideware — the real product."
        primaryCTA={{ label: "Book a demo", href: "/book-demo" }}
        secondaryCTA={{ label: "Talk on WhatsApp", href: "https://wa.me/919876543210" }}
      />
    </>
  );
}
