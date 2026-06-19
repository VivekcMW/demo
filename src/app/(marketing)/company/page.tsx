import { Metadata } from "next";
import Link from "next/link";
import {
  Building,
  Users,
  Briefcase,
  Mail,
  Newspaper,
  Handshake,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";

export const metadata: Metadata = {
  title: "Company — AarogyaEHR",
  description:
    "About AarogyaEHR, our team, careers, partners, and how to contact us.",
};

const companyPages = [
  {
    slug: "about",
    name: "About Us",
    description: "Why we exist and what we believe.",
    icon: Building,
  },
  {
    slug: "careers",
    name: "Careers",
    description: "Join the team building India's clinical OS.",
    icon: Briefcase,
  },
  {
    slug: "contact",
    name: "Contact",
    description: "Reach our sales, support, or partnership teams.",
    icon: Mail,
  },
  {
    slug: "partners",
    name: "Partners",
    description: "Implementation partners and integration ecosystem.",
    icon: Handshake,
  },
  {
    slug: "news",
    name: "News",
    description: "Press releases and media coverage.",
    icon: Newspaper,
  },
];

export default function CompanyIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              The EHR built for how India actually practices medicine.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              We started AarogyaEHR to close the gap between what Indian hospitals
              need and what legacy EHRs provide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/company/about">Our story</Button>
              <Button href="/company/careers" variant="secondary">
                Join us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title="What we believe"
            subtitle="The principles that guide every product decision."
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Specialty depth is the product",
                description: "A cardiologist needs a cath report, not a customizable form. Depth is why doctors adopt.",
              },
              {
                title: "Compliance is never an upsell",
                description: "ABDM, NABH reporting, statutory registers — built in, for every customer, at every size.",
              },
              {
                title: "Patient safety is a design discipline",
                description: "Allergy banners that can't be hidden, color never used alone, ASCII numerals for every dose.",
              },
              {
                title: "Honesty compounds",
                description: "Our exit-rights promise is public. Our case studies include what went wrong.",
              },
            ].map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <Heart className="w-6 h-6 text-[var(--action-primary)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-[var(--text-secondary)]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Company pages */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyPages.map((page) => (
              <Link
                key={page.slug}
                href={`/company/${page.slug}`}
                className="group p-6 rounded-xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-lg transition-all"
              >
                <page.icon className="w-8 h-8 text-[var(--action-primary)] mb-4" />
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-[var(--action-primary)] transition-colors">
                  {page.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {page.description}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] text-sm font-medium">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to see the product?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              45 minutes, live product, configured for your specialties.
            </p>
            <Button href="/book-demo" variant="inverse">
              Book a demo
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
