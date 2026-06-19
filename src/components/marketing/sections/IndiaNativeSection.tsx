import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import {
  ShieldCheck,
  Languages,
  Receipt,
  FileCheck,
  Building2,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "ABDM / ABHA ready",
    description:
      "Create and verify ABHA at registration. Push records to the patient's PHR with consent. Full Milestone-3 compliance.",
  },
  {
    icon: Languages,
    title: "9 Indian languages",
    description:
      "Patient-facing screens, prints, and consent forms in Hindi, Tamil, Telugu, Bengali, Kannada, Malayalam, Gujarati, Punjabi, and Odia.",
  },
  {
    icon: Receipt,
    title: "GST billing",
    description:
      "Bill in lakh-crore format with automatic GST breakup. Generate e-invoices and file-ready reports.",
  },
  {
    icon: CreditCard,
    title: "TPA & insurance",
    description:
      "Track every TPA query from submission to settlement. Pre-auth workflows and rejection analytics.",
  },
  {
    icon: FileCheck,
    title: "NABH audit trails",
    description:
      "Export NABH 6th edition audit trails in one click. Continuous readiness, not last-minute scrambles.",
  },
  {
    icon: Building2,
    title: "DPDP compliance",
    description:
      "Built-in consent management, data access controls, and audit logs for Digital Personal Data Protection Act.",
  },
];

export function IndiaNativeSection() {
  return (
    <section className="marketing-section">
      <Container>
        <SectionHeader
          eyebrow="Built for India"
          title="ABDM, ABHA, GST, TPA, NABH — built in, not bolted on."
          subtitle="Every compliance requirement and Indian healthcare workflow is native to the system, not a third-party integration."
        />

        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-3 sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[var(--action-subtle)] flex items-center justify-center">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--action-primary)]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
