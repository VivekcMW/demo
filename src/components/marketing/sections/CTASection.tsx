"use client";

import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { ScrollReveal } from "@/hooks/useScrollReveal";

interface CTASectionProps {
  titleKey?: string;
  subtitleKey?: string;
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
}

export function CTASection({
  titleKey,
  subtitleKey,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  const { t } = useTranslation();
  
  const displayTitle = titleKey ? t(titleKey as any) : title || t("cta.title" as any);
  const displaySubtitle = subtitleKey ? t(subtitleKey as any) : subtitle;
  const ctaLabel = primaryCTA?.label || t("common.bookDemo" as any);
  const ctaHref = primaryCTA?.href || "/book-demo";

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[var(--action-primary)] overflow-hidden">
      <Container className="text-center px-6">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            {displayTitle}
          </h2>
        </ScrollReveal>
        {(displaySubtitle || subtitleKey) && (
          <ScrollReveal delay={1}>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-teal-100 max-w-xl mx-auto">
              {displaySubtitle || (subtitleKey ? t(subtitleKey as any) : t("cta.subtitle" as any))}
            </p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={2}>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              href={ctaHref}
              variant="inverse"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto btn-shine"
            >
              {ctaLabel}
            </Button>
            {secondaryCTA && (
              <Button
                href={secondaryCTA.href}
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 w-full sm:w-auto"
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
