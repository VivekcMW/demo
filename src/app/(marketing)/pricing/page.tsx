"use client";

import Link from "next/link";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { PriceCalculator } from "@/components/marketing/forms/PriceCalculator";
import { useTranslation } from "@/hooks/useTranslation";

const planKeys = [
  {
    nameKey: "pricing.starter",
    descKey: "pricing.starterDesc",
    priceKey: "",
    price: "₹1",
    unitKey: "",
    featureKeys: [
      "pricing.starterFeature1",
      "pricing.starterFeature2",
      "pricing.starterFeature3",
      "pricing.starterFeature4",
      "pricing.starterFeature5",
      "pricing.starterFeature6",
    ],
    ctaKey: "common.startWithStarter",
    href: "/book-demo?plan=starter",
    popular: false,
  },
  {
    nameKey: "pricing.growthPlan",
    descKey: "pricing.growthPlanDesc",
    priceKey: "",
    price: "₹1-2",
    unitKey: "pricing.growthPriceUnit",
    featureKeys: [
      "pricing.growthFeature1",
      "pricing.growthFeature2",
      "pricing.growthFeature3",
      "pricing.growthFeature4",
      "pricing.growthFeature5",
      "pricing.growthFeature6",
      "pricing.growthFeature7",
    ],
    ctaKey: "pricing.growthCta",
    href: "/book-demo?plan=growth",
    popular: true,
  },
  {
    nameKey: "pricing.enterprisePlan",
    descKey: "pricing.enterprisePlanDesc",
    priceKey: "pricing.enterprisePrice",
    price: "",
    unitKey: "",
    featureKeys: [
      "pricing.enterpriseFeature1",
      "pricing.enterpriseFeature2",
      "pricing.enterpriseFeature3",
      "pricing.enterpriseFeature4",
      "pricing.enterpriseFeature5",
      "pricing.enterpriseFeature6",
    ],
    ctaKey: "pricing.enterpriseCta",
    href: "/book-demo?plan=enterprise",
    popular: false,
  },
];

const includedFeatureKeys = [
  "pricing.includedFeature1",
  "pricing.includedFeature2",
  "pricing.includedFeature3",
  "pricing.includedFeature4",
  "pricing.includedFeature5",
  "pricing.includedFeature6",
];

const faqKeys = [
  { qKey: "pricing.faqQ1", aKey: "pricing.faqA1" },
  { qKey: "pricing.faqQ2", aKey: "pricing.faqA2" },
  { qKey: "pricing.faqQ3", aKey: "pricing.faqA3" },
  { qKey: "pricing.faqQ4", aKey: "pricing.faqA4" },
  { qKey: "pricing.faqQ5", aKey: "pricing.faqA5" },
  { qKey: "pricing.faqQ6", aKey: "pricing.faqA6" },
];

export default function PricingPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("pricing.heroTitle")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              {t("pricing.heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Plans */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {planKeys.map((plan) => (
              <div
                key={plan.nameKey}
                className={`relative rounded-xl sm:rounded-2xl border p-5 sm:p-6 md:p-8 ${
                  plan.popular
                    ? "border-[var(--action-primary)] shadow-xl"
                    : "border-[var(--border-default)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--action-primary)] text-white text-xs font-medium rounded-full whitespace-nowrap">
                    {t("pricing.mostPopular")}
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                  {t(plan.nameKey)}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 sm:mb-6">
                  {t(plan.descKey)}
                </p>
                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {plan.priceKey ? t(plan.priceKey) : plan.price}
                  </span>
                  {plan.unitKey && (
                    <span className="text-sm sm:text-base text-[var(--text-secondary)]">
                      {" "}
                      {t(plan.unitKey)}
                    </span>
                  )}
                </div>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.featureKeys.map((key) => (
                    <li key={key} className="flex gap-2 sm:gap-3 items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {t(key)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={plan.href}
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full justify-center"
                >
                  {t(plan.ctaKey)}
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
            title={t("pricing.alwaysIncluded")}
            subtitle={t("pricing.alwaysIncludedSubtitle")}
            className="mb-8 sm:mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {includedFeatureKeys.map((key) => (
              <div key={key} className="flex gap-2 sm:gap-3 items-center p-3 sm:p-4 bg-white rounded-lg border border-[var(--border-default)]">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0" />
                <span className="text-sm sm:text-base text-foreground">{t(key)}</span>
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
                title={t("pricing.calcTitle")}
                subtitle={t("pricing.calcSubtitle")}
                className="mb-6 sm:mb-8 text-left"
              />
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="text-sm sm:text-base leading-relaxed">
                  {t("pricing.calcDescription")}
                </p>
                <div className="p-4 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-default)]">
                  <h4 className="font-semibold text-foreground mb-3">{t("pricing.calcMultipliersTitle")}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier1Label")}</span>
                      <span className="font-medium text-green-600">{t("pricing.calcMultiplier1Value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier2Label")}</span>
                      <span className="font-medium text-blue-600">{t("pricing.calcMultiplier2Value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier3Label")}</span>
                      <span className="font-medium text-indigo-600">{t("pricing.calcMultiplier3Value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier4Label")}</span>
                      <span className="font-medium text-purple-600">{t("pricing.calcMultiplier4Value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier5Label")}</span>
                      <span className="font-medium text-orange-600">{t("pricing.calcMultiplier5Value")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("pricing.calcMultiplier6Label")}</span>
                      <span className="font-medium text-red-600">{t("pricing.calcMultiplier6Value")}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  {t("pricing.calcFeeNote")}
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
          <SectionHeader title={t("pricing.faqTitle")} className="mb-8 sm:mb-12" />
          <div className="space-y-4 sm:space-y-6">
            {faqKeys.map((faq) => (
              <div
                key={faq.qKey}
                className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-default)]"
              >
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 flex gap-2 items-start">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0 mt-0.5" />
                  {t(faq.qKey)}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-6 sm:pl-7">
                  {t(faq.aKey)}
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
              {t("pricing.ctaTitle")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("pricing.ctaSubtitle")}
            </p>
            <Button href="/book-demo" variant="inverse" className="w-full sm:w-auto">
              {t("common.bookDemo")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
