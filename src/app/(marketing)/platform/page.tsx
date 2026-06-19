import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Server,
  Code,
  Link as LinkIcon,
  FileCheck,
  Bot,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Platform — AarogyaEHR",
  description:
    "ABDM compliance, security, architecture, integrations, and AI capabilities. The technology behind AarogyaEHR.",
};

const platformPages = [
  {
    slug: "security-data-privacy",
    name: "Security & Data Privacy",
    tagline: "DPDP Act 2023 ready",
    description: "Encryption, role-based access, audit trails, and Indian data residency.",
    icon: Lock,
  },
  {
    slug: "abdm-compliance",
    name: "ABDM Compliance",
    tagline: "Built in, not bolted on",
    description: "ABHA creation, health records sharing, and consent management.",
    icon: FileCheck,
  },
  {
    slug: "architecture-reliability",
    name: "Architecture & Reliability",
    tagline: "99.9% uptime SLA",
    description: "Cloud-native architecture with offline resilience for critical areas.",
    icon: Server,
  },
  {
    slug: "integrations",
    name: "Integrations",
    tagline: "Connect your ecosystem",
    description: "Lab analyzers, PACS, payment gateways, and government systems.",
    icon: LinkIcon,
  },
  {
    slug: "interoperability",
    name: "Interoperability",
    tagline: "HL7 FHIR ready",
    description: "Standards-based data exchange with other healthcare systems.",
    icon: Code,
  },
  {
    slug: "ai-capabilities",
    name: "AI Capabilities",
    tagline: "Clinical decision support",
    description: "Drug interactions, dose checking, and documentation assistance.",
    icon: Bot,
  },
];

export default function PlatformIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Platform
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Built for Indian healthcare infrastructure.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              ABDM-native. DPDP-compliant. Runs on 1366×768 screens and spotty
              internet. The boring infrastructure decisions that make or break
              hospital software.
            </p>
            <Button href="/book-demo">Talk to engineering</Button>
          </div>
        </Container>
      </section>

      {/* Platform pages grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformPages.map((page) => (
              <Link
                key={page.slug}
                href={`/platform/${page.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all"
              >
                <page.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[var(--action-primary)] transition-colors">
                  {page.name}
                </h3>
                <p className="text-sm text-[var(--action-primary)] mb-3">
                  {page.tagline}
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  {page.description}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical highlights */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            title="Technical highlights"
            subtitle="For IT heads and integration teams."
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">99.9%</div>
              <div className="text-foreground font-medium">Uptime SLA</div>
              <div className="text-sm text-[var(--text-secondary)]">with offline resilience for OT/ICU</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">AES-256</div>
              <div className="text-foreground font-medium">Encryption</div>
              <div className="text-sm text-[var(--text-secondary)]">at rest and in transit</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">India</div>
              <div className="text-foreground font-medium">Data residency</div>
              <div className="text-sm text-[var(--text-secondary)]">contractual, not aspirational</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions about security or architecture?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              We'll connect you with our engineering team for a technical deep-dive.
            </p>
            <Button href="/book-demo" variant="inverse">
              Schedule a technical call
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
