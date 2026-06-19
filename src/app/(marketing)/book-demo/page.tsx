"use client";

import {
  Clock,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { Container, SectionHeader } from "@/components/marketing/ui";
import { DemoRequestForm } from "@/components/marketing/forms/DemoRequestForm";
import { PriceCalculator } from "@/components/marketing/forms/PriceCalculator";
import { useTranslation } from "@/hooks/useTranslation";

const reassuranceKeys = [
  { icon: Clock, key: "demo.reassurance1" },
  { icon: Stethoscope, key: "demo.reassurance2" },
  { icon: MessageSquare, key: "demo.reassurance3" },
] as const;

const factorKeys = [
  "demo.factor1",
  "demo.factor2",
  "demo.factor3",
  "demo.factor4",
  "demo.factor5",
] as const;

export default function BookDemoPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 px-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight tracking-tight">
              {t("demo.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
              {t("demo.subtitle")}
            </p>
          </div>

          {/* Reassurance row */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {reassuranceKeys.map((item) => (
              <div key={item.key} className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-[var(--text-secondary)]">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--action-primary)] flex-shrink-0" />
                <span>{t(item.key)}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Form section */}
      <section className="py-12 sm:py-16 md:py-24">
        <Container>
          <DemoRequestForm />
        </Container>
      </section>

      {/* Price Calculator Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="grid lg:grid-cols-10 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <SectionHeader
                title={t("demo.estimateTitle")}
                subtitle={t("demo.estimateSubtitle")}
                className="mb-6 sm:mb-8 text-left"
              />
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p className="text-sm sm:text-base leading-relaxed">
                  {t("demo.estimateDesc")}
                </p>
                <div className="p-4 rounded-lg bg-white border border-[var(--border-default)]">
                  <h4 className="font-semibold text-foreground mb-2">{t("demo.factorsTitle")}</h4>
                  <ul className="space-y-2 text-sm">
                    {factorKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="text-[var(--action-primary)] font-bold">•</span>
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <PriceCalculator showCTA={false} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
