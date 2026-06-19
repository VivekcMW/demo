"use client";

import Link from "next/link";
import {
  BookOpen,
  FileText,
  Video,
  Calculator,
  HelpCircle,
  Code,
  Newspaper,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import { useTranslation } from "@/hooks/useTranslation";

const resources = [
  {
    slug: "help-center",
    nameKey: "resources.helpCenterName",
    descKey: "resources.helpCenterDesc",
    icon: HelpCircle,
    ctaKey: "common.browseArticles",
  },
  {
    slug: "guides",
    nameKey: "resources.guidesName",
    descKey: "resources.guidesDesc",
    icon: BookOpen,
    ctaKey: "common.viewGuides",
  },
  {
    slug: "case-studies",
    nameKey: "resources.caseStudiesName",
    descKey: "resources.caseStudiesDesc",
    icon: FileText,
    ctaKey: "common.readStories",
  },
  {
    slug: "webinars",
    nameKey: "resources.webinarsName",
    descKey: "resources.webinarsDesc",
    icon: Video,
    ctaKey: "common.watchWebinars",
  },
  {
    slug: "roi-calculator",
    nameKey: "resources.roiName",
    descKey: "resources.roiDesc",
    icon: Calculator,
    ctaKey: "common.calculateRoi",
  },
  {
    slug: "api-docs",
    nameKey: "resources.apiDocsName",
    descKey: "resources.apiDocsDesc",
    icon: Code,
    ctaKey: "common.viewApiDocs",
  },
  {
    slug: "blog",
    nameKey: "resources.blogName",
    descKey: "resources.blogDesc",
    icon: Newspaper,
    ctaKey: "common.readBlog",
  },
];

export default function ResourcesIndexPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              {t("resources.heroBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("resources.heroTitle")}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {t("resources.heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Resources grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group p-8 rounded-2xl border border-[var(--border-default)] bg-white hover:border-[var(--action-primary)] hover:shadow-xl transition-all"
              >
                <resource.icon className="w-10 h-10 text-[var(--action-primary)] mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--action-primary)] transition-colors">
                  {t(resource.nameKey)}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {t(resource.descKey)}
                </p>
                <span className="inline-flex items-center text-[var(--action-primary)] font-medium text-sm">
                  {t(resource.ctaKey)}
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
              {t("resources.ctaTitle")}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t("resources.ctaSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/company/contact" variant="inverse">
                {t("common.contactSupport")}
              </Button>
              <Button href="/book-demo" variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                {t("common.bookDemo")}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
