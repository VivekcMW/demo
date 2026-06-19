import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { PriceCalculator } from "@/components/marketing/forms/PriceCalculator";

export const metadata: Metadata = {
  title: "Pricing — AarogyaEHR | Plans for clinics to hospital chains",
  description:
    "Transparent EHR pricing for Indian clinics, nursing homes, and hospitals. Per-doctor clinic plans and per-bed hospital plans. ABDM and NABH features included in every plan.",
  keywords: ["HIMS pricing India", "EHR cost", "hospital software price India"],
};

const plans = [
  {
    name: "Starter",
    description: "For single-specialty clinics",
    price: "₹1",
    unit: "/ patient onwards",
    features: [
      "OPD queue & appointments",
      "EMR + e-prescription",
      "Basic billing",
      "Patient WhatsApp updates",
      "ABHA creation",
      "1 specialty workflow",
    ],
    cta: "Start with Starter",
    href: "/book-demo?plan=starter",
    popular: false,
  },
  {
    name: "Growth",
    description: "For polyclinics & nursing homes",
    price: "₹1-2",
    unit: "/ patient (specialty-based)",
    features: [
      "Everything in Starter",
      "Multiple specialty workflows",
      "IPD & bed management",
      "LIS + RIS integration",
      "TPA & insurance desk",
      "NABH reports",
      "Volume discounts",
    ],
    cta: "Book a demo",
    href: "/book-demo?plan=growth",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For super-specialty & chains",
    price: "Custom",
    unit: "",
    features: [
      "Everything in Growth",
      "All 42 specialty workflows",
      "Multi-center MIS",
      "API & HL7/FHIR interfaces",
      "Dedicated success manager",
      "On-premise or private cloud option",
    ],
    cta: "Talk to sales",
    href: "/book-demo?plan=enterprise",
    popular: false,
  },
];

const includedFeatures = [
  "ABDM/ABHA integration",
  "DPDP-compliant data handling",
  "9 Indian languages",
  "Audit trails",
  "Training & go-live support",
  "Help center + WhatsApp support",
];

const faqs = [
  {
    question: "Is implementation charged separately?",
    answer:
      "Yes, one-time onboarding fee covers setup, data migration, configuration, and on-site training. GST @18% applies.",
  },
  {
    question: "Do you charge for ABDM compliance?",
    answer: "No. Compliance is a baseline, not an upsell.",
  },
  {
    question: "Can we start with OPD and add IPD later?",
    answer: "Yes — plans upgrade in place, data carries over.",
  },
  {
    question: "On-premise option?",
    answer:
      "Available on Enterprise for hospitals with data-residency policies; we recommend our India-region cloud for most.",
  },
  {
    question: "Contract terms?",
    answer:
      "Annual billing default with 2 months free; monthly option available. Volume discounts for high-patient-volume facilities.",
  },
  {
    question: "How does per-patient pricing work?",
    answer:
      "Base rate is ₹1/patient. Specialty multipliers apply based on complexity (1x for General Medicine up to 3x for Critical Care). 18% GST added as per Indian tax regulations.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              Start at ₹1 per patient. Scale as you grow.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              Simple per-patient pricing based on your specialties. Higher complexity, 
              slightly higher rate. ABDM, security, and 9 Indian languages included — 
              never sold as add-ons. GST @18% as per Indian regulations.
            </p>
          </div>
        </Container>
      </section>

      {/* Plans */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl sm:rounded-2xl border p-5 sm:p-6 md:p-8 ${
                  plan.popular
                    ? "border-[var(--action-primary)] shadow-xl"
                    : "border-[var(--border-default)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--action-primary)] text-white text-xs font-medium rounded-full whitespace-nowrap">
                    Most popular
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 sm:mb-6">
                  {plan.description}
                </p>
                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span className="text-sm sm:text-base text-[var(--text-secondary)]">
                      {" "}
                      {plan.unit}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 sm:gap-3 items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.href}
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's always included */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            title="What's always included"
            subtitle="Every plan, every customer — no upsells for compliance or safety."
            className="mb-8 sm:mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {includedFeatures.map((feature) => (
              <div key={feature} className="flex gap-2 sm:gap-3 items-center p-3 sm:p-4 bg-white rounded-lg border border-[var(--border-default)]">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Price Calculator */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <SectionHeader
                title="Calculate your monthly cost"
                subtitle="Select your specialties and patient volume to get an instant estimate."
                className="mb-6 sm:mb-8 text-left"
              />
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="text-sm sm:text-base leading-relaxed">
                  Our pricing is <strong className="text-foreground">₹1 per patient base</strong> with 
                  specialty multipliers from <strong className="text-foreground">1x to 3x</strong> based on clinical complexity. 
                  Higher volume? Get automatic discounts.
                </p>
                <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-default)]">
                  <h4 className="font-semibold text-foreground mb-3">Specialty Multipliers</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>General Medicine</span>
                      <span className="font-medium text-green-600">1.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pediatrics, ENT</span>
                      <span className="font-medium text-blue-600">1.25x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ortho, Surgery</span>
                      <span className="font-medium text-indigo-600">1.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cardiology, Neuro</span>
                      <span className="font-medium text-purple-600">2.0x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>OBG, CTVS</span>
                      <span className="font-medium text-orange-600">2.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ICU, Trauma</span>
                      <span className="font-medium text-red-600">3.0x</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  One-time onboarding fee includes setup, training & go-live support. 
                  18% GST on all charges. Volume discounts: 5% over 5K patients, 10% over 15K, 15% over 30K.
                </p>
              </div>
            </div>
            <PriceCalculator />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container narrow>
          <SectionHeader title="Frequently asked questions" className="mb-8 sm:mb-12" />
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]"
              >
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 flex gap-2 items-start">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0 mt-0.5" />
                  {faq.question}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-6 sm:pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              See AarogyaEHR configured for your facility.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              45-minute live demo, not slideware. Bring your IT head and your
              most skeptical doctor.
            </p>
            <Button href="/book-demo" variant="inverse" className="w-full sm:w-auto">
              Book a demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
