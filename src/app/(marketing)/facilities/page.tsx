import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Home,
  FlaskConical,
  Activity,
  Users,
  Network,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Solutions by Facility Type — AarogyaEHR",
  description:
    "HIMS configured for your facility size: clinics, nursing homes, multi-specialty hospitals, super-specialty chains, diagnostic centers.",
};

const facilities = [
  {
    slug: "clinics-polyclinics",
    name: "Clinics & Polyclinics",
    description: "OPD-focused practices with 1–10 doctors. Fast registration, prescription, and billing.",
    icon: Home,
    beds: "OPD only",
  },
  {
    slug: "nursing-homes",
    name: "Nursing Homes",
    description: "10–50 bed facilities with basic IPD. Simple wards, pharmacy, and lab.",
    icon: Building2,
    beds: "10–50 beds",
  },
  {
    slug: "multi-specialty-hospitals",
    name: "Multi-specialty Hospitals",
    description: "Full clinical loop: OPD, IPD, diagnostics, OT, TPA desk, NABH reporting.",
    icon: Building2,
    beds: "50–200 beds",
    featured: true,
  },
  {
    slug: "super-specialty-chains",
    name: "Super-specialty & Chains",
    description: "Multi-center operations with API integrations, custom workflows, and enterprise MIS.",
    icon: Network,
    beds: "200+ beds",
  },
  {
    slug: "single-specialty-chains",
    name: "Single-specialty Chains",
    description: "Specialty-focused chains: eye care, dialysis, dental, fertility, ortho.",
    icon: Users,
    beds: "Multiple locations",
  },
  {
    slug: "diagnostic-centers-labs",
    name: "Diagnostic Centers & Labs",
    description: "LIS and RIS-focused with collection center workflows and B2B billing.",
    icon: FlaskConical,
    beds: "Diagnostics",
  },
  {
    slug: "dialysis-daycare-centers",
    name: "Dialysis & Daycare Centers",
    description: "Session-based workflows for dialysis, chemotherapy, and minor procedures.",
    icon: Activity,
    beds: "Daycare",
  },
];

export default function FacilitiesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>By facility type</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              Configured for your facility size.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8">
              A 20-bed nursing home and a 500-bed chain need different things.
              Same platform, different configuration — we meet you where you are.
            </p>
            <Button href="/book-demo" className="w-full sm:w-auto">Book a demo for your facility</Button>
          </div>
        </Container>
      </section>

      {/* Facility grid */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {facilities.map((facility) => (
              <Link
                key={facility.slug}
                href={`/facilities/${facility.slug}`}
                className={`group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border bg-white hover:shadow-xl transition-all duration-200 ${
                  facility.featured
                    ? "border-[var(--action-primary)] ring-1 ring-[var(--action-primary)]"
                    : "border-[var(--border-default)] hover:border-[var(--action-primary)]"
                }`}
              >
                {facility.featured && (
                  <div className="text-xs font-medium text-[var(--action-primary)] mb-3 sm:mb-4">
                    Most common
                  </div>
                )}
                <facility.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--action-primary)] mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {facility.name}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {facility.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    {facility.beds}
                  </span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Not sure which fits you best?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Talk to us. We'll recommend the right configuration based on your
              current setup and growth plans.
            </p>
            <Button href="/book-demo" variant="inverse" className="w-full sm:w-auto">
              Book a demo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
