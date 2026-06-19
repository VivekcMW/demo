"use client";

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
import { useTranslation } from "@/hooks/useTranslation";

const companyPages = [
  {
    slug: "about",
    nameKey: "company.aboutName",
    descKey: "company.aboutDesc",
    icon: Building,
  },
  {
    slug: "careers",
    nameKey: "company.careersName",
    descKey: "company.careersDesc",
    icon: Briefcase,
  },
  {
    slug: "contact",
    nameKey: "company.contactName",
    descKey: "company.contactDesc",
    icon: Mail,
  },
  {
    slug: "partners",
    nameKey: "company.partnersName",
    descKey: "company.partnersDesc",
    icon: Handshake,
  },
  {
    slug: "news",
    nameKey: "company.newsName",
    descKey: "company.newsDesc",
    icon: Newspaper,
  },
] as const;

const valuesData = [
  { titleKey: "company.value1Title", descKey: "company.value1Desc" },
  { titleKey: "company.value2Title", descKey: "company.value2Desc" },
  { titleKey: "company.value3Title", descKey: "company.value3Desc" },
  { titleKey: "company.value4Title", descKey: "company.value4Desc" },
] as const;

export default function CompanyIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("company.heroTitle")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {t("company.heroSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/company/about">{t("common.ourStory")}</Button>
              <Button href="/company/careers" variant="secondary">
                {t("common.joinUs")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeader
            title={t("company.valuesTitle")}
            subtitle={t("company.valuesSubtitle")}
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {valuesData.map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <Heart className="w-6 h-6 text-[var(--action-primary)] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                  <p className="text-[var(--text-secondary)]">{t(value.descKey)}</p>
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
                  {t(page.nameKey)}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {t(page.descKey)}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] text-sm font-medium">
                  {t("common.learnMore")}
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
              {t("company.ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("company.ctaSubtitle")}
            </p>
            <Button href="/book-demo" variant="inverse">
              {t("common.bookDemo")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
