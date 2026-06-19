"use client";

import Link from "next/link";
import {
  Shield,
  FileText,
  Cookie,
  RefreshCw,
  ArrowRight,
  Scale,
} from "lucide-react";
import { Container } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const legalPages = [
  {
    slug: "privacy-policy",
    nameKey: "legal.privacyName",
    descKey: "legal.privacyDesc",
    icon: Shield,
    updatedKey: "legal.privacyUpdated",
  },
  {
    slug: "terms-of-service",
    nameKey: "legal.termsName",
    descKey: "legal.termsDesc",
    icon: FileText,
    updatedKey: "legal.termsUpdated",
  },
  {
    slug: "cookie-policy",
    nameKey: "legal.cookieName",
    descKey: "legal.cookieDesc",
    icon: Cookie,
    updatedKey: "legal.cookieUpdated",
  },
  {
    slug: "refund-policy",
    nameKey: "legal.refundName",
    descKey: "legal.refundDesc",
    icon: RefreshCw,
    updatedKey: "legal.refundUpdated",
  },
];

export default function LegalIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              {t("legal.heroBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("legal.heroTitle")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              {t("legal.heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Legal pages grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {legalPages.map((page) => (
              <Link
                key={page.slug}
                href={`/legal/${page.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-lg transition-all"
              >
                <page.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {t(page.nameKey)}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {t(page.descKey)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--text-secondary)]">
                    Updated {t(page.updatedKey)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[var(--action-primary)] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Exit Rights */}
      <section className="py-16 md:py-24 bg-[var(--bg-subtle)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t("legal.exitTitle")}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              {t("legal.exitDesc")}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              {t("legal.exitNote")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
