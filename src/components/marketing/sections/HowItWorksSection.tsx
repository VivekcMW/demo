"use client";

import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ClipboardList, Cpu, Rocket, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Map your hospital in 2 hours",
    description:
      "A setup call with our clinical configuration team. We map your specialties, departments, bed types, and billing structure. No generic defaults — everything is configured for your facility.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    numColor: "text-blue-200",
    accent: "border-blue-500",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Configure specialty workflows",
    description:
      "We activate the specialty packs for your case mix — OBG, Cardiology, Nephrology, and more. Your templates, order sets, and safety logic are loaded and tested with your clinical leads.",
    color: "bg-teal-50 text-teal-600 border-teal-100",
    numColor: "text-teal-200",
    accent: "border-teal-500",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Go live in under 3 weeks",
    description:
      "Staff training, parallel running, and cutover — handled by our go-live team. Most clinics are fully live within 3 weeks. Hospitals with 200+ beds in 6–8 weeks.",
    color: "bg-green-50 text-green-600 border-green-100",
    numColor: "text-green-200",
    accent: "border-green-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow="Implementation"
          title="From contract to go-live in under 3 weeks."
          subtitle="Most EHR implementations take months. Ours don't — because we've done it hundreds of times and built the process into the product."
        />

        <div className="mt-12 sm:mt-16 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-linear-to-r from-blue-200 via-teal-200 to-green-200" />

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.number} delay={i + 1}>
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  {/* Step number + icon */}
                  <div className={`relative z-10 w-14 h-14 rounded-2xl border-2 flex items-center justify-center mb-5 ${step.color}`}>
                    <step.icon className="w-6 h-6" />
                    <span className={`absolute -top-3 -right-3 text-3xl font-black leading-none select-none ${step.numColor}`}>
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className={`w-full rounded-2xl border-l-4 p-5 bg-white border border-(--border-default) ${step.accent}`}>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-(--text-secondary) leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow between steps (mobile) */}
                  {i < STEPS.length - 1 && (
                    <div className="md:hidden flex justify-center w-full mt-4 mb-0">
                      <ArrowRight className="w-5 h-5 text-(--border-default) rotate-90" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Guarantee strip */}
        <ScrollReveal>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-(--text-secondary)">
            {[
              "✓ Dedicated go-live coordinator",
              "✓ Training included for all staff roles",
              "✓ 30-day hyper-care post go-live",
              "✓ Data migration support",
            ].map((item) => (
              <span key={item} className="text-(--action-primary) font-medium">{item}</span>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
