"use client";

import Link from "next/link";
import {
  Shield,
  Server,
  Code,
  Link as LinkIcon,
  FileCheck,
  Bot,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const platformPages = [
  {
    slug: "security-data-privacy",
    nameKey: "platform.securityName",
    taglineKey: "platform.securityTagline",
    descKey: "platform.securityDesc",
    icon: Lock,
  },
  {
    slug: "abdm-compliance",
    nameKey: "platform.abdmName",
    taglineKey: "platform.abdmTagline",
    descKey: "platform.abdmDesc",
    icon: FileCheck,
  },
  {
    slug: "architecture-reliability",
    nameKey: "platform.architectureName",
    taglineKey: "platform.architectureTagline",
    descKey: "platform.architectureDesc",
    icon: Server,
  },
  {
    slug: "integrations",
    nameKey: "platform.integrationName",
    taglineKey: "platform.integrationTagline",
    descKey: "platform.integrationDesc",
    icon: LinkIcon,
  },
  {
    slug: "interoperability",
    nameKey: "platform.interopName",
    taglineKey: "platform.interopTagline",
    descKey: "platform.interopDesc",
    icon: Code,
  },
  {
    slug: "ai-capabilities",
    nameKey: "platform.aiName",
    taglineKey: "platform.aiTagline",
    descKey: "platform.aiDesc",
    icon: Bot,
  },
];

export default function PlatformIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              {t("platform.heroBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("platform.heroTitle")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {t("platform.heroSubtitle")}
            </p>
            <Button href="/book-demo">{t("common.talkToEngineering")}</Button>
          </div>
        </Container>
      </section>

      {/* Platform pages grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformPages.map((page) => (
              <Link
                key={page.slug}
                href={`/platform/${page.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all"
              >
                <page.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[var(--action-primary)] transition-colors">
                  {t(page.nameKey)}
                </h3>
                <p className="text-sm text-[var(--action-primary)] mb-3">
                  {t(page.taglineKey)}
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  {t(page.descKey)}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  {t("common.learnMore")}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical highlights */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <SectionHeader
            title={t("platform.highlightsTitle")}
            subtitle={t("platform.highlightsSubtitle")}
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">{t("platform.highlightUptime")}</div>
              <div className="text-foreground font-medium">{t("platform.highlightUptimeLabel")}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t("platform.highlightUptimeDesc")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">{t("platform.highlightEncryption")}</div>
              <div className="text-foreground font-medium">{t("platform.highlightEncryptionLabel")}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t("platform.highlightEncryptionDesc")}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--action-primary)] mb-2">{t("platform.highlightResidency")}</div>
              <div className="text-foreground font-medium">{t("platform.highlightResidencyLabel")}</div>
              <div className="text-sm text-[var(--text-secondary)]">{t("platform.highlightResidencyDesc")}</div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--action-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("platform.ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("platform.ctaSubtitle")}
            </p>
            <Button href="/book-demo" variant="inverse">
              {t("common.scheduleTechnicalCall")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
