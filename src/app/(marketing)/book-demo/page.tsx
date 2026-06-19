import { Metadata } from "next";
import {
  Clock,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { Container, SectionHeader } from "@/components/marketing/ui";
import { DemoRequestForm } from "@/components/marketing/forms/DemoRequestForm";
import { PriceCalculator } from "@/components/marketing/forms/PriceCalculator";

export const metadata: Metadata = {
  title: "Book a demo — AarogyaEHR",
  description:
    "See AarogyaEHR configured for your specialty mix. 45-minute live product demo for hospital owners, CMOs, and IT heads.",
  keywords: ["EHR demo", "HIMS demo India"],
};

const reassurances = [
  { icon: Clock, text: "45 minutes, live product" },
  { icon: Stethoscope, text: "Your specialty pre-configured" },
  { icon: MessageSquare, text: "No obligation, no pressure follow-ups" },
];

export default function BookDemoPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              A demo on your workflows, not our slides.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              Tell us your facility type and specialty mix. We'll walk your team
              through the live product — registration to discharge — in 45
              minutes.
            </p>
          </div>

          {/* Reassurance row */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {reassurances.map((item) => (
              <div key={item.text} className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-[var(--text-secondary)]">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form section */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <DemoRequestForm />
        </Container>
      </section>

      {/* Price Calculator Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="grid lg:grid-cols-10 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <SectionHeader
                title="Estimate your investment"
                subtitle="Starting at ₹1 per patient — see your estimated monthly cost."
                className="mb-6 sm:mb-8 text-left"
              />
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="text-sm sm:text-base leading-relaxed">
                  Our per-patient pricing scales with your volume. Higher complexity specialties 
                  have slightly higher rates. Our sales team will confirm exact pricing during your demo.
                </p>
                <div className="p-4 rounded-lg bg-white border border-[var(--border-default)]">
                  <h4 className="font-semibold text-foreground mb-2">What affects pricing?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--action-primary)] font-bold">•</span>
                      <span>Specialty mix (1x - 3x multiplier)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--action-primary)] font-bold">•</span>
                      <span>Monthly patient volume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--action-primary)] font-bold">•</span>
                      <span>Number of OPDs and doctors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--action-primary)] font-bold">•</span>
                      <span>Volume discounts (5-15% for high volumes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--action-primary)] font-bold">•</span>
                      <span>GST @18% (Indian standard)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <PriceCalculator showCTA={false} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
