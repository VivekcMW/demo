"use client";

import Link from "next/link";
import {
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

interface HeroProps {
  readonly title: string;
  readonly subtitle: string;
  readonly primaryCta?: { label: string; href: string };
  readonly secondaryCta?: { label: string; href: string };
}

export function PageHero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-linear-to-b from-(--bg-subtle) to-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-(--text-secondary) mb-6 sm:mb-8 leading-relaxed">
            {subtitle}
          </p>
          {(primaryCta ?? secondaryCta) && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              {primaryCta && (
                <Button href={primaryCta.href} className="w-full sm:w-auto">{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

interface FeatureGridProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly features: Array<{
    title: string;
    description: string;
    icon?: LucideIcon;
  }>;
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24">
      <Container>
        {(title ?? subtitle) && (
          <SectionHeader title={title ?? ""} subtitle={subtitle} className="mb-8 sm:mb-12" />
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 sm:p-6 rounded-lg sm:rounded-xl border border-(--border-default) bg-white hover:shadow-lg transition-shadow"
            >
              {feature.icon && (
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-(--action-primary) mb-3 sm:mb-4" />
              )}
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface BulletListProps {
  readonly title: string;
  readonly items: string[];
}

export function BulletList({ title, items }: BulletListProps) {
  return (
    <section className="py-8 sm:py-12">
      <Container>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{title}</h2>
        <ul className="space-y-2 sm:space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-2 sm:gap-3 items-start">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-(--action-primary) mt-0.5 shrink-0" />
              <span className="text-sm sm:text-base text-(--text-secondary)">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

interface FAQSectionProps {
  readonly title?: string;
  readonly faqs?: Array<{ question: string; answer: string }>;
}

export function FAQSection({ title, faqs = [] }: FAQSectionProps) {
  const { t } = useTranslation();
  const displayTitle = title ?? t("page.frequentlyAskedQuestions");
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-(--bg-subtle)">
      <Container narrow>
        <SectionHeader title={displayTitle} className="mb-8 sm:mb-12" />
        <div className="space-y-4 sm:space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white border border-(--border-default)"
            >
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 sm:mb-2">
                {faq.question}
              </h3>
              <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface PageCTAProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly primaryCta?: { label: string; href: string };
  readonly secondaryCta?: { label: string; href: string };
}

export function PageCTA({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: PageCTAProps) {
  const { t } = useTranslation();
  const ctaLabel = primaryCta?.label ?? t("page.facilityBookDemo");
  const ctaHref = primaryCta?.href ?? "/book-demo";
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-(--action-primary)">
      <Container>
        <div className="text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Button href={ctaHref} variant="inverse" className="w-full sm:w-auto">
              {ctaLabel}
            </Button>
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="ghost" className="text-white border-white/30 hover:bg-white/10 w-full sm:w-auto">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

interface ProseContentProps {
  readonly content: string;
  readonly className?: string;
}

export function ProseContent({ content, className = "" }: ProseContentProps) {
  const processContent = (text: string) => {
    return text
      .replaceAll(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replaceAll(/\*(.+?)\*/g, "<em>$1</em>")
      .replaceAll(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-(--action-primary) hover:underline">$1</a>')
      .replaceAll("\n\n", "</p><p>")
      .replaceAll("\n", "<br />");
  };

  return (
    <div
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{
        __html: `<p>${processContent(content)}</p>`,
      }}
    />
  );
}

interface CrossLinksProps {
  readonly title?: string;
  readonly links: Array<{ label: string; href: string }>;
}

export function CrossLinks({ title, links }: CrossLinksProps) {
  const { t } = useTranslation();
  const displayTitle = title ?? t("page.related");
  return (
    <section className="py-12 border-t border-(--border-default)">
      <Container>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-(--text-secondary)">
            {displayTitle}:
          </span>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-(--action-primary) hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  readonly items: BreadcrumbItem[];
}

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  const { t } = useTranslation();
  return (
    <nav className="py-4 border-b border-(--border-default)">
      <Container>
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-(--text-secondary) hover:text-foreground">
              {t("page.home")}
            </Link>
          </li>
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="text-(--text-secondary)">/</span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-(--text-secondary) hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
