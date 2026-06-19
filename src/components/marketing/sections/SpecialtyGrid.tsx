"use client";

import Link from "next/link";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { SpecialtyCard } from "../cards/SpecialtyCard";
import { ScrollReveal } from "@/hooks/useScrollReveal";
import { Baby, Droplets, Ribbon, ArrowRight } from "lucide-react";

const featuredSpecialties = [
  {
    name: "OBG",
    tagline: "Not a generic form with 'Gynaecology' written on top.",
    href: "/specialties/obstetrics-gynaecology",
    icon: Baby,
    features: [
      "Digital partograph with auto-alerts",
      "ANC visit tracker with risk scoring",
      "LSCS consent and OT notes",
      "Postpartum monitoring checklists",
    ],
  },
  {
    name: "Nephrology",
    tagline: "Dialysis workflows built for Indian unit economics.",
    href: "/specialties/nephrology-dialysis",
    icon: Droplets,
    features: [
      "Dialysis flowsheets per session",
      "Machine slot scheduling",
      "eGFR trending and CKD staging",
      "Ayushman package billing",
    ],
  },
  {
    name: "Oncology",
    tagline: "Chemo daycare where throughput meets safety.",
    href: "/specialties/oncology",
    icon: Ribbon,
    features: [
      "Chemo daycare scheduling",
      "Regimen protocols with dose calculators",
      "TNM staging and registry",
      "Cycle tracking and toxicity grading",
    ],
  },
];

export function SpecialtyGrid() {
  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow="42 specialty workflows"
          title="Your specialty isn't a dropdown option here."
          subtitle="Each specialty has its own templates, order sets, registries, and safety logic — built with practicing clinicians, for Indian volumes."
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
              Explore all 42 specialties
              <ArrowRight className="w-4 h-4 icon-bounce" />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
