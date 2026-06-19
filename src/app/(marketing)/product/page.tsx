import { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Building2,
  FlaskConical,
  Pill,
  Activity,
  Calendar,
  FileText,
  CreditCard,
  Bed,
  AlertTriangle,
  BarChart3,
  Smartphone,
  Shield,
  Ambulance,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { getAllSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Product — AarogyaEHR modules",
  description:
    "Complete hospital management: OPD, IPD, EMR, pharmacy, lab, radiology, billing, emergency, OT, and more. All ABDM-ready.",
};

const productCategories = [
  {
    title: "Clinical",
    products: [
      { slug: "clinical-emr", name: "Clinical EMR", icon: FileText },
      { slug: "e-prescription", name: "e-Prescription", icon: Pill },
      { slug: "opd-management", name: "OPD Management", icon: Calendar },
      { slug: "ipd-wards", name: "IPD & Wards", icon: Bed },
    ],
  },
  {
    title: "Diagnostics",
    products: [
      { slug: "laboratory-lis", name: "Laboratory (LIS)", icon: FlaskConical },
      { slug: "radiology-ris-pacs", name: "Radiology (RIS/PACS)", icon: Activity },
    ],
  },
  {
    title: "Operations",
    products: [
      { slug: "pharmacy-inventory", name: "Pharmacy & Inventory", icon: Pill },
      { slug: "billing-tpa-insurance", name: "Billing & TPA", icon: CreditCard },
      { slug: "ot-anaesthesia", name: "OT & Anaesthesia", icon: Stethoscope },
      { slug: "emergency-triage", name: "Emergency & Triage", icon: Ambulance },
      { slug: "daycare-workflows", name: "Daycare Workflows", icon: Calendar },
    ],
  },
  {
    title: "Platform",
    products: [
      { slug: "analytics-mis-nabh", name: "Analytics & NABH", icon: BarChart3 },
      { slug: "abdm-abha", name: "ABDM & ABHA", icon: Shield },
      { slug: "telemedicine-patient-app", name: "Telemedicine & Patient App", icon: Smartphone },
    ],
  },
];

export default function ProductIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              One platform. Every department.
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              14 modules that work together from registration to discharge —
              no integrations to maintain, no data silos to bridge.
            </p>
            <Button href="/book-demo">Book a demo</Button>
          </div>
        </Container>
      </section>

      {/* Product grid by category */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="space-y-16">
            {productCategories.map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {category.title}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      className="group p-6 rounded-xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-lg transition-all"
                    >
                      <product.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                      <h3 className="font-semibold text-foreground group-hover:text-[var(--action-primary)] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See how the modules work together.
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              A 45-minute demo walks through the complete patient journey —
              from registration to discharge.
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
