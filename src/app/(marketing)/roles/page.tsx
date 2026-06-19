import { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Stethoscope,
  CreditCard,
  ClipboardList,
  FlaskConical,
  Pill,
  HeartPulse,
  UserCog,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Solutions by Role — AarogyaEHR",
  description:
    "Role-specific workflows: doctors, nurses, front desk, billing, lab technicians, pharmacists, administrators.",
};

const roles = [
  {
    slug: "doctors",
    name: "For Doctors",
    tagline: "90-second notes, voice dictation, results that find you",
    icon: Stethoscope,
    description: "Specialty templates, favorite prescriptions, and rounds from your phone.",
  },
  {
    slug: "nurses",
    name: "For Nurses",
    tagline: "e-MAR, vitals, handoffs — without the clipboard",
    icon: HeartPulse,
    description: "Medication administration records, shift handoffs, and critical-value alerts.",
  },
  {
    slug: "front-desk",
    name: "For Front Desk",
    tagline: "60-second registration, queue visibility",
    icon: ClipboardList,
    description: "Fast patient registration, Aadhaar-assisted demographics, and appointment management.",
  },
  {
    slug: "billing-tpa-teams",
    name: "For Billing & TPA Teams",
    tagline: "Pre-auth to settlement in one workflow",
    icon: CreditCard,
    description: "TPA claim tracking, query management, and automatic document assembly.",
  },
  {
    slug: "lab-technicians",
    name: "For Lab Technicians",
    tagline: "Sample to report, analyzer-connected",
    icon: FlaskConical,
    description: "Barcode-driven workflows, analyzer integration, and auto-validation rules.",
  },
  {
    slug: "pharmacists",
    name: "For Pharmacists",
    tagline: "Dispense, stock, and indents in one place",
    icon: Pill,
    description: "Inventory management, batch tracking, and prescription verification.",
  },
  {
    slug: "administrators",
    name: "For Administrators",
    tagline: "Occupancy, revenue, and quality at a glance",
    icon: UserCog,
    description: "MIS dashboards, NABH indicators, and department-wise analytics.",
  },
];

export default function RolesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>By role</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              Your role. Your screen.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-6 sm:mb-8">
              A nurse shouldn't navigate a monolith to chart vitals. Each role
              gets their own working screen — focused on what they do, not what
              everyone does.
            </p>
            <Button href="/book-demo" className="w-full sm:w-auto">Book a demo</Button>
          </div>
        </Container>
      </section>

      {/* Role grid */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {roles.map((role) => (
              <Link
                key={role.slug}
                href={`/roles/${role.slug}`}
                className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all duration-200"
              >
                <role.icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--action-primary)] mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 group-hover:text-[var(--action-primary)] transition-colors">
                  {role.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--action-primary)] mb-2 sm:mb-3">
                  {role.tagline}
                </p>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4 leading-relaxed">
                  {role.description}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  See their screen
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
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
              See the screens your team will use.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Bring a doctor, a nurse, and a billing executive to the demo — they'll
              each see their own workflow.
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
