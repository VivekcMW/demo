import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { AlertTriangle, Eye, Palette, Bell } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Allergy-first banner",
    description:
      "Patient allergies are always visible at the top of every screen. Never collapses, never hides.",
  },
  {
    icon: AlertTriangle,
    title: "Four-level alert system",
    description:
      "Red is reserved for genuine danger. Graduated severity prevents alert fatigue.",
  },
  {
    icon: Eye,
    title: "Color-never-alone",
    description:
      "Every status is communicated by color + icon + text. Safe for color-blind staff.",
  },
  {
    icon: Palette,
    title: "Monitor-proof design",
    description:
      "Tested on washed-out hospital monitors. Critical information stays readable.",
  },
];

export function ClinicalSafetySection() {
  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow="Clinical safety"
          title="Designed so the critical value is never missed."
          subtitle="Safety isn't a feature — it's the foundation. Every design decision prioritizes clinical correctness over aesthetics."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-2 sm:p-0">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-green-50 text-green-600 mb-3 sm:mb-4">
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

        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/platform/safety"
            className="inline-flex items-center gap-2 text-sm sm:text-base text-[var(--action-primary)] font-medium hover:gap-3 transition-all"
          >
            How we designed for safety
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
