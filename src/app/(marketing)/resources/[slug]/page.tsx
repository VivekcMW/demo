import { notFound } from "next/navigation";
import { getServerT } from "@/i18n/server";
import {
  BookOpen,
  FileText,
  Video,
  Calculator,
  HelpCircle,
  Code,
  Newspaper,
  ArrowRight,
  Search,
} from "lucide-react";
import { Container, Button, SectionHeader } from "@/components/marketing/ui";
import {
  PageBreadcrumb,
  PageCTA,
} from "@/components/marketing/templates";
import {
  getContentFile,
} from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatTitle(slug: string): string {
  const keys: Record<string, string> = {
    "api-docs": "page.resourcesApiDocs",
    "blog": "page.resourcesBlog",
    "case-studies": "page.resourcesCaseStudies",
    "guides": "page.resourcesGuides",
    "help-center": "page.resourcesHelpCenter",
    "roi-calculator": "page.resourcesRoiCalculator",
    "webinars": "page.resourcesWebinars",
  };
  return keys[slug] || `page.${slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;
}

function getResourceIcon(slug: string) {
  const icons: Record<string, typeof BookOpen> = {
    "api-docs": Code,
    "blog": Newspaper,
    "case-studies": FileText,
    "guides": BookOpen,
    "help-center": HelpCircle,
    "roi-calculator": Calculator,
    "webinars": Video,
  };
  return icons[slug] || BookOpen;
}

export default async function ResourcePage({ params }: Props) {
  const t = await getServerT();
  const { slug } = await params;
  const content = getContentFile("resources", slug);

  if (!content) {
    notFound();
  }

  const title = t(formatTitle(slug));
  const ResourceIcon = getResourceIcon(slug);

  const placeholderItems = [
    { title: t("page.placeholderGettingStarted"), description: t("page.placeholderGettingStartedDesc") },
    { title: t("page.placeholderBestPractices"), description: t("page.placeholderBestPracticesDesc") },
    { title: t("page.placeholderTroubleshooting"), description: t("page.placeholderTroubleshootingDesc") },
    { title: t("page.placeholderAdvanced"), description: t("page.placeholderAdvancedDesc") },
  ];

  return (
    <>
      <PageBreadcrumb
        items={[
          { label: t("page.resources"), href: "/resources" },
          { label: title },
        ]}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--bg-subtle)] to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--action-primary)]/10 text-[var(--action-primary)] text-sm font-medium mb-6">
              <ResourceIcon className="w-4 h-4" />
              {t("page.resourcesBadge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {content.meta.meta_description?.replace("{Product}", "AarogyaEHR") ||
                t("page.browseResource", { name: title.toLowerCase() })}
            </p>

            {/* Search (placeholder) */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder={t("page.searchResource", { name: title.toLowerCase() })}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--border-default)] bg-white focus:ring-2 focus:ring-[var(--action-primary)] focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content (placeholder) */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[var(--text-secondary)]">
              {t("page.contentComingSoon")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {placeholderItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-[var(--border-default)] bg-white hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <PageCTA
        title={t("page.needHelp")}
        subtitle={t("page.supportReady")}
        primaryCta={{ label: t("page.contactSupport"), href: "/company/contact" }}
        secondaryCta={{ label: t("page.facilityBookDemo"), href: "/book-demo" }}
      />
    </>
  );
}
