import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Monitor, Wifi, WifiOff, Users } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "1366×768 friendly",
    description:
      "Designed for the screens actually in Indian hospitals — not just the latest MacBook.",
  },
  {
    icon: Wifi,
    title: "Loads in under 3 seconds",
    description:
      "Optimized for hospital broadband. No heavy animations or bloated bundles.",
  },
  {
    icon: WifiOff,
    title: "Offline-tolerant",
    description:
      "Data entry continues when the network drops. Syncs automatically when connection returns.",
  },
  {
    icon: Users,
    title: "Shared-terminal mode",
    description:
      "Built for nursing stations where multiple staff share one PC. Fast user switching, session isolation.",
  },
];

export function WorksEverywhereSection() {
  return (
    <section className="marketing-section bg-section-alt">
      <Container>
        <SectionHeader
          eyebrow="Infrastructure reality"
          title="Tested on the oldest PC at your nursing station."
          subtitle="AarogyaEHR is built for the infrastructure Indian hospitals actually have, not the infrastructure vendors wish they had."
        />

        <div className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl border border-[var(--border-default)] text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[var(--action-subtle)] text-[var(--action-primary)] mb-3 sm:mb-4">
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
      </Container>
    </section>
  );
}
