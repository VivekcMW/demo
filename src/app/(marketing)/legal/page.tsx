import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  FileText,
  Cookie,
  RefreshCw,
  ArrowRight,
  Scale,
} from "lucide-react";
import { Container } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Legal — AarogyaEHR",
  description:
    "Privacy policy, terms of service, cookie policy, and refund policy for AarogyaEHR.",
};

const legalPages = [
  {
    slug: "privacy-policy",
    name: "Privacy Policy",
    description: "How we collect, use, and protect your data.",
    icon: Shield,
    updated: "January 2025",
  },
  {
    slug: "terms-of-service",
    name: "Terms of Service",
    description: "Rules governing your use of AarogyaEHR.",
    icon: FileText,
    updated: "January 2025",
  },
  {
    slug: "cookie-policy",
    name: "Cookie Policy",
    description: "How we use cookies and similar technologies.",
    icon: Cookie,
    updated: "January 2025",
  },
  {
    slug: "refund-policy",
    name: "Refund Policy",
    description: "Our fair, clear refund and cancellation terms.",
    icon: RefreshCw,
    updated: "January 2025",
  },
];

export default function LegalIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Legal documents
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Plain-language policies. No legalese traps.
            </p>
          </div>
        </Container>
      </section>

      {/* Legal pages grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {legalPages.map((page) => (
              <Link
                key={page.slug}
                href={`/legal/${page.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-lg transition-all"
              >
                <page.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {page.name}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {page.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">
                    Updated {page.updated}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--action-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Exit Rights */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our exit-rights promise
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              You own your data. Always. If you decide to leave AarogyaEHR, we provide
              a full export in standard formats (HL7 FHIR, CSV) within 30 days at no
              charge. No exit fees. No data hostage situations.
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              This promise is built into our Terms of Service.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
